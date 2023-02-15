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
			<el-upload
				style="margin-left: 40px; margin-right: 40px; margin-top: 20px"
				ref="upload"
				:action="globalStore.serverUrl + condobj.uploadUrl"
				:limit="1"
				:on-exceed="handleExceed"
				:beforeUpload="handleBeforeUpload"
				:on-success="handleSuccess"
				:on-error="handleError"
				:data="condobj.uploadParameter"
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { genFileId, ElMessage } from "element-plus";
import { GlobalStore } from "/src/store/globalStore.js";
const globalStore = GlobalStore();

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: {
		uploadUrl: "",
		uploadParameter: {}, //参数
		success: false,
		dialogShow: true
	}
});

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
	upload.value.submit();
};

//发送请求前执行的函数，在这里可以做一些条件判断，配置参数等
const handleBeforeUpload = file => {
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
