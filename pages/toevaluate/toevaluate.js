// pages/evaluate/evaluate.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaList: [],
    selectstar: 5,
    selecttext: [],
    textareaMsg: '',
    orderId:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let orderid = options.orderid;
    console.log(orderid);
    
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