// pages/orders/orders.js
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
    // tab切换  
    currentTab: 0, 
    ordersList: [
      {id:1,title:'东方广场店',distance:'195M',location:'北京市东城区东方广场平台PW31-07',image:'../../assets/images/slider2.png'},
      {id:2,title:'朝外悠唐店',distance:'325M',location:'北京市朝阳区悠唐广场',image:'../../assets/images/slider3.png'},
      {id:3,title:'工体世贸店',distance:'765M',location:'北京市东城区东方广场平台PW31-07',image:'../../assets/images/slider2.png'}
    ]
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;  
  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
  
      success: function( res ) { 
      console.log(res.windowHeight); 
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
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
    return {
      title: '标题',
      desc: '描述',
      path: '',
      imageUrl: '',

    }
  }
})