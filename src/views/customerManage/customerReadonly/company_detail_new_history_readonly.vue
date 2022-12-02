<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="客户基本信息" :label="$t('companyCustomerBasicInformationtitle')" :name="0">
				<el-form
					style="margin: 0px 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-divider content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
								<el-input type="text" v-model.trim="formData.corpno" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="旧客户号" :label="$t('fieldcolumncustomercodeold')">
								<el-input type="text" v-model.trim="formData.corpnofirst" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="">
								<el-input type="text" v-model.trim="formData.corpnolast" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')" prop="corpdesc">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corpdesc" @blur="onblur_corpdesc" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="英文名称" :label="$t('hotlinkpanelywmctitle')" prop="corpenglishname">
								<div class="flex-row flx-center flex-1">
									<el-input
										type="text"
										v-model.trim="formData.corpenglishname"
										:formatter="value => value.toUpperCase()"
										readonly
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="别名" :label="$t('corpinfopanelbmtitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corpalias" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="工商注册号" :label="$t('corpinfopanelRegistrationNumbertitle')" prop="businesslicenseno">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.businesslicenseno" readonly />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item
								title1="送检客户类别"
								:label="$t('i18nCustomerapplicationCustomerCreateInformationInspectionCustomerCategory')"
							>
								<el-select v-model.trim="formData.appointcustomtype" class="full-width-input" disabled>
									<el-option
										v-for="item in detectCustomerCategory"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户类别" :label="$t('corpinfopanelkhlbtitle')" prop="corptype">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.corptype" class="full-width-input" disabled>
										<el-option
											v-for="item in customerCustomertype"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										/>
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item title1="税号" :label="$t('corpinfopaneltaxpayerIDtitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.taxpayerid" readonly />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="18">
							<el-form-item
								title1="详细地址"
								:label="$t('i18nCustomerapplicationCustomerCreateInformationDetailedAddress')"
								prop="corplocation"
							>
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corplocation" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corppostcode" readonly />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="国家" :label="$t('weixinfansCountry')" prop="country">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.country" class="full-width-input" @change="countryChange" disabled>
										<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
								<div class="flex-row flx-center flex-1">
									<el-select
										v-model.trim="formData.region"
										class="full-width-input"
										@change="regionChange"
										@visible-change="regionVisibleChange"
										disabled
									>
										<el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="省份" :label="$t('i18nCustomerapplicationCustomerCreateInformationProvince')">
								<div class="flex-row flx-center flex-1">
									<el-select
										v-model.trim="formData.province"
										class="full-width-input"
										@change="provinceChange"
										@visible-change="provinceVisibleChange"
										disabled
									>
										<el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="市区" :label="$t('i18nCustomerapplicationCustomerCreateInformationCityCenter')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.city" class="full-width-input" @visible-change="cityVisibleChange" disabled>
										<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="联系人" :label="$t('companypanelcontactdesctitle')" prop="contactname">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.contactname" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')" prop="corpphone">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corpphone" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="传真" :label="$t('personalusercolumncztitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corpfax" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')" prop="corpemail">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corpemail" readonly />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="网址" :label="$t('corpinfourltitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.corpsite" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户来源" :label="$t('menubaseCustomerSource')" prop="customersource">
								<el-select v-model.trim="formData.customersource" class="full-width-input" disabled>
									<el-option
										v-for="item in customersource"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item>
								<el-checkbox
									title1="不接收推广邮件"
									v-model="formData.representmail"
									:label="$t('menubaseReceivePromotionEmail')"
									border
									disabled
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("fieldTradinginformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="常用货币" :label="$t('corpinfoCommonmoneytitle')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.corpcurrency" class="full-width-input" disabled>
										<el-option v-for="item in corpcurrency" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="信贷上限" :label="$t('corpinfocreditlimittitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" v-model.trim="formData.creditline" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="付款条件" :label="$t('corpinfopaymentconditionstitle')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.paycondition" class="full-width-input" disabled>
										<el-option v-for="item in paycondition" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="首次交易日期" :label="$t('corpinfofirstTransactiondatetitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" readonly v-model.trim="formData.firstdealdate" />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="是否协议客户" :label="$t('itemtitlebase_userisdiscount')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.isdiscount" class="full-width-input" disabled>
										<el-option v-for="item in isdiscount" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="折扣" :label="$t('columnappointmentdiscount')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" readonly v-model.number="formData.discount" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="最低消费额(港币)" :label="$t('columnappointmentminmoney')">
								<el-input type="text" readonly v-model.number="formData.minmoney" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopaneldlsxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="代理商名称" :label="$t('corpinfopaneldlsmctitle')">
								<div class="flex-row flx-center flex-1">
									<el-input v-model.trim="formData.agentdesc" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="代理商编码" :label="$t('corpinfopaneldlsbmtitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" readonly v-model.trim="formData.agentcode" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item
								label-width="170px"
								title1="销售代理佣金点"
								:label="$t('itemtitlefoldersagentbrokerage')"
								prop="agentbrokerage"
							>
								<el-input-number
									v-model.number="formData.agentbrokerage"
									:min="0"
									:max="100"
									controls-position="right"
									:disabled="agentbrokerageDisabled"
									readonly
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("panelcolumnRemark") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')" prop="remark">
								<div class="flex-row flx-center flex-1">
									<el-input type="textarea" v-model.trim="formData.remark" readonly />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="PKM 客户区域" :label="$t('customerapplicationinvoice_format')">
								<el-select v-model.trim="formData.invoiceformat" class="full-width-input" disabled>
									<el-option
										v-for="item in invoiceformat"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item>
								<el-checkbox
									title1="是否受保护"
									v-model="formData.protection"
									:label="$t('companyunderprotectiontitle')"
									border
									disabled
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcjrxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="创建人" :label="$t('corpinfopanelcjrtitle')">
								<el-input type="text" readonly v-model.trim="formData.recorderdesc" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
								<el-input type="text" readonly v-model.trim="formData.recordtime" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection, getCountry, getCurrency, getAddress, getAddressAll } from "/src/utils/util.js";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

// 父组件传入的参数
const props = defineProps({
	condobj: {
		dialogShow: false, //打开和关闭弹窗层
		corpid: "" //原客户id
	}
});

const i18n = useI18n();

const isbtnShow = ref(true);
const tableTabsValue = ref(0);
const ruleFormRef = ref();
const agentbrokerageDisabled = ref(true);

//表单字段
const formData = reactive({
	corpid: props.condobj.corpid,
	corpdesc: "",
	corpenglishname: "",
	corpalias: "",
	businesslicenseno: "",
	appointcustomtype: "",
	corptype: "",
	taxpayerid: "",
	corplocation: "",
	corppostcode: "",
	country: "",
	region: "",
	province: "",
	city: "",
	contactname: "",
	corpphone: "",
	corpfax: "",
	corpemail: "",
	corpsite: "",
	addcontact: "",
	customersource: "",
	representmail: "",
	corpcurrency: "",
	creditline: "",
	paycondition: "0",
	firstdealdate: "",
	isdiscount: "0",
	discount: 0,
	minmoney: 200,
	agentcode: "",
	agentdesc: "",
	agentbrokerage: 0,
	branchcorpdesc: "",
	branchcorpcode: "",
	departmentdesc: "",
	departmentcode: "",
	newcustomtype: "SE",
	salesmandesc: "",
	deptlevel: "",
	remark: "",
	invoiceformat: "",
	protection: "",
	recorderdesc: "",
	recordtime: "",
	scale: "",
	industry: "",
	otherinfo: "",
	testdemand: "",
	recordercode: "",
	recorderdesc: "",
	mendercode: "",
	menderdesc: "",
	auditflag: "",
	workflowid: "",
	submitcorp: "",
	corpno: "",
	retrieveflag: "",
	corpnofirst: "",
	corpnolast: "",
	iscommon: "",
	bgusercode: "",
	oldbranchcorpcode: ""
});
//校验
const corpdescValidator = (rule, value, callback) => {
	//客户姓名不允许出现!，因为!在被用来替换英文单引号
	if (value.indexOf("@!!!@") >= 0) {
		callback(new Error(i18n.t("Message_Corodescname")));
	} else {
		callback();
	}
};
const agentbrokerageValidator = (rule, value, callback) => {
	if (formData.agentcode && (!value || !Number.isInteger(value))) {
		callback(new Error(i18n.t("rulesPropMessage") + ", " + i18n.t("mustbeanumber")));
	} else {
		callback();
	}
};
const businesslicensenoValidator = async (rule, value, callback) => {
	if (formData.country == "086" && !value) {
		callback(new Error(i18n.t("message_ChinaUserBusinessRefistration_CanNotEmpty")));
	} else if (value) {
		let params = { "cond.bulicno": formData.businesslicenseno, "cond.corpid": formData.corpid };
		try {
			await http.post("/mylims/enterpriseinfo/enterpriseinfo!bulicnoValidate.action", qs.stringify(params), {
				headers: { noLoading: true }
			});
			callback();
		} catch (error) {
			callback(new Error(i18n.t("Message_OperationFailureInformation")));
		}
	} else {
		callback();
	}
};

const rules = reactive({
	corpdesc: [
		{ required: true, message: i18n.t("rulesPropMessage") },
		{ validator: corpdescValidator, trigger: "blur" }
	],
	corpenglishname: [{ required: true, message: i18n.t("rulesPropMessage") }],
	businesslicenseno: [{ validator: businesslicensenoValidator, trigger: "blur" }],
	corptype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corplocation: [{ required: true, message: i18n.t("rulesPropMessage") }],
	country: [{ required: true, message: i18n.t("rulesPropMessage") }],
	contactname: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpphone: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpemail: [{ required: true, message: i18n.t("rulesPropMessage") }],
	customersource: [{ required: true, message: i18n.t("rulesPropMessage") }],
	newcustomtype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	agentbrokerage: [{ validator: agentbrokerageValidator, trigger: "blur" }],
	remark: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

//下拉数据源
const detectCustomerCategory = getdropSownSelection("detectCustomerCategory");
const customerCustomertype = getdropSownSelection("customer_customertype");
const customersource = getdropSownSelection("customer_informationsource");
const paycondition = getdropSownSelection("dgbj_paydeadline");
const invoiceformat = getdropSownSelection("crminvoice_format");
//是否
const isdiscount = getdropSownSelection("whether");

// 国家下拉
let paytype = ref([]);
//区域下拉
let region = ref([]);
//省份下拉
let province = ref([]);
//市区下拉
let city = ref([]);

//区域下拉
let regionAr = ref([]);
//省份下拉
let proviceAr = ref([]);
//市区下拉
let cityAr = ref([]);

//异步请求，瞬间同时请求一个接口多次，会取消所以请求，只会执行最后一次请求（随机的）
//处理方法：如果是同一个接口那就同步请求。
const getAddressFun = async () => {
	paytype.value = await getCountry();
	region.value = regionAr.value = await getAddressAll("crm_region");
	province.value = proviceAr.value = await getAddressAll("crm_province");
	city.value = cityAr.value = await getAddressAll("crm_city");
};

// 选中 国家下拉
const countryChange = val => {
	formData.region = "";
	formData.province = "";
	formData.city = "";
	region.length = 0;
	province.length = 0;
	city.length = 0;
};
// 选中 区域下拉
const regionChange = val => {
	formData.province = "";
	formData.city = "";
	province.length = 0;
	city.length = 0;
};
const regionVisibleChange = async val => {
	if (val) {
		region.value = await getAddress("crm_region", formData.country, paytype.value);
	}
};
// 选中 省份下拉
const provinceChange = val => {
	formData.city = "";
	city.length = 0;
};
const provinceVisibleChange = async val => {
	if (val) {
		province.value = await getAddress("crm_province", formData.region, region.value);
	}
};
const cityVisibleChange = async val => {
	if (val) {
		city.value = await getAddress("crm_city", formData.province, province.value);
	}
};

//货币类型
let corpcurrency = reactive([]);
getCurrency(corpcurrency);

//在 formData.corpdesc 失去焦点时触发
const onblur_corpdesc = e => {
	for (var i = 0; i < formData.corpdesc.length; i++) {
		if (formData.corpdesc.charCodeAt(i) > 127) {
			return;
		}
	}

	if (!formData.corpenglishname) {
		formData.corpenglishname = formData.corpdesc;
	}
};

//根据 corpid 初始化数据源
const getFormData = async () => {
	let jsonString = {
		enterpriseInfo: {
			corpid: formData.corpid
		}
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!selectCorpBaseInfoById.action", qs.stringify(params));

	for (let key in res.enterpriseInfo[0]) {
		//判定 enterpriseInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			if (key == "addcontact" || key == "representmail" || key == "protection") {
				formData[key] = res.enterpriseInfo[0][key] == 0 ? false : true;
			} else {
				formData[key] = res.enterpriseInfo[0][key];
			}

			if (key == "agentbrokerage") {
				formData[key] = res.enterpriseInfo[0][key] > 0 ? res.enterpriseInfo[0][key] : 0;
			}
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	//只有tab页是客户基本信息才显示 保存和 客户查询按钮
	targetName == 0 ? (isbtnShow.value = true) : (isbtnShow.value = false);

	if (formData.corpid) {
	} else {
		if (targetName != 0) {
			setTimeout(() => {
				tableTabsValue.value = 0;
				ElMessage({
					message: i18n.t("Statement_writeandsavekeyinformation"),
					type: "warning",
					offset: 50,
					showClose: true,
					grouping: true,
					duration: 6000
				});
			}, 10);
		}
	}
};

onMounted(() => {
	if (formData.corpid) {
		getFormData();
		getAddressFun();
	}
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}
</style>
<style lang="scss">
.selectAgentCss {
	height: 500px;
}
</style>
