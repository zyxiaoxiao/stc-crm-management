<template>
	<div class="small-panel-box">
		<div class="small-panel-header">
			<div class="small-panel-header-left">{{ $t("mytodolist") }}</div>
			<div class="small-panel-header-right">
				<div class="flx-center" @click="collapseClick">
					<span>{{ $t(headerRightText) }}</span>
					<el-icon>
						<template v-if="headerRightIcon == 'expand'">
							<ArrowDownBold />
						</template>
						<template v-if="headerRightIcon == 'collapse'">
							<ArrowUpBold />
						</template>
					</el-icon>
				</div>
				<div class="flx-center" style="margin-left: 10px" @click="refreshClick">
					<span>{{ $t("desktop_Refresh") }}</span>
					<el-icon>
						<Refresh />
					</el-icon>
				</div>
			</div>
		</div>
		<el-collapse-transition>
			<el-row :gutter="20" v-show="smallPanelShow" class="small-panel-el-row" v-loading="loading">
				<el-col v-for="(pendingInfo, index) in pendingInfos" :key="index" :span="24" :xs="12" :sm="8" :lg="6" :xl="4">
					<div @click="myToDoRouter(pendingInfo.routename)" class="small-panel suspension">
						<div class="small-panel-top">
							<div class="top-right"><i class="iconfont layui-icon-extend-jinrudaobo icon"></i></div>
						</div>
						<div class="small-panel-title">{{ $t(pendingInfo.i18ncode) }}</div>
						<div class="small-panel-content">
							<div class="content-left">
								<div class="detail--logo">
									<i class="iconfont layui-icon-extend-jurassic_todo icon"></i>
								</div>
								<div class="number">{{ pendingInfo.num }}</div>
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
import { ref, onMounted, reactive } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import { useRouter } from "vue-router";
const router = useRouter();

const headerRightText = ref("collapse");
const headerRightIcon = ref("collapse");

const smallPanelShow = ref(true);

const pendingInfos = reactive([]);

// 加载 loading
const loading = ref(false);

//获取我的待办
const getMyToDo = async () => {
	try {
		loading.value = true;
		const res = await http.post("/pending/pending/pending!selectPendingByCond.action", qs.stringify({}), {
			headers: {
				noLoading: true //隐藏加载--
			}
		});
		if (res.pendingInfos) {
			//对数据源进行处理
			pendingInfos.length = 0;
			res.pendingInfos.forEach(element => {
				pendingInfos.push({ i18ncode: element.i18ncode, routename: element.routename, num: element.num });
			});
		}
	} finally {
		loading.value = false;
	}
};

//展开和折叠
const collapseClick = () => {
	if (headerRightText.value == "collapse") {
		headerRightText.value = "expanded";
		headerRightIcon.value = "expand";
		smallPanelShow.value = false;
	} else {
		headerRightText.value = "collapse";
		headerRightIcon.value = "collapse";
		smallPanelShow.value = true;
	}
};
//刷新
const refreshClick = () => {
	getMyToDo();
};
//跳转到对应路由
const myToDoRouter = routename => {
	router.push({
		name: routename
	});
};

//页面初始化渲染完成执行
onMounted(() => {
	getMyToDo();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
