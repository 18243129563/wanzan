import React, { useState, useEffect } from "react";
import {
  Calculator,
  ScanLine,
  Cloud,
  Compass,
  ArrowRightLeft,
  Calendar,
  Languages,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
} from "lucide-react";
import { ToolScreen } from "./ToolScreen";

export function CalculatorTool({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isResetVal, setIsResetVal] = useState(false);

  const btns = [
    "C", "±", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  const handleBtn = (b: string) => {
    if (b === "C") {
      setDisplay("0");
      setEquation("");
      setIsResetVal(false);
    } else if (b === "±") {
      setDisplay(d => d.startsWith("-") ? d.slice(1) : "-" + d);
    } else if (b === "%") {
      setDisplay(d => String(parseFloat(d) / 100));
    } else if (["÷", "×", "-", "+"].includes(b)) {
      setEquation(display + " " + b + " ");
      setIsResetVal(true);
    } else if (b === "=") {
      if (!equation) return;
      try {
        let cleanEq = equation + display;
        cleanEq = cleanEq.replace(/×/g, "*").replace(/÷/g, "/");
        const res = Function(`"use strict"; return (${cleanEq})`)();
        setDisplay(String(Number(res.toFixed(6))));
        setEquation("");
        setIsResetVal(true);
      } catch (e) {
        setDisplay("Error");
      }
    } else {
      if (display === "0" || isResetVal) {
        setDisplay(b);
        setIsResetVal(false);
      } else {
        if (b === "." && display.includes(".")) return;
        setDisplay(display + b);
      }
    }
  };

  return (
    <ToolScreen
      title="计算器"
      icon={Calculator}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col justify-end max-w-md mx-auto w-full gap-5 bg-surface-container-low p-6 md:p-8 rounded-[40px] border border-outline-variant/30 shadow-xl relative overflow-hidden my-auto">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary/40 to-secondary-fixed"></div>
        
        {/* Memory status / indicator if needed, keeps it clean and gorgeous */}
        <div className="flex justify-between items-center px-2 text-[10px] font-mono tracking-widest text-on-surface-variant opacity-60">
          <span>ALGEBRAIC MODE</span>
          <span className="animate-pulse">● DEC</span>
        </div>

        <div className="flex flex-col items-end px-5 py-6 bg-surface-container-high rounded-[24px] shadow-inner mb-2 border border-outline-variant/20 relative min-h-[110px] justify-between">
          <div className="absolute top-2 left-4 text-[10px] font-mono font-bold text-outline opacity-40">DISPLAY VIEWPORT</div>
          <span className="text-on-surface-variant font-mono text-lg tracking-tight opacity-75 truncate max-w-full">
            {equation || " "}
          </span>
          <span className="text-on-surface font-mono text-4xl md:text-5xl font-black tracking-tight mt-1 truncate max-w-full">
            {display}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {btns.map((b, i) => {
            const isOperator = ["÷", "×", "-", "+", "="].includes(b);
            const isSpecial = ["C", "±", "%"].includes(b);
            let btnStyle = "";
            if (b === "=") {
              btnStyle = "bg-primary text-on-primary font-bold shadow-[0_6px_15px_rgba(39,79,58,0.3)] hover:brightness-115";
            } else if (isOperator) {
              btnStyle = "bg-primary-container text-on-primary-container font-mono font-bold hover:brightness-105";
            } else if (isSpecial) {
              btnStyle = "bg-surface-variant text-on-surface font-semibold hover:bg-surface-container-highest";
            } else {
              btnStyle = "bg-surface-container-highest text-on-surface font-mono font-semibold hover:bg-surface-variant";
            }

            return (
              <button
                key={i}
                onClick={() => handleBtn(b)}
                className={`h-14 md:h-16 rounded-[22px] flex items-center justify-center text-[22px] md:text-[24px] transform transition-all active:scale-[0.88] cursor-pointer border border-outline-variant/10 shadow-sm
                ${b === "0" ? "col-span-2" : ""} 
                ${btnStyle}
                `}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>
    </ToolScreen>
  );
}

export function NotesTool({ onClose }: { onClose: () => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([
    {
      id: "1",
      title: "项目会议记录",
      time: "10:30",
      content: "确认第三季度的设计排期，需要与开发团队对齐交互细节...",
    },
    {
      id: "2",
      title: "购物清单",
      time: "昨天",
      content: "1. 牛奶\n2. 咖啡豆\n3. 全麦面包",
    },
  ]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      title: title || "无标题便签",
      time: "刚刚",
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setIsAdding(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(notes.filter((item) => item.id !== id));
  };

  if (isAdding) {
    return (
      <ToolScreen
        title="添加便签"
        desc="记录灵感与待办事项。"
        icon={Calendar}
        bg="bg-primary/20 text-primary"
        onClose={() => setIsAdding(false)}
      >
        <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">
          <div className="bg-surface-container-low p-6 rounded-[32px] border border-outline-variant/30 shadow-md flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary tracking-wider uppercase px-1 pl-2 border-l-2 border-primary">
                便签标题
              </label>
              <input
                type="text"
                placeholder="给你的想法起个名字..."
                className="w-full bg-surface-container-high px-4 py-3.5 rounded-2xl text-body-lg font-bold outline-none text-on-surface placeholder:text-outline-variant border border-transparent focus:border-primary/30 transition-all mt-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary tracking-wider uppercase px-1 pl-2 border-l-2 border-primary">
                详细内容
              </label>
              <textarea
                placeholder="在这里记录你的核心想法、清单列表或闪光细节..."
                className="w-full bg-surface-container-high px-4 py-4 rounded-2xl text-body-md border border-transparent outline-none focus:border-primary/30 transition-all min-h-[220px] resize-none mt-2 text-on-surface placeholder:text-outline-variant line-leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsAdding(false)}
              className="flex-1 py-3.5 bg-surface-variant text-on-surface font-semibold rounded-full active:scale-95 transition-transform text-label-lg"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3.5 bg-primary text-on-primary font-bold rounded-full shadow-md active:scale-95 transition-all text-label-lg"
            >
              保存便签
            </button>
          </div>
        </div>
      </ToolScreen>
    );
  }

  return (
    <ToolScreen
      title="便签"
      icon={Calendar}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        {notes.map((note) => (
          <div
            key={note.id}
            className="group relative bg-surface-container-low border border-outline-variant/30 p-5 rounded-[24px] shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:border-primary/20 hover:bg-surface-container-high/60 cursor-pointer"
          >
            <div className="flex justify-between items-start pr-8">
              <h3 className="text-body-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                {note.title}
              </h3>
            </div>
            <p className="text-body-sm text-on-surface-variant leading-relaxed opacity-90 line-clamp-3 whitespace-pre-wrap">
              {note.content}
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-outline font-bold tracking-wider uppercase px-2.5 py-1 bg-surface-container-highest rounded-full">
                {note.time}
              </span>
            </div>
            <button 
              onClick={(e) => handleDelete(note.id, e)}
              className="absolute top-4 right-4 text-outline hover:text-error transition-all p-2 rounded-full hover:bg-error/10"
              title="删除此便签"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="p-12 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2 opacity-60">
            <span className="text-3xl">📝</span>
            <p className="text-sm font-medium mt-2">暂无便签，点击右下角按钮新添一条</p>
          </div>
        )}
      </div>
      <button
        onClick={() => setIsAdding(true)}
        className="fixed bottom-8 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 hover:rotate-90 active:scale-95 transition-all z-50 cursor-pointer"
        title="添加新便签"
      >
        <Plus className="w-7 h-7" />
      </button>
    </ToolScreen>
  );
}

export function TranslateTool({ onClose }: { onClose: () => void }) {
  const [inputText, setInputText] = useState("数字避难所");
  const [fromLang, setFromLang] = useState("自动检测");
  const [toLang, setToLang] = useState("英语");
  const [translatedText, setTranslatedText] = useState("Digital Sanctuary");

  const runTranslation = (textInput: string, toLanguage: string) => {
    const text = textInput.trim();
    if (!text) {
      setTranslatedText("");
      return;
    }
    
    // Sample translations to simulate results
    const dict: Record<string, Record<string, string>> = {
      "数字避难所": { 
        "英语": "Digital Sanctuary", 
        "日语": "デジタル・サンクチュアリ (Dejitaru Sankuchuari)", 
        "韩语": "디지털 피난처 (Dijiteol Pinancheo)" 
      },
      "你好": { 
        "英语": "Hello / Hi", 
        "日语": "こんにちは (Konnichiwa)", 
        "韩语": "안녕하세요 (Annyeonghaseyo)" 
      },
      "春日小筑": { 
        "英语": "Spring Nest Oasis", 
        "日语": "春の庵 (Haru no Iori)", 
        "韩语": "봄의 둥지 (Bom-ui Dung-ji)" 
      },
    };
    
    const matched = dict[text];
    if (matched && matched[toLanguage]) {
      setTranslatedText(matched[toLanguage]);
    } else {
      if (toLanguage === "英语") {
        setTranslatedText(`[EN] ${text}`);
      } else if (toLanguage === "日语") {
        setTranslatedText(`[JA] ${text}`);
      } else if (toLanguage === "韩语") {
        setTranslatedText(`[KO] ${text}`);
      } else {
        setTranslatedText(text);
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    runTranslation(val, toLang);
  };

  const handleToLangChange = (lang: string) => {
    setToLang(lang);
    runTranslation(inputText, lang);
  };

  return (
    <ToolScreen
      title="翻译"
      icon={Languages}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
        {/* Languages selector capsule */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-container-low border border-outline-variant/30 rounded-full shadow-sm mx-auto w-full max-w-xs gap-4 mb-2">
          <div className="flex-1 flex justify-center items-center">
            <select 
              value={fromLang} 
              onChange={e => setFromLang(e.target.value)}
              className="font-bold text-body-sm text-on-surface bg-transparent border-none outline-none cursor-pointer text-center w-full focus:text-primary transition-colors"
            >
              <option>自动检测</option>
              <option>中文</option>
              <option>英语</option>
            </select>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
            <ArrowRightLeft className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <select 
              value={toLang} 
              onChange={e => handleToLangChange(e.target.value)}
              className="font-bold text-body-sm text-on-surface bg-transparent border-none outline-none cursor-pointer text-center w-full focus:text-primary transition-colors"
            >
              <option>英语</option>
              <option>日语</option>
              <option>韩语</option>
            </select>
          </div>
        </div>

        {/* Source Textarea block */}
        <div className="bg-surface-container-low rounded-[32px] p-6 border border-outline-variant/30 shadow-sm flex flex-col gap-2 focus-within:border-primary/30 transition-all min-h-[170px]">
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 mb-2">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">源文本</span>
            <span className="text-[10px] font-mono text-outline">{inputText.length} 字符</span>
          </div>
          <textarea
            placeholder="键入你想翻译的内容..."
            className="w-full flex-1 bg-transparent border-none outline-none resize-none text-body-lg text-on-surface placeholder:text-outline-variant line-relaxed focus:ring-0"
            value={inputText}
            onChange={handleTextChange}
            rows={4}
          />
        </div>

        {/* Translated Text output card */}
        <div className="bg-primary text-on-primary rounded-[32px] p-6 shadow-md flex flex-col relative overflow-hidden min-h-[170px]">
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4 relative z-10">
            <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">译文结果</span>
            <span className="text-[10px] font-mono text-white/50">{translatedText.length || 0} CH</span>
          </div>
          <p className="text-body-lg relative z-10 font-medium leading-relaxed">
            {translatedText ? translatedText : <span className="text-white/40 italic">等待输入源文本...</span>}
          </p>
        </div>
      </div>
    </ToolScreen>
  );
}

export function FocusTimer({ onClose }: { onClose: () => void }) {
  const [preset, setPreset] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(25 * 60);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(preset * 60);
    setTotalTime(preset * 60);
  };

  const selectPreset = (mins: number) => {
    setIsActive(false);
    setPreset(mins);
    setTimeLeft(mins * 60);
    setTotalTime(mins * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate percentage left for circular track
  const percent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const strokeDashoffset = 289 - (289 * percent) / 100;

  return (
    <ToolScreen
      title="专注计时"
      desc="番茄钟已就绪。保持专注，提升效率。"
      icon={Timer}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full gap-6">
        
        {/* Quick timer choice chips */}
        <div className="flex bg-surface-container-low p-1.5 rounded-[22px] border border-outline-variant/30 w-full justify-between gap-1">
          {[10, 15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => selectPreset(mins)}
              className={`flex-1 py-2 text-[12px] font-bold tracking-tight rounded-[14px] transition-all cursor-pointer ${preset === mins ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'}`}
            >
              {mins} 分钟
            </button>
          ))}
        </div>

        {/* Circular Display Dashboard */}
        <div className="bg-surface-container-low border border-outline-variant/20 p-8 rounded-[40px] w-full flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20"></div>
          
          <div className="relative w-64 h-64 flex items-center justify-center mt-2">
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Outer soft shadow background track */}
              <circle
                className="text-surface-variant/40"
                cx="50"
                cy="50"
                fill="transparent"
                r="46"
                stroke="currentColor"
                strokeWidth="2.5"
              ></circle>
              {/* Active animated progress overlay */}
              <circle
                className="text-primary transition-all duration-300"
                cx="50"
                cy="50"
                fill="transparent"
                r="46"
                stroke="currentColor"
                strokeDasharray="289"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="4"
              ></circle>
            </svg>
            
            {/* Realtime Typography Digit */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-mono text-[60px] text-on-surface font-black tracking-tighter leading-none">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-outline font-bold tracking-widest uppercase mt-3">
                {isActive ? "FOCUS PERIOD" : "STANDBY"}
              </span>
            </div>
          </div>

          {/* Core tactile play controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={reset}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-variant text-on-surface hover:bg-outline-variant/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-outline-variant/10 shadow-sm"
              title="重置"
            >
              <RotateCcw className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={toggle}
              className={`w-[76px] h-[76px] flex items-center justify-center rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-white/10 ${isActive ? 'bg-error text-white shadow-error/20' : 'bg-primary text-on-primary shadow-primary/20'}`}
              title={isActive ? "暂停" : "开始"}
            >
              {isActive ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 ml-0.5 fill-current" />
              )}
            </button>
          </div>
        </div>
      </div>
    </ToolScreen>
  );
}

export function UnitConverter({ onClose }: { onClose: () => void }) {
  const [category, setCategory] = useState("长度");
  const [inputVal, setInputVal] = useState("1.0");
  const [fromUnit, setFromUnit] = useState("米");
  const [toUnit, setToUnit] = useState("厘米");

  const categoriesMap: Record<string, { units: string[]; ratios: Record<string, number> }> = {
    "长度": {
      units: ["米", "千米", "厘米", "毫米", "英尺"],
      ratios: { "米": 1, "千米": 1000, "厘米": 0.01, "毫米": 0.001, "英尺": 0.3048 }
    },
    "重量": {
      units: ["克", "千克", "吨", "斤"],
      ratios: { "克": 1, "千克": 1000, "吨": 1000000, "斤": 500 }
    },
    "温度": {
      units: ["摄氏度", "华氏度", "开氏度"],
      ratios: {}
    }
  };

  const activeCategory = categoriesMap[category] || categoriesMap["长度"];

  // When changing category, reset units
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const mapping = categoriesMap[cat];
    if (mapping) {
      setFromUnit(mapping.units[0]);
      setToUnit(mapping.units[mapping.units.length - 1] || mapping.units[0]);
    }
  };

  const handleNumpad = (key: string) => {
    if (key === "⌫") {
      setInputVal(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (key === ".") {
      if (!inputVal.includes(".")) {
        setInputVal(prev => prev + ".");
      }
    } else {
      setInputVal(prev => prev === "0" || prev === "1.0" ? key : prev + key);
    }
  };

  const getConvertedVal = () => {
    const val = parseFloat(inputVal) || 0;
    if (category === "温度") {
      if (fromUnit === "摄氏度") {
        if (toUnit === "华氏度") return (val * 9/5 + 32).toFixed(2);
        if (toUnit === "开氏度") return (val + 273.15).toFixed(2);
        return val.toFixed(2);
      }
      if (fromUnit === "华氏度") {
        if (toUnit === "摄氏度") return ((val - 32) * 5/9).toFixed(2);
        if (toUnit === "开氏度") return (((val - 32) * 5/9) + 273.15).toFixed(2);
        return val.toFixed(2);
      }
      if (fromUnit === "开氏度") {
        if (toUnit === "摄氏度") return (val - 273.15).toFixed(2);
        if (toUnit === "华氏度") return ((val - 273.15) * 9/5 + 32).toFixed(2);
        return val.toFixed(2);
      }
    } else {
      const fromRatio = activeCategory.ratios[fromUnit] || 1;
      const toRatio = activeCategory.ratios[toUnit] || 1;
      const baseVal = val * fromRatio;
      const converted = baseVal / toRatio;
      return Number(converted.toFixed(6));
    }
    return "0";
  };

  const triggerSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <ToolScreen
      title="单位换算"
      desc="支持长度、重量和温度等多种单位实时换算"
      icon={ArrowRightLeft}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Animated categories line selector */}
        <div className="flex bg-surface-container-low border border-outline-variant/30 rounded-[20px] p-1 w-full gap-1 shadow-sm">
          {Object.keys(categoriesMap).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-1 py-2 rounded-[14px] text-xs font-bold tracking-tight transition-all cursor-pointer ${category === cat ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Display comparison block card */}
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-[32px] flex flex-col gap-3 shadow-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/30 to-secondary-fixed"></div>
          
          <div className="flex justify-between items-center bg-surface-container-high/60 border border-outline-variant/10 rounded-[22px] px-5 py-4">
            <span className="text-2xl md:text-3xl font-mono text-on-surface font-black tracking-tight truncate max-w-[170px]">
              {inputVal}
            </span>
            <div className="relative">
              <select 
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                className="bg-surface border border-outline-variant/20 text-on-surface hover:border-primary/30 text-xs font-bold py-2.5 px-4 rounded-xl outline-none shadow-sm min-w-[100px] text-center cursor-pointer appearance-none focus:ring-1 focus:ring-primary/40 focus:border-primary"
              >
                {activeCategory.units.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* Symmetrical swap divider node */}
          <div className="h-[2px] w-full bg-outline-variant/10 my-1.5 relative flex items-center justify-center">
            <button 
              onClick={triggerSwap}
              className="absolute w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 border-2 border-surface-container transition-all"
              title="交换输入输出"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
            </button>
          </div>

          <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-[22px] px-5 py-4 mt-1">
            <span className="text-2xl md:text-3xl font-mono text-primary font-black tracking-tight truncate max-w-[170px]">
              {getConvertedVal()}
            </span>
            <div className="relative">
              <select 
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                className="bg-surface border border-outline-variant/20 text-on-surface hover:border-primary/30 text-xs font-bold py-2.5 px-4 rounded-xl outline-none shadow-sm min-w-[100px] text-center cursor-pointer appearance-none focus:ring-1 focus:ring-primary/40 focus:border-primary"
              >
                {activeCategory.units.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Elegant design-centric numeric keypad panel */}
        <div className="grid grid-cols-3 gap-2 bg-surface-container-high/40 p-3 rounded-[32px] border border-outline-variant/20 shadow-sm">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "⌫"].map((k) => (
            <button
              key={k}
              onClick={() => handleNumpad(String(k))}
              className={`h-12 md:h-14 rounded-[18px] text-lg font-mono font-bold flex items-center justify-center transition-all cursor-pointer border border-outline-variant/10 shadow-inner
                ${k === "⌫" ? "bg-error-container/20 text-error hover:bg-error-container/40" : "bg-surface text-on-surface hover:bg-surface-variant/40"}
              `}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </ToolScreen>
  );
}

export function ScannerTool({ onClose }: { onClose: () => void }) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any = null;
    if (scanState === 'scanning') {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            setScanState('done');
            return 100;
          }
          return p + 5;
        });
      }, 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [scanState]);

  const handleScan = () => {
    setScanState('scanning');
  };

  return (
    <ToolScreen
      title="扫描仪"
      desc="将纸质文档快速扫描为电子版。"
      icon={ScanLine}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-2 max-w-md mx-auto w-full">
        {scanState === 'idle' && (
          <div className="flex flex-col items-center w-full">
            <div className="w-60 h-72 rounded-[32px] border-2 border-dashed border-primary/40 flex flex-col items-center justify-center bg-surface-container hover:bg-surface-container-high transition-all relative overflow-hidden shadow-inner group">
              <div className="absolute inset-0 bg-primary/2.5 group-hover:bg-primary/5 transition-colors"></div>
              <ScanLine className="w-14 h-14 text-primary opacity-60 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
            </div>
            
            <p className="mt-6 text-xs text-on-surface-variant text-center max-w-[240px] leading-relaxed">
              请将纸张或文档放置于相机取景器中心区域后，点击下方圆形按钮开始扫描。
            </p>
            
            <button 
              onClick={handleScan}
              className="mt-8 w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border-4 border-surface"
              title="开始扫描"
            >
              <div className="w-5 h-5 rounded-full border-2 border-on-primary bg-primary animate-pulse"></div>
            </button>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="flex flex-col items-center w-full">
            <div className="w-60 h-72 rounded-[32px] border-2 border-primary/70 flex flex-col items-center justify-center bg-surface-container-high relative overflow-hidden shadow-md">
              <div className="h-full w-full bg-gradient-to-b from-primary/5 to-transparent absolute inset-0"></div>
              <ScanLine className="w-12 h-12 text-primary animate-bounce" />
              {/* Laser scanning line */}
              <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-error to-transparent shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-[translateScan_2s_infinite]"></div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2.5 w-full px-8">
              <span className="text-xs font-bold text-primary tracking-widest uppercase animate-pulse">深度光学比对中...</span>
              <div className="w-full h-1.5 bg-surface-variant/40 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-[10px] text-outline font-mono font-bold">{progress}% COMPLETED</span>
            </div>
          </div>
        )}

        {scanState === 'done' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="w-60 h-72 rounded-[32px] border border-outline-variant/30 flex flex-col p-5 bg-white shadow-lg text-slate-800 font-sans leading-relaxed text-xs relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="flex justify-between items-center border-b pb-1.5 mb-2 border-slate-100">
                <span className="font-bold text-primary tracking-wide text-[10px]">SPRING NEST SCANNER v1.0</span>
                <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-bold">READY TO EXPORT</span>
              </div>
              <p className="text-slate-400 font-mono text-[9px] mb-1">FILENAME: mock_document_01.pdf</p>
              <p className="text-slate-400 font-mono text-[9px] mb-2">SOURCE: HIGH_CONTRAST_MONOCHROME</p>
              <div className="border border-dashed p-3 rounded-xl bg-slate-50 mt-1 text-slate-700 leading-normal">
                「美好的春日小筑，温暖你的生活。这是一份成功转换的高清电子文档，已经经过高对比度清晰化滤镜处理，您可以直接预览或导出使用。」
              </div>
            </div>
            
            <div className="flex flex-col gap-2.5 w-full px-6 mt-2">
              <button 
                onClick={() => {
                  setScanState('done_success');
                }}
                className="w-full py-3 bg-primary text-on-primary rounded-full hover:scale-102 active:scale-98 transition-all text-xs font-bold cursor-pointer shadow-md"
              >
                导出高清 PDF 文件
              </button>
              <button 
                onClick={() => setScanState('idle')}
                className="w-full py-3 bg-surface-variant text-on-surface rounded-full transition-colors text-xs font-semibold cursor-pointer"
              >
                重新扫描
              </button>
            </div>
          </div>
        )}

        {scanState === 'done_success' && (
          <div className="flex flex-col items-center gap-4 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-md">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-body-lg font-bold text-on-surface mt-2">导出成功</h3>
            <p className="text-xs text-on-surface-variant max-w-[200px] leading-relaxed">
              文件已成功打包。由于浏览器沙箱限制，推荐从新标签页导出文件包。
            </p>
            <button 
              onClick={() => setScanState('idle')}
              className="mt-2 text-xs text-primary font-bold underline hover:opacity-80"
            >
              返回主界面
            </button>
          </div>
        )}
      </div>
    </ToolScreen>
  );
}

export function WeatherTool({ onClose }: { onClose: () => void }) {
  const [city, setCity] = useState("深圳");
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [gpsData, setGpsData] = useState<{
    temp: string;
    text: string;
    desc: string;
    sub: string;
    air: string;
    hourly: string[];
    gradient: string;
  } | null>(null);

  const citiesData: Record<
    string,
    {
      temp: string;
      text: string;
      desc: string;
      sub: string;
      air: string;
      hourly: string[];
      gradient: string;
    }
  > = {
    "深圳": {
      temp: "26°",
      text: "多云转晴 · 空气质量 优",
      desc: "Shenzhen",
      sub: "多云转晴",
      air: "空气质量 优 (AQI 22)",
      hourly: ["26°", "26°", "25°", "24°"],
      gradient: "from-amber-400 via-emerald-400 to-indigo-500",
    },
    "北京": {
      temp: "21°",
      text: "晴朗 · 空气质量 良",
      desc: "Beijing",
      sub: "晴朗",
      air: "空气质量 良 (AQI 58)",
      hourly: ["21°", "20°", "18°", "16°"],
      gradient: "from-blue-400 via-indigo-400 to-purple-500",
    },
    "上海": {
      temp: "23°",
      text: "小雨 · 空气质量 优",
      desc: "Shanghai",
      sub: "小雨",
      air: "空气质量 优 (AQI 35)",
      hourly: ["23°", "22°", "21°", "20°"],
      gradient: "from-teal-400 via-indigo-400 to-teal-600",
    },
    "广州": {
      temp: "28°",
      text: "雷阵雨 · 空气质量 优",
      desc: "Guangzhou",
      sub: "雷阵雨",
      air: "空气质量 优 (AQI 19)",
      hourly: ["28°", "27°", "26°", "24°"],
      gradient: "from-amber-500 via-rose-400 to-indigo-600",
    },
    "成都": {
      temp: "24°",
      text: "阴天 · 空气质量 良",
      desc: "Chengdu",
      sub: "阴天",
      air: "空气质量 良 (AQI 66)",
      hourly: ["24°", "23°", "21°", "19°"],
      gradient: "from-slate-400 via-blue-400 to-indigo-500",
    },
  };

  const generateWeatherFromCoords = (lat: number, lon: number) => {
    const roundedLat = lat.toFixed(2);
    const roundedLon = lon.toFixed(2);
    const name = `当前定位 (${roundedLat}°, ${roundedLon}°)`;
    
    // Create an elegant climate-based simulation
    let tempVal = 24;
    let mainCond = "多云";
    let airVal = "优 (AQI 28)";
    let gradient = "from-amber-400 via-emerald-400 to-indigo-500";

    if (lat > 35) {
      tempVal = Math.round(15 + (lat % 7));
      mainCond = lat % 2 === 0 ? "晴朗" : "多云";
      airVal = "良 (AQI 62)";
      gradient = "from-blue-400 via-indigo-400 to-purple-500";
    } else if (lat < 25) {
      tempVal = Math.round(25 + (lon % 5));
      mainCond = lon % 2 === 0 ? "暖阳雷雨" : "晴空万里";
      airVal = "优 (AQI 18)";
      gradient = "from-amber-500 via-rose-400 to-indigo-600";
    } else {
      tempVal = Math.round(21 + (lat % 4));
      mainCond = "阴天转微雨";
      airVal = "优 (AQI 36)";
      gradient = "from-teal-400 via-indigo-400 to-teal-600";
    }

    return {
      temp: `${tempVal}°`,
      text: `${mainCond} · 空气质量 ${airVal.slice(5, 6)}`,
      desc: name,
      sub: mainCond,
      air: `实时 GPS ${airVal}`,
      hourly: [
        `${tempVal}°`,
        `${Math.max(10, tempVal - 1)}°`,
        `${Math.max(10, tempVal - 2)}°`,
        `${Math.max(10, tempVal - 3)}°`,
      ],
      gradient: gradient,
    };
  };

  const syncGpsLocation = () => {
    setIsGpsActive(true);
    setIsGpsLoading(true);
    setGpsError("");

    if (!navigator.geolocation) {
      setGpsError("很抱歉，当前浏览器/环境不支持地理位置获取。");
      setIsGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const result = generateWeatherFromCoords(latitude, longitude);
        setGpsData(result);
        setIsGpsLoading(false);
        setGpsError("");
      },
      (err) => {
        console.error("Geolocation error:", err);
        let msg = "定位失败，请确保授权了位置信息。";
        if (err.code === 1) {
          msg = "定位权限被拒绝，请并在浏览器/系统设置中开启授权。";
        } else if (err.code === 2) {
          msg = "无法获取当前位置，请检查GPS或网络质量。";
        } else if (err.code === 3) {
          msg = "定位请求超时，请重试。";
        }
        setGpsError(msg);
        setIsGpsLoading(false);
        setIsGpsActive(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const weather = isGpsActive && gpsData ? gpsData : (citiesData[city] || citiesData["深圳"]);

  return (
    <ToolScreen
      title="小筑天气"
      icon={Cloud}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
        {/* Horizontal Cities selection bar with GPS trigger */}
        <div className="flex bg-surface-container-low border border-outline-variant/20 rounded-[20px] p-1 w-full gap-1 shadow-sm overflow-x-auto select-none [&::-webkit-scrollbar]:hidden">
          {Object.keys(citiesData).map((cName) => (
            <button
              key={cName}
              onClick={() => {
                setCity(cName);
                setIsGpsActive(false);
                setGpsError("");
              }}
              className={`flex-1 min-w-[56px] py-2 rounded-[14px] text-xs font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                !isGpsActive && city === cName
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20"
              }`}
            >
              {cName}
            </button>
          ))}
          <button
            onClick={syncGpsLocation}
            className={`px-3.5 py-2 rounded-[14px] text-xs font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0 ${
              isGpsActive && !gpsError
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
            }`}
          >
            <span>📍</span>
            <span>GPS位置</span>
          </button>
        </div>

        {/* Dynamic weather poster card */}
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-[36px] flex flex-col items-center shadow-lg relative overflow-hidden min-h-[300px] justify-center text-center">
          {/* Animated decorative backdrop blob */}
          <div
            className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${weather.gradient} opacity-20 blur-3xl`}
          ></div>
          <div
            className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br ${weather.gradient} opacity-10 blur-2xl`}
          ></div>

          {isGpsLoading ? (
            <div className="flex flex-col items-center justify-center py-10 relative z-10 gap-3">
              <div className="relative w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase mt-2 animate-pulse">
                正在请求 GPS 卫星定位...
              </span>
              <span className="text-[10px] text-outline text-center max-w-[200px] leading-relaxed">
                请在浏览器弹出的权限提示中点击“允许访问”
              </span>
            </div>
          ) : gpsError ? (
            <div className="flex flex-col items-center justify-center py-6 relative z-10 gap-2 px-4">
              <span className="text-2xl">⚠️</span>
              <span className="text-xs font-bold text-rose-500 tracking-wider">定位同步失败</span>
              <p className="text-[11px] text-on-surface-variant max-w-[240px] leading-relaxed">
                {gpsError}
              </p>
              <button
                onClick={syncGpsLocation}
                className="mt-3 px-4 py-1.5 bg-primary text-on-primary text-[10px] font-bold rounded-full shadow-sm hover:opacity-90 active:scale-95 transition-all"
              >
                重试位置同步
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full z-10 relative">
              <span className="text-xs font-bold text-primary tracking-widest uppercase border border-primary/25 px-3.5 py-1 bg-primary/5 rounded-full z-10">
                {isGpsActive ? "📍" : ""} {isGpsActive ? weather.desc : `${city} · ${weather.desc}`}
              </span>

              <Cloud className="w-20 h-20 text-primary my-6 drop-shadow-lg relative z-10 animate-[bounce_4s_ease-in-out_infinite]" />

              <span className="text-display-lg font-black text-on-surface text-[68px] tracking-tighter leading-none mb-1 font-mono relative z-10">
                {weather.temp}
              </span>
              <span className="text-body-sm text-on-surface font-semibold mt-2 relative z-10">
                {weather.text}
              </span>
              <span className="text-[10px] text-outline font-bold tracking-wider uppercase mt-2.5 relative z-10 px-3 py-0.5 bg-surface-container-high rounded-full border border-outline-variant/10">
                {weather.air}
              </span>
            </div>
          )}
        </div>

        {/* Hourly Forecast Grid */}
        <div className="grid grid-cols-4 gap-2">
          {["14:00", "15:00", "16:00", "17:00"].map((time, i) => (
            <div
              key={i}
              className="bg-surface-container-low border border-outline-variant/20 flex flex-col items-center py-4 rounded-[22px] shadow-sm gap-2"
            >
              <span className="text-[10px] text-outline font-bold">{time}</span>
              <Cloud className="w-5 h-5 text-primary opacity-80" />
              <span className="text-sm font-black font-mono text-on-surface">
                {weather.hourly[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ToolScreen>
  );
}

export function CompassTool({ onClose }: { onClose: () => void }) {
  const [angle, setAngle] = useState(45);
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [permissionState, setPermissionState] = useState<"idle" | "requesting" | "granted" | "denied" | "unsupported">("idle");

  useEffect(() => {
    // Desktop simulation backup timer only runs when browser orientation isn't active
    if (isSensorActive) return;
    
    const task = setInterval(() => {
      setAngle((a) => (a + Math.floor(Math.random() * 5) - 2 + 360) % 360);
    }, 2000);
    return () => clearInterval(task);
  }, [isSensorActive]);

  useEffect(() => {
    if (!isSensorActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // iOS Safari specific magnetic heading
      const webkitHeading = (e as any).webkitCompassHeading;
      if (webkitHeading !== undefined && webkitHeading !== null) {
        setAngle(Math.round(webkitHeading));
      } else if (e.alpha !== undefined && e.alpha !== null) {
        // Standard Android/Chrome device orientation heading
        setAngle(Math.round((360 - e.alpha) % 360));
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [isSensorActive]);

  const requestGyroPermission = async () => {
    setPermissionState("requesting");
    
    // Check if current browser requires permission query (iOS 13+ devices)
    const DeviceOrientation = (window as any).DeviceOrientationEvent;
    if (
      DeviceOrientation &&
      typeof DeviceOrientation.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === "granted") {
          setPermissionState("granted");
          setIsSensorActive(true);
        } else {
          setPermissionState("denied");
          setIsSensorActive(false);
        }
      } catch (err) {
        console.error("Orientation query error:", err);
        setPermissionState("unsupported");
        setIsSensorActive(true); // Fallback to bind directly
      }
    } else {
      // Standard Android/Chrome or Desktop environment
      setPermissionState("granted");
      setIsSensorActive(true);
    }
  };

  const getDrectionLabel = () => {
    if (angle >= 337.5 || angle < 22.5) return "正北 N";
    if (angle >= 22.5 && angle < 67.5) return "东北 NE";
    if (angle >= 67.5 && angle < 112.5) return "正东 E";
    if (angle >= 112.5 && angle < 157.5) return "东南 SE";
    if (angle >= 157.5 && angle < 202.5) return "正南 S";
    if (angle >= 202.5 && angle < 247.5) return "西南 SW";
    if (angle >= 247.5 && angle < 292.5) return "正西 W";
    return "西北 NW";
  };

  return (
    <ToolScreen
      title="小筑指南针"
      icon={Compass}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col justify-center items-center pt-2 max-w-sm mx-auto w-full">
        {/* Glowing compass result readout */}
        <span className="font-mono text-4xl md:text-5xl text-on-surface font-black tracking-tight leading-none mb-1.5">
          {angle}° {getDrectionLabel().split(" ")[1]}
        </span>
        <span className="text-xs font-bold text-primary bg-primary/10 tracking-wider border border-primary/25 px-3 py-1 rounded-full uppercase mb-6">
          {getDrectionLabel()}
        </span>
        
        {/* Pristine compass physical representation card */}
        <div className="bg-surface-container-low border border-outline-variant/30 px-6 py-8 rounded-[40px] shadow-xl w-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/25 to-secondary-fixed"></div>
          
          <div 
            className="relative w-64 h-64 rounded-full border-4 border-surface-container-high shadow-lg flex items-center justify-center bg-surface-container-high/40 transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${-angle}deg)` }}
          >
            {/* Custom compass background degree grid markings */}
            <div className="absolute top-3 font-bold text-primary text-base">N</div>
            <div className="absolute bottom-3 font-bold text-on-surface-variant text-base">S</div>
            <div className="absolute left-3 font-bold text-on-surface-variant text-base">W</div>
            <div className="absolute right-3 font-bold text-on-surface-variant text-base">E</div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-dashed border-outline-variant/40"></div>
 
            {/* Premium needle vector, glowing and beautiful */}
            <div className="w-10 h-56 relative flex flex-col items-center justify-center">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[84px] border-b-error -mb-2 z-10 drop-shadow-[0_2px_4px_rgba(239,68,68,0.4)]"></div>
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[84px] border-t-outline-variant opacity-80"></div>
              <div className="absolute w-4.5 h-4.5 bg-white border-2 border-primary rounded-full z-20 shadow"></div>
            </div>
          </div>
        </div>

        {/* Dynamic device-orientation sync status row */}
        <div className="mt-6 w-full flex flex-col gap-2.5 bg-surface-container-high/20 border border-outline-variant/10 p-4 rounded-[24px]">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-outline px-1">
            <span>罗盘传感器校准</span>
            <span className={isSensorActive ? "text-emerald-500" : "text-amber-500"}>
              {isSensorActive ? "● 实时监听中" : "○ 模拟器模式"}
            </span>
          </div>

          {!isSensorActive ? (
            <button
              onClick={requestGyroPermission}
              className="w-full py-3 bg-primary text-on-primary text-xs font-black tracking-widest rounded-full shadow hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              {permissionState === "requesting" ? "正在请求权限..." : "🧭 开启设备陀螺仪与方向传感器"}
            </button>
          ) : (
            <div className="text-[10px] text-center text-outline/80 leading-relaxed font-semibold px-2">
              🎉 传感器开启成功！将随您手持设备摆动的方向实时旋转。
            </div>
          )}

          {permissionState === "denied" && (
            <span className="text-[9px] text-rose-500 text-center font-bold">
              🚫 权限申请被拒，已为您切换回模拟微调状态。请重新赋权后重试。
            </span>
          )}

          {/* Fallback Manual simulator runner */}
          {!isSensorActive && (
            <div className="pt-2 border-t border-outline-variant/10 flex flex-col gap-2">
              <div className="flex justify-between text-[10px] text-outline px-1">
                <span>手动微调模拟</span>
                <span className="font-mono">{angle}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" 
              />
            </div>
          )}
        </div>
      </div>
    </ToolScreen>
  );
}
