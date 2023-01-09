<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="月结客户申请信息" :label="$t('contractdgapply')" class="all-height flex-column" :name="0">
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
						:disabled="!formData.dmid"
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
						:disabled="!formData.dmid"
						@click="auditAction('/crm/deliverys/deliverys!approveDeliverysInfo.action', 'Approve !', formData)"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.dmid"
						@click="auditAction('/crm/deliverys/deliverys!reject.action', 'Reject !', formData)"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.dmid"
						@click="auditAction('/crm/deliverys/deliverys!reject2Submitor.action', 'Reject !', formData)"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<div style="overflow: auto">
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
						<el-divider title1="客户基本信息" content-position="left">{{
							$t("companyCustomerBasicInformationtitle")
						}}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
									<el-input v-model="formData.corpno" readonly :disabled="formDisabledList.corpno"> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item title1="客户名称" :label="$t('panelcolumncustomername')">
									<el-input v-model.trim="formData.corpdesc" readonly :disabled="formDisabledList.corpdesc">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.corpdesc" @click="selectCustomerBtn" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.corpdesc" @click="delCustomer" type="primary" icon="ZoomOut" />
											</el-button-group>
										</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="工商注册号" :label="$t('corpinfopanelRegistrationNumbertitle')">
									<el-input
										v-model.trim="formData.businesslicenseno"
										readonly
										:disabled="formDisabledList.businesslicenseno"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="法人名称" :label="$t('i18ncrmcontractLegalPersonName')">
									<el-input v-model.trim="formData.representative" :disabled="formDisabledList.representative"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="成立日期" :label="$t('i18ncrmcontractSetupDate')">
									<el-date-picker
										v-model.trim="formData.establishmentdate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.establishmentdate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="业务种类" :label="$t('i18ncrmcontractBusinessTypes')">
									<el-input v-model.trim="formData.businesstype" :disabled="formDisabledList.businesstype"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="注册资本" :label="$t('i18ncrmcontractRegisteredCapital')">
									<el-input v-model.trim="formData.registeredcapital" :disabled="formDisabledList.registeredcapital"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="实收资本" :label="$t('i18ncrmcontractPaidinCapital')">
									<el-input v-model.trim="formData.paiclupcapital" :disabled="formDisabledList.paiclupcapital"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="员工数量" :label="$t('i18ncrmcontractEmployeesNumber')">
									<el-input v-model.trim="formData.staffcount" :disabled="formDisabledList.staffcount"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="联系方式" content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="联系人名称" :label="$t('companypanelcontactdesctitle')">
									<el-input readonly v-model="formData.contactdesc" :disabled="formDisabledList.contactdesc">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.contactdesc" @click="selectContactBtn" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.contactdesc" @click="delContact" type="primary" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人电话" :label="$t('i18ncrmcontractContactPhone')">
									<el-input readonly v-model.trim="formData.contacttel" :disabled="formDisabledList.contacttel"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人传真" :label="$t('itemtitlebase_userfax')">
									<el-input v-model.trim="formData.contactfax" readonly :disabled="formDisabledList.contactfax"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人邮编" :label="$t('i18ncrmcontractContactPersonZipCode')">
									<el-input v-model.trim="formData.contactpost" readonly :disabled="formDisabledList.contactpost"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人邮箱" :label="$t('i18ncrmcontractContactEmail')">
									<el-input v-model.trim="formData.contactemail" readonly :disabled="formDisabledList.contactemail"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人职位" :label="$t('i18ncrmcontractContactPosition')">
									<el-input
										v-model.trim="formData.contactposition"
										readonly
										:disabled="formDisabledList.contactposition"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人地址" :label="$t('i18ncrmcontractContactAddress')">
									<el-input
										v-model.trim="formData.contactaddress"
										readonly
										:disabled="formDisabledList.contactaddress"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="账户信息" content-position="left">{{ $t("menhuAccountInformation") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="12">
								<el-form-item title1="账户名称" :label="$t('i18ncrmcontractAccountName')">
									<el-input readonly v-model="formData.accountname" :disabled="formDisabledList.accountname">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.accountname" @click="selectAccountBtn" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.accountname" @click="delAccount" type="primary" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item title1="账户号" :label="$t('i18ncrmcontractAccountNumber')">
									<el-input v-model="formData.accountno" readonly :disabled="formDisabledList.accountno"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="申请信息" content-position="left">{{ $t("contractdgapplyinfo") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="每年期望与本公司交易额" :label="$t('i18ncrmcontractExpectTransactions')">
									<el-input v-model="formData.yearlydeal" :disabled="formDisabledList.yearlydeal"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="申请日期" :label="$t('i18ncrmcontractApplicationDate')">
									<el-date-picker
										v-model.trim="formData.applydate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.applydate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="付款方式" :label="$t('i18ncrmcontractpaymentmethod')">
									<el-select
										v-model="formData.paymentmethod"
										@change="paymentmethodChange"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.paymentmethod"
									>
										<el-option
											v-for="item in crm_paymentmethod"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="付款信用期" :label="$t('i18ncrmcontractCreditPeriodForPay')">
									<el-select
										v-model="formData.paydeadline"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.paydeadline"
									>
										<el-option
											v-for="item in dgbj_paydeadline"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="最高累计信用额度(HKD)" :label="$t('i18ncrmcontractTheHighestCumulativeCreditLimit')">
									<el-input v-model="formData.maxlimit" :disabled="formDisabledList.maxlimit"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="预付百分比" :label="$t('i18ncrmcontractThePercentageInAdvance')">
									<el-input v-model="formData.advancepercent" :disabled="formDisabledList.advancepercent"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="剩余百分比" :label="$t('i18ncrmcontractTheRemainingPercentage')">
									<el-input v-model="formData.surplus" :disabled="formDisabledList.surplus"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="24">
								<el-form-item title1="备注" :label="$t('panelcolumnRemark')">
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
			</el-tab-pane>
			<el-tab-pane
				title1="项目列表"
				:label="$t('menubasetabpanelpanelprojectlist')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList1">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newProject">{{ $t("menu_new") }}</el-button>
						<el-button size="small" type="danger" icon="Delete" plain :disabled="!scope.isSelected" @click="dleProject(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
						<el-button size="small" type="primary" icon="Document" plain @click="preserveProject">
							{{ $t("menu_save") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="标签管理"
				:label="$t('menubasetabpanelpanellabellist')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newLabelInformation">{{ $t("menu_new") }}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="dleLabelInformation(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
						<el-button size="small" type="primary" icon="Document" plain @click="preserveLabelInformation">
							{{ $t("menu_save") }}
						</el-button>
						<el-button
							size="small"
							type="primary"
							icon="Ticket"
							plain
							:disabled="!scope.isSelected"
							@click="barcodeLabelPrint(scope.selectList)"
							>{{ $t("menu_clientlabel") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 选择客户 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="selectCustomerList.dialogShow"
				:title="$t('panelSelectcustomer')"
				width="75%"
				@close="selectCustomerClose"
			>
				<selectCustomer :condobj="selectCustomerList"></selectCustomer>
			</ZDialog>
		</div>
		<!-- 选择联系人 -->
		<div v-dialogStretching>
			<ZDialog v-model="selectcontactList.dialogShow" width="75%" @close="selectcontactClose">
				<selectcontact :condobj="selectcontactList"></selectcontact>
			</ZDialog>
		</div>
		<!-- 选择账户 -->
		<div v-dialogStretching>
			<ZDialog v-model="selectAccountList.dialogShow" width="70%" @close="selectAccountClose">
				<selectAccount :condobj="selectAccountList"></selectAccount>
			</ZDialog>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import selectCustomer from "./selectCustomer.vue";
import selectcontact from "./selectContactPerson.vue";
import selectAccount from "./selectAccount.vue";

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
			contractid: {
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
	contractid: props?.condobj?.contractid,
	corpid: "",
	contactid: "",
	accountid: ""
});
const rules = reactive({});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示
const menu_submitShow = ref(false); //提交按钮不显示
const menu_approveShow = ref(false); //审核通过按钮不显示
const menu_rejectShow = ref(false); //拒绝按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
	menu_submitShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
	menu_approveShow.value = true;
	menu_rejectShow.value = true;
} else if (props?.condobj?.workflowflag == "3") {
}

const crm_xmlx = getdropSownSelection("crm_xmlx");
const kdfy_cm = getdropSownSelection("kdfy_cm");
const kdfy_zl = getdropSownSelection("kdfy_zl");
const crm_paymentmethod = getdropSownSelection("paymentmethod");
const dgbj_paydeadline = [];
getdropSownSelection("dgbj_paydeadline").forEach(item => {
	if (item.value == "30" || item.value == "60" || item.value == "90") {
		dgbj_paydeadline.push(item);
	}
});

const ruleFormRef = ref();

//选择客户信息弹出参数
const selectCustomerList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择客户信息弹出
const selectCustomerBtn = () => {
	selectCustomerList.dialogShow = true;
	selectCustomerList.arrayList = [];
};
//选择客户信息弹出  回调
const selectCustomerClose = () => {
	let arrayList = selectCustomerList.arrayList;
	if (arrayList.length > 0) {
		formData.corpdesc = arrayList[0].corpdesc; //客户名称
		formData.corpid = arrayList[0].corpid; //客户ID
		formData.corpno = arrayList[0].corpno; //客户号
		formData.businesslicenseno = arrayList[0].businesslicenseno; //工商注册号
	}
};
//清除选择的客户
const delCustomer = () => {
	formData.corpdesc = ""; //客户名称
	formData.corpid = ""; //客户ID
	formData.corpno = ""; //客户号
	formData.businesslicenseno = ""; //工商注册号
};

//选择联系人弹出参数
const selectcontactList = reactive({
	dialogShow: false,
	corpid: "",
	arrayList: []
});
//选择联系人弹出
const selectContactBtn = () => {
	if (!formData.corpid) {
		ElMessage.warning(i18n.t("Message_pleaseSelectClientInformationFirst"));
		return;
	}
	selectcontactList.corpid = formData.corpid;
	selectcontactList.arrayList = [];
	selectcontactList.dialogShow = true;
};
// 选择联系人弹出 回调
const selectcontactClose = () => {
	if (selectcontactList.arrayList.length > 0) {
		formData.contactid = selectcontactList.arrayList[0].contactid; //联系人id
		formData.contactdesc = selectcontactList.arrayList[0].contactdesc; //联系人名称
		formData.contacttel = selectcontactList.arrayList[0].tel; //联系人电话
		formData.contactfax = selectcontactList.arrayList[0].fax; //联系人传真
		formData.contactpost = selectcontactList.arrayList[0].postcode; //联系人邮编
		formData.contactemail = selectcontactList.arrayList[0].email; //联系人邮箱
		formData.contactposition = selectcontactList.arrayList[0].jobdesc; //联系人职位
		formData.contactaddress = selectcontactList.arrayList[0].address; //联系人地址
	}
};
//清除联系人
const delContact = () => {
	formData.contactid = ""; //联系人id
	formData.contactdesc = ""; //联系人名称
	formData.contacttel = ""; //联系人电话
	formData.contactfax = ""; //联系人传真
	formData.contactpost = ""; //联系人邮编
	formData.contactemail = ""; //联系人邮箱
	formData.contactposition = ""; //联系人职位
	formData.contactaddress = ""; //联系人地址
};

//选择账户弹出参数
const selectAccountList = reactive({
	dialogShow: false,
	corpid: "",
	arrayList: []
});
//选择账户弹出
const selectAccountBtn = () => {
	if (!formData.corpid) {
		ElMessage.warning(i18n.t("Message_pleaseSelectClientInformationFirst"));
		return;
	}
	selectAccountList.corpid = formData.corpid;
	selectAccountList.arrayList = [];
	selectAccountList.dialogShow = true;
};
// 选择账户弹出 回调
const selectAccountClose = () => {
	if (selectAccountList.arrayList.length > 0) {
		formData.accountid = selectAccountList.arrayList[0].accountid; //账户id
		formData.accountname = selectAccountList.arrayList[0].accountcode; //账户名称
		formData.accountno = selectAccountList.arrayList[0].accountno; //账户号
	}
};
//清除账户
const delAccount = () => {
	formData.accountid = ""; //账户id
	formData.accountname = ""; //账户名称
	formData.accountno = ""; //账户号
};

const paymentmethodProcessing = val => {
	if (props.condobj.workflowflag == "1") {
		//预付款
		if (val == "0") {
			formDisabledList.paydeadline = true;
			formDisabledList.maxlimit = true;
			formDisabledList.advancepercent = true;
			formDisabledList.surplus = true;
			formData.paydeadline = "";
			formData.maxlimit = "";
			formData.advancepercent = "";
			formData.surplus = "";
		}
		//预付定金
		if (val == "1") {
			formDisabledList.paydeadline = true;
			formDisabledList.maxlimit = true;
			formDisabledList.advancepercent = false;
			formDisabledList.surplus = false;
			formData.paydeadline = "";
			formData.maxlimit = "";
		}
		//月结
		if (val == "2") {
			formDisabledList.paydeadline = false;
			formDisabledList.maxlimit = false;
			formDisabledList.advancepercent = true;
			formDisabledList.surplus = true;
			formData.advancepercent = "";
			formData.surplus = "";
		}
	}
};

//付款方式 选择变更事件
const paymentmethodChange = val => {
	paymentmethodProcessing(val);
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.contractInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}
		formData[key] = data.contractInfo[0][key];
	}
	paymentmethodProcessing(formData.paymentmethod);
};
//根据 contractid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/contract/contract!selectContractInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				contractInfo: {
					contractid: formData.contractid
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
			let srtUrl = "/crm/deliverys/deliverys!insertDeliverysInfo.action";
			if (formData.dmid) {
				srtUrl = "/crm/deliverys/deliverys!updateDeliverysInfo.action";
			}
			let jsonString = {
				deliverysInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
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
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
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
					"/crm/deliverys/deliverys!submitDeliverysInfos.action",
					qs.stringify({ "deliverysInfo.dmid": formData.dmid, "cond.opinion": "", "cond.flag": "0" })
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

//项目列表
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/expressServiceManagement/deliverys_workflow_detail.vue_zTable1",
	tableToolbar: {
		whole: props?.condobj.workflowflag == "1" ? true : false
	},
	//面初始化渲染完成 是否调请求
	isRequest: true,
	edit: props?.condobj.workflowflag == "1" ? true : false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverysample/deliverysample!selectDeliverysampleInfosByCond.action",
		root: "deliverysampleInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "序号",
			label: "itemtitleloginordernumber",
			type: "index",
			width: "40"
		},
		{
			title: "项目编码",
			label: "columndeliverysampleInforowid",
			prop: "rowid",
			type: "Input",
			width: "160"
		},
		{
			title: "项目类型",
			label: "columndeliverysampleInfoitems",
			prop: "items",
			type: "Select",
			typeData: crm_xmlx,
			width: "160",
			edit: true
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "quantitys",
			type: "Number",
			width: "160",
			precision: 0,
			min: 1,
			edit: true
		},
		{
			title: "尺码",
			label: "columndeliverysampleInfosizes",
			prop: "sizes",
			type: "Select",
			typeData: kdfy_cm,
			width: "160",
			edit: true
		},
		{
			title: "重量",
			label: "columndeliverysampleInfoweight",
			prop: "weight",
			type: "Select",
			typeData: kdfy_zl,
			width: "160",
			edit: true
		},
		{
			title: "项目描述",
			label: "columndeliverysampleInfodescription",
			prop: "description",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remarks",
			type: "Input",
			width: "160",
			edit: true
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
			title: "创建日期",
			label: "testiteminforecordtimepanel",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "id",
			label: "",
			prop: "dsid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "与主表关联ID",
			label: "",
			prop: "dmid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

// 新增项目信息
const newProject = () => {
	zTable1.value.addRowData({ quantitys: 1 });
};

//删除项目信息
const dleProject = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			deliverysampleInfos: []
		};
		ids.forEach(item => {
			jsonString.deliverysampleInfos.push({
				dsid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/deliverys/deliverys!deleteDeliverysampleInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable1.value.getTableList();
		}
	});
};
//保存项目
const preserveProject = async () => {
	let projectRows = zTable1.value.getEditSelectList();
	if (projectRows.length > 0) {
		for (let row of projectRows) {
			if (!row.items) {
				ElMessage({
					type: "warning",
					message: i18n.t("message_null_items")
				});
				return;
			}
		}
		let params = {
			"cond.dmid": formData.dmid,
			jsonString: JSON.stringify({
				deliverysampleInfos: projectRows
			})
		};
		const res = await http.post("/crm/deliverys/deliverys!saveDeliverysampleInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_saveSuccess")
			});
			zTable1.value.getTableList();
		}
	}
};

//标签管理
const zTable2 = ref();
const tableList2 = reactive({
	id: "/expressServiceManagement/deliverys_workflow_detail.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	edit: props?.condobj?.workflowflag == "1" || props?.condobj?.iscsd == "1" ? true : false,
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" || props?.condobj?.iscsd == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverylable/deliverylable!selectLableInfosByCond.action",
		root: "lableInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "标签号",
			label: "columnlableInfolabelno",
			prop: "labelno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户标签ID",
			label: "columnlableInfoclientlableno",
			prop: "clientlableno",
			type: "Input",
			width: "160"
		},
		{
			title: "收样日期",
			label: "columnlableInforeceiveddate",
			prop: "receiveddate",
			type: "Date",
			width: "160",
			edit: true
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
			title: "创建日期",
			label: "testiteminforecordtimepanel",
			prop: "recordtime",
			type: "DateTime",
			width: "255"
		},
		{
			title: "主键",
			label: "",
			prop: "dlid",
			type: "id",
			width: "160",
			isHide: true
		},
		{
			title: "主键关联ID",
			label: "",
			prop: "dmid",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//新增标签
const newLabelInformation = async () => {
	let params = {
		"cond.dmid": formData.dmid,
		jsonString: JSON.stringify({
			lableInfos: [{ dmid: formData.dmid }]
		})
	};
	const res = await http.post("/crm/deliverys/deliverys!saveDeliverylabelInfos.action", qs.stringify(params));
	if (res) {
		ElMessage({
			type: "success",
			message: i18n.t("Message_saveSuccess")
		});
		zTable2.value.getTableList();
	}
};

//保存标签
const preserveLabelInformation = async () => {
	let LabelRows = zTable2.value.getEditSelectList();
	if (LabelRows.length > 0) {
		let params = {
			"cond.dmid": formData.dmid,
			jsonString: JSON.stringify({
				lableInfos: LabelRows
			})
		};
		const res = await http.post("/crm/deliverys/deliverys!saveDeliverylabelInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_saveSuccess")
			});
			zTable2.value.getTableList();
		}
	}
};

//删除标签
const dleLabelInformation = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			lableInfos: []
		};
		ids.forEach(item => {
			jsonString.lableInfos.push({
				dlid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/deliverys/deliverys!deleteDeliverylabelInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable2.value.getTableList();
		}
	});
};

//条码标签弹出 参数
const barcodeLabelList = reactive({
	dialogShow: false,
	arrayList: []
});
//打印条码标签
const barcodeLabelPrint = async rows => {
	let params = {
		jsonString: JSON.stringify({
			lableInfos: rows
		})
	};
	const res = await http.post("/crm/deliverylable/deliverylable!insertCliectLabelInfos.action", qs.stringify(params));
	let deliverysInfos = res?.deliverysInfos;
	if (deliverysInfos && deliverysInfos.length > 0) {
		let arrayList = [];
		deliverysInfos.forEach(item => {
			let obj = {};
			obj.dept = item.dept;
			obj.packagid = item.deptremark;
			obj.customername = item.clientname;
			obj.customerno = item.clientno;
			obj.saledesc = item.applicantdesc;
			obj.labledate = item.csdcollecttimes;
			arrayList.push(obj);
		});
		barcodeLabelList.dialogShow = true;
		barcodeLabelList.arrayList = arrayList;
		zTable2.value.getTableList();
	}
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
			deliverysInfos: [row]
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

const tableTabsValue = ref(0);
const tabPaneXR = new Map([[1, false]]);
//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.contractid) {
		if (!tabPaneXR.get(TabPaneName)) {
			if (TabPaneName == 1) {
				tableList1.httpAttribute.baseParams["cond.dmid"] = formData.dmid;
			}
			if (TabPaneName == 2) {
				tableList2.httpAttribute.baseParams["cond.dmid"] = formData.dmid;
			}
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.contractid) {
		getFormData();
	}
});
</script>

<style scoped lang="scss">
:deep(.barcodeLabelClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 90px !important;
}
:deep(.importsamplerecordsClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 120px !important;
	min-height: 400px;
}
</style>
