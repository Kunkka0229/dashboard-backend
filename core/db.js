const mongoose = require('mongoose')
const chalk = require('chalk')

const config = require('../config')

const { dbName, productionUrl, developmentUrl } = config.database
// 判断环境
const env = process.env.NODE_ENV || config.environment

let address = productionUrl
if (env === 'development') {
    address = developmentUrl
}

mongoose.connect('mongodb://127.0.0.1:27017/weekly')

mongoose.connection.on('connected', () => {
    console.log(`${chalk.blue(dbName)}: ${chalk.green('连接成功')}`)
})
mongoose.connection.on('error', (err) => {
    console.log(`${chalk.blue(dbName)}: ${chalk.red('连接失败')}`)
    console.info('---------------------------error belows------------------------------')
    console.info(`${chalk.red(err)}`)
})

module.exports = mongoose
