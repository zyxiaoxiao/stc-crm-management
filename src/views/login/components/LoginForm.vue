<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" :placeholder="$t('itemtitleloginusername')">
				<template #prefix>
					<el-icon class="el-input__icon">
						<user />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				type="password"
				v-model="loginForm.password"
				:placeholder="$t('menhupassword')"
				show-password
				autocomplete="new-password"
			>
				<template #prefix>
					<el-icon class="el-input__icon">
						<lock />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="validateCode">
			<div style="display: flex; width: 100%">
				<el-input v-model="loginForm.validateCode" :placeholder="$t('itemtitleVerificationCode')">
					<template #prefix>
						<el-icon class="el-input__icon">
							<lock />
						</el-icon>
					</template>
				</el-input>
				<SIdentify ref="identifyRef"></SIdentify>
			</div>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">{{ $t("buttoncommonreset") }} </el-button>
		<el-button icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
			{{ $t("tipbaselogin") }}
		</el-button>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { GlobalStore } from "/src/store/globalStore.js";
import { MenuStore } from "/src/store/modules/menu.js";
import { TabsStore } from "/src/store/modules/tabs.js";
import { ElMessage, ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";
import { loginApi } from "@/api/modules/login.js";

import SIdentify from "./identify.vue";

const i18n = useI18n();
const globalStore = GlobalStore();
const menuStore = MenuStore();
const tabStore = TabsStore();
const loading = ref(false);
const router = useRouter();
const loginFormRef = ref();
const identifyRef = ref();

//????????????
const loginRules = computed(() => {
	const rule = {
		username: [
			{
				required: true,
				message: i18n.t("portalcheckusernamenull"),
				trigger: "blur"
			}
		],
		password: [
			{
				required: true,
				message: i18n.t("portalcheckpassword"),
				trigger: "blur"
			}
		],
		validateCode: [
			{
				required: true,
				message: i18n.t("portalcheckvalidateCodeMsg"),
				trigger: "blur"
			}
		]
	};
	return rule;
});

// ??????????????????
const loginForm = reactive({
	username: "",
	password: "",
	validateCode: ""
});

//resetForm???????????????
const resetForm = formEl => {
	if (!formEl) return;
	formEl.resetFields();
};

// ?????? i18n.locale ???????????????
watch(
	() => i18n.locale.value,
	(count, prevCount) => {
		//count ??????prevCount ??????
		setTimeout(() => {
			resetForm(loginFormRef.value);
		}, 10);
	}
);

/**
 * @description ??????????????????
 * @return string
 */
const getTimeState = () => {
	// ??????????????????
	let timeNow = new Date();
	// ??????????????????
	let hours = timeNow.getHours();
	// ?????????????????????
	if (hours >= 0 && hours <= 10) return i18n.t("goodMorning") + ` ???`;
	if (hours >= 10 && hours <= 14) return i18n.t("goodNoon") + ` ????`;
	if (hours >= 14 && hours <= 18) return i18n.t("goodAfternoon") + ` ????`;
	if (hours >= 18 && hours <= 24) return i18n.t("goodEvening") + ` ????`;
};

// login ??????
const login = formEl => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			//???????????????????????????
			if (loginForm.validateCode != identifyRef.value.state.imgCode) {
				ElMessage.warning(i18n.t("portalcheckvalidateCodeMsgerr"));
				return;
			}
			loading.value = true;
			try {
				const requestLoginForm = {
					"loginInfo.usercode": loginForm.username,
					"loginInfo.userpass": loginForm.password
				};
				const res = await loginApi(requestLoginForm);
				if (res.loginMessage == "success") {
					// * ??????????????????????????????????????? menulist ??? tabs ??????
					menuStore.setMenuList([]);
					tabStore.closeMultipleTab();
					globalStore.setUserInfo(res.loginInfo[0]);
					// * ?????? token
					globalStore.setToken(res.loginInfo[0].userid);
					ElNotification({
						title: getTimeState(),
						message: i18n.t("loginSuccess"),
						type: "success",
						duration: 3000
					});
					router.push({
						name: "home"
					});
				} else {
					ElMessage.warning(res.loginMessage);
				}
			} finally {
				loading.value = false;
			}
		}
	});
};

onMounted(() => {
	// ??????enter????????????????????????
	document.onkeydown = e => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
