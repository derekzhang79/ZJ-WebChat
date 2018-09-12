// pages/mine/login/login.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',//手机号
    code: '',//验证码
    iscode: null,//用于存放验证码接口里获取到的code
    codeName: '获取验证码',
    openid: '',
    session_key: ''
  },
  //获取input输入框的值
  getPhoneValue: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    var a = this.data.mobile;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.mobile == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }  else {
      let that = this
      wx.request({
        'url': 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxUser!sendCode',
        data: {
          mobile: that.data.mobile
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        success(res) {
          console.log(res);
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
      })

    }


  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },
  //提交表单信息
  showTopTips: function () {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.mobile == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } 
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.setStorageSync('phone', this.data.mobile);
      let that = this
      wx.request({
        url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxUser!getXcxzhAndcount',
        data: {
          mobile: that.data.mobile,
          JSCODE: app.globalData.js_code,
          checkcode: that.data.code
        },
        header: {
          'Cookie': wx.getStorageSync('sessionid')
        },
        method: "get",
        success: function (res) {
          console.log(res.data.code)
          if (res.data.code === '3') {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
            app.globalData.phone = that.data.mobile
            wx.navigateBack({

            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }

          // that.setData({
          // openid: res.data.openid,
          //  session_key: res.data.session_key,
          //})
        }
      })
    }
    
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