// component/searchBar/search.js
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
    val:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getVal:function(e){
      this.data.val = e.detail.value;
    },

    getResult: function (e) {
      wx.showLoading({
        title: '加载中',
      });

      var that = this;
      var movieType = e.currentTarget.dataset.type;
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/search',
        data: {
          start: 0,
          count: 5,
          q: that.data.val
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
            count: 5,
            val: that.data.val
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
