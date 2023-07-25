<template>
	<el-dialog
		ref="dialogRef"
		:modelValue="dialogShow"
		:width="width"
		:fullscreen="false"
		:class="customclass"
		:close-on-click-modal="false"
		:show-close="false"
		:append-to-body="true"
		:destroy-on-close="true"
		@close="close"
		@open="open"
		@opened="opened"
	>
		<template #header="{ close }">
			<div class="main-dialog-header">
				<span>{{ title }}</span>
				<div class="flx-align-center">
					<div class="main-dialog-icon" style="margin-right: 10px">
						<i class="iconfont layui-icon-extend-dialogquanping"></i>
					</div>
					<el-icon @click="close" class="main-dialog-icon">
						<CloseBold />
					</el-icon>
				</div>
			</div>
		</template>
		<div class="dialogContent-class">
			<slot></slot>
		</div>
		<div class="flex-row">
			<div class="flex-1"></div>
			<div class="stretching">
				<i style="font-size: 12px" class="iconfont layui-icon-extend-shurukuanglashen"></i>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
const dialogRef = ref(null);
let dialogHeaderEl = null,
	dialogQuanpingEl = null,
	dragMouse = null;
// 父组件传入的参数
const props = defineProps({
	dialogShow: Boolean,
	title: String,
	width: String,
	customclass: String
});

let customclass = ref("main-dialog");
if (props.customclass) {
	customclass.value = "main-dialog " + props.customclass;
}

const open = () => {
	emits("open");
};
const opened = () => {
	const el = dialogRef.value.dialogContentRef.$el;
	// 获取弹框头部
	dialogHeaderEl = el.querySelector(".el-dialog__header");
	//全屏事件
	dialogQuanpingEl = el.querySelector(".layui-icon-extend-dialogquanping");
	//弹框窗体
	const dragDom = el;
	//拉伸
	dragMouse = document.querySelector(".stretching");

	if (dialogHeaderEl && dialogQuanpingEl && dragDom && dragMouse) {
		//获取宽度百分比，给left百分比
		let elDialogWidth = "";
		let elDialogStyle = dragDom.attributes.style.value;
		let elDialogStyleArr = elDialogStyle.split(";");
		for (const iterator of elDialogStyleArr) {
			if (iterator.indexOf("--el-dialog-width") != -1) {
				elDialogWidth = iterator.substr(iterator.length - 3, 2);
			}
		}
		let elDialogLeft = (100 - elDialogWidth) / 2;
		dragDom.style.left = elDialogLeft + "%";
		dragDom.style.top = "50px";
		// 头部加上可拖动cursor
		dialogHeaderEl.style.cursor = "move";
		// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
		const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
		//拖拽
		const moveDown = e => {
			// 鼠标按下，计算当前元素距离可视区的距离
			const disX = e.clientX - dialogHeaderEl.offsetLeft;
			const disY = e.clientY - dialogHeaderEl.offsetTop;

			// 获取到的值带px 正则匹配替换
			let styL, styT;

			// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
			if (sty.left.includes("%")) {
				styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
				styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
			} else {
				styL = +sty.left.replace(/\px/g, "");
				styT = +sty.top.replace(/\px/g, "");
			}
			document.onmousemove = e => {
				// 通过事件委托，计算移动的距离
				const l = e.clientX - disX;
				const t = e.clientY - disY;

				// 移动当前元素
				if (l + styL >= 0) {
					dragDom.style.left = `${l + styL}px`;
				} else {
					dragDom.style.left = "0px";
				}
				if (t + styT >= 0) {
					dragDom.style.top = `${t + styT}px`;
				} else {
					dragDom.style.top = "0px";
				}
			};

			document.onmouseup = e => {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
		dialogHeaderEl.onmousedown = moveDown;

		let nowLeft = 0;
		let nowTop = 0;
		let nowWidth = 0;
		let nowHight = 0;
		// 初始非全屏
		let isFullScreen = false;
		dialogQuanpingEl.onclick = () => {
			if (isFullScreen === false) {
				nowWidth = dragDom.clientWidth;
				nowHight = dragDom.clientHeight;
				nowLeft = getComputedStyle(dragDom).left;
				nowTop = getComputedStyle(dragDom).top;

				dragDom.style.left = 0;
				dragDom.style.top = 0;
				dragDom.style.height = "100VH";
				dragDom.style.width = "100VW";
				isFullScreen = true;

				dialogHeaderEl.style.cursor = "initial";
				dialogHeaderEl.onmousedown = null;
			} else {
				dragDom.style.height = nowHight + "px";
				dragDom.style.width = nowWidth + "px";
				dragDom.style.left = nowLeft;
				dragDom.style.top = nowTop;
				isFullScreen = false;

				dialogHeaderEl.style.cursor = "move";
				dialogHeaderEl.onmousedown = moveDown;
			}
		};

		//dragMouse.style.cursor = 'se-resize';
		//按下鼠标按钮执行
		dragMouse.onmousedown = e => {
			const EloffsetLeft = dragDom.offsetLeft;
			const EloffsetTop = dragDom.offsetTop;
			//鼠标移动事件执行
			document.onmousemove = e => {
				e.preventDefault(); // 移动时禁用默认事件
				//左右移动宽度 大于 400
				if (e.clientX - EloffsetLeft > 400) {
					dragDom.style.width = e.clientX - EloffsetLeft + "px";
				} else {
					dragDom.style.width = "400px";
				}

				//上下移动高度要 大于300
				if (e.clientY - EloffsetTop > 300) {
					dragDom.style.height = e.clientY - EloffsetTop + "px";
				} else {
					dragDom.style.height = "300px";
				}
			};
			// 拉伸结束
			document.onmouseup = e => {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	}
};

const close = () => {
	dialogHeaderEl.onmousedown = null;
	dialogQuanpingEl.onclick = null;
	dragMouse.onmousedown = null;
	document.onmousemove = null;
	document.onmouseup = null;
	emits("close");
};

//注册emit // 抛出事件
const emits = defineEmits(["close", "open"]);

onMounted(() => {});
</script>

<style lang="scss">
.stretching {
	cursor: se-resize;
}
</style>
