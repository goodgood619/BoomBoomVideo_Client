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
        target : 'http://15.164.234.135:80/'
      }
    }
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'ap-northeast-2',
      bucket: 'vuepleasetest',
      createBucket: true,
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
