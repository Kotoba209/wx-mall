 // pages/cart/index.js
 import {
   getSetting,
   chooseAddress,
   openSetting,
   showModal,
   showToast
 } from '../../utils/asyncWx.js';
 import regeneratorRuntime from '../../lib/runtime/runtime';
 const AUTH = require('../../utils/auth')
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     address: {},
     cart: [],
     allChecked: false,
     totalPrice: 0,
     totalNum: 0,
     wxlogin: true,
   },
   onShow() {
     const address = wx.getStorageSync('address');
     const cart = wx.getStorageSync('cart') || [];

     this.setData({
       address,
     });
     this.setCart(cart);
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },

   async handleChooseAddress() {
     try {
       const res1 = await getSetting();
       const scopeAddress = res1.authSetting['scope.Address'];
       if (scopeAddress === false) {
         await openSetting();
       }
       const address = await chooseAddress();
       address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
       wx.setStorageSync('address', address);
     } catch (error) {
       console.log(error, '<-error->');
     }
   },
   handleItemChange(e) {
     const goods_id = e.currentTarget.dataset.id;
     let {
       cart
     } = this.data;

     let index = cart.findIndex(v => v.basicInfo.id === goods_id);
     cart[index].checked = !cart[index].checked;
     this.setCart(cart);
   },

   setCart(cart) {
     let allChecked = true;
     //  const allChecked = cart.length > 0 ? cart.every(v=> v.checked) : false;

     let totalPrice = 0;
     let totalNum = 0;

     cart.forEach(v => {
       if (v.checked) {
         totalPrice += v.num * v.basicInfo.minPrice;
         totalNum = v.num;
       } else {
         allChecked = false;
       }
     })
     allChecked = cart.length !== 0 ? allChecked : false;
     this.setData({
       cart,
       allChecked,
       totalPrice,
       totalNum,
     });
     wx.setStorageSync('cart', cart);
   },
   handleItemAllCheck() {
     let {
       cart,
       allChecked
     } = this.data;
     allChecked = !allChecked;
     cart.forEach(v => v.checked = allChecked);
     this.setCart(cart);
   },
   async handleItemNumEdit(e) {
     const {
       operation,
       id
     } = e.currentTarget.dataset;
     let {
       cart
     } = this.data;

     const index = cart.findIndex(v => v.basicInfo.id === id);
     if (cart[index].num === 1 && operation === -1) {
       const res = await showModal({
         content: '您是否要删除？'
       });
       if (res.confirm) {
         cart.splice(index, 1);
         this.setCart(cart);
       }
     } else {
       cart[index].num += operation;
       this.setCart(cart);
     }
   },
   async handlePay() {
     const token = wx.getStorageSync('token');
     AUTH.checkHasLogined().then(isLogined => {
       if (!isLogined) {
         this.setData({
           wxlogin: isLogined
         })
       }
     })
     //  console.log(status, '<-status->');
     const {
       totalNum
     } = this.data;
     if (!token) {
       return;
     }
     console.log(totalNum, '<-totalNum->');
     if (totalNum === 0) {
       await showToast({
         title: '您还没有选购商品'
       });
       return;
     }
     wx.navigateTo({
       url: '/pages/pay/index'
     });
   },
   cancelLogin() {
     this.setData({
       wxlogin: true
     })
   },
   processLogin(e) {
     if (!e.detail.userInfo) {
       wx.showToast({
         title: '已取消',
         icon: 'none',
       })
       return;
     }
     const {
       userInfo
     } = e.detail;
     wx.setStorageSync("userinfo", userInfo);
     this.setData({
       wxlogin: true,
     })
     AUTH.register(this);
     wx.showToast({
       title: '登录成功',
       icon: 'success',
       image: '',
       duration: 2000,
       mask: true,
     });
   },
 })