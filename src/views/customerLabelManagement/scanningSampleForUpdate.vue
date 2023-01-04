<template>
	<div>
		<div style="padding: 10px">
			<el-form
				style="margin: 0px 15px"
				label-position="right"
				label-width="auto"
				:model="formData"
				:rules="rules"
				ref="ruleFormRef"
			>
				<el-form-item title1="领样人工号" :label="$t('columnsamplepackageInforeceivepersoncode')" prop="receivepersoncode">
					<el-input readonly v-model.trim="formData.receivepersoncode">
						<template #append>
							<el-button-group class="flex-row">
								<el-button @click="selectReceivepersoncode" icon="ZoomIn" />
								<el-button @click="delReceivepersoncode" plain icon="ZoomOut" />
							</el-button-group> </template
					></el-input>
				</el-form-item>
				<el-form-item title1="样品包裹号" :label="$t('columnsamplepackageInfopackagid')">
					<el-input clearable v-model.trim="formData.packagidbarcode" @change="packagidbarcodeChange"></el-input>
				</el-form-item>
				<el-form-item label-width="0px" label="" prop="packagids">
					<el-input type="textarea" :autosize="{ minRows: 6 }" v-model.trim="formData.packagids"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="flex-row" style="padding: 0px 20px 20px 0px">
			<div class="flex-1"></div>
			<el-button type="primary" icon="Check" @click="Submit(ruleFormRef)"> {{ $t("menu_receive") }}</el-button>
		</div>
		<!-- 选择领样人 -->
		<div v-dialogStretching>
			<ZDialog v-model="selectUserList.dialogShow" width="55%" @close="selectUserClose">
				<selectUser :condobj="selectUserList"></selectUser>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage, ElMessageBox } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import selectUser from "./selectUser.vue";

const i18n = useI18n();

const props = defineProps({
	condobj: {
		type: Object,
		default: {
			dialogShow: {
				type: Boolean,
				default: false
			},
			success: {
				type: Boolean,
				default: false
			},
			packagids: {
				type: String,
				default: ""
			}
		}
	}
});
const ruleFormRef = ref();
const formData = reactive({ receivepersoncode: "", packagidbarcode: "", packagids: props?.condobj?.packagids });
const rules = reactive({
	receivepersoncode: [{ required: true, message: i18n.t("rulesPropMessage") }],
	packagids: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

const selectUserList = reactive({
	arrayList: [],
	dialogShow: false
});
const selectReceivepersoncode = () => {
	selectUserList.arrayList = [];
	selectUserList.dialogShow = true;
};

const selectUserClose = () => {
	if (selectUserList.arrayList.length > 0) {
		formData.receivepersoncode = selectUserList.arrayList[0].usercode;
	}
};

const delReceivepersoncode = () => {
	formData.receivepersoncode = "";
};

const packagidbarcodeChange = val => {
	if (formData.packagids) {
		formData.packagids = formData.packagids + "," + val;
	} else {
		formData.packagids = val;
	}
	formData.packagidbarcode = "";
};

//提交
const Submit = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/samplepackage/samplepackageoutbox!insertSamplepackageoutboxInfo.action";
			if (formData.spoutboxid) {
				srtUrl = "/crm/samplepackage/samplepackageoutbox!updateSamplepackageoutboxInfo.action";
			}
			let jsonString = {
				samplepackageoutboxInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				for (let key in res.samplepackageoutboxInfo[0]) {
					formData[key] = res.samplepackageoutboxInfo[0][key];
				}
				props.condobj.success = true;
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};
</script>
