// pages/discover/discover.js
Page({
  data: {
    searchQuery: '',
    allTools: [
      { id: 'json', name: 'JSON 格式化', desc: '验证、美化 JSON', icon: 'tool1' },
      { id: 'base64', name: 'Base64 编码', desc: '文本编解码', icon: 'tool2' },
      { id: 'hash', name: '哈希提取', desc: 'MD5, SHA等', icon: 'tool3' },
      { id: 'jwt', name: 'JWT 解码', desc: '查看令牌内容', icon: 'tool4' }
    ],
    filteredTools: []
  },

  onLoad() {
    this.setData({
      filteredTools: this.data.allTools
    })
  },

  onSearchInput(e) {
    const query = e.detail.value;
    const tools = this.data.allTools.filter(t => 
      t.name.includes(query) || t.desc.includes(query)
    );
    this.setData({
      searchQuery: query,
      filteredTools: tools
    })
  },

  onToolSelect(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '正在开发中',
      icon: 'none'
    })
  }
})
