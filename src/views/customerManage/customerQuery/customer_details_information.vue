<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户信息查询"
				:label="$t('corpinfopanelCustomerInformationQuerytitle')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editTrackingRecord(scope.row)">
							{{ $t("corpinfoTrackrecordtitle") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="公司废弃客户查询"
				:label="$t('menubasecompanyabandonedinquiries')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery">
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editTrackingRecord(scope.row)">
							{{ $t("corpinfoTrackrecordtitle") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="custInfoUser.dialogShow" title="" width="95%">
				<custInfouserpublic :condobj="custInfoUser" />
			</ZDialog>
		</div>
		<!-- 移除到公共池弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="customerattributioninformationList.dialogShow" width="95%" @close="customerattributioninformationClose">
				<customerattributioninformation :condobj="customerattributioninformationList" />
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import custInfouserpublic from "../customerManagement/custInfo_user_public.vue";
import customerattributioninformation from "../customerSelete/customer_attribution_information.vue";

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

// 打开客户信息弹出层参数
const custInfoUser = reactive({
	dialogShow: false,
	corpid: "",
	tableTabsValue: 0
});

//移除到公共池弹出层参数
const customerattributioninformationList = reactive({
	dialogShow: false,
	corpid: "",
	arrayList: []
});

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerQuery/customer_details_information.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCustomerDetailsInformation.action",
		root: "enterpriseInfos",
		baseParams: { "cond.auditflag": "2", "cond.discardflag": "0", "cond.allqueries": "Y" }
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
			title: "联系人",
			label: "companypanelcontactdesctitle",
			prop: "contactname",
			type: "Input",
			width: "160"
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
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/customerManage/customerQuery/customer_details_information.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCustomerDetailsInformation.action",
		root: "enterpriseInfos",
		baseParams: { "cond.auditflag": "2", "cond.discardflag": "1", "cond.allqueries": "Y" }
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
				corpStr = corpStr.substr(0, corpStr.length - 1);
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
			await zTable1.value.getTableList();
			await zTable2.value.getTableList();
		}
	});
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
			await zTable2.value.getTableList();
			await zTable1.value.getTableList();
		}
	});
};

const linkDetailbgQuery = (column, row) => {
	custInfoUser.corpid = row.corpid;
	custInfoUser.tableTabsValue = 0;
	custInfoUser.dialogShow = true;
};

const tabPaneName = ref("0");
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "1":
			// 客户创建信息查询
			if (!tabPaneSet.has("1")) zTable2.value.getTableList();
			break;
	}
	tabPaneSet.add(TabPaneName);
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
<style lang="scss"></style>
