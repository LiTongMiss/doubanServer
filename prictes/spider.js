//加载https模块, 只要是获取网站链接都需要的操作
const https = require('https')
//加载之前下载的cheerio,在后面会有作用
const cheerio = require('cheerio')
//文件读取系统  fileSystem, 对文件的操作模块
const fs = require('fs')
//通过https模块的get方法,请求 如下的网站链接,回调函数中 res就是请求所获取的资源
https.get('https://movie.douban.com/top250',function(res){
    // 由于获取的资源是分段返回的 我们需要自己拼接,因此创建一个空字符串用于拼接
    let html = ''
    // res.on类似于addEventListener,只不过这个监听的是data,
    //只要有数据产生就执行这个函数,chunk就是获取的数据,用html拼接
    res.on('data',function(chunk){
        html += chunk
    })
    // 监听只要res数据加载完成,那么我们就执行下面的回调函数
    res.on('end',function(){
        //这个时候就用到了cheerio,是我们可以使用dom操作
        const $ = cheerio.load(html)  //$是 cherrio 规定的
        //用该数组存放我们爬取的数据
        let allFilms = [] 
        
        $('li .item').each(function(){
            //this 循环时当前这个电影
            //当前这个电影下面的title
            const title = $('.title',this).text()
            const star = $('.rating_num',this).text()
            const pic = $('.pic img',this).attr('src')
            // 存成一个 json 文件 fs
            allFilms.push({title,star,pic})
        })
        fs.writeFile('./files.json',JSON.stringify(allFilms),function(err){
            if(!err){
                console.log('文件写入完毕')
            }
        })
    })
})

