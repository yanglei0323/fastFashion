// pages/coupon/coupon.js
const app = getApp();
const bsurl = require('../../util/bsurl.js');
const imgpath = require('../../util/imgpath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedCoupon:[],
    couponList: [
      {id:1,title:'￥100',condition:'满1000元使用',type:'满减券',time:'2017.1.9-2017-1.10',select:false},
      {id:2,title:'9折',condition:'',type:'折扣券',time:'2017.1.9-2017-1.10',select:false},
      {id:3,title:'免费',condition:'',type:'体验券',time:'2017.1.9-2017-1.10',select:false},
      {id:4,title:'9折',condition:'',type:'折扣券',time:'2017.1.9-2017-1.10',select:false},
      {id:5,title:'免费',condition:'',type:'体验券',time:'2017.1.9-2017-1.10',select:false},
      {id:6,title:'免费',condition:'',type:'体验券',time:'2017.1.9-2017-1.10',select:false},
    ]
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
    return {
      title: '11111',
      desc: '222222',
      path: '',
      imageUrl: '',

    }
  },
  chooseCoupon: function (e){
    var that=this;
    let id = e.currentTarget.dataset.id;
    let couponList = this.data.couponList;
    let selectedCoupon = this.data.selectedCoupon;
    for(let item of couponList){
      if(item.id == id){
        if(!item.select){
          item.select = true;
          selectedCoupon.push(item);
        }else if(item.select){
          item.select = false;
          for(let selctitem of selectedCoupon){
            if(selctitem.id == id){
              let index=selectedCoupon.indexOf(selctitem);
              selectedCoupon.splice(index,1);
            }
          }
        }
      }
    }
    that.setData({
      selectedCoupon : selectedCoupon,
      couponList: couponList
    });
    // console.log(this.data.selectedCoupon);
  }
})