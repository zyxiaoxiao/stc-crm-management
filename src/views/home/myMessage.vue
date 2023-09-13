<template>
	<el-col v-if="elcolShow" :span="12" style="margin-bottom: 10px">
		<el-card shadow="always" class="home-card" v-loading="myMessageLoading">
			<div class="echarts-panel-box">
				<div class="echarts-panel-header">
					<div class="echarts-panel-header-left">{{ $t("homepanelMyNews") }}</div>
					<div class="echarts-panel-header-right">
						<div class="flx-center" style="margin-left: 10px" @click="refreshClick">
							<span>{{ $t("desktop_Refresh") }}</span>
							<el-icon>
								<Refresh />
							</el-icon>
						</div>
					</div>
				</div>
				<el-table :data="myMessage_tableData" style="width: 100%" height="280">
					<el-table-column prop="number" :label="$t('portal_number')" width="80" />

					<el-table-column prop="title" :label="$t('portal_title')">
						<!-- 数据行 -->
						<template #default="scope">
							<span>
								<el-link @click="linkDetailbg(scope.row)" type="primary">{{ scope.row["title"] }} </el-link>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="sendtime" :label="$t('portal_time')" width="180" />
				</el-table>

				<el-dialog @close="dialogClose" v-model="dialogVisible" :title="$t('homepanelMyNews')" width="800px" draggable>
					<el-form style="margin: 15px 15px" label-position="right" label-width="80px" :model="v" ref="ruleFormRef">
						<el-row :gutter="15" class="main-align-items-center">
							<el-col :span="24">
								<el-form-item title1="发件人名称" :label="$t('itemtitleinfo_inboxrecorderdesc')">
									<el-input v-model.trim="formData.recorderdesc" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="收件人" :label="$t('tabtitlecalendarreceiver')">
									<el-input v-model.trim="formData.recipient" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="标题" :label="$t('itemtitleinfo_newstitle')">
									<el-input v-model.trim="formData.title" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item title1="信息内容" :label="$t('itemtitleinfo_inboxcontent')">
									<el-input type="textarea" :autosize="{ minRows: 4 }" v-model.trim="formData.content" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-dialog>
			</div>
		</el-card>
	</el-col>
</template>

<script setup name="myMessage">
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import qs from "qs";
import http from "@/api/index.js";

const elcolShow = ref(true);
const dialogVisible = ref(false);
const ruleFormRef = ref();

//表单字段
const formData = reactive({});

// 加载 loading
const myMessageLoading = ref(false);
const myMessage_zTable = ref();
// 表格数据
const myMessage_tableData = reactive([]);

//获取
const getMyMessage = async () => {
	try {
		myMessageLoading.value = true;
		const res = await http.post("/mail/inbox/inbox.action", qs.stringify({}), {
			headers: {
				noLoading: true //隐藏加载--
			}
		});
		if (res.inboxInfos) {
			myMessage_tableData.length = 0;
			for (let index = 1; index <= res.inboxInfos.length; index++) {
				let inboxInfo = res.inboxInfos[index];
				let obj = {};
				for (const key in inboxInfo) {
					if (Object.hasOwnProperty.call(inboxInfo, key)) {
						obj.number = index;
						obj[key] = inboxInfo[key];
					}
				}
				myMessage_tableData.push(obj);
			}
		}
	} finally {
		myMessageLoading.value = false;
		elcolShow.value = myMessage_tableData.length >= 1 ? true : false;
	}
};

//刷新
const refreshClick = () => {
	getMyMessage();
};

const linkDetailbg = async row => {
	if (row) {
		const res = await http.post(
			"/mail/inbox/inbox!selectInboxInfoById.action",
			qs.stringify({
				jsonString: JSON.stringify({
					inboxInfo: { inboxid: row.inboxid }
				})
			}),
			{
				headers: {
					noLoading: true //隐藏加载--
				}
			}
		);
		console.log("res", res);
		if (res && res.inboxInfo?.length > 0) {
			let inboxInfo = res.inboxInfo[0];
			for (let key in inboxInfo) {
				formData[key] = inboxInfo[key];
			}
			formData.recipient = formData.addresser + "【" + formData.addressee + "】";
		}
	}
	dialogVisible.value = true;
};

const dialogClose = () => {
	getMyMessage();
};

//页面初始化渲染完成执行
onMounted(() => {
	getMyMessage();
});
//页面卸载之前调用
onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
