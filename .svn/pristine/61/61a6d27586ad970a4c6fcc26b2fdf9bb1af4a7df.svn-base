<template>
	<el-tooltip v-if="visible" effect="light" placement="right">
		<el-icon :size="20" color="#F56C6C"><InfoFilled /></el-icon>
		<template #content>
			<span style="color: #f56c6c; font-size: 12px"> {{ $t("Message_Change") }} {{ oldTxtValue }}</span>
		</template>
	</el-tooltip>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const visible = ref(false);

// 父组件传入的参数
const props = defineProps({
	currentValue: null, //当前值
	oldValue: null, //旧值
	currentTypeData: Array, //k、v 值
	oldTypeData: Array //k、v 值
});
let currentTxtValue = ref(props.currentValue);
let oldTxtValue = ref(props.oldValue);

// 监听 props.currentValue 变化
watch(
	() => [props.currentValue, props.oldValue, props.currentTypeData, props.oldTypeData],
	(count, prevCount) => {
		//count 新，prevCount 旧值
		currentTxtValue.value = props.currentValue;
		oldTxtValue.value = props.oldValue;

		if (props.oldTypeData) {
			for (let item of props.oldTypeData) {
				if (item.value == oldTxtValue.value) {
					oldTxtValue.value = i18n.t(item.label);
					break;
				}
			}
		}

		if (props.currentTypeData) {
			if (currentTxtValue.value == oldTxtValue.value) {
				visible.value = false;
			} else {
				for (let item of props.currentTypeData) {
					if (item.value == currentTxtValue.value) {
						currentTxtValue.value = i18n.t(item.label);
						if (currentTxtValue.value == oldTxtValue.value) {
							visible.value = false;
						} else {
							visible.value = true;
						}
						return;
					}
				}
			}
		} else {
			if (currentTxtValue.value == oldTxtValue.value) {
				visible.value = false;
			} else {
				visible.value = true;
			}
		}
	}
);
</script>
<style></style>
