// pages/refundSuc/refundSuc.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      let orderid=options.orderid;
      wx.showLoading({
        title: '加载中',
      });
      wx.request({//获取订单详情
        url: bsurl + '/order/orderdetail.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        data:{
          orderid:orderid
        },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          if(res.data.code == 1){
            let orderDetail = res.data.data;
            orderDetail.store.imgurl = imgpath + orderDetail.store.imgurl;
            that.setData({
              orderDetail:orderDetail
            });
          }
        }
      });
  },
  toStoreDetail: function (e){
    let storId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../storeDetail/storeDetail?storeId='+storId
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