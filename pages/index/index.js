// pages/index/index.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 800, //  滑动动画时长1s
    storelsit: [],
    loading:true,
    hasMore:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({//获取首页轮播图信息
      url: bsurl + '/home/homead.json',
      method: 'POST',
      success: function (res) {
        let homeadlist =res.data.data.homeadlist;
        for(let item of homeadlist){
            item.imgurl = imgpath + item.imgurl;
        } 
        that.setData({
          imgUrls:homeadlist
        });
      }
    });
    that.getStoreInfo();
    
  },
  getStoreInfo:function (){
    var that = this;
    //获取附近门店
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        app.globalData.positionx = res.longitude;
        app.globalData.positiony = res.latitude;
        wx.request({//获取附近门店
          url: bsurl + '/home/nearbystore.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            positionx:app.globalData.positionx,
            positiony:app.globalData.positiony
          },
          success: function (res) {
            // console.log(res);
            let storelsit=res.data.data.storelsit;
            for(let item of storelsit){
                item.imgurl = imgpath + item.imgurl;
            }
            that.setData({
              storelsit:storelsit,
              loading:false
            });
          }
        });
      },
      fail:function (res){
        wx.showModal({
            title: '警告',
            content: '若不授权当前位置信息，则无法使用附近门店功能；点击重新获取授权，则可重新使用；若点击不授权，后期还可以使用小程序，需在微信【发现】-【小程序】-删掉【悦艺术家】，重新搜索授权登录，方能正常使用',
            showCancel:false,
            confirmText:'授权',
            success: function(res) {
                wx.openSetting({
                  success:function(res){
                    if (!res.authSetting["scope.userLocation"]) {
                       //这里是授权成功之后 填写你重新获取数据的js
                       // console.log('重新授权');
                       that.getStoreInfo();                                   
                    }else{
                       that.getStoreInfo();
                    }
                  }
                })
            },
            fail: function (res){
              that.getStoreInfo();
            }
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
      title: 'YUE-时尚',
      desc: '臻选您的美丽',
      path: 'pages/index/index',
      imageUrl: '',
    }
  },
  toStoreDetail: function (e){
    let storId = e.currentTarget.dataset.id;
    let onlineflag = e.currentTarget.dataset.flag;
    if(onlineflag == 1){
      wx.navigateTo({
        url: '../storeDetail/storeDetail?storeId='+storId
      })
    }else{
      wx.showToast({
        title: '即将开通',
        icon: 'none',
        duration: 1500
      })
    }
    
  }
})