import request from "./request";

/**
 * 用户相关的api
 */
export function getCaptcha() {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
}

/**
 * 查询用户是否存在
 * @param {*} loginId
 * @returns
 */
export function userIsExist(loginId) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: "GET",
  });
}

/**
 * 用户注册
 *
 */
export function addUser(newUserInfo) {
  console.log(newUserInfo, "hhhhhhhhyyyy")
  return request({
    url: "/api/user/",
    data: newUserInfo,
    method: "POST",
  });
}
