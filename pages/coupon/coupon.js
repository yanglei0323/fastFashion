// pages/coupon/coupon.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedCouponId:0,
    couponList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.showLoading({
        title: '加载中',
      });
      wx.request({//获取可用优惠券
        url: bsurl + '/user/unusedcouponlist.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        success: function (res) {
          // console.log(res);
          wx.hideLoading();
          let couponList=res.data.data.couponlist;
          that.setData({
            couponList:couponList
          });
        }
      });
  },
  chooseCoupon: function (e){
    var that=this;
    that.setData({
      selectedCouponId:e.currentTarget.dataset.id
    });
    var pages = getCurrentPages();  
    if (pages.length > 1) {   
        var prePage = pages[pages.length - 2];    
        prePage.setData({
          couponName:e.currentTarget.dataset.name,
          couponId:e.currentTarget.dataset.id,
          freeprice:e.currentTarget.dataset.price
        });
        setTimeout(function(){
          wx.navigateBack();
        }, 300);  
    }
    
  },
  clearUsed: function (){
    var that=this;
    that.setData({
      selectedCouponId:0
    });
    var pages = getCurrentPages();  
    if (pages.length > 1) {   
        var prePage = pages[pages.length - 2];    
        prePage.setData({
          couponName:'',
          couponId:0,
          freeprice:0
        });  
    }
    wx.navigateBack();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})