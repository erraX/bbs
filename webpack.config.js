var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var definePlugin = new webpack.DefinePlugin({
  __DEBUG__: true
});

module.exports = {
    context: __dirname,
    // 每一个都是程序的入口，最后打包成一个文件
    // 只需引入
    // <script src="/index.js"></script>
    // 即可
    entry: {
        index: ['./public/js/index.js', hotMiddlewareScript],
    },
    output: {
        path: __dirname,
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.png$/, loaders: [
                'file?name=i/[hash].[ext]'
            ]},
            { test: /\.css/, loaders: ['style', 'css'] },
            // { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?outputStyle=compressed&includePaths[]=" + path.resolve(__dirname, './node_modules/compass-mixins/lib'))
            },
            // 处理所有的js文件，支持es2015语法
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { cacheDirectory: true, presets: ['es2015', 'stage-0'] }}
        ]
    },
    resolve: {
        // modulesDirectories: ["web_modules", "node_modules", "spritesmith-generated"]
    },
    // sassLoader: {
    //         includePaths: path.resolve(__dirname, './node_modules/compass-mixins/lib')
    // },
    plugins: [
          definePlugin,
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          new ExtractTextPlugin('[name].css')
          // new webpack.optimize.UglifyJsPlugin({
          //     include: /\.js$/,
          //     minimize: true
          // })
    ]
};
