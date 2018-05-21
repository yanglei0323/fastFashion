// pages/payService/payService.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
const pingpp = require('../../util/pingpp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:[],
    couponName:'',
    couponId:0,
    freeprice:0,
    orderid:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let orderId = options.orderid;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({//获取订单信息
      url: bsurl + '/user/getserviceorderinfo.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        orderid:orderId
      },
      success: function (res) {
        // console.log(res);
        wx.hideLoading();
        let orderInfo = res.data.data;
        orderInfo.store.imgurl = imgpath + orderInfo.store.imgurl;
        that.setData({
          orderInfo:orderInfo,
          orderid:orderId
        });
      }
    });
  },
  confirmAppoint:function (){
    var that = this;
    wx.showLoading({
      title: '支付中...',
    });
    if(that.data.couponId == 0){//没选优惠券
      wx.request({
        url: bsurl + '/pay/prepay.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        data:{
          orderid:that.data.orderInfo.id,
          type:'xcx'
        },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          if(res.data.code == 1){
            pingpp.createPayment(JSON.stringify(res.data.data), function(result, err) {
              if (result=="success") {
                // payment succeeded
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 1000
                });
                app.globalData.refreshFlag = true;
                setTimeout(function(){
                  wx.redirectTo({
                    url: '../orderDetail/orderDetail?orderid='+that.data.orderid
                  })
                }, 1000);
              } else {
                // console.log(result+" "+err.msg+" "+err.extra);
                wx.showModal({
                  title: '温馨提示',
                  content: '支付失败，请稍后再试！',
                  showCancel:false,
                  confirmColor:'#f6838d',
                  success: function(res) {
                  }
                })
              }
            });
          }else{
            wx.showModal({
              title: '温馨提示',
              content: res.data.reason,
              showCancel:false,
              confirmColor:'#f6838d',
              success: function(res) {
              }
            })
          }
        }
      });
    }else{
      wx.request({
        url: bsurl + '/user/usecoupon.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        data:{
          orderid:that.data.orderInfo.id,
          couponid:that.data.couponId
        },
        success: function (res) {
          // console.log(res);
          if(res.data.code == 1){
              if(res.data.data.price == 0){
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 1000
                  });
                app.globalData.refreshFlag = true;
                  setTimeout(function(){
                    wx.redirectTo({
                      url: '../orderDetail/orderDetail?orderid='+that.data.orderid
                    })
                  }, 1000);
              }else{
                  wx.request({
                    url: bsurl + '/pay/getpingcharge.json',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'sessionid':app.globalData.sessionId
                    },
                    data:{
                      orderid:that.data.orderInfo.id,
                      channel:'wx_lite'
                    },
                    success: function (res) {
                      wx.hideLoading();
                      // console.log(res);
                      if(res.data.code == 1){
                          pingpp.createPayment(JSON.stringify(res.data.data), function(result, err) {
                            if (result=="success") {
                              // payment succeeded
                              wx.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 1000
                              });
                              app.globalData.refreshFlag = true;
                              setTimeout(function(){
                                wx.redirectTo({
                                  url: '../orderDetail/orderDetail?orderid='+that.data.orderid
                                });
                              }, 1000);
                            } else {
                              // console.log(result+" "+err.msg+" "+err.extra);
                              wx.showModal({
                                title: '温馨提示',
                                content: '支付失败，请稍后再试！',
                                showCancel:false,
                                confirmColor:'#f6838d',
                                success: function(res) {
                                }
                              })
                            }
                          });
                      }else{
                        wx.showModal({
                          title: '温馨提示',
                          content: res.data.reason,
                          showCancel:false,
                          confirmColor:'#f6838d',
                          success: function(res) {
                          }
                        })
                      }
                    }
                  });
                
              }
          }else{
            wx.showModal({
              title: '温馨提示',
              content: res.data.reason,
              showCancel:false,
              confirmColor:'#f6838d',
              success: function(res) {
              }
            })
          }
        }
      });
    }
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