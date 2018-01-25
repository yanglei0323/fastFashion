const bsurl = require('./util/bsurl.js');
const imgpath = require('./util/imgpath.js');
App({
  onLaunch: function (options) {
    // console.log('App Launch')// 小程序启动之后 触发
    var that = this;
    //校验session是否过期
    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
          if(wx.getStorageSync('sessionId')){//有sessionId凭证
              //校验sessionId凭证是否过期
              that.globalData.userInfo = wx.getStorageSync('userInfo');
              that.globalData.sessionId = wx.getStorageSync('sessionId');
              that.globalData.wxCode = wx.getStorageSync('wxCode');
              that.confirmPhone();
              
          }else{//缓存中没有登录信息，重新获取(用户清理了缓存)
              that.getUserInfo();
          }
      },
      fail: function(){//第一次进入小程序或者session过期 
        //登录态过期
        that.getUserInfo();
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
    wx.login({
      success: res => {
          that.globalData.wxCode = res.code;//存储code以备后续使用
          wx.setStorageSync('wxCode',res.code);
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
                  that.confirmPhone();
                }
              })
            },
            fail: function (res){
              wx.showModal({
                title: '警告',
                content: '若不授权微信登录，则无法使用YUE时尚功能；点击重新获取授权，则可重新使用；若点击不授权，后期还可以使用小程序，需在微信【发现】-【小程序】-删掉【悦艺术家】，重新搜索授权登录，方能正常使用',
                showCancel:false,
                confirmText:'授权',
                success: function(res) {
                    wx.openSetting({
                      success:function(res){
                        if (!res.authSetting["scope.userInfo"]) {
                           //这里是授权成功之后 填写你重新获取数据的js
                           // console.log('重新授权');
                           that.getUserInfo();                                   
                        }else{
                           that.getUserInfo();
                        }
                      }
                    })
                },
                fail: function (res){
                  that.getUserInfo();
                }
              });

            }
          })
      }
    })
  },
  confirmPhone: function(){//验证是否绑定了手机号 
    var that = this;
    wx.request({
      url: bsurl + '/user/mine.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':that.globalData.sessionId
      },
      success: function (res) {
        if(res.data.code == 2){//初次登录且未绑定手机号 
          wx.redirectTo({
            url: '../setupTel/setupTel?type=1' 
          })
        }
      }
    });
  },
  globalData: {
    userInfo:null,    //用户信息
    sessionId:0,      //登陆状态保持凭证
    wxCode:0,         //授权后得到的code
    positionx:0,
    positiony:0
  }

})
