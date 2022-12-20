<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="提佣申请" :label="$t('panelcolumnbrokerageapply')" name="infos">
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="cformData" ref="ruleFormRef">
					<el-divider title1="提佣申请" content-position="left">{{ $t("panelcolumnbrokerageapply") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('columnbasemonth') + ':'" title1="月份">
								<el-input type="text" v-model="cformData.brokeragemonth" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('appointmentTotalprice_hkd') + ':'" title1="申请单总金额">
								<el-input type="text" v-model="cformData.totalmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnwriteoff_application_listCost') + ':'" title1="成本费">
								<el-input type="text" v-model="cformData.costnum" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columndrawbackrefundmoney') + ':'" title1="退款">
								<el-input type="text" v-model="cformData.refundnum" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbaddebt') + ':'" title1="坏账金额">
								<el-input type="text" v-model="cformData.badmoney" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbasesalesexpenses_hkd') + ':'" title1="销售开支">
								<el-input type="text" v-model="cformData.salesexpenses" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('appointmentValueaddedtax_hkd') + ':'" title1="增值税">
								<el-input type="text" v-model="cformData.taxmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokeragebase') + ':'" title1="佣金基数">
								<el-input type="text" v-model="cformData.basemoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokerage_hkd') + ':'" title1="佣金">
								<el-input type="text" v-model="cformData.brokerage" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumntaskwell_hkd') + ':'" title1="任务额">
								<el-input type="text" v-model="cformData.taskmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnstandardbonus_hkd') + ':'" title1="达标奖">
								<el-input type="text" v-model="cformData.attainedbonus" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokerageandattained') + ':'" title1="佣金+达标奖">
								<el-input type="text" v-model="cformData.brokeragetotal" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item  title1="">					
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="cformData.remark" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>					
				</el-form>
                <el-divider></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTableCommission" :tableList="tableListCommission" @cell-click="itemViewCellClick"> </zTable>
				</div>                
			</el-tab-pane>
			<el-tab-pane title1="销售开支查询" :label="$t('titleExpenditureQuery')" class="all-height flex-column" name="query">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_expenditureInfos" :tableList="tableListExpenditure" @cell-click="itemViewCellClick"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane title1="内分包单查询" :label="$t('menuselectInternalSubcontractingOrderQuery')" class="all-height flex-column" name="unprocessed">
				<zTable ref="grid_outsourcingInfos" :tableList="tableListOutsourcing"> </zTable>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

let stype = getdropSownSelection("sales_type"); //开支类型下拉
//提佣申请初始化信息
const cformData = reactive({
	brokerageid: "",
	totalmoney: "",
	costnum: "",
	salesexpenses: "",
	refundnum: "",
	taxmoney: "",
	badmoney: "",
	remark: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	brokeragemonth: "",

	auditorcode: "",
	auditordesc: "",
	audittime: "",
	submitcorp: "",
	auditlevel: "",
	retrieveflag: "",
	retrievercode: "",
	retrieverdesc: "",
	retrievetime: "",
	recordercorp: "",
	auditlevelname: "",
	errormsg: "",
	submittime: "",
	workflowid: "",
	auditflag: "",
});

const tableTabsValue = ref("infos");

let getappointmentInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({brokerageInfo:obj})
	};
	const res = await http.post("/crm/brokerage/brokerage!selectBrokerageInfoById.action", qs.stringify(params));
	if (res) {
        console.log(res);
		for (let key in res.brokerageInfo[0]) {
			//判定 appointmentInfo 的key 是否存在 formData 的key
			cformData[key] = res.brokerageInfo[0][key];
		}
	}
};
//切换tab时触发
const tabChange = TabPaneName => {
	if (TabPaneName == "infos") {
		//提佣申请子页面
		zTableCommission.value.getTableList();
	} else if (TabPaneName == "query") {
		//销售开支查询子页面
		grid_expenditureInfos.value.getTableList();
	} else if (TabPaneName == "unprocessed") {
		//内分包单查询子页面
		grid_outsourcingInfos.value.getTableList();
	}
};

//页面跳转
const dialogShow = data => {
	if (data == "dialogShow_customerListQuery") {
		dialogShow_customerListQuery.value = true;
	}

};
onMounted(() => {
	//getValue();
	if (props.condobj) {
		let auditflag = props.condobj.cond.auditflag; //审核状态
		let brokerageid = props.condobj.cond.brokerageid; //提佣编号
		let readOnly = props.condobj.cond.readOnly; //只读
        if(brokerageid){
            getappointmentInfo({"brokerageid":brokerageid})
        }
    }
});

let v_brokerageid = "";
//表格销售提佣申请单
const zTableCommission = ref();
const tableListCommission = reactive({
	id: "/appointmentManage/attained/my_commission_detail.vue_zTableCommission",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/brokerage/brokerage!selectBrokeragefoldersInfoByCond.action",
		root: "brokeragefoldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "180"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "compname",
			type: "Input",
			width: "180"
		},
		{
			title: "代理商编码",
			label: "corpinfopanelqydlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "140"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentname",
			type: "Input",
			width: "160"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses_hkd",
			prop: "salesexpenses",
			type: "Input",
			width: "140"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "totalprice",
			type: "Input",
			width: "140"
		},
		{
			title: "提佣点(%)",
			label: "itemtitlefoldersbrokerage",
			prop: "brokerage",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "commission",
			type: "Input",
			width: "160"
		},
		{
			title: "销账单号",
			label: "columnwriteoff_application_listwriteoffNo",
			prop: "writeoffcode",
			type: "Input",
			width: "160"
		},
		{
			title: "未销账金额",
			label: "crmcolumnnotwriteoffmoney_hkd",
			prop: "canwriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "销账确认日期",
			label: "crmcolumnapplyacceptdateconfirms",
			prop: "logdate",
			type: "Input",
			width: "140"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
			width: "120"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Input",
			width: "160"
		},
		{
			title: "增值税额",
			label: "panelcolumnvalueaddedtaxmoney",
			prop: "taxmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "INVOICE DATE",
			label: "itemtitlecolumnINVOICE_DATE",
			prop: "invoicedate",
			type: "Input",
			width: "160"
		},
		{
			title: "账期",
			label: "itemtitlecolumnPaymentDays",
			prop: "paycondition",
			type: "Input",
			width: "160"
		},
		{
			title: "销账日期",
			label: "itemtitleWriteOffDate",
			prop: "audittime",
			type: "Input",
			width: "160"
		},
		{
			title: "AR天数",
			label: "itemtitlecolumnARDays",
			prop: "ardays",
			type: "Input",
			width: "160"
		},
		{
			title: "AR扣减佣金率",
			label: "itemtitleARCommissionDeductionRate",
			prop: "deductionrate",
			type: "Input",
			width: "160"
		},
		{
			title: "基础佣金率",
			label: "itemtitleBasicCommissionRate",
			prop: "folderage",
			type: "Input",
			width: "140"
		}
	],
	// 表格数据
	tableData: []
});

//表格销售开支
const grid_expenditureInfos = ref();
const tableListExpenditure = reactive({
	id: "/appointmentManage/attained/my_commission_detail.vue_grid_expenditureInfos",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoForBrokerage.action",
		root: "expenditureInfos",
		baseParams: {'cond.auditflag':'2'}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "主键",
			label: "i18ncrmcontractprimarykey",
			prop: "id",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "folderno",
			type: "Link",
			width: "180"
		},
		{
			title: "业务员名称",
			label: "columnexpendituresalesmandesc",
			prop: "salesmandesc",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "deptdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "amount",
			type: "Input",
			width: "140"
		},
		{
			title: "开支类型",
			label: "columnexpendituretype",
			prop: "expendituretype",
			type: "Select",
			width: "140",
			typeData: stype
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
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
			prop: "CREATEDATE",
			type: "Input",
			width: "140"
		},
		{
			title: "申请人编码",
			label: "columnApplicantcode",
			prop: "applicantcode",
			type: "Input",
			width: "140"
		},
		{
			title: "申请人名称",
			label: "columnApplicantdesc",
			prop: "applicantdesc",
			type: "Input",
			width: "160"
		},        
		{
			title: "申请日期",
			label: "i18ncrmcontractApplicationDate",
			prop: "applicanttime",
			type: "Input",
			width: "160"
		},        
		{
			title: "部门编码",
			label: "部门编码",
			prop: "deptcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "业务员编码",
			label: "业务员编码",
			prop: "salesmancode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "客户ID",
			label: "客户ID",
			prop: "corpid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "auditordesc",
			prop: "auditordesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "工作流ID",
			label: "工作流ID",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格销售开支
const grid_outsourcingInfos = ref();
const tableListOutsourcing = reactive({
	id: "/appointmentManage/attained/my_commission_detail.vue_grid_expenditureInfos",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectoutsourcingInfoByBrokerage.action",
		root: "expenditureInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "folderno",
			type: "Link",
			width: "180"
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "分包部门",
			label: "crmcolumnsubimtunit",
			prop: "submitcorp",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "corpno",
			type: "Input",
			width: "180"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "申请单总金额",
			label: "itemtitleinvoiceTotalAmountOfApplicationForm",
			prop: "amount",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "modifyercode",
			type: "Input",
			width: "160"
		},
        {
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "modifyerdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "接包部门",
			label: "columnbaseContractingDepartment",
			prop: "applicantcode",
			type: "Input",
			width: "140"
		},
		{
			title: "分包金额",
			label: "applicantdesc",
			prop: "columnbasefcpots",
			type: "Input",
			width: "160"
		},        
		{
			title: "分包金额（HKD）",
			label: "appointmentsubcontractingprice_hkd",
			prop: "auditorcode",
			type: "Input",
			width: "160"
		},
		{
			title: "分包百分比（%）",
			label: "columnbasePercentageOfSubcontractingt",
			prop: "auditordesc",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金（HKD）",
			label: "panelcolumnbrokerage_hkd",
			prop: "retrieverdesc",
			type: "Input",
			width: "160"
		},        
		{
			title: "分摊佣金（HKD）",
			label: "columnbaseApportionmentOfCommission",
			prop: "auditlevel",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});


</script>

<style lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>

