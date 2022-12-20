<script setup name="ReBarcode">
import JsBarcode from "jsbarcode";
import { ref, onMounted, watch } from "vue";
const props = defineProps({
	tag: {
		type: String,
		default: "canvas"
	},
	text: {
		type: String,
		default: null
	},
	// 完整配置 https://github.com/lindell/JsBarcode/wiki/Options
	options: {
		type: Object,
		default() {
			return {};
		}
	},
	// type 相当于 options.format，如果 type 和 options.format 同时存在，type 值优先；
	type: {
		type: String,
		default: "CODE128"
	}
});

const wrapEl = ref(null);

onMounted(() => {
	if (props.text) {
		const opt = { ...props.options, format: props.type };
		JsBarcode(wrapEl.value, props.text, opt);
	}
});

//监听
watch(
	() => props,
	(newValue, oldValue) => {
		if (props.text) {
			const opt = { ...props.options, format: props.type };
			JsBarcode(wrapEl.value, props.text, opt);
		}
	},
	{ deep: true } //深度监听
);
</script>

<template>
	<component :is="tag" ref="wrapEl" />
</template>
