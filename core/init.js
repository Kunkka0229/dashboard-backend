const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    // 入口方法
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadConfig()
        InitManager.loadHttpException()
    }

    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/index.js`
        global.config = require(configPath)
    }

    static initLoadRouters(app) {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, { visit: whenLoadModule })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadHttpException() {
        global.errors = require('./http-exception')
    }
}

module.exports = InitManager
