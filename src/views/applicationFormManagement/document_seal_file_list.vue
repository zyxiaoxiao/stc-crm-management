<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="folderinfos"
				:label="$t('menubasedocumentSeal')"
				title1="申请盖骑缝章"
			>
				<zTable ref="grid_applicationOrderQuery" :tableList="foldersInfosatableList">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="selectAppointment_handler(scope.selectList)">{{
							$t("menu_stamp")
						}}</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('menuselectInternalSubcontractingOrderQuery')"
				title1="内分包单查询"
				name="subpackagequery"
			>
				<zTable ref="grid_branchapplicationOrderQuery" :tableList="subcontractingtableList">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="selectAppointment_handler(scope.selectList)">{{
							$t("menu_stamp")
						}}</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('menubaseOfficialStampQuery')"
				title1="骑缝章查询"
				name="sealquery"
			>
				<zTable ref="grid_queryPDFFileInfos" :tableList="uploadPDFFileList"> </zTable>
			</el-tab-pane>
		</el-tabs>
		<ZDialog v-model="condobj.dialogShow_documentsealfiledetail" @close="dialogclose" width="45%">
			<documentsealfile :condobj="condobj"></documentsealfile>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "/src/store/globalStore.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import moment from "moment";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
//该骑缝章选择
import documentsealfile from "@/views/applicationFormManagement/select_seal_file.vue";
const i18n = useI18n();
const grid_applicationOrderQuery = ref();
const grid_branchapplicationOrderQuery = ref();
const grid_queryPDFFileInfos = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("folderinfos");
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

let foldertype = [
	{
		value: "1",
		label: i18n.t("itemtitleMainAccountOrNot1")
	},
	{
		value: "0",
		label: i18n.t("itemtitleMainAccountOrNot0")
	}
];

//页面初始化渲染完成执行
onMounted(() => {
	grid_applicationOrderQuery.value.getTableList();
});

// 选择申请单盖骑缝章
const selectAppointment_handler = async selectlist => {
	if (selectlist != null && selectlist.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	let fdata = selectlist[0];
	if (fdata && fdata.folderno) {
		let obj = { freezeflag: "0" };
		let params = {
			jsonString: JSON.stringify({ cond: obj })
		};
		const res = await http.post("/core/user/user!selectDepartmentSealType.action", qs.stringify(params));
		if (res) {
			let v_saleList = [];
			let data = res.userInfoMaps;
			if (data) {
				let map = {};
				let str = "";
				for (let sales of data) {
					str = sales.SALESNAME;
					map = { label: i18n.t(str.replaceAll(".", "").replace("(", "").replace(")", "")), value: str };
					if (str == "menu.base.DGMD_PagingSeal_OLD") {
						if (userInfo.usercode == "801662") {
							v_saleList.push(map);
						}
					} else {
						v_saleList.push(map);
					}
				}
				condobj.cond = {
					v_saleList: v_saleList,
					fdata: fdata
				};
				condobj.dialogShow_documentsealfiledetail = true;
			}
		}
	}
};

//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {
	if (condobj && condobj.cond) {
		//选择客户的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_billappointmentdetail") {
				//关闭后刷新数据
				if (writeoffidto) {
					getwriteoffInfo({ writeoffid: writeoffidto });
					//传参后会自动调用接口刷新
					tableListInvoices.httpAttribute.baseParams["cond.writeoffid"] = writeoffidto;
					grid_invoiceInfos.value.reuseTableList();
					//传参后会自动调用接口刷新
					tableListFolders.httpAttribute.baseParams["cond.writeoffid"] = writeoffidto;
					grid_appointmentInfos.value.reuseTableList();
				}
			}
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "folderinfos") {
		//申请盖骑缝章
		grid_applicationOrderQuery.value.getTableList();
	} else if (targetName == "subpackagequery") {
		//分包单查询
		grid_branchapplicationOrderQuery.value.getTableList();
	} else if (targetName == "sealquery") {
		//骑缝章查询
		grid_queryPDFFileInfos.value.getTableList();
	}
};
//表格对象申请盖骑缝章
const foldersInfosatableList = reactive({
	id: "/comprehensiveQuery/document_seal_file_list.vue_grid_applicationOrderQuery",
	//设置 为单选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFolderInfoByDocumentSeal.action",
		root: "foldersInfos",
		baseParams: { "cond.user_isdept": "Y" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "发票编号",
			label: "itemtitleinvoiceinvoicecode",
			prop: "invoiceno",
			type: "Input",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "160"
		},
		{
			title: "盖骑缝章次数",
			label: "menucolumnTimesOfSealCovering",
			prop: "writeoffstatus",
			type: "Input",
			width: "140"
		},
		{
			title: "业务人员",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "150"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "compname",
			type: "Input",
			width: "260"
		},
		{
			title: "金额",
			label: "columnappointmentothercostcostprice",
			prop: "currency",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "currencyname",
			type: "Input",
			width: "160"
		},
		{
			title: "中文样本名",
			label: "columnbaseappointmentChineseForSample",
			prop: "samplename",
			type: "Input",
			width: "160"
		},
		{
			title: "英文样本名",
			label: "columnbaseappointmentEnglishSampleName",
			prop: "samplename_en",
			type: "Input",
			width: "160"
		},
		{
			title: "样品描述",
			label: "columnSampleInformation",
			prop: "sampleinformation",
			type: "Input",
			width: "160"
		},
		{
			title: "申请人编码",
			label: "columnApplicantcode",
			prop: "cscode",
			type: "Input",
			width: "160"
		},
		{
			title: "申请人名称",
			label: "columnApplicantdesc",
			prop: "csname",
			type: "Input",
			width: "160"
		},
		{
			title: "申请时间",
			label: "i18ncrmcontractApplicationDate",
			prop: "drawdate",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "160"
		},
		{
			title: "入单日期",
			label: "panelcolumnLoginDate",
			prop: "drawdate",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//表格对象内分包单查询
const subcontractingtableList = reactive({
	id: "/comprehensiveQuery/document_seal_file_list.vue_grid_branchapplicationOrderQuery",
	//设置 为单选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFolderInfoByDocumentSeal.action",
		root: "foldersInfos",
		baseParams: { "cond.branch_dept": "Y" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "发票编号",
			label: "itemtitleinvoiceinvoicecode",
			prop: "invoiceno",
			type: "Input",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "160"
		},
		{
			title: "盖骑缝章次数",
			label: "menucolumnTimesOfSealCovering",
			prop: "writeoffstatus",
			type: "Input",
			width: "160"
		},
		{
			title: "业务人员",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "150"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "compname",
			type: "Input",
			width: "260"
		},
		{
			title: "金额",
			label: "columnappointmentothercostcostprice",
			prop: "currency",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "currencyname",
			type: "Input",
			width: "160"
		},
		{
			title: "中文样本名",
			label: "columnbaseappointmentChineseForSample",
			prop: "samplename",
			type: "Input",
			width: "160"
		},
		{
			title: "英文样本名",
			label: "columnbaseappointmentEnglishSampleName",
			prop: "samplename_en",
			type: "Input",
			width: "160"
		},
		{
			title: "样品描述",
			label: "columnSampleInformation",
			prop: "sampleinformation",
			type: "Input",
			width: "160"
		},
		{
			title: "申请人编码",
			label: "columnApplicantcode",
			prop: "cscode",
			type: "Input",
			width: "160"
		},
		{
			title: "申请人名称",
			label: "columnApplicantdesc",
			prop: "csname",
			type: "Input",
			width: "160"
		},
		{
			title: "申请时间",
			label: "i18ncrmcontractApplicationDate",
			prop: "drawdate",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "160"
		},
		{
			title: "入单日期",
			label: "panelcolumnLoginDate",
			prop: "drawdate",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//表格对象骑缝章查询
const uploadPDFFileList = reactive({
	id: "/comprehensiveQuery/document_seal_file_list.vue_grid_queryPDFFileInfos",
	//设置 为单选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadPDFFileByCond.action",
		root: "uploadPDFFileList",
		baseParams: {}
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
			prop: "corpcode",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "用印类型",
			label: "columnSealtypetitle",
			prop: "sealname",
			type: "Input",
			width: "160"
		},
		{
			title: "是否加密",
			label: "menubaseIsEncryption",
			prop: "isencryption",
			type: "Select",
			width: "140",
			typeData: foldertype
		},
		{
			title: "盖骑缝章次数",
			label: "menucolumnTimesOfSealCovering",
			prop: "foldernum",
			type: "Input",
			width: "150"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "文件名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Input",
			width: "160"
		},
		{
			title: "文件大小",
			label: "itemtitleyingjifilesize",
			prop: "filesize",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人",
			label: "hotlinkpanelcjrbmtitle",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "i18ncrmcontractCreatePersonName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordtime",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
