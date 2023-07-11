<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="selectEnterpriseInfos" :tableList="tableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectCustomer(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { ElMessage } from "element-plus";
const i18n = useI18n();
let selectEnterpriseInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object,
	objlist: Object
});
//默认需要传入的参数
const params = {
	"cond.lockflag": "0",
	"cond.iscommon": "N",
	"cond.auditflag": "2",
	"cond.discardflag": "0"
};
//页面传入的值判断还需要添加的参数
if (props.condobj != null) {
	let desc90 = props.condobj.cond.desc90;
	let corptype = props.condobj.cond.corptype;
	if (corptype) {
		if (corptype == "Y") {
			params["cond.nocorptype"] = "0";
		} else {
			params["cond.corptype"] = corptype;
		}
	} else {
		corptype = "0";
		if (desc90 == "Y") {
			params["cond.v_corptype"] = corptype;
		} else {
			params["cond.nocorptype"] = corptype;
		}
	}
}
const vdata = {};
//选择完数据后给父页面传值
const selectCustomer = list => {
	if (list != null && list.length == 1) {
		vdata["CORPID"] = list[0].corpid; //客户id
		vdata["CORPNO"] = list[0].corpno; //客户编号
		vdata["CORPDESC"] = list[0].corpdesc; //客户名称
		vdata["CORPZIPCODE"] = list[0].corpzipcode; //公司邮政编码
		vdata["CORPPOSTCODE"] = list[0].corppostcode; //公司邮政编码
		vdata["CORPLOCATION"] = list[0].corplocation; //公司地址
		vdata["CORPPHONE"] = list[0].corpphone; //电话
		vdata["TAXPAYERID"] = list[0].taxpayerid; //税号
		vdata["REPRESENTATIVE"] = list[0].representative; //法定人
		vdata["SALESMANCODE"] = list[0].salesmancode; //销售编码
		vdata["SALESMANDESC"] = list[0].salesmandesc; //销售名称
		vdata["AGENTCODE"] = list[0].agentcode; //代理编码
		vdata["AGENTDESC"] = list[0].agentdesc; //代理名称
		vdata["AGENTBROKERAGE"] = list[0].agentbrokerage; //代理佣金点
		vdata["TEL"] = list[0].tel; //电话
		vdata["DISCOUNT"] = list[0].discount; //折扣
		vdata["ISDISCOUNT"] = list[0].isdiscount; //是否锁定折扣
		vdata["INVOICEFORMAT"] = list[0].invoiceformat; //PKM区域
		vdata["CORPTYPE"] = list[0].corptype; //客户类别
		vdata["DEPARTMENTCODE"] = list[0].departmentcode; //部门编码
		vdata["DEPARTMENTDESC"] = list[0].departmentdesc; //归属部门
		vdata["PAYCONDITION"] = list[0].paycondition; //付款方式
		vdata["DESC95FLAG"] = list[0].desc95flag; //特定用户默认税率
		props.condobj.objlist = vdata; //传参
		props.condobj.dialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	props.condobj.objlist = null;//清空数据
	selectEnterpriseInfos.value.getTableList();
});
const customer_customertype = getdropSownSelection("customer_customertype");
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "id",
		label: "id",
		prop: "corpid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "客户编号",
		label: "columnappointment_desc13",
		prop: "corpno",
		type: "Input",
		width: "140"
	},
	{
		title: "旧客户号",
		label: "fieldcolumncustomercodeold",
		prop: "corpnoold",
		type: "Input",
		width: "140"
	},
	{
		title: "委托单位名称",
		label: "columnappointment_desc15",
		prop: "corpdesc",
		type: "Input",
		width: "200"
	},
	{
		title: "英文名称",
		label: "hotlinkpanelywmctitle",
		prop: "corpenglishname",
		type: "Input",
		width: "160"
	},
	{
		title: "客户类别",
		label: "corpinfopanelkhlbtitle",
		prop: "corptype",
		type: "Select",
		width: "140",
		typeData: customer_customertype
	},
	{
		title: "折扣",
		label: "columnappointmentdiscount",
		prop: "discount",
		type: "Input",
		width: "80"
	},
	{
		title: "邮编",
		label: "columnappointment_desc16",
		prop: "corppostcode",
		type: "Input",
		width: "140"
	},
	{
		title: "委托单位地址",
		label: "columnappointment_desc17",
		prop: "corplocation",
		type: "Input",
		width: "200"
	},
	{
		title: "联系电话",
		label: "columnappointment_desc18",
		prop: "corpphone",
		type: "Input",
		width: "160"
	},
	{
		title: "分公司",
		label: "corpinfoSubordinateToBranchtitle",
		prop: "branchcorpdesc",
		type: "Input",
		width: "200"
	},
	{
		title: "归属部门",
		label: "corpinfopaneldepartmentdesctitle",
		prop: "departmentdesc",
		type: "Input",
		width: "140"
	},
	{
		title: "付款方式",
		label: "",
		prop: "paycondition",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "默认税率修改标识",
		label: "",
		prop: "desc95flag",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "部门",
		label: "",
		prop: "departmentcode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "invoiceformat",
		label: "",
		prop: "invoiceformat",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "是否协议客户",
		label: "",
		prop: "isdiscount",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "SE电话",
		label: "",
		prop: "tel",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "代理佣金点",
		label: "",
		prop: "agentbrokerage",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "销售代理名称",
		label: "",
		prop: "agentdesc",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "销售代理编码",
		label: "",
		prop: "agentcode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "SE描述",
		label: "",
		prop: "salesmandesc",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "SE编码",
		label: "",
		prop: "salesmancode",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "委托单位法人",
		label: "",
		prop: "representative",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "委托单位组织机构代码",
		label: "",
		prop: "taxpayerid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "邮编",
		label: "",
		prop: "corpzipcode",
		type: "Input",
		width: "60",
		isHide: true
	}
];

//表格对象
const tableList = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_enterprise.vue_selectEnterpriseInfos",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfosInQuoted.action",
		root: "enterpriseInfos",
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
