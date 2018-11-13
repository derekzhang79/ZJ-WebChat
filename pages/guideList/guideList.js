// pages/guideList/guideList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    listQuery: {
      pageindex: 1,
      callbackcount: 10,
      org_id: ''
    },
    loading: true,
    isBottom: true
  },

  getList: function () {
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!guideForDa',
      data: that.data.listQuery,
      success: function (res) {
        if (res.data.length !== 0) {
          let newList = []
          newList = that.data.list.concat(res.data)
          that.setData({
            loading: true,
            list: newList
          })
        } else {
          that.setData({
            isBottom: false
          })
        }
      }
    })
  },

  getMore: function () { // 上拉加载更多
    this.setData({
      page: this.data.page + 1, // 页数增加一页
      loading: false // 显示加载提示
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.listQuery.org_id = options.org_id
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