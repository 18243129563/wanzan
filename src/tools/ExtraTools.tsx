import { ToolScreen } from './ToolScreen';
import { QrCode, Shuffle, Timer, CalendarDays, FileDiff, AlignLeft, Calculator, Type, Dices, Activity, Volume2 } from 'lucide-react';
import { useState } from 'react';

export function QrcodeTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="二维码生成器" desc="输入文本或链接快速生成二维码" icon={QrCode} bg="bg-[#1f2937]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <textarea placeholder="输入文本内容或链接..." className="w-full h-32 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none"></textarea>
         <button className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm hover:shadow-md hover:bg-primary/90 active:scale-95 transition-all">生成二维码</button>
         <div className="mx-auto w-48 h-48 bg-white border border-outline-variant/30 rounded-2xl flex items-center justify-center">
            <QrCode className="w-32 h-32 text-on-surface-variant opacity-20" />
         </div>
      </div>
    </ToolScreen>
  );
}

export function RandomPickerTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="随机选择器" desc="输入选项，随机抽取一个" icon={Shuffle} bg="bg-[#8b5cf6]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <div className="h-24 w-full rounded-2xl bg-[#8b5cf6] flex items-center justify-center p-4">
            <span className="text-white text-display-sm font-bold tracking-widest">?</span>
         </div>
         <textarea placeholder="输入选项，一行一个..." className="w-full h-40 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none" defaultValue="火锅\n烧烤\n日料\n沙拉"></textarea>
         <button className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all">随机抽取</button>
      </div>
    </ToolScreen>
  );
}

export function TimerStopwatchTool({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState('timer');

  return (
    <ToolScreen title="倒计时与秒表" desc="支持倒计时和秒表两种模式" icon={Timer} bg="bg-[#f59e0b] text-white" onClose={onClose}>
      <div className="flex flex-col gap-4 mt-8 items-center">
         <div className="flex gap-2 p-1 bg-surface-container rounded-full">
            <button 
              onClick={() => setMode('timer')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'timer' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              倒计时
            </button>
            <button 
              onClick={() => setMode('stopwatch')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'stopwatch' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              秒表
            </button>
         </div>
         
         <div className="text-[72px] font-mono font-black mt-10 tracking-tighter">
            {mode === 'timer' ? '00:05:00' : '00:00.00'}
         </div>
         {mode === 'stopwatch' && (
            <div className="text-on-surface-variant font-mono mt-[-10px]">
               00:00:00.00
            </div>
         )}
         
         <div className="flex gap-4 mt-12 w-full justify-center">
            {mode === 'timer' ? (
              <>
                <button className="w-16 h-16 rounded-full bg-surface-variant text-on-surface font-semibold hover:bg-surface-container-high transition-colors">取消</button>
                <button className="w-16 h-16 rounded-full bg-primary text-on-primary font-semibold shadow-md active:scale-95 transition-all">开始</button>
              </>
            ) : (
              <>
                <button className="w-16 h-16 rounded-full bg-surface-variant text-on-surface font-semibold hover:bg-surface-container-high transition-colors">计次</button>
                <button className="w-16 h-16 rounded-full bg-primary text-on-primary font-semibold shadow-md active:scale-95 transition-all">开始</button>
              </>
            )}
         </div>

         {mode === 'stopwatch' && (
            <div className="w-full mt-8 flex flex-col gap-2">
               <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">计次 2</span>
                  <span className="font-mono text-on-surface">+00:01.32</span>
                  <span className="font-mono text-on-surface font-semibold">00:04.28</span>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">计次 1</span>
                  <span className="font-mono text-on-surface">+00:02.96</span>
                  <span className="font-mono text-on-surface font-semibold">00:02.96</span>
               </div>
            </div>
         )}
      </div>
    </ToolScreen>
  );
}

export function DateCalculatorTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="日期计算器" desc="计算两个日期之间的天数差" icon={CalendarDays} bg="bg-[#ec4899]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="glass-card p-4 rounded-2xl flex flex-col gap-4">
           <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl border border-outline-variant/30">
              <span className="text-sm">开始日期</span>
              <input type="date" className="bg-transparent outline-none font-mono text-sm" />
           </div>
           <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl border border-outline-variant/30">
              <span className="text-sm">结束日期</span>
              <input type="date" className="bg-transparent outline-none font-mono text-sm" />
           </div>
        </div>
        <div className="h-24 glass-card rounded-2xl flex items-center justify-center p-4">
           <span className="text-primary text-headline-md font-bold">相差 0 天</span>
        </div>
        <button className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all">计算天数</button>
      </div>
    </ToolScreen>
  );
}

export function TextDiffTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="文本对比" desc="逐行对比段文本的差异" icon={FileDiff} bg="bg-[#64748b]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea placeholder="原始文本..." className="w-full h-32 p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-mono resize-none"></textarea>
         <textarea placeholder="修改后的文本..." className="w-full h-32 p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-mono resize-none"></textarea>
         <button className="bg-primary text-on-primary py-2 rounded-full text-label-md shadow-sm active:scale-95 transition-all">对比差异</button>
         <div className="w-full h-32 p-3 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono overflow-auto text-center flex flex-col items-center justify-center text-on-surface-variant">
            暂无对比结果
         </div>
      </div>
    </ToolScreen>
  );
}

export function LoremGeneratorTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="随机文本生成" desc="生成 Lorem Ipsum 占位文本" icon={AlignLeft} bg="bg-[#a8a29e]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <div className="flex gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-1">
               <span className="text-xs font-semibold text-on-surface-variant">段落数</span>
               <input type="number" defaultValue={3} className="w-full bg-surface-container p-3 rounded-xl outline-none font-mono text-sm" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
               <span className="text-xs font-semibold text-on-surface-variant">单词/段</span>
               <input type="number" defaultValue={50} className="w-full bg-surface-container p-3 rounded-xl outline-none font-mono text-sm" />
            </div>
         </div>
         <button className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all">生成文本</button>
         <textarea readOnly className="w-full flex-1 min-h-[150px] p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 text-sm resize-none"></textarea>
      </div>
    </ToolScreen>
  );
}

export function TipCalculatorTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="小费计算器" desc="快速计算小费金额和分账" icon={Calculator} bg="bg-[#14b8a6]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-outline-variant/30">
           <span className="text-sm font-semibold">账单金额</span>
           <input type="number" placeholder="0.00" className="bg-transparent outline-none font-mono text-xl text-right w-32" />
        </div>
        <div className="glass-card p-4 rounded-2xl">
           <span className="text-sm font-semibold block mb-4">小费比例</span>
           <div className="flex justify-between gap-2">
             {['10%', '15%', '18%', '20%'].map(p => (
                <button key={p} className="flex-1 py-2 bg-surface text-on-surface font-semibold rounded-xl text-sm border border-outline-variant/30">{p}</button>
             ))}
           </div>
        </div>
        <div className="glass-card p-4 rounded-2xl">
           <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">人数</span>
              <div className="flex items-center gap-4">
                 <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center font-bold">-</button>
                 <span className="font-mono">1</span>
                 <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center font-bold">+</button>
              </div>
           </div>
        </div>
        <div className="glass-card p-5 rounded-2xl bg-primary/10 flex flex-col gap-2 mt-4">
           <div className="flex justify-between text-sm"><span>小费总计</span><span className="font-mono font-bold">$0.00</span></div>
           <div className="flex justify-between text-sm"><span>总计</span><span className="font-mono font-bold">$0.00</span></div>
           <hr className="border-primary/20 my-1" />
           <div className="flex justify-between font-bold text-primary"><span>人均支付</span><span className="font-mono text-xl">$0.00</span></div>
        </div>
      </div>
    </ToolScreen>
  );
}

export function CaseConverterTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="大小写转换" desc="文本大小写格式转换工具" icon={Type} bg="bg-[#f43f5e]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea placeholder="在此输入文本..." className="w-full h-40 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none"></textarea>
         <div className="grid grid-cols-2 gap-2">
            <button className="py-2 bg-surface text-on-surface rounded-xl text-sm border border-outline-variant/30">UPPER CASE</button>
            <button className="py-2 bg-surface text-on-surface rounded-xl text-sm border border-outline-variant/30">lower case</button>
            <button className="py-2 bg-surface text-on-surface rounded-xl text-sm border border-outline-variant/30">Title Case</button>
            <button className="py-2 bg-surface text-on-surface rounded-xl text-sm border border-outline-variant/30">Sentence case</button>
         </div>
      </div>
    </ToolScreen>
  );
}

export function RandomNumberTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="随机数生成" desc="生成指定范围内的随机数" icon={Dices} bg="bg-[#0ea5e9]" onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="h-32 glass-card rounded-2xl flex items-center justify-center p-4 outline-none">
           <span className="text-primary text-[64px] font-mono font-black tracking-tighter">?</span>
        </div>
        <div className="flex gap-4">
           <div className="flex-1 min-w-0 flex flex-col gap-2">
              <span className="text-sm font-semibold pl-1">最小值</span>
              <input type="number" defaultValue={1} className="w-full bg-surface-container p-4 rounded-xl outline-none font-mono text-lg text-center" />
           </div>
           <div className="flex-1 min-w-0 flex flex-col gap-2">
              <span className="text-sm font-semibold pl-1">最大值</span>
              <input type="number" defaultValue={100} className="w-full bg-surface-container p-4 rounded-xl outline-none font-mono text-lg text-center" />
           </div>
        </div>
        <button className="bg-primary text-on-primary py-4 rounded-full text-label-md font-bold text-lg shadow-md active:scale-95 transition-all mt-4">生成</button>
      </div>
    </ToolScreen>
  );
}

export function BmiCalculatorTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="BMI 计算器" desc="计算身高体重指数" icon={Activity} bg="bg-[#10b981]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-outline-variant/30">
           <span className="text-sm font-semibold">身高 (cm)</span>
           <input type="number" placeholder="175" className="bg-transparent outline-none font-mono text-xl text-right w-24" />
        </div>
        <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-outline-variant/30">
           <span className="text-sm font-semibold">体重 (kg)</span>
           <input type="number" placeholder="65" className="bg-transparent outline-none font-mono text-xl text-right w-24" />
        </div>
        <button className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-md active:scale-95 transition-all mt-2">计算 BMI</button>
        
        <div className="glass-card p-6 mt-4 rounded-3xl flex flex-col items-center">
            <span className="text-on-surface-variant font-semibold text-sm mb-2">你的 BMI 指数</span>
            <span className="text-display-md font-bold text-primary mb-1">--</span>
            <span className="text-sm text-on-surface-variant">范围：--</span>
        </div>
      </div>
    </ToolScreen>
  );
}

export function TextToSpeechTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="文字朗读" desc="将文字转换为自然语音" icon={Volume2} bg="bg-[#8b5cf6]" onClose={onClose}>
      <div className="flex flex-col gap-4 flex-1">
         <textarea placeholder="在此输入要朗读的文字..." className="w-full flex-1 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none"></textarea>
         <div className="glass-card p-4 rounded-2xl">
             <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium">语速</span>
                 <span className="font-mono text-sm">1.0x</span>
             </div>
             <input type="range" className="w-full accent-primary" />
         </div>
         <button className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all flex justify-center items-center gap-2">
            <Volume2 className="w-5 h-5" /> 播放语音
         </button>
      </div>
    </ToolScreen>
  );
}
