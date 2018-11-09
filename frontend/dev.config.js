const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PermissionsOutputPlugin = require('webpack-permissions-plugin');

const extractCSS = new MiniCssExtractPlugin({
    filename: '[name].styles.css',
});

new PermissionsOutputPlugin({
    buildFolders: [
        {
            path     : path.resolve(__dirname, 'public'),
            fileMode : '755',
            dirMode  : '644'
        }
    ]
});

const SRC_DIR  = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'public');

module.exports = (env = {}) => {
    return {
        entry: {
            index: ['babel-polyfill', SRC_DIR + '/index.js']
        },
        output: {
            path: DIST_DIR,
            filename: '[name].bundle.js'
        },
        module: {

            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['react', 'es2015', 'stage-0'],
                            plugins: ['transform-object-rest-spread', 'transform-decorators-legacy'],
                        }
                    },
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(scss|css)$/,
                    use: ['css-hot-loader'].concat([
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {alias: {'../img': '../public/img'}}
                        },
                        'sass-loader'
                    ])
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [
                        {
                            // loader: 'url-loader'
                            loader: 'file-loader',
                            options: {
                                name: './img/[name].[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[hash].[ext]'
                    }
                }]
        },

        mode: 'development',

        plugins: [
            new webpack.NamedModulesPlugin(),
            extractCSS,
            new HtmlWebpackPlugin(
                {
                    inject: true,
                    template: './src/index.html',
                }
            ),
            new CopyWebpackPlugin([
                    {from: './resources/', to: './'}
                ],
                {copyUnmodified: false}
            )
        ]
    };
};