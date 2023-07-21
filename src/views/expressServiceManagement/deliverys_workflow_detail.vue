<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="快递服务" :label="$t('menubasetabpanelpanelempressservice')" class="all-height flex-column" :name="0">
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
						:disabled="!formData.dmid"
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
						:disabled="!formData.dmid"
						@click="auditAction('/crm/deliverys/deliverys!approveDeliverysInfo.action', 'Approve !', formData)"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.dmid"
						@click="auditAction('/crm/deliverys/deliverys!reject.action', 'Reject !', formData)"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						v-show="menu_rejectShow"
						size="small"
						type="danger"
						icon="Close"
						plain
						:disabled="!formData.dmid"
						@click="auditAction('/crm/deliverys/deliverys!reject2Submitor.action', 'Reject !', formData)"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<div style="overflow: auto">
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
						<el-divider title1="客户信息" content-position="left">{{ $t("panelSelectcustomer") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="申请单号" :label="$t('columnwriteoff_application_listApplicationNo')">
									<el-input v-model.trim="formData.applicationno" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
									<el-input v-model="formData.clientno" readonly :disabled="formDisabledList.clientno">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.clientno" @click="selectCustomer" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.clientno" @click="delCustomer" type="primary" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item title1="客户名称" :label="$t('panelcolumncustomername')">
									<el-input v-model.trim="formData.clientname" readonly :disabled="formDisabledList.clientname"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
									<el-select
										v-model="formData.area"
										@change="locationChange"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.area"
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
							<el-col :span="6">
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
							<el-col :span="6">
								<el-form-item title1="联系人" :label="$t('columnContactPerson')">
									<el-input readonly v-model="formData.contactperson" :disabled="formDisabledList.contactperson">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.contactperson" @click="selectContactBtn" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.contactperson" @click="delContact" type="primary" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="营运类别" :label="$t('columndeliverysInfooperationstype')">
									<el-input v-model.trim="formData.operationstype" :disabled="formDisabledList.operationstype"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人电话" :label="$t('i18ncrmcontractContactPhone')">
									<el-input v-model.trim="formData.telephone" readonly :disabled="formDisabledList.telephone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人传真" :label="$t('itemtitlebase_userfax')">
									<el-input v-model.trim="formData.fax" readonly :disabled="formDisabledList.fax"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="联系人手机" :label="$t('itemtitlebase_usermobile')">
									<el-input v-model.trim="formData.mobilephone" readonly :disabled="formDisabledList.mobilephone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="地址类型" :label="$t('titlebaseAddresstype')">
									<el-select v-model="formData.addresstype" disabled placeholder=" " class="full-width-input">
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
									<el-input readonly v-model="formData.addres" :disabled="formDisabledList.addres">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.addres" @click="selectAddress" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.addres" @click="delAddress" type="primary" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="一般讯息" content-position="left">{{ $t("columndeliverysInfoGeneralInformation") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="服务类型" :label="$t('columnappointmentdesc46')">
									<el-select
										v-model="formData.servicetype"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.servicetype"
									>
										<el-option
											v-for="item in crm_kdfwlx"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="其他服务" :label="$t('columndeliverysInfootherserver')">
									<el-input v-model.trim="formData.otherserver" clearable :disabled="formDisabledList.otherserver"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="申请人" :label="$t('columnwriteoff_applicant')">
									<el-select
										v-model="formData.applicantdesc"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.applicantdesc"
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
							<el-col :span="6">
								<el-form-item title1="是否即时" :label="$t('columndeliverysInfoisimmediately')">
									<el-select
										v-model="formData.isimmediately"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.isimmediately"
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
								<el-form-item title1="期望日期" :label="$t('columndeliverysInfoavailabledate')">
									<el-date-picker
										v-model.trim="formData.availabledate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.availabledate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="服务级别" :label="$t('columndeliverysInfoserverlevel')">
									<el-select
										v-model="formData.serverlevel"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.serverlevel"
									>
										<el-option
											v-for="item in crm_kdfwjb"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="是否客务部复核" :label="$t('columndeliverysInfoisauditbycsd')">
									<el-select
										v-model="formData.isauditbycsd"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.isauditbycsd"
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
								<el-form-item title1="部门备注" :label="$t('columndeliverysInfodeptremark')">
									<el-input
										type="textarea"
										v-model.trim="formData.deptremark"
										clearable
										:disabled="formDisabledList.deptremark"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider v-if="props?.condobj?.iscsd == '1'" title1="客务部讯息" content-position="left">{{
							$t("columndeliverysInfoGuestDepartmentMessage")
						}}</el-divider>
						<el-row v-if="props?.condobj?.iscsd == '1'" :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="服务地区代号" :label="$t('columndeliverysInfoserviceareacode')">
									<el-input v-model="formData.serviceareacode" :disabled="formDisabledList.serviceareacode"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="预计完成日期" :label="$t('columndeliverysInfoprefinishdate')">
									<el-date-picker
										v-model.trim="formData.prefinishdate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.prefinishdate"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="取快递开始时间" :label="$t('columndeliverysInfodeliverystarttime')">
									<el-date-picker
										v-model.trim="formData.deliverystarttime"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.deliverystarttime"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="取快递结束时间" :label="$t('columndeliverysInfodeliveryendtime')">
									<el-date-picker
										v-model.trim="formData.deliveryendtime"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.deliveryendtime"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="CSD接收日期" :label="$t('columndeliverysInfocsdcollecttimes')">
									<el-date-picker
										v-model.trim="formData.csdcollecttimes"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.csdcollecttimes"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="CSD接收人名称" :label="$t('columndeliverysInfocsdcollectdesc')">
									<el-input readonly v-model.trim="formData.csdcollectdesc" :disabled="formDisabledList.csdcollectdesc">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.csdcollectdesc" @click="selectcsdcollectdesc" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.csdcollectdesc" @click="delcsdcollectdesc" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="部门接收样品日期" :label="$t('columndeliverysInfodeptcollecttimes')">
									<el-date-picker
										v-model.trim="formData.deptcollecttimes"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										:disabled="formDisabledList.deptcollecttimes"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="部门接收人名称" :label="$t('columndeliverysInfodeptcollectdesc')">
									<el-input readonly v-model.trim="formData.deptcollectdesc" :disabled="formDisabledList.deptcollectdesc">
										<template #append>
											<el-button-group class="flex-row">
												<el-button :disabled="formDisabledList.deptcollectdesc" @click="selectdeptcollectdesc" icon="ZoomIn" />
												<el-button :disabled="formDisabledList.deptcollectdesc" @click="deldeptcollectdesc" icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="送样方式" :label="$t('columndeliverysInfosendmethod')">
									<el-select
										v-model="formData.sendmethod"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.sendmethod"
									>
										<el-option
											v-for="item in kdfy_sqyfs"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="收样方式" :label="$t('columndeliverysInforecvmethod')">
									<el-select
										v-model="formData.recvmethod"
										clearable
										filterable
										class="full-width-input"
										:disabled="formDisabledList.recvmethod"
									>
										<el-option
											v-for="item in kdfy_sqyfs"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="CSD备注" :label="$t('columndeliverysInfocsdremark')">
									<el-input
										type="textarea"
										v-model.trim="formData.csdremark"
										clearable
										:disabled="formDisabledList.csdremark"
									></el-input>
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
				title1="项目列表"
				:label="$t('menubasetabpanelpanelprojectlist')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList1">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newProject">{{ $t("menu_new") }}</el-button>
						<el-button size="small" type="danger" icon="Delete" plain :disabled="!scope.isSelected" @click="dleProject(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
						<el-button size="small" type="primary" icon="Document" plain @click="preserveProject">
							{{ $t("menu_save") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				v-if="props?.condobj?.iscsd == '1'"
				title1="标签管理"
				:label="$t('menubasetabpanelpanellabellist')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newLabelInformation">{{ $t("menu_new") }}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="dleLabelInformation(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
						<el-button size="small" type="primary" icon="Document" plain @click="preserveLabelInformation">
							{{ $t("menu_save") }}
						</el-button>
						<el-button
							size="small"
							type="primary"
							icon="Ticket"
							plain
							:disabled="!scope.isSelected"
							@click="barcodeLabelPrint(scope.selectList)"
							>{{ $t("menu_clientlabel") }}
						</el-button>
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

		<!-- 选择联系人 -->
		<ZDialog v-if="selectUserList.dialogShow" v-model="selectUserList.dialogShow" width="55%" @close="selectUserClose">
			<selectUser :condobj="selectUserList"></selectUser>
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
import selectcorpcontactaddressinformation from "../customerLabelManagement/select_corp_contact_address_information.vue";
import selectcontact from "../customerLabelManagement/selectcontact.vue";
import selectAddressbycorpandcontact from "../customerLabelManagement/selectAddressbycorpandcontact.vue";
import selectUser from "../customerLabelManagement/selectUser.vue";
import barcodeLabel from "../customerLabelManagement/barcodeLabel.vue";

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
			dmid: {
				type: String,
				default: ""
			},
			workflowflag: {
				type: String,
				default: "3"
			},
			iscsd: {
				type: String,
				default: ""
			}
		}
	}
});

//表单字段
const formData = reactive({
	dmid: props?.condobj?.dmid,
	clientid: "",
	contactid: "",
	operationstype: "Existing Customer",
	isimmediately: "0",
	serverlevel: "01",
	isauditbycsd: "0",
	csdcollectcode: "",
	deptcollectcode: "",
	sendmethod: "01",
	recvmethod: "01"
});
const rules = reactive({});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示
const menu_submitShow = ref(false); //提交按钮不显示
const menu_approveShow = ref(false); //审核通过按钮不显示
const menu_rejectShow = ref(false); //拒绝按钮不显示

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
const crm_kdfwlx = getdropSownSelection("crm_kdfwlx");
const crm_kdfwjb = getdropSownSelection("crm_kdfwjb");
const kdfy_sqyfs = getdropSownSelection("kdfy_sqyfs");
const crm_xmlx = getdropSownSelection("crm_xmlx");
const kdfy_cm = getdropSownSelection("kdfy_cm");
const kdfy_zl = getdropSownSelection("kdfy_zl");

//是否
const whetherAr = getdropSownSelection("whether");

const ruleFormRef = ref();

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
		formData.clientname = arrayList[0].corpdesc ?? formData.clientname; //客户名称
		formData.clientid = arrayList[0].corpid ?? formData.clientid; //客户ID
		formData.clientno = arrayList[0].corpno ?? formData.clientno; //客户号
		formData.contactid = arrayList[0].contactid ?? formData.contactid; //联系人ID
		formData.contactperson = arrayList[0].contactdesc ?? formData.contactperson; //联系人
		formData.telephone = arrayList[0].tel ?? formData.telephone; //电话
		formData.fax = arrayList[0].fax ?? formData.fax; //传真
		formData.mobilephone = arrayList[0].mobile ?? formData.mobilephone; //手机
		formData.addresstype = arrayList[0].addrtype ?? formData.addresstype; //地址类型
		formData.addres = arrayList[0].address ?? formData.addres; //详细地址
	}
};
//清除选择的客户
const delCustomer = () => {
	formData.clientname = ""; //客户名称
	formData.clientid = ""; //客户ID
	formData.clientno = ""; //客户号
	formData.contactid = ""; //联系人ID
	formData.contactperson = ""; //联系人
	formData.telephone = ""; //电话
	formData.fax = ""; //传真
	formData.mobilephone = ""; //手机
	formData.addresstype = ""; //地址类型
	formData.addres = ""; //详细地址
};

//选择联系人弹出参数
const selectcontactList = reactive({
	dialogShow: false,
	corpno: "",
	arrayList: []
});
//选择联系人弹出
const selectContactBtn = () => {
	if (!formData.clientno) {
		ElMessage.warning(i18n.t("Message_pleaseSelectClientInformationFirst"));
		return;
	}
	selectcontactList.corpno = formData.clientno;
	selectcontactList.arrayList = [];
	selectcontactList.dialogShow = true;
};
// 选择联系人弹出 回调
const selectcontactClose = () => {
	if (selectcontactList.arrayList.length > 0) {
		formData.contactid = selectcontactList.arrayList[0].contactid;
		formData.contactperson = selectcontactList.arrayList[0].contactdesc;
		formData.telephone = selectcontactList.arrayList[0].tel;
		formData.fax = selectcontactList.arrayList[0].fax;
		formData.mobilephone = selectcontactList.arrayList[0].mobile;
	}
};

//清除联系人
const delContact = () => {
	formData.contactid = ""; //联系人ID
	formData.contactperson = ""; //联系人
	formData.telephone = ""; //电话
	formData.fax = ""; //传真
	formData.mobilephone = ""; //手机
	formData.addresstype = ""; //地址类型
	formData.addres = ""; //详细地址
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
		formData.addresstype = selectAddressbycorpandcontactList.arrayList[0].addrtype; //地址类型
		formData.addres = selectAddressbycorpandcontactList.arrayList[0].address; //详细地址
	}
};
//清除地址
const delAddress = () => {
	formData.addresstype = "";
	formData.addres = "";
};

//选择区域，触发事件
const locationChange = val => {
	formData.dept = "";
	formData.applicantdesc = "";
	deptOptionArray.value = [];
	saledescOptionArray.value = [];
	if (val) {
		let params = { "cond.parentcode": val, "cond.addrlevel": "02" };
		areamanagementInfos(params);
	}
};
//选择部门 触发事件
const deptChange = async val => {
	formData.applicantdesc = "";
	saledescOptionArray.value = [];
	if (val) {
		let params = { "cond.deptdesc": val };
		userInfos(params);
	}
};

//iscsd为1时，放开部分操作权限
const csdOperationAuthority = () => {
	if (props?.condobj?.iscsd == "1") {
		formDisabledList.serviceareacode = false;
		formDisabledList.prefinishdate = false;
		formDisabledList.deliverystarttime = false;
		formDisabledList.deliveryendtime = false;
		formDisabledList.csdcollecttimes = false;
		formDisabledList.csdcollectcode = false;
		formDisabledList.csdcollectdesc = false;
		formDisabledList.deptcollecttimes = false;
		formDisabledList.deptcollectcode = false;
		formDisabledList.deptcollectdesc = false;
		formDisabledList.sendmethod = false;
		formDisabledList.recvmethod = false;
		formDisabledList.csdremark = false;
		menu_saveShow.value = true;
	}
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.deliverysInfo[0]) {
		formData[key] = data.deliverysInfo[0][key];
	}
	if (formData.area) {
		let params = { "cond.parentcode": formData.area, "cond.addrlevel": "02" };
		areamanagementInfos(params);
	}
	if (formData.dept) {
		let params = { "cond.deptdesc": formData.dept };
		userInfos(params);
	}
};
//根据 dmid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/deliverys/deliverys!selectDeliverysInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				deliverysInfo: {
					dmid: formData.dmid
				}
			})
		})
	);
	if (res) {
		for (let key in res.deliverysInfo[0]) {
			if (props.condobj.workflowflag == "1") {
				formDisabledList[key] = false;
			} else {
				formDisabledList[key] = true; //禁用
			}
		}
		csdOperationAuthority();
		dataSourceProcessing(res);
	}
};

const selectUserList = reactive({
	arrayList: [],
	dialogType: "",
	dialogShow: false
});

//CSD接收人
const selectcsdcollectdesc = () => {
	selectUserList.arrayList = [];
	selectUserList.dialogType = "CSD";
	selectUserList.dialogShow = true;
};
const delcsdcollectdesc = () => {
	formData.csdcollectcode = "";
	formData.csdcollectdesc = "";
};

//部门接收人
const selectdeptcollectdesc = () => {
	selectUserList.arrayList = [];
	selectUserList.dialogType = "DEPT";
	selectUserList.dialogShow = true;
};
const deldeptcollectdesc = () => {
	formData.deptcollectcode = "";
	formData.deptcollectdesc = "";
};

const selectUserClose = () => {
	if (selectUserList.arrayList.length > 0) {
		if (selectUserList.dialogType == "CSD") {
			formData.csdcollectcode = selectUserList.arrayList[0].usercode;
			formData.csdcollectdesc = selectUserList.arrayList[0].userdesc;
		}

		if (selectUserList.dialogType == "DEPT") {
			formData.deptcollectcode = selectUserList.arrayList[0].usercode;
			formData.deptcollectdesc = selectUserList.arrayList[0].userdesc;
		}
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/deliverys/deliverys!insertDeliverysInfo.action";
			if (formData.dmid) {
				srtUrl = "/crm/deliverys/deliverys!updateDeliverysInfo.action";
			}
			let jsonString = {
				deliverysInfo: formData
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
					"/crm/deliverys/deliverys!submitDeliverysInfos.action",
					qs.stringify({ "deliverysInfo.dmid": formData.dmid, "cond.opinion": "", "cond.flag": "0" })
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

//项目列表
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/expressServiceManagement/deliverys_workflow_detail.vue_zTable1",
	tableToolbar: {
		whole: props?.condobj.workflowflag == "1" ? true : false
	},
	//面初始化渲染完成 是否调请求
	isRequest: true,
	edit: props?.condobj.workflowflag == "1" ? true : false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverysample/deliverysample!selectDeliverysampleInfosByCond.action",
		root: "deliverysampleInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "序号",
			label: "itemtitleloginordernumber",
			type: "index",
			width: "40"
		},
		{
			title: "项目编码",
			label: "columndeliverysampleInforowid",
			prop: "rowid",
			type: "Input",
			width: "160"
		},
		{
			title: "项目类型",
			label: "columndeliverysampleInfoitems",
			prop: "items",
			type: "Select",
			typeData: crm_xmlx,
			width: "160",
			edit: true
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "quantitys",
			type: "Number",
			width: "160",
			precision: 0,
			min: 1,
			edit: true
		},
		{
			title: "尺码",
			label: "columndeliverysampleInfosizes",
			prop: "sizes",
			type: "Select",
			typeData: kdfy_cm,
			width: "160",
			edit: true
		},
		{
			title: "重量",
			label: "columndeliverysampleInfoweight",
			prop: "weight",
			type: "Select",
			typeData: kdfy_zl,
			width: "160",
			edit: true
		},
		{
			title: "项目描述",
			label: "columndeliverysampleInfodescription",
			prop: "description",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remarks",
			type: "Input",
			width: "160",
			edit: true
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
		},
		{
			title: "id",
			label: "",
			prop: "dsid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "与主表关联ID",
			label: "",
			prop: "dmid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

// 新增项目信息
const newProject = () => {
	zTable1.value.addRowData({ quantitys: 1 });
};

//删除项目信息
const dleProject = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			deliverysampleInfos: []
		};
		ids.forEach(item => {
			jsonString.deliverysampleInfos.push({
				dsid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/deliverys/deliverys!deleteDeliverysampleInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable1.value.getTableList();
		}
	});
};
//保存项目
const preserveProject = async () => {
	let projectRows = zTable1.value.getEditSelectList();
	if (projectRows.length > 0) {
		for (let row of projectRows) {
			if (!row.items) {
				ElMessage({
					type: "warning",
					message: i18n.t("message_null_items")
				});
				return;
			}
		}
		let params = {
			"cond.dmid": formData.dmid,
			jsonString: JSON.stringify({
				deliverysampleInfos: projectRows
			})
		};
		const res = await http.post("/crm/deliverys/deliverys!saveDeliverysampleInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_saveSuccess")
			});
			zTable1.value.getTableList();
		}
	}
};

//标签管理
const zTable2 = ref();
const tableList2 = reactive({
	id: "/expressServiceManagement/deliverys_workflow_detail.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	edit: props?.condobj?.workflowflag == "1" || props?.condobj?.iscsd == "1" ? true : false,
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" || props?.condobj?.iscsd == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverylable/deliverylable!selectLableInfosByCond.action",
		root: "lableInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "标签号",
			label: "columnlableInfolabelno",
			prop: "labelno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户标签ID",
			label: "columnlableInfoclientlableno",
			prop: "clientlableno",
			type: "Input",
			width: "160"
		},
		{
			title: "收样日期",
			label: "columnlableInforeceiveddate",
			prop: "receiveddate",
			type: "Date",
			width: "160",
			edit: true
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
			width: "255"
		},
		{
			title: "主键",
			label: "",
			prop: "dlid",
			type: "id",
			width: "160",
			isHide: true
		},
		{
			title: "主键关联ID",
			label: "",
			prop: "dmid",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//新增标签
const newLabelInformation = async () => {
	let params = {
		"cond.dmid": formData.dmid,
		jsonString: JSON.stringify({
			lableInfos: [{ dmid: formData.dmid }]
		})
	};
	const res = await http.post("/crm/deliverys/deliverys!saveDeliverylabelInfos.action", qs.stringify(params));
	if (res) {
		ElMessage({
			type: "success",
			message: i18n.t("Message_saveSuccess")
		});
		zTable2.value.getTableList();
	}
};

//保存标签
const preserveLabelInformation = async () => {
	let LabelRows = zTable2.value.getEditSelectList();
	if (LabelRows.length > 0) {
		let params = {
			"cond.dmid": formData.dmid,
			jsonString: JSON.stringify({
				lableInfos: LabelRows
			})
		};
		const res = await http.post("/crm/deliverys/deliverys!saveDeliverylabelInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_saveSuccess")
			});
			zTable2.value.getTableList();
		}
	}
};

//删除标签
const dleLabelInformation = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			lableInfos: []
		};
		ids.forEach(item => {
			jsonString.lableInfos.push({
				dlid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/deliverys/deliverys!deleteDeliverylabelInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable2.value.getTableList();
		}
	});
};

//条码标签弹出 参数
const barcodeLabelList = reactive({
	dialogShow: false,
	arrayList: []
});
//打印条码标签
const barcodeLabelPrint = async rows => {
	let params = {
		jsonString: JSON.stringify({
			lableInfos: rows
		})
	};
	const res = await http.post("/crm/deliverylable/deliverylable!insertCliectLabelInfos.action", qs.stringify(params));
	let deliverysInfos = res?.deliverysInfos;
	if (deliverysInfos && deliverysInfos.length > 0) {
		let arrayList = [];
		deliverysInfos.forEach(item => {
			let obj = {};
			obj.dept = item.dept;
			obj.packagid = item.deptremark;
			obj.customername = item.clientname;
			obj.customerno = item.clientno;
			obj.saledesc = item.applicantdesc;
			obj.labledate = item.csdcollecttimes;
			arrayList.push(obj);
		});
		barcodeLabelList.dialogShow = true;
		barcodeLabelList.arrayList = arrayList;
		zTable2.value.getTableList();
	}
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
			deliverysInfos: [row]
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
	if (formData.dmid) {
		if (!tabPaneXR.get(TabPaneName)) {
			if (TabPaneName == 1) {
				tableList1.httpAttribute.baseParams["cond.dmid"] = formData.dmid;
			}
			if (TabPaneName == 2) {
				tableList2.httpAttribute.baseParams["cond.dmid"] = formData.dmid;
			}
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.dmid) {
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
