// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HouseLevels: [],
    HouseLevelIndex: 0,

    HouseList: [],
    HouseListIndex: 0
  },

  HouseLevelChange: function (e) {
    this.setData({
      HouseLevelIndex: e.detail.value
    })
    let id = this.data.HouseLevels[e.detail.value].daj_id
    this.getHouseList(id)
  },

  HouseListChange: function (e) {
    this.setData({
      HouseListIndex: e.detail.value
    })
  },

  getHouseLevel: function () { // 获取档案馆级别
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getborrowTree',
        data: {},
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          resolve(res.data)
          that.setData({
            HouseLevels: res.data
          })
        },
        fail() {
          reject(res)
          wx.showToast({
            title: '获取档案馆列表失败，请刷新页面重新获取',
            icon: 'warn',
            duration: 1500
          })
        }
      })
    })
  },

  getHouseList: function (parentId) {  // 获取对应的档案馆列表
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getTreeByParentId',
        data: {
          daj_id: parentId
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          resolve(res.data)
          that.setData({
            HouseList: res.data
          })
        },
        fail() {
          reject(res)
          wx.showToast({
            title: '获取档案馆列表失败，请刷新页面重新获取',
            icon: 'warn',
            duration: 1500
          })
        }
      })
    })
  },

  formSubmit: function () { // 表单提交
    let org_id = this.data.HouseList[this.data.HouseListIndex].daj_id
    wx.navigateTo({
      url: '../guideList/guideList?org_id=' + org_id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouseLevel().then(res => { // 同步执行，为了使用第一个请求的数据
      this.getHouseList(res[0].daj_id).then(res => {

      })
    }) 
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