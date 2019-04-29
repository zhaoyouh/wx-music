// pages/musicList/list.js
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = false;
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    sizeNum:10,
    songnum:Number,
    musicType:'',
  },

  // 请求列表
  getData: function () {
    var that = this;

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': that.data.musicType,
        "song_num": that.data.sizeNum
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          musicList: res.data,
          // songnum: res.data.billboard.billboard_songnum
        });

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
    this.setData({
      musicType: options.num
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    });

    if (this.data.sizeNum>this.data.songnum){
      wx.hideLoading();
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      });

      setTimeout(function () {
        wx.hideToast()
      }, 2000)

      return false;
    } 
    else{
      this.data.sizeNum += 10;
      this.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})