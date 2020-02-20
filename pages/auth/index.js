//Page Object
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

Page({
  async handleGetUserInfo(e) {
    const { code } = await login();
    console.log(code);
    wx.setStorageSync('token', code);
  }
});