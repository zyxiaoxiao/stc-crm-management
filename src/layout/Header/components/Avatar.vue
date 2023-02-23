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

	<!-- infoDialog  个人资料 -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog  修改密码-->
	<PasswordDialog ref="passwordRef"></PasswordDialog>

	<div class="logOut screen-full" @click="logOut">
		<span style="margin-right: 5px">{{ $t("header.logout") }}</span>
		<i class="iconfont layui-icon-extend-tuichu"></i>
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

//打开修改密码和个人信息弹窗;
const openDialog = refName => {
	if (refName == "infoRef") {
		infoRef.value?.openDialog();
	} else {
		passwordRef.value?.openDialog();
	}
};

let UserTitle = ref(
	globalStore.userInfo.corpdesc + " ( " + globalStore.userInfo.usercode + " ) " + globalStore.userInfo.userdesc
);

const logOut = () => {
	ElMessageBox.confirm(i18n.t("exitLoginPrompt"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("SRM_confirm"),
		cancelButtonText: i18n.t("SRM_cancel"),
		type: "warning"
	}).then(() => {
		router.push({
			name: "login"
		});
		globalStore.setToken("");
		// ElMessage({
		// 	type: "success",
		// 	message: "退出登录成功！"
		// });
	});
};
</script>
<style scoped lang="scss">
@import "../index.scss";
</style>
