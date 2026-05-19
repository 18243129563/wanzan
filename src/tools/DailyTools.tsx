import { useState, useEffect } from 'react';
import { Calculator, ScanLine, Cloud, Compass, ArrowRightLeft, Calendar, Languages, Timer, Play, Pause, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { ToolScreen } from './ToolScreen';

export function CalculatorTool({ onClose }: { onClose: () => void }) {
  const btns = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
  return (
    <ToolScreen title="计算器" icon={Calculator} bg="bg-primary-fixed/80 text-primary-fixed-variant" onClose={onClose}>
      <div className="flex-1 flex flex-col justify-end gap-6 mb-4">
        <div className="flex flex-col items-end px-4 mb-4">
          <span className="text-on-surface-variant font-mono text-xl opacity-70 mb-2">1,240 × 3</span>
          <span className="text-on-surface font-mono text-5xl font-black tracking-tight">3,720</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {btns.map((b, i) => (
            <button 
              key={i} 
              className={`h-16 rounded-3xl flex items-center justify-center font-semilight text-[28px] shadow-sm transform transition-all active:scale-90
              ${b === '0' ? 'col-span-2' : ''} 
              ${['÷', '×', '-', '+', '='].includes(b) ? 'bg-primary text-on-primary' : ['C', '±', '%'].includes(b) ? 'bg-surface-variant text-on-surface' : 'bg-surface-container-high text-on-surface font-mono'}
              `}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </ToolScreen>
  );
}

export function NotesTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="便签" icon={Calendar} bg="bg-surface-container-high text-primary" onClose={onClose}>
      <div className="flex flex-col gap-4">
        {[
          { title: '项目会议记录', time: '10:30', content: '确认第三季度的设计排期，需要与开发团队对齐交互细节...' },
          { title: '购物清单', time: '昨天', content: '1. 牛奶\n2. 咖啡豆\n3. 全麦面包' }
        ].map((note, i) => (
          <div key={i} className="glass-card p-5 rounded-[24px] shadow-sm flex flex-col gap-2 relative group cursor-pointer hover:bg-surface-variant/50 transition-colors">
            <h3 className="text-body-lg font-bold text-on-surface">{note.title}</h3>
            <p className="text-body-sm text-on-surface-variant line-clamp-2">{note.content}</p>
            <span className="text-[11px] text-outline mt-2 font-semibold tracking-wide">{note.time}</span>
            <button className="absolute top-4 right-4 text-outline hover:text-error transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <button className="fixed bottom-8 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_8px_24px_rgba(39,79,58,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
         <Plus className="w-6 h-6" />
      </button>
    </ToolScreen>
  );
}

export function TranslateTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="翻译" icon={Languages} bg="bg-secondary/20 text-secondary" onClose={onClose}>
      <div className="flex flex-col gap-4 h-[60vh]">
         <div className="flex items-center justify-between px-4 py-2 bg-surface-container rounded-full shadow-sm mx-auto w-max gap-6 mb-2">
            <span className="font-semibold text-body-sm text-on-surface px-2">自动检测</span>
            <ArrowRightLeft className="w-4 h-4 text-outline" />
            <span className="font-semibold text-body-sm text-on-surface px-2">英语</span>
         </div>
         <div className="flex-1 glass-card rounded-[32px] p-6 shadow-sm flex flex-col">
           <textarea placeholder="输入文字..." className="w-full flex-1 bg-transparent border-none outline-none resize-none text-body-lg text-on-surface placeholder:text-outline/60" defaultValue="数字避难所" />
         </div>
         <div className="flex-1 bg-primary text-on-primary rounded-[32px] p-6 shadow-md flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
           <p className="text-body-lg relative z-10 font-medium">Digital Sanctuary</p>
         </div>
      </div>
    </ToolScreen>
  );
}

export function FocusTimer({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setIsActive(false); setTimeLeft(25 * 60); };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <ToolScreen title="专注计时" desc="番茄钟已就绪。保持专注，提升效率。" icon={Timer} bg="bg-[#7a5749]" onClose={onClose}>
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
              <circle className="text-surface-variant/50" cx="50" cy="50" fill="transparent" r="46" stroke="currentColor" strokeWidth="2"></circle>
              <circle className="text-tertiary-container" cx="50" cy="50" fill="transparent" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset={289 - (289 * timeLeft) / (25 * 60)} strokeLinecap="round" strokeWidth="4"></circle>
            </svg>
            <span className="font-serif text-[64px] text-on-surface font-black tracking-tighter">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
        </div>
        <div className="flex items-center gap-6 mt-8">
          <button onClick={reset} className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-variant text-on-surface hover:bg-outline-variant transition-colors">
             <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={toggle} className="w-20 h-20 flex items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container shadow-[0_8px_24px_rgba(122,87,73,0.3)] hover:scale-105 active:scale-95 transition-all">
             {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
        </div>
      </div>
    </ToolScreen>
  );
}

export function UnitConverter({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="单位换算" desc="支持长度、重量等多种单位实时换算" icon={ArrowRightLeft} bg="bg-primary text-on-primary" onClose={onClose}>
      <div className="flex flex-col gap-3">
         <div className="flex bg-surface-container rounded-2xl p-1 mb-4 overflow-x-auto hide-scrollbar w-full">
           {['长度', '面积', '体积', '重量', '温度'].map((cat, i) => (
             <button key={i} className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${i === 0 ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant'}`}>{cat}</button>
           ))}
         </div>
         
         <div className="bg-surface-container p-5 rounded-3xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-display-md font-mono text-on-surface">1.0</span>
              <select className="bg-surface text-on-surface py-2 px-4 rounded-xl outline-none font-medium appearance-none shadow-sm min-w-[80px] text-center">
                <option>米 (m)</option>
                <option>千米 (km)</option>
              </select>
            </div>
            <div className="h-[1px] w-full bg-outline-variant/30 my-1 relative">
                <div className="absolute left-1/2 -top-[14px] -translate-x-1/2 w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center cursor-pointer shadow-sm">
                   <ArrowRightLeft className="w-3 h-3 rotate-90 text-on-surface-variant" />
                </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-display-md font-mono text-primary">100</span>
              <select className="bg-surface text-on-surface py-2 px-4 rounded-xl outline-none font-medium appearance-none shadow-sm min-w-[80px] text-center">
                <option>厘米 (cm)</option>
                <option>毫米 (mm)</option>
              </select>
            </div>
         </div>
         
         <div className="mt-4 grid grid-cols-3 gap-2">
           {[1,2,3,4,5,6,7,8,9,'.', 0, '⌫'].map((k, i) => (
              <button key={i} className="bg-surface-container-high hover:bg-surface-variant py-4 rounded-2xl text-headline-sm font-mono text-on-surface transition-colors active:scale-95 shadow-sm">
                 {k}
              </button>
           ))}
         </div>
      </div>
    </ToolScreen>
  );
}

export function ScannerTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="扫描仪" desc="将纸质文档快速扫描为电子版。" icon={ScanLine} bg="bg-secondary-fixed/40 text-secondary" onClose={onClose}>
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="w-64 h-80 rounded-3xl border-2 border-dashed border-primary/40 flex items-center justify-center bg-surface-container relative overflow-hidden">
          <ScanLine className="w-16 h-16 text-primary opacity-50" />
          <div className="absolute top-0 left-0 w-full h-2 bg-primary/40 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(39,79,58,0.6)]"></div>
        </div>
        <p className="mt-8 text-body-sm text-on-surface-variant text-center max-w-[200px]">将文档放入取景框内即可自动扫描</p>
        <button className="mt-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg border-[4px] border-surface">
           <div className="w-6 h-6 rounded-full border-2 border-on-primary"></div>
        </button>
      </div>
    </ToolScreen>
  );
}

export function WeatherTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="天气" icon={Cloud} bg="bg-tertiary-fixed/40 text-tertiary" onClose={onClose}>
      <div className="flex flex-col gap-6">
         <div className="glass-card p-6 rounded-[32px] flex flex-col items-center shadow-sm">
            <span className="text-body-lg font-bold text-on-surface mb-2">深圳 (Shenzhen)</span>
            <Cloud className="w-24 h-24 text-tertiary my-4 drop-shadow-md" />
            <span className="text-display-lg font-black text-on-surface text-[64px] tracking-tighter">26°</span>
            <span className="text-body-sm text-on-surface-variant font-medium mt-2">多云转晴 · 空气质量 优</span>
         </div>
         <div className="grid grid-cols-4 gap-3">
            {['14:00', '15:00', '16:00', '17:00'].map((time, i) => (
               <div key={i} className="glass-card flex flex-col items-center py-4 rounded-[20px] shadow-sm gap-2">
                  <span className="text-[12px] text-on-surface-variant font-semibold">{time}</span>
                  <Cloud className="w-6 h-6 text-on-surface opacity-70" />
                  <span className="text-body-sm font-bold text-on-surface">2{8-i}°</span>
               </div>
            ))}
         </div>
      </div>
    </ToolScreen>
  );
}

export function CompassTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="指南针" icon={Compass} bg="bg-surface-variant/80 text-on-surface-variant" onClose={onClose}>
       <div className="flex-1 flex flex-col justify-center items-center -mt-10">
          <span className="text-display-lg text-primary tracking-tighter mb-12">45° NE</span>
          <div className="relative w-72 h-72 rounded-full border-[8px] border-surface-variant shadow-inner flex items-center justify-center">
             <div className="absolute top-4 font-bold text-on-surface text-lg">N</div>
             <div className="absolute bottom-4 font-bold text-on-surface text-lg">S</div>
             <div className="absolute left-4 font-bold text-on-surface text-lg">W</div>
             <div className="absolute right-4 font-bold text-on-surface text-lg">E</div>
             
             <div className="w-10 h-64 relative flex flex-col items-center justify-center transform rotate-45">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[96px] border-b-error -mb-2 z-10"></div>
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[96px] border-t-outline"></div>
                <div className="absolute w-4 h-4 bg-surface rounded-full z-20 shadow-md"></div>
             </div>
          </div>
       </div>
    </ToolScreen>
  );
}
