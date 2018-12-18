// pages/onlineSearch/onlineSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    errorMsg: '',
    zjTypes: [
      { name: '身份证', value: '1' }
    ],
    zjTypeIndex: 0,

    userNumber: '',
    userName: '',
    userTelephone: '',

    sqAreas: [
      { name: '中国大陆', value: '1' }
    ],
    sqAreaIndex: 0,

    lyObjecs: [
      { name: '编史修志', value: '1' },
      { name: '工作查考', value: '2' },
      { name: '社会保障', value: '3' },
      { name: '落实政策', value: '4' },
      { name: '宣传教育', value: '5' },
      { name: '学术研究', value: '6' },
      { name: '经济建设', value: '7' },
      { name: '其他目的', value: '8' }
    ],
    lyObjecIndex: 0,

    daTypes: [
      { name: '婚姻', value: '1' },
      { name: '职称', value: '2' },
      { name: '劳模', value: '3' },
      { name: '出生医学证明', value: '4' },
      { name: '二轮土地承包', value: '5' },
      { name: '其他类型', value: '6' }
    ],
    daTypeIndex: 0,

    showTopTips: false,
    errorMsg: '有错',

    borrowContent: ''
  },

  bindUtilizeChange: function (e) {
    this.setData({
      lyObjecIndex: e.detail.value
    })
  },

  bindArchiveTypeChange: function (e) {
    this.setData({
      daTypeIndex: e.detail.value
    })
  },

  getUser: function () { // 根据userid获取用户的一些详细信息
    wx.showLoading({
      title: '正在获取身份信息...',
      mask: true
    })
    let that = this
    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getUser',
      data: {
        user_id: wx.getStorageSync('userid')
      },
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        wx.hideLoading()
        that.setData({
          userNumber: res.data.cardNo,
          userName: res.data.name,
          userTelephone: res.data.phone
        })
      },
      fail() {
        wx.hideLoading()
        wx.showToast({
          title: '基本信息请求失败，请返回页面重新获取',
          icon: 'warn',
          duration: 1500
        })
      }
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
    e.detail.value.userNumber = ''
    e.detail.value.utilize = this.data.lyObjecs[this.data.lyObjecIndex].value
    e.detail.value.archiveType = this.data.daTypes[this.data.daTypeIndex].name
    let userCompany = e.detail.value.userCompany
    let borrowContent = e.detail.value.borrowContent
    if (userCompany == null || userCompany == '') {
      this.bindShowTopTips('所属单位不能为空')
      return
    } 
    if (borrowContent == null || borrowContent == '') {
      this.bindShowTopTips('查档内容不能为空')
      return
    }
    wx.request({
      'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getFormBase',
      data: e.detail.value,
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
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
              url: '../onlineSearchSec/onlineSearchSec'
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
    this.setData({
      borrowContent: options.archive_content 
    })
    this.getUser()
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