<template>
	<el-col v-if="elcolShow" :span="12" style="margin-bottom: 10px">
		<el-card shadow="always" class="home-card" v-loading="onHandSummaryLoading">
			<div ref="echartsPanelBoxRef" class="echarts-panel-box">
				<div class="echarts-panel-header">
					<div class="echarts-panel-header-left">OnHand Summary</div>
				</div>
				<el-form
					style="padding-top: 10px; padding-left: 10px"
					label-position="right"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-row :gutter="15">
						<el-col :span="5">
							<el-form-item title1="部门" :label="$t('dept')" prop="dept">
								<el-select size="small" v-model="formData.dept" filterable class="full-width-input">
									<el-option v-for="item in formData.deptList" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="开始时间" :label="$t('itemtitlelog_messagebegintime')" prop="startdate">
								<el-date-picker
									size="small"
									v-model="formData.startdate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									:disabled-date="startdateDisabledDate"
									style="width: 100%"
								/> </el-form-item
						></el-col>
						<el-col :span="8">
							<el-form-item title1="结束时间" :label="$t('itemtitlelog_messageendtime')" prop="enddate">
								<el-date-picker
									size="small"
									v-model="formData.enddate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									:disabled-date="enddateDisabledDate"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-button size="small" type="primary" icon="Search" plain @click="Search(ruleFormRef)">
								{{ $t("menu_search") }}
							</el-button>
						</el-col>
					</el-row>
				</el-form>
				<div ref="onHandSummaryRef" style="width: 100%; height: 245px"></div>
				<ZDialog v-model="dueTodayList.dialogShow" title="" width="90%">
					<onHandDueToday :condobj="dueTodayList" />
				</ZDialog>
				<ZDialog v-model="overDueList.dialogShow" title="" width="90%">
					<onHandOverDue :condobj="overDueList" />
				</ZDialog>
				<ZDialog v-model="underTestingList.dialogShow" title="" width="90%">
					<onHandUnderTesting :condobj="underTestingList" />
				</ZDialog>
			</div>
		</el-card>
	</el-col>
</template>

<script setup name="onHandSummary">
import { ref, onMounted, inject, onBeforeUnmount, reactive } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import elementResizeDetectorMaker from "element-resize-detector";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "/src/store/globalStore.js";
import ZDialog from "/src/components/ZDialog.vue";
import onHandDueToday from "./onHandDueToday.vue";
import onHandOverDue from "./onHandOverDue.vue";
import onHandUnderTesting from "./onHandUnderTesting.vue";

const i18n = useI18n();
const globalStore = GlobalStore();
const ruleFormRef = ref();
//表单字段
const formData = reactive({
	startdate: "",
	enddate: "",
	dept: globalStore.userInfo.corpdesc,
	deptList: []
});

let now = new Date();
formData.enddate = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${("0" + now.getDate()).slice(-2)}`;
let lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
formData.startdate = `${lastYear.getFullYear()}-${("0" + (lastYear.getMonth() + 1)).slice(-2)}-${("0" + lastYear.getDate()).slice(
	-2
)}`;

const rules = reactive({
	startdate: [{ required: true, message: i18n.t("rulesPropMessage") }],
	enddate: [{ required: true, message: i18n.t("rulesPropMessage") }],
	dept: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

const startdateDisabledDate = DateTime => {
	//如果有结束日期，那么开始日期要小于等于结束日期， 而且日期范围在一年内
	if (formData.enddate) {
		return DateTime.getTime() > new Date(formData.enddate).getTime();
	}
};

const enddateDisabledDate = DateTime => {
	//如果有开始日期，那么结束日期要大于开始日期， 而且日期范围在一年内
	if (formData.startdate) {
		const timeRange = 1 * 24 * 60 * 60 * 1000; // 1天时间戳
		return DateTime.getTime() < new Date(formData.startdate).getTime() - timeRange;
	}
};

// 监听div大小变化
const erd = elementResizeDetectorMaker();
const echarts = inject("echarts"); // 获取echarts对象

const echartsPanelBoxRef = ref();
const elcolShow = ref(true);

const onHandSummaryRef = ref();
let onHandSummaryChart = null;

// 加载 loading
const onHandSummaryLoading = ref(false);

let onHandSummaryOption = {
	tooltip: {
		trigger: "axis"
	},
	grid: {
		top: "6",
		right: "85",
		bottom: "45"
	},
	legend: {
		orient: "vertical",
		right: "0%",
		data: ["internal", "external"]
	},
	xAxis: {
		axisLabel: {
			rotate: 0 //设置x轴字体倾斜
		},
		data: ["Due Today", "Over Due", "Under Testing"]
	},
	yAxis: {
		type: "value"
	},
	series: [
		{
			name: "internal",
			type: "bar",
			barWidth: 45, //柱子的宽度
			// stack: "total",
			label: {
				show: true
			},
			emphasis: {
				focus: "series"
			},
			data: []
		},
		{
			name: "external",
			type: "bar",
			barWidth: 45, //柱子的宽度
			// stack: "total",
			label: {
				show: true
			},
			emphasis: {
				focus: "series"
			},
			data: []
		}
	]
};

//获取
const getOnHandSummary = async () => {
	try {
		onHandSummaryLoading.value = true;
		const res = await http.post(
			"/crm/onhandsummary/onhandsummary!selectOnHandSummary.action",
			qs.stringify({
				"cond.dept": formData.dept,
				"cond.startdate": formData.startdate,
				"cond.enddate": formData.enddate + " 23:59:59"
			}),
			{
				headers: {
					noLoading: true //隐藏加载--
				}
			}
		);
		if (res.onhandsummaryInfos) {
			onHandSummaryOption.series[0].data.length = 0;
			onHandSummaryOption.series[1].data.length = 0;
			onHandSummaryOption.xAxis.data.forEach(value => {
				res.onhandsummaryInfos.forEach(element => {
					if (value == element.stype && element.ftype == "internal") {
						if (element.fnumber == "0") {
							onHandSummaryOption.series[0].data.push(null);
						} else {
							onHandSummaryOption.series[0].data.push(element.fnumber);
						}
					} else if (value == element.stype && element.ftype == "external") {
						if (element.fnumber == "0") {
							onHandSummaryOption.series[1].data.push(null);
						} else {
							onHandSummaryOption.series[1].data.push(element.fnumber);
						}
					}
				});
			});
		}
		// 绘制图表
		onHandSummaryChart.setOption(onHandSummaryOption);
	} finally {
		onHandSummaryLoading.value = false;
		elcolShow.value = onHandSummaryOption.series[1].data.length >= 1 ? true : false;
	}
};

//获取
const getSelectDept = async () => {
	const res = await http.post("/crm/onhandsummary/onhandsummary!selectDept.action", qs.stringify({}), {
		headers: {
			noLoading: true //隐藏加载--
		}
	});
	console.log("res==", res);
	if (res.onhandsummaryInfos) {
		res.onhandsummaryInfos.forEach(element => {
			formData.deptList.push({ label: element.corpdesc, value: element.corpdesc });
		});
	}
};

//查询
const Search = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			getOnHandSummary();
		}
	});
};

const dueTodayList = reactive({
	dialogShow: false,
	dept: "",
	startdate: "",
	enddate: ""
});
const overDueList = reactive({
	dialogShow: false,
	dept: "",
	startdate: "",
	enddate: ""
});
const underTestingList = reactive({
	dialogShow: false,
	dept: "",
	startdate: "",
	enddate: ""
});

//页面初始化渲染完成执行
onMounted(() => {
	// 基于准备好的dom，初始化echarts实例
	onHandSummaryChart = echarts.init(onHandSummaryRef.value);
	getOnHandSummary();
	getSelectDept();

	// 处理 onHandSummaryChart
	onHandSummaryChart.on("click", function (params) {
		if (params.name == "Due Today") {
			dueTodayList.dialogShow = true;
			dueTodayList.dept = formData.dept;
			dueTodayList.startdate = formData.startdate;
			dueTodayList.enddate = formData.enddate;
		} else if (params.name == "Over Due") {
			overDueList.dialogShow = true;
			overDueList.dept = formData.dept;
			overDueList.startdate = formData.startdate;
			overDueList.enddate = formData.enddate;
		} else if (params.name == "Under Testing") {
			underTestingList.dialogShow = true;
			underTestingList.dept = formData.dept;
			underTestingList.startdate = formData.startdate;
			underTestingList.enddate = formData.enddate;
		}
	});

	//监听  echartsPanelBoxRef div 的变化
	erd.listenTo(echartsPanelBoxRef.value, element => {
		onHandSummaryChart.resize(); //调整图表自适应父div
	});
});
//页面卸载之前调用
onBeforeUnmount(() => {
	//防止内存泄露移除除事件监听器
	erd.uninstall(echartsPanelBoxRef.value);
	onHandSummaryChart.dispose();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
