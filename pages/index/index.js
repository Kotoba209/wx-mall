//Page Object
import {
  request,
  http,
} from '../../request/index';
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: [],
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/kotoba/shop/goods/category/all',
      success: function (res) {
        console.log(res, 'resAPI');
      }
    });
  },
  getSwiperList() {
    http({
        url: "/banner/list"
      })
      .then(res => {
        const {
          data
        } = res;
        if (res.code == 0) {
          this.setData({
            swiperList: data
          })
        }
      })
  },
  getCateList() {
    http({
        url: "/shop/goods/category/all"
      })
      .then(res => {
        // console.log(res, '<-res->');
        const {
          data
        } = res;
        if (res.code == 0) {
          this.setData({
            catesList: data
          })
        }
      });
  },

  getFloorList() {
    http({
        url: "/shop/goods/list"
      })
      .then(res => {
        console.log(res, '<-res456->');
        const {
          data
        } = res;
        if (res.code == 0) {
          this.setData({
            floorList: data
          })
        }
      });
  },
});