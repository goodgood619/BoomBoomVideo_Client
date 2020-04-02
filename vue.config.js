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
        target : 'http://localhost:3001/'
      }
    }
  }
}
