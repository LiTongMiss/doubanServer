const {exec, escape} = require('../../db/mysql')
// 获取相册
const getPhotoAlbum = async (userId) => {
    const sql1 = `select * fromuser_photo_album a left join photoalbum_to_photo b where a.userId=${userId} and a.photoAlbumId = b.photoAlbumId`
    const sql = `select * fromuser_photo_album a left join photoAlbum_to_replay b left join photo_replay c where a.userId=${userId} and b.photoAlbumId = a.photoAlbumId` 
    const row = await exec(sql)
    const row1 = await exec(sql1)
    let result = {
        data: row[0],
        replay: row1
    }
    return result || {}
}
// 查看相册内容
const getPhotos = async (photoAlbumId) => {
    const sql = `select * from user_photos a left join photoalbum_to_photo b on b.photoAlbumId = a.photoId`
    const row = await exec(sql)
    return row[0] || {}
}

module.exports = {
    getPhotoAlbum,
    getPhotos
}