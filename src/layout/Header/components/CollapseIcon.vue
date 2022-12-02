<template>
	<!-- 折叠与展开 -->
	<div @click="menuStore.setCollapse()" class="screen-full">
		<i
			:class="['collapse-icon iconfont', !isCollapse ? 'layui-icon-extend-caidanzuo' : 'layui-icon-extend-caidanyou']"></i>
	</div>
</template>

<script setup>
	import {
		computed
	} from 'vue';
	import {
		MenuStore
	} from '/src/store/modules/menu.js';
	const menuStore = MenuStore();
	const isCollapse = computed(() => menuStore.isCollapse);
</script>

<style scoped lang="scss">
	@import '../index.scss';
</style>
