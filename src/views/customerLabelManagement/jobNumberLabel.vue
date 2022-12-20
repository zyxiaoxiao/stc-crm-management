<template>
	<div>
		<div style="padding: 30px 70px 20px 70px">
			<el-form-item title1="工号" :label="$t('Message_EmployeeNumber')">
				<el-input clearable v-model.trim="barcodes.text"></el-input>
			</el-form-item>
			<div v-show="false" class="flx-center">
				<el-card id="jobNumberLabel" shadow="hover" class="flx-center" :style="{ width: srtwidth, height: srtheight }">
					<ReBarcode :text="barcodes.text" :type="barcodes.type" :options="barcodes.options" />
					<div style="text-align: center; margin-top: -15px; font-weight: bold">{{ barcodes.text }}</div>
				</el-card>
			</div>
		</div>
		<div class="flex-row" style="padding: 0px 20px 20px 0px">
			<div class="flex-1"></div>
			<el-button @click="props.condobj.dialogShow = false">{{ $t("menu_cancel") }}</el-button>
			<el-button type="primary" @click="bindPrint" :disabled="!barcodes.text"> {{ $t("menu_print") }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import printJS from "print-js";
import ReBarcode from "@/components/ReBarcode/index.vue";

const props = defineProps({
	condobj: {
		type: Object,
		default: {
			dialogShow: {
				type: Boolean,
				default: false
			}
		}
	}
});

let srtwidth = ref("256px");
let srtheight = ref("172px");

const barcodes = reactive({
	text: "",
	type: "CODE128",
	options: {
		height: 40,
		width: 1.5,
		fontSize: 0,
		font: "Arial Black"
	}
});

const bindPrint = () => {
	printJS({
		printable: "jobNumberLabel",
		type: "html",
		header: null,
		targetStyles: ["*"],
		style: "@page {margin:0}"
	});
};
</script>

<style></style>
