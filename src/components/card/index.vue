<template>
  <div class="card_container">
    <div :class="'card_content card_content' + cardType">
      <svg class="st_icon card_icon" aria-hidden="true" v-if="cardType === 1">
        <use :xlink:href="cardData.imgIcon"></use>
      </svg>
      <div class="card_title">
        {{ cardData.title }}
        <span class="card_tip">{{ cardData.tip }}</span>
      </div>
      <div class="card_now_number">
        {{ cardData.todayCount }}
        <div class="number_right" v-if="cardType === 2">
          <div class="right_percent" :style="'color:' + cardData.progressColor">
            {{ cardData.todayPercent }}%
          </div>
          <div class="right_progress">
            <div
              class="right_progress_inner"
              :style="
                'width: ' +
                  cardData.todayPercent +
                  '%' +
                  ';background-color:' +
                  cardData.progressColor
              "
            ></div>
          </div>
        </div>
      </div>
      <div class="card_desc" v-if="cardType === 1">
        {{ cardData.desc }} {{ cardData.yestdayCount }}
      </div>
      <div class="card_desc" v-if="cardType === 2">
        {{ cardData.desc1 }}{{ cardData.yestdayCount }}{{ cardData.desc2
        }}{{ cardData.yestdayPercent }}%
      </div>
    </div>
  </div>
</template>

<script>
/*
 *@author: maoyuchao
 *@date: 2020-08-26 14:02:28
 *@description: 卡片组件 需要传入卡片的title、count、desc  tip可传可不传
 */
export default {
  data() {
    return {};
  },
  props: {
    cardData: {
      type: Object,
      default: () => {}
    },
    cardType: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="scss">
.st_icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.card_container {
  width: calc(25% + 6px);
  padding: 0 12px;
  box-sizing: border-box;
  margin: 0 0 24px 0;
  &:nth-of-type(4n + 1) {
    padding-left: 0;
    width: calc(25% - 6px);
  }
  &:nth-of-type(4n) {
    padding-right: 0;
    width: calc(25% - 6px);
  }
  .card_content {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 0 6px 0 rgba(0, 21, 41, 0.09);
    border-radius: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    &1 {
      padding: 12px 16px 12px 20px;
      .card_now_number {
        font-family: GillSans;
        font-size: 36px;
        color: #2e2e36;
        letter-spacing: 0;
        margin: 9px 0 4px 0;
      }
    }
    &2 {
      padding: 16px 20px;
      .card_now_number {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: GillSans;
        font-size: 40px;
        color: #2e2e36;
        letter-spacing: 0;
        margin: 4px 0;
        .number_right {
          .right_percent {
            font-family: HelveticaNeue;
            font-size: 20px;
            letter-spacing: 0;
            margin-bottom: 6px;
          }
          .right_progress {
            width: 72px;
            height: 5px;
            border-radius: 3px;
            background: #f2f2f2;
            overflow: hidden;
            .right_progress_inner {
              height: 5px;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .card_icon {
      float: right;
      font-size: 48px;
    }
    .card_title {
      line-height: 22px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #777777;
      .card_tip {
        font-size: 10px;
        color: #000;
      }
    }
    .card_desc {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #777777;
      line-height: 20px;
    }
  }
}
</style>
