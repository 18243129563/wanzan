// pages/profile/profile.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: null
  },
  onLogin() {
    if (this.data.isLoggedIn) return;
    
    // Wechat login API call mock
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          isLoggedIn: true
        })
      }
    })
  }
})
