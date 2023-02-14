<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="销账单信息" :label="$t('itemtitlewriteoffswriteoffinfo')" name="writeoffInfo">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveInvoiceInfo()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button size="small" type="success" icon="Check" plain @click="submitInvoiceInfo">{{ $t("SRM_submit") }}</el-button>
				</div>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="form_billInfo">
					<el-divider title1="销账单信息" content-position="left">{{ $t("itemtitlewriteoffswriteoffinfo") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('columnwriteoff_application_listwriteoffNo') + ':'" title1="销账单号">
								<el-input type="text" v-model="sformData.writeoffcode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columncurrencywriteoff_application_listCanWriteOffsdetail') + ':'" title1="本次外币可冲销金额">
								<el-input type="text" clearable v-model="sformData.currencywriteoffmoney" class="input-with-select" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columncurrencywriteoff_application_listTotalAmountdetail') + ':'" title1="本次外币冲销总金额">
								<el-input type="text" v-model="sformData.currencytotalmoney" :readonly="isdisabled"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecurrencies') + ':'" title1="是否坏账">
								<el-select
									v-model="sformData.isbad"
									class="full-width-input"
									filterable
									placeholder="Select"
									@change="selectCurrencyChange"
									:disabled="isCurrency"
								>
									<el-option v-for="item in costtype" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecorpno') + ':'" title1="客户编号">
								<el-input type="text" v-model="sformData.corpno" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumncustomername') + ':'" title1="客户名称">
								<el-input type="text" v-model="sformData.corpdesc" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnCreatehumancoding') + ':'" title1="创建人编码">
								<el-input type="text" v-model="sformData.recordercode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnCreatehumandescription') + ':'" title1="创建人名称">
								<el-input type="text" v-model="sformData.recorderdesc" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitlestatusrecordertime') + ':'" title1="创建时间">
								<el-input type="text" v-model="sformData.recordtime" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
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
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
					<zTable ref="grid_appointmentInfos" width="700px" :tableList="tableListFolders">
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
			</el-tab-pane>
			<el-tab-pane
				title1="税票信息"
				v-show="addbillShow"
				:label="$t('itemtitlebase_userQualificationDocument2')"
				class="all-height flex-column"
				name="fileinfo"
			>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_accessory" :tableList="tableListfile" @link-detailbg="downloadfiles"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.dialogShow_selectFolderQuery"
				:title="$t('Message_OperationTipmessageselectmessage')"
				@close="dialogclose"
				width="95%"
			>
				<selectFolderQuery :condobj="condobj"></selectFolderQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.dialogShow_selectCustomerQuery"
				:title="$t('Message_OperationTipmessageselectmessage')"
				@close="dialogclose"
				width="95%"
			>
				<selectCustomerQuery :condobj="condobj"></selectCustomerQuery>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import qs from "qs";
import { getdropSownSelection } from "/src/utils/util.js";
import { downloadFile } from "/src/utils/fileUtil.js";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import moment from "moment";
//申请单选择
import selectFolderQuery from "@/views/writeoffManage/invoice/select_folder.vue";
//客户选择
import selectCustomerQuery from "@/views/writeoffManage/invoice/selesctCustomer.vue";
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
let isCurrency = ref(false); //币种可编辑
let currencyInfo = ref([]); //币种
let data = new Date().toLocaleString();
data = data.substring(0, data.indexOf(" "));

let idate = moment(new Date(data)).format("YYYY-MM-DD");

let costtype = [
	{
		value: "1",
		label: i18n.t("basecolumncombined_commission")
	},
	{
		value: "0",
		label: i18n.t("basecolumnmonthly_commission")
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
const filetypeAr = getdropSownSelection("qualificationDocumentto");
const filelevelAr = getdropSownSelection("i18nCustomerapplicationFileDocumentlevel");

//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

//币种切换
const selectCurrencyChange = val => {
	for (let c of currencyInfo.value) {
		if (val == c.label) {
			sformData.exchangerate = c.exchangerate;
		}
	}
};

const tableTabsValue = ref("writeoffInfo");

//保存税票信息
let saveInvoiceInfo = async () => {
	if (!sformData.exchangerate || !sformData.corpno || !sformData.corpname || !sformData.currencies) {
		ElMessage.warning(i18n.t("Message_TaxTicketTnformation"));
		return;
	}
	await saveFolder_handler();
	let obj = { invoiceInfo: sformData };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	let url = "/crm/invoice/invoice!insertInvoiceInfo.action"; //新增
	if (sformData.invoiceid) {
		url = "/crm/invoice/invoice!updateInvoiceInfo.action"; //修改
	}
	const res = await http.post(url, qs.stringify(par));
	if (res) {
		for (let key in res.invoiceInfo[0]) {
			//判定 invoiceInfo 的key 是否存在 sformData 的key
			sformData[key] = res.invoiceInfo[0][key];
		}
	}
};

//新增税票申请单信息
const new_handler = () => {
	if (!sformData.taxinvoicecode || !sformData.currencies) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	let foldersnos = [];
	if (tableListFolders.tableData.length > 0) {
		for (let f of tableListFolders.tableData) {
			foldersnos.push(f.folderno);
		}
	}
	let foldernostr = null;
	foldernostr = foldersnos.join(",");
	condobj.cond = {
		currencyname: sformData.currencies,
		foldernostr: foldernostr,
		corpno: sformData.corpno,
		taxinvoicecode: sformData.taxinvoicecode,
		html: "dialogShow_selectFolderQuery"
	};
	condobj.dialogShow_selectFolderQuery = true;
};
//保存税票申请单信息
const saveFolder_handler = async () => {
	if (tableListFolders.tableData.length < 1) {
		return;
	}
	let jsonString = {
		foldersInfos: tableListFolders.tableData
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/folders/folders!saveFoldersInfos.action", qs.stringify(params));
	if (res) {
		await grid_invoiceInfos.value.getTableList();
		getinvoiceInfo({ invoiceid: sformData.invoiceid });
	}
};

//提交税票单信息
const submitInvoiceInfo = () => {
	let sdata = [];
	if (tableListFolders.tableData.length < 1) {
		ElMessage.warning(i18n.t("menu_chooseFolder"));
		return;
	}
	if (!sformData.taxinvoicecode) {
		ElMessage.warning(i18n.t("Message_pleaseSave"));
		return;
	}
	let invoicemoney = 0;
	for (let i of tableListFolders.tableData) {
		if (!i.foinid) {
			//没保存的税票申请单
			ElMessage.warning(i18n.t("Message_UnsavedApplication"));
			return;
		}
		if (parseInt(i.invoicevalue) == 0) {
			//开票金额为0
			ElMessage.warning(i18n.t("Message_ApplicationFormWith"));
			return;
		}
		invoicemoney += i.invoicevalue;
	}
	if (invoicemoney != parseFloat(sformData.invoicemoney)) {
		ElMessage.warning(i18n.t("Message_pleaseSave"));
		return;
	}
	ElMessageBox.confirm(i18n.t("alertConfirmsubmission"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		sdata.push(sformData);
		let jsonString = {
			invoiceInfos: sdata
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/invoice/invoice!submitInvoiceInfos.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_invoicedetailNew = false;
		}
	});
};

//删除税票申请单信息
const foldersfosDelete = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	let jsonString = {
		foldersInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/folders/folders!deleteFoldersInfos.action", qs.stringify(params));
	if (res) {
		await grid_invoiceInfos.value.getTableList();
		saveFolder_handler();
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
const dialogShow = data => {
	if (data == "dialogShow_customerQuery") {
		if (!tableListFolders.tableData && tableListFolders.tableData.length > 0) {
			ElMessageBox.confirm(i18n.t("Message_WantToContinue"), i18n.t("Message_OperationTip"), {
				confirmButtonText: i18n.t("menu_ok"),
				cancelButtonText: i18n.t("menu_cancel"),
				type: "warning",
				draggable: true
			}).then(async () => {
				await foldersfosDelete(tableListFolders.tableData); //如果确认那么就清空所有选择的申请单
				condobj.cond = {
					lockflag: "0",
					html: data
				};
				condobj.dialogShow = true;
			});
		} else {
			condobj.cond = {
				lockflag: "0",
				html: data
			};
			condobj.dialogShow_selectFolderQuery = true;
		}
	} else if (data == "dialogShow_selectCustomerQuery") {
		condobj.cond = {
			html: data
		};
		condobj.dialogShow_selectCustomerQuery = true;
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {
	if (condobj && condobj.cond) {
		//选择客户的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_selectFolderQuery") {
				//选择的申请单
				let list = condobj.objlist;
				if (list && list.length > 0) {
					ElMessageBox.confirm(i18n.t("是否自动填充申请单金额?"), i18n.t("reminder"), {
						confirmButtonText: i18n.t("menu_ok"),
						cancelButtonText: i18n.t("menu_cancel"),
						type: "warning",
						draggable: true
					})
						.then(() => {
							//确认赋值
							let row = {};
							if (list.length > 0) {
								let copy = true; //是否没有重复的
								for (let l of list) {
									copy = true;
									//重复的不用新增了
									if (l.folderno && tableListFolders.tableData && tableListFolders.tableData.length > 0) {
										for (let t of tableListFolders.tableData) {
											if (l.folderno == t.folderno) {
												//说明数据中有重复的
												copy = false;
											}
										}
									}
									row = {};
									if (copy) {
										row.folderno = l.folderno; //申请单号
										row.currency = l.currency; //申请单金额
										row.invoicevalue = parseFloat(l.currency); //开票金额
										row.rasclientid = l.rasclientid; //客户号
										row.invoiceid = sformData.invoiceid; //税票主键
										row.choosed = sformData.taxinvoicecode; //税票编号
										row.taxinvoicecode = sformData.taxinvoicecode; //税票编号
										row.invoicecode = sformData.invoicecode; //发票编号
										row.remark = ""; //备注
										row.totalfolderamount = parseFloat(l.invoicevalue); //已开票金额
										grid_invoiceInfos.value.addRowData(row);
									}
								}
							}
						})
						.catch(() => {
							//取消赋值
							let row = {};
							if (list.length > 0) {
								let copy = true; //是否没有重复的
								for (let l of list) {
									copy = true;
									//重复的不用新增了
									if (l.folderno && tableListFolders.tableData && tableListFolders.tableData.length > 0) {
										for (let t of tableListFolders.tableData) {
											if (l.folderno == t.folderno) {
												//说明数据中有重复的
												copy = false;
											}
										}
									}
									row = {};
									if (copy) {
										row.folderno = l.folderno; //申请单号
										row.currency = l.currency; //申请单金额
										row.invoicevalue = 0; //开票金额
										row.rasclientid = l.rasclientid; //客户号
										row.invoiceid = sformData.invoiceid; //税票主键
										row.choosed = sformData.taxinvoicecode; //税票编号
										row.taxinvoicecode = sformData.taxinvoicecode; //税票编号
										row.invoicecode = sformData.invoicecode; //发票编号
										row.remark = ""; //备注
										row.totalfolderamount = parseFloat(l.invoicevalue); //已开票金额
										grid_invoiceInfos.value.addRowData(row);
									}
								}
							}
						});
				}
			} else if (condobj.cond.html == "dialogShow_selectCustomerQuery") {
				//选择客户信息
				let obj = condobj.objlist;
				if (obj.corpid) {
					sformData.corpno = obj.corpno; //客户号
					sformData.corpname = obj.corpdesc; //客户名称
					sformData.corpid = obj.corpid; //客户id
					sformData.corpnoold = obj.corpnoold; //旧客户号
				}
			}
		}
	}
};

//切换tab时触发
const tabChange = TabPaneName => {
	let invoiceid = sformData.invoiceid;
	if (TabPaneName == "writeoffInfo") {
		//税票信息页面
		if (invoiceid) {
			getinvoiceInfo({ invoiceid: invoiceid });
			//传参后会自动调用接口刷新
			tableListFolders.httpAttribute.baseParams["cond.invoiceid"] = invoiceid;
			grid_invoiceInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "writeoffInfo1") {
		//invoice列表
		if (sformData.corpid) {
			//传参后会自动调用接口刷新
			tableListfile.httpAttribute.baseParams["cond.corpid"] = sformData.corpid;
			grid_accessory.value.reuseTableList();
		}
	} else if (TabPaneName == "fileinfo") {
		//invoice列表
		if (sformData.corpid) {
			//传参后会自动调用接口刷新
			tableListfile.httpAttribute.baseParams["cond.corpid"] = sformData.corpid;
			grid_accessory.value.reuseTableList();
		}
	}
};

onMounted(() => {
	if (props.condobj) {
		let writeoffid = props.condobj.cond.writeoffid; //销账主键
        let brachbatchno = props.condobj.cond.brachbatchno; //是否导入
		let v_readOnly = props.condobj.cond.readonly; //只读
		if (v_readOnly == "true" || v_readOnly == "invoice") {
			isdisabled.value = true;
		} else {
			saveShow.value = true;
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
			type: "Input",
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
			min: 0,
			precision: 2,
			width: "140",
			edit: true
		},
		{
			title: "外币可冲销金额",
			label: "columncurrencywriteoff_application_listCanWriteOffs.detail",
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
			width: "160",
			edit: true
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

//表格invoice信息
const grid_accessory = ref();
const tableListfile = reactive({
	id: "/writeoffManage/invoice/invoice_detail.vue_grid_accessory",
	//请求属性设置
	httpAttribute: {
		url: "/core/upload/upload!selectfilesInfoByCond.action",
		root: "fileInfos",
		baseParams: { "cond.filetype": "2" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "文档主题",
			label: "textfieldfieldLabeldocumenttheme",
			prop: "theme",
			type: "Input",
			width: "200"
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "文档类型",
			label: "textfieldfieldLabeldocumenttype",
			prop: "filetype",
			type: "Select",
			width: "160",
			typeData: filetypeAr
		},
		{
			title: "文档等级",
			label: "textfieldfieldLabeldocumentlevel",
			prop: "filelevel",
			type: "Select",
			width: "160",
			typeData: filelevelAr
		},
		{
			title: "文档大小",
			label: "companypanel3filesizetitle",
			prop: "filesize",
			type: "Input",
			width: "160"
		},
		{
			title: "扩展名",
			label: "companypanel3extensiontitle",
			prop: "extension",
			type: "Input",
			width: "120"
		},
		{
			title: "文档说明",
			label: "textfieldfieldLabeldocumentdescription",
			prop: "remark",
			type: "Input",
			width: "300"
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
			prop: "recordertime",
			type: "Input",
			width: "300"
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
