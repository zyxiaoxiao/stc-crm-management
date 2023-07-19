<template>
	<div ref="group2Ref">
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="always" class="home-card">
					<div ref="echartsRef" style="width: 100%; height: 290px"></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="always" class="home-card">
					<div ref="echartsRef2" style="width: 100%; height: 290px"></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="always" class="home-card">
					<div ref="echartsRef3" style="width: 100%; height: 290px"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup name="home">
import { ref, onMounted, inject, onBeforeUnmount } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
import { GlobalStore } from "/src/store/globalStore.js";
import { useRouter } from "vue-router";
const globalStore = GlobalStore();
const router = useRouter();

// 监听div大小变化
const erd = elementResizeDetectorMaker();
const echarts = inject("echarts"); // 获取echarts对象
const group2Ref = ref();
const echartsRef = ref();
const echartsRef2 = ref();
const echartsRef3 = ref();

let option = {
	title: {
		text: "柱形图"
	},
	tooltip: {},
	xAxis: {
		data: ["数据一", "数据二", "数据三", "数据四", "数据五", "数据六"]
	},
	yAxis: {},
	series: [
		{
			name: "销量",
			type: "bar",
			data: [5, 20, 36, 10, 10, 20]
		}
	]
};
let option2 = {
	title: {
		text: "折线图"
	},
	tooltip: {},
	xAxis: {
		data: ["数据一", "数据二", "数据三", "数据四", "数据五", "数据六"]
	},
	yAxis: {},
	series: [
		{
			name: "销量",
			type: "line",
			data: [5, 20, 36, 10, 10, 20]
		}
	]
};
let option3 = {
	title: {
		text: "饼形图"
	},
	tooltip: {},
	xAxis: {
		data: ["数据一", "数据二", "数据三", "数据四", "数据五", "数据六"]
	},
	yAxis: {},
	series: [
		{
			name: "销量",
			type: "pie",
			data: [5, 20, 36, 10, 10, 20]
		}
	]
};
let myChart = null;
let myChart2 = null;
let myChart3 = null;

//页面初始化渲染完成执行
onMounted(() => {
	// 基于准备好的dom，初始化echarts实例
	myChart = echarts.init(echartsRef.value);
	myChart2 = echarts.init(echartsRef2.value);
	myChart3 = echarts.init(echartsRef3.value);
	// 绘制图表
	myChart.setOption(option);
	myChart2.setOption(option2);
	myChart3.setOption(option3);
	//监听  group2Ref div 的变化
	erd.listenTo(group2Ref.value, element => {
		myChart.resize(); //调整图表自适应父div
		myChart2.resize();
		myChart3.resize();
	});
});
//页面卸载之前调用
onBeforeUnmount(() => {
	//防止内存泄露移除除事件监听器
	erd.uninstall(group2Ref.value);
	myChart.dispose();
	myChart2.dispose();
	myChart3.dispose();
});
</script>

<style scoped lang="scss">
@import "./index.scss";

.home-card {
	height: 330px;
}
</style>
