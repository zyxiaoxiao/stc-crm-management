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
			v-model="areamanagementdetailList.dialogShow"
			width="95%"
			title1="区域部门信息"
			:title="$t('menubaseareamanagementinformation')"
			@close="areamanagementdetailClose"
		>
			<areamanagementdetail :condobj="areamanagementdetailList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { getdropSownSelection } from "/src/utils/util.js";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import areamanagementdetail from "./areamanagement_detail.vue";

const i18n = useI18n();

const crm_kdfwqylx = getdropSownSelection("crm_kdfwqylx");
const crm_qyglxx = getdropSownSelection("crm_qyglxx");

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/areamanagement_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/areamanagement/areamanagement!selectAreamanagementInfosByCond.action",
		root: "areamanagementInfos",
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
			prop: "areamanagementid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "区域级别",
			label: "columnareamanagementInfoaddrlevel",
			prop: "addrlevel",
			type: "Select",
			typeData: crm_qyglxx,
			width: "160"
		},
		{
			title: "区域部门编码",
			label: "columnareamanagementInfoaddrcode",
			prop: "addrcode",
			type: "Input",
			width: "160"
		},
		{
			title: "区域部门名称",
			label: "columnareamanagementInfoaddrdesc",
			prop: "addrdesc",
			type: "Link",
			width: "160"
		},
		{
			title: "区域编码",
			label: "columnareamanagementInfoparentcode",
			prop: "parentcode",
			type: "Select",
			typeData: crm_kdfwqylx,
			width: "100"
		},
		{
			title: "多语言编码",
			label: "columnareamanagementInfoi18n",
			prop: "i18n",
			type: "Input",
			width: "100"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "260"
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
const areamanagementdetailList = reactive({
	success: false,
	dialogShow: false,
	areamanagementid: "",
	workflowflag: "1"
});

//选择数据回调
const areamanagementdetailClose = () => {
	if (areamanagementdetailList.success) {
		zTable1.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	areamanagementdetailList.dialogShow = true;
	areamanagementdetailList.success = false;
	areamanagementdetailList.areamanagementid = row.areamanagementid;
	areamanagementdetailList.workflowflag = "1";
};

const batchNew = () => {
	areamanagementdetailList.dialogShow = true;
	areamanagementdetailList.success = false;
	areamanagementdetailList.areamanagementid = "";
	areamanagementdetailList.workflowflag = "1";
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
			areamanagementInfos: []
		};
		ids.forEach(item => {
			jsonString.areamanagementInfos.push({
				areamanagementid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/areamanagement/areamanagement!deleteAreamanagementInfos.action", qs.stringify(params));
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
