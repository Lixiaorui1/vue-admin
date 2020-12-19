<template>
  <div>
    <el-menu-item v-if="hasNoChild" :index="row.path">
      {{ row.name }}
    </el-menu-item>
    <el-submenu v-else :index="row.name">
      <template slot="title">
        <span>{{ row.name }}</span>
      </template>
      <SiderBarItem v-for="item in children" :key="item.name" :row="item">
      </SiderBarItem>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SiderBarItem",
  props: {
    row: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    hasNoChild() {
      if (!this.row.children) {
        return true;
      } else {
        return false;
      }
    },
    children() {
      const path = this.row.path;
      let list;
      if (this.row.children) {
        return this.row.children.map(item => ({
          ...item,
          path: `${path}/${item.path}`
        }));
      } else {
        return [];
      }
    }
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="scss"></style>
