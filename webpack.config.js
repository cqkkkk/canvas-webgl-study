const path = require('path');
const h = require('swnb-webpack-learning-plugin');
module.exports = {
    entry: {
        index: path.join(__dirname, 'index')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: [path.resolve(__dirname)],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'bower_components')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /.styl?$/,
                include: [path.resolve(__dirname)],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'bower_components')
                ],
                loader: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist/'
    },
    plugins: [new h({ title: 'dd' }, path.join(__dirname, 'tmp.html'))]
};
