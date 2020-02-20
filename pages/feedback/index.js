// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    // 被选中的图片路径 数组
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
  },

  uploadImgs: [],

  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const {
      index
    } = e.detail;
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  handleRemoveImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let {
      chooseImgs
    } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs,
    })
  },

  // 文本域的输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value,
    })
  },
  //提交表
  handleFormSubmit() {
    const {
      textVal,
      chooseImgs
    } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return;
    }

    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });

    if (chooseImgs.length != 0) {
      this.setData({
        textVal: '',
        chooseImgs: [],
      });
    } else {
      // wx.hideLoading();
    }
    wx.hideLoading();
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      mask: true,
    });
    wx.navigateBack({
      data: 1,
    })
  },
})