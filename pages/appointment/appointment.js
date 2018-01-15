// pages/appointment/appointment.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId:0,
    tabInfo:[],
    currentTab:1,
    day1:[],
    day2:[],
    day3:[],
    day4:[],
    day5:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var tabInfo =[];//tab数据
    for (var i = 0; i < 5; i++) {
      tabInfo.push({'date': that.addDays(i).date, 'week': that.addDays(i).week, 'index': i + 1});
    }
    that.setData({
      tabInfo:tabInfo
    });
  },
  addDays:function (days) {
    var that = this;
    let date = new Date();
    date = date.valueOf();
    let newDate = date + days * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let week = newDate.getDay();
    return that.setTime(month, day, week);
  },
  setTime:function (month, day, week) {
    let time;
    month = month + '-';
    day = day;
    switch (week) {
      case 0:
          time = '星期日';
          break;
      case 1:
          time = '星期一';
        break;
      case 2:
          time = '星期二';
        break;
      case 3:
          time = '星期三';
        break;
      case 4:
          time = '星期四';
        break;
      case 5:
          time = '星期五';
        break;
      case 6:
          time = '星期六';
        break;
      default:
        time = '今天';
        break;
    }
    return  {
      date: month + day,
      week: time
    };
  },
  changeTab: function (e){
    var that = this;  
    that.setData( { currentTab: e.target.dataset.current });
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