//Page Object
import {
  request,
  http,
} from '../../request/index';
const WXAPI = require('apifm-wxapi');
const app = getApp(); // 获取全局
Page({
  data: {
    swiperList: [],
    catesList: [],
    goodsList: [],
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getGoodsList();
  },
  getSwiperList() {
    // http({
    //     url: "/banner/list"
    //   })
    //   .then(res => {
    //     const {
    //       data
    //     } = res;
    //     if (res.code == 0) {
    //       this.setData({
    //         swiperList: data
    //       })
    //     }
    //   })
    // handleDestruction 为定义在 app.js里面的全局方法，用于解构数据
    WXAPI.banners().then(res => app.handleDestruction(res))
      .then((data) => {
        this.setData({
          swiperList: data,
        })
      });
  },
  getCateList() {
    // http({
    //     url: "/shop/goods/category/all"
    //   })
    //   .then(res => {
    //     // console.log(res, '<-res->');
    //     const {
    //       data
    //     } = res;
    //     if (res.code == 0) {
    //       this.setData({
    //         catesList: data
    //       })
    //     }
    //   });
    WXAPI.goodsCategory().then(res => app.handleDestruction(res))
      .then((data) => {
        this.setData({
          catesList: data,
        })
      });
  },

  getGoodsList() {
    // http({
    //     url: "/shop/goods/list"
    //   })
    //   .then(res => {
    //     console.log(res, '<-res456->');
    //     const {
    //       data
    //     } = res;
    //     if (res.code == 0) {
    //       this.setData({
    //         goodsList: data
    //       })
    //     }
    //   });
    WXAPI.goods().then(res => app.handleDestruction(res))
      .then((data) => {
        this.setData({
          goodsList: data,
        })
      });
  },
});