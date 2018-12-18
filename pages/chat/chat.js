// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    errorMsg: '有错',

    HouseLevels: [],
    HouseLevelIndex: 0,

    HouseList: [],
    HouseListIndex: 0,

    perOpen: true
  },

  switchChange: function (e) {
    this.setData({
      perOpen: e.detail.value
    })
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

  bindShowTopTips: function (text) {
    var that = this;
    this.setData({
      errorMsg: text,
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  formSubmit: function (e) { // 表单提交
    e.detail.value.orgid = this.data.HouseList[this.data.HouseListIndex].daj_id
    e.detail.value.archivename = this.data.HouseList[this.data.HouseListIndex].name
    e.detail.value.perOpen = this.data.perOpen
    if (e.detail.value.consultationTitle == null || e.detail.value.consultationTitle == '' ) {
      console.log(111)
      this.bindShowTopTips('咨询标题不能为空')
      return
    }
    if (e.detail.value.consultationContent == null || e.detail.value.consultationContent == '') {
      this.bindShowTopTips('咨询内容不能为空')
      return
    }
    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxConsulation!toConsult',
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
            wx.switchTab({
              url: '../index/index'
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
    let userId = wx.getStorageSync('userid')
    console.log(userId)
    if (userId == '') {
      wx.switchTab({
        url: '../mine/index/index',
      })
    }
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