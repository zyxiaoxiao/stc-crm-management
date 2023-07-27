<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable8" :tableList="tableList8" @link-detailbg="linkDetailbgQuery">
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="Download" @click="downloadTrack(scope.row)">
					{{ $t("columntrackDownload") }}
				</el-button>
			</template>
		</zTable>
		<!-- 填写追踪历史记录 -->
		<ZDialog
			v-model="addTrackingRecordList.dialogShow"
			:title="$t('corpinfoTrackrecordtitle')"
			width="90%"
			@close="addTrackingRecordClose"
		>
			<trackdetailnew :condobj="addTrackingRecordList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import zTable from "/src/components/ZTable/index.vue";

import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import { downloadFile } from "/src/utils/fileUtil.js";
import trackdetailnew from "../customerManage/customerManagement/track_detail.vue";

const customersource = getdropSownSelection("customer_informationsource");
const state = getdropSownSelection("itemtitlebase_userState");

//联系类别
const commtype = [
	{
		label: "corpinfopanelcontacttitle0",
		value: "0"
	},
	{
		label: "corpinfopanelcontacttitle1",
		value: "1"
	},
	{
		label: "corpinfopanelcontacttitle2",
		value: "2"
	},
	{
		label: "corpinfopanelcontacttitle3",
		value: "3"
	},
	{
		label: "corpinfopanelcontacttitle4",
		value: "4"
	}
];

//追踪记录
const zTable8 = ref();
const tableList8 = reactive({
	id: "/comprehensiveQuery/track_list_right.vue_zTable8",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/trackinfo/track!selectTrackInfoAllByCond.action",
		root: "trackInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "追踪记录id",
			label: "",
			prop: "commid",
			type: "id",
			isHide: true
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Link",
			width: "120"
		},
		{
			title: "客户名称",
			label: "fieldcolumncustomername",
			prop: "companyname",
			type: "Input",
			width: "260"
		},
		{
			title: "状态",
			label: "corpinfopanelzttitle",
			prop: "state",
			type: "Select",
			typeData: state,
			width: "160"
		},
		{
			title: "对STC认可度",
			label: "companyapprovalstctitle",
			prop: "approvalstc",
			type: "Input",
			width: "160"
		},
		{
			title: "选择实验室最关注什么",
			label: "companylaboratoryfocustitle",
			prop: "laboratoryfocus",
			type: "Input",
			width: "160"
		},
		{
			title: "过往一年的检测费用",
			label: "companypastyearcoststitle",
			prop: "pastyearcosts",
			type: "Input",
			width: "160"
		},
		{
			title: "与其他实验室的合作情况",
			label: "companycooperationlabstitle",
			prop: "cooperationlabs",
			type: "Input",
			width: "160"
		},
		{
			title: "联系时间",
			label: "companyContactTimetitle",
			prop: "commtime",
			type: "Date",
			width: "160"
		},
		{
			title: "联系类别",
			label: "companyContactClasstitle",
			prop: "commtype",
			type: "Select",
			typeData: commtype,
			width: "160"
		},
		{
			title: "联系方式",
			label: "corpinfopanelcontacttitle",
			prop: "commway",
			type: "Input",
			width: "160"
		},
		{
			title: "下次跟进提醒时间",
			label: "columnremindertime",
			prop: "remindertime",
			type: "Date",
			width: "160"
		},
		{
			title: "联系人",
			label: "columnContactPerson",
			prop: "commclient",
			type: "Input",
			width: "160"
		},
		{
			title: "职位",
			label: "companypositiontitle",
			prop: "position",
			type: "Input",
			width: "160"
		},
		{
			title: "动态跟进情况",
			label: "companyfollowsituationtitle",
			prop: "followsituation",
			type: "Input",
			width: "160"
		},
		{
			title: "进一步跟进方法/动作",
			label: "columncustomernextfollow",
			prop: "nextfollowup",
			type: "Input",
			width: "160"
		},
		{
			title: "信息来源",
			label: "companyinformationSourcetitle",
			prop: "informationSource",
			type: "Select",
			typeData: customersource,
			width: "160"
		},
		{
			title: "主要产品",
			label: "companymainproductstitle",
			prop: "mainproducts",
			type: "Input",
			width: "160"
		},
		{
			title: "测试项目",
			label: "corpinfotestprojecttitle",
			prop: "testproject",
			type: "Input",
			width: "160"
		},
		{
			title: "记录人员",
			label: "companyrecordercodetwotitle",
			prop: "recordercodetwo",
			type: "Input",
			width: "160"
		},
		{
			title: "记录人员编码",
			label: "",
			prop: "reocrdercode",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "记录时间",
			label: "companyrecordertimetwotitle",
			prop: "recordertimetwo",
			type: "DateTime",
			width: "160"
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

//添加追踪记录弹出层传入参数
const addTrackingRecordList = reactive({
	dialogShow: false,
	commid: "",
	success: false,
	statusType: "new"
});

//添加追踪记录,回调
const addTrackingRecordClose = () => {
	if (addTrackingRecordList.success) {
		zTable8.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	addTrackingRecordList.commid = row.commid;
	addTrackingRecordList.statusType = "edit";
	addTrackingRecordList.success = false;
	addTrackingRecordList.dialogShow = true;
};

//下载追踪记录单
const downloadTrack = row => {
	if (row.commid) {
		downloadFile("/mylims/trackinfo/track!trackDownloadWord.action", "Track.doc", {
			commid: row.commid
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable8.value.getTableList();
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
