// pages/evaluate/evaluate.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaList: [],
    page: 1,
    storeId:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let storeId = options.storeId;
    that.setData({
      storeId:storeId
    });
    that.getcommentlist();
    
  },
  getcommentlist: function (){
    wx.showLoading({
      title: '加载中',
      success: function (){
      }
    });
    var that = this;
    wx.request({//获取门店全部评价
      url: bsurl + '/home/store/commentlist.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        storeid:that.data.storeId,
        page:that.data.page
      },
      success: function (res) {
        let evaList = that.data.evaList;
        let commentlist = res.data.data.commentlist;
        console.log(commentlist);
        if(commentlist.length > 0){
          let page = that.data.page;
          page += 1;
          for(let item of commentlist){
            evaList.push(item);
          }
          that.setData({
            evaList:evaList,
            page:page
          });
          wx.hideLoading();
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '暂无更多评论',
            icon: 'success',
            duration: 1500
          })
        }
        
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
    var that = this;
    that.getcommentlist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})