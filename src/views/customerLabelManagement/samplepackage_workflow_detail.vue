<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane
				title1="客户标签信息"
				:label="$t('menubasetabpanelpanelclientlabelinformation')"
				class="all-height flex-column"
				:name="0"
			>
				<div style="margin-top: 10px; margin-left: 20px; margin-bottom: 5px">
					<el-button size="small" type="primary" icon="Ticket" plain :disabled="!formData.spid" @click="barcodeLabelPrint">
						{{ $t("menu_printjbcodelabel") }}
					</el-button>
					<el-button size="small" type="primary" icon="CollectionTag" plain :disabled="!formData.spid" @click="batchAddressLabel">
						{{ $t("menu_havelabels") }}
					</el-button>
					<el-button v-show="menu_saveShow" size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
						{{ $t("menu_save") }}
					</el-button>
					<el-button
						v-show="menu_submitShow"
						size="small"
						type="success"
						icon="Check"
						plain
						:disabled="!formData.spid"
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
						:disabled="!formData.spid"
						@click="auditAction('/crm/samplepackage/samplepackage!approveSamplepackageInfo.action', 'Approve !', formData)"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.spid"
						@click="auditAction('/crm/samplepackage/samplepackage!reject.action', 'Reject !', formData)"
						>{{ $t("menu_reject") }}</el-button
					>
				</div>
				<div style="overflow: auto">
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
						<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="样品包裹号" :label="$t('columnsamplepackageInfopackagid')">
									<el-input v-model.trim="formData.packagid" readonly :disabled="formDisabledList.packagid"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="快递公司" :label="$t('columnsamplepackageInfodeliverycompany')">
									<el-select
										v-model="formData.deliverycompany"
										class="full-width-input"
										clearable
										filterable
										:disabled="formDisabledList.deliverycompany"
									>
										<el-option
											v-for="item in deliverycompanySelect"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="快递单号" :label="$t('columnsamplepackageInfobarcode')">
									<el-input clearable v-model="formData.barcode" :disabled="formDisabledList.barcode"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="快递签收人名称" :label="$t('columnsamplepackageInfousername')">
									<el-input clearable v-model.trim="formData.username" :disabled="formDisabledList.username"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="标签日期" :label="$t('columnsamplepackageInfolabledate')">
									<el-date-picker
										v-model="formData.labledate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										style="width: 100%"
										:disabled="formDisabledList.labledate"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="签收日期" :label="$t('columnsamplepackageInforeceivedate')">
									<el-date-picker
										v-model="formData.receivedate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										style="width: 100%"
										:disabled="formDisabledList.receivedate"
									/>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="通知业务员日期" :label="$t('columnsamplepackageInfonoticedate')">
									<el-date-picker
										v-model="formData.noticedate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										style="width: 100%"
										:disabled="formDisabledList.noticedate"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="领样人工号" :label="$t('columnsamplepackageInforeceivepersoncode')">
									<el-input
										clearable
										v-model.trim="formData.receivepersoncode"
										:disabled="formDisabledList.receivepersoncode"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="领样完成日期" :label="$t('columnsamplepackageInfotolabdate')">
									<el-date-picker
										v-model="formData.tolabdate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										style="width: 100%"
										:disabled="formDisabledList.tolabdate"
									/>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="客户信息" content-position="left">{{ $t("panelSelectcustomer") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
									<el-input readonly v-model="formData.customerno" :disabled="formDisabledList.customerno">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.customerno" @click="selectCustomer" icon="ZoomIn" />
												<el-button
													:disabled="formDisabledList.customerno"
													@click="delCustomer"
													type="primary"
													plain
													icon="ZoomOut"
												/>
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item title1="客户名称" :label="$t('panelcolumncustomername')">
									<el-input v-model.trim="formData.customername" readonly :disabled="formDisabledList.customername"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="联系人" :label="$t('columnContactPerson')">
									<el-input readonly v-model="formData.contactdesc" :disabled="formDisabledList.contactdesc">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.contactdesc" @click="selectContactBtn" icon="ZoomIn" />
												<el-button
													:disabled="formDisabledList.contactdesc"
													@click="delContact"
													type="primary"
													plain
													icon="ZoomOut"
												/>
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="联系人电话" :label="$t('i18ncrmcontractContactPhone')">
									<el-input v-model.trim="formData.phone" readonly :disabled="formDisabledList.phone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="地址类别" :label="$t('titlebaseAddresstype')">
									<el-select v-model="formData.addrtype" disabled placeholder=" " class="full-width-input">
										<el-option
											v-for="item in addresstypeAr"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="地址" :label="$t('columnAddress')">
									<el-input readonly v-model="formData.address" :disabled="formDisabledList.address">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.address" @click="selectAddress" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.address" @click="delAddress" type="primary" plain icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="备注信息" :label="$t('panelcolumnRemarkInformation')">
									<el-input
										type="textarea"
										v-model.trim="formData.customerremark"
										clearable
										:disabled="formDisabledList.customerremark"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="样品信息" content-position="left">{{ $t("columnSampleInformation") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="样品名称" :label="$t('crmcolumnsampledesc')">
									<el-input v-model.trim="formData.samplename" clearable :disabled="formDisabledList.samplename"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="样品代码" :label="$t('columnsamplepackageInfosamplecode')">
									<el-input v-model.trim="formData.samplecode" clearable :disabled="formDisabledList.samplecode"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="样品描述" :label="$t('columnsamplepackageInfosampledesc')">
									<el-input v-model.trim="formData.sampledesc" clearable :disabled="formDisabledList.sampledesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="备注信息" :label="$t('panelcolumnRemarkInformation')">
									<el-input
										type="textarea"
										v-model.trim="formData.sampleremark"
										clearable
										:disabled="formDisabledList.sampleremark"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="其他信息" content-position="left">{{ $t("columnotherinfo") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
									<el-select
										v-model="formData.location"
										@change="locationChange"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.location"
									>
										<el-option
											v-for="item in crm_kdfwqylx"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="部门" :label="$t('corpinfopaneldepartmentcodetitle')">
									<el-select
										v-model="formData.dept"
										@change="deptChange"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.dept"
									>
										<el-option
											v-for="item in deptOptionArray"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="分公司" :label="$t('itemtitlebase_userbranch')">
									<el-select v-model="formData.companycode" disabled placeholder=" " class="full-width-input">
										<el-option
											v-for="item in companycodeOptionArray"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="收件人" :label="$t('tabtitlecalendarreceiver')">
									<el-select
										v-model="formData.saledesc"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.saledesc"
									>
										<el-option
											v-for="item in saledescOptionArray"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="数量" :label="$t('tabletitlemdm_tasklistpromt_taskcount')">
									<el-input-number
										v-model.number="formData.amount"
										:min="1"
										:precision="0"
										controls-position="right"
										style="width: 100%"
										:disabled="formDisabledList.amount"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="附带申请表格" :label="$t('columnsamplepackageInfoyesorno')">
									<el-select
										v-model="formData.yesorno"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.yesorno"
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
							<el-col :span="24">
								<el-form-item title1="内容及备注信息" :label="$t('columnsamplepackageInforemark')">
									<el-input
										type="textarea"
										v-model.trim="formData.remark"
										clearable
										:disabled="formDisabledList.remark"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="创建信息" content-position="left">{{ $t("columnCreateInformation") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
									<el-input v-model="formData.recordercode" readonly :disabled="formDisabledList.recordercode"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
									<el-input v-model="formData.recorderdesc" readonly :disabled="formDisabledList.recorderdesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
									<el-input v-model="formData.recordtime" readonly :disabled="formDisabledList.recordtime"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="发件箱信息"
				:label="$t('menubasetabpanelpaneloutboxinformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newSenderInformation">{{
							$t("menu_new")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="dleSenderInformation(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="申请单信息"
				:label="$t('menubasetabpanelpanelfoldersinformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newApplicationForm">{{ $t("menu_new") }}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="dleApplicationForm(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="附件信息"
				:label="$t('columnAccessoryInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="3"
			>
				<zTable v-if="tabPaneXR.get(3)" ref="zTable3" :tableList="tableList3" @link-detailbg="downloadfiles">
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
		<ZDialog
			v-if="selectcorpcontactaddressinformationList.dialogShow"
			v-model="selectcorpcontactaddressinformationList.dialogShow"
			width="95%"
			@close="selectcorpcontactaddressinformationClose"
		>
			<selectcorpcontactaddressinformation
				:condobj="selectcorpcontactaddressinformationList"
			></selectcorpcontactaddressinformation>
		</ZDialog>

		<!-- 选择联系人 -->
		<ZDialog v-if="selectcontactList.dialogShow" v-model="selectcontactList.dialogShow" width="85%" @close="selectcontactClose">
			<selectcontact :condobj="selectcontactList"></selectcontact>
		</ZDialog>

		<!-- 选择地址 -->
		<ZDialog
			v-if="selectAddressbycorpandcontactList.dialogShow"
			v-model="selectAddressbycorpandcontactList.dialogShow"
			width="85%"
			@close="selectAddressbycorpandcontactClose"
		>
			<selectAddressbycorpandcontact :condobj="selectAddressbycorpandcontactList"></selectAddressbycorpandcontact>
		</ZDialog>

		<!-- 条码标签弹出层 -->
		<el-dialog
			v-if="barcodeLabelList.dialogShow"
			ref="barcodeLabelDialog"
			v-model="barcodeLabelList.dialogShow"
			width="500px"
			class="main-dialogHeight barcodeLabelClass"
			:fullscreen="false"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
		>
			<template #header="{ close }">
				<div class="main-dialog-header">
					<span>{{ $t("menu_clientlabel") }}</span>
					<div class="flx-align-center">
						<el-icon @click="close" class="main-dialog-icon">
							<CloseBold />
						</el-icon>
					</div>
				</div>
			</template>
			<barcodeLabel :condobj="barcodeLabelList" />
		</el-dialog>
		<!-- 地址 标签弹出层 -->
		<el-dialog
			v-if="addressLabelList.dialogShow"
			ref="addressLabelDialog"
			v-model="addressLabelList.dialogShow"
			width="500px"
			class="main-dialogHeight barcodeLabelClass"
			:fullscreen="false"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
		>
			<template #header="{ close }">
				<div class="main-dialog-header">
					<span>{{ $t("menu_clientlabel") }}</span>
					<div class="flx-align-center">
						<el-icon @click="close" class="main-dialog-icon">
							<CloseBold />
						</el-icon>
					</div>
				</div>
			</template>
			<addressLabel :condobj="addressLabelList" />
		</el-dialog>

		<!-- 新增 编辑 发件人信息 -->
		<ZDialog
			v-if="samplepackageoutboxworkflowdetailList.dialogShow"
			v-model="samplepackageoutboxworkflowdetailList.dialogShow"
			width="95%"
			@close="samplepackageoutboxworkflowdetailClose"
		>
			<samplepackageoutboxworkflowdetail :condobj="samplepackageoutboxworkflowdetailList"></samplepackageoutboxworkflowdetail>
		</ZDialog>

		<!-- 添加关联申请单 -->
		<ZDialog v-if="selectFordersList.dialogShow" v-model="selectFordersList.dialogShow" width="95%" @close="selectFordersClose">
			<selectForders :condobj="selectFordersList"></selectForders>
		</ZDialog>

		<!-- 上传附件弹出 -->
		<ZDialog
			v-if="uploadAttachmentList.dialogShow"
			v-model="uploadAttachmentList.dialogShow"
			:title="$t('UPLOAD_uploadFile')"
			width="40%"
			customclass="uploadAttachmentCss"
			@close="qualificationClose"
		>
			<uploadAttachment :condobj="uploadAttachmentList" />
		</ZDialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import selectcorpcontactaddressinformation from "./select_corp_contact_address_information.vue";
import selectcontact from "./selectcontact.vue";
import selectAddressbycorpandcontact from "./selectAddressbycorpandcontact.vue";
import samplepackageoutboxworkflowdetail from "./samplepackageoutbox_workflow_detail.vue";
import selectForders from "./selectForders.vue";
import uploadAttachment from "/src/views/corp/uploadAttachment.vue";
import barcodeLabel from "./barcodeLabel.vue";
import addressLabel from "./addressLabel.vue";

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
			spid: {
				type: String,
				default: ""
			},
			workflowflag: {
				type: String,
				default: "3"
			},
			errormsg: {
				type: String,
				default: "N"
			}
		}
	}
});

//表单字段
const formData = reactive({
	spid: props?.condobj?.spid,
	usercode: "",
	receivepersondesc: "",
	customerid: "",
	contactid: "",
	contactcode: "",
	companydesc: "",
	salecode: "",
	amount: 1,
	yesorno: "0"
});
const rules = reactive({});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示
const menu_submitShow = ref(false); //提交按钮不显示
const menu_approveShow = ref(false); //审核通过按钮不显示
const menu_rejectShow = ref(false); //拒绝按钮不显示

//根据erromsg 判断是否可编辑
const isErrormsg = async () => {
	//是否是CSD人创建的客户标签申请
	if (props?.condobj?.errormsg == "Y") {
		const res = await http.post("/crm/deliverys/deliverys!checkCurrentUserIsCSD.action", qs.stringify({}));

		//当前登录操作人是否是CSD人员 是CSD人员那么客户信息就可编辑
		if (res?.iscsd == "1") {
			menu_saveShow.value = true;
			formDisabledList.customerno = false;
			formDisabledList.customername = false;
			formDisabledList.contactdesc = false;
			formDisabledList.phone = false;
			formDisabledList.addrtype = false;
			formDisabledList.address = false;
			formDisabledList.customerremark = false;
		}
	}
};

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
	menu_submitShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
	menu_approveShow.value = true;
	menu_rejectShow.value = true;
} else if (props?.condobj?.workflowflag == "3") {
}

const addresstypeAr = getdropSownSelection("crm_addresstype");
const crm_kdfwqylx = getdropSownSelection("crm_kdfwqylx");
//是否
const whetherAr = getdropSownSelection("whether");

const ruleFormRef = ref();
//快递公司 下拉数据源
let deliverycompanySelect = reactive([]);
const otherstaticInfos = async () => {
	const res = await http.post("/crm/otherstatic/otherstatic!selectOtherstaticInfosByBranch.action", qs.stringify({}));
	if (res) {
		res.otherstaticInfos.forEach(item => {
			let obj = {};
			obj.label = item.staticcode;
			obj.value = item.staticcode;
			deliverycompanySelect.push(obj);
		});
	}
};
otherstaticInfos();
//部门 下拉数据源
let deptOptionArray = ref([]);
const areamanagementInfos = async val => {
	let params = { "cond.addrlevel": "-1" };
	if (val) {
		params = val;
	}
	const res = await http.post(
		"/crm/areamanagement/areamanagement!selectAreamanagementInfosForComboxSelected.action",
		qs.stringify(params)
	);
	if (res) {
		let arrayList = [];
		res.areamanagementInfos.forEach(item => {
			let obj = {};
			obj.label = item.addrdesc;
			obj.value = item.addrdesc;
			arrayList.push(obj);
		});
		deptOptionArray.value = arrayList;
	}
};

//分公司 下拉数据源
let companycodeOptionArray = reactive([]);
const corpInfoList = async () => {
	const res = await http.post("/core/corp/corp!selectCorpInfosForBranchcorpcode.action", qs.stringify({}));
	if (res) {
		res.corpInfoList.forEach(item => {
			let obj = {};
			obj.label = item.corpdesc;
			obj.value = item.corpcode;
			companycodeOptionArray.push(obj);
		});
	}
};
corpInfoList();

//收件人 下拉数据源
let saledescOptionArray = ref([]);
const userInfos = async val => {
	let params = { "cond.deptdesc": "-1", "cond.freezeflagCSD": "0" };
	if (val) {
		params = val;
	}
	const res = await http.post("/core/user/user!selectUserInfoBycorpcodeByAdd.action", qs.stringify(params));
	if (res) {
		let arrayList = [];
		res.userInfos.forEach(item => {
			let obj = {};
			obj.label = item.userdesc;
			obj.value = item.userdesc;
			arrayList.push(obj);
		});
		saledescOptionArray.value = arrayList;
	}
};

//选择客户信息弹出参数
const selectcorpcontactaddressinformationList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择客户信息弹出
const selectCustomer = () => {
	selectcorpcontactaddressinformationList.dialogShow = true;
	selectcorpcontactaddressinformationList.arrayList = [];
};
//选择客户信息弹出  回调
const selectcorpcontactaddressinformationClose = () => {
	let arrayList = selectcorpcontactaddressinformationList.arrayList;
	if (arrayList.length > 0) {
		formData.customername = arrayList[0].corpdesc ?? formData.customername; //客户名称
		formData.customerid = arrayList[0].corpid ?? formData.customerid; //客户ID
		formData.customerno = arrayList[0].corpno ?? formData.customerno; //客户号
		formData.contactid = arrayList[0].contactid ?? formData.contactid; //联系人ID
		formData.contactdesc = arrayList[0].contactdesc ?? formData.contactdesc; //联系人
		formData.phone = arrayList[0].tel ?? formData.phone; //电话
		formData.addrtype = arrayList[0].addrtype ?? formData.addrtype; //地址类型
		formData.address = arrayList[0].address ?? formData.address; //详细地址
	}
};
//清除选择的客户
const delCustomer = () => {
	formData.customername = ""; //客户名称
	formData.customerid = ""; //客户ID
	formData.customerno = ""; //客户号
	formData.contactid = ""; //联系人ID
	formData.contactdesc = ""; //联系人
	formData.phone = ""; //电话
	formData.addrtype = ""; //地址类型
	formData.address = ""; //详细地址
};

//选择联系人弹出参数
const selectcontactList = reactive({
	dialogShow: false,
	corpno: "",
	arrayList: []
});
//选择联系人弹出
const selectContactBtn = () => {
	if (!formData.customerno) {
		ElMessage.warning(i18n.t("Message_pleaseSelectClientInformationFirst"));
		return;
	}
	selectcontactList.corpno = formData.customerno;
	selectcontactList.arrayList = [];
	selectcontactList.dialogShow = true;
};
// 选择联系人弹出 回调
const selectcontactClose = () => {
	if (selectcontactList.arrayList.length > 0) {
		formData.contactid = selectcontactList.arrayList[0].contactid;
		formData.contactdesc = selectcontactList.arrayList[0].contactdesc;
		formData.phone = selectcontactList.arrayList[0].tel;
	}
};

//清除联系人
const delContact = () => {
	formData.contactid = "";
	formData.contactdesc = "";
	formData.phone = "";
	formData.addrtype = ""; //地址类型
	formData.address = ""; //详细地址
};

//地址弹出 参数
const selectAddressbycorpandcontactList = reactive({
	dialogShow: false,
	contactid: "",
	arrayList: []
});

//选择地址弹出
const selectAddress = () => {
	if (!formData.contactid) {
		ElMessage.warning(i18n.t("Message_pleaseSelectClientandcontacInformationtFirst"));
		return;
	}
	selectAddressbycorpandcontactList.contactid = formData.contactid;
	selectAddressbycorpandcontactList.arrayList = [];
	selectAddressbycorpandcontactList.dialogShow = true;
};
//选择地址 回调
const selectAddressbycorpandcontactClose = () => {
	if (selectAddressbycorpandcontactList.arrayList.length > 0) {
		formData.addrtype = selectAddressbycorpandcontactList.arrayList[0].addrtype; //地址类型
		formData.address = selectAddressbycorpandcontactList.arrayList[0].address; //详细地址
	}
};
//清除地址
const delAddress = () => {
	formData.addrtype = "";
	formData.address = "";
};

//选择区域，触发事件
const locationChange = val => {
	formData.dept = "";
	formData.companycode = "";
	formData.saledesc = "";
	deptOptionArray.value = [];
	saledescOptionArray.value = [];
	if (val) {
		let params = { "cond.parentcode": val, "cond.addrlevel": "02" };
		areamanagementInfos(params);
	}
};
//选择部门 触发事件
const deptChange = async val => {
	formData.companycode = "";
	formData.saledesc = "";
	saledescOptionArray.value = [];
	if (val) {
		let params = { "cond.deptdesc": val };
		userInfos(params);
		const res = await http.post("/core/corp/corp!selectCorpParentNameByCond.action", qs.stringify(params));
		if (res) {
			formData.companycode = res.vmap.CORPCODE;
		}
	}
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.samplepackageInfo[0]) {
		formData[key] = data.samplepackageInfo[0][key];
	}
	if (formData.location) {
		let params = { "cond.parentcode": formData.location, "cond.addrlevel": "02" };
		areamanagementInfos(params);
	}
	if (formData.dept) {
		let params = { "cond.deptdesc": formData.dept };
		userInfos(params);
	}
};
//根据 spid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/samplepackage/samplepackage!selectSamplepackageInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				samplepackageInfo: {
					spid: formData.spid
				}
			})
		})
	);
	if (res) {
		for (let key in res.samplepackageInfo[0]) {
			if (props.condobj.workflowflag == "1") {
				formDisabledList[key] = false;
			} else {
				formDisabledList[key] = true; //禁用
			}
		}

		//根据erromsg 判断是否可编辑
		await isErrormsg();
		dataSourceProcessing(res);
	}
};

//条码标签弹出 参数
const barcodeLabelList = reactive({
	dialogShow: false,
	arrayList: []
});
//打印条码标签
const barcodeLabelPrint = () => {
	barcodeLabelList.arrayList = [
		{
			dept: formData.dept, //部门
			packagid: formData.packagid, //条码编号
			customername: formData.customername, // 客户名称
			saledesc: formData.saledesc, //收件人名称
			customerno: formData.customerno, // 客户号
			labledate: formData.labledate //标签日期
		}
	];
	barcodeLabelList.dialogShow = true;
};

// 地址标签参数
const addressLabelList = reactive({
	dialogShow: false,
	corpdesc: "",
	contactdesc: "",
	tel: "",
	address: ""
});
// 打印地址标签
const batchAddressLabel = () => {
	addressLabelList.corpdesc = formData.customername;
	addressLabelList.contactdesc = formData.contactdesc;
	addressLabelList.tel = formData.phone;
	addressLabelList.address = formData.address;
	addressLabelList.dialogShow = true;
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/samplepackage/samplepackage!insertSamplepackageInfo.action";
			if (formData.spid) {
				srtUrl = "/crm/samplepackage/samplepackage!updateSamplepackageInfo.action";
			}
			let jsonString = {
				samplepackageInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				if (res) {
					dataSourceProcessing(res);
				}
				props.condobj.success = true;
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//提交
const Submit = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
				confirmButtonText: i18n.t("menu_ok"),
				cancelButtonText: i18n.t("menu_cancel"),
				type: "warning",
				draggable: true
			}).then(async () => {
				const res = await http.post(
					"/crm/samplepackage/samplepackage!submitSamplepackageInfos.action",
					qs.stringify({ "samplepackageInfo.spid": formData.spid, "cond.opinion": "", "cond.flag": "0" })
				);
				if (res) {
					ElMessage.success(i18n.t("Message_OperationSuccess"));
					props.condobj.success = true;
					props.condobj.dialogShow = false;
				}
			});
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//发件信息
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerLabelManagement/samplepackage_workflow_detail.vue_zTable1",
	tableToolbar: {
		whole: props?.condobj.workflowflag == "1" ? true : false
	},
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackageoutbox!selectSamplepackageoutboxInfosByCond.action",
		root: "samplepackageoutboxInfos",
		baseParams: {}
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
			prop: "spoutboxid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "与主表关联ID",
			label: "",
			prop: "spid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "快递公司",
			label: "columnsamplepackageInfodeliverycompany",
			prop: "express",
			type: "Link",
			width: "160"
		},
		{
			title: "快递单号",
			label: "columnsamplepackageInfobarcode",
			prop: "expresscode",
			type: "Input",
			width: "160"
		},
		{
			title: "发件日期",
			label: "columnsamplepackageoutboxInfosenddate",
			prop: "senddate",
			type: "Date",
			width: "160"
		},
		{
			title: "发件人编码",
			label: "itemnewsendercode",
			prop: "usercode",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "发件人名称",
			label: "itemnewsenderdesc",
			prop: "username",
			type: "Input",
			width: "160"
		},
		{
			title: "收件人编码",
			label: "columnsamplepackageoutboxInfotopersoncode",
			prop: "topersoncode",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "收件人名称",
			label: "itemnewsenderdesc",
			prop: "topersondesc",
			type: "Input",
			width: "160"
		},
		{
			title: "寄件地址",
			label: "columnsamplepackageoutboxInfodestination",
			prop: "destination",
			type: "Input",
			width: "160"
		},
		{
			title: "是否含样品",
			label: "columnsamplepackageoutboxInfohavesample",
			prop: "havesample",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "样品描述",
			label: "columnsamplepackageInfosampledesc",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "是否含报告",
			label: "columnsamplepackageoutboxInfohavereport",
			prop: "havereport",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "区域",
			label: "columnwriteoff_region",
			prop: "location",
			type: "Select",
			typeData: crm_kdfwqylx,
			width: "160"
		},
		{
			title: "创建人编码",
			label: "testiteminforecordercodepanel",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "testiteminforecordernamepanel",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建日期",
			label: "testiteminforecordtimepanel",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

// 编辑 发件人信息 弹出 参数
const samplepackageoutboxworkflowdetailList = reactive({
	dialogShow: false,
	success: false,
	spoutboxid: "",
	spid: "",
	workflowflag: props?.condobj?.workflowflag
});

// 新增发件人信息
const newSenderInformation = () => {
	samplepackageoutboxworkflowdetailList.spoutboxid = "";
	samplepackageoutboxworkflowdetailList.spid = formData.spid;
	samplepackageoutboxworkflowdetailList.success = false;
	samplepackageoutboxworkflowdetailList.dialogShow = true;
};

const linkDetailbg = (column, row) => {
	samplepackageoutboxworkflowdetailList.spoutboxid = row.spoutboxid;
	samplepackageoutboxworkflowdetailList.spid = formData.spid;
	samplepackageoutboxworkflowdetailList.success = false;
	samplepackageoutboxworkflowdetailList.dialogShow = true;
};
// 编辑发件人信息弹出 回调
const samplepackageoutboxworkflowdetailClose = () => {
	if (samplepackageoutboxworkflowdetailList.success) {
		zTable1.value.getTableList();
	}
};
//删除发件人信息
const dleSenderInformation = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			samplepackageoutboxInfos: []
		};
		ids.forEach(item => {
			jsonString.samplepackageoutboxInfos.push({
				spoutboxid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post(
			"/crm/samplepackage/samplepackageoutbox!deleteSamplepackageoutboxInfos.action",
			qs.stringify(params)
		);
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable1.value.getTableList();
		}
	});
};

//申请单查询
const zTable2 = ref();
const tableList2 = reactive({
	id: "/customerLabelManagement/samplepackage_workflow_detail.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	tableToolbar: {
		whole: props?.condobj.workflowflag == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackagefolders!selectSamplepackagefoldersInfosByCond.action",
		root: "samplepackagefoldersInfos",
		baseParams: { "cond.spid": formData.spid }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "申请单号",
			label: "columnReservnum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "外币总价",
			label: "columnappointmentCurrencyTotalPrice",
			prop: "currency",
			type: "Input",
			width: "160"
		},
		{
			title: "外币未销账金额",
			label: "columnbillcurrencycurrencybalance",
			prop: "currencywriteoffmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencyname",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "currencyrate",
			type: "Input",
			width: "160"
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "样品描述",
			label: "columnSampleInformation",
			prop: "sampleinformation",
			type: "Input",
			width: "160"
		},
		{
			title: "报告发送人",
			label: "folderitemtitlereportsendperson",
			prop: "reportsendperson",
			type: "Input",
			width: "160"
		},
		{
			title: "申请受理日期",
			label: "crmcolumnapplyacceptdate",
			prop: "logdate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "预计完成时间",
			label: "itemtitlefoldersduedate",
			prop: "duedate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "实际完成日期",
			label: "crmcolumnactualfinishdate",
			prop: "actualfinishdate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "报告发送时间",
			label: "folderitemtitlereportsendtime",
			prop: "reportsendtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "结案时间",
			label: "folderitemtitleclosedate",
			prop: "closedate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "主键",
			label: "",
			prop: "samplepackagefoldersid",
			type: "id",
			width: "160",
			isHide: true
		},
		{
			title: "主键关联ID",
			label: "",
			prop: "spid",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//关联申请单 弹出 参数
const selectFordersList = reactive({
	dialogShow: false,
	corpno: "",
	arrayList: []
});

//新增关联申请单;
const newApplicationForm = () => {
	selectFordersList.corpno = formData.customerno;
	selectFordersList.arrayList = [];
	selectFordersList.dialogShow = true;
};

//关联申请单回调
const selectFordersClose = async () => {
	if (selectFordersList.arrayList.length > 0) {
		let samplepackagefoldersInfos = [];
		selectFordersList.arrayList.forEach(item => {
			let obj = {};
			obj.spid = formData.spid;
			obj.folderno = item.folderno;
			obj.quotationno = item.quotationno;
			obj.rasclientid = item.rasclientid;
			obj.dept = item.dept;
			obj.currency = item.currencytotalprice;
			obj.currencywriteoffmoney = item.currencycanwriteoffsnum;
			obj.logdate = item.logdate;
			obj.duedate = item.duedate;
			obj.actualfinishdate = item.actualfinishdate;
			obj.sampleinformation = item.sampleinformation;
			obj.secode = item.secode;
			obj.sename = item.sename;
			obj.closedate = item.closedate;
			obj.reportsendtime = item.reportsendtime;
			obj.reportsendperson = item.reportsendperson;
			samplepackagefoldersInfos.push(obj);
		});

		const res = await http.post(
			"/crm/samplepackage/samplepackagefolders!saveSamplepackagefoldersInfosByselect.action",
			qs.stringify({ jsonString: JSON.stringify({ samplepackagefoldersInfos: samplepackagefoldersInfos }) })
		);
		if (res) {
			zTable2.value.getTableList();
		}
	}
};

//删除申请单
const dleApplicationForm = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			samplepackagefoldersInfos: []
		};
		ids.forEach(item => {
			jsonString.samplepackagefoldersInfos.push({
				samplepackagefoldersid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post(
			"/crm/samplepackage/samplepackagefolders!deleteSamplepackagefoldersInfos.action",
			qs.stringify(params)
		);
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable2.value.getTableList();
		}
	});
};

//附件
const zTable3 = ref();
//表格对象
const tableList3 = reactive({
	id: "/customerLabelManagement/samplepackage_workflow_detail.vue_zTable3",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		whole: props?.condobj.workflowflag == "1" ? true : false,
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "id",
			label: "",
			prop: "fileid",
			type: "id",
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
			width: "160"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordtime",
			type: "DateTime",
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
		jsonString: JSON.stringify({
			uploadFile: { businesscode: "samplepackageInfo", businessobjectid: formData.spid, version: "1" }
		})
	};
	uploadAttachmentList.success = false;
	uploadAttachmentList.dialogShow = true;
};
// 上传附件成功后的回调
const qualificationClose = () => {
	if (uploadAttachmentList.success) {
		zTable3.value.getTableList();
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
			zTable3.value.getTableList();
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
			samplepackageInfos: [row]
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
	if (formData.spid) {
		if (!tabPaneXR.get(TabPaneName)) {
			if (TabPaneName == 1) {
				tableList1.httpAttribute.baseParams["cond.spid"] = formData.spid;
			}
			if (TabPaneName == 2) {
				tableList2.httpAttribute.baseParams["cond.spid"] = formData.spid;
			}
			if (TabPaneName == 3) {
				tableList3.httpAttribute.baseParams["cond.businessobjectid"] = formData.spid;
			}
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.spid) {
		getFormData();
	}
});
</script>

<style scoped lang="scss">
:deep(.barcodeLabelClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 90px !important;
}
:deep(.importsamplerecordsClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 120px !important;
	min-height: 400px;
}
</style>
