import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

/**
 * 概览-应用列表
 * @param {Object} data
 * {
 *    pageSize: 10,
 *    pageStart: 1,
 *    strOrder:
 *    type: 1用户分析  2充值分析
 * }
 */
export function queryApplicationList(data) {
  return request({
    url: "/targetAdmin/appList",
    method: "post",
    data
  });
}

/***
 * 概览-概览
 */
export function queryOverViewCard(data) {
  return request({
    url: "/targetAdmin/overView",
    method: "post",
    data
  });
}
