<template>
	<zTable ref="zTable1" :tableList="tableList">
		<template #tableHeaderLleft="scope">
			<el-button size="small" type="primary" icon="Search" plain @click="">客户查询</el-button>
		</template>
	</zTable>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//表格对象
const tableList = reactive({
	id: "/corp/selectcorpdistribution.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/core/corp/corp!selectTreeNew.action",
		root: "",
		baseParams: {
			"cond.freezeflag": "0",
			"cond.codeid": "1",
			"cond.syscode": props.condobj.syscode ?? "",
			"cond.processtype": props.condobj.processtype ?? "",
			"cond.usercode": props.condobj.usercode ?? "",
			"cond.rightflag": props.condobj.rightflag ?? false
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
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "单位名称",
			label: i18n.t("itemtitle.base_user.corpdesc"),
			prop: "corpdesc",
			type: "Input",
			width: "400"
		},
		{
			title: "单位编码",
			label: i18n.t("itemtitle.base_user.corpcode"),
			prop: "corpcode",
			type: "Input",
			width: "160"
		},
		{
			title: "停用标志",
			label: i18n.t("itemtitlebase_corpfreezeflag"),
			prop: "corpcode",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});
</script>

<style></style>
