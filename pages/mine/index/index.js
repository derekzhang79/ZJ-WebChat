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
    isUnbind: true,
    isContent:true,
    phone: '',
    userName:'',
    loginName:'',
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
            isUnbind:false,
            isContent: false,
            phone: res.data.phone,
            userName: res.data.name,
            loginName: res.data.login_name
          })
        } else {
          return
        }
      }
    })
  },
  unbindClick:function(){
    let that = this
    wx.request({
  'url':'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxUser!unBound',
      data: {
        user_id: wx.getStorageSync('userid')
      },
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res){
        if(res.data.code === '1'){
          wx.setStorageSync('isUnbindSuccess', "1");
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            isLogin: false,
            isUnbind: true,
            isContent: true,
            phone: '',
            userName: '',
            loginName: '',
          })
         
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })

        }
      }
    })
  },

  myCheck:function(){
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    if (isUnbindSuccess == "0"){
      wx.navigateTo({
        url: '../searchArchive/searchArchive'
      })
    }else{
      wx.showToast({
        title: '请先绑定账户',
        icon: 'none',
        duration: 2000
      })
    }
  },
  myCourier: function () {
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    if (isUnbindSuccess == "0") {
      wx.navigateTo({
        url: '../expressList/expressList'
      })
    } else {
      wx.showToast({
        title: '请先绑定账户',
        icon: 'none',
        duration: 2000
      })
    }
  },
  myAdvisory: function () {
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    if (isUnbindSuccess == "0") {
      wx.navigateTo({
        url: '../consult/consult'
      })
    } else {
      wx.showToast({
        title: '请先绑定账户',
        icon: 'none',
        duration: 2000
      })
    }
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
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    if (this.data.phone == '' || this.data.phone == null) {
      if (isUnbindSuccess=="0"){
        this.getPhone()
      }
     
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
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: '"掌上查档"小程序随时为您服务指尖点点，百馆联动',        // 默认是小程序的名称(可以写slogan等)
      path: '',        // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '/images/cover.png',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    }
    // 返回shareObj
    return shareObj
  }
})