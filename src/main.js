import { createApp } from "vue";
import App from "./App.vue";

// 引用路由 vue Router
import router from "./routers/index.js";
//状态、储存管理库
import store from "./store/index.js";

//引用 element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//全局 引入 Element icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// vue i18n
import I18n from "./language/index.js";

// echarts
import echarts from "./echarts/index.js";
import "vue3-layer/dist/s3Layer.css";

//全局 引入 icon（自定义）
import "./assets/icon/iconfont.css";
//全局自定义样式
import "./styles/global.scss";
//全局修改Element样式
import "./styles/elementPlus_cover.scss";

// reset style sheet
import "./styles/reset.scss";
// CSS common style sheet
import "./styles/common.scss";

const app = createApp(App);

app.config.globalProperties.$echarts = echarts;
app.use(ElementPlus, {});
app.use(router);
app.use(store);
app.use(I18n);

//自定义命令
// app.directive("dialogStretching", {
// 	// 参数 el, binding, vnode, oldVnode
// 	updated: (el, binding, vnode, oldVnode) => {
// 		// 获取弹框头部
// 		const dialogHeaderEl = el.querySelector(".el-dialog__header");
// 		//全屏事件
// 		const dialogQuanpingEl = el.querySelector(".layui-icon-extend-dialogquanping");
// 		//弹框窗体
// 		const dragDom = el.querySelector(".el-dialog");
// 		//拉伸
// 		let dragMouse = document.querySelector(".stretching");

// 		if (dialogHeaderEl && dialogQuanpingEl && dragDom && dragMouse) {
// 			//获取宽度百分比，给left百分比
// 			let elDialogWidth = "";
// 			let elDialogStyle = dragDom.attributes.style.value;
// 			let elDialogStyleArr = elDialogStyle.split(";");
// 			for (const iterator of elDialogStyleArr) {
// 				if (iterator.indexOf("--el-dialog-width") != -1) {
// 					elDialogWidth = iterator.substr(iterator.length - 3, 2);
// 				}
// 			}
// 			let elDialogLeft = (100 - elDialogWidth) / 2;
// 			dragDom.style.left = elDialogLeft + "%";
// 			dragDom.style.top = "50px";
// 			// 头部加上可拖动cursor
// 			dialogHeaderEl.style.cursor = "move";
// 			// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
// 			const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
// 			//拖拽
// 			const moveDown = e => {
// 				// 鼠标按下，计算当前元素距离可视区的距离
// 				const disX = e.clientX - dialogHeaderEl.offsetLeft;
// 				const disY = e.clientY - dialogHeaderEl.offsetTop;

// 				// 获取到的值带px 正则匹配替换
// 				let styL, styT;

// 				// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
// 				if (sty.left.includes("%")) {
// 					styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
// 					styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
// 				} else {
// 					styL = +sty.left.replace(/\px/g, "");
// 					styT = +sty.top.replace(/\px/g, "");
// 				}
// 				document.onmousemove = e => {
// 					// 通过事件委托，计算移动的距离
// 					const l = e.clientX - disX;
// 					const t = e.clientY - disY;

// 					// 移动当前元素
// 					if (l + styL >= 0) {
// 						dragDom.style.left = `${l + styL}px`;
// 					} else {
// 						dragDom.style.left = "0px";
// 					}
// 					if (t + styT >= 0) {
// 						dragDom.style.top = `${t + styT}px`;
// 					} else {
// 						dragDom.style.top = "0px";
// 					}
// 				};

// 				document.onmouseup = e => {
// 					document.onmousemove = null;
// 					document.onmouseup = null;
// 				};
// 			};
// 			dialogHeaderEl.onmousedown = moveDown;

// 			let nowLeft = 0;
// 			let nowTop = 0;
// 			let nowWidth = 0;
// 			let nowHight = 0;
// 			// 初始非全屏
// 			let isFullScreen = false;
// 			dialogQuanpingEl.onclick = () => {
// 				if (isFullScreen === false) {
// 					nowWidth = dragDom.clientWidth;
// 					nowHight = dragDom.clientHeight;
// 					nowLeft = getComputedStyle(dragDom).left;
// 					nowTop = getComputedStyle(dragDom).top;

// 					dragDom.style.left = 0;
// 					dragDom.style.top = 0;
// 					dragDom.style.height = "100VH";
// 					dragDom.style.width = "100VW";
// 					isFullScreen = true;

// 					dialogHeaderEl.style.cursor = "initial";
// 					dialogHeaderEl.onmousedown = null;
// 				} else {
// 					dragDom.style.height = nowHight + "px";
// 					dragDom.style.width = nowWidth + "px";
// 					dragDom.style.left = nowLeft;
// 					dragDom.style.top = nowTop;
// 					isFullScreen = false;

// 					dialogHeaderEl.style.cursor = "move";
// 					dialogHeaderEl.onmousedown = moveDown;
// 				}
// 			};

// 			//dragMouse.style.cursor = 'se-resize';
// 			//按下鼠标按钮执行
// 			dragMouse.onmousedown = e => {
// 				const EloffsetLeft = dragDom.offsetLeft;
// 				const EloffsetTop = dragDom.offsetTop;
// 				//鼠标移动事件执行
// 				document.onmousemove = e => {
// 					e.preventDefault(); // 移动时禁用默认事件
// 					//左右移动宽度 大于 400
// 					if (e.clientX - EloffsetLeft > 400) {
// 						dragDom.style.width = e.clientX - EloffsetLeft + "px";
// 					} else {
// 						dragDom.style.width = "400px";
// 					}

// 					//上下移动高度要 大于300
// 					if (e.clientY - EloffsetTop > 300) {
// 						dragDom.style.height = e.clientY - EloffsetTop + "px";
// 					} else {
// 						dragDom.style.height = "300px";
// 					}
// 				};
// 				// 拉伸结束
// 				document.onmouseup = e => {
// 					document.onmousemove = null;
// 					document.onmouseup = null;
// 				};
// 			};
// 		}
// 	}
// });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.mount("#app");
