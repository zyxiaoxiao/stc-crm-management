<template>
	<div class="all-height flex-column">
		<div style="margin: 10px; text-align: right">
			<el-button size="small" type="primary" icon="Document" plain @click="saveHandler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
		</div>
		<el-form :model="formData" :rules="rules" ref="ruleFormRef" label-position="right" label-width="120px">
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="6">
					<el-form-item title1="联系人姓名" :label="$t('companypanelcontactdesctitle')" prop="contactdesc">
						<el-input type="text" clearable v-model.trim="formData.contactdesc"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="默认联系人" :label="$t('companypaneldefaultcontacttitle')" prop="defaultcontact">
						<el-select v-model.trim="formData.defaultcontact" class="full-width-input" clearable filterable>
							<el-option
								v-for="item in whetherAr"
								:key="item.value"
								:label="item.label ? $t(item.label) : item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="性别" :label="$t('itemtitlebase_userusersex')" prop="contactsex">
						<el-select v-model.trim="formData.contactsex" class="full-width-input" clearable filterable>
							<el-option
								v-for="item in usersexAr"
								:key="item.value"
								:label="item.label ? $t(item.label) : item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="办公电话" :label="$t('itemtitlebase_usertel')">
						<el-input type="text" clearable v-model.trim="formData.tel"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="6">
					<el-form-item title1="手机" :label="$t('itemtitlebase_usermobile')" prop="mobile">
						<el-input type="text" clearable v-model.trim="formData.mobile"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')">
						<el-input type="text" clearable v-model.trim="formData.email"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="传真" :label="$t('columnFax')">
						<el-input type="text" clearable v-model.trim="formData.fax"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="部门" :label="$t('corpinfopaneldepartmentcodetitle')">
						<el-input type="text" clearable v-model.trim="formData.departdesc"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="6">
					<el-form-item title1="业务类别" :label="$t('companypanelbusinesstypetitle')">
						<el-input type="text" clearable v-model="formData.businesstype"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="职务" :label="$t('companypositiontitle')">
						<el-input type="text" clearable v-model="formData.jobdesc"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="昵称" :label="$t('weixinlogNickname')">
						<el-input type="text" clearable v-model="formData.contactsnickname"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
						<el-input type="text" clearable v-model="formData.postcode"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="6">
					<el-form-item title1="wechat" label="wechat">
						<el-input type="text" clearable v-model="formData.wechat"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="直线" :label="$t('itemtitlecontactsstraightline')">
						<el-input type="text" clearable v-model="formData.straightline"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="生日" :label="$t('itemtitlecontactscontactsbirthday')">
						<el-date-picker
							v-model="formData.contactsbirthday"
							type="date"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item title1="子女信息" :label="$t('itemtitlecontactschildinfo')">
						<el-input type="text" clearable v-model="formData.childinfo"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item title1="说明(性格.爱好)" :label="$t('itemtitlecontactsinstructions')">
						<el-input type="text" clearable v-model="formData.instructions"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="24">
					<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')">
						<el-input type="textarea" clearable v-model="formData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage } from "element-plus";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const ruleFormRef = ref();

//查询联系人是否已经有默认联系人了
let isDefualtContact = false;
let isDefualtContact2 = false;
const getDefaultcontact = async () => {
	const res = await http.post(
		"/mylims/enterpriseinfo/enterpriseinfo!selectContactsByCond.action",
		qs.stringify({ "cond.corpid": props.condobj.corpid })
	);
	res.contactslist.forEach(item => {
		if (item.defaultcontact == 1) {
			isDefualtContact = true;
		}
	});
};
getDefaultcontact();

//根据 icontactid 初始化数据源
const getFormData = async () => {
	let params = {
		"cond.contactid": props.condobj.contactid
	};
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!selectContacts.action", qs.stringify(params));
	for (let key in res.contactslist[0]) {
		//判定 contactslist 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			formData[key] = res.contactslist[0][key];
		}
	}
	//判断当前联系人是不是 默认联系人
	if (res.contactslist[0]["defaultcontact"] == 1) {
		isDefualtContact2 = true;
	}
};
if (props.condobj.contactid) {
	getFormData();
}

//是否
const whetherAr = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");

//表单字段
const formData = reactive({
	contactid: "",
	contactdesc: "",
	defaultcontact: "0",
	contactsex: "",
	tel: "",
	mobile: "",
	email: "",
	fax: "",
	departdesc: "",
	businesstype: "",
	jobdesc: "",
	contactsnickname: "",
	postcode: "",
	wechat: "",
	straightline: "",
	contactsbirthday: "",
	childinfo: "",
	instructions: "",
	remark: "",
	corpid: props.condobj.corpid
});

//校验
const rules = reactive({
	contactdesc: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	defaultcontact: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	contactsex: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	],
	mobile: [
		{
			required: true,
			message: i18n.t("rulesPropMessage")
		}
	]
});

//保存
const saveHandler = formEl => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			//isDefualtContact当前联系列表是否有默认联系人，
			//isDefualtContact2当前联系人是否默认联系人，
			//"提示","只能有一个默认联系人!"，(当前联系列表,有默认联系人了，并且不是当前联系人)
			if (formData.defaultcontact == 1 && isDefualtContact && !isDefualtContact2) {
				ElMessage.warning(i18n.t("Message_DefaultcontactUnique"));
				return false;
			}

			let jsonString = {
				contactslist: [formData]
			};
			let params = {
				"cond.corpid": formData.corpid,
				jsonString: JSON.stringify(jsonString)
			};
			const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!saveEnterpriseContactsTo.action", qs.stringify(params));
			if (res.contactslist[0].contactid) {
				ElMessage.success(i18n.t("Message_saveSuccess"));
				props.condobj.success = true;
				props.condobj.dialogShow = false;
			}
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};
</script>

<style lang="scss"></style>
