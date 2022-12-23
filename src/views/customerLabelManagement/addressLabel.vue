<template>
	<div class="all-height flex-column flex-1 el-card" style="padding: 10px 10px 10px 10px">
		<div class="flex-row flx-center" style="margin-bottom: 10px">
			<el-form-item title1="标签尺寸" :label="$t('columnsamplepackageInfoLabelSize')" style="margin-bottom: 0px">
				<el-select v-model="LabelSize" @change="LabelSizeChange">
					<el-option v-for="(item, index) in LabelSizeList" :key="index" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-button style="margin-left: 20px" type="primary" @click="bindPrint"> {{ $t("menu_print") }}</el-button>
		</div>
		<div class="flx-center">
			<el-card shadow="hover" style="color: #000" :style="{ width: srtwidth, height: srtheight, minHeight: srtheight }">
				<p>
					<span
						>{{ condobj.corpdesc }}
						<br />
						<p style="height: 5px"></p>
					</span>
					<span
						>{{ condobj.address }}<br />
						<p style="height: 5px"></p>
					</span>
					<span>To：{{ condobj.contactdesc }}<br /></span>
					<span>Tel：{{ condobj.tel }}</span>
				</p>
			</el-card>
			<!-- 打印的 -->
			<div v-show="false">
				<p id="addressLabel" style="color: #000" :style="{ width: srtwidth, height: srtheight, minHeight: srtheight }">
					<span
						>{{ condobj.corpdesc }}
						<br />
						<p style="height: 5px"></p>
					</span>
					<span
						>{{ condobj.address }}<br />
						<p style="height: 5px"></p>
					</span>
					<span>To：{{ condobj.contactdesc }}<br /></span>
					<span>Tel：{{ condobj.tel }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import printJS from "print-js";

const props = defineProps({
	condobj: {
		type: Object,
		default: {
			corpdesc: {
				type: String,
				default: ""
			},
			contactdesc: {
				type: String,
				default: ""
			},
			tel: {
				type: String,
				default: ""
			},
			address: {
				type: String,
				default: ""
			}
		}
	}
});

//标签尺寸
let LabelSize = ref(1);
let srtwidth = ref("280px");
let srtheight = ref("196px");
const LabelSizeList = reactive([
	{ value: 0, label: "50mm*40mm" },
	{ value: 1, label: "70mm*50mm" },
	{ value: 2, label: "80mm*40mm" }
]);

//打印的样式
let printStyle = ref("@page {margin: 1mm 4mm 2mm 2.5mm;}");

const LabelSizeChange = val => {
	if (val == 0) {
		printStyle.value = "@page {margin: 0mm 1mm 1mm 1mm;}";
		srtwidth.value = "265px";
		srtheight.value = "200px";
	} else if (val == 1) {
		printStyle.value = "@page {margin: 1mm 4mm 2mm 2.5mm;}";
		srtwidth.value = "280px";
		srtheight.value = "196px";
	} else if (val == 2) {
		printStyle.value = "@page {margin: 1mm 4mm 2mm 2.5mm;}";
		srtwidth.value = "369px";
		srtheight.value = "175px";
	}
};

//打印
const bindPrint = () => {
	printJS({
		printable: "addressLabel",
		type: "html",
		targetStyles: ["*"], //应用全部样式到打印里面
		style: printStyle.value
	});
};
</script>
