export const USER_MENU = [
  {
    title: "公告",
    module: "notice", // 用于菜单跳转
    value: "notice", // 用于标识当前选中项
    icon: "icongonggao"
  },
  {
    title: "版本管理",
    module: "version", // 用于菜单跳转
    value: "version", // 用于标识当前选中项
    icon: "iconbanbenguanli",
    role: 0,
    childrenList: [
      {
        title: "版本列表",
        module: "list", // 用于菜单跳转
        value: "versionList", // 用于标识当前选中项
        role: 0
      },
      {
        title: "版本动态",
        module: "record", // 用于菜单跳转
        value: "versionRecord", // 用于标识当前选中项
        role: 0
      }
    ]
  },
  {
    title: "登录器管理",
    module: "lander", // 用于菜单跳转
    value: "lander", // 用于标识当前选中项
    icon: "icondengluqiguanli",
    role: 0,
    childrenList: [
      {
        title: "登录器列表",
        module: "list", // 用于菜单跳转
        value: "landerList", // 用于标识当前选中项
        role: 0
      },
      {
        title: "子包列表",
        module: "child", // 用于菜单跳转
        value: "landerChild", // 用于标识当前选中项
        role: 0
      }
    ]
  },
  {
    title: "广告管理",
    module: "advertising", // 用于菜单跳转
    value: "advertising", // 用于标识当前选中项
    icon: "iconguanggaoguanli"
  },
  {
    title: "积分管理",
    module: "integral", // 用于菜单跳转
    value: "integral", // 用于标识当前选中项
    icon: "iconjifen",
    role: 0,
    childrenList: [
      {
        title: "积分列表",
        module: "list", // 用于菜单跳转
        value: "integralList", // 用于标识当前选中项
        role: 0
      },
      {
        title: "积分动态",
        module: "record", // 用于菜单跳转
        value: "integralRecord", // 用于标识当前选中项
        role: 0
      }
    ]
  },
  {
    title: "积分商城",
    module: "shop", // 用于菜单跳转
    value: "shop", // 用于标识当前选中项
    icon: "iconjifenshangcheng",
    role: 1
  },
  {
    title: "意见反馈",
    module: "opinion", // 用于菜单跳转
    value: "opinion", // 用于标识当前选中项
    icon: "iconyijianfankui",
    role: 0
  },
  {
    title: "概览",
    module: "overview", // 用于菜单跳转
    value: "overview", // 用于标识当前选中项
    icon: "icongailan",
    role: 0
  },
  {
    title: "找神途分析",
    module: "analysis", // 用于菜单跳转
    value: "analysis", // 用于标识当前选中项
    icon: "iconfenxi",
    role: 0
  },
  {
    title: "数据对比",
    module: "contrast", // 用于菜单跳转
    value: "contrast", // 用于标识当前选中项
    icon: "iconshujuduibi",
    role: 0
  },
  {
    title: "数据分析",
    module: "data", // 用于菜单跳转
    value: "data", // 用于标识当前选中项
    icon: "icongailan"
  }
];

export const VERSION_VALUE = 8;
