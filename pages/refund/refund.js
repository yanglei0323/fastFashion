// pages/refund/refund.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refundreasonlist:[],
    selectlist: '',
    orderid:'',
    other:false,
    othercont:'其他'
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
      wx.request({//获取退款原因列表
        url: bsurl + '/order/refundreasonlist.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        success: function (res) {
          console.log(res);
          let refundreasonlist=res.data.data.refundreasonlist;
          for(let item of refundreasonlist){
            item.selected = false;
          }
          wx.hideLoading();
          that.setData({
            refundreasonlist:refundreasonlist,
            orderid:orderid
          });
        }
      });
  },
  choosereason: function (e){
      var that = this ;
      let id =e.currentTarget.dataset.id;
      let selectlist=that.data.selectlist;
      let refundreasonlist=that.data.refundreasonlist;
      for(let item of refundreasonlist){
        if(item.id == id){
          if(item.selected == true){
            item.selected = false;
            selectlist = '';
          }else{
            item.selected = true;
            selectlist=item.id;
          }
        }else{
          item.selected = false;
        }
      }
      that.setData({
        selectlist:selectlist,
        refundreasonlist:refundreasonlist
      });
  },
  chooseother: function (){
    var that = this;
    let other = !that.data.other;
    that.setData({
      other:other
    });
  },
  bindTextAreaBlur:function (e){
    var that = this;
    that.setData({
      othercont:e.detail.value
    });
  },
  submit: function (){
    var that = this;
    let reasonid=that.data.selectlist;
    let other=that.data.othercont;
    if(reasonid == '' && other == '其他'){
        wx.showModal({
          title: '温馨提示',
          content: '请选择退款原因',
          showCancel:false,
          confirmColor:'#f6838d',
          success: function(res) {
          }
        })
        return;
    }
    wx.request({
      url: bsurl + '/order/refund.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        orderid:that.data.orderid,
        reasonid:that.data.selectlist,
        other:that.data.othercont
      },
      success: function (res) {
        console.log(res);
        if (res.data.code== 1 ) {
          wx.showToast({
            title: '退款成功',
            icon: 'success',
            duration: 1500
          });
          setTimeout(function(){
            wx.reLaunch({
              url: '../orders/orders'
            });
          }, 1500);
        } else {
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