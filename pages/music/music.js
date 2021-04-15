// pages/music/music.js
const api = require("../../component/api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMusic:[],
    hotMusic:[],
    networkMusic:[],
    douyinMusic:[],
    movieMusic:[],
    foreignMusic:[],
  },

  getData:function(){
    let params1 = {
      'page': 'detail',
      'topid': 27,
      "song_num": 3
    }
    let params2 = {
      'page': 'detail',
      'topid': 26,
      "song_num": 3
    }
    let params3 = {
      'page': 'detail',
      'topid': 28,
      "song_num": 3
    }
    let params4 = {
      'page': 'detail',
      'topid': 60,
      "song_num": 3
    }
   
    let params6 = {
      'page': 'detail',
      'topid': 29,
      "song_num": 3
    }
    let params7 = {
      'page': 'detail',
      'topid': 3,
      "song_num": 3
    }
    api.getMusic(params1).then(res=>{
      this.setData({
        newMusic: res
      });
    })
    api.getMusic(params2).then(res=>{
      this.setData({
        hotMusic: res
      });
    })
    api.getMusic(params3).then(res=>{
      this.setData({
        networkMusic: res
      });
    })
    api.getMusic(params4).then(res=>{
      this.setData({
        douyinMusic: res
      });
    })
    api.getMusic(params6).then(res=>{
      this.setData({
        movieMusic: res
      });
    })
    api.getMusic(params7).then(res=>{
      this.setData({
        foreignMusic: res
      });
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
    // this.getMusic();
    this.getData()
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