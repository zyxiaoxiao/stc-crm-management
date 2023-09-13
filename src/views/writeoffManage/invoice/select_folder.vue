<template>
	<div class="all-height flex-column">
		<el-divider title1="总价" content-position="left">{{ $t("appointmentcrmformsc") }}</el-divider>
		<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="form_folderInfo">
			<el-row class="main-align-items-center">
				<el-col :span="12">
					<el-form-item :label="$t('columnappointmentCurrencyTotalPrice') + ':'" title1="汇总价格">
						<el-input type="text" v-model="sformData.invoicesum" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-divider content-position="left"></el-divider>
		<zTable ref="editGrid_folderInfos" @selection-change="selectionChangeList" :tableList="foldertableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="success" icon="Document" :disabled="isNotAllSelected" @click="all_handler('N')" plain>
					{{ $t("menu_part") }}
				</el-button>
                <el-button size="small" type="success" icon="Document" :disabled="isAllSelected" @click="all_handler('Y')" plain>
					{{ $t("menu_all") }}
				</el-button>
                <el-button size="small" type="primary" icon="Finished"   @click="selectFolderInof(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
			<!-- 自定义 -->
			<template #Custom="scope">
				<span
					v-if="scope.column == 'folderno' && scope.row['invoicevalue'] == '0.000000'"
					v-html="scope.row[scope.column]"
				></span>
                <span
					v-if="scope.column == 'folderno' && scope.row['invoicevalue'] != '0.000000'"
					style="color: red; font-weight: bold; font-size: medium"
					v-html="scope.row[scope.column]"
				></span>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";

const i18n = useI18n();
let editGrid_folderInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

//显示未开票的申请单
const isNotAllSelected = ref(true);
//显示所有的申请单
const isAllSelected = ref(false);
let v_currencyname = "";//币种
let v_foldernostr = "";//选择后的申请单号
let v_corpno = "";//客户编号
let v_taxinvoicecode = "";//税票编号
//申请单总金额信息初始化信息
const sformData = reactive({
	invoicesum: ""
});

//按钮切换
const all_handler = show => {
	if(show == "Y"){//点击全部
        isNotAllSelected.value = false;
        isAllSelected.value = true;
        //传参后会自动调用接口刷新
		foldertableList.httpAttribute.baseParams["cond.currencyname"] = v_currencyname;
        foldertableList.httpAttribute.baseParams["cond.rasclientid"] = v_corpno;
        foldertableList.httpAttribute.baseParams["cond.taxinvoicecode"] = v_taxinvoicecode;
        foldertableList.httpAttribute.baseParams["cond.foldernostr"] = v_foldernostr;
        foldertableList.httpAttribute.baseParams["cond.showall"] = "";
        editGrid_folderInfos.value.getTableList();
    }else{//未开税票的
        isNotAllSelected.value = true;
        isAllSelected.value = false;
        //传参后会自动调用接口刷新
		foldertableList.httpAttribute.baseParams["cond.currencyname"] = v_currencyname;
        foldertableList.httpAttribute.baseParams["cond.rasclientid"] = v_corpno;
        foldertableList.httpAttribute.baseParams["cond.taxinvoicecode"] = v_taxinvoicecode;
        foldertableList.httpAttribute.baseParams["cond.foldernostr"] = v_foldernostr;
        foldertableList.httpAttribute.baseParams["cond.showall"] = "No";
        editGrid_folderInfos.value.getTableList();
    }
};


//当选择项发生变化
const selectionChangeList = rowArr => {
    let totalmoneys = 0;
    if(rowArr && rowArr.length > 0){        
        for(let r of rowArr){
            totalmoneys += parseFloat(r.currency);
        }
    }
	sformData.invoicesum = totalmoneys;
};

//选择完数据后给父页面传值
const selectFolderInof = list => {
	if (list != null && list.length > 0) {
		props.condobj.objlist = list; //传参
		props.condobj.dialogShow_selectFolderQuery = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
    if (props.condobj) {
        v_currencyname = props.condobj.cond.currencyname; //币种
		v_foldernostr = props.condobj.cond.foldernostr; //选择后的申请单号
		v_corpno = props.condobj.cond.corpno; //客户编号
        props.condobj.objlist = [];//清空数据
        v_taxinvoicecode = props.condobj.cond.taxinvoicecode; //税票编号
        //传参后会自动调用接口刷新
		foldertableList.httpAttribute.baseParams["cond.currencyname"] = v_currencyname;
        foldertableList.httpAttribute.baseParams["cond.rasclientid"] = v_corpno;
        foldertableList.httpAttribute.baseParams["cond.taxinvoicecode"] = v_taxinvoicecode;
        foldertableList.httpAttribute.baseParams["cond.foldernostr"] = v_foldernostr;
        foldertableList.httpAttribute.baseParams["cond.showall"] = "No";
        editGrid_folderInfos.value.getTableList();
    }	
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "id",
		label: "id",
		prop: "folderno",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "申请单号",
		label: "columntolockapplynum",
		prop: "folderno",
		type: "Custom",
		width: "160"
	},
	{
		title: "客户号",
		label: "fieldcolumncustomercode",
		prop: "rasclientid",
		type: "Input",
		width: "140"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "compname",
		type: "Input",
		width: "180"
	},
	{
		title: "币种",
		label: "itemtitleinvoicecurrencies",
		prop: "currencyname",
		type: "Input",
		width: "140"
	},
	{
		title: "申请单金额",
		label: "columnappointmentdesc52",
		prop: "currency",
		type: "Input",
		width: "140"
	},
	{
		title: "部门",
		label: "corpinfopaneldepartmentdesctitle",
		prop: "dept",
		type: "Input",
		width: "140"
	},
	{
		title: "是否已开票",
		label: "itemtitleinvoiceOpenedTheTaxBill",
		prop: "submited",
		type: "Input",
		width: "140"
	},
	{
		title: "开票金额",
		label: "itemtitlefoldersKPmoney",
		prop: "invoicevalue",
		type: "Input",
		width: "140"
	},
	{
		title: "入单时间",
		label: "panelcolumnLoginDate",
		prop: "drawdate",
		type: "Input",
		width: "160"
	},
	{
		title: "创建人编码",
		label: "testiteminforecordercodepanel",
		prop: "cscode",
		type: "Input",
		width: "140"
	},
	{
		title: "SE编码",
		label: "tablesecodetitle",
		prop: "secode",
		type: "Input",
		width: "140"
	}
];

//表格对象
const foldertableList = reactive({
	id: "/writeoffManage/invoice/select_folder.vue_editGrid_folderInfos",
	//设置 为多选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectFoldersInfoForInsertWriteoff.action",
		root: "foldersInfos",
		baseParams: {'cond.auditflag':'2','cond.receiptfolder':'y'}
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
