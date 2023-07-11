<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane
				title1="客户基本信息"
				:label="$t('companyCustomerBasicInformationtitle')"
				:name="0"
				class="flex-column"
				style="overflow: auto"
			>
				<div class="flex-column" style="overflow: auto" v-if="tabPaneXR.get(0)">
					<div style="margin: 10px; text-align: right">
						<el-button size="small" type="primary" icon="Search" plain @click="selectCustomer">
							{{ $t("menu_select") }}
						</el-button>
						<el-button size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
							{{ $t("menu_save") }}
						</el-button>
					</div>
					<el-form
						class="flex-1"
						style="overflow: auto; padding-left: 10px; padding-right: 10px"
						label-position="right"
						label-width="120px"
						:model="formData"
						:rules="rules"
						ref="ruleFormRef"
					>
						<el-divider content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')" prop="corpdesc">
									<el-input type="text" clearable v-model.trim="formData.corpdesc" @blur="onblur_corpdesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="英文名称" :label="$t('hotlinkpanelywmctitle')" prop="corpenglishname">
									<el-input
										type="text"
										clearable
										v-model.trim="formData.corpenglishname"
										:formatter="value => value.toUpperCase()"
									>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="别名" :label="$t('corpinfopanelbmtitle')">
									<el-input type="text" clearable v-model="formData.corpalias"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="工商注册号" :label="$t('corpinfopanelRegistrationNumbertitle')" prop="businesslicenseno">
									<el-input type="text" clearable v-model="formData.businesslicenseno"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item
									title1="送检客户类别"
									:label="$t('i18nCustomerapplicationCustomerCreateInformationInspectionCustomerCategory')"
								>
									<el-select v-model="formData.appointcustomtype" class="full-width-input" clearable filterable>
										<el-option
											v-for="item in detectCustomerCategory"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="客户类别" :label="$t('corpinfopanelkhlbtitle')" prop="corptype">
									<el-select v-model="formData.corptype" class="full-width-input" clearable filterable>
										<el-option
											v-for="item in customerCustomertype"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item title1="税号" :label="$t('corpinfopaneltaxpayerIDtitle')">
									<el-input type="text" clearable v-model="formData.taxpayerid"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="国家" :label="$t('weixinfansCountry')" prop="country">
									<el-select v-model="formData.country" class="full-width-input" clearable filterable @change="countryChange">
										<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
									<el-select
										v-model="formData.region"
										class="full-width-input"
										clearable
										filterable
										@change="regionChange"
										@visible-change="regionVisibleChange"
									>
										<el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="省份" :label="$t('i18nCustomerapplicationCustomerCreateInformationProvince')">
									<el-select
										v-model="formData.province"
										class="full-width-input"
										clearable
										filterable
										@change="provinceChange"
										@visible-change="provinceVisibleChange"
									>
										<el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="市区" :label="$t('i18nCustomerapplicationCustomerCreateInformationCityCenter')">
									<el-select
										v-model="formData.city"
										class="full-width-input"
										clearable
										filterable
										@visible-change="cityVisibleChange"
									>
										<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="18">
								<el-form-item
									title1="详细地址"
									:label="$t('i18nCustomerapplicationCustomerCreateInformationDetailedAddress')"
									prop="corplocation"
								>
									<el-input type="text" clearable v-model="formData.corplocation"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
									<el-input type="text" clearable v-model="formData.corppostcode"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="联系人" :label="$t('companypanelcontactdesctitle')" prop="contactname">
									<el-input type="text" clearable v-model="formData.contactname"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')" prop="corpphone">
									<el-input type="text" clearable v-model="formData.corpphone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="传真" :label="$t('personalusercolumncztitle')">
									<el-input type="text" clearable v-model="formData.corpfax"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')" prop="corpemail">
									<el-input type="text" clearable v-model="formData.corpemail"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="12">
								<el-form-item title1="网址" :label="$t('corpinfourltitle')">
									<el-input type="text" clearable v-model="formData.corpsite"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="客户来源" :label="$t('menubaseCustomerSource')" prop="customersource">
									<el-select v-model="formData.customersource" class="full-width-input" clearable filterable>
										<el-option
											v-for="item in customersource"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item>
									<el-checkbox
										title1="添加到联系人"
										v-model="formData.addcontact"
										:label="$t('companyaddcontacttitle')"
										border
										:disabled="addcontactDisabled"
									/>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("fieldTradinginformationtitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="常用货币" :label="$t('corpinfoCommonmoneytitle')">
									<el-select v-model="formData.corpcurrency" class="full-width-input" clearable filterable>
										<el-option v-for="item in corpcurrency" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="信贷上限" :label="$t('corpinfocreditlimittitle')">
									<el-input type="text" clearable v-model="formData.creditline" :readonly="true"> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="付款条件" :label="$t('corpinfopaymentconditionstitle')">
									<el-select v-model="formData.paycondition" class="full-width-input" clearable filterable disabled>
										<el-option
											v-for="item in paycondition"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="首次交易日期" :label="$t('corpinfofirstTransactiondatetitle')">
									<el-input type="text" clearable readonly v-model="formData.firstdealdate"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("corpinfopaneldlsxxtitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="代理商名称" :label="$t('corpinfopaneldlsmctitle')">
									<el-input v-model="formData.agentdesc" readonly clearable> </el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="代理商编码" :label="$t('corpinfopaneldlsbmtitle')">
									<el-input type="text" clearable readonly v-model="formData.agentcode">
										<template #append>
											<el-button-group>
												<el-button @click="selectagent" icon="ZoomIn" />
												<el-button @click="delAgent" type="primary" plain icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item
									label-width="170px"
									title1="销售代理佣金点"
									:label="$t('itemtitlefoldersagentbrokerage')"
									prop="agentbrokerage"
								>
									<el-input-number
										v-model.number="formData.agentbrokerage"
										:min="0"
										:max="100"
										controls-position="right"
										:disabled="agentbrokerageDisabled"
									/>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("corpinfopanelgsxxtitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="分公司" :label="$t('corpinfoSubordinateToBranchtitle')">
									<el-input type="text" clearable readonly v-model="formData.branchcorpdesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="归属部门" :label="$t('corpinfopaneldepartmentdesctitle')">
									<el-input type="text" clearable readonly v-model="formData.departmentdesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="归属类型" :label="$t('itemtitleAttributiontype')" prop="newcustomtype">
									<el-select v-model="formData.newcustomtype" class="full-width-input" clearable filterable>
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
								<el-form-item title1="销售人员/客服" :label="$t('itemtitleSalesservice')">
									<el-input type="text" clearable readonly v-model="formData.salesmandesc"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("panelcolumnRemark") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="12">
								<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')">
									<el-input type="textarea" clearable v-model="formData.remark"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="PKM 客户区域" :label="$t('customerapplicationinvoice_format')">
									<el-select v-model="formData.invoiceformat" class="full-width-input" clearable filterable>
										<el-option
											v-for="item in invoiceformat"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("corpinfopanelcjrxxtitle") }}</el-divider>
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="6">
								<el-form-item title1="创建人" :label="$t('corpinfopanelcjrtitle')">
									<el-input type="text" clearable readonly v-model="formData.recorderdesc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
									<el-input type="text" clearable readonly v-model="formData.recordtime"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="客户资质文件信息"
				:label="$t('companypanel3CustomerQualificationFileInformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="1"
			>
				<zTable v-if="tabPaneXR.get(1)" ref="zTable1" :tableList="tableList" @link-detailbg="downloadfiles">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="UploadFilled" plain @click="UploadFilled">
							{{ $t("menu_upload") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="DeleteFilled"
							plain
							:disabled="!scope.isSelected"
							@click="deleteUpload(scope.ids, scope.selectList)"
							>{{ $t("menu_deleteupload") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户联系人信息"
				:label="$t('companypanelCustomerContactInformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="2"
			>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable2" :tableList="tableList2" @current-change="currentChangeContact">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="AddContact">
							{{ $t("menu_new") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="deleteContact(scope.ids)"
							>{{ $t("menu_delete") }}</el-button
						>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editContact(scope.row)">
							{{ $t("editContact") }}
						</el-button>
						<el-button type="primary" link icon="CirclePlus" @click="editContactAddress(scope.row)">
							{{ $t("SRM_selectAddress") }}
						</el-button>
					</template>
				</zTable>
				<el-divider content-position="left" style="margin: 0px; margin-top: 10px; border-width: 3px"></el-divider>
				<zTable v-if="tabPaneXR.get(2)" ref="zTable22" :tableList="tableList22"></zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="地址信息"
				:label="$t('titlebaseAddressinformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="3"
			>
				<zTable v-if="tabPaneXR.get(3)" ref="zTable3" :tableList="tableList3" @current-change="currentChangeAddress">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="AddAddress">
							{{ $t("menu_new") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="deleteAddress(scope.ids)"
							>{{ $t("menu_delete") }}</el-button
						>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editAddress(scope.row)">
							{{ $t("editAddress") }}
						</el-button>
					</template>
				</zTable>
				<el-divider content-position="left" style="margin: 0px; margin-top: 10px; border-width: 3px"></el-divider>
				<zTable v-if="tabPaneXR.get(3)" ref="zTable33" :tableList="tableList33"></zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="账户信息"
				:label="$t('menhuAccountInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="4"
			>
				<zTable v-if="tabPaneXR.get(4)" ref="zTable4" :tableList="tableList4" @link-detailbg="downloadAccountfiles">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="AddAccount">
							{{ $t("menu_new") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="deleteAccount(scope.ids)"
							>{{ $t("menu_delete") }}</el-button
						>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editAccount(scope.row)">
							{{ $t("menu_edit") }}
						</el-button>
						<el-button type="primary" link icon="FolderChecked" @click="selectAccountFile(scope.row)">
							{{ $t("qualificationDocumenttoSelectFile") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户综合信息"
				:label="$t('companyCustomerComplexInformationtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="5"
			>
				<el-form
					v-if="tabPaneXR.get(5)"
					style="margin-top: 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					ref="ruleFormRef5"
				>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="规模" :label="$t('columnscale')">
								<el-input type="text" clearable v-model="formData.scale"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="8">
							<el-form-item title1="行业" :label="$t('columnindustry')">
								<el-input type="textarea" clearable v-model="formData.industry"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="其他信息" :label="$t('columnotherinfo')">
								<el-input type="textarea" clearable v-model="formData.otherinfo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item title1="测试要求" :label="$t('columntestdemand')">
								<el-input type="textarea" clearable v-model="formData.testdemand"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider content-position="left" style="margin: 0px; border-width: 3px"></el-divider>
				<zTable v-if="tabPaneXR.get(5)" ref="zTable5" :tableList="tableList5" @cellClick="cellClick">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="AddComprehensive">
							{{ $t("menu_new") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="delComprehensive(scope.ids)"
							>{{ $t("menu_delete") }}</el-button
						>
						<el-button size="small" type="primary" icon="Document" plain @click="saveComprehensive(scope.getEditSelectList)">
							{{ $t("menu_save") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="追踪记录"
				:label="$t('corpinfoTrackrecordtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="6"
			>
				<zTable v-if="tabPaneXR.get(6)" ref="zTable6" :tableList="tableList6">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="AddTrackingRecord">
							{{ $t("menu_new") }}
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="deleteTrackingRecord(scope.ids, scope.selectList)"
							>{{ $t("menu_delete") }}</el-button
						>
						<el-button
							size="small"
							type="primary"
							icon="DocumentCopy"
							plain
							:disabled="!scope.isSelected"
							@click="CopyTrackingRecord(scope.ids, scope.selectList)"
						>
							{{ $t("menu_copynew") }}
						</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editTracking(scope.row)">
							{{ $t("menu_edit") }}
						</el-button>
						<el-button type="primary" link icon="Download" @click="downloadTrack(scope.row)">
							{{ $t("columntrackDownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 选择代理商 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="agentList.dialogShow"
				:title="$t('selectbase1agent')"
				width="50%"
				customclass="selectAgentCss"
				@close="selectAgentClose"
			>
				<selectagentview :condobj="agentList"></selectagentview>
			</ZDialog>
		</div>
		<!-- 查询客户 -->
		<div v-dialogStretching>
			<ZDialog v-model="customerList.dialogShow" :title="$t('corpinfopanelckxxcxtitle')" width="95%">
				<customerListQuery :condobj="customerList"></customerListQuery>
			</ZDialog>
		</div>
		<!-- 上传资质文件 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="qualificationList.dialogShow"
				:title="$t('UPLOAD_uploadFile')"
				width="40%"
				customclass="selectAgentCss"
				@close="qualificationClose"
			>
				<qualificationsUpload :condobj="qualificationList"></qualificationsUpload>
			</ZDialog>
		</div>

		<!-- 添加联系人 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="contactList.dialogShow"
				:title="$t('companypanelCustomerContactInformationtitle')"
				width="95%"
				customclass="selectAgentCss"
				@close="contactClose"
			>
				<customercontactnew :condobj="contactList"></customercontactnew>
			</ZDialog>
		</div>
		<!-- 联系人选择对应地址 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="contactAddressList.dialogShow"
				:title="$t('titlebaseAddressinformation')"
				width="80%"
				customclass="selectAgentCss"
				@close="contactAddressClose"
			>
				<customeraddressselect :condobj="contactAddressList"></customeraddressselect>
			</ZDialog>
		</div>
		<!-- 地址信息 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="addressList.dialogShow"
				:title="$t('titlebaseAddressinformation')"
				width="80%"
				customclass="selectAgentCss"
				@close="addressClose"
			>
				<customeraddress :condobj="addressList"></customeraddress>
			</ZDialog>
		</div>

		<!-- 账户信息选择文件 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="accountFilesList.dialogShow"
				:title="$t('companypanel3CustomerQualificationFileInformationtitle')"
				width="95%"
				@close="accountFilesClose"
			>
				<customerfileselect :condobj="accountFilesList"></customerfileselect>
			</ZDialog>
		</div>
		<!-- 账户信息新增 -->
		<div v-dialogStretching>
			<ZDialog
				v-model="accountNewList.dialogShow"
				:title="$t('menhuAccountInformation')"
				width="80%"
				customclass="selectAgentCss"
				@close="accountNewListClose"
			>
				<customerAccountNew :condobj="accountNewList"></customerAccountNew>
			</ZDialog>
		</div>
		<!-- 填写追踪历史记录 -->
		<div v-dialogStretching>
			<ZDialog v-model="addTrackingRecordList.dialogShow" title="" width="90%" @close="addTrackingRecordClose">
				<potentialtrackdetail :condobj="addTrackingRecordList" />
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
import { GlobalStore } from "@/store/globalStore";
import moment from "moment";

import customerListQuery from "../customerQuery/customer_list_query.vue";
import selectagentview from "../customerSelete/selectagent.vue";
import qualificationsUpload from "../customerApplication/qualificationsUpload.vue";
import customeraddress from "../customerApplication/customeraddress_detail.vue";
import customercontactnew from "../customerApplication/customer_contact_new.vue";
import customerfileselect from "../customerSelete/customerfile_select.vue";
import customerAccountNew from "../customerApplication/customer_account_new.vue";
import customeraddressselect from "../customerSelete/customeraddress_select.vue";
import potentialtrackdetail from "./potential_track_detail.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const globalStore = GlobalStore();
const ruleFormRef = ref();
const agentbrokerageDisabled = ref(true);
const addcontactDisabled = ref(false);

//表单字段
const formData = reactive({
	corpid: props.condobj.corpid,
	corpdesc: "",
	corpenglishname: "",
	corpalias: "",
	businesslicenseno: "",
	appointcustomtype: "",
	corptype: "",
	taxpayerid: "",
	corplocation: "",
	corppostcode: "",
	country: "",
	region: "",
	province: "",
	city: "",
	contactname: "",
	corpphone: "",
	corpfax: "",
	corpemail: "",
	corpsite: "",
	addcontact: "",
	customersource: "",
	representmail: "",
	corpcurrency: "",
	creditline: "",
	paycondition: "0",
	firstdealdate: "",
	isdiscount: "0",
	discount: 0,
	minmoney: 200,
	agentcode: "",
	agentdesc: "",
	agentbrokerage: 0,
	branchcorpdesc: "",
	branchcorpcode: "",
	departmentdesc: "",
	departmentcode: "",
	newcustomtype: "SE",
	salesmandesc: "",
	deptlevel: "",
	remark: "",
	invoiceformat: "",
	protection: "",
	recorderdesc: "",
	recordtime: "",
	scale: "",
	industry: "",
	otherinfo: "",
	testdemand: "",
	recordercode: "",
	recorderdesc: "",
	auditflag: "",
	workflowid: "",
	submitcorp: "",
	corpno: "",
	retrieveflag: "",
	state: ""
});
//校验
const corpdescValidator = (rule, value, callback) => {
	//客户姓名不允许出现!，因为!在被用来替换英文单引号
	if (value.indexOf("@!!!@") >= 0) {
		callback(new Error(i18n.t("Message_Corodescname")));
	} else {
		callback();
	}
};
const agentbrokerageValidator = (rule, value, callback) => {
	if (formData.agentcode && !Number.isInteger(value)) {
		callback(new Error(i18n.t("rulesPropMessage") + ", " + i18n.t("mustbeanumber")));
	} else {
		callback();
	}
};

const businesslicensenoValidator = async (rule, value, callback) => {
	if (formData.country == "086" && !value) {
		callback(new Error(i18n.t("message_ChinaUserBusinessRefistration_CanNotEmpty")));
	} else if (value) {
		let params = { "cond.bulicno": formData.businesslicenseno, "cond.corpid": formData.corpid };
		try {
			await http.post("/mylims/enterpriseinfo/enterpriseinfo!bulicnoValidate.action", qs.stringify(params), {
				headers: { noLoading: true }
			});
			callback();
		} catch (error) {
			callback(new Error(i18n.t("Message_OperationFailureInformation")));
		}
	} else {
		callback();
	}
};

const rules = reactive({
	corpdesc: [
		{ required: true, message: i18n.t("rulesPropMessage") },
		{ validator: corpdescValidator, trigger: "blur" }
	],
	corpenglishname: [{ required: true, message: i18n.t("rulesPropMessage") }],
	businesslicenseno: [{ validator: businesslicensenoValidator, trigger: "blur" }],
	corptype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corplocation: [{ required: true, message: i18n.t("rulesPropMessage") }],
	country: [{ required: true, message: i18n.t("rulesPropMessage") }],
	contactname: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpphone: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpemail: [{ required: true, message: i18n.t("rulesPropMessage") }],
	customersource: [{ required: true, message: i18n.t("rulesPropMessage") }],
	newcustomtype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	agentbrokerage: [{ validator: agentbrokerageValidator, trigger: "blur" }]
});

//下拉数据源
const detectCustomerCategory = getdropSownSelection("detectCustomerCategory");
const customerCustomertype = getdropSownSelection("customer_customertype");
const customersource = getdropSownSelection("customer_informationsource");
const paycondition = getdropSownSelection("dgbj_paydeadline");
const invoiceformat = getdropSownSelection("crminvoice_format");
const filetypeAr = getdropSownSelection("qualificationDocumentto");
const filelevelAr = getdropSownSelection("i18nCustomerapplicationFileDocumentlevel");
const addresstypeAr = getdropSownSelection("crm_addresstype");
//是否
const whetherAr = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");

// 国家下拉
let paytype = ref([]);
//区域下拉
let region = ref([]);
//省份下拉
let province = ref([]);
//市区下拉
let city = ref([]);

//全部区域下拉
let regionAr = ref([]);
//全部省份下拉
let proviceAr = ref([]);
//全部市区下拉
let cityAr = ref([]);

region.value = regionAr.value = getdropDownInChina("crm_region");
province.value = proviceAr.value = getdropDownInChina("crm_province");
city.value = cityAr.value = getdropDownInChina("crm_city");

//异步请求，瞬间同时请求一个接口多次，会取消所以请求，只会执行最后一次请求（随机的）
//处理方法：如果是同一个接口那就同步请求。
const getAddressFun = async () => {
	paytype.value = await getCountry();
};

// 选中 国家下拉
const countryChange = val => {
	formData.region = "";
	formData.province = "";
	formData.city = "";
	region.length = 0;
	province.length = 0;
	city.length = 0;
};
// 选中 区域下拉
const regionChange = val => {
	formData.province = "";
	formData.city = "";
	province.length = 0;
	city.length = 0;
};
const regionVisibleChange = async val => {
	if (val) {
		region.value = await getAddress("crm_region", formData.country, paytype.value);
	}
};
// 选中 省份下拉
const provinceChange = val => {
	formData.city = "";
	city.length = 0;
};
const provinceVisibleChange = async val => {
	if (val) {
		province.value = await getAddress("crm_province", formData.region, region.value);
	}
};
const cityVisibleChange = async val => {
	if (val) {
		city.value = await getAddress("crm_city", formData.province, province.value);
	}
};

//货币类型
let corpcurrency = reactive([]);
getCurrency(corpcurrency);

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

//联系类别
const commtype = [
	{
		label: "corpinfopanelcontacttitle0",
		value: "0"
	},
	{
		label: "corpinfopanelcontacttitle1",
		value: "1"
	},
	{
		label: "corpinfopanelcontacttitle2",
		value: "2"
	},
	{
		label: "corpinfopanelcontacttitle3",
		value: "3"
	},
	{
		label: "corpinfopanelcontacttitle4",
		value: "4"
	}
];

//在 formData.corpdesc 失去焦点时触发
const onblur_corpdesc = e => {
	for (var i = 0; i < formData.corpdesc.length; i++) {
		if (formData.corpdesc.charCodeAt(i) > 127) {
			return;
		}
	}

	if (!formData.corpenglishname) {
		formData.corpenglishname = formData.corpdesc;
	}
};

//选择代理商参数
const agentList = reactive({
	dialogShow: false,
	arrayList: []
});
//选择代理商
const selectagent = () => {
	agentList.dialogShow = true;
};
//选择代理商回调
const selectAgentClose = () => {
	if (agentList.arrayList.length > 0) {
		formData.agentcode = agentList.arrayList[0].usercode;
		formData.agentdesc = agentList.arrayList[0].userdesc;
		formData.agentbrokerage = 0;
		agentbrokerageDisabled.value = false;
	}
};
// 清除代理商
const delAgent = () => {
	agentList.arrayList = [];
	formData.agentcode = "";
	formData.agentdesc = "";
	formData.agentbrokerage = 0;
	agentbrokerageDisabled.value = true;
};

//客户查询参数
const customerList = reactive({
	dialogShow: false,
	corpdesc: String,
	corplocation: String,
	branchcorpdesc: String,
	departmentdesc: String,
	businesslicenseno: String,
	corpphone: String,
	corpenglishname: String,
	corpalias: String,
	country: String
});
//打开客户查询
const selectCustomer = () => {
	customerList.dialogShow = true;
	customerList.corpdesc = formData.corpdesc;
	customerList.corplocation = formData.corplocation;
	customerList.branchcorpdesc = formData.branchcorpdesc;
	customerList.departmentdesc = formData.departmentdesc;
	customerList.businesslicenseno = formData.businesslicenseno;
	customerList.corpphone = formData.corpphone;
	customerList.corpenglishname = formData.corpenglishname;
	customerList.corpalias = formData.corpalias;
	customerList.country = formData.country;
};

//根据 corpid 初始化数据源
const getFormData = async () => {
	let params = {
		jsonString: JSON.stringify({
			potentialclientInfo: {
				corpid: formData.corpid
			}
		})
	};
	const res = await http.post("/crm/potentialclient/potentialclient!selectCorpBaseInfoById.action", qs.stringify(params));
	for (let key in res.potentialclientInfo[0]) {
		//判定 potentialclientInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			if (key == "addcontact" || key == "representmail" || key == "protection") {
				formData[key] = res.potentialclientInfo[0][key] == 0 ? false : true;
			} else {
				formData[key] = res.potentialclientInfo[0][key];
			}

			if (key == "agentbrokerage") {
				formData[key] = res.potentialclientInfo[0][key] > 0 ? res.potentialclientInfo[0][key] : 0;
			}

			if (key == "agentcode" && res.potentialclientInfo[0]["agentcode"]) {
				agentbrokerageDisabled.value = false;
			}
		}
	}
	addcontactDisabled.value = true;
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate((valid, fields) => {
		if (valid) {
			//保存客户基本信息
			saveEnterpriseInfo();
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};

//保存客户基本信息
const saveEnterpriseInfo = async () => {
	formData.addcontact ? (formData.addcontact = 1) : (formData.addcontact = 0);
	formData.representmail ? (formData.representmail = 1) : (formData.representmail = 0);
	formData.protection ? (formData.protection = 1) : (formData.protection = 0);
	formData.agentbrokerage > 0 ? true : (formData.agentbrokerage = null);

	try {
		const res1 = await http.post(
			"/mylims/enterpriseinfo/enterpriseinfo!enterpriseInfoValidate.action",
			qs.stringify({
				"cond.corpdesc": formData.corpdesc,
				"cond.corpenglishname": formData.corpenglishname,
				"cond.corplocation": formData.corplocation,
				"cond.corpphone": formData.corpphone,
				"cond.corpid": formData.corpid
			})
		);

		let jsonString = {
			potentialclientInfo: formData
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/potentialclient/potentialclient!savePotentialclientInfo.action", qs.stringify(params));
		if (res) {
			if (res.potentialclientInfo.length > 0) {
				ElMessage.success(i18n.t("Message_saveSuccess"));

				for (let key in res.potentialclientInfo[0]) {
					//判定 potentialclientInfo 的key 是否存在 formData 的key
					if (Object.keys(formData).includes(key)) {
						if (key == "addcontact" || key == "representmail" || key == "protection") {
							formData[key] = res.potentialclientInfo[0][key] == 0 ? false : true;
						} else {
							formData[key] = res.potentialclientInfo[0][key];
						}

						if (key == "agentbrokerage") {
							formData[key] = res.potentialclientInfo[0][key] > 0 ? res.potentialclientInfo[0][key] : 0;
						}

						if (key == "agentcode" && res.potentialclientInfo[0]["agentcode"]) {
							agentbrokerageDisabled.value = false;
						}
					}
				}
				addcontactDisabled.value = true;
				props.condobj.success = true;
			} else {
				ElMessage.error("error");
			}
		}
	} catch (error) {
		let result = error.response.data;
		if (result == "1") {
			ElMessage.warning(i18n.t("message_Corpdesc_CanNotEmpty")); //客户名称不能为空
		} else if (result == "2") {
			ElMessage.warning(i18n.t("message_EnglishName_CanNotEmpty")); //英文名称不能空！
		} else if (result == "3") {
			ElMessage.warning(i18n.t("message_Phone_CanNotEmpty")); //电话不能为空
		} else if (result == "4") {
			ElMessage.warning(i18n.t("addresslist_detailaddress")); //详细地址不能为空
		} else if (result == "5") {
			ElMessage.warning(i18n.t("message_Corpdesc_HasAlreadyExisted")); //此客户名称已经存在
		} else if (result == "6") {
			ElMessage.warning(i18n.t("message_EnglishName_HasAlreadyExisted")); //此英文名称已经存在
		} else if (result == "7") {
			ElMessage.warning(i18n.t("message_DetailedAddress_HasAlreadyExisted")); //详细地址已存在
		} else if (result == "8") {
			ElMessage.warning(i18n.t("message_Telephone_HasAlreadyExisted")); //此电话已存在
		}
	}
};

const zTable1 = ref();
//客户资质文件信息表格对象
const tableList = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable1",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/upload/upload!selectfilesInfoByCond.action",
		root: "fileInfos",
		baseParams: {
			"cond.corpid": formData.corpid,
			"cond.usercodeid": "YZ"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "fileid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "文档主题",
			label: "textfieldfieldLabeldocumenttheme",
			prop: "theme",
			type: "Input",
			width: "200"
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link"
		},
		{
			title: "文档类型",
			label: "textfieldfieldLabeldocumenttype",
			prop: "filetype",
			type: "Select",
			width: "160",
			typeData: filetypeAr
		},
		{
			title: "文档等级",
			label: "textfieldfieldLabeldocumentlevel",
			prop: "filelevel",
			type: "Select",
			width: "160",
			typeData: filelevelAr
		},
		{
			title: "文档大小",
			label: "companypanel3filesizetitle",
			prop: "filesize",
			type: "Input",
			width: "160"
		},
		{
			title: "扩展名",
			label: "companypanel3extensiontitle",
			prop: "extension",
			type: "Input",
			width: "120"
		},
		{
			title: "文档说明",
			label: "textfieldfieldLabeldocumentdescription",
			prop: "remark",
			type: "Input",
			width: "300"
		},
		{
			title: "上传用户",
			label: "columnUploadUser",
			prop: "recorderdesc",
			type: "Input",
			width: "120"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordertime",
			type: "Input",
			width: "300"
		},
		{
			title: "mdmfileid",
			label: "",
			prop: "mdmfileid",
			type: "Input",
			width: "300",
			isHide: true
		},
		{
			title: "businesstype",
			label: "",
			prop: "businesstype",
			type: "Input",
			width: "120",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//上传资质文件参数
const qualificationList = reactive({
	dialogShow: false,
	businessobjectid: String,
	success: false
});
//上传资质文件
const UploadFilled = () => {
	qualificationList.dialogShow = true;
	qualificationList.businessobjectid = formData.corpid;
	qualificationList.success = false;
};
// 上传资质文件成功后的回调
const qualificationClose = () => {
	if (qualificationList.success) {
		zTable1.value.getTableList();
	}
};
//删除资质文件
const deleteUpload = (ids, selectList) => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			fileInfos: []
		};
		selectList.forEach(item => {
			jsonString.fileInfos.push({
				fileid: item.fileid,
				mdmfileid: item.mdmfileid
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.crm": "crm"
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable1.value.getTableList();
		}
	});
};
//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

// 联系人信息弹出层参数
const contactList = reactive({
	dialogShow: false,
	contactid: "",
	corpid: formData.corpid,
	success: false
});
const zTable2 = ref();
//联系人表格
const tableList2 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable2",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContactsByCond.action",
		root: "contactslist",
		baseParams: {
			"cond.corpid": formData.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "",
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
			label: "",
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
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//联系人对应的地址表格
const zTable22 = ref();
const tableList22 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable22",
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCondWithContact.action",
		root: "addressInfos",
		baseParams: {
			"cond.contactid": ""
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "",
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

//添加联系人
const AddContact = () => {
	contactList.corpid = formData.corpid;
	contactList.contactid = "";
	contactList.success = false;
	contactList.dialogShow = true;
};
//编辑联系人
const editContact = row => {
	contactList.corpid = formData.corpid;
	contactList.contactid = row.contactid;
	contactList.success = false;
	contactList.dialogShow = true;
};
//保存联系人回调
const contactClose = () => {
	if (contactList.success) {
		zTable2.value.getTableList();
	}
};

// 联系人对应地址信息弹出层参数
const contactAddressList = reactive({
	dialogShow: false,
	corpid: formData.corpid,
	contactid: null,
	arrayList: []
});

//联系人对应选择地址信息弹出方法
const editContactAddress = row => {
	contactAddressList.corpid = formData.corpid;
	contactAddressList.arrayList = [];
	contactAddressList.contactid = row.contactid;
	contactAddressList.dialogShow = true;
};
//联系人对应选择地址信息的回调函数
const contactAddressClose = async () => {
	if (contactAddressList.arrayList.length > 0) {
		let params = {
			"cond.corpid": formData.corpid,
			jsonString: JSON.stringify({
				contactaddressInfos: [
					{
						addressid: contactAddressList.arrayList[0].id,
						contactid: contactAddressList.contactid,
						typecode: contactAddressList.arrayList[0].addrtype
					}
				]
			})
		};
		const res2 = await http.post("/crm/contactaddress/contactaddress!saveContactaddressInfo.action", qs.stringify(params));
		ElMessage.success(i18n.t("Message_saveSuccess"));
		zTable22.value.getTableList();
	}
};

//删除联系人
const deleteContact = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			contactslist: []
		};
		ids.forEach(item => {
			jsonString.contactslist.push({
				contactid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!deleteCorpContactsInfo.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable2.value.getTableList();
		}
	});
};

//联系人列表选中行事件
const currentChangeContact = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		tableList22.httpAttribute.baseParams["cond.contactid"] = currentRow.contactid;
		zTable22.value.reuseTableList();
	}
};

// 地址信息弹出层参数
const addressList = reactive({
	dialogShow: false,
	id: "",
	corpid: formData.corpid,
	success: false
});

const zTable3 = ref();
//地址表格
const tableList3 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable3",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/address/address!selectAddressInfoByCond.action",
		root: "addressInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
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
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//新增地址
const AddAddress = () => {
	addressList.corpid = formData.corpid;
	addressList.dialogShow = true;
	addressList.id = "";
	addressList.success = false;
};
//删除地址信息
const deleteAddress = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			addressInfos: []
		};
		ids.forEach(item => {
			jsonString.addressInfos.push({
				id: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/address/address!deleteAddressInfos.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			zTable3.value.getTableList();
		}
	});
};

// 编辑地址信息
const editAddress = row => {
	addressList.corpid = formData.corpid;
	addressList.dialogShow = true;
	addressList.id = row.id;
	addressList.success = false;
};
//保存地址信息的回调函数
const addressClose = () => {
	if (addressList.success) {
		zTable3.value.getTableList();
	}
};

//地址对应联系人表格
const zTable33 = ref();
const tableList33 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable33",
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectContactsByid.action",
		root: "contactslist",
		baseParams: {
			"cond.id": ""
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
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
			width: "170"
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

//地址列表选中行事件
const currentChangeAddress = (currentRow, oldCurrentRow) => {
	if (currentRow) {
		tableList33.httpAttribute.baseParams["cond.id"] = currentRow.id;
		zTable33.value.reuseTableList();
	}
};
const zTable4 = ref();
//账户表格
const tableList4 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable4",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectPotentialClientaccountInfoByCond.action",
		root: "crmaccountInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "accountid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "账户号",
			label: "companypanelaccountnotitle",
			prop: "accountno",
			type: "Input",
			width: "160"
		},
		{
			title: "账户名",
			label: "companypanelaccountnametitle",
			prop: "accountcode",
			type: "Input",
			width: "160"
		},
		{
			title: "是否为主账户",
			label: "companypanelOrNotMainAccounttitle",
			prop: "ismain",
			type: "Select",
			typeData: whetherAr,
			width: "160"
		},
		{
			title: "开户行",
			label: "companypanelaccountbanktitle",
			prop: "accountbank",
			type: "Input",
			width: "160"
		},
		{
			title: "银行地址",
			label: "companypanelbankadresstitle",
			prop: "bankadress",
			type: "Input",
			width: "160"
		},
		{
			title: "SWIFT",
			label: "companypanelswifttitle",
			prop: "swift",
			type: "Input",
			width: "160"
		},
		{
			title: "首次交易日期",
			label: "corpinfofirstTransactiondatetitle",
			prop: "firstdealtime",
			type: "Input",
			width: "160"
		},
		{
			title: "文档名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Link",
			width: "300"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "300"
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//  账户信息新增或编辑弹出层参数
const accountNewList = reactive({
	dialogShow: false,
	accountid: "",
	corpid: formData.corpid,
	success: false
});

//账户信息新增
const AddAccount = () => {
	accountNewList.corpid = formData.corpid;
	accountNewList.accountid = "";
	accountNewList.success = false;
	accountNewList.dialogShow = true;
};

//编辑账户信息
const editAccount = row => {
	accountNewList.corpid = formData.corpid;
	accountNewList.accountid = row.accountid;
	accountNewList.success = false;
	accountNewList.dialogShow = true;
};
//保存账户信息成功回调方法
const accountNewListClose = () => {
	if (accountNewList.success) {
		zTable4.value.getTableList();
	}
};

//下载账户对应的资质文件
const downloadAccountfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

// 账户信息选择文件弹出层参数
const accountFilesList = reactive({
	dialogShow: false,
	corpid: formData.corpid,
	accountRow: {},
	arrayList: []
});

//选择账户对应的资质文件
const selectAccountFile = row => {
	accountFilesList.corpid = formData.corpid;
	accountFilesList.accountRow = row;
	accountFilesList.arrayList = [];
	accountFilesList.dialogShow = true;
};
//选择账户对应的资质文件 回调方法
const accountFilesClose = async () => {
	if (accountFilesList.arrayList.length > 0) {
		accountFilesList.accountRow.fileid = accountFilesList.arrayList[0].fileid;
		accountFilesList.accountRow.filename = accountFilesList.arrayList[0].filename;
		let jsonString = {
			crmaccountInfos: [accountFilesList.accountRow]
		};
		let params = {
			"cond.corpid": formData.corpid,
			jsonString: JSON.stringify(jsonString)
		};
		//保存文件信息
		const res = await http.post("/crm/account/crmaccount!saveCrmaccountInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			zTable4.value.getTableList();
		}
	}
};
//删除账户信息
const deleteAccount = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			crmaccountInfos: []
		};
		ids.forEach(item => {
			jsonString.crmaccountInfos.push({
				accountid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/account/crmaccount!deleteCrmaccountInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable4.value.getTableList();
		}
	});
};

const zTable5 = ref();
const tableList5 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable5",
	//开启编辑
	edit: true,
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/report/reportinfo!selectCrmReportInfoByCond.action",
		root: "crmReportInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "reportid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "报告中文抬头",
			label: "itemtitlereportzh",
			prop: "report_zh",
			type: "Input",
			width: "200",
			edit: true
		},
		{
			title: "报告英文抬头",
			label: "itemtitlereportus",
			prop: "report_us",
			type: "Input",
			width: "200",
			edit: true
		},
		{
			title: "报告中文地址",
			label: "itemtitlereportaddresszh",
			prop: "report_address_zh",
			type: "Input",
			edit: true
		},
		{
			title: "报告英文地址",
			label: "itemtitlereportaddresscn",
			prop: "report_address_us",
			type: "Input",
			edit: true
		}
	],
	// 表格数据
	tableData: []
});

//客户综合信息新增
const AddComprehensive = () => {
	zTable5.value.addRowData();
};

//保存客户综合信息
const saveComprehensive = async getEditSelectList => {
	let selectList = getEditSelectList();
	if (selectList.length > 0) {
		for (let i = 0; i < selectList.length; i++) {
			if (!selectList[i].report_zh) {
				ElMessage.warning(i18n.t("Message_report_zhNull"));
				return false;
			}
		}

		let jsonString = {
			crmReportInfos: selectList
		};
		let params = {
			"cond.corpid": formData.corpid,
			jsonString: JSON.stringify(jsonString)
		};
		//保存报告信息
		const res = await http.post("/crm/report/reportinfo!saveCrmReportInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			zTable5.value.getTableList();
		}
		//保存客户基本信息
		saveEnterpriseInfo();
	} else {
		//保存客户基本信息
		saveEnterpriseInfo();
		zTable5.value.getTableList();
	}
};

//删除客户综合信息
const delComprehensive = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			crmReportInfos: []
		};
		ids.forEach(item => {
			jsonString.crmReportInfos.push({
				reportid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/report/reportinfo!deleteCrmReportInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable5.value.getTableList();
		}
	});
};

//追踪记录
const zTable6 = ref();
const tableList6 = reactive({
	id: "/customerManage/potentialCustomer/potentialclient_detail.vue_zTable6",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/trackinfo/track!selectTrackInfoByCond.action",
		root: "trackInfos",
		baseParams: {
			"cond.corpid": formData.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "追踪记录id",
			label: "",
			prop: "commid",
			type: "id",
			isHide: true
		},
		{
			title: "对STC认可度",
			label: "companyapprovalstctitle",
			prop: "approvalstc",
			type: "Input",
			width: "160"
		},
		{
			title: "选择实验室最关注什么",
			label: "companylaboratoryfocustitle",
			prop: "laboratoryfocus",
			type: "Input",
			width: "160"
		},
		{
			title: "过往一年的检测费用",
			label: "companypastyearcoststitle",
			prop: "pastyearcosts",
			type: "Input",
			width: "160"
		},
		{
			title: "与其他实验室的合作情况",
			label: "companycooperationlabstitle",
			prop: "cooperationlabs",
			type: "Input",
			width: "160"
		},
		{
			title: "联系时间",
			label: "companyContactTimetitle",
			prop: "commtime",
			type: "Date",
			width: "160"
		},
		{
			title: "联系类别",
			label: "companyContactClasstitle",
			prop: "commtype",
			type: "Select",
			typeData: commtype,
			width: "160"
		},
		{
			title: "联系方式",
			label: "corpinfopanelcontacttitle",
			prop: "commway",
			type: "Input",
			width: "160"
		},
		{
			title: "下次跟进提醒时间",
			label: "columnremindertime",
			prop: "remindertime",
			type: "Date",
			width: "160"
		},
		{
			title: "联系人",
			label: "columnContactPerson",
			prop: "commclient",
			type: "Input",
			width: "160"
		},
		{
			title: "职位",
			label: "companypositiontitle",
			prop: "position",
			type: "Input",
			width: "160"
		},
		{
			title: "动态跟进情况",
			label: "companyfollowsituationtitle",
			prop: "followsituation",
			type: "Input",
			width: "160"
		},
		{
			title: "进一步跟进方法/动作",
			label: "columncustomernextfollow",
			prop: "nextfollowup",
			type: "Input",
			width: "160"
		},
		{
			title: "信息来源",
			label: "companyinformationSourcetitle",
			prop: "informationSource",
			type: "Select",
			typeData: customersource,
			width: "160"
		},
		{
			title: "主要产品",
			label: "companymainproductstitle",
			prop: "mainproducts",
			type: "Input",
			width: "160"
		},
		{
			title: "测试项目",
			label: "corpinfotestprojecttitle",
			prop: "testproject",
			type: "Input",
			width: "160"
		},
		{
			title: "记录人员",
			label: "companyrecordercodetwotitle",
			prop: "recordercodetwo",
			type: "Input",
			width: "160"
		},
		{
			title: "记录人员编码",
			label: "",
			prop: "reocrdercode",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "记录时间",
			label: "companyrecordertimetwotitle",
			prop: "recordertimetwo",
			type: "DateTime",
			width: "160"
		},
		{
			title: "操作",
			label: "itemtitleloginoperation",
			prop: "operation",
			type: "operation",
			fixed: "right",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//添加追踪记录弹出层传入参数
const addTrackingRecordList = reactive({
	dialogShow: false,
	commid: "",
	corpid: "",
	corpdesc: "",
	corpno: "",
	success: false
});

//添加追踪记录
const AddTrackingRecord = () => {
	addTrackingRecordList.commid = "";
	addTrackingRecordList.corpid = formData.corpid;
	addTrackingRecordList.corpdesc = formData.corpdesc;
	addTrackingRecordList.corpno = formData.corpno;
	addTrackingRecordList.success = false;
	addTrackingRecordList.dialogShow = true;
};
//添加追踪记录,回调
const addTrackingRecordClose = () => {
	if (addTrackingRecordList.success) {
		zTable6.value.getTableList();
	}
};

//编辑追踪记录
const editTracking = row => {
	addTrackingRecordList.commid = row.commid;
	addTrackingRecordList.corpid = formData.corpid;
	addTrackingRecordList.corpdesc = formData.corpdesc;
	addTrackingRecordList.success = false;
	addTrackingRecordList.dialogShow = true;
};

//下载追踪记录单
const downloadTrack = row => {
	if (row.commid) {
		downloadFile("/mylims/trackinfo/track!trackDownloadWord.action", "Track.doc", {
			commid: row.commid
		});
	}
};

//删除追踪记录
const deleteTrackingRecord = (ids, selectList) => {
	for (let item of selectList) {
		//当前登录人不是追踪记录人不能删除
		if (item.reocrdercode != globalStore.userInfo.usercode) {
			ElMessage.warning(i18n.t("SRM_operationTrack"));
			return;
		} else {
			let currentDate = moment().format("YYYY-MM-DD");
			let oldDate = moment(new Date(item.recordertimetwo)).format("YYYY-MM-DD");
			//不能删除今天之前的记录！
			if (currentDate != oldDate) {
				ElMessage.warning(i18n.t("message_error01"));
				return;
			}
		}
	}

	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			trackInfos: []
		};
		ids.forEach(item => {
			jsonString.trackInfos.push({
				commid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/trackinfo/track!deleteTrackInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable6.value.getTableList();
		}
	});
};

//复制追踪记录
const CopyTrackingRecord = (ids, selectList) => {
	if (ids.length > 1) {
		ElMessage.warning(i18n.t("Message_OnlyCopyOne"));
		return;
	}
	if (selectList[0].reocrdercode != globalStore.userInfo.usercode) {
		ElMessage.warning(i18n.t("SRM_operationTrack"));
		return;
	}

	ElMessageBox.confirm(i18n.t("SRM_copynew"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			"cond.oldcommid": ids[0]
		};
		const res = await http.post("/mylims/trackinfo/track!copyTrackInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("messagemdmcodecopysuccess"));
			zTable6.value.getTableList();
			let trackInfo = res.trackInfo[0];
			addTrackingRecordList.commid = trackInfo.commid;
			addTrackingRecordList.corpid = formData.corpid;
			addTrackingRecordList.corpdesc = formData.corpdesc;
			addTrackingRecordList.success = false;
			addTrackingRecordList.dialogShow = true;
		}
	});
};

const tableTabsValue = ref(0);
const tabPaneXR = new Map([
	[0, true],
	[1, false],
	[2, false],
	[3, false],
	[4, false],
	[5, false],
	[6, false]
]);
if (props.condobj.tableTabsValue == 6) {
	tableTabsValue.value = 6;
	tabPaneXR.set(6, true);
	tabPaneXR.set(0, false);
}
//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.corpid) {
		switch (TabPaneName) {
			case 1: // 客户资质文件信息
				tableList.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 2: // 客户联系人信息
				tableList2.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 3: // 地址信息
				tableList3.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 4: // 账户信息
				tableList4.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 5: // 客户综合信息
				tableList5.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 6: // 追踪记录
				tableList6.httpAttribute.baseParams["cond.corpid"] = formData.corpid;
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
		}
	} else {
		if (TabPaneName != 0) {
			setTimeout(() => {
				tableTabsValue.value = 0;
				ElMessage({
					message: i18n.t("Statement_writeandsavekeyinformation"),
					type: "warning",
					offset: 50,
					showClose: true,
					grouping: true,
					duration: 6000
				});
			}, 10);
		}
	}
};

onMounted(() => {
	getAddressFun();
	if (formData.corpid) {
		getFormData();
	}
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}
</style>
<style lang="scss">
.selectAgentCss {
	height: 500px;
}
</style>
