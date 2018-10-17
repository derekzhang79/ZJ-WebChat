// pages/onlineSearchFour/onlineSearchFour.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submit: function() {
    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!examination',
      method: 'POST',
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })
        if (res.data.code === '1') {
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }, 2000)
        }
      },
      fail() {
        wx.showToast({
          title: '提交失败，请重新点击提交',
          icon: 'warn',
          duration: 1500
        })
      }
    })
  },

  backHome: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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