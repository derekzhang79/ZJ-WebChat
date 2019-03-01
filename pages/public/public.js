// pages/public/public.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ArchiveTypes: [],
    ArchiveTypeIndex: '',
    isChooseArchive:false,
    isChooseLevel: false,
    isChooseCity: false,
    isChooseHouse: false,

    HouseLevels: [
      { name: '省级综合档案馆', value: '0' },
      { name: '地市级综合档案馆', value: '1' },
      { name: '区县级综合档案馆', value: '2' }
    ],
    HouseLevelIndex: '',
    type: '0',
    cityList: [],
    cityListIndex: '',
    cityId: '',
    HouseList: [],
    HouseListIndex: ''
  },

  ArchiveTypeChange: function (e) {
    this.setData({
      ArchiveTypeIndex: e.detail.value,
      isChooseArchive: true,
    })
  },

  HouseLevelChange: function (e) {
    this.setData({
      HouseLevelIndex: e.detail.value,
      type: this.data.HouseLevels[e.detail.value].value,
      isChooseLevel: true,
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
      HouseListIndex: e.detail.value,
      isChooseHouse: true,
    })
  },

  cityListChange: function (e) {
    this.setData({
      cityListIndex: e.detail.value,
      cityId: this.data.cityList[e.detail.value].daj_id,
      isChooseCity:true
    })
    this.getQXHouseList()
  },

  getArchiveTypes: function () { // 获取档案馆级别
    let that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!openDaList',
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          that.setData({
            ArchiveTypes: res.data,
          })
        },
        fail() {
          reject(res)
          wx.showToast({
            title: '获取档案类型列表失败，请刷新页面重新获取',
            icon: 'warn',
            duration: 1500
          })
        }
      })
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

  formSubmit: function (e) { // 表单提交
    if (this.data.ArchiveTypeIndex == ""){
      wx.showToast({
        title: '请选择档案类型',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.HouseLevelIndex == ""){
      wx.showToast({
        title: '请选择档案馆类别',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.type == "2" && this.data.cityListIndex == "") {
      wx.showToast({
        title: '请选择地市',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.HouseListIndex == ""){
      wx.showToast({
        title: '请选择目标档案馆',
        icon: 'none',
        duration: 1500
      })
    } else {
      e.detail.value.category_id = this.data.ArchiveTypes[this.data.ArchiveTypeIndex].category_id,
      e.detail.value.org_id = this.data.HouseList[this.data.HouseListIndex].daj_id
      wx.navigateTo({
        url: '../publicList/publicList?obj=' + JSON.stringify(e.detail.value)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArchiveTypes()
    this.getHouseList()
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