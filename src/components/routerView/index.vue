<template>
  <div class="router_view" v-if="isRouterShow">
    <keep-alive v-if="$route.meta && $route.meta.keepAlive">
      <router-view> </router-view>
    </keep-alive>
    <router-view v-else> </router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store/index";
export default {
  name: "MyRouterView",
  computed: { ...mapGetters(["isRouterShow"]) }
};
</script>

<style lang="scss" scoped></style>
