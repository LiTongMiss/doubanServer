
var express = require('express')
const { userInfo } = require('os')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)


app.use('/', express.static(__dirname+'/www'))

//app.get('/',function(req,res){
//    res.send('hello world')
//})
let users = []
let usersInfo =[]
io.on('connection',function(socket){
    console.log('lianjie socket')
    //渲染在线人员
    io.emit('disUser',usersInfo)

    //登录，检测用户名
    socket.on('login',(user)=>{
        if(users.indexOf(user.name)>-1){
            socket.emit('loginError')
        }else{
            users.push(user.name)
            usersInfo.push(user)
            socket.emit('loginSuc')   // 登录成功
            socket.nickname = user.name
            io.emit('system',{     // 想所有用户广播该用户进入房间
                name:user.name,
                status:'进入'
            })
            io.emit('disUser', usersInfo) // 渲染右侧在线人员信息
            console.log(users.length+'user connect..')
        }
    })
     // 发送窗口抖动
     socket.on('shake', ()=> {
        socket.emit('shake', {
            name: '您'
        });
        socket.broadcast.emit('shake', {
            name: socket.nickname
        });
    });
    // 发送消息事件
    socket.on('sendMsg', data=>{
        var img = ''
        for(let i = 0;i<usersInfo.length;i++){
            if(usersInfo[i].name == socket.nickname){
                img = usersInfo[i].img
            }
        }
        // 向除了发送者之外的其他用户广播
        socket.broadcast.emit('receiveMsg',{
            name:socket.nickname,
            img:img,
            msg:data.msg,
            color:data.color,
            side:'left'
        })
        // 向发送者发送消息，为什么分开发送  因为css样式不同
        socket.emit('receiveMsg', {
            name:socket.nickname,
            img:img,
            msg:data.msg,
            color:data.color,
            side:'right'
        })
    })
})

http.listen(3000,function() {
    console.log('listen 3000...')
})