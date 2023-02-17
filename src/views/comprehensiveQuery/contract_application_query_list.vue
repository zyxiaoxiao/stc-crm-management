<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbgQuery"> </zTable>

		<!-- 新增弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="contractdetailList.dialogShow" width="95%" @close="contractdetailClose">
				<contractdetail :condobj="contractdetailList"></contractdetail>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "@/components/ZTable/index.vue";
import ZDialog from "@/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import contractdetail from "../agreementManagement/agreementPriceManagement/agreement_price_detail.vue";

//是否
const whetherAr = getdropSownSelection("whether");

//表格表头
let tableColumns1 = reactive([
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
		width: "200"
	},
	{
		title: "部门名称",
		label: "appointmentDepartment_name",
		prop: "dept",
		type: "Input",
		width: "160"
	},
	{
		title: "版本号",
		label: "itemtitlecountryruleversion",
		prop: "version",
		type: "Input",
		width: "160"
	},
	{
		title: "总体折扣",
		label: "itemtitlebase_userisdiscount",
		prop: "isdiscount",
		type: "Select",
		typeData: whetherAr,
		width: "160"
	},
	{
		title: "折扣率",
		label: "columnappointmentdiscount",
		prop: "discounts",
		type: "Input",
		width: "160"
	},
	{
		title: "开始时间",
		label: "itemtitlelog_messagebegintime",
		prop: "begintime",
		type: "Date",
		width: "160"
	},
	{
		title: "结束时间",
		label: "itemtitlelog_messageendtime",
		prop: "endtime",
		type: "Date",
		width: "160"
	},
	{
		title: "备注",
		label: "panelcolumnRemark",
		prop: "remark",
		type: "Input"
	},

	{
		title: "创建人名称",
		label: "testiteminforecordernamepanel",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "创建日期",
		label: "testiteminforecordtimepanel",
		prop: "recordtime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "客户主键",
		label: "",
		prop: "corpid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "id",
		label: "",
		prop: "contractid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "协议类型",
		label: "",
		prop: "contracttype",
		type: "Input",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/comprehensiveQuery/contract_application_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/contract/contract!selectApplicationContractInfoByCondRights.action",
		root: "contractInfos",
		baseParams: { "cond.auditflag": "0", "cond.contracttype": "1" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const contractdetailList = reactive({
	success: false,
	dialogShow: false,
	contractid: "",
	workflowflag: "3"
});

// 新增 弹出 回调
const contractdetailClose = () => {
	if (contractdetailList.success) {
		zTable1.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	contractdetailList.contractid = row.contractid;
	contractdetailList.workflowflag = "3";
	contractdetailList.success = false;
	contractdetailList.dialogShow = true;
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
