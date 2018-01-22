// pages/orderDetail/orderDetail.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    orderDetail:[],
    orderid:''
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let orderid=options.orderid;
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
        if(res.data.code == 1){
          let orderDetail = res.data.data;
          orderDetail.qrcodeurl = imgpath + orderDetail.qrcodeurl;
          that.setData({
            orderDetail:orderDetail,
            orderid:orderid
          });
        }
      }
    });
    
  },
  appointment:function (){
      var that=this;
      wx.showModal({
        title: '温馨提示',
        content: '每个订单仅可更改一次预约时间，请您确认后修改',
        confirmColor:'#f6838d',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../appointChange/appointChange?orderid='+that.data.orderid
            })
          } else if (res.cancel) {
          }
        }
      })
  },
  noappointment:function (){
      var that=this;
      wx.showModal({
        title: '温馨提示',
        content: '很抱歉，该订单预约时间您已经修改过一次！无法再次修改...',
        showCancel:false,
        confirmColor:'#f6838d',
        success: function(res) {
        }
      })
  },
  refund:function (){
    var that=this;
    wx.navigateTo({
      url: '../refund/refund?orderid='+that.data.orderid
    })
  },
  toNavigation: function (e){
    wx.showToast({
      title: '正在打开地图...',
      icon: 'success',
      duration: 2000
    });
    var that = this;
    let x=parseFloat(that.data.orderDetail.store.positionx);
    let y=parseFloat(that.data.orderDetail.store.positiony);
    let name=that.data.orderDetail.store.name;
    let location=that.data.orderDetail.store.location;
    wx.openLocation({
      latitude: y,//纬度
      longitude: x,//经度
      scale: 18,
      name:name,
      address:location
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