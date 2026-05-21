// app.js
App({
  onLaunch: function () {
    console.log("春日小筑 Mini Program Initialized.");
    // Display global startup info
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  globalData: {
    // Default shared production URL of Spring Nest for the view container
    webUrl: "https://ais-pre-g7wnmt6efgjablc3m226us-643527748225.us-east1.run.app"
  }
});
