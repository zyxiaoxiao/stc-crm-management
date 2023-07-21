<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="客户基本信息" :label="$t('companyCustomerBasicInformationtitle')" :name="0">
				<el-form
					v-if="tabPaneXR.get(0)"
					style="margin: 0px 15px"
					label-position="right"
					label-width="120px"
					:model="formData"
					ref="ruleFormRef"
				>
					<el-divider content-position="left">{{ $t("companyCustomerBasicInformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户号" :label="$t('fieldcolumncustomercode')">
								<el-input type="text" v-model.trim="formData.corpno" readonly />
								<!-- <div style="border-bottom: 1px solid #c5c9d1; width: 100%; padding-left: 10px">{{ formData.corpno }}</div> -->
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="归属级别" :label="$t('columnlevelattribution')">
								<el-select v-model="formData.deptlevel" class="full-width-input" disabled>
									<el-option v-for="item in deptlevel" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="客户名称" :label="$t('fieldcolumncustomername')">
								<el-input type="text" v-model.trim="formData.corpdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="英文名称" :label="$t('hotlinkpanelywmctitle')">
								<el-input type="text" v-model.trim="formData.corpenglishname" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="别名" :label="$t('corpinfopanelbmtitle')">
								<el-input type="text" v-model="formData.corpalias" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="工商注册号" :label="$t('corpinfopanelRegistrationNumbertitle')">
								<el-input type="text" v-model="formData.businesslicenseno" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item
								title1="送检客户类别"
								:label="$t('i18nCustomerapplicationCustomerCreateInformationInspectionCustomerCategory')"
							>
								<el-select v-model="formData.appointcustomtype" class="full-width-input" disabled>
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
							<el-form-item title1="客户类别" :label="$t('corpinfopanelkhlbtitle')">
								<el-select v-model="formData.corptype" class="full-width-input" disabled>
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
								<el-input type="text" v-model="formData.taxpayerid" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="18">
							<el-form-item title1="详细地址" :label="$t('i18nCustomerapplicationCustomerCreateInformationDetailedAddress')">
								<el-input type="text" v-model="formData.corplocation" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="邮编" :label="$t('corpinfocorppostcodetitle')">
								<el-input type="text" v-model="formData.corppostcode" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="国家" :label="$t('weixinfansCountry')">
								<el-select v-model="formData.country" class="full-width-input" disabled>
									<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="区域" :label="$t('i18nCustomerapplicationCustomerCreateInformationArea')">
								<el-select v-model="formData.region" class="full-width-input" disabled>
									<el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="省份" :label="$t('i18nCustomerapplicationCustomerCreateInformationProvince')">
								<el-select v-model="formData.province" class="full-width-input" disabled>
									<el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="市区" :label="$t('i18nCustomerapplicationCustomerCreateInformationCityCenter')">
								<el-select v-model="formData.city" class="full-width-input" disabled>
									<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcontacttitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="联系人" :label="$t('companypanelcontactdesctitle')">
								<el-input type="text" v-model="formData.contactname" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电话" :label="$t('itemtitlebase_usertel')">
								<el-input type="text" v-model="formData.corpphone" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="传真" :label="$t('personalusercolumncztitle')">
								<el-input type="text" v-model="formData.corpfax" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="电子邮件" :label="$t('corpinfopanelemailtitle')">
								<el-input type="text" v-model="formData.corpemail" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="网址" :label="$t('corpinfourltitle')">
								<el-input type="text" v-model="formData.corpsite" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="客户来源" :label="$t('menubaseCustomerSource')">
								<el-select v-model="formData.customersource" class="full-width-input" disabled>
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
									title1="不接收推广邮件"
									v-model="formData.representmail"
									:label="$t('menubaseReceivePromotionEmail')"
									border
									disabled
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("fieldTradinginformationtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="常用货币" :label="$t('corpinfoCommonmoneytitle')">
								<el-select v-model="formData.corpcurrency" class="full-width-input" disabled>
									<el-option v-for="item in corpcurrency" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="信贷上限" :label="$t('corpinfocreditlimittitle')">
								<el-input type="text" v-model="formData.creditline" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="付款条件" :label="$t('corpinfopaymentconditionstitle')">
								<el-select v-model="formData.paycondition" class="full-width-input" disabled>
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
								<el-input type="text" v-model="formData.firstdealdate" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="是否协议客户" :label="$t('itemtitlebase_userisdiscount')">
								<el-select v-model="formData.isdiscount" class="full-width-input" disabled>
									<el-option v-for="item in isdiscount" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="折扣" :label="$t('columnappointmentdiscount')">
								<el-input type="text" v-model.number="formData.discount" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="最低消费额(港币)" :label="$t('columnappointmentminmoney')">
								<el-input type="text" v-model.number="formData.minmoney" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="SE佣金率" :label="$t('panelcolumnbrokerage')">
								<el-input type="text" v-model.number="formData.brokerage" readonly />
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopaneldlsxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="代理商名称" :label="$t('corpinfopaneldlsmctitle')">
								<el-input v-model="formData.agentdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="代理商编码" :label="$t('corpinfopaneldlsbmtitle')">
								<el-input type="text" v-model="formData.agentcode" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label-width="170px" title1="销售代理佣金点" :label="$t('itemtitlefoldersagentbrokerage')">
								<el-input-number
									v-model.number="formData.agentbrokerage"
									:min="0"
									:max="100"
									controls-position="right"
									readonly
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("panelcolumnRemark") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="12">
							<el-form-item title1="备注信息" :label="$t('itemtitlebzxxremark')">
								<el-input type="textarea" v-model="formData.remark" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="PKM 客户区域" :label="$t('customerapplicationinvoice_format')">
								<el-select v-model="formData.invoiceformat" class="full-width-input" disabled>
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
									disabled
								/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("corpinfopanelcjrxxtitle") }}</el-divider>
					<el-row :gutter="15" class="main-align-items-center">
						<el-col :span="6">
							<el-form-item title1="创建人" :label="$t('corpinfopanelcjrtitle')">
								<el-input type="text" v-model="formData.recorderdesc" readonly />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item title1="创建时间" :label="$t('itemtitlestatusrecordertime')">
								<el-input type="text" v-model="formData.recordtime" readonly />
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
				<div v-if="tabPaneXR.get(2)" class="flex-column" style="flex: 1; overflow: auto">
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
				</div>
				<el-divider content-position="left" style="margin: 0px; margin-top: 10px; border-width: 3px" />
				<div v-if="tabPaneXR.get(2)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTable22" :tableList="tableList22" />
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="地址信息"
				:label="$t('titlebaseAddressinformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="3"
			>
				<div v-if="tabPaneXR.get(3)" class="flex-column" style="flex: 1; overflow: auto">
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
				</div>
				<el-divider content-position="left" style="margin: 0px; margin-top: 10px; border-width: 3px" />
				<div v-if="tabPaneXR.get(3)" class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="zTable33" :tableList="tableList33" />
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="账户信息"
				:label="$t('menhuAccountInformation')"
				class="all-height flex-column main-tab-pane-content"
				:name="4"
			>
				<zTable v-if="tabPaneXR.get(4)" ref="zTable4" :tableList="tableList4" @link-detailbg="downloadAccountfiles" />
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
				<zTable v-if="tabPaneXR.get(5)" ref="zTable5" :tableList="tableList5">
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
				title1="归属信息"
				:label="$t('corpinfopanelgsxxtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="6"
			>
				<zTable v-if="tabPaneXR.get(6)" ref="zTable6" :tableList="tableList6" />
			</el-tab-pane>
			<el-tab-pane
				title1="历史变更记录"
				:label="$t('corpinfopanellsbgcxtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="7"
			>
				<zTable v-if="tabPaneXR.get(7)" ref="zTable7" :tableList="tableList7">
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="View" @click="urlHandlerCustomerDetail(scope.row)">
							{{ $t("audit_customer_detail") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="追踪记录"
				:label="$t('corpinfoTrackrecordtitle')"
				class="all-height flex-column main-tab-pane-content"
				:name="8"
			>
				<zTable v-if="tabPaneXR.get(8)" ref="zTable8" :tableList="tableList8">
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
			<el-tab-pane
				title1="申请单查询"
				:label="$t('menubaseapplicationorderquery')"
				class="all-height flex-column main-tab-pane-content"
				:name="9"
			>
				<zTable v-if="tabPaneXR.get(9)" ref="zTable9" :tableList="tableList9">
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="View" @click="viewtestresults(scope.row)">
							{{ $t("folderitemtitleresultslink") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="历史报价单查询"
				:label="$t('itemtitlequotationquotationhis')"
				class="all-height flex-column main-tab-pane-content"
				:name="10"
			>
				<zTable v-if="tabPaneXR.get(10)" ref="zTable10" :tableList="tableList10"></zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="Invoice"
				:label="$t('columnwriteoff_paymentconfirmation')"
				class="all-height flex-column main-tab-pane-content"
				:name="11"
			>
				<zTable v-if="tabPaneXR.get(11)" ref="zTable11" :tableList="tableList11"></zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 上传资质文件弹出 -->
		<ZDialog
			v-if="qualificationList.dialogShow"
			v-model="qualificationList.dialogShow"
			:title="$t('UPLOAD_uploadFile')"
			width="40%"
			customclass="selectAgentCss"
			@close="qualificationClose"
		>
			<qualificationsUpload :condobj="qualificationList"></qualificationsUpload>
		</ZDialog>

		<!-- 填写联系人弹出层 -->
		<ZDialog
			v-if="contactList.dialogShow"
			v-model="contactList.dialogShow"
			:title="$t('companypanelCustomerContactInformationtitle')"
			width="95%"
			customclass="selectAgentCss"
			@close="contactClose"
		>
			<customercontactnew :condobj="contactList"></customercontactnew>
		</ZDialog>

		<!-- 联系人选择对应地址 -->
		<ZDialog
			v-if="contactAddressList.dialogShow"
			v-model="contactAddressList.dialogShow"
			:title="$t('titlebaseAddressinformation')"
			width="80%"
			customclass="selectAgentCss"
			@close="contactAddressClose"
		>
			<customeraddressselect :condobj="contactAddressList"></customeraddressselect>
		</ZDialog>

		<!-- 新增地址弹出 -->
		<ZDialog
			v-if="addressList.dialogShow"
			v-model="addressList.dialogShow"
			:title="$t('titlebaseAddressinformation')"
			width="80%"
			customclass="selectAgentCss"
			@close="addressClose"
		>
			<customeraddress :condobj="addressList"></customeraddress>
		</ZDialog>

		<!-- 历史变更记录弹出 -->
		<ZDialog v-if="customerbgReadonly.dialogShow" v-model="customerbgReadonly.dialogShow" title="" width="95%">
			<companydetailbgreadonly :condobj="customerbgReadonly" />
		</ZDialog>

		<!-- 历史变更记录弹出 -->
		<ZDialog v-if="customerNewReadonly.dialogShow" v-model="customerNewReadonly.dialogShow" title="" width="95%">
			<companydetailnewhistoryreadonly :condobj="customerNewReadonly" />
		</ZDialog>

		<!-- 查看检测结果弹出 -->
		<ZDialog
			v-if="testresultsList.dialogShow"
			v-model="testresultsList.dialogShow"
			title=""
			width="60%"
			customclass="selectAgentCss"
		>
			<selectResults :condobj="testresultsList" />
		</ZDialog>

		<!-- 填写追踪历史记录 -->
		<ZDialog
			v-if="addTrackingRecordList.dialogShow"
			v-model="addTrackingRecordList.dialogShow"
			title=""
			width="90%"
			@close="addTrackingRecordClose"
		>
			<trackdetail :condobj="addTrackingRecordList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection, getCountry, getCurrency, getdropDownInChina } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "@/store/globalStore";
import moment from "moment";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import ZDialog from "/src/components/ZDialog.vue";
import qualificationsUpload from "../customerApplication/qualificationsUpload.vue";
import customercontactnew from "../customerApplication/customer_contact_new.vue";
import customeraddressselect from "../customerSelete/customeraddress_select.vue";
import customeraddress from "../customerApplication/customeraddress_detail.vue";
import companydetailbgreadonly from "../customerReadonly/company_detail_bg_readonly.vue";
import companydetailnewhistoryreadonly from "../customerReadonly/company_detail_new_history_readonly.vue";
import selectResults from "../customerReadonly/select_results.vue";
import trackdetail from "./track_detail.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const i18n = useI18n();
const globalStore = GlobalStore();
const ruleFormRef = ref();
const addcontactDisabled = ref(false);

const tableTabsValue = ref(0);
const tabPaneXR = new Map([
	[0, true],
	[1, false],
	[2, false],
	[3, false],
	[4, false],
	[5, false],
	[6, false],
	[7, false],
	[9, false],
	[10, false],
	[11, false]
]);

if (props.condobj.tableTabsValue == 8) {
	tableTabsValue.value = 8;
	tabPaneXR.set(8, true);
	tabPaneXR.set(0, false);
}

//表单字段
const formData = reactive({
	corpid: props.condobj.corpid,
	corpbgid: "",
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
	brokerage: 0,
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
	retrieveflag: ""
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

//审核类别
let businesstablenametype = [
	{
		label: "audit_customer_create",
		value: "MLS_ENTERPRISE"
	},
	{
		label: "audit_customer_bg",
		value: "MLS_ENTERPRISEBG"
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

//根据 corpid 初始化数据源
const getFormData = async () => {
	let jsonString = {
		enterpriseInfo: {
			corpid: formData.corpid
		}
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!selectCorpBaseInfoById.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	for (let key in res.enterpriseInfo[0]) {
		//判定 enterpriseInfo 的key 是否存在 formData 的key
		if (Object.keys(formData).includes(key)) {
			if (key == "addcontact" || key == "representmail" || key == "protection") {
				formData[key] = res.enterpriseInfo[0][key] == 0 ? false : true;
			} else {
				formData[key] = res.enterpriseInfo[0][key];
			}

			if (key == "agentbrokerage") {
				formData[key] = res.enterpriseInfo[0][key] > 0 ? res.enterpriseInfo[0][key] : 0;
			}
		}
	}
	addcontactDisabled.value = true;
	//传入申请单查询参数
	tableList9.httpAttribute.baseParams["cond.rasclientid"] = formData.corpno;
	//传入历史报价单查询参数
	tableList10.httpAttribute.baseParams["cond.enterprisecode"] = formData.corpno;
	//传入Invoice查询参数
	tableList11.httpAttribute.baseParams["cond.SENDCLIENTNO"] = formData.corpno;
};

const zTable1 = ref();
//客户资质文件信息表格对象
const tableList = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable1",
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
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
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
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable2",
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
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable22",
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
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable3",
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
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable33",
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
	}
};
const zTable4 = ref();
//账户表格
const tableList4 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable4",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectCrmaccountInfoByCond.action",
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
		}
	],
	// 表格数据
	tableData: []
});

//下载账户对应的资质文件
const downloadAccountfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

const zTable5 = ref();
const tableList5 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable5",
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

//保存客户基本信息
const saveEnterpriseInfo = async () => {
	formData.addcontact ? (formData.addcontact = 1) : (formData.addcontact = 0);
	formData.representmail ? (formData.representmail = 1) : (formData.representmail = 0);
	formData.protection ? (formData.protection = 1) : (formData.protection = 0);
	formData.agentbrokerage > 0 ? true : (formData.agentbrokerage = null);
	let jsonString = {
		enterpriseInfo: formData
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!updateEnterpriseInfo.action", qs.stringify(params));
	if (res) {
		if (res.addStatus == "success") {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			formData.corpid = res.enterpriseInfo[0].corpid;
			formData.addcontact = res.enterpriseInfo[0].addcontact == 0 ? false : true;
			formData.representmail = res.enterpriseInfo[0].representmail == 0 ? false : true;
			formData.protection = res.enterpriseInfo[0].protection == 0 ? false : true;
			formData.agentbrokerage = res.enterpriseInfo[0].agentbrokerage > 0 ? res.enterpriseInfo[0].agentbrokerage : 0;
			formData.submitcorp = res.enterpriseInfo[0].submitcorp;
			formData.auditflag = res.enterpriseInfo[0].auditflag;
			formData.workflowid = res.enterpriseInfo[0].workflowid;
			addcontactDisabled.value = true;
			props.condobj.success = true;
		} else {
			ElMessage.error(res.addStatus);
		}
	}
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

//归属表格
const zTable6 = ref();
const tableList6 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable6",
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

//历史变更信息
const zTable7 = ref();
const tableList7 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable7",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//表格工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/jbpm3/auditinfo!selectAllOpinions.action",
		root: "latestOpinionsList",
		baseParams: {
			"cond.id": formData.corpid,
			"cond.opinion_table_name": "ACT_SW_AUDITOPINION",
			"cond.business_column_id": "corpid",
			"cond.business_column_corpcode": "submitcorp",
			"cond.business_table_name": "MLS_ENTERPRISE",
			"cond.business_bg_table_name": "MLS_ENTERPRISEBG",
			"cond.business_bg_column_id": "corpbgid"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "codeid",
			label: "",
			prop: "codeid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "审核类别",
			label: "auditcommonAuditcategory",
			prop: "businesstablename",
			type: "Select",
			typeData: businesstablenametype,
			width: "160"
		},
		{
			title: "审核人编码",
			label: "auditcommoncode",
			prop: "auditorcode",
			type: "Input",
			width: "160"
		},
		{
			title: "审核人名称",
			label: "auditcommonauditorname",
			prop: "auditordesc",
			type: "Input",
			width: "160"
		},
		{
			title: "审核时间",
			label: "auditcommontime",
			prop: "audittime",
			type: "Input",
			width: "160"
		},
		{
			title: "审核意见",
			label: "auditcommonopinion",
			prop: "auditcomment",
			type: "Input"
		},
		{
			title: "审核级别",
			label: "itemtitlecommonauditlevel",
			prop: "auditlevel",
			type: "Input",
			width: "160"
		},
		{
			title: "审核节点名称",
			label: "auditcommonnodename",
			prop: "auditlevelname",
			type: "Input",
			width: "160"
		},
		{
			title: "审核操作",
			label: "auditcommonoperation",
			prop: "decision",
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

//查看变更客户详细界面参数
const customerbgReadonly = reactive({
	dialogShow: false,
	corpid: "",
	corpbgid: "",
	filterStatus: ""
});
//查看客户详细界面参数
const customerNewReadonly = reactive({
	dialogShow: false,
	corpid: ""
});

//查看客户详细
const urlHandlerCustomerDetail = row => {
	if (row.businesstablename == "MLS_ENTERPRISE") {
		customerNewReadonly.corpid = formData.corpid;
		customerNewReadonly.dialogShow = true;
	} else {
		customerbgReadonly.dialogShow = true;
		customerbgReadonly.corpbgid = row.codeid;
		customerbgReadonly.corpid = formData.corpid;
		customerbgReadonly.filterStatus = "1";
	}
};

//追踪记录
const zTable8 = ref();
const tableList8 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable8",
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
		zTable8.value.getTableList();
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
			zTable8.value.getTableList();
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
			zTable8.value.getTableList();
			let trackInfo = res.trackInfo[0];
			addTrackingRecordList.commid = trackInfo.commid;
			addTrackingRecordList.corpid = formData.corpid;
			addTrackingRecordList.corpdesc = formData.corpdesc;
			addTrackingRecordList.success = false;
			addTrackingRecordList.dialogShow = true;
		}
	});
};

//申请单查询
const zTable9 = ref();
const tableList9 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable9",
	//面初始化渲染完成 是否调请求
	isRequest: true,

	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoOnlyByCond.action",
		root: "foldersInfos",
		baseParams: { "cond.rightFlag": "1" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "id",
			width: "160"
		},
		{
			title: "检测进度",
			label: "crmcolumntestschedule",
			prop: "checkstatus",
			type: "Input",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "160"
		},
		{
			title: "代理商编码",
			label: "corpinfopaneldlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "160"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "columnappointmentdesc52",
			prop: "totalprice",
			type: "Input",
			width: "160"
		},
		{
			title: "未销账金额",
			label: "crmcolumnnotwriteoffmoney",
			prop: "writeoffmoney",
			type: "Input",
			width: "160"
		},
		{
			title: "申请受理日期",
			label: "crmcolumnapplyacceptdate",
			prop: "logdate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "预计完成时间",
			label: "itemtitlefoldersduedate",
			prop: "duedate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "实际完成日期",
			label: "crmcolumnactualfinishdate",
			prop: "actualfinishdate",
			type: "DateTime",
			width: "160",
			isHide: true
		},
		{
			title: "样品描述",
			label: "columnSampleInformation",
			prop: "sampleinformation",
			type: "Input",
			width: "160"
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "结案时间",
			label: "folderitemtitleclosedate",
			prop: "closedate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "报告发送时间",
			label: "folderitemtitlereportsendtime",
			prop: "reportsendtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "报告发送人",
			label: "folderitemtitlereportsendperson",
			prop: "reportsendperson",
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

//弹出查询检测结果传入参数;
const testresultsList = reactive({
	dialogShow: false,
	folderno: ""
});
//查看检测结果
const viewtestresults = row => {
	testresultsList.folderno = row.folderno;
	testresultsList.dialogShow = true;
};

//历史报价单查询
const zTable10 = ref();
const tableList10 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable10",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoRightByCond.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.norequired": "true",
			"cond.auditflag": "2",
			"cond.businesstype": "10",
			"cond.enterprisedepts": "Y"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Input",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "desc71",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Date",
			width: "160"
		},
		{
			title: "总价",
			label: "columnappointmentdesc52",
			prop: "desc52",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测公司电话",
			label: "crmcolumndesc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "160"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "160"
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "160"
		},
		{
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
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
			label: "i18ncrmcontractCreatePersonName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordertime",
			type: "DateTime",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//Invoice查询
const zTable11 = ref();
const tableList11 = reactive({
	id: "/customerManage/customerManagement/custInfo_user.vue_zTable11",
	//面初始化渲染完成 是否调请求
	isRequest: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoiceinfo/invoiceinfo!selectInvoceInfoByCondUseInCustomerdetail.action",
		root: "invoicemap",
		baseParams: { "cond.enterprisedepts": "Y" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "发票编号",
			label: "columnwriteoff_invoiceno",
			prop: "INVOICENO",
			type: "Input",
			width: "160"
		},
		{
			title: "发票类别",
			label: "columnwriteoff_invoicetype",
			prop: "INVOICETYPE",
			type: "Input",
			width: "160"
		},
		{
			title: "账单日期",
			label: "columnwriteoff_invoicedate",
			prop: "INVOICEDATE",
			type: "Date",
			width: "160"
		},
		{
			title: "发往客户号",
			label: "columnwriteoff_sendclientno",
			prop: "SENDCLIENTNO",
			type: "Input",
			width: "160"
		},
		{
			title: "发往客户名称",
			label: "columnwriteoff_sendclientname",
			prop: "SENDCLIENTNAME",
			type: "Input",
			width: "160"
		},
		{
			title: "发往地址联络人",
			label: "columnwriteoff_sendclientcontactor",
			prop: "SENDCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "发往地址",
			label: "columnwriteoff_sendclientaddr",
			prop: "SENDCLIENTADDR",
			type: "Input",
			width: "160"
		},
		{
			title: "送往客户号",
			label: "columnwriteoff_payclientno",
			prop: "PAYCLIENTNO",
			type: "Input",
			width: "160"
		},
		{
			title: "送往客户名称",
			label: "columnwriteoff_payclientname",
			prop: "PAYCLIENTNAME",
			type: "Input",
			width: "160"
		},
		{
			title: "送往地址联络人",
			label: "columnwriteoff_payclientcontactor",
			prop: "PAYCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "送往地址",
			label: "columnwriteoff_payclientaddr",
			prop: "PAYCLIENTADDR",
			type: "Input",
			width: "160"
		},
		{
			title: "区域",
			label: "columnwriteoff_region",
			prop: "REGION",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "DEPT",
			type: "Input",
			width: "160"
		},
		{
			title: "付款条件",
			label: "columnwriteoff_paycondition",
			prop: "PAYCONDITION",
			type: "Input",
			width: "160"
		},
		{
			title: "货币类型",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYTYPE",
			type: "Input",
			width: "160"
		},
		{
			title: "账单合计",
			label: "columnwriteoff_invoicetotal",
			prop: "INVOICETOTAL",
			type: "Input",
			width: "160"
		},
		{
			title: "港币总额",
			label: "columnwriteoff_hktotalmoney",
			prop: "HKTOTALMONEY",
			type: "Input",
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillsscurrencyhavawriteoffs",
			prop: "currencywriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsbill",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//切换tab时触发
const tabChange = TabPaneName => {
	if (formData.corpid) {
		if (!tabPaneXR.get(TabPaneName)) tabPaneXR.set(TabPaneName, true); // 第一次才渲染
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
