import { errFunc } from "./index";

export default [
  {
    path: "index",
    name: "首页",
    component: () =>
      import("@/views/home").catch(err => {
        errFunc(err);
      })
  }
];
