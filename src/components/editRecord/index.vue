<template>
  <div class="edit_record">
    <div v-for="(item, index) in data" :key="index" class="edit_record_row">
      <div class="edit_record_row_left">
        <slot name="before" :row="item"> </slot>
      </div>
      <div class="edit_record_row_right">
        <div class="edit_record_row_icon"></div>
        <div class="edit_record_row_content">
          <div class="edit_record_row_title">
            <slot name="title" :row="item">
              {{ item.createTime }}
            </slot>
          </div>
          <div class="edit_record_row_desc" name="desc" :row="item">
            <slot name="desc" :row="item">
              {{ item.detail }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditRecord",
  props: ["data"]
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.edit_record {
  .edit_record_row {
    display: flex;
    margin-top: 16px;
    position: relative;
    &:first-of-type {
      .edit_record_row_icon {
        border-color: var(--themeColor);
      }
    }
    &:last-of-type {
      .edit_record_row_icon::after {
        display: none;
      }
    }

    .edit_record_row_left {
      line-height: 16px;
    }
    .edit_record_row_right {
      position: relative;
      display: flex;
      flex: 1;
    }
    .edit_record_row_icon {
      width: 9px;
      height: 9px;
      margin-top: 4px;
      border-radius: 50%;
      border: 2px solid #ccc;
      margin-right: 8px;
      &::after {
        content: " ";
        width: 1px;
        background: #ccc;
        height: calc(100% + 13px);
        position: absolute;
        left: 4px;
        top: 13px;
      }
    }
    .edit_record_row_content {
      flex: 1;
    }
    .edit_record_row_title {
      font-size: 14px;
      color: #0d0d0d;
      line-height: 16px;
      word-break: break-all;
    }
    .edit_record_row_desc {
      font-size: 14px;
      margin-top: 5px;
      color: #777777;
      line-height: 22px;
    }
  }
}
</style>
