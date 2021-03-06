// pages/onlineSearch/onlineSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    errorMsg: '',
    isChooseArchive: false,
    isChoosEaim: false,
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
    lyObjecIndex: '',

    daTypes: [
      { name: '婚姻', value: '1' },
      { name: '职称', value: '2' },
      { name: '劳模', value: '3' },
      { name: '出生医学证明', value: '4' },
      { name: '二轮土地承包', value: '5' },
      { name: '其他类型', value: '6' }
    ],
    daTypeIndex: '',

    showTopTips: false,
    errorMsg: '有错',

    borrowContent: ''
  },

  bindUtilizeChange: function (e) {
    this.setData({
      lyObjecIndex: e.detail.value,
      isChoosEaim: true,
    })
  },

  bindArchiveTypeChange: function (e) {
    this.setData({
      daTypeIndex: e.detail.value,
      isChooseArchive: true,
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
    if (this.data.lyObjecIndex == "") {
      wx.showToast({
        title: '请选择利用目的',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.daTypeIndex == "") {
      wx.showToast({
        title: '请选择档案类型',
        icon: 'none',
        duration: 1500
      })
    } else if (e.detail.value.userNumber == null || e.detail.value.userNumber == '') {
      this.bindShowTopTips('证件号码不能为空')
      return
    } else if (e.detail.value.userName == null || e.detail.value.userName == '') {
      this.bindShowTopTips('申请人不能为空')
      return
    } else if (e.detail.value.userTelephone == null || e.detail.value.userTelephone == '') {
      this.bindShowTopTips('申请电话不能为空')
      return
    }else{
      e.detail.value.userNumber = ''
      e.detail.value.utilize = this.data.lyObjecs[this.data.lyObjecIndex].value
      e.detail.value.archiveType = this.data.daTypes[this.data.daTypeIndex].name
      let userCompany = e.detail.value.userCompany
      let borrowContent = e.detail.value.borrowContent
      if(userCompany == null || userCompany == '') {
        this.bindShowTopTips('所属单位不能为空')
        return
      } else if (this.data.lyObjecIndex == "") {
        wx.showToast({
          title: '请选择利用目的',
          icon: 'none',
          duration: 1500
        })
      } else if (this.data.daTypeIndex == "") {
        wx.showToast({
          title: '请选择档案类型',
          icon: 'none',
          duration: 1500
        })
      } else if(borrowContent == null || borrowContent == '') {
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   borrowContent: options.archive_content 
    // })
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
    
    // let userId = wx.getStorageSync('userid')
    // console.log(userId)
    // if (userId == '') {
    //   wx.switchTab({
    //     url: '../mine/index/index',
    //   })
    // }
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