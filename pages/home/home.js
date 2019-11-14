import request from '../../service/network.js'

Page({
  data: {

  },
  onLoad: function (options) {
    // 发送网络请求
    wx.request({
      url: 'http://123.207.32.32:8000/recommend',
      success: function(res) {
        console.log(res);
      }
    })
    request({
      url: 'http://123.207.32.32:8000/recommend',
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
})