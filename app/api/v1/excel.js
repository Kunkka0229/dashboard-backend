const Router = require('koa-router')
const Excel = require('../../models/excel')
const { SubmitWeeklyValidator } = require('../../validators')
const { success } = require('../../lib/utils')
const axios = require('axios')
const fs = require('fs')

const router = new Router({
    prefix: '/v1/excel',
})

router.post('/upload', async (ctx) => {
    const getRes = await Excel.uploadExcel(ctx)
    // 成功
    if (getRes.status) {
        ctx.body = {
            status: true,
            msg: '上传数据成功',
            data: getRes.response,
        }
    } else {
        errorResult.errorRes(ctx, getRes.msg)
    }
})

router.get('/chinaJson', async (ctx) => {
    // const { data, status } = await axios.get('https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json')
    // if (status === 200) {
    //     ctx.body = {
    //         status: true,
    //         msg: '',
    //         data,
    //     }
    // }
    const data = await fs.readFileSync('static/china-geoJson.json', 'utf-8')
    ctx.body = {
        status: true,
        msg: '',
        data: JSON.parse(data),
    }
})

module.exports = router
