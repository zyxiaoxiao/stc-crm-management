<template>
	<div class="all-height flex-column">
		<div style="margin: 10px; text-align: right">
			<el-button v-show="isbtnShow" size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
			<el-button size="small" v-show="isbtnShow2" type="info" icon="ArrowLeft" plain @click="btnPrevious_handler">{{
				$t("SRM_btnPrevious")
			}}</el-button>
			<el-button size="small" v-show="isbtnShow2" type="info" icon="ArrowRight" plain @click="btnNext_handler">
				{{ $t("SRM_btnNext") }}</el-button
			>
			<el-button size="small" type="primary" icon="Download" plain @click="downloadTrack">
				{{ $t("SRM_btnDownload") }}
			</el-button>
		</div>
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="追踪记录" :label="$t('corpinfoTrackrecordtitle')" :name="0">
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
					<el-divider title1="追踪客户" content-position="left">{{ $t("corpinfoTrackcustomertitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')">
								<el-input type="text" v-model.trim="formData.companyname" readonly>
									<template #append>
										<el-button icon="Search" @click="addCompanyname" />
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="基本情况" content-position="left">{{ $t("companyBasicsituationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="对STC认可度" :label="$t('companyapprovalstctitle')">
								<el-input type="text" v-model.trim="formData.approvalstc" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="选择实验室最关注什么" :label="$t('companylaboratoryfocustitle')">
								<el-input type="text" v-model.trim="formData.laboratoryfocus" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item
								title1="过往一年的检测费用"
								:label="$t('companypastyearcoststitle')"
								prop="pastyearcosts"
								:rules="[{ type: 'number', message: $t('mustbeanumber') }]"
							>
								<el-input type="text" v-model.number="formData.pastyearcosts" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="与其他实验室的合作情况" :label="$t('companycooperationlabstitle')">
								<el-input type="text" v-model="formData.cooperationlabs" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="跟踪信息" content-position="left">{{ $t("corpinfoTrackinginformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="联系时间" :label="$t('companyContactTimetitle')">
								<el-date-picker
									v-model="formData.commtime"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="联系类别" :label="$t('companyContactClasstitle')">
								<el-select v-model="formData.commtype" class="full-width-input">
									<el-option v-for="item in commtype" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="联系方式" :label="$t('corpinfopanelcontacttitle')">
								<el-input type="text" v-model="formData.commway" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="职位" :label="$t('companypositiontitle')">
								<el-input type="text" v-model="formData.position" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="下次跟进提醒时间" :label="$t('columnremindertime')">
								<el-date-picker
									v-model="formData.remindertime"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="联系人" :label="$t('columnContactPerson')">
								<el-input type="text" v-model="formData.commclient" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="动态跟进情况" :label="$t('companyfollowsituationtitle')">
								<el-input type="textarea" v-model="formData.followsituation" /> </el-form-item
						></el-col>
						<el-col :span="12">
							<el-form-item title1="进一步跟进方法/动作" :label="$t('columncustomernextfollow')">
								<el-input type="textarea" v-model="formData.nextfollowup" /> </el-form-item
						></el-col>
					</el-row>
					<el-divider title1="项目信息" content-position="left">{{ $t("corpinfoProjectinformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="信息来源" :label="$t('companyinformationSourcetitle')">
								<el-select v-model="formData.informationSource" class="full-width-input">
									<el-option
										v-for="item in customersource"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="主要产品" :label="$t('companymainproductstitle')">
								<el-input type="textarea" v-model="formData.mainproducts" /> </el-form-item
						></el-col>
						<el-col :span="12">
							<el-form-item title1="测试项目" :label="$t('corpinfotestprojecttitle')">
								<el-input type="textarea" v-model="formData.testproject" /> </el-form-item
						></el-col>
					</el-row>
					<el-divider title1="记录人员" content-position="left">{{ $t("companyrecordercodetwotitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="记录人员" :label="$t('companyrecordercodetwotitle')">
								<el-input type="text" v-model="formData.recordercodetwo" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="记录时间" :label="$t('companyrecordertimetwotitle')">
								<el-input type="text" v-model="formData.recordertimetwo" readonly />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane
				title1="附件信息"
				:label="$t('columnAccessoryInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList" @link-detailbg="downloadfiles">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="UploadFilled" plain @click="UploadFilled">
							{{ $t("menu_upload") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="DeleteFilled"
							plain
							:disabled="!scope.isSelected"
							@click="deleteUpload(scope.ids, scope.selectList)"
							>{{ $t("menu_deleteupload") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 选择客户弹出 -->
		<ZDialog
			v-model="selectCorpForTrackList.dialogShow"
			:title="$t('i18nTrackRecordChooseTrackCustomer')"
			width="70%"
			customclass="selectCorpForTrackCss"
			@close="selectCorpForTrackClose"
		>
			<potentialselectCorpForTrack :condobj="selectCorpForTrackList" />
		</ZDialog>

		<!-- 上传附件弹出 -->
		<ZDialog
			v-model="uploadAttachmentList.dialogShow"
			:title="$t('UPLOAD_uploadFile')"
			width="40%"
			customclass="uploadAttachmentCss"
			@close="qualificationClose"
		>
			<uploadAttachment :condobj="uploadAttachmentList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "@/store/globalStore";
import moment from "moment";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import ZDialog from "/src/components/ZDialog.vue";
import uploadAttachment from "/src/views/corp/uploadAttachment.vue";
import potentialselectCorpForTrack from "../customerSelete/potential_selectCorpForTrack.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const globalStore = GlobalStore();
const isbtnShow = ref(true);
const isbtnShow_pn = ref(true);
const isbtnShow2 = ref(true);
const ruleFormRef = ref();

//表单字段
const formData = reactive({
	corpid: "",
	commid: props.condobj.commid,
	companyname: "",
	corpno: "",
	approvalstc: "",
	laboratoryfocus: "",
	pastyearcosts: 0,
	cooperationlabs: "",
	commtime: "",
	commtype: "",
	commway: "",
	position: "",
	remindertime: "",
	commclient: "",
	followsituation: "",
	nextfollowup: "",
	informationSource: "",
	mainproducts: "",
	testproject: "",
	reocrdercode: "",
	recordercodetwo: "",
	recordertimetwo: "",
	state: ""
});

//新增时 隐藏 上下按钮
if (!formData.commid || props.condobj.statusType == "new") {
	isbtnShow2.value = false;
}

//下拉数据源
const customersource = getdropSownSelection("customer_informationsource");
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

const selectCorpForTrackList = reactive({
	dialogShow: false,
	arrayList: []
});

//填加客户
const addCompanyname = () => {
	selectCorpForTrackList.arrayList = [];
	selectCorpForTrackList.dialogShow = true;
};
//填加客户 回调
const selectCorpForTrackClose = () => {
	if (selectCorpForTrackList.arrayList.length > 0) {
		formData.corpid = selectCorpForTrackList.arrayList[0].corpid;
		formData.corpno = selectCorpForTrackList.arrayList[0].corpno;
		formData.companyname = selectCorpForTrackList.arrayList[0].corpdesc;
	}
};

//根据 commid 初始化数据源
const getFormData = async () => {
	let params = {
		"cond.commid": formData.commid
	};
	const res = await http.post("/mylims/trackinfo/track!selectTrackInfoById.action", qs.stringify(params));
	dataSourceProcessing(res);
	needModify();
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let jsonString = {
				trackInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString),
				"cond.corpid": formData.corpid
			};
			const res = await http.post("/mylims/trackinfo/track!saveTrackInfoPotential.action", qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				props.condobj.success = true;
				dataSourceProcessing(res);
				needModify();
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.trackInfo[0]) {
		//判定 trackInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			if (key == "pastyearcosts") {
				formData[key] = data.trackInfo[0][key] * 1;
			} else {
				formData[key] = data.trackInfo[0][key];
			}
		}
	}
};

//判断是否需要修改
const needModify = () => {
	let currentDate = moment().format("YYYY-MM-DD");
	let oldDate = moment(new Date(formData.recordertimetwo)).format("YYYY-MM-DD");
	let usercode = globalStore.userInfo.usercode;
	// 当前登录人不是追踪记录人, 创建日期不是当前日期，不能修改
	if (formData.reocrdercode == usercode && currentDate == oldDate) {
		isbtnShow_pn.value = true;
		isbtnShow.value = true;
	} else {
		isbtnShow.value = false;
		isbtnShow_pn.value = false;
	}
};

//下载追踪记录单
const downloadTrack = () => {
	if (formData.commid) {
		downloadFile("/mylims/trackinfo/track!trackDownloadWord.action", "Track.doc", {
			commid: formData.commid
		});
	}
};

//查看上一条记录
const btnPrevious_handler = () => {
	Previous_Next("/mylims/trackinfo/track!selectPreviousTrackInfo.action");
};
//查看下一条记录
const btnNext_handler = () => {
	Previous_Next("/mylims/trackinfo/track!selectNextTrackInfo.action");
};
const Previous_Next = async url => {
	if (formData.commid) {
		let params = {
			commid: formData.commid
		};
		const res = await http.post(url, qs.stringify(params));
		dataSourceProcessing(res);
		needModify();
	}
};

const zTable1 = ref();
//附件
const tableList = reactive({
	id: "/customerManage/potentialCustomer/potential_track_detail_new.vue_zTable1",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/upload/upload!selectfilesInfoByCond.action",
		root: "fileInfos",
		baseParams: {
			"cond.reservnum": formData.commid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "fileid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "文档大小",
			label: "companypanel3filesizetitle",
			prop: "filesize",
			type: "Input",
			width: "160"
		},
		{
			title: "扩展名",
			label: "companypanel3extensiontitle",
			prop: "extension",
			type: "Input",
			width: "120"
		},
		{
			title: "上传用户",
			label: "columnUploadUser",
			prop: "recorderdesc",
			type: "Input",
			width: "120"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordertime",
			type: "Input",
			width: "300"
		},
		{
			title: "mdmfileid",
			label: "",
			prop: "mdmfileid",
			type: "Input",
			width: "300",
			isHide: true
		},
		{
			title: "businesstype",
			label: "",
			prop: "businesstype",
			type: "Input",
			width: "120",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//上传附件参数
const uploadAttachmentList = reactive({
	uploadUrl: "",
	uploadParameter: {}, //参数
	dialogShow: false,
	success: false
});
//上传附件
const UploadFilled = () => {
	uploadAttachmentList.uploadUrl = "/core/uploadnew/upload!upload.action";
	uploadAttachmentList.uploadParameter = {
		jsonString: "{uploadFile:{businesscode:'CRM/accessory', businessobjectid:'" + formData.commid + "'}}",
		"cond.commid": formData.commid
	};
	uploadAttachmentList.success = false;
	uploadAttachmentList.dialogShow = true;
};
// 上传附件成功后的回调
const qualificationClose = () => {
	if (uploadAttachmentList.success) {
		zTable1.value.getTableList();
	}
};
//下载附件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

//删除附件
const deleteUpload = (ids, selectList) => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			fileInfos: []
		};
		selectList.forEach(item => {
			jsonString.fileInfos.push({
				fileid: item.fileid,
				mdmfileid: item.mdmfileid
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.crm": "crm"
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable1.value.getTableList();
		}
	});
};

const tableTabsValue = ref(0);
const tabPaneXR = new Map([[1, false]]);
//切换tab时触发
const tabChange = TabPaneName => {
	if (isbtnShow_pn.value) {
		isbtnShow.value = TabPaneName == 0 ? true : false;
	}
	if (formData.commid) {
		tableList.httpAttribute.baseParams["cond.reservnum"] = formData.commid;
		//如果是新增(new)，切换时不显示上下条按钮, 编辑（edit） 才显示
		if (props.condobj.statusType == "edit") {
			isbtnShow2.value = TabPaneName == 0 ? true : false;
		}

		if (!tabPaneXR.get(TabPaneName)) {
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		} else {
			zTable1.value.reuseTableList(); //参数发生变化，重新调接口
		}
	}
};

onMounted(() => {
	if (formData.commid) {
		getFormData();
	}
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}
</style>
<style lang="scss">
.selectCorpForTrackCss {
	height: 600px;
}
.uploadAttachmentCss {
	height: 500px;
}
</style>
