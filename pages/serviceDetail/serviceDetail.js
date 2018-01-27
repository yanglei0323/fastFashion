// pages/storeDetail/storeDetail.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMask:false,
    serviceInfo:[],
    storeId:0,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 800, //  滑动动画时长1s
    imgUrls: [],
    itemUrls:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    let id = options.serviceid;
    let storeId = options.storeId;
    wx.request({//获取门店详情
      url: bsurl + '/home/servicedetail.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        serviceid:id
      },
      success: function (res) {
        let serviceInfo = res.data.data;
        let imgarray = [];
        for(let item of serviceInfo.imgarray){
            item = imgpath + item;
            imgarray.push(item);
        }
        let itemlist = [];
        for(let item of serviceInfo.item){
            item.imgurl = imgpath + item.imgurl;
            itemlist.push(item);
        }
        wx.hideLoading();
        that.setData({
          serviceInfo:serviceInfo,
          imgUrls:imgarray,
          itemUrls:itemlist,
          storeId:storeId
        });
      }
    });
  },
  addToCart: function (){
    var that = this;
    wx.showLoading({
      title: '提交中',
    });
    wx.request({//添加到购物车
      url: bsurl + '/cart/addtocart.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        serviceid:that.data.serviceInfo.id
      },
      success: function (res) {
        // console.log(res);
        wx.hideLoading();
        if(res.data.code == 1){
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000
            })
            //改变上一页面该项目的选中状态
            var pages = getCurrentPages();  
            if (pages.length > 1) {   
                var prePage = pages[pages.length - 2];  
                prePage.refreshServiceAdd(that.data.serviceInfo.id);  
                prePage.getCartInfo();  
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
  },
  addToCartA: function (){
    var that = this;
    wx.showLoading({
      title: '提交中',
    });
    wx.request({//添加到购物车
      url: bsurl + '/cart/addtocart.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        serviceid:that.data.serviceInfo.id
      },
      success: function (res) {
        wx.hideLoading(); 
      }
    });
  },
  appointment: function (){
    var that = this;
    that.addToCartA();
    app.globalData.refreshFlag = true;
    wx.navigateTo({
      url: '../appointment/appointment?storeId='+that.data.storeId
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