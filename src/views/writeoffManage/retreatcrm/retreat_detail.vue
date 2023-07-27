<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="退款申请" :label="$t('menubasedrawbackapplication')" name="infos">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						type="primary"
						v-show="saveShow"
						icon="Edit"
						plain
						@click="dialogShow('dialogShow_billQuery')"
						>{{ $t("menu_addbill") }}</el-button
					>
					<el-button size="small" type="danger" v-show="saveShow" icon="Close" plain @click="deleteRetreatInfo()">{{
						$t("SRM_delete")
					}}</el-button>
					<el-button
						size="small"
						class="button_show"
						type="primary"
						v-show="saveShow"
						icon="Document"
						plain
						@click="saveRetreatInfo()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button size="small" type="success" v-show="saveShow" icon="Check" plain @click="submitRetreatInfo()">{{
						$t("SRM_submit")
					}}</el-button>
				</div>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="form_billInfo">
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('columndrawbackrefundnum') + ':'" title1="退款单号">
								<el-input type="text" v-model="sformData.retreatcode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columndrawbackrefundtime') + ':'" title1="退款时间">
								<el-date-picker
									type="date"
									v-model="sformData.retreatdate"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
									:disabled="isdisabled"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnbillcurrencycurrencyretreatmoney') + ':'" title1="外币退款金额">
								<el-input type="text" v-model="sformData.currencyretreatmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('corpinfoCustomerNumbertitle') + ':'" title1="客户号">
								<el-input type="text" v-model="sformData.corpno" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item :label="$t('columnCustomerName') + ':'" title1="客户名称">
								<el-input type="text" clearable v-model="sformData.corpdesc" class="input-with-select" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columndrawbackrefundreason') + ':'" title1="退款原因">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
					<zTable ref="grid_retreatbillInfo" width="700px" :tableList="tableListRetreat"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<ZDialog v-model="condobj.dialogShow" @close="dialogclose" width="95%">
			<customerQuery :condobj="condobj"></customerQuery>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_billQuery" @close="dialogclose" width="95%">
			<billQuery :condobj="condobj"></billQuery>
		</ZDialog>
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
import moment from "moment";
//到账选择
import billQuery from "@/views/writeoffManage/retreatcrm/selectBill.vue";
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
let saveShow = ref(true); //保存等按钮
let isdisabled = ref(false); //可编辑
let isedit = ref(true); //可编辑
let v_readOnly = "false";
let data = new Date().toLocaleString();
data = data.substring(0, data.indexOf(" "));

let retreatdate = moment(new Date(data)).format("YYYY-MM-DD");
//到账信息初始化信息
const sformData = reactive({
	retreatcode: "",
	retreatdate: retreatdate,
	currencyretreatmoney: "",
	retreatmoney: "",
	corpid: "",
	corpno: "",
	corpdesc: "",
	textarea: "",
	retreatid: "",

	status: "",
	billid: "",
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

const tableTabsValue = ref("infos");

//提交退款申请信息
const submitRetreatInfo = () => {
	let v_retreatid = sformData.retreatid;
	if (!v_retreatid) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	let sdata = [];
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		sdata.push(sformData);
		let jsonString = {
			retreatInfos: sdata
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/retreat/retreat!submit.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_retreatdetail = false;
		}
	});
};

//保存退款申请
let saveRetreatInfo = async edit => {
	let list = tableListRetreat.tableData; //退款数据
	let currencybalance = 0;
	let currencyretreatmoney = 0;
	let allcurrencyretreatmoney = 0;
	let retreatmoney = 0;
	let status = "0";
	if (!sformData.retreatdate) {
		ElMessage.warning("退款日期不能为空！");
		return;
	}
	for (let l of list) {
		currencybalance = parseFloat(l.currencybalance); //余额
		if (l.currencyretreatmoney) {
			currencyretreatmoney = parseFloat(l.currencyretreatmoney); //外币退款金额
			allcurrencyretreatmoney += currencyretreatmoney;
			status = "1";
			if (currencybalance < currencyretreatmoney) {
				ElMessage.warning("余额不足!");
				return;
			}
		}
		if (l.retreatmoney) {
			retreatmoney = parseFloat(l.retreatmoney); //余额
			status = "1";
			if (currencybalance < retreatmoney) {
				ElMessage.warning("余额不足!");
				return;
			}
		}
	}
	//外币退款金额
	sformData.currencyretreatmoney = allcurrencyretreatmoney;
	sformData.status = status;
	let url = "/crm/retreat/retreat!updateRetreatInfo.action";
	if (!sformData.retreatid) {
		url = "/crm/retreat/retreat!insertRetreatInfo.action";
	}

	let obj = { retreatInfo: sformData };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post(url, qs.stringify(par));
	if (res) {
		for (let key in res.retreatInfo[0]) {
			//判定 retreatInfo 的key 是否存在 sformData 的key
			sformData[key] = res.retreatInfo[0][key];
		}
	}
	if (edit != "Y") {
		let lobj = { retreatbillInfos: list };
		let parom = {
			jsonString: JSON.stringify(lobj)
		};
		const resto = await http.post("/crm/retreatbill/retreatbill!saveRetreatbillInfo.action", qs.stringify(parom));
		if (resto) {
			//传参后会自动调用接口刷新
			tableListRetreat.httpAttribute.baseParams["cond.retreatid"] = sformData.retreatid;
			grid_retreatbillInfo.value.reuseTableList();
		}
	}
};

//删除退款申请单
let deleteRetreatInfo = async () => {
	let selectList = grid_retreatbillInfo.value.selectList; //选中的数据
	if (selectList != null && selectList.length > 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	let params = {
		jsonString: JSON.stringify({ retreatbillInfos: selectList })
	};
	const res = await http.post("/crm/retreatbill/retreatbill!deleteRetreatbillInfo.action", qs.stringify(params));
	if (res) {
		if (sformData.retreatid) {
			tableListRetreat.httpAttribute.baseParams["cond.retreatid"] = sformData.retreatid;
			grid_retreatbillInfo.value.reuseTableList();
			saveRetreatInfo("Y");
		}
	}
};

//查询到账信息
let getRetreatInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ retreatInfo: obj })
	};
	const res = await http.post("/crm/retreat/retreat!selectRetreatInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.retreatInfo[0]) {
			//判定 retreatInfo 的key 是否存在 sformData 的key
			sformData[key] = res.retreatInfo[0][key];
		}
	}
};

// 显示
const dialogShow = data => {
	if (data == "dialogShow_billQuery") {
		condobj.cond = {
			html: data
		};
		condobj.dialogShow_billQuery = true;
	} else if (data == "dialogShow_accountQuery") {
		condobj.cond = {
			corpcode: sformData.corpcode,
			html: data
		};
		condobj.dialogShow_accountQuery = true;
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = async () => {
	if (condobj && condobj.cond) {
		//选择到账信息的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_billQuery") {
				//选择到账信息
				let list = condobj.objlist;
				if (list != null && list.length > 0) {
					let retreatbills = []; //到账信息数据集
					let retreatbill = {}; //到账信息
					let retreatInfo = {}; //退款信息
					for (let l of list) {
						retreatbill = {};
						retreatbill.billid = l.billid;
						retreatbill.billdate = l.billdate;
						retreatbill.money = l.money;
						retreatbill.paymentmethod = l.paymentmethod;
						retreatbill.payaccount = l.payaccount;
						retreatbill.status = "1"; //设置为创建状态
						retreatbill.surplusmoney = l.balance; //冲销余额
						retreatbill.currencyamount = l.currencyamount; //外币到账金额
						retreatbill.currencybalance = l.currencybalance; //外币冲销余额
						retreatbills.push(retreatbill);
					}
					retreatInfo.corpno = list[0].corpcode; //客户编码
					retreatInfo.corpdesc = list[0].corpdesc; //客户名称
					if (sformData.retreatdate) {
						//退款日期
						retreatInfo.retreatdate = sformData.retreatdate;
					}
					if (sformData.retreatcode) {
						retreatInfo.retreatcode = sformData.retreatcode; //退款编号
						retreatInfo.retreatid = sformData.retreatid; //退款主键
					}
					let obj = { retreatbillInfos: retreatbills, retreatInfo: retreatInfo };
					let par = {
						jsonString: JSON.stringify(obj)
					};
					const res = await http.post("/crm/retreatbill/retreatbill!insertRetreatbillInfos.action", qs.stringify(par));
					if (res) {
						let info = res.retreatInfo; //退款信息
						if (info != null && info.length > 0) {
							let retreatid = info[0].retreatid; //退款ID
							if (retreatid) {
								getRetreatInfo({ retreatid: retreatid });
								//传参后会自动调用接口刷新
								tableListRetreat.httpAttribute.baseParams["cond.retreatid"] = retreatid;
								grid_retreatbillInfo.value.reuseTableList();
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
		let retreatid = props.condobj.cond.retreatid; //退款id
		let auflag = props.condobj.cond.auflag; //编辑问题
		let appflag = props.condobj.cond.appflag; //应用标识
		v_readOnly = props.condobj.cond.readonly; //只读状态
		if (v_readOnly == "true") {
			saveShow.value = false;
			isedit.value = false;
			isdisabled.value = true;
		}
		if (retreatid) {
			getRetreatInfo({ retreatid: retreatid });
			//传参后会自动调用接口刷新
			tableListRetreat.httpAttribute.baseParams["cond.retreatid"] = retreatid;
			grid_retreatbillInfo.value.reuseTableList();
		}
	}
});

//退款申请信息
const grid_retreatbillInfo = ref();
const tableListRetreat = reactive({
	id: "/writeoffManage/retreatcrm/retreat_detail.vue_grid_retreatbillInfo",
	tableToolbar: {
		right: false
	},
	//表单可编辑
	edit: isedit,
	//请求属性设置
	httpAttribute: {
		url: "/crm/retreatbill/retreatbill!selectRetreatbillInfoByCond.action",
		root: "retreatbillInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Input",
			width: "180"
		},
		{
			title: "本次到账金额",
			label: "billinfoamountofthisaccountpanel",
			prop: "currencyamount",
			type: "Input",
			width: "160"
		},
		{
			title: "余额",
			label: "columndrawbackbalance",
			prop: "currencybalance",
			type: "Input",
			width: "140"
		},
		{
			title: "外币退款金额",
			label: "columnbillcurrencycurrencyretreatmoney",
			prop: "currencyretreatmoney",
			type: "Number",
			min: 0,
			precision: 2,
			width: "140",
			edit: true
		},
		{
			title: "付款人",
			label: "",
			prop: "payer",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "付款人账号",
			label: "",
			prop: "payaccount",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次到账金额",
			label: "",
			prop: "money",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "收款方式",
			label: "",
			prop: "paymentmethod",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "收款人",
			label: "",
			prop: "payee",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "余额",
			label: "",
			prop: "surplusmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退款金额",
			label: "",
			prop: "retreatmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "",
			prop: "billid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "retreatbillid",
			label: "",
			prop: "retreatbillid",
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
