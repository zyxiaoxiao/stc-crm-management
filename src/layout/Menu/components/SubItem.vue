<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<i v-if="subItem.iconclass" style="margin-right: 10px; font-size: 18px" :class="['iconfont', subItem.iconclass]"></i>
				<el-icon v-else-if="subItem.icon">
					<component :is="subItem.icon"></component>
				</el-icon>
				<el-icon v-else>
					<List />
				</el-icon>
				<span class="menu-i-span">{{ $t(subItem.title) }}</span>
				<!-- <el-tooltip :content="$t(subItem.title)" placement="right">
					<span class="menu-i-span">{{ $t(subItem.title) }}</span>
				</el-tooltip> -->
			</template>
			<SubItem :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path">
			<i v-if="subItem.iconclass" style="margin-right: 10px; font-size: 18px" :class="['iconfont', subItem.iconclass]"></i>
			<el-icon v-if="subItem.icon">
				<component :is="subItem.icon"></component>
			</el-icon>
			<template v-if="!subItem.isLink" #title>
				<span class="menu-i-span">{{ $t(subItem.title) }}</span>
			</template>
			<template v-else #title>
				<a class="menu-href menu-i-span" :href="subItem.isLink" target="_blank">{{ $t(subItem.title) }}</a>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup>
const props = defineProps({
	menuList: Array
});
</script>

<style scoped>
.menu-i-span {
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 20px;
}
</style>

<style lang="scss">
@import "../index.scss";
</style>
