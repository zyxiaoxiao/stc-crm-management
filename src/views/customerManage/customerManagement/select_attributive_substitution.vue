<template>
	<div class="all-height flex-column">
		<el-auto-resizer>
			<template #default="{ height, width }">
				<el-form
					style="margin: 15px 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="归属部门编码" :label="$t('appointmentDepartment_number')">
								<el-input type="text" v-model.trim="formData.corpcode" disabled />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属部门" :label="$t('corpinfopaneldepartmentdesctitle')" prop="corpdesc">
								<el-input
									type="text"
									v-model.trim="formData.corpdesc"
									readonly
									:disabled="zTable1IsSelected || zTable2IsSelected ? true : false"
								>
									<template #append>
										<el-button-group>
											<el-button
												@click="selectCorpdesc"
												icon="ZoomIn"
												:disabled="zTable1IsSelected || zTable2IsSelected ? true : false"
											/>
										</el-button-group> </template
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属类型" :label="$t('itemtitleAttributiontype')" prop="newcustomtype">
								<el-select
									v-model.trim="formData.newcustomtype"
									class="full-width-input"
									filterable
									:disabled="zTable1IsSelected || zTable2IsSelected ? true : false"
								>
									<el-option
										v-for="item in newcustomtype"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="原归属人员编码" :label="$t('basecolumnOriginal_Personnel_Code')" prop="salesmancode">
								<el-input
									type="text"
									v-model.trim="formData.salesmancode"
									readonly
									:disabled="zTable1IsSelected || zTable2IsSelected ? true : false"
								>
									<template #append>
										<el-button-group>
											<el-button
												@click="selectSalesmancode"
												icon="ZoomIn"
												:disabled="zTable1IsSelected || zTable2IsSelected ? true : false"
											/>
										</el-button-group> </template
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="佣金点锁定" :label="$t('itemtitlefoldersbrokeragelock')">
								<el-input type="text" v-model.number="formData.brokerage" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 0px" />
				<div class="flex-row" :style="{ width: width - 12 + `px`, height: height - 135 + `px` }">
					<div style="max-width: 40%; flex: 0 0 40%">
						<zTable ref="zTable1" :tableList="tableList1">
							<template #tableHeaderLleft="scope">
								<el-button size="small" type="primary" icon="ZoomIn" plain @click="selectCutomer(ruleFormRef)">{{
									$t("paneltitleDistributionOfCustomersQuery")
								}}</el-button>

								<el-button
									size="small"
									type="primary"
									icon="Tickets"
									plain
									:disabled="!scope.isSelected"
									@click="batchbg_handler(scope.selectList)"
									>{{ $t("menu_batchbg") }}</el-button
								>
								<el-button
									size="small"
									type="danger"
									icon="Delete"
									plain
									:disabled="!scope.isSelected"
									@click="delete_handler(scope.selectList)"
									>{{ $t("menu_delete") }}</el-button
								>
							</template>
						</zTable>
					</div>
					<div class="divider-card"></div>
					<div style="max-width: 60%; flex: 0 0 60%">
						<zTable ref="zTable2" :tableList="tableList2">
							<template #tableHeaderLleft="scope">
								<el-button
									size="small"
									type="danger"
									icon="Delete"
									plain
									:disabled="!scope.isSelected"
									@click="delete_handler2(scope.selectList)"
									>{{ $t("menu_delete") }}</el-button
								>
								<el-button
									size="small"
									type="success"
									icon="Select"
									plain
									:disabled="!scope.isSelected"
									@click="submit_handler(scope.selectList)"
									>{{ $t("menu_submit") }}</el-button
								>
							</template>
						</zTable>
					</div>
				</div>
			</template>
		</el-auto-resizer>
		<!-- 选择部门 -->
		<ZDialog
			v-if="selectattributivesubstitutionList.dialogShow"
			v-model="selectattributivesubstitutionList.dialogShow"
			:title="$t('corpinfopaneldepartmentdesctitle')"
			width="40%"
			@close="selectattributivesubstitutionClose"
		>
			<selectattributivesubstitution :condobj="selectattributivesubstitutionList" />
		</ZDialog>

		<!-- 选择销售 -->
		<ZDialog
			v-if="selectsalesuserList.dialogShow"
			v-model="selectsalesuserList.dialogShow"
			:title="$t('tabtitlemdmselectconnuser')"
			width="40%"
			@close="selectsalesuserClose"
		>
			<selectsalesuser :condobj="selectsalesuserList" />
		</ZDialog>

		<!-- 编辑 批量修改 -->
		<ZDialog
			v-if="selectsalescutomerList.dialogShow"
			v-model="selectsalescutomerList.dialogShow"
			:title="$t('menubaseCustomerlist')"
			width="85%"
			@close="selectsalescutomerClose"
		>
			<selectsalescutomer :condobj="selectsalescutomerList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { useI18n } from "vue-i18n";
import selectattributivesubstitution from "../customerSelete/select_attributive_substitution.vue";
import selectsalesuser from "../customerSelete/select_sales_user.vue";
import selectsalescutomer from "../customerSelete/select_sales_cutomer.vue";

const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const ruleFormRef = ref();
//归属类型
let newcustomtype = [
	{
		label: "i18nCustomerapplicationsecustomer",
		value: "SE"
	},
	{
		label: "itemtitlenewcustomtype0",
		value: "CSO"
	}
];
const formData = reactive({
	corpcode: "",
	corpdesc: "",
	newcustomtype: "SE",
	salesmancode: "",
	salesmandesc: "",
	brokerage: 1
});

const rules = reactive({
	corpdesc: [{ required: true, message: i18n.t("rulesPropMessage") }],
	newcustomtype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	salesmancode: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

const zTable1IsSelected = ref(false);
const zTable2IsSelected = ref(false);

//选择部门 弹出参数
const selectattributivesubstitutionList = reactive({
	dialogShow: false,
	objectParameter: {}
});

//选择部门
const selectCorpdesc = () => {
	selectattributivesubstitutionList.dialogShow = true;
	selectattributivesubstitutionList.objectParameter = {};
};

//选择部门 回调
const selectattributivesubstitutionClose = async () => {
	let objectParameter = selectattributivesubstitutionList.objectParameter;
	if (Object.keys(objectParameter).length > 0) {
		formData.corpcode = objectParameter.corpcode;
		formData.corpdesc = objectParameter.corpdesc;
	}
};
//选择销售 弹出参数
const selectsalesuserList = reactive({
	dialogShow: false,
	corpcode: "",
	rolecode: "",
	batchbg: "N",
	selectList: [],
	arrayList: []
});

//选择销售
const selectSalesmancode = () => {
	selectsalesuserList.batchbg = "N";
	selectsalesuserList.selectList = [];
	selectsalesuserList.dialogShow = true;
	selectsalesuserList.corpcode = formData.corpcode;
	selectsalesuserList.rolecode = formData.newcustomtype;
	selectsalesuserList.arrayList = [];
};

//选择销售 回调
const selectsalesuserClose = async () => {
	let arrayList = selectsalesuserList.arrayList;
	if (arrayList.length > 0) {
		if (selectsalesuserList.batchbg == "N") {
			formData.salesmancode = arrayList[0].usercode;
			formData.salesmandesc = arrayList[0].userdesc;
		}
		//批量变更销售;
		if (selectsalesuserList.batchbg == "Y") {
			let selectList = selectsalesuserList.selectList;
			selectList.forEach(item => {
				let v_obj = {};
				for (const key in item) {
					if (Object.hasOwnProperty.call(item, key)) {
						v_obj[key] = item[key];
					}
				}
				v_obj.nowsalesmancode = arrayList[0].usercode;
				v_obj.nowsalesmandesc = arrayList[0].userdesc;
				tableList2.tableData.push(v_obj);

				//删除左边表格tableList1 选中的数据
				let index = tableList1.tableData.findIndex(item2 => {
					return item2.corpno == item.corpno;
				});
				if (index !== -1) {
					tableList1.tableData.splice(index, 1);
				}
			});
		}
	}
};

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerManagement/select_attributive_substitution.vue_zTable1",
	//不显示分页
	isPaging: false,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户id",
			label: "corpid",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "原归属人员编码",
			label: "basecolumnOriginal_Personnel_Code",
			prop: "salesmancode",
			type: "Input",
			width: "160"
		},
		{
			title: "销售人员/客服",
			label: "itemtitleSalesservice",
			prop: "salesmandesc",
			type: "Input",
			width: "160"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/customerManage/customerManagement/select_attributive_substitution.vue_zTable2",
	//不显示分页
	isPaging: false,
	//表格工具栏
	tableToolbar: {
		right: false
	},

	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户id",
			label: "corpid",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "原归属人员编码",
			label: "basecolumnOriginal_Personnel_Code",
			prop: "salesmancode",
			type: "Input",
			width: "160"
		},
		{
			title: "销售人员/客服",
			label: "itemtitleSalesservice",
			prop: "salesmandesc",
			type: "Input",
			width: "160"
		},
		{
			title: "新归属人员编码",
			label: "basecolumnNew_Employee_Code",
			prop: "nowsalesmancode",
			type: "Input",
			width: "160"
		},
		{
			title: "现任销售主管/客户服务",
			label: "itemtitleNowSalesservice",
			prop: "nowsalesmandesc",
			type: "Input",
			width: "160"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//选择销售对应的客户,参数
const selectsalescutomerList = reactive({
	dialogShow: false,
	salesmancode: "",
	salesmandesc: "",
	corpdesc: "",
	corpnos: "",
	arrayList: []
});
//选择销售对应的客户
const selectCutomer = formEl => {
	if (!formEl) return;
	formEl.validate((valid, fields) => {
		if (valid) {
			let corpnos = "";
			tableList1.tableData.forEach(item => {
				corpnos += "'" + item.corpno + "',";
			});
			tableList2.tableData.forEach(item => {
				corpnos += "'" + item.corpno + "',";
			});

			selectsalescutomerList.corpnos = corpnos.substring(0, corpnos.length - 1);
			selectsalescutomerList.dialogShow = true;
			selectsalescutomerList.salesmancode = formData.salesmancode;
			selectsalescutomerList.salesmandesc = formData.salesmandesc;
			selectsalescutomerList.corpdesc = formData.corpdesc;
			selectsalescutomerList.arrayList = [];
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};
//选择销售对应的客户,回调
const selectsalescutomerClose = () => {
	let arrayList = selectsalescutomerList.arrayList;
	arrayList.forEach(element => {
		tableList1.tableData.push(element);
	});
};
//批量变更
const batchbg_handler = selectList => {
	selectsalesuserList.batchbg = "Y";
	selectsalesuserList.selectList = selectList;
	selectsalesuserList.dialogShow = true;
	selectsalesuserList.corpcode = formData.corpcode;
	selectsalesuserList.rolecode = formData.newcustomtype;
	selectsalesuserList.arrayList = [];
};

//删除
const delete_handler = selectList => {
	selectList.forEach(item => {
		//删除左边表格tableList1 选中的数据
		let index = tableList1.tableData.findIndex(item2 => {
			return item2.corpno == item.corpno;
		});
		if (index !== -1) {
			tableList1.tableData.splice(index, 1);
		}
	});
};
//删除
const delete_handler2 = selectList => {
	selectList.forEach(item => {
		//添加到 左边表格tableList1
		let v_obj = {};
		for (const key in item) {
			if (Object.hasOwnProperty.call(item, key)) {
				v_obj[key] = item[key];
			}
		}
		tableList1.tableData.push(v_obj);

		//删除右边表格tableList2 选中的数据
		let index = tableList2.tableData.findIndex(item2 => {
			return item2.corpno == item.corpno;
		});
		if (index !== -1) {
			tableList2.tableData.splice(index, 1);
		}
	});
};

//提交
const submit_handler = selectList => {
	let userInfoMaps = [];
	selectList.forEach(item => {
		let obj = {};
		obj.corpid = item.corpid; //客户主键
		obj.corpno = item.corpno; //客户编号
		obj.corpdesc = item.corpdesc; //客户名称
		obj.salesmancode = item.salesmancode; //原销售归属
		obj.nowsalesmancode = item.nowsalesmancode; //现销售归属
		userInfoMaps.push(obj);
	});

	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/crm/distribution/distribution!saveReplaceSalesAttribution.action",
			qs.stringify({
				jsonString: JSON.stringify({
					userInfoMaps: userInfoMaps,
					cond: { salesmancode: formData.salesmancode, corpcode: formData.corpcode, newcustomtype: formData.newcustomtype }
				})
			})
		);
		if (res) {
			selectList.forEach(item => {
				//删除右边表格tableList2 选中的数据
				let index = tableList2.tableData.findIndex(item2 => {
					return item2.corpno == item.corpno;
				});
				if (index !== -1) {
					tableList2.tableData.splice(index, 1);
				}
			});
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.success = true;
			//props.condobj.dialogShow = false;
		}
	});
};

//监听 修改锁定数量变化,
watch(tableList1.tableData, tableData1 => {
	if (tableList1.tableData.length > 0) {
		zTable1IsSelected.value = true;
	} else {
		zTable1IsSelected.value = false;
	}
});

//监听   外币总价变化,
watch(tableList2.tableData, tableData2 => {
	if (tableList2.tableData.length > 0) {
		zTable2IsSelected.value = true;
	} else {
		zTable2IsSelected.value = false;
	}
});

onMounted(() => {});
</script>

<style scoped lang="scss">
.divider-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
	margin-left: 5px;
	margin-right: 5px;
}
</style>
