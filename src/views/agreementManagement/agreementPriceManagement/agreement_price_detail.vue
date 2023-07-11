<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="协议价格维护" :label="$t('menucontractagreementpriceapply')" class="all-height flex-column" :name="0">
				<div style="margin-top: 10px; margin-left: 20px; margin-bottom: 5px">
					<el-button v-show="menu_saveShow" size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
						{{ $t("menu_save") }}
					</el-button>
					<el-button
						v-show="menu_submitShow"
						size="small"
						type="success"
						icon="Check"
						plain
						:disabled="!formData.contractid"
						@click="Submit(ruleFormRef)"
					>
						{{ $t("menu_submit") }}
					</el-button>
					<el-button
						v-show="menu_approveShow"
						size="small"
						type="success"
						icon="Check"
						plain
						:disabled="!formData.contractid"
						@click="auditAction('/crm/contract/contract!approve.action', 'Approve !', formData)"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.contractid"
						@click="auditAction('/crm/contract/contract!reject.action', 'Reject !', formData)"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.contractid"
						@click="auditAction('/crm/contract/contract!reject2Submitor.action', 'Reject !', formData)"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<div style="overflow: auto">
					<el-form
						style="margin: 0px 15px"
						label-position="right"
						label-width="120px"
						:model="formData"
						:rules="rules"
						ref="ruleFormRef"
					>
						<el-divider title1="客户基本信息" content-position="left">{{
							$t("companyCustomerBasicInformationtitle")
						}}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')" prop="corpno">
									<el-input v-model="formData.corpno" readonly :disabled="formDisabledList.corpno"> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item title1="客户名称" :label="$t('panelcolumncustomername')" prop="corpdesc">
									<el-input v-model.trim="formData.corpdesc" readonly :disabled="formDisabledList.corpdesc">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.corpdesc" @click="selectCustomerBtn" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.corpdesc" @click="delCustomer" type="primary" icon="ZoomOut" />
											</el-button-group>
										</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="总体折扣" :label="$t('itemtitlebase_userisdiscount')" prop="isdiscount">
									<el-select
										v-model="formData.isdiscount"
										class="full-width-input"
										@change="isdiscountChange"
										:disabled="formDisabledList.isdiscount"
									>
										<el-option
											v-for="item in whetherAr"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item title1="折扣" :label="$t('columnappointmentdiscount')">
									<el-input-number
										v-model.number="formData.discounts"
										controls-position="right"
										style="width: 100%"
										:disabled="formDisabledList.discounts"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="币种" :label="$t('columnappointmentdesc53')" prop="currencyname">
									<el-select
										v-model="formData.currencyname"
										filterable
										class="full-width-input"
										@change="currencynameChange"
										:disabled="formDisabledList.currencyname"
									>
										<el-option v-for="item in corpcurrency" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="汇率" :label="$t('columnappointmentdesc54')">
									<el-input v-model.trim="formData.exchangerate" clearable disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="开始时间" :label="$t('itemtitlelog_messagebegintime')" prop="begintime">
									<el-date-picker
										v-model="formData.begintime"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.begintime"
										:disabled-date="begintimeDisabledDate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="结束时间" :label="$t('itemtitlelog_messageendtime')" prop="endtime">
									<el-date-picker
										v-model="formData.endtime"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.endtime"
										:disabled-date="endtimeDisabledDate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="部门名称" :label="$t('appointmentDepartment_name')">
									<el-input v-model.trim="formData.dept" clearable disabled></el-input>
								</el-form-item>
							</el-col>
							<!-- <el-col :span="6">
								<el-form-item title1="销售代理佣金点" :label="$t('itemtitlefoldersagentbrokerage')">
									<el-input v-model.trim="formData.detections" clearable disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="销售代理名称" :label="$t('corpinfopanelqydlsmctitle')">
									<el-input v-model.trim="formData.inspections" clearable disabled></el-input>
								</el-form-item>
							</el-col> -->
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="24">
								<el-form-item title1="备注" :label="$t('panelcolumnRemark')">
									<el-input type="textarea" v-model="formData.remark" :disabled="formDisabledList.remark"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="创建信息" content-position="left">{{ $t("columnCreateInformation") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
									<el-input v-model="formData.recordercode" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
									<el-input v-model="formData.recorderdesc" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
									<el-input v-model="formData.recordtime" disabled></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="检测项预览"
				:label="$t('itemtitletestItemPreview')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList1">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="CirclePlusFilled" plain @click="contractNewTestItemBtn">
							{{ $t("menu_newItem") }}
						</el-button>
						<el-button
							v-show="menu_saveShow"
							size="small"
							type="primary"
							icon="Document"
							plain
							:disabled="saveTestDisabled"
							@click="save_test_handler()"
						>
							{{ $t("menu_save") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="DeleteFilled"
							plain
							:disabled="!scope.isSelected"
							@click="del_test_handler(scope.selectList)"
							>{{ $t("menu_deleteItem") }}</el-button
						>
					</template>
					<template #Custom="scope">
						<el-input-number
							v-if="props?.condobj?.workflowflag == '1' && scope.row.editShow[scope.column]"
							controls-position="right"
							style="width: 100%"
							v-model="scope.row[scope.column]"
							:min="0"
							:precision="2"
						/>
						<span
							v-else
							:style="{
								color: scope?.row[scope.column] == scope.row['testprice_fn'] ? '#529b2e' : '#606266',
								fontWeight: scope?.row[scope.column] == scope.row['testprice_fn'] ? 'bold' : 'inherit'
							}"
						>
							{{ scope.row[scope.column] }}
						</span>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="附件信息"
				:label="$t('columnAccessoryInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2" @link-detailbg="downloadfiles">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="UploadFilled" plain @click="UploadFilled">
							{{ $t("menu_upload") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="DeleteFilled"
							plain
							:disabled="!scope.isSelected"
							@click="deleteUpload(scope.ids, scope.selectList)"
							>{{ $t("menu_deleteupload") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 选择客户 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="selectCustomerList.dialogShow"
				:title="$t('panelSelectcustomer')"
				width="75%"
				@close="selectCustomerClose"
			>
				<selectCustomer :condobj="selectCustomerList"></selectCustomer>
			</ZDialog>
		</div>
		<!-- 选择检测项目 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="contractNewTestItemList.dialogShow"
				:title="$t('panelcolumnselecttestitems')"
				width="75%"
				@close="contractNewTestItemClose"
			>
				<contractNewTestItem :condobj="contractNewTestItemList"></contractNewTestItem>
			</ZDialog>
		</div>
		<!-- 上传附件弹出 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="uploadAttachmentList.dialogShow"
				:title="$t('UPLOAD_uploadFile')"
				width="40%"
				customclass="selectAgentCss"
				@close="qualificationClose"
			>
				<uploadAttachment :condobj="uploadAttachmentList"></uploadAttachment>
			</ZDialog>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, h, watch } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import uploadAttachment from "/src/views/corp/uploadAttachment.vue";
import selectCustomer from "../monthlySettlementCustomer/selectCustomer.vue";
import contractNewTestItem from "./contract_newTestItem.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: {
		type: Object,
		default: {
			success: {
				type: Boolean,
				default: false
			},
			dialogShow: {
				type: Boolean,
				default: false
			},
			contractid: {
				type: String,
				default: ""
			},
			workflowflag: {
				type: String,
				default: "3"
			}
		}
	}
});

//表单字段
const formData = reactive({
	contractid: props?.condobj?.contractid,
	corpid: "",
	contactid: "",
	accountid: "",
	contracttype: "0",
	isdiscount: "0"
});

const rules = reactive({
	corpno: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	isdiscount: [{ required: true, message: i18n.t("rulesPropMessage") }],
	currencyname: [{ required: true, message: i18n.t("rulesPropMessage") }],
	begintime: [{ required: true, message: i18n.t("rulesPropMessage") }],
	endtime: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示
const menu_submitShow = ref(false); //提交按钮不显示
const menu_approveShow = ref(false); //审核通过按钮不显示
const menu_rejectShow = ref(false); //拒绝按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1" || props?.condobj?.workflowflag == "4") {
	menu_saveShow.value = true;
	menu_submitShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
	menu_approveShow.value = true;
	menu_rejectShow.value = true;
} else if (props?.condobj?.workflowflag == "3") {
}

const usersex = getdropSownSelection("usersex");
//是否
const whetherAr = getdropSownSelection("whether");
const dgbj_paydeadline = [];
getdropSownSelection("dgbj_paydeadline").forEach(item => {
	if (item.value == "30" || item.value == "60" || item.value == "90") {
		dgbj_paydeadline.push(item);
	}
});

//货币类型
let corpcurrency = reactive([]);
const selectCurrencyInfoByCond = async () => {
	const res = await http.post("/crm/currency/currency!selectCurrencyInfoByCond.action", qs.stringify({}));
	if (res?.currencyInfos) {
		let currencyInfos = res.currencyInfos;
		currencyInfos.forEach(item => {
			corpcurrency.push({ label: item.currencyname, value: item.currencyname, exchangerate: item.exchangerate });
		});
	}
};

const ruleFormRef = ref();

//选择客户信息弹出参数
const selectCustomerList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择客户信息弹出
const selectCustomerBtn = () => {
	selectCustomerList.dialogShow = true;
	selectCustomerList.arrayList = [];
};
//选择客户信息弹出  回调
const selectCustomerClose = () => {
	let arrayList = selectCustomerList.arrayList;
	if (arrayList.length > 0) {
		formData.corpdesc = arrayList[0].corpdesc; //客户名称
		formData.corpid = arrayList[0].corpid; //客户ID
		formData.corpno = arrayList[0].corpno; //客户号
		formData.businesslicenseno = arrayList[0].businesslicenseno; //工商注册号
	}
};
//清除选择的客户
const delCustomer = () => {
	formData.corpdesc = ""; //客户名称
	formData.corpid = ""; //客户ID
	formData.corpno = ""; //客户号
	formData.businesslicenseno = ""; //工商注册号
};

// 选择总体折扣变更事件
const isdiscountChange = val => {
	formDisabledList.discounts = val == "0" ? true : false;
	formData.discounts = null;
};
//选择币种变更事件
const currencynameChange = async val => {
	for (let item of corpcurrency) {
		if (item.value == val) {
			formData.exchangerate = item.exchangerate;
			break;
		}
	}
};

const begintimeDisabledDate = DateTime => {
	//如果有结束日期，那么开始日期要小于等于结束日期， 而且日期范围在一年内
	if (formData.endtime) {
		const timeRange = 1 * 24 * 60 * 60 * 1000; // 1天时间戳
		const minTime = new Date(formData.endtime).getTime() - timeRange * 365;
		return DateTime.getTime() > new Date(formData.endtime).getTime() || DateTime.getTime() < minTime;
	}
};

const endtimeDisabledDate = DateTime => {
	//如果有开始日期，那么结束日期要大于开始日期， 而且日期范围在一年内
	if (formData.begintime) {
		const timeRange = 1 * 24 * 60 * 60 * 1000; // 1天时间戳
		const maxTime = new Date(formData.begintime).getTime() + timeRange * 365;
		return DateTime.getTime() < new Date(formData.begintime).getTime() - timeRange || DateTime.getTime() > maxTime;
	}
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.contractInfo[0]) {
		if (props.condobj.workflowflag == "1" || props?.condobj?.workflowflag == "4") {
			formDisabledList[key] = false;
			if (key == "discounts" && data.contractInfo[0].isdiscount == "0") {
				formDisabledList[key] = true; //禁用
			}
			if (key == "corpdesc" && data.contractInfo[0].version != "1") {
				formDisabledList[key] = true; //禁用
			}
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.contractInfo[0][key];
	}
};
//根据 contractid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/contract/contract!selectContractInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				contractInfo: {
					contractid: formData.contractid
				}
			})
		})
	);
	if (res) {
		selectCurrencyInfoByCond();
		dataSourceProcessing(res);
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			if (formData.isdiscount == "1") {
				const res = await http.post(
					"/crm/contract/contract!deptcovertip.action",
					qs.stringify({ "cond.corpno": formData.corpno })
				);
				if (res?.msg && res?.msg == "isOkay") {
					saveData();
				} else {
					ElMessageBox.confirm(res?.msg, i18n.t("reminder"), {
						confirmButtonText: i18n.t("menu_ok"),
						cancelButtonText: i18n.t("menu_cancel"),
						type: "warning",
						draggable: true
					}).then(() => {
						saveData();
					});
				}
			} else {
				saveData();
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};
const saveData = async () => {
	if (props?.condobj?.workflowflag == "4") {
		try {
			const res = await http.post(
				"/crm/contract/contract!examineTime.action",
				qs.stringify({
					"cond.begintime": formData.begintime,
					"cond.endtime": formData.endtime,
					"cond.corpid": formData.corpid,
					"cond.contractid": formData.contractid
				})
			);
		} catch (error) {
			return;
		}
	}

	let jsonString = {
		contractInfo: formData
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/contract/contract!saveContractInfo.action", qs.stringify(params));
	if (res) {
		ElMessage.success(i18n.t("Message_saveSuccess"));
		if (res) {
			dataSourceProcessing(res);
		}
		props.condobj.success = true;
	}
};

//提交
const Submit = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			const res = await http.post(
				"/crm/contract/contract!examineTime.action",
				qs.stringify({
					"cond.begintime": formData.begintime,
					"cond.endtime": formData.endtime,
					"cond.corpid": formData.corpid,
					"cond.contractid": formData.contractid,
					"cond.dept": formData.dept
				})
			);
			if (res) {
				ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
					confirmButtonText: i18n.t("menu_ok"),
					cancelButtonText: i18n.t("menu_cancel"),
					type: "warning",
					draggable: true
				}).then(async () => {
					const res = await http.post(
						"/crm/contract/contract!submit.action",
						qs.stringify({ jsonString: JSON.stringify({ contractInfos: [formData] }) })
					);
					if (res) {
						ElMessage.success(i18n.t("Message_OperationSuccess"));
						props.condobj.success = true;
						props.condobj.dialogShow = false;
					}
				});
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//检测项目列表
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/agreementManagement/agreementPriceManagement/agreement_price_detail.vue_zTable1",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" || props?.condobj?.workflowflag == "4" ? true : false
	},
	edit: props?.condobj?.workflowflag == 1 || props?.condobj?.workflowflag == "4" ? true : false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/contract/contract!selectContractTest.action",
		root: "contracttestInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "测试名称",
			label: "columnappointmenttesthistorytestdesc",
			prop: "testdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "测试标准",
			label: "testiteminfoteststandardpanel",
			prop: "teststandard",
			type: "Input",
			width: "160"
		},
		{
			title: "单价",
			label: "testiteminfoUnitPricepanel_hkd",
			prop: "testprice",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "currencyname",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "exchangerate",
			type: "Input",
			width: "160"
		},
		{
			title: "单价(外币)",
			label: "testiteminfopricepanel",
			prop: "testprice_fn",
			type: "Input",
			width: "160"
		},
		{
			title: "协议价格(外币)",
			label: "itemtitlecontractcontractprice",
			prop: "price",
			type: "Custom",
			width: "160",
			edit: true
		},
		{
			title: "测试计划费用",
			label: "columnappointmenttesthistoryrasprofileprices_hkd",
			prop: "rasprofileprices",
			type: "Input",
			width: "160"
		},
		{
			title: "测试计划费用(外币)",
			label: "columnappointmenttesthistoryrasprofileprices",
			prop: "rasprofileprices_fn",
			type: "Number",
			precision: 2,
			width: "160",
			edit: true
		},
		{
			title: "NETPRICE",
			label: "",
			prop: "netprice",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "创建日期",
			label: "testiteminforecordtimepanel",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "id",
			label: "",
			prop: "ctid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "测试项目id",
			label: "",
			prop: "testid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "协议主键",
			label: "",
			prop: "contractid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpid",
			label: "",
			prop: "corpid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpcode",
			label: "",
			prop: "corpcode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpdesc",
			label: "",
			prop: "corpdesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "折扣率(%)",
			label: "columnappointmentdiscount",
			prop: "discount",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//选择项目弹出参数
const contractNewTestItemList = reactive({
	dialogShow: false,
	contractid: "",
	arrayList: []
});
//选择项目弹出
const contractNewTestItemBtn = () => {
	contractNewTestItemList.contractid = formData.contractid;
	contractNewTestItemList.arrayList = [];
	contractNewTestItemList.dialogShow = true;
};
//选择项目弹出  回调
const contractNewTestItemClose = async () => {
	let arrayList = contractNewTestItemList.arrayList;
	if (arrayList.length > 0) {
		let contracttestList = [];
		arrayList.forEach(item => {
			if (item.TESTFLAG == "1") {
				item.discount = 0;
				item.contractid = formData.contractid;
				item.testprice = item.PRICE;
				item.dept = item.CORPDESC;
				item.testid = item.TESTID;
				item.testcode = item.TESTCODE;
				item.testdesc = item.TESTDESC;
				item.price = item.PRICE;
				item.rasprofileprices = item.RASPROFILEPRICES;
				item.teststandard = item.TESTSTANDARD;
				item.remark = item.REMARK;
				contracttestList.push(item);
			}
		});
		if (contracttestList.length > 0) {
			const res = await http.post(
				"/crm/contract/contract!saveContractTest.action",
				qs.stringify({
					jsonString: JSON.stringify({ contracttestInfos: contracttestList })
				})
			);
			if (res) {
				zTable1.value.getTableList();
			}
		}
	}
};

const saveTestDisabled = ref(true);
//监听数据是否被编辑过
watch(
	() => tableList1.tableData,
	(newValue, oldValue) => {
		if (tableList1.tableData.length > 0 && zTable1.value.getEditSelectList().length > 0) {
			saveTestDisabled.value = false;
		} else {
			saveTestDisabled.value = true;
		}
	},
	{ deep: true } //深度监听
);
//保存检测项目
const save_test_handler = async () => {
	const res = await http.post(
		"/crm/contract/contract!saveContractTest.action",
		qs.stringify({
			jsonString: JSON.stringify({
				contracttestInfos: zTable1.value.getEditSelectList()
			})
		})
	);
	if (res) {
		zTable1.value.getTableList();
	}
};
//删除检测项目
const del_test_handler = rows => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/crm/contract/contract!deleteContractTest.action",
			qs.stringify({
				jsonString: JSON.stringify({
					contracttestInfos: rows
				})
			})
		);
		if (res) {
			zTable1.value.getTableList();
		}
	});
};

//附件
const zTable2 = ref();
const tableList2 = reactive({
	id: "/agreementManagement/agreementPriceManagement/agreement_price_detail.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" || props?.condobj?.workflowflag == "4" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: { "cond.businesscode": "Contract" }
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
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "文档大小",
			label: "companypanel3filesizetitle",
			prop: "filesize",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//上传附件参数
const uploadAttachmentList = reactive({
	uploadUrl: "",
	uploadParameter: {}, //参数
	dialogShow: false,
	success: false
});
//上传附件
const UploadFilled = () => {
	uploadAttachmentList.uploadUrl = "/core/uploadnew/upload!upload.action";
	uploadAttachmentList.uploadParameter = {
		jsonString: "{uploadFile:{businesscode:'Contract', businessobjectid:'" + formData.contractid + "'}}"
	};
	uploadAttachmentList.success = false;
	uploadAttachmentList.dialogShow = true;
};
// 上传附件成功后的回调
const qualificationClose = () => {
	if (uploadAttachmentList.success) {
		zTable2.value.getTableList();
	}
};
//下载附件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.fileid": row.fileid
	});
};

//删除附件
const deleteUpload = (ids, selectList) => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			uploadFileList: []
		};
		selectList.forEach(item => {
			jsonString.uploadFileList.push({
				fileid: item.fileid
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable2.value.getTableList();
		}
	});
};

//审核操作
const auditAction = (auditurl, opinion, row) => {
	let srtOpinion = ref(opinion);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: srtOpinion.value,
				type: "textarea",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					srtOpinion.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let jsonString = {
			contractInfos: [row]
		};
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.opinion": srtOpinion.value
		};
		const res = await http.post(auditurl, qs.stringify(params));

		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.success = true;
			props.condobj.dialogShow = false;
		}
	});
};

const tableTabsValue = ref(0);
const tabPaneXR = new Map([[1, false]]);
//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.contractid) {
		if (!tabPaneXR.get(TabPaneName)) {
			if (TabPaneName == 1) {
				tableList1.httpAttribute.baseParams["cond.contractid"] = formData.contractid;
			}
			if (TabPaneName == 2) {
				tableList2.httpAttribute.baseParams["cond.businessobjectid"] = formData.contractid;
			}
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.contractid) {
		getFormData();
	}
});
</script>
