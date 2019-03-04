// pages/mine/login/login.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    loginname: '',
    password: '', // 验证码
    iscode: null, // 用于存放验证码接口里获取到的code
    codeName: '获取验证码',
    isAgree: false // 用于判断是否同意
  },
  //获取input输入框的值
  getPhoneValue: function (e) {
    this.setData({
      loginname: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //提交表单信息
  handleSubmit: function () {
    if (this.data.loginname == "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } 
    if (this.data.password == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      let that = this
      wx.request({
        url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxUser!bindAccount',
        data: {
          loginname: that.data.loginname,
          JSCODE: app.globalData.js_code,
          password: that.data.password
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        method: "get",
        success: function (res) {
          wx.setStorageSync('userid', res.data.user_id)
          wx.setStorageSync('isUnbindSuccess', "0")
          if (res.data.code === '1') {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            setTimeout(function(){
              wx.navigateBack({
                
              })
            }, 2000)
            
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
    
  },
  awayRgt: function () {
    wx.setClipboardData({
      data: 'https://puser.zjzwfw.gov.cn/sso/usp.do?action=mobileRegisterUser&servicecode=dagxxt',
      success: function (res) {
        wx.hideToast({
          success(res) {
            wx.showModal({
              title: '提示',
              content: '复制链接成功，可在手机浏览器中打开页面',
              showCancel: false,
              confirmText:'我知道了'
            });
          }
        })
      }
    });
  },
  forgetPwd: function () {
    wx.setClipboardData({
      data: 'https://puser.zjzwfw.gov.cn/sso/usp.do?action=findPwd&servicecode=dagxxt',
      success: function (res) {
        wx.hideToast({
          success(res) {
            wx.showModal({
              title: '提示',
              content: '复制链接成功，可在手机浏览器中打开页面',
              showCancel: false,
              confirmText: '我知道了'
            });
          }
        })
      }
    });
  },
  
  
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
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