<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto; margin-top: 10px; padding-bottom: 10px"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane :label="$t('menu_flowChartTracking')" style="overflow: auto" :name="0">
				<div @click="aaa" v-html="svgHtml" style="text-align: center; margin: 30px"></div>
			</el-tab-pane>
			<el-tab-pane :label="$t('menu_auditOpinionList')" :name="1" class="main-tab-pane-content all-height flex-column">
				<zTable ref="zTable1" :tableList="tableList"> </zTable>
			</el-tab-pane>
			<el-tab-pane :label="$t('menu_historicalAuditOpinionList')" :name="2" class="main-tab-pane-content all-height flex-column">
				<zTable ref="zTable2" :tableList="tableList2"> </zTable>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup name="audit">
import { onMounted, ref, reactive, nextTick, onUnmounted, onBeforeUnmount } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import { layer } from "vue3-layer";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
const i18n = useI18n();
const tableTabsValue = ref(0);
const zTable1 = ref();
const zTable2 = ref();

// 父组件传入的参数
const props = defineProps({
	auditList: Object
});

let params = {
	"cond.codeid": props.auditList.codeid,
	"cond.tablename": props.auditList.tablename,
	"cond.columnid": props.auditList.columnid
};

const svgHtml = ref("");
let svgIds = [];
let idsMsg = [];
let handlers = [];

const mouseenter_event = (idsMsg, index, box) => () => {
	let msg;
	if (idsMsg[index] == "开始事件1") {
		msg = "Start";
	} else if (idsMsg[index] == "结束事件1") {
		msg = "End";
	} else {
		msg = idsMsg[index];
	}
	layer.tips(msg, box, {
		tips: [1, "#55557f"],
		time: 10000
	});
};

const mouseleave_event = () => {
	layer.closeAll("tips"); //关闭所有的tips层
};

// 流程图 tips组件 公共部分
const historySvgTips = (id, idsMsg, index) => {
	const box = document.getElementById(id);
	const mouseenterHandler = mouseenter_event(idsMsg, index, box);
	//停留
	box.addEventListener("mouseenter", mouseenterHandler);
	//离开
	box.addEventListener("mouseleave", mouseleave_event);

	return { mouseenterHandler, mouseleaveHandler: mouseleave_event };
};

//邮件收件人和流程图、审核历史
const getHistorySvg = async () => {
	const res = await http.post("/core/activiti/activitimodel!selectSVGOrPng.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	if (!res) return;
	svgHtml.value = res.mapObj.svg;
	svgIds = Object.assign(svgIds, res.mapObj.svgIds);
	idsMsg = Object.assign(idsMsg, res.mapObj.idsMsg);
	//DOM更新后的回调函数
	nextTick(() => {
		svgIds.forEach((item, index, arr) => {
			const { mouseenterHandler, mouseleaveHandler } = historySvgTips("svg-" + item, idsMsg, index);
			handlers.push({ id: "svg-" + item, mouseenterHandler, mouseleaveHandler });
		});
	});
};
getHistorySvg();

//表格对象
const tableList = reactive({
	id: "/audit/index.vue_zTable1",
	//隐藏 加载--
	noLoading: true,
	//表格工具栏,默认全部显示
	tableToolbar: {
		whole: false //全部隐藏
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/jbpm3/auditinfo!selectLatestOpinions.action",
		root: "latestOpinionsList",
		baseParams: {
			"cond.id": props.auditList.codeid,
			"cond.business_table_name": props.auditList.tablename,
			"cond.business_column_id": props.auditList.columnid,
			"cond.opinion_table_name": "ACT_SW_AUDITOPINION",
			"cond.business_column_corpcode": "submitcorp"
		}
	},
	//表格表头
	tableColumns: [
		{
			label: "menu_auditPersonCode",
			prop: "auditorcode",
			type: "Input"
		},
		{
			label: "menu_auditPersonName",
			prop: "auditordesc",
			type: "Input"
		},
		{
			label: "menu_auditTime",
			prop: "audittime",
			type: "Input"
		},
		{
			label: "menu_auditOpinion",
			prop: "auditcomment",
			type: "Input"
		},
		{
			label: "menu_auditLevel",
			prop: "auditlevel2",
			type: "Input"
		},
		{
			label: "menu_auditNodeName",
			prop: "auditlevelname",
			type: "Input"
		},
		{
			label: "menu_auditAction",
			prop: "decision",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

//表格对象
const tableList2 = reactive({
	id: "/audit/index.vue_zTable2",
	//隐藏 加载--
	noLoading: true,
	//表格工具栏,默认全部显示
	tableToolbar: {
		whole: false //全部隐藏
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/jbpm3/auditinfo!selectHistoryOpinions.action",
		root: "historyOpinionsList",
		baseParams: {
			"cond.id": props.auditList.codeid,
			"cond.business_table_name": props.auditList.tablename,
			"cond.business_column_id": props.auditList.columnid,
			"cond.opinion_table_name": "ACT_SW_AUDITOPINION",
			"cond.business_column_corpcode": "submitcorp"
		}
	},
	//表格表头
	tableColumns: [
		{
			label: "menu_auditPersonCode",
			prop: "auditorcode",
			type: "Input"
		},
		{
			label: "menu_auditPersonName",
			prop: "auditordesc",
			type: "Input"
		},
		{
			label: "menu_auditTime",
			prop: "audittime",
			type: "Input"
		},
		{
			label: "menu_auditOpinion",
			prop: "auditcomment",
			type: "Input"
		},
		{
			label: "menu_auditLevel",
			prop: "auditlevel",
			type: "Input"
		},
		{
			label: "menu_auditNodeName",
			prop: "auditlevelname",
			type: "Input"
		},
		{
			label: "menu_auditAction",
			prop: "decision",
			type: "Input"
		},
		{
			label: "menu_approvalBatch",
			prop: "auditround",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

//切换tap
const tabChange = TabPanelName => {
	if (TabPanelName == 1) {
		zTable1.value.getTableList();
	}
	if (TabPanelName == 2) {
		zTable2.value.getTableList();
	}
};

//页面初始化渲染完成执行
onMounted(() => {});
//页面卸载之前调用
onBeforeUnmount(() => {
	//防止内存泄露移除除事件监听器
	handlers.forEach(({ id, mouseenterHandler, mouseleaveHandler }) => {
		const box = document.getElementById(id);
		box.removeEventListener("mouseenter", mouseenterHandler);
		box.removeEventListener("mouseleave", mouseleaveHandler);
	});
});

//页面卸载
onUnmounted(() => {
	svgHtml.value = null;
	handlers = null;
});
</script>

<style></style>
