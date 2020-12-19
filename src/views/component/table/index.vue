<template>
  <div class="component_table">
    <page-table
      :tableData="tableData"
      :total="total"
      :featchData="featchData"
      ref="pageTable"
      :defaultSort="{ prop: 'age', order: 'descending' }"
      :tableColumns="tableColumns"
      @pageChange="handlePageChange"
      @sortChange="handleSortChange"
    >
      <template #edit="scope">
        <el-button @click="detail(scope.row)">详细</el-button>
      </template>
    </page-table>
  </div>
</template>

<script>
import pageTable from "@/components/pageTable";
import { TABLE_COLUMS, TABLE_DATA } from "./const";
export default {
  name: "TableDemo",
  props: {},
  components: { pageTable },
  data() {
    return {
      tableData: [],
      tableColumns: TABLE_COLUMS,
      featchData: {
        pageSize: 20,
        pageStart: 1
      },
      total: 0
    };
  },
  computed: {},
  watch: {},
  created() {
    this.search();
  },
  beforeDestroy() {},
  methods: {
    detail(row) {
      console.log(row);
    },
    search() {
      this.tableData = TABLE_DATA;
    },
    handlePageChange(val) {
      if (val.pageSize !== this.featchData.pageSize) {
        this.featchData.pageStart = 1;
        val.pageStart = 1;
      }
      this.featchData = {
        ...this.featchData,
        ...val
      };
      console.log(val);
      this.search();
    },
    handleSortChange(column) {
      this.featchData = {
        ...this.featchData,
        ...column
      };
      console.log(column);
      this.search();
    }
  }
};
</script>

<style lang="scss">
.component_table {
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 21, 41, 0.09);
  border-radius: 4px;
  padding: 20px;
}
</style>
