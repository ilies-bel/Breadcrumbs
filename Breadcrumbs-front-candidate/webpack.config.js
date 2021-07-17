const webpack = require('webpack');
const {InjectManifest} = require("workbox-webpack-plugin");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    // In dev mode we use ForkTsCheckerWebpackPlugin for type checking, which is faster when re-compiling
    const tsConfigOptions = isProduction ? {} : {
        transpileOnly: true,
        experimentalWatchApi: true,
    }

    return {
        entry: './src/index.js',
        devtool: isProduction ? false : 'eval',
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    include: [path.resolve(__dirname, './src'), path.resolve(__dirname, './service-worker')],
                    use: [
                        {loader: 'eslint-loader', options: {emitErrors: true}},
                    ],
                },

                // Loader for TypeScript files in ./src
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, './src'),
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {babelrc: true},
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                ...tsConfigOptions,
                                configFile: path.resolve(__dirname, './src/tsconfig.json'),
                            }
                        },
                    ]
                },

                {
                    test: /\.js?$/,
                    include: path.resolve(__dirname, './src'),
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/react'],
                                plugins: ['@babel/plugin-proposal-class-properties']
                            }
                        }
                    ]
                },
                // Loader for service-worker TypeScript files
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, './service-worker'),
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {babelrc: true},
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                ...tsConfigOptions,
                                configFile: path.resolve(__dirname, './service-worker/tsconfig.json'),
                            },
                        },
                    ]
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                components: path.resolve(__dirname, './src/components'),
                Navigation: path.resolve(__dirname, './src/components/Navigation'),
                constants: path.resolve(__dirname, 'src/constants'),
                utils: path.resolve(__dirname, 'src/utils'),
                littleComponents: path.resolve(__dirname, 'src/components/littleComponents')
            }
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/',
        },
        plugins: [
            new CleanWebpackPlugin(),

            new webpack.DefinePlugin({
                'process.env': {
                    REACT_APP_BASE_URL:JSON.stringify("google.com")
                },
            }),
            new Dotenv({
                path: isProduction ? './.env.production' : './.env',
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
            }),

            new CopyWebpackPlugin({
                patterns: [
                    {from: path.resolve(__dirname, './public')},
                ],
            }),

            new webpack.HotModuleReplacementPlugin(),
            ...(isProduction ? [
                new InjectManifest({
                    swSrc: path.resolve(__dirname, './service-worker/serviceWorkerWorkbox.ts'),
                    swDest: 'service-worker.js',
                }),
            ] : [
                new ForkTsCheckerWebpackPlugin({
                    tsconfig: path.resolve(__dirname, './src/tsconfig.json'),
                }),
            ]),

        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                 parallel: true,
                    terserOptions: {
                     compress: {
                         drop_console: false
                     }
                    }
             })
            ]
        },
        devServer: {
            host: '0.0.0.0',
            port: 5000,
            open: true,
            inline: true,
            compress: false,
            hot: true,
            historyApiFallback: true,
        },
    };
}
;
