// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMusic:[],
    hotMusic:[],
    networkMusic:[],
    fashionMusic:[],
    duetMusic:[],
    movieMusic:[],
    foreignMusic:[],
  },

  getMusic: function () {
    var that = this;

    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 1,
        'size': 3,
        'offset': 0
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
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 2,
        'size': 3,
        'offset': 0
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
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 25,
        'size': 3,
        'offset': 0
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
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 22,
        'size': 3,
        'offset': 0
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          fashionMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 23,
        'size': 3,
        'offset': 0
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          duetMusic: res.data
        });
      },
      fail(res) {
        console.log(res.data)
      }
    });

    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 24,
        'size': 3,
        'offset': 0
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
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': 21,
        'size': 3,
        'offset': 0
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