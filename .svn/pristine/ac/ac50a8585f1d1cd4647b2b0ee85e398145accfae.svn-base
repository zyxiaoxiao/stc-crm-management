<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
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
			<zTable ref="fileList" width="700px" :tableList="ftableList" @link-detailbg="downloadfiles"> </zTable>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import qs from "qs";
import http from "@/api/index.js";
import { downloadFile } from "/src/utils/fileUtil.js";
const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
//检验类型
//let CRM_businessCategory = getdropSownSelection("CRM_businessCategory");
//默认需要传入的参数
const params = {};
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
let fileList = ref(); //附件信息

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

//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};
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
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
