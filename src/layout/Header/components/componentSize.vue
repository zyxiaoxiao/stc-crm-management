<template>
	<el-tooltip effect="dark" :content="$t('header.componentSize')" placement="bottom">
		<el-dropdown trigger="click" @command="handleSetAssemblySize">
			<i class="screen-full icon-style iconfont layui-icon-extend-contentright"></i>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item :disabled="commandge === 'large'" command="large">{{ $t("header.large") }}</el-dropdown-item>
					<el-dropdown-item :disabled="commandge === 'default'" command="default">{{ $t("header.default") }}</el-dropdown-item>
					<el-dropdown-item :disabled="commandge === 'small'" command="small">{{ $t("header.small") }}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</el-tooltip>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "/src/store/globalStore.js";
const i18n = useI18n();
const globalStore = GlobalStore();
const commandge = computed(() => globalStore.assemblySize);

// 切换组件大小
const handleSetAssemblySize = size => {
	globalStore.setAssemblySizeSize(size);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
