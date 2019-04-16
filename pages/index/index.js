//index.js
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = false;
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

Page({
  data: {
    musicUrl: '',
    duration:Number,
    cTime:0,
    content:[],
    playButton:'/images/pause.png',
    plyaFalg:false,
    show:true,
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },

  // 初始化播放器
  audio:function(){
    var that = this;
    // this.data.musicUrl = 'http://zhangmenshiting.qianqian.com/data2/music/b10b0b3b1b713710ed10ba6e93adefc2/613440998/613440998.mp3?xcode=a79d11b662a6533ef1962d1d1690fc93'

    innerAudioContext.src = that.data.musicUrl;

    innerAudioContext.play();

    setTimeout(function () {
      console.log('进入播放：' + innerAudioContext.currentTime)
      that.onTimeUpdate()
    }, 1000)

    that.onEnded()
  },

  // 开始播放事件
  audioPlay:function(){
    innerAudioContext.play();

    this.setData({
      playButton: '/images/pause.png',
      plyaFalg: false
    });

    this.onTimeUpdate();

    console.log('开始播放：'+innerAudioContext.currentTime)
  },

  // 暂停播放事件
  audioPause:function(){
    innerAudioContext.pause();

    this.setData({
      playButton: '/images/play.png',
      plyaFalg: true
    })

    console.log('暂停播放：'+innerAudioContext.currentTime)
  },

  // 播放按钮切换事件
  control:function(){
    innerAudioContext.currentTime
    
    if (this.data.plyaFalg) {
      this.audioPlay()
    }else{
      this.audioPause()
    }
  },

  // 监听播放更新进度
  onTimeUpdate:function(){
    var that = this
    innerAudioContext.onTimeUpdate(function () {
      // console.log('监听改变：'+innerAudioContext.currentTime)
      that.setData({
        cTime: parseInt(innerAudioContext.currentTime)
      });
    })
  },

  //监听自然播放结束
  onEnded:function(){
    var that = this;
    innerAudioContext.onEnded(function(){
      innerAudioContext.stop();
      that.setData({
        cTime: 0
      })
    })
  },

  getMusic: function (e) {
    var that = this;

    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        'method': 'baidu.ting.song.play',
        // 'method':'baidu.ting.song.lry',
        'songid': e.currentTarget.dataset.songid,
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          content: res.data,
          duration: res.data.bitrate.file_duration,
          musicUrl: res.data.bitrate.show_link,
          show:false
        });

        that.audio()
      },
      fail(res) {
        console.log(res.data)
      }
    });
  },

  onPullDownRefresh() { 
    
    },

  onReady: function () {
  // this.getMusic();

    //获得popup组件
    // this.popup = this.selectComponent("#popup");

  },

  onLoad: function () {

  },

})
