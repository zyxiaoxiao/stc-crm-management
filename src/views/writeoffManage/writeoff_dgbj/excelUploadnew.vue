<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px" class="flex-1">
			<el-alert type="info" :title="$t('Message_OperationTip')" show-icon description="" :closable="false">
				<template #default>
					<div>
						{{ $t("Statement_filesize") }} 50 MB
						<br />
						{{ $t("Statement_filetype") }}
						tif,jpg,png,gif,bmp,txt,html,xml,pdf,doc,xls,ppt,docx,xlsx,pptx,zip,rar,mp3,mov,avi,mpp
					</div>
				</template>
			</el-alert>
			<el-upload
				style="margin-left: 120px; margin-right: 40px"
				ref="upload"
				:action="excelpath"
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
		<el-dialog v-model="dialogSendFormVisible" @close="closedialogSendFormVisible" :title="$t('UPLOAD_Tip')">
			<el-form :model="dform" style="margin: 25px 15px">
				<el-form-item label="1、" label-width="140px">
					<span v-html="dform.exceldata"></span>
				</el-form-item>
				<el-form-item label="2、" label-width="140px">
					<span v-html="dform.excelupload"></span>
					<el-link :href="dform.excelurl" type="primary">{{ $t("DOWNLOAD_download") + "" }}</el-link>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closedialogSendFormVisible">{{ $t("SRM_close") }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
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
const excelpath = ref("");
let loading = ref({});
let dform = reactive({ exceldata: "导入失败；", excelupload: "模板详细提示信息：", excelurl: "https://element.eleme.io" }); //下载信息

//导入Excel
let dialogSendFormVisible = ref(false);

//调用加载框、阴影遮盖
const openFullScreen2 = () => {
	loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)"
	});
	//loading.close()
};

//关闭提示窗口
const closedialogSendFormVisible = () => {
	dialogSendFormVisible.value = false;
	props.condobj.uploadnewDialogShow = false;
};

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
	upload_data.jsonString =
		"{uploadFile:{businesscode:'" +
		props.condobj.cond.businesscode +
		"', businessobjectid:'" +
		props.condobj.cond.businessobjectid +
		"'}}";
	openFullScreen2();
	return true;
};

//页面初始化渲染完成执行
onMounted(() => {
	if (props.condobj) {
		let path = globalStore.serverUrl + "/crm/impwriteoff/impwriteoff!importExcelCurrencyWriteoffInfos.action";
		excelpath.value = path;
	}
});

//请求成功后执行的函数，相当于axios的then
const handleSuccess = response => {
	//关闭加载框
	loading.close();
	try {
		let error = response.errors;
		let str = new Array();
		str = error.split("|"); // “成功条数|失败条数|文件路径”
		if (str.length == 1) {
			ElMessage.warning(str[0]);
			props.condobj.uploadnewDialogShow = false;
		} else {
			let successNumbers = str[0];
			let failureNumbers = str[1];
			let path = str[2];
			dform.excelurl = globalStore.serverUrl + path;
			if (successNumbers == 0 && failureNumbers == 0) {
			} else {
				dform.exceldata =
					i18n.t("itemtitlemdm_base_specialitysynstate0") +
					successNumbers +
					i18n.t("UPLOAD_ufail") +
					failureNumbers +
					i18n.t("UPLOAD_tiao");
			}
			dialogSendFormVisible.value = true;
		}
	} catch (e) {
		props.condobj.uploadnewDialogShow = false;
	}
};
//请求失败后执行的函数，相当于axios的catch
const handleError = error => {
	ElMessage.warning(i18n.t("Statement_failup") + error.errors + "！");
};
</script>

<style></style>
