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
						v-show="buttonShow"
						type="primary"
						icon="Document"
						plain
						@click="saveInvoiceInfo()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button size="small" type="success" icon="Check" v-show="buttonShow" plain @click="approveInvoiceInfos('0')">{{
						$t("menu_approve")
					}}</el-button>
					<el-button size="small" type="danger" icon="Close" v-show="buttonShow" plain @click="approveInvoiceInfos('-2')">{{
						$t("menu_reject2Submitor")
					}}</el-button>
					<el-button
						size="small"
						v-show="fileShow"
						type="primary"
						icon="UploadFilled"
						plain
						@click="dialogShow('dialogShow_invoiceUploadNew')"
						>{{ $t("UPLOAD_uploadFile") }}</el-button
					>
					<el-button size="small" type="danger" icon="Close" v-show="fileShow" plain @click="deleteInvoiceUpload()">{{
						$t("UPLOAD_deleteFile")
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
								<el-input type="text" clearable v-model="sformData.corpno" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitleinvoicecorpdesc') + ':'" title1="客户名称">
								<el-input type="text" v-model="sformData.corpname" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('itemtitleinvoicecurrencies') + ':'" title1="币种">
								<el-input type="text" v-model="sformData.currencies" readonly> </el-input>
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
								<el-input type="text" v-model="sformData.invoicecode" :disabled="isdisabled"></el-input>
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
									disabled="true"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6"> </el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('basecolumnElectronic_Invoice') + ':'" title1="电子发票">
								<el-link href="" @click="invoicedownload_renderer()" type="primary"
									><span v-html="sformData.invoicefilename"></span
								></el-link>
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
				:label="$t('itemtitlebase_userQualificationDocument2')"
				class="all-height flex-column"
				name="fileinfo"
			>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_accessory" :tableList="tableListfile" @link-detailbg="downloadfiles"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<el-dialog v-model="condobj.dialogShow_invoicePDFDownloadFile" width="85%" :title="$t('DOWNLOAD_download')">
			<iframe :src="downloadUrl" style="width: 100%; height: 440px"></iframe>
		</el-dialog>

		<ZDialog v-model="condobj.uploadnewDialogShow" @close="dialogclose" :title="$t('itemtitleyingjiupfile')" width="50%">
			<uploadnewQuery :condobj="condobj"></uploadnewQuery>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted, watch } from "vue";
import qs from "qs";
import { getdropSownSelection } from "/src/utils/util.js";
import { downloadFile } from "/src/utils/fileUtil.js";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { GlobalStore } from "/src/store/globalStore.js";
import ZDialog from "/src/components/ZDialog.vue";
//附件上传页面
import uploadnewQuery from "@/views/writeoffManage/invoice/selectUploadnew.vue";
const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
let isdisabled = ref(true); //可编辑
let buttonShow = ref(false); //按钮不可显示
let fileShow = ref(false); //上传删除附件按钮不可显示
let downloadUrl = ref(""); //文件路径
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
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
	invoicefilename: "",
	filepath: "",
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

const tableTabsValue = ref("invoiceinfo");

//删除上传的电子税票
let deleteInvoiceUpload = async () => {
	let businessobjectid = sformData.invoiceid; //主键id
	let filepath = sformData.filepath; //税票上传地址
	//税票主键id不为空且电子税票有上传记录
	if (businessobjectid && filepath) {
		//删除上传的电子税票，保留上传记录。
		let cond = { businessobjectid: businessobjectid, invoiceid: businessobjectid };
		let par = {
			jsonString: JSON.stringify({ cond: cond })
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFile.action", qs.stringify(par));
		if (res) {
			getinvoiceInfo({ invoiceid: businessobjectid });
		}
	}
};

//保存税票信息
let saveInvoiceInfo = async () => {
	if (!sformData.exchangerate || !sformData.corpno || !sformData.corpname || !sformData.currencies || !sformData.invoiceid) {
		ElMessage.warning(i18n.t("Message_TaxTicketTnformation"));
		return;
	}
	let obj = { invoiceInfo: sformData };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/invoice/invoice!updateInvoiceInfo.action", qs.stringify(par));
	if (res) {
		for (let key in res.invoiceInfo[0]) {
			//判定 invoiceInfo 的key 是否存在 sformData 的key
			sformData[key] = res.invoiceInfo[0][key];
		}
	}
};

//获取税票上传附件权限
let getInvoiceRoleInfo = async () => {
	if (!userInfo.usercode) {
		ElMessage.warning(i18n.t("menubaselocalusersuserinfo"));
		return;
	}
	//查询用户是否有权限上传电子水单
	let cond = { exactrolecode: "m_tax_upload", usercode: userInfo.usercode };
	let par = {
		jsonString: JSON.stringify({ cond: cond })
	};
	const res = await http.post("/core/user/user!selectUserRoleInfoByCond.action", qs.stringify(par));
	if (res && res.userRoleInfos) {
		//有权限显示上传按钮
		if (res.userRoleInfos.length > 0) {
			fileShow.value = true;
		}
	}
};

//审核税票信息
const approveInvoiceInfos = code => {
	if (!sformData.invoiceid) {
		ElMessage.warning(i18n.t("Message_TaxTicketTnformation"));
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
		let cond = {
			opinion: approveValue.value
		};
		let invoiceInfos = [];
		invoiceInfos.push(sformData);
		let jsonString = {
			invoiceInfos: invoiceInfos,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/crm/invoice/invoice!reject.action";
		} else if (code == "-2") {
			url = "/crm/invoice/invoice!reject2Submitor.action";
		} else {
			url = "/crm/invoice/invoice!approveInvoiceInfo.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_invoicedetailApprove = false;
			grid_invoiceInfos2.value.getTableList();
		}
	});
};

//税票下载
let invoicedownload_renderer = () => {
	let filename = sformData.invoicefilename; //文件名
	let filepath = sformData.filepath; //文件路径
	let serverUrl = globalStore.serverUrl; //服务器地址
	if (filename == "" || filename == "" || filepath == "" || filepath == "") {
	} else {
		downloadUrl.value = serverUrl + "/" + filepath;
		condobj.dialogShow_invoicePDFDownloadFile = true;
		//window.location.href = serverUrl+"/"+filepath;
		//downloadFile(serverUrl+"/"+filepath, filename, {});
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
			let totalamount = 0; //申请单总金额
			let totalfolderamount = 0; //已开票总金额
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
	if (data == "dialogShow_invoiceUploadNew") {
		condobj.cond = {
			businesscode: "invoice",
			businessobjectid: sformData.invoiceid,
			html: data
		};
		condobj.uploadnewDialogShow = true;
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {
	if (condobj && condobj.cond) {
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_invoiceUploadNew") {
				//附件信息上传后关闭
				getinvoiceInfo({ invoiceid: sformData.invoiceid });
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
		let invoiceid = props.condobj.cond.invoiceid; //税票主键
		//let rasclientid = props.condobj.cond.rasclientid; //客户编码
		let workflowflag = props.condobj.cond.workflowflag; //状态
		let iauditflag = props.condobj.cond.iauditflag; //显示上传状态
		if (workflowflag == "5") {
			isdisabled.value = false;
			buttonShow.value = true;
		}
		if (invoiceid) {
			//是否能上传
			if (iauditflag && iauditflag == "Y") {
				//是否有上传附件和删除附件的按钮
				getInvoiceRoleInfo();
			}
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
			width: "160"
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
			width: "160"
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

//监听   开票金额变化,
watch(
	() => tableListFolders.tableData,
	(newValue, oldValue) => {
		let totalamount = 0; //申请单总金额
		let totalfolderamount = 0; //已开票总金额
		for (let i of newValue) {
			if (i.currency) {
				totalamount += parseFloat(i.currency);
			}
			if (i.totalfolderamount) {
				totalfolderamount += parseFloat(i.totalfolderamount);
			}
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
