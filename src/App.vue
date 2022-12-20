<template>
	<el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup name="App">
import { reactive, computed } from "vue";
import { GlobalStore } from "./store/globalStore.js";
// 配置element中英文
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { BodyHeightStore } from "/src/store/bodyHeight.js";

const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: false
});

// element 语言配置
const i18nLocale = computed(() => {
	if (globalStore.language && globalStore.language == "zh") return zhCn;
	if (globalStore.language == "en") return en;
	return "";
});

let fontSize = "14px";
let tabsHeaderHeight = "40px";
let tabsBoxDropdownTop = "8px";
let menuItemHeight = "56px";
let treeNodeContent = "33px";
let titleFontSize = "18px";

// 配置全局组件大小 (small/default(medium)/large)
const assemblySize = computed(() => {
	//全局改变字体大小
	if (globalStore.assemblySize == "large") {
		fontSize = "16px";
		tabsHeaderHeight = "40px";
		tabsBoxDropdownTop = "8px";
		menuItemHeight = "56px";
		treeNodeContent = "33px";
		titleFontSize = "18px";
	} else if (globalStore.assemblySize == "small") {
		fontSize = "12px";
		tabsHeaderHeight = "32px";
		tabsBoxDropdownTop = "4px";
		menuItemHeight = "48px";
		treeNodeContent = "26px";
		titleFontSize = "15px";
	} else {
		fontSize = "14px";
		tabsHeaderHeight = "40px";
		tabsBoxDropdownTop = "8px";
		menuItemHeight = "56px";
		treeNodeContent = "33px";
		titleFontSize = "18px";
	}
	document.documentElement.style.setProperty("--el-font-size-base", fontSize);
	document.documentElement.style.setProperty("--zy-tabs-header-height", tabsHeaderHeight);
	document.documentElement.style.setProperty("--zy-tabs-box-el-dropdown-top", tabsBoxDropdownTop);
	document.documentElement.style.setProperty("--el-menu-item-height", menuItemHeight);
	document.documentElement.style.setProperty("--zy-tree-node-content", treeNodeContent);
	document.documentElement.style.setProperty("--zy-title-font-size", titleFontSize);

	return globalStore.assemblySize;
});

const bodyHeightStore = BodyHeightStore();
let dialogHeight = computed(() => bodyHeightStore.dialogHeight + "px");
</script>
<style lang="scss">
.main-dialog {
	height: v-bind(dialogHeight);
}
.main-dialogHeight {
	max-height: v-bind(dialogHeight);
}
</style>
