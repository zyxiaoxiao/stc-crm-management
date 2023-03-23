<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitlewriteoffsBackQuery')"
				title1="销账退回查询"
				name="querywriteoffInfos"
			>
				<zTable
					ref="grid_writeoffInfosquery"
					:tableList="qtableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="writeoffInfosBack(scope.selectList)"
							>{{ $t("menu_goback") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_writeoffbatchdetailReadOnly" width="95%">
				<writeoffbatchdetailReadOnly :condobj="condobj"></writeoffbatchdetailReadOnly>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
//弹出报错或者提示框
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import writeoffbatchdetailReadOnly from "@/views/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue";
const i18n = useI18n();
const grid_writeoffInfosquery = ref(); //销账查询页面
const tableTabsValue = ref("querywriteoffInfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_WRITEOFF",
	columnid: "writeoffid"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});

//销账退回
const writeoffInfosBack = async selectList => {
	ElMessageBox.confirm(i18n.t("Message_BackYesNo"), i18n.t("Message_OperationTip"), {
		confirmButtonText: i18n.t("Message_Yes"),
		cancelButtonText: i18n.t("Message_No"),
		type: "warning",
		draggable: true
	})
		.then(async () => {
			let jsonString = {
				writeoffInfos: selectList
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post("/crm/writeoff/writeoff!backWriteoffInfos.action", qs.stringify(params));
			if (res) {
				if (res.msg) {
					let msg = res.msg;
					if (msg.indexOf("fail1") >= 0) {
						ElMessage.warning(i18n.t("Message_WriteoffBackFailforBillInfo"));
						return;
					} else if (msg.indexOf("fail2") >= 0) {
						ElMessage.warning(i18n.t("Message_WriteoffBackFailforInvoiceInfo"));
						return;
					} else if (msg.indexOf("fail3") >= 0) {
						ElMessage.warning(i18n.t("Message_WriteoffBackFailforFolderInfo"));
						return;
					}
				}
                grid_writeoffInfosquery.value.getTableList(); //刷新销账退回
			}
		})
		.catch(() => {});
};


//页面初始化渲染完成执行
onMounted(() => {
	grid_writeoffInfosquery.value.getTableList();
});

const formData1 = reactive({});

//表格对象销账查询
const qtableList = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_back_list.vue_grid_writeoffInfosquery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoff/writeoff!selectWriteoffInfoByCond.action",
		root: "writeoffInfos",
		baseParams: {
			"cond.auditflag": "2",
			"cond.queryall": "all"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "60"
		},
		{
			title: "销账单号",
			label: "columnwriteoff_application_listwriteoffNo",
			prop: "writeoffcode",
			type: "Link",
			width: "160"
		},
		{
			title: "本次外币可冲销金额",
			label: "columncurrencywriteoff_application_listCanWriteOffsdetail",
			prop: "currencywriteoffmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "本次外币冲销总金额",
			label: "columncurrencywriteoff_application_listTotalAmountdetail",
			prop: "currencytotalmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmount",
			prop: "totalmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "writeoffmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Input",
			width: "150"
		},
		{
			title: "分公司+批次",
			label: "brachbatchno",
			prop: "brachbatchno",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "columnCreatehumandescription",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "writeoffid",
			prop: "writeoffid",
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
		}
	],
	// 表格数据
	tableData: []
});

// 显示dialogdialogShow_FormVisibleNew
const dialogShow = data => {
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "writeoffcode" && row.writeoffid) {
		if (row.writeoffid) {
			condobj.cond = {
				writeoffid: row.writeoffid,
				corpid: row.corpid
			};
			condobj.dialogShow_writeoffbatchdetailReadOnly = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
