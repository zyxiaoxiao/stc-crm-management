<template>
	<div class="all-height flex-column main-card" style="padding: 10px">
		<el-divider content-position="left">{{ $t("columnQueryterms") }}</el-divider>
		<el-form :model="formData" label-position="right" label-width="120px">
			<el-row class="main-align-items-center">
				<el-col :span="6">
					<el-form-item :label="$t('fieldcolumncustomercode')">
						<el-input v-model="formData.corpno" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('fieldcolumncustomercodeold')">
						<el-input v-model="formData.corpnoold" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('corpinfonametitle')">
						<el-input v-model="formData.corpdesc" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('hotlinkpanelywmctitle')">
						<el-input v-model="formData.corpenglishname" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="main-align-items-center">
				<el-col :span="6">
					<el-form-item :label="$t('corpinfopanelbmtitle')">
						<el-input v-model="formData.corpalias" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('corpinfopanelRegistrationNumbertitle')">
						<el-input v-model="formData.businesslicenseno" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('corpinfoSubordinateToBranchtitle')">
						<el-input v-model="formData.branchcorpdesc" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('corpinfopaneldepartmentdesctitle')">
						<el-input v-model="formData.departmentdesc" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="main-align-items-center">
				<el-col :span="6">
					<el-form-item :label="$t('corpinfopanelsalesmantitle')">
						<el-input v-model="formData.salesmandesc" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('corpinfopanelemailtitle')">
						<el-input v-model="formData.corpemail" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('corpinfopaneldlsmctitle')">
						<el-input v-model="formData.agentdesc" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label="$t('weixinfansCountry')">
						<el-select v-model="formData.country" class="full-width-input" clearable filterable>
							<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="main-align-items-center">
				<el-col :span="12">
					<el-form-item :label="$t('columnAddress')" prop="corplocation">
						<el-input v-model="formData.corplocation" type="text" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-divider content-position="left"></el-divider>
		<div class="flex-1 flex-column" style="overflow: auto">
			<zTable ref="zTable1" :tableList="tableList">
				<template #tableHeaderLleft="scope">
					<el-button size="small" type="primary" icon="Search" plain @click="quickQuery">{{ $t("menu_select") }} </el-button>
					<el-button size="small" type="info" icon="RefreshLeft" plain @click="resetSearch">{{ $t("menu_clear") }} </el-button>
				</template>
				<!-- 自定义 -->
				<template #Custom="scope">
					<!-- 给客户信息列表中客户名称变红色用来区分废弃客户。 -->
					<span
						:style="{
							color: scope.row['discardflag'] == '1' ? '#ff0000' : '#606266'
						}"
					>
						{{ scope.row[scope.column] }}
					</span>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link icon="Link" @click="openDrawer('1', scope.row)">
						{{ $t("menubaseapplicationorderquery") }}
					</el-button>
					<el-button type="primary" link icon="Link" @click="openDrawer('2', scope.row)">
						{{ $t("menubaseOwnershipChangeRecord") }}
					</el-button>
					<el-button type="primary" link icon="Link" @click="openDrawer('3', scope.row)">
						{{ $t("corpinfopanelgsxxtitle") }}
					</el-button>
				</template>
			</zTable>
		</div>

		<ZDialog
			v-model="dialogShow_Folders"
			:title="$t('menubaseapplicationorderquery')"
			width="50%"
			customclass="dialogShowFolders"
		>
			<selectFolders :condobj="condobj"></selectFolders>
		</ZDialog>

		<ZDialog
			v-model="dialogShow_ChangeRecord"
			:title="$t('menubaseOwnershipChangeRecord')"
			width="90%"
			customclass="dialogShowChangeRecord"
		>
			<customerchangedetail :condobj="condobj"></customerchangedetail>
		</ZDialog>

		<ZDialog
			v-model="dialogShow_mycustomer"
			:title="$t('corpinfopanelgsxxtitle')"
			width="55%"
			customclass="dialogShowChangeRecord"
		>
			<mycustomer :condobj="condobj"></mycustomer>
		</ZDialog>
	</div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { getCountry } from "/src/utils/util.js";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import selectFolders from "../customerApplication/selectFoldersForCustomerlist.vue";
import customerchangedetail from "../customerApplication/customer_change_detail.vue";
import mycustomer from "../customerApplication/my_customer.vue";
const zTable1 = ref();
const dialogShow_Folders = ref(false);
const dialogShow_ChangeRecord = ref(false);
const dialogShow_mycustomer = ref(false);

const condobj = reactive({
	corpno: String,
	corpid: String
});
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

// 国家下拉
let paytype = ref([]);
const getAddressFun = async () => {
	paytype.value = await getCountry();
};
getAddressFun();

const formData = reactive({
	corpno: props?.condobj?.corpno ?? "",
	corpnoold: props?.condobj?.corpnoold ?? "",
	corpdesc: props?.condobj?.corpdesc ?? "",
	corpenglishname: props?.condobj?.corpenglishname ?? "",
	corpalias: props?.condobj?.corpalias ?? "",
	businesslicenseno: props?.condobj?.businesslicenseno ?? "",
	branchcorpdesc: props?.condobj?.branchcorpdesc ?? "",
	departmentdesc: props?.condobj?.departmentdesc ?? "",
	salesmandesc: props?.condobj?.salesmandesc ?? "",
	corpemail: props?.condobj?.corpemail ?? "",
	agentdesc: props?.condobj?.agentdesc ?? "",
	country: props?.condobj?.country ?? "",
	corplocation: props?.condobj?.corplocation ?? ""
});

//表格对象
const tableList = reactive({
	id: "/customerManage/customerQuery/customer_list_query.vue_zTable1",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfoByCond.action",
		root: "enterpriseInfos",
		baseParams: {}
	},
	//快捷查询
	tablePropSearch: formData,
	//表格表头
	tableColumns: [
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "corpinfonametitle",
			prop: "corpdesc",
			type: "Custom",
			width: "160"
		},

		{
			title: "旧客户号",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
			type: "Input",
			width: "160"
		},
		{
			title: "英文名称",
			label: "hotlinkpanelywmctitle",
			prop: "corpenglishname",
			type: "Input",
			width: "160"
		},
		{
			title: "别名",
			label: "corpinfopanelbmtitle",
			prop: "corpalias",
			type: "Input",
			width: "160"
		},
		{
			title: "工商注册号",
			label: "corpinfopanelRegistrationNumbertitle",
			prop: "businesslicenseno",
			type: "Input",
			width: "150"
		},
		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input",
			width: "350"
		},
		{
			title: "废弃",
			label: "itemtitlebase_userState2",
			prop: "discardflag",
			type: "Select",
			width: "80",
			typeData: [
				{
					label: "itemtitleisPackageOrNot0",
					value: "0"
				},
				{
					label: "itemtitleMainAccountOrNot1",
					value: "1"
				}
			]
		},
		{
			title: "分公司",
			label: "corpinfoSubordinateToBranchtitle",
			prop: "branchcorpdesc",
			type: "Input",
			width: "260"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "SE姓名",
			label: "corpinfopanelsalesmantitle",
			prop: "salesmandesc",
			type: "Input",
			width: "120"
		},
		{
			title: "国家",
			label: "weixinfansCountry",
			prop: "country",
			type: "Input",
			width: "100"
		},
		{
			title: "代理商编码",
			label: "corpinfopaneldlsbmtitle",
			prop: "agentcode",
			type: "Input",
			width: "120"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "120"
		}
	],
	// 表格数据
	tableData: []
});

//查询
const quickQuery = () => {
	zTable1.value.getTableList();
};

//清空快捷查询值
const resetSearch = () => {
	for (let i in formData) {
		formData[i] = "";
	}
};
//弹出对应界面
const openDrawer = (v, row) => {
	//申请单查询
	if (v == 1) {
		condobj.corpno = row.corpno;
		dialogShow_Folders.value = true;
	}
	if (v == 2) {
		condobj.corpid = row.corpid;
		dialogShow_ChangeRecord.value = true;
	}
	//归属信息查询
	if (v == 3) {
		condobj.corpid = row.corpid;
		dialogShow_mycustomer.value = true;
	}
};
//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style lang="scss">
.dialogShowFolders {
	height: 400px;
}

.dialogShowChangeRecord {
	height: 550px;
}
</style>
