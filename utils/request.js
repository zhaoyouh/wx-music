function req(path,data,method="GET"){
  const m = method.toUpperCase()
  return new Promise((resolve,reject)=>{
     wx.request({
      url: path, 
      data: data,
      method:m,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res =>{
        if(res.statusCode==200){
          resolve(res.data)
        }else{
          wx.showToast({
            title: '请求失败',
            duration: 2000
          })
        }
      },
      fail:err=>{
        wx.showToast({
          title: err,
          duration: 2000
        })
      }
    })
  })

  
}

module.exports = {
  req
}