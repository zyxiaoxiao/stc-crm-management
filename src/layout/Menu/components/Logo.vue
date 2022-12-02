<template>
	<div class="logo flx-center">
		<img src="@/assets/images/logogj.png" alt="logo" />
		<span v-show="!isCollapse">{{ $t("logoText2") }}</span>
	</div>
</template>

<script setup>
const props = defineProps({ isCollapse: Boolean });
</script>

<style lang="scss">
@import "../index.scss";
</style>
