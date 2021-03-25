const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const parser = require('koa-bodyparser')
const koaBody = require('koa-body')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const cors = require('koa2-cors')

const staticPath = './static'

const app = new Koa()

// 处理跨域
app.use(cors())

// 配置静态web服务的中间件
app.use(koaStatic(path.join(__dirname, staticPath)))

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
