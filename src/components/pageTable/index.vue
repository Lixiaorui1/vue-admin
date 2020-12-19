<template>
  <div class="clearfix table_with_page_new">
    <el-table
      style="width: 100%"
      :data="tableData"
      v-loading="loading"
      highlight-current-row
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
      :default-sort="defaultSort"
      ref="elTable"
    >
      <el-table-column
        type="selection"
        v-if="tableColumns[0].type"
        align="center"
      ></el-table-column>
      <template v-for="item in filterColumns">
        <table-column
          v-if="item.children && item.children.length"
          :key="item.label"
          :item="item"
          :width="item.width"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          show-overflow-tooltip
          :prop="item.prop"
          :align="item.align || 'center'"
          :sort-orders="['descending', 'ascending']"
        >
          <template slot-scope="scope">
            <slot :name="item.key" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :key="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.noTooltip ? false : true"
          :align="item.align || 'center'"
          :sort-orders="['descending', 'ascending']"
        >
          <template slot-scope="scope">
            <slot :name="item.key" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="clearfix"><slot name="table-footer"></slot></div>
    <div class="table_page" v-if="hasPage">
      <el-pagination
        ref="pagination"
        layout="total, sizes, prev, pager, next"
        @size-change="handlePageChange"
        :page-sizes="[20, 50, 100]"
        :current-page.sync="featchData.pageStart"
        :page-size="featchData.pageSize"
        :total="total"
        @current-change="handlePageChange"
      >
      </el-pagination>
      <div class="pageJumper">
        到 &nbsp;
        <el-input v-model="jumpNum" size="mini" />&nbsp; 页 &nbsp;
        <el-button size="mini" @click="jumpPage" id="jumpButton"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
/*
 *@author: maoyuchao
 *@date: 2020-08-26 15:41:12
 *@description: 封装table加分页组件
 */
import tableColumn from "./tableColumn";

export default {
  data() {
    return {
      jumpNum: ""
    };
  },
  computed: {
    filterColumns: function() {
      return this.tableColumns.filter(item => !item.type);
    }
  },
  components: { tableColumn },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 1
    },
    featchData: {
      // 搜索条件
      type: Object,
      default: () => {}
    },
    tableColumns: {
      // columns数据
      type: Array,
      default: () => []
    },

    defaultSort: {
      type: Object,
      default: () => {}
    },
    sortChange: {
      type: Function,
      default: v => v
    },
    hasPage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    tableData: function() {
      $(".app_main").scrollTop(0);
    }
  },
  methods: {
    handlePageChange() {
      const { internalCurrentPage, internalPageSize } = this.$refs.pagination;
      this.$emit("pageChange", {
        pageStart: internalCurrentPage,
        pageSize: internalPageSize
      });
    },

    handleSortChange({ column, prop, order }) {
      if (column.order) {
        const order = column.order.replace("ending", "");
        const obj = {
          sortBool: column.order === "ascending" ? false : true,
          sortType: this.toLine(column.property)
        };
        this.$forceUpdate();
        this.$emit("sortChange", obj);
        return false;
      }
    },
    jumpPage() {
      const { currentPage, pageSize, total } = this.$refs.pagination;
      const lastPageNum = Math.ceil(total / pageSize);
      if (this.jumpNum > lastPageNum) {
        this.jumpNum = lastPageNum;
      }
      this.featchData.pageStart = +this.jumpNum;
      document.getElementById("jumpButton").blur();
      this.$emit("pageChange", {
        pageStart: +this.jumpNum,
        pageSize: pageSize
      });
    },

    toLine(name) {
      return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    },

    clearSelection() {
      this.$refs.elTable.clearSelection();
    },

    handleSelectionChange(val) {
      this.$emit("selectionChange", val);
    },

    setCurrentRow(row) {
      this.currentRow = row;
      this.$refs.elTable.setCurrentRow(row);
    }
  }
};
</script>

<style lang="scss">
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
.table_with_page_new {
  width: 100%;
  border-radius: 4px;
  .el-table {
    .el-table__header-wrapper {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .ascending .sort-caret.ascending {
      border-bottom-color: var(--themeColor);
    }
    .descending .sort-caret.descending {
      border-top-color: var(--themeColor);
    }
    .el-button--default {
      // width: 40px;
      height: 22px;
      padding: 0 6px;
    }
    .el-button--text {
      color: var(--themeColor);
      padding: 0;
      &:hover {
        color: var(--btHoverColor);
      }
      &:active {
        color: var(--btActiveColor);
      }
      &:focus {
        color: var(--themeColor);
      }
    }
    .el-button + .el-button {
      margin-left: 4px;
    }
    thead {
      tr {
        th {
          padding: 0;
          background-color: #f2f3f7;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          font-weight: 600;
          color: #777777;
          .cell {
            padding: 0 0 0 10px;
            line-height: 50px;
          }
        }
      }
    }
    .el-table__body-wrapper {
      tr {
        td {
          padding: 0;
          border-bottom: 1px solid #f2f3f7;
          .cell {
            padding: 0 0 0 10px;
            line-height: 35px;
            .sort_item_right {
              padding-right: 24px;
            }
          }
        }
        &:hover {
          td {
            background: var(--hoverColor);
          }
        }
        &.current-row {
          td {
            background: var(--hoverColor);
          }
        }
      }
      .ellipsis_data {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        display: inline-block;
        line-height: 16px;
        position: relative;
        top: 2px;
      }
    }
  }

  .table_page {
    text-align: right;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #fff;
    .el-pagination {
      margin: 11px 6px 11px 0;
      .el-pager {
        .number {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #777777;
          &.active {
            color: var(--themeColor);
          }
        }
      }
      button {
        color: #404040;
      }
      button:disabled {
        color: #ccc;
      }
    }
    // 分页样式
    .el-pagination {
      font-weight: normal;
      .el-pagination__total {
        height: 30px !important;
        line-height: 30px !important;
      }
      .el-input__inner {
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
      }
      .el-pager {
        padding-right: 5px;
        li {
          min-width: 0;
        }
        .more {
          background: transparent;
          padding: 0 4px 0 6px;
        }
      }
      .el-pager .number,
      .btn-prev,
      .btn-next {
        border: 1px solid #dcdfe6;
        margin-left: 5px;
        border-radius: 5px;
        width: 30px;
        min-width: 0;
        text-align: center;
        padding: 0;
        height: 30px;
        line-height: 30px;
      }

      .btn-next {
        margin-left: 0px;
      }

      .active {
        border-color: var(--themeColor);
        background: var(--themeColor);
        color: #fff !important;
      }
    }
    .pageJumper {
      font-size: 13px;
      position: relative;
      .el-input--mini {
        top: -1px;
        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
      .el-button--mini,
      .el-button--small {
        font-size: 14px;
        height: 30px;
      }
      .el-input {
        display: inline-block;
        width: 40px;
        margin: 0 5px;
        input {
          padding: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
