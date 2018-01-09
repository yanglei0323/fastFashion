// pages/evaluate/evaluate.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaList: [
      {id:1,title:'东方广场店',distance:'195M',location:'北京市东城区东方广场平台PW31-07',image:'../../assets/images/slider2.png'},
      {id:2,title:'朝外悠唐店',distance:'325M',location:'北京市朝阳区悠唐广场',image:'../../assets/images/slider3.png'},
      {id:3,title:'工体世贸店',distance:'765M',location:'北京市东城区东方广场平台PW31-07',image:'../../assets/images/slider2.png'}
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: 'YUE时尚-历史评价'
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
      title: '11111',
      desc: '222222',
      path: '',
      imageUrl: '',

    }
  }
})