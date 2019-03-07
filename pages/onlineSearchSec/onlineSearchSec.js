// pages/onlineSearchSec/onlineSearchSec.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HouseLevels: [
      { name: '省级综合档案馆', value: '0' },
      { name: '地市级综合档案馆', value: '1' },
      { name: '区县级综合档案馆', value: '2' }
    ],
    HouseLevelIndex: 0,
    type: '0',
    cityList: [],
    cityListIndex: 0,
    cityId: '',
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
      HouseLevelIndex: e.detail.value,
      type: this.data.HouseLevels[e.detail.value].value
    })
    if (this.data.type == '0' || this.data.type == '1') {
      this.getHouseList()
    } else {
      this.getCityList().then(res => {
        this.data.cityId = res[0].daj_id
        this.getQXHouseList()
      })
    }
  },

  HouseListChange: function (e) {
    this.setData({
      HouseListIndex: e.detail.value
    })
    const id = this.data.HouseList[e.detail.value].daj_id
    this.getLyMethods(id)
  },

  cityListChange: function (e) {
    this.setData({
      cityListIndex: e.detail.value,
      cityId: this.data.cityList[e.detail.value].daj_id
    })
    this.getQXHouseList()
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

  getHouseList: function () {  // 获取对应的档案馆列表
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getTreeByType',
        data: {
          type: that.data.type
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          resolve(res.data)
          that.setData({
            HouseList: res.data
          })
          that.getLyMethods(res.data[0].daj_id)
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

  getCityList: function () {  // 获取对应的地市列表
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getTreeByType',
        data: {
          type: that.data.type
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          resolve(res.data)
          that.setData({
            cityList: res.data
          })
        },
        fail() {
          reject(res)
          wx.showToast({
            title: '获取地市列表失败，请刷新页面重新获取',
            icon: 'warn',
            duration: 1500
          })
        }
      })
    })
  },

  getQXHouseList: function () {  // 获取对应的档案馆列表
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getTreeByParentId',
        data: {
          daj_id: that.data.cityId
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          resolve(res.data)
          that.setData({
            HouseList: res.data
          })
          that.getLyMethods(res.data[0].daj_id)
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
    this.getHouseList().then(res => {
      this.getLyMethods(res[0].daj_id)
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