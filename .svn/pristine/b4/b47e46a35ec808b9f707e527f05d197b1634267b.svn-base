<template>
	<div v-loading="loading" class="flex-1 all-height flex-column">
		<div v-if="props.tableList.tableToolbar.whole" class="flex-row flx-center" style="margin-bottom: 10px; margin-top: 10px">
			<div class="flex-1">
				<div v-if="props.tableList.tableToolbar.left" style="text-align: left">
					<slot
						name="tableHeaderLleft"
						:ids="selectListIds"
						:selectList="selectList"
						:getselectList="getselectList"
						:isSelected="isSelected"
					>
					</slot>
				</div>
			</div>
			<div v-if="props.tableList.tableToolbar.right" class="flx-center" style="margin-right: 2px">
				<el-tooltip
					v-if="props.tableList.tableToolbar.right_download"
					:content="$t('SRM_ExportMDM')"
					placement="top"
					:show-after="500"
				>
					<el-button @click="tableExport" class="main-table-header-ri-button" size="small" icon="Download" />
				</el-tooltip>
				<el-tooltip
					v-if="props.tableList.tableToolbar.right_filter"
					:content="$t('Search_QuickSearch')"
					placement="top"
					:show-after="500"
				>
					<el-button @click="tableFilter" class="main-table-header-ri-button" size="small" icon="Filter" />
				</el-tooltip>
				<el-tooltip
					v-if="props.tableList.tableToolbar.right_query"
					:content="$t('Search_FuzzySearch')"
					placement="top"
					:show-after="500"
				>
					<el-button @click="quickQuery" class="main-table-header-ri-button" size="small" icon="Search" />
				</el-tooltip>
				<el-tooltip
					v-if="props.tableList.tableToolbar.right_empty"
					:content="$t('Search_ClearSearch')"
					placement="top"
					:show-after="500"
				>
					<el-button @click="tableResetSearch" class="main-table-header-ri-button" size="small" icon="ZoomOut" />
				</el-tooltip>
				<slot name="tableHeaderRight"></slot>
			</div>
		</div>
		<el-table
			ref="tableRef"
			id="tableRef"
			border
			stripe
			highlight-current-row
			scrollbar-always-on
			:header-cell-style="{ background: '#f8f8f9', color: '#606266', fontWeight: 700 }"
			class="flex-1"
			:style="{ marginTop: props.tableList.tableToolbar.whole ? '0px' : '10px', minHeight: '150px' }"
			:data="tableList.tableData"
			@current-change="currentChange"
			@selection-change="selectionChange"
			@select="select"
			@row-click="rowClick"
			:row-key="listId"
		>
			<template v-for="item in tableList.tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-if="item.type == 'selection' || item.type == 'index'"
					:type="item.type"
					:label="item.label ? $t(item.label) : item.title"
					:width="item.width"
					:fixed="item.fixed"
				>
				</el-table-column>

				<!-- workflowStatus -->
				<el-table-column
					v-else-if="item.type == 'workflowStatus'"
					:prop="item.prop"
					:label="item.label ? $t(item.label) : item.title"
					:width="item.width"
					:fixed="item.fixed"
				>
					<template #default="scope">
						<el-tooltip class="box-item" effect="dark" :content="workflowStatusText(scope.row[item.prop])" placement="right">
							<span @click="workflowStatus(item.prop, scope.row)">
								<i v-if="scope.row[item.prop] == '0'" class="iconfont layui-icon-extend-upArrow" style="color: #00aa00"></i>
								<i
									v-else-if="scope.row[item.prop] == '1'"
									class="iconfont layui-icon-extend-rightArrow"
									style="color: #00aa00"
								></i>
								<i v-else-if="scope.row[item.prop] == '2'" class="iconfont layui-icon-extend-zhengque" style="color: #00aa00"></i>
								<i v-else-if="scope.row[item.prop] == '-1'" class="iconfont layui-icon-extend-cuowu" style="color: #ff0000"></i>
							</span>
						</el-tooltip>
					</template>
				</el-table-column>

				<!-- Link -->
				<el-table-column
					v-else-if="item.type == 'Link'"
					show-overflow-tooltip
					:prop="item.prop"
					:width="item.width"
					:fixed="item.fixed"
				>
					<template #header>
						<div @click="tableSor(item.prop)">
							<label>{{ item.label ? $t(item.label) : item.title }}</label>
							<span class="caret-wrapper">
								<i class="sort-caret ascending"></i>
								<i class="sort-caret descending"></i>
							</span>
						</div>
						<!-- 表单组件 -->
						<div v-show="tablePropSearchShow">
							<el-input v-model="tablePropSearch[item.prop]" size="small" />
						</div>
					</template>
					<template #default="scope">
						<span>
							<el-link @click="linkDetailbg(item.prop, scope.row)" type="primary">{{ scope.row[item.prop] }} </el-link>
						</span>
					</template>
				</el-table-column>

				<!-- operation -->
				<el-table-column v-else-if="item.type == 'operation'" :prop="item.prop" :width="item.width" :fixed="item.fixed">
					<template #header>
						<div class="flx-center">
							<el-button type="primary">{{ item.label ? $t(item.label) : item.title }}</el-button>
						</div>
					</template>
					<template #default="scope">
						<slot name="operation" :row="scope.row"></slot>
					</template>
				</el-table-column>

				<!-- Custom -->
				<el-table-column
					v-else-if="item.type == 'Custom'"
					show-overflow-tooltip
					:prop="item.prop"
					:width="item.width"
					:fixed="item.fixed"
				>
					<template #header>
						<div @click="tableSor(item.prop)">
							<label>{{ item.label ? $t(item.label) : item.title }}</label>
							<span class="caret-wrapper">
								<i class="sort-caret ascending"></i>
								<i class="sort-caret descending"></i>
							</span>
						</div>
						<!-- 表单组件 -->
						<div v-show="tablePropSearchShow">
							<el-select v-if="item.type == 'Select'" v-model="tablePropSearch[item.prop]" size="small">
								<template v-for="item1 in item.typeData" :key="item">
									<el-option
										:label="
											item.label != 'i18nCustomerapplicationCustomerCreateInformationArea' &&
											item.label != 'i18nCustomerapplicationCustomerCreateInformationProvince' &&
											item.label != 'i18nCustomerapplicationCustomerCreateInformationCityCenter' &&
											item1.label
												? $t(item1.label)
												: item1.label
										"
										:value="item1.value"
									/>
								</template>
							</el-select>
							<el-date-picker
								v-else-if="item.type == 'Date'"
								v-model="tablePropSearch[item.prop]"
								type="date"
								format="YYYY-MM-DD"
								size="small"
							/>
							<el-date-picker
								v-else-if="item.type == 'DateTime'"
								v-model="tablePropSearch[item.prop]"
								type="datetime"
								format="YYYY-MM-DD hh:mm:ss"
								size="small"
							/>
							<el-input-number
								v-else-if="item.type == 'Number'"
								controls-position="right"
								:min="0"
								v-model="tablePropSearch[item.prop]"
								size="small"
							/>
							<el-input v-else v-model="tablePropSearch[item.prop]" size="small" />
						</div>
					</template>
					<template #default="scope">
						<slot name="Custom" :row="scope.row" :column="item.prop"></slot>
					</template>
				</el-table-column>

				<!-- other -->
				<el-table-column
					v-else-if="item.type && item.prop && !item.isHide"
					show-overflow-tooltip
					:prop="item.prop"
					:width="item.width"
				>
					<template #header>
						<div @click="tableSor(item.prop)">
							<label>{{ item.label ? $t(item.label) : item.title }}</label>
							<span class="caret-wrapper">
								<i class="sort-caret ascending"></i>
								<i class="sort-caret descending"></i>
							</span>
						</div>
						<!-- 表单组件 -->
						<div v-show="tablePropSearchShow">
							<el-select v-if="item.type == 'Select'" v-model="tablePropSearch[item.prop]" size="small">
								<template v-for="item1 in item.typeData" :key="item">
									<el-option
										:label="
											item.label != 'i18nCustomerapplicationCustomerCreateInformationArea' &&
											item.label != 'i18nCustomerapplicationCustomerCreateInformationProvince' &&
											item.label != 'i18nCustomerapplicationCustomerCreateInformationCityCenter' &&
											item1.label
												? $t(item1.label)
												: item1.label
										"
										:value="item1.value"
									/>
								</template>
							</el-select>
							<el-date-picker
								v-else-if="item.type == 'Date'"
								v-model="tablePropSearch[item.prop]"
								type="date"
								format="YYYY-MM-DD"
								size="small"
							/>
							<el-date-picker
								v-else-if="item.type == 'DateTime'"
								v-model="tablePropSearch[item.prop]"
								type="datetime"
								format="YYYY-MM-DD hh:mm:ss"
								size="small"
							/>
							<el-input-number
								v-else-if="item.type == 'Number'"
								controls-position="right"
								:min="0"
								v-model="tablePropSearch[item.prop]"
								size="small"
							/>
							<el-input v-else v-model="tablePropSearch[item.prop]" size="small" />
						</div>
					</template>
					<template v-if="item.edit" #default="scope">
						<span v-show="!scope.row.editShow">
							<template v-if="item.type == 'Select'">{{
								item.label != "i18nCustomerapplicationCustomerCreateInformationArea" &&
								item.label != "i18nCustomerapplicationCustomerCreateInformationProvince" &&
								item.label != "i18nCustomerapplicationCustomerCreateInformationCityCenter"
									? $t(selectText(scope.row[item.prop], item.typeData))
									: selectText(scope.row[item.prop], item.typeData)
							}}</template>
							<template v-else>{{ scope.row[item.prop] }}</template>
						</span>
						<!-- 表单组件 -->
						<div v-show="scope.row.editShow">
							<el-select v-if="item.type == 'Select'" v-model="scope.row[item.prop]">
								<template v-for="item1 in item.typeData" :key="item">
									<el-option
										:label="
											item.label != 'i18nCustomerapplicationCustomerCreateInformationArea' &&
											item.label != 'i18nCustomerapplicationCustomerCreateInformationProvince' &&
											item.label != 'i18nCustomerapplicationCustomerCreateInformationCityCenter' &&
											item1.label
												? $t(item1.label)
												: item1.label
										"
										:value="item.value"
									/>
								</template>
							</el-select>
							<el-date-picker
								v-else-if="item.type == 'Date'"
								v-model="scope.row[item.prop]"
								type="date"
								format="YYYY-MM-DD"
								value-format="YYYY-MM-DD"
							/>
							<el-date-picker
								v-else-if="item.type == 'DateTime'"
								v-model="scope.row[item.prop]"
								type="datetime"
								format="YYYY-MM-DD hh:mm:ss"
								value-format="YYYY-MM-DD hh:mm:ss"
							/>
							<el-input-number
								v-else-if="item.type == 'Number'"
								controls-position="right"
								:min="0"
								v-model="scope.row[item.prop]"
							/>
							<el-input v-else v-model="scope.row[item.prop]" />
						</div>
					</template>
					<template v-else #default="scope">
						<span>
							<template v-if="item.type == 'Select'">{{
								item.label != "i18nCustomerapplicationCustomerCreateInformationArea" &&
								item.label != "i18nCustomerapplicationCustomerCreateInformationProvince" &&
								item.label != "i18nCustomerapplicationCustomerCreateInformationCityCenter"
									? $t(selectText(scope.row[item.prop], item.typeData))
									: selectText(scope.row[item.prop], item.typeData)
							}}</template>
							<template v-else>{{ scope.row[item.prop] }}</template>
						</span>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<div class="flex-row main-pagination-block">
			<div class="flex-1"></div>
			<el-pagination
				:small="paginationSmall"
				:currentPage="params.page"
				:page-size="params.limit"
				:page-sizes="[25, 50, 100, 200]"
				:background="true"
				layout="total, sizes, prev, pager, next, jumper"
				:total="params.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script setup name="zTable">
import { exportDataSourceToExcel } from "/src/utils/exportExcel.js";
import { onMounted, ref, computed, reactive, watch } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "@/store/globalStore.js";

const i18n = useI18n();
const globalStore = GlobalStore();
const tableRef = ref();

//分页组件大小
const paginationSmall = computed(() => {
	if (globalStore.assemblySize == "small") {
		return true;
	}
	return false;
});

// 表格加载 loading
const loading = ref(false);

//排序
let sortvalue = ref("ascending");
//显示隐藏快捷查询
const tablePropSearchShow = ref(false);

//请求头配置
let config = reactive({
	headers: {
		noLoading: true //隐藏加载--
	}
});

//参数
let params = reactive({
	// 当前页数
	page: 1,
	// 每页显示条数
	limit: 25,
	// 总条数
	total: 0,
	//开始数量
	start: 0,
	jsonString: ""
});
// 快捷查询
let tablePropSearch = reactive({});
// 是否选中数据
const isSelected = ref(false);
// 选中的数据列表
const selectList = ref([]);
//选中原始的数据源
const selectRowArr = ref([]);

// 父组件传入的参数
const props = defineProps({
	tableList: {
		noLoading: true, //true为 隐藏加载
		isRadio: false, // 是否设置单选，false不设置
		isRequest: false, //页面渲染完成，是否调请求接口，false不调
		//表格工具栏
		tableToolbar: {
			whole: true, //显示全部表格工具栏
			left: true, //显示左表格工具栏
			right: true, //显示右全部表格工具栏
			right_download: true, //显示右下载
			right_filter: true, //显示右过滤
			right_query: true, //显示右查询
			right_empty: true //显示右清空
		},
		//请求属性
		httpAttribute: {},
		//表格表头
		tableColumns: [],
		//快捷查询
		tablePropSearch: {},
		// 表格数据
		tableData: []
	}
});

//显示加载--
if (props.tableList.noLoading === false) {
	config.headers.noLoading = false;
}

//先判断父组件传入的参数，表格工具栏,默认全部显示
if (props.tableList.tableToolbar) {
	typeof props.tableList.tableToolbar.whole == "undefined" ? (props.tableList.tableToolbar.whole = true) : false;
	typeof props.tableList.tableToolbar.left == "undefined" ? (props.tableList.tableToolbar.left = true) : false;
	typeof props.tableList.tableToolbar.right == "undefined" ? (props.tableList.tableToolbar.right = true) : false;
	typeof props.tableList.tableToolbar.right_download == "undefined"
		? (props.tableList.tableToolbar.right_download = true)
		: false;
	typeof props.tableList.tableToolbar.right_filter == "undefined" ? (props.tableList.tableToolbar.right_filter = true) : false;
	typeof props.tableList.tableToolbar.right_query == "undefined" ? (props.tableList.tableToolbar.right_query = true) : false;
	typeof props.tableList.tableToolbar.right_empty == "undefined" ? (props.tableList.tableToolbar.right_empty = true) : false;
} else {
	props.tableList.tableToolbar = {
		whole: true,
		left: true,
		right: true,
		right_download: true,
		right_filter: true,
		right_query: true,
		right_empty: true
	};
}

//判断 是否单选 是否隐藏全选
let RadioDisplay = ref("block");
if (props.tableList.isRadio) {
	RadioDisplay = "none";
}

//判断请求属性是否为空
if (props.tableList.httpAttribute) {
	if (props.tableList.httpAttribute.baseParams) {
		for (let key in props.tableList.httpAttribute.baseParams) {
			params[key] = props.tableList.httpAttribute.baseParams[key];
		}
		// params = Object.assign(params, props.tableList.httpAttribute.baseParams);
	}
}

watch(props.tableList.httpAttribute.baseParams, async (newValue, oldValue) => {
	reuseTableList(newValue);
});

//baseParams发生变化重新调用
const reuseTableList = async newValue => {
	for (let key in newValue) {
		params[key] = newValue[key];
	}
	try {
		loading.value = true;
		const res = await http.post(props.tableList.httpAttribute.url, qs.stringify(params), config); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			//对数据源进行处理
			handleTableData(res);
		}
	} finally {
		loading.value = false;
	}
};

if (props.tableList.tablePropSearch) {
	tablePropSearch = props.tableList.tablePropSearch;
}

//获取id字段
let listId = "id";
// 获取表头字段
let tableHanderArr = ["submitcorp", "auditflag", "workflowid"];
props.tableList.tableColumns.forEach(item => {
	if (item.type == "id") {
		listId = item.prop;
	}
	if (item.type != "workflowStatus" && item.type != "selection" && item.type != "index" && item.type != "operation") {
		tableHanderArr.push(item.prop);
	}
});

// 当前选中的所有ids(数组)，可根据项目自行配置id字段
const selectListIds = computed(() => {
	let ids = [];
	selectList.value.forEach(item => {
		ids.push(item[listId]);
	});
	return ids;
});

//快捷查询字段
params.jsonString = computed(() => {
	let jsonString = {
		cond: {}
	};
	for (let key in tablePropSearch) {
		if (tablePropSearch[key]) {
			jsonString.cond[key] = tablePropSearch[key] + "";
		}
	}
	return JSON.stringify(jsonString);
});

//获取数据源
const getTableList = async () => {
	try {
		loading.value = true;
		const res = await http.post(props.tableList.httpAttribute.url, qs.stringify(params), config); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			//对数据源进行处理
			handleTableData(res);
		}
	} finally {
		loading.value = false;
	}
};

//对数据源进行处理
const handleTableData = res => {
	if (props.tableList.httpAttribute.root) {
		if (res[props.tableList.httpAttribute.root]) {
			let tableData = res[props.tableList.httpAttribute.root];
			for (let i = 0; i < tableData.length; i++) {
				let item = tableData[i];
				if (item.retrieveflag == 1) {
					item.processflag = -1;
				} else {
					item.processflag = item.auditflag;
				}
			}
			props.tableList.tableData = tableData;
			params.total = res[props.tableList.httpAttribute.root + "_num"];
		}
	} else {
		let tableData = [];
		if (Array.isArray(res)) {
			tableData = res;
		} else {
			tableData.push(res);
		}
		props.tableList.tableData = tableData;
	}

	//默认单选选中第一行
	tableRef.value.setCurrentRow(props.tableList.tableData[0]);
};

//下拉选择框字段显示
const selectText = (row, typeData) => {
	let text = row;
	for (let item of typeData) {
		if (item.value == row) {
			text = item.label;
			break;
		}
	}
	return text;
};

//审核状态显示
const workflowStatusText = row => {
	let text = "";
	if (row == 0) {
		text = i18n.t("AUDITFLAG_0");
	} else if (row == 1) {
		text = i18n.t("AUDITFLAG_1");
	} else if (row == 2) {
		text = i18n.t("AUDITFLAG_2");
	} else if (row == -1) {
		text = i18n.t("AUDITFLAG_9");
	}
	return text;
};

// // 保存选中的数据id,row-key就是要指定一个key标识这一行的数据
// const getRowKeys = (row) => {
// 	console.log("selection", row);
// 	// return row.id
// };

//排序
const tableSor = tableProp => {
	sortvalue.value == "ascending" ? (sortvalue.value = "descending") : (sortvalue.value = "ascending");
	tableRef.value.sort(tableProp, sortvalue.value);
};

//当用户手动勾选数据行的 Checkbox 时触发的事件
const select = async (selection, row) => {
	//单选操作
	if (props.tableList.isRadio) {
		// 清除 所有勾选项
		await tableRef.value.clearSelection();
		// 当表格数据都没有被勾选的时候 就返回
		// 主要用于将当前勾选的表格状态清除
		if (selection.length == 0) return;
		await tableRef.value.toggleRowSelection(row, true);
	}
};

//当表格的当前行发生变化的时候会触发该事件
const currentChange = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		currentRow.editShow = true;
	}
	if (oldCurrentRow) {
		oldCurrentRow.editShow = false;
	}
	emits("currentChange", currentRow, oldCurrentRow);
};

// 表格某一行的单击事件
const rowClick = (row, column, event) => {
	//单选操作
	if (props.tableList.isRadio) {
		// 清除 所有勾选项
		tableRef.value.clearSelection();
		tableRef.value.toggleRowSelection(row, true);
	} else {
		// 清除 所有勾选项
		//tableRef.value.clearSelection();
		//tableRef.value.toggleRowSelection(row, true);
	}
	emits("rowClick", row, column, event);
};

/**
 * @description 多选操作
 * @param {Array} rowArr 当前选择的所有数据
 * @return void
 */
const selectionChange = rowArr => {
	rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true);
	selectRowArr.value = rowArr;
	//根据 表头的列字段，把勾选的数据源进行封装
	selectList.value = [];
	rowArr.forEach(item => {
		let obj = {};
		tableHanderArr.forEach(key => {
			obj[key] = item[key];
		});
		selectList.value.push(obj);
	});
};

// 如果当前表格为编辑表格，该方法为编辑后选中的数据源，一般用于保存
const getselectList = () => {
	//根据 表头的列字段，把勾选的数据源进行封装
	let srtList = [];
	selectRowArr.value.forEach(item => {
		let obj = {};
		tableHanderArr.forEach(key => {
			obj[key] = item[key];
		});
		srtList.push(obj);
	});
	return srtList;
};

//过滤
const tableFilter = () => {
	tablePropSearchShow.value = tablePropSearchShow.value ? false : true;
	tableRef.value.sort(props.tableList.tableColumns[1].prop, "");
};
//导出表格数据
const tableExport = () => {
	let tableColumns = props.tableList.tableColumns;
	let tableHander = {};
	tableColumns.forEach(item => {
		if (item.type != "selection" && item.type != "index" && item.type != "operation") {
			tableHander[item.prop] = item.label ? i18n.t(item.label) : item.title;
		}
	});
	exportDataSourceToExcel(props.tableList.tableData, tableHander, "tableExport");
};

//清空快捷查询值
const tableResetSearch = () => {
	for (let i in tablePropSearch) {
		tablePropSearch[i] = "";
	}
};

/**
 * @description 每页条数改变
 * @param {Number} val 当前条数
 * @return void
 * */
const handleSizeChange = val => {
	params.page = 1;
	params.limit = val;
	params.start = 0;
	getTableList();
};

/**
 * @description 当前页改变
 * @param {Number} val 当前页
 * @return void
 * */
const handleCurrentChange = val => {
	params.page = val;
	if (val == 1) {
		params.start = 0;
	} else {
		params.start = (val - 1) * params.limit;
	}
	getTableList();
};

//快捷查询
const quickQuery = () => {
	// let jsonString = {
	// 	cond: {}
	// };
	// for (let key in tablePropSearch) {
	// 	if (tablePropSearch[key]) {
	// 		jsonString.cond[key] = tablePropSearch[key] + "";
	// 	}
	// }
	// params.jsonString = JSON.stringify(jsonString);
	getTableList();
};

//链接详细信息
const linkDetailbg = (column, row) => {
	emits("linkDetailbg", column, row);
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	emits("workflowStatus", column, row);
};

//返回Table 的 refs
const getTablerefs = () => {
	return tableRef;
};

//添加行数据
const addRowData = () => {
	let row = {};
	for (let Columns of props.tableList.tableColumns) {
		if (Columns.prop) {
			row[Columns.prop] = null;
		}
	}
	props.tableList.tableData.unshift(row);
	console.log("tableRef", tableRef);
	tableRef.value.toggleRowSelection(row, true);
};

//页面初始化渲染完成执行
onMounted(() => {
	//面初始化渲染完成 是否调请求
	if (props.tableList.isRequest) {
		getTableList();
	}
});

//注册emit // 抛出事件
const emits = defineEmits(["currentChange", "linkDetailbg", "workflowStatus", "rowClick"]);
// 暴露给父组件的参数和方法
defineExpose({
	getTableList,
	getTablerefs,
	addRowData
});
</script>

<style scoped lang="scss">
/*隐藏表头复选框*/
:deep(.el-table__header .el-table-column--selection .cell .el-checkbox) {
	display: v-bind(RadioDisplay);
}
</style>
