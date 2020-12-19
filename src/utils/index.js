/*
 *@author: liujinming
 *@date: 2020-05-22 15:37:02
 *@description: uitls 系统内各类方法支持库
 */
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */

import objectFitImages from "object-fit-images";
import _ from "lodash";
import axios from "axios";

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  var search = url.substring(url.lastIndexOf("?") + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function(rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
  });
  return obj;
}

/**
 * Parse the num to monery
 * @param {Number} num
 * @returns {String}
 */

export let formatMonery = num => {
  let result = "",
    counter = 0;
  let dot = String(num).indexOf(".");
  if (dot != -1) {
    // 获取小数点后面的数字(indexOf和substring都不支持数字，所以要先转字符串才可以用)
    let dotCnt = String(num).substring(dot + 1, num.length);
    // 获取小数点前面的数字
    num = String(num).split(".")[0];
    num = (num || 0).toString();
    for (let i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) {
        result = "," + result;
      }
    }
    result = result + "." + dotCnt;
    return result;
  } else {
    // 没有小数点
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  }
};

// 下划线转换驼峰
export function toHump(name) {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}
// 驼峰转换下划线
export function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function replaceImg() {
  const imgs = document.getElementsByTagName("img");
  objectFitImages(imgs);
}

// 数字金额格式化
export function toThousands(num) {
  if (num) {
    return Number(num).toLocaleString();
  } else {
    return 0;
  }
}

// 数字金额格式化为数字
export function deThousands(str) {
  if (str) {
    const _str = str
      .toString()
      .split(",")
      .join("");
    return Number(_str);
  } else {
    return 0;
  }
}

export function isEqual(_newVal, _oldVal) {
  const newVal = _.cloneDeep(_newVal);
  const oldVal = _.cloneDeep(_oldVal);
  let isEq = true;
  for (let item in newVal) {
    if (Array.isArray(newVal[item])) {
      if (!oldVal[item]) oldVal[item] = [];
      if (!newVal[item]) newVal[item] = [];
      if (oldVal[item].length !== newVal[item].length) {
        return (isEq = false);
      }
      for (let i = 0; i < newVal[item].length; i++) {
        if (
          newVal[item][i] !== oldVal[item][i] &&
          typeof newVal[item] !== "object"
        ) {
          isEq = false;
          console.log(item);
          break;
        } else if (
          JSON.stringify(newVal[item][i]) !== JSON.stringify(oldVal[item][i])
        ) {
          isEq = false;
          console.log(item);
          break;
        }
      }
    } else if (
      typeof newVal[item] === "boolean" ||
      typeof newVal[item] === "number"
    ) {
      if (newVal[item] !== oldVal[item]) {
        isEq = false;
        console.log(item);
        break;
      }
    } else {
      if (!oldVal[item]) oldVal[item] = "";
      if (!newVal[item]) newVal[item] = "";
      if (newVal[item] !== oldVal[item]) {
        isEq = false;
        console.log(item);
        break;
      }
    }
  }
  return isEq;
}

// 文件下载
export function downFile(url, name) {
  if (navigator.msSaveBlob) {
    axios({
      method: "get",
      url,
      responseType: "blob"
    }).then(res => {
      window.navigator.msSaveOrOpenBlob(res.data, name);
    });
  } else {
    var ele = document.createElement("a");
    ele.download = "" || name;
    ele.style.display = "none";
    ele.href = url;
    ele.mce_href = "#";
    ele.target = "_blank";
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
  }
}

/*
 *@author: lixiaorui
 *@date: 2020-11-24 17:38:33
 *@str: 要复制字符串
 *@cb: 复制成功后的回调
 *@description: 文本复制
 */
export function copyText(str, cb) {
  if (!document.queryCommandSupported("copy")) {
    throw new Error("document.execCommand method not support copy command");
  } else {
    const input = document.createElement("textarea");
    input.id = "11";
    input.style.cssText =
      "display: block;opacity: 0;position: absolute;left: -10000px;top: -10000px;z-index: -1;width: 1px;height: 1px;";
    input.value = str;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      console.log(e);
    }
    document.body.removeChild(input);
    cb();
  }
}

// // emoji表情解码
// export function entitiestoUtf16(content) {
//   return content.replace(/&#(\d+);/g, (word, item) => {
//     return String.fromCharCode(item);
//   });
// }
