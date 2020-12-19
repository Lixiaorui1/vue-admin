import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export function agentGetProps(data) {
  return request({
    url: "/smallTarget/prop/agentGetProps",
    method: "post",
    data
  });
}

export function agentsBuyProps(data) {
  // 代理商购买道具
  return request({
    url: "/smallTarget/score/agentsBuyProps",
    method: "post",
    data
  });
}

export function agentMyProps(data) {
  // 代理商我的道具列表
  return request({
    url: "/smallTarget/prop/agentMyProps",
    method: "post",
    data
  });
}
