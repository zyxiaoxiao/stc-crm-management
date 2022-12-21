<template>
	<div class="all-height flex-column">
		<zTable ref="zTable1" :tableList="tableList1">
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
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { getdropSownSelection } from "/src/utils/util.js";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//是否
const whetherAr = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");

let zTable1 = ref();

//表格对象
const tableList1 = reactive({
	id: "/customerLabelManagement/selectcontact.vue_zTable1",
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContacts.action",
		root: "contactslist",
		baseParams: { "cond.corpno": props?.condobj?.corpno }
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
			typeData: whetherAr
		},
		{
			title: "性别",
			label: "itemtitlebase_userusersex",
			prop: "contactsex",
			type: "Select",
			width: "100",
			typeData: usersexAr
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

const confirmClick = selectList => {
	props.condobj.arrayList = selectList;
	props.condobj.dialogShow = false;
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
