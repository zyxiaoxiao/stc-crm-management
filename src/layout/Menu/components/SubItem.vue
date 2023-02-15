<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<i v-if="subItem.iconclass" style="margin-right: 10px; font-size: 18px" :class="['iconfont', subItem.iconclass]"></i>
				<el-icon v-else-if="subItem.icon">
					<component :is="subItem.icon"></component>
				</el-icon>
				<!-- <el-icon v-else> <Link /> </el-icon> -->
				<i v-else style="margin-right: 10px; font-size: 18px" :class="['iconfont', 'layui-icon-extend-file-list--fill']"></i>
				<el-tooltip
					placement="top"
					effect="light"
					:show-after="600"
					:offset="-13"
					:disabled="!subItem?.showTooltip"
					:content="$t(subItem.title)"
				>
					<span :ref="el => setMenuTextRef(el, subItem.path)" @mouseover="hoverMenu(subItem)" class="menu-i-span">{{
						$t(subItem.title)
					}}</span>
				</el-tooltip>
			</template>
			<SubItem :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path">
			<i v-if="subItem.iconclass" style="margin-right: 10px; font-size: 18px" :class="['iconfont', subItem.iconclass]"></i>
			<el-icon v-if="subItem.icon">
				<component :is="subItem.icon"></component>
			</el-icon>
			<template v-if="!subItem.isLink" #title>
				<el-tooltip
					placement="top"
					effect="light"
					:show-after="600"
					:offset="-13"
					:disabled="!subItem?.showTooltip"
					:content="$t(subItem.title)"
				>
					<span :ref="el => setMenuTextRef(el, subItem.path)" @mouseover="hoverMenu(subItem)" class="menu-i-span">{{
						$t(subItem.title)
					}}</span>
				</el-tooltip>
			</template>
			<template v-else #title>
				<el-tooltip
					placement="top"
					effect="light"
					:show-after="600"
					:offset="-13"
					:disabled="!subItem?.showTooltip"
					:content="$t(subItem.title)"
				>
					<a
						:ref="el => setMenuTextRef(el, subItem.path)"
						@mouseover="hoverMenu(subItem)"
						class="menu-href menu-i-span"
						:href="subItem.isLink"
						target="_blank"
						>{{ $t(subItem.title) }}</a
					>
				</el-tooltip>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup>
import { ref, toRaw, nextTick, computed } from "vue";
const props = defineProps({
	menuList: Array
});

// 存储菜单文本dom元素
const menuTextRef = {};
// 赋值动态菜单文本ref到变量
const setMenuTextRef = (el, key) => {
	if (el) {
		menuTextRef[key] = el;
	}
};
// 存放菜单是否存在showTooltip属性标识
const hoverMenuMap = new WeakMap();
function hoverMenu(key) {
	if (key?.path) {
		// 如果当前菜单showTooltip属性已存在，退出计算
		if (hoverMenuMap.get(key?.path)) return;
		nextTick(() => {
			console.log(menuTextRef[key.path]?.scrollWidth);
			console.log(menuTextRef[key.path]?.clientWidth);
			// 如果文本内容的整体宽度大于其可视宽度，则文本溢出
			menuTextRef[key.path]?.scrollWidth > menuTextRef[key.path]?.clientWidth
				? (key.showTooltip = true)
				: (key.showTooltip = false);
			hoverMenuMap.set(key?.path, true);
		});
	}
}
</script>

<style scoped>
.menu-i-span {
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 20px;
	outline: "none";
}
</style>

<style lang="scss">
@import "../index.scss";
</style>
