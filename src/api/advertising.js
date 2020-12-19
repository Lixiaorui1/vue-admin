import request from "@/utils/request";
import { resolve } from "tinymce";
const UnixTime = () => Math.floor(new Date().getTime());

export function adList(data) {
  // 广告列表
  return request({
    url: "/smtBackground/adList",
    method: "post",
    data
  });
}

export function getServerDetail(data) {
  // 获取区服信息详情
  return request({
    url: `/smtBackground/getServerDetail/${data.id}?${UnixTime()}`,
    method: "get"
  });
}

export function getGameName(data) {
  // 获取游戏名称
  return request({
    url: `/smtBackground/getGameName/${data.id}?${UnixTime()}`,
    method: "get"
  });
}

export function adAdd(data) {
  // 代理商新增广告
  return request({
    url: `/smtBackground/adAdd`,
    method: "post",
    data
  });
}

export function adAddAdmin(data) {
  // 管理员新增广告
  return request({
    url: `/smtBackground/adAddAdmin`,
    method: "post",
    data
  });
}

export function adEdition(data) {
  // 代理商提交版本信息
  return request({
    url: `/smtBackground/adEdition`,
    method: "post",
    data
  });
}

export function adUpdate(data) {
  // 修改广告
  return request({
    url: `/smtBackground/adUpdate`,
    method: "post",
    data
  });
}

export function accessoryDetail(data) {
  // 附属详情
  return request({
    url: `/smtBackground/accessoryDetail`,
    method: "post",
    data
  });
}

export function calculateCost(data) {
  // 计算广告费用
  return request({
    url: `/smtBackground/calculateCost`,
    method: "post",
    data
  });
}

export function adPay(data) {
  // 广告支付
  return request({
    url: `/smtBackground/adPay`,
    method: "post",
    data
  });
}

export function checkBalance(data) {
  // 查询余额
  return request({
    url: `/smtBackground/checkBalance`,
    method: "post",
    data
  });
}

export function adDetail(data) {
  // 广告详情
  return request({
    url: `/smtBackground/adDetail`,
    method: "post",
    data
  });
}

export function updApprovalStatus(data) {
  // 修改审核状态
  return request({
    url: `/smtBackground/updApprovalStatus`,
    method: "post",
    data
  });
}

export function updOnlineStatus(data) {
  // 修改上下线状态
  return request({
    url: `/smtBackground/updOnlineStatus`,
    method: "post",
    data
  });
}

export function adHistory(data) {
  // 广告历史记录
  return request({
    url: `/smallTarget/history/adHistory`,
    method: "post",
    data
  });
}

export function getDic(data) {
  // 字典
  return new Promise(resolve => {
    request({
      url: `/smtBackground/getDic?${UnixTime()}`,
      method: "get"
    }).then(res => {
      const data = res.entity.reduce((pre, item) => {
        pre[item.id] = item.list;
        return pre;
      }, {});
      resolve(data);
    });
  });
}

export function adEditionList(data) {
  // 模板列表
  return request({
    url: `/smallTarget/edition/adEditionList`,
    method: "post",
    data
  });
}

export function adEditionDel(data) {
  // 删除模板
  return request({
    url: `/smallTarget/edition/adEditionDel`,
    method: "post",
    data
  });
}

export function agentGetPropMaterializes(data) {
  // 代理商获取道具模板列表;
  return request({
    url: `/smallTarget/prop/agentGetPropMaterializes`,
    method: "post",
    data
  });
}

export function accountPoints(data) {
  // 代理商账户积分;
  return request({
    url: `/smallTarget/score/accountPoints`,
    method: "post",
    data
  });
}

export function advertPayPoints(data) {
  // 广告支付积分;
  return request({
    url: `/smallTarget/score/advertPayPoints`,
    method: "post",
    data
  });
}
