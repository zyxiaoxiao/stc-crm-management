<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane
				title1="发件箱信息"
				:label="$t('menubasetabpanelpaneloutboxinformation')"
				class="all-height flex-column"
				:name="0"
			>
				<div
					v-show="props?.condobj?.workflowflag == '1' ? true : false"
					style="margin-top: 10px; margin-left: 20px; margin-bottom: 5px"
				>
					<el-button size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
						{{ $t("menu_save") }}
					</el-button>
				</div>
				<div style="overflow: auto">
					<el-form
						style="margin: 0px 15px"
						label-position="right"
						label-width="120px"
						:model="formData"
						ref="ruleFormRef"
						:rules="rules"
						:disabled="props?.condobj?.workflowflag == '1' ? false : true"
					>
						<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="快递单号" :label="$t('columnsamplepackageInfobarcode')" prop="expresscode">
									<el-input v-model.trim="formData.expresscode" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="快递公司" :label="$t('columnsamplepackageInfodeliverycompany')" prop="express">
									<el-select v-model="formData.express" class="full-width-input" clearable filterable>
										<el-option
											v-for="item in deliverycompanySelect"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
									<el-select v-model="formData.location" clearable filterable class="full-width-input">
										<el-option
											v-for="item in crm_kdfwqylx"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="发件日期" :label="$t('columnsamplepackageoutboxInfosenddate')">
									<el-date-picker
										v-model="formData.senddate"
										type="date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="发件人" :label="$t('itemnewsenderdesc')">
									<el-input clearable v-model.trim="formData.username"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="收件人" :label="$t('columnsamplepackageoutboxInfotopersondesc')">
									<el-input clearable v-model.trim="formData.topersondesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="报告数量" :label="$t('columnsamplepackageoutboxInforeportamount')">
									<el-input-number
										v-model.number="formData.reportamount"
										:min="1"
										:precision="0"
										controls-position="right"
										style="width: 100%"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="是否含样品" :label="$t('columnsamplepackageoutboxInfohavesample')">
									<el-select v-model="formData.havesample" class="full-width-input" clearable filterable>
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
								<el-form-item title1="是否含报告" :label="$t('columnsamplepackageoutboxInfohavereport')">
									<el-select v-model="formData.havereport" class="full-width-input" clearable filterable>
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
								<el-form-item title1="联系方式" :label="$t('fieldcontact')">
									<el-input clearable v-model.trim="formData.phone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item title1="样品描述" :label="$t('columnsamplepackageInfosampledesc')">
									<el-input clearable v-model.trim="formData.sampledesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="寄件地址" :label="$t('columnsamplepackageoutboxInfodestination')">
									<el-input clearable v-model.trim="formData.destination"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="备注" :label="$t('columnappointmentothercostremarks')">
									<el-input type="textarea" v-model.trim="formData.remark" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="创建信息" content-position="left">{{ $t("columnCreateInformation") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="8">
								<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
									<el-input v-model="formData.recordercode" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
									<el-input v-model="formData.recorderdesc" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
									<el-input v-model="formData.recordtime" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="附件信息"
				:label="$t('columnAccessoryInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList1" @link-detailbg="downloadfiles">
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
		<!-- 上传附件弹出 -->
		<div v-dialogStretching>
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
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import uploadAttachment from "/src/views/corp/uploadAttachment.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const crm_kdfwqylx = getdropSownSelection("crm_kdfwqylx");
//是否
const whetherAr = getdropSownSelection("whether");

const ruleFormRef = ref();
//快递公司 下拉数据源
let deliverycompanySelect = reactive([]);
const otherstaticInfos = async () => {
	const res = await http.post("/crm/otherstatic/otherstatic!selectOtherstaticInfosByBranch.action", qs.stringify({}));
	if (res) {
		res.otherstaticInfos.forEach(item => {
			let obj = {};
			obj.label = item.staticcode;
			obj.value = item.staticcode;
			deliverycompanySelect.push(obj);
		});
	}
};
otherstaticInfos();

//表单字段
const formData = reactive({
	spoutboxid: props?.condobj?.spoutboxid,
	spid: props?.condobj?.spid,
	usercode: "",
	topersoncode: "",
	reportamount: 1
});

const rules = reactive({
	expresscode: [{ required: true, message: i18n.t("rulesPropMessage") }],
	express: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

//根据 spoutboxid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/samplepackage/samplepackageoutbox!selectSamplepackageoutboxInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				samplepackageoutboxInfo: {
					spoutboxid: formData.spoutboxid
				}
			})
		})
	);
	for (let key in res.samplepackageoutboxInfo[0]) {
		formData[key] = res.samplepackageoutboxInfo[0][key];
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/samplepackage/samplepackageoutbox!insertSamplepackageoutboxInfo.action";
			if (formData.spoutboxid) {
				srtUrl = "/crm/samplepackage/samplepackageoutbox!updateSamplepackageoutboxInfo.action";
			}
			let jsonString = {
				samplepackageoutboxInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				for (let key in res.samplepackageoutboxInfo[0]) {
					formData[key] = res.samplepackageoutboxInfo[0][key];
				}
				props.condobj.success = true;
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

//附件
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerLabelManagement/samplepackageoutbox_workflow_detail.vue_zTable1",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	//表格工具栏
	tableToolbar: {
		whole: props?.condobj.workflowflag == "1" ? true : false,
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "id",
			label: "",
			prop: "fileid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "附件名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "上传用户",
			label: "columnUploadUser",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
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
		jsonString: JSON.stringify({
			uploadFile: { businesscode: "samplepackageoutboxInfo", businessobjectid: formData.spoutboxid, version: "1" }
		})
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
			uploadFileList: []
		};
		selectList.forEach(item => {
			jsonString.uploadFileList.push({
				fileid: item.fileid
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params));
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
	if (formData.spoutboxid) {
		if (!tabPaneXR.get(TabPaneName)) {
			tableList1.httpAttribute.baseParams["cond.businessobjectid"] = formData.spoutboxid;
			tabPaneXR.set(TabPaneName, true); // 第一次才渲染
		}
	}
};

onMounted(() => {
	if (formData.spoutboxid) {
		getFormData();
	}
});
</script>
