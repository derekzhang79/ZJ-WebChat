// pages/consultList/consultList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1, // 第1页
    limit: 10, // 一页默认10条数据
    loading: false,
    loadingText: '正在加载中...'
  },
  
  getList: function () {
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxZxzx!getZxzxFy.json?pageindex=1&callbackcount=10',
      data: {
        pageindex: that.data.page,
        callbackcount: that.data.limit
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        if (res.data.length !== 0) {
          let newList = []
          newList = that.data.list.concat(res.data)
          that.setData({
            loading: false,
            list: newList
          })
        } else {
          that.setData({
            loadingText: '我们是有底线的！'
          })
        }
      }
    })
  },

  getMore: function () { // 上拉加载更多
    this.setData({
      page: this.data.page + 1, // 页数增加一页
      loading: true, // 显示加载提示
      loadingText: '正在加载中...',
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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