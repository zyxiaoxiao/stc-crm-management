<template>
	<div class="all-height flex-column">
		<zTable ref="zTable3" :tableList="tableList3">
			<template #tableHeaderLleft="scope">
				<el-button
					size="small"
					type="primary"
					icon="Finished"
					plain
					:disabled="!scope.isSelected"
					@click="confirmClick(scope.ids, scope.selectList)"
				>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import zTable from "/src/components/ZTable/index.vue";
import { getdropSownSelection, getCountry, getAddressAll } from "/src/utils/util.js";

const addresstypeAr = getdropSownSelection("crm_addresstype");

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

// 国家下拉
let paytype = ref([]);
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
	regionAr.value = await getAddressAll("crm_region");
	proviceAr.value = await getAddressAll("crm_province");
	cityAr.value = await getAddressAll("crm_city");
};
getAddressFun();

const zTable3 = ref();
//地址表格
const tableList3 = reactive({
	id: "/customerManage/customerSelete/customeraddress_select.vue_zTable3",
	//设置 为单选
	isRadio: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCond.action",
		root: "addressInfos",
		baseParams: {
			"cond.corpid": props.condobj.corpid
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
			width: "160"
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

const confirmClick = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
//页面初始化渲染完成执行
onMounted(() => {
	zTable3.value.getTableList();
});
</script>

<style lang="scss"></style>
