<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg"> </zTable>
		<div v-dialogStretching>
			<ZDialog v-model="custInfoUser.dialogShow" title="" width="95%">
				<custInfouser :condobj="custInfoUser" />
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import custInfouser from "../customerManage/customerManagement/custInfo_user_public.vue";

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
	id: "/comprehensiveQuery/enterpriselock_list_query.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCustomerForMyCustomer.action",
		root: "enterpriseInfos",
		baseParams: { "cond.lockflag": "1" }
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
			title: "归属级别",
			label: "columnlevelattribution",
			prop: "deptlevel",
			type: "Select",
			width: "185",
			typeData: deptlevel
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
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "corpemail",
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
			title: "id",
			label: "",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
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
