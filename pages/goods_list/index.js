// pages/goods_list/index.js
import {
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
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },

  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || '';
    this.QueryParams.query = options.query || "";
    this.getList();
    // this.getGoodsList();
  },

  async getList() {
    // const res = await http({
    //   url: "/shop/goods/list",
    // });
    // const {
    //   data
    // } = res;
    // if (res.code == 0) {
    //   this.setData({
    //     goodsList: [...this.data.goodsList, ...data],
    //   })
    // }
    await WXAPI.goods().then(res => app.handleDestruction(res))
      .then((data) => {
        this.setData({
          goodsList: [...this.data.goodsList, ...data],
        })
      });
    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e) {
    // console.log(e, '<-e->');
    const {
      index
    } = e.detail;

    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs,
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom() {
    //  1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({
        title: '没有下一页数据'
      });

    } else {
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件 
  onPullDownRefresh() {
    // 1 重置数组
    this.setData({
      goodsList: []
    })
    // 2 重置页码
    this.QueryParams.pagenum = 1;
    // 3 发送请求
    this.getList();
  },
})