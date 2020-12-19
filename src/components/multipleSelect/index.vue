<template>
  <span class="multiple-select" :style="`width: ${width}px`">
    <el-popover
      placement="bottom-start"
      trigger="click"
      :popper-class="`screen-select ${popperClass}`"
      ref="popover"
      @show="show"
      @hide="hide"
      :width="width"
    >
      <span slot="reference" ref="11">
        <span
          :class="{
            'screen-select-label': true,
            'label-deep-color': showPopper
          }"
        >
          <span class="select-label-name">{{ labelName }}</span>
          <!-- <svg-icon icon-class="down" class="select-down" v-if="!showPopper" />
          <svg-icon icon-class="down2" class="select-down" v-else /> -->
          <i class="iconfont iconxialajiantou select-down"></i>
        </span>
      </span>
      <span class="screen-select-clear" @click="reset">清空所选择的内容</span>
      <el-checkbox-group v-model="checkList" @change="change">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-popover>
  </span>
</template>

<script>
export default {
  props: ["list", "label", "value", "popperClass", "width"],
  data() {
    return {
      checkList: this.value || [],
      showPopper: false
    };
  },
  watch: {
    value() {
      this.checkList = this.value || [];
    }
  },
  computed: {
    labelName: function() {
      if (this.checkList.length > 0) {
        const arr = [];
        (this.list || []).forEach(element => {
          this.checkList.forEach(item => {
            if (element.id === item) {
              arr.push(element.name);
            }
          });
        });
        return arr.join(",");
      }
      return `${this.label}：全部`;
    }
  },
  methods: {
    change(list) {
      this.$emit("change", this.checkList);
      this.$emit("input", this.checkList);
    },
    reset() {
      this.checkList = [];
      this.$emit("change", this.checkList);
      this.$emit("input", []);
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
.screen-select {
  margin-top: 2px !important;
  width: 150px;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  font-size: 14px;
  .popper__arrow {
    display: none !important;
  }
  .el-checkbox {
    color: #172b4d;
  }
  .screen-select-clear {
    padding-bottom: 7px;
    color: var(--themeColor);
    display: block;
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
    padding-top: 7px;
  }
  .el-checkbox {
    line-height: 32px;
    padding-left: 10px;
    margin-right: 0;
    width: 100%;
    display: inline-block;
  }
  .el-checkbox:hover,
  .screen-select-clear:hover {
    background: #e6edf6;
  }
}
.multiple-select {
  width: 100%;
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
    cursor: pointer;
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
      font-size: 14px;
      flex: 1;
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
    .select-down {
      color: #fff;
    }
  }
  .label-deep-color:hover {
    background: #06367c;
  }
}
</style>
