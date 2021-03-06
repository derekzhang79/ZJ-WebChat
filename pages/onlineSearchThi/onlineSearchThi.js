// pages/onlineSearchThi/onlineSearchThi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fj: []
  },

  previewFJ: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.fj // 需要预览的图片http链接列表
    })
  },

  chooseFj: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        that.setData({
          fj: that.data.fj.concat(tempFilePaths)
        })
      }
    })
  },
  deleteImage: function (e) {
    var that = this;
    var images = that.data.fj;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          images.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          fj: images
        });
      }
    })
  },
  handleUpload: function() {
    let tempFilePaths = this.data.fj
    let successUp = 0; // 成功个数 
    let failUp = 0; // 失败个数 
    let length = this.data.fj.length; // 总共个数 
    let i = 0; // 第几个 
    this.uploadDIY(tempFilePaths, successUp, failUp, i, length)
  },
  next: function() {
    wx.navigateTo({
      url: '../onlineSearchFour/onlineSearchFour'
    })
  },
  uploadDIY: function(filePaths, successUp, failUp, i, length) {
    wx.uploadFile({
      url: 'https://www.zjdafw.gov.cn/kgcx/lankgcx/xcxBorrow!upload', 
      filePath: filePaths[i], 
      name: 'file',
      header: {
        'Cookie': wx.getStorageSync('sessionid')
      }, 
      success: (res) => { 
        successUp++
      }, 
      fail: (res) => { 
        failUp++
      }, 
      complete: () => {
        i++
        if (i == length) { 
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'none',
            duration: 1500
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '../onlineSearchFour/onlineSearchFour'
            })
          },2000)
          
        } else { 
          //递归调用uploadDIY函数
          this.uploadDIY(filePaths,successUp,failUp,i,length)
        } 
      }
    })
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