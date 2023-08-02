<template>
	<div class="all-height flex-column">
		<div class="flex-row" style="margin-top: 10px; margin-right: 20px">
			<div class="flex-1"></div>
			<el-button size="small" type="primary" icon="Document" v-if="menu_saveShow" plain @click="save_handler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
		</div>
		<el-form
			style="margin: 15px 15px 0px 15px"
			label-position="right"
			label-width="120px"
			:model="formData"
			:rules="rules"
			ref="ruleFormRef"
		>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="角色" :label="$t('tabtitlecoreuserquantumrole')" prop="isrole">
						<el-select v-model="formData.isrole" class="full-width-input" @change="isroleChange">
							<el-option v-for="item in isroleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="启用时间" :label="$t('basecolumnstart_time')" prop="activetime">
						<el-date-picker
							v-model="formData.activetime"
							type="date"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="花红启用年月" :label="$t('basecolumnopening_date_of_annual_bonus')" prop="bmbonusactivedate">
						<el-date-picker
							v-model="formData.bmbonusactivedate"
							type="month"
							format="YYYY-MM"
							value-format="YYYY-MM"
							style="width: 100%"
							:disabled="formDisabledList.bmbonusactivedate"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item
						title1="团队提佣启用日期"
						:label="$t('menubaseActivationDateOfTeamCommission')"
						prop="teamcommissionbegindate"
					>
						<el-date-picker
							v-model="formData.teamcommissionbegindate"
							type="month"
							format="YYYY-MM"
							value-format="YYYY-MM"
							style="width: 100%"
							:disabled="formDisabledList.teamcommissionbegindate"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="SM名称" :label="$t('basecolumnsm_name')" prop="smdesc">
						<el-input v-model.trim="formData.smdesc" readonly :disabled="formDisabledList.smdesc">
							<template #append>
								<el-button-group class="flex-row">
									<el-button @click="selectHeadmancode" :disabled="formDisabledList.smdesc" icon="ZoomIn" />
									<el-button @click="delHeadmancode" :disabled="formDisabledList.smdesc" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="BM名称" :label="$t('basecolumnbm_name')" prop="bmdesc">
						<el-input v-model.trim="formData.bmdesc" readonly :disabled="formDisabledList.bmdesc">
							<template #append>
								<el-button-group class="flex-row">
									<el-button @click="selectHeadmancode" :disabled="formDisabledList.bmdesc" icon="ZoomIn" />
									<el-button @click="delHeadmancode" :disabled="formDisabledList.bmdesc" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="部门名称" :label="$t('appointmentDepartment_name')">
						<el-input v-model="formData.corpdesc" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item title1="备注" :label="$t('panelcolumnRemark')">
						<el-input type="textarea" v-model="formData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<ZDialog
			v-model="selectheadmanList.dialogShow"
			:title="$t('messagecoreuserchooseuser')"
			width="75%"
			@close="selectheadmanClose"
		>
			<selectheadman :condobj="selectheadmanList"></selectheadman>
		</ZDialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import ZDialog from "/src/components/ZDialog.vue";
import selectheadman from "./select_headman.vue";

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
			salesteamid: {
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

const isroleList = [
	{ label: "SM", value: "SM" },
	{ label: "BM", value: "BM" }
];

const ruleFormRef = ref();
//表单字段
const formData = reactive({
	salesteamid: props?.condobj?.salesteamid,
	isrole: "SM",
	smcode: "",
	bmcode: "",
	corpcode: ""
});

//校验
const bmbonusactivedateValidator = (rule, value, callback) => {
	if (formData.isrole == "BM" && !value) {
		callback(new Error(i18n.t("rulesPropMessage")));
	} else {
		callback();
	}
};

const teamcommissionbegindateValidator = (rule, value, callback) => {
	if (formData.isrole == "BM" && !value) {
		callback(new Error(i18n.t("rulesPropMessage")));
	} else {
		callback();
	}
};

const smdescValidator = (rule, value, callback) => {
	if (formData.isrole == "SM" && !value) {
		callback(new Error(i18n.t("rulesPropMessage")));
	} else {
		callback();
	}
};
const bmdescValidator = (rule, value, callback) => {
	if (formData.isrole == "BM" && !value) {
		callback(new Error(i18n.t("rulesPropMessage")));
	} else {
		callback();
	}
};

const rules = reactive({
	isrole: [{ required: true, message: i18n.t("rulesPropMessage") }],
	activetime: [{ required: true, message: i18n.t("rulesPropMessage") }],
	smdesc: [{ validator: smdescValidator, trigger: ["blur", "change"] }],
	bmdesc: [{ validator: bmdescValidator, trigger: ["blur", "change"] }],
	bmbonusactivedate: [{ validator: bmbonusactivedateValidator, trigger: ["blur", "change"] }],
	teamcommissionbegindate: [{ validator: teamcommissionbegindateValidator, trigger: ["blur", "change"] }]
});
const formDisabledList = reactive({
	bmbonusactivedate: true,
	teamcommissionbegindate: true,
	bmdesc: true
}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

const isroleChange = val => {
	if (val == "SM") {
		formDisabledList.bmbonusactivedate = true;
		formDisabledList.teamcommissionbegindate = true;
		formDisabledList.smdesc = false;
		formDisabledList.bmdesc = true;

		formData.bmbonusactivedate = "";
		formData.teamcommissionbegindate = "";
		formData.bmcode = "";
		formData.bmdesc = "";
		formData.corpcode = "";
		formData.corpdesc = "";
	} else if (val == "BM") {
		formDisabledList.bmbonusactivedate = false;
		formDisabledList.teamcommissionbegindate = false;
		formDisabledList.smdesc = true;
		formDisabledList.bmdesc = false;

		formData.smcode = "";
		formData.smdesc = "";
		formData.corpcode = "";
		formData.corpdesc = "";
	}
};

//选择销售信息弹出参数
const selectheadmanList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择销售信息弹出
const selectHeadmancode = () => {
	selectheadmanList.dialogShow = true;
	selectheadmanList.arrayList = [];
};
//选择销售信息弹出  回调
const selectheadmanClose = () => {
	let arrayList = selectheadmanList.arrayList;
	if (arrayList && arrayList.length > 0) {
		if (formData.isrole == "SM") {
			formData.smcode = arrayList[0].usercode;
			formData.smdesc = arrayList[0].userdesc;
		} else if (formData.isrole == "BM") {
			formData.bmcode = arrayList[0].usercode;
			formData.bmdesc = arrayList[0].userdesc;
		}
		formData.corpcode = arrayList[0].corpcode;
		formData.corpdesc = arrayList[0].corpdesc;
	}
};
//清除选择的销售
const delHeadmancode = () => {
	if (formData.isrole == "SM") {
		formData.smcode = "";
		formData.smdesc = "";
	} else if (formData.isrole == "BM") {
		formData.bmcode = "";
		formData.bmdesc = "";
	}
	formData.corpcode = "";
	formData.corpdesc = "";
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.salesTeamInfo[0]) {
		formData[key] = data.salesTeamInfo[0][key];
	}
};
//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/salesteam/salesteam!insertSalesTeamInfo.action";
			if (formData.salesteamid) {
				srtUrl = "/crm/salesteam/salesteam!updateSalesTeamInfo.action";
			}

			if (formData.bmbonusactivedate) {
				formData.bmbonusactivedate = formData.bmbonusactivedate + "-01";
			}
			if (formData.teamcommissionbegindate) {
				formData.teamcommissionbegindate = formData.teamcommissionbegindate + "-01";
			}

			let jsonString = {
				salesTeamInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				dataSourceProcessing(res);
				props.condobj.success = true;
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
