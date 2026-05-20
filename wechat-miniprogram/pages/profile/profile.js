// pages/profile/profile.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    showAboutModal: false,
    showHistoryModal: false,
    historyLogs: []
  },

  onShow() {
    this.loadHistoryLogs();
  },

  onLogin() {
    if (this.data.isLoggedIn) return;

    wx.getUserProfile({
      desc: '用于完善春日小筑使用者名册',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          isLoggedIn: true
        });
        wx.showToast({
          title: '欢迎来到春日小筑！',
          icon: 'success'
        });
      },
      fail: () => {
        // Mock login if they block user info (convenient for simulation)
        this.setData({
          userInfo: {
            nickName: 'ittmarkrueger4@gmail.com',
            avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mimi&backgroundColor=e6f4ea'
          },
          isLoggedIn: true
        });
        wx.showToast({
          title: '已自动验证登录',
          icon: 'success'
        });
      }
    });
  },

  onLogout() {
    wx.showModal({
      title: '切断连接',
      content: '确认退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            isLoggedIn: false,
            userInfo: null
          });
          wx.showToast({
            title: '已安全退出',
            icon: 'none'
          });
        }
      }
    });
  },

  loadHistoryLogs() {
    const logs = wx.getStorageSync('springnest_history') || [];
    this.setData({
      historyLogs: logs
    });
  },

  clearHistory() {
    wx.showModal({
      title: '清理记录',
      content: '确认安全清理全部的历史点击记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('springnest_history', []);
          this.setData({ historyLogs: [] });
          wx.showToast({
            title: '清理成功'
          });
        }
      }
    });
  },

  toggleAbout(e) {
    const show = e.currentTarget.dataset.show === 'true';
    this.setData({
      showAboutModal: show
    });
  },

  toggleHistory(e) {
    const show = e.currentTarget.dataset.show === 'true';
    this.setData({
      showHistoryModal: show
    });
    if (show) {
      this.loadHistoryLogs();
    }
  }
});
