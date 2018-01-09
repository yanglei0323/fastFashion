// pages/setupSex/setupSex.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:1 //1=男，2=女
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
    return {
      title: '11111',
      desc: '222222',
      path: '',
      imageUrl: '',

    }
  },
  chooseSex: function (e){
    var that=this;
    that.setData({
      sex : e.currentTarget.dataset.id
    });
  },
  goBack: function (){
    wx.navigateBack();
  }
})