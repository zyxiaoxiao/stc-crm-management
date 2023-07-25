<template>
	<div class="all-height flex-column">
		<div style="margin: 10px; text-align: right">
			<el-button size="small" type="primary" icon="Document" plain @click="saveHandler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
		</div>
		<el-form :model="formData" :rules="rules" ref="ruleFormRef" label-position="right" label-width="120px">
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="账户号" :label="$t('companypanelaccountnotitle')" prop="accountno">
						<el-input type="text" clearable v-model.trim="formData.accountno"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="账户名" :label="$t('companypanelaccountnametitle')" prop="accountcode">
						<el-input type="text" clearable v-model.trim="formData.accountcode"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="是否为主账户" :label="$t('companypanelOrNotMainAccounttitle')" prop="ismain">
						<el-select v-model="formData.ismain" class="full-width-input" clearable filterable>
							<el-option
								v-for="item in whetherAr"
								:key="item.value"
								:label="item.label ? $t(item.label) : item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="开户行" :label="$t('companypanelaccountbanktitle')">
						<el-input type="text" clearable v-model.trim="formData.accountbank"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="银行地址" :label="$t('companypanelbankadresstitle')">
						<el-input type="text" clearable v-model="formData.bankadress"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="SWIFT" :label="$t('companypanelswifttitle')">
						<el-input type="text" clearable v-model="formData.swift"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="首次交易日期" prop="address" :label="$t('corpinfofirstTransactiondatetitle')">
						<el-date-picker
							v-model="formData.firstdealtime"
							type="date"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="文档名称" :label="$t('columnjxFileName')" prop="filename">
						<el-input type="text" clearable v-model="formData.filename" readonly>
							<template #append>
								<el-button-group>
									<el-button type="primary" plain icon="View" @click="downloadAccountfiles">{{
										$t("messagecorelook")
									}}</el-button>
									<el-button type="primary" plain icon="FolderChecked" @click="selectAccountFile">{{
										$t("qualificationDocumenttoSelectFile")
									}}</el-button>
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item title1="备注信息" :label="$t('panelcolumnRemark')">
						<el-input type="textarea" clearable v-model="formData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- 账户信息选择文件 -->
		<ZDialog
			v-model="accountFilesList.dialogShow"
			:title="$t('companypanel3CustomerQualificationFileInformationtitle')"
			width="95%"
			@close="accountFilesClose"
		>
			<customerfileselect :condobj="accountFilesList"></customerfileselect>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage } from "element-plus";
import { downloadFile } from "/src/utils/fileUtil.js";
import ZDialog from "/src/components/ZDialog.vue";
import customerfileselect from "../customerSelete/customerfile_select.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const ruleFormRef = ref();

//表单字段
const formData = reactive({
	accountid: props.condobj.accountid,
	corpid: props.condobj.corpid,
	accountno: "",
	accountcode: "",
	ismain: "0",
	accountbank: "",
	bankadress: "",
	swift: "",
	firstdealtime: "",
	fileid: "",
	filename: "",
	remark: "",
	modifypersoncode: "",
	modifypersondesc: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	taxnumber: ""
});
//校验
const rules = reactive({
	accountno: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	accountcode: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	ismain: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	filename: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	]
});

//是否
const whetherAr = getdropSownSelection("whether");

//查询账户是否已经有主账户了
let ismain1 = false;
let ismain2 = false;
const getIsmain = async () => {
	const res = await http.post(
		"/crm/account/crmaccount!selectMainCrmaccountInfoByCond.action",
		qs.stringify({ "cond.corpid": props.condobj.corpid })
	);
	if (res.temp_crmaccountInfos.length > 0) {
		ismain1 = true;
	}
};
getIsmain();

//根据 accountid 初始化数据源
const getFormData = async () => {
	let params = {
		"cond.corpid": props.condobj.corpid,
		"cond.accountid": props.condobj.accountid
	};
	const res = await http.post("/crm/account/crmaccount!selectCrmaccountInfoByCond.action", qs.stringify(params));
	for (let key in res.crmaccountInfos[0]) {
		//判定 crmaccountInfos 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			formData[key] = res.crmaccountInfos[0][key];
		}
	}

	//判断是不是主账户
	if (res.crmaccountInfos[0]["ismain"] == 1) {
		ismain2 = true;
	}
};
if (props.condobj.accountid) {
	getFormData();
}

//下载账户对应的资质文件
const downloadAccountfiles = () => {
	if (formData.fileid && formData.filename) {
		downloadFile("/core/uploadnew/upload!download.action", formData.filename, {
			"cond.crm": "crm",
			"cond.fileid": formData.fileid
		});
	}
};

// 账户信息选择文件弹出层参数
const accountFilesList = reactive({
	dialogShow: false,
	corpid: props.condobj.corpid,
	arrayList: []
});
//选择账户对应的资质文件
const selectAccountFile = () => {
	accountFilesList.arrayList = [];
	accountFilesList.dialogShow = true;
};
//选择账户对应的资质文件 回调方法
const accountFilesClose = () => {
	if (accountFilesList.arrayList.length > 0) {
		formData.fileid = accountFilesList.arrayList[0].fileid;
		formData.filename = accountFilesList.arrayList[0].filename;
	}
};

//保存
const saveHandler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			//ismain1当前账户列表是否有主账户，
			//ismain2当前账户是否主账户，
			//"提示","只能有一个主账户!"，(当前账户列表,有主账户，并且不是当前账户)
			if (formData.ismain == 1 && ismain1 && !ismain2) {
				ElMessage.warning(i18n.t("Message_MainaccountUnique"));
				return false;
			}

			let jsonString = {
				crmaccountInfos: [formData]
			};
			let params = {
				"cond.corpid": props.condobj.corpid,
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post("/crm/account/crmaccount!saveCrmaccountInfos.action", qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				props.condobj.success = true;
				props.condobj.dialogShow = false;
			}
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};
</script>

<style></style>
