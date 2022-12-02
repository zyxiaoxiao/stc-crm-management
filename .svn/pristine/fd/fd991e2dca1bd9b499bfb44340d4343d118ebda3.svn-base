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
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
					<el-divider content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')">
								<el-input type="text" v-model.trim="formData.corpdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="英文名称" :label="$t('hotlinkpanelywmctitle')">
								<el-input type="text" v-model.trim="formData.corpenglishname" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="别名" :label="$t('corpinfopanelbmtitle')">
								<el-input type="text" v-model="formData.corpalias" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="工商注册号" :label="$t('corpinfopanelRegistrationNumbertitle')">
								<el-input type="text" v-model="formData.businesslicenseno" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item
								title1="送检客户类别"
								:label="$t('i18nCustomerapplicationCustomerCreateInformationInspectionCustomerCategory')"
							>
								<el-select v-model="formData.appointcustomtype" class="full-width-input" disabled>
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
							<el-form-item title1="客户类别" :label="$t('corpinfopanelkhlbtitle')">
								<el-select v-model="formData.corptype" class="full-width-input" disabled>
									<el-option
										v-for="item in customerCustomertype"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item title1="税号" :label="$t('corpinfopaneltaxpayerIDtitle')">
								<el-input type="text" v-model="formData.taxpayerid" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="18">
							<el-form-item title1="详细地址" :label="$t('i18nCustomerapplicationCustomerCreateInformationDetailedAddress')">
								<el-input type="text" v-model="formData.corplocation" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
								<el-input type="text" v-model="formData.corppostcode" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="国家" :label="$t('weixinfansCountry')">
								<el-select v-model="formData.country" class="full-width-input" disabled>
									<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
								<el-select v-model="formData.region" class="full-width-input" disabled>
									<el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="省份" :label="$t('i18nCustomerapplicationCustomerCreateInformationProvince')">
								<el-select v-model="formData.province" class="full-width-input" disabled>
									<el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="市区" :label="$t('i18nCustomerapplicationCustomerCreateInformationCityCenter')">
								<el-select v-model="formData.city" class="full-width-input" disabled>
									<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="联系人" :label="$t('companypanelcontactdesctitle')">
								<el-input type="text" v-model="formData.contactname" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')">
								<el-input type="text" v-model="formData.corpphone" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="传真" :label="$t('personalusercolumncztitle')">
								<el-input type="text" v-model="formData.corpfax" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')">
								<el-input type="text" v-model="formData.corpemail" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="网址" :label="$t('corpinfourltitle')">
								<el-input type="text" v-model="formData.corpsite" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户来源" :label="$t('menubaseCustomerSource')">
								<el-select v-model="formData.customersource" class="full-width-input" disabled>
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
									title1="添加到联系人"
									v-model="formData.addcontact"
									:label="$t('companyaddcontacttitle')"
									border
									disabled
								/>
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
								<el-select v-model="formData.corpcurrency" class="full-width-input" disabled>
									<el-option v-for="item in corpcurrency" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="信贷上限" :label="$t('corpinfocreditlimittitle')">
								<el-input type="text" v-model="formData.creditline" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="付款条件" :label="$t('corpinfopaymentconditionstitle')">
								<el-select v-model="formData.paycondition" class="full-width-input" disabled>
									<el-option
										v-for="item in paycondition"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="首次交易日期" :label="$t('corpinfofirstTransactiondatetitle')">
								<el-input type="text" v-model="formData.firstdealdate" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="是否协议客户" :label="$t('itemtitlebase_userisdiscount')">
								<el-select v-model="formData.isdiscount" class="full-width-input" disabled>
									<el-option v-for="item in isdiscount" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="折扣" :label="$t('columnappointmentdiscount')">
								<el-input type="text" v-model.number="formData.discount" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="最低消费额(港币)" :label="$t('columnappointmentminmoney')">
								<el-input type="text" v-model.number="formData.minmoney" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopaneldlsxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="代理商名称" :label="$t('corpinfopaneldlsmctitle')">
								<el-input v-model="formData.agentdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="代理商编码" :label="$t('corpinfopaneldlsbmtitle')">
								<el-input type="text" v-model="formData.agentcode" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label-width="170px" title1="销售代理佣金点" :label="$t('itemtitlefoldersagentbrokerage')">
								<el-input-number
									v-model.number="formData.agentbrokerage"
									:min="0"
									:max="100"
									controls-position="right"
									readonly
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelgsxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="分公司" :label="$t('corpinfoSubordinateToBranchtitle')">
								<el-input type="text" v-model="formData.branchcorpdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属部门" :label="$t('corpinfopaneldepartmentdesctitle')">
								<el-input type="text" v-model="formData.departmentdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属类型" :label="$t('itemtitleAttributiontype')">
								<el-select v-model="formData.newcustomtype" class="full-width-input" disabled>
									<el-option
										v-for="item in newcustomtype"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="销售人员/客服" :label="$t('itemtitleSalesservice')">
								<el-input type="text" v-model="formData.salesmandesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属级别" :label="$t('columnlevelattribution')">
								<el-select v-model="formData.deptlevel" class="full-width-input" disabled>
									<el-option v-for="item in deptlevel" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("panelcolumnRemark") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')">
								<el-input type="textarea" v-model="formData.remark" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="PKM 客户区域" :label="$t('customerapplicationinvoice_format')">
								<el-select v-model="formData.invoiceformat" class="full-width-input" disabled>
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
				title1="客户资质文件信息"
				:label="$t('companypanel3CustomerQualificationFileInformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList" @link-detailbg="downloadfiles" />
			</el-tab-pane>
			<el-tab-pane
				title1="客户联系人信息"
				:label="$t('companypanelCustomerContactInformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<div v-if="tabPaneXR.get(2)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTable2" :tableList="tableList2" @current-change="currentChangeContact" />
				</div>
				<el-divider content-position="left" style="margin: 0px; margin-top: 10px; border-width: 3px" />
				<div v-if="tabPaneXR.get(2)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTable22" :tableList="tableList22" />
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="地址信息"
				:label="$t('titlebaseAddressinformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="3"
			>
				<div v-if="tabPaneXR.get(3)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTable3" :tableList="tableList3" @current-change="currentChangeAddress" />
				</div>
				<el-divider content-position="left" style="margin: 0px; margin-top: 10px; border-width: 3px" />
				<div v-if="tabPaneXR.get(3)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTable33" :tableList="tableList33" />
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="账户信息"
				:label="$t('menhuAccountInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="4"
			>
				<zTable v-if="tabPaneXR.get(4)" ref="zTable4" :tableList="tableList4" @link-detailbg="downloadAccountfiles" />
			</el-tab-pane>
			<el-tab-pane
				title1="客户综合信息"
				:label="$t('companyCustomerComplexInformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="5"
			>
				<el-form
					v-if="tabPaneXR.get(5)"
					style="margin-top: 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					ref="ruleFormRef5"
				>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="规模" :label="$t('columnscale')">
								<el-input type="text" v-model="formData.scale" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="行业" :label="$t('columnindustry')">
								<el-input type="textarea" v-model="formData.industry" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="其他信息" :label="$t('columnotherinfo')">
								<el-input type="textarea" v-model="formData.otherinfo" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="测试要求" :label="$t('columntestdemand')">
								<el-input type="textarea" v-model="formData.testdemand" readonly />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider content-position="left" style="margin: 0px; border-width: 3px" />
				<zTable v-if="tabPaneXR.get(5)" ref="zTable5" :tableList="tableList5" />
			</el-tab-pane>
			<el-tab-pane
				title1="归属信息"
				:label="$t('corpinfopanelgsxxtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="6"
			>
				<zTable v-if="tabPaneXR.get(6)" ref="zTable6" :tableList="tableList6" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection, getCountry, getCurrency, getdropDownInChina } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const ruleFormRef = ref();
const addcontactDisabled = ref(false);

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
	auditflag: "",
	workflowid: "",
	submitcorp: "",
	corpno: "",
	retrieveflag: ""
});

//下拉数据源
const detectCustomerCategory = getdropSownSelection("detectCustomerCategory");
const customerCustomertype = getdropSownSelection("customer_customertype");
const customersource = getdropSownSelection("customer_informationsource");
const paycondition = getdropSownSelection("dgbj_paydeadline");
const invoiceformat = getdropSownSelection("crminvoice_format");
const filetypeAr = getdropSownSelection("qualificationDocumentto");
const filelevelAr = getdropSownSelection("i18nCustomerapplicationFileDocumentlevel");
const addresstypeAr = getdropSownSelection("crm_addresstype");
//是否
const whetherAr = getdropSownSelection("whether");
const isdiscount = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");

//货币类型
let corpcurrency = reactive([]);
getCurrency(corpcurrency);

//归属类型
let newcustomtype = [
	{
		label: "i18nCustomerapplicationsecustomer",
		value: "SE"
	},
	{
		label: "itemtitlenewcustomtype0",
		value: "CSO"
	}
];
//归属级别
let deptlevel = [
	{
		label: "tltilecolumndeptlevelbloc",
		value: "bloc"
	},
	{
		label: "tltilecolumndeptlevelbranch",
		value: "branch"
	},
	{
		label: "tltilecolumndeptlevelordinary",
		value: "ordinary"
	}
];

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

region.value = regionAr.value = getdropDownInChina("crm_region");
province.value = proviceAr.value = getdropDownInChina("crm_province");
city.value = cityAr.value = getdropDownInChina("crm_city");
//异步请求，瞬间同时请求一个接口多次，会取消所以请求，只会执行最后一次请求（随机的）
//处理方法：如果是同一个接口那就同步请求。
const getAddressFun = async () => {
	paytype.value = await getCountry();
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
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!selectCorpBaseInfoById.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
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
	addcontactDisabled.value = true;
};

const zTable1 = ref();
//客户资质文件信息表格对象
const tableList = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable1",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/upload/upload!selectfilesInfoByCond.action",
		root: "fileInfos",
		baseParams: {
			"cond.corpid": formData.corpid,
			"cond.usercodeid": "YZ"
		}
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

//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

const zTable2 = ref();
//联系人表格
const tableList2 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContactsByCond.action",
		root: "contactslist",
		baseParams: {
			"cond.corpid": formData.corpid
		}
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
			prop: "contactid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "联系人姓名",
			label: "companypanelcontactdesctitle",
			prop: "contactdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "默认联系人",
			label: "companypaneldefaultcontacttitle",
			prop: "defaultcontact",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "性别",
			label: "itemtitlebase_userusersex",
			prop: "contactsex",
			type: "Select",
			typeData: usersexAr,
			width: "80"
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
			title: "传真",
			label: "columnFax",
			prop: "fax",
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
			title: "业务类别",
			label: "companypanelbusinesstypetitle",
			prop: "businesstype",
			type: "Input",
			width: "160"
		},
		{
			title: "职务",
			label: "companypositiontitle",
			prop: "jobdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "昵称",
			label: "weixinlogNickname",
			prop: "contactsnickname",
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
			title: "WECHAT",
			prop: "wechat",
			type: "Input",
			width: "160"
		},
		{
			title: "直线",
			label: "itemtitlecontactsstraightline",
			prop: "straightline",
			type: "Input",
			width: "160"
		},
		{
			title: "生日",
			label: "itemtitlecontactscontactsbirthday",
			prop: "contactsbirthday",
			type: "Input",
			width: "200"
		},
		{
			title: "子女信息",
			label: "itemtitlecontactschildinfo",
			prop: "childinfo",
			type: "Input",
			width: "160"
		},
		{
			title: "说明(性格.爱好)",
			label: "itemtitlecontactsinstructions",
			prop: "instructions",
			type: "Input",
			width: "200"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "300"
		}
	],
	// 表格数据
	tableData: []
});

//联系人对应的地址表格
const zTable22 = ref();
const tableList22 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable22",
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCondWithContact.action",
		root: "addressInfos",
		baseParams: {
			"cond.contactid": ""
		}
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
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "地址类型",
			label: "titlebaseAddresstype",
			prop: "addrtype",
			type: "Select",
			typeData: addresstypeAr,
			width: "160"
		},
		{
			title: "国家",
			label: "weixinfansCountry",
			prop: "country",
			type: "Select",
			typeData: paytype,
			width: "160"
		},
		{
			title: "区域",
			label: "i18nCustomerapplicationCustomerCreateInformationArea",
			prop: "region",
			type: "Select",
			typeData: regionAr,
			width: "160"
		},
		{
			title: "省份",
			label: "i18nCustomerapplicationCustomerCreateInformationProvince",
			prop: "provice",
			type: "Select",
			typeData: proviceAr,
			width: "160"
		},
		{
			title: "市区",
			label: "i18nCustomerapplicationCustomerCreateInformationCityCenter",
			prop: "city",
			type: "Select",
			typeData: cityAr,
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
			title: "详细地址",
			label: "i18nCustomerapplicationCustomerCreateInformationDetailedAddress",
			prop: "address",
			type: "Input",
			width: "300"
		},
		{
			title: "备注信息",
			label: "itemtitlebzxxremark",
			prop: "remark",
			type: "Input",
			width: "300"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "190"
		},
		{
			title: "创建时间",
			label: "hotlinkpanelcjsjtitle",
			prop: "recordertime",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//联系人列表选中行事件
const currentChangeContact = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		tableList22.httpAttribute.baseParams["cond.contactid"] = currentRow.contactid;
	}
};

const zTable3 = ref();
//地址表格
const tableList3 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable3",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCond.action",
		root: "addressInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
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
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "地址类型",
			label: "titlebaseAddresstype",
			prop: "addrtype",
			type: "Select",
			typeData: addresstypeAr,
			width: "160"
		},
		{
			title: "国家",
			label: "weixinfansCountry",
			prop: "country",
			type: "Select",
			typeData: paytype,
			width: "160"
		},
		{
			title: "区域",
			label: "i18nCustomerapplicationCustomerCreateInformationArea",
			prop: "region",
			type: "Select",
			typeData: regionAr,
			width: "160"
		},
		{
			title: "省份",
			label: "i18nCustomerapplicationCustomerCreateInformationProvince",
			prop: "provice",
			type: "Select",
			typeData: proviceAr,
			width: "160"
		},
		{
			title: "市区",
			label: "i18nCustomerapplicationCustomerCreateInformationCityCenter",
			prop: "city",
			type: "Select",
			typeData: cityAr,
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
			title: "详细地址",
			label: "i18nCustomerapplicationCustomerCreateInformationDetailedAddress",
			prop: "address",
			type: "Input",
			width: "300"
		},
		{
			title: "备注信息",
			label: "itemtitlebzxxremark",
			prop: "remark",
			type: "Input",
			width: "300"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "190"
		},
		{
			title: "创建时间",
			label: "hotlinkpanelcjsjtitle",
			prop: "recordertime",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//地址对应联系人表格
const zTable33 = ref();
const tableList33 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable33",
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContactsByid.action",
		root: "contactslist",
		baseParams: {
			"cond.id": ""
		}
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
			prop: "contactid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "联系人姓名",
			label: "companypanelcontactdesctitle",
			prop: "contactdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "默认联系人",
			label: "companypaneldefaultcontacttitle",
			prop: "defaultcontact",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "性别",
			label: "itemtitlebase_userusersex",
			prop: "contactsex",
			type: "Select",
			typeData: usersexAr,
			width: "80"
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
			title: "传真",
			label: "columnFax",
			prop: "fax",
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
			title: "业务类别",
			label: "companypanelbusinesstypetitle",
			prop: "businesstype",
			type: "Input",
			width: "160"
		},
		{
			title: "职务",
			label: "companypositiontitle",
			prop: "jobdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "昵称",
			label: "weixinlogNickname",
			prop: "contactsnickname",
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
			title: "WECHAT",
			prop: "wechat",
			type: "Input",
			width: "160"
		},
		{
			title: "直线",
			label: "itemtitlecontactsstraightline",
			prop: "straightline",
			type: "Input",
			width: "160"
		},
		{
			title: "生日",
			label: "itemtitlecontactscontactsbirthday",
			prop: "contactsbirthday",
			type: "Input",
			width: "170"
		},
		{
			title: "子女信息",
			label: "itemtitlecontactschildinfo",
			prop: "childinfo",
			type: "Input",
			width: "160"
		},
		{
			title: "说明(性格.爱好)",
			label: "itemtitlecontactsinstructions",
			prop: "instructions",
			type: "Input",
			width: "200"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "300"
		}
	],
	// 表格数据
	tableData: []
});

//地址列表选中行事件
const currentChangeAddress = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		tableList33.httpAttribute.baseParams["cond.id"] = currentRow.id;
	}
};
const zTable4 = ref();
//账户表格
const tableList4 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable4",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectCrmaccountInfoByCond.action",
		root: "crmaccountInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
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
			prop: "accountid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "账户号",
			label: "companypanelaccountnotitle",
			prop: "accountno",
			type: "Input",
			width: "160"
		},
		{
			title: "账户名",
			label: "companypanelaccountnametitle",
			prop: "accountcode",
			type: "Input",
			width: "160"
		},
		{
			title: "是否为主账户",
			label: "companypanelOrNotMainAccounttitle",
			prop: "ismain",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "开户行",
			label: "companypanelaccountbanktitle",
			prop: "accountbank",
			type: "Input",
			width: "160"
		},
		{
			title: "银行地址",
			label: "companypanelbankadresstitle",
			prop: "bankadress",
			type: "Input",
			width: "160"
		},
		{
			title: "SWIFT",
			label: "companypanelswifttitle",
			prop: "swift",
			type: "Input",
			width: "160"
		},
		{
			title: "首次交易日期",
			label: "corpinfofirstTransactiondatetitle",
			prop: "firstdealtime",
			type: "Input",
			width: "160"
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link",
			width: "300"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "300"
		}
	],
	// 表格数据
	tableData: []
});

//下载账户对应的资质文件
const downloadAccountfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

const zTable5 = ref();
const tableList5 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable5",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/report/reportinfo!selectCrmReportInfoByCond.action",
		root: "crmReportInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
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
			prop: "reportid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "报告中文抬头",
			label: "itemtitlereportzh",
			prop: "report_zh",
			type: "Input",
			width: "200"
		},
		{
			title: "报告英文抬头",
			label: "itemtitlereportus",
			prop: "report_us",
			type: "Input",
			width: "200"
		},
		{
			title: "报告中文地址",
			label: "itemtitlereportaddresszh",
			prop: "report_address_zh",
			type: "Input"
		},
		{
			title: "报告英文地址",
			label: "itemtitlereportaddresscn",
			prop: "report_address_us",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

//归属表格
const zTable6 = ref();
const tableList6 = reactive({
	id: "/customerManage/customerReadonly/company_detail_new_readonly.vue_zTable6",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/user/user!selectDistributionUserinfo.action",
		root: "userInfoMaps",
		baseParams: {
			"cond.corpid": formData.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "用户ID",
			label: "",
			prop: "userid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "单位编码",
			label: "itemtitlebase_usercorpcode",
			prop: "corpcode",
			type: "Input",
			width: "200"
		},
		{
			title: "单位名称",
			label: "itemtitlebase_usercorpdesc",
			prop: "corpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "归属类型",
			label: "itemtitleAttributiontype",
			prop: "newcustomtype",
			type: "Select",
			typeData: newcustomtype,
			width: "200"
		},
		{
			title: "用户名",
			label: "itemtitlebase_userusercode",
			prop: "usercode",
			type: "Input",
			width: "200"
		},
		{
			title: "姓名",
			label: "itemtitlebase_useruserdesc",
			prop: "userdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "200"
		},
		{
			title: "变更企业id",
			label: "",
			prop: "enterpriseid",
			type: "Input",
			width: "200",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const tableTabsValue = ref(0);

const tabPaneXR = new Map([
	[1, false],
	[2, false],
	[3, false],
	[4, false],
	[5, false],
	[6, false]
]);
//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.corpid) {
		switch (TabPaneName) {
			case 1:
				// 客户资质文件信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 2:
				// 客户联系人信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 3:
				// 地址信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 4:
				// 账户信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 5:
				// 客户综合信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 6:
				// 归属信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
		}
	}
};

onMounted(() => {
	getAddressFun();
	if (formData.corpid) {
		getFormData();
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
