// component/musicPlayer/player.js
//创建播放器实例
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = false;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    albumPic: '',
    songmid:'',
    musicUrl: '',
    playButton: '/images/pausebtn.png',
    plyaFalg: false,
    progress: 0,
    begintime: "00:00",
    endTime: '00:00',
    totalTime: 0,
    show: true,
    timer:'',
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化播放器
    audio: function () {
      var that = this;

      that.setData({
        playButton: '/images/pausebtn.png',
        endTime: that.changeTime(that.data.totalTime)
      })
      innerAudioContext.src = that.data.musicUrl;
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)

        wx.showToast({
          title: '播放失败',
          image: '/images/error.png',
          duration: 2000,
        })

        that.stop();
        setTimeout(function () { wx.hideToast(); }, 1000)
      })

      innerAudioContext.play();

      setTimeout(function () {
        innerAudioContext.currentTime
        console.log('进入播放：')
        that.onTimeUpdate()
      }, 1000)

      clearTimeout(that.data.timeName);
      that.onEnded();
      that.setWidth();
    },

    //停止播放
    stop: function () {
      innerAudioContext.stop();

      this.setData({
        totalTime:0,
        progress: 0,
        begintime: "00:00",
        endTime: '00:00',
        playButton: '/images/playbtn.png',
      })

    },

    // 开始播放事件
    audioPlay: function () {
      innerAudioContext.play();

      this.setData({
        playButton: '/images/pausebtn.png',
      });

      this.onTimeUpdate();

      console.log('开始播放：' + innerAudioContext.currentTime)
    },

    // 暂停播放事件
    audioPause: function () {
      innerAudioContext.pause();
      clearTimeout(this.data.timeName);

      this.setData({
        playButton: '/images/playbtn.png',
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
        that.stop();
      })
    },

    //进度条
    setWidth: function (obj) {
      var that = this, step, leader, target;
      var query = wx.createSelectorQuery().in(this);

      if (this.data.plyaFalg) {
        clearTimeout(that.data.timeName);
        console.log('清除定时器');
        return false;
      }

        query.select('.progress').boundingClientRect(
          function (rect) {
            target = parseInt(rect.width);
            step = +(target / that.data.totalTime).toFixed(2);
          }
        ).exec();

      clearTimeout(that.data.timer);
      that.data.timer = setTimeout(function () {
        leader = +that.data.progress;

        if (leader >= target) {
          that.setData({
            progress: +target
          });

          clearTimeout(that.data.timer);
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

    //封装请求方法
    getData: function (reqUrl,par) {
      return new Promise(function(resolve,reject){
        wx.request({
          url: reqUrl,
          data:par,

          //省略其他属性

          success: function (res) {
            resolve(res)//设置promise成功标志

          },

          fail: function (res) {
            console.log(res)
            reject(res)//设置promise失败标志
          }

        })
      });
    },

    getMusic:function(parameter){
      var that = this,
          url1 = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
          par1 = { 'albummid': parameter},

          url2 = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
          
      //获取歌曲信息
      this.getData(url1,par1).then(function(res){
        that.setData({
          musicTitle: res.data.data.name,
          musicAuthor: res.data.data.singername,
          totalTime: res.data.data.list[0].interval,
          albumPic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + res.data.data.mid + '.jpg',
          songmid: res.data.data.list[0].songmid,
        });

        var par2 = {
          // format:'json205361747', 
          // platform:'yqq',
          // fromtag: 66,
          cid: 205361747,
          songmid: that.data.songmid,
          filename: 'C400'+that.data.songmid + '.m4a',
          guid: "3831469056",
          uin:2902,
        };

        //获取播放链接
        return that.getData(url2,par2)
      }).then(function(res){
        that.setData({
          musicUrl: 'http://ws.stream.qqmusic.qq.com/' + res.data.data.items[0].filename + '?fromtag=66&uin=2902&guid=3831469056&vkey=' + res.data.data.items[0].vkey,
        })

        that.audio();
      })
    }

  }
})
