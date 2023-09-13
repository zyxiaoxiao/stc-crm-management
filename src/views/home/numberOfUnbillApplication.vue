<template>
	<el-col v-if="elcolShow" :span="24" style="margin-bottom: 10px">
		<el-card shadow="always" class="home-card" v-loading="numberOfUnbillApplicationLoading">
			<div ref="echartsPanelBoxRef" class="echarts-panel-box">
				<div class="echarts-panel-header">
					<div class="echarts-panel-header-left">Number of Unbill Application(Last 2 years)</div>
					<div class="echarts-panel-header-right">
						<div class="flx-center" style="margin-left: 10px" @click="refreshClick">
							<span>{{ $t("desktop_Refresh") }}</span>
							<el-icon>
								<Refresh />
							</el-icon>
						</div>
					</div>
				</div>
				<div ref="numberOfUnbillApplicationRef" style="width: 100%; height: 290px"></div>
			</div>
		</el-card>
	</el-col>
</template>

<script setup name="numberOfUnbillApplication">
import { ref, onMounted, inject, onBeforeUnmount } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import elementResizeDetectorMaker from "element-resize-detector";

// 监听div大小变化
const erd = elementResizeDetectorMaker();
const echarts = inject("echarts"); // 获取echarts对象

const echartsPanelBoxRef = ref();
const elcolShow = ref(true);

const numberOfUnbillApplicationRef = ref();
let numberOfUnbillApplicationChart = null;

// 加载 loading
const numberOfUnbillApplicationLoading = ref(false);

let numberOfUnbillApplicationOption = {
	tooltip: {},
	xAxis: {
		axisLabel: {
			rotate: 0 //设置x轴字体倾斜
		},
		data: []
	},
	yAxis: {
		type: "value"
	},
	series: [
		{
			type: "bar", //柱形图
			barWidth: 0, //柱子的宽度
			label: {
				show: true,
				position: "top"
			},
			data: []
		}
	]
};

//获取Number of Unbill Application(Last 2 years)
const getNumberOfUnbillApplication = async () => {
	try {
		numberOfUnbillApplicationLoading.value = true;
		const res = await http.post("/mail/inbox/inbox!selectFolderNumByCond.action", qs.stringify({}), {
			headers: {
				noLoading: true //隐藏加载--
			}
		});
		if (res.inboxInfos) {
			numberOfUnbillApplicationOption.xAxis.data.length = 0;
			numberOfUnbillApplicationOption.series[0].data.length = 0;
			res.inboxInfos.forEach(element => {
				numberOfUnbillApplicationOption.xAxis.data.push(element.title);
				numberOfUnbillApplicationOption.series[0].data.push(element.content);
			});

			//设置柱子的宽度
			if (numberOfUnbillApplicationOption.xAxis.data.length <= 10) {
				numberOfUnbillApplicationOption.series[0].barWidth = 50;
			} else {
				numberOfUnbillApplicationOption.series[0].barWidth = 0;
			}

			//设置x轴字体倾斜
			if (numberOfUnbillApplicationOption.xAxis.data.length >= 18) {
				numberOfUnbillApplicationOption.xAxis.axisLabel.rotate = 30;
			} else {
				numberOfUnbillApplicationOption.xAxis.axisLabel.rotate = 0;
			}

			// 绘制图表
			numberOfUnbillApplicationChart.setOption(numberOfUnbillApplicationOption);
		}
	} finally {
		numberOfUnbillApplicationLoading.value = false;
		elcolShow.value = numberOfUnbillApplicationOption.xAxis.data.length >= 1 ? true : false;
	}
};

//刷新
const refreshClick = () => {
	getNumberOfUnbillApplication();
};

//页面初始化渲染完成执行
onMounted(() => {
	getNumberOfUnbillApplication();
	// 基于准备好的dom，初始化echarts实例
	numberOfUnbillApplicationChart = echarts.init(numberOfUnbillApplicationRef.value);
	// 处理 numberOfUnbillApplicationChart点击事件
	numberOfUnbillApplicationChart.on("click", function (params) {
		console.log("params==", params);
	});

	//监听  echartsPanelBoxRef div 的变化
	erd.listenTo(echartsPanelBoxRef.value, element => {
		numberOfUnbillApplicationChart.resize(); //调整图表自适应父div
	});
});
//页面卸载之前调用
onBeforeUnmount(() => {
	//防止内存泄露移除除事件监听器
	erd.uninstall(echartsPanelBoxRef.value);
	numberOfUnbillApplicationChart.dispose();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
