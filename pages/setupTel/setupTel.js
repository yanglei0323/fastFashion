// pages/setupTel/setupTel.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnText:'确定',
    sendCodeText:'获取验证码',
    sending:false,//是否正在发送验证码
    phoneNum:'',
    codeNum:'',
    currentTime:61,
    type:2 //type=1绑定手机号，type=2修改手机号
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type);
    var that = this;
    if(options.type == 1){
        that.setData({
          btnText:'绑定',
          type:1
        });
        wx.setNavigationBarTitle({
          title: 'YUE时尚-绑定手机'
        });
    }
  },
  phoneInput:function (e){
      var that = this;
      that.setData({
        phoneNum: e.detail.value
      })
  },
  codeInput:function (e){
      var that = this;
      that.setData({
        codeNum: e.detail.value
      })
  },
  getCode: function (){//获取验证码
    var that = this;
    if(that.data.sending){
      return;
    }
    if(!(/^1[34578]\d{9}$/.test(that.data.phoneNum))){
      wx.showModal({
        title: 'YUE时尚提示您',
        content: '请输入正确格式的手机号码',
        showCancel:false,
        confirmColor:'#f6838d',
        success: function(res) {
        }
      })
      return;
    }
    that.setData({
        sending: true
      })
    if(that.data.type == 1){//获取验证码（登录绑定手机）
        var currentTime = that.data.currentTime
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            sendCodeText: '重新发送('+currentTime+')秒'
          })
          if (currentTime <= 0) {
            clearInterval(interval);
            that.setData({
              sending: false  
            });
          }
        }, 1000);
        wx.request({
          url: bsurl + '/user/bindsend.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'sessionid':app.globalData.sessionId
          },
          data:{
            telnum:that.data.phoneNum
          },
          success: function (res) {
              console.log(res);
              if(res.data.code == 1){
                  wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 1500
                  })
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
    }else if(that.data.type == 2){//获取验证码（修改手机）
        var currentTime = that.data.currentTime
        interval = setInterval(function () {
          currentTime--;
          that.setData({
            sendCodeText: '重新发送('+currentTime+')秒'
          })
          if (currentTime <= 0) {
            clearInterval(interval);
            that.setData({
              sending: false  
            });
          }
        }, 1000);
        wx.request({
          url: bsurl + '/user/changetelephone/sendcode.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'sessionid':app.globalData.sessionId
          },
          data:{
            telnum:that.data.phoneNum
          },
          success: function (res) {
              if(res.data.code == 1){
                  wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 1500
                  })
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
  },
  updateTel: function (){//点击提交按钮
    // wx.navigateBack();
    var that = this;
    if(!(/^1[34578]\d{9}$/.test(that.data.phoneNum))){
      wx.showModal({
        title: 'YUE时尚提示您',
        content: '请输入正确格式的手机号码',
        showCancel:false,
        confirmColor:'#f6838d',
        success: function(res) {
        }
      })
      return;
    }
    if(!(/^\d{4,6}$/.test(that.data.codeNum))){
      wx.showModal({
        title: 'YUE时尚提示您',
        content: '请输入正确格式的验证码',
        showCancel:false,
        confirmColor:'#f6838d',
        success: function(res) {
        }
      })
      return;
    }
    wx.showLoading({
      title: '发送中...',
    });
    if(that.data.type == 1){//（登录绑定手机）
      wx.request({
        url: bsurl + '/user/bindphone.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        data:{
          telnum:that.data.phoneNum,
          check:that.data.codeNum
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          if(res.data.code == 1){//绑定成功
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 1500
            });
            app.globalData.userInfo = res.data.data;
            wx.setStorageSync('userInfo',res.data.data);
            wx.switchTab({
              url: '../index/index' 
            });
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
    }else if(that.data.type == 2){//（修改手机）
      wx.request({
        url: bsurl + '/user/changetelephone/save.json',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'sessionid':app.globalData.sessionId
        },
        data:{
          telnum:that.data.phoneNum,
          check:that.data.codeNum
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          if(res.data.code == 1){//绑定成功
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1500
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