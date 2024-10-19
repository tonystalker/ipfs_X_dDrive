const {
  override,
  addBabelPreset,
  addWebpackResolve,
  addWebpackPlugin,
} = require("customize-cra");
const webpack = require("webpack");

module.exports = override(
  addBabelPreset("@babel/preset-env"),
  addWebpackResolve({
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser.js"), // Add `.js` extension explicitly
    },
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser.js", // Provide the polyfill explicitly with `.js`
    })
  )
);
