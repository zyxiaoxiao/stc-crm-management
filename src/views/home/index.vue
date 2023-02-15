<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="always" class="home-card">
					<span class="text">
						<a
							href="http://192.168.3.33:8764/crm/report/report.jsp?reportencoding=gbk&gotoFlag=1&report=customer_inactivite(20200408).raq&reportparameter=customer_inactivite_args(20181221).raq&sqlcount="
							target="_blank"
							>报表</a
						>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="always" class="home-card">
					<el-button size="small" type="primary" icon="Search" plain @click="wwa"> 是发送到发 </el-button>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="always" class="home-card"> 待开发---- </el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="always" class="home-card">待开发----</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="always" class="home-card"> 待开发---- </el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="always" class="home-card"> 待开发---- </el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup name="home">
import { onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import { useRouter } from "vue-router";
const globalStore = GlobalStore();
const router = useRouter();
const wwa = () => {
	let localStorageGlobalState = JSON.parse(localStorage.getItem("GlobalState"));
	if (localStorageGlobalState.token !== globalStore.token) {
	}
};

//页面初始化渲染完成执行
onMounted(() => {});
</script>

<style scoped lang="scss">
@import "./index.scss";

.home-card {
	height: 330px;
}

.el-row {
	margin-bottom: 20px;
}
</style>
