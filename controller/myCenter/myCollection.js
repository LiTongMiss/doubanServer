const {exec, escape} = require('../../db/mysql')
// 获取收藏列表
const getCollection = async (userId) => {
    let sql = ''
    if(userId) {
        // sql = `select * from collection a where id=${userId} inner join acrticle b on a.collId = b.arcId`
        sql = `select * from articles a left join collection b on  b.arcId = a.collId WHERE collection b.userId = ${userId} `
    } else {
        sql = `select * from collection`
    }
     
    const row = await exec(sql)
    console.log('row', row)
    return row || {}
}

module.exports = {
    getCollection
}