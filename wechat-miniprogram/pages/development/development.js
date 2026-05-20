// pages/development/development.js
Page({
  data: {
    devTools: [
      { id: "json-formatter", name: "JSON 格式化", desc: "实时校验及美化 JSON 数据结构", colorBg: "#E8F5E9", iconArt: "⚙️" },
      { id: "base64-codec", name: "Base64 编解码", desc: "对文本数据安全进行 Base64 编解码", colorBg: "#E1F5FE", iconArt: "🔀" },
      { id: "url-codec", name: "URL 编解码", desc: "对 URL 参数等字符进行百分号化处理", colorBg: "#FFF3E0", iconArt: "🔗" },
      { id: "ip-lookup", name: "IP 地理查询", desc: "定位目标 IP 归属及网络详情记录", colorBg: "#F3E5F5", iconArt: "🌏" }
    ],
    securityTools: [
      { id: "password", name: "密码生成器", desc: "自定义生成高强度、随机安全口令字符", colorBg: "#FFEBEE", iconArt: "🔑" }
    ]
  },

  onToolSelect(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    
    // Log history
    this.addHistoryLog(id, '打开了开发工具');

    wx.navigateTo({
      url: `/pages/tool/tool?id=${id}`
    });
  },

  addHistoryLog(toolId, details) {
    const logs = wx.getStorageSync('springnest_history') || [];
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    const toolCatalog = {
      'json-formatter': 'JSON 格式化',
      'base64-codec': 'Base64 编解码',
      'url-codec': 'URL 编解码',
      'ip-lookup': 'IP 地理查询',
      'password': '密码生成器'
    };
    
    const label = toolCatalog[toolId] || toolId;
    const newLog = {
      id: toolId,
      time: formattedDate,
      desc: `${label}: ${details}`
    };
    const updated = [newLog, ...logs].slice(0, 50);
    wx.setStorageSync('springnest_history', updated);
  }
});
