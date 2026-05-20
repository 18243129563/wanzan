// pages/tool/tool.js
Page({
  data: {
    toolId: '',
    toolName: '',
    toolDesc: '',
    isFallback: false,

    // Copying state
    copiedKey: '',

    // 1) JSON Formatter
    jsonInput: '',
    jsonOutput: '',
    jsonError: '',

    // 2) Base64
    base64Input: '',
    base64Output: '',

    // 3) Color Converter
    hexColor: '#7A5749',
    rgbColor: 'rgb(122, 87, 73)',
    hslColor: 'hsl(17, 25%, 38%)',
    cmykColor: 'cmyk(0%, 29%, 40%, 52%)',
    textColor: '#ffffff',

    // 4) Password Generator
    passwordLength: 16,
    passwordResult: 'aB3!xD9@qP2#mZ7$',
    optUpper: true,
    optLower: true,
    optNumber: true,
    optSymbols: true,

    // 5) Pomodoro Timer
    pomodoroTime: '25:00',
    pomodoroState: 'idle', // idle, running, paused
    pomodoroMode: 'focus', // focus, break
    timerLeft: 1500, // seconds

    // 6) Case Converter
    caseInput: '',
    caseOutput: '',

    // 7) Word Counter
    counterInput: '',
    charCount: 0,
    charNoSpace: 0,
    wordCount: 0,
    lineCount: 0,

    // 8) Bookkeeping
    bkType: 'expense',
    bkAmount: '',
    bkNote: '',
    bkBalance: 0,
    bkList: []
  },

  // Page lifecycle
  onLoad(options) {
    const id = options.id || 'json-formatter';
    this.setData({ toolId: id });
    this.initTool(id);
  },

  onUnload() {
    this.stopPomodoro();
  },

  // Initialize tool details & meta-specifications
  initTool(id) {
    let name = '';
    let desc = '';
    let isFallback = false;

    switch (id) {
      case 'json-formatter':
        name = 'JSON 格式化';
        desc = '实时校验、格式化及美化复杂的 JSON 数据。';
        break;
      case 'base64-codec':
        name = 'Base64 编解码';
        desc = '文本进行 Base64 编解码处理。';
        break;
      case 'color-converter':
        name = '颜色转换器';
        desc = '在 HEX, RGB, HSL 等模式间无缝转换并生成色块。';
        this.parseHex(this.data.hexColor);
        break;
      case 'password':
        name = '密码生成器';
        desc = '自定义定制高强度安全口令。';
        this.generatePassword();
        break;
      case 'pomodoro':
        name = '番茄专注于小筑';
        desc = '随身番茄专注钟，为您留出纯粹的时光空间。';
        break;
      case 'case-converter':
        name = '大小写转换';
        desc = '快速转换文本的大小写格式。';
        break;
      case 'word-counter':
        name = '字数统计';
        desc = '字、字符、行数等文本指标多维剖析。';
        break;
      case 'bookkeeping':
        name = '随手记账';
        desc = '极简日常账目记录，数据完全保存在本地。';
        this.loadBookkeeping();
        break;
      default:
        isFallback = true;
        name = '敬请期待';
        desc = '此工具正在赶来的路上。请稍后再试。';
    }

    this.setData({
      toolName: name,
      toolDesc: desc,
      isFallback: isFallback
    });

    wx.setNavigationBarTitle({
      title: name
    });
  },

  // Helper: show toast message
  showToast(title, icon = 'none') {
    wx.showToast({
      title,
      icon,
      duration: 1500
    });
  },

  // Copy text helper
  copyText(e) {
    const text = e.currentTarget.dataset.text;
    const key = e.currentTarget.dataset.key || 'result';
    if (!text) return;

    wx.setClipboardData({
      data: text,
      success: () => {
        this.setData({ copiedKey: key });
        setTimeout(() => this.setData({ copiedKey: '' }), 1500);
      }
    });
  },

  // ==========================================
  // 1) JSON FORMAT LAB
  // ==========================================
  onJsonInput(e) {
    this.setData({ jsonInput: e.detail.value });
  },

  formatJson() {
    const input = this.data.jsonInput.trim();
    if (!input) {
      this.showToast('请输入 JSON 内容');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      this.setData({
        jsonOutput: JSON.stringify(parsed, null, 2),
        jsonError: ''
      });
    } catch (e) {
      this.setData({
        jsonError: e.message || 'JSON 语法错误'
      });
    }
  },

  // ==========================================
  // 2) BASE64 TOOL
  // ==========================================
  onBase64Input(e) {
    this.setData({ base64Input: e.detail.value });
  },

  base64Encode() {
    const text = this.data.base64Input;
    if (!text) {
      this.showToast('请输入文本');
      return;
    }
    try {
      // WeChat doesn't have standard window.btoa natively, use simple implementation
      const encoded = this.utf8_to_b64(text);
      this.setData({ base64Output: encoded });
    } catch (e) {
      this.setData({ base64Output: '编码出错: ' + e.message });
    }
  },

  base64Decode() {
    const text = this.data.base64Input.trim();
    if (!text) {
      this.showToast('请输入 Base64 字符串');
      return;
    }
    try {
      const decoded = this.b64_to_utf8(text);
      this.setData({ base64Output: decoded });
    } catch (e) {
      this.setData({ base64Output: '解码失败: 字符不合规。' });
    }
  },

  // UTF-8 to Base64 encode / decode
  utf8_to_b64(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let i = 0;
    // Simple base64 encoder
    const utf8Bytes = [];
    for (let j = 0; j < str.length; j++) {
      let code = str.charCodeAt(j);
      if (code < 0x80) {
        utf8Bytes.push(code);
      } else if (code < 0x800) {
        utf8Bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
      } else if (code < 0xd800 || code >= 0xe000) {
        utf8Bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
      } else {
        j++;
        code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(j) & 0x3ff));
        utf8Bytes.push(
          0xf0 | (code >> 18),
          0x80 | ((code >> 12) & 0x3f),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f)
        );
      }
    }
    while (i < utf8Bytes.length) {
      const byte1 = utf8Bytes[i++];
      const byte2 = i < utf8Bytes.length ? utf8Bytes[i++] : NaN;
      const byte3 = i < utf8Bytes.length ? utf8Bytes[i++] : NaN;

      const enc1 = byte1 >> 2;
      const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
      let enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
      let enc4 = byte3 & 63;

      if (isNaN(byte2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(byte3)) {
        enc4 = 64;
      }

      result += alphabet.charAt(enc1) + alphabet.charAt(enc2) + 
                (enc3 === 64 ? '=' : alphabet.charAt(enc3)) + 
                (enc4 === 64 ? '=' : alphabet.charAt(enc4));
    }
    return result;
  },

  b64_to_utf8(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const cleanStr = str.replace(/[^A-Za-z0-9\+\/]/g, '');
    let result = '';
    let i = 0;
    const utf8Bytes = [];
    while (i < cleanStr.length) {
      const enc1 = alphabet.indexOf(cleanStr.charAt(i++));
      const enc2 = alphabet.indexOf(cleanStr.charAt(i++));
      const enc3 = i < cleanStr.length ? alphabet.indexOf(cleanStr.charAt(i++)) : NaN;
      const enc4 = i < cleanStr.length ? alphabet.indexOf(cleanStr.charAt(i++)) : NaN;

      const byte1 = (enc1 << 2) | (enc2 >> 4);
      const byte2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      const byte3 = ((enc3 & 3) << 6) | enc4;

      utf8Bytes.push(byte1);
      if (enc3 !== 64 && !isNaN(enc3)) utf8Bytes.push(byte2);
      if (enc4 !== 64 && !isNaN(enc4)) utf8Bytes.push(byte3);
    }
    // Convert UTF8 bytes to string
    let out = '';
    let c = 0;
    while (c < utf8Bytes.length) {
      const b1 = utf8Bytes[c++];
      if (b1 < 128) {
        out += String.fromCharCode(b1);
      } else if (b1 > 191 && b1 < 224) {
        const b2 = utf8Bytes[c++];
        out += String.fromCharCode(((b1 & 31) << 6) | (b2 & 63));
      } else {
        const b2 = utf8Bytes[c++];
        const b3 = utf8Bytes[c++];
        out += String.fromCharCode(((b1 & 15) << 12) | ((b2 & 63) << 6) | (b3 & 63));
      }
    }
    return out;
  },

  // ==========================================
  // 3) COLOR CONVERTER
  // ==========================================
  onHexColorInput(e) {
    this.parseHex(e.detail.value);
  },

  randomizeColor() {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    this.parseHex(randomHex);
  },

  parseHex(val) {
    let input = val;
    if (input && !input.startsWith('#')) input = '#' + input;
    if (!input || (input.length !== 4 && input.length !== 7)) {
      this.setData({ hexColor: input });
      return;
    }

    const rgb = this.hexToRgb(input) || [0, 0, 0];
    const hsl = this.rgbToHsl(rgb[0], rgb[1], rgb[2]);
    const cmyk = this.rgbToCmyk(rgb[0], rgb[1], rgb[2]);

    const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    const textColor = luminance > 128 ? '#191C1A' : '#ffffff';

    this.setData({
      hexColor: input.toUpperCase(),
      rgbColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      hslColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
      cmykColor: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`,
      textColor: textColor
    });
  },

  hexToRgb(h) {
    let r = 0, g = 0, b = 0;
    const cleanHex = h.replace('#', '');
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return [r, g, b];
  },

  rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  },

  rgbToCmyk(r, g, b) {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return [0, 0, 0, 100];
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100)
    ];
  },

  // ==========================================
  // 4) PASSWORD GENERATOR
  // ==========================================
  onLengthSelect(e) {
    this.setData({ passwordLength: e.detail.value });
    this.generatePassword();
  },

  onOptChange(e) {
    const key = e.currentTarget.dataset.opt;
    this.setData({ [key]: e.detail.value.length > 0 });
    this.generatePassword();
  },

  generatePassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let pool = '';
    if (this.data.optUpper) pool += uppercase;
    if (this.data.optLower) pool += lowercase;
    if (this.data.optNumber) pool += numbers;
    if (this.data.optSymbols) pool += symbols;

    if (!pool) {
      this.setData({ passwordResult: '⚠️ 请选择至少一种字符集' });
      return;
    }

    let p = '';
    const length = this.data.passwordLength;
    for (let i = 0; i < length; i++) {
      p += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    this.setData({ passwordResult: p });
  },

  // ==========================================
  // 5) POMODORO TIMER
  // ==========================================
  startPausePomodoro() {
    if (this.data.pomodoroState === 'running') {
      this.pausePomodoro();
    } else {
      this.startPomodoro();
    }
  },

  startPomodoro() {
    this.setData({ pomodoroState: 'running' });
    this.timer = setInterval(() => {
      let secondsLeft = this.data.timerLeft - 1;
      if (secondsLeft <= 0) {
        clearInterval(this.timer);
        this.timerEnded();
        return;
      }
      this.setData({
        timerLeft: secondsLeft,
        pomodoroTime: this.formatTimeDisplay(secondsLeft)
      });
    }, 1000);
  },

  pausePomodoro() {
    clearInterval(this.timer);
    this.setData({ pomodoroState: 'paused' });
  },

  stopPomodoro() {
    if (this.timer) clearInterval(this.timer);
  },

  resetPomodoro() {
    this.stopPomodoro();
    const isFocus = this.data.pomodoroMode === 'focus';
    const defaultSecs = isFocus ? 1500 : 300; // 25min vs 5min
    this.setData({
      timerLeft: defaultSecs,
      pomodoroState: 'idle',
      pomodoroTime: this.formatTimeDisplay(defaultSecs)
    });
  },

  switchPomodoroMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.stopPomodoro();
    const defaultSecs = mode === 'focus' ? 1500 : 300;
    this.setData({
      pomodoroMode: mode,
      timerLeft: defaultSecs,
      pomodoroState: 'idle',
      pomodoroTime: this.formatTimeDisplay(defaultSecs)
    });
    this.showToast(mode === 'focus' ? '已切换至专注状态' : '已进入小休模式');
  },

  timerEnded() {
    wx.vibrateLong();
    wx.showModal({
      title: '计时结束',
      content: this.data.pomodoroMode === 'focus' ? '专注时间圆满结束！来，闭眼，起来活动一下吧~' : '休整结束，打起精神开始新一轮专注吧！',
      showCancel: false,
      success: () => {
        // Toggle mode automatically
        const nextMode = this.data.pomodoroMode === 'focus' ? 'break' : 'focus';
        const nextSecs = nextMode === 'focus' ? 1500 : 300;
        this.setData({
          pomodoroMode: nextMode,
          timerLeft: nextSecs,
          pomodoroState: 'idle',
          pomodoroTime: this.formatTimeDisplay(nextSecs)
        });
      }
    });

    // Record usage log
    this.addHistoryLog('pomodoro', `完成了一次 ${this.data.pomodoroMode === 'focus' ? '25分钟专注' : '5分钟休息'}`);
  },

  formatTimeDisplay(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  },

  // ==========================================
  // 6) CASE CONVERTER
  // ==========================================
  onCaseInput(e) {
    this.setData({ caseInput: e.detail.value });
  },

  convertCase(e) {
    const type = e.currentTarget.dataset.type;
    const txt = this.data.caseInput;
    if (!txt) {
      this.showToast('请输入处理文本');
      return;
    }

    let result = '';
    if (type === 'upper') {
      result = txt.toUpperCase();
    } else if (type === 'lower') {
      result = txt.toLowerCase();
    } else if (type === 'capitalize') {
      result = txt.replace(/\b\w/g, c => c.toUpperCase());
    }

    this.setData({ caseOutput: result });
  },

  // ==========================================
  // 7) WORD COUNTER
  // ==========================================
  onCounterInput(e) {
    const val = e.detail.value;
    const charCount = val.length;
    const charNoSpace = val.replace(/\s+/g, '').length;
    // Chinese characters and English words counts
    const wordCount = (val.match(/[\u4e00-\u9fa5]/g) || []).length + 
                      (val.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[a-zA-Z0-9_\-\']/g) || []).length;
    const lineCount = val ? val.split(/\r*\n/).length : 0;

    this.setData({
      counterInput: val,
      charCount,
      charNoSpace,
      wordCount,
      lineCount
    });
  },

  clearCounter() {
    this.setData({
      counterInput: '',
      charCount: 0,
      charNoSpace: 0,
      wordCount: 0,
      lineCount: 0
    });
  },

  // ==========================================
  // 8) BOOKKEEPING LABORATORY
  // ==========================================
  onBkTypeChange(e) {
    this.setData({ bkType: e.currentTarget.dataset.type });
  },

  onBkAmountInput(e) {
    this.setData({ bkAmount: e.detail.value });
  },

  onBkNoteInput(e) {
    this.setData({ bkNote: e.detail.value });
  },

  loadBookkeeping() {
    const list = wx.getStorageSync('springnest_bk_list') || [];
    this.calculateBkStats(list);
  },

  calculateBkStats(list) {
    let balance = 0;
    list.forEach(item => {
      const amt = parseFloat(item.amount);
      if (item.type === 'income') {
        balance += amt;
      } else {
        balance -= amt;
      }
    });
    this.setData({
      bkList: list,
      bkBalance: balance.toFixed(2)
    });
  },

  addTransaction() {
    const amtStr = this.data.bkAmount.trim();
    const note = this.data.bkNote.trim();

    if (!amtStr || isNaN(parseFloat(amtStr)) || parseFloat(amtStr) <= 0) {
      this.showToast('请输入有效的账目金额');
      return;
    }
    if (!note) {
      this.showToast('请输入账目备注，如 "午餐"');
      return;
    }

    const date = new Date();
    const newTx = {
      id: Date.now().toString(),
      type: this.data.bkType,
      amount: parseFloat(amtStr).toFixed(2),
      note: note,
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    };

    const currentList = [newTx, ...this.data.bkList];
    wx.setStorageSync('springnest_bk_list', currentList);
    this.calculateBkStats(currentList);

    this.setData({
      bkAmount: '',
      bkNote: ''
    });

    this.showToast('记账成功', 'success');
    this.addHistoryLog('bookkeeping', `记了一笔账单: ${note} $${newTx.amount}`);
  },

  deleteTransaction(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除账目',
      content: '确认永久删除此单目记录吗？',
      success: (res) => {
        if (res.confirm) {
          const list = this.data.bkList.filter(item => item.id !== id);
          wx.setStorageSync('springnest_bk_list', list);
          this.calculateBkStats(list);
          this.showToast('已安全删除明细');
        }
      }
    });
  },

  // ==========================================
  // HISTORIC AND UTILITY METHODS
  // ==========================================
  addHistoryLog(toolId, details) {
    const logs = wx.getStorageSync('springnest_history') || [];
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    const newLog = {
      id: toolId,
      time: formattedDate,
      desc: details
    };
    // Keep logs small & bounded
    const updated = [newLog, ...logs].slice(0, 50);
    wx.setStorageSync('springnest_history', updated);
  }
});
