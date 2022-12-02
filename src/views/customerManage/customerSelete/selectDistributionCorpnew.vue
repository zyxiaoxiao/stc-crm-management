<template>
	<div class="all-height flex-column">
		<div class="filter main-card">
			<h4 class="title sle">{{ $t("itemtitlebase_usercorpdesc") }}</h4>
			<el-input
				v-model="filterText"
				:placeholder="$t('enterKeywordsForFiltering')"
				:formatter="value => value.toUpperCase()"
				clearable
			/>
			<el-scrollbar :style="{ height: `calc(100% - 95px)` }">
				<el-tree
					ref="treeRef"
					show-checkbox
					default-expand-all
					node-key="id"
					:data="treeData"
					:props="defaultProps"
					:filter-node-method="filterNode"
				/>
			</el-scrollbar>
		</div>
		<div style="text-align: right; margin-right: 10px">
			<el-button type="primary" icon="Finished" @click="confirmClick">
				{{ $t("buttoncommonconfirm") }}
			</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const treeRef = ref();
const filterText = ref("");
const defaultProps = {
	children: "children",
	label: "corpdesc"
};
const treeData = reactive([]);

//请求头配置
let config = {
	headers: {
		noLoading: true //隐藏加载--
	}
};

//监听输入框数据变化
watch(filterText, val => {
	treeRef.value.filter(val);
});
//根据过滤条件过滤树形结构数据
const filterNode = (value, data) => {
	if (!value) return true;
	return data.corpdesc.includes(value);
};

//获取树形结构数据源
const getTreeData = async () => {
	try {
		let baseParams = "{'cond.usercode':'admin','cond.parentid':0,'cond.rightflag':'false','cond.checked':false}";
		const res = await http.post("/core/corp/corp!selectForCorpManage.action", qs.stringify(baseParams), config);
		treeData.push(res[0]);
	} finally {
	}
};

//确认
const confirmClick = () => {
	let arrayList = treeRef.value.getCheckedNodes(true, false);
	if (arrayList.length <= 0) {
		ElMessage.warning(i18n.t("Corp_selectMoreCorp"));
		return;
	}
	props.condobj.arrayList = arrayList;
	props.condobj.dialogShow = false;
};

onMounted(() => {
	getTreeData();
});
</script>

<style scoped lang="scss">
.filter {
	margin: 10px;
}
</style>
