import { errFunc } from "./index";
const RouteView = () =>
  import("@/components/routerView").catch(err => {
    errFunc(err);
  });

export default [
  {
    path: "component",
    name: "组件库",
    component: RouteView,
    children: [
      {
        path: "table",
        name: "分页表格",
        component: () =>
          import("@/views/component/table").catch(err => {
            errFunc(err);
          })
      },
      {
        path: "select",
        name: "下拉选择框",
        component: RouteView,
        children: [
          {
            path: "radio",
            name: "下拉单选框",
            component: () =>
              import("@/views/component/select/radioSelect").catch(err => {
                errFunc(err);
              })
          },
          {
            path: "multiple",
            name: "下拉复选框",
            component: () =>
              import("@/views/component/select/multipleSelect").catch(err => {
                errFunc(err);
              })
          }
        ]
      },
      {
        path: "xlsx",
        name: "excel表格",
        component: () =>
          import("@/views/component/xlsx").catch(err => {
            errFunc(err);
          })
      }
    ]
  }
];
