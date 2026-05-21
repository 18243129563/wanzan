// pages/index/index.js
const app = getApp();

Page({
  data: {
    webUrl: ""
  },

  onLoad: function() {
    // Set matching URL from App global configurations
    this.setData({
      webUrl: app.globalData.webUrl
    });
  },

  // Launch uncastrated web application via WeChat High-Spec Webview
  enterSpringNest: function() {
    wx.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(this.data.webUrl)}`
    });
  },

  // Let client copy url directly
  copyWebLink: function() {
    const url = this.data.webUrl;
    wx.setClipboardData({
      data: url,
      success: function() {
        wx.showToast({
          title: '网址复制成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },

  // Share capability configurations
  onShareAppMessage: function () {
    return {
      title: '春日小筑 - 极简化美学数字工具小屋',
      path: '/pages/index/index',
      imageUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mimi&backgroundColor=e6f4ea'
    };
  }
});
