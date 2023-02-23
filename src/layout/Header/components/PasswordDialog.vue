<template>
	<el-dialog v-model="dialogVisible" :title="$t('header.changePassword')" width="500px" draggable>
		<el-form
			style="margin: 15px 15px"
			label-position="right"
			label-width="70px"
			:model="formData"
			:rules="rules"
			ref="ruleFormRef"
		>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item title1="用户名" :label="$t('itemtitlebase_userusercode')">
						<el-input v-model.trim="formData.usercode" disabled autocomplete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item title1="原密码" :label="$t('selfOriginalpassword')">
						<el-input v-model.trim="formData.userpass" type="password" show-password autocomplete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item title1="新密码" :label="$t('selfNewpassword')" prop="password">
						<el-input v-model.trim="formData.password" type="password" show-password autocomplete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item title1="确认密码" :label="$t('itemtitlebase_usersurepassword')" prop="password2">
						<el-input v-model.trim="formData.password2" type="password" show-password autocomplete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">{{ $t("menu_cancel") }}</el-button>
				<el-button type="primary" @click="save_handler(ruleFormRef)">{{ $t("menu_save") }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
const dialogVisible = ref(false);

const i18n = useI18n();
const ruleFormRef = ref();

//表单字段
const formData = reactive({});
const validatePass = (rule, value, callback) => {
	if (value === "") {
		callback(new Error(i18n.t("menhujinduPleaseenterapassword")));
	} else {
		if (formData.userpass == value) {
			callback(new Error(i18n.t("itemtitleTheNewPasswordIsTheSameAsTheOldOne")));
		} else if (formData.password2 !== "") {
			if (!ruleFormRef.value) return;
			ruleFormRef.value.validateField("password2", () => null);
		}
		callback();
	}
};
const validatePass2 = (rule, value, callback) => {
	if (value === "") {
		callback(new Error(i18n.t("menhujinduPleaseenteryourpasswordagain")));
	} else if (value !== formData.password) {
		callback(new Error(i18n.t("selfTwotimesthepasswordisnotconsistent")));
	} else {
		callback();
	}
};
const rules = reactive({
	password: [{ validator: validatePass, trigger: "blur" }],
	password2: [{ validator: validatePass2, trigger: "blur" }]
});

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			const res = await http.post(
				"/core/user/user!changePassword.action",
				qs.stringify({
					jsonString: JSON.stringify({
						userInfo: formData
					})
				})
			);
			if (res) {
				ElMessage.success(i18n.t("Message_AlterSuccess"));
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

// 初始化数据源
const getFormData = async () => {
	const res = await http.post("/core/user/user!selectUserInfoById.action", qs.stringify({}));
	if (res) {
		formData["userid"] = res.userInfo[0]["userid"];
		formData["usercode"] = res.userInfo[0]["usercode"];
		formData["username"] = res.userInfo[0]["username"];
	}
};

onMounted(() => {
	getFormData();
});

defineExpose({
	openDialog
});
</script>
