// pages/mine/contactUs/contactUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    list: [],
    listQuery: {
      pageindex: 1,
      callbackcount: 10,
      param: ''
    },
    loading: true,
    isBottom: true,
    scrollTop: 0
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.data.listQuery.param = e.detail.value
    this.search()
  },

  search: function () {
    let that = this
    that.data.scrollTop = 0
    that.data.listQuery.pageindex = 1
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxCenter!contactUs',
      data: that.data.listQuery,
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })
  },

  getList: function () {
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxCenter!contactUs',
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
    this.data.listQuery.pageindex += 1
    this.data.loading = false
    this.getList()
  },

  handelTel: function (e) {
    let tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
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