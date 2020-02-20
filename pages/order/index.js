// pages/order/index.js

import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const {
      type
    } = currentPage.options;
    this.changeTitleByIndex(type - 1);
    // this
  },

  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
    if (index == 0) {
      this.setData({
        content: '全部订单'
      });
      return;
    }
    if (index == 1) {
      this.setData({
        content: '待付款'
      });
      return;
    }
    if (index == 2) {
      this.setData({
        content: '待发货'
      });
    } else {
      this.setData({
        content: '退款/退货'
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
  },
})