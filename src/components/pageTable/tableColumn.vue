<template>
  <el-table-column :label="item.label" :prop="item.prop" align="center">
    <template v-for="v in item.children">
      <tableColumn
        v-if="v.children && v.children.length"
        :key="v.id"
        :item="v"
        :width="v.width"
        :min-width="v.minWidth"
        :sortable="v.sortable"
        show-overflow-tooltip
        :prop="v.prop"
        :align="v.align || 'center'"
        :sort-orders="['descending', 'ascending']"
      >
        <template slot-scope="scope">
          <slot :name="v.key" :row="scope.row">
            {{ scope.row[v.prop] }}
          </slot>
        </template>
      </tableColumn>
      <el-table-column
        v-else
        :key="v.name"
        :label="v.label"
        :prop="v.prop"
        :align="v.align || 'center'"
        :width="v.width"
        :min-width="v.minWidth"
        :sortable="v.sortable"
        show-overflow-tooltip
        :sort-orders="['descending', 'ascending']"
      >
        <template slot-scope="scope">
          <slot :name="v.key" :row="scope.row">
            {{ scope.row[v.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "TableColumn",
  props: ["item"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="scss"></style>
