<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="销售小组年度任务"
				:label="$t('panelcolumnsalesteamtask')"
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
						<el-button size="small" type="primary" icon="Upload" plain @click="importExcel_handler"
							>{{ $t("menu_importExcel") }}
						</el-button>
						<el-button size="small" type="primary" icon="Download" plain @click="downloadexcel_handler"
							>{{ $t("menu_downloadexcel") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="销售小组年度任务查询"
				:label="$t('panelcolumnsalesteamtaskquery')"
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
			v-model="salesteamannualdetailList.dialogShow"
			width="95%"
			title1="销售小组年度任务"
			:title="$t('panelcolumnsalesteamtask')"
			@close="salesteamannualdetailClose"
		>
			<salesteamannualdetail :condobj="salesteamannualdetailList"></salesteamannualdetail>
		</ZDialog>

		<!-- 导入弹出层 -->
		<el-dialog
			ref="importExcelDialog"
			v-model="importExcelList.dialogShow"
			width="500px"
			:title="$t('menu_upload')"
			:append-to-body="true"
			:destroy-on-close="true"
		>
			<uploadAttachment :condobj="importExcelList" style="margin-bottom: 30px" />
		</el-dialog>
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
import { downloadFile } from "/src/utils/fileUtil.js";
import salesteamannualdetail from "./salesteam_annual_detail.vue";
import uploadAttachment from "@/views/corp/uploadAttachment.vue";

const i18n = useI18n();

//表格表头
let tableColumns1 = reactive([
	{
		type: "selection",
		width: "40"
	},
	{
		title: "小组编码",
		label: "itemtitlegroupgroupcode",
		prop: "groupcode",
		type: "Input",
		width: "160"
	},
	{
		title: "小组名称",
		label: "itemtitlegroupgroupnname",
		prop: "groupdesc",
		type: "Link",
		width: "200"
	},
	{
		title: "组长工号",
		label: "columnbaseGroupLeaderNumber",
		prop: "headmancode",
		type: "Input",
		width: "160"
	},
	{
		title: "组长名称",
		label: "columnbaseGroupLeaderName",
		prop: "headmandesc",
		type: "Input",
		width: "160"
	},
	{
		title: "年份",
		label: "itemtitlebase_corpyears",
		prop: "years",
		type: "Input",
		width: "160"
	},
	{
		title: "年度任务总额",
		label: "panelcolumntotaltaskwell_hkd",
		prop: "taskwell",
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
		label: "panelcolumncreaterdesc",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "创建时间",
		label: "itemtitlestatusrecordertime",
		prop: "recordertime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "主键",
		label: "",
		prop: "groupid",
		type: "id",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/salesteam_annual_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/core/user/groups!selectSalesGroupInfoByCond.action",
		root: "salesTeamTaskInfos",
		baseParams: { "cond.submitflag": "0" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/systemSettings/basicConfiguration/salesteam_annual_query_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/core/user/groups!selectSalesGroupInfoByCond.action",
		root: "salesTeamTaskInfos",
		baseParams: { "cond.submitflag": "1" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const salesteamannualdetailList = reactive({
	success: false,
	dialogShow: false,
	groupid: "",
	workflowflag: "3"
});
//新增
const newDeliverysworkflowdetail = () => {
	salesteamannualdetailList.groupid = "";
	salesteamannualdetailList.workflowflag = "1";
	salesteamannualdetailList.success = false;
	salesteamannualdetailList.dialogShow = true;
};
// 新增 弹出 回调
const salesteamannualdetailClose = () => {
	if (salesteamannualdetailList.success) {
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
			salesTeamTaskInfos: []
		};
		ids.forEach(item => {
			jsonString.salesTeamTaskInfos.push({
				groupid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/user/groups!deleteSalesTeamTaskInfo.action", qs.stringify(params));
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
			jsonString: JSON.stringify({ salesTeamTaskInfos: row })
		};
		const res = await http.post("/core/user/groups!submitSalesInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//导入
const importExcelList = reactive({
	uploadUrl: "/core/user/groups!importExcel.action",
	uploadParameter: { jsonString: `{ uploadFile: { businesscode: "groups", handletype: "1" } }` }, //参数
	success: false,
	dialogShow: false
});

const importExcel_handler = () => {
	importExcelList.dialogShow = true;
};

//下载模板
const downloadexcel_handler = () => {
	downloadFile("/core/uploadnew/upload!downloadByFilename.action", "salesTeamAnnual.xlsx", {
		"cond.fileName": "salesTeamAnnual.xlsx",
		"cond.path": "/filedownload/2007"
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
			salesTeamTaskInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};

		const res = await http.post("/core/user/groups!backSalesInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("alertRevocationofsuccess"));
			zTable2.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	salesteamannualdetailList.groupid = row.groupid;
	salesteamannualdetailList.workflowflag = "1";
	salesteamannualdetailList.success = false;
	salesteamannualdetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	salesteamannualdetailList.groupid = row.groupid;
	salesteamannualdetailList.workflowflag = "3";
	salesteamannualdetailList.success = false;
	salesteamannualdetailList.dialogShow = true;
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
