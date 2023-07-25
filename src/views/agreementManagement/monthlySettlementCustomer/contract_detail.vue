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
						:disabled="!formData.contractid"
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
						:disabled="!formData.contractid"
						@click="auditAction('/crm/deliverys/deliverys!approveDeliverysInfo.action', 'Approve !', formData)"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.contractid"
						@click="auditAction('/crm/deliverys/deliverys!reject.action', 'Reject !', formData)"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.contractid"
						@click="auditAction('/crm/deliverys/deliverys!reject2Submitor.action', 'Reject !', formData)"
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
						<el-divider title1="客户基本信息" content-position="left">{{
							$t("companyCustomerBasicInformationtitle")
						}}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')" prop="corpno">
									<el-input v-model="formData.corpno" readonly :disabled="formDisabledList.corpno"> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item title1="客户名称" :label="$t('panelcolumncustomername')" prop="corpdesc">
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
									<el-input
										v-model.trim="formData.representative"
										clearable
										:disabled="formDisabledList.representative"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="成立日期" :label="$t('i18ncrmcontractSetupDate')" prop="establishmentdate">
									<el-date-picker
										v-model="formData.establishmentdate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.establishmentdate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="业务种类" :label="$t('i18ncrmcontractBusinessTypes')" prop="businesstype">
									<el-input v-model.trim="formData.businesstype" clearable :disabled="formDisabledList.businesstype"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="注册资本" :label="$t('i18ncrmcontractRegisteredCapital')">
									<el-input
										v-model.trim="formData.registeredcapital"
										clearable
										:disabled="formDisabledList.registeredcapital"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="实收资本" :label="$t('i18ncrmcontractPaidinCapital')">
									<el-input
										v-model.trim="formData.paiclupcapital"
										clearable
										:disabled="formDisabledList.paiclupcapital"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="员工数量" :label="$t('i18ncrmcontractEmployeesNumber')">
									<el-input v-model.trim="formData.staffcount" clearable :disabled="formDisabledList.staffcount"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="联系方式" content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="联系人名称" :label="$t('companypanelcontactdesctitle')" prop="contactdesc">
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
								<el-form-item title1="联系人电话" :label="$t('i18ncrmcontractContactPhone')" prop="contacttel">
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
								<el-form-item title1="每年期望与本公司交易额" :label="$t('i18ncrmcontractExpectTransactions')" prop="yearlydeal">
									<el-input v-model="formData.yearlydeal" clearable :disabled="formDisabledList.yearlydeal"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="申请日期" :label="$t('i18ncrmcontractApplicationDate')" prop="applydate">
									<el-date-picker
										v-model="formData.applydate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.applydate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="付款方式" :label="$t('i18ncrmcontractpaymentmethod')" prop="paymentmethod">
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
								<el-form-item title1="付款信用期" :label="$t('i18ncrmcontractCreditPeriodForPay')" prop="paydeadline">
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
								<el-form-item
									title1="最高累计信用额度(HKD)"
									:label="$t('i18ncrmcontractTheHighestCumulativeCreditLimit')"
									prop="maxlimit"
								>
									<el-input v-model="formData.maxlimit" clearable :disabled="formDisabledList.maxlimit"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="预付百分比" :label="$t('i18ncrmcontractThePercentageInAdvance')">
									<el-input v-model="formData.advancepercent" clearable :disabled="formDisabledList.advancepercent"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="剩余百分比" :label="$t('i18ncrmcontractTheRemainingPercentage')">
									<el-input v-model="formData.surplus" clearable :disabled="formDisabledList.surplus"></el-input>
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
				title1="到账信息"
				:label="$t('billinfoaccountinformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList1"> </zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="董事/高级行政人员名单"
				:label="$t('i18ncrmcontractSeniorexecutivesclientlist')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2"> </zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="申请单查询"
				:label="$t('menubaseapplicationorderquery')"
				class="all-height flex-column main-tab-pane-content"
				:name="3"
			>
				<zTable v-if="tabPaneXR.get(3)" ref="zTable3" :tableList="tableList3"> </zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="附件信息"
				:label="$t('columnAccessoryInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="4"
			>
				<zTable v-if="tabPaneXR.get(4)" ref="zTable4" :tableList="tableList4" @link-detailbg="downloadfiles">
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
		</el-tabs>
		<!-- 选择客户 -->
		<ZDialog v-model="selectCustomerList.dialogShow" :title="$t('panelSelectcustomer')" width="75%" @close="selectCustomerClose">
			<selectCustomer :condobj="selectCustomerList"></selectCustomer>
		</ZDialog>

		<!-- 选择联系人 -->
		<ZDialog v-model="selectcontactList.dialogShow" width="75%" @close="selectcontactClose">
			<selectcontact :condobj="selectcontactList"></selectcontact>
		</ZDialog>

		<!-- 选择账户 -->
		<ZDialog v-model="selectAccountList.dialogShow" width="70%" @close="selectAccountClose">
			<selectAccount :condobj="selectAccountList"></selectAccount>
		</ZDialog>

		<!-- 上传附件弹出 -->
		<ZDialog
			v-model="uploadAttachmentList.dialogShow"
			:title="$t('UPLOAD_uploadFile')"
			width="40%"
			customclass="selectAgentCss"
			@close="qualificationClose"
		>
			<uploadAttachment :condobj="uploadAttachmentList"></uploadAttachment>
		</ZDialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { ElMessage, ElMessageBox, ElInput, ElTree } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import uploadAttachment from "/src/views/corp/uploadAttachment.vue";
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
	accountid: "",
	contracttype: "0",
	isdiscount: "0"
});

const paydeadlineValidator = (rule, value, callback) => {
	if (formDisabledList.paydeadline == false && !value) {
		callback(new Error(i18n.t("rulesPropMessage")));
	} else {
		callback();
	}
};
const maxlimitValidator = (rule, value, callback) => {
	if (formDisabledList.maxlimit == false && !value) {
		callback(new Error(i18n.t("rulesPropMessage")));
	} else {
		callback();
	}
};
const rules = reactive({
	corpno: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	establishmentdate: [{ required: true, message: i18n.t("rulesPropMessage") }],
	businesstype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	contactdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	contacttel: [{ required: true, message: i18n.t("rulesPropMessage") }],
	yearlydeal: [{ required: true, message: i18n.t("rulesPropMessage") }],
	applydate: [{ required: true, message: i18n.t("rulesPropMessage") }],
	paymentmethod: [{ required: true, message: i18n.t("rulesPropMessage") }],
	paydeadline: [{ required: true, validator: paydeadlineValidator, trigger: ["blur", "change"] }],
	maxlimit: [{ required: true, validator: maxlimitValidator, trigger: ["blur", "change"] }]
});
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

const crm_paymentmethod = getdropSownSelection("paymentmethod");
const usersex = getdropSownSelection("usersex");
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
	ruleFormRef.value.clearValidate(["maxlimit", "paydeadline"]);
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
			let srtUrl = "/crm/contract/contract!saveContractInfo.action";
			let jsonString = {
				contractInfo: formData
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
					"/crm/contract/contract!submit.action",
					qs.stringify({ jsonString: JSON.stringify({ contractInfos: [formData] }) })
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

//到账信息列表
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/contract_detail.vue_zTable1",
	tableToolbar: {
		whole: false
	},
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfoWithCustomer.action",
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
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
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
			title: "金额",
			label: "billinfoamountofmoneypanel",
			prop: "money",
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
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Input",
			width: "160"
		},
		{
			title: "已开票金额",
			label: "billinfoinvoicedamountpanel",
			prop: "receivedinvoice",
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
			title: "未开票金额",
			label: "billinfounbilledamountpanel",
			prop: "inputmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "retreatmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "billdate",
			type: "Date",
			width: "160"
		},
		{
			title: "付款人",
			label: "billinfopayerpanel",
			prop: "payer",
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
			title: "是否坏账",
			label: "billinfoisbaddebtpanel",
			prop: "isbadbill",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "200"
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
			prop: "billid",
			type: "id",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//联系人列表
const zTable2 = ref();
const tableList2 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/contract_detail.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	tableToolbar: {
		whole: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContactsByCond.action",
		root: "contactslist",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "联系人姓名",
			label: "companypanelcontactdesctitle",
			prop: "contactdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "departdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "职务",
			label: "corpinfopaneljobdesctitle",
			prop: "jobdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "性别",
			label: "itemtitlebase_userusersex",
			prop: "contactsex",
			type: "Select",
			typeData: usersex,
			width: "160"
		},
		{
			title: "办公电话",
			label: "itemtitlebase_usertel",
			prop: "tel",
			type: "Input",
			width: "160"
		},
		{
			title: "手机",
			label: "itemtitlebase_usermobile",
			prop: "mobile",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "email",
			type: "Input",
			width: "160"
		},
		{
			title: "邮编",
			label: "corpinfocorppostcodetitle",
			prop: "postcode",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input"
		},

		{
			title: "主键",
			label: "",
			prop: "contactid",
			type: "id",
			width: "160",
			isHide: true
		},
		{
			title: "主键关联ID",
			label: "",
			prop: "corpid",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//申请单查询列表
const zTable3 = ref();
const tableList3 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/contract_detail.vue_zTable3",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoOnlyByCond.action",
		root: "foldersInfos",
		baseParams: { "cond.rightFlag": "1" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "检测进度",
			label: "crmcolumntestschedule",
			prop: "checkstatus",
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
			label: "crmcolumnnotwriteoffmoney",
			prop: "writeoffmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "申请受理日期",
			label: "crmcolumnapplyacceptdate",
			prop: "logdate",
			type: "Date",
			width: "160"
		},
		{
			title: "预计完成时间",
			label: "itemtitlefoldersduedate",
			prop: "duedate",
			type: "Date",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//附件
const zTable4 = ref();
const tableList4 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/contract_detail.vue_zTable4",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: { "cond.businesscode": "Contract" }
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
			title: "文档大小",
			label: "companypanel3filesizetitle",
			prop: "filesize",
			type: "Input",
			width: "160"
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
		jsonString: "{uploadFile:{businesscode:'Contract', businessobjectid:'" + formData.contractid + "'}}"
	};
	uploadAttachmentList.success = false;
	uploadAttachmentList.dialogShow = true;
};
// 上传附件成功后的回调
const qualificationClose = () => {
	if (uploadAttachmentList.success) {
		zTable4.value.getTableList();
	}
};
//下载附件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
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
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable4.value.getTableList();
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
				tableList1.httpAttribute.baseParams["cond.corpcode"] = formData.corpno;
			}
			if (TabPaneName == 2) {
				tableList2.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
			}
			if (TabPaneName == 3) {
				tableList3.httpAttribute.baseParams["cond.rasclientid"] = formData.corpno;
			}
			if (TabPaneName == 4) {
				tableList4.httpAttribute.baseParams["cond.businessobjectid"] = formData.contractid;
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
