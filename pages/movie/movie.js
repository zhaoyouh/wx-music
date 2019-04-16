// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hotData:[],
      start:0,
      count:5,
      total:'',
      movieType:'hot',
      val:''
  },

//通过事件接收子组件的属性值
  reception:function(e){
    this.setData({
      hotData: e.detail.hotData,
      total: e.detail.total,
      movieType: e.detail.movieType,
      start: e.detail.start,
      count: e.detail.count,
      val: e.detail.val,
    })
  },

  getData:function(){
    var that = this,link;

    switch (that.data.movieType) {
      case "hot":
        link = 'https://douban.uieee.com/v2/movie/in_theaters'
        break;
      case "top250":
        link = 'https://douban.uieee.com/v2/movie/top250'
        break;
      case "search":
        link = 'https://douban.uieee.com/v2/movie/search'
        break;
      default:
        link = 'https://douban.uieee.com/v2/movie/coming_soon'
    };

    wx.request({
      // url: 'https://douban.uieee.com/v2/movie/in_theaters', 
      url:link,
      data: {
        start:that.data.start,
        count:that.data.count,
        q:that.data.val,
        city:'广州'
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          hotData:res.data,
          total: res.data.total
        });

        wx.hideLoading();
      },
      fail(res){
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化页面
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
    wx.showLoading({
      title: '加载中',
    });
   
    this.data.start +=5;
    this.data.count = 5;

    if (this.data.start > this.data.total){
      wx.hideLoading();
      
      wx.showToast({
        title:'没有更多信息',
        icon:'none',
        duration: 2000
      })

      setTimeout(function(){
        wx.hideToast()
      },2000)
    }else{
      this.getData();
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    });

    this.data.start = 0;
    this.data.count += 5;

    if (this.data.count>this.data.total) {
      wx.hideLoading();

      wx.showToast({
        title: '没有更多信息',
        icon: 'none',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      this.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})