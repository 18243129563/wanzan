import { HelpCircle, ListOrdered, FileText, Wallet, FileImage, File, Play } from 'lucide-react';
import { ToolScreen } from './ToolScreen';
import { useState } from 'react';

export function WordCountTool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('Spring Nest的设计语言，强调数字避难所的体验。');
  
  const count = {
    total: text.length,
    noSpace: text.replace(/\s+/g, '').length,
    punct: (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()""''，。！？；：（）《》【】]/g) || []).length,
    time: Math.ceil(text.length / 400 * 60) + ' 秒'
  };

  return (
    <ToolScreen title="字数统计" desc="实时分析文本指标" icon={ListOrdered} bg="bg-secondary-container text-on-secondary-container" onClose={onClose}>
       <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 p-5 rounded-3xl bg-surface-container border border-outline-variant/30 outline-none text-body-sm resize-none" placeholder="输入文本..."></textarea>
       <div className="grid grid-cols-2 gap-4 mt-4">
          {[
            { label: '总字数', count: count.total },
            { label: '字符数 (不含空格)', count: count.noSpace },
            { label: '标点符号', count: count.punct },
            { label: '近似阅读时间', count: count.time }
          ].map((item, i) => (
             <div key={i} className="glass-card p-4 rounded-[20px] flex flex-col justify-center items-center shadow-sm">
                <span className="text-display-lg text-primary">{item.count}</span>
                <span className="text-[12px] text-on-surface-variant font-semibold tracking-wide">{item.label}</span>
             </div>
          ))}
       </div>
    </ToolScreen>
  );
}

export function QuestionBankTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="题库复习" desc="艾宾浩斯记忆法，科学管理复习进度。" icon={HelpCircle} bg="bg-primary/20 text-primary" onClose={onClose}>
        <div className="glass-card p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-center items-center">
            <h3 className="text-headline-sm text-on-surface mt-2">今日需复习任务</h3>
            <p className="text-display-lg text-primary tracking-tighter">42 <span className="text-lg font-bold text-on-surface-variant">题</span></p>
            <button className="flex items-center gap-2 bg-primary text-on-primary font-semibold text-body-sm py-3 px-8 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all mt-2">
              开始学习 <Play className="w-4 h-4" />
            </button>
            <div className="w-full h-[1px] bg-outline-variant/30 my-2"></div>
            <div className="flex justify-around w-full">
               <div className="flex flex-col">
                 <span className="text-headline-sm text-on-surface">158</span>
                 <span className="text-[11px] text-on-surface-variant tracking-widest font-semibold mt-1">已掌握</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-headline-sm text-on-surface">24</span>
                 <span className="text-[11px] text-on-surface-variant tracking-widest font-semibold mt-1">易错题</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-headline-sm text-on-surface">36</span>
                 <span className="text-[11px] text-on-surface-variant tracking-widest font-semibold mt-1">未开始</span>
               </div>
            </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 mb-8">
           <h3 className="text-headline-sm text-on-surface mb-1">题集</h3>
           {['高等数学下册', '英语四级核心词汇', '前端面试八股文'].map((deck, i) => (
             <div key={i} className="glass-card px-5 py-4 rounded-[20px] shadow-sm flex justify-between items-center cursor-pointer hover:bg-surface-variant/40 transition-colors">
               <span className="text-body-sm font-bold text-on-surface">{deck}</span>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-primary-fixed-dim"></div>
                 <span className="text-[11px] text-on-surface-variant font-semibold">进阶中</span>
               </div>
             </div>
           ))}
        </div>
    </ToolScreen>
  );
}

export function AccountingTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="本地记账" desc="随时记录每一笔花销，了解您的财务状况。" icon={Wallet} bg="bg-secondary p-[2px]" onClose={onClose}>
      <div className="glass-card p-6 rounded-[24px] shadow-sm flex flex-col gap-2">
         <h3 className="text-body-sm text-on-surface-variant">本月总支出</h3>
         <p className="font-serif text-[40px] font-black tracking-tight text-on-surface">¥ 1,200.00</p>
         <div className="w-full h-3 bg-surface-variant/50 rounded-full mt-4 overflow-hidden shadow-inner">
           <div className="h-full bg-gradient-to-r from-primary to-secondary-fixed w-[60%] rounded-full"></div>
         </div>
         <div className="flex justify-between text-[11px] text-on-surface-variant mt-1 font-semibold tracking-wider">
            <span>可用余额: ¥800.00</span>
            <span>预算: ¥2,000.00</span>
         </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <h3 className="text-headline-sm text-on-surface">最近记录</h3>
        <button className="text-primary font-semibold text-[13px]">查看全部</button>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { title: '咖啡', amount: '-¥ 32.00', date: '今天 09:41', icon: '☕' },
          { title: '晚饭', amount: '-¥ 58.00', date: '昨天 19:22', icon: '🍱' },
          { title: '交通', amount: '-¥ 12.00', date: '昨天 08:30', icon: '🚇' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 rounded-[16px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-xl shadow-inner">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-body-sm font-bold text-on-surface">{item.title}</span>
                <span className="text-[11px] text-on-surface-variant font-medium">{item.date}</span>
              </div>
            </div>
            <span className="font-mono text-body-sm text-on-surface font-semibold">{item.amount}</span>
          </div>
        ))}
      </div>

      <button className="fixed bottom-8 right-6 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-[0_8px_24px_rgba(51,106,58,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
         <span className="text-2xl font-light leading-none">+</span>
      </button>
    </ToolScreen>
  );
}

export function MarkdownEditor({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("# Spring Nest Design System\n\nThe design system embodies a **healing, minimalist, and professional** aesthetic, conceptualized as a \"Digital Sanctuary\".\n\n## Core Principles\n- Craftsmanship over Defaults\n- Intentional Variation");

  return (
    <ToolScreen title="Markdown 编辑" desc="纯净的富文本编辑体验。" icon={FileText} bg="bg-tertiary-container text-on-tertiary-container" onClose={onClose}>
      <div className="flex-1 flex flex-col bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 relative">
        <div className="h-12 bg-surface-container-high border-b border-outline-variant/20 flex items-center px-4 gap-4 overflow-x-auto hide-scrollbar">
           {['B', 'I', 'H1', 'H2', '[]', '</>', '🔗', '🖼️'].map((btn, i) => (
             <button key={i} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer">{btn}</button>
           ))}
        </div>
        <textarea 
          className="flex-1 w-full bg-transparent p-4 outline-none font-mono text-[14px] leading-relaxed resize-none" 
          placeholder="# 在此输入标题&#10;&#10;开始你的创作..."
          value={text}
          onChange={e=>setText(e.target.value)}
        />
      </div>
    </ToolScreen>
  );
}

export function WordToPdfTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="Word 转 PDF" desc="将 Word 文档转换为不可编辑的 PDF 格式" icon={FileImage} bg="bg-primary/20 text-primary" onClose={onClose}>
      <div className="flex-1 flex flex-col items-center justify-center -mt-10 gap-6">
         <div className="w-full max-w-sm aspect-video border-2 border-dashed border-outline-variant/60 rounded-[32px] flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <FileImage className="w-8 h-8" />
            </div>
            <span className="text-body-lg font-bold text-on-surface mb-1">点击或拖拽文件</span>
            <span className="text-[12px] text-on-surface-variant font-medium">支持 .doc, .docx (最大 50MB)</span>
         </div>
         <button className="bg-primary text-on-primary font-semibold text-body-sm py-3 px-12 rounded-full shadow-md transition-all opacity-50 cursor-not-allowed">
           开始转换
         </button>
      </div>
    </ToolScreen>
  );
}

export function PdfToWordTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="PDF 转 Word" desc="将 PDF 文件提取为可编辑的 Word 文档" icon={File} bg="bg-secondary/20 text-secondary" onClose={onClose}>
      <div className="flex-1 flex flex-col items-center justify-center -mt-10 gap-6">
         <div className="w-full max-w-sm aspect-video border-2 border-dashed border-outline-variant/60 rounded-[32px] flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <File className="w-8 h-8" />
            </div>
            <span className="text-body-lg font-bold text-on-surface mb-1">点击或拖拽文件</span>
            <span className="text-[12px] text-on-surface-variant font-medium">支持 .pdf (最大 50MB)</span>
         </div>
         <button className="bg-secondary text-on-secondary font-semibold text-body-sm py-3 px-12 rounded-full shadow-md transition-all opacity-50 cursor-not-allowed">
           开始转换
         </button>
      </div>
    </ToolScreen>
  );
}
