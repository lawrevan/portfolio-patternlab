/**
 * NOTE: THIS IS A SAMPLE.
 * Any configuration to be merged with 'webpack.config.babel.js' SHOULD BE ADDED TO '/source/_app/webpack.app.js'.
 * Add new dependencies like so:
 * "yarn add autoprefixer import-glob-loader css-loader node-sass postcss-loader postcss-flexbugs-fixes mini-css-extract-plugin sass-loader style-loader --dev"
 * or
 * "npm install autoprefixer import-glob-loader css-loader node-sass postcss-loader postcss-flexbugs-fixes mini-css-extract-plugin sass-loader style-loader --save-dev"
 */


const webpack = require("webpack");
const { getIfUtils } = require("webpack-config-utils");
const { resolve } = require("path");
const globby = require("globby");
const plConfig = require("../../patternlab-config.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = env => {
    const { ifProduction, ifDevelopment } = getIfUtils(env);
    const appNamespace = plConfig.app.namespace
        ? `$ns:${plConfig.app.namespace};`
        : ``;
    const app = {
        entry: {
            "app": globby.sync(
                [
                    // resolve(`${plConfig.paths.source.css}app.scss`),
                    resolve(`${plConfig.paths.source.patterns}**/*.js`),
                    resolve(`${plConfig.paths.source.js}app.js`),
                    "!**/*.test.js"
                ],
                {
                    gitignore: true
                }
            )
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true,
                    }
                }
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "assets/styles/[name].css",
                disable: ifDevelopment()
            }),
            new webpack.DefinePlugin({
                NAMESPACE: appNamespace
            }),
        ],
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: ifDevelopment(
                                "style-loader",
                                MiniCssExtractPlugin.loader
                            )

                        },
                        {
                            loader: "css-loader",
                            options: {
                              sourceMap: ifDevelopment(),
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: ifDevelopment(),
                                ident: 'postcss',
                                plugins: [
                                    // eslint-disable-line no-unused-vars
                                    require('autoprefixer')({
                                      'browsers': ['> 1%', 'last 2 versions']
                                    }),
                                    require("postcss-flexbugs-fixes")
                                ]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {

                                precision: 3,
                                sourceMap: ifDevelopment(),
                                outputStyle: ifProduction(
                                    "compressed",
                                    "expanded"
                                ),
                                data: appNamespace
                            }
                        },
                        {
                            loader: "import-glob-loader"
                        }
                    ]
                },
                {
                  test: /\.svg$/,
                  loader: 'svg-url-loader',
                  options: {
                    noquotes: true,
                    name: '[name].[ext]'
                  }
                },
                {
                  test: /\.(woff|woff2|eot|ttf|jpg?g|png|gif)$/,
                  loader: 'url-loader?100000'
                }
            ]
        }
    };
    return app;
};
