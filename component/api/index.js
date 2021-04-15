const request =  require("../../utils/request.js")

function getMusic(params){
  return request.req('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',params,'get')
}



module.exports = {
  getMusic
}