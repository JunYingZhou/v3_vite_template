import { defineStore } from "pinia";

/**
 * 系统设置
 */
export const useSettingStore = defineStore("settingStore", {
  state: () => {
    return {
      /**
       * 是否显示路由
       */
      routerView: true,
      /**
       * 菜单栏是否折叠
       */
      collapse: false,
      /**
       * 全屏显示
       */
      fullScreen: false,
    };
  },
  getters: {
    /**
     * 菜单栏是否折叠
     * @param state 状态集合
     * @returns true为折叠，反之未折叠
     */
    isCollapse: (state) => state.collapse,
    /**
     * 是否全屏显示
     * @param state 状态集合
     * @returns true为全屏，反之退出全屏
     */
    isFullScreen: (state) => state.fullScreen,
    /**
     * 是否显示路由
     * @param state 状态集合
     * @returns true为显示路由
     */
    showRouterView: (state) => state.routerView,
  },
  actions: {
    /**
     * 执行折叠/展开菜单栏
     */
    changeCollapse() {
      this.collapse = !this.collapse;
    },
    /**
     * 切换全屏显示
     * @param value true/false
     */
    changeFullScreen(value: boolean) {
      this.fullScreen = value;
    },
    /**
     * 是否刷新路由
     * @param value true/false
     */
    setRouterView(value: boolean) {
      this.routerView = value;
    },
  },
});
