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
				title1="销账单信息"
				:label="$t('itemtitlewriteoffswriteoffinfo')"
				class="all-height flex-column"
				name="writeoffInfo"
			>
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveWriteoffAppointment()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button size="small" type="primary" icon="DocumentCopy" plain @click="batchWriteOffAppointment">{{
						$t("menu_batchxz")
					}}</el-button>
					<el-button size="small" type="success" icon="Check" plain @click="submitWriteoffInfo">{{ $t("SRM_submit") }}</el-button>
				</div>
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
									<el-input type="text" v-model="sformData.currencytotalmoney" :readonly="isdisabled"> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('billinfoisbaddebtpanel') + ':'" title1="是否坏账">
									<el-select
										v-model="sformData.isbad"
										class="full-width-input"
										filterable
										placeholder="Select"
										@change="selectIsbaddebt"
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
									<el-input type="text" v-model="sformData.recordtime" :readonly="isdisabled"></el-input>
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
					<zTable ref="grid_appointmentInfos" width="700px" :tableList="tableListFolders" @cell-click="itemViewCellClick">
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
			<el-tab-pane title1="附件信息" :label="$t('columnAccessoryInformation')" class="all-height flex-column" name="fileinfo">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_accessory" :tableList="tableListfile" @link-detailbg="downloadfiles">
						<template #tableHeaderLleft="scope">
							<el-button size="small" class="button_show" type="primary" icon="UploadFilled" plain @click="uploadFilled">{{
								$t("menu_upload")
							}}</el-button>
							<el-button
								size="small"
								class="button_show"
								type="danger"
								icon="DeleteFilled"
								@click="deleteUpload(scope.ids, scope.selectList)"
								plain
								>{{ $t("menu_deleteupload") }}</el-button
							>
							<el-button size="small" class="button_show" type="success" icon="Check" plain @click="submitWriteoffInfo()">{{
								$t("menu_submit")
							}}</el-button>
						</template>
					</zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_billappointmentdetail" @close="dialogclose" width="95%">
				<billappointmentdetail :condobj="condobj"></billappointmentdetail>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_selectBillappointmentQuery" @close="billdialogclose" width="95%">
				<billappointmentQuery :condobj="condobj"></billappointmentQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_billappointmentdetailreadonly" @close="dialogclose" width="95%">
				<billappointmentdetailreadonly :condobj="condobj"></billappointmentdetailreadonly>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.uploadnewDialogShow"
				@close="uploadnewDialogclose"
				:title="$t('companypanelreportstitle')"
				width="40%"
				customclass="selectAgentCss"
			>
				<uploadnewQuery :condobj="condobj"></uploadnewQuery>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import qs from "qs";
import { downloadFile } from "/src/utils/fileUtil.js";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
//到账信息选择
import billappointmentQuery from "@/views/writeoffManage/writeoff_dgbj/bill_query_list.vue";
//到账信息
import billappointmentdetail from "@/views/writeoffManage/writeoff_dgbj/bill_appointment_detail.vue";
//到账信息
import billappointmentdetailreadonly from "@/views/writeoffManage/writeoff_dgbj/bill_appointment_detail_readonly.vue";
//上传附件信息
import uploadnewQuery from "@/views/writeoffManage/writeoff_dgbj/selectUploadnew.vue";
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
let isdisabled = ref(false); //可编辑
let isCurrency = ref(false); //币种可编辑
let writeoffidto = ""; //销账id

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

//选择坏账
const selectisbad = async () => {
	let list = tableListFolders.tableData; //销账申请单信息
	let isbad = sformData.isbad;
	let writeoffappointmentInfos = [];
	let wainfo = {};
	for (let l of list) {
		wainfo = {};
		l.writeoffmoney = "0";
		wainfo.wbid = l.wbid;
		writeoffappointmentInfos.push(wainfo);
	}
	//如果是坏账，则删除到账的中间表信息
	if (isbad == "1" || isbad == "是") {
		let obj = { writeoffappointmentInfos: writeoffappointmentInfos };
		let par = {
			jsonString: JSON.stringify(obj)
		};
		const res = await http.post(
			"/crm/billappointment/billappointment!deleteBillappointmentInfoByWbids.action",
			qs.stringify(par)
		);
		if (res) {
		}
	}
	saveWriteoffAppointment();
};

const uploadFilled = () => {
	condobj.uploadnewDialogShow = true;
	condobj.cond.businessobjectid = sformData.writeoffid;
	condobj.cond.businesscode = "writeoff";
	condobj.cond.success = false;
};

//删除资质文件
const deleteUpload = (ids, selectList) => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			uploadFileList: []
		};
		selectList.forEach(item => {
			jsonString.uploadFileList.push({
				auditflag: item.auditflag,
				fileid: item.fileid,
				filename: item.filename,
				recorderdesc: item.recorderdesc,
				recordtime: item.recordtime,
				submitcorp: item.submitcorp,
				workflowid: item.workflowid
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			grid_accessory.value.getTableList();
		}
	});
};

//子页面关闭后的方法可以给父页面赋值等操作
const uploadnewDialogclose = () => {
	//选择附件后关闭回调
	if (condobj && condobj.objlist.success) {
		grid_accessory.value.getTableList();
	}
};

const itemViewCellClick = (row, column, cell, event) => {
	if ((column.property == "currencycostnum" && row.isedit == "1") || sformData.isbad == "1" || sformData.isbad == "是") {
		row.isEdit[column.property] = false;
		return;
	} else {
		row.isEdit[column.property] = true;
	}
};

//是否坏账切换
const selectIsbaddebt = val => {
	if (sformData.isbad_old == "1" || sformData.isbad_old == "是") {
		//isbad
		sformData.isbad = sformData.isbad_old;
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: "坏账后不能转非坏账，只能删除销账单！"
		});
		return;
	}
	console.log(sformData);
	let isbad_old = sformData.isbad_old;
	if (isbad_old == "是") {
		isbad_old = "1";
	} else if (isbad_old == "否") {
		isbad_old = "0";
	}
	if (isbad_old == sformData.isbad) {
		//旧数据等于新数据退出
		return;
	}
	ElMessageBox.confirm("是否保存修改，可能会删除关联数据？", i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	})
		.then(() => {
			selectisbad();
		})
		.catch(() => {
			sformData.isbad = isbad_old;
		});
};

//点击切换关联到账信息
const turnBillAppointment = row => {
	let isedit = row.isedit;
	let isbad = sformData.isbad;
	if (isedit == "1" || isbad == "1" || isbad == "是") {
	} else {
		if (isedit == "1") {
			return;
		}
		condobj.cond = {
			wbid: row.row.wbid,
			reservnum: row.row.appointmentid,
			writeoffid: row.row.writeoffid,
			html: "dialogShow_billappointmentdetail"
		};
		condobj.dialogShow_billappointmentdetail = true;
	}
};

const tableTabsValue = ref("writeoffInfo");

//保存销账信息
let saveWriteoffAppointment = async id => {
	let list = tableListFolders.tableData; //销账申请单信息
	let writeoffappointmentInfos = [];
	let cond = { billid: id, isbad: sformData.isbad };
	let wainfo = {};
	for (let w of list) {
		wainfo = {};
		wainfo.appointmentid = w.appointmentid;
		wainfo.invoiceno = w.invoiceno;
		wainfo.totalmoney = w.totalmoney; //申请单总金额
		//申请单总金额为0或者小于0那么表示此单在同步时有问题需要IT人员查询
		//2020-09-28 Tony 销账时取消申请单为0的检测项效验
		//if(parseFloat(wainfo.totalmoney)==0 || parseFloat(wainfo.totalmoney)<0){
		//Ext.Msg.alert(i18n.Message_OperationTip,i18n.Message_DataErrorPleaseContactITPersonnel);
		//return;
		//}
		wainfo.hktotalmoney = w.hktotalmoney;
		wainfo.canwriteoffsnum = w.canwriteoffsnum;
		wainfo.writeoffmoney = w.writeoffmoney;
		wainfo.writeoffsnum = w.writeoffsnum;
		wainfo.costnum = w.costnum;
		wainfo.refundnum = w.refundnum;
		wainfo.wbid = w.wbid;
		wainfo.writeoffid = w.writeoffid;
		wainfo.currencycanwriteoffsnum = w.currencycanwriteoffsnum;
		wainfo.currencywriteoffmoney = w.currencywriteoffmoney;
		wainfo.currencywriteoffsnum = w.currencywriteoffsnum;
		wainfo.currencycostnum = w.currencycostnum;
		wainfo.currencyrefundnum = w.currencyrefundnum;
		writeoffappointmentInfos.push(wainfo);
	}
	let obj = { writeoffappointmentInfos: writeoffappointmentInfos, cond: cond };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post(
		"/crm/writeoffappointment/writeoffappointment!saveWriteoffappointmentInfo.action",
		qs.stringify(par)
	);
	if (res) {
		let msg = res.msg;
		if (msg == "fail") {
			ElMessage.warning(i18n.t("Message_OutOfRangMoney"));
			return;
		}
		getwriteoffInfo({ writeoffid: sformData.writeoffid });
		grid_invoiceInfos.value.getTableList();
		grid_appointmentInfos.value.getTableList();
	}
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

//提交销账信息
const submitWriteoffInfo = () => {
	let v_writeoffid = sformData.writeoffid;
	if (!v_writeoffid) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	let sdata = [];
	var wainfo = {};
	for (let i of tableListFolders.tableData) {
		wainfo = {};
		wainfo.totalmoney = i.totalmoney; //申请单总金额
		wainfo.currencywriteoffmoney = i.currencywriteoffmoney;
		if (wainfo.currencywriteoffmoney < 0) {
			ElMessage.warning(i18n.t("Message_DataErrorPleaseContactITPersonnel"));
			return;
		}
		wainfo.currencycostnum = i.currencycostnum;
		wainfo.currencywriteoffsnum = i.currencywriteoffsnum;
		if (
			parseFloat(wainfo.currencycostnum) < 0 &&
			parseFloat(wainfo.currencywriteoffmoney) != 0 &&
			wainfo.currencywriteoffsnum != null &&
			parseFloat(wainfo.currencywriteoffsnum) == 0
		) {
			if (
				parseFloat(wainfo.totalmoney) ==
				(parseFloat(wainfo.currencywriteoffmoney) + parseFloat(wainfo.currencycostnum)).toFixed(2)
			) {
			} else {
				ElMessage.warning(i18n.t("Message_OutOfRangMoney"));
				return;
			}
		}
	}
	ElMessageBox.confirm(i18n.t("alertConfirmsubmission"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		sdata.push(sformData);
		let jsonString = {
			writeoffInfos: sdata
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/writeoff/writeoff!submitWriteoffInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_writeoffbatchdetail = false;
		}
	});
};

//判断是否是数字,是就返回true
const isNOWNumber = val => {
	if (!isNaN(parseFloat(val)) && isFinite(val)) {
		return parseFloat(val).toFixed(2);
	} else {
		return 0;
	}
};

//子页面关闭后的方法可以给父页面赋值等操作
const billdialogclose = async () => {
	if (condobj && condobj.cond) {
		//选择批量销账数据的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_selectBillappointmentQuery") {
				//选择到账信息
				let obj = condobj.objlist;
				if (obj.currencybalance && obj.billcode) {
					let vdata = [];
					let billappointments = []; //不同币种的汇率后到账关联申请单数据
					//需要批量销账的总金额=每个申请单的可冲销金额之和
					let totalCanwriteoffsnum = 0; //汇总成港币可冲销金额
					//需要校验的批量冲销到账实时余额
					let currencybillappointbalancetrs = 0; //外币到账可冲销金额递减
					let currencytotalCanwriteoffsnum = 0; //本次可冲销总金额
					let billcurrencybalance = 0; //到账外币可冲销余额
					let currencybalanceprice = obj.currencybalance; //外币未冲销余额
					let handler = false;
					let currencybillbalance = undefined;
					if (currencybalanceprice == "") {
						currencybalanceprice = 0;
					}
					let billcode = obj.billcode; //到账编号
					let cond = { billcode: billcode, writeoffid: writeoffidto }; //数据
					let jsonString = {
						cond: cond
					};
					let params = {
						jsonString: JSON.stringify(jsonString)
					};
					const res = await http.post("/crm/bill/bill!calculatorCurrencybillappointbalance.action", qs.stringify(params));
					if (res) {
						if (res.billInfo && res.billInfo.length == 1) {
							currencybillappointbalancetrs = res.billInfo[0].currencybillappointbalance; //可冲销余额已提交或未提交也包含在内
							billcurrencybalance = res.billInfo[0].currencybalance; //到账可冲销余额
						}
						let selectList = grid_appointmentInfos.value.selectList; //选中的数据
						let v_records = tableListFolders.tableData;
						let foldscurrencyrate = "";
						let foldscurrencies = "";
						let currencies = obj.currencies; //币种
						let exchangerate = obj.exchangerate; //汇率
						let billid = obj.billid; //到账主键id
						let billRemark = ""; //汇率
						var mess = i18n.t("Message_BillToFoldersDifferenceValue");
						if (!mess) {
							mess = "到账折算申请单可冲销金额{0},本次冲销总金额{1}，差值{2}。";
						}
						for (let s of selectList) {
							let writeoffid = s.writeoffid; //主表主键id
							let reservnum = s.appointmentid; //报价单号
							let wbid = s.wbid; //子表主键
							let isedit = s.isedit; //是否已销账完成
							foldscurrencies = s.currencyname; //币种
							foldscurrencyrate = s.currencyrate; //汇率
							let canwriteoffsnum = s.canwriteoffsnum; //可冲销金额
							let currencycanwriteoffsnum = s.currencycanwriteoffsnum; //外币本次可冲销金额
							if (canwriteoffsnum == "") {
								canwriteoffsnum = "0";
							}
							if (currencycanwriteoffsnum == "") {
								currencycanwriteoffsnum = "0";
							}
							totalCanwriteoffsnum += parseFloat(canwriteoffsnum); //汇总成港币可冲销金额
							currencytotalCanwriteoffsnum += parseFloat(currencycanwriteoffsnum); //汇总本次可冲销金额
							let money = obj.money; //港币金额
							let writesum = obj.writesum; //已冲销金额
							let retreatmoney = obj.retreatmoney; //退款金额
							let balance = obj.balance; //港币冲销余额
							let currencyamount = obj.currencyamount; //外币总金额
							let currencywritesum = obj.currencywritesum; //外币已冲销金额
							let currencyretreatmoney = obj.currencyretreatmoney; //外币退款金额
							let currencybalance = obj.currencybalance; //外币未冲销余额
							let billappointbalance = obj.billappointbalance; //本次可冲销总金额（没有数据来源）
							let billetoappoint = canwriteoffsnum; //港币可冲销金额
							let currencybilletoappoint = currencycanwriteoffsnum; //外币可冲销金额
							let billappointment = {
								billid: billid, //到账主键id
								billmoney: money, //到账金额港币
								billwritesum: writesum, //已冲销金额
								retreatmoney: retreatmoney, //退款金额
								billbalance: balance, //港币冲销余额
								currencies: currencies, //币种
								exchangerate: exchangerate, //汇率
								billetoappoint: billetoappoint, //港币可冲销金额
								foldertotalmoney: parseFloat(currencyamount).toFixed(2), //到账币种不同时，显示的申请为准的总金额
								currencybillmoney: currencyamount, //到账金额（外币）
								currencybillwritesum: currencywritesum, //到账单已冲销金额（外币）
								currencyretreatmoney: currencyretreatmoney, //外币退款金额
								currencybillbalance: currencybalance, //到账单冲销余额（外币）
								currencybilletoappoint: currencybilletoappoint, //本次申请单可冲销金额
								writeoffid: writeoffid, //销账主表id
								reservnum: reservnum, //报价id
								status: isedit, //状态
								wbid: wbid //到账关联申请单子表主键id
							};
							if (isedit != "1") {
								if (foldscurrencies == currencies) {
									vdata.push(billappointment);
								} else {
									//不同币种
									handler = true;
									vdata.push(billappointment);
								}
							}
						}
						if (handler) {
							handler = false;
							let cond = {
								foldscurrencyrate: foldscurrencyrate,
								exchangerate: obj.exchangerate,
								foldscurrencies: foldscurrencies,
								currencies: obj.currencies,
								batchwriteoff: "Y",
								billdate: obj.billdate
							};
							let jsonStringto = {
								billappointmentInfos: vdata,
								cond: cond
							};
							let paramsto = {
								jsonString: JSON.stringify(jsonStringto)
							};
							const resto = await http.post(
								"/crm/billappointment/billappointment!calculatorExchangerates.action",
								qs.stringify(paramsto)
							);
							if (resto) {
								if (resto != null && resto.billappointmentInfos != null && resto.billappointmentInfos.length > 0) {
									billRemark = resto.billappointmentInfos[0].remark;
									//到账冲余额外币币种不一样
									currencybillbalance = parseFloat(resto.billappointmentInfos[0].currencybillbalance);
									billappointments = resto.billappointmentInfos;
									handler = true;
								} else {
									ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
								}
							}
						} else {
							handler = true;
						}
						if (!handler) {
							return;
						}
						//未提交或提交未通过的可冲销余额不等于0
						if (currencybillappointbalancetrs == 0) {
							currencybillappointbalancetrs = currencybalanceprice; //外币未冲销金额
							let currencycanwriteoffsnuma = "0.00";
							//若币种相同，则汇率不用再重新计算
							if (foldscurrencies == currencies) {
								currencycanwriteoffsnuma = parseFloat(currencytotalCanwriteoffsnum).toFixed(2); //汇总后本次可冲销金额
							} else {
								if (billRemark != null && billRemark != "") {
									let number = billRemark.indexOf("_");
									if (number > 0) {
										foldscurrencyrate = billRemark.substring(0, number);
										exchangerate = billRemark.substring(number + 1, billRemark.length - 1);
									}
								}
								//本次冲销港币价格
								currencycanwriteoffsnuma = parseFloat((currencytotalCanwriteoffsnum * foldscurrencyrate) / exchangerate).toFixed(
									2
								);
							}

							if (isNOWNumber(currencybillappointbalancetrs) < isNOWNumber(currencycanwriteoffsnuma)) {
								ElMessage.warning(i18n.t("Message_selectbillinfo"));
								return;
							}
						} else {
							//可冲销金额不为0才做判断
							if (billcurrencybalance != 0) {
								//申请单币种和到账币种一样
								if (foldscurrencies == currencies) {
									//一样直接比较可冲销金额是否小于本次冲销总金额
									if (isNOWNumber(billcurrencybalance) < isNOWNumber(currencytotalCanwriteoffsnum)) {
										//如果本次可冲销金额小于本次冲销总金额那么计算出其差值
										let difference = parseFloat(currencytotalCanwriteoffsnum - billcurrencybalance).toFixed(2); //本次冲销总金额减去可冲销金额等于差值
										//提示信息：到账折算申请单可冲销金额{0},本次冲销总金额{1}，差值{2}。
										//替换如：到账折算申请单可冲销金额2080.33,本次冲销总金额2080.42，差值0.09。
										let message = mess
											.replace(",", billcurrencybalance + ";")
											.replace(",", currencytotalCanwriteoffsnum + ",")
											.replace(".", difference + ".")
											.replace("，", billcurrencybalance + "；")
											.replace("，", currencytotalCanwriteoffsnum + "，")
											.replace("。", difference + "。");
										ElMessage.warning(message);
										return;
									}
								} else {
									//申请单币种和到账币种不一样
									//billremark里面存了生请单币种和到账单币种的汇率用“_”隔开
									if (billRemark != null && billRemark != "") {
										let number = billRemark.indexOf("_");
										if (number > 0) {
											foldscurrencyrate = billRemark.substring(0, number); //申请单币种汇率
											exchangerate = billRemark.substring(number + 1, billRemark.length - 1); //到账单币种汇率
										}
									}
									//把到账可冲销金额币种转成到账折算申请单可冲销金额
									let billcurrencybalanceExchange = parseFloat((billcurrencybalance * exchangerate) / foldscurrencyrate).toFixed(
										2
									);
									//可冲销金额不能小于本次冲销总金额
									if (isNOWNumber(billcurrencybalanceExchange) < isNOWNumber(currencytotalCanwriteoffsnum)) {
										//差值 本次冲销总金额-到账折算申请单可冲销金额=差值
										let difference = parseFloat(currencytotalCanwriteoffsnum - billcurrencybalanceExchange).toFixed(2);
										//提示信息：到账折算申请单可冲销金额{0},本次冲销总金额{1}，差值{2}。
										//替换如：到账折算申请单可冲销金额2080.33,本次冲销总金额2080.42，差值0.09。
										let message = mess
											.replace(",", billcurrencybalance + ";")
											.replace(",", currencytotalCanwriteoffsnum + ",")
											.replace(".", difference + ".")
											.replace("，", billcurrencybalance + "；")
											.replace("，", currencytotalCanwriteoffsnum + "，")
											.replace("。", difference + "。");
										ElMessage.warning(message);
										return;
									}
								}
							}
							/* ▲ */
							//未提交或已提交未通过可冲销余额不等于0
							if (
								currencybillappointbalancetrs != 0 &&
								isNOWNumber(currencybillappointbalancetrs) != isNOWNumber(billcurrencybalance)
							) {
								//申请单币种和到账币种一样
								if (foldscurrencies == currencies) {
									//一样直接比较可冲销金额是否小于本次冲销总金额
									if (isNOWNumber(currencybillappointbalancetrs) < isNOWNumber(currencytotalCanwriteoffsnum)) {
										//如果本次可冲销金额小于本次冲销总金额那么计算出其差值
										let differenceto = parseFloat(currencytotalCanwriteoffsnum - currencybillappointbalancetrs).toFixed(2); //本次冲销总金额减去可冲销余额等于差值
										//提示信息：到账折算申请单可冲销金额{0},本次冲销总金额{1}，差值{2}。
										//替换如：到账折算申请单可冲销金额2080.33,本次冲销总金额2080.42，差值0.09。
										let message = mess
											.replace(",", billcurrencybalance + ";")
											.replace(",", currencytotalCanwriteoffsnum + ",")
											.replace(".", difference + ".")
											.replace("，", billcurrencybalance + "；")
											.replace("，", currencytotalCanwriteoffsnum + "，")
											.replace("。", differenceto + "。");
										ElMessage.warning(message);
										return;
									}
								} else {
									//申请单币种和到账币种不一样
									//billremark里面存了生请单币种和到账单币种的汇率用“_”隔开
									if (billRemark != null && billRemark != "") {
										let number = billRemark.indexOf("_");
										if (number > 0) {
											foldscurrencyrate = billRemark.substring(0, number); //申请单币种汇率
											exchangerate = billRemark.substring(number + 1, billRemark.length - 1); //到账单币种汇率
										}
									}
									//把可冲销余额币种转成到账折算申请单可冲销金额币种
									let currencybillappointbalancetrsExchange = parseFloat(
										(currencybillappointbalancetrs * exchangerate) / foldscurrencyrate
									).toFixed(2);
									//可冲销金额不能小于本次冲销总金额
									if (isNOWNumber(currencybillappointbalancetrsExchange) < isNOWNumber(currencytotalCanwriteoffsnum)) {
										//差值 本次冲销总金额-到账折算申请单可冲销金额=差值
										let differenceto = parseFloat(currencytotalCanwriteoffsnum - currencybillappointbalancetrsExchange).toFixed(
											2
										);
										//提示信息：到账折算申请单可冲销金额{0},本次冲销总金额{1}，差值{2}。
										//替换如：到账折算申请单可冲销金额2080.33,本次冲销总金额2080.42，差值0.09。
										let message = mess
											.replace(",", billcurrencybalance + ";")
											.replace(",", currencytotalCanwriteoffsnum + ",")
											.replace(".", difference + ".")
											.replace("，", billcurrencybalance + "；")
											.replace("，", currencytotalCanwriteoffsnum + "，")
											.replace("。", differenceto + "。");
										ElMessage.warning(message);
										return;
									}
								}
							}
						}
						let billcurrencybillbalance = 0;
						//到账可冲销余额 如果币种一致那么此时可冲销金额是为null的
						if (foldscurrencies == currencies) {
							if (currencybillappointbalancetrs > 0) {
								//如果没有关联那么不会有数据
								billcurrencybillbalance = currencybillappointbalancetrs;
							} else {
								billcurrencybillbalance = currencybalance;
							}
						} else {
							billcurrencybillbalance = currencybillbalance;
						}
						//如果当前可冲销金额存在已对应的销账未提交那么就比较可冲销余额，余额小则作为最小可冲销余额

						let billinsertList = [];
						if (billappointments != null && billappointments.length > 0) {
							billinsertList = billappointments;
						} else {
							billinsertList = vdata;
						}
						if (billinsertList != null && billinsertList.length > 1) {
							for (let j = 0; j < billinsertList.length; j++) {
								for (let v of selectList) {
									if (v.wbid == billinsertList[j].wbid) {
										if (j == billinsertList.length - 1) {
											if (billcurrencybillbalance < parseFloat(billinsertList[j].currencybilletoappoint)) {
												billinsertList[j].currencybilletoappoint = billcurrencybillbalance;
											} else {
												billinsertList[j].currencybilletoappoint = billinsertList[j].currencybilletoappoint;
											}
										} else {
											if (v.isedit == "0") {
												billcurrencybillbalance = billcurrencybillbalance - parseFloat(billinsertList[j].currencybilletoappoint);
											}
										}
									}
								}
							}
						}
						let condobj = { isbatxh: "1" }; //数据
						let jsonStringBa = {
							billappointmentInfos: billinsertList,
							cond: condobj
						};
						let params = {
							jsonString: JSON.stringify(jsonStringBa)
						};
						try {
							const billa = await http.post(
								"/crm/billappointment/billappointment!insertBillappointmentInfos.action",
								qs.stringify(params)
							);
							if (billa) {
								let writecurrencybillbalance = currencybillbalance;
								//如果当前可冲销金额存在已对应的销账未提交那么就比较可冲销余额，余额小则作为最小可冲销余额

								for (let j = 0; j < v_records.length; j++) {
									for (let u of billinsertList) {
										if (v_records[j].wbid == u.wbid) {
											if (j == v_records.length - 1) {
												if (writecurrencybillbalance < parseFloat(v_records[j].currencycanwriteoffsnum)) {
													v_records[j].writeoffmoney = v_records[j].canwriteoffsnum; //港币可冲销金额
													v_records[j].currencywriteoffmoney = writecurrencybillbalance;
												} else {
													v_records[j].writeoffmoney = v_records[j].canwriteoffsnum; //港币可冲销金额
													v_records[j].currencywriteoffmoney = v_records[j].currencycanwriteoffsnum; //外币可冲销金额
												}
											} else {
												if (v_records[j].isedit == "0") {
													writecurrencybillbalance = writecurrencybillbalance - parseFloat(v_records[j].currencycanwriteoffsnum);
													v_records[j].writeoffmoney = v_records[j].canwriteoffsnum;
													v_records[j].currencywriteoffmoney = v_records[j].currencycanwriteoffsnum;
												}
											}
										}
									}
								}
								saveWriteoffAppointment(billid);
							}
						} catch (error) {
							if (error.response) {
								let data = error.response.data;
								if (data) {
									if (data.indexOf("fail") >= 0) {
										ElMessage.warning(i18n.t("Message_Samebillnotaudit"));
										return;
									} else if (data.indexOf("many") >= 0) {
										ElMessage.warning(i18n.t("Message_OutOfRangMoney"));
										return;
									} else {
										ElMessage.warning(i18n.t("Message_OperationFailure"));
										return;
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

//批量销账申请单信息
const batchWriteOffAppointment = () => {
	let editList = grid_appointmentInfos.value.getEditSelectList(); //编辑后的数据
	if (editList && editList.length > 0) {
		ElMessage.warning("成本费编辑后请优先保存！");
		return;
	}
	let isbad = sformData.isbad;
	if (sformData.isbad == "是" || sformData.isbad == "1") {
		ElMessage.warning("坏账无法进行销账！");
		return;
	}
	let selectList = grid_appointmentInfos.value.selectList;
	if (selectList < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	let currencyrate = "";
	for (let l of selectList) {
		if (!currencyrate) {
			currencyrate = l.currencyrate;
		}
		if (currencyrate != l.currencyrate) {
			//批量销账汇率必须一致!
			ElMessage.warning(i18n.t("message_BatchWriteOffRatesMustBeConsistent"));
			return;
		}
		if (l.currencywriteoffmoney && l.currencywriteoffmoney != 0) {
			ElMessage.warning("申请单[" + l.appointmentid + "]已关联到账单不能批量销账!");
			return;
		}
	}
	condobj.cond = {
		html: "dialogShow_selectBillappointmentQuery"
	};
	condobj.dialogShow_selectBillappointmentQuery = true;
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
		sformData.isbad_old = sformData.isbad; //保持原始值
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
		let v_readOnly = props.condobj.cond.readonly; //只读
		if (v_readOnly == "true" || v_readOnly == "invoice") {
			isdisabled.value = true;
		} else {
			saveShow.value = true;
		}
		writeoffidto = writeoffid; //销账主键id
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
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue_grid_invoiceInfos",
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
			type: "Input",
			width: "160"
		},
		{
			title: "打印日期",
			label: "columnwriteoff_invoiceprintdate",
			prop: "PRINTDATE",
			type: "Input",
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
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue_grid_appointmentInfos",
	tableToolbar: {
		right: false
	},
	//表单可编辑
	edit: true,
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
			width: "140",
			edit: true
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
			width: "160"
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
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue_grid_billInfosquery",
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
			type: "Input",
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
			typeData: costtype
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
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue_grid_calculatormoneyshow",
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
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue_grid_writeoffInfos_query",
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

//表格invoice信息
const grid_accessory = ref();
const tableListfile = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue_grid_accessory",
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
