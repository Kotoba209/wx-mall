let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;

  wx.showLoading({
    title: "加载中",
    mask: true
  });
  const baseUrl = "https://api.zbztb.cn/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}

// export const request = (params) => {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       ...params,
//       success: (result) => {
//         resolve(result);
//       },
//       fail: (err) => {
//         reject(err);
//       }



//     });
//   })
// }

export const http = (params) => {
  ajaxTimes++;

  wx.showLoading({
    title: "加载中",
    mask: true
  });
  const baseUrl = "https://api.it120.cc/icetommy";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}