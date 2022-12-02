<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px" class="flex-1">
			<el-alert type="info" :title="$t('Message_OperationTip')" show-icon description="" :closable="false">
				<template #default>
					<div>
						{{ $t("Statement_filesize") }} 1 MB
						<br />
						{{ $t("Statement_filetype") }}
						tif,jpg,png,gif,bmp,txt,html,xml,pdf,doc,xls,ppt,docx,xlsx,pptx,zip,rar,mp3,mov,avi,mpp
					</div>
				</template>
			</el-alert>
			<el-form
				style="margin-top: 15px; margin-right: 40px"
				label-position="right"
				label-width="120px"
				:model="formData"
				:rules="rules"
				ref="ruleFormRef"
			>
				<el-form-item title1="文档主题" :label="$t('textfieldfieldLabeldocumenttheme')" prop="theme">
					<el-input type="text" clearable v-model.trim="formData.theme"></el-input>
				</el-form-item>
				<el-form-item title1="文档类型" :label="$t('textfieldfieldLabeldocumenttype')" prop="filetype">
					<el-select v-model="formData.filetype" class="full-width-input" clearable filterable>
						<el-option
							v-for="item in filetypeAr"
							:key="item.value"
							:label="item.label ? $t(item.label) : item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item title1="文档等级" :label="$t('textfieldfieldLabeldocumentlevel')" prop="filelevel">
					<el-select v-model="formData.filelevel" class="full-width-input" clearable filterable>
						<el-option
							v-for="item in filelevelAr"
							:key="item.value"
							:label="item.label ? $t(item.label) : item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item title1="文档说明" :label="$t('textfieldfieldLabeldocumentdescription')">
					<el-input type="textarea" clearable v-model.trim="formData.remark"></el-input>
				</el-form-item>
			</el-form>
			<el-upload
				style="margin-left: 120px; margin-right: 40px"
				ref="upload"
				action="http://localhost:3000/apis/core/uploadnew/upload!upload.action"
				:limit="1"
				:on-exceed="handleExceed"
				:beforeUpload="handleBeforeUpload"
				:on-success="handleSuccess"
				:on-error="handleError"
				:data="upload_data"
				:auto-upload="false"
			>
				<template #trigger>
					<el-button icon="Document" type="primary">{{ $t("UPLOAD_selectFile") }}</el-button>
				</template>
				<el-button style="margin-left: 20px; margin-bottom: 8px" type="success" icon="UploadFilled" @click="submitUpload">
					{{ $t("UPLOAD_upload") }}
				</el-button>
			</el-upload>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { getdropSownSelection } from "/src/utils/util.js";
import { genFileId, ElMessage } from "element-plus";

const i18n = useI18n();
const ruleFormRef = ref();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const filetypeAr = getdropSownSelection("qualificationDocumentto");
const filelevelAr = getdropSownSelection("i18nCustomerapplicationFileDocumentlevel");

//表单字段
const formData = reactive({
	theme: "",
	filetype: "",
	filelevel: "",
	remark: ""
});

const rules = reactive({
	theme: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	filetype: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	filelevel: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	]
});

const upload_data = reactive({});
const upload = ref();

//当超出限制时，执行的钩子函数，在这里就是当触发了limit后执行
const handleExceed = files => {
	upload.value.clearFiles();
	const file = files[0];
	file.uid = genFileId();
	upload.value.handleStart(file);
};

//上传
const submitUpload = () => {
	//校验表单
	ruleFormRef.value.validate((valid, fields) => {
		if (valid) {
			upload.value.submit();
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};

//发送请求前执行的函数，在这里可以做一些条件判断，配置参数等
const handleBeforeUpload = file => {
	upload_data["cond.theme"] = formData.theme;
	upload_data["cond.filetype"] = formData.filetype;
	upload_data["cond.filelevel"] = formData.filelevel;
	upload_data["cond.remark"] = formData.remark;
	upload_data.jsonString = "{uploadFile:{businesscode:'CRM', businessobjectid:'" + props.condobj.businessobjectid + "'}}";
	return true;
};

//请求成功后执行的函数，相当于axios的then
const handleSuccess = response => {
	if (response.success) {
		props.condobj.dialogShow = false;
		props.condobj.success = true;
	}
};
//请求失败后执行的函数，相当于axios的catch
const handleError = error => {
	ElMessage.warning(i18n.t("Statement_failup") + error.errors + "！");
};
</script>

<style></style>
