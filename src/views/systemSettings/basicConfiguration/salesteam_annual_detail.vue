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
					<el-form-item title1="小组编码" :label="$t('itemtitlegroupgroupcode')">
						<el-input v-model="formData.groupcode" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="小组名称" :label="$t('itemtitlegroupgroupnname')" prop="groupdesc">
						<el-input v-model.trim="formData.groupdesc" readonly :disabled="formDisabledList.groupdesc">
							<template #append>
								<el-button-group class="flex-row">
									<el-button :disabled="formDisabledList.groupdesc" @click="selectGroupdesc" icon="ZoomIn" />
									<el-button :disabled="formDisabledList.groupdesc" @click="delGroupdesc" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="年度任务总额" :label="$t('panelcolumntotaltaskwell_hkd')">
						<el-input v-model="formData.taskwell" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="组长工号" :label="$t('itemtitlegroupgroupnname')" prop="headmancode">
						<el-input v-model.trim="formData.headmancode" readonly :disabled="formDisabledList.headmancode">
							<template #append>
								<el-button-group class="flex-row">
									<el-button :disabled="formDisabledList.headmancode" @click="selectHeadmancode" icon="ZoomIn" />
									<el-button :disabled="formDisabledList.headmancode" @click="delHeadmancode" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="创建人编码" :label="$t('columnCreatehumancoding')">
						<el-input v-model.trim="formData.recordercode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建人名称" :label="$t('panelcolumncreaterdesc')">
						<el-input v-model.trim="formData.recorderdesc" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
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
				<el-button size="small" type="primary" icon="Edit" plain :disabled="!formData.groupid" @click="AddComprehensive">{{
					$t("menu_new")
				}}</el-button>
				<el-button size="small" type="primary" icon="Edit" plain :disabled="!formData.groupid" @click="addInBulk">{{
					$t("menu_addInBulk")
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
		<!-- 选择小组 -->
		<ZDialog v-model="groupList.dialogShow" :title="$t('tabtitlecoregroupgrouplist')" width="75%" @close="groupListClose">
			<group :condobj="groupList"></group>
		</ZDialog>

		<ZDialog
			v-model="selectheadmanList.dialogShow"
			:title="$t('messagecoreuserchooseuser')"
			width="75%"
			@close="selectheadmanClose"
		>
			<selectheadman :condobj="selectheadmanList"></selectheadman>
		</ZDialog>

		<el-dialog
			v-model="addInBulkList.dialogShow"
			:title="$t('columnbasemonth')"
			:append-to-body="true"
			:destroy-on-close="true"
			width="400px"
		>
			<el-form :model="addInBulkList" style="margin: 30px">
				<el-form-item title1="开始" :label="$t('Consign_startTime')">
					<el-date-picker v-model="addInBulkList.startMonth" type="month" format="YYYY-MM" value-format="YYYY-MM" />
				</el-form-item>

				<el-form-item title1="结束" :label="$t('Consign_endTime')">
					<el-date-picker v-model="addInBulkList.endMonth" type="month" format="YYYY-MM" value-format="YYYY-MM" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addInBulkList.dialogShow = false">{{ $t("menu_cancel") }}</el-button>
					<el-button type="primary" @click="addInBulk_save()" :disabled="!addInBulkList.startMonth || !addInBulkList.endMonth">
						{{ $t("menu_doBack") }}
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "@/components/ZDialog.vue";
import zTable from "@/components/ZTable/index.vue";
import group from "./group.vue";
import selectheadman from "./select_headman.vue";

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
			groupid: {
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
	groupid: props?.condobj?.groupid
});

const rules = reactive({
	years: [{ required: true, message: i18n.t("rulesPropMessage") }],
	groupdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	headmancode: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

//选择小组信息弹出参数
const groupList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择小组信息弹出
const selectGroupdesc = () => {
	groupList.dialogShow = true;
	groupList.arrayList = [];
};
//选择小组信息弹出  回调
const groupListClose = () => {
	let arrayList = groupList.arrayList;
	if (arrayList && arrayList.length > 0) {
		formData.groupcode = arrayList[0].groupid; //小组号
		formData.groupdesc = arrayList[0].groupdesc; //小组名称
	}
};
//清除选择的小组
const delGroupdesc = () => {
	formData.groupcode = ""; //小组号
	formData.groupdesc = ""; //小组名称
};

//选择组长信息弹出参数
const selectheadmanList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择组长信息弹出
const selectHeadmancode = () => {
	selectheadmanList.dialogShow = true;
	selectheadmanList.arrayList = [];
};
//选择组长信息弹出  回调
const selectheadmanClose = () => {
	let arrayList = selectheadmanList.arrayList;
	if (arrayList && arrayList.length > 0) {
		formData.headmancode = arrayList[0].usercode; //组长号
		formData.headmandesc = arrayList[0].userdesc; //组长名称
	}
};
//清除选择的小组
const delHeadmancode = () => {
	formData.headmancode = ""; //组长号
	formData.headmandesc = ""; //组长名称
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.salesTeamTaskInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.salesTeamTaskInfo[0][key];
	}
};
//根据 groupid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/core/user/groups!selectSalesTeamTaskInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				salesTeamTaskInfo: {
					groupid: formData.groupid
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
			let srtUrl = "/core/user/groups!insertSalesTeamTaskInfo.action";
			if (formData.groupid) {
				srtUrl = "/core/user/groups!updateSalesTeamTaskInfo.action";
			}
			let jsonString = {
				salesTeamTaskInfo: formData
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
	id: "/systemSettings/basicConfiguration/salesteam_annual_detail.vue_zTable1",
	//当前表格是否可编辑
	edit: props?.condobj?.workflowflag == "1" ? true : false,
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/user/groupsalestaskdetail!selectSalestaskdetailInfoByCond.action",
		root: "groupSalesTaskDetailInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "月份",
			label: "columnbasemonth",
			prop: "ttime",
			type: "Month",
			width: "160",
			edit: true
		},
		{
			title: "任务额",
			label: "panelcolumntaskwell_hkd",
			prop: "taskwell",
			type: "Number",
			width: "160",
			min: 0,
			precision: 2,
			edit: true
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordertime",
			type: "DateTime",
			width: "180"
		},
		{
			title: "主键",
			label: "",
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "关联ID",
			label: "",
			prop: "groupid",
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
	tableList1.httpAttribute.baseParams["cond.groupid"] = formData.groupid;
	zTable1.value.addRowData({ groupid: formData.groupid, taskwell: 0 });
};

//批量添加开始和结束参数
const addInBulkList = reactive({
	dialogShow: false,
	startMonth: null,
	endMonth: null
});

//批量添加
const addInBulk = () => {
	addInBulkList.dialogShow = true;
};
const addInBulk_save = async () => {
	if (addInBulkList.startMonth > addInBulkList.endMonth) {
		ElMessage.warning(i18n.t("message_righttime"));
		return false;
	}
	let jsonString1 = {
		cond: { groupid: formData.groupid, date_start: addInBulkList.startMonth + "-01", date_end: addInBulkList.endMonth + "-01" }
	};
	let params1 = {
		jsonString: JSON.stringify(jsonString1)
	};
	const res1 = await http.post(
		"/core/user/groupsalestaskdetail!saveGroupSalestaskdetailInfoWithBatch.action",
		qs.stringify(params1)
	);
	if (res1) {
		tableList1.httpAttribute.baseParams["cond.groupid"] = formData.groupid;
		zTable1.value.getTableList();
	}

	addInBulkList.dialogShow = false;
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
			groupSalesTaskDetailInfos: []
		};
		ids.forEach(item => {
			jsonString.groupSalesTaskDetailInfos.push({
				id: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/user/groupsalestaskdetail!deleteSalestaskdetailInfoByCond.action", qs.stringify(params));
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
		for (let obj of EditSelectList) {
			let ttime = obj.ttime;
			let taskwell = obj.taskwell;
			if (!ttime) {
				//月份不能为空
				ElMessage.warning(i18n.t("message_null_month"));
				return false;
			}
			if (!taskwell) {
				//任务额不能为空
				ElMessage.warning(i18n.t("message_null_taskwell"));
				return false;
			}
		}

		let v_months = "";
		let tableData = tableList1.tableData;
		for (let tableObj of tableData) {
			let ttime = tableObj.ttime;
			if (v_months.indexOf(ttime) >= 0) {
				//月份不能重复
				ElMessage.warning(i18n.t("message_repeated_month"));
				return false;
			} else {
				v_months = v_months + ttime + ";";
			}
		}

		let jsonString1 = {
			groupSalesTaskDetailInfos: EditSelectList
		};
		let params1 = {
			jsonString: JSON.stringify(jsonString1)
		};
		const res1 = await http.post(
			"/core/user/groupsalestaskdetail!saveSalestaskdetailInfo.action?groupid=" + formData.groupid,
			qs.stringify(params1)
		);
		if (res1) {
			zTable1.value.getTableList();
			save_handler(ruleFormRef.value);
		}
	}
};

//判断是否是数字,是就返回true
const isNumber = val => {
	return !isNaN(parseFloat(val)) && isFinite(val);
};

//监听
watch(
	() => tableList1.tableData,
	(newValue, oldValue) => {
		let taskwell = 0;
		for (let row of newValue) {
			taskwell = taskwell + row.taskwell;
		}
		formData.taskwell = taskwell;
	},
	{ deep: true } //深度监听
);

onMounted(() => {
	if (formData.groupid) {
		getFormData();
		tableList1.httpAttribute.baseParams["cond.groupid"] = formData.groupid;
		zTable1.value.getTableList();
	}
});
</script>

<style scoped lang="scss"></style>
