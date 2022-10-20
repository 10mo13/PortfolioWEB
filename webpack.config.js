let path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    path: `${__dirname}/dist`,
    filename: "main.js"
  },
  module: {
    rules: [
      {
        //cssだけだとエラーになるので注意。ちゃんと(scss|css)と書く
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  devServer: {
    //contentBaseは古いバージョンなのでこっちの書き方で
    static: {
        directory: './dist'
    },
    // contentBase: path.join(__dirname, "public"),

    //なんかなくてもライブリロードで動く
    //publicPath: "/dist/", // livereloadに必要、bundleしたファイルの置き場を指定
    //watchContentBase: true, // livereloadに必要、contentBaseにあるファイルの変更を検出するための設定
    open: true, // 起動時にブラウザを自動で開く
  },
};