<template>
	<div ref="group2Ref">
		<el-row :gutter="15">
			<numberOfUnbillApplication></numberOfUnbillApplication>
			<onHandSummary></onHandSummary>
			<myMessage></myMessage>

			<!-- <el-col :span="12" style="margin-bottom: 10px">
				<el-card shadow="always" class="home-card">
					<div class="echarts-panel-box">
						<div class="echarts-panel-header">
							<div class="echarts-panel-header-left">{{ $t("折线图") }}</div>
							<div class="echarts-panel-header-right">
								<div class="flx-center" style="margin-left: 10px" @click="refreshClick">
									<span>{{ $t("desktop_Refresh") }}</span>
									<el-icon>
										<Refresh />
									</el-icon>
								</div>
							</div>
						</div>
						<div ref="echartsRef2" style="width: 100%; height: 290px"></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12" style="margin-bottom: 10px">
				<el-card shadow="always" class="home-card">
					<div class="echarts-panel-box">
						<div class="echarts-panel-header">
							<div class="echarts-panel-header-left">{{ $t("饼形图") }}</div>
							<div class="echarts-panel-header-right">
								<div class="flx-center" style="margin-left: 10px" @click="refreshClick">
									<span>{{ $t("desktop_Refresh") }}</span>
									<el-icon>
										<Refresh />
									</el-icon>
								</div>
							</div>
						</div>
						<div ref="echartsRef3" style="width: 100%; height: 290px"></div>
					</div>
				</el-card>
			</el-col> -->
		</el-row>
	</div>
</template>

<script setup name="home">
import { ref, onMounted, inject, onBeforeUnmount } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
import numberOfUnbillApplication from "./numberOfUnbillApplication.vue";
import myMessage from "./myMessage.vue";
import onHandSummary from "./onHandSummary.vue";

// // 监听div大小变化
// const erd = elementResizeDetectorMaker();
// const echarts = inject("echarts"); // 获取echarts对象

// const group2Ref = ref();
// const echartsRef2 = ref();
// const echartsRef3 = ref();

// let myChart2 = null;
// let myChart3 = null;

// let option2 = {
// 	tooltip: {},
// 	xAxis: {
// 		axisLabel: { interval: 0, rotate: 30 },
// 		data: ["数据一", "数据二", "数据三", "数据四", "数据五", "数据六"]
// 	},
// 	yAxis: {},
// 	series: [
// 		{
// 			name: "销量",
// 			type: "line",
// 			data: [5, 20, 36, 10, 10, 20]
// 		}
// 	]
// };
// let option3 = {
// 	tooltip: {},
// 	xAxis: {
// 		data: ["数据一", "数据二", "数据三", "数据四", "数据五", "数据六"]
// 	},
// 	yAxis: {},
// 	series: [
// 		{
// 			name: "销量",
// 			type: "pie",
// 			data: [5, 20, 36, 10, 10, 20]
// 		}
// 	]
// };

// //页面初始化渲染完成执行
// onMounted(() => {
// 	// 基于准备好的dom，初始化echarts实例
// 	myChart2 = echarts.init(echartsRef2.value);
// 	myChart3 = echarts.init(echartsRef3.value);
// 	myChart2.setOption(option2);
// 	myChart3.setOption(option3);
// 	//监听  group2Ref div 的变化
// 	erd.listenTo(group2Ref.value, element => {
// 		myChart2.resize(); //调整图表自适应父div
// 		myChart3.resize();
// 	});
// });
// //页面卸载之前调用
// onBeforeUnmount(() => {
// 	//防止内存泄露移除除事件监听器
// 	erd.uninstall(group2Ref.value);
// 	myChart2.dispose();
// 	myChart3.dispose();
// });
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
