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
  const [studying, setStudying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const cards = [
    { q: '什么是 TypeScript 中的泛型？', a: '泛型允许在定义函数、接口或类时不预先指定具体的类型，而在使用的时候再指定类型的一种特性。' },
    { q: 'React 中 useEffect 的作用是什么？', a: '用于在函数组件中执行副作用操作，如数据获取、订阅或手动修改 DOM。' },
    { q: '闭包的概念是什么？', a: '闭包是指有权访问另一个函数作用域中的变量的函数。' }
  ];

  const handleNext = () => {
    if (cardIndex < cards.length - 1) {
      setCardIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setStudying(false);
      setCardIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <ToolScreen title="复习小筑" desc="艾宾浩斯记忆法，科学管理复习进度。" icon={HelpCircle} bg="bg-primary/20 text-primary" onClose={onClose}>
        {!studying ? (
          <>
            <div className="glass-card p-8 rounded-[32px] shadow-sm flex flex-col gap-6 text-center items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-primary"></div>
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-body-lg font-medium text-on-surface-variant">今日需复习</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[64px] font-black text-primary tracking-tighter leading-none">{cards.length}</span>
                    <span className="text-headline-sm font-bold text-on-surface-variant mb-2">题</span>
                  </div>
                </div>
                
                <button onClick={() => setStudying(true)} className="w-full relative group overflow-hidden rounded-2xl bg-primary text-on-primary font-bold text-lg py-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 flex items-center gap-2">开始学习 <Play className="w-5 h-5 fill-current" /></span>
                </button>
                
                <div className="w-full h-[1px] bg-outline-variant/30"></div>
                
                <div className="flex justify-between w-full px-2">
                  <div className="flex flex-col items-center">
                    <span className="text-title-lg font-bold text-on-surface">158</span>
                    <span className="text-label-sm text-on-surface-variant font-medium mt-1">已掌握</span>
                  </div>
                  <div className="w-[1px] h-10 bg-outline-variant/30 self-center"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-title-lg font-bold text-on-surface">24</span>
                    <span className="text-label-sm text-error font-medium mt-1">易错题</span>
                  </div>
                  <div className="w-[1px] h-10 bg-outline-variant/30 self-center"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-title-lg font-bold text-on-surface">36</span>
                    <span className="text-label-sm text-on-surface-variant font-medium mt-1">未开始</span>
                  </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 mb-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-title-md font-bold text-on-surface">我的题集</h3>
                <button className="text-primary text-label-md font-bold hover:underline">查看全部</button>
              </div>
              <div className="grid gap-3">
                {['前端面试八股文', '高等数学下册', '英语四级核心词汇'].map((deck, i) => (
                  <div key={i} className="glass-card px-5 py-5 rounded-[24px] shadow-sm flex justify-between items-center cursor-pointer hover:bg-surface-variant/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-primary/20 text-primary' : i === 1 ? 'bg-secondary/20 text-secondary' : 'bg-tertiary/20 text-tertiary'}`}>
                        {deck.substring(0, 1)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-body-md font-bold text-on-surface group-hover:text-primary transition-colors">{deck}</span>
                        <span className="text-label-sm text-on-surface-variant mt-0.5 text-left">进度 {Math.floor(Math.random() * 50) + 50}%</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col -mt-2 pb-8 h-full">
            <div className="flex items-center justify-between mb-6 px-2">
              <span className="text-label-md font-bold text-on-surface-variant">学习中</span>
              <div className="bg-surface-variant text-on-surface px-3 py-1 rounded-full text-label-sm font-bold font-mono">
                {cardIndex + 1} / {cards.length}
              </div>
            </div>
            
            <div className="w-full flex-1 min-h-[360px] flex flex-col glass-card rounded-[32px] overflow-hidden shadow-md relative group">
               <div className="absolute top-0 left-0 h-1.5 bg-primary/20 w-full z-10">
                 <div className="h-full bg-primary transition-all duration-300" style={{width: `${((cardIndex)/(cards.length))*100}%`}}></div>
               </div>
               
               <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
                  <p className="text-title-lg font-bold text-on-surface leading-normal">{cards[cardIndex].q}</p>
               </div>
               
               {showAnswer && (
                  <div className="w-full flex-1 min-h-[160px] border-t border-outline-variant/30 p-8 flex items-center justify-center bg-surface-container/50 animate-in slide-in-from-bottom-8 fade-in duration-500">
                     <p className="text-body-lg text-on-surface text-start w-full leading-relaxed">{cards[cardIndex].a}</p>
                  </div>
               )}
            </div>

            <div className="mt-8 w-full">
              {!showAnswer ? (
                 <button onClick={() => setShowAnswer(true)} className="w-full h-16 bg-surface-variant hover:bg-surface-container-highest text-on-surface rounded-2xl font-bold shadow-sm active:scale-[0.98] transition-all text-title-md border border-outline-variant/30">
                   显示答案
                 </button>
              ) : (
                 <div className="flex gap-3 w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <button onClick={handleNext} className="h-16 flex-1 bg-error/10 hover:bg-error/20 text-error rounded-2xl font-bold active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5">
                      <span className="text-body-md">生疏</span>
                      <span className="text-[10px] opacity-80 font-mono tracking-tighter">1 min</span>
                    </button>
                    <button onClick={handleNext} className="h-16 flex-1 bg-surface-variant hover:bg-surface-container-highest text-on-surface rounded-2xl font-bold active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5 border border-outline-variant/30">
                      <span className="text-body-md">犹豫</span>
                      <span className="text-[10px] opacity-80 font-mono tracking-tighter">10 min</span>
                    </button>
                    <button onClick={handleNext} className="h-16 flex-1 bg-primary text-on-primary rounded-2xl font-bold active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5 shadow-md hover:shadow-lg">
                      <span className="text-body-md">掌握</span>
                      <span className="text-[10px] opacity-80 font-mono tracking-tighter">1 d</span>
                    </button>
                 </div>
              )}
            </div>
          </div>
        )}
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
      <div className="flex-1 flex flex-col items-center justify-center pt-2 gap-6">
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
      <div className="flex-1 flex flex-col items-center justify-center pt-2 gap-6">
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
