<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="到账信息" :label="$t('billinfoaccountinformationtitle')" name="infos">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveBillInfo()"
						>{{ $t("menu_save") }}</el-button
					>
				</div>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="form_billInfo">
					<el-divider title1="到账基本信息" content-position="left">{{ $t("billinfoaccountbaseinformationpanel") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('billinfoaccountcodepanel') + ':'" title1="到账信息编号">
								<el-input type="text" v-model="sformData.billcode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecurrencies') + ':'" title1="币种">
								<el-select
									v-model="sformData.currencies"
									class="full-width-input"
									filterable
									placeholder="Select"
									@change="selectCurrencyChange"
									:disabled="isdisabled"
								>
									<el-option v-for="item in currencyInfo" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('paymentnoticemoneypanel') + ':'" title1="外币金额">
								<el-input-number
									:min="1"
									v-model="sformData.currencyamount"
									controls-position="right"
									:precision="2"
									:disabled="isdisabled"
								></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfoamountofmoneypanelhkd') + ':'" title1="金额(港币)">
								<el-input type="text" v-model="sformData.money" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnCustomerName') + ':'" title1="客户名称">
								<el-input type="text" clearable v-model="sformData.corpdesc" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerQuery')" icon="Search" :disabled="isdisabled"> </el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitlebillinfochecknumber') + ':'" title1="支票号码">
								<el-input type="text" v-model="sformData.checknumber" :readonly="isdisabled"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfopayeraccountpanel') + ':'" title1="付款人账号">
								<el-input type="text" clearable v-model="sformData.payaccount" class="input-with-select" :disabled="isdisabled">
									<template #append>
										<el-button @click="dialogShow('dialogShow_accountQuery')" icon="Search" :disabled="isdisabled"> </el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfopayerpanel') + ':'" title1="付款人">
								<el-input type="text" v-model="sformData.payer" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfopayeepanel') + ':'" title1="收款人">
								<el-input type="text" v-model="sformData.payee" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbillpaymentmethod') + ':'" title1="收款方式">
								<el-select
									v-model="sformData.paymentmethod"
									class="full-width-input"
									filterable
									placeholder="Select"
									@visible-change="selectCurrencyChange"
									:disabled="isdisabled"
								>
									<el-option v-for="item in PaymentInfo" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceInvoicedAmount_fn') + ':'" title1="已开票金额(外币)">
								<el-input type="text" v-model="sformData.receivedinvoice_fn" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfoinvoicedamountpanel') + ':'" title1="已开票金额">
								<el-input type="text" v-model="sformData.receivedinvoice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('billinfoaccountdatepanel') + ':'" title1="到账日期">
								<el-date-picker
									type="date"
									v-model="sformData.billdate"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
									:disabled="isdisabled"
								></el-date-picker>
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
						<el-col :span="24">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
					<zTable ref="grid_invoiceInfos" width="700px" :tableList="tableListInvoice" @link-detailbg="linkDetail"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane title1="Invoice" v-show="addbillShow" label="Invoice" class="all-height flex-column" name="invoice">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_billInfo2" :tableList="tableListbillInfo2"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="申请单查询"
				v-show="addbillShow"
				:label="$t('menubaseapplicationorderquery')"
				class="all-height flex-column"
				name="folder"
			>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_billInfo3" :tableList="tableListbillInfo3"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="condobj.dialogShow" @close="dialogclose" :title="$t('columnappointment_EntrustedUnitInfo')" width="95%">
			<customerQuery :condobj="condobj"></customerQuery>
		</ZDialog>
		<ZDialog
			v-model="condobj.dialogShow_accountQuery"
			:title="$t('columnmonthlyClientselectAccount')"
			@close="dialogclose"
			width="95%"
		>
			<accountQuery :condobj="condobj"></accountQuery>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import qs from "qs";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import moment from "moment";
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
let userInfo = globalStore.userInfo;
let saveShow = ref(false); //保存
let addbillShow = ref(true); //invoice和申请单显示
let isdisabled = ref(false); //可编辑
let currencyInfo = ref([]); //币种
let PaymentInfo = ref([]); //收款方式
let data = new Date().toLocaleString();
data = data.substring(0, data.indexOf(" "));

let billdate = moment(new Date(data)).format("YYYY-MM-DD");
//到账信息初始化信息
const sformData = reactive({
	billcode: "",
	currencies: "",
	currencyamount: "",
	money: "",
	corpdesc: "",
	checknumber: "",
	payaccount: "",
	payer: "",
	payee: "",
	paymentmethod: "",
	receivedinvoice_fn: "",
	receivedinvoice: "",
	billdate: billdate,
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	remark: "",

	billid: "",
	corpcode: "",
	corpnoold: "",
	inputmoney: "",
	exchangerate: "",
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

//获取币种
let getcurrencyInfo = async () => {
	let obj = {};
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/currency/currency!selectCurrencyInfoByCond.action", qs.stringify(par));
	if (res) {
		let currencyInfos = res.currencyInfos;
		let data = [];
		if (currencyInfos != null && currencyInfos.length > 0) {
			for (let i = 0; i < currencyInfos.length; i++) {
				let omap = {};
				omap.label = currencyInfos[i].currencyname;
				omap.value = currencyInfos[i].currencyname;
				omap.exchangerate = currencyInfos[i].exchangerate;
				data.push(omap);
			}
			currencyInfo.value = data;
		}
	}
};
//获取收款方式
let gePayment = async () => {
	let cond = { isShowEmpty: "true", classfication: "CRM_skfs" };
	let obj = { cond: cond };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/bill/bill!selectPaymentmethod.action", qs.stringify(par));
	if (res) {
		let codeInfos = res.codeInfos;
		let data = [];
		let omap = {};
		if (codeInfos != null && codeInfos.length > 0) {
			for (let item of codeInfos) {
				omap = {};
				omap.label = item.codedesc;
				omap.value = item.basecode;
				data.push(omap);
			}
			PaymentInfo.value = data;
		}
	}
};

const tableTabsValue = ref("infos");

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "commissionid" && row.commissionid) {
		if (row.commissionid) {
			condobj.cond = {
				commissionid: row.commissionid
			};
			condobj.dialogShow_salesCommissionReadOnly = true;
		}
	}
};
//保存到账
let saveBillInfo = async () => {
	if (!sformData.currencies || !sformData.currencyamount) {
		ElMessage.warning(i18n.t("Message_pleaseSave"));
		return;
	}
	let obj = { billInfo: sformData };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/bill/bill!saveBillInfo.action", qs.stringify(par));
	if (res) {
		for (let key in res.billInfo[0]) {
			//判定 billInfo 的key 是否存在 sformData 的key
			sformData[key] = res.billInfo[0][key];
		}
	}
};

//币种切换
const selectCurrencyChange = val => {
	let currencyamount = sformData.currencyamount;
	for (let c of currencyInfo.value) {
		if (currencyamount == c.label) {
			sformData.exchangerate = c.exchangerate;
		}
	}
};

//查询到账信息
let getbillInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ billInfo: obj })
	};
	const res = await http.post("/crm/bill/bill!selectBillInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.billInfo[0]) {
			//判定 billInfo 的key 是否存在 sformData 的key
			sformData[key] = res.billInfo[0][key];
		}
	}
};

//查询历史信息
let gethistorybillInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ cond: obj })
	};
	const res = await http.post("/crm/account/crmaccount!selectMainCrmaccountInfoByCond.action", qs.stringify(params));
	if (res) {
		for (let key in res.crmaccountInfos[0]) {
			//判定 crmaccountInfos 的key 是否存在 sformData 的key
			if (key == "accountcode") {
				sformData["payer"] = res.crmaccountInfos[0]["accountcode"];
			} else if (key == "accountno") {
				sformData["payaccount"] = res.crmaccountInfos[0]["accountno"];
			}
		}
	}
};
// 显示
const dialogShow = data => {
	if (data == "dialogShow_customerQuery") {
		condobj.cond = {
			lockflag: "0",
			html: data
		};
		condobj.dialogShow = true;
	} else if (data == "dialogShow_accountQuery") {
		condobj.cond = {
			corpcode: sformData.corpcode,
			html: data
		};
		condobj.dialogShow_accountQuery = true;
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {
	if (condobj && condobj.cond) {
		//选择客户的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_customerQuery") {
				//选择客户
				let obj = condobj.objlist;
				if (obj.CORPID) {
					sformData.corpcode = obj.CORPNO; //客户号
					sformData.corpdesc = obj.CORPDESC; //委托公司名称
					gethistorybillInfo({ corpcode: obj.CORPNO });
				}
			} else if (condobj.cond.html == "dialogShow_accountQuery") {
				//选择账户信息
				let obj = condobj.objlist;
				if (obj.accountid) {
					sformData.payer = obj.accountcode; //账户名称
					sformData.payaccount = obj.accountno; //账户号
				}
			}
		}
	}
};

//切换tab时触发
const tabChange = TabPaneName => {
	let billid = sformData.billid;
	if (TabPaneName == "infos") {
		//到账信息页面
		if (billid) {
			getbillInfo({ billid: billid });
			//传参后会自动调用接口刷新
			tableListInvoice.httpAttribute.baseParams["cond.billid"] = billid;
			grid_gradeInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "invoice") {
		//invoice列表
		if (billid) {
			//传参后会自动调用接口刷新
			tableListbillInfo2.httpAttribute.baseParams["cond.billid"] = billid;
			grid_billInfo2.value.reuseTableList();
		}
	} else if (TabPaneName == "folder") {
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
		getcurrencyInfo(); //获取币种
		gePayment(); //获取付款方式
		let billid = props.condobj.cond.billid; //到账id
		let addbill = props.condobj.cond.addbill; //编辑问题
		let v_corpcode = props.condobj.cond.v_corpcode; //客户编码
		let v_readOnly = props.condobj.cond.readOnly; //只读状态
		if (v_readOnly == "true" || v_readOnly == "invoice") {
			isdisabled.value = true;
		} else {
			sformData.payee = userInfo.userdesc;
			sformData.billdate = billdate;
			saveShow.value = true;
		}
		if (addbill) {
			//隐藏
			addbillShow.value = false;
		}
		if (billid) {
			getbillInfo({ billid: billid });
			//传参后会自动调用接口刷新
			tableListInvoice.httpAttribute.baseParams["cond.billid"] = billid;
			grid_invoiceInfos.value.reuseTableList();
		}
	}
});

//表格发票信息
const grid_invoiceInfos = ref();
const tableListInvoice = reactive({
	id: "/writeoffManage/bill/bill_detail.vue_grid_invoiceInfos",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/billinvoice/billinvoice!selectBillinvoiceInfoByCond.action",
		root: "billinvoiceInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "biid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "发票编号",
			label: "itemtitleinvoiceinvoicecode",
			prop: "invoicecode",
			type: "Input",
			width: "180"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedate",
			type: "Input",
			width: "160"
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
			title: "本次开票金额(外币)",
			label: "messageitemtitleinputmoney_fn",
			prop: "currencyamount",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次开票金额",
			label: "billinfoinvoiceamountpanel",
			prop: "inputmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "发票金额（外币）",
			label: "itemtitleinvoiceinvoicemoney_fn",
			prop: "invoicemoney_fn",
			type: "Input",
			width: "140"
		},
		{
			title: "发票金额（港币）",
			label: "itemtitleinvoiceinvoicemoney",
			prop: "invoicemoney",
			type: "Input",
			width: "140"
		},
		{
			title: "已到账金额(外币)",
			label: "messageinvoicereceivedmoney_fn",
			prop: "receivedmoney_fn",
			type: "Input",
			width: "140"
		},
		{
			title: "已到账金额",
			label: "itemtitleinvoicereceivedmoney",
			prop: "receivedmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "未到账金额",
			label: "itemtitleinvoiceremainedmoney",
			prop: "remainedmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "foldernos",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "columnappointment_desc42",
			prop: "remark",
			type: "Input",
			width: "200"
		},
		{
			title: "到账信息编码",
			label: "billcode",
			prop: "billcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "发票ID（外键）",
			label: "invoiceid",
			prop: "invoiceid",
			type: "Input",
			width: "10",
			isHide: true
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
			label: "testiteminforecordtimepanel",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "付款人",
			label: "payer",
			prop: "payer",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "付款人账号",
			label: "payaccount",
			prop: "payaccount",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "收款人",
			label: "payee",
			prop: "payee",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否坏账",
			label: "isbadbill",
			prop: "isbadbill",
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
		},
		{
			title: "主键",
			label: "biid",
			prop: "biid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "到账信息ID（外键）",
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

//表格invoice信息
const grid_billInfo2 = ref();
const tableListbillInfo2 = reactive({
	id: "/writeoffManage/bill/bill_detail.vue_grid_billInfo2",
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
			title: "id",
			label: "id",
			prop: "billid",
			type: "id",
			width: "60",
			isHide: true
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
	id: "/writeoffManage/bill/bill_detail.vue_grid_billInfo3",
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
			title: "id",
			label: "id",
			prop: "billid",
			type: "id",
			width: "60",
			isHide: true
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
