import Vue from "vue";
import Router from "vue-router";
import component from "./component";
import failed from "./404";
import home from "./home";

Vue.use(Router);

export const errFunc = function(err) {
  console.log(err);
  const r = confirm("当前版本有更新，请刷新页面");
  if (r == true) {
    window.location.reload();
  }
};

export const constantRoutes = [
  {
    path: "/login",
    component: () =>
      import("@/views/login").catch(err => {
        errFunc(err);
      })
  },
  {
    path: "/",
    redirect: "/index",
    component: () => import("@/layout"),
    children: [
      ...home, // 首页
      ...component, // 组件示例
      ...failed
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
