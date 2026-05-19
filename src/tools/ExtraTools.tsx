import { ToolScreen } from './ToolScreen';
import { QrCode, Shuffle, Timer, CalendarDays, FileDiff, AlignLeft, Calculator, Type, Dices, Activity, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function QrcodeTool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  
  return (
    <ToolScreen title="二维码生成器" desc="输入文本或链接快速生成二维码" icon={QrCode} bg="bg-[#1f2937]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <textarea 
          placeholder="输入文本内容或链接..." 
          className="w-full h-32 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none outline-none"
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
         <div className="mx-auto w-48 h-48 bg-white border border-outline-variant/30 rounded-2xl flex items-center justify-center p-4">
            {text ? (
              <QRCodeSVG value={text} size={160} />
            ) : (
              <QrCode className="w-32 h-32 text-on-surface-variant opacity-20" />
            )}
         </div>
      </div>
    </ToolScreen>
  );
}

export function RandomPickerTool({ onClose }: { onClose: () => void }) {
  const [options, setOptions] = useState("火锅\n烧烤\n日料\n沙拉");
  const [result, setResult] = useState("?");
  const [picking, setPicking] = useState(false);

  const pick = () => {
    const lines = options.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    setPicking(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(lines[Math.floor(Math.random() * lines.length)]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setPicking(false);
      }
    }, 50);
  };

  return (
    <ToolScreen title="随机选择器" desc="输入选项，随机抽取一个" icon={Shuffle} bg="bg-[#8b5cf6]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <div className="h-24 w-full rounded-2xl bg-[#8b5cf6] flex items-center justify-center p-4 shadow-inner">
            <span className="text-white text-display-sm font-bold tracking-widest">{result}</span>
         </div>
         <textarea 
          placeholder="输入选项，一行一个..." 
          className="w-full h-40 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none outline-none" 
          value={options}
          onChange={e => setOptions(e.target.value)}
        ></textarea>
         <button disabled={picking} onClick={pick} className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all disabled:opacity-50">
           {picking ? '正在抽取...' : '随机抽取'}
         </button>
      </div>
    </ToolScreen>
  );
}

export function TimerStopwatchTool({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState('timer');
  const [timerLeft, setTimerLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<{time: number, diff: number}[]>([]);

  useEffect(() => {
    let int: any;
    if (timerRunning && timerLeft > 0) {
      int = setInterval(() => setTimerLeft(t => t - 1), 1000);
    }
    return () => clearInterval(int);
  }, [timerRunning, timerLeft]);

  useEffect(() => {
    let int: any;
    if (swRunning) {
      int = setInterval(() => setSwTime(t => t + 10), 10);
    }
    return () => clearInterval(int);
  }, [swRunning]);

  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const formatSw = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const ms10 = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms10.toString().padStart(2, '0')}`;
  };

  return (
    <ToolScreen title="倒计时与秒表" desc="支持倒计时和秒表两种模式" icon={Timer} bg="bg-[#f59e0b] text-white" onClose={onClose}>
      <div className="flex flex-col gap-4 mt-8 items-center">
         <div className="flex gap-2 p-1 bg-surface-container rounded-full">
            <button 
              onClick={() => {setMode('timer'); setSwRunning(false);}}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'timer' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              倒计时
            </button>
            <button 
              onClick={() => {setMode('stopwatch'); setTimerRunning(false);}}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'stopwatch' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              秒表
            </button>
         </div>
         
         <div className="text-[72px] font-mono font-black mt-10 tracking-tighter">
            {mode === 'timer' ? formatTimer(timerLeft) : formatSw(swTime)}
         </div>
         
         <div className="flex gap-4 mt-12 w-full justify-center">
            {mode === 'timer' ? (
              <>
                <button onClick={() => {setTimerRunning(false); setTimerLeft(300);}} className="w-16 h-16 rounded-full bg-surface-variant text-on-surface font-semibold hover:bg-surface-container-high transition-colors">复位</button>
                <button onClick={() => setTimerRunning(!timerRunning)} className={`w-16 h-16 rounded-full ${timerRunning ? 'bg-error text-white' : 'bg-primary text-on-primary'} font-semibold shadow-md active:scale-95 transition-all`}>
                  {timerRunning ? '暂停' : '开始'}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => {
                  if (swRunning) {
                    const last = laps[0]?.time || 0;
                    setLaps([{time: swTime, diff: swTime - last}, ...laps]);
                  } else {
                    setSwTime(0);
                    setLaps([]);
                  }
                }} className="w-16 h-16 rounded-full bg-surface-variant text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
                  {swRunning ? '计次' : '复位'}
                </button>
                <button onClick={() => setSwRunning(!swRunning)} className={`w-16 h-16 rounded-full ${swRunning ? 'bg-error text-white' : 'bg-primary text-on-primary'} font-semibold shadow-md active:scale-95 transition-all`}>
                  {swRunning ? '暂停' : '开始'}
                </button>
              </>
            )}
         </div>

         {mode === 'stopwatch' && laps.length > 0 && (
            <div className="w-full mt-8 flex flex-col gap-2 max-h-[30vh] overflow-y-auto">
               {laps.map((lap, i) => (
                 <div key={i} className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                    <span className="text-on-surface-variant">计次 {laps.length - i}</span>
                    <span className="font-mono text-on-surface">+{formatSw(lap.diff)}</span>
                    <span className="font-mono text-on-surface font-semibold">{formatSw(lap.time)}</span>
                 </div>
               ))}
            </div>
         )}
      </div>
    </ToolScreen>
  );
}

export function DateCalculatorTool({ onClose }: { onClose: () => void }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [diff, setDiff] = useState<number | null>(null);

  const calc = () => {
    if (start && end) {
      const d1 = new Date(start).getTime();
      const d2 = new Date(end).getTime();
      setDiff(Math.abs(Math.round((d2 - d1) / (1000 * 60 * 60 * 24))));
    }
  };

  return (
    <ToolScreen title="日期计算器" desc="计算两个日期之间的天数差" icon={CalendarDays} bg="bg-[#ec4899]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="glass-card p-4 rounded-2xl flex flex-col gap-4">
           <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl border border-outline-variant/30">
              <span className="text-sm">开始日期</span>
              <input type="date" value={start} onChange={e => setStart(e.target.value)} className="bg-transparent outline-none font-mono text-sm dark:[color-scheme:dark]" />
           </div>
           <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl border border-outline-variant/30">
              <span className="text-sm">结束日期</span>
              <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="bg-transparent outline-none font-mono text-sm dark:[color-scheme:dark]" />
           </div>
        </div>
        <div className="h-24 glass-card rounded-2xl flex items-center justify-center p-4">
           <span className="text-primary text-headline-md font-bold">{diff !== null ? `相差 ${diff} 天` : '---'}</span>
        </div>
        <button onClick={calc} className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all disabled:opacity-50" disabled={!start || !end}>计算天数</button>
      </div>
    </ToolScreen>
  );
}

export function TextDiffTool({ onClose }: { onClose: () => void }) {
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');

  return (
    <ToolScreen title="文本对比" desc="两段文本的简单差异对比" icon={FileDiff} bg="bg-[#64748b]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea value={t1} onChange={e=>setT1(e.target.value)} placeholder="原始文本..." className="w-full h-32 p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-mono resize-none"></textarea>
         <textarea value={t2} onChange={e=>setT2(e.target.value)} placeholder="修改后的文本..." className="w-full h-32 p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-mono resize-none"></textarea>
         <div className="w-full h-40 p-3 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono overflow-auto flex flex-col gap-1 items-start justify-start text-on-surface whitespace-pre-wrap">
            {t1 !== t2 ? (
              <>
                <div className="text-error bg-error/10 w-full p-1 rounded">- {t1}</div>
                <div className="text-primary bg-primary/10 w-full p-1 rounded">+ {t2}</div>
              </>
            ) : t1 && t2 ? '文本完全一致' : '对比结果区'}
         </div>
      </div>
    </ToolScreen>
  );
}

export function LoremGeneratorTool({ onClose }: { onClose: () => void }) {
  const [p, setP] = useState(3);
  const [w, setW] = useState(20);
  const [res, setRes] = useState("");

  const generate = () => {
    const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');
    let output = [];
    for(let i=0; i<p; i++) {
       let pWords = [];
       for(let j=0; j<w; j++) pWords.push(words[Math.floor(Math.random() * words.length)]);
       output.push(pWords.join(' ') + '.');
    }
    setRes(output.join('\n\n'));
  }

  return (
    <ToolScreen title="随机文本生成" desc="生成 Lorem Ipsum 占位文本" icon={AlignLeft} bg="bg-[#a8a29e]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <div className="flex gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-1">
               <span className="text-xs font-semibold text-on-surface-variant">段落数</span>
               <input type="number" value={p} onChange={e=>setP(Number(e.target.value))} className="w-full bg-surface-container p-3 rounded-xl outline-none font-mono text-sm" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
               <span className="text-xs font-semibold text-on-surface-variant">单词/段</span>
               <input type="number" value={w} onChange={e=>setW(Number(e.target.value))} className="w-full bg-surface-container p-3 rounded-xl outline-none font-mono text-sm" />
            </div>
         </div>
         <button onClick={generate} className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all">生成文本</button>
         <textarea value={res} readOnly className="w-full flex-1 min-h-[150px] p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 text-sm resize-none"></textarea>
      </div>
    </ToolScreen>
  );
}

export function TipCalculatorTool({ onClose }: { onClose: () => void }) {
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);

  const parsedBill = parseFloat(bill) || 0;
  const tipTotal = parsedBill * (tipPct / 100);
  const total = parsedBill + tipTotal;
  const split = total / people;

  return (
    <ToolScreen title="小费计算器" desc="快速计算小费金额和分账" icon={Calculator} bg="bg-[#14b8a6]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-outline-variant/30">
           <span className="text-sm font-semibold">账单金额</span>
           <input type="number" value={bill} onChange={e=>setBill(e.target.value)} placeholder="0.00" className="bg-transparent outline-none font-mono text-xl text-right w-32" />
        </div>
        <div className="glass-card p-4 rounded-2xl">
           <span className="text-sm font-semibold block mb-4">小费比例</span>
           <div className="flex justify-between gap-2">
             {[10, 15, 18, 20].map(p => (
                <button key={p} onClick={()=>setTipPct(p)} className={`flex-1 py-2 font-semibold rounded-xl text-sm border ${tipPct === p ? 'bg-primary text-on-primary border-primary' : 'bg-surface text-on-surface border-outline-variant/30'}`}>{p}%</button>
             ))}
           </div>
        </div>
        <div className="glass-card p-4 rounded-2xl">
           <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">人数 ({people})</span>
              <div className="flex items-center gap-4">
                 <button onClick={()=>setPeople(Math.max(1, people - 1))} className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold">-</button>
                 <button onClick={()=>setPeople(people + 1)} className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold">+</button>
              </div>
           </div>
        </div>
        <div className="glass-card p-5 rounded-2xl bg-primary/10 flex flex-col gap-2 mt-4">
           <div className="flex justify-between text-sm"><span>小费总计</span><span className="font-mono font-bold">${tipTotal.toFixed(2)}</span></div>
           <div className="flex justify-between text-sm"><span>总计</span><span className="font-mono font-bold">${total.toFixed(2)}</span></div>
           <hr className="border-primary/20 my-1" />
           <div className="flex justify-between font-bold text-primary items-center"><span>人均支付</span><span className="font-mono text-2xl">${split.toFixed(2)}</span></div>
        </div>
      </div>
    </ToolScreen>
  );
}

export function CaseConverterTool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  return (
    <ToolScreen title="大小写转换" desc="文本大小写格式转换工具" icon={Type} bg="bg-[#f43f5e]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="在此输入文本..." className="w-full h-40 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none outline-none"></textarea>
         <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setText(text.toUpperCase())} className="py-2 bg-surface text-on-surface rounded-xl text-sm shadow-sm active:scale-95 transition-all">UPPER CASE</button>
            <button onClick={() => setText(text.toLowerCase())} className="py-2 bg-surface text-on-surface rounded-xl text-sm shadow-sm active:scale-95 transition-all">lower case</button>
            <button onClick={() => setText(text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()))} className="py-2 bg-surface text-on-surface rounded-xl text-sm shadow-sm active:scale-95 transition-all">Title Case</button>
            <button onClick={() => setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())} className="py-2 bg-surface text-on-surface rounded-xl text-sm shadow-sm active:scale-95 transition-all">Sentence case</button>
         </div>
      </div>
    </ToolScreen>
  );
}

export function RandomNumberTool({ onClose }: { onClose: () => void }) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [num, setNum] = useState<string | number>('?');
  
  const generate = () => {
    setNum(Math.floor(Math.random() * (max - min + 1)) + min);
  };
  
  return (
    <ToolScreen title="随机数生成" desc="生成指定范围内的随机数" icon={Dices} bg="bg-[#0ea5e9]" onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="h-32 glass-card rounded-2xl flex items-center justify-center p-4 outline-none shadow-sm bg-surface-container-high transition-transform">
           <span className="text-primary text-[64px] font-mono font-black tracking-tighter">{num}</span>
        </div>
        <div className="flex gap-4">
           <div className="flex-1 min-w-0 flex flex-col gap-2">
              <span className="text-sm font-semibold pl-1">最小值</span>
              <input type="number" value={min} onChange={e=>setMin(parseInt(e.target.value) || 0)} className="w-full bg-surface-container p-4 rounded-xl outline-none font-mono text-lg text-center" />
           </div>
           <div className="flex-1 min-w-0 flex flex-col gap-2">
              <span className="text-sm font-semibold pl-1">最大值</span>
              <input type="number" value={max} onChange={e=>setMax(parseInt(e.target.value) || 0)} className="w-full bg-surface-container p-4 rounded-xl outline-none font-mono text-lg text-center" />
           </div>
        </div>
        <button onClick={generate} className="bg-primary text-on-primary py-4 rounded-full text-label-md font-bold text-lg shadow-md active:scale-95 transition-all mt-4">生成随机数</button>
      </div>
    </ToolScreen>
  );
}

export function BmiCalculatorTool({ onClose }: { onClose: () => void }) {
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calc = () => {
    const hv = parseFloat(h) / 100;
    const wv = parseFloat(w);
    if (hv > 0 && wv > 0) {
      setBmi(wv / (hv * hv));
    }
  };

  const getStatus = () => {
    if(!bmi) return '--';
    if(bmi < 18.5) return '偏瘦';
    if(bmi < 24) return '正常';
    if(bmi < 28) return '偏胖';
    return '肥胖';
  };

  return (
    <ToolScreen title="BMI 计算器" desc="计算身高体重指数" icon={Activity} bg="bg-[#10b981]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-outline-variant/30">
           <span className="text-sm font-semibold">身高 (cm)</span>
           <input type="number" value={h} onChange={e=>setH(e.target.value)} placeholder="175" className="bg-transparent outline-none font-mono text-xl text-right w-24" />
        </div>
        <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-outline-variant/30">
           <span className="text-sm font-semibold">体重 (kg)</span>
           <input type="number" value={w} onChange={e=>setW(e.target.value)} placeholder="65" className="bg-transparent outline-none font-mono text-xl text-right w-24" />
        </div>
        <button onClick={calc} className="bg-primary text-on-primary py-3 rounded-full text-label-md shadow-md active:scale-95 transition-all mt-2">计算 BMI</button>
        
        <div className="glass-card p-6 mt-4 rounded-3xl flex flex-col items-center">
            <span className="text-on-surface-variant font-semibold text-sm mb-2">你的 BMI 指数</span>
            <span className={`text-display-md font-bold mb-1 ${bmi && bmi>=18.5 && bmi<=24 ? 'text-[#10b981]' : 'text-primary'}`}>
              {bmi ? bmi.toFixed(1) : '--'}
            </span>
            <span className="text-sm text-on-surface-variant">状态：{getStatus()}</span>
        </div>
      </div>
    </ToolScreen>
  );
}

export function TextToSpeechTool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if(!window.speechSynthesis) return;
    if(playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const msg = new SpeechSynthesisUtterance();
    msg.text = text || '请先输入相关文字';
    msg.rate = rate;
    msg.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(msg);
  };

  return (
    <ToolScreen title="文字朗读" desc="将文字转换为自然语音" icon={Volume2} bg="bg-[#8b5cf6]" onClose={onClose}>
      <div className="flex flex-col gap-4 flex-1">
         <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="在此输入要朗读的文字..." className="w-full h-40 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-body-sm resize-none outline-none"></textarea>
         <div className="glass-card p-4 rounded-2xl">
             <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium">语速</span>
                 <span className="font-mono text-sm">{rate}x</span>
             </div>
             <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e=>setRate(parseFloat(e.target.value))} className="w-full accent-primary" />
         </div>
         <button onClick={play} className={`mt-2 py-3 rounded-full text-label-md shadow-sm active:scale-95 transition-all flex justify-center items-center gap-2 ${playing ? 'bg-error text-white' : 'bg-primary text-on-primary'}`}>
            <Volume2 className="w-5 h-5" /> {playing ? '停止播放' : '播放语音'}
         </button>
      </div>
    </ToolScreen>
  );
}

