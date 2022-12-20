<template>
	<el-dropdown class="screen-full" trigger="click" @command="handleSetLanguage">
		<span>
			<el-tooltip effect="dark" :content="$t('header.language')" placement="bottom">
				<i class="iconfont layui-icon-extend-zhongyingwen icon-style"></i>
			</el-tooltip>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="language && language === 'zh'" command="zh">简体中文</el-dropdown-item>
				<el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "/src/store/globalStore.js";
import { getBrowserLang } from "/src/utils/util.js";

const i18n = useI18n();
const globalStore = GlobalStore();
const language = computed(() => globalStore.language);

// 切换语言
const handleSetLanguage = lang => {
	i18n.locale.value = lang;
	globalStore.updateLanguage(lang);
};

onMounted(() => {
	handleSetLanguage(language.value || getBrowserLang());
});
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
