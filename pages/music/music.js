// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMusic:[],
    hotMusic:[],
    networkMusic:[],
    douyinMusic:[],
    electricMusic:[],
    movieMusic:[],
    foreignMusic:[],
  },

  getMusic: function () {
    var that = this;

    wx.request({
      // url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 27,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          newMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      // url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 26,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          hotMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 28,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          networkMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 60,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          douyinMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 57,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          electricMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 29,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          movieMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
        'page': 'detail',
        'topid': 3,
        "song_num": 3
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          foreignMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
    this.getMusic();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})