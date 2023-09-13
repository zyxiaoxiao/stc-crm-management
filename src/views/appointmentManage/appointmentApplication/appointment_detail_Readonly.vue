<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="报价申请" :label="$t('menubasequotationapp')" :name="0">
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
					<el-divider title1="委托检验" content-position="left">{{ $t("columnappointment_EntrustedInspection") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumnreservnum') + ':'" title1="报价单号">
								<el-input type="text" v-model="formData.reservnum" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumnwsp') + ':'" title1="是否分包">
								<el-select v-model="formData.desc90" class="full-width-input" disabled>
									<el-option v-for="item in whetherAr" :key="item.value" :label="$t(item.label)" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc15') + ':'" title1="委托检测公司（个人）">
								<el-input type="text" v-model="formData.desc15" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnappointment_desc21') + ':'" title1="委托日期">
								<el-date-picker
									type="date"
									v-model="formData.desc21"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
									readonly
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('tabtitlecalendarreceiver') + ':'" title1="收件人">
								<el-input type="text" v-model="formData.desc79" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc81') + ':'" title1="SE姓名">
								<el-input type="text" v-model="formData.desc81" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelfaxtitle') + ':'" title1="传真">
								<el-input type="text" v-model="formData.desc78" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelfaxtitle') + ':'" title1="SE传真">
								<el-input type="text" v-model="formData.desc77" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelqyteltitle') + ':'" title1="电话">
								<el-input type="text" v-model="formData.desc18" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc82') + ':'" title1="SE电话">
								<el-input type="text" v-model="formData.desc82" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelemailtitle') + ':'" title1="电邮">
								<el-input type="text" v-model="formData.desc75" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelemailtitle') + ':'" title1="SE电邮">
								<el-input type="text" v-model="formData.desc74" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc83') + ':'" title1="抄送">
								<el-input type="text" v-model="formData.desc73" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc83') + ':'" title1="SE抄送">
								<el-input type="text" v-model="formData.desc83" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc84') + ':'" title1="参考值">
								<el-input type="text" v-model="formData.desc84" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelqydlsbmtitle') + ':'" title1="代理编码">
								<el-input type="text" v-model="formData.accountid" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopaneldlsmctitle') + ':'" title1="代理名称">
								<el-input type="text" v-model="formData.samplesender" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlefoldersagentbrokerage') + ':'" title1="销售代理佣金点%">
								<el-input type="text" v-model="formData.accounttype" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("paymentnoticepaymentunitpanel") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('paymentnoticepaymentunitname') + ':'" title1="付款单位名称">
								<el-input type="text" v-model="formData.enterprisename" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('paymentnoticepaymentunitcode') + ':'" title1="付款单位编码">
								<el-input type="text" v-model="formData.enterprisecode" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnappointmentdiscount') + ':'" title1="付款单位折扣">
								<el-input type="text" v-model="formData.desc80" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('i18ncrmcontractpaymentmethod') + ':'" title1="付款方式">
								<el-select v-model="formData.paytype" class="full-width-input" disabled>
									<el-option v-for="item in paydeadline" :key="item.value" :label="$t(item.label)" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnAddress') + ':'" title1="付款单位地址">
								<el-input type="text" v-model="formData.paymentaddress" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnContactPerson')" title1="付款单位联系人">
								<el-input type="text" v-model="formData.billingcontact" readonly> </el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("columnappointmentbuyerInformation") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('itemtitleworkflowdefcorpdesc') + ':'" title1="单位名称">
								<el-input type="text" v-model="formData.desc1" readonly> </el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('itemtitlebase_flowcorpcode') + ':'" title1="单位编码">
								<el-input type="text" v-model="formData.desc3" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnappointmentdiscount') + ':'" title1="单位折扣">
								<el-input type="text" v-model="formData.desc4" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('i18ncrmcontractpaymentmethod') + ':'" title1="付款方式">
								<el-select v-model="formData.desc5" class="full-width-input" disabled>
									<el-option v-for="item in paydeadline" :key="item.value" :label="$t(item.label)" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("columnReportinformation") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('itemtitlereportzh') + ':'" title1="报告中文抬头">
								<el-input type="text" v-model="formData.report_zh" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('itemtitlereportus') + ':'" title1="报告英文抬头">
								<el-input type="text" v-model="formData.report_us" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('itemtitlereportaddresszh') + ':'" title1="报告中文地址">
								<el-input type="text" v-model="formData.report_address_zh" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('itemtitlereportaddressus') + ':'" title1="报告英文地址">
								<el-input type="text" v-model="formData.report_address_us" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("columnappointment_desc42") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumnsampledesc') + ':'" title1="样品名称">
								<el-input type="textarea" v-model="formData.sampledesc" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnappointmentdescription') + ':'" title1="情况说明">
								<el-input type="textarea" v-model="formData.desc39" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('panelcolumnsampleRemarks') + ':'" title1="样品备注">
								<el-input type="textarea" v-model="formData.desc93" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane title1="检测项预览" :label="$t('itemtitletestItemPreview')" class="all-height flex-column" :name="1">
				<div v-if="tabPaneXR.get(1)" class="flex-column" style="overflow: auto">
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData">
						<el-divider content-position="left">{{ $t("columnappointmentspecialRequirements") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc46') + ':'" title1="服务类型">
									<el-select v-model="formData.desc48" class="full-width-input" disabled>
										<el-option v-for="item in serviceType" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc47') + ':'" title1="检测周期">
									<el-input v-model="formData.desc47" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc48') + ':'" title1="服务费">
									<el-input v-model="formData.desc48" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdiscount') + ':'" title1="折扣率">
									<el-input v-model="formData.discountrate" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc53') + ':'" title1="币种">
									<el-input v-model="formData.desc53" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc54') + ':'" title1="汇率">
									<el-input v-model="formData.desc54" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('panelcolumnvalueaddedtax') + ':'" title1="增值税(%)">
									<el-input v-model="formData.desc95" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentworkflowdiscount1') + ':'" title1="审批折扣率">
									<el-input v-model="formData.workflowdiscount" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData2">
						<el-divider title1="检测项费用信息" content-position="left">{{ $t("columnappointmenttestItemCostInfo") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="12">
								<el-form-item :label="$t('appointmentTotalprice_hkd') + ':'" title1="总价">
									<el-input v-model="formData2.SPLITDESC33" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item :label="$t('columnappointmentdesc52') + ':'" title1="外币总价">
									<el-input v-model="formData2.SPLITDESC34" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<el-divider></el-divider>
				<div v-if="tabPaneXR.get(1)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTableVmaps" :tableList="tableListVmaps" @cell-click="itemViewCellClick"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane title1="账户信息" :label="$t('menhuAccountInformation')" class="all-height flex-column" :name="2">
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2"> </zTable>
			</el-tab-pane>
			<el-tab-pane title1="其他费用" :label="$t('itemtitleotherCost')" class="all-height flex-column" :name="3">
				<zTable v-if="tabPaneXR.get(3)" ref="zTable3" :tableList="tableList3"> </zTable>
			</el-tab-pane>
			<el-tab-pane title1="分包信息" :label="$t('crmcolumnpacketInfo')" class="all-height flex-column" :name="4">
				<zTable v-if="tabPaneXR.get(4)" ref="zTable4" :tableList="tableList4" @link-detailbg="linkDetailbg"> </zTable>
			</el-tab-pane>
			<el-tab-pane title1="附件信息" :label="$t('columnAccessoryInformation')" class="all-height flex-column" :name="5">
				<zTable v-if="tabPaneXR.get(5)" ref="zTable5" :tableList="tableList5" @link-detailbg="downloadfiles"> </zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 查看报价单信息 -->
		<ZDialog v-model="appointmentdetailReadonlyList.dialogShow" title="" width="95%">
			<appointmentdetailReadonly :condobj="appointmentdetailReadonlyList"></appointmentdetailReadonly>
		</ZDialog>
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
import appointmentdetailReadonly from "./appointment_detail_Readonly.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const i18n = useI18n();
const ruleFormRef = ref();

//表单字段
const formData = reactive({
	reservnum: props.condobj.reservnum
});
//检测项费用
const formData2 = reactive({});

const whetherAr = [
	{ value: "Y", label: i18n.t("crmcolumnwsp1") },
	{ value: "N", label: i18n.t("crmcolumnwsp0") }
]; //是否
let paydeadline = getdropSownSelection("dgbj_paydeadline");
let serviceType = getdropSownSelection("serviceType");
const costtype = getdropSownSelection("CRM_qtfy_fylx");

//根据 reservnum 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/mylims/order/appointment!selectAppointmentInfoById.action",
		qs.stringify({ "cond.reservnum": formData.reservnum })
	);
	if (res) {
		for (let key in res.appointmentInfo[0]) {
			formData[key] = res.appointmentInfo[0][key];
		}
	}
};

//检测项预览检测项费用信息查询
const getFormTest = async () => {
	const res = await http.post(
		"/mylims/order/appointment!selectAppointmentTestInfo.action",
		qs.stringify({ reservnum: formData.reservnum })
	);
	if (res) {
		for (let key in res.maps[0]) {
			formData2[key] = res.maps[0][key];
		}
	}
};

//表格对象检测项
const zTableVmaps = ref();
const tableListVmaps = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_detail_Readonly.vue_zTableVmaps",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentTestItemView.action",
		root: "vmaps",
		baseParams: { reservnum: formData.reservnum }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "TESTID",
			type: "id",
			width: "60",
			isHide: true
	    },
		{
			title: "流水码",
			label: "columnappointmenttesthistoryserialno",
			prop: "SERIALNO",
			type: "Input",
			width: "120"
		},
		{
			title: "测试ID",
			label: "",
			prop: "TESTID",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "情况说明",
			label: "columnappointmentdescription",
			prop: "DESCRIPTION",
			type: "Input",
			width: "180"
		},
		{
			title: "是否混测",
			label: "columnappointmentblendtest",
			prop: "BLENDTEST",
			type: "Select",
			width: "140",
			typeData: whetherAr
		},
		{
			title: "测试名称",
			label: "columnappointmenttesthistorytestdesc",
			prop: "TESTDESC",
			type: "Input",
			width: "180"
		},
		{
			title: "测试标准",
			label: "testiteminfoteststandardpanel",
			prop: "TESTSTANDARD",
			type: "Input",
			width: "160"
		},
		{
			title: "单价",
			label: "testiteminfoUnitPricepanel_hkd",
			prop: "TESTPRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "外币单价",
			label: "testiteminfopricepanel",
			prop: "TESTPRICE_FOREIGN",
			type: "Input",
			width: "120"
		},
		{
			title: "折后单价",
			label: "testiteminfoafternetPricepanel_hkd",
			prop: "AFTER_TESTPRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "折后单价(外币)",
			label: "testiteminfoafternetPricepanel",
			prop: "AFTER_TESTPRICE_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "价格百分比",
			label: "i18ncrmcontractdiscount",
			prop: "DISCOUNT",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率(%)",
			label: "columnappointmentdiscount",
			prop: "DISCOUNTRATE",
			type: "Input",
			width: "140"
		},
		{
			title: "历史报价",
			label: "itemtitleappointmenthisprice",
			prop: "hismessage",
			type: "Input",
			width: "180"
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "COUNT",
			type: "Input",
			width: "120"
		},
		{
			title: "折前金额",
			label: "appointmentdiscount_hkd",
			prop: "BEFORE_PRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "折前金额(外币)",
			label: "panelbillinfoamountofmoneybefore",
			prop: "BEFORE_PRICE_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "折后金额",
			label: "appointmentDiscountedamount_hkd",
			prop: "AFTER_PRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "折后金额(外币)",
			label: "panelbillinfoamountofmoneyafter",
			prop: "AFTER_PRICE_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "测试计划费用",
			label: "columnappointmenttesthistoryrasprofileprices_hkd",
			prop: "RASPROFILEPRICES",
			type: "Input",
			width: "140"
		},
		{
			title: "测试计划费用(外币)",
			label: "columnappointmenttesthistoryrasprofileprices",
			prop: "RASPROFILEPRICES_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "是否修改协议价",
			label: "columnbaseModificationAgreementPrice",
			prop: "ismodify",
			type: "Select",
			width: "100",
			typeData: whetherAr
		},
		{
			title: "分包检测项",
			label: "crmcolumnwsp",
			prop: "FENBAO",
			type: "Select",
			width: "100",
			typeData: whetherAr
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "REMARK",
			type: "Input",
			width: "180"
		},
		{
			title: "创建时间",
			label: "testiteminforecordtimepanel",
			prop: "CREATEDATE",
			type: "Input",
			width: "140"
		},
		{
			title: "ITEMMARK",
			label: "ITEMMARK",
			prop: "TESTANOTHERNAME",
			type: "Input",
			width: "140"
		},
		{
			title: "NETPRICE",
			label: "NETPRICE",
			prop: "netprice",
			type: "Input",
			width: "140"
		},
		{
			title: "是否协议价",
			label: "是否协议价",
			prop: "iscontractprice",
			type: "Input",
			width: "140",
			isHide: true
		},
		{
			title: "类型",
			label: "类型",
			prop: "FLAG",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "测试项排序",
			label: "columnbaseTestSequencing",
			prop: "testsequencing",
			type: "Input",
			width: "120"
		},
		{
			title: "部门",
			label: "部门",
			prop: "DEPT",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "委托单号",
			label: "RESERVNUM",
			prop: "RESERVNUM",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "测试计划费用是否可修改",
			label: "canmodify",
			prop: "canmodify",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "协议折扣",
			label: "contractdiscount",
			prop: "contractdiscount",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "是否可编辑",
			label: "isedit",
			prop: "isedit",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "折后港币",
			label: "PRICE",
			prop: "PRICE",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格账户信息
const zTable2 = ref();
const tableList2 = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_detail_Readonly.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/appointmentaccount/appointmentaccount!selectAppointmentaccountInfoByCond.action",
		root: "appointmentaccountInfos",
		baseParams: { "cond.reservnum": formData.reservnum }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
	    },
		{
			title: "id",
			label: "id",
			prop: "id",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "户名",
			label: "crmcolumndesc86",
			prop: "accountdesc",
			type: "Input",
			width: "300"
		},
		{
			title: "开户行",
			label: "crmcolumndesc85",
			prop: "accountbank",
			type: "Input",
			width: "300"
		},
		{
			title: "账号",
			label: "crmcolumndesc87",
			prop: "accountcode",
			type: "Input",
			width: "350"
		},
		{
			title: "SWIFT",
			label: "companypanelswifttitle",
			prop: "swift",
			type: "Input",
			width: "200"
		},
		{
			title: "银行地址",
			label: "companypanelbankadresstitle",
			prop: "bankadress",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

//表格其它费用
const zTable3 = ref();
const tableList3 = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_detail_Readonly.vue_zTable3",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentOtherCosts.action",
		root: "vmaps",
		baseParams: { reservnum: formData.reservnum }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "SERIALNO",
			type: "id",
			width: "60",
			isHide: true
	    },
		{
			title: "SERIALNO",
			label: "SERIALNO",
			prop: "SERIALNO",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "费用类型",
			label: "columnappointmentothercostCRM_qtfy_fylx",
			prop: "COSTTYPE",
			type: "Select",
			width: "160",
			typeData: costtype
		},
		{
			title: "费用名称",
			label: "columnappointmentothercostcostname",
			prop: "COSTNAME",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "外币金额",
			label: "columnappointmentothercostcostprice",
			prop: "COSTPRICE_FN",
			type: "Number",
			width: "350"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYNAME",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "EXCHANGERATE",
			type: "Input",
			width: "160"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "COSTPRICE",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "retrieveflag",
			label: "retrieveflag",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "submitcorp",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "auditflag",
			label: "auditflag",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "RESERVNUM",
			label: "RESERVNUM",
			prop: "RESERVNUM",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格分包信息
const zTable4 = ref();
const tableList4 = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_detail_Readonly.vue_zTable4",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoByNumDis.action",
		root: "appointmentInfos",
		baseParams: { "cond.reservnum": formData.reservnum }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "SERIALNO",
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
			title: "报价部门",
			label: "crmcolumnqd",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc52",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordertime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "retrieveflag",
			label: "retrieveflag",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "submitcorp",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "auditflag",
			label: "auditflag",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

// 报价详细信息弹出参数;
const appointmentdetailReadonlyList = reactive({
	dialogShow: false,
	reservnum: ""
});
//分包链接详细信息
const linkDetailbg = (column, row) => {
	if (column == "reservnum" && row.reservnum) {
		appointmentdetailReadonlyList.reservnum = row.reservnum;
		appointmentdetailReadonlyList.dialogShow = true;
	}
};

//表格附件信息
const zTable5 = ref();
const tableList5 = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_detail_Readonly.vue_zTable5",
	//表格工具栏
	tableToolbar: {
		whole: false //隐藏全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: { "cond.businessobjectid": formData.reservnum }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "fileid",
			type: "id",
			width: "60",
			isHide: true
	    },
		{
			title: "fileid",
			label: "fileid",
			prop: "fileid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "附件名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "上传用户",
			label: "columnUploadUser",
			prop: "recorderdesc",
			type: "Input",
			width: "150"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "retrieveflag",
			label: "retrieveflag",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "submitcorp",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "auditflag",
			label: "auditflag",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//下载文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

const tableTabsValue = ref(0);
const tabPaneXR = new Map([[1, false]]);
//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.reservnum) {
		if (!tabPaneXR.get(TabPaneName)) {
			//检测项预览
			if (TabPaneName == 1) {
				getFormTest();
				tableListVmaps.httpAttribute.baseParams["exchangerate"] = formData.desc54;
			}
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.reservnum) {
		getFormData();
	}
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}

.el-container {
	width: 100%;
	height: 100%;
	.el-aside {
		overflow: inherit;
	}
	.el-header,
	.el-footer {
		padding: 0;
	}
	.el-main {
		box-sizing: border-box;
		padding: 0;
		/* 防止切换出现横向滚动条 */
		overflow-x: hidden;
	}
}
</style>
<style lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>
