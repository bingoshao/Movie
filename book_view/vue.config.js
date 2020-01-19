const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/', // 部署应用包时的基本URL(这里可以看一下官方说明)
    outputDir: 'dist', // 打包时生成的生产环境构建稳健的目录
    assetsDir: 'static', // 放置生成的静态资源的目录
    filenameHashing: true,
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                'D:\\Movie\\book_view\\src\\assets\\css\\global.less'
            ]
        }
    },
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
                importLoaders: 1,
            },
            less: {
                // 这里的选项会传递给 postcss-loader
                importLoaders: 1,
                options: {
                    sourceMap: true,
                    sourceMapContents: false
                }
            }
        }
    }
}