const {exec, escape} = require('../../db/mysql')
// 获取我书影音（书影音档案）
const getSYI = async (userId) => {
    const sql = `select * from syl where userId=${userId}`
    const row = await exec(sql)
    return row[0] || {}
}