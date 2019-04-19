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
    musicUrl: '',
    duration: Number,
    cTime: '00:00',
    content: [],
    playButton: '/images/pause.png',
    plyaFalg: false,
    show: true,
  },

  // 请求列表
  getData: function () {
    var that = this;

    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.billboard.billList',
        'type': that.data.musicType,
        'size': that.data.sizeNum,
        'offset': 0
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          musicList: res.data,
          songnum: res.data.billboard.billboard_songnum
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

  // 初始化播放器
  audio: function () {
    var that = this;

    innerAudioContext.src = that.data.musicUrl;

    innerAudioContext.play();

    setTimeout(function () {
      console.log('进入播放：' + innerAudioContext.currentTime)
      that.onTimeUpdate()
    }, 1000)

    that.onEnded()
  },

  // 开始播放事件
  audioPlay: function () {
    innerAudioContext.play();

    this.setData({
      playButton: '/images/pause.png',
      plyaFalg: false
    });

    this.onTimeUpdate();

    console.log('开始播放：' + innerAudioContext.currentTime)
  },

  // 暂停播放事件
  audioPause: function () {
    innerAudioContext.pause();

    this.setData({
      playButton: '/images/play.png',
      plyaFalg: true
    })

    console.log('暂停播放：' + innerAudioContext.currentTime)
  },

  // 播放按钮切换事件
  control: function () {
    innerAudioContext.currentTime

    if (this.data.plyaFalg) {
      this.audioPlay()
    } else {
      this.audioPause()
    }
  },

  // 监听播放更新进度
  onTimeUpdate: function () {
    var time, ctime, that = this;
    innerAudioContext.onTimeUpdate(function () {
      // console.log('监听改变：'+innerAudioContext.currentTime)
      ctime = parseInt(innerAudioContext.currentTime);
      time = that.changeTime(ctime);

      that.setData({
        cTime: time
      });
    })
  },

  //监听自然播放结束
  onEnded: function () {
    var that = this;
    innerAudioContext.onEnded(function () {
      innerAudioContext.stop();
      that.setData({
        cTime: '00:00'
      })
    })
  },

  //时间转化分，秒
  changeTime: function (parameter) {
    //获取分钟，除以60取整数，得到整数分钟
    var m = parseInt(parameter / 60);
    //获取秒数，秒数取佘，得到整数秒数
    var s = parseInt(parameter % 60);

    var minute = m < 10 ? '0' + m : m,
      second = s < 10 ? '0' + s : s;

    return minute + ':' + second
  },

  // 请求播放
  playMusic: function (e) {
    var that = this;

    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.song.play',
        'songid': e.currentTarget.dataset.songid,
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var time = that.changeTime(res.data.bitrate.file_duration);
        that.setData({
          content: res.data,
          duration: time,
          musicUrl: res.data.bitrate.show_link,
          show: false
        });

        that.audio()
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