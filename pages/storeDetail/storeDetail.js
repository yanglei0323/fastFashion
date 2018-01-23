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
    storeList: [],
    serviceArray: [],
    cartTotalPrice:0,
    cartNum:0,
    cartList:[]
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
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
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
        if(storeInfo.commentnum == 0){
          that.setData({
            storeInfo:storeInfo,
            imgUrls:imgarray,
            serviceArray:storeInfo.serviceArray
          });
        }else{
          that.setData({
            storeInfo:storeInfo,
            imgUrls:imgarray,
            star:storeInfo.comment.star,
            serviceArray:storeInfo.serviceArray
          });
        }
        wx.setNavigationBarTitle({
          title: 'YUE时尚-'+storeInfo.name
        }); 
        //获取购物车信息
        that.getCartInfo();
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
    if(that.data.cartNum == 0){//当前购物车没有选择任何服务
        wx.showModal({
          title: '温馨提示',
          content: '当前购物车中没有选中的服务，请先选择服务再来预约时间！',
          showCancel:false,
          confirmColor:'#f6838d',
          success: function(res) {

          }
        })
    }else{
        wx.navigateTo({
          url: '../appointment/appointment?storeId='+that.data.storeInfo.id
        })
    }
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
  },
  refreshServiceAdd:function (id){//用于刷新服务项目的选中状态（增加选中）
      var that = this;
      let serviceArray = that.data.serviceArray;
      for(let item of serviceArray){
          if(item.id == id){
              item.isSelected = true;
          }
      }
      that.setData({
          serviceArray:serviceArray
      });
  },
  refreshServiceDel:function (id){//用于刷新服务项目的选中状态(取消选中)
      var that = this;
      let serviceArray = that.data.serviceArray;
      for(let item of serviceArray){
          if(item.id == id){
              item.isSelected = false;
          }
      }
      that.setData({
          serviceArray:serviceArray
      });
  },
  getCartInfo: function (){
    //获取该门店下的购物车信息 
    var that = this;
    wx.request({
      url: bsurl + '/cart/mycart.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        storeid:that.data.storeInfo.id
      },
      success: function (res) {
        console.log(res);
        that.setData({
          cartTotalPrice:0,
          cartNum:0,
          cartList:[]
        });
        let cartList = res.data.data.cartlist;
        let cartTotalPrice = 0;
        let cartNum = 0;
        if(cartList.length >= 1){
          for(let item of cartList){
              let price = item.num*item.price;
              cartTotalPrice += price;
              cartNum += item.num;
          }
          that.setData({
            cartTotalPrice:cartTotalPrice,
            cartNum:cartNum,
            cartList:cartList
          });
        }
      }
    });
  },
  delOfCart: function (e){
      var that = this;
      let serviceid = e.currentTarget.dataset.id;
      wx.request({
          url: bsurl + '/cart/decreasingcart.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'sessionid':app.globalData.sessionId
          },
          data:{
            serviceid:serviceid
          },
          success: function (res) {
            if(res.data.code == 1){
                wx.showToast({
                  title: '删除成功！',
                  icon: 'success',
                  duration: 1500
                });
                let cartList = that.data.cartList;
                for(let item of cartList){
                    if(item.service.serviceid == serviceid && item.num == 1){//此商品在购物车且目前仅剩一件
                        that.refreshServiceDel(serviceid);//删除此商品选中状态
                    }
                }
                that.getCartInfo();//重新获取购物车信息
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
  addToCart: function (e){
      var that = this;
      let serviceid = e.currentTarget.dataset.id;
      let carts = that.data.cartList;
      for(let item of carts){
          if(item.service.serviceid == serviceid && item.num >= 5){
              wx.showModal({
                title: '温馨提示',
                content:'每项服务单次预约上限为5次！',
                showCancel:false,
                confirmColor:'#f6838d',
                success: function(res) {
                }
              })
              return;
          }
      }
      wx.request({
          url: bsurl + '/cart/addtocart.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'sessionid':app.globalData.sessionId
          },
          data:{
            serviceid:serviceid
          },
          success: function (res) {
            if(res.data.code == 1){
                wx.showToast({
                  title: '添加成功！',
                  icon: 'success',
                  duration: 1500
                });
                that.getCartInfo();//重新获取购物车信息
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
  clearCart:function (){
      var that = this;
      wx.showModal({
        title: '温馨提示',
        content:'是否确认清空该门店下的购物车中的服务项目？',
        confirmColor:'#f6838d',
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.request({
                url: bsurl + '/cart/clearcart.json',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'sessionid':app.globalData.sessionId
                },
                data:{
                  storeid:that.data.storeInfo.id
                },
                success: function (res) {
                    if(res.data.code == 1){
                      that.getCartInfo();//重新获取购物车信息
                      that.setData({
                        hasMask:false
                      });
                      wx.showToast({
                        title: '清空成功！',
                        icon: 'success',
                        duration: 1500
                      });
                      let serviceArray = that.data.serviceArray;
                      for(let item of serviceArray){
                           item.isSelected = false;
                      }
                      that.setData({
                          serviceArray:serviceArray
                      });
                    }
                }
            });
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      }) 
  }
})