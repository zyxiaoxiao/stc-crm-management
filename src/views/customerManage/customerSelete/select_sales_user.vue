<template>
	<div class="all-height flex-column">
		<zTable ref="zTable1" :tableList="tableList">
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

//表格对象
const tableList = reactive({
	id: "/customerManage/customerSelete/select_sales_user.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/core/user/user!selectNOBGUserInfoByCorpcode.action",
		root: "userInfos",
		baseParams: {
			"cond.islocal": "0",
			"cond.corpcode": props.condobj.corpcode,
			"cond.rolecode": props.condobj.rolecode
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "userid",
			label: "userid",
			prop: "userid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "用户编码",
			label: "usergrouppanel_usercolumnusercodetitle",
			prop: "usercode",
			type: "Input",
			width: "160"
		},
		{
			title: "用户名称",
			label: "columnUsernametitle",
			prop: "userdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "单位编码",
			label: "itemtitlebase_flowcorpcode",
			prop: "corpcode",
			type: "Input",
			width: "160"
		},
		{
			title: "所属单位",
			label: "panelcolumnHomeunit",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "邮箱",
			label: "corpinfopanelemailtitle",
			prop: "email",
			type: "Input",
			width: "160"
		},
		{
			title: "联系电话",
			label: "itemtitlebase_usertel",
			prop: "mobile",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});

const confirmClick = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
</script>

<style></style>
