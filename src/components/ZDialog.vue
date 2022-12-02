<template>
	<el-dialog
		ref="dialog"
		v-model="dialogShow"
		:width="width"
		:fullscreen="false"
		:class="customclass"
		:close-on-click-modal="false"
		:show-close="false"
		:destroy-on-close="true"
		@close="close"
		@open="open"
	>
		<template #header="{ close }">
			<div class="main-dialog-header">
				<span>{{ title }}</span>
				<div class="flx-align-center">
					<div class="main-dialog-icon" style="margin-right: 10px">
						<i class="iconfont layui-icon-extend-dialogquanping"></i>
					</div>
					<el-icon @click="close" class="main-dialog-icon">
						<CloseBold />
					</el-icon>
				</div>
			</div>
		</template>
		<div class="dialogContent-class">
			<slot></slot>
		</div>
		<div class="flex-row">
			<div class="flex-1"></div>
			<div class="stretching">
				<i style="font-size: 12px" class="iconfont layui-icon-extend-shurukuanglashen"></i>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref } from "vue";

// 父组件传入的参数
const props = defineProps({
	dialogShow: Boolean,
	title: String,
	width: String,
	customclass: String
});

let customclass = ref("main-dialog");
if (props.customclass) {
	customclass.value = "main-dialog " + props.customclass;
}

const close = () => {
	emits("close");
};
const open = () => {
	emits("open");
};

//注册emit // 抛出事件
const emits = defineEmits(["close", "open"]);
</script>

<style lang="scss">
.stretching {
	cursor: se-resize;
}
</style>
