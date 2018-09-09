// pages/onlineSearch/onlineSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zjTypes: [
      { name: '身份证', value: 'sfz' }
    ],
    zjTypeIndex: 0,

    sqAreas: [
      { name: '中国大陆', value: 'China' }
    ],
    sqAreaIndex: 0,

    lyObjecs: [
      { name: '编史修志', value: 'bsxz' },
      { name: '工作查考', value: 'gzck' },
      { name: '社会保障', value: 'shbz' },
      { name: '落实政策', value: 'lszc' },
      { name: '宣传教育', value: 'xcjy' },
      { name: '学术研究', value: 'xsyj' },
      { name: '经济建设', value: 'jjjs' },
      { name: '其他目的', value: 'qtmd' }
    ],
    lyObjecIndex: 0,

    daTypes: [
      { name: '婚姻', value: 'bsxz' },
      { name: '职称', value: 'gzck' },
      { name: '劳模', value: 'shbz' },
      { name: '出生医学证明', value: 'lszc' },
      { name: '二轮土地承包', value: 'xcjy' },
      { name: '其他类型', value: 'xsyj' }
    ],
    daTypeIndex: 0,

    IDCards: [],
    fj: [],
    showTopTips: false,
    errorMsg: '有错'
  },

  bindZjTypeChange: function (e) {
    this.setData({
      zjTypeIndex: e.detail.value
    })
  },

  chooseIDCards: function (e) {
    var that = this;
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          IDCards: that.data.IDCards.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewIDCard: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.IDCards // 需要预览的图片http链接列表
    })
  },

  chooseFj: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          fj: that.data.fj.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewFJ: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.fj // 需要预览的图片http链接列表
    })
  },

  formSubmit: function (e) { // 表单提交
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
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