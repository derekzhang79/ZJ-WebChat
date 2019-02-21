// pages/noticeDetail/noticeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeDetail: {},
    noticeId:""
  },

  getNoticeDetail: function () { // 获取信息公告的详情数据
    let that = this
    // console.log(that.data.noticeId, "mynoticeId");
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxPublic!getPublicDetail?publicId='+that.data.noticeId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
         that.setData({
           noticeDetail: res.data
         })
        

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id,"myid");
    this.setData({
      noticeId: options.id
    })
    this.getNoticeDetail();
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