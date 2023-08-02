<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbgQuery">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Edit" plain @click="batchNew">{{ $t("menu_new") }}</el-button>
				<el-button size="small" type="danger" icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.ids)"
					>{{ $t("menu_delete") }}
				</el-button>
			</template>
		</zTable>
		<!-- 弹出详细界面 -->
		<ZDialog
			v-model="otherstaticdetailList.dialogShow"
			width="95%"
			title1="快递公司信息"
			:title="$t('menubaseotherstaticcompanyinformation')"
			@close="otherstaticdetailClose"
		>
			<otherstaticdetail :condobj="otherstaticdetailList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import otherstaticdetail from "./otherstatic_detail.vue";

const i18n = useI18n();
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/otherstatic_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/otherstatic/otherstatic!selectOtherstaticInfosByCond.action",
		root: "otherstaticInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "",
			prop: "otherstaticid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "快递名称(中文)",
			label: "columnotherstaticInfostaticname",
			prop: "staticname",
			type: "Link",
			width: "260"
		},
		{
			title: "快递名称(英文)",
			label: "columnotherstaticInfostaticname_en",
			prop: "staticname_en",
			type: "Input",
			width: "260"
		},
		{
			title: "值",
			label: "columnotherstaticInfostaticcode",
			prop: "staticcode",
			type: "Input",
			width: "260"
		},
		{
			title: "级别顺序",
			label: "itemtitleloginordernumbe",
			prop: "sorter",
			type: "Input",
			width: "80"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人",
			label: "corpinfopanelcjrtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//新增 弹出参数
const otherstaticdetailList = reactive({
	success: false,
	dialogShow: false,
	otherstaticid: "",
	workflowflag: "1"
});

//选择数据回调
const otherstaticdetailClose = () => {
	if (otherstaticdetailList.success) {
		zTable1.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	otherstaticdetailList.dialogShow = true;
	otherstaticdetailList.success = false;
	otherstaticdetailList.otherstaticid = row.otherstaticid;
	otherstaticdetailList.workflowflag = "1";
};

const batchNew = () => {
	otherstaticdetailList.dialogShow = true;
	otherstaticdetailList.success = false;
	otherstaticdetailList.otherstaticid = "";
	otherstaticdetailList.workflowflag = "1";
};

//批量删除数据
const batchDelete = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			otherstaticInfos: []
		};
		ids.forEach(item => {
			jsonString.otherstaticInfos.push({
				otherstaticid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/otherstatic/otherstatic!deleteOtherstaticInfos.action", qs.stringify(params));
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
