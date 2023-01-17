<template>
	<div class="all-height flex-column main-card" style="padding: 10px">
		<zTable ref="zTable1" :tableList="tableList1">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Edit" plain @click="new_handler">{{ $t("menu_new") }}</el-button>
				<el-button size="small" type="primary" icon="Document" plain :disabled="saveTestDisabled" @click="save_handler">
					{{ $t("menu_save") }}
				</el-button>
				<el-button size="small" type="danger" icon="Delete" plain :disabled="!scope.isSelected" @click="dle_handler(scope.ids)">{{
					$t("menu_delete")
				}}</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getdropSownSelection } from "@/utils/util.js";

const i18n = useI18n();
const menu_rqreport_classfication = getdropSownSelection("menu_rqreport_classfication");
//是否
const whetherAr = getdropSownSelection("whether");
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/dataAnalysisManagement/basicReport/rqreport_edit_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/core/report/rqreport!selectRqreportInfoListByCond.action",
		root: "rqreportInfoList",
		baseParams: { "cond.auditflag": "0" }
	},
	edit: true,
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "",
			prop: "rid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "报表文件",
			label: "itemtitlerqreportreportfile",
			prop: "reportfile",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "报表参数",
			label: "itemtitlerqreportreportargs",
			prop: "reportargs",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "报表名称",
			label: "itemtitlerqreportreportname",
			prop: "reportname",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "英文名称",
			label: "hotlinkpanelywmctitle",
			prop: "remark",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "数据集",
			label: "itemtitlecommonurl",
			prop: "sqlcount",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "报表分类名称",
			label: "itemtitlerqreportclassification",
			prop: "classification",
			type: "Select",
			typeData: menu_rqreport_classfication,
			width: "185",
			edit: true
		},
		{
			title: "是否为主账户",
			label: "companypanelOrNotMainAccounttitle",
			prop: "reporttype",
			type: "Select",
			typeData: whetherAr,
			width: "185",
			edit: true
		},

		{
			title: "申请单位",
			label: "itemtitlerqreportcorpdesc",
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
		}
	],
	// 表格数据
	tableData: []
});

const saveTestDisabled = ref(true);
//监听数据是否被编辑过
watch(
	() => tableList1.tableData,
	(newValue, oldValue) => {
		if (tableList1.tableData.length > 0 && zTable1.value.getEditSelectList().length > 0) {
			saveTestDisabled.value = false;
		} else {
			saveTestDisabled.value = true;
		}
	},
	{ deep: true } //深度监听
);

//新增
const new_handler = () => {
	zTable1.value.addRowData({ classification: "0", reporttype: "0" });
};
//保存
const save_handler = async () => {
	let params = {
		jsonString: JSON.stringify({
			rqreportInfoList: zTable1.value.getEditSelectList()
		})
	};
	const res = await http.post("/core/report/rqreport!saveRqreportInfo.action", qs.stringify(params));
	if (res) {
		zTable1.value.getTableList();
	}
};

//批量删除数据
const dle_handler = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			rqreportInfoList: []
		};
		ids.forEach(item => {
			jsonString.rqreportInfoList.push({
				rid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/report/rqreport!deleteRqreportInfoList.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
<style lang="scss"></style>
