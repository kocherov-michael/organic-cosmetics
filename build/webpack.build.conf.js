const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [
    // если не заданы параметры, то удаляет все файлы из path: path.join(__dirname, '/dist')
    // удаляем при постройке новых файлов. маст хэв! не забыть про подключение в шапке
		new CleanWebpackPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
