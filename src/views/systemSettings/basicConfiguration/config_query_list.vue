<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="达标奖设置"
				:label="$t('panelcolumnstandardsetting')"
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
				title1="达标奖查询"
				:label="$t('panelcolumnstandardquery')"
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
		<ZDialog v-model="configdetailList.dialogShow" width="95%" @close="contractdetailClose">
			<configdetail :condobj="configdetailList"></configdetail>
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

import configdetail from "./config_detail.vue";

const i18n = useI18n();

//表格表头
let tableColumns1 = reactive([
	{
		type: "selection",
		width: "40"
	},
	{
		title: "单位编码",
		label: "itemtitlebase_corpcorpcode",
		prop: "corpcode",
		type: "Input",
		width: "160"
	},
	{
		title: "单位名称",
		label: "itemtitlebase_corpcorpdesc",
		prop: "corpdesc",
		type: "Link",
		width: "200"
	},
	{
		title: "年份",
		label: "itemtitlebase_corpyears",
		prop: "years",
		type: "Input",
		width: "160"
	},
	{
		title: "制单人编码",
		label: "itemtitlebase_i18nrecordercode",
		prop: "recordercode",
		type: "Input",
		width: "160"
	},
	{
		title: "制单人名称",
		label: "itemtitlebase_i18nrecorderdesc",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "制单时间",
		label: "itemtitlecommomrecordtime",
		prop: "recordtime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "开始时间",
		label: "tabtitlecalendarstarttime",
		prop: "begintime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "结束时间",
		label: "tabtitlecalendarendtime",
		prop: "endtime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "备注",
		label: "columnappointment_desc42",
		prop: "remark",
		type: "Input",
		width: "200"
	},
	{
		title: "主键",
		label: "",
		prop: "attainedid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "单位id",
		label: "",
		prop: "corpid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "用户ID",
		label: "",
		prop: "userid",
		type: "Input",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/config_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/attained/config!selectConfigInfoByCond.action",
		root: "configInfos",
		baseParams: { "cond.auditflag": "0" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/systemSettings/basicConfiguration/config_query_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/attained/config!selectConfigInfoByCond.action",
		root: "configInfos",
		baseParams: { "cond.auditflag": "1" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const configdetailList = reactive({
	success: false,
	dialogShow: false,
	attainedid: "",
	workflowflag: "3"
});
//新增
const newDeliverysworkflowdetail = () => {
	configdetailList.attainedid = "";
	configdetailList.workflowflag = "1";
	configdetailList.success = false;
	configdetailList.dialogShow = true;
};
// 新增 弹出 回调
const contractdetailClose = () => {
	if (configdetailList.success) {
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
			configInfos: []
		};
		ids.forEach(item => {
			jsonString.configInfos.push({
				attainedid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/attained/config!deleteConfigInfo.action", qs.stringify(params));
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
			jsonString: JSON.stringify({ configInfos: row })
		};
		const res = await http.post("/crm/attained/config!submitConfigInfos.action", qs.stringify(params));
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
			configInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};

		const res = await http.post("/crm/attained/config!backConfigInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("alertRevocationofsuccess"));
			zTable2.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	configdetailList.attainedid = row.attainedid;
	configdetailList.workflowflag = "1";
	configdetailList.success = false;
	configdetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	configdetailList.attainedid = row.attainedid;
	configdetailList.workflowflag = "3";
	configdetailList.success = false;
	configdetailList.dialogShow = true;
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
