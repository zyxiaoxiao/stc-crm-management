<template>
	<div class="login-container flx-center">
		<div class="login-back flx-center">
			<div class="login-box">
				<el-switch
					v-model="languageValue"
					class="language"
					inline-prompt
					active-text="中"
					inactive-text="EN"
					style="--el-switch-on-color: #409eff; --el-switch-off-color: #409eff"
					@change="onLanguageChange"
				/>
				<div class="login-left">
					<img src="@/assets/images/login_backround3.png" alt="login" style="" />
				</div>
				<div class="login-right">
					<div class="login-logo">
						<img class="login-icon" src="@/assets/images/logogj.png" alt="" />
						<p class="logo-text">{{ $t("logoText") }}</p>
					</div>
					<div class="login-form">
						<LoginForm ref="loginRef"></LoginForm>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup name="login">
import LoginForm from "./components/LoginForm.vue";
import { ref, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import { getBrowserLang } from "/src/utils/util.js";
import { useI18n } from "vue-i18n";
const i18n = useI18n();

const globalStore = GlobalStore();
const lang = ref("zh");

//false 中文  true 英文
const languageValue = ref(false);
// 切换语言
const onLanguageChange = val => {
	if (val) {
		lang.value = "en";
		languageValue.value = true;
	} else {
		lang.value = "zh";
		languageValue.value = false;
	}
	i18n.locale.value = lang.value;
	globalStore.updateLanguage(lang.value);
};

onMounted(() => {
	lang.value = globalStore.language || getBrowserLang();
	onLanguageChange(lang.value == "en");
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
