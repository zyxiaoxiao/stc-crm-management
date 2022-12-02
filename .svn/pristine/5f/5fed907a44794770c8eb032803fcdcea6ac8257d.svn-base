import {
	defineStore
} from "pinia";
import piniaPersistConfig from "/src/config/piniaPersist.js";

// MenuStore
export const MenuStore = defineStore({
	id: "MenuState",
	state: () => ({
		// menu collapse
		isCollapse: false,
		// menu List
		menuList: []
	}),
	getters: {},
	actions: {
		setCollapse() {
			this.isCollapse = !this.isCollapse;
		},
		setMenuList(menuList) {
			this.menuList = menuList;
		}
	},
	persist: piniaPersistConfig("MenuState")
});
