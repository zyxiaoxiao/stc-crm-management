<template>
	<div class="all-height flex-column">
		<el-form style="margin: 15px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="6">
					<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
						<el-input type="text" v-model.trim="formData.corpno" readonly />
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')">
						<el-input type="text" v-model.trim="formData.corpdesc" readonly />
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')">
						<el-input type="text" v-model.trim="formData.corpphone" readonly />
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')">
						<el-input type="text" v-model="formData.corpemail" readonly />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="6">
					<el-form-item title1="归属级别" :label="$t('columnlevelattribution')">
						<el-select v-model="formData.deptlevel" class="full-width-input" disabled>
							<el-option v-for="item in deptlevel" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="PKM 客户区域" :label="$t('customerapplicationinvoice_format')">
						<el-select
							v-model="formData.invoiceformat"
							class="full-width-input"
							clearable
							filterable
							:disabled="props.condobj.readonly ? true : false"
						>
							<el-option v-for="item in invoiceformat" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-divider />
		<zTable ref="zTable1" :tableList="tableList1" style="overflow: auto">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="ZoomIn" plain @click="selectDepartment">{{
					$t("view_multiSelectDepartment")
				}}</el-button>
				<el-button size="small" type="primary" icon="ZoomIn" plain @click="batchbg_handler">{{
					$t("menu_selectuser")
				}}</el-button>
				<el-button
					size="small"
					type="danger"
					icon="Delete"
					plain
					:disabled="!scope.isSelected"
					@click="delete_handler(scope.selectList)"
					>{{ $t("menu_delete") }}</el-button
				>
				<el-button size="small" type="success" icon="Select" plain @click="submit_handler(scope.selectList)">{{
					$t("menu_submit")
				}}</el-button>
			</template>
		</zTable>

		<!-- 选择部门 -->
		<ZDialog
			v-if="selectDistributionCorpList.dialogShow"
			v-model="selectDistributionCorpList.dialogShow"
			:title="$t('corpinfopaneldepartmentdesctitle')"
			width="40%"
			@close="selectDistributionCorpClose"
		>
			<selectDistributionCorp :condobj="selectDistributionCorpList" />
		</ZDialog>

		<!-- 编辑 批量修改 -->
		<ZDialog
			v-if="batchDeptanduserList.dialogShow"
			v-model="batchDeptanduserList.dialogShow"
			width="85%"
			@close="batchDeptanduserClose"
			customclass="selectbatchdeptanduserClass"
		>
			<selectbatchdeptanduser :condobj="batchDeptanduserList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { useI18n } from "vue-i18n";
import selectDistributionCorp from "../customerSelete/selectDistributionCorpnew.vue";
import selectbatchdeptanduser from "./select_batch_deptanduser.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const invoiceformat = getdropSownSelection("crminvoice_format");
//是否
const whetherAr = getdropSownSelection("whether");
//归属级别
let deptlevel = [
	{
		label: "tltilecolumndeptlevelbloc",
		value: "bloc"
	},
	{
		label: "tltilecolumndeptlevelbranch",
		value: "branch"
	},
	{
		label: "tltilecolumndeptlevelordinary",
		value: "ordinary"
	}
];
//归属类型
let newcustomtype = [
	{
		label: "i18nCustomerapplicationsecustomer",
		value: "SE"
	},
	{
		label: "itemtitlenewcustomtype0",
		value: "CSO"
	}
];
const formData = reactive({
	id: props.condobj.id,
	corpid: ""
});

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerManagement/customer_distribution_detail.vue_zTable1",
	//表格工具栏
	tableToolbar: {
		whole: props.condobj.readonly ? false : true
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/user/user!selectBGUserInfo.action",
		root: "userInfoMaps",
		baseParams: { "cond.edid": formData.id }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "用户ID",
			label: "",
			prop: "userid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "主表id",
			label: "",
			prop: "edid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "变更企业id",
			label: "",
			prop: "enterpriseid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "单位编码",
			label: "itemtitlegroupcorpcode",
			prop: "corpcode",
			type: "Input",
			width: "230"
		},
		{
			title: "所属单位",
			label: "itemtitlegroupcorpname",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "归属类型",
			label: "itemtitleAttributiontype",
			prop: "newcustomtype",
			type: "Select",
			typeData: newcustomtype,
			width: "160"
		},
		{
			title: "用户编码",
			label: "usergrouppanel_usercolumnusercodetitle",
			prop: "usercode",
			type: "Input",
			width: "160"
		},
		{
			title: "用户名称",
			label: "columnUsernametitle",
			prop: "userdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "SE佣金点",
			label: "itemtitlefoldersbrokerage",
			prop: "brokerage",
			type: "Input",
			width: "200"
		},
		{
			title: "佣金点锁定",
			label: "itemtitlefoldersbrokeragelock",
			prop: "brokeragelock",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "是否锁定",
			label: "itemtitlebase_userlockflag",
			prop: "lockflag",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

//选择部门 弹出参数
const selectDistributionCorpList = reactive({
	dialogShow: false,
	arrayList: []
});

//选择部门 弹出
const selectDepartment = () => {
	selectDistributionCorpList.dialogShow = true;
	selectDistributionCorpList.arrayList = [];
};
//选择部门 回调
const selectDistributionCorpClose = async () => {
	let arrayList = selectDistributionCorpList.arrayList;
	if (arrayList.length > 0) {
		let corpcodes = "";
		for (let row of arrayList) {
			corpcodes += "'" + row.corpcode + "',";
		}
		corpcodes = corpcodes.substring(0, corpcodes.length - 1);
		if (formData.corpid && formData.id) {
			let params = {
				jsonString: JSON.stringify({ cond: { corpcodes: corpcodes, corpid: formData.corpid, edid: formData.id, newcorp: "Y" } })
			};
			const res = await http.post("/crm/distribution/distribution!saveDistributionUserAndCorp.action", qs.stringify(params));
			if (res) {
				ElMessage({
					type: "success",
					message: i18n.t("Message_OperationSuccess")
				});
				zTable1.value.getTableList();
			}
		} else {
			//如果没有获取到客户id和分配主表id就提示
			ElMessage.warning(i18n.t("Message_nofound"));
			return;
		}
	}
};

//选择用户 弹出层 参数
const batchDeptanduserList = reactive({
	dialogShow: false,
	ids: [],
	vShow: false,
	success: false
});

//选择用户
const batchbg_handler = () => {
	batchDeptanduserList.dialogShow = true;
	batchDeptanduserList.ids = [formData.id];
	batchDeptanduserList.success = false;
};

//选择用户 成功回调
const batchDeptanduserClose = () => {
	if (batchDeptanduserList.success) {
		zTable1.value.getTableList();
	}
};

//删除
const delete_handler = selectList => {
	for (let row of selectList) {
		if (row.lockflag == "1") {
			ElMessage.warning(i18n.t("Message_NodeleteTheLockedData"));
			return;
		}
	}

	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ userInfoMaps: selectList })
		};
		const res = await http.post("/crm/distribution/distribution!deleteDistributionUser.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//提交
const submit_handler = () => {
	const distributionInfos = [formData];
	let pkm_run = false;
	let invoiceformat = formData.invoiceformat ? formData.invoiceformat : "0";
	for (let row of tableList1.tableData) {
		if (row.corpcode == "061155") {
			pkm_run = true;
		}
	}

	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let success = true;
		if (pkm_run) {
			try {
				const res = await http.post(
					"/crm/distribution/distribution!updateDistributionByInvoiceformat.action",
					qs.stringify({ jsonString: JSON.stringify({ cond: { id: formData.id, invoiceformat: invoiceformat } }) })
				);
			} catch (error) {
				success = false;
			}
		}
		if (success) {
			const res = await http.post(
				"/crm/distribution/distribution!submitDistribution.action",
				qs.stringify({ jsonString: JSON.stringify({ distributionInfos: distributionInfos }) })
			);
			if (res) {
				ElMessage.success(i18n.t("Message_OperationSuccess"));
				props.condobj.success = true;
				props.condobj.dialogShow = false;
			}
		}
	});
};

//根据 id 初始化数据源
const getFormData = async () => {
	let params = {
		jsonString: JSON.stringify({
			distributionInfo: {
				id: formData.id
			}
		})
	};
	const res = await http.post("/crm/distribution/distribution!selectDistributionInfoId.action", qs.stringify(params));
	for (let key in res.distributionInfo[0]) {
		formData[key] = res.distributionInfo[0][key];
	}
};
onMounted(() => {
	getFormData();
	zTable1.value.getTableList();
});
</script>
