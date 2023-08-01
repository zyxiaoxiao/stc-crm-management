<template>
	<div class="all-height flex-column">
		<el-form
			style="margin: 15px 15px 0px 15px"
			label-position="right"
			label-width="120px"
			:model="formData"
			:rules="rules"
			ref="ruleFormRef"
		>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="年份" :label="$t('itemtitlebase_corpyears')" prop="years">
						<el-date-picker
							v-model="formData.years"
							type="year"
							format="YYYY"
							value-format="YYYY"
							:disabled="formDisabledList.years"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="单位编码" :label="$t('itemtitlebase_corpcorpcode')" prop="corpcode">
						<el-input v-model="formData.corpcode" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="单位名称" :label="$t('itemtitlebase_corpcorpdesc')" prop="corpdesc">
						<el-input v-model.trim="formData.corpdesc" readonly :disabled="formDisabledList.corpdesc">
							<template #append>
								<el-button-group class="flex-row">
									<el-button :disabled="formDisabledList.corpdesc" @click="selectCustomerBtn" icon="ZoomIn" />
									<el-button :disabled="formDisabledList.corpdesc" @click="delCustomer" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="开始时间" :label="$t('tabtitlecalendarstarttime')" prop="begintime">
						<el-date-picker
							v-model="formData.begintime"
							type="month"
							:disabled="formDisabledList.begintime"
							:disabled-date="begintimeDisabledDate"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="结束时间" :label="$t('tabtitlecalendarendtime')" prop="endtime">
						<el-date-picker
							v-model="formData.endtime"
							type="month"
							:disabled="formDisabledList.endtime"
							:disabled-date="endtimeDisabledDate"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item title1="备注" :label="$t('panelcolumnRemark')">
						<el-input type="textarea" v-model="formData.remark" :disabled="formDisabledList.remark"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="制单人编码" :label="$t('itemtitlebase_i18nrecordercode')">
						<el-input v-model.trim="formData.recordercode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="制单人名称" :label="$t('itemtitlebase_i18nrecorderdesc')">
						<el-input v-model.trim="formData.recorderdesc" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="制单时间" :label="$t('itemtitlecommomrecordtime')">
						<el-input v-model.trim="formData.recordtime" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<div class="flex-row">
						<div class="flex-1"></div>
						<el-button size="small" type="primary" icon="Document" v-if="menu_saveShow" plain @click="save_handler(ruleFormRef)">
							{{ $t("menu_save") }}
						</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<el-divider content-position="left"></el-divider>
		<zTable style="overflow: auto" ref="zTable1" :tableList="tableList1">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Edit" plain :disabled="!formData.attainedid" @click="AddComprehensive">{{
					$t("menu_new")
				}}</el-button>
				<el-button
					size="small"
					type="danger"
					icon="Delete"
					plain
					:disabled="!scope.isSelected"
					@click="delComprehensive(scope.ids)"
					>{{ $t("menu_delete") }}
				</el-button>
				<el-button size="small" type="primary" icon="Document" plain @click="save_gradeInfos(scope.selectList)">
					{{ $t("menu_save") }}
				</el-button>
			</template>
		</zTable>

		<!-- 选择客户 -->
		<ZDialog v-model="selectCustomerList.dialogShow" :title="$t('panelSelectcustomer')" width="75%" @close="selectCustomerClose">
			<selectCustomer :condobj="selectCustomerList"></selectCustomer>
		</ZDialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "@/components/ZDialog.vue";
import zTable from "@/components/ZTable/index.vue";
import selectCustomer from "@/views/customerManage/customerSelete/select_attributive_substitution.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: {
		type: Object,
		default: {
			success: {
				type: Boolean,
				default: false
			},
			dialogShow: {
				type: Boolean,
				default: false
			},
			attainedid: {
				type: String,
				default: ""
			},
			workflowflag: {
				type: String,
				default: "3"
			}
		}
	}
});

const ruleFormRef = ref();
//表单字段
const formData = reactive({
	attainedid: props?.condobj?.attainedid,
	years: "",
	corpcode: "",
	corpdesc: "",
	begintime: "",
	endtime: "",
	remark: ""
});

const rules = reactive({
	years: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	begintime: [{ required: true, message: i18n.t("rulesPropMessage") }],
	endtime: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

//选择客户信息弹出参数
const selectCustomerList = reactive({
	dialogShow: false,
	objectParameter: {}
});
//选择客户信息弹出
const selectCustomerBtn = () => {
	selectCustomerList.dialogShow = true;
	selectCustomerList.objectParameter = {};
};
//选择客户信息弹出  回调
const selectCustomerClose = () => {
	let objectParameter = selectCustomerList.objectParameter;
	console.log(objectParameter);
	if (objectParameter && objectParameter?.corpcode) {
		formData.corpdesc = objectParameter.corpdesc; //客户名称
		formData.corpcode = objectParameter.corpcode; //客户号
	}
};
//清除选择的客户
const delCustomer = () => {
	formData.corpdesc = ""; //客户名称
	formData.corpcode = ""; //客户号
};

const begintimeDisabledDate = DateTime => {
	//如果有结束日期，那么开始日期要小于等于结束日期， 而且日期范围在一年内
	if (formData.endtime) {
		const timeRange = 1 * 24 * 60 * 60 * 1000; // 1天时间戳
		const minTime = new Date(formData.endtime).getTime() - timeRange * 365;
		return DateTime.getTime() > new Date(formData.endtime).getTime() || DateTime.getTime() < minTime;
	}
};

const endtimeDisabledDate = DateTime => {
	//如果有开始日期，那么结束日期要大于开始日期， 而且日期范围在一年内
	if (formData.begintime) {
		const timeRange = 1 * 24 * 60 * 60 * 1000; // 1天时间戳
		const maxTime = new Date(formData.begintime).getTime() + timeRange * 365;
		return DateTime.getTime() < new Date(formData.begintime).getTime() - timeRange || DateTime.getTime() > maxTime;
	}
};

//数据源处理
const dataSourceProcessing = data => {
	console.log(data);
	for (let key in data.configInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.configInfo[0][key];
	}
};
//根据 contractid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/attained/config!selectConfigInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				configInfo: {
					attainedid: formData.attainedid
				}
			})
		})
	);
	if (res) {
		dataSourceProcessing(res);
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/attained/config!insertConfigInfo.action";
			if (formData.attainedid) {
				srtUrl = "/crm/attained/config!updateConfigInfo.action";
			}
			let jsonString = {
				configInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				dataSourceProcessing(res);
				props.condobj.success = true;
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/config_detail.vue_zTable1",
	//当前表格是否可编辑
	edit: props?.condobj?.workflowflag == "1" ? true : false,
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/attained/grade!selectGradeInfoByCond.action",
		root: "gradeInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "区间下限",
			label: "panelcolumnintervallowerlimit_hkd",
			prop: "endnum",
			type: "Number",
			width: "160",
			min: 0,
			precision: 2,
			edit: true
		},
		{
			title: "区间上限",
			label: "panelcolumnintervalupperlimit_hkd",
			prop: "startnum",
			type: "Number",
			width: "160",
			min: 0,
			precision: 2,
			edit: true
		},
		{
			title: "达标奖金",
			label: "panelcolumnstandardbonus_hkd",
			prop: "monthmoney",
			type: "Number",
			width: "160",
			min: 0,
			precision: 2,
			edit: true
		},
		{
			title: "制单人编码",
			label: "itemtitlebase_i18nrecordercode",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "制单人名称",
			label: "itemtitlebase_i18nrecorderdesc",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "制单时间",
			label: "itemtitlecommomrecordtime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "主键",
			label: "",
			prop: "gradeid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "关联ID",
			label: "",
			prop: "attainedid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//添加
const AddComprehensive = () => {
	tableList1.httpAttribute.baseParams["cond.attainedid"] = formData.attainedid;
	zTable1.value.addRowData({ attainedid: formData.attainedid, endnum: 0, startnum: 0, monthmoney: 0 });
};
//删除
const delComprehensive = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			gradeInfos: []
		};
		ids.forEach(item => {
			jsonString.gradeInfos.push({
				gradeid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/attained/grade!deleteGradeInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//保存
const save_gradeInfos = async () => {
	let EditSelectList = zTable1.value.getEditSelectList(); //获取编辑后的数据行
	if (EditSelectList.length > 0) {
		let jsonString1 = {
			gradeInfos: EditSelectList
		};
		let params1 = {
			jsonString: JSON.stringify(jsonString1)
		};
		const res1 = await http.post("/crm/attained/grade!saveGradeInfo.action", qs.stringify(params1));
		if (res1) {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			zTable1.value.getTableList();
		}
	}
};

onMounted(() => {
	if (formData.attainedid) {
		getFormData();
		tableList1.httpAttribute.baseParams["cond.attainedid"] = formData.attainedid;
		zTable1.value.getTableList();
	}
});
</script>

<style scoped lang="scss"></style>
