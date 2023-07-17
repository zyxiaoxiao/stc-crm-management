<template>
	<div class="all-height flex-column">
		<div class="all-height flex-column flex-1">
			<div style="margin-top: 10px; margin-left: 20px; margin-bottom: 5px">
			</div>
			<div style="overflow: auto">
				<el-form
					style="margin: 0px 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="申请单号" :label="$t('columnwriteoff_application_listApplicationNo')" prop="folderno">
								<el-input v-model="formData.folderno" readonly disabled>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="业务员名称" :label="$t('columnexpendituresalesmandesc')">
								<el-input v-model.trim="formData.salesmandesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="开支类型" :label="$t('columnexpendituretype')" prop="expendituretype">
								<el-select
									v-model="formData.expendituretype"
									clearable
									filterable
									class="full-width-input"
									disabled
								>
									<el-option v-for="item in sales_type" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="金额" :label="$t('columnappointmentothercostmoney_hkd')" prop="amount">
								<el-input-number
									v-model.number="formData.amount"
									:min="0"
									controls-position="right"
									disabled
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="部门名称" :label="$t('corpinfopaneldepartmentcodetitle')">
								<el-input v-model.trim="formData.deptdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('columnCustomerName')">
								<el-input v-model.trim="formData.corpdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="分包HKCC认证类型" :label="$t('menubaseThe_authentication_type')" prop="authentication">
								<div class="flex-row flx-center" style="width: 100%">
									<el-select
										v-model="formData.authentication"
										clearable
										filterable
										class="full-width-input"
										disabled
									>
										<el-option
											v-for="item in certificate"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>

									<el-tooltip effect="light" placement="right">
										<el-icon :size="20" color=" #909399"><InfoFilled /></el-icon>
										<template #content>
											<span style="color: #000000; font-size: 12px">
												{{ i18n.t("certificate1") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >=2000<br />
												{{ i18n.t("certificate2") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >=1200<br />
												{{ i18n.t("certificate3") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >= 2000<br />
												{{ i18n.t("certificate4") }}：{{ i18n.t("columnappointmentothercostmoney_hkd") }} >= 2000<br />
											</span>
										</template>
									</el-tooltip>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="佣金" :label="$t('panelcolumnbrokerage_hkd')" prop="brokerage">
								<el-input-number v-model.number="formData.brokerage" controls-position="right" disabled />
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item title1="备注" :label="$t('panelcolumnRemark')" prop="remark">
								<el-input type="textarea" v-model="formData.remark" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="创建信息" content-position="left">{{ $t("columnCreateInformation") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
								<el-input v-model="formData.recordercode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
								<el-input v-model="formData.recorderdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
								<el-input v-model="formData.recordtime" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="修改人编码" :label="$t('columnModifyPersonCoding')">
								<el-input v-model="formData.modifyercode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="修改人名称" :label="$t('testiteminfomodifiernamepanel')">
								<el-input v-model="formData.modifyerdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="修改日期" :label="$t('columnmodifydate')">
								<el-input v-model="formData.modifyertime" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="申请人编码" :label="$t('columnApplicantcode')">
								<el-input v-model="formData.applicantcode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="申请人名称" :label="$t('columnApplicantdesc')">
								<el-input v-model="formData.applicantdesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="申请日期" :label="$t('i18ncrmcontractApplicationDate')">
								<el-input v-model="formData.applicanttime" disabled></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item title1="审核人编码" :label="$t('auditcommoncode')">
								<el-input v-model="formData.auditorcode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="审核人名称" :label="$t('auditcommonauditorname')">
								<el-input v-model="formData.auditordesc" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="审核日期" :label="$t('columnAuditdate')">
								<el-input v-model="formData.audittime" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { getdropSownSelection } from "@/utils/util.js";

const sales_type = getdropSownSelection("sales_type");
const certificate = getdropSownSelection("certificate");
const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//表单字段
const formData = reactive({
	id: "",
	amount: 0,
	salesmancode: "",
	corpno: ""
});

const ruleFormRef = ref();



//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.expenditureInfo[0]) {
		formData[key] = data.expenditureInfo[0][key];
	}
};
//根据 id 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/expenditure/expenditure!selectExpenditureInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				expenditureInfo: {
					id: formData.id
				}
			})
		})
	);
	if (res) {
		dataSourceProcessing(res);
	}
};



onMounted(() => {
    if (props.condobj) {
		let id = props.condobj.cond.id; //销售开支主键id
		//此页面只读
        if(id){
            //传参后会自动调用接口刷新
			formData.id = id;
            getFormData();
        }
    }
});
</script>
