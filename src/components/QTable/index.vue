<template>
	<div v-loading="loading" class="flex-1 all-height flex-column">
		<div v-if="props.tableList.tableToolbar.whole" class="flex-row flx-center" style="margin-bottom: 10px; margin-top: 10px">
			<div class="flex-1">
				<div v-if="props.tableList.tableToolbar.left" style="text-align: left">
					<slot name="tableHeaderLleft" :ids="selectListIds" :selectList="selectList" :isSelected="isSelected"> </slot>
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
			:data="props.tableList.tableData"
			:row-key="listId"
			:cell-class-name="cellClassName"
			@current-change="currentChange"
			@selection-change="selectionChange"
			@select="select"
			@row-click="rowClick"
			@cell-click="cellClick"
			@header-dragend="headerDragend"
		>
			<template v-for="(item, index) in props.tableList.tableColumns" :key="item.type + item.prop + index">
				<!-- selection || index -->
				<el-table-column
					v-if="item.type == 'selection' || item.type == 'index'"
					:type="item.type"
					:label="item?.label ? $t(item.label) : item.title"
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
					class-name="columnDrop"
				>
					<!-- 数据行 -->
					<template #default="scope">
						<el-tooltip class="box-item" effect="dark" :content="workflowStatusText(scope.row[item.prop])" placement="right">
							<span @click="workflowStatus(item.prop, scope.row)">
								<i
									v-if="scope.row[item.prop] == '0'"
									class="iconfont layui-icon-extend-upArrow font-size-base"
									style="color: #00aa00"
								></i>
								<i
									v-else-if="scope.row[item.prop] == '1'"
									class="iconfont layui-icon-extend-rightArrow font-size-base"
									style="color: #00aa00"
								></i>
								<i
									v-else-if="scope.row[item.prop] == '2'"
									class="iconfont layui-icon-extend-zhengque font-size-base"
									style="color: #00aa00"
								></i>
								<i
									v-else-if="scope.row[item.prop] == '-1'"
									class="iconfont layui-icon-extend-cuowu font-size-base"
									style="color: #ff0000"
								></i>
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
					<!-- 表头 -->
					<template #header>
						<div class="columnDrop" style="white-space: nowrap" @click="tableSor(item.prop)">
							<label>{{ item.label ? $t(item.label) : item.title }}</label>
							<span class="caret-wrapper">
								<i class="sort-caret ascending"></i>
								<i class="sort-caret descending"></i>
							</span>
						</div>
						<!-- 表单组件 -->
						<div v-if="tablePropSearchShow">
							<el-input v-model="tablePropSearch[item.prop]" size="small" />
						</div>
					</template>
					<!-- 数据行 -->
					<template #default="scope">
						<span>
							<el-link @click="linkDetailbg(item.prop, scope.row)" type="primary">{{ scope.row[item.prop] }} </el-link>
						</span>
					</template>
				</el-table-column>

				<!-- operation -->
				<el-table-column v-else-if="item.type == 'operation'" :prop="item.prop" :width="item.width" :fixed="item.fixed">
					<!-- 表头 -->
					<template #header>
						<div class="flx-center">
							<label style="color: #409eff">{{ item.label ? $t(item.label) : item.title }}</label>
							<!-- <el-button type="primary">{{ item.label ? $t(item.label) : item.title }}</el-button> -->
						</div>
					</template>
					<!-- 数据行 -->
					<template #default="scope">
						<!-- <el-scrollbar>
							<div class="flex-row" :style="{ height: operationColumnHeight + `px` }">
								<slot name="operation" :row="scope.row"></slot>
							
						</el-scrollbar> -->

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
					<!-- 表头 -->
					<template #header>
						<div class="columnDrop" style="white-space: nowrap" @click="tableSor(item.prop)">
							<label>{{ item.label ? $t(item.label) : item.title }}</label>
							<span class="caret-wrapper">
								<i class="sort-caret ascending"></i>
								<i class="sort-caret descending"></i>
							</span>
						</div>
						<!-- 表单组件 -->
						<div v-if="tablePropSearchShow">
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
							<template v-else-if="item.type == 'Number'">
								<el-input-number
									v-if="isNumber(item?.min) && isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
									:min="item.min"
									:precision="item.precision"
								/>
								<el-input-number
									v-else-if="isNumber(item?.min) && !isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
									:min="item.min"
								/>
								<el-input-number
									v-else-if="!isNumber(item?.min) && isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
									:precision="item.precision"
								/>
								<el-input-number
									v-else-if="!isNumber(item?.min) && !isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
								/>
							</template>
							<el-input v-else v-model="tablePropSearch[item.prop]" size="small" />
						</div>
					</template>
					<!-- 数据行 -->
					<template #default="scope">
						<slot name="Custom" :row="scope.row" :item="item" :column="item.prop"></slot>
					</template>
				</el-table-column>

				<!-- other -->
				<el-table-column
					v-else-if="item.type && item.prop && !item.isHide"
					show-overflow-tooltip
					:prop="item.prop"
					:width="item.width"
				>
					<!-- 表头 -->
					<template #header>
						<div class="columnDrop" style="white-space: nowrap" @click="tableSor(item.prop)">
							<label>{{ item.label ? $t(item.label) : item.title }}</label>
							<span class="caret-wrapper">
								<i class="sort-caret ascending"></i>
								<i class="sort-caret descending"></i>
							</span>
						</div>
						<!-- 表单组件 -->
						<div v-if="tablePropSearchShow">
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
							<template v-else-if="item.type == 'Number'">
								<el-input-number
									v-if="isNumber(item?.min) && isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
									:min="item.min"
									:precision="item.precision"
								/>
								<el-input-number
									v-else-if="isNumber(item?.min) && !isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
									:min="item.min"
								/>
								<el-input-number
									v-else-if="!isNumber(item?.min) && isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
									:precision="item.precision"
								/>
								<el-input-number
									v-else-if="!isNumber(item?.min) && !isNumber(item?.precision)"
									controls-position="right"
									style="width: 100%"
									size="small"
									v-model.number="tablePropSearch[item.prop]"
								/>
							</template>
							<el-input v-else v-model="tablePropSearch[item.prop]" size="small" />
						</div>
					</template>
					<!-- 数据行 -->
					<template #default="scope">
						<span>
							<template v-if="item.type == 'Select'">{{
								item.label != "i18nCustomerapplicationCustomerCreateInformationArea" &&
								item.label != "i18nCustomerapplicationCustomerCreateInformationProvince" &&
								item.label != "i18nCustomerapplicationCustomerCreateInformationCityCenter" &&
								scope.row[item.prop]
									? $t(selectText(scope.row[item.prop], item.typeData))
									: selectText(scope.row[item.prop], item.typeData)
							}}</template>
							<template v-else-if="item.type == 'Number'">
								{{ isNumber(item?.precision) ? parseFloat(scope.row[item.prop]).toFixed(item?.precision) : scope.row[item.prop] }}
							</template>
							<template v-else>{{ scope.row[item.prop] }}</template>
						</span>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<div v-if="props.tableList.isPaging" class="flex-row main-pagination-block">
			<div class="flex-1"></div>
			<el-pagination
				:small="paginationSmall"
				:currentPage="params.page"
				:page-size="params.limit"
				:page-sizes="[25, 50, 100]"
				:background="true"
				layout="total, sizes, prev, pager, next, jumper"
				:total="params.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script setup name="qTable">
import { exportDataSourceToExcel } from "/src/utils/exportExcel.js";
import { onMounted, ref, computed, reactive, nextTick } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "@/store/globalStore.js";
import Sortable from "sortablejs";
import moment from "moment";

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
//单选数据
const SingleChoiceRow = ref({});

//可编辑时，表单组件ref数组
const formComponentRef = {};

// 父组件传入的参数
const props = defineProps({
	tableList: {
		type: Object,
		default: {
			id: {
				//必传，主要用于列拖拽
				type: String,
				default: "tableid"
			},
			isPaging: {
				//是否显示分页
				type: Boolean,
				default: true
			},
			noLoading: {
				//true为 隐藏加载
				type: Boolean,
				default: true
			},
			isRadio: {
				// 是否设置单选，false不设置
				type: Boolean,
				default: false
			},
			isRequest: {
				//页面渲染完成，是否调请求接口，false不调
				type: Boolean,
				default: false
			},
			tableToolbar: {
				//表格工具栏
				type: Object,
				default: {
					whole: {
						//显示全部表格工具栏
						type: Boolean,
						default: true
					},
					left: {
						//显示左表格工具栏
						type: Boolean,
						default: true
					},
					right: {
						//显示右全部表格工具栏
						type: Boolean,
						default: true
					},
					right_download: {
						//显示右下载
						type: Boolean,
						default: true
					},
					right_filter: {
						//显示右过滤
						type: Boolean,
						default: true
					},
					right_query: {
						//显示右查询
						type: Boolean,
						default: true
					},
					right_empty: {
						//显示右清空
						type: Boolean,
						default: true
					}
				}
			},
			httpAttribute: {
				//请求属性
				type: Object,
				default: {
					url: {
						type: String,
						default: null
					},
					root: {
						type: String,
						default: null
					},
					baseParams: {
						type: Object,
						default() {
							return {};
						}
					}
				}
			},
			//表格表头
			tableColumns: {
				type: Array,
				default() {
					return [];
				}
			},

			// 表格数据
			tableData: {
				type: Array,
				default() {
					return [];
				}
			},

			tablePropSearch: {
				//快捷查询
				type: Object,
				default() {
					return {};
				}
			}
		}
	}
});

//根据传入的列，把隐藏的列排后面，(目前列拖拽需要)
const compare = (obj1, obj2) => {
	let isHide1 = obj1?.isHide ?? false;
	let isHide2 = obj2?.isHide ?? false;
	if (isHide1 == false && isHide2 == true) {
		return -1;
	} else if (isHide1 == true && isHide2 == false) {
		return 1;
	} else {
		return 0;
	}
};
if (props?.tableList?.tableColumns) {
	props?.tableList?.tableColumns.sort(compare);
}

//查询后台列拖拽接口是否有数据，有就按照接口列数据。
const getTableColumnsApi = async () => {
	const res = await http.post(
		"/core/framework/ext/column!getColumnByGid.action?id=" + props?.tableList?.id,
		qs.stringify({ gridid: props?.tableList?.id }),
		config
	);
	if (res?.column) {
		let backstageTableColumns = JSON.parse(res?.column); //后台的列
		let localTableColumns = props.tableList.tableColumns; //本地的列
		let is_local_backstage = true; //本地与后台列是否匹配
		//本地与后台列的个数相等时，（本地与后台列的个数不对时，说明已经改动过，直接按本地列渲染）
		if (localTableColumns.length == backstageTableColumns.length) {
			//本地与后台的列是否匹配,不匹配时说明已经改动过，那么也按本地列渲染
			for (let localColumn of localTableColumns) {
				for (let backstageColumn of backstageTableColumns) {
					if (localColumn.type == "selection" || localColumn.type == "index") {
						if (localColumn.type == "selection" && backstageColumn.type == "selection") {
							//匹配时，重新赋值,并默认后台保存的宽度
							for (let key in localColumn) {
								if (key == "width") {
									if (!backstageColumn[key]) backstageColumn[key] = localColumn[key];
								} else {
									backstageColumn[key] = localColumn[key];
								}
							}
							is_local_backstage = true;
							break;
						} else if (localColumn.type == "index" && backstageColumn.type == "index") {
							//匹配时，重新赋值,并默认后台保存的宽度
							for (let key in localColumn) {
								if (key == "width") {
									if (!backstageColumn[key]) backstageColumn[key] = localColumn[key];
								} else {
									backstageColumn[key] = localColumn[key];
								}
							}
							is_local_backstage = true;
							break;
						} else {
							is_local_backstage = false;
						}
					} else {
						if (localColumn.prop == backstageColumn.prop) {
							//匹配时，重新赋值,并默认后台保存的宽度
							for (let key in localColumn) {
								if (key == "width") {
									if (!backstageColumn[key]) backstageColumn[key] = localColumn[key];
								} else {
									backstageColumn[key] = localColumn[key];
								}
							}
							is_local_backstage = true;
							break;
						} else {
							is_local_backstage = false;
						}
					}
				}
				if (is_local_backstage == false) {
					break;
				}
			}
			//本地与后台列不匹配，按本地渲染
			if (is_local_backstage == false) {
				return;
			} else {
				props.tableList.tableColumns = backstageTableColumns;
			}
		}
	}
};
if (props?.tableList?.id) {
	getTableColumnsApi();
}

//显示分页
if (props.tableList.isPaging !== false) {
	props.tableList.isPaging = true;
	// 当前页数
	params.page = 1;
	// 每页显示条数
	params.limit = 25;
	// 总条数
	params.total = 0;
	//开始数量
	params.start = 0;
}

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
if (props?.tableList?.isRadio) {
	RadioDisplay.value = "none";
}

if (props.tableList.tablePropSearch) {
	tablePropSearch = props.tableList.tablePropSearch;
}

//获取id字段
let listId = "id";
// 获取表头字段
let tableHanderArr = ["submitcorp", "auditflag", "workflowid"];

//获取列类型为 Number、Date 字段名
let typeFieldName = {};

props?.tableList?.tableColumns?.forEach(item => {
	//获取id
	if (item.type == "id") {
		listId = item.prop;
	}
	//获取选中时需要的表头字段
	if (item.type != "workflowStatus" && item.type != "selection" && item.type != "index" && item.type != "operation") {
		tableHanderArr.push(item.prop);
	}

	if (item.type == "Number") {
		typeFieldName[item.prop] = "Number";
	}
	if (item.type == "Date") {
		typeFieldName[item.prop] = "Date";
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

//判断是否是数字,是就返回true
const isNumber = val => {
	return !isNaN(parseFloat(val)) && isFinite(val);
};
//把字符串类型转数字类型，
const stringToNumber = val => {
	return Number(val);
};

//对数据源进行格式处理，数字，日期
const dataFormatProcessing = tableData => {
	if (typeFieldName && Object.keys(typeFieldName).length > 0) {
		for (let rowData of tableData) {
			for (let key in typeFieldName) {
				if (typeFieldName[key] == "Number") {
					rowData[key] = isNumber(rowData[key]) ? stringToNumber(rowData[key]) : null;
				}
				if (typeFieldName[key] == "Date") {
					rowData[key] = rowData[key] ? moment(new Date(rowData[key])).format("YYYY-MM-DD") : null;
				}
			}
		}
	}
};

//获取数据源
const getTableList = async () => {
	//判断请求属性是否为空
	if (props.tableList.httpAttribute) {
		if (props.tableList.httpAttribute.baseParams) {
			for (let key in props.tableList.httpAttribute.baseParams) {
				params[key] = props.tableList.httpAttribute.baseParams[key];
			}
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
	}
};

//baseParams发生变化重新调用
const reuseTableList = async () => {
	let newBaseParams = props.tableList.httpAttribute.baseParams;
	for (let key in newBaseParams) {
		params[key] = newBaseParams[key];
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

//对数据源进行处理
const handleTableData = res => {
	let tableData = [];
	if (props.tableList.httpAttribute.root) {
		if (res[props.tableList.httpAttribute.root]) {
			tableData = res[props.tableList.httpAttribute.root];
			//对数据源进行格式处理，数字，日期
			dataFormatProcessing(tableData);
			for (let i = 0; i < tableData.length; i++) {
				let item = tableData[i];
				if (item.retrieveflag == 1) {
					item.processflag = -1;
				} else {
					item.processflag = item.auditflag;
				}
			}
			params.total = res[props.tableList.httpAttribute.root + "_num"];
		}
	} else {
		if (Array.isArray(res)) {
			tableData = res;
		} else {
			tableData.push(res);
		}
		//对数据源进行格式处理，数字，日期
		dataFormatProcessing(tableData);
	}
	props.tableList.tableData = tableData;
	if (tableData.length > 0) {
		//默认单选选中第一行
		tableRef.value.setCurrentRow(props.tableList.tableData[0]);
		//单选操作
		if (props?.tableList?.isRadio) {
			setTimeout(() => {
				//如果是单选，勾选第一行
				tableRef.value.toggleRowSelection(props.tableList.tableData[0], true);
			}, 100);
		}
	}
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
		await tableRef.value.setCurrentRow(row);
	}
};

//当表格的当前行发生变化的时候会触发该事件
const currentChange = (currentRow, oldCurrentRow) => {
	emits("currentChange", currentRow, oldCurrentRow);

	if (currentRow) {
		SingleChoiceRow.value = currentRow;
	}
	if (oldCurrentRow) {
	}
};

// 表格某一行的单击事件
const rowClick = (row, column, event) => {
	emits("rowClick", row, column, event);

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
};

// 赋值动态表单组件ref到变量
const setFormComponentRef = (el, key) => {
	if (el) {
		formComponentRef[key] = el;
	}
};

//当某个单元格被点击时会触发该事件
const cellClick = (row, column, cell, event) => {
	emits("cellClick", row, column, cell, event);
};

//单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
const cellClassName = ({ row, column, rowIndex, columnIndex }) => {
	//当单元格是操作列的时候，修改样式
	// if (column.property == "operation") {
	// 	return "table-operationColumn-class"; // class名称
	// }
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

	emits("selectionChange", rowArr);
};

//拖动列宽事件
const headerDragend = async (newWidth, oldWidth, column, event) => {
	props.tableList.tableColumns[column.no].width = newWidth;
	if (props?.tableList?.id) {
		await saveColumnDrop();
	}
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

// 操作列 高度
const operationColumnHeight = computed(() => {
	if (globalStore.assemblySize == "small") {
		return 31;
	} else if (globalStore.assemblySize == "large") {
		return 47;
	} else {
		return 39;
	}
});

// 列放置 （列拖拽）
const columnDrop = () => {
	nextTick(() => {
		const wrapper = tableRef.value.$el.querySelector(".el-table__body thead tr ");
		Sortable.create(wrapper, {
			handle: ".columnDrop",
			animation: 300,
			delay: 0,
			onEnd: async ({ newIndex, oldIndex }) => {
				const oldItem = props.tableList.tableColumns[oldIndex];
				props.tableList.tableColumns.splice(oldIndex, 1);
				props.tableList.tableColumns.splice(newIndex, 0, oldItem);
				if (props?.tableList?.id) {
					await saveColumnDrop();
				}
			}
		});
	});
};

// 列放置 （列拖拽）
const columnDrop1 = () => {
	nextTick(() => {
		const wrapper = tableRef.value.$el.querySelector(" .el-table .el-table__header thead tr ");
		Sortable.create(wrapper, {
			handle: ".columnDrop",
			animation: 300,
			delay: 0,
			onEnd: async ({ newIndex, oldIndex }) => {
				const oldItem = props.tableList.tableColumns[oldIndex];
				props.tableList.tableColumns.splice(oldIndex, 1);
				props.tableList.tableColumns.splice(newIndex, 0, oldItem);
				if (props?.tableList?.id) {
					await saveColumnDrop();
				}
			}
		});
	});
};

//保存列拖拽后的顺序
const saveColumnDrop = async () => {
	let tableColumns = JSON.parse(JSON.stringify(props.tableList.tableColumns));
	tableColumns.forEach(column => {
		for (let key in column) {
			if (key != "prop" && key != "width" && key != "type") {
				delete column[key];
			}
		}
	});
	const res = await http.post(
		"/core/framework/ext/column!gridmoveVue.action",
		qs.stringify({ gridid: props?.tableList?.id, column: JSON.stringify(tableColumns) }),
		config
	);
};

//页面初始化渲染完成执行
onMounted(() => {
	//面初始化渲染完成 是否调请求
	if (props.tableList.isRequest) {
		getTableList();
	}
	nextTick(() => {
		columnDrop();
		columnDrop1();
	});
});

//注册emit // 抛出事件
const emits = defineEmits(["currentChange", "linkDetailbg", "workflowStatus", "rowClick", "cellClick", "selectionChange"]);
// 暴露给父组件的参数和方法
defineExpose({
	getTableList, //调用接口
	getTablerefs, // ref
	formComponentRef, //可编辑时，表单组件ref数组
	selectListIds, // 获取选中的id
	selectList, //获取选中的数据行
	selectRowArr, // 获取选中的原始数据
	SingleChoiceRow, // 单选数据
	reuseTableList // 重新调用接口
});
</script>

<style scoped lang="scss">
/*隐藏表头复选框*/
:deep(.el-table__body thead tr .el-table-column--selection .cell .el-checkbox) {
	display: v-bind(RadioDisplay);
}
:deep(.el-table__header .el-table-column--selection .cell .el-checkbox) {
	display: v-bind(RadioDisplay);
}
</style>
<style lang="scss">
.table-operationColumn-class {
	padding: 0px 0 !important;
}
</style>
