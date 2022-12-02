<template>
	<el-dropdown trigger="click">
		<!-- 个人信息和登出 -->
		<div class="screen-full username">{{ UserTitle }}</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDialog('infoRef')">{{ $t("header.personalData") }}</el-dropdown-item>
				<el-dropdown-item @click="openDialog('passwordRef')">{{ $t("header.changePassword") }} </el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>

	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>

	<div class="logOut screen-full" @click="logOut">
		<i class="iconfont layui-icon-extend-tuichu"></i>
		<span style="margin-left: 5px">登出</span>
	</div>
</template>
<script setup>
import { ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { GlobalStore } from "/src/store/globalStore.js";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { useI18n } from "vue-i18n";

const router = useRouter();
const globalStore = GlobalStore();
const i18n = useI18n();

const infoRef = ref(null);
const passwordRef = ref(null);

// 打开修改密码和个人信息弹窗
// const openDialog = (refName) => {
// 	console.log(refName);
// 	console.log(infoRef);
// 	if (refName == "infoRef") {
// 		infoRef.value?.openDialog();
// 	} else {
// 		passwordRef.value?.openDialog();
// 	}
// }

let UserTitle = ref(
	globalStore.userInfo.corpdesc + " ( " + globalStore.userInfo.usercode + " ) " + globalStore.userInfo.userdesc
);

const logOut = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		router.push({
			name: "login"
		});
		globalStore.setToken("");
		ElMessage({
			type: "success",
			message: "退出登录成功！"
		});
	});
};
</script>
<style scoped lang="scss">
@import "../index.scss";
</style>
