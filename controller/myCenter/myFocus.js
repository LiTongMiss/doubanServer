const {exec, escape} = require('../../db/mysql')

// 获取我的关注
const getMyFoucs = async (userId) => {
    const sql = `select`
    const row = exec(sql)
    return row[0]|| {}

}
// 关注
const setFoucs = async (userId , type, contentId) => {

}
module.exports = {
    getMyFoucs
}