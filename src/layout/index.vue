<template>
	<el-container>
		<el-aside>
			<Menu></Menu>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
				<Tabs v-if="themeConfig.tabs"></Tabs>
			</el-header>
			<el-main>
				<router-view v-slot="{ Component, route }">
					<transition appear name="fade-transform" mode="out-in">
						<keep-alive :include="cacheRouter">
							<component :is="Component" :key="route.path"></component>
						</keep-alive>
					</transition>
				</router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
import Menu from "./Menu/index.vue";
import Header from "./Header/index.vue";
import Tabs from "./Tabs/index.vue";
import cacheRouter from "/src/routers/cacheRouter.js";
import { computed } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
// import { useRouter } from "vue-router";

//const router = useRouter();
const globalStore = GlobalStore();

const themeConfig = computed(() => globalStore.themeConfig);

//每隔2秒执行一次;
//说明：同一个浏览器 同一个网站 cookie为同一个，
//当登录一个账户，然后打开新窗口 又登录其他账户时，需要把当前登录的账户返回登录界面。
//所以 监听当前的 pinia 和 localStorage 缓存的token 不一样时，说明cookie已经被其他的账户登录了，所以退回到登录界面
// setInterval(() => {
// 	let localStorageGlobalState = JSON.parse(localStorage.getItem("GlobalState"));
// 	if (localStorageGlobalState.token !== globalStore.token) {
// 		router.push({
// 			name: "login"
// 		});
// 	}
// }, 2000);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
