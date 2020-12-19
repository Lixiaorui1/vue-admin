<template>
  <div class="input_list">
    <div class="input_list_item" v-for="(item, index) in list" :key="index">
      <el-select
        v-model="item.type"
        placeholder="请选择"
        @change="inputChange"
        style="width: 119px"
      >
        <el-option value="客服微信"> </el-option>
        <el-option value="客服QQ"> </el-option>
        <el-option value="公众号"> </el-option>
        <el-option value="客服电话"> </el-option>
      </el-select>
      <el-input
        v-model="item.detail"
        placeholder="请填写详细信息"
        autocomplete="off"
        class="input_list_input"
        @change="inputChange"
        @input="inputChange"
      >
      </el-input>
      <i
        class="el-icon-error"
        @click="remove(index)"
        v-if="list.length > 1"
      ></i>
      <i
        class="el-icon-circle-plus"
        v-if="list.length < limit && index === list.length - 1"
        @click="add"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputList",
  props: ["value", "limit"],
  components: {},
  data() {
    return {
      list: [{}]
    };
  },
  computed: {},
  watch: {
    value(val) {
      if (val.length) {
        this.list = val;
      } else {
        this.list = [{}];
      }
    }
  },
  methods: {
    add() {
      this.list.push({});
      this.inputChange();
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    inputChange() {
      this.$emit("input", this.list);
      this.$emit("change", this.list);
    }
  }
};
</script>

<style lang="scss">
.input_list {
  .input_list_input {
    width: 220px;
    margin-right: 4px;
  }
  .input_list_item {
    margin-top: 20px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .el-icon-warning,
  .el-icon-error {
    color: #989898;
  }
  .el-icon-error {
    cursor: pointer;
  }
  .el-icon-circle-plus {
    color: var(--themeColor);
    cursor: pointer;
  }
}
</style>
