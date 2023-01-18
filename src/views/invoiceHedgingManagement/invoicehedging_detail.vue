<template>
	<div class="all-height flex-column">
		<div class="all-height flex-column flex-1">
			<div style="margin-top: 10px; margin-left: 20px; margin-bottom: 5px">
				<el-button v-show="menu_saveShow" size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
					{{ $t("menu_save") }}
				</el-button>
				<el-button
					v-show="menu_submitShow"
					size="small"
					type="success"
					icon="Check"
					plain
					:disabled="!formData.hedgingid"
					@click="Submit(ruleFormRef)"
				>
					{{ $t("menu_submit") }}
				</el-button>
				<el-button
					v-show="menu_approveShow"
					size="small"
					type="success"
					icon="Check"
					plain
					:disabled="!formData.hedgingid"
					@click="auditAction('/crm/invoicehedging/invoicehedging!approve.action', 'Approve !', formData)"
					>{{ $t("menu_approve") }}</el-button
				>
				<el-button
					v-show="menu_rejectShow"
					size="small"
					type="danger"
					icon="Close"
					plain
					:disabled="!formData.hedgingid"
					@click="auditAction('/crm/invoicehedging/invoicehedging!reject.action', 'Reject !', formData)"
					>{{ $t("menu_reject") }}</el-button
				>
				<el-button
					v-show="menu_rejectShow"
					size="small"
					type="danger"
					icon="Close"
					plain
					:disabled="!formData.hedgingid"
					@click="auditAction('/crm/invoicehedging/invoicehedging!reject2Submitor.action', 'Reject !', formData)"
					>{{ $t("menu_reject2Submitor") }}</el-button
				>
			</div>
			<div style="overflow: auto">
				<el-form
					style="margin: 0px 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="Invoice号码" :label="$t('itemtitleinvoiceinvoicecode')" prop="invoiceno">
								<el-input v-model="formData.invoiceno" readonly :disabled="formDisabledList.invoiceno">
									<template #append>
										<el-button-group class="flex-row">
											<el-button :disabled="formDisabledList.invoiceno" @click="selectInvoicenoBtn" icon="ZoomIn" />
											<el-button :disabled="formDisabledList.invoiceno" @click="delInvoiceno" type="primary" icon="ZoomOut" />
										</el-button-group>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="账单对冲日期" :label="$t('columnwriteoff_invoiceheddate')" prop="invoiceheddate">
								<el-date-picker
									v-model="formData.invoiceheddate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									:disabled="formDisabledList.invoiceheddate"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="账单日期" :label="$t('columnwriteoff_invoicedate')">
								<el-date-picker
									v-model="formData.invoicedate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									disabled
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="付款条件" :label="$t('columnwriteoff_paycondition')">
								<el-input v-model.trim="formData.paycondition" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="币种" :label="$t('itemtitleinvoicecurrencies')">
								<el-input v-model.trim="formData.currencytype" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="账单合计" :label="$t('columnwriteoff_invoicetotal')">
								<el-input v-model.trim="formData.invoicetotal" disabled></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item title1="客户号" :label="$t('columnwriteoff_sendclientno')">
								<el-input v-model.trim="formData.sendclientno" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="客户名称" :label="$t('columnwriteoff_sendclientname')">
								<el-input v-model.trim="formData.sendclientname" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="联系人" :label="$t('columnwriteoff_sendclientcontactor')">
								<el-input v-model.trim="formData.sendclientcontactor" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item title1="发往地址" :label="$t('columnwriteoff_sendclientaddr')">
								<el-input v-model.trim="formData.sendclientaddr" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item title1="备注" :label="$t('panelcolumnRemark')" prop="remark">
								<el-input type="textarea" v-model="formData.remark" :disabled="formDisabledList.remark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="创建信息" content-position="left">{{ $t("columnCreateInformation") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
								<el-input v-model="formData.recordercode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
								<el-input v-model="formData.recorderdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
								<el-input v-model="formData.recordtime" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!-- 选择发票 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="selectinvoiceList.dialogShow"
				:title="$t('columnwriteoff_paymentconfirmation')"
				width="75%"
				@close="selectinvoiceClose"
			>
				<selectinvoice :condobj="selectinvoiceList"></selectinvoice>
			</ZDialog>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import selectinvoice from "./select_invoice.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: {
		type: Object,
		default: {
			success: {
				type: Boolean,
				default: false
			},
			dialogShow: {
				type: Boolean,
				default: false
			},
			hedgingid: {
				type: String,
				default: ""
			},
			workflowflag: {
				type: String,
				default: "3"
			}
		}
	}
});

//表单字段
const formData = reactive({
	hedgingid: props?.condobj?.hedgingid,
	corpid: "",
	contactid: "",
	accountid: "",
	contracttype: "0",
	isdiscount: "0"
});

const rules = reactive({
	invoiceno: [{ required: true, message: i18n.t("rulesPropMessage") }],
	invoiceheddate: [{ required: true, message: i18n.t("rulesPropMessage") }],
	remark: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示
const menu_submitShow = ref(false); //提交按钮不显示
const menu_approveShow = ref(false); //审核通过按钮不显示
const menu_rejectShow = ref(false); //拒绝按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1" || props?.condobj?.workflowflag == "4") {
	menu_saveShow.value = true;
	menu_submitShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
	menu_approveShow.value = true;
	menu_rejectShow.value = true;
} else if (props?.condobj?.workflowflag == "3") {
}

const ruleFormRef = ref();

//选择发票信息弹出参数
const selectinvoiceList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择发票信息弹出
const selectInvoicenoBtn = () => {
	selectinvoiceList.dialogShow = true;
	selectinvoiceList.arrayList = [];
};
//选择发票信息弹出  回调
const selectinvoiceClose = () => {
	let arrayList = selectinvoiceList.arrayList;
	if (arrayList.length > 0) {
		formData.invoiceno = arrayList[0].INVOICENO;
		formData.invoicedate = arrayList[0].INVOICEDATE;
		formData.invoiceheddate = arrayList[0].INVOICEDATE;
		formData.sendclientno = arrayList[0].SENDCLIENTNO;
		formData.sendclientname = arrayList[0].SENDCLIENTNAME;
		formData.sendclientcontactor = arrayList[0].SENDCLIENTCONTACTOR;
		formData.sendclientaddr = arrayList[0].SENDCLIENTADDR;
		formData.paycondition = arrayList[0].PAYCONDITION;
		formData.currencytype = arrayList[0].CURRENCYTYPE;
		formData.invoicetotal = arrayList[0].INVOICETOTAL;
	}
};
//清除选择的发票信息
const delInvoiceno = () => {
	formData.invoiceno = "";
	formData.invoicedate = "";
	formData.invoiceheddate = "";
	formData.sendclientno = "";
	formData.sendclientname = "";
	formData.sendclientcontactor = "";
	formData.sendclientaddr = "";
	formData.paycondition = "";
	formData.currencytype = "";
	formData.invoicetotal = "";
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.invoicehedgingInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.invoicehedgingInfo[0][key];
	}
};
//根据 hedgingid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/invoicehedging/invoicehedging!selectInvoicehedgingInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				invoicehedgingInfo: {
					hedgingid: formData.hedgingid
				}
			})
		})
	);
	if (res) {
		dataSourceProcessing(res);
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = formData.hedgingid
				? "/crm/invoicehedging/invoicehedging!updateInvoicehedgingInfo.action"
				: "/crm/invoicehedging/invoicehedging!insertInvoicehedgingInfo.action";

			let params = {
				jsonString: JSON.stringify({
					invoicehedgingInfo: formData
				})
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				if (res) {
					dataSourceProcessing(res);
				}
				props.condobj.success = true;
			}
		}
	});
};

//提交
const Submit = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			const res = await http.post(
				"/crm/contract/contract!examineTime.action",
				qs.stringify({
					"cond.begintime": formData.begintime,
					"cond.endtime": formData.endtime,
					"cond.corpid": formData.corpid,
					"cond.hedgingid": formData.hedgingid,
					"cond.dept": formData.dept
				})
			);
			if (res) {
				ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
					confirmButtonText: i18n.t("menu_ok"),
					cancelButtonText: i18n.t("menu_cancel"),
					type: "warning",
					draggable: true
				}).then(async () => {
					const res = await http.post(
						"/crm/contract/contract!submit.action",
						qs.stringify({ jsonString: JSON.stringify({ invoicehedgingInfos: [formData] }) })
					);
					if (res) {
						ElMessage.success(i18n.t("Message_OperationSuccess"));
						props.condobj.success = true;
						props.condobj.dialogShow = false;
					}
				});
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//审核操作
const auditAction = (auditurl, opinion, row) => {
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
		let jsonString = {
			invoicehedgingInfos: [row]
		};
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.opinion": srtOpinion.value
		};
		const res = await http.post(auditurl, qs.stringify(params));

		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.success = true;
			props.condobj.dialogShow = false;
		}
	});
};
onMounted(() => {
	console.log(formData);
	if (formData.hedgingid) {
		getFormData();
	}
});
</script>
