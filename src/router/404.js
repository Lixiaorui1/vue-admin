import { errFunc } from "./index";

export default [
  {
    path: "404",
    component: () =>
      import("@/views/404").catch(err => {
        errFunc(err);
      }),
    meta: { noMenu: true }
  }
];
