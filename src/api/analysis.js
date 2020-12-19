import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

/**
 * 找神途分析-数据明细
 */
export function queryDataDetail(data) {
  return request({
    url: "/targetAdmin/zhaoStList",
    method: "post",
    data
  });
}

/**
 * 找神途分析-概览
 */
export function queryOverCard(data) {
  return request({
    url: "/targetAdmin/zhaoStOverView",
    method: "post",
    data
  });
}

/**
 * 找神途分析-趋势分析
 */
export function queryAnalysisData(data) {
  return request({
    url: "/targetAdmin/zhaoStTrendAnalysis",
    method: "post",
    data
  });
}
