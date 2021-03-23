const moment = require('moment')
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')
const downPath = path.resolve(__dirname, '../../fileUpload')

const header = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
//展示的名称
const headerDisplay = {
    a: '销售区域',
    b: '总销售数量',
    c: '同期销量',
    d: '同比增长率',
    e: '总销售实际金额',
    f: '同期销额',
    g: '销额增长率',
    h: '总毛利率',
    i: '同期毛利率',
    j: '毛利增长率',
}

class Excel {
    // 提交周报
    static async uploadExcel(ctx) {
        // 获取上传文件
        const file = ctx.request.files.file
        // 创建可读流
        const reader = fs.createReadStream(file.path)
        // 获取上传文件扩展名
        const ext = file.name.split('.').pop()
        const filePath = `${downPath}/${Math.random().toString()}.${ext}`

        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        //等待数据存储完成
        const getRes = await getFile(reader, upStream)

        //可能存在多个sheet的情况
        const result = {
            a: [],
            b: [],
            c: [],
            d: [],
            e: [],
            f: [],
            g: [],
            h: [],
            i: [],
            j: [],
        }
        if (!getRes) {
            //没有问题
            const workbook = xlsx.readFile(filePath)
            const sheetNames = workbook.SheetNames // 返回 ['sheet1', ...]
            for (const sheetName of sheetNames) {
                const worksheet = workbook.Sheets[sheetName]
                const data = xlsx.utils.sheet_to_json(worksheet, {
                    defval: '',
                    header,
                    skipHeader: true,
                })
                data.forEach((item, index) => {
                    if (index > 0 && index < data.length - 1) {
                        result.a.push(item.a)
                        result.b.push(item.b)
                        result.c.push(item.c)
                        result.d.push(item.d)
                        result.e.push(item.e)
                        result.f.push(item.f)
                        result.g.push(item.g)
                        result.h.push(item.h)
                        result.i.push(item.i)
                        result.j.push(item.j)
                    }
                })
            }
            return {
                status: true,
                result,
            }
        } else {
            return {
                status: false,
                msg: '上传文件错误',
            }
        }
    }
}

function getFile(reader, upStream) {
    return new Promise(function (result) {
        // 可读流通过管道写入可写流
        let stream = reader.pipe(upStream)
        stream.on('finish', function (err) {
            result(err)
        })
    })
}

module.exports = Excel
