<template>
	<div>
		<!-- 我的待办 -->
		<myToDo></myToDo>
		<group2></group2>
	</div>
</template>

<script setup name="home">
import { onMounted } from "vue";
import myToDo from "./myToDo.vue";
import group2 from "./group2.vue";

//页面初始化渲染完成执行
onMounted(() => {});
</script>

<style scoped lang="scss">
@import "./index.scss";

.home-card {
	height: 330px;
}
</style>
