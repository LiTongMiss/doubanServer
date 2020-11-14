const {exec, escape} = require('../../db/mysql')
// 获取我的发布
const getPublicInfo = async (userId, type) => {
    const sql = `select * from publish where userId=${userId} and type=${type}`
    const row = await exec(sql)
    return row[0] || {}
}


module.exports = {
    getPublicInfo
}