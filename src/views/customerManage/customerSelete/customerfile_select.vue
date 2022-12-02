<template>
	<div class="all-height flex-column">
		<zTable ref="zTable1" :tableList="tableList" @link-detailbg="downloadfiles">
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
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import zTable from "/src/components/ZTable/index.vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { downloadFile } from "/src/utils/fileUtil.js";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const filetypeAr = getdropSownSelection("qualificationDocumentto");
const filelevelAr = getdropSownSelection("i18nCustomerapplicationFileDocumentlevel");

const zTable1 = ref();
//客户资质文件信息表格对象
const tableList = reactive({
	id: "/customerManage/customerSelete/customerfile_select.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/upload/upload!selectfilesInfoByCond.action",
		root: "fileInfos",
		baseParams: {
			"cond.corpid": props.condobj.corpid,
			"cond.filetype": "3"
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
			title: "文档主题",
			label: "textfieldfieldLabeldocumenttheme",
			prop: "theme",
			type: "Input",
			width: "200"
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "文档类型",
			label: "textfieldfieldLabeldocumenttype",
			prop: "filetype",
			type: "Select",
			width: "120",
			typeData: filetypeAr
		},
		{
			title: "文档等级",
			label: "textfieldfieldLabeldocumentlevel",
			prop: "filelevel",
			type: "Select",
			width: "120",
			typeData: filelevelAr
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
			title: "文档说明",
			label: "textfieldfieldLabeldocumentdescription",
			prop: "remark",
			type: "Input",
			width: "300"
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
		}
	],
	// 表格数据
	tableData: []
});

//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

const confirmClick = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style lang="scss"></style>
