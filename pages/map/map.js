// pages/map/map.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'TMQBZ-GFDP3-NQU34-3IHXJ-3I6J5-S4FTT' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
    markers: [],
    inputShowed: false,
    inputVal: '',
    location: {
      adcode: '',
      address: '正在定位中...',
      district: ''
    }
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.key_search()
  },
  key_search: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.getSuggestion({
      keyword: _this.data.inputVal,
      policy:1,
      success: function (res) {
        console.log(res);
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            adcode: res.data[i].adcode,
            address: res.data[i].address,
            district: res.data[i].district
          })
        }
        _this.setData({
          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  getCityInfo: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: _this.data.latitude,
        longitude: _this.data.longitude
      },
      success: function (res) { //搜索成功后的回调
        _this.setData({
          location: {
            adcode: res.result.ad_info.adcode,
            address: res.result.address,
            district: res.result.ad_info.district
          }
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  bindBack: function (e) {
    console.log(e)
    let pages = getCurrentPages();
    let currPage = null; //当前页面
    let prevPage = null; //上一个页面

    if (pages.length >= 2) {
      currPage = pages[pages.length - 1]; //当前页面
      prevPage = pages[pages.length - 2]; //上一个页面
    }
    if (prevPage) {
      prevPage.setData({
        adCode: e.currentTarget.dataset.adcode,
        address: e.currentTarget.dataset.address,
        district: e.currentTarget.dataset.district
      });
    }
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前经纬度信息
    wx.getLocation({
      success: ({ latitude, longitude }) => {
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
        this.getCityInfo()
      }
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