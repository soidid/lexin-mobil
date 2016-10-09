var path = require('path')
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]' 
            },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader', 
              query: {
                presets: ['es2015','react','stage-1'],
                plugins: ['transform-object-rest-spread']
              }
            }
        ]
    }
};
