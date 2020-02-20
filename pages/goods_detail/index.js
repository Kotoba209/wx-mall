// pages/goods_detail/index.js

import {
  request,
  http
} from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false,
  },

  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      id
    } = options;
    console.log(options, '<-options->');
    console.log(id, '<-id->');
    this.getGoodsDetail(id);
  },

  async getGoodsDetail(id) {
    const res = await http({
      url: "/shop/goods/detail",
      data: {
        id
      }
    })
    console.log(res, '<-res->');
    const {
      data
    } = res;
    this.GoodsInfo = data;
    let collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v => v.basicInfo.id === this.GoodsInfo.basicInfo.id);
    this.setData({
      goodsObj: {
        goods_name: data.basicInfo.name,
        goods_price: data.basicInfo.minPrice,
        goods_introduce: data.content,
        pics: data.pics,
      },
      isCollect,
    });
    WxParse.wxParse('article', 'html', data.content, this, 5);
  },

  handlePrevewImage(e) {
    // console.log(1, '<-1->');
    const urls = this.GoodsInfo.pics.map(v => v.pic);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
    });
  },

  // 加入购物车
  handleCartAdd() {
    // console.log(12, '<-12->');
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.basicInfo.id === this.GoodsInfo.basicInfo.id);
    if (index === -1) {
      // 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    } else {
      // 已存在购物车数据， 当前商品的数量
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
    });
  },
  // 点击 收藏商品
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.basicInfo.id === this.GoodsInfo.basicInfo.id);

    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
    } else {
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    });
  },
})