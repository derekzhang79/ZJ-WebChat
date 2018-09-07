//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    noticeList: [],
    consultList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getNoticeList: function() { // 获取信息公告的列表数据
    this.setData({
      noticeList: [
        { id: '1', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
        { id: '2', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
        { id: '3', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
        { id: '4', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
        { id: '5', publish_title: '信息公告测试数据', publish_date: '2018-09-06' }
      ],
      consultList: [
        { id: '1', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
        { id: '2', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
        { id: '3', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
        { id: '4', consultation_title: '信息公告测试数据', create_date: '2018-09-06' },
        { id: '5', consultation_title: '信息公告测试数据', create_date: '2018-09-06' }
      ]
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getNoticeList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
