// pages/publicList/publicList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    listQuery: {
      pageindex: 1,
      callbackcount: 10,
      org_id: '',
      param: '',
      category_id: ''
    },
    loading: true,
    isBottom: true
  },


  getList: function () {
    let that = this
    wx.request({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!getDefaultList',
      data: that.data.listQuery,
      success: function (res) {
        if (res.data.length !== 0) {
          let newList = []
          newList = that.data.list.concat(res.data)
          that.setData({
            loading: true,
            list: newList
          })
        } else {
          that.setData({
            isBottom: false
          })
        }
      }
    })
  },
  checkIn: function () {
    let isUnbindSuccess = wx.getStorageSync('isUnbindSuccess');
    if (isUnbindSuccess == "0") {
      wx.navigateTo({
        url: '../onlineSearch/onlineSearch?archive_content={{item.title}}'
      })
    } else {
      wx.showToast({
        title: '请先绑定账户',
        duration: 1000,
        icon: 'none',
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '../mine/index/index'
            })
          }, 1000) //延迟时间 
        }
      })
    }
  },

  getMore: function () { // 上拉加载更多
    this.setData({
      page: this.data.page + 1, // 页数增加一页
      loading: false // 显示加载提示
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = JSON.parse(options.obj)
    this.data.listQuery.org_id = obj.org_id
    this.data.listQuery.param = obj.param
    this.data.listQuery.category_id = obj.category_id
    this.getList()
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