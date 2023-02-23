<template>
	<el-dialog v-model="dialogVisible" :title="$t('header.personalData')" width="800px" draggable>
		<el-form style="margin: 15px 15px" label-position="right" label-width="80px" :model="formData" ref="ruleFormRef">
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="12">
					<el-form-item title1="用户名" :label="$t('itemtitlebase_userusercode')">
						<el-input v-model.trim="formData.usercode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="名称" :label="$t('corpinfonametitle')">
						<el-input v-model.trim="formData.userdesc"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="手机" :label="$t('itemtitlebase_usermobile')">
						<el-input v-model.trim="formData.mobile"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="固话" :label="$t('personalusercolumnghtitle')">
						<el-input v-model.trim="formData.tel"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="邮箱" :label="$t('corpinfopanelemailtitle')">
						<el-input v-model.trim="formData.email"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="传真" :label="$t('personalusercolumncztitle')">
						<el-input v-model.trim="formData.fax"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="账户状态" :label="$t('personalusercolumnzhzttitle')">
						<el-input v-model.trim="formData.status1" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="注册时间" :label="$t('personalusercolumnzcsjtitle')">
						<el-input v-model.trim="formData.recordtime" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">{{ $t("menu_cancel") }}</el-button>
				<el-button type="primary" @click="save_handler">{{ $t("menu_save") }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

const i18n = useI18n();
const dialogVisible = ref(false);
const ruleFormRef = ref();

//表单字段
const formData = reactive({});

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

// 初始化数据源
const getFormData = async () => {
	const res = await http.post("/core/login/login!selectUserInfo.action", qs.stringify({}));
	if (res) {
		for (let key in res.loginInfo[0]) {
			formData[key] = res.loginInfo[0][key];
		}
	}
};

const save_handler = () => {
	ElMessageBox.confirm(i18n.t("Message_ConfirmSave"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/core/login/login!updateUserInfo.action",
			qs.stringify({
				jsonString: JSON.stringify({
					loginInfo: formData
				})
			})
		);
		if (res) {
			ElMessage.success(i18n.t("Message_saveSuccess"));
		}
	});
};

onMounted(() => {
	getFormData();
});

defineExpose({
	openDialog
});
</script>
