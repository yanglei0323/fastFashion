// pages/my/my.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    thumb:'../../assets/icons/logo.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function(res){
        that.setData({
          thumb: res.userInfo.avatarUrl
        })
      }
    });
    wx.request({//获取个人信息
      url: bsurl + '/user/mine.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo:res.data.data
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
  makecall: function (){
    wx.showActionSheet({
      itemList: ['56855808', '呼叫'],
      itemColor:'#333',
      success: function(res) {
        if(res.tapIndex == 1){
            wx.makePhoneCall({
              phoneNumber: '56855808' 
            })
        }
      },
      fail: function(res) {
        // console.log(res.errMsg)
      }
    })
  },
  aboutUs:function(){
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs'
    })
  }
    

})