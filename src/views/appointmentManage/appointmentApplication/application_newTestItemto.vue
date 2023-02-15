<template>
	<el-button size="small" type="primary" width="200px" icon="Document" plain @click="saveHandler(ruleFormRef)">
		{{ $t("menu_save") }}
	</el-button>
	<div class="all-height flex-column">
		<div class="flex-column" style="flex: 1; overflow: auto">
			<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData1" :rules="rules">
				<el-divider content-position="left">{{ $t("columnSampleInformation") }}</el-divider>
				<el-row class="main-align-items-center">
					<el-col :span="8">
						<el-form-item :label="$t('columnappointmentdesc47') + ':'" title1="数量" prop="COUNT">
							<el-input-number :min="1" v-model="formData1.COUNT" controls-position="right"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row class="main-align-items-center">
					<el-col :span="24">
						<el-form-item :label="$t('SearchText') + ':'" title1="搜索" prop="search">
							<el-input type="text" title1="搜索" v-model="formData1.search"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="flex-column" style="flex: 1">
				<el-table
					:data="itemTableList"
					ref="itemviw"
					style="width: 100%; margin-bottom: 20px"
					row-key="id"
					height="400px"
					border
					:load="rowExpand"
					@expand-change="expandChange"
					lazy
					resizable="true"
					default-expand-all="true"
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				>
					<!--<el-table-column type="selection" width="55" />-->
					<el-table-column
						prop="TESTDESC"
						resizable="true"
						show-overflow-tooltip="true"
						:label="$t('testiteminfotestitemstitle')"
						title="检测项目类别"
						width="500"
					>
						<template #default="scope">
							<el-checkbox v-model="scope.row.checked" />
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.TESTDESC
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="TESTCODE"
						sortable="true"
						:label="$t('testiteminfotestcodetitle')"
						v-if="false"
						title="测试编码"
						width="100"
					>
					</el-table-column>
					<el-table-column prop="TESTID" label="主键" v-if="false" width="100"> </el-table-column>
					<el-table-column prop="PRICE" :label="$t('panelcolumntotallowest_price_hkd')" title="最低价格" width="100">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{ scope.row.PRICE }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="TESTSTANDARD" :label="$t('testiteminfoteststandardpanel')" title="测试标准" width="200">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.TESTSTANDARD
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="RASPROFILEPRICES"
						:label="$t('panelcolumntotalTest_plan_costs_hkd')"
						title="测试计划费用"
						width="140"
					>
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.RASPROFILEPRICES
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="testitemcode" :label="$t('testiteminfotestcodetitle')" title="测试编码" width="140">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.testitemcode
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="exchangerate" label="汇率" v-if="false" title="汇率" width="140"> </el-table-column>
					<el-table-column
						prop="contractprice_view"
						:label="$t('itemtitlecontractcontractprice')"
						title="协议价格(view)"
						width="140"
					>
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.contractprice_view
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="contractprice"
						:label="$t('itemtitlecontractcontractprice')"
						title="协议价格(外币)"
						width="140"
						v-if="false"
					>
					</el-table-column>
					<el-table-column prop="whethertemplate" :label="$t('tabtitlemdmcorecodeinfos')" title="是否有模板" width="140">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.whethertemplate
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="discountrate" :label="$t('columnappointmentdiscount')" title="折扣率" width="140">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.discountrate
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="testitemdesc" :label="$t('menubasereferenceName')" title="参考名称" width="150">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.testitemdesc
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="PACKMARK" :label="$t('menubaseSeparable')" title="可拆分" width="150">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.PACKMARK
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="REMARK" :label="$t('panelcolumnRemark')" title="备注" width="160">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.REMARK
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="TESTANOTHERNAME" :label="$t('panelcolumnitemmark')" title="项目标记" width="140">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.TESTANOTHERNAME
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="NETPRICE" label="NETPRICE" title="NETPRICE" width="140">
						<template #default="scope">
							<span :style="{ marginLeft: '10px', color: scope.row.checked ? '#409eff' : '#606266' }">{{
								scope.row.NETPRICE
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="CORPDESC" label="检验单位" title="检验单位" v-if="false" width="140"> </el-table-column>
					<el-table-column prop="TESTFLAG" label="TESTFLAG" title="TESTFLAG" v-if="false" width="140"> </el-table-column>
					<el-table-column
						prop="contractdiscount"
						:label="$t('i18ncrmcontractdiscount')"
						title="协议价格百分比"
						v-if="false"
						width="140"
					/>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const formData1 = reactive({
	COUNT: 0,
	search: ""
});

const itemviw = ref();
const multipleSelection = ref([]);

const toggleRow = (selection, row) => {};

const clicked = ref(true);
let v_itemviewData = []; //获取检测项目最初的值
let v_row_id = "SOS"; //递归时传递的ID给递归返回子节点数据,SOS表示以接收到不用递归了
let v_row_children = []; //递归后传递出来的值救护包
const rowExpand = (row, treeNode, resolve) => {
	v_row_id = row.id;
	forTreeChildren(v_itemviewData[0].children);
	// let itemlist = itemTableList;
	// v_row_id = row.id;
	// coordinateTree(itemlist);

	//lazyTreeNodeMap.value[key] = data;
	// instance.emit("expand-change",row,true);
	if (v_row_children != null && v_row_children.length > 0) {
		resolve(v_row_children);
		v_row_children = []; //还原默认值
	}
	v_row_id = "SOS"; //还原默认值
};

//展开事件
const expandChange = expanded => {};

const selectAll = selection => {
	// selection 是选中的数据集合
};

const handleSelectionChange = row => {};
let nowTableList = reactive({});
let itemTableList = reactive([]);

//检测项查询
const itemSelect = async () => {
	let cond = { corpno: "01320588" };
	let jsonString = { cond: cond, reservnum: "08110320221028001" };
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/order/appointment!selectAppointmentTestItem.action", qs.stringify(params));

	if (res) {
		v_itemviewData = res;
		//itemTableList.push(res[0]);
		processingTreeData();
	}
};

//判断当前节点是否有子节点 Children,递归Children
// const cellRecursionChildren = rowChildren => {
// 	rowChildren.map(row => {
// 		if (row.checked) {
// 		}
// 		//判断当前节点是否有子节点 Children,递归Children
// 		if (row.children && row.children.length > 0) {
// 			cellRecursionChildren(row.children);
// 		}
// 	});
// };

const selectTreeData = selectList => {
	if (selectList != null && selectList.length > 0) {
		// cellRecursionChildren(selectList);
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	itemSelect();
});

let v_selectList = [];
const processingTreeData = () => {
	if (itemTableList.length < 1 && v_itemviewData.length > 0) {
		let list = JSON.parse(JSON.stringify(v_itemviewData));
		nowTableList = list[0];
		nowTableList.children = forTreeData(nowTableList.children);
		itemTableList.push(nowTableList);
	} else {
	}
};
//初始时数据太多会影响树的快慢
const forTreeData = listdata => {
	if (listdata.length > 0) {
		for (let i = 0; i < listdata.length; i++) {
			// if (listdata[i].checked) {
			// 	listdata[i].isChecked = true;
			// 	v_selectList.push(listdata[i]);
			// }
			if (listdata[i].expanded) {
				if (listdata[i].children && listdata[i].children.length > 0) {
					listdata[i].children = forTreeData(listdata[i].children);
				}
			} else {
				if (listdata[i].children && listdata[i].children.length > 0) {
					//还有值说明可以下拉
					listdata[i].hasChildren = true; //下拉显示
					delete listdata[i].children;
				}
			}
		}
	}
	return listdata;
};

//赋值到数据源中
const coordinateTree = listdata => {
	if (listdata.length > 0) {
		for (let i = 0; i < listdata.length; i++) {
			if (v_row_id != "SOS" && listdata[i].id == v_row_id) {
				v_row_id = "SOS"; //找到求救者坐标归位
				if (v_row_children.length > 0) {
					//赋予保障物资
					listdata[i].children = v_row_children;
				}
			} else if (v_row_id != "SOS") {
				if (listdata[i].children && listdata[i].children.length > 0) {
					coordinateTree(listdata[i].children);
				}
			}
		}
	}
};
//取出点击下拉后的延迟加载数据
const forTreeChildren = listdata => {
	if (listdata.length > 0) {
		for (let i = 0; i < listdata.length; i++) {
			if (v_row_id != "SOS" && listdata[i].id == v_row_id) {
				v_row_id = "SOS"; //找到求救者坐标归位
				if (listdata[i].children && listdata[i].children.length > 0) {
					v_row_children = JSON.parse(JSON.stringify(listdata[i].children)); //传递出去的值
					for (let j = 0; j < v_row_children.length; j++) {
						if (v_row_children[j].children && v_row_children[j].children.length > 0) {
							//还有值说明可以下拉
							v_row_children[j].hasChildren = true; //下拉显示
							delete v_row_children[j].children; //删除集释放资源
						}
					}
				}
			} else if (v_row_id != "SOS") {
				if (listdata[i].children && listdata[i].children.length > 0) {
					forTreeChildren(listdata[i].children);
				}
			}
		}
	}
};
</script>

<style lang="scss">
.el-divider--horizontal {
	display: block;
	height: 3px;
	width: 100%;
	margin: 14px 0;
	border-top: 1px#c7cbd5 var(--el-border-style);
}
</style>
