<template>
	<div class="all-height flex-column">
		<div style="margin-top: 15px"></div>
		<zTable ref="zTable1" :tableList="tableList"> </zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable1 = ref();
//表格对象
const tableList = reactive({
	id: "/customerManage/customerApplication/my_customer.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/distribution/distribution!selectCustomerOwnership.action",
		root: "userInfoMaps",
		baseParams: {
			"cond.corpid": props.condobj.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			title: "单位编码",
			label: "itemtitlebase_flowcorpcode",
			prop: "corpcode",
			type: "Input",
			width: "120"
		},
		{
			title: "所属单位",
			label: "itemtitlegroupcorpname",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "角色编码",
			label: "itemtitlebase_rolerolecode",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "业务员",
			label: "columnexpendituresalesmandesc",
			prop: "sedesc",
			type: "Input",
			width: "350"
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style lang="scss"></style>
