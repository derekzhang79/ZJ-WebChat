// pages/mine/searchArchive/searchArchive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isShow: false
  },

  getList: function() {
    wx.showLoading({
      title: '正在获取中...',
      mask: true
    })
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxCenter!getListAndDetail',
      data: {
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': wx.getStorageSync('sessionid')
      },
      method: 'GET',
      success: function (res) {
        if (res.data.length==0) {
          that.data.isShow = true
        } else {
          that.data.isShow = false
        }
        that.setData({
          list: res.data
        })
        wx.hideLoading()
      }
    })
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