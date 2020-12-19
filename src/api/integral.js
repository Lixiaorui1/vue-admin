import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export function intergralList(data) {
  // 积分列表
  return request({
    url: "/smallTarget/score/adminiPointsAccounts",
    method: "post",
    data
  });
}

export function adminiAddPointsAccount(data) {
  // 积分增加
  return request({
    url: "/smallTarget/score/adminiAddPointsAccount",
    method: "post",
    data
  });
}

export function adminiDeductionPointsAccount(data) {
  // 积分减少
  return request({
    url: "/smallTarget/score/adminiDeductionPointsAccount",
    method: "post",
    data
  });
}

export function pointsIntervalHistory(data) {
  // 积分历史区间记录
  return request({
    url: "/smallTarget/history/pointsIntervalHistory",
    method: "post",
    data
  });
}

export function pointsHistory(data) {
  // 积分历史记录
  return request({
    url: "/smallTarget/history/pointsHistory",
    method: "post",
    data
  });
}
