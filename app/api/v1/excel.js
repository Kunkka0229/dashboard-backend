const Router = require('koa-router')
const Excel = require('../../models/excel')
const { SubmitWeeklyValidator } = require('../../validators')
const { success } = require('../../lib/utils')

const router = new Router({
    prefix: '/v1/excel',
})

router.post('/upload', async (ctx) => {
    const getRes = await Excel.uploadExcel(ctx)
    // 成功
    if (getRes.status) {
        if (getRes.datas.length > 1) {
            errorResult.errorRes(ctx, '暂时不支持多个sheet存在')
        } else {
            //得到的是数组
            const data = getRes.datas[0]
            ctx.body = {
                status: true,
                msg: '上传数据成功',
                data,
            }
        }
    } else {
        errorResult.errorRes(ctx, getRes.msg)
    }
})

// 提交
router.post('/submitWeekly', async (ctx) => {
    const v = await new SubmitWeeklyValidator().validate(ctx, { id: 'email' })
    const params = {
        email: v.get('body.email'),
        date: v.get('body.date'),
        member: v.get('body.member'),
        weeklyData: v.get('body.weeklyData'),
        orgId: v.get('body.orgId'),
    }
    await Weekly.submitWeekly(params)
    // 成功
    throw new global.errors.Success()
})

module.exports = router
