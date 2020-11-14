const {exec, escape} = require('../../db/mysql')
const {getPassword} = require('../../utils/cryp')
// ------------------app接口------------------------
//获取我的日记
const getMyDairy = async (userId) => {
    const sql = `select * from users_daity a join mydairy b on userId = ${userIds} join mydairy on b.dairyid = c.id`
    const row = await exec(sql)
    return row[0] || {}
}

// 新建日记
const setDairy = async (title, content, picture, book, music, movie, tags, isoriginal, isprivate, isattentionreply) => {
    const sql = `insert into mydairy (title, content, picture, book, music, movie, createdate, tags, isoriginal) 
    values 
    (${title}, ${content}, ${picture}, ${book}, ${music}, ${movie}, ${new Date()}, ${tags}, ${isoriginal}, ${isprivate}, ${isattentionreply} )`
    const row = await exec(sql)
    return row[0] || {}
}

// 删除日记
const deletedairy = async (id) => {
    const sql = `delete from mydairy where id=${id}`
    const row = await exec(sql)
    return row[0] || {}
}












module.exports = {
    getMyDairy,
    setDairy,
    deletedairy
}