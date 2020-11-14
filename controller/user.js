const {exec, escape} = require('../db/mysql')
const {getPassword} = require('../utils/cryp')

//--------------------------app接口-------------------------------
const  login = async (username, password) => {
    username = escape(username)

    // 生成密码加密
    password = getPassword(password)
    password = escape(password)

    const sql = `select username, realname from  users where username=${username} and password=${password}`

    const row = await exec(sql)
    return row[0] || {}
}

// 注册用户
const regist = async (username, password) => {
    const sql = `insert into users (user_id,username, password) values (2,${username}, ${password})`
    const row = await exec(sql)
    return row[0] || {}
}


//---------------------------后台管理系统接口-----------------------------------
// 获取用户列表


module.exports = {
    login,
    regist
}