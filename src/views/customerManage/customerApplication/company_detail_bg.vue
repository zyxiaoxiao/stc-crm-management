<template>
	<div class="all-height flex-column">
		<div style="margin: 10px; text-align: right">
			<el-button v-show="isbtnShow" size="small" type="primary" icon="Search" plain @click="selectCustomer">
				{{ $t("menu_select") }}
			</el-button>
			<el-button v-show="isbtnShow" size="small" type="primary" icon="Document" plain @click="save_handler(ruleFormRef)">
				{{ $t("menu_save") }}
			</el-button>
			<el-button size="small" type="success" icon="Check" plain @click="Submit">{{ $t("menu_submit") }}</el-button>
		</div>
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="客户基本信息" :label="$t('companyCustomerBasicInformationtitle')" :name="0">
				<el-form
					style="margin: 0px 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					:rules="rules"
					ref="ruleFormRef"
				>
					<el-divider content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
								<el-input type="text" v-model.trim="formData.corpno" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="旧客户号" :label="$t('fieldcolumncustomercodeold')">
								<el-input type="text" v-model.trim="formData.corpnofirst" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="">
								<el-input type="text" v-model.trim="formData.corpnolast" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')" prop="corpdesc">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corpdesc" @blur="onblur_corpdesc" />
									<fieldChangeView :currentValue="formData.corpdesc" :oldValue="formData_old.corpdesc_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="英文名称" :label="$t('hotlinkpanelywmctitle')" prop="corpenglishname">
								<div class="flex-row flx-center flex-1">
									<el-input
										type="text"
										clearable
										v-model.trim="formData.corpenglishname"
										:formatter="value => value.toUpperCase()"
									/>
									<fieldChangeView :currentValue="formData.corpenglishname" :oldValue="formData_old.corpenglishname_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="别名" :label="$t('corpinfopanelbmtitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corpalias" />
									<fieldChangeView :currentValue="formData.corpalias" :oldValue="formData_old.corpalias_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="工商注册号" :label="$t('corpinfopanelRegistrationNumbertitle')" prop="businesslicenseno">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.businesslicenseno" />
									<fieldChangeView :currentValue="formData.businesslicenseno" :oldValue="formData_old.businesslicenseno_old" />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item
								title1="送检客户类别"
								:label="$t('i18nCustomerapplicationCustomerCreateInformationInspectionCustomerCategory')"
							>
								<el-select v-model.trim="formData.appointcustomtype" class="full-width-input" clearable filterable>
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
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.corptype" class="full-width-input" clearable filterable>
										<el-option
											v-for="item in customerCustomertype"
											:key="item.value"
											:label="$t(item.label)"
											:value="item.value"
										/>
									</el-select>
									<fieldChangeView
										:currentValue="formData.corptype"
										:currentTypeData="customerCustomertype"
										:oldValue="formData_old.corptype_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item title1="税号" :label="$t('corpinfopaneltaxpayerIDtitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.taxpayerid" />
									<fieldChangeView :currentValue="formData.taxpayerid" :oldValue="formData_old.taxpayerid_old" />
								</div>
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
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corplocation" />
									<fieldChangeView :currentValue="formData.corplocation" :oldValue="formData_old.corplocation_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corppostcode" />
									<fieldChangeView :currentValue="formData.corppostcode" :oldValue="formData_old.corppostcode_old" />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="国家" :label="$t('weixinfansCountry')" prop="country">
								<div class="flex-row flx-center flex-1">
									<el-select
										v-model.trim="formData.country"
										class="full-width-input"
										clearable
										filterable
										@change="countryChange"
									>
										<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
									<fieldChangeView
										:currentValue="formData.country"
										:currentTypeData="paytype"
										:oldValue="formData_old.country_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
								<div class="flex-row flx-center flex-1">
									<el-select
										v-model.trim="formData.region"
										class="full-width-input"
										clearable
										filterable
										@change="regionChange"
										@visible-change="regionVisibleChange"
									>
										<el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
									<fieldChangeView
										:currentValue="formData.region"
										:currentTypeData="regionAr"
										:oldValue="formData_old.region_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="省份" :label="$t('i18nCustomerapplicationCustomerCreateInformationProvince')">
								<div class="flex-row flx-center flex-1">
									<el-select
										v-model.trim="formData.province"
										class="full-width-input"
										clearable
										filterable
										@change="provinceChange"
										@visible-change="provinceVisibleChange"
									>
										<el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
									<fieldChangeView
										:currentValue="formData.province"
										:currentTypeData="proviceAr"
										:oldValue="formData_old.province_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="市区" :label="$t('i18nCustomerapplicationCustomerCreateInformationCityCenter')">
								<div class="flex-row flx-center flex-1">
									<el-select
										v-model.trim="formData.city"
										class="full-width-input"
										clearable
										filterable
										@visible-change="cityVisibleChange"
									>
										<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
									<fieldChangeView :currentValue="formData.city" :currentTypeData="cityAr" :oldValue="formData_old.city_old" />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="联系人" :label="$t('companypanelcontactdesctitle')" prop="contactname">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.contactname" />
									<fieldChangeView :currentValue="formData.contactname" :oldValue="formData_old.contactname_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')" prop="corpphone">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corpphone" />
									<fieldChangeView :currentValue="formData.corpphone" :oldValue="formData_old.corpphone_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="传真" :label="$t('personalusercolumncztitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corpfax" />
									<fieldChangeView :currentValue="formData.corpfax" :oldValue="formData_old.corpfax_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')" prop="corpemail">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corpemail"></el-input>
									<fieldChangeView :currentValue="formData.corpemail" :oldValue="formData_old.corpemail_old" />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="网址" :label="$t('corpinfourltitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.corpsite"></el-input>
									<fieldChangeView :currentValue="formData.corpsite" :oldValue="formData_old.corpsite_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户来源" :label="$t('menubaseCustomerSource')" prop="customersource">
								<el-select v-model.trim="formData.customersource" class="full-width-input" clearable filterable>
									<el-option
										v-for="item in customersource"
										:key="item.value"
										:label="$t(item.label)"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item>
								<el-checkbox
									title1="不接收推广邮件"
									v-model="formData.representmail"
									:label="$t('menubaseReceivePromotionEmail')"
									border
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("fieldTradinginformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="常用货币" :label="$t('corpinfoCommonmoneytitle')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.corpcurrency" class="full-width-input" clearable filterable>
										<el-option v-for="item in corpcurrency" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
									<fieldChangeView
										:currentValue="formData.corpcurrency"
										:currentTypeData="corpcurrency"
										:oldValue="formData_old.corpcurrency_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="信贷上限" :label="$t('corpinfocreditlimittitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable v-model.trim="formData.creditline" readonly />
									<fieldChangeView :currentValue="formData.creditline" :oldValue="formData_old.creditline_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="付款条件" :label="$t('corpinfopaymentconditionstitle')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.paycondition" class="full-width-input" clearable filterable disabled>
										<el-option v-for="item in paycondition" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
									<fieldChangeView
										:currentValue="formData.paycondition"
										:currentTypeData="paycondition"
										:oldValue="formData_old.paycondition_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="首次交易日期" :label="$t('corpinfofirstTransactiondatetitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable readonly v-model.trim="formData.firstdealdate" />
									<fieldChangeView :currentValue="formData.firstdealdate" :oldValue="formData_old.firstdealdate_old" />
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="是否协议客户" :label="$t('itemtitlebase_userisdiscount')">
								<div class="flex-row flx-center flex-1">
									<el-select v-model.trim="formData.isdiscount" class="full-width-input" clearable filterable disabled>
										<el-option v-for="item in isdiscount" :key="item.value" :label="$t(item.label)" :value="item.value" />
									</el-select>
									<fieldChangeView
										:currentValue="formData.isdiscount"
										:currentTypeData="isdiscount"
										:oldValue="formData_old.isdiscount_old"
									/>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="折扣" :label="$t('columnappointmentdiscount')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable readonly v-model.number="formData.discount" />
									<fieldChangeView :currentValue="formData.discount" :oldValue="formData_old.discount_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="最低消费额(港币)" :label="$t('columnappointmentminmoney')">
								<el-input type="text" clearable readonly v-model.number="formData.minmoney"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopaneldlsxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="代理商名称" :label="$t('corpinfopaneldlsmctitle')">
								<div class="flex-row flx-center flex-1">
									<el-input v-model.trim="formData.agentdesc" readonly clearable />
									<fieldChangeView :currentValue="formData.agentdesc" :oldValue="formData_old.agentdesc_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="代理商编码" :label="$t('corpinfopaneldlsbmtitle')">
								<div class="flex-row flx-center flex-1">
									<el-input type="text" clearable readonly v-model.trim="formData.agentcode">
										<template #append>
											<el-button-group>
												<el-button @click="selectagent" icon="ZoomIn" />
												<el-button @click="delAgent" type="primary" plain icon="ZoomOut" />
											</el-button-group> </template
									></el-input>
									<fieldChangeView :currentValue="formData.agentcode" :oldValue="formData_old.agentcode_old" />
								</div>
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
					<el-divider content-position="left">{{ $t("panelcolumnRemark") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')" prop="remark">
								<div class="flex-row flx-center flex-1">
									<el-input type="textarea" clearable v-model.trim="formData.remark" />
									<fieldChangeView :currentValue="formData.remark" :oldValue="formData_old.remark_old" />
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="PKM 客户区域" :label="$t('customerapplicationinvoice_format')">
								<el-select v-model.trim="formData.invoiceformat" class="full-width-input" clearable filterable>
									<el-option
										v-for="item in invoiceformat"
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
									title1="是否受保护"
									v-model="formData.protection"
									:label="$t('companyunderprotectiontitle')"
									border
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcjrxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="创建人" :label="$t('corpinfopanelcjrtitle')">
								<el-input type="text" clearable readonly v-model.trim="formData.recorderdesc"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
								<el-input type="text" clearable readonly v-model.trim="formData.recordtime"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
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
				title1="归属信息"
				:label="$t('corpinfopanelgsxxtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="5"
			>
				<zTable v-if="tabPaneXR.get(5)" ref="zTable6" :tableList="tableList6" />
			</el-tab-pane>
		</el-tabs>
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
		<div v-dialogStretching>
			<ZDialog v-model="customerList.dialogShow" :title="$t('corpinfopanelckxxcxtitle')" width="95%">
				<customerListQuery :condobj="customerList"></customerListQuery>
			</ZDialog>
		</div>
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
				<customerAccountbg :condobj="accountNewList" />
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection, getCountry, getCurrency, getAddress, getdropDownInChina } from "/src/utils/util.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import qualificationsUpload from "./qualificationsUpload.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import fieldChangeView from "../fieldChangeView.vue";

import selectagentview from "../customerSelete/selectagent.vue";
import customerListQuery from "../customerQuery/customer_list_query.vue";
import customeraddress from "./customeraddress_detail.vue";
import customercontactnew from "./customer_contact_new.vue";
import customerfileselect from "../customerSelete/customerfile_select.vue";
import customerAccountbg from "./customer_account_bg.vue";
import customeraddressselect from "../customerSelete/customeraddress_select.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();

const isbtnShow = ref(true);
const ruleFormRef = ref();
const agentbrokerageDisabled = ref(true);

//原来的值
const formData_old = {
	agentcode_old: "",
	agentdesc_old: "",
	businesslicenseno_old: "",
	city_old: "",
	contactname_old: "",
	corpalias_old: "",
	corpcurrency_old: "",
	corpdesc_old: "",
	corpemail_old: "",
	corpenglishname_old: "",
	corpfax_old: "",
	corplocation_old: "",
	corpphone_old: "",
	corppostcode_old: "",
	corpsite_old: "",
	corptype_old: "",
	country_old: "",
	creditline_old: "",
	discount_old: "",
	firstdealdate_old: "",
	isdiscount_old: "",
	paycondition_old: "",
	province_old: "",
	region_old: "",
	remark_old: "",
	taxpayerid_old: ""
};

//表单字段
const formData = reactive({
	corpbgid: props.condobj.corpbgid,
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
	mendercode: "",
	menderdesc: "",
	auditflag: "",
	workflowid: "",
	submitcorp: "",
	corpno: "",
	retrieveflag: "",
	corpnofirst: "",
	corpnolast: "",
	iscommon: "",
	bgusercode: "",
	oldbranchcorpcode: ""
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

//联系人中不能含有非法字符
const contactnameValidator = (rule, value, callback) => {
	if (value.indexOf("<") > -1 || value.indexOf(">") > -1) {
		callback(new Error(i18n.t("portalcheckvalueillegal")));
	} else {
		callback();
	}
};

//邮件中不能含有非法字符
const corpemailValidator = (rule, value, callback) => {
	if (value.indexOf("<") > -1 || value.indexOf(">") > -1) {
		callback(new Error(i18n.t("portalcheckvalueillegal")));
	} else {
		callback();
	}
};

const agentbrokerageValidator = (rule, value, callback) => {
	if (formData.agentcode && (!value || !Number.isInteger(value))) {
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
	contactname: [
		{ required: true, message: i18n.t("rulesPropMessage") },
		{ validator: contactnameValidator, trigger: "blur" }
	],
	corpphone: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpemail: [
		{ required: true, message: i18n.t("rulesPropMessage") },
		{ validator: corpemailValidator, trigger: "blur" }
	],
	customersource: [{ required: true, message: i18n.t("rulesPropMessage") }],
	newcustomtype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	agentbrokerage: [{ validator: agentbrokerageValidator, trigger: "blur" }],
	remark: [{ required: true, message: i18n.t("rulesPropMessage") }]
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
const isdiscount = getdropSownSelection("whether");
const usersexAr = getdropSownSelection("usersex");

// 国家下拉
let paytype = ref([]);
//区域下拉
let region = ref([]);
//省份下拉
let province = ref([]);
//市区下拉
let city = ref([]);

//区域下拉
let regionAr = ref([]);
//省份下拉
let proviceAr = ref([]);
//市区下拉
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
//归属级别
let deptlevel = [
	{
		label: "tltilecolumndeptlevelbloc",
		value: "bloc"
	},
	{
		label: "tltilecolumndeptlevelbranch",
		value: "branch"
	},
	{
		label: "tltilecolumndeptlevelordinary",
		value: "ordinary"
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
		agentbrokerageDisabled.value = false;
	}
};
// 清除代理商
const delAgent = () => {
	agentList.arrayList = [];
	formData.agentcode = "";
	formData.agentdesc = "";
	formData.agentbrokerage = null;
	agentbrokerageDisabled.value = true;
};

//客户查询弹出时改为false
let existence = true;
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
	existence = false;
};

//根据 corpid 初始化数据源
const getFormData = async () => {
	let jsonString = {
		enterprisebg: {
			corpbgid: formData.corpbgid
		}
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!selectCorpInfoBgByCorpid.action", qs.stringify(params));
	for (let key in res.enterprisebg[0]) {
		//判定 enterprisebg 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			if (key == "addcontact" || key == "representmail" || key == "protection") {
				formData[key] = res.enterprisebg[0][key] == 0 ? false : true;
			} else {
				formData[key] = res.enterprisebg[0][key];
			}

			if (key == "agentbrokerage") {
				formData[key] = res.enterprisebg[0][key] > 0 ? res.enterprisebg[0][key] : 0;
			}
		}
		//判定 enterprisebg 的key 是否存在 formData_old 的key
		if (Object.keys(formData_old).includes(key)) {
			if (key == "agentbrokerage") {
				formData[key] = res.enterprisebg[0][key] > 0 ? res.enterprisebg[0][key] : 0;
			} else {
				formData_old[key] = res.enterprisebg[0][key];
			}
		}
	}
};

//保存
const save_handler = formEl => {
	if (!formEl) return;
	formEl.validate((valid, fields) => {
		if (valid) {
			//保存企业基本信息，前判断是否查询了客户信息, 并且 corpbgid 是空的
			if (existence && !formData.corpbgid) {
				ElMessage.warning(i18n.t("Message_TheCustomerIsRegisteredOrNot"));
				return;
			}
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
	let jsonString = {
		enterprisebg: formData
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!updateEnterprisebgInfo.action", qs.stringify(params));
	if (res) {
		if (res.addStatus == "success" || res.addStatus == "") {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			formData.corpbgid = res.enterprisebg[0].corpbgid;
			formData.corpid = res.enterprisebg[0].corpid;
			formData.addcontact = res.enterprisebg[0].addcontact == 0 ? false : true;
			formData.representmail = res.enterprisebg[0].representmail == 0 ? false : true;
			formData.protection = res.enterprisebg[0].protection == 0 ? false : true;
			formData.agentbrokerage = res.enterprisebg[0].agentbrokerage > 0 ? res.enterprisebg[0].agentbrokerage : 0;
			formData.submitcorp = res.enterprisebg[0].submitcorp;
			formData.auditflag = res.enterprisebg[0].auditflag;
			formData.workflowid = res.enterprisebg[0].workflowid;
			props.condobj.success = true;
		} else {
			ElMessage.error(res.addStatus);
		}
	}
};

//提交
const Submit = () => {
	if (!formData.corpbgid) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			enterprisebgInfos: [formData],
			auflag: "1"
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!submitbg.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			props.condobj.dialogShow = false;
			props.condobj.success = true;
		}
	});
};

const zTable1 = ref();
//客户资质文件信息表格对象
const tableList = reactive({
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable1",
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
		let isBusType = false;
		let busTheme = "";
		selectList.forEach(item => {
			jsonString.fileInfos.push({
				fileid: item.fileid,
				mdmfileid: item.mdmfileid
			});
			//如果是销售代理的合同附件是不可以删除附件的
			if (item.businesstype == "@CONTRACT") {
				isBusType = true;
				busTheme = item.theme;
			}
		});

		if (isBusType) {
			ElMessage.warning("Subject【" + busTheme + "】cannot be deleted");
			return false;
		}
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.crm": "crm"
		};
		const res = await http.post("/core/upload/upload!deleteCorpFile.action", qs.stringify(params));
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
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable2",
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
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable22",
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
		}
	],
	// 表格数据
	tableData: []
});

//添加联系人
const AddContact = () => {
	contactList.contactid = "";
	contactList.success = false;
	contactList.dialogShow = true;
};

//保存联系人回调
const contactClose = () => {
	if (contactList.success) {
		zTable2.value.getTableList();
	}
};

//编辑联系人
const editContact = row => {
	contactList.contactid = row.contactid;
	contactList.success = false;
	contactList.dialogShow = true;
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
	contactAddressList.arrayList = [];
	contactAddressList.contactid = row.contactid;
	contactAddressList.dialogShow = true;
};
//联系人对应选择地址信息的回调函数
const contactAddressClose = async () => {
	if (contactAddressList.arrayList.length > 0) {
		let jsonString = {
			contactaddressInfos: [
				{
					addressid: contactAddressList.arrayList[0].id,
					contactid: contactAddressList.contactid,
					typecode: contactAddressList.arrayList[0].addrtype
				}
			]
		};
		let params = {
			"cond.corpid": formData.corpid,
			jsonString: JSON.stringify(jsonString)
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
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable3",
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
		const res = await http.post("/crm/address/address!deleteAddressInfos.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
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
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable33",
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
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable4",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectCrmaccountbgInfoByCond.action",
		root: "crmaccountbgInfos",
		baseParams: {
			"cond.corpid": formData.corpid,
			"cond.corpbgid": formData.corpbgid
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
			prop: "accountbgid",
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
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "创建编码",
			label: "hotlinkpanelcjsjtitle",
			prop: "recordercode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "修改人编码",
			label: "columnModifyPersonCoding",
			prop: "modifypersoncode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "修改人名称",
			label: "itemtitleworkflowdefrecorderdesc",
			prop: "modifypersondesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "bgusercode",
			label: "",
			prop: "bgusercode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpbgid",
			label: "",
			prop: "corpbgid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpid",
			label: "",
			prop: "corpid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//  账户信息新增或编辑弹出层参数
const accountNewList = reactive({
	dialogShow: false,
	accountbgid: "",
	corpid: formData.corpid,
	corpbgid: formData.corpbgid,
	success: false
});

//账户信息新增
const AddAccount = () => {
	accountNewList.accountbgid = "";
	accountNewList.success = false;
	accountNewList.dialogShow = true;
};

//编辑账户信息
const editAccount = row => {
	accountNewList.accountbgid = row.accountbgid;
	accountNewList.success = false;
	accountNewList.dialogShow = true;
};
//保存账户信息成功回调方法
const accountNewListClose = () => {
	if (accountNewList.success) {
		zTable4.value.getTableList();
	}
};

// 账户信息选择文件弹出层参数
const accountFilesList = reactive({
	dialogShow: false,
	corpid: formData.corpid,
	accountRow: {},
	arrayList: []
});

//下载账户对应的资质文件
const downloadAccountfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};
//选择账户对应的资质文件
const selectAccountFile = row => {
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
			crmaccountbgInfos: [accountFilesList.accountRow]
		};
		let params = {
			"cond.corpid": formData.corpid,
			jsonString: JSON.stringify(jsonString)
		};
		//保存文件信息
		const res = await http.post("/crm/account/crmaccount!saveCrmaccountbgInfos.action", qs.stringify(params));
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
			crmaccountbgInfos: []
		};
		ids.forEach(item => {
			jsonString.crmaccountbgInfos.push({
				accountbgid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/account/crmaccount!deleteCrmaccountbgInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable4.value.getTableList();
		}
	});
};

//归属表格
const zTable6 = ref();
const tableList6 = reactive({
	id: "/customerManage/customerApplication/company_detail_bg.vue_zTable6",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/user/user!selectDistributionUserinfo.action",
		root: "userInfoMaps",
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
			title: "用户ID",
			label: "",
			prop: "userid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "单位编码",
			label: "itemtitlebase_usercorpcode",
			prop: "corpcode",
			type: "Input",
			width: "200"
		},
		{
			title: "单位名称",
			label: "itemtitlebase_usercorpdesc",
			prop: "corpdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "归属类型",
			label: "itemtitleAttributiontype",
			prop: "newcustomtype",
			type: "Select",
			typeData: newcustomtype,
			width: "200"
		},
		{
			title: "用户名",
			label: "itemtitlebase_userusercode",
			prop: "usercode",
			type: "Input",
			width: "200"
		},
		{
			title: "姓名",
			label: "itemtitlebase_useruserdesc",
			prop: "userdesc",
			type: "Input",
			width: "200"
		},
		{
			title: "备注",
			label: "itemtitlecommonremark",
			prop: "remark",
			type: "Input",
			width: "200"
		},
		{
			title: "变更企业id",
			label: "",
			prop: "enterpriseid",
			type: "Input",
			width: "200",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const tableTabsValue = ref(0);
const tabPaneXR = new Map([
	[1, false],
	[2, false],
	[3, false],
	[4, false],
	[5, false]
]);
//切换tab时触发
const tabChange = TabPaneName => {
	//只有tab页是客户基本信息才显示 保存和 客户查询按钮
	TabPaneName == 0 ? (isbtnShow.value = true) : (isbtnShow.value = false);
	if (formData.corpbgid) {
		switch (TabPaneName) {
			case 1:
				// 客户资质文件信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 2:
				// 客户联系人信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 3:
				// 地址信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 4:
				// 账户信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
			case 5:
				// 归属信息
				if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
				break;
		}
	}
};

onMounted(() => {
	getAddressFun();
	if (formData.corpbgid) {
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
