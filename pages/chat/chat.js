// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    errorMsg: '有错',
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
    HouseListIndex: '',

    perOpen: true
  },

  switchChange: function (e) {
    this.setData({
      perOpen: e.detail.value
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
      isChooseCity: true
    })
    this.getQXHouseList()
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
    if (this.data.HouseLevelIndex == "") {
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
    } else if (this.data.HouseListIndex == "") {
      wx.showToast({
        title: '请选择目标档案馆',
        icon: 'none',
        duration: 1500
      })
    } else{
      e.detail.value.orgid = this.data.HouseList[this.data.HouseListIndex].daj_id
      e.detail.value.archivename = this.data.HouseList[this.data.HouseListIndex].name
      e.detail.value.perOpen = this.data.perOpen
      if (e.detail.value.consultationTitle == null || e.detail.value.consultationTitle == '') {
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
    } 
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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