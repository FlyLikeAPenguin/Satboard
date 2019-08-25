const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const basePath = `${__dirname}/..`;
const cesiumSource = "node_modules/cesium/Source";

module.exports = {
  context: basePath,
  entry: {
    app: "./src/app.js",
    move: "./src/move.js",
    ot: "./src/ot.js",
    test: "./src/test/test.js",
  },
  output: {
    filename: "[name].[chunkhash:8].js",
    sourceMapFilename: "[name].[chunkhash:8].map",
    chunkFilename: "[id].[chunkhash:8].js",
    path: path.resolve(basePath, "dist"),
    // Needed by Cesium for multiline strings
    sourcePrefix: ""
  },
  amd: {
    // Enable webpack-friendly use of require in cesium
    toUrlUndefined: true
  },
  node: {
    // Avoid including node libraries
    fs: "empty",
    Buffer: false,
    http: "empty",
    https: "empty",
    zlib: "empty"
  },
  resolve: {
    alias: {
      // Cesium module name
      cesium: path.resolve(basePath, cesiumSource),
      "vue$": "vue/dist/vue.esm.js",
    }
  },
  externals: {
    // CesiumSensorVolumes: "CesiumSensorVolumes",
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
      ]
    }, {
      test: /\.vue$/,
      loader: "vue-loader"
    }, {
      test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
      use: ["url-loader"]
    }],
    unknownContextCritical: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]cesium/,
          name: "cesium",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      chunks: ["app", "cesium"]
    }),
    new HtmlWebpackPlugin({
      filename: "move.html",
      template: "src/index.html",
      chunks: ["move", "cesium"]
    }),
    new HtmlWebpackPlugin({
      filename: "ot.html",
      template: "src/index.html",
      chunks: ["ot", "cesium"]
    }),
    new HtmlWebpackPlugin({
      filename: "embedded.html",
      template: "src/embedded.html",
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: "test.html",
      chunks: ["test"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].[chunkhash:8].css"
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      // Copy Cesium Assets
      {from: path.join(cesiumSource, "../Build/Cesium/Assets"), to: "cesium/Assets", ignore: ["**/maki/*.png"]},
      // Copy Cesium non-JS widget-bits (CSS, SVG, etc.)
      {from: path.join(cesiumSource, "../Build/Cesium/Widgets"), to: "cesium/Widgets"},
      // Copy Cesium Almond-bundled-and-minified Web Worker scripts
      {from: path.join(cesiumSource, "../Build/Cesium/Workers"), to: "cesium/Workers"},
      // Copy Cesium minified third-party scripts
      {from: path.join(cesiumSource, "../Build/Cesium/ThirdParty/Workers"), to: "cesium/ThirdParty/Workers"},
      // Copy prebuilt CesiumSensorVolumes
      // {from: "node_modules/cesium-sensor-volumes/dist/cesium-sensor-volumes.min.js", to: "cesium/"},
      {from: "data", to: "data", ignore: ["**/.git/**"]},
      {from: "src/assets"},
    ]),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify("cesium/")
    }),
    new WorkboxPlugin.InjectManifest({
      importWorkboxFrom: "local",
      swSrc: "./src/sw.js",
      swDest: "sw.js",
      include: [
        /\.css$/,
        /\.css$/,
        /\.html$/,
        /\.js$/,
        /\.png$/,
        /data\/tle\/.*\.txt$/,
        /dist\/Assets\/.*\.jpg$/,
        /dist\/Assets\/.*\.png$/,
        /dist\/Assets\/.*\.xml$/,
        /dist\/Assets\/approximateTerrainHeights.json$/,
      ],
      exclude: [
        /dist\/ThirdParty\//,
        /dist\/Workers\//,
        /dist\/Widgets\//,
      ],
    }),
  ]
};