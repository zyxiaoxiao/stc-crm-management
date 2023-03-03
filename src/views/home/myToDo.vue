<template>
	<div class="small-panel-box">
		<div class="small-panel-header">
			<div class="small-panel-header-left">我的待办</div>
			<div class="small-panel-header-right">
				<dic class="flx-center" @click="collapseClick">
					<span>{{ headerRightText }}</span>
					<el-icon>
						<template v-if="headerRightIcon == 'expand'">
							<ArrowDownBold />
						</template>
						<template v-if="headerRightIcon == 'collapse'">
							<ArrowUpBold />
						</template>
					</el-icon>
				</dic>
				<dic class="flx-center" style="margin-left: 10px" @click="refreshClick">
					<span>刷新</span>
					<el-icon>
						<Refresh />
					</el-icon>
				</dic>
			</div>
		</div>
		<el-collapse-transition>
			<el-row :gutter="20" v-show="smallPanelShow" class="small-panel-el-row">
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">销售代理提佣审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">26</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">报价审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">6</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">客户创建审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">13</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">销账审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">10</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">月结客户审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">5</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">客户标签审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">7</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">销售代理提佣审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">26</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">销售代理提佣审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">26</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">销售代理提佣审核</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">26</div>
							</div>
							<div class="content-right">
								<!-- <el-tag>待审批</el-tag> -->
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-collapse-transition>
	</div>
</template>

<script setup name="myToDo">
import { ref, onMounted } from "vue";
import { GlobalStore } from "/src/store/globalStore.js";
import { useRouter } from "vue-router";
const globalStore = GlobalStore();
const router = useRouter();

const headerRightText = ref("收起");
const headerRightIcon = ref("collapse");
const transitionName = ref("el-zoom-in-top");
const smallPanelShow = ref(true);

const collapseClick = () => {
	if (headerRightText.value == "收起") {
		headerRightText.value = "展开";
		headerRightIcon.value = "expand";
		smallPanelShow.value = false;
	} else {
		headerRightText.value = "收起";
		headerRightIcon.value = "collapse";
		smallPanelShow.value = true;
	}
};

const refreshClick = () => {};

//页面初始化渲染完成执行
onMounted(() => {
	console.log("我的任务");
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
