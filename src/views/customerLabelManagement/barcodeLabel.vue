<template>
	<div class="flex-column" style="overflow: hidden">
		<div class="flx-center">
			<div style="width: 300px; margin-top: 20px">
				<el-form-item title1="标签尺寸" :label="$t('columnsamplepackageInfoLabelSize')">
					<el-select v-model="LabelSize" @change="LabelSizeChange">
						<el-option v-for="(item, index) in LabelSizeList" :key="index" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
			</div>
		</div>
		<div class="flex-column flex-1" style="overflow: auto">
			<div class="flex-column flx-center flex-1" style="margin-bottom: 20px">
				<!-- 显示的 -->
				<el-card
					v-for="(item, index) in barcodeLabelList"
					:key="index"
					shadow="hover"
					class="barcodeLabel"
					:style="{ width: srtwidth, height: srtheight, marginTop: index > 0 ? '20px' : '0px' }"
				>
					<p style="margin-bottom: 3px">{{ item.branchOffice }}</p>
					<p style="margin-bottom: 3px">With/Without Application Form</p>
					<p style="margin-bottom: 6px">To[{{ item.dept }}]Attn:{{ item.salecode + item.saledesc }}</p>
					<span style="font-weight: bold">Rec.from[{{ item.customerno }}]{{ item.customername }}</span>
					<div class="flx-center">
						<ReBarcode :text="item.packagid" :type="barcodes.type" :options="barcodes.options" />
					</div>
					<p style="text-align: center; margin-top: -10px; margin-bottom: 3px">
						{{ item.packagid }}
					</p>
					<div class="flex-row">
						<p style="width: 100px">Rec.date</p>
						<p class="flex-1" style="text-align: right">{{ item.labledate }}</p>
					</div>
				</el-card>
				<!-- 打印的 -->
				<div v-show="false">
					<div id="barcodeLabel" class="barcodeLabel">
						<div
							v-for="(item, index) in barcodeLabelList"
							:key="index"
							:style="{ width: srtwidth, height: srtheight, paddingTop: index > 0 ? '5px' : '0px' }"
						>
							<p style="margin-bottom: 3px">{{ item.branchOffice }}</p>
							<p style="margin-bottom: 3px">With/Without Application Form</p>
							<p style="margin-bottom: 6px">To[{{ item.dept }}]Attn:{{ item.salecode + item.saledesc }}</p>
							<span style="font-weight: bold">Rec.from[{{ item.customerno }}]{{ item.customername }}</span>

							<div class="flx-center">
								<ReBarcode :text="item.packagid" :type="barcodes.type" :options="barcodes.options" />
							</div>
							<p style="text-align: center; margin-top: -10px; margin-bottom: 3px">
								{{ item.packagid }}
							</p>
							<div class="flex-row">
								<p style="width: 100px">Rec.date</p>
								<p class="flex-1" style="text-align: right">{{ item.labledate }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-row" style="padding: 0px 20px 20px 0px">
			<div class="flex-1"></div>
			<el-button @click="props.condobj.dialogShow = false">{{ $t("menu_cancel") }}</el-button>
			<el-button type="primary" @click="bindPrint" :disabled="barcodeLabelList.length < 1"> {{ $t("menu_print") }}</el-button>
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
			},
			arrayList: {
				type: Array,
				default() {
					return [];
				}
			}
		}
	}
});

//条码参数
const barcodes = reactive({
	type: "CODE128",
	options: {
		height: 40,
		width: 2.2,
		fontSize: 0,
		font: "Arial Black"
	}
});
//标签尺寸
let LabelSize = ref(1);
let srtwidth = ref("350px");
let srtheight = ref("245px");
const LabelSizeList = reactive([
	{ value: 0, label: "50mm*40mm" },
	{ value: 1, label: "70mm*50mm" }
]);

//打印的样式
let printStyle = ref("@page {margin: 1mm 4mm 2mm 2.5mm;}");

let barcodeLabelList = reactive([]); // 条码标签数据
//遍历
props.condobj.arrayList.forEach(row => {
	let obj = {};
	let dept = row.dept; //部门
	let branchOffice = "STC"; //分公司
	let packagid = row.packagid; //条码编号
	let customername = row.customername; // 客户名称

	if (dept.indexOf("HK") > -1 || dept.indexOf("ICL") > -1 || dept.indexOf("HCC") > -1) {
		branchOffice = "HKSTC"; //香港分公司名称缩写
	} else if (dept.indexOf("PK") > -1) {
		branchOffice = "STC (Germany)"; //德国分公司名称缩写
	} else if (dept.indexOf("SH") > -1) {
		branchOffice = "SHSTC"; //上海分公司名称缩写
	} else if (dept.indexOf("CZ") > -1) {
		branchOffice = "CZSTC"; //常州分公司名称缩写
	} else if (dept.indexOf("DG") > -1) {
		branchOffice = "DGSTC"; //东莞分公司名称缩写
	} else if (dept.indexOf("VN") > -1) {
		branchOffice = "STC (Vietnam)"; //越南分公司名称缩写
	} else if (dept.indexOf("US") > -1) {
		branchOffice = "STC (USA)"; //美国分公司名称缩写
	}

	//截取客户名称
	if (customername.length > 100) {
		customername = customername.substring(0, 100);
	}

	//截取条码编号
	if (packagid.indexOf("(") > -1) {
		packagid = packagid.substring(0, packagid.indexOf("("));
	}

	obj.branchOffice = branchOffice; //分公司
	obj.dept = dept; //部门
	obj.saledesc = row.saledesc.substring(0, row.saledesc.indexOf("&")); //收件人名称
	obj.salecode = row.saledesc.substring(row.saledesc.indexOf("&") + 1); //收件人名称
	obj.customerno = row.customerno; // 客户号
	obj.customername = customername; // 客户名称
	obj.packagid = packagid; //条码编号
	obj.labledate = row.labledate; //标签日期
	barcodeLabelList.push(obj);
});

const LabelSizeChange = val => {
	if (val == 0) {
		barcodes.options.width = 1.8;
		printStyle.value = "@page {margin: 0mm 1mm 1mm 1mm;}";
		srtwidth.value = "300px";
		srtheight.value = "233px";
	} else if (val == 1) {
		barcodes.options.width = 2.2;
		printStyle.value = "@page {margin: 1mm 4mm 2mm 2.5mm;}";
		srtwidth.value = "350px";
		srtheight.value = "245px";
	}
};

//打印
const bindPrint = () => {
	printJS({
		printable: "barcodeLabel",
		type: "html",
		targetStyles: ["*"], //应用全部样式到打印里面
		style: printStyle.value
	});
};
</script>

<style lang="scss">
.barcodeLabel {
	color: #000;
}
</style>
