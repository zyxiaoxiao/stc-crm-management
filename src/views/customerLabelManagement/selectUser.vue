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
					@click="confirmClick(scope.selectList)"
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
import { getdropSownSelection } from "/src/utils/util.js";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//是否
const whetherAr = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");

let zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerLabelManagement/selectUser.vue_zTable1",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/core/user/user.action",
		root: "userInfos",
		baseParams: { "cond.freezeflag": "0", "cond.islocal": "0" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "id",
			label: "",
			prop: "userid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "用户编码",
			label: "itemtitlebase_userusercode",
			prop: "usercode",
			type: "Input",
			width: "160"
		},
		{
			title: "用户名称",
			label: "itemtitlebase_useruserdesc",
			prop: "userdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "单位名称",
			label: "itemtitlebase_usercorpdesc",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "EMAIL",
			label: "corpinfopanelemailtitle",
			prop: "email",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

const confirmClick = selectList => {
	props.condobj.arrayList = selectList;
	props.condobj.dialogShow = false;
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
