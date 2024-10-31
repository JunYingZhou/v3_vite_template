import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
// import { setAccessToken, removeAccessToken } from "@/utils/accessToken";
// import { login, getCurrentUser, logout } from "@/api/sso";

/**
 * 用户信息
 */
export const useUserStore = defineStore("userStore", {
  state() {
    return {
      /**
       * 用户ID
       */
      userId: "",
      /**
       * 用户姓名
       */
      userName: "",
      /**
       * 用户工号
       */
      userJobNumber: "",
      /**
       * 用户完整信息实体
       */
      userInfo: {},
    };
  },
  getters: {
    /**
     * 获取用户ID
     * @param state 状态集合
     * @returns 用户ID
     */
    getUserId: (state) => state.userId,
    /**
     * 获取用户姓名
     * @param state 状态集合
     * @returns 用户姓名
     */
    getUserName: (state) => state.userName,
    /**
     * 获取用户工号
     * @param state 状态集合
     * @returns 用户工号
     */
    getUserJobNumber: (state) => state.userJobNumber,
    /**
     * 获取后端用户信息
     * @param state 状态集合
     * @returns 后端用户信息
     */
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    /**
     * 获取登入地址
     */
    async login() {
      const state = uuidv4().replace(/-/g, "");
      const redirectUri = encodeURIComponent(
        import.meta.env.VITE_APP_OAUTH_CALLBACK_URL,
      );
      const applyForTokenUri =
        import.meta.env.VITE_APP_OAUTH_STATE_CODE_URI +
        import.meta.env.VITE_APP_OAUTH_CLIENT_ID +
        "&redirect_uri=" +
        redirectUri +
        "&state=" +
        state;
      return applyForTokenUri;
    },
    /**
     * 申请token
     * @param code SSO登入回调code
     */
    async applyToken(code: string | any) {
      // const { data } = await login(code);
      // if (data && data.code == 200 && data.data) {
      //   setAccessToken(data.data);
      // }
    },
    /**
     * 获取当前登入用户信息
     */
    async getCurrentUser() {
    //   const { data } = await getCurrentUser();
    //   if (data && data.code == 200 && data.data) {
    //     this.userId = data.data.userId || "";
    //     this.userName = data.data.userName || "";
    //     this.userJobNumber = data.data.workId || "";
    //     this.userInfo = data.data || {};
    //   }
    },
    /**
     * 重置数据
     */
    async resetAll() {
      this.userId = "";
      this.userName = "";
      this.userJobNumber = "";
    },
    /**
     * 退出系统
     */
    async logout() {
      // await logout();
      // removeAccessToken();
      this.resetAll();
      window.location.href = "/visabackstage/";
    },
  },
});
