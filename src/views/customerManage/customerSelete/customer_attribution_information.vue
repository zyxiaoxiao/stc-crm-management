<template>
	<div class="all-height flex-column">
		<div style="margin: 10px">
			<el-button size="small" type="primary" icon="Finished" plain :disabled="!isSelected" @click="confirmClick">
				{{ $t("buttoncommonconfirm") }}
			</el-button>
		</div>
		<div>
			<el-form label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
				<el-divider content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
				<el-row :gutter="15" class="main-align-items-center">
					<el-col :span="6">
						<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
							<el-input type="text" v-model.trim="formData.corpno" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')">
							<el-input type="text" v-model.trim="formData.corpdesc" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')">
							<el-input type="text" v-model="formData.corpphone" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')">
							<el-input type="text" v-model="formData.corpemail" readonly />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="15" class="main-align-items-center">
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
						<el-form-item title1="归属级别" :label="$t('columnlevelattribution')">
							<el-select v-model="formData.deptlevel" class="full-width-input" disabled>
								<el-option v-for="item in deptlevel" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
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
		</div>
		<div style="flex: 10; overflow: auto">
			<zTable ref="zTable1" :tableList="tableList1" @selection-change="selectionChange" />
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";
import qs from "qs";
import http from "@/api/index.js";
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const ruleFormRef = ref();
const isSelected = ref(false);
const formData = reactive({
	corpid: props.condobj.corpid
});

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
		formData[key] = res.enterpriseInfo[0][key];
	}
};

//归属表格
const zTable1 = ref();
const tableList1 = reactive({
	id: "/customerManage/customerSelete/customer_attribution_information.vue_zTable1",
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
			type: "Input"
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

/**
 * @description 多选操作
 * @param {Array} rowArr 当前选择的所有数据
 * @return void
 */
const selectionChange = rowArr => {
	rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true);
};

//页面初始化渲染完成执行
onMounted(() => {
	if (formData.corpid) {
		getFormData();
		zTable1.value.getTableList();
	}
});

const confirmClick = () => {
	props.condobj.arrayList = zTable1.value.selectList;
	props.condobj.dialogShow = false;
};
</script>

<style lang="scss"></style>
