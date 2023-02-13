<template>
	<div class="all-height flex-column">
		<div class="all-height flex-column flex-1">
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
					:disabled="!formData.aid"
					@click="Submit(ruleFormRef)"
				>
					{{ $t("menu_submit") }}
				</el-button>
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
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="申请单号" :label="$t('columnwriteoff_application_listApplicationNo')" prop="folderno">
								<el-input v-model="formData.folderno" readonly :disabled="formDisabledList.folderno">
									<template #append>
										<el-button-group class="flex-row">
											<el-button :disabled="formDisabledList.folderno" @click="selectFoldernoBtn" icon="ZoomIn" />
											<el-button :disabled="formDisabledList.folderno" @click="delFolderno" type="primary" icon="ZoomOut" />
										</el-button-group>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="销售名称" :label="$t('columnbasesalesdescus')">
								<el-input v-model.trim="formData.sename" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="部门" :label="$t('corpinfopaneldepartmentcodetitle')">
								<el-input v-model.trim="formData.dept" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="金额" :label="$t('columnappointmentothercostmoney_hkd')">
								<el-input v-model.number="formData.abrokerage" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="客户号" :label="$t('corpinfoCustomerNumbertitle')">
								<el-input v-model.trim="formData.rasclientid" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="客户名称" :label="$t('columnCustomerName')">
								<el-input v-model.trim="formData.compname" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item title1="备注" :label="$t('panelcolumnRemark')" prop="remark">
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
		</div>
		<!-- 选择申请单 -->
		<div v-dialogStretching>
			<ZDialog v-model="selectapplicationList.dialogShow" width="75%" @close="selectapplicationClose">
				<selectapplication :condobj="selectapplicationList" @subFeedbackClick="subFeedbackClick"></selectapplication>
			</ZDialog>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";

import selectapplication from "./select_application.vue";

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
			aid: {
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
	aid: props?.condobj?.aid,
	expenditureid: "",
	preprunfolder: "",
	authentication: ""
});

const rules = reactive({
	folderno: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示
const menu_submitShow = ref(false); //提交按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1" || props?.condobj?.workflowflag == "4") {
	menu_saveShow.value = true;
	menu_submitShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

const ruleFormRef = ref();

//选择申请单弹出参数
const selectapplicationList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择申请单弹出
const selectFoldernoBtn = () => {
	selectapplicationList.dialogShow = true;
	selectapplicationList.arrayList = [];
};

//子组件反馈事件，用于子组件需要对父组件进行操作
const subFeedbackClick = data => {
	selectapplicationList.arrayList = data;
	selectapplicationList.dialogShow = false;
};

//选择申请单弹出  回调
const selectapplicationClose = () => {
	let arrayList = selectapplicationList.arrayList;
	if (arrayList.length > 0) {
		formData.folderno = arrayList[0].folderno;
		formData.sename = arrayList[0].sename;
		formData.secode = arrayList[0].secode;
		formData.dept = arrayList[0].dept;
		formData.abrokerage = arrayList[0].rasno;
		formData.rasclientid = arrayList[0].rasclientid;
		formData.compname = arrayList[0].compname;
		formData.expenditureid = arrayList[0].pricelistid;
		formData.preprunfolder = arrayList[0].foldername;
		formData.authentication = arrayList[0].reportsendtype;
	}
};
//清除选择的申请单
const delFolderno = () => {
	formData.folderno = "";
	formData.sename = "";
	formData.secode = "";
	formData.dept = "";
	formData.abrokerage = "";
	formData.rasclientid = "";
	formData.compname = "";
	formData.expenditureid = "";
	formData.preprunfolder = "";
	formData.authentication = "";
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.authenticationInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}
		formData[key] = data.authenticationInfo[0][key];
	}
};
//根据 id 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/authentication/authentication!selectAuthenticationInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				authenticationInfo: {
					aid: formData.aid
				}
			})
		})
	);
	if (res) {
		dataSourceProcessing(res);
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = formData.aid
				? "/crm/authentication/authentication!updateAuthenticationInfo.action"
				: "/crm/authentication/authentication!insertAuthenticationInfo.action";

			let params = {
				jsonString: JSON.stringify({
					authenticationInfo: formData
				})
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
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
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
					"/crm/authentication/authentication!submitAuthenticationInfo.action",
					qs.stringify({ jsonString: JSON.stringify({ authenticationInfos: [formData] }) })
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

onMounted(() => {
	if (formData.aid) {
		getFormData();
	}
});
</script>
