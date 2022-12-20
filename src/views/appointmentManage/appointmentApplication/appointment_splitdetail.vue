<template>
	<div class="all-height flex-column" style="margin-left: -10px; margin-right: -10px">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="报价拆分" :label="$t('menubaseQuotationsplit')" :name="0">
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
							<el-form-item :label="$t('columnappointmentdescription') + ':'" title1="情况说明">
								<el-input type="textarea" v-model="formData.desc39" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('panelcolumnsampleRemarks') + ':'" title1="样品备注">
								<el-input type="textarea" v-model="formData.desc93" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane title1="检测项预览" :label="$t('itemtitletestItemPreview')" class="all-height flex-column" :name="1">
				<el-auto-resizer v-if="tabPaneXR.get(1)">
					<template #default="{ height, width }">
						<div class="appointmentSplitdetail-card" style="height: 40px; line-height: 40px">
							<div class="flex-row" style="font-size: var(--zy-title-font-size)">
								<div class="flex-1"></div>
								<div class="flex-row">
									<div class="flex-row">
										<div title1="外币价格">
											{{ $t("columnappointmentCurrencyTotalPrice") + ": " }}
											<span style="margin-left: 15px; font-weight: bold; color: #f56c6c">{{ formData.desc34 }}</span>
										</div>
									</div>
									<div class="flex-row flx-center" style="margin-left: 100px">
										<div title1="拆分计算总价">
											{{ $t("menubaseSplitTotalPrice") + ": "
											}}<span style="margin-left: 15px; font-weight: bold; color: #f56c6c">{{ formData.splitprice }}</span>
										</div>
									</div>
								</div>
								<div class="flex-1"></div>
							</div>
						</div>
						<div class="flex-row" :style="{ height: height - 42 + `px`, width: width + `px` }">
							<div :style="{ width: width - 260 + `px` }">
								<div class="flex-row" :style="{ height: height - 242 + `px`, width: width - 268 + `px` }">
									<div class="appointmentSplitdetail-card" style="max-width: 25%; flex: 0 0 25%">
										<zTable ref="zTable1" :tableList="tableList1" @selectionChange="zTable1SelectionChange"
											><template #tableHeaderLleft="scope">
												<el-button
													style="margin-left: 10px"
													size="small"
													type="primary"
													icon="DocumentCopy"
													plain
													:disabled="zTable1IsSelected === true || zTable4IsSelected === true ? false : true"
													@click="split_handler"
													>{{ $t("menu_split") }}</el-button
												>
											</template></zTable
										>
									</div>
									<div class="appointmentSplitdetail-card" style="max-width: 50%; flex: 0 0 50%">
										<zTable ref="zTable2" :tableList="tableList2" @selectionChange="zTable2SelectionChange">
											<template #tableHeaderLleft="scope">
												<el-button
													style="margin-left: 10px"
													size="small"
													type="primary"
													icon="Lock"
													plain
													:disabled="zTable2IsSelected === true ? false : true"
													@click="lock_handler"
													>{{ $t("menu_lock") }}</el-button
												>
												<el-button
													size="small"
													type="danger"
													icon="Delete"
													plain
													:disabled="zTable2IsSelected === true || zTable5IsSelected === true ? false : true"
													@click="delete_handler1"
													>{{ $t("menu_delete") }}</el-button
												>
											</template></zTable
										>
									</div>
									<div class="appointmentSplitdetail-card" style="max-width: 25%; flex: 0 0 25%">
										<zTable ref="zTable3" :tableList="tableList3" @selectionChange="zTable3SelectionChange">
											<template #tableHeaderLleft="scope">
												<el-button
													style="margin-left: 10px"
													size="small"
													type="danger"
													icon="Delete"
													plain
													:disabled="zTable3IsSelected === true || zTable6IsSelected === true ? false : true"
													@click="delete_handler2"
													>{{ $t("menu_delete") }}</el-button
												>
											</template></zTable
										>
									</div>
								</div>
								<div class="flex-row" style="height: 200px" :style="{ width: width - 268 + `px` }">
									<div class="appointmentSplitdetail-card" style="max-width: 25%; flex: 0 0 25%; margin-top: -11px">
										<zTable ref="zTable4" :tableList="tableList4" @selectionChange="zTable4SelectionChange"></zTable>
									</div>
									<div class="appointmentSplitdetail-card" style="max-width: 50%; flex: 0 0 50%; margin-top: -11px">
										<zTable ref="zTable5" :tableList="tableList5" @selectionChange="zTable5SelectionChange"></zTable>
									</div>
									<div class="appointmentSplitdetail-card" style="max-width: 25%; flex: 0 0 25%; margin-top: -11px">
										<zTable ref="zTable6" :tableList="tableList6" @selectionChange="zTable6SelectionChange"></zTable>
									</div>
								</div>
							</div>
							<div class="appointmentSplitdetail-card" style="width: 260px">
								<zTable ref="zTable7" :tableList="tableList7">
									<template #tableHeaderLleft="scope">
										<el-button
											style="margin-left: 10px"
											size="small"
											type="success"
											icon="Check"
											plain
											:disabled="zTable7IsSelected === true && splitpriceIsSelected === true ? false : true"
											@click="submit_handler(scope.selectList)"
											>{{ $t("menu_submit") }}</el-button
										>
									</template></zTable
								>
							</div>
						</div>
					</template>
				</el-auto-resizer>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const i18n = useI18n();
const ruleFormRef = ref();
const zTable1IsSelected = ref(false);
const zTable2IsSelected = ref(false);
const zTable3IsSelected = ref(false);
const zTable4IsSelected = ref(false);
const zTable5IsSelected = ref(false);
const zTable6IsSelected = ref(false);
const zTable7IsSelected = ref(false);
const splitpriceIsSelected = ref(false);

//表单字段
const formData = reactive({
	reservnum: props.condobj.reservnum,
	desc34: 0,
	splitprice: 0
});

const whetherAr = [
	{ value: "Y", label: i18n.t("crmcolumnwsp1") },
	{ value: "N", label: i18n.t("crmcolumnwsp0") }
]; //是否
let paydeadline = getdropSownSelection("dgbj_paydeadline"); //付款方式下拉
let costtypeData = getdropSownSelection("CRM_qtfy_fylx"); //费用类型

//判断是否是数字,是就返回true
const isNumber = val => {
	return !isNaN(parseFloat(val)) && isFinite(val);
};

//根据 reservnum 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/mylims/order/appointment!selectAppointmentInfoById.action",
		qs.stringify({ "cond.reservnum": formData.reservnum })
	);
	dataSourceProcessing(res);
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.appointmentInfo[0]) {
		formData[key] = data.appointmentInfo[0][key];
	}
};

const zTable1 = ref();
const tableList1 = reactive({
	//面初始化渲染完成 是否调请求
	isRequest: true,
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		right: false //显示右全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentTestItemView.action",
		root: "vmaps",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "测试名称",
			label: "columnappointmenttesthistorytestdesc",
			prop: "TESTDESC",
			type: "Input",
			width: "100"
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "COUNT",
			type: "Number",
			width: "60"
		},
		{
			title: "测试标准",
			label: "testiteminfoteststandardpanel",
			prop: "TESTSTANDARD",
			type: "Input",
			width: "100"
		},
		{
			title: "单价",
			label: "testiteminfoUnitPricepanel_hkd",
			prop: "TESTPRICE",
			type: "Number",
			width: "80"
		},
		{
			title: "外币单价",
			label: "columnappointmentCurrencyUnitPrice",
			prop: "TESTPRICE_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "折后单价(外币)",
			label: "columnappointmentDiscountCurrencyPrice",
			prop: "AFTER_TESTPRICE_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "价格百分比",
			label: "i18ncrmcontractdiscount",
			prop: "DISCOUNT",
			type: "Number",
			width: "80"
		},
		{
			title: "折扣率(%)",
			label: "columnappointmentdiscount",
			prop: "DISCOUNTRATE",
			type: "Number",
			width: "80"
		},
		{
			title: "测试计划费用",
			label: "columnappointmenttesthistoryrasprofileprices_hkd",
			prop: "RASPROFILEPRICES",
			type: "Number",
			width: "80"
		},
		{
			title: "测试计划费用(外币)",
			label: "columnappointmenttesthistoryrasprofileprices",
			prop: "RASPROFILEPRICES_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "测试ID",
			label: "",
			prop: "TESTID",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "母单号",
			label: "",
			prop: "SEPARABLECODE",
			type: "Input",
			width: "300",
			isHide: true
		},
		{
			title: "流水码",
			label: "columnappointmenttesthistoryserialno",
			prop: "SERIALNO",
			type: "id",
			width: "120",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable2 = ref();
const tableList2 = reactive({
	isPaging: false, //是否显示分页
	edit: true, //当前表格是否可编辑
	//表格工具栏
	tableToolbar: {
		right: false //显示右全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "",
		root: "",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "测试名称",
			label: "columnappointmenttesthistorytestdesc",
			prop: "TESTDESC",
			type: "Input",
			width: "100"
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "COUNT",
			type: "Number",
			width: "60"
		},
		{
			title: "锁定数量",
			label: "columnappointmentsplitlockNumber",
			prop: "SPLITCOUNT",
			type: "Number",
			width: "100",
			precision: 0,
			min: 1,
			edit: true
		},
		{
			title: "测试标准",
			label: "testiteminfoteststandardpanel",
			prop: "TESTSTANDARD",
			type: "Input",
			width: "100"
		},
		{
			title: "单价",
			label: "testiteminfoUnitPricepanel_hkd",
			prop: "TESTPRICE",
			type: "Number",
			width: "80"
		},
		{
			title: "外币单价",
			label: "columnappointmentCurrencyUnitPrice",
			prop: "TESTPRICE_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "折后单价(外币)",
			label: "columnappointmentDiscountCurrencyPrice",
			prop: "AFTER_TESTPRICE_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "价格百分比",
			label: "i18ncrmcontractdiscount",
			prop: "DISCOUNT",
			type: "Number",
			width: "80"
		},
		{
			title: "折扣率(%)",
			label: "columnappointmentdiscount",
			prop: "DISCOUNTRATE",
			type: "Number",
			width: "80"
		},
		{
			title: "测试计划费用",
			label: "columnappointmenttesthistoryrasprofileprices_hkd",
			prop: "RASPROFILEPRICES",
			type: "Number",
			width: "80"
		},
		{
			title: "测试计划费用(外币)",
			label: "columnappointmenttesthistoryrasprofileprices",
			prop: "RASPROFILEPRICES_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "测试ID",
			label: "",
			prop: "TESTID",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "母单号",
			label: "",
			prop: "SEPARABLECODE",
			type: "Input",
			width: "300",
			isHide: true
		},
		{
			title: "流水码",
			label: "columnappointmenttesthistoryserialno",
			prop: "SERIALNO",
			type: "id",
			width: "120",
			isHide: true
		},
		{
			title: "可拆分",
			label: "menubaseSeparable",
			prop: "PACKMARK",
			type: "Input",
			width: "100",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable3 = ref();
const tableList3 = reactive({
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		right: false //显示右全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "",
		root: "",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "拆分批次号",
			label: "columnappointmentsplitsplitBatchNumber",
			prop: "TIMEBATCH",
			type: "Input",
			width: "100"
		},
		{
			title: "测试名称",
			label: "columnappointmenttesthistorytestdesc",
			prop: "TESTDESC",
			type: "Input",
			width: "100"
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "COUNT",
			type: "Number",
			width: "60"
		},
		{
			title: "测试标准",
			label: "testiteminfoteststandardpanel",
			prop: "TESTSTANDARD",
			type: "Input",
			width: "100"
		},
		{
			title: "单价",
			label: "testiteminfoUnitPricepanel_hkd",
			prop: "TESTPRICE",
			type: "Number",
			width: "80"
		},
		{
			title: "外币单价",
			label: "columnappointmentCurrencyUnitPrice",
			prop: "TESTPRICE_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "折后单价(外币)",
			label: "columnappointmentDiscountCurrencyPrice",
			prop: "AFTER_TESTPRICE_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "价格百分比",
			label: "i18ncrmcontractdiscount",
			prop: "DISCOUNT",
			type: "Number",
			width: "80"
		},
		{
			title: "折扣率(%)",
			label: "columnappointmentdiscount",
			prop: "DISCOUNTRATE",
			type: "Number",
			width: "80"
		},
		{
			title: "测试计划费用",
			label: "columnappointmenttesthistoryrasprofileprices_hkd",
			prop: "RASPROFILEPRICES",
			type: "Number",
			width: "80"
		},
		{
			title: "测试计划费用(外币)",
			label: "columnappointmenttesthistoryrasprofileprices",
			prop: "RASPROFILEPRICES_FOREIGN",
			type: "Number",
			width: "80"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "测试ID",
			label: "",
			prop: "TESTID",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "母单号",
			label: "",
			prop: "SEPARABLECODE",
			type: "Input",
			width: "300",
			isHide: true
		},
		{
			title: "流水码",
			label: "columnappointmenttesthistoryserialno",
			prop: "SERIALNO",
			type: "id",
			width: "120",
			isHide: true
		},
		{
			title: "可拆分",
			label: "menubaseSeparable",
			prop: "PACKMARK",
			type: "Input",
			width: "100",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable4 = ref();
const tableList4 = reactive({
	//面初始化渲染完成 是否调请求
	isRequest: true,
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		whole: false //不显示全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentOtherCosts.action",
		root: "vmaps",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "费用类型",
			label: "columnappointmentothercostCRM_qtfy_fylx",
			prop: "COSTTYPE",
			type: "Select",
			typeData: costtypeData,
			width: "100"
		},
		{
			title: "外币金额",
			label: "columnappointmentothercostcostprice",
			prop: "COSTPRICE_FN",
			type: "Number",
			width: "60"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYNAME",
			type: "Input",
			width: "60"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "EXCHANGERATE",
			type: "Number",
			width: "60"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "COSTPRICE",
			type: "Number",
			width: "60"
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "流水号",
			label: "",
			prop: "SERIALNO",
			type: "id",
			width: "60",
			isHide: true
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
			title: "RESERVNUM",
			label: "",
			prop: "RESERVNUM",
			type: "Input",
			width: "100",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable5 = ref();
const tableList5 = reactive({
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		whole: false //不显示全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "",
		root: "",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "费用类型",
			label: "columnappointmentothercostCRM_qtfy_fylx",
			prop: "COSTTYPE",
			type: "Select",
			typeData: costtypeData,
			width: "100"
		},
		{
			title: "外币金额",
			label: "columnappointmentothercostcostprice",
			prop: "COSTPRICE_FN",
			type: "Number",
			width: "60"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYNAME",
			type: "Input",
			width: "60"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "EXCHANGERATE",
			type: "Number",
			width: "60"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "COSTPRICE",
			type: "Number",
			width: "60"
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "流水号",
			label: "",
			prop: "SERIALNO",
			type: "id",
			width: "60",
			isHide: true
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
			title: "RESERVNUM",
			label: "",
			prop: "RESERVNUM",
			type: "Input",
			width: "100",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable6 = ref();
const tableList6 = reactive({
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		whole: false //不显示全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "",
		root: "",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "拆分批次号",
			label: "columnappointmentsplitsplitBatchNumber",
			prop: "TIMEBATCH",
			type: "Input",
			width: "100"
		},
		{
			title: "费用类型",
			label: "columnappointmentothercostCRM_qtfy_fylx",
			prop: "COSTTYPE",
			type: "Select",
			typeData: costtypeData,
			width: "100"
		},
		{
			title: "外币金额",
			label: "columnappointmentothercostcostprice",
			prop: "COSTPRICE_FN",
			type: "Number",
			width: "60"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYNAME",
			type: "Input",
			width: "60"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "EXCHANGERATE",
			type: "Number",
			width: "60"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "COSTPRICE",
			type: "Number",
			width: "60"
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "REMARK",
			type: "Input"
		},
		{
			title: "流水号",
			label: "",
			prop: "SERIALNO",
			type: "id",
			width: "60",
			isHide: true
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
			title: "RESERVNUM",
			label: "",
			prop: "RESERVNUM",
			type: "Input",
			width: "100",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable7 = ref();
const tableList7 = reactive({
	edit: true,
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		right: false //显示右全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "",
		root: "",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			title: "拆分批次号",
			label: "columnappointmentsplitsplitBatchNumber",
			prop: "TIMEBATCH",
			type: "id",
			width: "100"
		},
		{
			title: "外币价格",
			label: "columnappointmentCurrencyTotalPrice",
			prop: "DESC34",
			type: "Number",
			width: "100",
			precision: 2,
			min: 0,
			edit: true
		},
		{
			title: "序号",
			label: "itemtitleloginreservnum",
			prop: "ordernumber",
			type: "Number",
			width: "60"
		}
	],
	// 表格数据
	tableData: []
});

//选择行数据的事件
const zTable1SelectionChange = rowArr => {
	rowArr.length === 0 ? (zTable1IsSelected.value = false) : (zTable1IsSelected.value = true);
};
const zTable2SelectionChange = rowArr => {
	rowArr.length === 0 ? (zTable2IsSelected.value = false) : (zTable2IsSelected.value = true);
};
const zTable3SelectionChange = rowArr => {
	rowArr.length === 0 ? (zTable3IsSelected.value = false) : (zTable3IsSelected.value = true);
};
const zTable4SelectionChange = rowArr => {
	rowArr.length === 0 ? (zTable4IsSelected.value = false) : (zTable4IsSelected.value = true);
};
const zTable5SelectionChange = rowArr => {
	rowArr.length === 0 ? (zTable5IsSelected.value = false) : (zTable5IsSelected.value = true);
};
const zTable6SelectionChange = rowArr => {
	rowArr.length === 0 ? (zTable6IsSelected.value = false) : (zTable6IsSelected.value = true);
};

//删除表格某一行数据，公用方法
const removeTableRowData = (tableData, row, key) => {
	tableData.map((zTable1Row, zTable1Index) => {
		if (zTable1Row[key] == row[key]) {
			tableData.splice(zTable1Index, 1); //删除
		}
	});
};

//生成批次号
const createBatchNo = () => {
	let dataNow = new Date();
	let hours = dataNow.getHours(); //时
	let minute = dataNow.getMinutes(); //分
	let seconds = dataNow.getSeconds(); //秒
	let mSeconds = dataNow.getMilliseconds(); //毫秒
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return hours.toString() + minute.toString() + seconds.toString() + mSeconds.toString();
};
//唯一id
const getUUID = () => {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);

	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
};

//创建行对象
const createNewRowObj = row => {
	let rowObj = {};
	for (let key in row) {
		rowObj[key] = row[key];
	}
	return rowObj;
};
// 两个表格的keyId元素值比对，相同时，keyVal1元素值加val，返回true 和 false；
const addQuantity = (tableData, row, keyId, keyVal1, val) => {
	let isexist = false;
	for (let zTableRow of tableData) {
		//存在就数量相加
		if (zTableRow[keyId] == row[keyId]) {
			zTableRow[keyVal1] = Number(zTableRow[keyVal1]) + Number(val);
			isexist = true;
		}
	}
	return isexist;
};

//zTable1 拆分
const split_handler = () => {
	//数量小于一的不能拆分
	// for (let row19 of zTable1.value.selectList) {
	// 	if (row19.COUNT < 1) {
	// 		//return;
	// 	}
	// }

	// zTable2表已经存在 TESTID，不能再次把相同的TESTID 拆分到 zTable2
	for (let row10 of tableList2.tableData) {
		for (let row11 of zTable1.value.selectList) {
			if (row10.TESTID == row11.TESTID) {
				ElMessage.warning(i18n.t("testitemInfotestpanel"));
				return;
			}
		}
	}

	//选中的测试项目id相同不能添加到同一批次
	for (let row12 of zTable1.value.selectList) {
		let accumulation = 0;
		for (let row13 of zTable1.value.selectList) {
			if (row12.TESTID == row13.TESTID) {
				accumulation = accumulation + 1;
			}
			if (accumulation > 1) {
				ElMessage.warning(i18n.t("testitemInfotestpanel"));
				return;
			}
		}
	}

	zTable1.value.selectList.map(row => {
		let obj1 = createNewRowObj(row);
		obj1["SPLITCOUNT"] = row["COUNT"];
		zTable2.value.addRowData(obj1);
		removeTableRowData(tableList1.tableData, row, "SERIALNO");
	});
	zTable4.value.selectList.map(row => {
		let obj4 = createNewRowObj(row);
		zTable5.value.addRowData(obj4);
		removeTableRowData(tableList4.tableData, row, "SERIALNO");
	});
	zTable1.value.getTablerefs().value.clearSelection();
	zTable4.value.getTablerefs().value.clearSelection();
};

//锁定
const lock_handler = async () => {
	//选中的测试项目id相同不能添加到同一批次
	for (let row1 of zTable2.value.selectRowArr) {
		let accumulation = 0;
		for (let row2 of zTable2.value.selectRowArr) {
			if (row1.TESTID == row2.TESTID) {
				accumulation = accumulation + 1;
			}
			if (accumulation > 1) {
				ElMessage.warning(i18n.t("testitemInfotestpanel"));
				return;
			}
		}
	}

	let TIMEBATCH = createBatchNo(); //批次号
	let testMap = [];
	let otherMap = [];
	//zTable2锁定操作
	for (let row3 of zTable2.value.selectRowArr) {
		//插入zTable3
		let zTable3RowData = createNewRowObj(row3);
		zTable3RowData.TIMEBATCH = TIMEBATCH;
		zTable3RowData.COUNT = row3.SPLITCOUNT;
		zTable3RowData.id = getUUID();
		zTable3.value.addRowData(zTable3RowData);

		//zTable1表操作
		//数量 大于 锁定数量： COUNT - SPLITCOUNT； 反之直接 0。
		let provisionalFigures1 = Number(row3.COUNT) - Number(row3.SPLITCOUNT) > 0 ? Number(row3.COUNT) - Number(row3.SPLITCOUNT) : 0;
		//判断 zTable1 存在就相加，不存在就直接插入
		let isexist = addQuantity(tableList1.tableData, row3, "SERIALNO", "COUNT", provisionalFigures1);
		//不存在直接插入
		if (!isexist && provisionalFigures1 > 0) {
			let zTable1RowData = createNewRowObj(row3);
			zTable1RowData.COUNT = provisionalFigures1;
			zTable1.value.addRowData(zTable1RowData);
		}

		//zTable2 删除选择数据
		removeTableRowData(tableList2.tableData, row3, "SERIALNO");

		//请求后台接口的参数
		let testMapObj = {};
		testMapObj.reservnum = formData.reservnum;
		testMapObj.timebatch = TIMEBATCH;
		testMapObj.count = row3.SPLITCOUNT;
		testMapObj.testprice_foreign = row3.TESTPRICE_FOREIGN;
		testMapObj.after_testprice_foreign = row3.AFTER_TESTPRICE_FOREIGN;
		testMapObj.rasprofileprices_foreign = row3.RASPROFILEPRICES_FOREIGN;
		testMapObj.discountrate = row3.DISCOUNTRATE;
		testMap.push(testMapObj);
	}
	//zTable5其他费用锁定操作操作
	for (let row4 of zTable5.value.selectList) {
		//插入zTable6
		let zTable6RowData = createNewRowObj(row4);
		zTable6RowData.TIMEBATCH = TIMEBATCH;
		zTable6.value.addRowData(zTable6RowData);
		//zTable5 删除选择数据
		removeTableRowData(tableList5.tableData, row4, "SERIALNO");

		//请求后台接口的参数
		let otherMapObj = {};
		otherMapObj.reservnum = formData.reservnum;
		otherMapObj.timebatch = TIMEBATCH;
		otherMapObj.costprice_fn = row4.COSTPRICE_FN;
		otherMap.push(otherMapObj);
	}

	zTable2.value.getTablerefs().value.clearSelection();
	zTable5.value.getTablerefs().value.clearSelection();

	const res = await http.post(
		"/mylims/order/appointment!calculateTotalamount.action",
		qs.stringify({ jsonString: JSON.stringify({ maps: testMap, vmaps: otherMap }) })
	);

	if (res) {
		let zTable7RowData = {};
		zTable7RowData.TIMEBATCH = res.reservnum;
		zTable7RowData.DESC34 = Number(res.minmoney);
		zTable7RowData.ordernumber = tableList7.tableData.length + 1;
		zTable7.value.addRowData(zTable7RowData);
	}
};

//zTable2 删除
const delete_handler1 = () => {
	zTable2.value.selectRowArr.map(row => {
		let isexist = addQuantity(tableList1.tableData, row, "SERIALNO", "COUNT", row.COUNT);
		//不存在直接插入
		if (!isexist) {
			let obj2 = createNewRowObj(row);
			zTable1.value.addRowData(obj2);
		}
		removeTableRowData(tableList2.tableData, row, "SERIALNO");
	});
	zTable5.value.selectList.map(row => {
		let obj5 = createNewRowObj(row);
		zTable4.value.addRowData(obj5);
		removeTableRowData(tableList5.tableData, row, "SERIALNO");
	});

	zTable2.value.getTablerefs().value.clearSelection();
	zTable5.value.getTablerefs().value.clearSelection();
};
//zTable3 删除
const delete_handler2 = async () => {
	let testMap = [];
	let otherMap = [];
	let zTable3Length = zTable3.value.selectList.length;
	let zTable6Length = zTable6.value.selectList.length;

	//不相同的批次号不能一起删除
	for (let i = 1; i < zTable3Length; i++) {
		if (zTable3.value.selectList[0].TIMEBATCH != zTable3.value.selectList[i].TIMEBATCH) {
			ElMessage.warning(i18n.t("message_appointmentSqlitsamedata"));
			return;
		}
	}
	for (let i = 1; i < zTable6Length; i++) {
		if (zTable6.value.selectList[0].TIMEBATCH != zTable6.value.selectList[i].TIMEBATCH) {
			ElMessage.warning(i18n.t("message_appointmentSqlitsamedata"));
			return;
		}
	}

	for (let row5 of zTable3.value.selectList) {
		let isexist = addQuantity(tableList1.tableData, row5, "SERIALNO", "COUNT", row5.COUNT);
		//不存在直接插入
		if (!isexist) {
			let obj6 = createNewRowObj(row5);
			zTable1.value.addRowData(obj6);
		}

		tableList3.tableData.map((zTable3Row, zTable3Index) => {
			if (zTable3Row["TIMEBATCH"] == row5["TIMEBATCH"] && zTable3Row["SERIALNO"] == row5["SERIALNO"]) {
				tableList3.tableData.splice(zTable3Index, 1); //删除
			}
		});

		//请求后台接口的参数
		let testMapObj = {};
		testMapObj.reservnum = formData.reservnum;
		testMapObj.timebatch = row5.TIMEBATCH;
		testMapObj.count = row5.COUNT;
		testMapObj.testprice_foreign = row5.TESTPRICE_FOREIGN;
		testMapObj.after_testprice_foreign = row5.AFTER_TESTPRICE_FOREIGN;
		testMapObj.rasprofileprices_foreign = row5.RASPROFILEPRICES_FOREIGN;
		testMapObj.discountrate = row5.DISCOUNTRATE;
		testMap.push(testMapObj);
	}

	for (let row6 of zTable6.value.selectList) {
		let obj7 = createNewRowObj(row6);
		zTable4.value.addRowData(obj7);
		removeTableRowData(tableList6.tableData, row6, "TIMEBATCH");

		//请求后台接口的参数
		let otherMapObj = {};
		otherMapObj.reservnum = formData.reservnum;
		otherMapObj.timebatch = row6.TIMEBATCH;
		otherMapObj.costprice_fn = row6.COSTPRICE_FN;
		otherMap.push(otherMapObj);
	}

	zTable3.value.getTablerefs().value.clearSelection();
	zTable6.value.getTablerefs().value.clearSelection();

	if (testMap.length == zTable3Length && otherMap.length == zTable6Length) {
		const res = await http.post(
			"/mylims/order/appointment!calculateTotalamount.action",
			qs.stringify({ jsonString: JSON.stringify({ maps: testMap, vmaps: otherMap }) })
		);
		if (res) {
			let tableData7 = tableList7.tableData;
			let arrlength7 = tableList7.tableData.length;
			for (let i7 = 0; i7 < arrlength7; i7++) {
				tableData7[i7].ordernumber = i7 + 1;

				if (tableData7[i7].TIMEBATCH == res.reservnum && Number(tableData7[i7].DESC34) == Number(res.minmoney)) {
					//是否还有相同的批次号存在zTable3,存在就重新把剩下的加总，重新赋值给  tableData7[i7].DESC34
					let testMap15 = [];
					let otherMap15 = [];
					for (let row20 of tableList3.tableData) {
						if (row20.TIMEBATCH == tableData7[i7].TIMEBATCH) {
							//请求后台接口的参数
							let testMapObj15 = {};
							testMapObj15.reservnum = formData.reservnum;
							testMapObj15.timebatch = row20.TIMEBATCH;
							testMapObj15.count = row20.COUNT;
							testMapObj15.testprice_foreign = row20.TESTPRICE_FOREIGN;
							testMapObj15.after_testprice_foreign = row20.AFTER_TESTPRICE_FOREIGN;
							testMapObj15.rasprofileprices_foreign = row20.RASPROFILEPRICES_FOREIGN;
							testMapObj15.discountrate = row20.DISCOUNTRATE;
							testMap15.push(testMapObj15);
						}
					}
					for (let row21 of tableList6.tableData) {
						if (row21.TIMEBATCH == tableData7[i7].TIMEBATCH) {
							//请求后台接口的参数
							let otherMapObj15 = {};
							otherMapObj15.reservnum = formData.reservnum;
							otherMapObj15.timebatch = row21.TIMEBATCH;
							otherMapObj15.costprice_fn = row21.COSTPRICE_FN;
							otherMap15.push(otherMapObj15);
						}
					}
					if (testMap15.length > 0) {
						const res = await http.post(
							"/mylims/order/appointment!calculateTotalamount.action",
							qs.stringify({ jsonString: JSON.stringify({ maps: testMap15, vmaps: otherMap15 }) })
						);
						if (res) {
							tableData7[i7].DESC34 = Number(res.minmoney);
						}
					} else {
						removeTableRowData(tableData7, tableData7[i7], "TIMEBATCH");
						arrlength7--;
						i7--;
					}
				} else if (
					tableData7[i7].TIMEBATCH == res.reservnum &&
					Number(Number(tableData7[i7].DESC34) - Number(res.minmoney)).toFixed(2) > 0
				) {
					//同一批次号  当前的价格减去删除的价格， 重新赋值给  tableData7[i7].DESC34
					tableData7[i7].DESC34 = Number(Number(tableData7[i7].DESC34) - Number(res.minmoney)).toFixed(2);
				} else if (
					tableData7[i7].TIMEBATCH == res.reservnum &&
					Number(Number(tableData7[i7].DESC34) - Number(res.minmoney)).toFixed(2) < 0
				) {
					//同一批次号 把剩下的加总，重新赋值给  tableData7[i7].DESC34
					let testMap14 = [];
					let otherMap14 = [];
					for (let row14 of tableList3.tableData) {
						if (row14.TIMEBATCH == tableData7[i7].TIMEBATCH) {
							//请求后台接口的参数
							let testMapObj14 = {};
							testMapObj14.reservnum = formData.reservnum;
							testMapObj14.timebatch = row14.TIMEBATCH;
							testMapObj14.count = row14.COUNT;
							testMapObj14.testprice_foreign = row14.TESTPRICE_FOREIGN;
							testMapObj14.after_testprice_foreign = row14.AFTER_TESTPRICE_FOREIGN;
							testMapObj14.rasprofileprices_foreign = row14.RASPROFILEPRICES_FOREIGN;
							testMapObj14.discountrate = row14.DISCOUNTRATE;
							testMap14.push(testMapObj14);
						}
					}
					for (let row15 of tableList6.tableData) {
						if (row15.TIMEBATCH == tableData7[i7].TIMEBATCH) {
							//请求后台接口的参数
							let otherMapObj14 = {};
							otherMapObj14.reservnum = formData.reservnum;
							otherMapObj14.timebatch = row15.TIMEBATCH;
							otherMapObj14.costprice_fn = row15.COSTPRICE_FN;
							otherMap14.push(otherMapObj14);
						}
					}
					if (testMap14.length > 0) {
						const res = await http.post(
							"/mylims/order/appointment!calculateTotalamount.action",
							qs.stringify({ jsonString: JSON.stringify({ maps: testMap14, vmaps: otherMap14 }) })
						);
						if (res) {
							tableData7[i7].DESC34 = Number(res.minmoney);
						}
					}
				}
			}

			//1、zTable3表为空时，zTable6,zTable7表也要空； 2、zTable3表不存在的的批次号 也要 在 zTable6,zTable7 删除
			if (tableList3.tableData.length == 0) {
				tableList7.tableData.length = 0;

				for (let row16 of tableList6.tableData) {
					let obj8 = createNewRowObj(row16);
					zTable4.value.addRowData(obj8);
					removeTableRowData(tableList6.tableData, row16, "SERIALNO");
				}
			} else {
				for (let row8 of tableData7) {
					let isTH = false;
					for (let row9 of tableList3.tableData) {
						if (row8.TIMEBATCH == row9.TIMEBATCH) {
							isTH = true;
							break;
						}
					}
					if (!isTH) {
						removeTableRowData(tableData7, row8, "TIMEBATCH");
					}
				}

				for (let row17 of tableList6.tableData) {
					let isTH = false;
					for (let row18 of tableList3.tableData) {
						if (row17.TIMEBATCH == row18.TIMEBATCH) {
							isTH = true;
							break;
						}
					}
					if (!isTH) {
						removeTableRowData(tableList6.tableData, row17, "TIMEBATCH");
					}
				}
			}
		}
	}
};

//提交
const submit_handler = () => {
	//外币总价 不等于 拆分总价 不能提交
	if (parseFloat(formData.desc34).toFixed(2) != parseFloat(formData.splitprice).toFixed(2)) {
		ElMessage({
			message: i18n.t("columnappointmentmessage_appointmentSqlitequaltotalmoney"),
			type: "warning",
			duration: 5000
		});
		return;
	}

	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({
				cond: {
					reservnum: formData.reservnum
				},
				maps: tableList3.tableData,
				vmaps: tableList6.tableData,
				vmaps_: tableList7.tableData
			})
		};
		const res = await http.post("/mylims/order/appointment!updateSplitAppointment.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.success = true;
			props.condobj.dialogShow = false;
		}
	});
};

//监听 修改锁定数量变化,
watch(tableList2.tableData, tableData2 => {
	if (tableList2.tableData.length > 0) {
		for (let row2 of tableList2.tableData) {
			//不是数字类型就进入
			if (!isNumber(row2.SPLITCOUNT)) {
				//延迟50毫秒执行
				setTimeout(() => {
					row2.SPLITCOUNT = 1; // 给一个最小值
				}, 50);
			}
			//SPLITCOUNT不能大于 COUNT
			if (row2.SPLITCOUNT > row2.COUNT) {
				//延迟50毫秒执行
				setTimeout(() => {
					row2.SPLITCOUNT = row2.COUNT;
				}, 50);
			}
		}
	}
});

//监听   外币总价变化,
watch(tableList7.tableData, tableData7 => {
	if (tableList7.tableData.length > 0) {
		let totalprice = 0;
		for (let row7 of tableList7.tableData) {
			//不是数字类型就进入
			if (!isNumber(row7.DESC34)) {
				//延迟50毫秒执行
				setTimeout(() => {
					row7.DESC34 = 0; // 给一个最小值
				}, 50);
			}
			totalprice = totalprice + parseFloat(row7.DESC34);
		}
		formData.splitprice = parseFloat(totalprice).toFixed(2);
		zTable7IsSelected.value = true;
	} else {
		formData.splitprice = 0;
		zTable7IsSelected.value = false;
	}
});

//监听   拆分计算总价变化,
watch(
	() => formData.splitprice,
	(newValue, oldValue) => {
		//外币总价 不等于拆分总价 不能提交
		if (parseFloat(formData.desc34).toFixed(2) == parseFloat(formData.splitprice).toFixed(2)) {
			splitpriceIsSelected.value = true;
		} else {
			splitpriceIsSelected.value = false;
		}
	},
	{ deep: true } //深度监听
);

const tableTabsValue = ref(0);
const tabPaneXR = new Map([[1, false]]);
//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.reservnum) {
		tableList1.httpAttribute.baseParams["reservnum"] = formData.reservnum;
		tableList1.httpAttribute.baseParams["exchangerate"] = formData.desc54; //汇率
		tableList4.httpAttribute.baseParams["reservnum"] = formData.reservnum;
		if (!tabPaneXR.get(TabPaneName)) {
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
