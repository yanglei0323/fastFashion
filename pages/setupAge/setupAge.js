// pages/setupAge/setupAge.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age:0,
    ageName:'',
    agelist:[] 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({//获取年龄信息
      url: bsurl + '/user/agelist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          agelist:res.data.data.agelist,
          ageName:res.data.data.agelist[0]
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
  chooseAge: function (e){
    var that=this;
    that.setData({
      age : e.currentTarget.dataset.id,
      ageName:e.currentTarget.dataset.name
    });
  },
  goBack: function (){
    var that = this;
    wx.request({
      url: bsurl + '/user/edit.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        age:that.data.ageName
      },
      success: function (res) {
        if(res.data.code == 1){
            wx.showToast({
              title: '修改成功！',
              icon: 'success',
              duration: 2000
            });
            //改变上一页面该项目的选中状态
            var pages = getCurrentPages();
            if (pages.length > 1) {   
                var prePage = pages[pages.length - 2];    
                prePage.getUserinfo(); 
            }
             wx.navigateBack();
        }else{
            wx.showModal({
              title: 'YUE时尚提示您',
              content: res.data.reason,
              showCancel:false,
              confirmColor:'#f6838d',
              success: function(res) {

              }
            })
        }
      }
    });
  }
})