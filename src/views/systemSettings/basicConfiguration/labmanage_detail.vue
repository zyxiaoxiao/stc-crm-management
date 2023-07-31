<template>
	<div class="all-height flex-column">
		<el-divider title1="实验室预算" content-position="left">{{ $t("menubaselabmanage") }}</el-divider>
		<el-form
			style="margin: 0px 15px"
			label-position="right"
			label-width="120px"
			:model="formData"
			:rules="rules"
			ref="ruleFormRef"
		>
			<el-row :gutter="15" class="main-align-items-center">
				<el-col :span="8">
					<el-form-item title1="预算编号" :label="$t('columnbasebudgetnum')">
						<el-input v-model="formData.labmanagenum" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="部门编码" :label="$t('personaluserpanel2bmbmtitle')">
						<el-input v-model="formData.deptcode" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="部门名称" :label="$t('corpinfopaneldepartmentcodetitle')" prop="deptdesc">
						<el-input v-model.trim="formData.deptdesc" readonly :disabled="formDisabledList.deptdesc">
							<template #append>
								<el-button-group class="flex-row">
									<el-button :disabled="formDisabledList.deptdesc" @click="selectCustomerBtn" icon="ZoomIn" />
									<el-button :disabled="formDisabledList.deptdesc" @click="delCustomer" type="primary" icon="ZoomOut" />
								</el-button-group>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="年份" :label="$t('columnbaseyear')" prop="year">
						<el-date-picker
							v-model="formData.year"
							type="year"
							format="YYYY"
							value-format="YYYY"
							:disabled="formDisabledList.year"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="总价" :label="$t('columnappointmentdesc52')">
						<el-input v-model="formData.total" disabled> </el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item title1="描述" :label="$t('itemtitlebase_codecodedesc')">
						<el-input type="textarea" v-model="formData.reamrk" :disabled="formDisabledList.reamrk"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建人编码" :label="$t('columnCreatehumancoding')">
						<el-input v-model.trim="formData.recordercode" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建人名称" :label="$t('corpinfoCreatePeopleDESCtitle')">
						<el-input v-model.trim="formData.recorderdesc" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item title1="创建时间" :label="$t('itemtitlewlbmdesc10')">
						<el-input v-model.trim="formData.recordtime" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<div class="flex-row">
						<div class="flex-1"></div>
						<el-button size="small" type="primary" icon="Document" v-if="menu_saveShow" plain @click="save_handler(ruleFormRef)">
							{{ $t("menu_save") }}
						</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<el-divider content-position="left"></el-divider>
		<zTable style="overflow: auto" ref="zTable1" :tableList="tableList1">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Edit" plain :disabled="!formData.labmanageid" @click="AddComprehensive">{{
					$t("menu_new")
				}}</el-button>
				<el-button
					size="small"
					type="danger"
					icon="Delete"
					plain
					:disabled="!scope.isSelected"
					@click="delComprehensive(scope.ids)"
					>{{ $t("menu_delete") }}
				</el-button>
				<el-button size="small" type="primary" icon="Document" plain @click="save_gradeInfos(scope.selectList)">
					{{ $t("menu_save") }}
				</el-button>
			</template>
		</zTable>

		<!-- 选择客户 -->
		<ZDialog v-model="selectCustomerList.dialogShow" :title="$t('panelSelectcustomer')" width="75%" @close="selectCustomerClose">
			<selectCustomer :condobj="selectCustomerList"></selectCustomer>
		</ZDialog>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "@/components/ZDialog.vue";
import zTable from "@/components/ZTable/index.vue";
import selectCustomer from "@/views/customerManage/customerSelete/select_attributive_substitution.vue";

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
			labmanageid: {
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
	labmanageid: props?.condobj?.labmanageid
});

const rules = reactive({
	year: [{ required: true, message: i18n.t("rulesPropMessage") }],
	deptdesc: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
const formDisabledList = reactive({}); // 表单字段是否禁用

const menu_saveShow = ref(false); //保存按钮不显示

// 值 1 新增编辑，2 审核，3 查询
if (props?.condobj?.workflowflag == "1") {
	menu_saveShow.value = true;
} else if (props?.condobj?.workflowflag == "2") {
} else if (props?.condobj?.workflowflag == "3") {
}

//选择客户信息弹出参数
const selectCustomerList = reactive({
	dialogShow: false,
	objectParameter: {}
});
//选择客户信息弹出
const selectCustomerBtn = () => {
	selectCustomerList.dialogShow = true;
	selectCustomerList.objectParameter = {};
};
//选择客户信息弹出  回调
const selectCustomerClose = () => {
	let objectParameter = selectCustomerList.objectParameter;
	if (objectParameter && objectParameter?.corpcode) {
		formData.deptdesc = objectParameter.corpdesc; //客户名称
		formData.deptcode = objectParameter.corpcode; //客户号
	}
};
//清除选择的客户
const delCustomer = () => {
	formData.deptdesc = ""; //客户名称
	formData.deptcode = ""; //客户号
};

//数据源处理
const dataSourceProcessing = data => {
	console.log(data);
	for (let key in data.labmanageInfo[0]) {
		if (props.condobj.workflowflag == "1") {
			formDisabledList[key] = false;
		} else {
			formDisabledList[key] = true; //禁用
		}

		formData[key] = data.labmanageInfo[0][key];
	}
};
//根据 contractid 初始化数据源
const getFormData = async () => {
	const res = await http.post(
		"/crm/labmanage/labmanage!selectLabmanageInfoById.action",
		qs.stringify({
			jsonString: JSON.stringify({
				labmanageInfo: {
					labmanageid: formData.labmanageid
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
			let srtUrl = "/crm/labmanage/labmanage!insertLabmanageInfo.action";
			if (formData.labmanageid) {
				srtUrl = "/crm/labmanage/labmanage!updateLabmanageInfo.action";
			}
			let jsonString = {
				labmanageInfo: formData
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

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/systemSettings/basicConfiguration/labmanage_detail.vue_zTable1",
	//当前表格是否可编辑
	edit: props?.condobj?.workflowflag == "1" ? true : false,
	tableToolbar: {
		whole: props?.condobj?.workflowflag == "1" ? true : false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/labbudget/labbudget!selectLabbudgetInfoByCond.action",
		root: "labbudgetInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "月份",
			label: "columnbasemonth",
			prop: "budgettime",
			type: "Month",
			width: "160",
			edit: true
		},
		{
			title: "预算金额",
			label: "columnbasebuggetamount",
			prop: "budgetmoney",
			type: "Number",
			width: "160",
			min: 0,
			precision: 2,
			edit: true
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "deptcode",
			type: "Input",
			width: "160"
		},
		{
			title: "部门名称",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "deptdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlewlbmdesc10",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "主键",
			label: "",
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "关联ID",
			label: "",
			prop: "labmanageid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//添加
const AddComprehensive = () => {
	tableList1.httpAttribute.baseParams["cond.labmanageid"] = formData.labmanageid;
	zTable1.value.addRowData({ labmanageid: formData.labmanageid, budgetmoney: 0 });
};
//删除
const delComprehensive = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			labbudgetInfos: []
		};
		ids.forEach(item => {
			jsonString.labbudgetInfos.push({
				id: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/labbudget/labbudget!deleteLabbudgetInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//保存
const save_gradeInfos = async () => {
	let EditSelectList = zTable1.value.getEditSelectList(); //获取编辑后的数据行
	if (EditSelectList.length > 0) {
		let jsonString1 = {
			labbudgetInfos: EditSelectList
		};
		let params1 = {
			jsonString: JSON.stringify(jsonString1)
		};
		const res1 = await http.post(
			"/crm/labbudget/labbudget!saveLabbudgetInfo.action?labmanageid=" + formData.labmanageid,
			qs.stringify(params1)
		);
		if (res1) {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			zTable1.value.getTableList();
		}
	}
};

onMounted(() => {
	if (formData.labmanageid) {
		getFormData();
		tableList1.httpAttribute.baseParams["cond.labmanageid"] = formData.labmanageid;
		zTable1.value.getTableList();
	}
});
</script>

<style scoped lang="scss"></style>
