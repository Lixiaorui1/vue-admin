export const TABLE_COLUMS = [
  {
    type: "select"
  },
  {
    label: "姓名",
    prop: "name",
    key: "name",
    align: "left",
    noTooltip: true,
    minWidth: "75"
  },
  {
    label: "性别",
    prop: "sex",
    key: "sex",
    align: "left",
    minWidth: "75"
  },
  {
    label: "年龄",
    prop: "age",
    key: "age",
    align: "left",
    sortable: "custom",
    minWidth: "75"
  },
  {
    label: "住址",
    prop: "address",
    key: "address",
    align: "left",
    minWidth: "75"
  },
  {
    label: "操作",
    prop: "edit",
    key: "edit",
    align: "left",
    width: "100"
  }
];

export const TABLE_DATA = [
  {
    name: "张三",
    sex: "男",
    age: 23,
    address: "XXXXXXXXXXXXXXXX"
  }
];
