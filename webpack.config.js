var webpack = require('webpack');
var path = require('path');
var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
var dirDescription = webpack.ResolverPlugin.DirectoryDescriptionFilePlugin;

// The build is DEV by default
var isDev = JSON.stringify(JSON.parse(process.env.DEV_BUILD || 'true'));
// Pass the BUILD_RELEASE flag to pack it for production
var isPrerelease = JSON.stringify(JSON.parse(process.env.PRERELEASE_BUILD || 'false'));

var definePlugin = new webpack.DefinePlugin({
  __DEV__: isDev,
  __PRERELEASE__: isPrerelease
});

var plugins = [
    definePlugin,
  ];

var entries = ['./index'];

if(isPrerelease === 'true'){
  // Minimize all javascript output of chunks. Loaders are switched into minimizing mode. You can pass an object containing UglifyJs options.
  var uglifyPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(
    new uglifyPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        dead_code: true
      }
    })
  );

  var CompressionPlugin = require("compression-webpack-plugin");
  plugins.push(
    new CompressionPlugin({
        asset: "{file}.gz",
        algorithm: "gzip",
        regExp: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
  );

  // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
  // plugins.push(new webpack.optimize.DedupePlugin());


} else {
  plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ]);
  entries.concat([
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server'
  ]);
}


module.exports = {
  devtool: 'eval',
  entry: entries,
  output: {
    path: __dirname + '/public/assets/',
    filename: 'bundle.js',
    publicPath: '/public/assets/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.coffee'],
    root: [__dirname]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot','jsx?harmony&stripTypes'],
        exclude: /(node_modules|bootstrap(-sass)?\.config.*)/
      },
      // Pattern matches the coffeescript files
      {
        test: /\.coffee$/,
        loaders: ['react-hot','jsx?harmony&stripTypes', 'coffee']
      },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff2?(\?v=.+)?$/, loader: "url?limit=8962&minetype=application/font-woff" },
      { test: /\.ttf(\?v=.+)?$/,    loader: "url?limit=8962&minetype=application/octet-stream" },
      { test: /\.eot(\?v=.+)?$/,    loader: "file" },
      { test: /\.svg(\?v=.+)?$/,    loader: "url?limit=8962&minetype=image/svg+xml" },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // the url-loader is like the file-loader, but it inlines the image if it's below a certain file size.
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8962'
      },
      // {
      //   test: /bootstrap-sass\/assets\/javascripts\//,
      //   // This is needed so that each bootstrap js file required by bootstrap-webpack has access to the jQuery object
      //   loader: 'imports?jQuery=jquery'
      // },
      // {
      //   test: /bootstrap\/js\//,
      //   // This is needed so that each bootstrap js file required by bootstrap-webpack has access to the jQuery object
      //   loader: 'imports?jQuery=jquery'
      // },
      // {
      //   test: /\.scss$/,
      //   // Query parameters are passed to node-sass
      //   loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      // },
      {
        test: /\.less$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!less'
      }
    ]
  }
};
