<template>
	<div class="all-height flex-column">
		<zTable ref="zTable3" :tableList="tableList3" />
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable3 = ref();
//地址表格
const tableList3 = reactive({
	id: "/customerManage/customerReadonly/select_results.vue_zTable3",
	isPaging: false, //是否显示分页
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectTestresultByFolderno.action",
		root: "vmaps",
		baseParams: {
			"cond.folderno": props.condobj.folderno
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "testcode",
			label: "",
			prop: "testcode",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "检测项目",
			label: "columnTestItems",
			prop: "testno",
			type: "Input"
		},
		{
			title: "检测结果",
			label: "folderitemtitletestresult",
			prop: "result",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	zTable3.value.getTableList();
});
</script>

<style lang="scss"></style>
