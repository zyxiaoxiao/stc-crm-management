<template>
	<div class="flex-column" style="flex: 1; overflow: auto">
		<el-divider content-position="left">{{ $t("columnSampleInformation") }}</el-divider>
		<el-row class="main-align-items-center">
			<el-col :span="8">
				<el-form-item :label="$t('columnappointmentdesc47') + ':'" title1="数量">
					<el-input-number :min="1" v-model="count" controls-position="right"></el-input-number>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider></el-divider>
	</div>
	<virtualizedTreeTable ref="virtualizedTreeTableRef" :treeTableList="treeTableList">
		<template #tableHeaderLleft="scope">
			<el-button
				size="small"
				type="primary"
				icon="Finished"
				plain
				scrollbar-always-on
				:disabled="!scope.isSelected"
				@click="confirmClick(scope.selectList)"
			>
				{{ $t("buttoncommonconfirm") }}
			</el-button>
		</template>
	</virtualizedTreeTable>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import virtualizedTreeTable from "/src/components/VirtualizedTreeTable/index.vue";
import qs from "qs";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const virtualizedTreeTableRef = ref();

const i18n = useI18n();
let v_reservnum = "";
// 父组件传入的参数
const props = defineProps({
	condobj: Object,
	objlist: Object
});

let count = ref(1);

//表格对象
const treeTableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentTestItem.action",
		root: "",
		baseParams: {}
	},
	tableColumns: [
		{
			width: 460,
			title1: "检测项目类别",
			title: i18n.t("testiteminfotestitemstitle"),
			key: "TESTDESC",
			dataKey: "TESTDESC",
			checked: false,
			intermediate: false
		},
		{ width: 100, title1: "测试编码", title: i18n.t("testiteminfotestcodepanel"), key: "TESTCODE", dataKey: "TESTCODE", hidden: true },
		{ width: 100, title1: "主键", title: "", key: "TESTID", dataKey: "TESTID", hidden: true },
		{ width: 100, align: "center", title1: "最低价格", title: i18n.t("panelcolumntotallowest_price_hkd"), key: "PRICE", dataKey: "PRICE" },
		{ width: 260, title1: "测试标准", title: i18n.t("testiteminfoteststandardpanel"), key: "TESTSTANDARD", dataKey: "TESTSTANDARD" },
		{
			width: 100,
			align: "center",
			title1: "测试计划费用",
			title: i18n.t("panelcolumntotalTest_plan_costs_hkd"),
			key: "RASPROFILEPRICES",
			dataKey: "RASPROFILEPRICES"
		},
		{ width: 100, align: "center", title1: "测试编码", title: i18n.t("testiteminfotestcodetitle"), key: "testitemcode", dataKey: "testitemcode" },
		{ width: 100, title1: "汇率", title: "", key: "exchangerate", dataKey: "exchangerate", hidden: true },
		{
			width: 100,
			align: "center",
			title1: "协议价格",
			title: i18n.t("itemtitlecontractcontractprice"),
			key: "contractprice_view",
			dataKey: "contractprice_view"
		},
		{
			width: 100,
			title1: "协议价格(外币)",
			title: i18n.t("itemtitlecontractcontractprice"),
			key: "contractprice",
			dataKey: "contractprice",
			hidden: true
		},
		{
			width: 100,
			align: "center",
			title1: "是否有模板",
			title: i18n.t("tabtitlemdmcorecodeinfos"),
			key: "whethertemplate",
			dataKey: "whethertemplate"
		},
		{ width: 100, align: "center", title1: "折扣率", title: "", key: "discountrate", dataKey: "discountrate" },
		{ width: 100, title1: "参考名称", title: i18n.t("menubasereferenceName"), key: "testitemdesc", dataKey: "testitemdesc", hidden: true },
		{ width: 100, align: "center", title1: "可拆分", title: i18n.t("menubaseSeparable"), key: "PACKMARK", dataKey: "PACKMARK" },
		{ width: 100, align: "center", title1: "项目标记", title: i18n.t("panelcolumnitemmark"), key: "TESTANOTHERNAME", dataKey: "TESTANOTHERNAME" },
		{ width: 100, align: "center", title1: "NETPRICE", title: "", key: "NETPRICE", dataKey: "NETPRICE" },
		{ width: 260, title1: "备注", title: i18n.t("panelcolumnRemark"), key: "REMARK", dataKey: "REMARK" },
		{ width: 100, title1: "检验单位", title: "", key: "CORPDESC", dataKey: "CORPDESC", hidden: true },
		{ width: 100, title1: "TESTFLAG", title: "", key: "TESTFLAG", dataKey: "TESTFLAG", hidden: true },
		{
			width: 100,
			title: "协议价格百分比",
			title: "",
			key: "contractdiscount",
			dataKey: "contractdiscount",
			hidden: true
		}
	],
	expandColumnKey: "TESTDESC" //那个字段是树形结构
});

//确定按钮
const confirmClick = selectList => {
	let reg = /^([1-9]\d*|[0]{1,1})$/;
	let value = count.value;
	if (!reg.test(value)) {
		ElMessage.warning(i18n.t("PleaseSelect_TheCorrectNumberPackages"));
		return false;
	}
	if (selectList.length == 0) {
		//没选中的数据报错
		ElMessage.warning(i18n.t("PleaseSelect_TheCorrectNumberPackages"));
		return false;
	} else {
		let sList = []; //选中的数据集
		for (let item of selectList) {
			if (item.TESTFLAG == "1") {
				sList.push(item);
			}
		}
		//添加并保存检测项
		let saveitem = async v => {
			let jsonString = { maps: v };
			let params = {
				jsonString: JSON.stringify(jsonString),
				"cond.reservnum": v_reservnum,
				"cond.samplename": "",
				"cond.count": value
			};
			const res = await http.post("/mylims/order/appointment!saveAppointmentTestItem.action", qs.stringify(params));
			if (res) {
				//关闭窗口
				props.condobj.newItemApplintmentDialogShow = false;
			}
		};
		saveitem(sList);
	}
};

onMounted(() => {
	if (props.condobj) {
		v_reservnum = props.condobj.cond.reservnum; //报价单号
		let corpno = props.condobj.cond.corpno; //付款客户号
		if (corpno && v_reservnum) {
			let cond = { corpno: corpno };
			let jsonString = { cond: cond, reservnum: v_reservnum };
			treeTableList.httpAttribute.baseParams["jsonString"] = JSON.stringify(jsonString);
			virtualizedTreeTableRef.value.getTableList();
		}
	} else {
		ElMessage.warning(i18n.t("Message_DataErrorPleaseContactITPersonnel"));
		return false;
	}
});
</script>

<style lang="scss">
.el-divider--horizontal {
	display: block;
	height: 3px;
	width: 100%;
	margin: 14px 0;
	border-top: 1px#c7cbd5 var(--el-border-style);
}
</style>
