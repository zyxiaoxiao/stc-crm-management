<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane
				title1="申请单认领信息"
				:label="$t('menubasebillclaiminformation')"
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
						<el-divider title1="委托检验" content-position="left">{{ $t("columnappointment_EntrustedInspection") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="8">
								<el-form-item :label="$t('columnwriteoff_application_listApplicationNo') + ':'" title1="申请单编号">
									<el-input type="text" v-model="sformData.appointmentid" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('billinfoamountofmoneypanel') + ':'" title1="委托检测总费用">
									<el-input type="text" clearable v-model="sformData.totalmoney" class="input-with-select" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('itemtitleinvoicecurrencies') + ':'" title1="币种">
									<el-input type="text" v-model="sformData.currencyname" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc54') + ':'" title1="汇率">
									<el-input type="text" v-model="sformData.currencyrate" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnbillcurrency1havawriteoffs') + ':'" title1="外币已冲销金额">
									<el-input type="text" v-model="sformData.currencywriteoffsnum" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnbillcurrencycost') + ':'" title1="外币成本费">
									<el-input type="text" v-model="sformData.currencycostnum" readonly> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnwriteoffCanWriteOffs') + ':'" title1="外币可冲销金额">
									<el-input type="text" v-model="sformData.currencycanwriteoffsnum" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnwriteoffCanWriteOffstotal') + ':'" title1="外币本次冲销总金额">
									<el-input type="text" v-model="sformData.currencywriteoffmoney" readonly> </el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="overflow: auto; height: 450px">
					<zTable ref="grid_billappointmentInfos" width="700px" :tableList="tableListbills">
					</zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_selectBillappointmentdetailQuery" @close="billdialogclose" width="95%">
				<billappointmentdetailQuery :condobj="condobj"></billappointmentdetailQuery>
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
//到账信息选择
import billappointmentdetailQuery from "@/views/writeoffManage/writeoff_dgbj/bill_query_list.vue";
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
let v_wbid = ""; //销账子表主键
let v_writeoffid = ""; //销账主键
let v_reservnum = ""; //申请单

//销账信息初始化信息
const sformData = reactive({
	appointmentid: "",
	totalmoney: "",
	hktotalmoney: "",
	currencyname: "",
	currencyrate: "",
	writeoffsnum: "",
	currencywriteoffsnum: "",
	currencycostnum: "",
	canwriteoffsnum: "",
	writeoffmoney: "",
	currencycanwriteoffsnum: "",
	currencywriteoffmoney: ""
});

const tableTabsValue = ref("writeoffInfo");


//保存税票申请单信息
const saveBillAppointment_handler = async () => {
	if (tableListbills.tableData.length < 1) {
		return;
	}
	let currencybilltotalmoney=0;
	for(let b of tableListbills.tableData){
        if(!b.currencybilletoappoint || isNaN(b.currencybilletoappoint)){
			ElMessage.warning(i18n.t("Message_TaxTicketTnformation"));
		    return;
		}
		if(parseFloat(b.currencybilletoappoint) < 0){
            ElMessage.warning(i18n.t("Message_EnterMoney"));
		    return;
		}
		currencybilltotalmoney =  currencybilltotalmoney + parseFloat(b.currencybilletoappoint);
	}
	let jsonString = {
		currencybilltotalmoney: currencybilltotalmoney,
		billappointmentInfos: tableListbills.tableData
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/billappointment/billappointment!updateBillappointmentInfos.action", qs.stringify(params));
	if (res) {
		grid_billappointmentInfos.value.getTableList();
		getappointmentInfo({ wbid: v_wbid });
	}
};

//删除到账信息
const billappointmentInfosDelete = async selectList => {
	let jsonString = {
		billappointmentInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/billappointment/billappointment!deleteBillappointmentInfo.action", qs.stringify(params));
	if (res) {
		await grid_billappointmentInfos.value.getTableList();
	}
};

//查询销账信息
let getappointmentInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ writeoffappointmentInfo: obj })
	};
	const res = await http.post(
		"/crm/writeoffappointment/writeoffappointment!selectWriteoffappointmentInfoById.action",
		qs.stringify(params)
	);
	if (res) {
		for (let key in res.writeoffappointmentInfo[0]) {
			//判定 writeoffappointmentInfo 的key 是否存在 sformData 的key
			sformData[key] = res.writeoffappointmentInfo[0][key];
		}
	}
};

// 显示
const dialogShow = data => {
	if (data == "dialogShow_selectBillappointmentdetailQuery") {
		condobj.cond = {
			html: "dialogShow_selectBillappointmentdetailQuery"
		};
		condobj.dialogShow_selectBillappointmentdetailQuery = true;
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const billdialogclose = async () => {
	if (condobj && condobj.cond) {
		//选择委托单位的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_selectBillappointmentdetailQuery") {
				//选择到账信息
				let obj = condobj.objlist;
				if (obj.billid && sformData.currencyrate) {
					let billdate = obj.billdate;
					if (billdate) {
						billdate = billdate.substring(0, billdate.indexOf(" "));
					}
					obj.billdate = billdate;
					let billappointment = {
						billid: obj.billid,
						billmoney: obj.money,
						billwritesum: obj.writesum,
						retreatmoney: obj.retreatmoney,
						billbalance: obj.balance,
						currencies: obj.currencies,
						exchangerate: obj.exchangerate,
						currencybillmoney: obj.currencyamount,
						foldertotalmoney: parseFloat(obj.currencyamount).toFixed(2),
						currencybillwritesum: obj.currencywritesum,
						currencyretreatmoney: obj.currencyretreatmoney,
						currencybillbalance: obj.currencybalance,
						writeoffid: v_writeoffid,
						reservnum: v_reservnum,
						wbid: v_wbid
					};
					let vdata = [];
					vdata.push(billappointment);

					if (sformData.currencyrate == obj.currencies) {
						let params = {
							jsonString: JSON.stringify({ billappointmentInfos: vdata })
						};
						const res = await http.post(
							"/crm/billappointment/billappointment!insertBillappointmentInfos.action",
							qs.stringify(params)
						);
						if (res) {
							var msg = res.errorMsg;
							if (msg == "fail") {
								//存在正在销账的到账单
								ElMessage.warning(i18n.t("i18nmsg_bgfailureforbill"));
								return false;
							}
							//更新到账数据
							grid_billappointmentInfos.value.getTableList();
						}
					} else {
						let cond = {
							foldscurrencyrate: sformData.currencyrate,
							exchangerate: obj.exchangerate,
							foldscurrencies: sformData.currencyname,
							currencies: obj.currencies,
							billdate: billdate
						};
						let params = {
							jsonString: JSON.stringify({
								billappointmentInfos: vdata,
								cond: cond
							})
						};
						const res = await http.post(
							"/crm/billappointment/billappointment!calculatorExchangerate.action",
							qs.stringify(params)
						);
						if (res.billappointmentInfos && res.billappointmentInfos.length > 0) {
							let billappointmentInfo = res.billappointmentInfos[0];
							let calculatorvdata = [];
							let billappointmentc = {
								billid: obj.billid,
								billmoney: obj.money,
								billwritesum: obj.writesum,
								retreatmoney: obj.retreatmoney,
								billbalance: obj.balance,
								currencies: obj.currencies,
								exchangerate: obj.exchangerate,
								foldertotalmoney: parseFloat(obj.currencyamount).toFixed(2),
								currencybillmoney: billappointmentInfo.currencybillmoney,
								currencybillwritesum: billappointmentInfo.currencybillwritesum,
								currencyretreatmoney: billappointmentInfo.currencyretreatmoney,
								currencybillbalance: billappointmentInfo.currencybillbalance,
								writeoffid: v_writeoffid,
								reservnum: v_reservnum,
								wbid: v_wbid
							};
							calculatorvdata.push(billappointmentc);
							let paramsto = {
								jsonString: JSON.stringify({ billappointmentInfos: calculatorvdata })
							};
							const resto = await http.post(
								"/crm/billappointment/billappointment!insertBillappointmentInfos.action",
								qs.stringify(paramsto)
							);
							if (resto) {
								var msg = resto.errorMsg;
								if (msg == "fail") {
									//存在正在销账的到账单
									ElMessage.warning(i18n.t("i18nmsg_bgfailureforbill"));
									return false;
								}
								//更新到账数据
								grid_billappointmentInfos.value.getTableList();
							}
						}
					}
				}
			}
		}
	}
};

//切换tab时触发
const tabChange = TabPaneName => {};

onMounted(() => {
	if (props.condobj) {
		v_wbid = props.condobj.cond.wbid; //销账主键
		v_writeoffid = props.condobj.cond.writeoffid; //销账主键
		v_reservnum = props.condobj.cond.reservnum; //申请单号
		if (v_wbid) {
			getappointmentInfo({ wbid: v_wbid });
			//传参后会自动调用接口刷新
			tableListbills.httpAttribute.baseParams["cond.writeoffid"] = v_writeoffid;
			tableListbills.httpAttribute.baseParams["cond.reservnum"] = v_reservnum;
			grid_billappointmentInfos.value.reuseTableList();
		}
	}
});

//表格invoice信息
const grid_billappointmentInfos = ref();
const tableListbills = reactive({
	id: "/writeoffManage/writeoff_dgbj/bill_appointment_detail.vue_grid_billappointmentInfos",
	tableToolbar: {
		right: false
	},
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/billappointment/billappointment!selectBillappointmentInfoByCond.action",
		root: "billappointmentInfos",
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
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpcode",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
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
			width: "160"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Input",
			width: "160"
		},
		{
			title: "到账单总金额",
			label: "columnbilldrawbackamountmoney",
			prop: "foldertotalmoney",
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
			title: "到账转申请单币种总金额",
			label: "columnbilltoamountmoneycurrencyfolders",
			prop: "currencybillmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "到账转申请单币种已冲销金额",
			label: "columnbillcurrency1havawriteoffs",
			prop: "currencybillwritesum",
			type: "Input",
			width: "160"
		},
		{
			title: "到账转申请单币种退款金额",
			label: "columncurrency1drawbackrefundmoney",
			prop: "currencyretreatmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "到账转申请单币种可冲销金额",
			label: "columnwriteoffcurrencyCanWriteOffs",
			prop: "currencybillbalance",
			type: "Input",
			width: "160"
		},
		{
			title: "到账转申请单币种本次冲销总金额",
			label: "columnwriteoffCanWriteOffstotal",
			prop: "currencybilletoappointsum",
			type: "Input",
			width: "160"
		},
		{
			title: "到账转申请单币种本次冲销金额",
			label: "columnwriteoff_application_listcurrency1TheCurrentBillOffs",
			prop: "currencybilletoappoint",
			type: "Input",
			width: "140"
		},
		{
			title: "描述",
			label: "satisfactioncolumnmstitle",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "到账单编码",
			label: "billid",
			prop: "billid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "billappointid",
			prop: "billappointid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "委托单ID",
			label: "appointmentid",
			prop: "appointmentid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "账认领申请与委托单关联关系信息ID",
			label: "wbid",
			prop: "wbid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "委托单号",
			label: "reservnum",
			prop: "reservnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "到账单总金额",
			label: "columnbilltoamountmoneycurrencyfolders",
			prop: "billmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffs",
			prop: "billwritesum",
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
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "billbalance",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmount",
			prop: "billetoappointsum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次冲销金额",
			label: "columnwriteoff_application_listTheCurrentBillOffs",
			prop: "billetoappoint",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss"></style>
