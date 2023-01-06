<template>
	<div class="layout-search-dialog">
		<el-autocomplete
			v-model="searchMenu"
			ref="menuInputRef"
			:placeholder="$t('header.menuSearch')"
			:fetch-suggestions="querySearch"
			@select="handleClickMenu"
			size="default"
		>
			<template #prefix>
				<el-icon>
					<Search />
				</el-icon>
			</template>
			<template #default="{ item }">
				<el-icon>
					<Menu />
				</el-icon>
				<span> {{ item.value }} </span>
				<span v-show="false"> {{ language }} </span>
			</template>
		</el-autocomplete>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { GlobalStore } from "/src/store/globalStore.js";
import { MenuStore } from "@/store/modules/menu.js";
import { useI18n } from "vue-i18n";

const menuStore = MenuStore();

const router = useRouter();
const globalStore = GlobalStore();
const i18n = useI18n();

const menuInputRef = ref();
const searchMenu = ref("");
const searchMenuList = ref([]);

//递归，把最子级的菜单取出来
const getFlatArr = (menuList, menuName) => {
	menuList.forEach(item => {
		let text = menuName;
		if (item.children && item.children.length > 0) {
			if (text) {
				text = text + " > " + i18n.t(item.title);
			} else {
				text = i18n.t(item.title);
			}
			getFlatArr(item.children, text);
		} else {
			if (item.path) {
				let title = i18n.t(item.title);
				// if (text) {
				// 	title = text + " > " + title;
				// }
				searchMenuList.value.push({ value: title, path: item.path });
			}
		}
	});
};

const querySearch = (queryString, cb) => {
	const results = queryString ? searchMenuList.value.filter(createFilter(queryString)) : searchMenuList.value;
	cb(results);
};

// 筛选菜单
const createFilter = queryString => {
	return restaurant => {
		return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
	};
};

// 点击菜单跳转
const handleClickMenu = menuItem => {
	router.push(menuItem.path);
	menuInputRef.value.blur();
	searchMenu.value = "";
};

const language = computed(() => {
	searchMenuList.value = [];
	getFlatArr(menuStore.menuList);
	return globalStore.language;
});

onMounted(() => {
	getFlatArr(menuStore.menuList);
});
</script>
<style scoped lang="scss">
/* 菜单搜索样式 */
.layout-search-dialog {
	padding-left: 10px;
	padding-right: 10px;
	:deep(.el-autocomplete) {
		width: 300px;
	}
	:deep(.el-input__wrapper) {
		box-shadow: 0 0 0 1px #c0c4cc inset;
	}
	:deep(.is-focus) {
		box-shadow: 0 0 0 1px #409eff inset;
	}

	:deep(.el-input__wrapper):hover {
		box-shadow: 0 0 0 1px #409eff inset;
	}
}

.el-autocomplete__popper {
	.el-icon {
		position: relative;
		top: 2px;
		font-size: 16px;
	}
	span {
		margin: 0 0 0 10px;
		font-size: 14px;
	}
}
</style>
