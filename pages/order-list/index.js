var wxpay = require('../../utils/pay.js')
const api = require('../../utils/request.js')
var app = getApp()
Page({
  data: {
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType: 0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap: function(e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
  orderDetail: function(e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          api.fetchRequest('/order/close', {
            token: wx.getStorageSync('token'),
            orderId: orderId
          }).then(function(res) {
            if (res.data.code == 0) {
              that.onShow();
            }
          }).finally(function(res) {
            wx.hideLoading();
          })
        }
      }
    })
  },
  toPayTap: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    var needScore = e.currentTarget.dataset.score;
    api.fetchRequest('/user/amount', {
      token: wx.getStorageSync('token'),
    }).then(function(res) {
      if (res.data.code == 0) {
        // res.data.data.balance
        money = money - res.data.data.balance;
        if (res.data.data.score < needScore) {
          wx.showModal({
            title: '错误',
            content: '您的积分不足，无法支付',
            showCancel: false
          })
          return;
        }
        if (money <= 0) {
          // 直接使用余额支付
          api.fetchRequest('/order/pay', {
            token: wx.getStorageSync('token'),
            orderId: orderId
          }, 'POST', 0, {
            'content-type': 'application/x-www-form-urlencoded'
          }).then(function(res) {
            that.onShow();
          })
        } else {
          wxpay.wxpay(app, money, orderId, "/pages/order-list/index");
        }
      } else {
        wx.showModal({
          title: '错误',
          content: '无法获取用户资金信息',
          showCancel: false
        })
      }
    })
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载

  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function() {
    var that = this;
    api.fetchRequest('/order/statistics', {
      token: wx.getStorageSync('token')
    }).then(function(res) {
      if (res.data.code == 0) {
        var tabClass = that.data.tabClass;
        if (res.data.data.count_id_no_pay > 0) {
          tabClass[0] = "red-dot"
        } else {
          tabClass[0] = ""
        }
        if (res.data.data.count_id_no_transfer > 0) {
          tabClass[1] = "red-dot"
        } else {
          tabClass[1] = ""
        }
        if (res.data.data.count_id_no_confirm > 0) {
          tabClass[2] = "red-dot"
        } else {
          tabClass[2] = ""
        }
        if (res.data.data.count_id_no_reputation > 0) {
          tabClass[3] = "red-dot"
        } else {
          tabClass[3] = ""
        }
        if (res.data.data.count_id_success > 0) {
          //tabClass[4] = "red-dot"
        } else {
          //tabClass[4] = ""
        }

        that.setData({
          tabClass: tabClass,
        });
      }
    }).finally(function(res) {
      wx.hideLoading();
    })
  },
  onShow: function() {
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      token: wx.getStorageSync('token')
    };
    postData.status = that.data.currentType;
    this.getOrderStatistics();
    api.fetchRequest('/order/list', postData).then(function(res) {
      if (res.data.code == 0) {
        that.setData({
          orderList: res.data.data.orderList,
          logisticsMap: res.data.data.logisticsMap,
          goodsMap: res.data.data.goodsMap
        });
      } else {
        that.setData({
          orderList: null,
          logisticsMap: {},
          goodsMap: {}
        });
      }
    }).finally(function(res) {
      wx.hideLoading();
    })
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数

  }
})