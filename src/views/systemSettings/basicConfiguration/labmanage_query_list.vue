<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="实验室预算管理"
				:label="$t('menubaselabmanage')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newDeliverysworkflowdetail">{{
							$t("menu_new")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="batchDelete(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="Submit(scope.selectList)"
							>{{ $t("menu_submit") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="实验室预算管理查询"
				:label="$t('menubaselabmanagequery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="warning"
							icon="Back"
							plain
							:disabled="!scope.isSelected"
							@click="backHandler(scope.selectList)"
							>{{ $t("menu_back") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 新增弹出 -->
		<ZDialog
			v-model="labmanagedetailList.dialogShow"
			width="95%"
			title1="实验室预算"
			:title="$t('menubaselabmanage')"
			@close="contractdetailClose"
		>
			<labmanagedetail :condobj="labmanagedetailList"></labmanagedetail>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";

import labmanagedetail from "./labmanage_detail.vue";

const i18n = useI18n();

//表格表头
let tableColumns1 = reactive([
	{
		type: "selection",
		width: "40"
	},
	{
		title: "预算编号",
		label: "columnbasebudgetnum",
		prop: "labmanagenum",
		type: "Link",
		width: "160"
	},
	{
		title: "年份",
		label: "columnbaseyear",
		prop: "year",
		type: "Input",
		width: "160"
	},
	{
		title: "部门编码",
		label: "personaluserpanel2bmbmtitle",
		prop: "deptcode",
		type: "Input",
		width: "160"
	},
	{
		title: "部门名称",
		label: "corpinfopaneldepartmentcodetitle",
		prop: "deptdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "创建人编码",
		label: "columnCreatehumancoding",
		prop: "recordercode",
		type: "Input",
		width: "160"
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
		label: "itemtitlewlbmdesc10",
		prop: "recordtime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "描述",
		label: "itemtitlebase_codecodedesc",
		prop: "reamrk",
		type: "Input",
		width: "180"
	},
	{
		title: "主键",
		label: "",
		prop: "labmanageid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "状态",
		label: "",
		prop: "freezeflag",
		type: "Input",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/labmanage_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/labmanage/labmanage!selectLabmanageInfoByCond.action",
		root: "labmanageInfos",
		baseParams: { "cond.freezeflag": "2" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/systemSettings/basicConfiguration/labmanage_query_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/labmanage/labmanage!selectLabmanageInfoByCond.action",
		root: "labmanageInfos",
		baseParams: { "cond.freezeflag": "0" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const labmanagedetailList = reactive({
	success: false,
	dialogShow: false,
	labmanageid: "",
	workflowflag: "3"
});
//新增
const newDeliverysworkflowdetail = () => {
	labmanagedetailList.labmanageid = "";
	labmanagedetailList.workflowflag = "1";
	labmanagedetailList.success = false;
	labmanagedetailList.dialogShow = true;
};
// 新增 弹出 回调
const contractdetailClose = () => {
	if (labmanagedetailList.success) {
		zTable1.value.getTableList();
	}
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
			labmanageInfos: []
		};
		ids.forEach(item => {
			jsonString.labmanageInfos.push({
				labmanageid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/labmanage/labmanage!deleteLabmanageInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//提交
const Submit = row => {
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ labmanageInfos: row })
		};
		const res = await http.post("/crm/labmanage/labmanage!submitLabmanageInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//撤销
const backHandler = row => {
	ElMessageBox.confirm(i18n.t("alertConfirmrevocation"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			labmanageInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};

		const res = await http.post("/crm/labmanage/labmanage!cancelLabmanageInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("alertRevocationofsuccess"));
			zTable2.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	labmanagedetailList.labmanageid = row.labmanageid;
	labmanagedetailList.workflowflag = "1";
	labmanagedetailList.success = false;
	labmanagedetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	labmanagedetailList.labmanageid = row.labmanageid;
	labmanagedetailList.workflowflag = "3";
	labmanagedetailList.success = false;
	labmanagedetailList.dialogShow = true;
};

const tabPaneName = ref("0");
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "0":
			//
			zTable1.value.getTableList();
			break;
		case "1":
			//
			zTable2.value.getTableList();
			break;
	}
	tabPaneSet.add(TabPaneName);
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
