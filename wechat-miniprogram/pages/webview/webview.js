// pages/webview/webview.js
const app = getApp();

Page({
  data: {
    url: ""
  },

  onLoad: function (options) {
    let targetUrl = app.globalData.webUrl;
    
    // Unpack if URL is passed as a query parameters
    if (options && options.url) {
      try {
        targetUrl = decodeURIComponent(options.url);
      } catch (err) {
        console.error("Failed to decode target URL:", err);
      }
    }
    
    console.log("Loading Webview with source:", targetUrl);
    this.setData({
      url: targetUrl
    });
  },

  // Let clients share their state or current link directly with friends
  onShareAppMessage: function (options) {
    const webviewUrl = options.webViewUrl || this.data.url;
    return {
      title: '春日小筑 - 极美数字多功能小屋',
      path: `/pages/webview/webview?url=${encodeURIComponent(webviewUrl)}`,
      imageUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mimi&backgroundColor=e6f4ea'
    };
  }
});
