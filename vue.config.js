module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  "configureWebpack": {
    "devtool": "source-map"
  },

  devServer : {
    proxy : {
      '/api': {
        target : 'http://52.78.24.45:80/'
      }
    }
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'ap-northeast-2',
      bucket: 'practiceawss3good',
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
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
