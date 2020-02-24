// pages/pay/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request,
  http,
} from "../../request/index.js";
const WXAPI = require('apifm-wxapi');
const AUTH = require('../../utils/auth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    curAddressData: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    isNeedLogistics: 0,
    // wxlogin: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const address = wx.getStorageSync('address');

    let cart = wx.getStorageSync('cart') || [];

    cart = cart.filter(v => v.checked);

    // this.setData({ address });
    this.setData({
      isNeedLogistics: 1,
    })

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      cart,
      totalPrice += v.num * v.basicInfo.minPrice;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    })
    // this.initShippingAddress();
  },

  onShow() {
    this.initShippingAddress();
  },

  goCreateOrder() {
    wx.requestSubscribeMessage({
      tmplIds: ['ITVuuD_cwYN-5BjXne8cSktDo43xetj0u-lpvFZEQQs',
        'dw9Tzh9r0sw7Gjab0ovQJx3bP3gdXmF_FZvpnxPd6hc'
      ],
      success(res) {

      },
      fail(e) {
        console.error(e)
      },
      complete: (e) => {
        this.createOrder(true)
      },
    })
  },

  async handleOrderPay() {
    // wx.navigateTo({
    //   url: '/pages/auth/index'
    // });
    // 1 判断缓存中有没有token 
    const token = wx.getStorageSync("token");
    // 2 判断
    if (!token) {
      AUTH.login();
      return;
    }
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.curAddressData;
    const cart = this.data.cart;
    console.log(cart, '<-cart->');
    let goods = [];
    cart.forEach(v => goods.push({
      goodsId: v.basicInfo.id,
      number: v.num,
      propertyChildIds: "",
      logisticsType: 0
    }))
    let postData = {
      token: token,
      goodsJsonStr: JSON.stringify(goods),
      address: consignee_addr.address,
      linkMan: consignee_addr.linkMan,
      mobile: consignee_addr.mobile,
      provinceId: consignee_addr.provinceId,
      cityId: consignee_addr.cityId,
      code: consignee_addr.code,
    };
    await this.CreateOrder(postData);
    wx.navigateTo({
      url: '/pages/order/index'
    });
  },

  async CreateOrder(params) {
    await WXAPI.orderCreate(params).then(function (res) {
      if (res.code != 0) {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        })
        return;
      }
    })
    wx.removeStorageSync('cart');
    console.log(456, '<-456->');
  },

  async initShippingAddress() {
    const res = await WXAPI.defaultAddress(wx.getStorageSync("token"))
    if (res.code == 0) {
      console.log(res, '<-resaaa->');
      this.setData({
        curAddressData: res.data.info
      });
    } else {
      this.setData({
        curAddressData: null
      });
    }
  },

  addAddress: function () {
    wx.navigateTo({
      url: "/pages/address-add/index"
    })
  },
  selectAddress: function () {
    wx.navigateTo({
      url: "/pages/select-address/index"
    })
  },


})