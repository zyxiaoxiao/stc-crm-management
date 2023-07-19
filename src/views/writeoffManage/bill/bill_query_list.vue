<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="billsinfos"
				:label="$t('billinfoaccountinformationtitle')"
				title1="到账信息"
			>
				<zTable ref="grid_billInfos" :tableList="billtableList" @link-detailbg="linkDetail" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="dialogShow('dialogShow_billdetailNew')">{{
							$t("SRM_add")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="billInfosDelete(scope.selectList)"
							>{{ $t("SRM_delete") }}</el-button
						>
						<el-button
							size="small"
							type="success"
							icon="Collection"
							:disabled="!scope.isSelected"
							plain
							@click="releaseBillInfos(scope.selectList)"
							>{{ $t("SRM_release") }}</el-button
						>
						<el-button size="small" type="primary" icon="UploadFilled" plain @click="excelUploadFilled('0')">{{
							$t("menu_importbill")
						}}</el-button>
						<el-button size="small" type="primary" icon="Download" @click="dialogShow('dialogShow_ExcelRadioNew')" plain>{{
							$t("menu_downloadexcel")
						}}</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('billinfounpublishtitle')"
				title1="撤销发布"
				name="unpublish"
			>
				<zTable
					ref="grid_revokebillInfos"
					:tableList="htableList"
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
							@click="billInfosUndorelease(scope.selectList)"
							>{{ $t("menu_undorelease") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('billinfoqueryaccountinformationtitle')"
				title1="到账信息查询"
				name="billquery"
			>
				<zTable
					ref="grid_billInfosquery"
					:tableList="querytableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('menu_importbill')"
				title1="导入到账信息"
				name="confirm"
			>
				<zTable
					ref="grid_confirmbydept"
					:tableList="confirmtableList"
					@link-detailbg="linkDetailConfirm"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="UploadFilled" plain @click="excelUploadFilled('1')">{{
							$t("menu_importbill")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="billInfosConfirmDelete(scope.selectList)"
							>{{ $t("SRM_delete") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" :title="$t('menu_base_AuditRecords')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_billdetailNew" @close="closebilldetail" width="95%">
				<billdetailNew :condobj="condobj"></billdetailNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.uploadnewDialogShow"
				:title="$t('menubaseUploadAttachment')"
				width="40%"
				@close="closeExcelUploadnew"
				customclass="selectAgentCss"
			>
				<uploadnewQuery :condobj="condobj"></uploadnewQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_combineddetailReadOnly" @close="closecombineddetailReadOnly" width="95%">
				<billdetailNew :condobj="condobj"></billdetailNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_billdetailConfirm" @close="closebillDetailConfirm" width="95%">
				<billdetailConfirm :condobj="condobj"></billdetailConfirm>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<el-dialog v-model="dialogExcelRadio" @close="closedialogSendFormVisible" :title="$t('UPLOAD_Tip')">
				<el-form :model="excelform" style="margin: 25px 15px">
					<el-form-item :label="$t('Choose_Version') + '：'" label-width="140px">
						<el-radio-group v-model="excelform.eradio" class="ml-4">
							<el-radio label="2003">excel 2003</el-radio>
							<el-radio label="2007">excel 2007</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogExcelRadio = false">{{ $t("SRM_cancel") }}</el-button>
						<el-button type="primary" @click="downloadExcelfiles(excelform)"> {{ $t("SRM_ok") }}</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getdropSownSelection } from "/src/utils/util.js";
import zTable from "/src/components/ZTable/index.vue";
import { GlobalStore } from "/src/store/globalStore.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox } from "element-plus";
import { downloadFile } from "/src/utils/fileUtil.js";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import billdetailNew from "@/views/writeoffManage/bill/bill_detail.vue";
//附件导入Excel
import uploadnewQuery from "@/views/writeoffManage/bill/excelUploadnew.vue";
import billdetailConfirm from "@/views/writeoffManage/bill/confirm_bill_detail.vue";
const i18n = useI18n();
const grid_billInfos = ref();
const grid_revokebillInfos = ref();
const grid_billInfosquery = ref();
const grid_confirmbydept = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("billsinfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_BILL",
	columnid: "billid"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});
let crm_skfs = getdropSownSelection("CRM_skfs"); //收款方式下拉
const excelform = ref({
	eradio: "2007"
}); //弹出对话框
//下载弹出对话框
let dialogExcelRadio = ref(false);

//删除到账确认信息
const billInfosConfirmDelete = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	let jsonString = {
		confirmbydeptInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/bill/bill!deleteConfirmbydeptInfo.action", qs.stringify(params));
	if (res) {
		grid_confirmbydept.value.getTableList();
	}
};

//删除到账
const billInfosDelete = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	let jsonString = {
		billInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};

	const res = await http.post("/crm/bill/bill!deleteBillInfo.action", qs.stringify(params));
	if (res) {
		grid_billInfos.value.getTableList();
	}
};

//Excel模板下载
const downloadExcelfiles = excelform => {
	let filename = "BillInfo.xlsx";
	let filepath = "";
	if (excelform.eradio == "2003") {
		filepath = "/filedownload/2000";
	} else if (excelform.eradio == "2007") {
		filepath = "/filedownload/2007";
	}
	downloadFile("/core/uploadnew/upload!downloadByFilename.action", filename, {
		"cond.path": filepath,
		"cond.fileName": filename
	});
	dialogExcelRadio.value = false;
};

//撤销发布
const billInfosUndorelease = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return false;
	}
	ElMessageBox.confirm("是否撤销发布？", i18n.t("Message_OperationTip"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			billInfos: selectList
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/bill/bill!undoBillInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_revokebillInfos.value.getTableList();
		}
	});
};

//发布到账单
const releaseBillInfos = selectList => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	ElMessageBox.confirm(i18n.t("Message_ReleaseSuccess"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			billInfos: selectList
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/bill/bill!releaseBillInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_billInfos.value.getTableList();
		}
	});
};

//Excel导入
const excelUploadFilled = num => {
	condobj.uploadnewDialogShow = true;
	condobj.cond.auditflag = num;
	condobj.cond.success = false;
};

//关闭Excel导入页面
const closeExcelUploadnew = () => {
	grid_billInfos.value.getTableList();
};

//提佣页面关闭
const closebilldetail = () => {
	grid_billInfos.value.getTableList();
};
//提佣查询页面关闭
const closecombineddetailReadOnly = () => {
	grid_revokebillInfos.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_billInfos.value.getTableList();
});

const formData1 = reactive({});

//表格对象到账
const billtableList = reactive({
	id: "/writeoffManage/bill/bill_query_list.vue_grid_billInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfoByCond.action",
		root: "billInfos",
		baseParams: {
			"cond.auditflag": "0",
			"cond.myusercode": userInfo.usercode
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
			title: "到账信息编号",
			label: "billinfoaccountcodepanel",
			prop: "billcode",
			type: "Link",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "客户编码",
			label: "itemtitleinvoicecorpno",
			prop: "corpcode",
			type: "Input",
			width: "140"
		},
		{
			title: "金额",
			label: "billinfoamountofmoneypanel",
			prop: "money",
			type: "Input",
			width: "140"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "130"
		},
		{
			title: "收款方式",
			label: "columnbillpaymentmethod",
			prop: "paymentmethod",
			type: "Select",
			width: "140",
			typeData: crm_skfs
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "已开票金额(外币)",
			label: "itemtitleinvoiceInvoicedAmount_fn",
			prop: "receivedinvoice_fn",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "已开票金额",
			label: "billinfoinvoicedamountpanel",
			prop: "receivedinvoice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未开票金额(外币)",
			label: "itemtitleinvoiceunbilledamount_fn",
			prop: "inputmoney_fn",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未开票金额",
			label: "billinfounbilledamountpanel",
			prop: "inputmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Input",
			width: "160"
		},
		{
			title: "付款人",
			label: "billinfopayerpanel",
			prop: "payer",
			type: "Input",
			width: "140"
		},
		{
			title: "付款人账号",
			label: "billinfopayeraccountpanel",
			prop: "payaccount",
			type: "Input",
			width: "140"
		},
		{
			title: "收款人",
			label: "billinfopayeepanel",
			prop: "payee",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "testiteminforecordernamepanel",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "basecolumncombined_minimum_guarantee_rate",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "支票号码",
			label: "itemtitlebillinfochecknumber",
			prop: "checknumber",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "billid",
			prop: "billid",
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
			title: "已冲销金额",
			label: "writesum",
			prop: "writesum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退款金额",
			label: "retreatmoney",
			prop: "retreatmoney",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象撤销发布
const htableList = reactive({
	id: "/writeoffManage/bill/bill_query_list.vue_grid_revokebillInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfoByRight.action",
		root: "billInfos",
		baseParams: {
			"cond.auditflag": "2"
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
			title: "到账信息编号",
			label: "billinfoaccountcodepanel",
			prop: "billcode",
			type: "Link",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "客户编码",
			label: "itemtitleinvoicecorpno",
			prop: "corpcode",
			type: "Input",
			width: "140"
		},
		{
			title: "金额",
			label: "billinfoamountofmoneypanel",
			prop: "money",
			type: "Input",
			width: "140"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "130"
		},
		{
			title: "收款方式",
			label: "columnbillpaymentmethod",
			prop: "paymentmethod",
			type: "Select",
			width: "140",
			typeData: crm_skfs
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "已开票金额(外币)",
			label: "itemtitleinvoiceInvoicedAmount_fn",
			prop: "receivedinvoice_fn",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "已开票金额",
			label: "billinfoinvoicedamountpanel",
			prop: "receivedinvoice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未开票金额(外币)",
			label: "itemtitleinvoiceunbilledamount_fn",
			prop: "inputmoney_fn",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未开票金额",
			label: "billinfounbilledamountpanel",
			prop: "inputmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Input",
			width: "160"
		},
		{
			title: "付款人",
			label: "billinfopayerpanel",
			prop: "payer",
			type: "Input",
			width: "140"
		},
		{
			title: "付款人账号",
			label: "billinfopayeraccountpanel",
			prop: "payaccount",
			type: "Input",
			width: "140"
		},
		{
			title: "收款人",
			label: "billinfopayeepanel",
			prop: "payee",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "testiteminforecordernamepanel",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "basecolumncombined_minimum_guarantee_rate",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "支票号码",
			label: "itemtitlebillinfochecknumber",
			prop: "checknumber",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "billid",
			prop: "billid",
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
			title: "已冲销金额",
			label: "writesum",
			prop: "writesum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退款金额",
			label: "retreatmoney",
			prop: "retreatmoney",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象到账信息查询
const querytableList = reactive({
	id: "/writeoffManage/bill/bill_query_list.vue_grid_billInfosquery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfoByCorpRight.action",
		root: "billInfos",
		baseParams: {
			"cond.auditflag": "2"
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
			title: "到账信息编号",
			label: "billinfoaccountcodepanel",
			prop: "billcode",
			type: "Link",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "客户编码",
			label: "itemtitleinvoicecorpno",
			prop: "corpcode",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "exchangerate",
			type: "Input",
			width: "140"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "130"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "外币已冲销金额",
			label: "columnbillsscurrencyhavawriteoffs",
			prop: "currencywritesum",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "外币退款金额",
			label: "columnbillcurrencycurrencyretreatmoney",
			prop: "currencybalance",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "外币未冲销金额",
			label: "columnwriteoff_application_listcurrencyCanWriteOffs",
			prop: "currencybalance",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "金额",
			label: "billinfoamountofmoneypanel",
			prop: "money",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffs",
			prop: "writesum",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "retreatmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "balance",
			type: "Input",
			width: "140"
		},
		{
			title: "已开票金额",
			label: "billinfoinvoicedamountpanel",
			prop: "receivedinvoice",
			type: "Input",
			width: "140"
		},
		{
			title: "未开票金额",
			label: "billinfounbilledamountpanel",
			prop: "inputmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Input",
			width: "140"
		},
		{
			title: "付款人",
			label: "billinfopayerpanel",
			prop: "payer",
			type: "Input",
			width: "140"
		},
		{
			title: "付款人账号",
			label: "billinfopayeraccountpanel",
			prop: "payaccount",
			type: "Input",
			width: "140"
		},
		{
			title: "收款人",
			label: "billinfopayeepanel",
			prop: "payee",
			type: "Input",
			width: "140"
		},
		{
			title: "是否坏账",
			label: "billinfoisbaddebtpanel",
			prop: "isbadbill",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "testiteminforecordernamepanel",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "basecolumncombined_minimum_guarantee_rate",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "本次可冲销总金额",
			label: "billappointbalance",
			prop: "billappointbalance",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "billid",
			prop: "billid",
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
			title: "收款方式",
			label: "paymentmethod",
			prop: "paymentmethod",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象到账确认信息查询
const confirmtableList = reactive({
	id: "/writeoffManage/bill/bill_query_list.vue_grid_confirmbydept",
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectConfirmbydeptInfoByCond.action",
		root: "confirmbydeptInfos",
		baseParams: {
			"cond.auditflag": "2"
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
			title: "到账信息编号",
			label: "billinfoaccountcodepanel",
			prop: "billcode",
			type: "Link",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currency",
			type: "Input",
			width: "140"
		},
		{
			title: "付款人",
			label: "billinfopayerpanel",
			prop: "payer",
			type: "Input",
			width: "160"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamountss",
			prop: "amount",
			type: "Input",
			width: "140"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Input",
			width: "150"
		},
		{
			title: "外币退款金额",
			label: "columnbillcurrencycurrencyretreatmoney",
			prop: "refund",
			type: "Input",
			width: "140"
		},
		{
			title: "外币已冲销金额",
			label: "columnbillsscurrencyhavawriteoffs",
			prop: "writeoff",
			type: "Input",
			width: "140"
		},
		{
			title: "外币未冲销金额",
			label: "columnwriteoff_application_listcurrencyCanWriteOffs",
			prop: "notwriteoff",
			type: "Input",
			width: "140"
		},
		{
			title: "未冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "nothkdwriteoff",
			type: "Input",
			width: "140"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "deptdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "未销账原因",
			label: "columnbaseReasonForNonWriteOff",
			prop: "reason",
			type: "Input",
			width: "160"
		},
		{
			title: "是否计入部门收入",
			label: "columnbaseIncludedInDepartmentIncome",
			prop: "reckonin",
			type: "Input",
			width: "140"
		},
		{
			title: "上月确认",
			label: "columnbaseConfirmedLastMonth",
			prop: "affirm",
			type: "Input",
			width: "160"
		},
		{
			title: "本月确认",
			label: "columnbaseConfirmedThisMonth",
			prop: "confirm",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "testiteminforecordernamepanel",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "basecolumncombined_minimum_guarantee_rate",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "修改时间",
			label: "testiteminfomodifytimepanel",
			prop: "modifyertime",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "confirmid",
			prop: "confirmid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "外键",
			label: "billid",
			prop: "billid",
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
	if (data == "dialogShow_billdetailNew") {
		condobj.cond = {
			addbill: "true"
		};
		condobj.dialogShow_billdetailNew = true;
	} else if (data == "dialogShow_ExcelRadioNew") {
		//Excel模板下载
		dialogExcelRadio.value = true;
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "billcode" && row.billid) {
		if (row.billid) {
			condobj.cond = {
				billid: row.billid,
				v_corpcode: row.corpcode,
				addbill: "true"
			};
			condobj.dialogShow_billdetailNew = true;
		}
	}
};
//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "billcode" && row.billid) {
		if (row.billid) {
			condobj.cond = {
				billid: row.billid,
				v_corpcode: row.corpcode,
				readOnly: "true",
				addbill: "true"
			};
			condobj.dialogShow_billdetailNew = true;
		}
	}
};

//链接详细信息
const linkDetailConfirm = (column, row) => {
	if (column == "billcode" && row.confirmid) {
		if (row.confirmid) {
			condobj.cond = {
				billid: row.billid,
				confirmid: row.confirmid
			};
			condobj.dialogShow_billdetailConfirm = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "billsinfos") {
		//到账信息页面
		grid_billInfos.value.getTableList();
	} else if (targetName == "unpublish") {
		//撤销发布页面
		grid_revokebillInfos.value.getTableList();
	} else if (targetName == "billquery") {
		//到账信息查询页面
		grid_billInfosquery.value.getTableList();
	} else if (targetName == "confirm") {
		//到账确认查询页面
		grid_confirmbydept.value.getTableList();
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
