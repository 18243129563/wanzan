// pages/efficiency/efficiency.js
Page({
  data: {
    tools: [
      { id: 'tomato', name: '番茄钟', desc: '基于时间的专注工作法' },
      { id: 'todo', name: '简易待办', desc: '快速记录待办事项' }
    ]
  },
  onToolSelect() {
    wx.showToast({
      title: '正在开发中',
      icon: 'none'
    })
  }
})
