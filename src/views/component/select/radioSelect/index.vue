<template>
  <div class="radio_select">
    <radio-select
      label="按时间"
      :list="list"
      :width="130"
      v-model="select"
      @change="selectChange"
    ></radio-select>
  </div>
</template>

<script>
import radioSelect from "@/components/radioSelect";
import { LIST } from "./const";
export default {
  name: "RadioSelect",
  components: { radioSelect },
  data() {
    return {
      list: LIST,
      select: 0
    };
  },
  methods: {
    selectChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
