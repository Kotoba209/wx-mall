//app.js
const WXAPI = require('apifm-wxapi');

// WXAPI.init('kotoba');

App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {
    WXAPI.init(this.globalData.subDomain);
  },
  handleDestruction(res) {
    const {
      data = []
    } = res; // 设默认值为 [] 以免获取数据失败时发生错误
    return data;
  },
  login(e) {
    if (!e.detail.userInfo) {
      // 你点了取消授权
      return;
    }
    wx.login({
      success: function (res) {
        const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
        WXAPI.login_wx(code).then(function (res) {
          // 登录接口返回结果
          console.log(res)
        })
      }
    })
  },
  onShow(e) {
    this.globalData.launchOption = e
    // 保存邀请人
    if (e && e.query && e.query.inviter_id) {
      wx.setStorageSync('referrer', e.query.inviter_id)
      if (e.shareTicket) {
        // 通过分享链接进来
        wx.getShareInfo({
          shareTicket: e.shareTicket,
          success: res => {
            // console.error(res)
            // console.error({
            //   referrer: e.query.inviter_id,
            //   encryptedData: res.encryptedData,
            //   iv: res.iv
            // })
            WXAPI.shareGroupGetScore(
              e.query.inviter_id,
              res.encryptedData,
              res.iv
            )
          }
        })
      }
    }
    // 自动登录
    // AUTH.checkHasLogined().then(isLogined => {
    //   if (!isLogined) {
    //     AUTH.login()
    //   }
    // })
  },
  globalData: {
    subDomain: "kotoba"
  }
});