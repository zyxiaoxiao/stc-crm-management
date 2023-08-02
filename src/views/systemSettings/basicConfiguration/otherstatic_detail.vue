<template>
	<div class="all-height flex-column">
		<div class="flex-row" style="margin-top: 10px; margin-right: 20px">
			<div class="flex-1"></div>
			<el-button size="small" type="primary" icon="Document" v-if="menu_saveShow" plain @click="save_handler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
		</div>
		<el-form
			style="margin: 15px 15px 0px 15px"
			label-position="right"
			label-width="120px"
			:model="formData"
			:rules="rules"
			ref="ruleFormRef"
		>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="12">
					<el-form-item title1="序号" :label="$t('itemtitleloginordernumber')" prop="sorter">
						<el-input-number v-model="formData.sorter" :min="0" controls-position="right" style="width: 100%" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="快递公司名称(中文)" :label="$t('columnotherstaticInfostaticname')" prop="staticname">
						<el-input v-model="formData.staticname"> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="值" :label="$t('columnotherstaticInfostaticcode')" prop="staticcode">
						<el-input v-model="formData.staticcode"> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="快递公司名称(英文)" :label="$t('columnotherstaticInfostaticname_en')" prop="staticname_en">
						<el-input v-model="formData.staticname_en"> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item title1="分公司" :label="$t('itemtitlebase_userbranch')" prop="branch">
						<el-select v-model="formData.branch" class="full-width-input" clearable filterable>
							<el-option v-for="item in branchList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="创建人编码" :label="$t('testiteminforecordercodepanel')">
						<el-input v-model.trim="formData.recordercode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建人名称" :label="$t('testiteminforecordernamepanel')">
						<el-input v-model.trim="formData.recorderdesc" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建日期" :label="$t('testiteminforecordtimepanel')">
						<el-input v-model.trim="formData.recordtime" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: {
		type: Object,
		default: {
			success: {
				type: Boolean,
				default: false
			},
			dialogShow: {
				type: Boolean,
				default: false
			},
			otherstaticid: {
				type: String,
				default: ""
			},
			workflowflag: {
				type: String,
				default: "3"
			}
		}
	}
});

const ruleFormRef = ref();
//表单字段
const formData = reactive({
	otherstaticid: props?.condobj?.otherstaticid,
	sorter: 0
});

const rules = reactive({
	sorter: [{ required: true, message: i18n.t("rulesPropMessage") }],
	staticname: [{ required: true, message: i18n.t("rulesPropMessage") }],
	staticcode: [{ required: true, message: i18n.t("rulesPropMessage") }],
	staticname_en: [{ required: true, message: i18n.t("rulesPropMessage") }],
	branch: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

const branchList = ref([]);
const getBranch = async () => {
	const res = await http.post("/core/corp/corp!selectCorpInfosForBranchcorpcode.action", qs.stringify({}));
	if (res) {
		let corpInfoList = res.corpInfoList;
		let v_branchList = [];
		corpInfoList.forEach(element => {
			v_branchList.push({ label: element.corpdesc, value: element.corpcode });
		});
		branchList.value = v_branchList;
	}
};
getBranch();

//数据源处理
const dataSourceProcessing = data => {
	for (let key in data.otherstaticInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.otherstaticInfo[0][key];
	}
};
//根据 otherstaticid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/otherstatic/otherstatic!selectOtherstaticInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				otherstaticInfo: {
					otherstaticid: formData.otherstaticid
				}
			})
		})
	);
	if (res) {
		dataSourceProcessing(res);
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			let srtUrl = "/crm/otherstatic/otherstatic!insertOtherstaticInfo.action";
			if (formData.otherstaticid) {
				srtUrl = "/crm/otherstatic/otherstatic!updateOtherstaticInfo.action";
			}
			let jsonString = {
				otherstaticInfo: formData
			};
			let params = {
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post(srtUrl, qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				dataSourceProcessing(res);
				props.condobj.success = true;
			}
		} else {
			//表单校验不通过
			ElMessage.warning(i18n.t("message_form_validation"));
		}
	});
};

onMounted(() => {
	if (formData.otherstaticid) {
		getFormData();
	}
});
</script>

<style scoped lang="scss"></style>
