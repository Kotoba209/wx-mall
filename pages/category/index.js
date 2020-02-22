// pages/category/index.js

import {
  request,
  http,
} from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
const WXAPI = require('apifm-wxapi');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getStorageSync
    // this.getTest();
    const CatesName = wx.getStorageSync('CatesName');
    const CatesList = wx.getStorageSync('CatesList');
    if (!CatesName) {
      this.getCatesList();
    } else {
      if (Date.now() - CatesName.time > 1000 * 10) {
        this.getCatesList();
      } else {
        // 可以使用旧的数据
        this.Cates = CatesList.data;
        let leftMenuList = CatesName.data;
        let rightContent = this.Cates.filter(v => v.categoryId == leftMenuList[0].id);
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCatesList() {
    await WXAPI.goodsCategory().then(res => app.handleDestruction(res))
      .then((data) => {
        let leftMenuList = data.map(v => {
          return {
            id: v.id,
            name: v.name
          }
        });
        wx.setStorageSync('CatesName', {
          time: Date.now(),
          data: leftMenuList
        });
        this.setData({
          leftMenuList,
        })
      });
    // await http({
    //   url: '/shop/goods/category/all'
    // }).then(res => {
    //   // console.log(res, '<-res->');
    //   if (res.code == 0) {
    //     const {
    //       data
    //     } = res;
    //     let leftMenuList = data.map(v => {
    //       return {
    //         id: v.id,
    //         name: v.name
    //       }
    //     });
    //     wx.setStorageSync('CatesName', {
    //       time: Date.now(),
    //       data: leftMenuList
    //     });
    //     this.setData({
    //       leftMenuList,
    //     })
    //   }
    // });
    await WXAPI.goods().then(res => app.handleDestruction(res))
      .then((data) => {
        this.Cates = data;
        wx.setStorageSync('CatesList', {
          time: Date.now(),
          data: this.Cates
        });
        let rightContent = data.filter(v => v.categoryId == this.data.leftMenuList[0].id);
        this.setData({
          rightContent,
        })
      });
    // await http({
    //   url: '/shop/goods/list',
    // }).then(res => {
    //   const {
    //     data
    //   } = res;
    //   this.Cates = data;
    //   wx.setStorageSync('CatesList', {
    //     time: Date.now(),
    //     data: this.Cates
    //   });
    //   let rightContent = data.filter(v => v.categoryId == this.data.leftMenuList[0].id);
    //   this.setData({
    //     rightContent,
    //   })
    // });
  },
  handleItemTap(e) {
    const {
      id,
      index,
    } = e.currentTarget.dataset;
    let rightContent = this.Cates.filter(v => v.categoryId == id);
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    })
  },
})