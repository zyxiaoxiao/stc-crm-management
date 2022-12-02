<template>
	<div style="border: 1px solid #ccc">
		<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
		<Editor
			style="height: 500px; overflow-y: hidden"
			v-model="valueHtml"
			:defaultConfig="editorConfig"
			:mode="mode"
			@onCreated="handleCreated"
		/>
	</div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
	components: { Editor, Toolbar },
	setup() {
		// 编辑器实例，必须用 shallowRef
		const editorRef = shallowRef();

		// 内容 HTML
		const valueHtml = ref(
			`<p><span style="color: rgb(255, 77, 79);">Kenny SU</span>:</p><p style="text-indent: 2em; line-height: 1;">Please kindly find the below approval notice from<span style="color: rgb(235, 144, 58);"> </span><span style="color: rgb(130, 0, 20);">the Approval Administrator</span></p><p style="text-indent: 2em; line-height: 1;"><br></p><p style="line-height: 1;"><strong>CRM System – Item：</strong><span style="color: rgb(54, 88, 226);"><strong>Account Receivable Managemnt</strong></span><strong> created by Kenny SU</strong></p><table style="width: auto;"><tbody><tr><th colspan="1" rowspan="1" width="378" style="text-align: center;">ID</th><th colSpan="1" rowSpan="1" width="575.62">Description</th><th colSpan="1" rowSpan="1" width="153">Approved By</th><th colSpan="1" rowSpan="1" width="197.75">Approval Time</th><th colSpan="1" rowSpan="1" width="89.93">Status</th><th colSpan="1" rowSpan="1" width="119.92">Comments</th></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">F3204D2E-069A-4A11-B7F0-2B2DE9905946</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">广东嘉士利食品集团有限公司</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">Lucy WANG</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">2022-09-19 09:26:50</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">Done</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">Approve ! </td></tr></tbody></table><p style="line-height: 1;"><strong>Please proceed with the corresponding applications.</strong></p><p style="line-height: 1;"><br></p><p style="line-height: 1;"><a href="https://crm.stc.group/crm" target="_blank">Click here to access CRM System</a></p><p style="line-height: 1;"><br></p><p style="text-indent: 2em; line-height: 1;">This is a system generated email, please do not reply. </p><p style="text-indent: 2em; line-height: 1;"><br></p><p style="text-indent: 2em; line-height: 1;"><span style="color: rgb(130, 0, 20);">Approval Administrator</span></p><p style="text-indent: 2em; line-height: 1;">2022-09-19 09:26:50</p>`
		);

		// 模拟 ajax 异步获取内容
		onMounted(() => {
			setTimeout(() => {
				valueHtml.value = `<p><span style="color: rgb(255, 77, 79);">Kenny SU</span>:</p><p style="text-indent: 2em; line-height: 1;">Please kindly find the below approval notice from<span style="color: rgb(235, 144, 58);"> </span><span style="color: rgb(130, 0, 20);">the Approval Administrator</span></p><p style="text-indent: 2em; line-height: 1;"><br></p><p style="line-height: 1;"><strong>CRM System – Item：</strong><span style="color: rgb(54, 88, 226);"><strong>Account Receivable Managemnt</strong></span><strong> created by Kenny SU</strong></p><table style="width: auto;"><tbody><tr><th colspan="1" rowspan="1" width="378" style="text-align: center;">ID</th><th colSpan="1" rowSpan="1" width="575.62">Description</th><th colSpan="1" rowSpan="1" width="153">Approved By</th><th colSpan="1" rowSpan="1" width="197.75">Approval Time</th><th colSpan="1" rowSpan="1" width="89.93">Status</th><th colSpan="1" rowSpan="1" width="119.92">Comments</th></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">F3204D2E-069A-4A11-B7F0-2B2DE9905946</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">广东嘉士利食品集团有限公司</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">Lucy WANG</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">2022-09-19 09:26:50</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">Done</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">Approve ! </td></tr></tbody></table><p style="line-height: 1;"><strong>Please proceed with the corresponding applications.</strong></p><p style="line-height: 1;"><br></p><p style="line-height: 1;"><a href="https://crm.stc.group/crm" target="_blank">Click here to access CRM System</a></p><p style="line-height: 1;"><br></p><p style="text-indent: 2em; line-height: 1;">This is a system generated email, please do not reply. </p><p style="text-indent: 2em; line-height: 1;"><br></p><p style="text-indent: 2em; line-height: 1;"><span style="color: rgb(130, 0, 20);">Approval Administrator</span></p><p style="text-indent: 2em; line-height: 1;">2022-09-19 09:26:50</p>`;
			}, 1500);
		});

		const toolbarConfig = {};
		const editorConfig = { placeholder: "请输入内容..." };

		// 组件销毁时，也及时销毁编辑器
		onBeforeUnmount(() => {
			const editor = editorRef.value;
			if (editor == null) return;
			editor.destroy();
		});

		const handleCreated = editor => {
			editorRef.value = editor; // 记录 editor 实例，重要！
		};

		return {
			editorRef,
			valueHtml,
			mode: "default", // 或 'simple'
			toolbarConfig,
			editorConfig,
			handleCreated
		};
	}
};
</script>
