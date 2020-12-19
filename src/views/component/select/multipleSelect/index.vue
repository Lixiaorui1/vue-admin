<template>
  <div class="multiple_select">
    <multiple-select
      label="按时间"
      :list="list"
      :width="130"
      v-model="select"
      @change="selectChange"
    ></multiple-select>
  </div>
</template>

<script>
import multipleSelect from "@/components/multipleSelect";
import { LIST } from "../radioSelect/const";
export default {
  name: "MultipleSelect",
  props: {},
  components: { multipleSelect },
  data() {
    return {
      list: LIST,
      select: [1, 2, 3]
    };
  },
  computed: {},
  watch: {},
  created() {},
  beforeDestroy() {},
  methods: {
    selectChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
