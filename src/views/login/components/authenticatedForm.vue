<template>
	<el-alert title="由于你长时间不操作或者已经登出，为了保证安全性请您认证身份" type="error" :closable="false" :center="true" />
	<div style="margin-left: 20px; margin-right: 20px; margin-top: 20px">
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
			<el-form-item prop="username">
				<el-input v-model="props.loginForm.username" placeholder="用户名">
					<template #prefix>
						<el-icon class="el-input__icon">
							<user />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="props.loginForm.password" placeholder="密码" show-password autocomplete="new-password">
					<template #prefix>
						<el-icon class="el-input__icon">
							<lock />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

//父组件传入的参数;
const props = defineProps({
	loginForm: {
		type: Object,
		default: {
			username: String,
			password: String
		}
	}
});

const i18n = useI18n();

//登录验证
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
		]
	};
	return rule;
});
</script>

<style scoped lang="scss"></style>
