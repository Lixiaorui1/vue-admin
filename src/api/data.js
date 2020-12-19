import request from "@/utils/request";
const UnixTime = () => Math.floor(new Date().getTime());

export async function getCard(data) {
  // 问题类型
  return {
    entity: {
      benfu: 22222,
      guanggao: 666,
      dianji: 888,
      jinru: 999
    }
  };
  return request({
    url: "/smallTarget/feedback/feedbackType",
    method: "post",
    data
  });
}

export async function getCoinData(data) {
  // 问题类型
  return {
    entity: [
      {
        id: "2012-12-16",
        questionType: "122",
        detail: "555",
        appVersion: "222"
      }
    ],
    count: 32
  };
  return request({
    url: "/smallTarget/feedback/feedbackType",
    method: "post",
    data
  });
}

export async function getAdverData(data) {
  // 问题类型
  return {
    entity: [
      {
        id: "2012-12-11",
        questionType: "12223",
        detail: "555321",
        appVersion: "222231",
        createTime: "231231"
      }
    ],
    count: 321
  };
  return request({
    url: "/smallTarget/feedback/feedbackType",
    method: "post",
    data
  });
}
