// pages/musicDetails/details.js

//创建播放器实例
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
    albumPic:'',
    albummId:'',
    musicUrl:'',
    content:[],
    // playButton: '/images/pause.png',
    plyaFalg: false,
    progress:0,
    begintime:"00:00",
    endTime:'00:00',
    totalTime:0,
  },
  // 初始化播放器
  audio: function () {
    var that = this;
    // https://api.bzqll.com/music/tencent/url?id=曲目id &key=579621905&br=320  播放链接
    console.log(that.data.totalTime)
    that.setData({
      endTime: that.changeTime(that.data.totalTime)
    })

    // innerAudioContext.src = 'https://api.bzqll.com/music/tencent/url?id=' + that.data.musicUrl +'&key=579621905&br=320';
    innerAudioContext.src = that.data.musicUrl;
    innerAudioContext.play();

    setTimeout(function () {
      console.log('进入播放：' + innerAudioContext.currentTime)
      that.onTimeUpdate()
    }, 1000)

    that.setWidth();

    that.onEnded()
  },

  //停止播放
  stop:function(){
    innerAudioContext.stop()
    this.setData({
      plyaFalg: true
    })
  },

  // 开始播放事件
  audioPlay: function () {
    this.audio();
    innerAudioContext.play();

    this.setData({
      playButton: '/images/pause.png',
    });

    this.onTimeUpdate();

    console.log('开始播放：' + innerAudioContext.currentTime)
  },

  // 暂停播放事件
  audioPause: function () {
    innerAudioContext.pause();

    this.setData({
      playButton: '/images/play.png',
    })

    console.log('暂停播放：' + innerAudioContext.currentTime)
  },

  // 播放按钮切换事件
  control: function () {
    innerAudioContext.currentTime

    if (this.data.plyaFalg) {
      this.audioPlay()
      this.setData({
        plyaFalg: false
      })

      this.setWidth();
    } else {
      this.audioPause()
      this.setData({
        plyaFalg: true
      })
    }

  },

  // 监听播放更新进度
  onTimeUpdate: function () {
    var time, ctime, that = this;
    innerAudioContext.onTimeUpdate(function () {
      // console.log('监听改变：'+innerAudioContext.currentTime)
      time = that.changeTime(parseInt(innerAudioContext.currentTime));
      that.setData({
        begintime: time,
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

  //进度条
  setWidth: function () {
    var that = this, step, timer, leader, target;
    var query = wx.createSelectorQuery();

    if (this.data.plyaFalg) {
      clearTimeout(timer);
      console.log('清除定时器')
      return false;
    }

    query.select('.line').boundingClientRect();
    query.exec(function (rect) {
      target = parseInt(rect[0].width);

      step = +(target / that.data.totalTime).toFixed(2);
    });

    timer = setTimeout(function () {
      leader = +that.data.progress;
      if (leader >= target) {
        that.setData({
          progress: +target
        });

        clearTimeout(timer);
      } else {
        leader = (leader + step).toFixed(2)
        that.setData({
          progress: +leader
        })

        that.setWidth();
      }
    }, 1000)
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

  // 获取播放资源
  playMusic: function () {
    var that = this;

    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
      // url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400003lghpv0jfFXG.m4a&guid=126548448',
      data: {
        // 'albummid': '0010UePb4dyfoi',
        'albummid': that.data.albummId,
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          content: res.data.data,
          totalTime: res.data.data.list[0].interval,
            albumPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + res.data.data.mid + '.jpg',
          musicUrl: "https://api.bzqll.com/music/tencent/url?id=" + res.data.data.list[0].songmid + "&key=579621905&br=320",
        });

        that.audio();
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
    this.setData({
      albummId: options.mid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.audio();
    // this.setWidth();
    this.playMusic();
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
    this.stop();
    console.log('页面卸载了')
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