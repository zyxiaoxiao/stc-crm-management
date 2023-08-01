<template>
	<div class="all-height flex-column">
		<zTable ref="zTable1" :tableList="tableList1">
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

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable1 = ref();
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/group.vue_zTable1",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/core/user/groups!selectGroupInfoByCond.action",
		root: "groupsInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "小组编码",
			label: "itemtitlegroupgroupcode",
			prop: "groupid",
			type: "id",
			width: "160"
		},
		{
			title: "小组名称",
			label: "itemtitlegroupgroupnname",
			prop: "groupdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "单位编码",
			label: "itemtitlegroupcorpcode",
			prop: "corpcode",
			type: "Input",
			width: "160"
		},
		{
			title: "单位名称",
			label: "itemtitlegroupcorpname",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "制单人编码",
			label: "itemtitleworkflowdefrecordercode",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "制单人名称",
			label: "itemtitlecommonMakeListPeopleName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "制单时间",
			label: "itemtitlecommonrecordtime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "200"
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
//确认
const confirmClick = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
</script>
