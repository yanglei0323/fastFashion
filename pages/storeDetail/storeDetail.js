// pages/storeDetail/storeDetail.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId:1,
    hasMask:false,
    imgUrls: [
      '../../assets/images/slider1.png',
      '../../assets/images/slider2.png',
      '../../assets/images/slider3.png'
    ],
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
    // console.log(options);
    var that = this;
    let id = options.storeId;
    let storeList = this.data.storeList;
    for(let item of storeList){
      if(item.id == id){
        wx.setNavigationBarTitle({
          title: 'YUE时尚-'+item.title
        });
      }
    }
    that.setData({
      storeId:id
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
      title: '11111',
      desc: '222222',
      path: '',
      imageUrl: '',

    }
  },
  toNavigation: function (){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18,
          name:'YUE时尚-朝外悠唐店',
          address:'（测试，别当真）北京市朝阳区神路街39号日坛上街1-58'
        })
      }
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