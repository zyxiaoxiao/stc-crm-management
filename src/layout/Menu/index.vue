<template>
	<div
		class="menu"
		:style="{ width: isCollapse ? '65px' : menuWidth }"
		v-loading="loading"
		element-loading-text="Loading..."
		:element-loading-spinner="loadingSvg"
		element-loading-svg-view-box="-10, -10, 50, 50"
		element-loading-background="rgba(122, 122, 122, 0.01)"
	>
		<Logo :isCollapse="isCollapse"></Logo>
		<el-scrollbar>
			<el-menu
				:default-active="activeMenu"
				:router="true"
				:collapse="isCollapse"
				:collapse-transition="false"
				:unique-opened="true"
				background-color="#304156"
				text-color="#bfcbd9"
				active-text-color="#409eff"
			>
				<SubItem :menuList="menuList"></SubItem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "/src/store/modules/menu.js";
import { AuthStore } from "/src/store/modules/auth.js";
import { handleRouter } from "/src/utils/util.js";
import { BodyHeightStore } from "/src/store/bodyHeight.js";
import Logo from "./components/Logo.vue";
import SubItem from "./components/SubItem.vue";
import { loadingSvg } from "@/utils/svg";
import qs from "qs";
import http from "@/api/index.js";
import { GlobalStore } from "/src/store/globalStore.js";
import { useI18n } from "vue-i18n";

const route = useRoute();
const menuStore = MenuStore();
const authStore = AuthStore();
const bodyHeightStore = BodyHeightStore();
bodyHeightStore.setBodyHeight(document.body.clientHeight);
const globalStore = GlobalStore();
const i18n = useI18n();

let menuWidth = computed(() => {
	return i18n.locale.value == "zh" ? "220px" : "235px";
});

// 菜单加载 loading
const loading = ref(false);
onMounted(async () => {
	// 获取菜单列表
	loading.value = true;
	try {
		//调用请求获取
		const resData = await http.post(
			"/core/user/role!selectMenuVUETree.action",
			qs.stringify({
				"cond.usercode": globalStore.userInfo.usercode
			}),
			{
				headers: {
					noLoading: true //隐藏加载--
				}
			}
		);
		if (!resData) return;
		// 把路由菜单处理成一维数组（存储到 pinia 中）
		const dynamicRouter = handleRouter(resData);
		authStore.setAuthRouter(dynamicRouter);
		menuStore.setMenuList(resData);
	} finally {
		loading.value = false;
	}
});

const activeMenu = computed(() => route.path);
const isCollapse = computed(() => menuStore.isCollapse);
const menuList = computed(() => menuStore.menuList);

// aside 自适应
const screenWidth = ref(0);
// 监听窗口大小变化，合并 aside
const listeningWindow = () => {
	window.onresize = () => {
		return (() => {
			screenWidth.value = document.body.clientWidth;
			if (isCollapse.value === false && screenWidth.value < 1200) menuStore.setCollapse();
			if (isCollapse.value === true && screenWidth.value > 1200) menuStore.setCollapse();
			bodyHeightStore.setBodyHeight(document.body.clientHeight);
		})();
	};
};
listeningWindow();
</script>

<style lang="scss">
@import "./index.scss";
</style>
