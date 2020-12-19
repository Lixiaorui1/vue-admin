import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export function loggerList(data) {
  // 登录器列表
  return request({
    url: "/smallTarget/logger/loggerListNew",
    method: "post",
    data
  });
}

export function loggerDetail(data) {
  // 登录器详情
  return request({
    url: `/smallTarget/logger/loggerDetail/${data.id}?${UnixTime()}`,
    method: "get"
  });
}

export function agentInfo(data) {
  // 获取代理商信息
  return request({
    url: `/smallTarget/logger/agentInfo/${data.id}?${UnixTime()}`,
    method: "get"
  });
}

export function groupInfo(data) {
  // 获取分组信息
  return request({
    url: `/smallTarget/logger/groupInfo`,
    method: "post",
    data
  });
}

export function loggerAdd(data) {
  // 新增登录器
  return request({
    url: "/smallTarget/logger/loggerAddNew",
    method: "post",
    data
  });
}

export function loggerAddChild(data) {
  // 新增登录器子包
  return request({
    url: "/smallTarget/logger/savaSubLoggerNew",
    method: "post",
    data
  });
}

export function loggerUpd(data) {
  // 修改登录器
  return request({
    url: "/smallTarget/logger/loggerUpdNew",
    method: "post",
    data
  });
}

export function loggerDel(data) {
  // 删除登录器
  return request({
    url: `/smallTarget/logger/loggerDelNew/${data.id}`,
    method: "get"
  });
}

export function loggerHistory(data) {
  // 登录器历史列表;
  return request({
    url: `/smallTarget/history/loggerHistory`,
    method: "post",
    data
  });
}

export function perUpgrade(data) {
  // 登录器(推广员子包)升级，版本对照;
  return request({
    url: `/smallTarget/logger/perUpgrade/${data.id}?${UnixTime()}`,
    method: "get"
  });
}
