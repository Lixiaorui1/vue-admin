import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export function feedbackType(data) {
  // 问题类型
  return request({
    url: "/smallTarget/feedback/feedbackType",
    method: "post",
    data
  });
}

export function feedbackList(data) {
  // 信息反馈列表
  return request({
    url: "/smallTarget/feedback/feedbackList",
    method: "post",
    data
  });
}

export function feedbackDetail(data) {
  // 信息反馈详情
  return request({
    url: "/smallTarget/feedback/feedbackDetail",
    method: "post",
    data
  });
}
