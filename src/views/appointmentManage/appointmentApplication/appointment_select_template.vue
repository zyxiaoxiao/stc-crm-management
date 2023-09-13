<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="selectTemplateApplintmentInfos" :tableList="dtableList" @link-detailbg="linkDetailbg">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectTemplateApplintment(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
					{{ $t("menubasequotationorderdownload") }}
				</el-button>
			</template>
		</zTable>
		<ZDialog v-model="condobj.dialogShow_appointmentReadonly" width="95%">
			<appointmentTemplateReadonly :condobj="condobj"></appointmentTemplateReadonly>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
import { GlobalStore } from "/src/store/globalStore.js";
import appointmentTemplateReadonly from "@/views/appointmentManage/appointmentApplication/appointment_detail.vue";
const i18n = useI18n();
let selectTemplateApplintmentInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
const globalStore = GlobalStore();
//检验类型
//let CRM_businessCategory = getdropSownSelection("CRM_businessCategory");
//默认需要传入的参数
const params = {};
//页面传入的值判断还需要添加的参数
if (props.condobj && props.condobj.cond) {
	let v_desc53 = props.condobj.cond.desc53;
	if (v_desc53) {
		params["cond.desc53"] = v_desc53;
	}
}
const dialogShow_appointmentReadonly = ref(false);

const editAddress = row => {
	if (!row.reservnum) {
		//没保存报价单
		ElMessage.warning(i18n.t("alert_saveclient"));
		return false;
	}
	let serverUrl = globalStore.serverUrl;
	window.location.href = serverUrl + "/mylims/order/appointment!downloadExcel.action?reservnum=" + row.reservnum;
};

//链接详细信息
const linkDetailbg = (column, row) => {
	if (column == "reservnum" && row.reservnum) {
		//选择委托单位
		condobj.cond = {
			readonly: "true",
			reservnum: row.reservnum
		};
		condobj.dialogShow_appointmentReadonly = true;
	}
};
//选择完数据后给父页面传值
const selectTemplateApplintment = list => {
	if (list != null && list.length > 0) {
		let vdata = [];
		for (let item of list) {
			vdata.push(item.reservnum);
		}
		props.condobj.objlist = vdata; //传参
		props.condobj.dialogShow_appointmentTemplate = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	selectTemplateApplintmentInfos.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "id",
		label: "id",
		prop: "reservnum",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "报价单编号",
		label: "crmcolumnreservnum",
		prop: "reservnum",
		type: "Link",
		width: "160"
	},
	{
		title: "委托单预览",
		label: "menubasequotationorderdownload",
		prop: "operation",
		type: "operation",
		width: "130"
	},
	{
		title: "委托检测公司（个人）",
		label: "crmcolumndesc15",
		prop: "desc15",
		type: "Input",
		width: "160"
	},
	{
		title: "委托日期",
		label: "columnappointment_desc21",
		prop: "desc21",
		type: "Input",
		width: "160"
	},
	{
		title: "ATTN",
		label: "ATTN",
		prop: "desc20",
		type: "Input",
		width: "120"
	},
	{
		title: "总价",
		label: "appointmentTotalprice_hkd",
		prop: "desc52",
		type: "Input",
		width: "140"
	},
	{
		title: "委托检测公司电话",
		label: "crmcolumndesc18",
		prop: "desc18",
		type: "Input",
		width: "150"
	},
	{
		title: "币种",
		label: "columnappointmentdesc53",
		prop: "desc53",
		type: "Input",
		width: "140"
	},
	{
		title: "SE姓名",
		label: "crmcolumndesc81",
		prop: "desc81",
		type: "Input",
		width: "150"
	},
	{
		title: "SE电话",
		label: "crmcolumndesc82",
		prop: "desc82",
		type: "Input",
		width: "160"
	},
	{
		title: "创建时间",
		label: "corpinfopanelqycjsjtitle",
		prop: "recordertime",
		type: "Input",
		width: "200"
	},
	{
		title: "检验类型",
		label: "columnBusinessdesc",
		prop: "businesstype",
		type: "Input",
		width: "160",
		isHide: true
	},
	{
		title: "提报单位",
		label: "",
		prop: "submitcorp",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "审核人编码",
		label: "",
		prop: "auditorcode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "审核人名称",
		label: "",
		prop: "auditordesc",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "审核时间",
		label: "",
		prop: "audittime",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "审核级别",
		label: "",
		prop: "auditlevel",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "是否已退回",
		label: "",
		prop: "retrieveflag",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "退回人编码",
		label: "",
		prop: "retrievercode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "退回人名称",
		label: "",
		prop: "retrieverdesc",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "退回时间",
		label: "",
		prop: "retrievetime",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "制单人单位",
		label: "",
		prop: "recordercorp",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "审核节点名称",
		label: "",
		prop: "auditlevelname",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "创建人名称",
		label: "",
		prop: "recorderdesc",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "recordercode",
		label: "",
		prop: "recordercode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "retrieveflag",
		label: "",
		prop: "workflowid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "提交时间",
		label: "",
		prop: "submittime",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "状态",
		label: "",
		prop: "auditflag",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "所属单位",
		label: "",
		prop: "corpdesc",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "单位编码",
		label: "",
		prop: "corpcode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "desc65",
		label: "",
		prop: "desc65",
		type: "Input",
		width: "60",
		isHide: true
	}
];

//表格对象
const dtableList = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_select_template.vue_selectTemplateApplintmentInfos",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectTemplateInfoByCond.action",
		root: "appointmentInfos",
		baseParams: params
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
