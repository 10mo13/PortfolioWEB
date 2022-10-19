const loader = require("css-loader");

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",
  
    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
      // contentBase: "dist",
      // open: true
      static: {
        directory: './dist'
      },
    },
    
    entry: "./src/index.js",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.css$/,
        // //css-loader setting
        // loader: "css-loader",
        // options: {
        //   options: { url: false }
        // },

        // //css-loader
        // use:[
        //   "style-loader",
        //   {
        //     loader: "css-loader",
        //     options: { url: false }
        //   }
        // ]
        use:
        [
          {
            
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env"
              ]
            }
          },
          'style-loader',
            {loader: 'css-loader', options: {url: false}},
        ]
      }
    ]
  }
  };