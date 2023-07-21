<template>
	<div class="all-height flex-column main-card" style="padding: 10px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Search" plain @click="customerQuery">{{ $t("menu_select") }}</el-button>
				<el-button size="small" type="primary" icon="Edit" plain @click="new_handler">{{ $t("menu_new") }}</el-button>
				<el-button
					size="small"
					type="danger"
					icon="Delete"
					plain
					:disabled="!scope.isSelected"
					@click="batchDelete(scope.ids, scope.selectList)"
					>{{ $t("menu_delete") }}</el-button
				>
				<el-button
					size="small"
					type="success"
					icon="Switch"
					plain
					:disabled="!scope.isSelected"
					@click="convertToRegularCustomer_handler(scope.selectList)"
					>{{ $t("menu_convertToRegularCustomer") }}</el-button
				>
				<el-button
					size="small"
					type="danger"
					icon="WarnTriangleFilled"
					plain
					:disabled="!scope.isSelected"
					@click="abandoned_handler(scope.selectList)"
					>{{ $t("menu_abandoned") }}</el-button
				>
				<el-button
					size="small"
					type="success"
					icon="CircleCheckFilled"
					plain
					:disabled="!scope.isSelected"
					@click="enable_handler(scope.selectList)"
					>{{ $t("menu_enable") }}</el-button
				>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="Edit" @click="editTrackingRecord(scope.row)">
					{{ $t("corpinfoTrackrecordtitle") }}
				</el-button>
			</template>
		</zTable>
		<!-- 查询客户 -->
		<ZDialog v-if="customerList.dialogShow" v-model="customerList.dialogShow" :title="$t('corpinfopanelckxxcxtitle')" width="95%">
			<customerListQuery :condobj="customerList"></customerListQuery>
		</ZDialog>

		<!-- 详细信息 -->
		<ZDialog
			v-if="potentialclientdetailList.dialogShow"
			v-model="potentialclientdetailList.dialogShow"
			title=""
			width="95%"
			@close="potentialclientdetailClose"
		>
			<potentialclientdetail :condobj="potentialclientdetailList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import moment from "moment";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import potentialclientdetail from "./potentialclient_detail.vue";
import customerListQuery from "../customerQuery/customer_list_query.vue";

const i18n = useI18n();

const customerCustomertype = getdropSownSelection("customer_customertype");
const state = getdropSownSelection("itemtitlebase_userState");

//客户查询
const customerList = reactive({
	dialogShow: false
});
//打开客户查询
const customerQuery = () => {
	customerList.dialogShow = true;
};

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/potentialclient/potentialclient!selectCorpListByCond.action",
		root: "potentialclientInfos",
		baseParams: {
			"cond.auditflag": "0"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Link",
			width: "160"
		},
		{
			title: "客户类别",
			label: "corpinfopanelkhlbtitle",
			prop: "corptype",
			type: "Select",
			width: "185",
			typeData: customerCustomertype
		},
		{
			title: "状态",
			label: "corpinfopanelzttitle",
			prop: "state",
			type: "Select",
			typeData: state,
			width: "160"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "corpemail",
			type: "Input",
			width: "160"
		},
		{
			title: "归属分公司",
			label: "corpinfoSubordinateToBranchtitle",
			prop: "branchcorpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "所属SE",
			label: "columnbaseblongtose",
			prop: "salesmandesc",
			type: "Input",
			width: "200"
		},
		{
			title: "电话",
			label: "itemtitlebase_usertel",
			prop: "corpphone",
			type: "Input",
			width: "160"
		},

		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理提佣点(%)",
			label: "itemtitlefoldersagentbrokerage",
			prop: "agentbrokerage",
			type: "Number",
			width: "208"
		},
		{
			title: "创建人",
			label: "corpinfopanelcjrtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "营业执照有效期至",
			label: "corpinfopanelyyzzyxqztitle",
			prop: "licensedate",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "id",
			label: "",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},

		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

// 打开详细信息弹出层参数
const potentialclientdetailList = reactive({
	dialogShow: false,
	success: false,
	corpid: "",
	tableTabsValue: 0
});

// 新增潜在客户
const new_handler = () => {
	potentialclientdetailList.corpid = "";
	potentialclientdetailList.tableTabsValue = 0;
	potentialclientdetailList.success = false;
	potentialclientdetailList.dialogShow = true;
};

//批量删除数据
const batchDelete = (ids, selectList) => {
	for (let item of selectList) {
		let currentDate = moment().format("YYYY-MM-DD");
		let oldDate = moment(new Date(item.recordtime)).format("YYYY-MM-DD");
		//不能删除今天之前的记录！
		if (currentDate != oldDate) {
			ElMessage.warning(i18n.t("message_error01"));
			return;
		}
	}

	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			potentialclientInfos: []
		};
		ids.forEach(item => {
			jsonString.potentialclientInfos.push({
				corpid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/potentialclient/potentialclient!deletePotentialclientInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//转为正式客户
const convertToRegularCustomer_handler = selectList => {
	for (let row of selectList) {
		if (row.state == "2") {
			ElMessage.warning(row.corpdesc + i18n.t("message_error_customers2"));
			return;
		} else if (row.state == "1" || row.state == "3") {
			ElMessage.warning(row.corpdesc + i18n.t("message_error_customers1"));
			return;
		}
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmToConvert"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/crm/potentialclient/potentialclient!convertToEnterpriseInfo.action",
			qs.stringify({ jsonString: JSON.stringify({ potentialclientInfos: selectList }) })
		);
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//废弃
const abandoned_handler = selectList => {
	let listData = [];
	for (let row of selectList) {
		if (row.state == "2") {
			ElMessage.warning(row.corpdesc + i18n.t("message_error_customers3"));
			return;
		} else if (row.state == "1" || row.state == "3") {
			ElMessage.warning(row.corpdesc + i18n.t("message_error_customers4"));
			return;
		} else {
			let obj = {};
			for (let key in row) {
				obj[key] = row[key];
			}
			obj.state = "2";
			listData.push(obj);
		}
	}

	ElMessageBox.confirm(i18n.t("Message_AbandonedYesNo"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/crm/potentialclient/potentialclient!updatePotentialclientInfos.action",
			qs.stringify({ jsonString: JSON.stringify({ potentialclientInfos: listData }) })
		);
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//启用
const enable_handler = selectList => {
	let listData = [];
	for (let row of selectList) {
		if (row.state == "1" || row.state == "3") {
			ElMessage.warning(row.corpdesc + i18n.t("messageEnabledError"));
		} else if (row.state == "0") {
			ElMessage.warning(row.corpdesc + i18n.t("message_error_customers5"));
			return;
		} else {
			let obj = {};
			for (let key in row) {
				obj[key] = row[key];
			}
			obj.state = "0";
			listData.push(obj);
		}
	}
	ElMessageBox.confirm(i18n.t("Message_Enabled"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/crm/potentialclient/potentialclient!updatePotentialclientInfos.action",
			qs.stringify({ jsonString: JSON.stringify({ potentialclientInfos: listData }) })
		);
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	potentialclientdetailList.corpid = row.corpid;
	potentialclientdetailList.tableTabsValue = 0;
	potentialclientdetailList.success = false;
	potentialclientdetailList.dialogShow = true;
};

//追踪记录
const editTrackingRecord = row => {
	potentialclientdetailList.corpid = row.corpid;
	potentialclientdetailList.tableTabsValue = 6;
	potentialclientdetailList.success = false;
	potentialclientdetailList.dialogShow = true;
};

//详细信息 回调 成功执行
const potentialclientdetailClose = () => {
	if (potentialclientdetailList.success) {
		zTable1.value.getTableList();
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
<style lang="scss"></style>
