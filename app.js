const TOKEN = 'token';
App({
  globalData: {
    token: ''
  },
  onLaunch: function () {
    // 先从缓存中取出token
    const token = wx.getStorageSync(TOKEN)
    // 判断token是否有值
    if (token && token.length != 0) {
       // 已经有token 验证是否过期 
      this.check_token(token);
    } else { // 没有token 进行登录操作
      this.login();
    }
  },
  check_token(token) {
    console.log("执行了验证登录操作");
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res) => {
        if (!res.data.errCode) {
          this.globalData.token = token;
        } else {
          this.login();
        }
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },
  login() {
    console.log("执行了登录操作");
    wx.login({
      success: (res) => {
        //  获取 code
        const code = res.code;
        // 将code 发送给服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            console.log(res);
            // 取出 token
            const token = res.data.token;
            // 储存到全局变量中
            this.globalData.token = token;
            // 储存到 storage中
            wx.setStorageSync(TOKEN, token);
          }
        })
      }
    })
  }
})
