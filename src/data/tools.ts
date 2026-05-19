import { ArrowRightLeft, ScanLine, Calculator, Heart, Wallet, Compass, Palette, Volume2, Braces, Link, Globe, Asterisk, Code2, HelpCircle, ListOrdered, FileText, File, Calendar, FileImage, Timer, Cloud, Languages } from 'lucide-react';

export const dailyTools = [
  { id: 'calculator', name: '计算器', desc: '科学计算', icon: Calculator, bg: 'bg-primary-fixed/40 text-primary' },
  { id: 'scanner', name: '扫描仪', desc: '文档扫描', icon: ScanLine, bg: 'bg-secondary-fixed/40 text-secondary' },
  { id: 'weather', name: '天气', desc: '实时天气', icon: Cloud, bg: 'bg-tertiary-fixed/40 text-tertiary' },
  { id: 'compass', name: '指南针', desc: '方向定位', icon: Compass, bg: 'bg-surface-variant/80 text-on-surface-variant' },
  { id: 'notes', name: '便签', desc: '灵感记录', icon: Calendar, bg: 'bg-primary-container text-on-primary-container' },
  { id: 'translate', name: '翻译', desc: '多语种翻译', icon: Languages, bg: 'bg-secondary-container text-on-secondary-container' },
  { id: 'converter', name: '单位换算', desc: '即刻换算', icon: ArrowRightLeft, bg: 'bg-primary text-on-primary' },
  { id: 'qrcode', name: '二维码', desc: '快速生成', icon: ScanLine, bg: 'bg-secondary-container/40 text-secondary' },
  { id: 'tip-calculator', name: '小费计算', desc: 'AA分账', icon: Calculator, bg: 'bg-tertiary-container/30 text-tertiary' },
  { id: 'bmi-calculator', name: 'BMI 计算', desc: '健康指标', icon: Heart, bg: 'bg-primary-container text-on-primary-container' },
  { id: 'bookkeeping', name: '记账', desc: '随手记账', icon: Wallet, bg: 'bg-surface-variant text-on-surface-variant' },
];

export const funTools = [
  { id: 'random-picker', name: '随机选择', desc: '帮你决定', icon: Compass, bg: 'bg-secondary/20 text-secondary' },
  { id: 'color-converter', name: '颜色转换', desc: '色板与转换', icon: Palette, bg: 'bg-primary/20 text-primary' },
  { id: 'random-number', name: '随机数', desc: '生成范围', icon: Calculator, bg: 'bg-tertiary-fixed/30 text-tertiary' },
  { id: 'text-to-speech', name: '文字朗读', desc: '自然语音', icon: Volume2, bg: 'bg-surface text-primary' },
];

export const devTools = [
  { id: "json-formatter", name: "JSON 格式化", desc: "实时校验及美化 JSON 数据", icon: Braces, bg: "bg-[#566572] text-white" },
  { id: "base64-codec", name: "Base64 编解码", desc: "文本及文件进行 Base64 编解码", icon: ArrowRightLeft, bg: "bg-[#716a5c] text-white" },
  { id: "url-codec", name: "URL 编解码", desc: "对 URL 及其参数进行百分号处理", icon: Link, bg: "bg-[#b8baa8] text-white" },
  { id: "ip-lookup", name: "IP 查询", desc: "定位目标 IP 地址及相关网络详情", icon: Globe, bg: "bg-[#7ba98f] text-white" },
];

export const securityTools = [
  { id: "password", name: "密码生成器", desc: "自定义高强度安全密码", icon: Asterisk, bg: "bg-[#c3cbb8] text-white" },
];

export const learningTools = [
  { id: 'question-bank-importer', name: '复习小筑', desc: '学习卡片管理', icon: HelpCircle, bg: 'bg-primary/20 text-primary' },
  { id: 'word-counter', name: '字数统计', desc: '分析文本指标', icon: ListOrdered, bg: 'bg-secondary-container/40 text-secondary' },
  { id: 'markdown-preview', name: 'Markdown', desc: '富文本编辑器', icon: FileText, bg: 'bg-tertiary-container/30 text-tertiary' },
  { id: 'text-diff', name: '文本对比', desc: '增删高亮', icon: File, bg: 'bg-primary-container text-on-primary-container' },
  { id: 'lorem-generator', name: '随机文本', desc: '生成伪文本', icon: ListOrdered, bg: 'bg-surface-variant text-on-surface-variant' },
  { id: 'case-converter', name: '大小写转换', desc: '快速格式化', icon: FileText, bg: 'bg-secondary/20 text-secondary' },
];

export const timeTools = [
  { id: 'pomodoro', name: '番茄钟', desc: '专注循环', icon: Timer, bg: 'bg-tertiary-fixed/30 text-tertiary' },
  { id: 'timer-stopwatch', name: '倒计时', desc: '与秒表', icon: Timer, bg: 'bg-primary/20 text-primary' },
  { id: 'date-calculator', name: '日期计算', desc: '相差天数', icon: Calendar, bg: 'bg-secondary-container text-secondary' },
];

export const docTools = [
  { id: 'word-to-pdf', name: 'Word 转 PDF', desc: '生成', icon: FileImage, bg: 'bg-surface text-primary' },
  { id: 'pdf-to-word', name: 'PDF 转 Word', desc: '提取', icon: File, bg: 'bg-surface text-primary' },
];

export const allTools = [
  ...dailyTools,
  ...funTools,
  ...devTools,
  ...securityTools,
  ...learningTools,
  ...timeTools,
  ...docTools
];
