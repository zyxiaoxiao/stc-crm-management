<template>
	<div class="all-height flex-column">
		<div style="margin: 10px; text-align: right">
			<el-button size="small" type="primary" icon="Document" plain @click="saveHandler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
		</div>
		<el-form :model="formData" :rules="rules" ref="ruleFormRef" label-position="right" label-width="120px">
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="国家" :label="$t('weixinfansCountry')" prop="country">
						<el-select v-model="formData.country" class="full-width-input" clearable filterable @change="countryChange">
							<el-option
								v-for="item in paytype"
								:key="item.value"
								:label="item.label ? $t(item.label) : item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
						<el-select
							v-model="formData.region"
							class="full-width-input"
							clearable
							filterable
							@change="regionChange"
							@visible-change="regionVisibleChange"
						>
							<el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="省份" :label="$t('i18nCustomerapplicationCustomerCreateInformationProvince')">
						<el-select
							v-model="formData.provice"
							class="full-width-input"
							clearable
							filterable
							@change="proviceChange"
							@visible-change="proviceVisibleChange"
						>
							<el-option v-for="item in provice" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="市区" :label="$t('i18nCustomerapplicationCustomerCreateInformationCityCenter')">
						<el-select v-model="formData.city" class="full-width-input" clearable filterable @visible-change="cityVisibleChange">
							<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="地址类型" :label="$t('titlebaseAddresstype')" prop="addrtype">
						<el-select v-model="formData.addrtype" class="full-width-input" clearable filterable>
							<el-option
								v-for="item in addresstypeAr"
								:key="item.value"
								:label="item.label ? $t(item.label) : item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')" prop="postcode">
						<el-input type="text" clearable v-model="formData.postcode"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item
						title1="详细地址"
						prop="address"
						:label="$t('i18nCustomerapplicationCustomerCreateInformationDetailedAddress')"
					>
						<el-input type="text" clearable v-model="formData.address"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')">
						<el-input type="textarea" clearable v-model="formData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getdropSownSelection, getCountry, getAddress, getAddressAll } from "/src/utils/util.js";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage } from "element-plus";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const ruleFormRef = ref();
let v_id = "";
if (props.condobj != null && props.condobj.cond) {
	v_id = props.condobj.cond.id;
}

//表单字段
const formData = reactive({
	country: "",
	region: "",
	provice: "",
	city: "",
	addrtype: "",
	postcode: "",
	address: "",
	remark: "",
	recorderdesc: "",
	recordertime: "",
	id: v_id,
	corpid: ""
});
//校验
const rules = reactive({
	country: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	addrtype: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	postcode: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	address: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	]
});

//下拉数据源
const addresstypeAr = getdropSownSelection("crm_addresstype");

// 国家下拉
let paytype = ref([]);
//区域下拉
let region = ref([]);
//省份下拉
let provice = ref([]);
//市区下拉
let city = ref([]);

const getAddressFun = async () => {
	paytype.value = await getCountry();
	region.value = await getAddressAll("crm_region");
	provice.value = await getAddressAll("crm_province");
	city.value = await getAddressAll("crm_city");
};
getAddressFun();

// 选中 国家下拉
const countryChange = val => {
	formData.region = "";
	formData.provice = "";
	formData.city = "";
	region.length = 0;
	provice.length = 0;
	city.length = 0;
};
// 选中 区域下拉
const regionChange = val => {
	formData.provice = "";
	formData.city = "";
	provice.length = 0;
	city.length = 0;
};
const regionVisibleChange = async val => {
	if (val) {
		region.value = await getAddress("crm_region", formData.country, paytype.value);
	}
};
// 选中 省份下拉
const proviceChange = val => {
	formData.city = "";
	city.length = 0;
};
const proviceVisibleChange = async val => {
	if (val) {
		provice.value = await getAddress("crm_province", formData.region, region.value);
	}
};
const cityVisibleChange = async val => {
	if (val) {
		city.value = await getAddress("crm_city", formData.provice, provice.value);
	}
};

//根据 id 初始化数据源
const getFormData = async () => {
	let jsonString = {
		addressInfo: {
			id: v_id
		}
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/address/address!selectAddressInfoById.action", qs.stringify(params));
	for (let key in res.addressInfo[0]) {
		//判定 addressInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			formData[key] = res.addressInfo[0][key];
		}
	}
};
if (v_id) {
	getFormData();
}

//保存
const saveHandler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let jsonString = {
				addressInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post("/crm/address/address!saveAddressInfo.action", qs.stringify(params));
			if (res) {
				ElMessage({
					type: "success",
					message: i18n.t("Message_saveSuccess")
				});
				props.condobj.success = true;
				props.condobj.addressDetailDialogShow = false;
			}
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};
</script>

<style></style>
