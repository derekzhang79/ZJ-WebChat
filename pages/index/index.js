//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    noticeList: [],
    consultList: [],
    userName: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserName: function () { // 根据userid获取用户的一些详细信息
    let that = this
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxUser!sendSession',
            data: {
              JSCODE: res.code
            },
            success(res) {
              if (res.data) {
                that.setData({
                  userName: res.data.name
                })
                wx.setStorageSync('sessionid', 'JSESSIONID=' + res.data.sessionid)
                wx.setStorageSync('userid', res.data.userid)
              }
            }
          })
        }
      }
    })
  },
  getNoticeList: function() { // 获取信息公告的列表数据
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxPublic!getPublicSy.json', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          noticeList: res.data
        })
      }
    })

    // this.setData({
    //   consultList: [
    //     { id: '1', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
    //     { id: '2', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
    //     { id: '3', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
    //     { id: '4', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
    //     { id: '5', consultation_title: '信息公告测试数据', create_date: '2018-09-06' }
    //   ]
    // })
  },
  getConsultList: function () { // 获取信息公告的列表数据
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxZxzx!getZxzxSy.json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          consultList: res.data
        })
      }
    })
  },
  checkFile: function(){
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    if (isUnbindSuccess == "0") {
    //     wx.showToast({
    //   title: isUnbindSuccess,
    //   icon: 'none',
    //   duration: 2000
    // })
      wx.navigateTo({
        url: '../onlineSearch/onlineSearch'
      })
    } else {
      
      wx.showToast({
        title: '请绑定账户',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '../mine/index/index'
            })
          }, 1000) //延迟时间 
        }
      })
    }
  },
  onLoad: function () {
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
    this.getNoticeList()
    this.getConsultList()
  },
  onShow: function () {
    // wx.showToast({
    //   title: '请先绑定账户',
    //   icon: 'none',
    //   duration: 2000
    // })
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    //  wx.showToast({
    //   title: isUnbindSuccess,
    //   icon: 'none',
    //   duration: 2000
    // })
    if(isUnbindSuccess=="1"){
      this.setData({
        userName:""
      })
    }else{
      if (this.data.userName == '' || this.data.userName == null) {
        this.getUserName()
      }
    }
   
  },
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "掌上查档",        // 默认是小程序的名称(可以写slogan等)
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
