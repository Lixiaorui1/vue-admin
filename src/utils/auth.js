/*
 *@author: liujinming
 *@date: 2020-05-22 15:38:05
 *@description: 操作token的各类操作,主要是用于报错用户信息
 */
import Cookies from "js-cookie";

const TokenKey = "smt_ad-cookie";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function removePayIntergral() {
  return Cookies.remove("payIntergral");
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function setCookie(name, value, day, path, domain) {
  day = day || 365;
  path = path || "/";
  var str = name + "=" + encodeURIComponent(value) + "; ";
  if (day) {
    str +=
      "expires=" +
      new Date(Date.now() + day * 24 * 3600 * 1000).toGMTString() +
      "; ";
  }
  if (domain) str += "domain=" + domain + "; ";
  if (path) str += "path=" + path;
  document.cookie = str;
}

export function removeCookie(name) {
  return Cookies.remove(name);
}
export function setInfo(data) {
  setCookie("UserName", data.userName);
  setCookie("roleType", data.roleType);
  setCookie("authBool", data.authBool);
}
