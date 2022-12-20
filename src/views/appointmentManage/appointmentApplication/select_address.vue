<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="zTable1" :tableList="ctableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectAddress(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="Edit" @click="editAddress(scope.row)">
					{{ $t("editAddress") }}
				</el-button>
			</template>
		</zTable>
	</div>
	<div v-dialogStretching>
		<ZDialog
			v-model="condobj.addressDetailDialogShow"
			:title="$t('titlebaseAddressinformation')"
			width="85%"
			customclass="selectAdress1InfoCss"
			@close="addressDetailDialogclose"
		>
			<customerAddressDetailQuery :condobj="condobj"></customerAddressDetailQuery>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
import { getdropSownSelection, getdropDownInChina } from "/src/utils/util.js";
import ZDialog from "/src/components/ZDialog.vue";
import customerAddressDetailQuery from "@/views/appointmentManage/appointmentApplication/customeraddress_detail.vue";
const i18n = useI18n();
let zTable1 = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	dialogShow: false,
	cond: {},
	objlist: {}
});

// 编辑地址信息
const editAddress = row => {
	//地址信息
	if (row.id) {
		condobj.cond = {
			id: row.id
		};
		condobj.addressDetailDialogShow = true;
	}
};

//子页面关闭后的方法可以刷新住页面
const addressDetailDialogclose = () => {
	//地址关闭后刷新数据
	zTable1.value.getTableList();
};

//默认需要传入的参数
let params = {};
//地址类型下拉
let crm_addresstype = getdropSownSelection("crm_addresstype");
//国家下拉
let crm_country = getdropSownSelection("crm_country");
//区域下拉
let crm_region = getdropDownInChina("crm_region");
//省份下拉
let crm_province = getdropDownInChina("crm_province");
//市区下拉
let crm_city = getdropDownInChina("crm_city");

let vdata = {};
//选择完数据后给父页面传值
const selectAddress = list => {
	if (list != null && list.length == 1) {
		vdata = list[0]; //地址数据
		props.condobj.objlist = vdata; //传参
		props.condobj.addressDialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};
if (props.condobj != null) {
	let corpid = props.condobj.cond.corpid;
	if (corpid) {
		params["cond.corpid"] = corpid;
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Message_DataErrorPleaseContactITPersonnel")
		});
	}
}
//表格对象
const ctableList = reactive({
	id: "/appointmentManage/appointmentApplication/select_address.vue_zTable1",
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCond.action",
		root: "addressInfos",
		baseParams: params
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "地址类型",
			label: "titlebaseAddresstype",
			prop: "addrtype",
			type: "Select",
			width: "100",
			typeData: crm_addresstype
		},
		{
			title: "国家",
			label: "weixinfansCountry",
			prop: "country",
			type: "Select",
			width: "100",
			typeData: crm_country
		},
		{
			title: "区域",
			label: "columnwriteoff_region",
			prop: "region",
			type: "Select",
			width: "100",
			typeData: crm_region
		},
		{
			title: "省份",
			label: "i18nCustomerapplicationCustomerCreateInformationProvince",
			prop: "provice",
			type: "Select",
			width: "100",
			typeData: crm_province
		},
		{
			title: "市区",
			label: "i18nCustomerapplicationCustomerCreateInformationCityCenter",
			prop: "city",
			type: "Select",
			width: "100",
			typeData: crm_city
		},
		{
			title: "详细地址",
			label: "i18nCustomerapplicationCustomerCreateInformationDetailedAddress",
			prop: "address",
			type: "Input",
			width: "140"
		},
		{
			title: "备注信息",
			label: "itemtitlebzxxremark",
			prop: "remark",
			type: "Input",
			width: "140"
		},
		{
			title: "电话",
			label: "tel",
			prop: "tel",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "传真",
			label: "fax",
			prop: "fax",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "创建人名称",
			label: "recorderdesc",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "recordertime",
			prop: "recordertime",
			type: "Input",
			width: "160"
		},
		{
			title: "修改人名称",
			label: "modifypersondesc",
			prop: "modifypersondesc",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "修改时间",
			label: "modifytime",
			prop: "modifytime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "创建编码",
			label: "recordercode",
			prop: "recordercode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "修改人编码",
			label: "modifypersoncode",
			prop: "modifypersoncode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "id",
			label: "id",
			prop: "id",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpid",
			label: "corpid",
			prop: "corpid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "分公司编码",
			label: "companycode",
			prop: "companycode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "countrycode",
			label: "countrycode",
			prop: "countrycode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "provicecode",
			label: "provicecode",
			prop: "provicecode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			width: "130",
			fixed: "right"
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	//selectEnterpriseInfos.value.getTableList();
	//页面传入的值判断还需要添加的参数

	zTable1.value.getTableList();
});
</script>

<style lang="scss">
.selectAdress1InfoCss {
	height: 500px;
}
</style>
