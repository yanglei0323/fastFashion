// pages/evaluate/evaluate.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagids: [],
    selectstar: 5,
    selecttagids: [],
    textareaMsg: '',
    orderId:0,
    orderDetail:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let orderid = options.orderid;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      orderId:orderid
    });
    wx.request({//获取评价标签
      url: bsurl + '/user/taglist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        let taglist = res.data.data.taglist;
        for(let item of taglist){
          item.selected = false;
        }
        that.setData({
          tagids:taglist
        });
      }
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
  bindTextAreaBlur:function (e){
    var that = this;
    that.setData({
      textareaMsg:e.detail.value
    });
  },
  selectStar: function (e){
      var that = this ;
      let num =e.currentTarget.dataset.num;
      if(num == that.data.selectstar){
          return;
      }else{
        that.setData({
          selectstar:num,
        });
      }
  },
  selectLabel: function (e){
      var that = this ;
      let id =e.currentTarget.dataset.id;
      let selecttagids=that.data.selecttagids;
      let tagids=that.data.tagids;
      for(let item of tagids){
        if(item.id == id){
          if(item.selected){
            item.selected = false;
            for(let childitem of selecttagids){
              if(childitem == id){
                let index= selecttagids.indexOf(childitem);
                selecttagids.splice(index,1);
              }
            }
          }else{
            item.selected = true;
            selecttagids.push(item.id);
          }
        }
      }
      that.setData({
        selecttagids:selecttagids,
        tagids:tagids
      });
  },
  toevaluate:function (){
    var that = this;
    wx.showLoading({
      title: '评价中',
    });
    wx.request({
      url: bsurl + '/user/comment.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        orderid:that.data.orderId,
        tagids:that.data.selecttagids,
        content:that.data.textareaMsg,
        star:that.data.selectstar
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.code== 1 ) {
          wx.showToast({
            title: '评价成功',
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