const bsurl = require('./util/bsurl.js');
const imgpath = require('./util/imgpath.js');
App({
  onLaunch: function () {
    // console.log('App Launch')// 小程序启动之后 触发
    // 获取code
    var that = this;
    wx.login({
      success: res => {
          that.globalData.wxCode = res.code;//存储code以备后续使用
          if(wx.getStorageSync('sessionId')){//有sessionId凭证，说明不是第一次登陆
              //校验sessionId凭证是否过期
              wx.request({
                url: bsurl + '',
                data:{
                  code:wx.getStorageSync('sessionId')
                },
                success: function (res) {
                  if(res.data == 1){//未过期
                    that.globalData.userInfo = wx.getStorageSync('userInfo');
                    that.globalData.sessionId = wx.getStorageSync('sessionId');
                  }else{//已过期
                    that.getUserInfo();
                  }
                }
              })
              that.getLocation();
          }else{//用户第一次进入小程序
              that.getUserInfo();
              that.getLocation();
          }
      }
    })
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
  getUserInfo: function(){//获取用户信息
    var that = this;
    wx.request({
      url: bsurl + '/user/wxpublogin.json',
      data:{
        code:that.globalData.wxCode
      },
      success: function (res) {
        that.globalData.userInfo = res.data;
        wx.setStorageSync('userInfo',res.data);
        that.globalData.sessionId = res.data.sessionid;
        wx.setStorageSync('sessionId',res.data.sessionid);
      }
    })
  },
  getLocation: function (){//获取用户位置信息
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.globalData.positionx = res.latitude;
        that.globalData.positiony = res.longitude;
      }
    })
  },
  globalData: {
    userInfo:null,    //用户信息
    sessionId:0,      //登陆状态保持凭证
    wxCode:0,         //授权后得到的code
    positionx:0,
    positiony:0
  }

})
