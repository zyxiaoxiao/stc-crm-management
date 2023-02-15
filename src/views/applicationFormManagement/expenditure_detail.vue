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
					:disabled="!formData.id"
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
					:disabled="!formData.id"
					@click="auditAction('/crm/expenditure/expenditure!approveExpenditureInfo.action', 'Approve !', formData)"
					>{{ $t("menu_approve") }}</el-button
				>
				<el-button
					v-show="menu_rejectShow"
					size="small"
					type="danger"
					icon="Close"
					plain
					:disabled="!formData.id"
					@click="auditAction('/crm/expenditure/expenditure!reject.action', 'Reject !', formData)"
					>{{ $t("menu_reject") }}</el-button
				>
				<el-button
					v-show="menu_rejectShow"
					size="small"
					type="danger"
					icon="Close"
					plain
					:disabled="!formData.id"
					@click="auditAction('/crm/expenditure/expenditure!reject2Submitor.action', 'Reject !', formData)"
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
						<el-col :span="6">
							<el-form-item title1="申请单号" :label="$t('columnwriteoff_application_listApplicationNo')" prop="folderno">
								<el-input v-model="formData.folderno" readonly :disabled="formDisabledList.folderno">
									<template #append>
										<el-button-group class="flex-row">
											<el-button :disabled="formDisabledList.folderno" @click="selectFoldernoBtn" icon="ZoomIn" />
											<el-button :disabled="formDisabledList.folderno" @click="delFolderno" type="primary" icon="ZoomOut" />
										</el-button-group>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="业务员名称" :label="$t('columnexpendituresalesmandesc')">
								<el-input v-model.trim="formData.salesmandesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="开支类型" :label="$t('columnexpendituretype')" prop="expendituretype">
								<el-select
									v-model="formData.expendituretype"
									@change="expendituretypeChange"
									clearable
									filterable
									class="full-width-input"
									:disabled="formDisabledList.expendituretype"
								>
									<el-option v-for="item in sales_type" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="金额" :label="$t('columnappointmentothercostmoney_hkd')" prop="amount">
								<el-input-number
									v-model.number="formData.amount"
									:min="0"
									controls-position="right"
									@change="amountChange"
									:disabled="formDisabledList.amount"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="部门名称" :label="$t('corpinfopaneldepartmentcodetitle')">
								<el-input v-model.trim="formData.deptdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('columnCustomerName')">
								<el-input v-model.trim="formData.corpdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="分包HKCC认证类型" :label="$t('menubaseThe_authentication_type')" prop="authentication">
								<div class="flex-row flx-center" style="width: 100%">
									<el-select
										v-model="formData.authentication"
										@change="authenticationChange"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.authentication"
									>
										<el-option
											v-for="item in certificate"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>

									<el-tooltip effect="light" placement="right">
										<el-icon :size="20" color=" #909399"><InfoFilled /></el-icon>
										<template #content>
											<span style="color: #000000; font-size: 12px">
												{{ i18n.t("certificate1") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >=2000<br />
												{{ i18n.t("certificate2") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >=1200<br />
												{{ i18n.t("certificate3") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >= 2000<br />
												{{ i18n.t("certificate4") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >= 2000<br />
											</span>
										</template>
									</el-tooltip>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="佣金" :label="$t('panelcolumnbrokerage_hkd')" prop="brokerage">
								<el-input-number v-model.number="formData.brokerage" controls-position="right" disabled />
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
						<el-col :span="8">
							<el-form-item title1="修改人编码" :label="$t('columnModifyPersonCoding')">
								<el-input v-model="formData.modifyercode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="修改人名称" :label="$t('testiteminfomodifiernamepanel')">
								<el-input v-model="formData.modifyerdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="修改日期" :label="$t('columnmodifydate')">
								<el-input v-model="formData.modifyertime" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="申请人编码" :label="$t('columnApplicantcode')">
								<el-input v-model="formData.applicantcode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="申请人名称" :label="$t('columnApplicantdesc')">
								<el-input v-model="formData.applicantdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="申请日期" :label="$t('i18ncrmcontractApplicationDate')">
								<el-input v-model="formData.applicanttime" disabled></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item title1="审核人编码" :label="$t('auditcommoncode')">
								<el-input v-model="formData.auditorcode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="审核人名称" :label="$t('auditcommonauditorname')">
								<el-input v-model="formData.auditordesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="审核日期" :label="$t('columnAuditdate')">
								<el-input v-model="formData.audittime" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!-- 选择申请单 -->
		<div v-dialogStretching>
			<ZDialog v-model="applicationorderqueryList.dialogShow" width="75%" @close="applicationorderqueryClose">
				<applicationorderquery :condobj="applicationorderqueryList"></applicationorderquery>
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
import { getdropSownSelection } from "@/utils/util.js";
import { GlobalStore } from "@/store/globalStore.js";
import applicationorderquery from "./application_order_query_list.vue";

const sales_type = getdropSownSelection("sales_type");
const certificate = getdropSownSelection("certificate");
const i18n = useI18n();
const globalStore = GlobalStore();

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
			id: {
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
	id: props?.condobj?.id,
	amount: 0,
	salesmancode: "",
	corpno: ""
});

const rules = reactive({
	folderno: [{ required: true, message: i18n.t("rulesPropMessage") }],
	expendituretype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	amount: [{ required: true, message: i18n.t("rulesPropMessage") }]
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

//选择申请单弹出参数
const applicationorderqueryList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择申请单弹出
const selectFoldernoBtn = () => {
	applicationorderqueryList.dialogShow = true;
	applicationorderqueryList.arrayList = [];
};
//选择申请单弹出  回调
const applicationorderqueryClose = () => {
	let arrayList = applicationorderqueryList.arrayList;
	if (arrayList.length > 0) {
		formData.folderno = arrayList[0].folderno;
		formData.salesmandesc = arrayList[0].createdbyfullname;
		formData.salesmancode = arrayList[0].secode;
		formData.deptdesc = arrayList[0].dept;
		formData.corpno = arrayList[0].rasclientid;
		formData.corpdesc = arrayList[0].compname;
		formData.applicantcode = globalStore.userInfo.usercode;
		formData.applicantdesc = globalStore.userInfo.userdesc;
		formData.applicanttime = arrayList[0].drawdate;
	}
};
//清除选择的申请单
const delFolderno = () => {
	formData.folderno = "";
	formData.salesmandesc = "";
	formData.salesmancode = "";
	formData.deptdesc = "";
	formData.corpno = "";
	formData.corpdesc = "";
	formData.applicantcode = "";
	formData.applicantdesc = "";
	formData.applicanttime = "";
};

//选择开支类型触发事件
const expendituretypeChange = val => {
	if (val == "1") {
		formDisabledList.authentication = false;
	} else {
		formData.authentication = null;
		formData.brokerage = null;
		formDisabledList.authentication = true;
	}
};
//通过金额计算佣金
const calculateCommission = certificationType => {
	if (certificationType == "1") {
		//CB证书
		if (formData.amount >= 2500) {
			//大于等于2500佣金HKD200
			formData.brokerage = 200;
		} else if (formData.amount >= 2000) {
			//大于等于2000佣金HKD100
			formData.brokerage = 100;
		} else {
			formData.authentication = null;
			formData.brokerage = null;
		}
	} else if (certificationType == "2") {
		//1年证书
		if (formData.amount >= 1200) {
			formData.brokerage = 360;
		} else {
			formData.authentication = null;
			formData.brokerage = null;
		}
	} else if (certificationType == "3") {
		//3年证书
		if (formData.amount >= 3300) {
			//大于等于3300佣金HKD500
			formData.brokerage = 500;
		} else if (formData.amount >= 2000) {
			//大于等于2000佣金HKD400
			formData.brokerage = 400;
		} else {
			formData.authentication = null;
			formData.brokerage = null;
		}
	} else if (certificationType == "4") {
		//优质正印证书
		if (formData.amount >= 3000) {
			//大于等于3000佣金HKD600
			formData.brokerage = 600;
		} else if (formData.amount >= 2000) {
			//大于等于2000佣金HKD400
			formData.brokerage = 400;
		} else {
			formData.authentication = null;
			formData.brokerage = null;
		}
	} else {
		//无证书佣金置零
		formData.authentication = null;
		formData.brokerage = null;
	}
};

//选择分包HKCC认证类型触发事件
const authenticationChange = val => {
	calculateCommission(val);
};
//选择金额触发事件
const amountChange = (currentValue, oldValue) => {
	calculateCommission(formData.authentication);
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.expenditureInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			if (key == "authentication" && data.expenditureInfo[0]["expendituretype"] != "1") {
				formDisabledList[key] = true;
			} else {
				formDisabledList[key] = false;
			}
		} else {
			formDisabledList[key] = true; //禁用
		}
		formData[key] = data.expenditureInfo[0][key];
	}
};
//根据 id 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/expenditure/expenditure!selectExpenditureInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				expenditureInfo: {
					id: formData.id
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
			let srtUrl = formData.id
				? "/crm/expenditure/expenditure!updateExpenditureInfo.action"
				: "/crm/expenditure/expenditure!insertExpenditureInfo.action";

			let params = {
				jsonString: JSON.stringify({
					expenditureInfo: formData
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
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};

//提交
const Submit = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
				confirmButtonText: i18n.t("menu_ok"),
				cancelButtonText: i18n.t("menu_cancel"),
				type: "warning",
				draggable: true
			}).then(async () => {
				const res = await http.post(
					"/crm/expenditure/expenditure!submitExpenditureInfos.action",
					qs.stringify({ jsonString: JSON.stringify({ expenditureInfos: [formData] }) })
				);
				if (res) {
					ElMessage.success(i18n.t("Message_OperationSuccess"));
					props.condobj.success = true;
					props.condobj.dialogShow = false;
				}
			});
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
			expenditureInfos: [row]
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
	if (formData.id) {
		getFormData();
	}
});
</script>
