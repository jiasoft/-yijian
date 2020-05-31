// pages/active/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    specialOfferProductList:[
      { src: '/img/product_03.png',logo:"宜家",name:"椅子",price:345,oldprice:1223},
      { src: '/img/product_04.png', logo: "宜家", name: "椅子", price: 345 ,oldprice:1223},
      { src: '/img/product_05.png', logo: "宜家", name: "椅子", price: 345 ,oldprice:1223},
    ],
    activeBar:{
      src:"/img/active_01.png",
      name:"active_01"
    },
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