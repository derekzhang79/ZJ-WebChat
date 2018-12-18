// pages/mine/index/index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLogin: false,
    phone: ''
  },

  getUser: function () { // 根据userid获取用户的一些详细信息
    wx.showLoading({
      title: '正在获取身份信息...',
      mask: true
    })
    let that = this
    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getUser',
      data: {
        user_id: wx.getStorageSync('userid')
      },
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        wx.hideLoading()
        that.setData({
          userName: res.data.name
        })
      },
      fail() {
        wx.hideLoading()
        wx.showToast({
          title: '基本信息请求失败，请返回页面重新获取',
          icon: 'warn',
          duration: 1500
        })
      }
    })
  },

  getPhone: function () {
    let that = this
    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxUser!getPhone',
      data: {
        user_id: wx.getStorageSync('userid')
      },
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        if (res.data.code === '1') {
          that.setData({
            isLogin: true,
            phone: res.data.phone
          })
        } else {
          return
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
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
    if (this.data.phone == '' || this.data.phone == null) {
      this.getPhone()
    }
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