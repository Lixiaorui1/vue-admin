<template>
  <div class="tags_view">
    <draggable v-model="visitedViews">
      <transition-group name="fade-transform" mode="out-in">
        <router-link
          v-for="item in visitedViews"
          :to="item.path"
          :key="item.path"
          class="tags-view-item"
        >
          {{ item.name }}
          <span
            class="el-icon-close"
            @click.prevent.stop="delSelectTag(item)"
          ></span>
        </router-link>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "TagsView",
  props: {},
  components: { draggable },
  computed: {
    visitedViews: {
      get() {
        return this.$store.state.app.visitedViews;
      },
      set(val) {
        this.$store.dispatch("app/setVisitedViews", val);
      }
    }
  },
  watch: {
    $route() {
      this.addViewTags();
    }
  },
  created() {
    this.addViewTags();
  },
  beforeDestroy() {},
  methods: {
    delSelectTag(item) {
      this.$store.dispatch("app/delVisitedViews", item);
    },
    addViewTags() {
      if (this.$route.name) {
        const route = this.$route;
        this.$store.dispatch("app/addVisitedViews", route);
        this.$store.dispatch("app/setRouterShow", false);
        this.$nextTick(() => {
          this.$store.dispatch("app/setRouterShow", true);
          document.title = this.$route.name;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tags_view {
  background: #fff;
  box-shadow: 1px 0 6px 0 rgba(0, 21, 41, 0.09);
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  .tags-view-item {
    font-size: 14px;
    border: 1px solid #dcdfe6;
    padding: 4px 25px 4px 10px;
    border-radius: 4px;
    margin-left: 6px;
    position: relative;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      background: var(--hoverColor);
      .el-icon-close {
        display: block;
      }
    }
    .el-icon-close {
      margin-left: 8px;
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      &:hover {
        border-radius: 50%;
      }
    }
    &.router-link-active {
      padding-left: 20px;
      background: var(--themeColor);
      border-color: var(--themeColor);
      color: #fff;
      &::before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 7px;
        top: 8px;
      }
    }
  }
}
</style>
