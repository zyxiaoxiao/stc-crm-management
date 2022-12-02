import {
	defineStore
} from 'pinia'

export const BodyHeightStore = defineStore({
	id: 'BodyHeightStore', // 命名，唯一
	// state: 返回对象的函数
	state: () => ({
		bodyHeight: 800,
		dialogHeight: 600

	}),

	actions: {
		setBodyHeight(data) {
			// 可直接通过this访问state属性
			this.bodyHeight = data;
			this.dialogHeight = data - 100;
		},
	}
})
