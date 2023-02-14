<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="缴费通知单信息" :label="$t('paymentnoticepaymentnoticeinformationpanel')" name="invoiceinfo">
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="form_billInfo">
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_invoiceno') + ':'" title1="发票编号">
								<el-input type="text" v-model="sformData.INVOICENO" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_invoicetype') + ':'" title1="发票类别">
								<el-input type="text" clearable v-model="sformData.INVOICETYPE" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_invoicedate') + ':'" title1="账单日期">
								<el-input type="text" v-model="sformData.INVOICEDATE" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('itemtitleinvoicecurrencies') + ':'" title1="货币类型">
								<el-input type="text" v-model="sformData.CURRENCYTYPE" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_invoicetotal') + ':'" title1="账单合计">
								<el-input type="text" v-model="sformData.INVOICETOTAL" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnbillcurrency1havawriteoffs') + ':'" title1="已冲销金额">
								<el-input type="text" v-model="sformData.currencywriteoffsnum" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_application_listCanWriteOffsbill') + ':'" title1="可冲销金额">
								<el-input type="text" v-model="sformData.currencycanwriteoffsnum" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_paycondition') + ':'" title1="付款条件">
								<el-input type="text" v-model="sformData.PAYCONDITION" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_hktotalmoney') + ':'" title1="港币总额">
								<el-input type="text" v-model="sformData.HKTOTALMONEY" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="客户信息" content-position="left">{{ $t("panelSelectcustomer") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_sendclientno') + ':'" title1="发往客户号">
								<el-input type="text" v-model="sformData.SENDCLIENTNO" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_sendclientname') + ':'" title1="发往客户名称">
								<el-input type="text" v-model="sformData.SENDCLIENTNAME" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_sendclientcontactor') + ':'" title1="发往地址联络人">
								<el-input type="text" v-model="sformData.SENDCLIENTCONTACTOR" readonly></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_payclientno') + ':'" title1="送往客户号">
								<el-input type="text" v-model="sformData.PAYCLIENTNO" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_payclientname') + ':'" title1="送往客户名称">
								<el-input type="text" v-model="sformData.PAYCLIENTNAME" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_payclientcontactor') + ':'" title1="送往地址联络人">
								<el-input type="text" v-model="sformData.PAYCLIENTCONTACTOR" readonly></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="8">
							<el-form-item :label="$t('columnwriteoff_region') + ':'" title1="区域">
								<el-input type="text" v-model="sformData.REGION" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item :label="$t('corpinfopaneldepartmentcodetitle') + ':'" title1="部门">
								<el-input type="text" v-model="sformData.DEPT" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item :label="$t('columnwriteoff_sendclientaddr') + ':'" title1="发往地址">
								<el-input type="text" v-model="sformData.SENDCLIENTADDR" readonly></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="16">
							<el-form-item :label="$t('columnwriteoff_payclientaddr') + ':'" title1="送往地址">
								<el-input type="text" v-model="sformData.PAYCLIENTADDR" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import qs from "qs";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});


//缴费通知信息初始化信息
const sformData = reactive({
	INVOICENO: "",
	INVOICETYPE: "",
	INVOICEDATE: "",
	CURRENCYTYPE: "",
	INVOICETOTAL: "",
	TOTALMONEY: "",
	currencywriteoffsnum: "",
	currencycanwriteoffsnum: "",
	THISWRITEOFFMONEY: "",
	WRITEOFFMONEY: "",
	PAYCONDITION: "",
	HKTOTALMONEY: "",
	SENDCLIENTNO: "",
	SENDCLIENTNAME: "",
	SENDCLIENTCONTACTOR: "",
	PAYCLIENTNO: "",
	PAYCLIENTNAME: "",
	PAYCLIENTCONTACTOR: "",
	REGION: "",
	DEPT: "",
	SENDCLIENTADDR: "",
	PAYCLIENTADDR: ""
});


const tableTabsValue = ref("invoiceinfo");

//查询税票信息
let getinvoiceInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ cond: obj })
	};
	const res = await http.post("/crm/invoiceinfo/invoiceinfo!selectInvoceInfoByInvoiceno.action", qs.stringify(params));
	if (res) {
		for (let key in res.invoicemap[0]) {
			//判定 invoicemap 的key 是否存在 sformData 的key
			sformData[key] = res.invoicemap[0][key];
		}
	}
};

// 显示
const dialogShow = data => {};
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {};

//切换tab时触发
const tabChange = TabPaneName => {
};

onMounted(() => {
	if (props.condobj) {
		let invoiceno = props.condobj.cond.invoiceno; //税票编号
		if (invoiceno) {
			getinvoiceInfo({ invoiceno: invoiceno });
		}
	}
});

</script>

<style scoped lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>
