<template>
  <span class="radio-select" :style="`width: ${width}px`">
    <el-popover
      placement="bottom-start"
      trigger="click"
      popper-class="radio-select-content"
      ref="popover"
      :width="width"
      @show="show"
      @hide="hide"
    >
      <span slot="reference">
        <span
          :class="{
            'screen-select-label': true,
            'label-deep-color': showPopper
          }"
        >
          <span class="select-label-name">{{ labelName }}</span>
          <i class="iconfont iconxialajiantou select-down"></i>
        </span>
      </span>
      <el-radio-group v-model="checkValue" @change="change">
        <el-radio v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-popover>
  </span>
</template>

<script>
export default {
  props: ["list", "label", "value", "width"],
  data() {
    return {
      checkValue: this.value === undefined ? "" : this.value,
      showPopper: false
    };
  },
  watch: {
    value() {
      this.checkValue = this.value === undefined ? "" : this.value;
    }
  },
  computed: {
    labelName: function() {
      const current = this.list.find(item => item.id === this.checkValue) || {};
      const name = current.name || "请选择";
      return `${this.label}：${name}`;
    }
  },
  methods: {
    change(list) {
      this.$emit("input", this.checkValue);
      this.$emit("change", this.checkValue);
    },
    show() {
      this.showPopper = true;
    },
    hide() {
      this.showPopper = false;
    }
  }
};
</script>

<style lang="scss">
.radio-select-content {
  margin-top: 2px !important;
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  .popper__arrow {
    display: none !important;
  }
  .el-radio {
    color: #172b4d;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-color: var(--themeColor);
    border-color: var(--themeColor);
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: var(--themeColor);
  }
  .el-radio {
    line-height: 32px;
    padding-left: 10px;
    margin-right: 0;
    width: 100%;
    display: inline-block;
  }
  .el-radio:hover {
    background: #e6edf6;
  }
}
.radio-select {
  display: inline-block;
  .el-popover__reference {
    width: 100%;
    display: inline-block;
  }

  .screen-select-label:hover {
    background: #dfe2e7;
  }
  .screen-select-label:focus {
    background: #dfe2e7;
  }
  .screen-select-label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #172b4d;
    border-radius: 4px;
    line-height: 30px;
    padding: 0 8px 0 10px;

    .select-down {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      color: #172b4d;
    }
    .select-label-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      overflow: hidden;
      flex: 1;
      font-size: 14px;
      cursor: pointer;
    }
    .select-label-icon {
      vertical-align: middle;
      display: inline;
      line-height: inherit;
    }
  }
  .label-deep-color {
    background: #06367c;
    color: #fff;
  }
  .label-deep-color:hover {
    background: #06367c;
  }
}
</style>
