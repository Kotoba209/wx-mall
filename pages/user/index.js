/*
 * @Author: kotoba
 * @Date: 2020-03-22 16:46:54
 * @LastEditTime: 2021-04-09 19:46:03
 */
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
    var that = this;
    wx.getUserProfile({
      desc: "获取用户信息",
      success: (res) => {
        const {
          userInfo
        } = res;
        wx.setStorageSync("userinfo", userInfo);
        this.getUserInfo()
        AUTH.register(that);
      },
      fail: () => {
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none',
        })
      }
    })
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