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
  onShareAppMessage: function () {

  }
})