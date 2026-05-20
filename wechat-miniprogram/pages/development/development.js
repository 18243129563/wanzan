// pages/development/development.js
Page({
  data: {
    tools: [
      { id: 'regex', name: '正则表达式测试', desc: '验证及匹配正则' },
      { id: 'color', name: '颜色转换', desc: 'HEX/RGB/HSL之间转换' }
    ]
  },
  onToolSelect() {
    wx.showToast({
      title: '正在开发中',
      icon: 'none'
    })
  }
})
