<template>
	<div class="all-height flex-column">
		<el-form :model="formData" :rules="rules" ref="ruleFormRef" label-position="right" label-width="120px">
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="国家" :label="$t('weixinfansCountry')">
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
						<el-select
							v-model="formData.city"
							class="full-width-input"
							clearable
							filterable
							@change="cityChange"
							@visible-change="cityVisibleChange"
						>
							<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="地址类型" :label="$t('titlebaseAddresstype')">
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
					<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
						<el-input type="text" clearable v-model="formData.postcode"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item title1="详细地址" :label="$t('i18nCustomerapplicationCustomerCreateInformationDetailedAddress')">
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
			<!-- <el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="创建人" :label="$t('corpinfopanelcjrtitle')">
						<el-input type="text" clearable readonly v-model="formData.recorderdesc"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
						<el-input type="text" clearable readonly v-model="formData.recordertime"></el-input>
					</el-form-item>
				</el-col>
			</el-row> -->
		</el-form>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getdropSownSelection, getCountry, getAddressAll } from "/src/utils/util.js";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const ruleFormRef = ref();

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
	id: "",
	corpid: props.condobj.corpid
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

//根据 id 初始化数据源
const getFormData = async () => {
	let jsonString = {
		addressInfo: {
			id: props.condobj.id
		}
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/address/address!selectAddressInfoById.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	for (let key in res.addressInfo[0]) {
		//判定 addressInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			formData[key] = res.addressInfo[0][key];
		}
	}
};
if (props.condobj.id) {
	getFormData();
}
</script>

<style></style>
