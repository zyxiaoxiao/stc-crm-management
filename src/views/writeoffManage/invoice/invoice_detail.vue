<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="开票信息" :label="$t('itemtitleinvoiceinvoiceinfo')" name="invoiceinfo">
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
					<el-button size="small" type="success" icon="Check" plain @click="submitInvoiceInfo">{{
						$t("SRM_submit")
					}}</el-button>
				</div>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="form_billInfo">
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicetax') + ':'" title1="开票编号">
								<el-input type="text" v-model="sformData.taxinvoicecode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecorpno') + ':'" title1="客户号">
								<el-input type="text" clearable v-model="sformData.corpno" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_selectCustomerQuery')" icon="Search" :disabled="isdisabled"> </el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitleinvoicecorpdesc') + ':'" title1="客户名称">
								<el-input type="text" v-model="sformData.corpname" :readonly="isdisabled"> </el-input>
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
									:disabled="isCurrency"
								>
									<el-option v-for="item in currencyInfo" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceexchangerate') + ':'" title1="汇率">
								<el-input type="text" v-model="sformData.exchangerate" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceKPmoney') + ':'" title1="开票金额">
								<el-input type="text" v-model="sformData.invoicemoney" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceTotalAmountOfApplicationForm') + ':'" title1="申请单总金额">
								<el-input type="text" v-model="sformData.totalamount" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceTotalAmountOfTaxInvoiceAlreadyPaid') + ':'" title1="已开票总金额">
								<el-input type="text" v-model="sformData.totalinvoiceamount" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceinvoicecode') + ':'" title1="发票编号">
								<el-input type="text" v-model="sformData.invoicecode" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoiceinvoicedate') + ':'" title1="发票日期">
								<el-date-picker
									type="date"
									v-model="sformData.invoicedate"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
									disabled
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6"> </el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>						
					</el-row>
					<el-divider title1="创建人信息" content-position="left">{{ $t("corpinfopanelcjrxxtitle") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('columnCreatehumancoding') + ':'" title1="创建人编码">
								<el-input type="text" v-model="sformData.recordercode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnCreatehumandescription') + ':'" title1="创建人名称">
								<el-input type="text" v-model="sformData.recorderdesc" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('itemtitlestatusrecordertime') + ':'" title1="创建时间">
								<el-input type="text" v-model="sformData.recordtime" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
					<zTable ref="grid_foldersInfos" width="700px" :tableList="tableListFolders">
						<template #tableHeaderLleft="scope">
							<el-button size="small" type="primary" icon="Edit" plain @click="new_handler">{{ $t("SRM_add") }}</el-button>
							<el-button size="small" class="button_show" type="primary" icon="Document" plain @click="saveFolder_handler">{{
								$t("menu_save")
							}}</el-button>
							<el-button
								size="small"
								type="danger"
								icon="Delete"
								plain
								:disabled="!scope.isSelected"
								@click="foldersfosDelete(scope.selectList)"
								>{{ $t("SRM_delete") }}</el-button
							>
						</template>
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
			<el-tab-pane title1="税票信息" v-show="addbillShow" :label="$t('itemtitlebase_userQualificationDocument2')" class="all-height flex-column" name="fileinfo">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_accessory" :tableList="tableListfile" @link-detailbg="downloadfiles" > </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_selectFolderQuery" :title="$t('Message_OperationTipmessageselectmessage')" @close="dialogclose" width="95%">
				<selectFolderQuery :condobj="condobj"></selectFolderQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_selectCustomerQuery" :title="$t('Message_OperationTipmessageselectmessage')" @close="dialogclose" width="95%">
				<selectCustomerQuery :condobj="condobj"></selectCustomerQuery>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
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
//let data = new Date().toLocaleString();
//data = data.substring(0, data.indexOf(" "));

//let idate = moment(new Date(data)).format("YYYY-MM-DD");
//税票信息初始化信息
const sformData = reactive({
	taxinvoicecode: "",
	corpno: "",
	corpname: "",
	currencies: "",
	exchangerate: "",
	invoicemoney: "",
	totalamount: "",
	totalinvoiceamount: "",
	invoicecode: "",
	invoicedate: "",
	foldernos: "",
	remark: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	remark: "",

	corpid: "",
	invoiceid: "",
	corpnoold: "",
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
				if (sformData.currencies == "" &&  currencyInfos[i].currencyname == "RMB") {
					sformData.currencies = "RMB";
					sformData.exchangerate = currencyInfos[i].exchangerate;
				}
				omap.exchangerate = currencyInfos[i].exchangerate;
				data.push(omap);
			}
			currencyInfo.value = data;
		}
	}
};

//币种切换
const selectCurrencyChange = val => {
	for (let c of currencyInfo.value) {
		if (val == c.label) {
			sformData.exchangerate = c.exchangerate;
		}
	}
};

const tableTabsValue = ref("invoiceinfo");

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
		await grid_foldersInfos.value.getTableList();
		getinvoiceInfo({ invoiceid: sformData.invoiceid });
	}
};

//提交税票单信息
const submitInvoiceInfo = () => {
	let sdata = [];
	if(tableListFolders.tableData.length < 1){
		ElMessage.warning(i18n.t("menu_chooseFolder"));
		return;
	}
	if (!sformData.taxinvoicecode) {
		ElMessage.warning(i18n.t("Message_pleaseSave"));
		return;
	}
	let invoicemoney = 0;
	for(let i of tableListFolders.tableData){
        if(!i.foinid){//没保存的税票申请单
			ElMessage.warning(i18n.t("Message_UnsavedApplication"));
		    return;
		}
		if(parseInt(i.invoicevalue) == 0){//开票金额为0
			ElMessage.warning(i18n.t("Message_ApplicationFormWith"));
		    return;
		}
		invoicemoney += i.invoicevalue;
	}
	if(invoicemoney != parseFloat(sformData.invoicemoney)){
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
		await grid_foldersInfos.value.getTableList();
		saveFolder_handler();
	}
};

//查询税票信息
let getinvoiceInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ invoiceInfo: obj })
	};
	const res = await http.post("/crm/invoice/invoice!selectInvoiceInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.invoiceInfo[0]) {
			//判定 invoiceInfo 的key 是否存在 sformData 的key
			sformData[key] = res.invoiceInfo[0][key];
		}
		if (tableListFolders.tableData.length > 0) {
			let totalamount = 0;//申请单总金额
			let totalfolderamount = 0;//已开票总金额
			for (let t of tableListFolders.tableData) {
				if (t.currency) {
					totalamount += parseFloat(t.currency);
				}
				if (t.totalfolderamount) {
					totalfolderamount += parseFloat(t.totalfolderamount);
				}
			}
			//申请单总金额
			sformData.totalamount = totalamount;
			//已开票总金额
			sformData.totalinvoiceamount = totalfolderamount;
		}
	}
};

// 显示
const dialogShow = data => {
	if (data == "dialogShow_selectCustomerQuery") {
		if (tableListFolders.tableData && tableListFolders.tableData.length > 0) {
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
				condobj.dialogShow_selectCustomerQuery = true;
			});
		} else {
			condobj.cond = {
				lockflag: "0",
				html: data
			};
			condobj.dialogShow_selectCustomerQuery = true;
		}
	} else if (data == "dialogShow_selectCustomerQuery1") {
		condobj.cond = {
			html: data
		};
		condobj.dialogShow_selectCustomerQuery1 = true;
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
										grid_foldersInfos.value.addRowData(row);
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
										grid_foldersInfos.value.addRowData(row);
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
	if (TabPaneName == "invoiceinfo") {
		//税票信息页面
		if (invoiceid) {
			getinvoiceInfo({ invoiceid: invoiceid });
			//传参后会自动调用接口刷新
			tableListFolders.httpAttribute.baseParams["cond.invoiceid"] = invoiceid;
			grid_foldersInfos.value.reuseTableList();
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
		getcurrencyInfo(); //获取币种
		let invoiceid = props.condobj.cond.invoiceid; //税票主键
		let rasclientid = props.condobj.cond.rasclientid; //客户编码
		let workflowflag = props.condobj.cond.workflowflag; //状态
		let v_readOnly = props.condobj.cond.readonly; //只读
		if (v_readOnly == "true" || v_readOnly == "invoice") {
			isdisabled.value = true;
		} else {
			saveShow.value = true;
		}
		if (invoiceid) {
			getinvoiceInfo({ invoiceid: invoiceid });
			//传参后会自动调用接口刷新
			tableListFolders.httpAttribute.baseParams["cond.invoiceid"] = invoiceid;
			grid_foldersInfos.value.reuseTableList();
		}
	}
});

//表格发票信息
const grid_foldersInfos = ref();
const tableListFolders = reactive({
	id: "/writeoffManage/invoice/invoice_detail.vue_grid_foldersInfos",
	tableToolbar: {
		right: false
	},
	//表单可编辑
	edit: true,
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoByCond1.action",
		root: "foldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单编号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Custom",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "160"
		},
		{
			title: "申请单金额",
			label: "itemtitlefoldersvalue",
			prop: "currency",
			type: "Input",
			width: "140"
		},
		{
			title: "开票金额",
			label: "itemtitleinvoiceKPmoney",
			prop: "invoicevalue",
			type: "Number",
			min: 0,
			precision: 2,
			width: "160",
			edit: true
		},
		{
			title: "已开票总金额",
			label: "itemtitleinvoiceTotalAmountOfTaxInvoiceAlreadyPaid",
			prop: "totalfolderamount",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "columnappointment_desc42",
			prop: "remark",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "发票id",
			label: "invoiceid",
			prop: "invoiceid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "choosed",
			label: "choosed",
			prop: "choosed",
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

//表格invoice信息
const grid_accessory = ref();
const tableListfile = reactive({
	id: "/writeoffManage/invoice/invoice_detail.vue_grid_accessory",
	//请求属性设置
	httpAttribute: {
		url: "/core/upload/upload!selectfilesInfoByCond.action",
		root: "fileInfos",
		baseParams: {'cond.filetype':'2'}
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

//监听   开票金额变化,
watch(
	() => tableListFolders.tableData,
	(newValue, oldValue) => {
		let invoicemoney = 0; //开票金额
		let totalamount = 0; //申请单总金额
		let totalfolderamount = 0; //已开票总金额
		let edit = false;
		if(newValue.length > 0){//有数据币种就不可编辑
            isCurrency.value = true;
		}else{
			isCurrency.value = false;
		}
		for (let i of newValue) {
			if (i.editShowOriginal.invoicevalue != i.invoicevalue) {
				edit = true;
			}
			invoicemoney += i.invoicevalue;
			if (i.currency) {
				totalamount += parseFloat(i.currency);
			}
			if (i.totalfolderamount) {
				totalfolderamount += parseFloat(i.totalfolderamount);
			}
		}
		if (edit) {
			sformData.invoicemoney = invoicemoney;
		}
		if (newValue.length == 0 && sformData.invoicemoney && parseFloat(sformData.invoicemoney) > 0) {
			sformData.invoicemoney = invoicemoney;
		}
		if (!sformData.totalamount || parseFloat(sformData.totalamount) == 0 || totalamount != parseFloat(sformData.totalamount)) {
			//申请单总金额
			sformData.totalamount = totalamount;
		}
		if (
			!sformData.totalinvoiceamount ||
			parseFloat(sformData.totalinvoiceamount) == 0 ||
			totalfolderamount != parseFloat(sformData.totalinvoiceamount)
		) {
			//已开票总金额
			sformData.totalinvoiceamount = totalfolderamount;
		}
	},
	{ deep: true } //深度监听
);
</script>

<style scoped lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>
