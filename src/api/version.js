import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export function versionList(data) {
  // 版本列表
  return request({
    url: "/smtVersion/versionList",
    method: "post",
    data
  });
}

export function saveVersion(data) {
  // 新增版本
  return request({
    url: "/smtVersion/saveVersion",
    method: "post",
    data
  });
}

export function hisVersionList(data) {
  // 历史版本列表
  return request({
    url: `/smtVersion/hisVersionList/${data.id}`,
    method: "post"
  });
}

export function fallback(data) {
  // 回退历史版本
  return request({
    url: `/smtVersion/fallback`,
    method: "post",
    data
  });
}

export function versionHistory(data) {
  // 版本历史记录
  return request({
    url: `/smallTarget/history/versionHistory`,
    method: "post",
    data
  });
}

export async function versionIntervalHistory(data) {
  // 版本区间历史记录
  return request({
    url: `/smallTarget/history/versionIntervalHistory`,
    method: "post",
    data
  });
}
