// pages/setupSex/setupSex.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:1 //1=男，2=女//性别
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  chooseSex: function (e){
    var that=this;
    that.setData({
      sex : e.currentTarget.dataset.id
    });
  },
  goBack: function (){
    var that = this;
    wx.showLoading({
      title: '提交中',
    });
    wx.request({
      url: bsurl + '/user/edit.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        sexflag:that.data.sex
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.code == 1){
            wx.showToast({
              title: '修改成功！',
              icon: 'success',
              duration: 1000
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
  }
})