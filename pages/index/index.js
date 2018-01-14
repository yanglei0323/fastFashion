// pages/index/index.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 800, //  滑动动画时长1s
    storelsit: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({//获取首页轮播图信息
      url: bsurl + '/home/homead.json',
      method: 'POST',
      success: function (res) {
        let homeadlist =res.data.data.homeadlist;
        for(let item of homeadlist){
            item.imgurl = imgpath + item.imgurl;
        } 
        that.setData({
          imgUrls:homeadlist
        });
      }
    });

    //获取附近门店
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        app.globalData.positionx = res.latitude;
        app.globalData.positiony = res.longitude;
        wx.request({//获取附近门店
          url: bsurl + '/home/nearbystore.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data:{
            positionx:app.globalData.positionx,
            positiony:app.globalData.positiony
          },
          success: function (res) {
            let storelsit=res.data.data.storelsit;
            for(let item of storelsit){
                item.imgurl = imgpath + item.imgurl;
            }
            that.setData({
              storelsit:storelsit
            });
          }
        });
      }
    });
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
    setTimeout(function(){
        wx.stopPullDownRefresh();
    },1500)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
      success: function (){
        setTimeout(function(){
          wx.hideLoading()
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          })
        },1500)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'YUE-时尚',
      desc: '臻选您的美丽',
      path: 'pages/index/index',
      imageUrl: '',
    }
  },
  toStoreDetail: function (e){
    let storId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../storeDetail/storeDetail?storeId='+storId
    })
  }
})