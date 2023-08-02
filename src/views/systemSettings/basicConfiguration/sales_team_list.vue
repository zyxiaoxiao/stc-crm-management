<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbgQuery">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Edit" plain @click="batchNew">{{ $t("menu_new") }}</el-button>
				<el-button
					size="small"
					type="danger"
					icon="WarnTriangleFilled"
					plain
					:disabled="!scope.isSelected"
					@click="batchDiscard(scope.ids)"
					>{{ $t("menu_abandoned") }}
				</el-button>
			</template>
		</zTable>
		<!-- 弹出详细界面 -->
		<ZDialog v-model="salesteamdetailList.dialogShow" width="95%" @close="salesteamdetailClose">
			<salesteamdetail :condobj="salesteamdetailList" />
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
import salesteamdetail from "./sales_team_detail.vue";

const i18n = useI18n();

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/sales_team_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/salesteam/salesteam!selectSalesTeamInfoByCond.action",
		root: "salesTeamInfos",
		baseParams: { "cond.isnotdisused": "Y" }
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
			prop: "salesteamid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "角色",
			label: "tabtitlecoreuserquantumrole",
			prop: "isrole",
			type: "Input",
			width: "100"
		},
		{
			title: "启用时间",
			label: "basecolumnstart_time",
			prop: "activetime",
			type: "Date",
			width: "160"
		},
		{
			title: "花红启用年月",
			label: "basecolumnopening_date_of_annual_bonus",
			prop: "bmbonusactivedate",
			type: "Date",
			width: "160"
		},
		{
			title: "团队提佣启用日期",
			label: "menubaseActivationDateOfTeamCommission",
			prop: "teamcommissionbegindate",
			type: "Date",
			width: "160"
		},
		{
			title: "SM名称",
			label: "basecolumnsm_name",
			prop: "smdesc",
			type: "Input",
			width: "100"
		},
		{
			title: "SM编码",
			label: "basecolumnsm_code",
			prop: "smcode",
			type: "Input",
			width: "100"
		},
		{
			title: "BM名称",
			label: "basecolumnbm_name",
			prop: "bmdesc",
			type: "Input",
			width: "100"
		},
		{
			title: "BM编码",
			label: "basecolumnbm_code",
			prop: "bmcode",
			type: "Input",
			width: "100"
		},
		{
			title: "部门名称",
			label: "appointmentDepartment_name",
			prop: "corpdesc",
			type: "Input",
			width: "100"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "corpcode",
			type: "Input",
			width: "100"
		},
		{
			title: "是否废弃",
			label: "itemtitlebase_userState2",
			prop: "disused",
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
const salesteamdetailList = reactive({
	success: false,
	dialogShow: false,
	salesteamid: "",
	workflowflag: "1"
});

//选择数据回调
const salesteamdetailClose = () => {
	if (salesteamdetailList.success) {
		zTable1.value.getTableList();
	}
};

const batchNew = () => {
	salesteamdetailList.dialogShow = true;
	salesteamdetailList.success = false;
	salesteamdetailList.salesteamid = "";
	salesteamdetailList.workflowflag = "1";
};

//批量废弃数据
const batchDiscard = ids => {
	ElMessageBox.confirm(i18n.t("Message_AbandonedYesNo"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			salesTeamInfos: []
		};
		ids.forEach(item => {
			jsonString.salesTeamInfos.push({
				salesteamid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/salesteam/salesteam!deleteSalesTeamInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
