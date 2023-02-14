<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane :label="$t('tabtitlecoremailoutboxnotsendmaillist')" name="outbox">
				<div style="margin-top: 10px"></div>
				<zTable ref="selectoutboxInfosQuery" :tableList="outboxtableList" @link-detailbg="outboxlinkDetail">
					<template #tableHeaderLleft="scope">
						<el-button size="small" class="button_show" @click="sendOutbox(scope.selectList)" type="primary" icon="Message" plain>{{
							$t("menu_sendemails")
						}}</el-button>
						<el-button
							size="small"
							class="button_show"
							type="primary"
							icon="Document"
							plain
							@click="newOutboxInfo()"
							>{{ $t("SRM_new") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							type="danger"
							icon="DeleteFilled"
							@click="deleteOutboxInfo(scope.selectList)"
							plain
							>{{ $t("menu_deleteupload") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane :label="$t('tabtitlecommonmessagemanager')" name="message" class="all-height flex-column">
				<div style="margin: 10px; text-align: left">
					<el-button size="small" class="button_show" @click="immediateSendOutbox()" type="primary" icon="Message" plain>{{
						$t("menu_sendemails")
					}}</el-button>

					<el-button size="small" class="button_show" @click="saveOutboxInfo()" type="primary" icon="Document" plain>{{
						$t("menu_save")
					}}</el-button>
				</div>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData1" :rules="rules">
						<el-divider></el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="24">
								<el-form-item :label="$t('tabtitlecalendarreceiver') + ':'" title1="收件人" prop="addressee">
									<el-input v-model="formData1.addressee"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item :label="$t('outboxitemtitlecopyto') + ':'" title1="抄送人" prop="copyto">
									<el-input v-model="formData1.copyto"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item :label="$t('itemtitleinfo_newstitle') + ':'" title1="标题" prop="title">
									<el-input v-model="formData1.title"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="sendtype">
									<el-input type="text" title1="信息类型" v-model="formData1.sendtype"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="addresseename">
									<el-input type="text" v-model="formData1.addresseename"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="outboxid">
									<el-input type="text" v-model="formData1.outboxid"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="sendtypestr">
									<el-input type="text" v-model="formData1.sendtypestr"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item :label="$t('itemtitleinfo_outboxcontent') + ':'" title1="信息内容" prop="content">
									<el-input type="textarea" v-model="formData1.content"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="recorderid">
									<el-input type="text" v-model="formData1.recorderid"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider></el-divider>
					</el-form>
				</div>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="fileList" width="700px" :tableList="ftableList" @link-detailbg="downloadfiles">
						<template #tableHeaderLleft="scope">
							<el-button size="small" class="button_show" type="primary" icon="UploadFilled" plain @click="uploadFilled()">{{
								$t("menu_upload")
							}}</el-button>
							<el-button
								size="small"
								class="button_show"
								type="danger"
								icon="DeleteFilled"
								@click="deleteUpload(scope.ids, scope.selectList)"
								plain
								>{{ $t("menu_deleteupload") }}</el-button
							>
						</template>
					</zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane :label="$t('tabtitlecoremailoutboxhistorymail')" name="history">
				<div style="margin-top: 10px"></div>
				<zTable ref="selectHistoryOutboxInfosQuery" :tableList="outboxHistoryTableList" @link-detailbg="historylinkDetail">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							class="button_show"
							type="danger"
							icon="DeleteFilled"
							@click="deleteOutboxHistoryList(scope.selectList)"
							plain
							>{{ $t("menu_deleteupload") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
	</div>
	<div v-dialogStretching>
		<ZDialog
			v-model="condobj.uploadnewDialogShow"
			@close="uploadnewDialogclose"
			:title="$t('companypanelreportstitle')"
			width="40%"
			customclass="selectAgentCss"
		>
			<uploadnewQuery :condobj="condobj"></uploadnewQuery>
		</ZDialog>
	</div>
	<div v-dialogStretching>
		<ZDialog
			v-model="condobj.showdetailDialogShow"
			:title="$t('companypanelreportstitle')"
			width="80%"
			customclass="selectAgentCss"
		>
			<showdetailQuery :condobj="condobj"></showdetailQuery>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import { downloadFile } from "/src/utils/fileUtil.js";
//附件上传页面
import uploadnewQuery from "@/views/appointmentManage/appointmentApplication/selectUploadnew.vue";
//邮件查看页面
import showdetailQuery from "@/views/appointmentManage/appointmentApplication/show_detail.vue";

const formData1 = reactive({
	addressee: "",
	copyto: "",
	title: "",
	sendtype: "1",
	outboxid: "",
	sendtypestr: "",
	content: "",
	recorderid: ""
}); //邮件信息
const i18n = useI18n();
let selectoutboxInfosQuery = ref(); //未发送信息列表
let selectHistoryOutboxInfosQuery = ref(); //发送信息历史列表
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

const messagetype = [
	{
		value: "1",
		label: i18n.t("elementitemvalueinfo_ouboxsendtype1")
	},
	{
		value: "0",
		label: i18n.t("elementitemvalueinfo_ouboxsendtype0")
	}
];

//链接详细信息
const outboxlinkDetail = (column, row) => {
	if (column == "title" && row.outboxid) {
		let obj = {};
		if (row.outboxid) {
			obj["outboxInfo"] = { outboxid: row.outboxid };
		}
		getoutboxValue(obj);
		ftableList.httpAttribute.baseParams["cond.businessobjectid"] = row.outboxid;
		fileList.value.reuseTableList();
		tableTabsValue.value = "message"; //切换到邮件编辑信息
	}
};

//新增发件信息
const newOutboxInfo = () => {
	for (let key in formData1) {
			//formData1置空
			if (key == "sendtype") {
				formData1[key] = "1";
			} else {
				formData1[key] = "";
			}
		}
	ftableList.tableData = [];
	tableTabsValue.value = "message"; //切换到邮件编辑信息
};

//链接详细信息
const historylinkDetail = (column, row) => {
	if (column == "title" && row.outboxid) {
		//选择客户买家
		condobj.cond = {
			outboxid: row.outboxid,
			html: "showdetailDialogShow"
		};
		condobj.showdetailDialogShow = true;
	}
};

//检验类型
//let CRM_businessCategory = getdropSownSelection("CRM_businessCategory");
//默认需要传入的参数
const params = {};
let fileList = ref(); //附件信息


//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

//上传附件
const uploadFilled = () => {
	condobj.uploadnewDialogShow = true;
	condobj.cond.businessobjectid = formData1.outboxid;
	condobj.cond.businesscode = "News";
	condobj.cond.success = false;
};

//删除历史发件信息
const deleteOutboxHistoryList = selectList => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			outboxInfos: []
		};
		selectList.forEach(item => {
			jsonString.outboxInfos.push(item);
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mail/outbox/outbox!deleteOutboxInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			selectHistoryOutboxInfosQuery.value.getTableList();
		}
	});
};

//发送未发件信息
const sendOutbox = selectList => {
	ElMessageBox.confirm(i18n.t("itemtitleinfo_newsnewsendmail"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			outboxInfos: []
		};
		selectList.forEach(item => {
			jsonString.outboxInfos.push(item);
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mail/outbox/outbox!sendOutbox.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Send_Success")
			});
			selectoutboxInfosQuery.value.getTableList();
		}
	});
};

//删除未发件信息
const deleteOutboxInfo = selectList => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			outboxInfos: []
		};
		selectList.forEach(item => {
			jsonString.outboxInfos.push(item);
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mail/outbox/outbox!deleteOutboxInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			selectoutboxInfosQuery.value.getTableList();
		}
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
				businesscode: item.businesscode,
				fileid: item.fileid,
				filename: item.filename,
				recorderdesc: item.recorderdesc,
				recordtime: item.recordtime
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			fileList.value.getTableList();
		}
	});
};
//子页面关闭后的方法可以给父页面赋值等操作
const uploadnewDialogclose = () => {
	//上传附件后关闭回调
	if (condobj && condobj.objlist.success) {
		fileList.value.getTableList();
	}
};

//发送邮件
const immediateSendOutbox = async () => {
	if (!formData1.addressee) {
		ElMessage.warning(i18n.t("rulesPropMessage2"));
		return false;
	}
	let params = {
		jsonString: JSON.stringify({ outboxInfo: formData1 })
	};
	let url = "";
	if (formData1.outboxid) {
		url = "/mail/outbox/outbox!updateAndImmediateSendOutboxByEmailaddress.action";
	} else {
		url = "/mail/outbox/outbox!immediateSendOutboxByEmailaddress.action";
	}
	const res = await http.post(url, qs.stringify(params));
	if (res) {
		ElMessage.success(i18n.t("Message_saveSuccess"));
		tableTabsValue.value = "outbox"; //切换到未发送邮件列表
	}
};

//保存邮件信息
const saveOutboxInfo = async () => {
	if (!formData1.addressee) {
		ElMessage.warning(i18n.t("rulesPropMessage2"));
		return false;
	}
	let params = {
		jsonString: JSON.stringify({ outboxInfo: formData1 })
	};
	let url = "";
	if (formData1.outboxid) {
		url = "/mail/outbox/outbox!updateOutboxInfo.action";
	} else {
		url = "/mail/outbox/outbox!insertOutboxInfo.action";
	}
	const res = await http.post(url, qs.stringify(params));
	if (res) {
		ElMessage.success(i18n.t("Message_saveSuccess"));
		for (let key in res.outboxInfo[0]) {
			//判定 outboxInfo 的key 是否存在 formData1 的key
			formData1[key] = res.outboxInfo[0][key];
		}
	}
};

let getoutboxValue = async obj => {
	let params = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/mail/outbox/outbox!selectOutboxInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.outboxInfo[0]) {
			//判定 outboxInfo 的key 是否存在 formData1 的key
			formData1[key] = res.outboxInfo[0][key];
		}
	}
};
const tableTabsValue = ref("message"); //默认消息管理页面

//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "标题",
		label: "itemtitleinfo_newstitle",
		prop: "title",
		type: "Link",
		width: "350"
	},
	{
		title: "收件人",
		label: "tabtitlecalendarreceiver",
		prop: "addressee",
		type: "Input",
		width: "150"
	},
	{
		title: "抄送人",
		label: "outboxitemtitlecopyto",
		prop: "copyto",
		type: "Input",
		width: "150"
	},
	{
		title: "ID",
		label: "ID",
		prop: "outboxid",
		type: "Input",
		width: "10",
		isHide: true
	},
	{
		title: "消息类型",
		label: "itemnewmessagetype",
		prop: "sendtype",
		type: "Input",
		width: "140",
		typeData: messagetype
	},
	{
		title: "制单人编码",
		label: "itemtitlecommonrecordercode",
		prop: "recordercode",
		type: "Input",
		width: "150"
	},
	{
		title: "制单人名称",
		label: "itemtitlecommonrecorderdesc",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "制单时间",
		label: "itemtitlecommonrecordtime",
		prop: "recordertime",
		type: "DateTime",
		width: "160"
	},
	{
		title: "内容",
		label: "content",
		prop: "content",
		type: "Input",
		width: "10",
		isHide: true
	},
	{
		title: "发送标志",
		label: "sendflag",
		prop: "sendflag",
		type: "Input",
		width: "20",
		isHide: true
	},
	{
		title: "发送时间",
		label: "sendtime",
		prop: "sendtime",
		type: "Input",
		width: "10",
		isHide: true
	},
	{
		title: "信息类别",
		label: "sendtype",
		prop: "sendtype",
		type: "Input",
		width: "10",
		isHide: true
	},
	{
		title: "recorderid",
		label: "recorderid",
		prop: "recorderid",
		type: "Input",
		width: "10",
		isHide: true
	}
];

//表格对象
const outboxtableList = reactive({
	id: "/appointmentManage/appointmentApplication/application_outbox_ext.vue_selectoutboxInfosQuery",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mail/outbox/outbox.action",
		root: "outboxInfos",
		baseParams: params
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});

//表格对象
const outboxHistoryTableList = reactive({
	id: "/appointmentManage/appointmentApplication/application_outbox_ext.vue_selectHistoryOutboxInfosQuery",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mail/outbox/outbox!selectSendOutboxInfoByCond.action",
		root: "outboxInfos",
		baseParams: params
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});

//表格对象
const ftableList = reactive({
	//设置 为单选
	isRadio: true,
	//设置 工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: params
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "附件名称",
			label: "itemtitleyingjifilename",
			prop: "filename",
			type: "Input",
			width: "350"
		},
		{
			title: "附件下载",
			label: "portaldetailAttachmentDownload",
			prop: "filename",
			type: "Link",
			width: "160"
		},
		{
			title: "附件大小",
			label: "itemtitleyingjifilesize",
			prop: "filesize",
			type: "Input",
			width: "150"
		},
		{
			title: "fileid",
			label: "fileid",
			prop: "fileid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "businesscode",
			label: "",
			prop: "businesscode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "filenameserverside",
			label: "",
			prop: "filenameserverside",
			type: "Input",
			width: "20",
			isHide: true
		},
		{
			title: "filename",
			label: "",
			prop: "fileNameLink",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	//页面传入的值判断还需要添加的参数
	if (props.condobj && props.condobj.cond) {
		let outboxid = props.condobj.cond.outboxid;
		let obj = {};
		if (outboxid) {
			obj["outboxInfo"] = { outboxid: outboxid };
		}
		getoutboxValue(obj);
		ftableList.httpAttribute.baseParams["cond.businessobjectid"] = outboxid;
		fileList.value.reuseTableList();
	}
	// selectoutboxInfosQuery.value.getTableList();
});

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "outbox") {
		selectoutboxInfosQuery.value.getTableList();
	} else if (targetName == "message") {
		for (let key in formData1) {
			//formData1置空
			if (key == "sendtype") {
				formData1[key] = "1";
			} else {
				formData1[key] = "";
			}
		}
		ftableList.tableData = [];
	} else if (targetName == "history") {
		selectHistoryOutboxInfosQuery.value.getTableList();
	}
};
</script>

<style lang="scss">
.selectAgentCss {
	height: 500px;
}

.el-divider--horizontal {
	display: block;
	height: 3px;
	width: 100%;
	margin: 14px 0;
	border-top: 1px#c7cbd5 var(--el-border-style);
}
</style>
