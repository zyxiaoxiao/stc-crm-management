<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName">
			<el-tab-pane
				title1="部门客户"
				:label="$t('menubaseCorporateclient')"
				class="main-tab-pane-content all-height flex-row"
				name="0"
			>
				<div v-loading="loading" class="filter filter-card">
					<h4 class="title sle">{{ $t("itemtitlebase_usercorpdesc") }}</h4>
					<el-input
						v-model="filterText"
						:placeholder="$t('enterKeywordsForFiltering')"
						:formatter="value => value.toUpperCase()"
						clearable
					/>
					<el-scrollbar :style="{ height: `calc(100% - 80px)` }">
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

				<div class="flex-column flex-1" style="padding: 0px 0px 0px 10px; overflow-x: hidden">
					<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
						<template #tableHeaderLleft="scope">
							<el-button
								size="small"
								type="danger"
								icon="WarnTriangleFilled"
								plain
								:disabled="!scope.isSelected"
								@click="abandoned_handler(scope.selectList)"
								>{{ $t("menu_abandoned") }}</el-button
							>
						</template>

						<template #operation="scope">
							<el-button type="primary" link icon="Edit" @click="editTrackingRecord(scope.row)">
								{{ $t("corpinfoTrackrecordtitle") }}
							</el-button>
							<!-- <el-button type="primary" link icon="FolderRemove" @click="removeToPublic(scope.row)">
								{{ $t("menu_removeToPublic") }}
							</el-button> -->
						</template></zTable
					>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="部门废弃客户查询"
				:label="$t('menubaseCorporateclientdiscarded')"
				class="main-tab-pane-content all-height flex-row"
				name="1"
			>
				<div v-loading="loading" class="filter filter-card">
					<h4 class="title sle">{{ $t("itemtitlebase_usercorpdesc") }}</h4>
					<el-input
						v-model="filterText"
						:placeholder="$t('enterKeywordsForFiltering')"
						:formatter="value => value.toUpperCase()"
						clearable
					/>
					<el-scrollbar :style="{ height: `calc(100% - 80px)` }">
						<el-tree
							ref="treeRef"
							default-expand-all
							node-key="id"
							:data="treeData"
							:highlight-current="true"
							:props="defaultProps"
							:filter-node-method="filterNode"
							@node-click="handleNode2Click"
						/>
					</el-scrollbar>
				</div>

				<div class="flex-column flex-1" style="padding: 0px 0px 0px 10px; overflow-x: hidden">
					<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbg">
						<template #tableHeaderLleft="scope">
							<el-button
								size="small"
								type="success"
								icon="CircleCheckFilled"
								plain
								:disabled="!scope.isSelected"
								@click="enable_handler(scope.selectList)"
								>{{ $t("menu_enable") }}</el-button
							>
						</template>

						<template #operation="scope">
							<el-button type="primary" link icon="Edit" @click="editTrackingRecord(scope.row)">
								{{ $t("corpinfoTrackrecordtitle") }}
							</el-button>
						</template></zTable
					>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 移除到公共池弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="customerattributioninformationList.dialogShow" width="95%" @close="customerattributioninformationClose">
				<customerattributioninformation :condobj="customerattributioninformationList" />
			</ZDialog>
		</div>
		<!-- 客户信息 -->
		<div v-dialogStretching>
			<ZDialog v-model="custInfoUser.dialogShow" title="" width="95%">
				<custInfouserpublic :condobj="custInfoUser" />
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";

import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import { useI18n } from "vue-i18n";
import customerattributioninformation from "../customerSelete/customer_attribution_information.vue";
import custInfouserpublic from "./custInfo_user_public.vue";

const i18n = useI18n();

const customerCustomertype = getdropSownSelection("customer_customertype");
//是否
const whetherAr = getdropSownSelection("whether");
//归属级别
let deptlevel = [
	{
		label: "tltilecolumndeptlevelbloc",
		value: "bloc"
	},
	{
		label: "tltilecolumndeptlevelbranch",
		value: "branch"
	},
	{
		label: "tltilecolumndeptlevelordinary",
		value: "ordinary"
	}
];

const tabPaneName = ref("0");
const treeRef = ref();
const filterText = ref("");
const defaultProps = {
	children: "children",
	label: "corpdesc"
};
const treeData = reactive([]);

// 加载 loading
const loading = ref(false);
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
		loading.value = true;
		let baseParams = "{'cond.usercode':'admin','cond.parentid':0,'cond.rightflag':'false','cond.checked':false}";
		const res = await http.post("/core/corp/corp!selectForCorpManage.action", qs.stringify(baseParams), config);
		treeData.push(res[0]);
	} finally {
		loading.value = false;
	}
};

// 单选
const handleNodeClick = async data => {
	loading.value = true;
	tableList1.httpAttribute.baseParams["cond.departmentcode"] = `'` + data.corpcode + `'`;
	await zTable1.value.reuseTableList();
	loading.value = false;
};

//客户信息
const zTable1 = ref();
const tableList1 = reactive({
	id: "/customerManage/customerManagement/companyInfo_list_company.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfosByCorp.action",
		root: "enterpriseInfos",
		baseParams: { "cond.discardflag": "0", "cond.special": "0", "cond.iscommon_not_y": "Y" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "旧客户号",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Link",
			width: "160"
		},
		{
			title: "客户类别",
			label: "corpinfopanelkhlbtitle",
			prop: "corptype",
			type: "Select",
			width: "185",
			typeData: customerCustomertype
		},
		{
			title: "归属级别",
			label: "columnlevelattribution",
			prop: "deptlevel",
			type: "Select",
			width: "185",
			typeData: deptlevel
		},
		{
			title: "归属分公司",
			label: "corpinfoSubordinateToBranchtitle",
			prop: "branchcorpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "是否锁定",
			label: "itemtitlebase_userlockflag",
			prop: "lockflag",
			type: "Select",
			width: "185",
			typeData: whetherAr
		},
		{
			title: "所属SE",
			label: "columnbaseblongtose",
			prop: "salesmandesc",
			type: "Input",
			width: "200"
		},
		{
			title: "PKM 客户区域",
			label: "customerapplicationinvoice_format",
			prop: "invoiceformat",
			type: "Input",
			width: "160"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "电话",
			label: "itemtitlebase_usertel",
			prop: "corpphone",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "corpemail",
			type: "Input",
			width: "160"
		},
		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理提佣点(%)",
			label: "itemtitlefoldersagentbrokerage",
			prop: "agentbrokerage",
			type: "Number",
			width: "208"
		},
		{
			title: "创建人",
			label: "corpinfopanelcjrtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "营业执照有效期至",
			label: "corpinfopanelyyzzyxqztitle",
			prop: "licensedate",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "protection",
			label: "",
			prop: "protection",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "id",
			label: "",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "变更id",
			label: "corpinfopanelqyidtitle",
			prop: "corpbgid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "120"
		}
	],
	// 表格数据
	tableData: []
});

//废弃
const abandoned_handler = selectList => {
	ElMessageBox.confirm(i18n.t("Message_AbandonedYesNo"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ enterpriseInfos: selectList })
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!disusenterpriseInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//移除到公共池弹出层参数
const customerattributioninformationList = reactive({
	dialogShow: false,
	corpid: "",
	arrayList: []
});
//移除到公共池
const removeToPublic = row => {
	customerattributioninformationList.arrayList = [];
	customerattributioninformationList.corpid = row.corpid;
	customerattributioninformationList.dialogShow = true;
};
//移除到公共池 回调
const customerattributioninformationClose = () => {
	let arrayList = customerattributioninformationList.arrayList;
	if (arrayList.length > 0) {
		ElMessageBox.confirm(i18n.t("Message_RemoveToPublic"), i18n.t("reminder"), {
			confirmButtonText: i18n.t("menu_ok"),
			cancelButtonText: i18n.t("menu_cancel"),
			type: "warning",
			draggable: true
		}).then(async () => {
			let corpStr = "";
			for (let item of arrayList) {
				corpStr += item.corpcode + ",";
			}
			if (corpStr) {
				corpStr = corpStr.substring(0, corpStr.length - 1);
			}
			let params = {
				jsonString: JSON.stringify({ corpids: [customerattributioninformationList.corpid] }),
				"cond.corpStr": corpStr
			};
			const res = await http.post(
				"/mylims/enterpriseinfo/enterpriseinfo!updateCustomerSwitchingPublicInformation.action",
				qs.stringify(params)
			);
			if (res) {
				ElMessage.success(i18n.t("Message_OperationSuccess"));
				zTable1.value.getTableList();
			}
		});
	}
};

// 打开客户信息弹出层参数
const custInfoUser = reactive({
	dialogShow: false,
	corpid: "",
	tableTabsValue: 0
});
//链接详细信息
const linkDetailbg = (column, row) => {
	custInfoUser.corpid = row.corpid;
	custInfoUser.tableTabsValue = 0;
	custInfoUser.dialogShow = true;
};

//追踪记录
const editTrackingRecord = row => {
	custInfoUser.corpid = row.corpid;
	custInfoUser.tableTabsValue = 8;
	custInfoUser.dialogShow = true;
};

//废弃客户信息
const zTable2 = ref();
const tableList2 = reactive({
	id: "/customerManage/customerManagement/companyInfo_list_company.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfosByCorp.action",
		root: "enterpriseInfos",
		baseParams: { "cond.discardflag": "1", "cond.special": "0" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "旧客户号",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Link",
			width: "160"
		},
		{
			title: "客户类别",
			label: "corpinfopanelkhlbtitle",
			prop: "corptype",
			type: "Select",
			width: "185",
			typeData: customerCustomertype
		},
		{
			title: "归属级别",
			label: "columnlevelattribution",
			prop: "deptlevel",
			type: "Select",
			width: "185",
			typeData: deptlevel
		},
		{
			title: "归属分公司",
			label: "corpinfoSubordinateToBranchtitle",
			prop: "branchcorpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "是否锁定",
			label: "itemtitlebase_userlockflag",
			prop: "lockflag",
			type: "Select",
			width: "185",
			typeData: whetherAr
		},
		{
			title: "所属SE",
			label: "columnbaseblongtose",
			prop: "salesmandesc",
			type: "Input",
			width: "200"
		},
		{
			title: "PKM 客户区域",
			label: "customerapplicationinvoice_format",
			prop: "invoiceformat",
			type: "Input",
			width: "160"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "电话",
			label: "itemtitlebase_usertel",
			prop: "corpphone",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "corpemail",
			type: "Input",
			width: "160"
		},
		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理提佣点(%)",
			label: "itemtitlefoldersagentbrokerage",
			prop: "agentbrokerage",
			type: "Number",
			width: "208"
		},
		{
			title: "创建人",
			label: "corpinfopanelcjrtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "废弃人",
			label: "corpinfopanelfqrdesctitle",
			prop: "abandonederdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "废弃时间",
			label: "corpinfopanelfqtimetitle",
			prop: "abandonedertime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "废弃人编码",
			label: "corpinfopanelfqrcodetitle",
			prop: "abandonedercode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "营业执照有效期至",
			label: "corpinfopanelyyzzyxqztitle",
			prop: "licensedate",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "protection",
			label: "",
			prop: "protection",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "id",
			label: "",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "变更id",
			label: "corpinfopanelqyidtitle",
			prop: "corpbgid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//废弃单选
const handleNode2Click = async data => {
	loading.value = true;
	tableList2.httpAttribute.baseParams["cond.departmentcode"] = `'` + data.corpcode + `'`;
	await zTable2.value.reuseTableList();
	loading.value = false;
};

//启用
const enable_handler = selectList => {
	ElMessageBox.confirm(i18n.t("Message_Enabled"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ enterpriseInfos: selectList })
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!invocationenterpriseInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable2.value.getTableList();
		}
	});
};

onMounted(() => {
	getTreeData();
});
</script>

<style scoped lang="scss">
.filter-card {
	border: 1px solid #e4e7ed;
	box-shadow: var(--el-box-shadow-light);
	border-radius: 4px;
	width: 220px;
	margin-right: 10px;
	margin-top: 10px;
}
</style>
