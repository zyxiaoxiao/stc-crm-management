<template>
	<div class="all-height flex-column">
		<el-tabs class="all-height flex-column" style="overflow: auto" v-model="tableTabsValue" type="border-card" @tab-change="tabChange">
			<el-tab-pane title1="到账信息" :label="$t('billinfoaccountinformationtitle')" name="einfos">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						type="primary"
						icon="Document"
						plain
						@click="saveConfirmBillInfo()"
						>{{ $t("menu_save") }}</el-button
					>
				</div>
				<el-form
					style="margin: 0px 15px"
					label-position="right"
					label-width="120px"
					:model="sformData"
					ref="form_confirmbydeptInfo"
				>
					<el-divider title1="到账基本信息" content-position="left">{{ $t("billinfoaccountbaseinformationpanel") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('billinfoaccountcodepanel') + ':'" title1="到账信息编号">
								<el-input type="text" v-model="sformData.billcode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecurrencies') + ':'" title1="币种">
								<el-input type="text" v-model="sformData.currency" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfopayerpanel') + ':'" title1="付款人">
								<el-input type="text" v-model="sformData.payer" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecurrencyamountss') + ':'" title1="外币金额">
								<el-input type="text" v-model="sformData.amount" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfoaccountdatepanel') + ':'" title1="到账日期">
								<el-input type="text" v-model="sformData.billdate" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbillcurrencycurrencyretreatmoney') + ':'" title1="外币退款金额">
								<el-input type="text" v-model="sformData.refund" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbillsscurrencyhavawriteoffs') + ':'" title1="外币已冲销金额">
								<el-input type="text" v-model="sformData.writeoff" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnwriteoff_application_listcurrencyCanWriteOffs') + ':'" title1="外币未冲销金额">
								<el-input type="text" v-model="sformData.notwriteoff" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnwriteoff_application_listCanWriteOffs') + ':'" title1="未冲销金额">
								<el-input type="text" v-model="sformData.nothkdwriteoff" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('corpinfopaneldepartmentdesctitle') + ':'" title1="归属部门">
								<el-input type="text" v-model="sformData.deptdesc"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbaseReasonForNonWriteOff') + ':'" title1="未销账原因">
								<el-input type="text" v-model="sformData.reason"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbaseIncludedInDepartmentIncome') + ':'" title1="是否计入部门收入">
								<el-input type="text" v-model="sformData.reckonin"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbaseConfirmedLastMonth') + ':'" title1="上月确认">
								<el-input type="text" v-model="sformData.affirm"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbaseConfirmedThisMonth') + ':'" title1="本月确认">
								<el-input type="text" v-model="sformData.confirm"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('testiteminforecordercodepanel') + ':'" title1="创建人编码">
								<el-input type="text" v-model="sformData.recordercode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('testiteminforecordernamepanel') + ':'" title1="创建人名称">
								<el-input type="text" v-model="sformData.recorderdesc" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('testiteminforecordtimepanel') + ':'" title1="创建时间">
								<el-input type="text" v-model="sformData.recordtime" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('testiteminfomodifytimepanel') + ':'" title1="修改时间">
								<el-input type="text" v-model="sformData.modifyertime" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="0">
							<el-form-item :label="$t('testiteminfomodifytimepanel') + ':'" title1="修改时间">
								<el-input type="text" v-model="sformData.billid" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane title1="Invoice" label="Invoice" class="all-height flex-column" name="einvoice">
				<zTable ref="grid_billInfo2" :tableList="tableListbillInfo2"> </zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="申请单查询"
				:label="$t('menubaseapplicationorderquery')"
				class="all-height flex-column"
				name="efolder"
			>
				<zTable ref="grid_billInfo3" :tableList="tableListbillInfo3"> </zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow" @close="dialogclose" width="95%">
				<customerQuery :condobj="condobj"></customerQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_accountQuery" @close="dialogclose" width="95%">
				<accountQuery :condobj="condobj"></accountQuery>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import qs from "qs";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
//选择客户名称
import customerQuery from "@/views/appointmentManage/appointmentApplication/appointment_enterprise.vue";
//账户选择
import accountQuery from "@/views/writeoffManage/bill/selectAccount.vue";
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
let isdisabled = ref(false); //可编辑
let data = new Date().toLocaleString();
data = data.substring(0, data.indexOf(" "));

//到账确认信息初始化信息
const sformData = reactive({
	billcode: "",
	billid:"",
	confirmid: "",
	currency: "",
	payer: "",
	amount: "",
	billdate: "",
	refund: "",
	writeoff: "",
	notwriteoff: "",
	nothkdwriteoff: "",
	deptdesc: "",
	reason: "",
	reckonin: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	remark: "",
	affirm: "",
	confirm: "",
	modifyertime: ""
});

const tableTabsValue = ref("einfos");

//保存到账
let saveConfirmBillInfo = async () => {
	if (!sformData.confirmid || !sformData.billid) {
		ElMessage.warning(i18n.t("Message_pleaseSave"));
		return;
	}
	let obj = { confirmbydeptInfo: sformData };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/bill/bill!updateConfirmbydeptInfo.action", qs.stringify(par));
	if (res) {
		for (let key in res.confirmbydeptInfo[0]) {
			//判定 confirmbydeptInfo 的key 是否存在 sformData 的key
			sformData[key] = res.confirmbydeptInfo[0][key];
		}
	}
};

//查询到账确认信息
let getConfirmBillInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ confirmbydeptInfo: obj })
	};
	const res = await http.post("/crm/bill/bill!selectConfirmbydeptInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.confirmbydeptInfo[0]) {
			//判定 confirmbydeptInfo 的key 是否存在 sformData 的key
			sformData[key] = res.confirmbydeptInfo[0][key];
		}
	}
};

//切换tab时触发
const tabChange = TabPaneName => {
	let billid = sformData.billid;
	if (TabPaneName == "einfos") {
		//到账信息页面
		if (billid) {
			getConfirmBillInfo({ billid: billid });
			//传参后会自动调用接口刷新
			tableListInvoice.httpAttribute.baseParams["cond.billid"] = billid;
			grid_gradeInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "einvoice") {
		//invoice列表
		if (billid) {
			//传参后会自动调用接口刷新
			tableListbillInfo2.httpAttribute.baseParams["cond.billid"] = billid;
			grid_billInfo2.value.reuseTableList();
		}
	} else if (TabPaneName == "efolder") {
		//申请单信息
		if (billid) {
			//传参后会自动调用接口刷新
			tableListbillInfo3.httpAttribute.baseParams["cond.billid"] = billid;
			grid_billInfo3.value.reuseTableList();
		}
	}
};

onMounted(() => {
	if (props.condobj) {
		let billid = props.condobj.cond.billid; //到账id
		let confirmid = props.condobj.cond.confirmid; //到账确认主键
		if (confirmid) {
			getConfirmBillInfo({ confirmid: confirmid });
		}
	}
});

//表格invoice信息
const grid_billInfo2 = ref();
const tableListbillInfo2 = reactive({
	id: "/writeoffManage/bill/confirm_bill_detail.vue_grid_billInfo2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectInvoceInfoByBillid.action",
		root: "billMaps",
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
			prop: "reservnum",
			type: "Input",
			width: "180"
		},
		{
			title: "发票编号",
			label: "columnwriteoff_invoiceno",
			prop: "invoiceno",
			type: "Input",
			width: "160"
		},
		{
			title: "账单日期",
			label: "columnwriteoff_invoicedate",
			prop: "invoicedate",
			type: "DateTime",
			width: "150"
		},
		{
			title: "发往客户号",
			label: "columnwriteoff_sendclientno",
			prop: "sendclientno",
			type: "Input",
			width: "140"
		},
		{
			title: "发往客户名称",
			label: "columnwriteoff_sendclientname",
			prop: "sendclientname",
			type: "Input",
			width: "140"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "港币总额",
			label: "columnwriteoff_hktotalmoney",
			prop: "hktotalmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffs",
			prop: "totalmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmount",
			prop: "thiswriteoffmoney",
			type: "Input",
			width: "140"
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
			title: "本次可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "writeoffmoney",
			type: "Input",
			width: "180"
		}
	],
	// 表格数据
	tableData: []
});

//表格申请单信息
const grid_billInfo3 = ref();
const tableListbillInfo3 = reactive({
	id: "/writeoffManage/bill/confirm_bill_detail.vue_grid_billInfo3",
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectWriteoffInfoAllByBillid.action",
		root: "billMaps",
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
			prop: "reservnum",
			type: "Input",
			width: "180"
		},
		{
			title: "本次外币冲销总金额",
			label: "columncurrencybillhavawriteoffsdetail",
			prop: "currencywriteoffmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "本次外币可冲销金额",
			label: "columncurrencywriteoff_application_listCanWriteOffsdetail",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "140"
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
			width: "180"
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
			label: "panelcolumncreaterdesc",
			prop: "recorderdesc",
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
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "Input",
			width: "160"
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
