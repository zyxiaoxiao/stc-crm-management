<template>
	<div class="all-height flex-column">
		<div style="margin: 10px; text-align: left">
			<el-button
				size="small"
				class="button_show"
				v-show="approveShow"
				type="success"
				icon="Check"
				plain
				@click="approveWriteoffInfos('1')"
				>{{ $t("menu_approve") }}</el-button
			>
			<el-button
				size="small"
				class="button_show"
				v-show="approveShow"
				type="danger"
				icon="Close"
				plain
				@click="approveWriteoffInfos('-1')"
				>{{ $t("menu_reject") }}</el-button
			>
			<el-button
				size="small"
				class="button_show"
				v-show="approveShow"
				type="danger"
				icon="Close"
				plain
				@click="approveWriteoffInfos('-2')"
				>{{ $t("menu_reject2Submitor") }}</el-button
			>
		</div>
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane
				title1="销账单信息"
				:label="$t('itemtitlewriteoffswriteoffinfo')"
				class="all-height flex-column"
				name="writeoffInfo"
			>
				<div class="flex-column" style="overflow: auto">
					<el-form
						style="margin: 0px 15px"
						class="flex-column"
						label-position="right"
						label-width="120px"
						:model="sformData"
						ref="form_billInfo"
					>
						<el-divider title1="销账单信息" content-position="left">{{ $t("itemtitlewriteoffswriteoffinfo") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="8">
								<el-form-item :label="$t('columnwriteoff_application_listwriteoffNo') + ':'" title1="销账单号">
									<el-input type="text" v-model="sformData.writeoffcode" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item
									:label="$t('columncurrencywriteoff_application_listCanWriteOffsdetail') + ':'"
									title1="本次外币可冲销金额"
								>
									<el-input type="text" clearable v-model="sformData.currencywriteoffmoney" class="input-with-select" readonly>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item
									:label="$t('columncurrencywriteoff_application_listTotalAmountdetail') + ':'"
									title1="本次外币冲销总金额"
								>
									<el-input type="text" v-model="sformData.currencytotalmoney" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('billinfoisbaddebtpanel') + ':'" title1="是否坏账">
									<el-select
										v-model="sformData.isbad"
										class="full-width-input"
										filterable
										placeholder="Select"
										:disabled="isCurrency"
									>
										<el-option v-for="item in costtype" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('itemtitleinvoicecorpno') + ':'" title1="客户编号">
									<el-input type="text" v-model="sformData.corpno" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('panelcolumncustomername') + ':'" title1="客户名称">
									<el-input type="text" v-model="sformData.corpdesc" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnCreatehumancoding') + ':'" title1="创建人编码">
									<el-input type="text" v-model="sformData.recordercode" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnCreatehumandescription') + ':'" title1="创建人名称">
									<el-input type="text" v-model="sformData.recorderdesc" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('itemtitlestatusrecordertime') + ':'" title1="创建时间">
									<el-input type="text" v-model="sformData.recordtime" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="overflow: auto; height: 450px">
					<zTable ref="grid_invoiceInfos" width="700px" :tableList="tableListInvoices">
						<!-- 自定义 -->
						<template #Custom="scope">
							<span
								v-if="scope.column == 'folderno' && scope.row['invoicevalue'] == scope.row['currency']"
								v-html="scope.row[scope.column]"
							></span>
							<span
								v-if="scope.column == 'folderno' && scope.row['invoicevalue'] != scope.row['currency']"
								style="color: red; font-weight: bold; font-size: medium"
								v-html="scope.row[scope.column]"
							></span>
						</template>
					</zTable>
				</div>
				<div class="flex-column" style="overflow: auto; height: 450px">
					<zTable ref="grid_appointmentInfos" width="700px" :tableList="tableListFolders">
						<!-- 自定义 -->
						<template #Custom="scope">
							<a v-if="scope.column == 'tobill' && scope.row['isedit'] == '1'"
								><span style="color: blue">{{ $t("columnwriteoff_application_listRelatedArrivalInfo") }}</span></a
							>
							<a
								href="javascript:void(0)"
								v-if="scope.column == 'tobill' && scope.row['isedit'] != '1'"
								@click="turnBillAppointment(scope)"
								><span style="color: blue">{{ $t("columnwriteoff_application_listRelatedArrivalInfo") }}</span></a
							>
						</template>
					</zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="到账信息"
				:label="$t('billinfoaccountinformationtitle')"
				class="all-height flex-column"
				name="writeoffInfo1"
			>
				<div class="flex-column" style="overflow: auto; height: 450px">
					<zTable ref="grid_billInfosquery" width="700px" :tableList="tableListBillInfos" @selection-change="selectionChange">
					</zTable>
				</div>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="overflow: auto; height: 230px">
					<zTable ref="grid_calculatormoneyshow" width="700px" :tableList="tableListCalculatormoney"> </zTable>
				</div>
				<div class="flex-column" style="overflow: auto; height: 450px">
					<zTable ref="grid_writeoffInfos_query" width="700px" :tableList="tableListWriteoffInfos"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane title1="账户信息" :label="$t('menhuAccountInformation')" class="all-height flex-column" name="accountinfo">
				<zTable ref="grid_accountInfos" :tableList="tableListaccount"> </zTable>
			</el-tab-pane>
			<el-tab-pane title1="附件信息" :label="$t('columnAccessoryInformation')" class="all-height flex-column" name="fileinfo">
				<zTable ref="grid_accessory" :tableList="tableListfile" @link-detailbg="downloadfiles"> </zTable>
			</el-tab-pane>
		</el-tabs>
		<ZDialog v-model="condobj.dialogShow_billappointmentdetailreadonly" @close="dialogclose" width="95%">
			<billappointmentdetailreadonly :condobj="condobj"></billappointmentdetailreadonly>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import qs from "qs";
import { downloadFile } from "/src/utils/fileUtil.js";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "/src/utils/util.js";
//到账信息
import billappointmentdetailreadonly from "@/views/writeoffManage/writeoff_dgbj/bill_appointment_detail_readonly.vue";
const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
let approveShow = ref(false); //审核显示
let isCurrency = ref(true); //币种可编辑
let writeoffidto = ""; //销账id
let crm_skfs = getdropSownSelection("CRM_skfs"); //收款方式下拉
let costtype = [
	{
		value: "1",
		label: i18n.t("billinfoisbaddebtpanel1")
	},
	{
		value: "0",
		label: i18n.t("billinfoisbaddebtpanel0")
	}
];
//销账信息初始化信息
const sformData = reactive({
	writeoffcode: "",
	currencywriteoffmoney: "",
	currencytotalmoney: "",
	writeoffmoney: "",
	totalmoney: "",
	isbad: "",
	corpno: "",
	corpid: "",
	corpdesc: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	isbad_old: "",

	writeoffid: "",
	auditorcode: "",
	auditordesc: "",
	audittime: "",
	submitcorp: "",
	auditlevel: "",
	retrieveflag: "",
	retrievercode: "",
	retrieverdesc: "",
	retrievetime: "",
	recordercorp: "",
	auditlevelname: "",
	errormsg: "",
	submittime: "",
	workflowid: "",
	auditflag: ""
});

//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

//点击切换关联到账信息
const turnBillAppointment = row => {
	condobj.cond = {
		wbid: row.row.wbid,
		reservnum: row.row.appointmentid,
		writeoffid: row.row.writeoffid,
		html: "dialogShow_billappointmentdetailreadonly"
	};
	condobj.dialogShow_billappointmentdetailreadonly = true;
};

const tableTabsValue = ref("writeoffInfo");

//审核销账单信息
const approveWriteoffInfos = code => {
	if (!sformData.writeoffid) {
		ElMessage.warning(i18n.t("alert_saveclient"));
		return;
	}
	let str = i18n.t("audit_approve");
	if (code == "-1" || code == "-2") {
		str = i18n.t("audit_reject");
	}
	let approveValue = ref(str);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: approveValue.value,
				type: "textarea",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					approveValue.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let cond = { opinion: approveValue.value };
		let writeoffInfos = [];
		writeoffInfos.push(sformData);
		let jsonString = {
			writeoffInfos: writeoffInfos,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/crm/writeoff/writeoff!reject.action";
		} else if (code == "-2") {
			url = "/crm/writeoff/writeoff!reject2Submitor.action";
		} else {
			url = "/crm/writeoff/writeoff!approve.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_writeoffbatchdetailReadOnly = false;
		}
	});
};

//选择到账信息
const selectionChange = rowArr => {
	if (rowArr.length > 0) {
		let billid = rowArr[0].billid;
		if (billid) {
			//传参后会自动调用接口刷新
			tableListCalculatormoney.httpAttribute.baseParams["cond.billid"] = billid;
			grid_calculatormoneyshow.value.reuseTableList();
			//传参后会自动调用接口刷新
			tableListWriteoffInfos.httpAttribute.baseParams["cond.billid"] = billid;
			grid_writeoffInfos_query.value.reuseTableList();
		}
	}
};

//子页面关闭后的方法可以给父页面赋值等操作
const billdialogclose = async () => {
	if (condobj && condobj.cond) {
	}
};

//查询销账信息
let getwriteoffInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ writeoffInfo: obj })
	};
	const res = await http.post("/crm/writeoff/writeoff!selectWriteoffInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.writeoffInfo[0]) {
			//判定 writeoffInfo 的key 是否存在 sformData 的key
			sformData[key] = res.writeoffInfo[0][key];
		}
	}
};

// 显示
const dialogShow = data => {};
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {
	if (condobj && condobj.cond) {
		//选择客户的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_billappointmentdetail") {
				//关闭后刷新数据
				if (writeoffidto) {
					getwriteoffInfo({ writeoffid: writeoffidto });
					//传参后会自动调用接口刷新
					tableListInvoices.httpAttribute.baseParams["cond.writeoffid"] = writeoffidto;
					grid_invoiceInfos.value.reuseTableList();
					//传参后会自动调用接口刷新
					tableListFolders.httpAttribute.baseParams["cond.writeoffid"] = writeoffidto;
					grid_appointmentInfos.value.reuseTableList();
				}
			}
		}
	}
};

//切换tab时触发
const tabChange = TabPaneName => {
	let writeoffid = sformData.writeoffid;
	if (TabPaneName == "writeoffInfo") {
		//销账单信息
		if (writeoffid) {
			getwriteoffInfo({ writeoffid: writeoffid });
			//传参后会自动调用接口刷新
			tableListInvoices.httpAttribute.baseParams["cond.writeoffid"] = writeoffid;
			grid_invoiceInfos.value.reuseTableList();
			//传参后会自动调用接口刷新
			tableListFolders.httpAttribute.baseParams["cond.writeoffid"] = writeoffid;
			grid_appointmentInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "writeoffInfo1") {
		//到账信息
		if (writeoffid) {
			//传参后会自动调用接口刷新
			tableListBillInfos.httpAttribute.baseParams["cond.writeoffid"] = writeoffid;
			grid_billInfosquery.value.reuseTableList();
		}
	} else if (TabPaneName == "accountinfo") {
		//税票信息
		if (sformData.corpid) {
			//传参后会自动调用接口刷新
			tableListaccount.httpAttribute.baseParams["cond.corpid"] = sformData.corpid;
			grid_accountInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "fileinfo") {
		//税票信息
		if (writeoffid) {
			//传参后会自动调用接口刷新
			tableListfile.httpAttribute.baseParams["cond.businessobjectid"] = writeoffid;
			grid_accessory.value.reuseTableList();
		}
	}
};

onMounted(() => {
	if (props.condobj) {
		let writeoffid = props.condobj.cond.writeoffid; //销账主键
		let corpid = props.condobj.cond.corpid; //是否导入
		let auditflag = props.condobj.cond.auditflag; //审核字段
		writeoffidto = writeoffid; //销账主键id
		if (auditflag && auditflag == "Y") {
			approveShow.value = true;
		}
		if (writeoffid) {
			getwriteoffInfo({ writeoffid: writeoffid });
			//传参后会自动调用接口刷新
			tableListInvoices.httpAttribute.baseParams["cond.writeoffid"] = writeoffid;
			grid_invoiceInfos.value.reuseTableList();
			//传参后会自动调用接口刷新
			tableListFolders.httpAttribute.baseParams["cond.writeoffid"] = writeoffid;
			grid_appointmentInfos.value.reuseTableList();
		}
	}
});

//表格invoice信息
const grid_invoiceInfos = ref();
const tableListInvoices = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_invoiceInfos",
	tableToolbar: {
		right: false
	},
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoiceinfo/invoiceinfo!selectInvoiceInfoByWriteoffid.action",
		root: "invoicemap",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "发票编号",
			label: "columnwriteoff_invoiceno",
			prop: "INVOICENO",
			type: "Input",
			width: "160"
		},
		{
			title: "账单日期",
			label: "columnwriteoff_invoicedate",
			prop: "INVOICEDATE",
			type: "Date",
			width: "160"
		},
		{
			title: "打印日期",
			label: "columnwriteoff_invoiceprintdate",
			prop: "PRINTDATE",
			type: "Date",
			width: "160"
		},
		{
			title: "发往客户号",
			label: "columnwriteoff_sendclientno",
			prop: "SENDCLIENTNO",
			type: "Input",
			width: "140"
		},
		{
			title: "发往客户名称",
			label: "columnwriteoff_sendclientname",
			prop: "SENDCLIENTNAME",
			type: "Input",
			width: "160"
		},
		{
			title: "发往地址联络人",
			label: "columnwriteoff_sendclientcontactor",
			prop: "SENDCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "DEPT",
			type: "Input",
			width: "160"
		},
		{
			title: "货币类型",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYTYPE",
			type: "Input",
			width: "140"
		},
		{
			title: "账单合计",
			label: "columnwriteoff_invoicetotaldetail",
			prop: "INVOICETOTAL",
			type: "Input",
			width: "140"
		},
		{
			title: "港币总额",
			label: "columnwriteoff_hktotalmoneydetail",
			prop: "HKTOTALMONEY",
			type: "Input",
			width: "140"
		},
		{
			title: "已冲销金额",
			label: "columnbillsscurrencyhavawriteoffs",
			prop: "currencywriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "本次可冲销金额",
			label: "columnwriteoffcurrencyCanWriteOffs",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffsdetail",
			prop: "TOTALMONEY",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmountdetail",
			prop: "THISWRITEOFFMONEY",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsdetail",
			prop: "WRITEOFFMONEY",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "invoicecode",
			label: "invoicecode",
			prop: "invoicecode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "taxinvoicecode",
			label: "taxinvoicecode",
			prop: "taxinvoicecode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "foinid",
			label: "foinid",
			prop: "foinid",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格申请单信息
const grid_appointmentInfos = ref();
const tableListFolders = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_appointmentInfos",
	tableToolbar: {
		right: false
	},
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoffappointment/writeoffappointment!selectWriteoffappointmentInfoByCond.action",
		root: "writeoffappointmentInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "appointmentid",
			type: "Input",
			width: "160"
		},
		{
			title: "发票编号",
			label: "columnwriteoff_invoiceno",
			prop: "invoiceno",
			type: "Input",
			width: "160"
		},
		{
			title: "关联到账信息",
			label: "columnwriteoff_application_listRelatedArrivalInfo",
			prop: "tobill",
			type: "Custom",
			width: "140"
		},
		{
			title: "委托检测总费用",
			label: "itemtitleinvoicecurrencyamount",
			prop: "totalmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencyname",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "currencyrate",
			type: "Input",
			width: "140"
		},
		{
			title: "外币已冲销金额",
			label: "columnbillcurrencyhavawriteoffs",
			prop: "currencywriteoffsnum",
			type: "Input",
			width: "140"
		},
		{
			title: "外币成本费",
			label: "columncurrencywriteoff_application_listCost",
			prop: "currencycostnum",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "外币可冲销金额",
			label: "columncurrencywriteoff_application_listCanWriteOffsdetail",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "140"
		},
		{
			title: "外币本次冲销总金额",
			label: "columncurrencywriteoff_application_listTotalAmountdetail",
			prop: "currencywriteoffmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "140"
		},
		{
			title: "金额港币",
			label: "billinfoamountofmoneypanelhkd",
			prop: "hktotalmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "外币退款金额",
			label: "columncurrencydrawbackrefundmoney",
			prop: "currencyrefundnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "secode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffsdetail",
			prop: "writeoffsnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "refundnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsdetail",
			prop: "canwriteoffsnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmountdetail",
			prop: "writeoffmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "wbid",
			label: "wbid",
			prop: "wbid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "isedit",
			label: "isedit",
			prop: "isedit",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "writeoffid",
			label: "writeoffid",
			prop: "writeoffid",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格到账信息
const grid_billInfosquery = ref();
const tableListBillInfos = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_billInfosquery",
	tableToolbar: {
		right: false
	},
	//表单可编辑
	edit: true,
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfosByWriteoffid.action",
		root: "billInfos",
		baseParams: {}
	},
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
			type: "Input",
			width: "160"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Date",
			width: "160"
		},
		{
			title: "付款人",
			label: "billinfopayerpanel",
			prop: "payer",
			type: "Input",
			width: "230"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Input",
			width: "140"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
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
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "money",
			type: "Input",
			width: "140"
		},
		{
			title: "收款方式",
			label: "columnbillpaymentmethod",
			prop: "paymentmethod",
			type: "Select",
			width: "160",
			typeData: crm_skfs
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "客户编码",
			label: "itemtitleinvoicecorpno",
			prop: "corpcode",
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
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffs",
			prop: "writesum",
			type: "Input",
			width: "160"
		},
		{
			title: "未销账金额",
			label: "crmcolumnnotwriteoffmoney",
			prop: "balance",
			type: "Input",
			width: "160"
		},
		{
			title: "付款人账号",
			label: "billinfopayeraccountpanel",
			prop: "payaccount",
			type: "Input",
			width: "160"
		},
		{
			title: "收款人",
			label: "billinfopayeepanel",
			prop: "payee",
			type: "Input",
			width: "160"
		},
		{
			title: "外币退款金额",
			label: "columncurrencydrawbackrefundmoney",
			prop: "currencyretreatmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedatestr",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "160"
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
			label: "testiteminforecordtimepanel",
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
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "retreatmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "count",
			label: "count",
			prop: "count",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格计算规则
const grid_calculatormoneyshow = ref();
const tableListCalculatormoney = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_calculatormoneyshow",
	tableToolbar: {
		right: false
	},
	//表单可编辑
	edit: true,
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoff/writeoff!selectWriteoffInfosByCalculatormoney.action",
		root: "calculatmap",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			title: "计算规则",
			label: "columnwriteoff_application_listCalculationrules",
			prop: "CALCULATRULE",
			type: "Input",
			width: "160"
		},
		{
			title: "",
			label: "",
			prop: "A",
			type: "Input",
			width: "20"
		},
		{
			title: "水单总金额",
			label: "columnwriteoff_application_listTotalamountbill",
			prop: "MONEY",
			type: "Input",
			width: "140"
		},
		{
			title: "",
			label: "",
			prop: "B",
			type: "Input",
			width: "27"
		},
		{
			title: "退款金额",
			label: "columncurrency1drawbackrefundmoney",
			prop: "RETREATMONEY",
			type: "Input",
			width: "140"
		},
		{
			title: "",
			label: "",
			prop: "C",
			type: "Input",
			width: "27"
		},
		{
			title: "已冲销金额",
			label: "columnbillcurrency1havawriteoffs",
			prop: "WRITEOFFSNUM",
			type: "Input",
			width: "140"
		},
		{
			title: "",
			label: "",
			prop: "E",
			type: "Input",
			width: "27"
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsbill",
			prop: "CANWRITEOFFSNUM",
			type: "Input",
			width: "140"
		}
	],
	// 表格数据
	tableData: []
});

//表格销账信息
const grid_writeoffInfos_query = ref();
const tableListWriteoffInfos = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_writeoffInfos_query",
	tableToolbar: {
		right: false
	},
	//表单可编辑
	edit: true,
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoffappointment/writeoffappointment!selectWriteoffappointmentInfoByBillid.action",
		root: "writeoffappointmentInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "appointmentid",
			type: "Input",
			width: "160"
		},
		{
			title: "发票编号",
			label: "columnwriteoff_invoiceno",
			prop: "invoiceno",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测总费用",
			label: "itemtitleinvoicecurrencyamount",
			prop: "totalmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencyname",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "currencyrate",
			type: "Input",
			width: "140"
		},
		{
			title: "外币已冲销金额",
			label: "columnbillcurrencyhavawriteoffs",
			prop: "currencywriteoffsnum",
			type: "Input",
			width: "140"
		},
		{
			title: "外币成本费",
			label: "columncurrencywriteoff_application_listCost",
			prop: "currencycostnum",
			type: "Input",
			width: "140"
		},
		{
			title: "外币可冲销金额",
			label: "columncurrencywriteoff_application_listCanWriteOffsdetail",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "140"
		},
		{
			title: "外币本次冲销总金额",
			label: "columncurrencywriteoff_application_listTotalAmountdetail",
			prop: "currencywriteoffmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "港币总额",
			label: "columnwriteoff_hktotalmoney",
			prop: "hktotalmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "外币退款金额",
			label: "columncurrencydrawbackrefundmoney",
			prop: "currencyrefundnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffsdetail",
			prop: "writeoffsnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "refundnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsdetail",
			prop: "canwriteoffsnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmountdetail",
			prop: "writeoffmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "wbid",
			label: "wbid",
			prop: "wbid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "isedit",
			label: "isedit",
			prop: "isedit",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "writeoffid",
			label: "writeoffid",
			prop: "writeoffid",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格account信息
const grid_accountInfos = ref();
const tableListaccount = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_accountInfos",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectCrmaccountInfoByCond.action",
		root: "crmaccountInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "账户名",
			label: "i18ncrmcontractAccountName",
			prop: "accountcode",
			type: "Input",
			width: "260"
		},
		{
			title: "是否为主账户",
			label: "corpinfoOrNotMainAccounttitle",
			prop: "ismain",
			type: "Input",
			width: "160"
		},
		{
			title: "账户号",
			label: "i18ncrmcontractAccountNumber",
			prop: "accountno",
			type: "Input",
			width: "140"
		},
		{
			title: "SWIFT",
			label: "companypanelswifttitle",
			prop: "swift",
			type: "Input",
			width: "150"
		},
		{
			title: "银行地址",
			label: "companypanelbankadresstitle",
			prop: "bankadress",
			type: "Input",
			width: "150"
		},
		{
			title: "首次交易日期",
			label: "corpinfofirstTransactiondatetitle",
			prop: "firstdealtime",
			type: "Input",
			width: "150"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "150"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "创建编码",
			label: "hotlinkpanelcjsjtitle",
			prop: "recordercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "修改人编码",
			label: "columnModifyPersonCoding",
			prop: "modifypersoncode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "修改人名称",
			label: "itemtitleworkflowdefrecorderdesc",
			prop: "modifypersondesc",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格invoice信息
const grid_accessory = ref();
const tableListfile = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue_grid_accessory",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link",
			width: "260"
		},
		{
			title: "文档大小",
			label: "companypanel3filesizetitle",
			prop: "filesize",
			type: "Input",
			width: "160"
		},
		{
			title: "上传用户",
			label: "columnUploadUser",
			prop: "recorderdesc",
			type: "Input",
			width: "120"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordtime",
			type: "Input",
			width: "300"
		},
		{
			title: "fileid",
			label: "",
			prop: "fileid",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>
