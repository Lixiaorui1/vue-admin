/*
 *@author: liujinming
 *@date: 2020-05-22 15:35:32
 *@description:  各类校验方法库
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

export function validTrim(rule, str, callback) {
  if (!!!str || !!!str.trim()) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
}

export function validNumber(rule, str, callback) {
  const reg = /^\d+$/g;
  if (reg.test(str)) {
    callback();
  } else {
    callback(new Error(rule.message));
  }
}

// 校验客服信息
export function validateServ(rule, str, callback) {
  let is = true;
  str.forEach(item => {
    if (!(item.detail || "").trim() || !item.type) {
      is = false;
    }
  });
  if (is) {
    callback();
  } else {
    callback(new Error(rule.message));
  }
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
