//index.js
//获取应用实例

const app = getApp()

Page({
  
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollbarMarginLeftIndex:0,

    indicatorDots:true,
    vertical:false,
    autoplay:false,
    interval:2000,
    duration:500,
    imageList: ['/img/product_00.png', '/img/product_01.png','/img/product_02.png'],

    productList:[
      { src: '/img/product_03.png',logo:"宜家",name:"椅子",price:345},
      { src: '/img/product_04.png', logo: "宜家", name: "椅子", price: 345 },
      { src: '/img/product_05.png', logo: "宜家", name: "椅子", price: 345 },
      { src: '/img/product_06.png', logo: "宜家", name: "椅子", price: 345 },
      { src: '/img/product_07.png', logo: "宜家", name: "椅子", price: 345 },
      { src: '/img/product_08.png', logo: "宜家", name: "椅子", price: 345},
      { src: '/img/product_09.png', logo: "宜家", name: "椅子", price: 345},
      { src: '/img/product_10.png', logo: "宜家", name: "椅子", price: 345},

    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // wx.cloud.init() 
    // const db = wx.cloud.database()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      }) 
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
