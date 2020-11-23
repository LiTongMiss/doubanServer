// import handleRequestByPromise from './utils/ajax'
let  http = require("http")
// let url = require('url')
let fs = require('fs')
let cheerio = require('cheerio')
var request = require('request');

let i = 36542;
let url = 'http://www.ijjxsw.com/txt/36550.htm'


function fetchPage(x){
    startRequest(x)
}

function startRequest(x){
    http.get(x, function(res){
        let html = ''
        let titles = []
        res.setEncoding('utf-8')
        res.on('data',function(chunck){
            html+= chunck
        })
        res.on('end', function(){
            let $ = cheerio.load(html)
            // let time = $('div#downInfoArea .downInfoRowL').next().text().trim()
            // let news_item = {
            //     title:$('div.article-title a').text().trim(),
            //     Time:'time',
            //     link:"http://www.ijjxsw.com/txt/" + i+'.htm',
            //     // author:$('[title=供稿]').text().trim(),
            //     author:'',
            //     i:i--
            // }
            let news_title = $('div#downInfoArea h1').text().trim()
            console.log('获取标题', news_title)
            fs.appendFile('./data/'+news_title+'.txt', news_title, 'utf-8', function(err){
                if(err){
                    console.log(err)
                }
            })
            // 存储每篇文章的内容及标题
            // savedContent($,news_title)
            // savedImg($, news_title)
            i--
            // let nums = []
            // for(let a=1;a<501;a++){
            //     nums.push(a)
            // }

            //下一篇文章的url
            let nextLink = "http://www.ijjxsw.com/txt"+i+'.htm',
                // str1 = nextLink.split('-')
                str = encodeURI(nextLink)
                if(i<36000) {
                    fetchPage(str)
                }
            
        }).on('error', function(err){
            console.log(err)
        })
    })
}

function savedContent($, news_title){
    $('.article-content p').each(function(index,item){
        let x= $(this).text()
        let y = x.substring(0,2).trim()
        if(y ==''){
            x= x+ '\n'
            fs.appendFile('./data/'+news_title+'.txt', x, 'utf-8', function(err){
                if(err){
                    console.log(err)
                }
            })
        }
    })
}

function savedImg($, news_title) {
    $('.article-content img').each(function(index, item){
        let img_title = $(this).parent().next().text().trim()
        if(img_title.length >35 || img_title == ''){
            img_title ='Null'
        }
        var img_filename = img_title + '.jpg';

        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename)); 
    })
}

fetchPage(url)

























































// // 初始化爬虫页数
// async function init(startPage,endPage) {
//     for(let i= startPage;i<=endPage;i++){
//         await getAndSaveImg(i)
//     }
// }

// let  router = {
//     "/": (request, response) =>{
//         response.on('data', function(chunck){
//             html+=chunck
//         })
//         response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
//         // 启动爬虫
//         init()
//         response.end()
//     }
// }
// http.createServer((request, response) =>{
//     let pathName = url.parse(requset.url).pathname
//     if(pathName !== '/favicon.ico'){
//         // router(pathName)(request, response)
//         (request, response) =>{
//             response.on('data', function(chunck){
//                 html+=chunck
//             })
//             response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
//             // 启动爬虫
//             init()
//             response.end()
//         }
//     }
// }).listen(9527)



// async function getAndSaveImg(page){
//     let html = ''   // 用来存储请求网页的整个html内容
//     let titles = []

//     let pageImgSetUrl = '';
//     if(page === 1) {
//         pageImgSetUrl = `${this.siteUrl}`
//     }else{
//         pageImgSetUrl = ``
//     }
//     let $= cheerio.load(html)
// }