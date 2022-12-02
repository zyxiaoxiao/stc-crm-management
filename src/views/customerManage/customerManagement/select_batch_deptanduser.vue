<template>
	<div class="all-height flex-row">
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
					default-expand-all
					node-key="id"
					:data="treeData"
					:highlight-current="true"
					:props="defaultProps"
					:filter-node-method="filterNode"
					@node-click="handleNodeClick"
				/>
			</el-scrollbar>
		</div>
		<div class="flex-1 flex-column table-box">
			<div class="main-card select-box">
				<div class="select-filter">
					<div v-show="vShow == false && selectData[0] == 'CSO' ? false : true" class="select-filter-item">
						<ul class="select-filter-list">
							<el-row :gutter="15" class="main-align-items-center">
								<el-col :span="8">
									<el-form-item title1="提佣点(%) ：" :label="$t('itemtitlefoldersbrokerage') + ` ：`">
										<el-select v-model="formData.brokerage" class="full-width-input" clearable filterable>
											<el-option
												v-for="item in brokerageList"
												:key="item.value"
												:label="$t(item.label)"
												:value="item.value"
											></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item title1="佣金点锁定 ：" :label="$t('itemtitlefoldersbrokeragelock') + ` ：`">
										<el-select v-model="formData.brokeragelock" class="full-width-input" clearable filterable>
											<el-option
												v-for="item in whetherAr"
												:key="item.value"
												:label="$t(item.label)"
												:value="item.value"
											></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item :label-width="20">
										<el-checkbox
											v-show="vShow"
											title1="批量修改提佣信息"
											v-model="formData.checkox_commission"
											:label="$t('messageshow_Batmodifyinformation')"
											border
										/>
									</el-form-item>
								</el-col>
							</el-row>
						</ul>
					</div>
					<div class="select-filter-item">
						<div class="select-filter-item-title">
							<span> 归属类型 ：</span>
						</div>
						<el-scrollbar>
							<ul class="select-filter-list">
								<li
									:class="{
										active: selectData.includes('SE')
									}"
									@click="select('SE')"
								>
									<span>SE客户</span>
								</li>
								<li
									:class="{
										active: selectData.includes('CSO')
									}"
									@click="select('CSO')"
								>
									<span>部门客户</span>
								</li>
							</ul>
						</el-scrollbar>
					</div>
				</div>
			</div>
			<div class="main-card flex-1" style="margin-top: 10px; padding: 0px 15px">
				<zTable ref="zTable1" :tableList="tableList1">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="primary"
							icon="Finished"
							plain
							:disabled="!scope.isSelected"
							@click="confirmClick(scope.ids, scope.selectList)"
						>
							{{ $t("buttoncommonconfirm") }}
						</el-button>
					</template>
				</zTable>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getdropSownSelection } from "@/utils/util.js";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const vShow = ref(false);
vShow.value = props.condobj.vShow;
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

// 单选
const handleNodeClick = async data => {
	tableList1.httpAttribute.baseParams["cond.corpcode"] = data.corpcode;
	await zTable1.value.reuseTableList();
};

const formData = reactive({
	brokerage: "1",
	brokeragelock: "0",
	checkox_commission: false
});

const selectData = reactive(["SE"]);

const brokerageList = [
	{ label: "0", value: "0" },
	{ label: "1", value: "1" },
	{ label: "3", value: "3" }
];

//是否
const whetherAr = getdropSownSelection("whether");
//单选选中的值
const select = val => {
	// 单选, 已经选中时,不操作
	if (selectData.includes(val)) {
		return;
	} else {
		// 未选中点击值的时候，追加选中值
		selectData.push(val);
		//删除已选中项，把第一个值删除掉
		selectData.splice(0, 1);
	}

	change(val);
};

const change = val => {
	tableList1.httpAttribute.baseParams["cond.rolecode"] = val;
	zTable1.value.reuseTableList();
};

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerManagement/select_batch_deptanduser.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/core/user/user!selectNOBGUserInfoByCorpid.action",
		root: "userInfos",
		baseParams: {
			"cond.islocal": "0",
			"cond.rolecode": "SE"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "用户ID",
			label: "",
			prop: "userid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "用户编码",
			label: "usergrouppanel_usercolumnusercodetitle",
			prop: "usercode",
			type: "Input",
			width: "160"
		},
		{
			title: "用户名称",
			label: "columnUsernametitle",
			prop: "userdesc",
			type: "Input",
			width: "160"
		},

		{
			title: "单位编码",
			label: "itemtitlegroupcorpcode",
			prop: "corpcode",
			type: "Input",
			width: "230"
		},
		{
			title: "所属单位",
			label: "itemtitlegroupcorpname",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "邮箱",
			label: "personalusercolumnemailtitle",
			prop: "email",
			type: "Input",
			width: "200"
		},
		{
			title: "联系电话",
			label: "columnappointment_desc18",
			prop: "mobile",
			type: "Input",
			width: "200"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input"
		}
	],
	// 表格数据
	tableData: []
});

//确认
const confirmClick = (ids, selectList) => {
	//判断是SE，只能选一个
	if (selectData.includes("SE") && ids.length > 1) {
		ElMessage.warning(i18n.t("distribution_OnlyOneSE"));
		return;
	}

	let edids = "";
	props.condobj.ids.forEach(element => {
		edids = edids + element + `,`;
	});
	edids = edids.substring(0, edids.length - 1);

	const cond = { newcustomtype: selectData[0], corpcode: selectList[0].corpcode, edid: edids };
	if (formData.checkox_commission || vShow.value === false) {
		// 如果是 CSO，vShow 为 false，brokerage等于0
		cond.brokerage = vShow.value === false && selectData.includes("CSO") ? "" : formData.brokerage;
		cond.brokeragelock = formData.brokeragelock;
	}
	let params = { jsonString: JSON.stringify({ userids: ids, cond: cond }) };

	ElMessageBox.confirm(i18n.t("Message_ConfirmOperation"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post("/crm/distribution/distribution!saveDistributionUserAndCorp.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.success = true;
			props.condobj.dialogShow = false;
		}
	});
};

onMounted(() => {
	getTreeData();
});
</script>

<style scoped lang="scss">
.filter {
	width: 260px;
	margin: 10px 10px 10px 2px;
}

.table-box {
	margin: 10px 2px 10px 0px;
	.select-box {
		padding: 0 20px;
	}
}
</style>
