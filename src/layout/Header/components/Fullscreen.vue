<template>
	<el-tooltip effect="dark" :content="isFullscreen ? $t('header.exitFullScreen') : $t('header.fullScreen')" placement="bottom">
		<i
			class="screen-full icon-style"
			@click="toggle"
			:class="['iconfont', isFullscreen ? 'layui-icon-extend-quanpingsuoxiao' : 'layui-icon-extend-quanpingxianshi']"
		></i>
	</el-tooltip>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
