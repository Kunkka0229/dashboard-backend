function success(ctx, data) {
    ctx.body = {
        msg: '',
        errorCode: 0,
        ...data,
    }
    ctx.status = 200
}

module.exports = {
    success,
}
