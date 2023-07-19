<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px" class="flex-1">
			<el-alert type="info" :title="$t('Message_OperationTip')" show-icon description="" :closable="false">
				<template #default>
					<div>
						{{ $t("Statement_filesize") }} 20 MB
						<br />
						{{ $t("Statement_filetype") }}
						pdf
					</div>
				</template>
			</el-alert>
			<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="ruleFormRef">
				<el-divider title1="上传附件" content-position="left">{{ $t("itemtitleyingjiupfile") }}</el-divider>
				<el-row class="main-align-items-center">
					<el-col :span="24">
						<el-form-item :label="$t('fieldcolumncustomercode') + ':'" title1="客户号">
							<el-input type="text" v-model="sformData.corpcode" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('columnCustomerName') + ':'" title1="客户名称">
							<el-input type="text" v-model="sformData.corpdesc" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('columntolockapplynum') + ':'" title1="申请单号">
							<el-input type="text" v-model="sformData.folderno" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('columnSealtypetitle') + ':'" title1="用印类型">
							<el-select v-model="sformData.sealname" class="full-width-input" filterable placeholder="Select">
								<el-option v-for="item in v_saleList" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('menubasePagingSealNumber') + ':'" title1="骑缝章数量">
							<el-select v-model="sformData.sealnumber" class="full-width-input" filterable placeholder="Select">
								<el-option v-for="item in numberlist" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item :label="$t('menubaseIsEncryption') + ':'" title1="是否加密">
							<el-select v-model="sformData.isencryption" class="full-width-input" filterable placeholder="Select">
								<el-option v-for="item in encryption" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-upload
				style="margin-left: 120px; margin-right: 40px"
				ref="upload"
				:action="globalStore.serverUrl + '/core/uploadnew/upload!uploadfile.action'"
				:limit="1"
				:on-exceed="handleExceed"
				:beforeUpload="handleBeforeUpload"
				:on-error="handleError"
				:data="upload_data"
				:auto-upload="false"
				:http-request="httprequestfun"
				:accept="['pdf', 'PDF']"
			>
				<template #trigger>
					<el-button icon="Document" type="primary">{{ $t("UPLOAD_selectFile") }}</el-button>
				</template>
				<el-button style="margin-left: 20px; margin-bottom: 8px" type="success" icon="UploadFilled" @click="submitUpload">
					{{ $t("SRM_stamp") }}
				</el-button>
			</el-upload>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { genFileId, ElMessage } from "element-plus";
import { GlobalStore } from "/src/store/globalStore.js";
//import download from 'downloadjs'
const globalStore = GlobalStore();

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//提佣上传附件初始化信息
const sformData = reactive({
	corpcode: "",
	corpdesc: "",
	folderno: "",
	sealname: "",
	sealnumber: "",
	isencryption: "",
	filename: ""
});
let v_saleList = reactive([]);

//是否加密
let encryption = [
	{
		value: "0",
		label: i18n.t("itemtitleMainAccountOrNot0")
	},
	{
		value: "1",
		label: i18n.t("itemtitleMainAccountOrNot1")
	}
];

//骑缝章数量
const numberlist = [
	{
		value: "1",
		label: "1"
	},
	{
		value: "2",
		label: "2"
	},
	{
		value: "3",
		label: "3"
	},
	{
		value: "4",
		label: "4"
	},
	{
		value: "5",
		label: "5"
	},
	{
		value: "6",
		label: "6"
	},
	{
		value: "7",
		label: "7"
	},
	{
		value: "8",
		label: "8"
	},
	{
		value: "9",
		label: "9"
	},
	{
		value: "10",
		label: "10"
	}
];

const upload_data = reactive({});
const upload = ref();

//当超出限制时，执行的钩子函数，在这里就是当触发了limit后执行
const handleExceed = files => {
	upload.value.clearFiles();
	const file = files[0];
	file.uid = genFileId();
	upload.value.handleStart(file);
};

const httprequestfun = async params => {
	let f = new FormData(); //表单数据以及文件
	f.append("file", params.file);
	let filename = params.file.name;
	f.append("jsonString", params.data.jsonString);
	const res = await http.post("/core/uploadnew/upload!uploadfile.action", f, {
		responseType: "blob"
	});
	if (res) {
		exportDownload(res, filename);
		props.condobj.dialogShow_documentsealfiledetail = false;
	}
};

//上传
const submitUpload = () => {
	if (sformData.folderno && sformData.sealname) {
		upload.value.submit();
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("errormsgerr8")
		});
	}
};

//发送请求前执行的函数，在这里可以做一些条件判断，配置参数等
const handleBeforeUpload = file => {
	if (file.name) {
		let fileName = file.name;
		fileName = fileName.toLowerCase();
		if (fileName.indexOf("pdf") < 0) {
			ElMessage.warning("上传需要PDF文件!");
			return false;
		}
		if (fileName.length > 200) {
			ElMessage.warning("Statement_longname");
			return false;
		}
	}
	sformData.filename = file.name; //文件名称
	upload_data.jsonString = JSON.stringify({ uploadPDFFileInfo: sformData });

	return true;
};

//页面初始化渲染完成执行
onMounted(() => {
	if (props.condobj) {
		let list = props.condobj.cond.v_saleList;
		let fdata = props.condobj.cond.fdata;
		if (list != null && list.length > 0) {
			for (let sale of list) {
				v_saleList.push(sale);
			}
		}
		if (fdata.folderno) {
			sformData.corpcode = fdata.rasclientid;
			sformData.corpdesc = fdata.compname;
			sformData.folderno = fdata.folderno;
			sformData.sealnumber = "1";
			sformData.isencryption = "1";
		}
	}
});

const exportDownload = async (data, fileName) => {
	//执行下载,{type : 'application/pdf;charset=utf-8''}
	// let b = new Blob([data]);
	let url = window.URL.createObjectURL(data);
	let link = document.createElement("a");
	link.download = fileName;
	link.style.display = "none";
	link.href = url;
	//link.setAttribute('download',fileName + '.' + fileFormat);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(link.href);
};

//请求失败后执行的函数，相当于axios的catch
const handleError = error => {
	ElMessage.warning(i18n.t("Statement_failup") + error.errors + "！");
};
</script>

<style></style>
