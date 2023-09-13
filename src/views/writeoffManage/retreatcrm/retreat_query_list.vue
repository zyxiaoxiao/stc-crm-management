<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('columndrawbackrefuninformation')"
				title1="退款信息"
				name="retreatInfos"
			>
				<zTable ref="grid_retreatInfos" :tableList="rtableList" @link-detailbg="linkDetail" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="success" icon="Check" plain @click="newRetreatInfo()">{{ $t("SRM_add") }}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							:disabled="!scope.isSelected"
							plain
							@click="deleteRetreatInfo(scope.selectList)"
							>{{ $t("SRM_delete") }}</el-button
						>
						<el-button
							size="small"
							type="success"
							icon="Check"
							:disabled="!scope.isSelected"
							plain
							@click="submitRetreatInfo(scope.selectList)"
							>{{ $t("SRM_submit") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('columndrawbackrefundapplication')"
				title1="退款申请查询"
				name="queryretreatInfos"
			>
				<zTable
					ref="grid_retreatInfos1"
					:tableList="qtableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_invoicedetailNew" width="95%">
			<invoiceDetailReadOnly :condobj="condobj"></invoiceDetailReadOnly>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_retreatdetail" @close="closeretreatdetail" width="95%">
			<retreatdetail :condobj="condobj"></retreatdetail>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
//弹出报错或者提示框
import { ElMessage } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import invoiceDetailReadOnly from "@/views/writeoffManage/writeoff_dgbj/invoice_detail_readonly.vue";
import retreatdetail from "@/views/writeoffManage/retreatcrm/retreat_detail.vue";
const i18n = useI18n();
const grid_retreatInfos = ref(); //退款信息页面
const grid_retreatInfos1 = ref(); //退款申请查询页面
const tableTabsValue = ref("retreatInfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_RETREAT",
	columnid: "retreatid"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});

//新增退回申请
const newRetreatInfo = () => {
	condobj.cond = {
		html: "dialogShow_retreatdetail",
		appflag: "true"
	};
	condobj.dialogShow_retreatdetail = true;
};

//删除退款信息
let deleteRetreatInfo = async selectList => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("alertselectYourFirstToOperateOnline"));
		return;
	}
	let params = {
		jsonString: JSON.stringify({ retreatInfos: selectList })
	};
	const res = await http.post("/crm/retreat/retreat!deleteRetreatInfo.action", qs.stringify(params));
	if (res) {
		//刷新数据(退款信息)
		grid_retreatInfos.value.getTableList();
	}
};

//提交退款信息
let submitRetreatInfo = async selectList => {
	let params = {
		jsonString: JSON.stringify({ retreatInfos: selectList })
	};
	const res = await http.post("/crm/retreat/retreat!submit.action", qs.stringify(params));
	if (res) {
		//刷新数据(退款信息)
		grid_retreatInfos.value.getTableList();
	}
};
//销账信息页面关闭
const closeretreatdetail = () => {
	if (condobj.cond && condobj.cond.html == "dialogShow_retreatdetail") {
		grid_retreatInfos.value.getTableList();
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_retreatInfos.value.getTableList();
});

//表格对象销账申请
const rtableList = reactive({
	id: "/writeoffManage/retreatcrm/retreat_query_list.vue_grid_retreatInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/retreat/retreat!selectRetreatInfoByCond.action",
		root: "retreatInfos",
		baseParams: {
			"cond.auditflag": "0"
		}
	},
	//快捷查询
	tablePropSearch: {},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "retreatid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "60"
		},
		{
			title: "退款单号",
			label: "columndrawbackrefundnum",
			prop: "retreatcode",
			type: "Link",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcustomercode",
			prop: "corpno",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "retreatmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "外币退款金额",
			label: "columnbillcurrencycurrencyretreatmoney",
			prop: "currencyretreatmoney",
			type: "Input",
			width: "150"
		},
		{
			title: "退款原因",
			label: "columndrawbackrefundreason",
			prop: "remark",
			type: "Input",
			width: "140"
		},
		{
			title: "退款时间",
			label: "columndrawbackrefundtime",
			prop: "retreatdate",
			type: "Input",
			width: "150"
		},
		{
			title: "退款操作人",
			label: "columndrawbackrefunperson",
			prop: "recorderdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "",
			prop: "retreatid",
			width: "10",
			isHide: true
		},
		{
			title: "客户id",
			label: "",
			prop: "corpid",
			width: "10",
			isHide: true
		},
		{
			title: "到账信息id",
			label: "",
			prop: "billid",
			width: "10",
			isHide: true
		},
		{
			title: "创建时间",
			label: "",
			prop: "recordtime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "auditorcode",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "auditordesc",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "audittime",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "auditlevel",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "retrieveflag",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "retrievercode",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "retrieverdesc",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "retrievetime",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "recordercorp",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "auditlevelname",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "errormsg",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "submittime",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "工作流ID",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "数据状态",
			label: "",
			prop: "status",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象销账查询
const qtableList = reactive({
	id: "/writeoffManage/retreatcrm/retreat_query_list.vue_grid_retreatInfos1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/retreat/retreat!selectRetreatInfoByCondRight.action",
		root: "retreatInfos",
		baseParams: {
			"cond.auditflag": "0"
		}
	},
	//快捷查询
	tablePropSearch: {},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "retreatid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "60"
		},
		{
			title: "退款单号",
			label: "columndrawbackrefundnum",
			prop: "retreatcode",
			type: "Link",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcustomercode",
			prop: "corpno",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "retreatmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "外币退款金额",
			label: "columnbillcurrencycurrencyretreatmoney",
			prop: "currencyretreatmoney",
			type: "Input",
			width: "150"
		},
		{
			title: "退款原因",
			label: "columndrawbackrefundreason",
			prop: "remark",
			type: "Input",
			width: "140"
		},
		{
			title: "退款时间",
			label: "columndrawbackrefundtime",
			prop: "retreatdate",
			type: "Input",
			width: "150"
		},
		{
			title: "退款操作人",
			label: "columndrawbackrefunperson",
			prop: "recorderdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "",
			prop: "retreatid",
			width: "10",
			isHide: true
		},
		{
			title: "客户id",
			label: "",
			prop: "corpid",
			width: "10",
			isHide: true
		},
		{
			title: "到账信息id",
			label: "",
			prop: "billid",
			width: "10",
			isHide: true
		},
		{
			title: "创建时间",
			label: "",
			prop: "recordtime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "auditorcode",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "auditordesc",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "audittime",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "auditlevel",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "retrieveflag",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "retrievercode",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "retrieverdesc",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "retrievetime",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "recordercorp",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "auditlevelname",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "errormsg",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "submittime",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "工作流ID",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "数据状态",
			label: "",
			prop: "status",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

// 显示dialogdialogShow_FormVisibleNew
const dialogShow = data => {
	if (data == "dialogShow_invoicedetailNew") {
		condobj.cond = {
			newInvoice: "Y"
		};
		condobj.dialogShow_invoicedetailNew = true;
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "retreatcode" && row.retreatid) {
		if (row.retreatid) {
			condobj.cond = {
				retreatid: row.retreatid,
				html: "dialogShow_retreatdetail",
				appflag: "true"
			};
			condobj.dialogShow_retreatdetail = true;
		}
	}
};
//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "retreatcode" && row.retreatid) {
		if (row.retreatid) {
			condobj.cond = {
				retreatid: row.retreatid,
				readonly: "true"
			};
			condobj.dialogShow_retreatdetail = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "retreatInfos") {
		//销账申请信息查询页面
		grid_retreatInfos.value.getTableList();
	} else if (targetName == "queryretreatInfos") {
		//税票信息查询页面
		grid_retreatInfos1.value.getTableList();
	}
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
