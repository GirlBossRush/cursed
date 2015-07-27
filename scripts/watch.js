var
  port = 8080,
  webpack = require("webpack"),
  WebpackDevServer = require("webpack-dev-server"),
  config = require("../webpack.config")

new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    assets: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    timings: true,
    version: false
  }

}).listen(port, "localhost", function (err) {
  if (err) {
    console.log(err)
  }

  console.log("Listening at localhost:" + port)
})
