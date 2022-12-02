<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="selectSubpackageApplintmentInfos" :tableList="dispersedquotetableList" @link-detailbg="linkDetailbg">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectSubpackageApplintment(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
	<div v-dialogStretching>
		<ZDialog v-model="condobj.dialogShow_appointmentReadonly" width="95%">
			<appointmentReadonly :condobj="condobj"></appointmentReadonly>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
import appointmentReadonly from "@/views/appointmentManage/appointmentApplication/appointment_detail.vue";
const i18n = useI18n();
let selectSubpackageApplintmentInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
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
const selectSubpackageApplintment = list => {
	if (list != null && list.length == 1) {
		props.condobj.objlist = list[0]; //传参
		props.condobj.deptSubpackageApplintmentDialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	selectSubpackageApplintmentInfos.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "报价单编号",
		label: "crmcolumnreservnum",
		prop: "reservnum",
		type: "Link",
		width: "160"
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
const dispersedquotetableList = reactive({
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoByDispersedquote.action",
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
