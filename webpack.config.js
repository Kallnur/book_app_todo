const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3003,
        static: {
            directory: path.join(__dirname, 'dist'),
          },
        watchFiles: {
            paths: ['./src/**/*.html'], 
              options: {
                usePolling: true,
              },
        },
        historyApiFallback: true,
    },
    module: {
        rules: [
                {
                test: /\.(jpe?g|png|svg)$/i,
                type: "asset",
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                },
                // {
                //     test: /\.(eot|svg|ttf|woff|woff2)$/,
                //     use: ['file-loader']
                // }
                {
                    test: /\.css$/,
                    use: ['css-loader']
                }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'), 
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}