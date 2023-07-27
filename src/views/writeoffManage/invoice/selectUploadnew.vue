<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px" class="flex-1">
			<el-alert type="info" :title="$t('Message_OperationTip')" show-icon description="" :closable="false">
				<template #default>
					<div>
						{{ $t("Statement_filesize") }} 50 MB
						<br />
						{{ $t("Statement_filetype") }}
						pdf 、ofd
					</div>
				</template>
			</el-alert>
			<el-upload
				style="margin-left: 120px; margin-right: 40px"
				ref="upload"
				:action="globalStore.serverUrl + '/core/uploadnew/upload!uploadInvoiceFile.action'"
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
import { genFileId, ElMessage, ElLoading } from "element-plus";
import { GlobalStore } from "/src/store/globalStore.js";
const globalStore = GlobalStore();

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const upload_data = reactive({});
const upload = ref();
let loading = ref({});

//当超出限制时，执行的钩子函数，在这里就是当触发了limit后执行
const handleExceed = files => {
	upload.value.clearFiles();
	const file = files[0];
	file.uid = genFileId();
	upload.value.handleStart(file);
};
//调用加载框、阴影遮盖
const openFullScreen2 = () => {
	loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)"
	});
	//loading.close()
};

//上传
const submitUpload = () => {
	if (props.condobj.cond.businessobjectid) {		
		upload.value.submit();
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Search_Empty")
		});
	}
};

//发送请求前执行的函数，在这里可以做一些条件判断，配置参数等
const handleBeforeUpload = file => {
	let fileName = file.name;
	let filetype = fileName.substring(fileName.indexOf(".") + 1, fileName.length);
	filetype = filetype.toLowerCase();
	if (!(filetype == "pdf" || filetype == "ofd")) {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Statement_filetype") + " pdf 、ofd !"
		});
		return false;
	}
	if (fileName.length > 200) {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Statement_longname")
		});
		return false;
	}
	openFullScreen2();
	upload_data.jsonString =
		"{uploadFile:{businesscode:'" +
		props.condobj.cond.businesscode +
		"', businessobjectid:'" +
		props.condobj.cond.businessobjectid +
		"',  version:'0'}}";
	return true;
};

//请求成功后执行的函数，相当于axios的then
const handleSuccess = response => {
	//关闭加载框
	loading.close();
	if (response.success) {		
		props.condobj.uploadnewDialogShow = false;
		props.condobj.objlist.success = true;
	}
};

//请求失败后执行的函数，相当于axios的catch
const handleError = error => {
	ElMessage.warning(i18n.t("Statement_failup") + error.errors + "！");
};
</script>

<style></style>
