<template>
	<div class="all-height flex-column">
		<el-tabs class="flex-column flex-1" v-model="tableTabsValue" type="border-card" @tab-change="tabChange">
			<el-tab-pane title1="客户解锁信息" :label="$t('panelbaseCustomerreleaseinformation')" :name="0">
				<div v-if="props.condobj.readonly == false" style="margin: 10px; text-align: right">
					<el-button size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
						{{ $t("menu_save") }}
					</el-button>
					<el-button size="small" type="success" icon="Check" plain @click="Submit" :disabled="!formData.lockid">{{
						$t("menu_submit")
					}}</el-button>
				</div>
				<div v-if="props.condobj.workflowflag == 2" style="margin: 10px; text-align: right">
					<el-button
						size="small"
						type="success"
						icon="Check"
						plain
						@click="auditAction('/crm/enterpriselock/enterpriselock!approve.action', 'Approve !')"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						size="small"
						type="danger"
						icon="Close"
						plain
						@click="auditAction('/crm/enterpriselock/enterpriselock!reject.action', 'Reject !')"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						size="small"
						type="danger"
						icon="Close"
						plain
						@click="auditAction('/crm/enterpriselock/enterpriselock!reject2Submitor.action', 'Reject !')"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<el-form
					style="margin: 0px 15px"
					label-position="right"
					label-width="130px"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-divider title1="基本信息" content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')" prop="corpno">
								<el-input type="text" v-model.trim="formData.corpno" readonly>
									<template v-if="props.condobj.readonly == false" #append>
										<el-button icon="Search" @click="addCompanyname" /> </template
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')">
								<el-input type="text" v-model.trim="formData.corpdesc" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属部门" :label="$t('corpinfopaneldepartmentdesctitle')">
								<el-input type="text" clearable readonly v-model="formData.departmentname"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属分公司" :label="$t('enterpriselockinfoCompanyNametitle')">
								<el-input type="text" clearable readonly v-model="formData.companyname"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="AR金额" :label="$t('enterpriselockinfoARAmounttitle_hkd')" prop="arcount">
								<el-input-number
									v-model.number="formData.arcount"
									:min="0"
									controls-position="right"
									style="width: 100%"
									:readonly="props.condobj.readonly"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="承诺收款期" :label="$t('enterpriselockinfoPromiseDatetitle')" prop="promisedate">
								<el-date-picker
									v-model="formData.promisedate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
									:readonly="props.condobj.readonly"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="请选择解锁范围" :label="$t('enterpriselockinfounlockrange')">
								<el-select
									v-model="formData.unlock"
									class="full-width-input"
									clearable
									filterable
									:disabled="props.condobj.readonly"
								>
									<el-option v-for="item in unlock" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="24">
							<el-form-item title1="解锁原因" :label="$t('enterpriselockinfoUnlockReasontitle')">
								<el-input type="textarea" v-model="formData.unlockreason" :readonly="props.condobj.readonly" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="申请人信息" content-position="left">{{ $t("corpinfopanelcjrxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="申请人编码" :label="$t('itemtitlecommonrecordercode')">
								<el-input type="text" v-model="formData.recordercode" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="申请人名称" :label="$t('corpinfopanelcjrtitle')">
								<el-input type="text" v-model="formData.recorderdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
								<el-input type="text" v-model="formData.recordtime" readonly />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane
				title1="附件信息"
				:label="$t('columnAccessoryInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList" @link-detailbg="downloadfiles">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="UploadFilled" plain @click="UploadFilled">
							{{ $t("menu_upload") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="DeleteFilled"
							plain
							:disabled="!scope.isSelected"
							@click="deleteUpload(scope.ids, scope.selectList)"
							>{{ $t("menu_deleteupload") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="开票信息查询"
				:label="$t('menubaseInvoiceQuery')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2"></zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="申请单查询"
				:label="$t('menubaseapplicationorderquery')"
				class="all-height flex-column main-tab-pane-content"
				:name="3"
			>
				<zTable v-if="tabPaneXR.get(3)" ref="zTable3" :tableList="tableList3"> </zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 选择客户弹出 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="customernumberlistselectList.dialogShow"
				width="40%"
				customclass="customernumberlistselectCss"
				@close="customernumberlistselectClose"
			>
				<customernumberlistselect :condobj="customernumberlistselectList" />
			</ZDialog>
		</div>
		<!-- 上传附件弹出 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="uploadAttachmentList.dialogShow"
				:title="$t('UPLOAD_uploadFile')"
				width="40%"
				customclass="uploadAttachmentCss"
				@close="qualificationClose"
			>
				<uploadAttachment :condobj="uploadAttachmentList" />
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import ZDialog from "/src/components/ZDialog.vue";
import uploadAttachment from "/src/views/corp/uploadAttachment.vue";
import customernumberlistselect from "../customerSelete/customernumber_list_select.vue";
import { prop } from "dom7";

// 父组件传入的参数
const props = defineProps({
	condobj: {
		dialogShow: false,
		success: false,
		lockid: "",
		readonly: true,
		workflowflag: 1
	}
});

const i18n = useI18n();
const ruleFormRef = ref();
let tableTabsValue = ref(0);

//表单字段
const formData = reactive({
	lockid: props.condobj.lockid,
	corpid: "",
	corpno: "",
	corpdesc: "",
	departmentname: "",
	companyname: "",
	arcount: 0,
	promisedate: "",
	unlock: "0",
	unlockreason: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: ""
});

const arcountValidator = (rule, value, callback) => {
	if (!(!isNaN(parseFloat(value)) && isFinite(value))) {
		callback(new Error(i18n.t("rulesPropMessage") + ", " + i18n.t("mustbeanumber")));
	} else {
		callback();
	}
};

const rules = reactive({
	corpno: [{ required: true, message: i18n.t("rulesPropMessage") }],
	arcount: [{ validator: arcountValidator, trigger: "blur" }],
	promisedate: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

//下拉数据源
const unlock = getdropSownSelection("CRM_enlock");

//选择客户弹出参数
const customernumberlistselectList = reactive({
	dialogShow: false,
	arrayList: []
});

//选择客户
const addCompanyname = () => {
	customernumberlistselectList.arrayList = [];
	customernumberlistselectList.dialogShow = true;
};

//选择客户 回调
const customernumberlistselectClose = async () => {
	let arrayList = customernumberlistselectList.arrayList;
	if (arrayList.length > 0) {
		console.log(arrayList);
		formData.corpid = arrayList[0].corpid;
		formData.corpno = arrayList[0].corpno;
		formData.corpdesc = arrayList[0].corpdesc;
		formData.departmentname = arrayList[0].departmentdesc;
		formData.companyname = arrayList[0].departmentdesc;
		let params = { "cond.sendclientno": formData.corpno };
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!selectTotalArcount.action", qs.stringify(params));
		if (res.maps.length > 0) {
			formData.arcount = res.maps[0].TOTALWRITEOFFMONEY;
		}
	}
};

//根据 lockid 初始化数据源
const getFormData = async () => {
	let params = {
		"cond.auditflag": "1",
		jsonString: JSON.stringify({ enterpriselockInfo: { lockid: formData.lockid } })
	};
	const res = await http.post("/crm/enterpriselock/enterpriselock!selectEnterpriselockInfoById.action", qs.stringify(params));
	dataSourceProcessing(res);
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.enterpriselockInfo[0]) {
		//判定 enterpriselockInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			formData[key] = data.enterpriselockInfo[0][key];
		}
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let jsonString = {
				enterpriselockInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post("/crm/enterpriselock/enterpriselock!saveEnterpriselockInfo.action", qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				props.condobj.success = true;
				dataSourceProcessing(res);
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//提交
const Submit = () => {
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			lockid: formData.lockid
		};
		const res = await http.post("/crm/enterpriselock/enterpriselock!submit.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.success = true;
			props.condobj.dialogShow = false;
		}
	});
};

//审核操作
const auditAction = (auditurl, opinion) => {
	let srtOpinion = ref(opinion);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: srtOpinion.value,
				type: "textarea",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					srtOpinion.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		const res = await http.post(auditurl, qs.stringify({ lockid: formData.lockid, "cond.opinion": srtOpinion.value }));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.dialogShow = false;
			props.condobj.success = true;
		}
	});
};

const zTable1 = ref();
//附件
const tableList = reactive({
	id: "/customerManage/customerUnlockManagement/enterpriselock_detail_new.vue_zTable1",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: !props.condobj.readonly,
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
			title: "id",
			label: "id",
			prop: "fileid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
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
			title: "mdmfileid",
			label: "",
			prop: "mdmfileid",
			type: "Input",
			width: "300",
			isHide: true
		},
		{
			title: "businesstype",
			label: "",
			prop: "businesstype",
			type: "Input",
			width: "120",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//上传附件参数
const uploadAttachmentList = reactive({
	uploadUrl: "",
	uploadParameter: {}, //参数
	dialogShow: false,
	success: false
});
//上传附件
const UploadFilled = () => {
	uploadAttachmentList.uploadUrl = "/core/uploadnew/upload!upload.action";
	uploadAttachmentList.uploadParameter = {
		jsonString: "{uploadFile:{businesscode:'CRM/accessory', businessobjectid:'" + formData.lockid + "'}}",
		"cond.commid": formData.lockid
	};
	uploadAttachmentList.success = false;
	uploadAttachmentList.dialogShow = true;
};
// 上传附件成功后的回调
const qualificationClose = () => {
	if (uploadAttachmentList.success) {
		zTable1.value.getTableList();
	}
};
//下载附件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

//删除附件
const deleteUpload = (ids, selectList) => {
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
				fileid: item.fileid
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
			zTable1.value.getTableList();
		}
	});
};

//Invoice查询
const zTable2 = ref();
const tableList2 = reactive({
	id: "/customerManage/customerUnlockManagement/enterpriselock_detail_new.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
		baseParams: {
			"cond.auditflag": "2",
			"cond.enlock": "1"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "发票编号",
			label: "itemtitleinvoiceinvoicecode",
			prop: "invoicecode",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "exchangerate",
			type: "Date",
			width: "160"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Input",
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillcurrency1havawriteoffs",
			prop: "currencywriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsbill",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "已到账金额(外币)",
			label: "messageinvoicereceivedmoney_fn",
			prop: "receivedmoney_fn",
			type: "Input",
			width: "160"
		},
		{
			title: "未到账金额(外币)",
			label: "messageinvoiceremainedmoney_fn",
			prop: "remainedmoney_fn",
			type: "Input",
			width: "160"
		},
		{
			title: "发票金额",
			label: "itemtitleinvoiceinvoicemoney",
			prop: "invoicemoney",
			type: "Input",
			width: "160"
		},
		{
			title: "已到账金额",
			label: "itemtitleinvoicereceivedmoney",
			prop: "receivedmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "未到账金额",
			label: "itemtitleinvoiceremainedmoney",
			prop: "remainedmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户姓名",
			label: "itemtitleinvoicecorpdesc",
			prop: "corpname",
			type: "Input",
			width: "160"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedate",
			type: "Input",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "foldernos",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "columnCreatehumandescription",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "columnappointment_desc42",
			prop: "remark",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//申请单查询
const zTable3 = ref();
const tableList3 = reactive({
	id: "/customerManage/customerUnlockManagement/enterpriselock_detail_new.vue_zTable3",
	//面初始化渲染完成 是否调请求
	isRequest: true,

	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoOnlyByCond.action",
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
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "id",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencyname",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "currencyrate",
			type: "Input",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
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
			title: "代理商编码",
			label: "corpinfopaneldlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "160"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "columnappointmentdesc52",
			prop: "totalprice",
			type: "Input",
			width: "160"
		},
		{
			title: "未销账金额",
			label: "columnwriteoff_application_listCanWriteOffsbill",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "申请受理日期",
			label: "crmcolumnapplyacceptdate",
			prop: "logdate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "预计完成时间",
			label: "itemtitlefoldersduedate",
			prop: "duedate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "样品描述",
			label: "columnSampleInformation",
			prop: "sampleinformation",
			type: "Input",
			width: "160"
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

const tabPaneXR = new Map([
	[1, false],
	[2, false],
	[3, false]
]);

//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.lockid) {
		tableList.httpAttribute.baseParams["cond.businessobjectid"] = formData.lockid;
		//传入Invoice查询参数
		tableList2.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
		//传入申请单查询参数
		tableList3.httpAttribute.baseParams["cond.rasclientid"] = formData.corpno;
		if (!tabPaneXR.get(TabPaneName)) {
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.lockid) {
		getFormData();
	}
});
</script>
