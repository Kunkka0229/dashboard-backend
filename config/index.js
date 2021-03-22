module.exports = {
    environment: 'development',
    database: {
        dbName: 'weekly',
        productionUrl: '',
        developmentUrl: 'mongodb://localhost:27017',
    },
    security: {
        secretKey: 'afafasdfkadjk',
        expiresIn: 60 * 60 * 24 * 30,
    },
    wx: {
        appId: 'wx8ba7f6d938846173',
        appSecret: 'd27daf739ce28e2883d3aab9cb777113',
        loginUrl:
            'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s',
    },
    host: 'http://localhost:3000/',
}
