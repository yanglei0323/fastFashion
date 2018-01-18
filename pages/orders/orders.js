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
    allordersList: [],
    dfwordersList: [],
    dpjordersList: [],
    ytkordersList: [],
    allpage:1,
    dfwpage:1,
    dpjpage:1,
    ytkpage:1
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
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    });
    that.getAllorders();
    that.getDfworders();
    that.getDpjorders();
    that.getYtkorders();
  },
  getAllorders: function (){//获取全部订单
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({//获取全部订单
      url: bsurl + '/order/orderlist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data: {
        type: 'all',
        page:that.data.allpage
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        let allordersList = that.data.allordersList;
        let allpage = that.data.allpage+1;
        let orderlist=res.data.data.orderlist;
        if(orderlist.length >= 1){
            for(let item of orderlist){
                // item.store.imgurl = imgpath + item.store.imgurl;
                allordersList.push(item);
            }
            that.setData({
              allordersList:allordersList,
              allpage:allpage
            });
        }else{
          wx.showToast({
            title: '暂无更多',
            icon: 'success',
            duration: 2000
          })
        }
        
      }
    });

  },
  getDfworders: function (){//获取待服务订单
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: bsurl + '/order/orderlist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data: {
        type: 'pending',
        page:that.data.dfwpage
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        let dfwordersList = that.data.dfwordersList;
        let dfwpage = that.data.dfwpage+1;
        let orderlist=res.data.data.orderlist;
        if(orderlist.length >= 1){
            for(let item of orderlist){
                // item.store.imgurl = imgpath + item.store.imgurl;
                dfwordersList.push(item);
            }
            that.setData({
              dfwordersList:dfwordersList,
              dfwpage:dfwpage
            });
        }else{
          wx.showToast({
            title: '暂无更多',
            icon: 'success',
            duration: 2000
          })
        }
        
      }
    });
  },
  getDpjorders: function (){//获取待评价订单
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: bsurl + '/order/orderlist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data: {
        type: 'commenting',
        page:that.data.dpjpage
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        let dpjordersList = that.data.dpjordersList;
        let dpjpage = that.data.dpjpage+1;
        let orderlist=res.data.data.orderlist;
        if(orderlist.length >= 1){
            for(let item of orderlist){
                // item.store.imgurl = imgpath + item.store.imgurl;
                dpjordersList.push(item);
            }
            that.setData({
              dpjordersList:dpjordersList,
              dpjpage:dpjpage
            });
        }else{
          wx.showToast({
            title: '暂无更多',
            icon: 'success',
            duration: 2000
          })
        }
        
      }
    });
  },
  getYtkorders: function (){//获取已退款订单
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({//获取全部订单
      url: bsurl + '/order/orderlist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data: {
        type: 'refund',
        page:that.data.ytkpage
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        let ytkordersList = that.data.ytkordersList;
        let ytkpage = that.data.ytkpage+1;
        let orderlist=res.data.data.orderlist;
        if(orderlist.length >= 1){
            for(let item of orderlist){
                // item.store.imgurl = imgpath + item.store.imgurl;
                ytkordersList.push(item);
            }
            that.setData({
              ytkordersList:ytkordersList,
              ytkpage:ytkpage
            });
        }else{
          wx.showToast({
            title: '暂无更多',
            icon: 'success',
            duration: 2000
          })
        }
        
      }
    });
  },
  toStore:function (e){
    var that = this;
    let storId = e.currentTarget.dataset.storeid;
    wx.navigateTo({
      url: '../storeDetail/storeDetail?storeId='+storId
    })
  },
  toPay:function (e){
    var that = this;
    let orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../payService/payService?orderid='+orderid
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