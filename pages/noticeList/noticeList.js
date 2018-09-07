// pages/noticeList/noticeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    loading: false,
    oadingComplete: false
  },
  getNoticeList: function() {
    let data = [
      { id: '1', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '2', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '3', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '4', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '5', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '6', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '7', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '8', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '9', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '10', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '11', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '12', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '13', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '14', publish_title: '信息公告测试数据', publish_date: '2018-09-06' },
      { id: '15', publish_title: '信息公告测试数据', publish_date: '2018-09-06' }
    ]
    let noticeList = []
    noticeList = this.data.noticeList.concat(data)
    this.setData({
      loading: true,
      noticeList: noticeList
    })
  },
  getMore: function() {
    setTimeout(this.getNoticeList,500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeList()
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