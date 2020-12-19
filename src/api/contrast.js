import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

/**
 * 数据对比-应用概览
 */
export function queryDataAppList(data) {
  return request({
    url: "/targetAdmin/appOverView",
    method: "post",
    data
  });
}

/**
 * 数据对比-趋势分析
 */
export function queryDataAnalysisList(data) {
  return request({
    url: "/targetAdmin/trendAnalysis",
    method: "post",
    data
  });
}
