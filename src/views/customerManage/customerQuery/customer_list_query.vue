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
				<!-- ???????????? -->
				<template #operation="scope">
					<el-button type="primary" link icon="Link" @click="openDrawer('1', scope.row)">
						{{ $t("menubaseapplicationorderquery") }}
					</el-button>
					<el-button type="primary" link icon="Link" @click="openDrawer('2', scope.row)">
						{{ $t("menubaseOwnershipChangeRecord") }}
					</el-button>
				</template>
			</zTable>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="dialogShow_Folders"
				:title="$t('menubaseapplicationorderquery')"
				width="50%"
				customclass="dialogShowFolders"
			>
				<selectFolders :condobj="condobj"></selectFolders>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="dialogShow_ChangeRecord"
				:title="$t('menubaseOwnershipChangeRecord')"
				width="90%"
				customclass="dialogShowChangeRecord"
			>
				<customerchangedetail :condobj="condobj"></customerchangedetail>
			</ZDialog>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { getCountry } from "/src/utils/util.js";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import selectFolders from "../customerApplication/selectFoldersForCustomerlist.vue";
import customerchangedetail from "../customerApplication/customer_change_detail.vue";

const zTable1 = ref();
const dialogShow_Folders = ref(false);
const dialogShow_ChangeRecord = ref(false);

const condobj = reactive({
	corpno: String,
	corpid: String
});
// ????????????????????????
const props = defineProps({
	condobj: Object
});

// ????????????
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

//????????????
const tableList = reactive({
	id: "/customerManage/customerQuery/customer_list_query.vue_zTable1",
	tableToolbar: {
		right: false
	},
	//??????????????????
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfoByCond.action",
		root: "enterpriseInfos",
		baseParams: {}
	},
	//????????????
	tablePropSearch: formData,
	//????????????
	tableColumns: [
		{
			title: "??????",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right"
		},
		{
			title: "?????????",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "????????????",
			label: "corpinfonametitle",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},

		{
			title: "????????????",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
			type: "Input",
			width: "160"
		},
		{
			title: "????????????",
			label: "hotlinkpanelywmctitle",
			prop: "corpenglishname",
			type: "Input",
			width: "160"
		},
		{
			title: "??????",
			label: "corpinfopanelbmtitle",
			prop: "corpalias",
			type: "Input",
			width: "160"
		},
		{
			title: "???????????????",
			label: "corpinfopanelRegistrationNumbertitle",
			prop: "businesslicenseno",
			type: "Input",
			width: "150"
		},
		{
			title: "??????",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input",
			width: "350"
		},
		{
			title: "??????",
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
			title: "?????????",
			label: "corpinfoSubordinateToBranchtitle",
			prop: "branchcorpdesc",
			type: "Input",
			width: "260"
		},
		{
			title: "??????",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "SE??????",
			label: "corpinfopanelsalesmantitle",
			prop: "salesmandesc",
			type: "Input",
			width: "120"
		},
		{
			title: "??????",
			label: "weixinfansCountry",
			prop: "country",
			type: "Input",
			width: "100"
		},
		{
			title: "???????????????",
			label: "corpinfopaneldlsbmtitle",
			prop: "agentcode",
			type: "Input",
			width: "120"
		},
		{
			title: "???????????????",
			label: "corpinfopaneldlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "120"
		}
	],
	// ????????????
	tableData: []
});

//??????
const quickQuery = () => {
	zTable1.value.getTableList();
};

//?????????????????????
const resetSearch = () => {
	for (let i in formData) {
		formData[i] = "";
	}
};
//??????????????????
const openDrawer = (v, row) => {
	//???????????????
	if (v == 1) {
		condobj.corpno = row.corpno;
		dialogShow_Folders.value = true;
	}
	if (v == 2) {
		condobj.corpid = row.corpid;
		dialogShow_ChangeRecord.value = true;
	}
};
//?????????????????????????????????
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
