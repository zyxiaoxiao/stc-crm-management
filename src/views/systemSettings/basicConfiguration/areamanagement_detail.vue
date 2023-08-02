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
					<el-form-item title1="区域部门编码" :label="$t('columnareamanagementInfoaddrcode')">
						<el-input v-model="formData.addrcode" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="区域部门名称" :label="$t('columnareamanagementInfoaddrdesc')" prop="addrdesc">
						<el-input v-model.trim="formData.addrdesc" readonly>
							<template #append>
								<el-button-group class="flex-row">
									<el-button @click="selectAddrdesc" icon="ZoomIn" />
									<el-button @click="delAddrdesc" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="区域编码" :label="$t('columnareamanagementInfoparentcode')" prop="parentcode">
						<el-select v-model="formData.parentcode" class="full-width-input" clearable filterable>
							<el-option v-for="item in crm_kdfwqylx" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="区域级别" :label="$t('columnareamanagementInfoaddrlevel')" prop="addrlevel">
						<el-select v-model="formData.addrlevel" class="full-width-input" clearable filterable>
							<el-option v-for="item in crm_qyglxx" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="多语言编码" :label="$t('columnareamanagementInfoi18n')">
						<el-input v-model="formData.i18n"> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item title1="备注" :label="$t('panelcolumnRemark')">
						<el-input type="textarea" v-model="formData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
						<el-input v-model.trim="formData.recordercode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
						<el-input v-model.trim="formData.recorderdesc" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
						<el-input v-model.trim="formData.recordtime" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<ZDialog v-model="selectCustomerList.dialogShow" :title="$t('panelSelectcustomer')" width="75%" @close="selectCustomerClose">
			<selectCustomer :condobj="selectCustomerList"></selectCustomer>
		</ZDialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { getdropSownSelection } from "/src/utils/util.js";
import ZDialog from "/src/components/ZDialog.vue";
import selectCustomer from "@/views/customerManage/customerSelete/select_attributive_substitution.vue";

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
			otherstaticid: {
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

const crm_kdfwqylx = getdropSownSelection("crm_kdfwqylx");
const crm_qyglxx = getdropSownSelection("crm_qyglxx");

const ruleFormRef = ref();
//表单字段
const formData = reactive({
	areamanagementid: props?.condobj?.areamanagementid,
	parentcode: "01",
	addrlevel: "02"
});

const rules = reactive({
	addrdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	parentcode: [{ required: true, message: i18n.t("rulesPropMessage") }],
	addrlevel: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

//选择部门信息弹出参数
const selectCustomerList = reactive({
	dialogShow: false,
	objectParameter: {}
});
//选择部门信息弹出
const selectAddrdesc = () => {
	selectCustomerList.dialogShow = true;
	selectCustomerList.objectParameter = {};
};
//选择部门信息弹出  回调
const selectCustomerClose = () => {
	let objectParameter = selectCustomerList.objectParameter;
	if (objectParameter && objectParameter?.corpcode) {
		formData.addrcode = objectParameter.corpcode; //部门号
		formData.addrdesc = objectParameter.corpdesc; //部门名称
	}
};
//清除选择的部门
const delAddrdesc = () => {
	formData.addrcode = ""; //部门号
	formData.addrdesc = ""; //部门名称
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.areamanagementInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.areamanagementInfo[0][key];
	}
};
//根据 areamanagementid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/areamanagement/areamanagement!selectAreamanagementInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				areamanagementInfo: {
					areamanagementid: formData.areamanagementid
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
			let srtUrl = "/crm/areamanagement/areamanagement!insertAreamanagementInfo.action";
			if (formData.areamanagementid) {
				srtUrl = "/crm/areamanagement/areamanagement!updateAreamanagementInfo.action";
			}
			let jsonString = {
				areamanagementInfo: formData
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

onMounted(() => {
	if (formData.areamanagementid) {
		getFormData();
	}
});
</script>

<style scoped lang="scss"></style>
