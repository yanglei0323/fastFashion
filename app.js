const bsurl = require('./util/bsurl.js');
const imgpath = require('./util/imgpath.js');
App({
  onLaunch: function (options) {
    // console.log('App Launch')// 小程序启动之后 触发
    // 获取code
    var that = this;
    wx.login({
      success: res => {
          that.globalData.wxCode = res.code;//存储code以备后续使用
          if(wx.getStorageSync('sessionId')){//有sessionId凭证，说明不是第一次登陆
              //校验sessionId凭证是否过期
              wx.checkSession({
                success: function(){
                  //session 未过期，并且在本生命周期一直有效
                    that.globalData.userInfo = wx.getStorageSync('userInfo');
                    that.globalData.sessionId = wx.getStorageSync('sessionId');
                },
                fail: function(){
                  //登录态过期
                  that.getUserInfo();
                }
              })
          }else{//用户第一次进入小程序
              that.getUserInfo();
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
  getUserInfo: function(){//获取用户信息(用户信息以三方后台为主)
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        wx.request({
          url: bsurl + '/user/wxpublogin.json',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data:{
            code:that.globalData.wxCode,
            nickName:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl,
            sexFlag:userInfo.gender //性别 0：未知、1：男、2：女
          },
          success: function (res) {
            // console.log(res);
            that.globalData.userInfo = res.data.data;
            wx.setStorageSync('userInfo',res.data.data);
            that.globalData.sessionId = res.data.data.sessionid;
            wx.setStorageSync('sessionId',res.data.data.sessionid);
          }
        })
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
