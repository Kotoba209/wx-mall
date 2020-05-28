// pages/user/index.js
const AUTH = require('../../utils/auth')
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0,
    wxlogin: true,
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    console.log(userinfo, '<-userinfo->');
    const collect = wx.getStorageSync("collect") || [];
    if (!userinfo) {
      this.setData({
        wxlogin: false,
        userinfo: {},
        collectNums: 0,
      })
    } else {
      this.setData({
        userinfo,
        collectNums: collect.length,
      })
    }

    // this.setData({
    //   userinfo,
    //   collectNums: collect.length
    // });
  },
  cancelLogin() {
    this.setData({
      wxlogin: true
    })
  },
  processLogin(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: 'none',
      })
      return;
    }
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    this.getUserInfo()
    AUTH.register(this);
  },

  getUserInfo() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({
      userinfo,
      collectNums: collect.length,
      wxlogin: true,
    });
  },
  login() {
    this.setData({
      wxlogin: false
    })
  },
})