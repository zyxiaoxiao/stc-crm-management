<template>
	<div class="all-height flex-column">
		<el-auto-resizer>
			<template #default="{ height, width }">
				<div class="flex-column" :style="{ height: height + `px`, width: width + `px` }">
					<div class="el-card" style="min-height: 236px" :style="{ height: height / 2 + `px`, width: width + `px` }">
						<zTable ref="zTable1" :tableList="tableList1" @current-change="zTable1CurrentChange">
							<template #tableHeaderLleft="scope">
								<el-button
									size="small"
									type="primary"
									icon="Finished"
									plain
									:disabled="!scope.isSelected"
									@click="confirmClick(scope.ids, scope.selectList)"
									style="margin-left: 10px"
								>
									{{ $t("buttoncommonconfirm") }}
								</el-button>
							</template>
						</zTable>
					</div>
					<div class="flex-row" style="margin-top: 10px" :style="{ height: height / 2 + `px`, width: width + `px` }">
						<div class="el-card" style="margin-right: 10px" :style="{ height: height / 2 - 2 + `px`, width: width / 2 + `px` }">
							<zTable ref="zTable2" :tableList="tableList2" @current-change="zTable2CurrentChange"></zTable>
						</div>
						<div class="el-card" :style="{ height: height / 2 - 2 + `px`, width: width / 2 + `px` }">
							<zTable style="" ref="zTable3" :tableList="tableList3"></zTable>
						</div>
					</div>
				</div>
			</template>
		</el-auto-resizer>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection, getdropDownInChina, getCountry } from "/src/utils/util.js";
import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//是否
const whetherAr = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");
const addresstypeAr = getdropSownSelection("crm_addresstype");

// 国家下拉
let paytype = ref([]);
//异步请求，瞬间同时请求一个接口多次，会取消所以请求，只会执行最后一次请求（随机的）
//处理方法：如果是同一个接口那就同步请求。
const getAddressFun = async () => {
	paytype.value = await getCountry();
};
let regionAr = ref(getdropDownInChina("crm_region"));
let proviceAr = ref(getdropDownInChina("crm_province"));
let cityAr = ref(getdropDownInChina("crm_city"));

const zTable1 = ref();
const tableList1 = reactive({
	id: "/customerLabelManagement/select_corp_contact_address_information.vue_zTable1",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCustomerBycorpright.action",
		root: "enterpriseInfos",
		baseParams: { "cond.auditflag": "2", "cond.discardflag": "1", "cond.deliverys_my_customer": "Y" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "旧客户号",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
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
			title: "工商注册号",
			label: "corpinfopanelRegistrationNumbertitle",
			prop: "businesslicenseno",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "corpemail",
			type: "Input",
			width: "160"
		},
		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input"
		},
		{
			title: "客户ID",
			label: "",
			prop: "corpid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});
const zTable2 = ref();
const tableList2 = reactive({
	id: "/customerLabelManagement/delivers_print_addresslabel.vue_zTable2",
	isRadio: true, //设置为单选
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		whole: false //是否显示全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCorpContactsInfoByIdList.action",
		root: "contactslist",
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
			label: "id",
			prop: "contactid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "联系人姓名",
			label: "companypanelcontactdesctitle",
			prop: "contactdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "默认联系人",
			label: "companypaneldefaultcontacttitle",
			prop: "defaultcontact",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "性别",
			label: "itemtitlebase_userusersex",
			prop: "contactsex",
			type: "Select",
			typeData: usersexAr,
			width: "80"
		},
		{
			title: "办公电话",
			label: "itemtitlebase_usertel",
			prop: "tel",
			type: "Input",
			width: "160"
		},
		{
			title: "手机",
			label: "itemtitlebase_usermobile",
			prop: "mobile",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "email",
			type: "Input",
			width: "160"
		},
		{
			title: "传真",
			label: "columnFax",
			prop: "fax",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "departdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "业务类别",
			label: "companypanelbusinesstypetitle",
			prop: "businesstype",
			type: "Input",
			width: "160"
		},
		{
			title: "职务",
			label: "companypositiontitle",
			prop: "jobdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "昵称",
			label: "weixinlogNickname",
			prop: "contactsnickname",
			type: "Input",
			width: "160"
		},
		{
			title: "邮编",
			label: "corpinfocorppostcodetitle",
			prop: "postcode",
			type: "Input",
			width: "160"
		},
		{
			title: "WECHAT",
			prop: "wechat",
			type: "Input",
			width: "160"
		},
		{
			title: "直线",
			label: "itemtitlecontactsstraightline",
			prop: "straightline",
			type: "Input",
			width: "160"
		},
		{
			title: "生日",
			label: "itemtitlecontactscontactsbirthday",
			prop: "contactsbirthday",
			type: "Input",
			width: "200"
		},
		{
			title: "子女信息",
			label: "itemtitlecontactschildinfo",
			prop: "childinfo",
			type: "Input",
			width: "160"
		},
		{
			title: "说明(性格.爱好)",
			label: "itemtitlecontactsinstructions",
			prop: "instructions",
			type: "Input",
			width: "200"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "300"
		}
	],
	// 表格数据
	tableData: []
});
const zTable3 = ref();
const tableList3 = reactive({
	id: "/customerLabelManagement/delivers_print_addresslabel.vue_zTable3",
	isRadio: true, //设置为单选
	isPaging: false, //是否显示分页
	//表格工具栏
	tableToolbar: {
		whole: false //是否显示全部表格工具栏
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCondWithContact.action",
		root: "addressInfos",
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
			label: "id",
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "地址类型",
			label: "titlebaseAddresstype",
			prop: "addrtype",
			type: "Select",
			typeData: addresstypeAr,
			width: "160"
		},
		{
			title: "国家",
			label: "weixinfansCountry",
			prop: "country",
			type: "Select",
			typeData: paytype,
			width: "160"
		},
		{
			title: "区域",
			label: "i18nCustomerapplicationCustomerCreateInformationArea",
			prop: "region",
			type: "Select",
			typeData: regionAr,
			width: "160"
		},
		{
			title: "省份",
			label: "i18nCustomerapplicationCustomerCreateInformationProvince",
			prop: "provice",
			type: "Select",
			typeData: proviceAr,
			width: "160"
		},
		{
			title: "市区",
			label: "i18nCustomerapplicationCustomerCreateInformationCityCenter",
			prop: "city",
			type: "Select",
			typeData: cityAr,
			width: "160"
		},
		{
			title: "邮编",
			label: "corpinfocorppostcodetitle",
			prop: "postcode",
			type: "Input",
			width: "160"
		},
		{
			title: "详细地址",
			label: "i18nCustomerapplicationCustomerCreateInformationDetailedAddress",
			prop: "address",
			type: "Input",
			width: "300"
		},
		{
			title: "备注信息",
			label: "itemtitlebzxxremark",
			prop: "remark",
			type: "Input",
			width: "300"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "190"
		},
		{
			title: "创建时间",
			label: "hotlinkpanelcjsjtitle",
			prop: "recordertime",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//列表选中行事件
const zTable1CurrentChange = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		tableList2.httpAttribute.baseParams["cond.corpid"] = currentRow.corpid;
		zTable2.value.getTableList();
	}
};
const zTable2CurrentChange = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		tableList3.httpAttribute.baseParams["cond.contactid"] = currentRow.contactid;
		zTable3.value.getTableList();
	}
};
//确认
const confirmClick = () => {
	let obj = {};
	obj.corpdesc = zTable1.value.selectList[0]?.corpdesc;
	obj.corpid = zTable1.value.selectList[0]?.corpid;
	obj.corpno = zTable1.value.selectList[0]?.corpno;
	obj.contactid = zTable2.value.selectList[0]?.contactid;
	obj.contactdesc = zTable2.value.selectList[0]?.contactdesc;
	obj.tel = zTable2.value.selectList[0]?.tel;
	obj.fax = zTable2.value.selectList[0]?.fax;
	obj.mobile = zTable2.value.selectList[0]?.mobile;
	obj.addrtype = zTable3.value.selectList[0]?.addrtype;
	obj.address = zTable3.value.selectList[0]?.address;
	props.condobj.arrayList.push(obj);
	props.condobj.dialogShow = false;
};
onMounted(() => {
	getAddressFun();
	zTable1.value.getTableList();
});
</script>
