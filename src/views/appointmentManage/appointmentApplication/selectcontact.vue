<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="zTable1" :tableList="ctableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectCustomer(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";

const i18n = useI18n();
let zTable1 = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object,
	objlist: Object
});
//默认需要传入的参数
let params = {};

let vdata = {};
//选择完数据后给父页面传值
const selectCustomer = list => {	
	if (list != null && list.length == 1) {
		vdata = list[0]; //客户id
		props.condobj.objlist = vdata; //传参
		props.condobj.contactdialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};
if (props.condobj != null) {
		let corpno = props.condobj.cond.corpno;
		if (corpno) {
			params["cond.corpno"] = corpno;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_DataErrorPleaseContactITPersonnel")
			});
		}
	}
//表格对象
const ctableList = reactive({
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContacts.action",
		root: "contactslist",
		baseParams: params
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "contactid",
			label: "contactid",
			prop: "contactid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpid",
			label: "corpid",
			prop: "corpid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "postcode",
			label: "postcode",
			prop: "postcode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "联系人姓名",
			label: "companypanelcontactdesctitle",
			prop: "contactdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "默认联系人",
			label: "companypaneldefaultcontacttitle",
			prop: "defaultcontact",
			type: "Select",
			width: "100",
			typeData: [
				{
					label: i18n.t("companypaneldefaultcontacttitle1"),
					value: "1"
				},
				{
					label: i18n.t("companypaneldefaultcontacttitle0"),
					value: "0"
				}
			]
		},
		{
			title: "性别",
			label: "itemtitlebase_userusersex",
			prop: "contactsex",
			type: "Select",
			width: "100",
			typeData: [
				{
					label: i18n.t("itemtitlebase_userusersex1"),
					value: "1"
				},
				{
					label: i18n.t("itemtitlebase_userusersex0"),
					value: "0"
				}
			]
		},
		{
			title: "手机",
			label: "itemtitlebase_usermobile",
			prop: "mobile",
			type: "Input",
			width: "120"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "email",
			type: "Input",
			width: "200"
		},
		{
			title: "传真",
			label: "columnFax",
			prop: "fax",
			type: "Input",
			width: "120"
		},
		{
			title: "住址",
			label: "columnAddress",
			prop: "address",
			type: "Input",
			width: "140"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "departdesc",
			type: "Input",
			width: "80"
		},
		{
			title: "业务类别",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "businesstype",
			type: "Input",
			width: "120"
		},
		{
			title: "职务",
			label: "companypositiontitle",
			prop: "jobdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "昵称",
			label: "weixinlogNickname",
			prop: "contactsnickname",
			type: "Input",
			width: "140"
		},
		{
			title: "办公电话",
			label: "itemtitlebase_usertel",
			prop: "tel",
			type: "Input",
			width: "120"
		},
		{
			title: "邮编",
			label: "corpinfocorppostcodetitle",
			prop: "postcode",
			type: "Input",
			width: "140"
		},
		{
			title: "WECHAT",
			label: "WECHAT",
			prop: "wechat",
			type: "Input",
			width: "140"
		},
		{
			title: "子女信息",
			label: "itemtitlecontactschildinfo",
			prop: "childinfo",
			type: "Input",
			width: "140"
		},
		{
			title: "说明(性格.爱好)",
			label: "itemtitlecontactsinstructions",
			prop: "instructions",
			type: "Input",
			width: "140"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "140"
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	//selectEnterpriseInfos.value.getTableList();
	//页面传入的值判断还需要添加的参数
	
	zTable1.value.getTableList();
});
</script>

<style></style>
