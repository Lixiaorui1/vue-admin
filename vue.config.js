const path = require("path");
const webpack = require("webpack");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = defaultSettings.title || "vue Admin Template"; // page title
// 如果端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac:sudo npm run
// 您可以通过以下方法更改端口：
// 端口=9528 npm运行开发或npm运行开发--端口=9528
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// 所有配置项说明都可以在中找到https://cli.vuejs.org/config/配置/
module.exports = {
  // 如果计划在子路径下部署站点，则需要设置publicPath，
  // 例如GitHub页面。如果您计划将站点部署到https://foo.github.io/bar网站/,
  // 那么publicPath应该设置为“/bar/”。
  // 在大多数情况下，请使用“/”！！！
  // 详细信息：https://cli.vuejs.org/config/#publicpath
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        "@com": resolve("src/components/common"),
        "@bus": resolve("src/components/bussiness")
      }
    },
    plugins: [new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })]
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );
    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
