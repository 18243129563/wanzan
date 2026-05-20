// pages/efficiency/efficiency.js
Page({
  data: {
    timeTools: [
      { id: 'pomodoro', name: '番茄专注于小筑', desc: '随身番茄心流钟，沉浸自律工作区', colorBg: '#FFF3E0', iconArt: '⏱️' },
      { id: 'timer-stopwatch', name: '倒计时与秒表', desc: '毫秒自如精确时钟计步器', colorBg: '#ECEFF1', iconArt: '⏰' },
      { id: 'date-calculator', name: '日期计算', desc: '推算节日假期天数相跨区间', colorBg: '#E1F5FE', iconArt: '📅' }
    ],
    creativeTools: [
      { id: 'word-counter', name: '全能字数统计', desc: '字符、空格、词数等多维分析', colorBg: '#E8F5E9', iconArt: '📊' },
      { id: 'case-converter', name: '大小写转换', desc: '一键将英文快速变换大小写格式', colorBg: '#F3E5F5', iconArt: '🔠' },
      { id: 'markdown-preview', name: 'Markdown 编辑', desc: '富文本 Markdown 编译预览', colorBg: '#FFF8E1', iconArt: '📝' },
      { id: 'text-diff', name: '文本精细对比', desc: '两段文本差异高亮与对比校验', colorBg: '#E0F7FA', iconArt: '⚖️' }
    ],
    docTools: [
      { id: 'word-to-pdf', name: 'Word 转 PDF', desc: '将办公 Word 文档安全打包输出', colorBg: '#FFEBEE', iconArt: '📄' },
      { id: 'pdf-to-word', name: 'PDF 转 Word', desc: '从 PDF 中精细提取文字排版', colorBg: '#F1F3EE', iconArt: '📂' }
    ]
  },

  onToolSelect(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    
    // Log history
    this.addHistoryLog(id, '打开了效率工具');

    wx.navigateTo({
      url: `/pages/tool/tool?id=${id}`
    });
  },

  addHistoryLog(toolId, details) {
    const logs = wx.getStorageSync('springnest_history') || [];
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    const toolCatalog = {
      'pomodoro': '番茄钟',
      'timer-stopwatch': '倒计时',
      'date-calculator': '日期计算',
      'word-counter': '全能字数统计',
      'case-converter': '大小写转换',
      'markdown-preview': 'Markdown 编辑',
      'text-diff': '文本精细对比',
      'word-to-pdf': 'Word 转 PDF',
      'pdf-to-word': 'PDF 转 Word'
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
