const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const RemovePlugin = require('remove-files-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { DefinePlugin } = require('webpack')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development', 'staging'].includes(process.env.NODE_ENV)

const version = JSON.parse(packageJson).version || 0

module.exports = {
  publicPath: (process.env.VUE_APP_BASE_ROUTE || '') + '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_config.scss";'
      }
    }
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'oragroup',
      overrideEndpoint: false,
      region: 'ap-southeast-1',
      bucket: process.env.VUE_APP_S3_BUCKET,
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5
    }
  },

  configureWebpack: (config) => {
    const plugins = [
      new DefinePlugin({
        'process.env': {
          VUE_APP_PACKAGE_VERSION: '"' + version + '"'
        }
      })
    ]
    if (IS_DEV) {
      plugins.push(
        new RemovePlugin({
          before: {
            include: ['./public/sitemap.json']
          }
        })
      )
    }
    if (IS_PROD) {
      const sitemapJSON = require('./public/sitemap.json')
      plugins.push(
        new SitemapPlugin({
          base: process.env.VUE_APP_BASE_URL_SITEMAP,
          paths: sitemapJSON.routes
        })
      )
    }

    if (process.env.VUE_APP_ENVIRONMENT !== 'development') {
      plugins.push(
        new SentryWebpackPlugin({
          // sentry-cli configuration
          authToken: process.env.VUE_APP_SENTRY_AUTH_TOKEN,
          org: process.env.VUE_APP_SENTRY_ORG,
          project: process.env.VUE_APP_SENTRY_PROJECT,
          release: process.env.VUE_APP_SENTRY_RELEASE,
          include: './dist',
          ignore: ['node_modules', 'webpack.config.js']
        }),
        new ImageminPlugin({
          pngquant: {
            quality: '75'
          },
          jpegtran: {
            progressive: false
          }
        })
      )
    }

    config.plugins = [...config.plugins, ...plugins]
  }
}
