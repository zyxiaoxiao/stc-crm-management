<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane class="flex-column" style="overflow: auto" :label="$t('menubasequotationapp')" name="info">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="isbtnShow"
						type="primary"
						icon="Download"
						@click="downAppointmentwold()"
						plain
						>{{ $t("menu_downAppointment") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="isbtnShow"
						@click="dialogSendFormVisible = true"
						type="primary"
						icon="Position"
						plain
						>{{ $t("menu_sendAppointment") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="historyappShow"
						type="primary"
						@click="dialogShow('dialogShow_historyappListQuery')"
						icon="Search"
						plain
						>{{ $t("menu_historyapp") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveAppointmentInfo(appEform)"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="submitShow"
						type="success"
						icon="Check"
						plain
						@click="submitAppointmentInfo()"
						>{{ $t("menu_submit") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="success"
						icon="Check"
						plain
						@click="approveAppointmentInfo('0')"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveAppointmentInfo('-1')"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveAppointmentInfo('-2')"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="isbtnShow"
						type="info"
						icon="ArrowLeft"
						plain
						@click="locationAppointmentInfo('Previous')"
						>{{ $t("SRM_btnPrevious") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="isbtnShow"
						type="info"
						icon="ArrowRight"
						plain
						@click="locationAppointmentInfo('Next')"
					>
						{{ $t("SRM_btnNext") }}</el-button
					>
				</div>
				<el-form
					ref="appEform"
					style="margin: 0px 15px; overflow: auto"
					label-position="right"
					label-width="120px"
					:model="formData"
					class="flex-1"
					:rules="rules"
				>
					<el-divider content-position="left">{{ $t("menubasewtjy") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumnreservnum') + ':'" title1="报价单号">
								<el-input type="text" readonly v-model="formData.reservnum"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumnwsp') + ':'" title1="是否分包">
								<el-select
									v-model="formData.desc90"
									class="full-width-input"
									filterable
									placeholder="Select"
									@change="select_desc90"
									:disabled="isdisabled"
								>
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc15') + ':'" title1="委托检测公司（个人）" prop="desc15">
								<el-input
									type="text"
									clearable
									v-model="formData.desc15"
									class="input-with-select"
									readonly
									:disabled="isdisabled"
								>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerQuery')" icon="Search" :disabled="isdisabled"> </el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnappointment_desc21') + ':'" title1="委托日期" prop="desc21">
								<el-date-picker
									type="date"
									v-model="formData.desc21"
									format="YYYY-MM-DD"
									value-format="YYYY-MM-DD"
									style="width: 100%"
									:disabled="isdisabled"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('tabtitlecalendarreceiver') + ':'" title1="收件人" prop="desc79">
								<el-input
									type="text"
									clearable
									v-model="formData.desc79"
									class="input-with-select"
									readonly
									:disabled="isdisabled"
								>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerContactQuery')" icon="Search" :disabled="isdisabled">
										</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc81') + ':'" title1="SE姓名">
								<el-input type="text" clearable v-model="formData.desc81" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelfaxtitle') + ':'" title1="传真">
								<el-input type="text" clearable v-model="formData.desc78" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelfaxtitle') + ':'" title1="传真">
								<el-input type="text" clearable v-model="formData.desc77" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelqyteltitle') + ':'" title1="电话">
								<el-input type="text" clearable v-model="formData.desc18" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc82') + ':'" title1="SE电话">
								<el-input type="text" clearable v-model="formData.desc82" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelemailtitle') + ':'" title1="电邮">
								<el-input type="text" clearable v-model="formData.desc75" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelemailtitle') + ':'" title1="电邮">
								<el-input type="text" clearable v-model="formData.desc74" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc83') + ':'" title1="抄送">
								<el-input type="text" clearable v-model="formData.desc73" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc83') + ':'" title1="抄送">
								<el-input type="text" clearable v-model="formData.desc83" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('crmcolumndesc84') + ':'" title1="参考值">
								<el-input type="text" clearable v-model="formData.desc84" :readonly="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopanelqydlsbmtitle') + ':'" title1="代理编码">
								<el-input type="text" clearable v-model="formData.accountid" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('corpinfopaneldlsmctitle') + ':'" title1="代理名称">
								<el-input type="text" clearable v-model="formData.samplesender" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlefoldersagentbrokerage') + ':'" title1="销售代理佣金点%">
								<el-input type="text" clearable v-model="formData.accounttype" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("paymentnoticepaymentunitpanel") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="12">
							<el-form-item :label="$t('paymentnoticepaymentunitname') + ':'" title1="付款单位名称" prop="enterprisename">
								<el-input type="text" v-model="formData.enterprisename" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_paycustomerQuery')" icon="Search" :disabled="isdisabled">
										</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="0">
							<el-form-item>
								<el-input type="text" clearable v-model="formData.enterpriseid" title1="付款单位ID"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input type="text" clearable v-model="formData.addressremark" title1="付款单位地址详细信息"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('paymentnoticepaymentunitcode') + ':'" title1="付款单位编码">
								<el-input type="text" clearable v-model="formData.enterprisecode" readonly></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item :label="$t('columnappointmentdiscount') + ':'" title1="付款单位折扣">
								<el-input type="text" clearable v-model="formData.desc80" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('i18ncrmcontractpaymentmethod') + ':'" title1="付款方式" prop="paytype">
								<el-select
									v-model="formData.paytype"
									class="full-width-input"
									@visible-change="currOperatorChange"
									filterable
									readonly
									:disabled="isdisabled"
								>
									<el-option v-for="item in paytype" :key="item.value" :label="$t(item.label)" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnAddress') + ':'" title1="付款单位地址">
								<el-input type="text" clearable v-model="formData.paymentaddress" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerAddressQuery')" icon="Search" :disabled="isdisabled">
										</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnContactPerson')" title1="付款单位联系人">
								<el-input type="text" clearable v-model="formData.billingcontact" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerPayContactQuery')" icon="Search" :disabled="isdisabled">
										</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("columnappointmentbuyerInformation") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="12">
							<el-form-item :label="$t('itemtitleworkflowdefcorpdesc') + ':'" title1="单位名称">
								<el-input type="text" clearable v-model="formData.desc1" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerBuyerQuery')" icon="Search" :disabled="isdisabled">
										</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="0">
							<el-form-item title1="单位ID">
								<el-input type="text" clearable v-model="formData.desc2"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlebase_flowcorpcode') + ':'" title1="单位编码">
								<el-input type="text" clearable v-model="formData.desc3" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('columnappointmentdiscount') + ':'" title1="单位折扣">
								<el-input type="text" clearable v-model="formData.desc4" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('i18ncrmcontractpaymentmethod') + ':'" title1="付款方式">
								<el-select
									v-model="formData.desc5"
									@visible-change="currOperatorChangeto"
									class="full-width-input"
									filterable
									readonly
									:disabled="isdisabled"
								>
									<el-option v-for="item in paytypeto" :key="item.value" :label="$t(item.label)" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("columnReportinformation") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlereportzh') + ':'" title1="报告中文抬头">
								<el-input type="text" clearable v-model="formData.report_zh" class="input-with-select" readonly>
									<template #append>
										<el-button @click="dialogShow('dialogShow_customerReportQuery')" icon="Search" :disabled="isdisabled">
										</el-button>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlereportus') + ':'" title1="报告英文抬头">
								<el-input type="text" clearable v-model="formData.report_us" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlereportaddresszh') + ':'" title1="报告中文地址">
								<el-input type="text" clearable v-model="formData.report_address_zh" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('itemtitlereportaddressus') + ':'" title1="报告英文地址">
								<el-input type="text" clearable v-model="formData.report_address_us" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="0">
							<el-form-item>
								<el-input type="text" clearable v-model="formData.reportid"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input type="text" clearable v-model="formData.corpid"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="0">
							<el-form-item title1="检测方代表">
								<el-input type="text" clearable v-model="formData.desc88"></el-input>
							</el-form-item>
							<el-form-item title1="委托方代表">
								<el-input type="text" clearable v-model="formData.desc22"></el-input>
							</el-form-item>
							<el-form-item>
								<el-input type="text" clearable v-model="formData.desc66"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider content-position="left">{{ $t("columnappointment_desc42") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="24">
							<el-form-item :label="$t('crmcolumnsampledesc') + ':'" title1="样品名称" prop="sampledesc">
								<el-input type="textarea" clearable v-model="formData.sampledesc" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columnappointmentdescription') + ':'" title1="情况说明">
								<el-input type="textarea" clearable v-model="formData.desc39" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('panelcolumnsampleRemarks') + ':'" title1="样品备注">
								<el-input type="textarea" clearable v-model="formData.desc93" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane :label="$t('itemtitletestItemPreview')" name="price" class="all-height flex-column">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-if="itemShow"
						type="primary"
						icon="Document"
						plain
						@click="saveTestSelectApplintment()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="itemShow"
						type="primary"
						icon="Coin"
						@click="readDiscountApplintment()"
						plain
						>{{ $t("menu_readDiscount") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="itemShow"
						type="primary"
						icon="ZoomIn"
						@click="dialogShow('dialogShow_newItemApplintment')"
						plain
						>{{ $t("menu_newItem") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="itemShow"
						type="danger"
						icon="Delete"
						@click="deleteItemItemApplintment()"
						plain
						>{{ $t("menu_deleteItem") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="itemShow"
						type="primary"
						@click="dialogShow('dialogShow_selectFoldernoApplintment')"
						icon="ZoomIn"
						plain
						>{{ $t("menu_chooseFolder") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="submitShow"
						type="success"
						icon="Check"
						plain
						@click="submitAppointmentInfo()"
						>{{ $t("menu_submit") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="approveShow"
						type="success"
						icon="Check"
						plain
						@click="approveAppointmentInfo('0')"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveAppointmentInfo('-1')"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-if="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveAppointmentInfo('-2')"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="formData1" :rules="rules">
						<el-divider content-position="left">{{ $t("columnappointmentspecialRequirements") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc46') + ':'" title1="服务类型" prop="desc46">
									<el-select
										v-model="formData1.desc46"
										class="full-width-input"
										filterable
										placeholder="Select"
										@visible-change="selectServiceChange"
										:disabled="r_price_a"
									>
										<el-option v-for="item in rastatime" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc47') + ':'" title1="检测周期" prop="desc47">
									<el-input-number
										:min="1"
										v-model="formData1.desc47"
										controls-position="right"
										:readonly="r_desc47"
									></el-input-number>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc48') + ':'" title1="服务费" prop="desc48">
									<el-input :min="100" v-model="formData1.desc48" :disabled="r_desc48"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="desc49">
									<el-input type="text" title1="价格百分比" v-model="formData1.desc49"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdiscount') + ':'" title1="折扣率" prop="discountrate">
									<el-input type="text" clearable v-model="formData1.discountrate" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc53') + ':'" title1="币种" prop="desc53">
									<el-select
										v-model="formData1.desc53"
										class="full-width-input"
										filterable
										placeholder="Select"
										@visible-change="selectCurrencyChange"
										:disabled="r_price_a"
									>
										<el-option v-for="item in currencyInfo" :key="item.value" :label="item.label" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentdesc54') + ':'" title1="汇率" prop="desc54">
									<el-input type="text" v-model="formData1.desc54" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('panelcolumnvalueaddedtax') + ':'" title1="增值税(%)" prop="desc95">
									<el-input-number v-model="formData1.desc95" :readonly="r_desc95" controls-position="right"></el-input-number>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="desc62">
									<el-input type="text" title1="是否打包价" v-model="formData1.desc62"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('columnappointmentworkflowdiscount1') + ':'" title1="审批折扣率" prop="workflowdiscount">
									<el-input type="text" v-model="formData1.workflowdiscount" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="pkm_hind">
								<el-form-item>
									<el-checkbox title1="DoC" v-model="formData1.desc25" label="DoC" border :disabled="r_price_a" />
									<el-checkbox title1="RED" v-model="formData1.desc26" label="RED" border :disabled="r_price_a" />
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="desc56">
									<el-input type="text" title1="保存状态标识" v-model="formData1.desc56"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="desc61">
									<el-input type="text" title1="最低折扣率" v-model="formData1.desc61"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="desc64">
									<el-input type="text" title1="客户期望折扣" v-model="formData1.desc64"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="workflowid">
									<el-input type="text" title1="工作流ID" v-model="formData1.workflowid"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="submitcorp">
									<el-input type="text" title1="提交部门" v-model="formData1.submitcorp"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="auditflag">
									<el-input type="text" title1="审核状态" v-model="formData1.auditflag"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left">{{ $t("columnappointmenttestItemCostInfo") }}</el-divider>
						<el-row class="main-align-items-center" v-show="initialShow">
							<el-col :span="4">
								<el-form-item
									:label="$t('appointmenttotaltestitemprice_hkd') + ':'"
									title1="检测项目原价"
									prop="TOTALTESTITEMPRICE"
								>
									<el-input type="text" v-model="formData2.TOTALTESTITEMPRICE" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmenttotaltestitemprice') + ':'" title1="检测项外币价格" prop="DESC67">
									<el-input type="text" v-model="formData2.DESC67" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item
									:label="$t('appointmentdetectionfolded_hkd') + ':'"
									title1="检测项目折后"
									prop="TOTALTESTITEMPRICEDISCOUNT"
								>
									<el-input type="text" v-model="formData2.TOTALTESTITEMPRICEDISCOUNT" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentcrmformtd') + ':'" title1="检测项折后外币" prop="DESC30">
									<el-input type="text" v-model="formData2.DESC30" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('columnappointmentdesc45') + ':'" title1="附加费用" prop="DESC45">
									<el-input type="text" v-model="formData2.DESC45" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('paymentnoticepaymentunitname') + ':'" title1="外币附加费用" prop="DESC70">
									<el-input type="text" v-model="formData2.DESC70" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentdetectionoriginalprice_hkd') + ':'" title1="服务费用原价" prop="DESC50">
									<el-input type="text" v-model="formData2.DESC50" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentcrmformdesc50') + ':'" title1="外币服务费用" prop="DESC69">
									<el-input type="text" v-model="formData2.DESC69" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentservicefeediscount_hkd') + ':'" title1="服务费折后" prop="DESC50DISCOUNT">
									<el-input type="text" v-model="formData2.DESC50DISCOUNT" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentservicefeediscount_hkd') + ':'" title1="服务费折后外币" prop="DESC31">
									<el-input type="text" v-model="formData2.DESC31" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentValueaddedtax_hkd') + ':'" title1="税额" prop="DESC96">
									<el-input type="text" v-model="formData2.DESC96" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('panelcolumnvalueaddedtaxmoney') + ':'" title1="外币税额" prop="DESC68">
									<el-input type="text" v-model="formData2.DESC68" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmenttotalpretax_hkd') + ':'" title1="税前总价" prop="TOTALTESTITEBEFORETAX">
									<el-input type="text" v-model="formData2.TOTALTESTITEBEFORETAX" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentcrmformsc') + ':'" title1="外币价格" prop="DESC55">
									<el-input type="text" v-model="formData2.DESC55" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentsubcontractingprice_hkd') + ':'" title1="分包价格" prop="DESC99">
									<el-input type="text" v-model="formData2.DESC99" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentcrmformfbjg') + ':'" title1="分包外币价格" prop="DESC32">
									<el-input type="text" v-model="formData2.DESC32" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('appointmentTotalprice_hkd') + ':'" title1="总价" prop="DESC33">
									<el-input type="text" v-model="formData2.DESC33" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item :label="$t('columnappointmentdesc52') + ':'" title1="外币价格" prop="DESC34">
									<el-input type="text" v-model="formData2.DESC34" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="workflowid">
									<el-input type="text" title1="工作流id" v-model="formData2.workflowid" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="submitcorp">
									<el-input type="text" title1="提交部门" v-model="formData2.submitcorp" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="0">
								<el-form-item prop="auditflag">
									<el-input type="text" title1="审核状态" v-model="formData2.auditflag" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="main-align-items-center" v-show="splitShow">
							<el-col :span="12">
								<el-form-item :label="$t('appointmentTotalprice_hkd') + ':'" title1="总价" prop="SPLITDESC33" readonly>
									<el-input type="text" clearable v-model="formData2.SPLITDESC33"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item :label="$t('columnappointmentdesc52') + ':'" title1="外币价格" prop="SPLITDESC34" readonly>
									<el-input type="text" clearable v-model="formData2.SPLITDESC34"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable
						ref="vmaps"
						width="700px"
						style=""
						:tableList="ptableList"
						@cell-click="itemViewCellClick"
						@link-detailbg="linkDetailbg"
					>
					</zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane :label="$t('menhuAccountInformation')" name="account" class="all-height flex-column">
				<zTable ref="accountInfos" :tableList="accountTableList">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							class="button_show"
							v-show="accountShow"
							type="primary"
							icon="Document"
							plain
							@click="dialogShow('dialogShow_corpaccountApplintment')"
							>{{ $t("menu_new") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="accountShow"
							type="danger"
							icon="Delete"
							@click="deleteCorpAccountApplintment(scope.selectList)"
							plain
							>{{ $t("menu_delete") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="submitShow"
							type="success"
							icon="Check"
							plain
							@click="submitAppointmentInfo()"
							>{{ $t("menu_submit") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="success"
							icon="Check"
							plain
							@click="approveAppointmentInfo('0')"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-1')"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-2')"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane :label="$t('itemtitleotherCost')" name="other" class="all-height flex-column">
				<zTable ref="otherInfos" :tableList="otherTableList">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							class="button_show"
							v-show="otherShow"
							type="primary"
							icon="Document"
							plain
							@click="addOtherPrice"
							>{{ $t("menu_new") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="saveOtherShow"
							type="primary"
							icon="Document"
							plain
							@click="saveOtherPrice(scope.getEditSelectList)"
							>{{ $t("menu_save") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="otherShow"
							type="danger"
							icon="Delete"
							@click="deleteOtherPriceApplintment(scope.selectList)"
							plain
							>{{ $t("menu_delete") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="submitShow"
							type="success"
							icon="Check"
							plain
							@click="submitAppointmentInfo()"
							>{{ $t("menu_submit") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="success"
							icon="Check"
							plain
							@click="approveAppointmentInfo('0')"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-1')"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-2')"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane :label="$t('crmcolumnpacketInfo')" name="subpackage" class="all-height flex-column">
				<zTable ref="subpackageInfos" :tableList="subpackageTableList" @link-detailbg="linkDetailbg">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							class="button_show"
							v-show="subpackageShow"
							type="primary"
							icon="Document"
							plain
							@click="dialogShow('dialogShow_deptSubpackageApplintment')"
							>{{ $t("menu_new") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="subpackageShow"
							type="danger"
							icon="Delete"
							@click="deleteSubpackageApplintment(scope.selectList)"
							plain
							>{{ $t("menu_delete") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="submitShow"
							type="success"
							icon="Check"
							plain
							@click="submitAppointmentInfo()"
							>{{ $t("menu_submit") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="success"
							icon="Check"
							plain
							@click="approveAppointmentInfo('0')"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-1')"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-2')"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane :label="$t('columnAccessoryInformation')" name="file" class="all-height flex-column">
				<zTable ref="fileInfos" :tableList="fileTableList" @link-detailbg="downloadfiles">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							class="button_show"
							v-show="fileShow"
							type="primary"
							icon="UploadFilled"
							plain
							@click="uploadFilled"
							>{{ $t("menu_upload") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="fileShow"
							type="danger"
							icon="DeleteFilled"
							@click="deleteUpload(scope.ids, scope.selectList)"
							plain
							>{{ $t("menu_deleteupload") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="submitShow"
							type="success"
							icon="Check"
							plain
							@click="submitAppointmentInfo()"
							>{{ $t("menu_submit") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="success"
							icon="Check"
							plain
							@click="approveAppointmentInfo('0')"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-1')"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							class="button_show"
							v-show="approveShow"
							type="danger"
							icon="Close"
							plain
							@click="approveAppointmentInfo('-2')"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow" @close="dialogclose" :title="$t('columnappointment_EntrustedUnitInfo')" width="85%">
				<customerQuery :condobj="condobj"></customerQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.contactdialogShow"
				@close="contactDialogclose"
				customclass="selectAdressCss"
				:title="$t('companypanelCustomerContactInformationtitle')"
				width="85%"
			>
				<customerContactQuery :condobj="condobj"></customerContactQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.addressDialogShow"
				@close="addressDialogclose"
				:title="$t('titlebaseAddressinformation')"
				width="85%"
				customclass="selectAdressCss"
			>
				<customerAddressQuery :condobj="condobj"></customerAddressQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.newItemApplintmentDialogShow"
				@close="dialogclose"
				:title="$t('panelcolumnselecttestitems')"
				width="85%"
			>
				<newItemApplintmentQuery :condobj="condobj"></newItemApplintmentQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.reportDialogShow"
				@close="reportDialogclose"
				:title="$t('companypanelreportstitle')"
				width="85%"
				customclass="selectAdressCss"
			>
				<customerReportQuery :condobj="condobj"></customerReportQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.corpaccountApplintmentDialogShow"
				@close="dialogclose"
				:title="$t('itemtitleaccountaccount')"
				width="85%"
				customclass="selectAdressCss"
			>
				<corpaccountApplintmentQuery :condobj="condobj"></corpaccountApplintmentQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.selecthistoryapplicationitmeDialogShow"
				@close="dialogclose"
				:title="$t('itemtitleaccountaccount')"
				width="85%"
			>
				<historyapplicationitme :condobj="condobj"></historyapplicationitme>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.deptSubpackageApplintmentDialogShow"
				@close="dialogclose"
				:title="$t('crmcolumndsppl')"
				width="85%"
				customclass="selectAdressCss"
			>
				<deptSubpackageApplintmentQuery :condobj="condobj"></deptSubpackageApplintmentQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.dialogShow_historyappListDialogShow"
				@close="dialogclose"
				:title="$t('itemtitlequotationquotationhis')"
				width="85%"
				customclass="selectAdressCss"
			>
				<historyapplication :condobj="condobj"></historyapplication>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.deptFolderApplintmentDialogShow"
				@close="dialogclose"
				:title="$t('menubaseapplicationorderquery')"
				width="85%"
			>
				<selectapplicationOrderQuery :condobj="condobj"></selectapplicationOrderQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog
				v-model="condobj.uploadnewDialogShow"
				@close="uploadnewDialogclose"
				:title="$t('companypanelreportstitle')"
				width="40%"
				customclass="selectAgentCss"
			>
				<uploadnewQuery :condobj="condobj"></uploadnewQuery>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.sendapplicationOutboxDialogShow" @close="dialogclose" width="85%">
				<sendapplicationOutbox :condobj="condobj"></sendapplicationOutbox>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_appointmentReadonlyTo" width="95%">
				<appointmentReadonlyTo :condobj="condobj"></appointmentReadonlyTo>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<el-dialog v-model="dialogFormVisible" :title="$t('DOWNLOAD_download')">
				<el-form :model="dform" style="margin: 25px 15px">
					<el-form-item :label="$t('columntitleOrdinarycustomers') + ':'" title1="普通客户" label-width="140px">
						<el-radio-group v-model="plain">
							<el-radio label="CN">{{ $t("SRM_LANG_CN") }}</el-radio>
							<el-radio label="CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
							<el-radio label="EN">{{ $t("SRM_LANG_EN") }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item :label="$t('panelcolumncontractcustomer') + ':'" title1="协议客户" label-width="140px">
						<el-radio-group v-model="plain">
							<el-radio label="CONTRACT_CN">{{ $t("SRM_LANG_CN") }}</el-radio>
							<el-radio label="CONTRACT_CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
							<el-radio label="CONTRACT_EN">{{ $t("SRM_LANG_EN") }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						:label="$t('menubaseCertificationType') + ':'"
						v-if="certificationshow"
						title1="认证类型"
						prop="attestation"
						label-width="140px"
					>
						<el-select v-model="attestation" filterable placeholder="Select">
							<el-option v-for="item in attestationData" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">{{ $t("SRM_cancel") }}</el-button>
						<el-button type="primary" @click="downloadAppointment()"> {{ $t("SRM_ok") }}</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
		<div v-dialogStretching>
			<el-dialog v-model="dialogSendFormVisible" :title="$t('DOWNLOAD_download')">
				<el-form :model="dform" style="margin: 25px 15px">
					<el-form-item :label="$t('columntitleOrdinarycustomers') + ':'" title1="普通客户" label-width="140px">
						<el-radio-group v-model="plain">
							<el-radio label="CN">{{ $t("SRM_LANG_CN") }}</el-radio>
							<el-radio label="CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
							<el-radio label="EN">{{ $t("SRM_LANG_EN") }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item :label="$t('panelcolumncontractcustomer') + ':'" title1="协议客户" label-width="140px">
						<el-radio-group v-model="plain">
							<el-radio label="CONTRACT_CN">{{ $t("SRM_LANG_CN") }}</el-radio>
							<el-radio label="CONTRACT_CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
							<el-radio label="CONTRACT_EN">{{ $t("SRM_LANG_EN") }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogSendFormVisible = false">{{ $t("SRM_cancel") }}</el-button>
						<el-button type="primary" @click="downloadAppointment('send')"> {{ $t("SRM_ok") }}</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import moment from "moment";
import zTable from "/src/components/ZTable/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import { GlobalStore } from "/src/store/globalStore.js";
//弹出报错或者提示框
import { ElMessageBox, ElMessage, ElInputNumber, ElInput } from "element-plus";
import resizeDetector from "element-resize-detector";
//选择委托单
import customerQuery from "@/views/appointmentManage/appointmentApplication/appointment_enterprise.vue";
//选择联系人
import customerContactQuery from "@/views/appointmentManage/appointmentApplication/selectcontact.vue";
//选择付款单位地址
import customerAddressQuery from "@/views/appointmentManage/appointmentApplication/select_address.vue";
//选择报告抬头
import customerReportQuery from "@/views/appointmentManage/appointmentApplication/selectCorpreport.vue";
//附件上传页面
import uploadnewQuery from "@/views/appointmentManage/appointmentApplication/selectUploadnew.vue";
//分包部门
import deptSubpackageApplintmentQuery from "@/views/appointmentManage/appointmentApplication/appointment_query_dispersedquote.vue";
//分包单详细信息查询
import appointmentReadonlyTo from "@/views/appointmentManage/appointmentApplication/appointment_detail.vue";
//新增账户信息
import corpaccountApplintmentQuery from "@/views/appointmentManage/appointmentApplication/select_corp.vue";
//选择检测项
import newItemApplintmentQuery from "@/views/appointmentManage/appointmentApplication/appointment_newTestItem.vue";
//选择申请单
import selectapplicationOrderQuery from "@/views/appointmentManage/appointmentApplication/application_order_query_list.vue";
//报价单发送
import sendapplicationOutbox from "@/views/appointmentManage/appointmentApplication/application_outbox_ext.vue";
//历史报价单查询
import historyapplication from "@/views/appointmentManage/appointmentApplication/appointment_readonly.vue";
//历史报价检测项查询
import historyapplicationitme from "@/views/appointmentManage/appointmentApplication/appointment_his.vue";
//newItemApplintmentQuery
const erd = resizeDetector();
const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object,
	objlist: Object
});
let vmaps = ref(); //检测项
let accountInfos = ref(); //账户信息
let otherInfos = ref(); //其它费用
let subpackageInfos = ref(); //分包信息
let fileInfos = ref(); //附件信息
let v_isdefaulttax = ""; //税费会加上PKM专属的下标
let v_defaulttax = ""; //税点
let workflowflag = ""; //判断当前工作状态
let confirm = "";
let v_reservnum = ""; //报价单号
let v_exchangerate = ""; //汇率
let discount = ""; //折扣
let pkm_run = false; //是否是PKM部门
let businesstype = ""; //报价类型
let v_id = ""; //报价编码
let v_split = ""; //是否分包
let v_readonly = ""; //报价只读
let r = getdropSownSelection("dgbj_paydeadline"); //付款方式下拉
const options = [
	{
		value: "Y",
		label: i18n.t("crmcolumnwsp1")
	},
	{
		value: "N",
		label: i18n.t("crmcolumnwsp0")
	}
];

let attestation = ref("01"); //下载报价单认证类型默认值
let certificationshow = ref(false); //认证类型默认不显示
//认证类型下拉值
const attestationData = [
	{
		value: "01",
		label: "General"
	},
	{
		value: "02",
		label: "STC Tested Mark"
	},
	{
		value: "03",
		label: "Made in HK"
	},
	{
		value: "04",
		label: "CB Mark"
	},
	{
		value: "05",
		label: "Excellence Service"
	},
	{
		value: "06",
		label: "Safety Mark"
	}
];

const plain = ref("CN");
const costtype = getdropSownSelection("CRM_qtfy_fylx"); //付款方式下拉

let pkm_hind = ref(0); //PKM显示字段
let paytype = ref([]); //付款方付款方式
let paytypeto = ref([]); //买家付款方式
const globalStore = GlobalStore();
let dform = reactive({}); //下载信息
const formData1 = reactive({
	reservnum: "",
	desc46: "",
	desc47: 1,
	desc48: "100",
	desc49: "",
	discountrate: "",
	desc53: "",
	desc54: "",
	desc95: 6,
	desc62: "",
	workflowdiscount: "",
	desc25: "",
	desc26: "",
	desc56: "",
	desc61: "",
	desc64: "",
	workflowid: "",
	submitcorp: "",
	auditflag: ""
}); //检测项预览
const formData2 = reactive({
	TOTALTESTITEMPRICE: "",
	DESC67: "",
	TOTALTESTITEMPRICEDISCOUNT: "",
	DESC30: "",
	DESC45: "",
	DESC70: "",
	DESC50: "",
	DESC69: "",
	DESC50DISCOUNT: "",
	DESC31: "",
	DESC96: "",
	DESC68: "",
	TOTALTESTITEBEFORETAX: "",
	DESC55: "",
	DESC99: "",
	DESC32: "",
	DESC33: "",
	DESC34: "",
	workflowid: "",
	submitcorp: "",
	auditflag: "",
	SPLITDESC33: "",
	SPLITDESC34: ""
}); //检测项费用信息
let rastatime = ref([]); //服务类型
let currencyInfo = ref([]); //币种
let date = new Date().toLocaleString();
date = date.substring(0, date.indexOf(" "));
let adate = moment(new Date(date)).format("YYYY-MM-DD");

//报价单初始化信息
const formData = reactive({
	reservnum: "",
	desc90: "N",
	desc15: "",
	desc21: adate,
	desc79: "",
	desc81: "",
	desc78: "",
	desc77: "",
	desc18: "",
	desc82: "",
	desc75: "",
	desc74: "",
	desc73: "",
	desc83: "",
	desc84: "",
	accountid: "",
	samplesender: "",
	accounttype: "",
	businesstype: "10",
	desc91: "",
	desc92: "",
	desc13: "",
	desc72: "",
	desc95flag: "",

	discardflag: "0",
	status: "",
	disptatus: "",
	auflag: "",
	auditflag: "",
	recordertime: "",
	recordercode: "",
	recorderdesc: "",
	corpcode: "",
	corpdesc: "",
	workflowid: "",
	submitcorp: "",
	auditflag: "",
	desc33: "",
	desc34: "",
	desc35: "",
	desc36: "",
	desc43: "",
	desc44: "",
	desc45: "",
	desc46: "",
	desc47: "",
	desc48: "",
	desc49: "",
	desc50: "",
	desc51: "",
	desc52: "",
	desc53: "",
	desc54: "",
	desc55: "",
	desc56: "",
	desc57: "",
	desc58: "",
	desc59: "",
	desc60: "",
	desc61: "",
	desc62: "off",
	desc63: "",
	desc64: "",
	desc65: "",
	desc95: "",
	desc85: "",
	desc86: "",
	desc87: "",
	parentid: "",
	splitdesc34: "",
	discountrate: "",

	enterprisename: "",
	enterpriseid: "",
	addressremark: "",
	enterprisecode: "",
	desc80: "",
	paytype: "",
	paymentaddress: "",
	billingcontact: "",
	desc1: "",
	desc2: "",
	desc3: "",
	desc4: "",
	desc5: "",
	report_zh: "",
	report_us: "",
	report_address_zh: "",
	report_address_us: "",
	reportid: "",
	corpid: "",
	desc88: "",
	desc22: "",
	desc66: "",
	sampledesc: "",
	desc39: "",
	desc93: ""
}); //报价单申请
let getappointmentInfo = async obj => {
	let params = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/mylims/order/appointment!selectAppointmentInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.appointmentInfo[0]) {
			//判定 appointmentInfo 的key 是否存在 formData 的key
			formData[key] = res.appointmentInfo[0][key];
		}
		paycondition_renderer(formData.paytype);
		paycondition_rendererto(formData.desc5); //付款方式的下拉值从新定义
	}
};
//获取检测类型
let getrastatimeInfo = async () => {
	let obj = { cond: { workflowflag: workflowflag } };
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/rastatime/rastatime!selectRastatimeInfoByCond.action", qs.stringify(par));
	if (res) {
		let rastatimeInfos = res.rastatimeInfos;
		let data = [];
		if (rastatimeInfos != null && rastatimeInfos.length > 0) {
			for (let i = 0; i < rastatimeInfos.length; i++) {
				let omap = {};
				omap.label = rastatimeInfos[i].rastatimetype;
				omap.value = rastatimeInfos[i].rastatimeid;
				omap.discount = rastatimeInfos[i].discount;
				omap.type_eng = rastatimeInfos[i].type_eng;
				data.push(omap);
			}
			rastatime.value = data;
		}
	}
};

//获取币种
let getcurrencyInfo = async () => {
	let obj = {};
	let par = {
		jsonString: JSON.stringify(obj)
	};
	const res = await http.post("/crm/currency/currency!selectCurrencyInfoByCond.action", qs.stringify(par));
	if (res) {
		let currencyInfos = res.currencyInfos;
		let data = [];
		if (currencyInfos != null && currencyInfos.length > 0) {
			for (let i = 0; i < currencyInfos.length; i++) {
				let omap = {};
				omap.label = currencyInfos[i].currencyname;
				omap.value = currencyInfos[i].currencyname;
				omap.exchangerate = currencyInfos[i].exchangerate;
				data.push(omap);
			}
			currencyInfo.value = data;
		}
	}
};

const appEform = ref(); //报价申请表单id
let isbtnShow = ref(false); //报价单下载、报价单发送、上一条、下一条
let approveShow = ref(false); //审核通过、拒绝至上一步、审核拒绝
let saveShow = ref(false); //保存
let submitShow = ref(false); //提交
let historyappShow = ref(false); //历史报价单查询
let itemShow = ref(false); //检测项按钮显示字段包括：批量修改折扣、选择检测项、删除检测项和选择申请单
let accountShow = ref(false); //账户信息按钮显示包括：新增和删除
let subpackageShow = ref(false); //分包信息按钮显示包括：新增和删除
let fileShow = ref(false); //附件信息按钮显示包括：附件上传和附件删除
let otherShow = ref(false); //其它费用按钮显示信息：新增和删除
let saveOtherShow = ref(false); //其它费用按钮显示信息：新增和删除
let splitShow = ref(false); //拆分价格默认影藏
let initialShow = ref(true); //报价单初始价格默认显示
//fileShow
let isdisabled = ref(true); //默认都不可以编辑
let r_desc95 = ref(true); //默认增值税不可编辑
let r_desc47 = ref(false); //默认检测周期可编辑

let r_price_a = ref(false); //默认服务类型、币种和检测周期可编辑
let r_desc48 = ref(true); //默认服务费不可编辑

//下载资质文件
const downloadfiles = (column, row) => {
	downloadFile("/core/uploadnew/upload!download.action", row.filename, {
		"cond.crm": "crm",
		"cond.fileid": row.fileid
	});
};

//其它费用新增
const addOtherPrice = () => {
	let desc53 = formData1.desc53;
	let desc53n = formData.desc53;
	let desc54 = formData1.desc54;
	let desc54n = formData.desc54;
	let row = {};
	if (desc53 && desc54) {
		//检测项的币种和汇率
		row.CURRENCYNAME = desc53;
		row.EXCHANGERATE = desc54;
	} else if (desc53n && desc54n) {
		//报价单的币种和汇率
		row.CURRENCYNAME = desc53n;
		row.EXCHANGERATE = desc54n;
	}
	if (Object.keys(row).length > 0) {
		otherInfos.value.addRowData(row);
	}
};

//选择是否分包后重置信息
const select_desc90 = val => {
	if (val == "Y") {
		formData.desc91 = "";
		formData.desc92 = "";
		formData.desc15 = "";
		formData.desc13 = "";
		formData.desc79 = "";
		formData.desc72 = "";
		formData.desc78 = "";
		formData.desc18 = "";
		formData.desc75 = "";
		formData.desc1 = "";
		formData.desc2 = "";
		formData.desc3 = "";
		formData.desc4 = "";
		formData.desc5 = "";
	}
};
//下载弹出对话框
let dialogFormVisible = ref(false);
//发送弹出对话框
let dialogSendFormVisible = ref(false);

//下载报价单
const downAppointmentwold = () => {
	if (confirm == "true") {
	} else if (!formData.reservnum) {
		//没保存报价单
		ElMessage.warning(i18n.t("alert_saveclient"));
		return false;
	}
	if (formData.submitcorp == "031101") {
		certificationshow.value = true;
	}
	dialogFormVisible.value = true;
};

const rules = reactive({
	desc15: [{ required: true, message: i18n.t("rulesPropMessage") }],
	desc21: [{ required: true, message: i18n.t("rulesPropMessage") }],
	desc79: [{ required: true, message: i18n.t("rulesPropMessage") }],
	enterprisename: [{ required: true, message: i18n.t("rulesPropMessage") }],
	paytype: [{ required: true, message: i18n.t("rulesPropMessage") }],
	sampledesc: [{ required: true, message: i18n.t("rulesPropMessage") }]
});

//保存报价单信息
const saveAppointmentInfo = formEl => {
	formEl.validate((valid, fields) => {
		if (valid) {
			//是否存在付款单位
			if (!formData.enterprisecode) {
				ElMessage.warning(i18n.t("alert_saveclient"));
				return;
			}
			//保存报价单信息
			savenewAppointmentInfo();
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};

//上一条和下一条切换方法
let locationAppointmentInfo = async top => {
	if (!formData.reservnum) {
		ElMessage.warning(i18n.t("alert_saveclient"));
		return false;
	}
	let par = {
		reservnum: formData.reservnum
	};
	let url = "";
	if (top == "Previous") {
		url = "/mylims/order/appointment!selectPreviousAppointmentInfo.action";
	} else if (top == "Next") {
		url = "/mylims/order/appointment!selectNextAppointmentInfo.action";
	} else {
		return false;
	}
	const res = await http.post(url, qs.stringify(par));
	if (res) {
		for (let key in res.appointmentInfo[0]) {
			//判定 appointmentInfo 的key 是否存在 formData 的key
			formData[key] = res.appointmentInfo[0][key];
		}
		v_reservnum = formData.reservnum;
		paycondition_renderer(formData.paytype);
		paycondition_rendererto(formData.desc5); //付款方式的下拉值从新定义
	}
};

//提交报价单信息
const submitAppointmentInfo = () => {
	let data = [];
	if (!formData.reservnum) {
		ElMessage.warning(i18n.t("alert_saveclient"));
		return;
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			appointmentInfos: data.push(formData)
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/order/appointment!submitAppointmentInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_appointmentNew = false;
		}
	});
};

//审核报价单信息
const approveAppointmentInfo = code => {
	if (!formData.reservnum) {
		ElMessage.warning(i18n.t("alert_saveclient"));
		return;
	}
	let str = i18n.t("audit_approve");
	if (code == "-1" || code == "-2") {
		str = i18n.t("audit_reject");
	}
	let approveValue = ref(str);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: approveValue.value,
				type: "textarea",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					approveValue.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let cond = { opinion: approveValue.value };
		let jsonString = {
			reservnum: formData.reservnum,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/mylims/order/appointment!reject.action";
		} else if (code == "-2") {
			url = "/mylims/order/appointment!reject2Submitor.action";
		} else {
			url = "/mylims/order/appointment!approve.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_appointmentNew = false;
		}
	});
};

const savenewAppointmentInfo = async () => {
	formData.status = "Create";
	formData.disptatus = "委托申请已保存";
	let desc80 = formData.desc80;
	if (!desc80) {
		desc80 = 0;
	}
	let desc63 = "";
	let discountrate = formData1.desc80;
	if (parseFloat(desc80) > parseFloat(discountrate)) {
		desc63 = 0;
	} else {
		desc63 = 1;
	}
	formData.desc63 = desc63;
	let jsonString = {
		appointmentInfo: formData
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	//保存报告信息
	const res = await http.post("/mylims/order/appointment!saveAppointmentInfo.action", qs.stringify(params));
	if (res) {
		ElMessage.success(i18n.t("Message_saveSuccess"));
		for (let key in res.appointmentInfo[0]) {
			//判定 appointmentInfo 的key 是否存在 formData 的key
			formData[key] = res.appointmentInfo[0][key];
		}
		paycondition_renderer(formData.paytype);
		paycondition_rendererto(formData.desc5); //付款方式的下拉值从新定义
	}
};

//下载报价文件
const downloadAppointment = v_type => {
	if (!formData.reservnum) {
		//没保存报价单
		ElMessage.warning(i18n.t("alert_saveclient"));
		return false;
	}
	if (v_type == "send") {
		let url = "/mylims/order/appointment!sendQuotation.action";
		let params = {
			jsonString: JSON.stringify({
				reservnum: formData.reservnum,
				businesstype: plain.value
			})
		};
		let adownload = async (url, params) => {
			const res = await http.post(url, qs.stringify(params));
			if (res) {
				let outboxInfo = res.outboxInfo;
				if (outboxInfo != null && outboxInfo.length > 0) {
					condobj.cond = {
						outboxid: outboxInfo[0].outboxid,
						html: "sendapplicationOutboxDialogShow"
					};
					condobj.sendapplicationOutboxDialogShow = true;
				}
			}
		};
		adownload(url, params);
		dialogSendFormVisible.value = false;
	} else {
		let serverUrl = globalStore.serverUrl;
		if (formData.submitcorp == "031101") {
			window.location.href =
				serverUrl +
				"/mylims/order/appointment!downloadExcel.action?reservnum=" +
				formData.reservnum +
				"&businesstype=" +
				plain.value +
				"&certificationtype=" +
				attestation.value;
		} else {
			window.location.href =
				serverUrl +
				"/mylims/order/appointment!downloadExcel.action?reservnum=" +
				formData.reservnum +
				"&businesstype=" +
				plain.value;
		}
		dialogFormVisible.value = false;
	}
};

//批量修改折扣率
const readDiscountApplintment = () => {
	let discountvalue = ref(0);
	let sList = vmaps.value.selectList;
	ElMessageBox({
		title: i18n.t("columnappointmentdiscount"),
		message: () =>
			h(ElInputNumber, {
				modelValue: discountvalue.value,
				autosize: { minRows: 7 },
				"onUpdate:modelValue": val => {
					discountvalue.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let value = discountvalue.value;
		let vList = vmaps.value.selectRowArr;
		if (vList.length < 1) {
			ElMessage.warning(i18n.t("Message_PleseSelectTest"));
			return false;
		}
		let jsonString = {
			vmaps: vList
		};
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.discount": value,
			"cond.reservnum": formData.reservnum
		};
		const res = await http.post("/mylims/order/appointment!insertTestpriceIntoItem.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			if (res.vmaps) {
				if (res.vmaps.length > 0) {
					for (var i = 0; i < vList.length; i++) {
						for (var j = 0; j < res.vmaps.length; j++) {
							if (vList[i].TESTID == res.vmaps[j].TESTID) {
								if ("N" == vList[i].FENBAO && vList[i].netprice != "Y" && vList[i].iscontractprice != "Y") {
									vList[i].AFTER_TESTPRICE_FOREIGN = res.vmaps[j].AFTER_TESTPRICE_FOREIGN;
								}
							}
						}
					}
				}
			}
		}
	});
};
//其它费用保存
const saveOtherPrice = async getEditSelectList => {
	let selectList = getEditSelectList();
	if (selectList.length > 0) {
		for (let i = 0; i < selectList.length; i++) {
			if (!selectList[i].COSTTYPE) {
				//费用类型
				ElMessage.warning(i18n.t("message_null_costtype"));
				return false;
			}
			if (!selectList[i].COSTPRICE_FN) {
				//金额
				ElMessage.warning(i18n.t("message_null_costprice_fn"));
				return false;
			}
			if (selectList[i].COSTPRICE_FN < 0) {
				ElMessage.warning(i18n.t("Message_Absother_erorr"));
				return false;
			}
		}
		let jsonString = {
			vmaps: selectList
		};
		let params = {
			reservnum: formData.reservnum,
			jsonString: JSON.stringify(jsonString)
		};
		//保存报告信息
		const res = await http.post("/mylims/order/appointment!saveAppointmentOtherCost.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_saveSuccess"));
			otherInfos.value.getTableList();
		}
	} else {
		otherInfos.value.getTableList();
	}
};

let cDiscount = async (url, params) => {
	const res = await http.post(url, qs.stringify(params));
	let discount = "100";
	if (res) {
		//修改完数据从新刷新页面数据
		if (res.discount) {
			discount = res.discount;
		}
		let reservnumto = v_id;
		if (!reservnumto) {
			reservnumto = formData.reservnum;
		}
		//折扣会修改主表的折扣保存完后在掉查询
		if (reservnumto) {
			testSelect(reservnumto);
			form_test(reservnumto);
			//传参后会自动调用接口刷新
			ptableList.httpAttribute.baseParams.reservnum = reservnumto;
			ptableList.httpAttribute.baseParams.exchangerate = formData1.desc54;
			vmaps.value.reuseTableList();
		}
	}
};

//保存检测预览信息
const calculateDiscount = async () => {
	if (formData1.desc25 == true) {
		formData1.desc25 = "on";
	}
	if (formData1.desc26 == true) {
		formData1.desc26 = "on";
	}
	let jsonString = {
		appointmentInfo: formData1
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	//保存检测预览信息
	const res = await http.post("/mylims/order/appointment!saveAppointmentTestSelectInfo.action", qs.stringify(params));
	if (res) {
		let desc46 = formData1.desc46; //服务类型
		let desc53 = formData1.desc53; //币种
		if (!desc46 || !desc53) {
			ElMessage.warning(i18n.t("Message_pleaseSaveSpecialInfo"));
			return false;
		}
		let reservnumto = v_id;
		if (!reservnumto) {
			reservnumto = formData.reservnum;
		}
		let pdata = ptableList.tableData; //检测项数据
		if (pdata.length > 0) {
			let url = "/mylims/order/appointment!calculateDiscount.action";
			let jsonString = {
				vroot: pdata
			};
			let params = {
				jsonString: JSON.stringify(jsonString),
				"cond.exchangerate": formData1.desc54,
				"cond.reservnum": reservnumto
			};
			cDiscount(url, params);
		} else {
			testSelect(reservnumto);
		}
	}
};

//修改检测项信息
const updateItem = async editList => {
	let reservnumto = v_id;
	if (!reservnumto) {
		reservnumto = formData.reservnum;
	}
	for (let item of editList) {
		if (item.RASPROFILEPRICES == null || item.RASPROFILEPRICES == "null") {
			item.RASPROFILEPRICES = "";
		}
	}
	let jsonString = {
		vmaps: editList
	};
	let params = {
		reservnum: reservnumto,
		jsonString: JSON.stringify(jsonString)
	};
	//保存检测预览信息
	const res = await http.post("/mylims/order/appointment!updateAppointmentTestItems.action", qs.stringify(params));
	if (res) {
		ptableList.httpAttribute.baseParams.reservnum = reservnumto;
		ptableList.httpAttribute.baseParams.exchangerate = formData1.desc54;
		await vmaps.value.reuseTableList();
		calculateDiscount();
	}
};

//删除检测项
const deleteItemItemApplintment = () => {
	let reservnum = formData.reservnum; //报价单号
	let sList = vmaps.value.selectList;
	if (sList.length < 1) {
		ElMessage.warning(i18n.t("Message_deleteTestItem"));
		return false;
	} else {
		let data = [];
		for (let item of sList) {
			if (item.FLAG && item.FLAG == "2") {
				data.push(item);
			}
			if (item.FENBAO && item.FENBAO == "Y") {
				//分包的不允许删除
				ElMessage.warning(i18n.t("message_error"));
				return false;
			}
		}
		ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
			confirmButtonText: i18n.t("menu_ok"),
			cancelButtonText: i18n.t("menu_cancel"),
			type: "warning",
			draggable: true
		}).then(async () => {
			let jsonString = {
				maps: data
			};
			let params = {
				jsonString: JSON.stringify(jsonString),
				"cond.reservnum": reservnum
			};
			const res = await http.post("/mylims/order/appointment!deleteAppointmentTestItem.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
			if (res) {
				ElMessage({
					type: "success",
					message: i18n.t("Message_deleteSuccess")
				});
				await vmaps.value.getTableList();
				calculateDiscount();
			}
		});
	}
};

//保存检测项预览界面信息信息
const saveTestSelectApplintment = () => {
	let desc46 = formData1.desc46; //服务类型
	let desc48 = formData1.desc48; //服务费
	let desc53 = formData1.desc53; //币种
	if (!desc48) {
		ElMessage.warning(i18n.t("Message_ConfirmOperation"));
		return false;
	} else if (parseFloat(desc48) < 100) {
		//且服务费不能小于100
		ElMessage.warning(i18n.t("Message_ConfirmOperation"));
		return false;
	}
	if (!desc46 || !desc53) {
		ElMessage.warning(i18n.t("Message_pleaseSaveSpecialInfo"));
		return false;
	}
	let editList = vmaps.value.getEditSelectList();
	if (editList.length < 1) {
		//没有修改检测项直接保存表单信息
		calculateDiscount();
	} else {
		updateItem(editList); //有修改检测项需要先更新检测项信息
	}
};
//删除账户信息
const deleteCorpAccountApplintment = selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			appointmentaccountInfos: selectList
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post(
			"/crm/appointmentaccount/appointmentaccount!deleteAppointmentaccountInfo.action",
			qs.stringify(params)
		); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			accountInfos.value.getTableList();
		}
	});
};

//删除分包单
const deleteSubpackageApplintment = selectList => {
	let reservnumnow = formData.reservnum;
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			dispersedquoteInfos: []
		};
		selectList.forEach(item => {
			jsonString.dispersedquoteInfos.push({
				dispersednum: item.reservnum,
				reservnum: reservnumnow
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/dispersedquote/dispersedquote!deleteDispersedquoteInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			subpackageInfos.value.getTableList();
		}
	});
};

//删除其它费用
const deleteOtherPriceApplintment = selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			vmaps: []
		};
		selectList.forEach(item => {
			jsonString.vmaps.push(item);
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/order/appointment!deleteAppointmentOtherCosts.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			otherInfos.value.getTableList();
		}
	});
};

//删除资质文件
const deleteUpload = (ids, selectList) => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			uploadFileList: []
		};
		selectList.forEach(item => {
			jsonString.uploadFileList.push({
				auditflag: item.auditflag,
				fileid: item.fileid,
				filename: item.filename,
				recorderdesc: item.recorderdesc,
				recordtime: item.recordtime,
				submitcorp: item.submitcorp,
				workflowid: item.workflowid
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/core/uploadnew/upload!deleteUploadFileInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			fileInfos.value.getTableList();
		}
	});
};

const itemViewCellClick = (row, column, cell, event) => {
	if (!ptableList.edit) {
		//表单不可编辑就退回去
		return;
	}
	if (row.FENBAO == "Y" || workflowflag == "3" || v_readonly == "true") {
		row.isEdit[column.property] = false;
		//分包单审核状态和只读都不可以修改
		return;
	}
	//协议价不可以编辑折扣率
	if (column.property == "DISCOUNTRATE" && row.iscontractprice == "Y") {
		row.isEdit[column.property] = false;
		return;
	}
	//协议价是否可修改并且是否可编辑等于N或者是否等于N
	if (column.property == "ismodify" && (row.isedit == "N" || row.iscontractprice == "N")) {
		row.isEdit[column.property] = false;
		return;
	}
	//外币折后单价是否可修改并且是否协议价等于Y且是否可编辑等于N
	if (column.property == "AFTER_TESTPRICE_FOREIGN" && row.iscontractprice == "Y" && row.isedit == "N") {
		row.isEdit[column.property] = false;
		return;
	}
	//外币折后单价是否可修改并且是否协议价等于Y且是否可编辑等于且是否修改协议价等于Y
	if (column.property == "AFTER_TESTPRICE_FOREIGN" && row.iscontractprice == "Y" && row.isedit == "Y" && row.ismodify == "Y") {
		row.isEdit[column.property] = false;
		return;
	}
	//外币折后单价是否可修改并且是否修改协议价等于N且是否可编辑等于Y
	if (column.property == "AFTER_TESTPRICE_FOREIGN" && row.isedit == "Y" && row.ismodify == "N") {
		row.isEdit[column.property] = true;
		return;
	}
	//不等于测试计划费用或者测试计划费用可编辑
	if (column.property != "RASPROFILEPRICES" || row.canmodify == "Y") {
		if (column.property == "AFTER_TESTPRICE_FOREIGN" && row.netprice == "Y") {
			row.isEdit[column.property] = false;
			return;
		}
		if (column.property == "DISCOUNTRATE" && row.netprice == "Y") {
			row.isEdit[column.property] = false;
			return;
		}
		row.isEdit[column.property] = true;
		return;
	}
	row.isEdit[column.property] = false;
	return;
};
let getValue = async () => {
	let jsonString = {};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/order/appointment!setValueFordesc95.action", qs.stringify(params));
	if (res && res.isdefaulttax) {
		v_isdefaulttax = res.isdefaulttax; //部门是否默认税点
		v_defaulttax = res.defaulttax; //税点
	}
};
//付款单位付款方式
const currOperatorChange = val => {
	if (val) {
		let value = formData.paytype;
		if (!value) {
			value = "0";
		}
		let result2 = [];
		for (let i = 0; i < r.length; i++) {
			if (parseInt(r[i].value) <= parseInt(value) || r[i].value == "0") {
				result2.push(r[i]);
			}
		}
		paytype.value = result2;
	}
};
//服务类型
const selectServiceChange = (val, a, b) => {
	let desc46 = formData1.desc46;
	if (!val) {
		let rastatimeData = {};
		let rawValue = rastatime._rawValue;
		for (let i = 0; i < rawValue.length; i++) {
			if (rawValue[i].value == desc46) {
				rastatimeData.type_eng = rawValue[i].type_eng;
				rastatimeData.value = rawValue[i].value;
				rastatimeData.discount = rawValue[i].discount;
			}
		}
		//pkm特殊服务可以编辑
		if (pkm_run && rastatimeData.type_eng == "Special Service" && !isdisabled.value) {
			r_desc48.value = false;
		} else {
			r_desc48.value = true;
		}
		//给服务费赋值
		if (rastatimeData.discount) {
			formData1.desc48 = rastatimeData.discount;
		}
	}
};
//币种切换
const selectCurrencyChange = (val, a, b) => {
	let desc53 = formData1.desc53;
	if (!val) {
		let rastatimeData = {};
		let rawValue = currencyInfo._rawValue;
		for (let i = 0; i < rawValue.length; i++) {
			if (rawValue[i].value == desc53) {
				formData1.desc54 = rawValue[i].exchangerate;
			}
		}
	}
};
//买家付款方式
const currOperatorChangeto = val => {
	if (val) {
		let value = formData.desc5;
		if (!value) {
			value = "0";
		}
		let result2 = [];
		for (let i = 0; i < r.length; i++) {
			if (parseInt(r[i].value) <= parseInt(value) || r[i].value == "0") {
				result2.push(r[i]);
			}
		}
		paytypeto.value = result2;
	}
};

const condobj = reactive({
	dialogShow: false,
	cond: {},
	objlist: {}
});

//fileInfos.value.getEditSelectList()
//上传附件
const uploadFilled = () => {
	condobj.uploadnewDialogShow = true;
	condobj.cond.businessobjectid = formData.reservnum;
	condobj.cond.businesscode = "sample";
	condobj.cond.success = false;
};

const tableTabsValue = ref("info");
const dialogShow_customerListQuery = ref(false);

//表格对象检测项
const ptableList = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_detail.vue_vmaps",
	//表单可编辑
	edit: true,
	//设置 为单选
	tableToolbar: {
		right: false
	},
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentTestItemView.action",
		root: "vmaps",
		baseParams: { reservnum: v_reservnum, exchangerate: v_exchangerate }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "流水码",
			label: "columnappointmenttesthistoryserialno",
			prop: "SERIALNO",
			type: "Input",
			width: "120"
		},
		{
			title: "测试ID",
			label: "测试ID",
			prop: "TESTID",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "情况说明",
			label: "columnappointmentdescription",
			prop: "DESCRIPTION",
			type: "Input",
			width: "180",
			edit: true
		},
		{
			title: "是否混测",
			label: "columnappointmentblendtest",
			prop: "BLENDTEST",
			type: "Select",
			width: "140",
			typeData: options,
			edit: true
		},
		{
			title: "测试名称",
			label: "columnappointmenttesthistorytestdesc",
			prop: "TESTDESC",
			type: "Input",
			width: "180"
		},
		{
			title: "测试标准",
			label: "testiteminfoteststandardpanel",
			prop: "TESTSTANDARD",
			type: "Input",
			width: "160"
		},
		{
			title: "单价",
			label: "testiteminfoUnitPricepanel_hkd",
			prop: "TESTPRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "外币单价",
			label: "testiteminfopricepanel",
			prop: "TESTPRICE_FOREIGN",
			type: "Input",
			width: "120"
		},
		{
			title: "折后单价",
			label: "testiteminfoafternetPricepanel_hkd",
			prop: "AFTER_TESTPRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "折后单价(外币)",
			label: "testiteminfoafternetPricepanel",
			prop: "AFTER_TESTPRICE_FOREIGN",
			type: "Number",
			min: 0,
			precision: 2,
			width: "160",
			edit: true
		},
		{
			title: "价格百分比",
			label: "i18ncrmcontractdiscount",
			prop: "DISCOUNT",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率(%)",
			label: "columnappointmentdiscount",
			prop: "DISCOUNTRATE",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "历史报价",
			label: "itemtitleappointmenthisprice",
			prop: "hismessage",
			type: "Link",
			width: "180"
		},
		{
			title: "数量",
			label: "tabletitlemdm_tasklistpromt_taskcount",
			prop: "COUNT",
			type: "Number",
			precision: 0,
			min: 0,
			width: "120",
			edit: true
		},
		{
			title: "折前金额",
			label: "appointmentdiscount_hkd",
			prop: "BEFORE_PRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "折前金额(外币)",
			label: "panelbillinfoamountofmoneybefore",
			prop: "BEFORE_PRICE_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "折后金额",
			label: "appointmentDiscountedamount_hkd",
			prop: "AFTER_PRICE",
			type: "Input",
			width: "120"
		},
		{
			title: "折后金额(外币)",
			label: "panelbillinfoamountofmoneyafter",
			prop: "AFTER_PRICE_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "测试计划费用",
			label: "columnappointmenttesthistoryrasprofileprices_hkd",
			prop: "RASPROFILEPRICES",
			type: "Number",
			min: 0,
			precision: 2,
			width: "140",
			edit: true
		},
		{
			title: "测试计划费用(外币)",
			label: "columnappointmenttesthistoryrasprofileprices",
			prop: "RASPROFILEPRICES_FOREIGN",
			type: "Input",
			width: "160"
		},
		{
			title: "是否修改协议价",
			label: "columnbaseModificationAgreementPrice",
			prop: "ismodify",
			type: "Select",
			width: "100",
			typeData: options,
			edit: true
		},
		{
			title: "分包检测项",
			label: "crmcolumnwsp",
			prop: "FENBAO",
			type: "Select",
			width: "100",
			typeData: options
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "REMARK",
			type: "Input",
			width: "180"
		},
		{
			title: "创建时间",
			label: "testiteminforecordtimepanel",
			prop: "CREATEDATE",
			type: "Input",
			width: "140"
		},
		{
			title: "ITEMMARK",
			label: "ITEMMARK",
			prop: "TESTANOTHERNAME",
			type: "Input",
			width: "140"
		},
		{
			title: "NETPRICE",
			label: "NETPRICE",
			prop: "netprice",
			type: "Input",
			width: "140"
		},
		{
			title: "是否协议价",
			label: "是否协议价",
			prop: "iscontractprice",
			type: "Input",
			width: "140",
			isHide: true
		},
		{
			title: "类型",
			label: "类型",
			prop: "FLAG",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "测试项排序",
			label: "columnbaseTestSequencing",
			prop: "testsequencing",
			type: "Number",
			width: "120",
			edit: true
		},
		{
			title: "部门",
			label: "部门",
			prop: "DEPT",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "委托单号",
			label: "RESERVNUM",
			prop: "RESERVNUM",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "测试计划费用是否可修改",
			label: "canmodify",
			prop: "canmodify",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "协议折扣",
			label: "contractdiscount",
			prop: "contractdiscount",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "是否可编辑",
			label: "isedit",
			prop: "isedit",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "折后港币",
			label: "PRICE",
			prop: "PRICE",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格账户信息
const accountTableList = reactive({
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/appointmentaccount/appointmentaccount!selectAppointmentaccountInfoByCond.action",
		root: "appointmentaccountInfos",
		baseParams: {}
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
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "户名",
			label: "crmcolumndesc86",
			prop: "accountdesc",
			type: "Input",
			width: "300"
		},
		{
			title: "开户行",
			label: "crmcolumndesc85",
			prop: "accountbank",
			type: "Input",
			width: "300"
		},
		{
			title: "账号",
			label: "crmcolumndesc87",
			prop: "accountcode",
			type: "Input",
			width: "350"
		},
		{
			title: "SWIFT",
			label: "companypanelswifttitle",
			prop: "swift",
			type: "Input",
			width: "200"
		},
		{
			title: "银行地址",
			label: "companypanelbankadresstitle",
			prop: "bankadress",
			type: "Input",
			width: "300"
		}
	],
	// 表格数据
	tableData: []
});

//表格其它费用
const otherTableList = reactive({
	edit: false, //当前表格是否可编辑
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentOtherCosts.action",
		root: "vmaps",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "SERIALNO",
			label: "SERIALNO",
			prop: "SERIALNO",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "费用类型",
			label: "columnappointmentothercostCRM_qtfy_fylx",
			prop: "COSTTYPE",
			type: "Select",
			width: "160",
			edit: true,
			typeData: costtype
		},
		{
			title: "费用名称",
			label: "columnappointmentothercostcostname",
			prop: "COSTNAME",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "外币金额",
			label: "columnappointmentothercostcostprice",
			prop: "COSTPRICE_FN",
			type: "Number",
			width: "350",
			edit: true
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYNAME",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "columnappointmentdesc54",
			prop: "EXCHANGERATE",
			type: "Input",
			width: "160"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "COSTPRICE",
			type: "Input",
			width: "160"
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "REMARK",
			type: "Input",
			width: "160",
			edit: true
		},
		{
			title: "retrieveflag",
			label: "retrieveflag",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "submitcorp",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "auditflag",
			label: "auditflag",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "RESERVNUM",
			label: "RESERVNUM",
			prop: "RESERVNUM",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格分包信息
const subpackageTableList = reactive({
	//设置 工具栏
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoByNumDis.action",
		root: "appointmentInfos",
		baseParams: {}
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
			type: "Link",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "150"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "160"
		},
		{
			title: "报价部门",
			label: "crmcolumnqd",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc52",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordertime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "retrieveflag",
			label: "retrieveflag",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "submitcorp",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "auditflag",
			label: "auditflag",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格附件信息
const fileTableList = reactive({
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/core/uploadnew/upload!selectUploadFileByCond.action",
		root: "uploadFileList",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "fileid",
			label: "fileid",
			prop: "fileid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "附件名称",
			label: "columnjxFileName",
			prop: "filename",
			type: "Input",
			width: "160"
		},
		{
			title: "上传用户",
			label: "columnUploadUser",
			prop: "recorderdesc",
			type: "Input",
			width: "150"
		},
		{
			title: "上传时间",
			label: "columnUploadTime",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "附件下载",
			label: "portaldetailAttachmentDownload",
			prop: "filename",
			type: "Link",
			width: "160"
		},
		{
			title: "retrieveflag",
			label: "retrieveflag",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "submitcorp",
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "auditflag",
			label: "auditflag",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});
onMounted(() => {
	//getValue();
	if (props.condobj) {
		v_isdefaulttax = props.condobj.cond.isdefaulttax; //部门是否默认税点
		v_defaulttax = props.condobj.cond.defaulttax; //税点
		workflowflag = props.condobj.cond.workflowflag; //判断当前工作状态
		businesstype = props.condobj.cond.businesstype; //报价类型
		v_id = props.condobj.cond.reservnum; //报价编码
		v_split = props.condobj.cond.split; //报价拆分
		v_readonly = props.condobj.cond.v_readonly; //报价只读
		let readonly_u = props.condobj.cond.readonly; //报价只读
		if(readonly_u == "true"){
            v_readonly = "true";
		}
		if (v_isdefaulttax && v_isdefaulttax.indexOf("_") > 0) {
			//说明是PKM
			pkm_run = true;
		} else if (v_id && v_id.substring(0, 2) == "06") {
			pkm_run = true;
		}
		let userInfo = globalStore.userInfo;
		if (workflowflag == "1") {
			isbtnShow.value = true;
			saveShow.value = true;
			submitShow.value = true;
			historyappShow.value = true;
			formData.desc81 = userInfo.userdesc; //SE姓名
			formData.desc82 = userInfo.tel;
			formData.desc77 = userInfo.fax;
			formData.desc74 = userInfo.email;
			isdisabled.value = false;
		} else if (workflowflag == "2") {
			approveShow.value = true;
			isbtnShow.value = true;
			historyappShow.value = true;
			isdisabled.value = true;
		} else if (workflowflag == "3") {
			isbtnShow.value = true;
			isdisabled.value = true;
		} else if (confirm == "true") {
			isbtnShow.value = true;
			isdisabled.value = true;
		} else if (v_split == "1") {
			isdisabled.value = true;
		}

		if (v_readonly == "true") {
			isdisabled.value = true;
		}
		if (isdisabled.value) {
			//如果全都不可编辑都就不可编辑
			r_price_a.value = isdisabled.value;
			r_desc95.value = isdisabled.value;
			r_desc47.value = isdisabled.value;
		}
		if (v_id) {
			formData.reservnum = v_id;
			v_reservnum = formData.reservnum;
			let p_id = v_id;
			let jsonString = { cond: { reservnum: p_id } };
			getappointmentInfo(jsonString);
			// //初始化时需要把其它金额查询出来做效验
			// if (v_reservnum) {
			// 	otherTableList.httpAttribute.baseParams["reservnum"] = v_reservnum;
			// 	otherInfos.value.reuseTableList();
			// 	form_test();
			// }
		} else {
			//获取账户信息
			let CorpaccountInfo = async () => {
				let params = {
					jsonString: JSON.stringify({})
				};
				//查询账户信息
				const res = await http.post("/core/corpaccount/corpaccount!getCorpaccountInfoByCurrentUser.action", qs.stringify(params));
				if (res) {
					let corpaccountInfos = res.accountInfos;
					if (corpaccountInfos != null && corpaccountInfos.length > 0) {
						formData.desc85 = corpaccountInfos[0].accountbank;
						formData.desc86 = corpaccountInfos[0].accountdesc;
						formData.desc87 = corpaccountInfos[0].accountcode;
					}
				}
			};
			CorpaccountInfo();
		}
	}
	if (r) {
		//初始化做付款单的数据管理
		let result2 = [];
		for (let i = 0; i < r.length; i++) {
			if (pkm_run && r[i].value == "0.0") {
				result2.push(r[i]);
			} else if (r[i].value != "0.0") {
				result2.push(r[i]);
			}
		}
		r = result2;
	}
});
//子页面关闭后的方法可以给父页面赋值等操作
const dialogclose = () => {
	if (condobj && condobj.cond) {
		//选择委托单位的关闭窗口后的事件
		if (condobj.cond.html && condobj.objlist) {
			if (condobj.cond.html == "dialogShow_customerQuery") {
				//选择委托公司
				let obj = condobj.objlist;
				if (obj.CORPID) {
					formData.desc13 = obj.CORPNO; //客户号
					formData.desc15 = obj.CORPDESC; //委托公司名称
					if (obj.AGENTCODE) {
						//代理编号是否存在
						formData.accountid = obj.AGENTCODE; //代理编号
						formData.samplesender = obj.AGENTDESC; //代理名称
						formData.accounttype = obj.AGENTBROKERAGE; //代理佣金点
					} else {
						formData.accountid = null;
						formData.samplesender = null;
						formData.accounttype = null;
					}
					if (obj.desc90 == "Y") {
						formData.desc91 = obj.DEPARTMENTCODE; //分包部门编码
						formData.desc92 = obj.DEPARTMENTDESC; //分包部门名称
					}
					formData.desc22 = obj.REPRESENTATIVE; //法定人
					formData.enterpriseid = obj.CORPID; //客户id
					formData.enterprisecode = obj.CORPNO; //客户编码
					if (formData.enterprisecode) {
						//获取当前客户的归属销售
						let getUserValue = async corpno => {
							let cond = { "corpno": corpno };
							let jsonString = { cond: cond };
							let params = {
								jsonString: JSON.stringify(jsonString)
							};
							const res = await http.post("/mylims/order/appointment!selectEnterpriseForUserInfo.action", qs.stringify(params));							
							if (res && res.maps != null && res.maps.length > 0) {
								let maps = res.maps;
								formData.desc81 = maps[0].userdesc; //SE姓名
								formData.desc77 = maps[0].fax; //传真
								formData.desc82 = maps[0].tel; //电话
								formData.desc74 = maps[0].email; //电邮
							}
						};
						getUserValue(formData.enterprisecode);
					}
					formData.enterprisename = obj.CORPDESC; //客户名称
					formData.reportid = obj.CORPID; //报告id
					formData.report_zh = obj.CORPDESC; //报告中文抬头
					formData.report_us = obj.CORPDESC; //报告英文抬头
					formData.report_address_zh = obj.CORPLOCATION; //报告中文地址
					formData.report_address_us = obj.CORPLOCATION; //报告英文地址
					let invoiceformat = obj.INVOICEFORMAT;

					//PKM专属税点运算
					if (v_isdefaulttax.indexOf("_") > 0) {
						if (invoiceformat != null && invoiceformat == "1") {
							//7月1号到12月31号改为默认16个点
							//2021-01-01 税点默认恢复19点
							//if(v_isPKMtime){
							formData.desc95 = 19;
							//}else{
							//   Ext.getCmp('form_appointmentInfo').getField('desc95').setValue("16");
							//}
						} else {
							formData.desc95 = 0;
						}
					}
					if (obj.ISDISCOUNT == "1") {
						discount = obj.DISCOUNT;
						if (discount == "0" || discount == "0.0") {
							discount = "";
						}
					} else {
						discount = "";
					}
					formData.desc80 = discount; //付款单位折扣
					formData.paytype = obj.PAYCONDITION; //付款方式
					paycondition_renderer(obj.PAYCONDITION); //付款方式的下拉值从新定义
					formData.desc95flag = obj.DESC95FLAG;
				}
			} else if (condobj.cond.html == "dialogShow_paycustomerQuery") {
				//选择付款单位名称
				let obj = condobj.objlist;
				if (obj.CORPID) {
					formData.enterpriseid = obj.CORPID; //客户id
					formData.enterprisecode = obj.CORPNO; //客户编码
					formData.enterprisename = obj.CORPDESC; //客户名称
					if (obj.ISDISCOUNT == "1") {
						discount = obj.DISCOUNT;
						if (discount == "0" || discount == "0.0") {
							discount = "";
						}
					} else {
						discount = "";
					}
					formData.desc80 = discount; //折扣
					formData.paytype = obj.PAYCONDITION; //付款方式
					paycondition_renderer(obj.PAYCONDITION); //付款方式的下拉值从新定义
				}
			} else if (condobj.cond.html == "dialogShow_customerBuyerQuery") {
				//选择买家单位名称
				let obj = condobj.objlist;
				if (obj.CORPID) {
					formData.desc2 = obj.CORPID; //客户id
					formData.desc3 = obj.CORPNO; //客户编码
					formData.desc1 = obj.CORPDESC; //客户名称
					if (obj.ISDISCOUNT == "1") {
						discount = obj.DISCOUNT;
					} else {
						discount = "";
					}
					formData.desc4 = discount; //折扣
					formData.desc5 = obj.PAYCONDITION; //付款方式
					paycondition_rendererto(obj.PAYCONDITION); //付款方式的下拉值从新定义
				}
			} else if (condobj.cond.html == "reportDialogShow") {
				//选择报告抬头
				let obj = condobj.objlist;
				if (obj.CORPID) {
					formData.desc2 = obj.CORPID; //客户id
				}
			} else if (condobj.cond.html == "dialogShow_deptSubpackageApplintment") {
				//选择部门分包单
				let obj = condobj.objlist;
				let reservnumnow = formData.reservnum;
				if (obj.reservnum && reservnumnow) {
					let o = { dispersednum: obj.reservnum, reservnum: reservnumnow };
					var saveD = async o => {
						let list = [];
						list.push(o);
						let jsonString = { dispersedquoteInfos: list };
						let params = {
							jsonString: JSON.stringify(jsonString)
						};
						const res = await http.post("/crm/dispersedquote/dispersedquote!saveDispersedquoteInfo.action", qs.stringify(params));
						if (res) {
							subpackageInfos.value.getTableList();
						}
					};
					saveD(o);
				}
			} else if (condobj.cond.html == "dialogShow_corpaccountApplintment") {
				//选择账户信息
				let obj = condobj.objlist;
				let reservnumnow = formData.reservnum;
				if (obj.origrec && reservnumnow) {
					let o = { baseaccountid: obj.origrec, reservnum: reservnumnow };
					let saveD = async o => {
						let list = [];
						list.push(o);
						let jsonString = { appointmentaccountInfos: list };
						let params = {
							jsonString: JSON.stringify(jsonString)
						};
						const res = await http.post(
							"/crm/appointmentaccount/appointmentaccount!saveAppointmentaccountInfo.action",
							qs.stringify(params)
						);
						if (res) {
							accountInfos.value.getTableList();
						}
					};
					saveD(o);
				}
			} else if (condobj.cond.html == "dialogShow_selectFoldernoApplintment") {
				//选择账户信息
				let obj = condobj.objlist;
				let reservnumnow = formData.reservnum;
				if (obj.folderno && reservnumnow) {
					let corpno = formData.desc13;//委托客户号
					let cond = { corpno: corpno, folderno: obj.folderno, dept: obj.dept };
					//查询申请单检测项
					let selectF = async o => {
						let params = {
							jsonString: JSON.stringify({ cond: o })
						};
						//需要关联协议价还需从这下手
						const res = await http.post("/mylims/order/appointment!selectTestitemByFolderno.action", qs.stringify(params));
						if (res.vmaps && res.vmaps.length > 0) {
							//添加并保存检测项
							let saveitem = async v => {
								let jsonString = { maps: v };
								let params = {
									jsonString: JSON.stringify(jsonString),
									"cond.reservnum": reservnumnow,
									"cond.samplename": "",
									"cond.count": 1
								};
								const res = await http.post("/mylims/order/appointment!saveAppointmentTestItem.action", qs.stringify(params));
								if (res) {
									//先刷新检测项在去计算金额
									await vmaps.value.reuseTableList();
									calculateDiscount();
								}
							};
							saveitem(res.vmaps);
						}
					};
					selectF(cond);
				}
			} else if (condobj.cond.html == "dialogShow_newItemApplintment") {
				//选择检测项关闭页面
				//先刷新检测项在去计算金额
				let refresh = async () => {
					await vmaps.value.reuseTableList();
					calculateDiscount();
				};
				refresh();
			}
		}
	}
};

//修改增值税
const updateDesc95 = () => {
	let v_desc95flag = formData.desc95flag;
	let v_desc95 = formData.desc95;
	let sv_isdefaulttax = v_isdefaulttax.replace("_", "");
	if (v_isdefaulttax.indexOf("_") > 0) {
		//有下划线说明是PKM用户
		formData1.desc95 = v_desc95;
		r_desc95.value = false;
	} else if (sv_isdefaulttax == "1") {
		if (v_desc95flag == "1") {
			if (v_desc95 == null || v_desc95 == "" || v_desc95 == undefined || v_desc95 == v_defaulttax) {
				formData1.desc95 = v_defaulttax;
				r_desc95.value = false;
			} else {
				r_desc95.value = false;
			}
		}
		if (v_desc95flag == "0") {
			formData1.desc95 = v_defaulttax;
			r_desc95.value = true;
		}
	}
};

//检测项预览报价信息查询
const testSelect = async reservnum => {
	let cond = { reservnum: reservnum };

	let jsonString = { cond: cond };
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/order/appointment!selectAppointmentInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.appointmentInfo[0]) {
			//判定 appointmentInfo 的key 是否存在 formData1 的key
			if (key == "desc47") {
				if (res.appointmentInfo[0][key]) {
					formData1[key] = parseInt(res.appointmentInfo[0][key]);
				}
			} else if (key == "desc95") {
				if (res.appointmentInfo[0][key]) {
					formData1[key] = parseInt(res.appointmentInfo[0][key]);
				}
			} else if (key == "desc25" || key == "desc26") {
				if (res.appointmentInfo[0][key] == "on") {
					formData1[key] = true;
				}
			} else if (formData1[key] == "" || formData1[key]) {
				formData1[key] = res.appointmentInfo[0][key];
			}
		}
		if (formData1.desc47) {
			//检测周期
			formData1.desc47;
		}
		let desc49 = formData1.desc49; //价格百分比
		let desc64 = formData1.desc64; //客户期望折扣
		if (!desc49) {
			formData1.desc49 = "0";
		}
		if (!desc64) {
			formData1.desc64 = formData1.desc49;
		}
	}
};

//检测项预览检测项费用信息查询
const form_test = async reservnum => {
	let jsonString = { reservnum: reservnum };
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/order/appointment!selectAppointmentTestInfo.action", qs.stringify(params));
	if (res) {
		for (let key in res.maps[0]) {
			//判定 maps 的key 是否存在 formData2 的key
			if (formData2[key] == "" || formData2[key]) {
				formData2[key] = res.maps[0][key];
			}
		}
	}
};

//链接详细信息
const linkDetailbg = (column, row) => {
	if (column == "reservnum" && row.reservnum) {
		//选择委托单位
		condobj.cond = {
			readonly: "true",
			reservnum: row.reservnum
		};
		condobj.dialogShow_appointmentReadonlyTo = true;
	} else if (column == "hismessage" && formData.reservnum) {
		//历史检测项历史报价
		condobj.cond = {
			testid: row.TESTID,
			corpno: formData.desc13
		};
		condobj.selecthistoryapplicationitmeDialogShow = true;
	}
};
//付款单位付款信息
const paycondition_renderer = paytypes => {
	let value = formData.paytype;
	if (!value) {
		value = "0";
	}
	let result2 = [];
	for (let i = 0; i < r.length; i++) {
		if (parseInt(r[i].value) <= parseInt(value) || r[i].value == "0") {
			result2.push(r[i]);
		}
	}
	paytype.value = result2;
};
//买家付款信息
const paycondition_rendererto = paytypetos => {
	let value = formData.desc5;
	if (!value) {
		value = "0";
	}
	let result2 = [];
	for (let i = 0; i < r.length; i++) {
		if (parseInt(r[i].value) <= parseInt(value) || r[i].value == "0") {
			result2.push(r[i]);
		}
	}
	paytypeto.value = result2;
};
//子页面关闭后的方法可以给父页面赋值等操作
const contactDialogclose = () => {
	if (condobj && condobj.cond) {
		if (condobj.cond.html && condobj.objlist) {
			//选择联系人的关闭窗口后的事件
			if (condobj.cond.html == "dialogShow_customerContactQuery") {
				if (condobj.objlist.contactid) {
					formData.desc79 = condobj.objlist.contactdesc;
					formData.desc72 = condobj.objlist.contactid;
					formData.desc78 = condobj.objlist.fax;
					formData.desc18 = condobj.objlist.tel;
					formData.desc75 = condobj.objlist.email;
				}
			} else if (condobj.cond.html == "dialogShow_customerPayContactQuery") {
				if (condobj.objlist.contactid) {
					formData.billingcontact = condobj.objlist.contactdesc;
				}
			}
		}
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const addressDialogclose = () => {
	//选择付款单位地址后的关闭窗口后的事件
	if (condobj && condobj.objlist && condobj.objlist) {
		formData.paymentaddress = condobj.objlist.address;
	}
};
//子页面关闭后的方法可以给父页面赋值等操作
const reportDialogclose = () => {
	//选择报告抬头后关闭回调
	if (condobj && condobj.objlist && condobj.objlist.reportid) {
		formData.report_zh = condobj.objlist.report_zh;
		formData.report_us = condobj.objlist.report_us;
		formData.report_address_zh = condobj.objlist.report_address_zh;
		formData.report_address_us = condobj.objlist.report_address_us;
	}
};

//子页面关闭后的方法可以给父页面赋值等操作
const uploadnewDialogclose = () => {
	//选择附件后关闭回调
	if (condobj && condobj.objlist && condobj.objlist.success) {
		fileInfos.value.getTableList();
	}else{
		condobj.uploadnewDialogShow = false;
	}
};

//页面跳转
const dialogShow = data => {
	if (data == "dialogShow_customerListQuery") {
		dialogShow_customerListQuery.value = true;
	} else if (data == "dialogShow_customerQuery") {
		//选择委托单位
		condobj.cond = {
			lockflag: "0",
			html: data
		};
		condobj.dialogShow = true;
	} else if (data == "dialogShow_customerContactQuery") {
		//选择联系人
		let corpno = formData.desc13;
		if (corpno) {
			condobj.cond = {
				corpno: corpno,
				html: data
			};
			condobj.contactdialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("alert_saveEntrustUnit")
			});
		}
	} else if (data == "dialogShow_paycustomerQuery") {
		//选择付款单位名称
		condobj.cond = {
			lockflag: "0",
			html: data
		};
		condobj.dialogShow = true;
	} else if (data == "dialogShow_customerAddressQuery") {
		//选择付款单位地址
		let enterpriseid = formData.enterpriseid;
		if (enterpriseid) {
			condobj.cond = {
				corpid: enterpriseid,
				html: data
			};
			condobj.addressDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSelectClientInformationFirst")
			});
		}
	} else if (data == "dialogShow_customerPayContactQuery") {
		//选择付款联系人
		let enterprisecode = formData.enterprisecode;
		if (enterprisecode) {
			condobj.cond = {
				corpno: enterprisecode,
				html: data
			};
			condobj.contactdialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSelectClientInformationFirst")
			});
		}
	} else if (data == "dialogShow_customerBuyerQuery") {
		//选择客户买家
		let desc90 = formData.desc90;
		if (desc90 != "Y") {
			condobj.cond = {
				lockflag: "0",
				corptype: "Y",
				html: data
			};
			condobj.dialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("menu_NoContent")
			});
		}
	} else if (data == "dialogShow_customerReportQuery") {
		//选择报表抬头
		let enterpriseid = formData.enterpriseid;
		if (enterpriseid) {
			condobj.cond = {
				corpid: enterpriseid,
				html: data
			};
			condobj.reportDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSelectClientInformationFirst")
			});
		}
	} else if (data == "dialogShow_deptSubpackageApplintment") {
		//新增分包单
		let reservnum = formData.reservnum; //报价单号
		let desc53 = formData.desc53; //币种
		if (!desc53) {
			let desc53name = formData1.desc53; //检测项币种
			if (!desc53name) {
				//请先选择币种并保存！
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("message_CurrencySave")
				});
			}
		}
		if (reservnum) {
			condobj.cond = {
				desc53: reservnum,
				html: data
			};
			condobj.deptSubpackageApplintmentDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSelectClientInformationFirst")
			});
		}
	} else if (data == "dialogShow_corpaccountApplintment") {
		//新增分包单
		let reservnum = formData.reservnum; //报价单号
		if (reservnum) {
			condobj.cond = {
				reservnum: reservnum,
				html: data
			};
			condobj.corpaccountApplintmentDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSelectClientInformationFirst")
			});
		}
	} else if (data == "dialogShow_newItemApplintment") {
		//新增检测项
		let desc56 = formData1.desc56; //服务类型
		let enterprisecode = formData.enterprisecode; //付款人单位
		let reservnum = formData.reservnum; //报价单号
		if (desc56) {
			condobj.cond = {
				reservnum: reservnum,
				corpno: enterprisecode,
				html: data
			};
			condobj.newItemApplintmentDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSaveSpecialInfo")
			});
		}
	} else if (data == "dialogShow_selectFoldernoApplintment") {
		//选择申请单
		let desc56 = formData1.desc56; //服务类型
		let desc13 = formData.desc13;//委托客户号		
		if (desc56) {
			condobj.cond = {
				html: data,
				corpno:desc13
			};
			condobj.deptFolderApplintmentDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSaveSpecialInfo")
			});
		}
	} else if (data == "dialogShow_historyappListQuery") {
		//查询历史报价单
		let enterprisecode = formData.enterprisecode; //付款单位
		if (enterprisecode) {
			condobj.cond = {
				html: data,
				enterprisecode: enterprisecode
			};
			condobj.dialogShow_historyappListDialogShow = true;
		} else {
			ElMessage({
				type: i18n.t("Message_OperationTip"),
				message: i18n.t("Message_pleaseSaveSpecialInfo")
			});
		}
	}
	//dialogShow_historyappListQuery
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "info") {
		if (workflowflag == "1") {
			isbtnShow.value = true;
			saveShow.value = true;
			submitShow.value = true;
			historyappShow.value = true;
			formData.desc81 = userInfo.userdesc; //SE姓名
			formData.desc82 = userInfo.tel;
			formData.desc77 = userInfo.fax;
			formData.desc74 = userInfo.email;
			//formData.desc21 = new Date().toLocaleString();
		} else if (workflowflag == "2") {
			approveShow.value = true;
			isbtnShow.value = true;
			historyappShow.value = true;
		} else if (workflowflag == "3") {
			isbtnShow.value = true;
			isdisabled.value = true;
		} else if (confirm == "true") {
			isbtnShow.value = true;
			isdisabled.value = true;
		} else if (v_split == "1") {
			isdisabled.value = true;
		}
	} else if (targetName == "price") {
		if (workflowflag == "1") {
			itemShow.value = true;
			ptableList.edit = true; //等于1说明是创建时可编辑
		} else if (workflowflag == "2" || confirm == "true") {
			approveShow.value = true; //审核按钮
			isdisabled.value = true; //表单只读
			ptableList.edit = false;//检测项只读
		} else if (workflowflag == "3" || v_split == "1") {
			isdisabled.value = true;
		}
		if (pkm_run) {
			pkm_hind.value = 8;
		}
		if (v_readonly == "true") {
			isdisabled.value = true;
			ptableList.edit = false;
		}
		let reservnum = formData.reservnum;
		if (!reservnum) {
			setTimeout(() => {
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("alert_saveclient")
				});
				tableTabsValue.value = "info"; //切换报价单信息页面
			}, 100);
			return false;
		}
		let exchangerate = formData.desc54;
		if (!exchangerate) {
			exchangerate = formData1.desc54;
		}
		if (reservnum) {
			//传参后会自动调用接口刷新
			ptableList.httpAttribute.baseParams.reservnum = reservnum;
			ptableList.httpAttribute.baseParams.exchangerate = exchangerate;
			testSelect(reservnum);
			form_test(reservnum);
			vmaps.value.reuseTableList();
		}
		getrastatimeInfo(); //获取检测类型
		if (!isdisabled.value) {
			getcurrencyInfo(); //获取币种
			updateDesc95(); //增值税是否可编辑
		}
	} else if (targetName == "account") {
		let reservnum = formData.reservnum;
		if (!reservnum) {
			setTimeout(() => {
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("alert_saveclient")
				});
				tableTabsValue.value = "info"; //切换报价单信息页面
			}, 100);
			return false;
		} else {
			accountTableList.httpAttribute.baseParams["cond.reservnum"] = reservnum;
			accountInfos.value.reuseTableList();
		}
		if (workflowflag == "1") {
			accountShow.value = true;
		} else if (workflowflag == "2") {
			approveShow.value = true;
			isdisabled.value = true;
		} else if (workflowflag == "3" || v_split == "1") {
			isdisabled.value = true;
		} else if (confirm == "true") {
			isdisabled.value = true;
		}
	} else if (targetName == "other") {
		let desc53 = formData.desc53;
		let reservnum = formData.reservnum;
		if (!desc53) {
			desc53 = formData1.desc53;
		}
		if (!desc53) {
			setTimeout(() => {
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("message_CurrencySave")
				});
				tableTabsValue.value = "info"; //切换报价单信息页面
			}, 100);
			return false;
		}
		if (workflowflag == "1") {
			saveOtherShow.value = true;
			otherShow.value = true;
			submitShow.value = true;
			otherTableList.edit = true; //等于1说明是创建时可编辑
		} else if (workflowflag == "2") {
			approveShow.value = true;
			isdisabled.value = true;
		} else if (workflowflag == "3" || v_split == "1") {
			isdisabled.value = true;
		} else if (confirm == "true") {
		}
		let status = formData.status;
		if (!status) {
			setTimeout(() => {
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("message_CurrencySave")
				});
				tableTabsValue.value = "info"; //切换报价单信息页面
			}, 100);
			return false;
		}
		if (reservnum) {
			otherTableList.httpAttribute.baseParams["reservnum"] = reservnum;
			otherInfos.value.reuseTableList();
		}
	} else if (targetName == "subpackage") {
		if (workflowflag == "1") {
			subpackageShow.value = true;
			submitShow.value = true;
		} else if (workflowflag == "2") {
			approveShow.value = true;
			isdisabled.value = true;
		} else if (workflowflag == "3" || v_split == "1") {
			isdisabled.value = true;
		}
		if (confirm == "true") {
		}
		let reservnum = formData.reservnum;
		let desc90 = formData.desc90;
		if (!reservnum) {
			setTimeout(() => {
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("alert_saveclient")
				});
				tableTabsValue.value = "info"; //切换报价单信息页面
			}, 100);
			return false;
		}
		if (desc90 == "N") {
			subpackageTableList.httpAttribute.baseParams["cond.reservnum"] = reservnum;
			subpackageInfos.value.reuseTableList();
		} else {
			subpackageShow.value = false;
			submitShow.value = false;
			approveShow.value = false;
		}
	} else if (targetName == "file") {
		if (workflowflag == "1") {
			fileShow.value = true;
			submitShow.value = true;
		} else if (workflowflag == "2") {
			approveShow.value = true;
			isdisabled.value = true;
		} else if (workflowflag == "3" || v_split == "1") {
			isdisabled.value = true;
		}
		if (confirm == "true") {
		}
		let reservnum = formData.reservnum;
		if (!reservnum) {
			setTimeout(() => {
				ElMessage({
					type: i18n.t("Message_OperationTip"),
					message: i18n.t("alert_saveclient")
				});
				tableTabsValue.value = "info"; //切换报价单信息页面
			}, 100);
			return false;
		} else {
			fileTableList.httpAttribute.baseParams["cond.businessobjectid"] = reservnum;
			fileInfos.value.reuseTableList();
		}
	}
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}
</style>

<style lang="scss">
.selectAdressCss {
	height: 500px;
}

.el-divider--horizontal {
	display: block;
	height: 3px;
	width: 100%;
	margin: 14px 0;
	border-top: 1px#c7cbd5 var(--el-border-style);
}
</style>
