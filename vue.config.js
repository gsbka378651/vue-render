const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  outputDir:'dist',
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    // proxy: {
    //   "/api": {
    //     target: 'https://store-spring-boot.fly.dev/',
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
})
