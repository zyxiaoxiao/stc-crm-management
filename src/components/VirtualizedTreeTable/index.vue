<template>
	<div v-loading="loading" class="flex-1 all-height flex-column">
		<div v-if="treeTableList.tableToolbar.whole" class="flex-row flx-center" style="margin-bottom: 10px; margin-top: 10px">
			<div class="flex-1">
				<div v-if="treeTableList.tableToolbar.left" style="text-align: left">
					<slot name="tableHeaderLleft" :selectList="selectList" :isSelected="isSelected"> </slot>
				</div>
				<div v-if="treeTableList.tableToolbar.left" style="margin-top: 10px">
					<el-input
						class="flex-1"
						v-model="filterText"
						:placeholder="$t('enterKeywordsForFiltering')"
						clearable
						prefix-icon="Search"
						@change="inputChange"
					/>
				</div>
			</div>
			<div v-if="treeTableList.tableToolbar.right" class="flx-center" style="margin-right: 2px">
				<slot name="tableHeaderRight"></slot>
			</div>
		</div>
		<el-auto-resizer class="flex-1">
			<template #default="{ height, width }">
				<el-table-v2
					ref="tableV2Ref"
					:expand-column-key="treeTableList.expandColumnKey"
					:default-expanded-row-keys="defaultExpandedRowKeys"
					:columns="treeTableList.tableColumns"
					:data="treeData"
					:width="width"
					:height="height"
					:fixed="true"
					scrollbar-always-on
					:row-class="rowClass"
					:header-height="headerHeight"
					:row-height="roweight"
				/>
			</template>
		</el-auto-resizer>
	</div>
</template>

<script lang="jsx" name="virtualizedTreeTable" setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import { ElCheckbox } from "element-plus";
import { GlobalStore } from "@/store/globalStore.js";

const globalStore = GlobalStore();

// 父组件传入的参数
const props = defineProps({
	treeTableList: {
		isRequest: false, //页面渲染完成，是否调请求接口，false不调
		//表格工具栏
		tableToolbar: {
			whole: true, //显示全部表格工具栏
			left: true, //显示左表格工具栏
			right: true //显示右全部表格工具栏
		},
		//请求属性设置
		httpAttribute: {
			url: "",
			root: "",
			baseParams: {} //参数
		},

		tableColumns: [], //表格表头
		expandColumnKey: "" //那个字段是树形结构
	}
});

// 表格加载 loading
const loading = ref(false);
//请求头配置
let config = {
	headers: {
		noLoading: true //隐藏加载--
	}
};

const tableV2Ref = ref();
//根节点id
const rootNodeId = new Set();
//展开树形结构选中的行 Set对象
const defaultExpandedRowKeysSet = new Set();
//展开树形结构选中的行
const defaultExpandedRowKeys = reactive([]);
const treeData = reactive([]);
//原始数据
const resDataSources = [];
//完整树结构数据
const completeTreeData = reactive([]);
//数据源初始化时默认选中的行数据
const checkboxSelectedRowData = [];
// 是否选中数据
const isSelected = ref(false);
// 选中的数据列表
const selectList = ref([]);
//数据源处理状态 ： 开始（start），结束(end)
let processingStatus = "start";
//过滤
const filterText = ref("");
// 用于选中或取消的 节点数据
const SCNodeData = reactive(new Map());

//表头的高度
let headerHeight = ref(40);
//行的高度
const roweight = computed(() => {
	if (globalStore.assemblySize == "small") {
		headerHeight.value = 30;
		return 30;
	}
	headerHeight.value = 40;
	return 40;
});

// jsx 写法 的 Checkbox 多选框
const SelectionCell = ({ name, value, intermediate = false, onChange }) => {
	return <ElCheckbox label={name} modelValue={value} indeterminate={intermediate} onChange={onChange} />;
};

//先判断父组件传入的参数，表格工具栏,默认全部显示
if (props.treeTableList.tableToolbar) {
	typeof props.treeTableList.tableToolbar.whole == "undefined" ? (props.treeTableList.tableToolbar.whole = true) : false;
	typeof props.treeTableList.tableToolbar.left == "undefined" ? (props.treeTableList.tableToolbar.left = true) : false;
	typeof props.treeTableList.tableToolbar.right == "undefined" ? (props.treeTableList.tableToolbar.right = true) : false;
} else {
	props.treeTableList.tableToolbar = {
		whole: true,
		left: true,
		right: true
	};
}

//根据树形结构字段 初始化列的渲染事件
if (props.treeTableList.expandColumnKey) {
	for (let item of props.treeTableList.tableColumns) {
		if (item.key == props.treeTableList.expandColumnKey) {
			item.cellRenderer = props => {
				const { cellData, rowData, column } = props;
				const onChange = value => {
					rowClass(props);
					cellCheckboxTriggerEvent(treeData, rowData, value);
				};
				return (
					<span class="sle" title={cellData}>
						<SelectionCell value={rowData.checked} intermediate={rowData.intermediate} onChange={onChange} />
						<span style="margin-left: 10px;">{cellData}</span>
					</span>
				);
			};
			item.headerCellRenderer = props => {
				const { column } = props;
				const onChange = value => {
					column.checked = value;
					if (treeData.length) {
						headerCellRecursionChildren(treeData, value);
					}
				};
				return (
					<>
						<SelectionCell value={column.checked} intermediate={column.intermediate} onChange={onChange} />
						<span style=" margin-left: 10px;">{column.title}</span>
					</>
				);
			};
			break;
		}
	}
}

//获取树形结构的根节点ID
const getDataSourcesRootNodeId = DataSources => {
	DataSources.map(row => {
		rootNodeId.add(row.id);
	});
};

//对数据源进行处理
const processingDataSources = DataSources => {
	//获取树形结构的根节点ID
	getDataSourcesRootNodeId(DataSources);
	//递归获取数据源初始化时默认选中的行数据
	dataSourcesDefaultRow(DataSources);
	// 对数据源初始化时默认选中的行数据进行处理
	handleDataSourcesDefaultRow(DataSources, checkboxSelectedRowData);
	//数据源处理状态 ： 开始（start），结束(end)
	processingStatus = "end";
	Array.from(defaultExpandedRowKeysSet).forEach(item => {
		defaultExpandedRowKeys.push(item);
	});
	treeData.push(DataSources[0]);
	completeTreeData.push(DataSources[0]);
};

//递归获取数据源初始化时默认选中的行数据
const dataSourcesDefaultRow = dataSources => {
	dataSources.map(row => {
		//不存在这个元素就加上
		if (!row.intermediate) {
			row.intermediate = false;
		}
		if (row.checked) {
			checkboxSelectedRowData.push(row);
		}
		//判断当前节点是否有子节点 Children,递归Children
		if (row.children && row.children.length) {
			dataSourcesDefaultRow(row.children);
		}
	});
};

// 对数据源初始化时默认选中的行数据进行处理
const handleDataSourcesDefaultRow = (DataSources, dataSourcesRow) => {
	dataSourcesRow.map(row => {
		//判断当前节点是否有父节点，有就往上递归
		cellUpwardRecursion(DataSources, row);
	});
};
//把选中的行字体颜色设置为蓝色
const rowClass = props => {
	const { rowData } = props;
	if (rowData.checked) {
		return "bg-red-100";
	}
	return "";
};

// 全选或全取消的递归树形结构数据
const headerCellRecursionChildren = (data, value) => {
	props.treeTableList.tableColumns[0].intermediate = false;
	data[0].intermediate = false;
	data[0].checked = value;
	cellRecursionChildren(data[0].children, value);
};

//树形结构 Checkbox 的触发事件
const cellCheckboxTriggerEvent = (data, row, value) => {
	SCNodeData.clear(); //清除数据
	row.intermediate = false;
	row.checked = value;

	//判断当前节点是否有子节点 Children,递归Children
	if (row.children && row.children.length) {
		cellRecursionChildren(row.children, value);
	} else {
		//只添加没有子节点的行数据
		SCNodeData.set(row.id, row);
	}
	//判断当前节点是否有父节点，有就往上递归
	cellUpwardRecursion(data, row);
};

//判断当前节点是否有子节点 Children,递归Children
const cellRecursionChildren = (rowChildren, value) => {
	rowChildren.map(row => {
		row.intermediate = false;
		row.checked = value;
		//判断当前节点是否有子节点 Children,递归Children
		if (row.children && row.children.length) {
			cellRecursionChildren(row.children, value);
		} else {
			//只添加没有子节点的行数据
			SCNodeData.set(row.id, row);
		}
	});
};

//判断当前节点是否有父节点，有就往上递归
// rootNodeId 为 根节点
const cellUpwardRecursion = (data, row) => {
	if (rootNodeId.has(row.id)) {
		if (row.checked) {
			props.treeTableList.tableColumns[0].intermediate = false;
			props.treeTableList.tableColumns[0].checked = true;
		} else if (row.intermediate) {
			props.treeTableList.tableColumns[0].intermediate = true;
		} else {
			props.treeTableList.tableColumns[0].checked = false;
			props.treeTableList.tableColumns[0].intermediate = false;
		}
	} else {
		//父节点id
		let parentId = row.PARENTID;
		//父节点行数据
		let rowData = [];
		rowData = getCurrentNodeRowData(data, parentId);
		cellUpwardRecursion(data, rowData);
	}
};

//通过id获取当前的节点数据,树形结构数据 往下递归
const getCurrentNodeRowData = (data, id) => {
	let rowData = [];
	for (let row of data) {
		if (row.id == id) {
			rowData = row;
			//every,some遍历数组，every只要有一项不满足条件都返回false some有一项满足都会返回true
			let allSelected = rowData.children.every(row => row.checked);
			let containsChecked = rowData.children.some(row => row.checked);
			let childNodeIntermediate = rowData.children.some(row => row.intermediate);
			//子节点没有全选时，或者子节点的intermediate为true时，父节点显示 indeterminate 状态
			rowData.intermediate = (containsChecked && !allSelected) || childNodeIntermediate;
			//子节点全选时，勾选上
			rowData.checked = allSelected;
			// 处理状态是开始时，才执行，用于初始化展开默认选中行。
			if (processingStatus == "start") {
				defaultExpandedRowKeysSet.add(row.id);
			}

			return rowData;
		} else if (row.children && row.children.length) {
			//判断当前节点是否有子节点 Children,递归Children
			rowData = getCurrentNodeRowData(row.children, id);
			if (rowData.length > 0 || rowData.id) {
				return rowData;
			}
		}
	}
	return rowData;
};

//仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
//过滤值的变化
let query = "";
const inputChange = val => {
	query = val;
	let filterTreeData = JSON.parse(JSON.stringify(completeTreeData));
	filterTreeData.filter(item => {
		return filterObj(item);
	});
	treeData.length = 0;
	treeData.push(filterTreeData[0]);
};

//根据筛选重新组成树形结构数据;
const filterObj = item => {
	if (item.TESTDESC.indexOf(query) > -1) return true;
	if (item.hasOwnProperty("children")) {
		item.children = item.children.filter(function (child) {
			if (!child.hasOwnProperty("children")) {
				return child.TESTDESC.indexOf(query) > -1;
			} else if (child.hasOwnProperty("children")) {
				return filterObj(child);
			}
		});
		if (item.children.length > 0) {
			return true;
		}
	} else {
		return child.TESTDESC.indexOf(query) > -1;
	}
};

//监听 SCNodeData数据源的变化,
watch(SCNodeData, (newValue, oldValue) => {
	// 把 SCNodeData 同步到 completeTreeData
	synchronizeCompleteTreeData(completeTreeData, SCNodeData);
});

// 把 SCNodeData 同步到 completeTreeData
const synchronizeCompleteTreeData = (completeTreeData, SCNodeData) => {
	//通过递归，把 SCNodeData 写入到 completeTreeData
	recursionCompleteTreeData(completeTreeData, SCNodeData);
	for (let row of SCNodeData.values()) {
		//判断当前节点是否有父节点，有就往上递归
		cellUpwardRecursion(completeTreeData, row);
	}
};

// 递归 ，把 SCNodeData 写入到 completeTreeData
const recursionCompleteTreeData = (completeTreeData, SCNodeData) => {
	completeTreeData.map(row => {
		//判断当前节点是否有子节点 Children,递归Children
		if (row.children && row.children.length) {
			recursionCompleteTreeData(row.children, SCNodeData);
		} else {
			if (SCNodeData.has(row.id) && SCNodeData.get(row.id)) {
				row.checked = SCNodeData.get(row.id).checked;
				row.intermediate = SCNodeData.get(row.id).intermediate;
			}
		}
	});
};

//封装选中的数据
const encapsulationSelectedRowData = treeData => {
	treeData.map(row => {
		if (row.checked && (!row.children || !row.children.length)) {
			selectList.value.push(row);
		}
		//判断当前节点是否有子节点 Children,递归Children
		if (row.children && row.children.length) {
			encapsulationSelectedRowData(row.children);
		}
	});
};
//监听 completeTreeData 数据源的变化,
watch(completeTreeData, (newValue, oldValue) => {
	selectList.value = [];
	encapsulationSelectedRowData(newValue);
	selectList.value.length === 0 ? (isSelected.value = false) : (isSelected.value = true);
});

//获取数据源
const getTableList = async () => {
	try {
		loading.value = true;
		const res = await http.post(
			props.treeTableList.httpAttribute.url,
			qs.stringify(props.treeTableList.httpAttribute.baseParams),
			config
		);
		let DataSources = res;
		if (props.treeTableList.httpAttribute.root) {
			DataSources = res[props.treeTableList.httpAttribute.root];
		}
		resDataSources.push(DataSources[0]);
		//对数据源进行处理
		processingDataSources(DataSources);
	} finally {
		loading.value = false;
	}
};
//页面初始化渲染完成执行
onMounted(() => {
	//面初始化渲染完成 是否调请求
	if (props.treeTableList.isRequest) {
		getTableList();
	}
});

// 暴露给父组件的参数和方法
defineExpose({
	isSelected,
	selectList, //选中的数据
	completeTreeData, //完整树形结构数据
	resDataSources, //原始树形结构数据
	getTableList
});
</script>

<style scoped lang="scss"></style>

<style lang="scss">
.bg-red-100 {
	color: #409eff;
}
</style>
