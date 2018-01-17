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
    storeInfo:[],
    imgUrls: [],
    star:0,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 800, //  滑动动画时长1s
    storeList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id = options.storeId;
    wx.request({//获取门店详情
      url: bsurl + '/home/storedetail.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        storeid:id,
        positionx:app.globalData.positionx,
        positiony:app.globalData.positiony
      },
      success: function (res) {
        let storeInfo = res.data.data;
        console.log(res);
        let imgarray = [];
        for(let item of res.data.data.imgarray){
            item = imgpath + item;
            imgarray.push(item);
        }
        that.setData({
          storeInfo:storeInfo,
          imgUrls:imgarray,
          star:storeInfo.comment.star
        });
        wx.setNavigationBarTitle({
          title: 'YUE时尚-'+storeInfo.name
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
    
  },
  toNavigation: function (e){
    wx.showToast({
      title: '正在打开地图...',
      icon: 'success',
      duration: 2000
    });
    var that = this;
    let x=parseFloat(e.currentTarget.dataset.x);
    let y=parseFloat(e.currentTarget.dataset.y);
    let name=e.currentTarget.dataset.name;
    let location=e.currentTarget.dataset.location;
    wx.openLocation({
      latitude: y,//纬度
      longitude: x,//经度
      scale: 18,
      name:name,
      address:location
    })
  },
  toEvalAll: function (e){
    var that = this;
    let storeId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../evaluate/evaluate?storeId='+storeId
    })
  },
  toServiceDetail: function (e){
    var that = this;
    let serviceid=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../serviceDetail/serviceDetail?serviceid='+serviceid+'&storeId='+that.data.storeInfo.id
    })
  },
  appointment: function (){
    var that = this;
    wx.navigateTo({
      url: '../appointment/appointment?storeId='+that.data.storeInfo.id
    })
  },
  showCart: function (){
    this.setData({
        hasMask:true
    })
  },
  hideMask: function (){
    this.setData({
        hasMask:false
    })
  },
  stopProp: function (e){
  }
})