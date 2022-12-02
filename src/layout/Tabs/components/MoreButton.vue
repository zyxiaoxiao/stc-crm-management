<template>
	<el-dropdown trigger="click">
		<el-button size="small" type="primary">
			<span>{{ $t('tabs.more') }}</span>
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="closeCurrentTab">{{ $t('tabs.closeCurrent') }}</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">{{ $t('tabs.closeOther') }}</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">{{ $t('tabs.closeAll') }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
	import {
		TabsStore
	} from '/src/store/modules/tabs.js';
	import {
		HOME_URL
	} from '/src/config/config.js';

	const tabStore = TabsStore();

	// Close Current
	const closeCurrentTab = () => {
		if (tabStore.tabsMenuValue === HOME_URL) return;
		tabStore.removeTabs(tabStore.tabsMenuValue);
	};

	// Close Other
	const closeOtherTab = () => {
		tabStore.closeMultipleTab(tabStore.tabsMenuValue);
	};

	// Close All
	const closeAllTab = () => {
		tabStore.closeMultipleTab();
		tabStore.goHome();
	};
</script>

<style scoped lang="scss">
	@import '../index.scss';
</style>
