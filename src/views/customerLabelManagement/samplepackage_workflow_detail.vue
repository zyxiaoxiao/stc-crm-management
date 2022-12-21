<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="客户标签信息" :label="$t('menubasetabpanelpanelclientlabelinformation')" :name="0">
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData" ref="ruleFormRef">
					<el-divider title1="基本信息" content-position="left">{{ $t("fieldtitleyingjibasic_information") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="样品包裹号" :label="$t('columnsamplepackageInfopackagid')">
								<el-input v-model.trim="formData.packagid" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="快递公司" :label="$t('columnsamplepackageInfodeliverycompany')">
								<el-select v-model="formData.deliverycompany" class="full-width-input" clearable filterable>
									<el-option
										v-for="item in deliverycompanySelect"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="快递单号" :label="$t('columnsamplepackageInfobarcode')">
								<el-input clearable v-model="formData.barcode"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="快递签收人名称" :label="$t('columnsamplepackageInfousername')">
								<el-input clearable v-model.trim="formData.username"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="标签日期" :label="$t('columnsamplepackageInfolabledate')">
								<el-date-picker
									v-model="formData.labledate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="签收日期" :label="$t('columnsamplepackageInforeceivedate')">
								<el-date-picker
									v-model="formData.receivedate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="通知业务员日期" :label="$t('columnsamplepackageInfonoticedate')">
								<el-date-picker
									v-model="formData.noticedate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="领样人工号" :label="$t('columnsamplepackageInforeceivepersoncode')">
								<el-input clearable v-model.trim="formData.receivepersoncode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="领样完成日期" :label="$t('columnsamplepackageInfotolabdate')">
								<el-date-picker
									v-model="formData.tolabdate"
									type="date"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider title1="客户信息" content-position="left">{{ $t("panelSelectcustomer") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
								<el-input readonly v-model="formData.customerno">
									<template #append>
										<el-button-group style="width: 52px">
											<el-button @click="selectCustomer" icon="ZoomIn" />
											<el-button @click="delCustomer" type="primary" plain icon="ZoomOut" />
										</el-button-group> </template
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item title1="客户名称" :label="$t('panelcolumncustomername')">
								<el-input v-model.trim="formData.customername" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="联系人" :label="$t('columnContactPerson')">
								<el-input readonly v-model="formData.contactdesc">
									<template #append>
										<el-button-group style="width: 52px">
											<el-button @click="selectContactBtn" icon="ZoomIn" />
											<el-button @click="delContact" type="primary" plain icon="ZoomOut" />
										</el-button-group> </template
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="联系人电话" :label="$t('i18ncrmcontractContactPhone')">
								<el-input v-model.trim="formData.phone" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="地址类别" :label="$t('titlebaseAddresstype')">
								<el-input v-model.trim="formData.addrtype" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item title1="地址" :label="$t('columnAddress')">
								<el-input readonly v-model="formData.address">
									<template #append>
										<el-button-group style="width: 52px">
											<el-button @click="selectAddress" icon="ZoomIn" />
											<el-button @click="delAddress" type="primary" plain icon="ZoomOut" />
										</el-button-group> </template
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item title1="备注信息" :label="$t('panelcolumnRemarkInformation')">
								<el-input type="textarea" v-model.trim="formData.customerremark" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<!-- 选择客户 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="selectcorpcontactaddressinformationList.dialogShow"
				width="95%"
				@close="selectcorpcontactaddressinformationClose"
			>
				<selectcorpcontactaddressinformation
					:condobj="selectcorpcontactaddressinformationList"
				></selectcorpcontactaddressinformation>
			</ZDialog>
		</div>
		<!-- 选择联系人 -->
		<div v-dialogStretching>
			<ZDialog v-model="selectcontactList.dialogShow" width="85%" @close="selectcontactClose">
				<selectcontact :condobj="selectcontactList"></selectcontact>
			</ZDialog>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection, getdropDownInChina, getCountry, getCurrency, getAddress } from "/src/utils/util.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import selectcorpcontactaddressinformation from "./select_corp_contact_address_information.vue";
import selectcontact from "./selectcontact.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const ruleFormRef = ref();
let deliverycompanySelect = reactive([]);
const otherstaticInfos = async () => {
	const res = await http.post("/crm/otherstatic/otherstatic!selectOtherstaticInfosByBranch.action", qs.stringify({}));
	if (res) {
		res.otherstaticInfos.forEach(item => {
			let obj = {};
			obj.label = item.staticcode;
			obj.value = item.staticcode;
			deliverycompanySelect.push(obj);
		});
	}
};
otherstaticInfos();

//表单字段
const formData = reactive({
	spid: props?.condobj?.spid,
	usercode: "",
	receivepersondesc: "",
	customerid: "",
	contactid: "",
	contactcode: ""
});
const rules = reactive({});
//选择客户信息弹出参数
const selectcorpcontactaddressinformationList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择客户信息弹出
const selectCustomer = () => {
	selectcorpcontactaddressinformationList.dialogShow = true;
	selectcorpcontactaddressinformationList.arrayList = [];
};
//选择客户信息弹出  回调
const selectcorpcontactaddressinformationClose = () => {
	let arrayList = selectcorpcontactaddressinformationList.arrayList;
	if (arrayList.length > 0) {
		formData.customername = arrayList[0].corpdesc ?? formData.customername; //客户名称
		formData.customerid = arrayList[0].corpid ?? formData.customerid; //客户ID
		formData.customerno = arrayList[0].corpno ?? formData.customerno; //客户号
		formData.contactid = arrayList[0].contactid ?? formData.contactid; //联系人ID
		formData.contactdesc = arrayList[0].contactdesc ?? formData.contactdesc; //联系人
		formData.phone = arrayList[0].tel ?? formData.phone; //电话
		formData.addrtype = arrayList[0].addrtype ?? formData.addrtype; //地址类型
		formData.address = arrayList[0].address ?? formData.address; //详细地址
	}

	console.log(formData);
};

//选择联系人弹出参数
const selectcontactList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择联系人弹出
const selectContactBtn = () => {
	selectcontactList.dialogShow = true;

	selectcontactList.arrayList = [];
};

const tableTabsValue = ref(0);
</script>
