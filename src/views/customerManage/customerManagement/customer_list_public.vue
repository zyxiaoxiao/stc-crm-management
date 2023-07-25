<template>
	<div class="all-height flex-column main-card" style="padding: 10px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
			<template #tableHeaderLleft="scope">
				<el-button
					size="small"
					type="success"
					icon="Switch"
					plain
					:disabled="!scope.isSelected"
					@click="convertingToMyCustomer(scope.ids)"
					>{{ $t("menu_convertingToMyCustomer") }}</el-button
				>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="Edit" @click="editTrackingRecord(scope.row)">
					{{ $t("corpinfoTrackrecordtitle") }}
				</el-button>
			</template>
		</zTable>

		<ZDialog v-model="custInfoUser.dialogShow" title="" width="95%">
			<custInfouserpublic :condobj="custInfoUser" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import custInfouserpublic from "./custInfo_user_public.vue";

const i18n = useI18n();

const customerCustomertype = getdropSownSelection("customer_customertype");
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

// 打开客户信息弹出层参数
const custInfoUser = reactive({
	dialogShow: false,
	corpid: "",
	tableTabsValue: 0
});

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerManagement/customer_list_public.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCorpPublicList.action",
		root: "enterpriseInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "旧客户号",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
			type: "Input",
			width: "160"
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
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "160"
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
			title: "protection",
			label: "",
			prop: "protection",
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
			title: "变更id",
			label: "corpinfopanelqyidtitle",
			prop: "corpbgid",
			type: "Input",
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

//链接详细信息
const linkDetailbg = (column, row) => {
	custInfoUser.corpid = row.corpid;
	custInfoUser.tableTabsValue = 0;
	custInfoUser.dialogShow = true;
};

//追踪记录
const editTrackingRecord = row => {
	custInfoUser.corpid = row.corpid;
	custInfoUser.tableTabsValue = 8;
	custInfoUser.dialogShow = true;
};

//转为我的客户
const convertingToMyCustomer = ids => {
	ElMessageBox.confirm(i18n.t("Message_ConfirmOperation"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ corpids: ids })
		};
		const res = await http.post(
			"/mylims/enterpriseinfo/enterpriseinfo!updateConvertingToMyCustomer.action",
			qs.stringify(params)
		);
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
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
