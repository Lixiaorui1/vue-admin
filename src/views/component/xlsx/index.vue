<template>
  <div class="xlsx_demo">
    <el-button type="primary" @click="importExcel">
      导出excel
    </el-button>
    <div>
      {{ data }}
    </div>
    <div v-html="tableHtml"></div>
  </div>
</template>

<script>
import { exportExcel, importExcel } from "@/components/xlsx/index.js";
export default {
  name: "XlsxDemo",
  props: {},
  components: {},
  data() {
    return {
      data: [],
      tableHtml: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  beforeDestroy() {},
  methods: {
    importExcel() {
      importExcel((data, dataRef, html) => {
        console.log(data, dataRef, html);
        this.data = data;
        this.tableHtml = html;
      });
    }
  }
};
</script>

<style lang="scss">
.xlsx_demo {
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 21, 41, 0.09);
  border-radius: 4px;
  padding: 20px;
  table,
  tr,
  td {
    border: 1px solid black;
  }
  table {
    border-collapse: collapse;
  }
}
</style>
