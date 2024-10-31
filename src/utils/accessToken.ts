// import { settingConfig } from "@/config/setting";
// const { tokenName } = settingConfig;
// import cookie from "js-cookie";

// /**
//  * 读取AccessToken
//  */
// export function getAccessToken() {
//   return cookie.get(tokenName);
// }

// /**
//  * 设置AccessToken
//  * @param accessToken 访问令牌
//  */
// export function setAccessToken(accessToken: string) {
//   cookie.set(tokenName, accessToken, {
//     expires: new Date(new Date().getTime() + 10 * 60 * 60 * 1000),
//   });
// }

// /**
//  * 清除AccessToken
//  */
// export function removeAccessToken() {
//   return cookie.remove(tokenName);
// }


export const tokenName = 'accessToken';

export function getAccessToken() {
  return localStorage.getItem(tokenName);
}
