<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable8" :tableList="tableList8">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Edit" plain @click="AddTrackingRecord">
					{{ $t("menu_new") }}
				</el-button>
				<el-button
					size="small"
					type="danger"
					icon="Delete"
					plain
					:disabled="!scope.isSelected"
					@click="deleteTrackingRecord(scope.ids, scope.selectList)"
					>{{ $t("menu_delete") }}</el-button
				>
				<el-button
					size="small"
					type="primary"
					icon="DocumentCopy"
					plain
					:disabled="!scope.isSelected"
					@click="CopyTrackingRecord(scope.ids, scope.selectList)"
				>
					{{ $t("menu_copynew") }}
				</el-button>
				<el-button
					size="small"
					type="danger"
					icon="WarnTriangleFilled"
					plain
					:disabled="!scope.isSelected"
					@click="abandoned_handler(scope.selectList)"
					>{{ $t("menu_abandoned") }}</el-button
				>
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
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="Edit" @click="editTracking(scope.row)">
					{{ $t("menu_edit") }}
				</el-button>
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
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { GlobalStore } from "@/store/globalStore";
import zTable from "/src/components/ZTable/index.vue";
import moment from "moment";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import trackdetailnew from "./track_detail_new.vue";
import { downloadFile } from "/src/utils/fileUtil.js";

const i18n = useI18n();
const globalStore = GlobalStore();
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
	id: "/customerManage/customerManagement/track_list.vue_zTable8",
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
			type: "Input",
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

//添加追踪记录
const AddTrackingRecord = () => {
	addTrackingRecordList.commid = "";
	addTrackingRecordList.statusType = "new";
	addTrackingRecordList.success = false;
	addTrackingRecordList.dialogShow = true;
};
//添加追踪记录,回调
const addTrackingRecordClose = () => {
	if (addTrackingRecordList.success) {
		zTable8.value.getTableList();
	}
};
//编辑追踪记录
const editTracking = row => {
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

//删除追踪记录
const deleteTrackingRecord = (ids, selectList) => {
	for (let item of selectList) {
		//当前登录人不是追踪记录人不能删除
		if (item.reocrdercode != globalStore.userInfo.usercode) {
			ElMessage.warning(i18n.t("SRM_operationTrack"));
			return;
		} else {
			let currentDate = moment().format("YYYY-MM-DD");
			let oldDate = moment(new Date(item.recordertimetwo)).format("YYYY-MM-DD");
			//不能删除今天之前的记录！
			if (currentDate != oldDate) {
				ElMessage.warning(i18n.t("message_error01"));
				return;
			}
		}
	}

	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			trackInfos: []
		};
		ids.forEach(item => {
			jsonString.trackInfos.push({
				commid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/trackinfo/track!deleteTrackInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable8.value.getTableList();
		}
	});
};

//复制追踪记录
const CopyTrackingRecord = (ids, selectList) => {
	if (ids.length > 1) {
		ElMessage.warning(i18n.t("Message_OnlyCopyOne"));
		return;
	}
	if (selectList[0].reocrdercode != globalStore.userInfo.usercode) {
		ElMessage.warning(i18n.t("SRM_operationTrack"));
		return;
	}

	ElMessageBox.confirm(i18n.t("SRM_copynew"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			"cond.oldcommid": ids[0]
		};
		const res = await http.post("/mylims/trackinfo/track!copyTrackInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("messagemdmcodecopysuccess"));
			zTable8.value.getTableList();
			let trackInfo = res.trackInfo[0];
			addTrackingRecordList.commid = trackInfo.commid;
			addTrackingRecordList.statusType = "new";
			addTrackingRecordList.success = false;
			addTrackingRecordList.dialogShow = true;
		}
	});
};

//废弃
const abandoned_handler = selectList => {
	abandoned_enable(selectList, "2", "message_error_customers3", "Message_AbandonedYesNo");
};

//启用
const enable_handler = selectList => {
	abandoned_enable(selectList, "0", "message_error_customers5", "Message_Enabled");
};

//废弃与启用
const abandoned_enable = (selectList, v, warningTxt, messageBoxTxt) => {
	let data = [];
	for (let item of selectList) {
		if (item.state == v) {
			ElMessage.warning(item.companyname + i18n.t(warningTxt));
			return;
		} else {
			let obj = {};
			for (let key in item) {
				obj[key] = item[key];
			}
			obj.state = v;
			data.push(obj);
		}
	}
	ElMessageBox.confirm(i18n.t(messageBoxTxt), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ trackInfos: data })
		};
		const res = await http.post("/mylims/trackinfo/track!updateTrackInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable8.value.getTableList();
		}
	});
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
