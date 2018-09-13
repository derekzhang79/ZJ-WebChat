// pages/noticeDetail/noticeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consultationDetail: {},
    consultationId:""
   
  },
  getConsultationDetail: function () { // 获取咨询中心的详情数据
    let that = this
    // console.log(that.data.noticeId, "mynoticeId");
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxZxzx!getZxzxDetail?detailId=' + that.data.consultationId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        // console.log(res, "ydc");
         that.setData({
           consultationDetail: res.data
        })


      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      consultationId: options.id
    })
    this.getConsultationDetail();
    // console.log(this.data.consultationId,"kejiali");
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