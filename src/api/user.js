import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export function loginAPI(data) {
  return request({
    url: "/smallTarget/user/login",
    method: "post",
    data
  });
}

export function getAuthor(data) {
  return request({
    url: "/smallTarget/user/other/doauth/1",
    method: "get",
    params: { returnUrl: data.ReturnUrl }
  });
}

export function autoLogin(data) {
  return request({
    url: "/smallTarget/user/other/login/1",
    method: "get",
    params: { code: data.code, returnUrl: data.ReturnUrl }
  });
}

export function logout(data) {
  return request({
    url: "/smallTarget/user/logout",
    method: "get"
  });
}

export function thirdlogin(data) {
  return request({
    url: `/smallTarget/user/thirdJumpLogin/1/${data.temptoken}?${UnixTime()}`,
    method: "get"
  });
}
