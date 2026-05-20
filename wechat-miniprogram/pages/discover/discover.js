// pages/discover/discover.js
Page({
  data: {
    searchQuery: '',
    
    // Quick links for main tiles
    favorites: [
      { id: 'notes', name: '便签', desc: '灵感记录', color: 'bg-p-dim', iconArt: '✍' },
      { id: 'translate', name: '翻译', desc: '多语种翻译', color: 'bg-s-dim', iconArt: '🌐' },
      { id: 'pomodoro', name: '番茄钟', desc: '专注心流', color: 'bg-t-dim', iconArt: '⏱' }
    ],

    // Daily tools list
    dailyTools: [
      { id: 'calculator', name: '计算器', desc: '科学计算器小工具', colorBg: '#E8F5E9', iconText: '🧮' },
      { id: 'bmi-calculator', name: 'BMI 计算', desc: '健康BMI指标系数测算', colorBg: '#E1F5FE', iconText: '⚖' },
      { id: 'bookkeeping', name: '随手记账', desc: '日常收支记账自律生活', colorBg: '#FFF3E0', iconText: '📒' },
      { id: 'scanner', name: '随身扫描仪', desc: '高清纸质文档扫描', colorBg: '#F3E5F5', iconText: '📷' },
      { id: 'weather', name: '天气查询', desc: '实时气候变化感知图纸', colorBg: '#E0F7FA', iconText: '☁' },
      { id: 'compass', name: '指南定位针', desc: '经典极简罗盘方向', colorBg: '#EFEBE9', iconText: '🧭' }
    ],

    // Fun tools list
    funTools: [
      { id: 'random-picker', name: '随机选择', desc: '转盘/帮你做决定', colorBg: '#F9FBE7', iconText: '🎯' },
      { id: 'color-converter', name: '颜色转换', desc: 'HEX/RGB/HSL互转', colorBg: '#FFF8E1', iconText: '🎨' },
      { id: 'random-number', name: '随机数生成', desc: '自定义区间随机数', colorBg: '#ECEFF1', iconText: '🎲' }
    ],

    // All tools merged for searches
    allTools: [
      { id: 'notes', name: '便签', desc: '写下日常随笔与灵感 records' },
      { id: 'translate', name: '翻译', desc: '多国语种快速翻译' },
      { id: 'pomodoro', name: '番茄钟', desc: '番茄专注心流时钟' },
      { id: 'calculator', name: '计算器', desc: '科学计算器算力' },
      { id: 'bmi-calculator', name: 'BMI 计算', desc: '测量身高体重健康系数' },
      { id: 'bookkeeping', name: '随手记账', desc: '记账本明细日历本' },
      { id: 'scanner', name: '扫描仪', desc: '纸质文字文档识别扫描' },
      { id: 'weather', name: '天气', desc: '查看实时温度与空气指数' },
      { id: 'compass', name: '指南针', desc: '方向识别气压定位' },
      { id: 'random-picker', name: '随机选择', desc: '选择困难症助手' },
      { id: 'color-converter', name: '颜色转换', desc: '设计师HEX与RGB色值生成器' },
      { id: 'random-number', name: '随机数', desc: '随机数摇号密码器' }
    ],
    filteredTools: []
  },

  onLoad() {
    this.setData({
      filteredTools: []
    });
  },

  onSearchInput(e) {
    const query = e.detail.value.trim();
    if (!query) {
      this.setData({
        searchQuery: '',
        filteredTools: []
      });
      return;
    }

    const matches = this.data.allTools.filter(t => 
      t.name.includes(query) || t.desc.includes(query)
    );
    this.setData({
      searchQuery: query,
      filteredTools: matches
    });
  },

  onToolSelect(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;

    // Save search to use history log
    this.addHistoryLog(id, `打开了小工具`);

    wx.navigateTo({
      url: `/pages/tool/tool?id=${id}`
    });
  },

  addHistoryLog(toolId, details) {
    const logs = wx.getStorageSync('springnest_history') || [];
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    // Find human title for logged id
    const toolCatalog = {
      'notes': '便签', 'translate': '翻译', 'pomodoro': '番茄钟',
      'calculator': '计算器', 'bmi-calculator': 'BMI 计算', 'bookkeeping': '随手记账',
      'scanner': '随身扫描', 'weather': '天气', 'compass': '指南针',
      'random-picker': '随机选择', 'color-converter': '颜色转换', 'random-number': '随机数'
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
