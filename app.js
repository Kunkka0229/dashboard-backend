const Koa = require('koa')
const path = require('path')
const parser = require('koa-bodyparser')
const koaBody = require('koa-body')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

// post
app.use(parser())

app.use(
    koaBody({
        // 支持文件格式
        multipart: true,
        formidable: {
            // 保留文件扩展名
            keepExtensions: true,
            maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        },
    })
)

// 全局异常处理
app.use(catchError)

// 初始化
InitManager.initCore(app)

app.listen(3000)
