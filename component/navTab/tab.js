// component/navTab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // total:{
    //   type: Number,
    //   value:''
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMovie: function (e) {
      wx.showLoading({
        title: '加载中',
      });

      var that = this;

      var link,
      // 获取页面自定义data属性值
      movieType = e.currentTarget.dataset.type;

      switch (movieType){
        case "hot":
          link = 'https://douban.uieee.com/v2/movie/in_theaters'
          break;
        case "top250":
          link = 'https://douban.uieee.com/v2/movie/top250'
          break;
        default:
          link = 'https://douban.uieee.com/v2/movie/coming_soon'
      };
      wx.request({
        // url: 'https://douban.uieee.com/v2/movie/in_theaters',
        url:link,
        data: {
          start: 0,
          count: 5,
          city: '广州'
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
         
         //子组件给父组件传值
          that.triggerEvent('changeData', { 
              hotData: res.data, 
              total: res.data.total,
              movieType: movieType,
              start: 0,
              count:5 
            });

          wx.hideLoading();
        },
        fail(res) {
          console.log(res.data)
        }
      })
    },

  }
})
