// pages/coupon/coupon.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,  
    winHeight: 0, 
    currentTab:0,
    overduse:[],   //已过期列表
    unUsed:[],     //未使用列表
    used:[]        //已使用列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
         
      //获取系统信息   
      wx.getSystemInfo( {  
    
        success: function( res ) { 
          that.setData( {  
            winWidth: res.windowWidth,  
            winHeight: res.windowHeight  
          });  
        }  
    
      });
      wx.showLoading({
        title: '加载中',
        success: function (){
        }
      });
      wx.request({//获取可用优惠券
        url: bsurl + '/user/mycouponlist.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        success: function (res) {
          // console.log(res);
          wx.hideLoading();
          that.setData({
            overduse:res.data.data.overdue,
            unUsed:res.data.data.unUsed,
            used:res.data.data.used
          });
        }
      });
  },
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
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