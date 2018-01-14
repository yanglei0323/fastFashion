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
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 800, //  滑动动画时长1s
    storeList: [
      {id:1,title:'东方广场店',distance:'195M',location:'北京市东城区东方广场平台PW31-07',image:'../../assets/images/slider2.png'},
      {id:2,title:'朝外悠唐店',distance:'325M',location:'北京市朝阳区悠唐广场',image:'../../assets/images/slider3.png'},
      {id:3,title:'工体世贸店',distance:'765M',location:'北京市东城区东方广场平台PW31-07',image:'../../assets/images/slider2.png'}
    ]
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
        storeid:id
      },
      success: function (res) {
        let storeInfo = res.data.data;
        console.log(storeInfo);
        let imgarray = [];
        for(let item of res.data.data.imgarray){
            item = imgpath + item;
            imgarray.push(item);
        }
        that.setData({
          storeInfo:storeInfo,
          imgUrls:imgarray
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
    var that = this;
    let x=parseFloat(e.currentTarget.dataset.x);
    let y=parseFloat(e.currentTarget.dataset.y);
    let name=e.currentTarget.dataset.name;
    let location=e.currentTarget.dataset.location;
    wx.openLocation({
      latitude: x,
      longitude: y,
      scale: 18,
      name:name,
      address:location
    })
  },
  toEvalAll: function (){
    wx.navigateTo({
      url: '../evaluate/evaluate'
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