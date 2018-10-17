// pages/onlineSearchSec/onlineSearchSec.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HouseLevels: [],
    HouseLevelIndex: 0,

    HouseList: [],
    HouseListIndex: 0,

    lyMethods: [],
    lyMethodIndex: 0,

    adCode: '',
    address: '',
    admph: '',
    district: ''
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
    let id = this.data.HouseList[e.detail.value].daj_id
    this.getLyMethods(id)
  },

  lyMethodChange: function (e) {
    this.setData({
      lyMethodIndex: e.detail.value
    })
  },

  bindKeyAdmph: function (e) {
    this.setData({
      admph: e.detail.value
    })
  },

  bindKeyUserEmail: function (e) {
    this.setData({
      userEmail: e.detail.value
    })
  },

  getHouseLevel: function() { // 获取档案馆级别
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

  getLyMethods: function (daj_id) { // 获取利用方式
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getLyfsById',
        data: {
          daj_id: daj_id
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          that.setData({
            lyMethods: res.data
          })
        },
        fail() {
          wx.showToast({
            title: '获取利用方式失败',
            icon: 'warn',
            duration: 1500
          })
        }
      })
    })
  },
  
  formSubmit: function (e) { // 表单提交
    e.detail.value.userTargerArchivesid = this.data.HouseList[this.data.HouseListIndex].daj_id
    e.detail.value.utilizeMethod = this.data.lyMethods[this.data.lyMethodIndex].lyfs_value
    if (e.detail.value.utilizeMethod == '3' || e.detail.value.utilizeMethod == '5') {
      e.detail.value.userAddress = this.data.address + this.data.admph
      e.detail.value.townCode = this.data.adCode
      e.detail.value.town = this.data.district
    }

    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getFormBase2',
      data: e.detail.value,
      method: 'POST',
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })
        if (res.data.code === '1') {
          setTimeout(function () {
            wx.navigateTo({
              url: '../onlineSearchThi/onlineSearchThi'
            })
          }, 2000)
        }
      },
      fail() {
        wx.showToast({
          title: '提交失败，请重新点击提交',
          icon: 'warn',
          duration: 1500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouseLevel().then(res => { // 同步执行，为了使用第一个请求的数据
      this.getHouseList(res[0].daj_id).then(res => {
        this.getLyMethods(res[0].daj_id)
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