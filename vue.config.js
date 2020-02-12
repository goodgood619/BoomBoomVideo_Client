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
        target : 'http://ec2-13-125-217-252.ap-northeast-2.compute.amazonaws.com/'
      }
    }
  },
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'ap-northeast-2',
      bucket: 'testvuebucket',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read-write',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
