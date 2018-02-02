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
    currentDay:0,//用于选中时间的显示状态控制
    currentTime:0,//用于选中时间的显示状态控制
    day1:[],
    day2:[],
    day3:[],
    day4:[],
    day5:[],
    reservetime:[],
    showSelect:'请选择时间',
    cartList:[],
    cartNum:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var storeId = options.storeId;

    var tabInfo =[];//tab数据
    wx.showLoading({
      title: '加载中',
    });
    //构造头部日期选项卡
    for (let i = 0; i < 5; i++) {
      tabInfo.push({'date': that.addDays(i).date, 'week': that.addDays(i).week, 'index': i + 1});
    }
    that.setData({
      tabInfo:tabInfo,
      storeId:storeId
    });


    wx.request({//获取购物车中的信息
      url: bsurl + '/cart/mycart.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        storeid:storeId
      },
      success: function (res) {
        // console.log(res);
        let cartlist=res.data.data.cartlist;
        if(cartlist.length >= 1){
          let cartNum=1;
          for(let item of cartlist){
              cartNum += item.num;
          }
          that.setData({
            cartList:cartlist,
            cartNum:cartNum
          });
        }else{
          that.setData({
            cartList:cartlist,
            cartNum:1
          });
        }
      }
    });

    // 获取门店预约时间数组
    wx.request({
      url: bsurl + '/user/getreservetime.json',
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionid':app.globalData.sessionId
      },
      data:{
        storeid:storeId
      },
      success: function (res) {
          let reservetime = res.data.data.reservetime;
          that.setData({
            reservetime:reservetime.split(",")
          });
          var sepcificTimeArr = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
            '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
            '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', 
            '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
    
          //获取当前时间
          let mydate = new Date();
          let myhours=mydate.getHours();
          let mytime=mydate.getMinutes();
          var nowtime=new Date("1111/1/1," + myhours + ":" + mytime + ":0");
          //status：{5：已约满(修改为4)，9：已过期，<5：可预约}（9是前端自定义的）
          //构造day1第一天数据
          var day1List = [];
          for (let d1 = 1; d1 < 25; d1++) {
            let ydtime=new Date("1111/1/1," + sepcificTimeArr[d1 - 1] + ":0");
            let chartime=nowtime.getTime()-ydtime.getTime();
            if(chartime <= 0){//可预约
               day1List.push({'ischoose':false,'showSelect':that.data.tabInfo[0].date+' '+sepcificTimeArr[d1 - 1], 'day': 1, 'time': d1, 'showtime':sepcificTimeArr[d1 - 1], 'status':that.data.reservetime[0][d1 - 1]});
            }else{//已过期
                if(that.data.reservetime[0][d1 - 1] == 4){//已过期中属于预约满的情况
                   day1List.push({'ischoose':false,'showSelect':that.data.tabInfo[0].date+' '+sepcificTimeArr[d1 - 1], 'day': 1, 'time': d1, 'showtime':sepcificTimeArr[d1 - 1], 'status':that.data.reservetime[0][d1 - 1]});
                }else{
                   day1List.push({'ischoose':false,'showSelect':that.data.tabInfo[0].date+' '+sepcificTimeArr[d1 - 1], 'day': 1, 'time': d1, 'showtime':sepcificTimeArr[d1 - 1], 'status':9});
                }
            }
          }
          //构造day2第二天数据
          var day2List = [];
          for (let d2 = 1; d2 < 25; d2++) {
              day2List.push({'ischoose':false,'showSelect':that.data.tabInfo[1].date+' '+sepcificTimeArr[d2 - 1], 'day': 2, 'time': d2, 'showtime':sepcificTimeArr[d2 - 1], 'status':that.data.reservetime[1][d2 - 1]});
            
          }
          //构造day3第三天数据
          var day3List = [];
          for (let d3 = 1; d3 < 25; d3++) {
              day3List.push({'ischoose':false,'showSelect':that.data.tabInfo[2].date+' '+sepcificTimeArr[d3 - 1], 'day': 3, 'time': d3, 'showtime':sepcificTimeArr[d3 - 1], 'status':that.data.reservetime[2][d3 - 1]});
            
          }
          //构造day4第四天数据
          var day4List = [];
          for (let d4 = 1; d4 < 25; d4++) {
              day4List.push({'ischoose':false,'showSelect':that.data.tabInfo[3].date+' '+sepcificTimeArr[d4 - 1], 'day': 4, 'time': d4, 'showtime':sepcificTimeArr[d4 - 1], 'status':that.data.reservetime[3][d4 - 1]});
            
          }
          //构造day5第五天数据
          var day5List = [];
          for (let d5 = 1; d5 < 25; d5++) {
              day5List.push({'ischoose':false,'showSelect':that.data.tabInfo[4].date+' '+sepcificTimeArr[d5 - 1], 'day': 5, 'time': d5, 'showtime':sepcificTimeArr[d5 - 1], 'status':that.data.reservetime[4][d5 - 1]});
            
          }
          that.setData({
            day1:day1List,
            day2:day2List,
            day3:day3List,
            day4:day4List,
            day5:day5List
          });
          wx.hideLoading();
      }
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
    if( that.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {
      that.setData( { currentTab: e.target.dataset.current }); 
    } 
  },
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current + 1 });   
  
  }, 
  selectItem:function (e){
    var that = this;
    let currentDay = that.data.currentDay;
    let day = e.currentTarget.dataset.day;
    let time = e.currentTarget.dataset.time;
    let status = e.currentTarget.dataset.status;
    let showSelect = e.currentTarget.dataset.showselect;
    if(status >= 4){//当前时间不可选
        return;
    }else{
      switch (currentDay) {
          case 0:
              if(day == 1){
                  let day1 = that.data.day1;
                  for(let i=0;i<day1.length;i++){
                      if(day1[i].time == time){
                          for(let j = 0;j< that.data.cartNum;j++){
                              if(i+j <= 23){
                                  day1[i+j].ischoose= true;
                              }
                          }
                      }
                  }
                  that.setData({
                    currentDay:day,
                    currentTime:time,
                    showSelect:'您已选择：'+showSelect,
                    day1:day1
                  });
              }else if(day == 2){
                  let day2 = that.data.day2;
                  for(let i=0;i<day2.length;i++){
                      if(day2[i].time == time){
                          for(let j = 0;j< that.data.cartNum;j++){
                              if(i+j <= 23){
                                day2[i+j].ischoose= true;
                              }
                          }
                      }
                  }
                  that.setData({
                    currentDay:day,
                    currentTime:time,
                    showSelect:'您已选择：'+showSelect,
                    day2:day2
                  });
              }else if(day == 3){
                  let day3 = that.data.day3;
                  for(let i=0;i<day3.length;i++){
                      if(day3[i].time == time){
                          for(let j = 0;j< that.data.cartNum;j++){
                              if(i+j <= 23){
                              day3[i+j].ischoose= true;
                            }
                          }
                      }
                  }
                  that.setData({
                    currentDay:day,
                    currentTime:time,
                    showSelect:'您已选择：'+showSelect,
                    day3:day3
                  });
              }else if(day == 4){
                  let day4 = that.data.day4;
                  for(let i=0;i<day4.length;i++){
                      if(day4[i].time == time){
                          for(let j = 0;j< that.data.cartNum;j++){
                              if(i+j <= 23){
                              day4[i+j].ischoose= true;
                            }
                          }
                      }
                  }
                  that.setData({
                    currentDay:day,
                    currentTime:time,
                    showSelect:'您已选择：'+showSelect,
                    day4:day4
                  });
              }else if(day == 5){
                  let day5 = that.data.day5;
                  for(let i=0;i<day5.length;i++){
                      if(day5[i].time == time){
                          for(let j = 0;j< that.data.cartNum;j++){
                              if(i+j <= 23){
                              day5[i+j].ischoose= true;
                            }
                          }
                      }
                  }
                  that.setData({
                    currentDay:day,
                    currentTime:time,
                    showSelect:'您已选择：'+showSelect,
                    day5:day5
                  });
              }
              break;
          case 1:
              let day11=that.data.day1;
              for(let item of day11){
                item.ischoose = false;
              }
              that.setData({
                day1:day11
              });
              if(that.data.currentDay == day && that.data.currentTime == time){//已经是选中状态，则取消
                  that.setData({
                    currentDay:0,
                    currentTime:0,
                    showSelect:'请选择时间'
                  });
              }else{
                  if(day == 1){
                      let day111 = that.data.day1;
                      for(let i=0;i<day111.length;i++){
                          if(day111[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                              if(i+j <= 23){
                                  day111[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day1:day111
                      });
                  }else if(day == 2){
                      let day112 = that.data.day2;
                      for(let i=0;i<day112.length;i++){
                          if(day112[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day112[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day2:day112
                      });
                  }else if(day == 3){
                      let day113 = that.data.day3;
                      for(let i=0;i<day113.length;i++){
                          if(day113[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day113[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day3:day113
                      });
                  }else if(day == 4){
                      let day114 = that.data.day4;
                      for(let i=0;i<day114.length;i++){
                          if(day114[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day114[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day4:day114
                      });
                  }else if(day == 5){
                      let day115 = that.data.day5;
                      for(let i=0;i<day115.length;i++){
                          if(day115[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day115[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day5:day115
                      });
                  }
              }
              break;
          case 2:
              let day22=that.data.day2;
              for(let item of day22){
                item.ischoose = false;
              }
              that.setData({
                day2:day22
              });
              if(that.data.currentDay == day && that.data.currentTime == time){//已经是选中状态，则取消
                  that.setData({
                    currentDay:0,
                    currentTime:0,
                    showSelect:'请选择时间'
                  });
              }else{
                  if(day == 1){
                      let day221 = that.data.day1;
                      for(let i=0;i<day221.length;i++){
                          if(day221[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day221[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day1:day221
                      });
                  }else if(day == 2){
                      let day222 = that.data.day2;
                      for(let i=0;i<day222.length;i++){
                          if(day222[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day222[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day2:day222
                      });
                  }else if(day == 3){
                      let day223 = that.data.day3;
                      for(let i=0;i<day223.length;i++){
                          if(day223[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day223[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day3:day223
                      });
                  }else if(day == 4){
                      let day224 = that.data.day4;
                      for(let i=0;i<day224.length;i++){
                          if(day224[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day224[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day4:day224
                      });
                  }else if(day == 5){
                      let day225 = that.data.day5;
                      for(let i=0;i<day225.length;i++){
                          if(day225[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day225[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day5:day225
                      });
                  }
              }
              break;
          case 3:
              let day33=that.data.day3;
              for(let item of day33){
                item.ischoose = false;
              }
              that.setData({
                day3:day33
              });
              if(that.data.currentDay == day && that.data.currentTime == time){//已经是选中状态，则取消
                  that.setData({
                    currentDay:0,
                    currentTime:0,
                    showSelect:'请选择时间'
                  });
              }else{
                  if(day == 1){
                      let day331 = that.data.day1;
                      for(let i=0;i<day331.length;i++){
                          if(day331[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day331[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day1:day331
                      });
                  }else if(day == 2){
                      let day332 = that.data.day2;
                      for(let i=0;i<day332.length;i++){
                          if(day332[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day332[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day2:day332
                      });
                  }else if(day == 3){
                      let day333 = that.data.day3;
                      for(let i=0;i<day333.length;i++){
                          if(day333[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day333[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day3:day333
                      });
                  }else if(day == 4){
                      let day334 = that.data.day4;
                      for(let i=0;i<day334.length;i++){
                          if(day334[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day334[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day4:day334
                      });
                  }else if(day == 5){
                      let day335 = that.data.day5;
                      for(let i=0;i<day335.length;i++){
                          if(day335[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day335[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day5:day335
                      });
                  }
              }
              break;
          case 4:
              let day44=that.data.day4;
              for(let item of day44){
                item.ischoose = false;
              }
              that.setData({
                day4:day44
              });
              if(that.data.currentDay == day && that.data.currentTime == time){//已经是选中状态，则取消
                  that.setData({
                    currentDay:0,
                    currentTime:0,
                    showSelect:'请选择时间'
                  });
              }else{
                  if(day == 1){
                      let day441 = that.data.day1;
                      for(let i=0;i<day441.length;i++){
                          if(day441[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day441[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day1:day441
                      });
                  }else if(day == 2){
                      let day442 = that.data.day2;
                      for(let i=0;i<day442.length;i++){
                          if(day442[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day442[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day2:day442
                      });
                  }else if(day == 3){
                      let day443 = that.data.day3;
                      for(let i=0;i<day443.length;i++){
                          if(day443[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day443[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day3:day443
                      });
                  }else if(day == 4){
                      let day444 = that.data.day4;
                      for(let i=0;i<day444.length;i++){
                          if(day444[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day444[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day4:day444
                      });
                  }else if(day == 5){
                      let day445 = that.data.day5;
                      for(let i=0;i<day445.length;i++){
                          if(day445[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day445[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day5:day445
                      });
                  }
              }
              break;
          case 5:
              let day55=that.data.day5;
              for(let item of day55){
                item.ischoose = false;
              }
              that.setData({
                day5:day55
              });
              if(that.data.currentDay == day && that.data.currentTime == time){//已经是选中状态，则取消
                  that.setData({
                    currentDay:0,
                    currentTime:0,
                    showSelect:'请选择时间'
                  });
              }else{
                  if(day == 1){
                      let day551 = that.data.day1;
                      for(let i=0;i<day551.length;i++){
                          if(day551[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day551[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day1:day551
                      });
                  }else if(day == 2){
                      let day552 = that.data.day2;
                      for(let i=0;i<day552.length;i++){
                          if(day552[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day552[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day2:day552
                      });
                  }else if(day == 3){
                      let day553 = that.data.day3;
                      for(let i=0;i<day553.length;i++){
                          if(day553[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day553[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day3:day553
                      });
                  }else if(day == 4){
                      let day554 = that.data.day4;
                      for(let i=0;i<day554.length;i++){
                          if(day554[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day554[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day4:day554
                      });
                  }else if(day == 5){
                      let day555 = that.data.day5;
                      for(let i=0;i<day555.length;i++){
                          if(day555[i].time == time){
                              for(let j = 0;j< that.data.cartNum;j++){
                                if(i+j <= 23){
                                  day555[i+j].ischoose= true;
                                }
                              }
                          }
                      }
                      that.setData({
                        currentDay:day,
                        currentTime:time,
                        showSelect:'您已选择：'+showSelect,
                        day5:day555
                      });
                  }
              }
              break;
      }
              
    }
  },
  confirmAppoint: function (){
      var that = this;
      let storeId = that.data.storeId;
      let day = that.data.currentDay;
      let time = that.data.currentTime;
      if(day == 0){
          wx.showModal({
            title: '温馨提示',
            content: '请先选择预约时间！',
            showCancel:false,
            confirmColor:'#f6838d',
            success: function(res) {
            }
          })
          return;
      }else{
          wx.request({
            url: bsurl + '/user/reserve.json',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'sessionid':app.globalData.sessionId
            },
            data:{
              storeid:storeId,
              day:day,
              time:time 
            },
            success: function (res) {
              // console.log(res);
              if(res.data.code == 1){

                  app.globalData.refreshFlag = true;
                  wx.redirectTo({
                    url: '../payService/payService?orderid='+res.data.data.id
                  })
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