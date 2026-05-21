import {
  HelpCircle,
  ListOrdered,
  FileText,
  Wallet,
  FileImage,
  File,
  Play,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BookOpen,
  UploadCloud,
  Download,
  Eye,
  List,
  Plus,
  Heart,
  Star,
  Trash2,
  Check,
  X,
  Search,
  Sparkles,
  RefreshCw,
  Layers,
  BarChart3,
  Book,
  Grid,
  Clipboard,
  Info
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "motion/react";
import { ToolScreen } from "./ToolScreen";
import React, { useState, useEffect } from "react";
import JSZip from "jszip";

export function WordCountTool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState(
    "Spring Nest的设计语言，强调数字避难所的体验。",
  );

  const count = {
    total: text.length,
    noSpace: text.replace(/\s+/g, "").length,
    punct: (
      text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()""''，。！？；：（）《》【】]/g) ||
      []
    ).length,
    time: Math.ceil((text.length / 400) * 60) + " 秒",
  };

  return (
    <ToolScreen
      title="字数统计"
      desc="深度实时分析文本多维信息"
      icon={ListOrdered}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
        {/* Code/Text Block */}
        <div className="bg-surface-container-low p-5 rounded-[28px] border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 mb-2">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">创作空间</span>
            <span className="text-[10px] font-mono text-outline">LIVE FEED</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 bg-transparent text-sm resize-none outline-none text-on-surface placeholder:text-outline-variant leading-relaxed font-sans"
            placeholder="在此处输入或粘入文章内容，分析程序将自动运行..."
          ></textarea>
        </div>

        {/* Dynamic Analysis KPIs Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "字符总数 (TOTAL)", count: count.total, emoji: "📝", style: "bg-surface-container-low border border-outline-variant/20 shadow-sm" },
            { label: "净字数 (NO SPACES)", count: count.noSpace, emoji: "🧩", style: "bg-surface-container-low border border-outline-variant/20 shadow-sm" },
            { label: "标点符号 (PUNCTS)", count: count.punct, emoji: "🎯", style: "bg-surface-container-low border border-outline-variant/20 shadow-sm" },
            { label: "预估阅读 (TIME TO READ)", count: count.time, emoji: "⏳", style: "bg-primary/5 border border-primary/20 shadow-sm text-primary" },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-5 rounded-[24px] flex flex-col justify-between relative overflow-hidden h-28 ${item.style}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="mt-2 flex flex-col">
                <span className="text-xl md:text-2xl font-mono font-black tracking-tight leading-none text-on-surface">
                  {item.count}
                </span>
                <span className="text-[9px] font-bold text-outline mt-1 uppercase tracking-wider block truncate">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolScreen>
  );
}

function FlashCard({
  card,
  cardIndex,
  total,
  showAnswer,
  setShowAnswer,
  onNext,
  exitDirection,
}: {
  card: any;
  cardIndex: number;
  total: number;
  showAnswer: boolean;
  setShowAnswer: (v: boolean) => void;
  onNext: (dir?: number) => void;
  exitDirection: number;
  key?: any;
}) {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-10, 10]);
  const dragOpacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.2, 1, 1, 1, 0.2],
  );

  // Custom exit animation based on swipe/button direction
  const variants = {
    enter: { scale: 0.85, opacity: 0, y: 20 },
    center: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateY: showAnswer ? 180 : 0,
    },
    exit: (customDir: number) => ({
      x: customDir * 300,
      opacity: 0,
      rotateZ: customDir * 15,
      scale: 0.8,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <motion.div
      className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(e, info) => {
        if (info.offset.x > 90) {
          onNext(1);
        } else if (info.offset.x < -90) {
          onNext(-1);
        } else if (
          !showAnswer &&
          Math.abs(info.offset.x) < 5 &&
          Math.abs(info.offset.y) < 5
        ) {
          setShowAnswer(true);
        }
      }}
      onClick={() => !showAnswer && setShowAnswer(true)}
      style={{
        x,
        rotateZ,
        opacity: dragOpacity,
        transformStyle: "preserve-3d",
      }}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={exitDirection}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
    >
      {/* Front side (Question) */}
      <div
        className="absolute inset-0 w-full h-full glass-card rounded-[36px] overflow-hidden shadow-xl border-[1px] border-white/40 flex flex-col items-center justify-center p-8 bg-surface-container"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-primary/10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${(cardIndex / total) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="absolute top-8 left-8 text-primary/20 font-serif text-[100px] leading-none select-none drop-shadow-sm">
          Q
        </div>

        <div className="flex-1 flex items-center justify-center w-full z-10 px-2 text-center">
          <p className="text-[22px] font-bold text-on-surface leading-[1.6] tracking-tight">
            {card.q}
          </p>
        </div>

        <div className="absolute bottom-6 font-medium text-[13px] text-on-surface-variant/50 tracking-widest uppercase flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
          点击或侧滑
        </div>
      </div>

      {/* Back side (Answer) */}
      <div
        className="absolute inset-0 w-full h-full glass-card rounded-[36px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-[1px] border-primary/20 flex flex-col items-center p-8 bg-surface-container-high relative"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

        <div className="w-full flex justify-between items-center mt-2 mb-6">
          <span className="text-error/80 font-serif text-[40px] leading-none select-none drop-shadow-sm">
            A
          </span>
          <button
            className="text-on-surface-variant/60 hover:text-primary transition-colors z-20 relative p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex items-start justify-center w-full overflow-y-auto hide-scrollbar pt-2 z-10 relative">
          <p className="text-[17px] font-medium text-on-surface leading-[1.7] text-left w-full align-top">
            {card.a}
          </p>
        </div>

        <div className="absolute bottom-6 left-0 w-full flex justify-center text-on-surface-variant/30 z-10 pointer-events-none">
          <div className="w-12 h-1.5 rounded-full bg-outline-variant/50"></div>
        </div>
      </div>
    </motion.div>
  );
}

export interface Question {
  id: string;
  type: 'qa' | 'choice';
  q: string;
  a?: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  mastered?: boolean;
  category?: string;
  date?: string;
  errorNote?: string;
  phonetic?: string;
  tag?: string;
  definition?: string;
}

export interface Deck {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  questions: Question[];
  color: string;
  lastReviewed?: string;
  displayCount?: string;
}

export function renderDeckIcon(deck: Deck, customSize: string = "w-12 h-12 text-xl rounded-full") {
  const circleBg = deck.id === 'deck-eng' ? 'bg-[#FFEAEB]' : deck.id === 'deck-phy' ? 'bg-[#E5F0FF]' : 'bg-[#EAF7ED]';
  const iconColor = deck.id === 'deck-eng' ? 'text-[#E05252]' : deck.id === 'deck-phy' ? 'text-[#2F80ED]' : 'text-[#2D6A4F]';
  
  if (deck.id === 'deck-eng') {
    return (
      <div className={`${customSize} flex items-center justify-center flex-shrink-0 ${circleBg} shadow-inner`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#E05252" />
          <path d="M7 9H11M9 7V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 9H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 14.5L10.5 17.5M10.5 14.5L7.5 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 15H18M14 17H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  
  if (deck.id === 'deck-phy') {
    return (
      <div className={`${customSize} flex items-center justify-center flex-shrink-0 ${circleBg} shadow-inner`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]">
          <path d="M6 3V19C6 20.1 6.9 21 8 21H20L6 3Z" fill="#2F80ED" />
          <path d="M9 9V16C9 16.6 9.4 17 10 17H17L9 9Z" fill="#E5F0FF" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${customSize} flex items-center justify-center flex-shrink-0 ${circleBg} ${iconColor} font-sans shadow-inner`}>
      {deck.emoji || "📖"}
    </div>
  );
}

export function getCategoryDetails(item: Question, decks: Deck[]) {
  // Direct definition
  if (item.category) {
    if (item.category === '数学') {
      return { 
        name: "数学", 
        bg: "bg-[#FFF0F0] text-[#D84B4B]", 
        bar: "border-l-[#D84B4B]", 
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
        )
      };
    }
    if (item.category === '英语') {
      return { 
        name: "英语", 
        bg: "bg-[#F0F7F0] text-[#2F732F]", 
        bar: "border-l-[#2F732F]", 
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="m5 15 3.5-7 3.5 7M6 13h5M14 8h7M17.5 8v9M14 17h7" />
          </svg>
        )
      };
    }
    if (item.category === '物理') {
      return { 
        name: "物理", 
        bg: "bg-[#F0F0EE] text-[#60605B]", 
        bar: "border-l-[#60605B]", 
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M6 2h12M14 2v6.2l5.3 9.4A2 2 0 0 1 17.6 21H6.4a2 2 0 0 1-1.7-3.4L10 8.2V2" />
          </svg>
        )
      };
    }
  }

  // Rollback checks matching decks
  const parentDeck = decks.find(d => d.questions.some(qd => qd.id === item.id));
  if (parentDeck) {
    if (parentDeck.id === 'deck-eng' || parentDeck.name.includes("英") || parentDeck.name.includes("词汇")) {
      return { 
        name: "英语", 
        bg: "bg-[#F0F7F0] text-[#2F732F]", 
        bar: "border-l-[#2F732F]", 
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="m5 15 3.5-7 3.5 7M6 13h5M14 8h7M17.5 8v9M14 17h7" />
          </svg>
        )
      };
    }
    if (parentDeck.id === 'deck-phy' || parentDeck.name.includes("物") || parentDeck.name.includes("力学")) {
      return { 
        name: "物理", 
        bg: "bg-[#F0F0EE] text-[#60605B]", 
        bar: "border-l-[#60605B]", 
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M6 2h12M14 2v6.2l5.3 9.4A2 2 0 0 1 17.6 21H6.4a2 2 0 0 1-1.7-3.4L10 8.2V2" />
          </svg>
        )
      };
    }
    // General fallback
    return {
      name: parentDeck.name.slice(0, 4),
      bg: "bg-surface-container text-[#2D6A4F] border border-[#2D6A4F]/10",
      bar: "border-l-[#2D6A4F]",
      icon: (
        <span className="text-[10px] shrink-0">{parentDeck.emoji || "📝"}</span>
      )
    };
  }

  return {
    name: "复习",
    bg: "bg-[#FAF3EB] text-[#8B786D]",
    bar: "border-l-[#8B786D]",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  };
}

export function QuestionBankTool({ onClose }: { onClose: () => void }) {
  const [currView, setCurrView] = useState<'home' | 'set-detail' | 'import' | 'practice' | 'incorrect' | 'favorites' | 'stats'>('home');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  // States with LocalStorage persistence
  const [decks, setDecks] = useState<Deck[]>(() => {
    const local = localStorage.getItem("study_xiaozhu_decks_v3");
    if (local) {
      try { return JSON.parse(local); } catch (e) { console.error(e); }
    }
    return [
      {
        id: "deck-eng",
        name: "考研英语词汇精选",
        desc: "精选考研英语大纲高频核心词汇，涵盖核心搭配、精要释义与阅读例句。",
        emoji: "📖",
        color: "bg-[#FFF2F2] text-[#E05252] border-[#FFE3E3]",
        lastReviewed: "2小时前",
        displayCount: "2,450",
        questions: [
          {
            id: "eng-q0-serendipity",
            type: "choice",
            q: "以下哪个选项最准确地描述了 \"Serendipity\" 的含义？",
            phonetic: "[,serən'dipəti]",
            tag: "模拟考试",
            definition: "意外发现有价值或有趣事物的偶然机缘。",
            options: [
              "A. 经过严密计划和努力后取得的必然成功。",
              "B. 意外发现有价值或有趣事物的偶然机缘。",
              "C. 在困境中保持冷静和理智的能力。",
              "D. 一种长期的、难以治愈的悲伤状态。"
            ],
            answer: "B",
            explanation: "Serendipity 意为“意外发现有价值或有趣事物的偶然机缘；机巧、福缘”。该词来源于童话故事《锡兰二王子》(The Three Princes of Serendip)，指一种偶然发现意想不到的事物之独特感知力。",
            mastered: false
          },
          {
            id: "eng-q1",
            type: "choice",
            q: "以下四选项中，哪个单词最贴近「Pragmatic（务实的）」的英文同义释义？",
            options: [
              "A. Practical and realistic, rather than theoretical",
              "B. Unreasonably determined to have one's own way",
              "C. Extremely idealistic and optimistic",
              "D. Displaying wealth or skills in an attractive way"
            ],
            answer: "A",
            explanation: "Pragmatic 意为“务实的，实用的，讲求实际的”，强调以实际行动和客观成效为导向，与 Practical and realistic 的含义完美对应。",
            mastered: false
          },
          {
            id: "eng-q2",
            type: "qa",
            q: "请释义名词「Paradigm（范式/典范）」在研究生阶段学术阅读中的核心定义与其派生词「Paradigm shift（范式转移）」。",
            a: "Paradigm 表示“范式，典型范例，认知框架”。常指某一特定时期内学科或人类思想体系中一套普遍接受的核心理论、法则和研究方法体系；而 Paradigm shift 指的是旧有学术认知结构或思维方式的根本性、革命性变革颠覆。",
            explanation: "Paradigm 的物理词根源自希腊语 paradeigma（表示“样品”，即可以照着做的典范样式）。",
            mastered: false
          },
          {
            id: "eng-q3",
            type: "choice",
            q: "单词「Eloquent（雄辩的，有说服力的）」的最贴合同义词是以下哪个？",
            options: [
              "A. Persuasive and expressive in speaking or writing",
              "B. Showing a neat, simple, and elegant design",
              "C. Tending to argue or fight with other people",
              "D. Extremely complicated and difficult to follow"
            ],
            answer: "A",
            explanation: "Eloquent 意为“雄辩的，口才流利的，表现力强的”，与 Persuasive (有说服力的) 释义最类似。",
            mastered: false
          }
        ]
      },
      {
        id: "deck-phy",
        name: "高中物理必修一",
        desc: "力学基础、速度与加速度、牛顿运动定律等核心公式与经典考题详解。",
        emoji: "🧪",
        color: "bg-[#EDF5FF] text-[#2F80ED] border-[#D6E8FF]",
        lastReviewed: "昨天",
        displayCount: "860",
        questions: [
          {
            id: "phy-q1",
            type: "choice",
            q: "根据物理学上的牛顿第一定律（惯性定律），在物体不受外力或外力合力恒为零的条件下，以下哪项行为是正确的？",
            options: [
              "A. 物体将始终保持静止状态或作匀速直线运动",
              "B. 物体将立即减速直至运动速度完全降到零",
              "C. 物体将作以重力为向心力的匀速圆周运动",
              "D. 物体产生与质量成正比的瞬间匀加速直线运动"
            ],
            answer: "A",
            explanation: "牛顿第一定律指出，一切物体在没有受到外力的作用时，总保持静止状态或匀速直线运动状态，直到有外力迫使它改变这种状态为止。该定律揭露了惯性是一切物体的固有属性。",
            mastered: false
          },
          {
            id: "phy-q2",
            type: "qa",
            q: "简述重力加速度（g）在地球表面不同纬度以及高度的变化规律，并说明其背后的核心物理成因。",
            a: "1）随纬度升高而增大：赤道到两极纬度升高，自转半径减小，所受惯性离心力变小，分力后的重力加速度反而增大。\n\n2）随高度增加而减小：高度增加时离地心质心越远，根据万有引力公式，重力加速度与距离平方成反比，引力变弱因而 g 值减小。",
            explanation: "在地球不同位置计算时，极地处的加速度略大（约9.83m/s²），赤道处的加速度略小（约9.78m/s²），中学教学一般估算为 9.8m/s² 或 10m/s²。",
            mastered: false
          },
          {
            id: "phy-q3",
            type: "choice",
            q: "质点作匀速圆周运动时，其产生的加速度（向心加速度）的方向和大小有什么规律？",
            options: [
              "A. 加速度方向始终指向圆心，其大小恒定不变",
              "B. 加速度方向始终沿圆周切线，其大小随时间均匀递增",
              "C. 加速度方向始终背向圆心，其大小随向心力大小改变",
              "D. 加速度的方向和大小都在时时刻刻保持恒定不变"
            ],
            answer: "A",
            explanation: "匀速圆周运动虽然角速度 and 线速度大小不变，但线速度方向始终在变。其向心加速度的方向时时刻刻指向圆周中心，因此加速度是一个方向不断改变的“变加速度”，但其大小恒定为 a = v²/r。",
            mastered: false
          }
        ]
      }
    ];
  });

  const [incorrectBook, setIncorrectBook] = useState<Question[]>(() => {
    const local = localStorage.getItem("spring_review_incorrect");
    if (local) {
      try { return JSON.parse(local); } catch (e) { console.error(e); }
    }
    return [
      {
        id: "err-math",
        type: "qa",
        category: "数学",
        date: "10月24日",
        q: "微积分：分部积分法",
        errorNote: "未能正确识别 u 和 dv，导致陷入死循环。记住 ILATE 优先级法则。",
        a: "分部积分公式：∫u dv = uv - ∫v du。选择 u 的顺序通常遵循 ILATE 优先级：I (反三角函数), L (对数函数), A (代数函数), T (三角函数), E (指数函数)。",
        explanation: "通过分部积分，逐步降幂或者凑成易积分部分...",
        mastered: false,
      },
      {
        id: "err-eng",
        type: "qa",
        category: "英语",
        date: "10月22日",
        q: "虚拟语气条件句",
        errorNote: "在表达不可能情况的条件句中混淆了 'were' 和 'was'。\"If I were you...\"",
        a: "在对现在的虚拟条件句中，如果条件从句中是 be 动词，无论主语是什么人称，一律用 were 而不用 was。例如: If I were you, I would study harder.",
        explanation: "主语虚拟语气的固定结构，强调用 were 表假设现状的相反...",
        mastered: false,
      },
      {
        id: "err-phy",
        type: "qa",
        category: "物理",
        date: "10月20日",
        q: "运动学：抛体运动",
        errorNote: "在应用运动学公式前忘记将初速度分解为 x 和 y 分量。",
        a: "抛体运动必须分解为：水平方向的匀速直线运动（v_x = v_0 * cosθ），和竖直方向的匀变速直线运动（v_y = v_0 * sinθ - gt）。",
        explanation: "建立垂直和水平坐标系分量分别分析...",
        mastered: false,
      }
    ];
  });

  const [favorites, setFavorites] = useState<Question[]>(() => {
    const local = localStorage.getItem("spring_review_favorites");
    if (local) {
      try { return JSON.parse(local); } catch (e) { console.error(e); }
    }
    return [
      {
        id: "fav-math",
        type: "qa",
        category: "数学",
        date: "10月24日",
        q: "欧拉公式与高斯积分的结合",
        errorNote: "温习要点：如何将一维高斯积分转化为极坐标二维积分进行求解。",
        a: "利用极坐标变换：I² = ∫∫ e^(-x²-y²) dxdy = ∫[0,2π] ∫[0,∞] e^(-r²) r dr dθ = π，从而得出单变量高斯积分为 √π。这与 e^(iπ) + 1 = 0 一起勾勒出基础数学的完美对称。",
        explanation: "高斯积分在概率论、正态分布、量子物理中都是最基本的数学积木，必须牢记其极坐标推导转换法。",
        mastered: true,
      },
      {
        id: "fav-eng",
        type: "qa",
        category: "英语",
        date: "10月23日",
        q: "常考高频动词搭配：Attribute V.S. Contribute",
        errorNote: "写作重点辨析：attribute sth to 与 contribute to 的细微区别。",
        a: "attribute A to B 代表'归因，把A归结于B'(to是介词)；而 contribute to 代表'有助于，引起，捐献'。例句：They attribute their success to constant practice.",
        explanation: "在考研与六级翻译/写作中，这两个词经常被替换使用，务必注意 attribute 的主被动用法和 contribute 的介词指向性。",
        mastered: true,
      }
    ];
  });

  const [stats, setStats] = useState(() => {
    const local = localStorage.getItem("spring_review_stats");
    if (local) {
      try { return JSON.parse(local); } catch (e) { console.error(e); }
    }
    return {
      todayCount: 5,
      correctRate: 85,
      streakDays: 4,
    };
  });

  // Save changes
  useEffect(() => {
    localStorage.setItem("study_xiaozhu_decks_v3", JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem("spring_review_incorrect", JSON.stringify(incorrectBook));
  }, [incorrectBook]);

  useEffect(() => {
    localStorage.setItem("spring_review_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("spring_review_stats", JSON.stringify(stats));
  }, [stats]);

  // Helper selectors
  const selectedDeck = decks.find(d => d.id === selectedDeckId) || null;
  const totalQuestionsInReview = decks.reduce((sum, d) => sum + d.questions.length, 0);
  const masteredQuestionsCount = decks.reduce((sum, d) => sum + d.questions.filter(q => q.mastered).length, 0);
  const unstartedQuestionsCount = totalQuestionsInReview - masteredQuestionsCount;

  // Practice States
  const [practiceDecks, setPracticeDecks] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isQAFlipped, setIsQAFlipped] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [correctCountInSession, setCorrectCountInSession] = useState(0);

  // Import File States
  const [dragActive, setDragActive] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<Question[]>([]);
  const [importTitle, setImportTitle] = useState("");
  const [importDesc, setImportDesc] = useState("");
  const [importEmoji, setImportEmoji] = useState("📚");

  // Slide state
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // New deck-detail customized states
  const [dailyPlanCount, setDailyPlanCount] = useState<number>(50);
  const [selectedRecMode, setSelectedRecMode] = useState<'reccite' | 'practice' | 'exam'>('reccite');
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(3600);
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});

  // Custom confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
  } | null>(null);

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText: string = "确认",
    cancelText: string = "取消"
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  // Lock scrolling on practice screen
  useEffect(() => {
    if (currView === 'practice') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currView]);

  // Countdown Timer for Exam Mode
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (currView === 'practice' && selectedRecMode === 'exam' && !practiceComplete) {
      timerId = setInterval(() => {
        setExamTimeRemaining(prev => {
          if (prev <= 1) {
            // Out of time: auto submit
            setPracticeComplete(true);
            if (timerId) clearInterval(timerId);
            // Calculate answers on auto timeout
            let correctCount = 0;
            practiceDecks.forEach(q => {
              if (examAnswers[q.id] === q.answer) {
                correctCount++;
              } else {
                addToIncorrect(q);
              }
            });
            setCorrectCountInSession(correctCount);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [currView, selectedRecMode, practiceComplete, practiceDecks, examAnswers]);

  const startPractice = (targetQuestions: Question[], mode?: 'reccite' | 'practice' | 'exam') => {
    if (targetQuestions.length === 0) return;
    const finalMode = mode || selectedRecMode;
    if (mode) {
      setSelectedRecMode(mode);
    }
    setPracticeDecks(targetQuestions);
    setCurrentQuestionIdx(0);
    setPracticeComplete(false);
    setCorrectCountInSession(0);
    setSlideDirection(null);
    setCurrView('practice');

    const firstQ = targetQuestions[0];
    if (finalMode === 'reccite') {
      setShowExplanation(true);
      setSelectedOption(firstQ.answer || 'C');
      setHasCheckedAnswer(true);
      setIsCorrect(true);
      setIsQAFlipped(true);
    } else if (finalMode === 'exam') {
      setShowExplanation(false);
      setSelectedOption(null);
      setHasCheckedAnswer(false);
      setIsCorrect(null);
      setIsQAFlipped(false);
      setExamAnswers({});
      setExamTimeRemaining(3600); // 1 hour
    } else {
      setShowExplanation(false);
      setSelectedOption(null);
      setHasCheckedAnswer(false);
      setIsCorrect(null);
      setIsQAFlipped(false);
    }
  };

  const handleChoiceSelect = (opt: string) => {
    const optChar = opt.charAt(0);
    if (selectedRecMode === 'exam') {
      const q = practiceDecks[currentQuestionIdx];
      setExamAnswers(prev => ({
        ...prev,
        [q.id]: optChar
      }));
      setSelectedOption(optChar);
      return;
    }
    if (hasCheckedAnswer) return;
    setSelectedOption(optChar); // A, B, C, or D
    
    // Automatically verify in practice mode
    const currentQuestion = practiceDecks[currentQuestionIdx];
    const correct = optChar === currentQuestion.answer;
    setIsCorrect(correct);
    setHasCheckedAnswer(true);
    setShowExplanation(true);
    if (correct) {
      setCorrectCountInSession(prev => prev + 1);
    } else {
      addToIncorrect(currentQuestion);
    }
  };

  const addToIncorrect = (q: Question) => {
    setIncorrectBook(prev => {
      if (prev.some(item => item.id === q.id)) return prev;
      const today = new Date();
      const formattedDate = `${today.getMonth() + 1}月${today.getDate()}日`;
      return [...prev, { ...q, date: q.date || formattedDate }];
    });
  };

  const toggleFavorite = (q: Question) => {
    setFavorites(prev => {
      if (prev.some(item => item.id === q.id)) {
        return prev.filter(item => item.id !== q.id);
      } else {
        return [...prev, q];
      }
    });
  };

  const handleSelfGrade = (grade: 'mastered' | 'hesitant' | 'unfamiliar') => {
    const currentQuestion = practiceDecks[currentQuestionIdx];
    if (grade === 'unfamiliar' || grade === 'hesitant') {
      addToIncorrect(currentQuestion);
    } else {
      // mark as mastered in original decks
      setDecks(prev => prev.map(d => ({
        ...d,
        questions: d.questions.map(q => q.id === currentQuestion.id ? { ...q, mastered: true } : q)
      })));
      setCorrectCountInSession(prev => prev + 1);
    }
    advanceQuestion();
  };

  const resetPracticeStateForQuestion = (nextIdx: number) => {
    const nextQ = practiceDecks[nextIdx];
    if (!nextQ) return;
    if (selectedRecMode === 'reccite') {
      setShowExplanation(true);
      setSelectedOption(nextQ.answer || 'C');
      setHasCheckedAnswer(true);
      setIsCorrect(true);
      setIsQAFlipped(true);
    } else if (selectedRecMode === 'exam') {
      setShowExplanation(false);
      setSelectedOption(examAnswers[nextQ.id] || null);
      setHasCheckedAnswer(false);
      setIsCorrect(null);
      setIsQAFlipped(false);
    } else {
      setShowExplanation(false);
      setSelectedOption(null);
      setHasCheckedAnswer(false);
      setIsCorrect(null);
      setIsQAFlipped(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setSlideDirection('left');
      const prevIdx = currentQuestionIdx - 1;
      setCurrentQuestionIdx(prevIdx);
      resetPracticeStateForQuestion(prevIdx);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < practiceDecks.length - 1) {
      setSlideDirection('right');
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      resetPracticeStateForQuestion(nextIdx);
    } else {
      // Completed last question
      setPracticeComplete(true);
      if (selectedRecMode === 'exam') {
        let correctCount = 0;
        practiceDecks.forEach(q => {
          if (examAnswers[q.id] === q.answer) {
            correctCount++;
          } else {
            addToIncorrect(q);
          }
        });
        setCorrectCountInSession(correctCount);
        setStats(prev => ({
          todayCount: prev.todayCount + practiceDecks.length,
          correctRate: Math.round(((prev.todayCount * prev.correctRate / 100) + correctCount) / (prev.todayCount + practiceDecks.length) * 100) || 85,
          streakDays: prev.streakDays,
        }));
      } else {
        setStats(prev => ({
          todayCount: prev.todayCount + practiceDecks.length,
          correctRate: Math.round(((prev.todayCount * prev.correctRate / 100) + correctCountInSession) / (prev.todayCount + practiceDecks.length) * 100) || 85,
          streakDays: prev.streakDays,
        }));
      }
    }
  };

  const submitExamEarly = () => {
    showConfirm(
      "交卷确认",
      "确定现在提交试卷吗？未解答的题目将被记为错误。",
      () => {
        setPracticeComplete(true);
        let correctCount = 0;
        practiceDecks.forEach(q => {
          if (examAnswers[q.id] === q.answer) {
            correctCount++;
          } else {
            addToIncorrect(q);
          }
        });
        setCorrectCountInSession(correctCount);
        setStats(prev => ({
          todayCount: prev.todayCount + practiceDecks.length,
          correctRate: Math.round(((prev.todayCount * prev.correctRate / 100) + correctCount) / (prev.todayCount + practiceDecks.length) * 100) || 85,
          streakDays: prev.streakDays,
        }));
      },
      "立即交卷",
      "继续作答"
    );
  };

  const advanceQuestion = () => {
    handleNextQuestion();
  };

  // Parser helper
  const parseJSONData = (text: string, fileName: string) => {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return {
        name: fileName.replace(/\.[^/.]+$/, ""),
        desc: `从 JSON 文件 ${fileName} 导入`,
        emoji: "📚",
        questions: parsed.map((q: any, idx: number) => ({
          id: `json-q-${Date.now()}-${idx}`,
          type: q.type || (q.options ? 'choice' : 'qa'),
          q: q.q || q.question || "未命名问题",
          a: q.a || q.answer || "",
          options: q.options || undefined,
          answer: q.answer || undefined,
          explanation: q.explanation || "自选复习点",
          mastered: false
        }))
      };
    } else {
      return {
        name: parsed.name || fileName.replace(/\.[^/.]+$/, ""),
        desc: parsed.desc || `从 JSON 文件 ${fileName} 导入`,
        emoji: parsed.emoji || "📚",
        questions: (parsed.questions || []).map((q: any, idx: number) => ({
          id: `json-q-${Date.now()}-${idx}`,
          type: q.type || (q.options ? 'choice' : 'qa'),
          q: q.q || q.question || "未命名问题",
          a: q.a || q.answer || "",
          options: q.options || undefined,
          answer: q.answer || undefined,
          explanation: q.explanation || "无解析说明",
          mastered: false
        }))
      };
    }
  };

  const parseCSV = (csvText: string, fileName: string) => {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) throw new Error("CSV 文件内容为空");
    
    let startIndex = 0;
    const firstLine = lines[0].toLowerCase();
    if (firstLine.includes("type") || firstLine.includes("类型") || firstLine.includes("question") || firstLine.includes("问题")) {
      startIndex = 1;
    }
    
    const questions: Question[] = [];
    for (let i = startIndex; i < lines.length; i++) {
      const cols: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let c = 0; c < lines[i].length; c++) {
        const char = lines[i][c];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cols.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      cols.push(current.trim());
      
      if (cols.length >= 2) {
        const colType = cols[0].toLowerCase().trim();
        const isChoice = colType === 'choice' || colType === '选择题' || colType === '单选' || (cols[2] && (cols[2].includes("|") || cols[2].includes(";")));
        
        const qText = isChoice ? cols[1] : (colType === 'qa' || colType === '问答' ? cols[1] : cols[0]);
        const explanation = cols.length >= 5 ? cols[4] : "无解析说明";
        
        if (isChoice) {
          const rawOptions = cols[2] || "";
          const optionsList = rawOptions.split(/[|;]/).map(o => o.trim()).filter(Boolean);
          const correctAns = cols[3] || "A";
          questions.push({
            id: `csv-q-${Date.now()}-${i}`,
            type: 'choice',
            q: qText,
            options: optionsList,
            answer: correctAns,
            explanation: explanation,
            mastered: false
          });
        } else {
          const answerText = colType === 'qa' || colType === '问答' ? cols[2] : cols[1];
          questions.push({
            id: `csv-q-${Date.now()}-${i}`,
            type: 'qa',
            q: qText,
            a: answerText,
            explanation: cols.length >= 4 ? cols[3] : "无解析说明",
            mastered: false
          });
        }
      }
    }
    
    if (questions.length === 0) throw new Error("没有在 CSV 里找到任何有效记录。格式指引: ‘类型,问题,选项,参考答案,解析描述’");
    return {
      name: fileName.replace(/\.[^/.]+$/, ""),
      desc: `从 CSV 文件导入，共 ${questions.length} 道复习问题。`,
      emoji: "📊",
      questions
    };
  };

  const parseTXT = (txtText: string, fileName: string) => {
    const blocks = txtText.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
    const questions: Question[] = [];
    
    blocks.forEach((block, idx) => {
      const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
      if (lines.length >= 2) {
        let q = "";
        let a = "";
        let explanation = "";
        let type: 'qa' | 'choice' = 'qa';
        let options: string[] = [];
        let answer = "";

        lines.forEach(line => {
          if (/^(q:|问题:|问:|【?问题】?)/i.test(line)) {
            q = line.replace(/^(q:|问题:|问:|【?问题】?\s*[:：]?\s*)/i, "");
          } else if (/^(a:|答案:|答:|【?答案】?)/i.test(line)) {
            a = line.replace(/^(a:|答案:|答:|【?答案】?\s*[:：]?\s*)/i, "");
          } else if (/^(解析:|explanation:|exp:|【?解析】?)/i.test(line)) {
            explanation = line.replace(/^(解析:|explanation:|exp:|【?解析】?\s*[:：]?\s*)/i, "");
          } else if (/^(选项:|options:|【?选项】?)/i.test(line)) {
            type = 'choice';
            options = line.replace(/^(选项:|options:|【?选项】?\s*[:：]?\s*)/i, "").split(/[|;]/).map(o => o.trim()).filter(Boolean);
          } else if (/^(正确选项:|正确答案:|answer:|【?正确答案】?)/i.test(line)) {
            answer = line.replace(/^(正确选项:|正确答案:|answer:|【?正确答案】?\s*[:：]?\s*)/i, "").trim()[0];
          }
        });

        if (!q && !a) {
          q = lines[0].replace(/^\d+[\.\、]/, "").trim();
          a = lines[1].trim();
          if (lines[2]) explanation = lines[2].trim();
        }

        if (q && (a || options.length > 0)) {
          questions.push({
            id: `txt-q-${Date.now()}-${idx}`,
            type: type,
            q: q,
            a: type === 'qa' ? a : undefined,
            options: options.length > 0 ? options : undefined,
            answer: answer || undefined,
            explanation: explanation || "科学复习，高效掌握。",
            mastered: false
          });
        }
      }
    });

    if (questions.length === 0) throw new Error("无法解析该 TXT 文件。请按回车两次（两个换行）分隔每个问答，首两行为必填问答内容。");
    return {
      name: fileName.replace(/\.[^/.]+$/, ""),
      desc: `从 TXT 文本文件导入，包含 ${questions.length} 道问答。`,
      emoji: "📄",
      questions
    };
  };

  const parseZIP = async (file: File) => {
    const zip = new JSZip();
    const zipContents = await zip.loadAsync(file);
    
    let matchingFileKey = "";
    for (const key of Object.keys(zipContents.files)) {
      if (!zipContents.files[key].dir && (key.endsWith(".json") || key.endsWith(".csv") || key.endsWith(".txt"))) {
        matchingFileKey = key;
        break;
      }
    }
    
    if (!matchingFileKey) {
      throw new Error("没在压缩包里找到符合格式的 .json、.csv 或 .txt 题库文件！");
    }
    
    const rawText = await zipContents.files[matchingFileKey].async("string");
    const innerFileName = matchingFileKey.split("/").pop() || "压缩包导入";
    
    if (matchingFileKey.endsWith(".json")) {
      return parseJSONData(rawText, innerFileName);
    } else if (matchingFileKey.endsWith(".csv")) {
      return parseCSV(rawText, innerFileName);
    } else {
      return parseTXT(rawText, innerFileName);
    }
  };

  const handleFileUpload = async (file: File) => {
    setImportError(null);
    try {
      if (file.name.endsWith(".zip")) {
        const result = await parseZIP(file);
        setParsedPreview(result.questions);
        setImportTitle(result.name);
        setImportDesc(result.desc);
        setImportEmoji(result.emoji);
      } else if (file.name.endsWith(".json")) {
        const text = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = (e) => res(e.target?.result as string);
          reader.onerror = () => rej(new Error("读取 JSON 失败"));
          reader.readAsText(file);
        });
        const result = parseJSONData(text, file.name);
        setParsedPreview(result.questions);
        setImportTitle(result.name);
        setImportDesc(result.desc);
        setImportEmoji(result.emoji);
      } else if (file.name.endsWith(".csv")) {
        const text = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = (e) => res(e.target?.result as string);
          reader.onerror = () => rej(new Error("读取 CSV 失败"));
          reader.readAsText(file);
        });
        const result = parseCSV(text, file.name);
        setParsedPreview(result.questions);
        setImportTitle(result.name);
        setImportDesc(result.desc);
        setImportEmoji(result.emoji);
      } else if (file.name.endsWith(".txt")) {
        const text = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = (e) => res(e.target?.result as string);
          reader.onerror = () => rej(new Error("读取 TXT 失败"));
          reader.readAsText(file);
        });
        const result = parseTXT(text, file.name);
        setParsedPreview(result.questions);
        setImportTitle(result.name);
        setImportDesc(result.desc);
        setImportEmoji(result.emoji);
      } else {
        throw new Error("不支持此格式！请上传题库文件（.json、.csv、.txt）或带有题库文件的 .zip 压缩包。");
      }
    } catch (err: any) {
      setImportError(err.message || "解析文件时遇到错误。请保证文件完整且符合基本规范。");
      setParsedPreview([]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSaveImportedDeck = () => {
    if (parsedPreview.length === 0) return;
    const title = importTitle.trim() || "未命名题库";
    const desc = importDesc.trim() || `自文件包导入，共包含 ${parsedPreview.length} 道复习问题。`;
    const newDeck: Deck = {
      id: `deck-${Date.now()}`,
      name: title,
      desc: desc,
      emoji: importEmoji,
      color: "bg-primary/10 text-primary border-primary/20",
      questions: parsedPreview
    };

    setDecks(prev => [...prev, newDeck]);
    setImportTitle("");
    setImportDesc("");
    setParsedPreview([]);
    setCurrView('my-sets');
  };

  return (
    <ToolScreen
      title="复习小筑"
      desc="科学管理复习进度，高效刷题体验。"
      icon={HelpCircle}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
      hideHeader={currView === 'import' || currView === 'incorrect' || currView === 'favorites' || currView === 'stats' || currView === 'set-detail' || currView === 'practice'}
    >
      <div className="flex-1 flex flex-col font-sans max-w-4xl mx-auto w-full gap-5 pb-8 text-on-surface">
        
        {/* Navigation Breadcrumb / Header Row on inner pages */}
        {(currView !== 'home' && currView !== 'import' && currView !== 'incorrect' && currView !== 'favorites' && currView !== 'stats' && currView !== 'set-detail' && currView !== 'practice') && (
          <div className="flex items-center gap-2">
            <button
               onClick={() => {
                 if (currView === 'practice' && !practiceComplete) {
                   showConfirm(
                     "退出确认",
                     "确定要退出当前的刷题会话吗？已完成的练习仍会更新在统计中。",
                     () => {
                       setCurrView('home');
                     }
                   );
                 } else {
                   setCurrView('home');
                 }
               }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 text-xs font-bold text-on-surface-variant cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              返回主页
            </button>
            <span className="text-xs text-outline">/</span>
            <span className="text-xs font-bold text-primary">
              {currView === 'my-sets' && "我的题集"}
              {currView === 'set-detail' && "题集详情"}
              {currView === 'import' && "导入题库"}
              {currView === 'practice' && "练习页面"}
              {currView === 'incorrect' && "错题本"}
              {currView === 'favorites' && "收藏夹"}
              {currView === 'stats' && "学习统计"}
            </span>
          </div>
        )}

        {/* 1. HOME VIEW */}
        {currView === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Quick Actions Bento Grid (2x2) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: 导入题库 */}
              <button
                onClick={() => setCurrView('import')}
                className="p-5 rounded-[28px] flex flex-col justify-between items-start text-left border border-[#F5ECE2] bg-[#FCF7F2] hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-all h-[155px] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-white shadow-xs flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-[#C26E40]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-[#523624] tracking-tight">导入题库</span>
                  <span className="text-xs text-[#A1826F] mt-1 font-medium">支持导入文件</span>
                </div>
              </button>

              {/* Card 2: 错题本 */}
              <button
                onClick={() => setCurrView('incorrect')}
                className="p-5 rounded-[28px] flex flex-col justify-between items-start text-left border border-[#F7EAEB] bg-[#FDF3F3] hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-all h-[155px] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-white shadow-xs flex items-center justify-center mb-3">
                  <Trash2 className="w-5 h-5 text-[#B23838]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-[#5C1D1D] tracking-tight">错题本</span>
                  <span className="text-xs text-[#AA7474] mt-1 font-medium">针对攻克难关</span>
                </div>
              </button>

              {/* Card 3: 收藏夹 */}
              <button
                onClick={() => setCurrView('favorites')}
                className="p-5 rounded-[28px] flex flex-col justify-between items-start text-left border border-[#E5F3EB] bg-[#F2FAF5] hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-all h-[155px] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-white shadow-xs flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-[#1D8554]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-[#174C32] tracking-tight">收藏夹</span>
                  <span className="text-xs text-[#71A488] mt-1 font-medium">常看卡片库</span>
                </div>
              </button>

              {/* Card 4: 学习统计 */}
              <button
                onClick={() => setCurrView('stats')}
                className="p-5 rounded-[28px] flex flex-col justify-between items-start text-left border border-[#E9E6F6] bg-[#F4F3FC] hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-all h-[155px] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-white shadow-xs flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5 text-[#5B32CA]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-[#2A165C] tracking-tight">学习统计</span>
                  <span className="text-xs text-[#8174A9] mt-1 font-medium">复习曲线进度</span>
                </div>
              </button>
            </div>

            {/* My Decks Title section */}
            <div className="flex flex-col gap-3.5 mt-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[17px] font-black text-on-surface flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] text-[#2D6A4F] shrink-0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <rect x="6" y="3" width="13" height="18" rx="2.5" fill="none" />
                    <path d="M3 6h3M3 11h3M3 16h3" strokeWidth="2.2" />
                  </svg>
                  我的题集
                </h3>
              </div>

              {/* Deck list items */}
              <div className="flex flex-col gap-3">
                {decks.map((deck) => {
                  const totalCount = deck.questions.length;
                  const displayQuestionsCount = deck.displayCount || (totalCount > 0 ? totalCount.toLocaleString() : "0");
                  const displayLastReviewed = deck.lastReviewed || "刚刚";

                  return (
                    <div
                      key={deck.id}
                      onClick={() => {
                        setSelectedDeckId(deck.id);
                        setCurrView('set-detail');
                      }}
                      className="group p-5 bg-white rounded-[28px] border border-stone-200/40 shadow-xs hover:shadow-md hover:border-stone-300/60 flex items-center cursor-pointer transition-all active:scale-[0.99] duration-300"
                    >
                      <div className="flex items-center gap-4 w-full">
                        {renderDeckIcon(deck, "w-[50px] h-[50px] text-[22px] rounded-full")}
                        <div className="flex flex-col flex-1 min-w-0 justify-center gap-1 text-left">
                          <span className="text-[16px] font-extrabold text-stone-800 truncate group-hover:text-primary transition-colors">
                            {deck.name}
                          </span>
                          <div className="flex justify-between items-center w-full text-[13px] text-stone-500 font-medium">
                            <span>{displayQuestionsCount} 题目</span>
                            <span>上次复习: {displayLastReviewed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}



        {/* 3. SET DETAIL VIEW */}
        {currView === 'set-detail' && selectedDeck && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col text-left px-1 select-none"
          >
            {/* Header section with Back Button & Centered Title */}
            <div className="relative flex items-center justify-between w-full mb-6">
              <button
                onClick={() => setCurrView('home')}
                className="w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#455A4F] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100/60 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <span className="text-[17px] font-black text-[#1b4332] tracking-tight">{selectedDeck.name}</span>
              
              <button
                onClick={() => {
                  showConfirm(
                    "删除题库确认",
                    `确定要删除“${selectedDeck.name}”题库吗？该操作不可撤销。`,
                    () => {
                      const updatedDecks = decks.filter(d => d.id !== selectedDeck.id);
                      setDecks(updatedDecks);
                      localStorage.setItem("study_xiaozhu_decks_v3", JSON.stringify(updatedDecks));
                      setCurrView('home');
                    },
                    "确认删除",
                    "取消"
                  );
                }}
                className="w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-rose-600 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100/60 hover:shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="删除题库"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* "选择复习方式" section title */}
            <div className="flex flex-col gap-0.5 mb-5">
              <h3 className="text-[22px] font-black text-[#1b4332] tracking-tight">选择复习方式</h3>
            </div>

            {/* Modes Grid (背题 vs 刷题) */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Card A: 背题 */}
              <button
                onClick={() => setSelectedRecMode('reccite')}
                className={`p-6 rounded-[28px] flex flex-col justify-between items-start text-left border cursor-pointer h-[155px] transition-all duration-300 relative overflow-hidden group
                  ${selectedRecMode === 'reccite' 
                    ? "bg-white border-[#1b4332] shadow-[0_8px_30px_rgba(27,67,50,0.06)] scale-[1.01]" 
                    : "bg-white border-stone-200/45 shadow-[0_4px_24px_rgba(0,0,0,0.015)] opacity-85 hover:opacity-100 hover:shadow-sm"
                  }
                `}
              >
                {/* Book circular icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
                  ${selectedRecMode === 'reccite' 
                    ? "bg-[#e2efe9] text-[#1b4332]" 
                    : "bg-[#f4f7f4] text-stone-400 group-hover:text-stone-600"
                  }
                `}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-[17px] font-black text-stone-900 tracking-tight leading-none mb-1">背题</span>
                  <span className="text-[12px] text-stone-400 font-bold">沉浸式记忆</span>
                </div>
              </button>

              {/* Card B: 刷题 */}
              <button
                onClick={() => setSelectedRecMode('practice')}
                className={`p-6 rounded-[28px] flex flex-col justify-between items-start text-left border cursor-pointer h-[155px] transition-all duration-300 relative overflow-hidden group
                  ${selectedRecMode === 'practice' 
                    ? "bg-white border-[#1b4332] shadow-[0_8px_30px_rgba(27,67,50,0.06)] scale-[1.01]" 
                    : "bg-white border-stone-200/45 shadow-[0_4px_24px_rgba(0,0,0,0.015)] opacity-85 hover:opacity-100 hover:shadow-sm"
                  }
                `}
              >
                {/* Meter circular icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
                  ${selectedRecMode === 'practice' 
                    ? "bg-[#f7f2ea] text-[#78593a]" 
                    : "bg-stone-100 text-stone-400 group-hover:text-stone-600"
                  }
                `}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2Z" />
                    <path d="M12 12L16 8" />
                    <path d="M12 7V12" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-[17px] font-black text-stone-900 tracking-tight leading-none mb-1">刷题</span>
                  <span className="text-[12px] text-stone-400 font-bold">快速检验</span>
                </div>
              </button>
            </div>

            {/* Card C: 计划 */}
            <div className="bg-white rounded-[32px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 mb-4 flex flex-col">
              {/* Card Header Info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[17px] font-black text-stone-800">计划</span>
                  <span className="text-[12px] text-stone-400 font-extrabold">系统推进复习</span>
                </div>
              </div>

              {/* Slider config container */}
              <div className="bg-[#fcfbf9] border border-stone-200/45 rounded-[24px] p-5 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-extrabold text-[#7c7d7c]">今日计划</span>
                  <div className="flex items-baseline">
                    <span className="text-[40px] font-black text-stone-900 tracking-tight leading-none">{dailyPlanCount}</span>
                    <span className="text-[13px] font-bold text-[#868786] ml-1">题</span>
                  </div>
                </div>

                <div className="mt-4 relative flex items-center w-full">
                  <input
                    type="range"
                    min="5"
                    max={Math.max(selectedDeck.questions.length, 100)}
                    step="5"
                    value={dailyPlanCount}
                    onChange={(e) => setDailyPlanCount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1b4332] outline-none"
                    style={{
                      WebkitAppearance: 'none',
                    }}
                  />
                </div>
                {/* Little indicator helper text */}
                <div className="flex justify-between items-center text-[10.5px] text-stone-400 font-extrabold mt-3 px-1">
                  <span>最少5题</span>
                  <span>当前设置：今日练习 {dailyPlanCount} 词</span>
                  <span>最长 {Math.max(selectedDeck.questions.length, 100)} 题</span>
                </div>
              </div>
            </div>

            {/* Card D: 模拟考试 */}
            <button
              onClick={() => {
                const testQuestions = [...selectedDeck.questions];
                if (testQuestions.length > 0) {
                  startPractice(testQuestions, 'exam');
                } else {
                  alert("暂无需学习的试题。 🎈");
                }
              }}
              className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-5 mb-6 flex items-center justify-between hover:shadow-md transition-all duration-300 text-left w-full cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#fef2f2] text-[#cd2b2b] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-black text-stone-800 leading-none mb-1">模拟考试</span>
                  <span className="text-[12.5px] text-stone-400 font-extrabold">全真模拟测验</span>
                </div>
              </div>
              
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-stone-300">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* "专项突破" Section */}
            <div className="flex flex-col gap-0.5 mb-5 mt-2">
              <h3 className="text-[22px] font-black text-[#1b4332] tracking-tight">专项突破</h3>
            </div>

            {/* Special category Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Card E: 错题 */}
              <button
                onClick={() => {
                  const items = incorrectBook.filter(q => selectedDeck.questions.some(item => item.id === q.id));
                  if (items.length > 0) {
                    startPractice(items, 'practice');
                  } else {
                    // Start practice session anyway or fallback
                    alert("棒极了！本套题库暂无错题记录。已为您加载本题目的完整精炼错题集！ 🌱");
                    const fallbackIncorrect = incorrectBook.filter(q => q.category === '英语' || q.id.includes('eng') || q.id.includes('err'));
                    if (fallbackIncorrect.length > 0) {
                      startPractice(fallbackIncorrect, 'practice');
                    } else {
                      startPractice(selectedDeck.questions, 'practice');
                    }
                  }
                }}
                className="bg-white rounded-[28px] border border-stone-200/45 shadow-[0_4px_24px_rgba(0,0,0,0.012)] p-6 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer text-center h-[170px]"
              >
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-3 text-stone-700 shadow-xs">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <span className="text-[17px] font-black text-stone-800 mb-2">错题</span>
                <span className="bg-[#fef2f3] text-[#cd2b2b] px-3.5 py-1 rounded-full text-[11px] font-black tracking-tight">
                  {selectedDeck.id === 'deck-eng' ? 32 : (incorrectBook.filter(q => selectedDeck.questions.some(item => item.id === q.id)).length || 12)} 个待复习
                </span>
              </button>

              {/* Card F: 收藏 */}
              <button
                onClick={() => {
                  const items = favorites.filter(q => selectedDeck.questions.some(item => item.id === q.id));
                  if (items.length > 0) {
                    startPractice(items, 'practice');
                  } else {
                    alert("将在本套题库为您寻找最近练习过的收藏重点。 🌟");
                    const fallbackFavorites = favorites.filter(q => q.category === '英语' || q.id.includes('eng') || q.id.includes('fav'));
                    if (fallbackFavorites.length > 0) {
                      startPractice(fallbackFavorites, 'practice');
                    } else {
                      startPractice(selectedDeck.questions, 'practice');
                    }
                  }
                }}
                className="bg-white rounded-[28px] border border-stone-200/45 shadow-[0_4px_24px_rgba(0,0,0,0.012)] p-6 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer text-center h-[170px]"
              >
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-3 text-stone-700 shadow-xs">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-[17px] font-black text-stone-800 mb-2">收藏</span>
                <span className="bg-[#f4f7f4] text-[#2ebd6b] px-3.5 py-1 rounded-full text-[11px] font-black tracking-tight">
                  {selectedDeck.id === 'deck-eng' ? 15 : (favorites.filter(q => selectedDeck.questions.some(item => item.id === q.id)).length || 6)} 个重点
                </span>
              </button>
            </div>



            {/* Core forest green play/reviews button at the bottom */}
            <button
              onClick={() => {
                const targetQuestions = selectedDeck.questions.slice(0, dailyPlanCount);
                if (targetQuestions.length > 0) {
                  startPractice(targetQuestions);
                } else {
                  alert("暂无需学习的试题。 ✨");
                }
              }}
              className="w-full bg-[#133024] hover:bg-[#0c221a] py-4 rounded-[28px] text-white font-extrabold text-[16px] flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(19,48,36,0.18)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer mt-4 mb-10 overflow-hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>开始复习</span>
            </button>
          </motion.div>
        )}

        {/* 4. IMPORT FLOW VIEW */}
        {currView === 'import' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col text-left px-1 select-none"
          >
            {/* Custom Back Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setParsedPreview([]);
                  setCurrView('home');
                }}
                className="w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#2D3B32] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {parsedPreview.length === 0 ? (
              <div className="flex flex-col gap-6">
                {/* Custom Big Header */}
                <div className="flex flex-col gap-1.5 text-left">
                  <h2 className="text-[32px] font-black text-[#1b4332] tracking-tight leading-tight">导入题库</h2>
                  <p className="text-[14px] text-stone-500/90 font-medium">
                    选择最适合你的方式，快速将题目加入复习计划。
                  </p>
                </div>

                {/* Main Card (Document Import) */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => {
                    const el = document.getElementById("file-upload-input");
                    if (el) el.click();
                  }}
                  className={`group bg-white rounded-[32px] p-8 border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-stone-300/40 active:scale-[0.99] flex flex-col items-center justify-center text-center gap-5 cursor-pointer transition-all duration-300 select-none min-h-[300px]
                    ${dragActive ? "border-[#2D4A3E] bg-[#FAF8F5] scale-[1.01]" : ""}
                  `}
                >
                  <input
                    id="file-upload-input"
                    type="file"
                    className="hidden"
                    accept=".json,.csv,.txt,.zip"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        await handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Beige File Icon Frame */}
                  <div className="w-[84px] h-[84px] bg-[#FAF3EB] rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8B786D]">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18V12M12 12L9 15M12 12L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex flex-col gap-2 max-w-sm">
                    <h3 className="text-[20px] font-black text-stone-900 tracking-tight">文件导入</h3>
                    <p className="text-[13px] text-stone-500 font-medium leading-relaxed">
                      支持批量导入常见文档格式，如 Word (docx), Excel (xlsx), PDF 及 txt 等，适合已有整理好的题库文件。
                    </p>
                  </div>
                </div>

                {/* Error Banner if any */}
                {importError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-rose-50 border border-rose-100/60 text-rose-600 text-xs font-semibold leading-relaxed shadow-inner"
                  >
                     ⚠️ 错误提示: {importError}
                  </motion.div>
                )}

                {/* Sticky/Bottom Import Button */}
                <div className="mt-4 pb-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("file-upload-input");
                      if (el) el.click();
                    }}
                    className="w-full py-4 rounded-full bg-[#254235] hover:bg-[#1a3026] text-white font-extrabold text-[15px] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    导入文件
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Configuration / Preview Screen when parsedPreview exists */}
                <div className="flex flex-col gap-1.5 text-left mb-2">
                  <h2 className="text-[28px] font-black text-[#1b4332] tracking-tight leading-tight">配置题库属性</h2>
                  <p className="text-[13px] text-stone-500/90 font-medium flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    成功识别 <strong>{parsedPreview.length}</strong> 道题目，请补全基本信息后导入：
                  </p>
                </div>

                {/* Configuration Fields */}
                <div className="p-6 rounded-[28px] bg-white border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">题库重置名称</label>
                    <input
                      type="text"
                      className="px-4 py-3 bg-stone-50 text-[13px] rounded-xl border border-stone-200/60 outline-none focus:border-[#2D4A3E] focus:bg-white transition-all font-semibold"
                      value={importTitle}
                      onChange={(e) => setImportTitle(e.target.value)}
                      placeholder="例如：微信小程序开发指南"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">显示分类 EMOJI 图标</label>
                    <div className="flex flex-wrap items-center gap-2">
                      {["📚", "💻", "🔬", "📐", "📝", "⚙️", "🌟", "💡"].map(emo => (
                        <button
                          key={emo}
                          type="button"
                          onClick={() => setImportEmoji(emo)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-base cursor-pointer border transition-all duration-200
                            ${importEmoji === emo ? "bg-[#254235] border-transparent text-white scale-105 font-bold shadow-sm" : "bg-stone-50 border-stone-200/60 text-stone-800 hover:bg-stone-100"}
                          `}
                        >
                          {emo}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">题库简介描述</label>
                    <input
                      type="text"
                      className="px-4 py-3 bg-stone-50 text-[13px] rounded-xl border border-stone-200/60 outline-none focus:border-[#2D4A3E] focus:bg-white transition-all font-semibold"
                      value={importDesc}
                      onChange={(e) => setImportDesc(e.target.value)}
                      placeholder="简单说明该题库范围与考察要点..."
                    />
                  </div>
                </div>

                {/* Preview Cards List */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider pl-1 font-sans">题目预览 (首选 5 道)</span>
                  <div className="flex flex-col gap-3.5 max-h-56 overflow-y-auto pr-1">
                    {parsedPreview.slice(0, 5).map((item, pIdx) => (
                      <div key={item.id} className="p-4 bg-white rounded-2xl text-[12px] leading-relaxed border border-stone-200/30 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col gap-1.5 text-left">
                        <p className="font-extrabold text-stone-800 flex items-start gap-1">
                          <span className="text-[#1b4332] font-mono shrink-0">Q{pIdx+1}:</span> 
                          <span>{item.q}</span>
                        </p>
                        <p className="text-stone-500 font-medium pl-6 leading-normal font-sans">
                          <span className="text-stone-400 font-mono mr-1">答:</span> 
                          {item.type === 'qa' ? item.a : `[单选题] 答案为 ${item.answer}`}
                        </p>
                      </div>
                    ))}
                    {parsedPreview.length > 5 && (
                      <p className="text-[11px] text-stone-400 italic text-center py-2 bg-stone-100/50 rounded-xl font-medium font-sans">
                        ✦ 还有其它的 {parsedPreview.length - 5} 道问题已全部妥善读入，保存即可导入
                      </p>
                    )}
                  </div>
                </div>

                {/* Save and Import Button */}
                <div className="mt-2">
                  <button
                    onClick={handleSaveImportedDeck}
                    className="w-full py-4 rounded-full bg-[#254235] hover:bg-[#1a3026] text-white font-extrabold text-[15px] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    保存并导入此题库到“我的题集”
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 5. PRACTICE OVERLAY / INTERACTIVE SCREEN */}
        {currView === 'practice' && practiceDecks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col h-full justify-between"
          >
            {!practiceComplete ? (
              <div className="flex flex-col gap-5 text-left h-full justify-between select-none">
                {/* Score bar / Progress Header */}
                <div className="flex items-center justify-between pb-1 shrink-0">
                  <button
                    onClick={() => {
                      if (selectedRecMode === 'exam') {
                        showConfirm(
                          "退出考试确认",
                          "确定要退出当前的模拟考试会话吗？已解答的题目不会被提交归档。",
                          () => {
                            setCurrView('set-detail');
                          },
                          "确定退出",
                          "继续作答"
                        );
                      } else {
                        showConfirm(
                          "退出练习确认",
                          `确定要退出当前的${selectedRecMode === 'reccite' ? "背" : "刷"}题会话吗？已掌握的进度仍将保留。`,
                          () => {
                            setCurrView('set-detail');
                          },
                          "确定退出",
                          "继续练习"
                        );
                      }
                    }}
                    className="w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#1b4332] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-200/50 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#1b4332]" />
                  </button>
                  
                  <h1 className="text-lg font-black text-[#1b4332] tracking-tight font-sans">
                    {selectedRecMode === 'exam' ? "模拟考试" : (selectedRecMode === 'reccite' ? "背题模式" : "刷题模式")}
                  </h1>

                  {selectedRecMode === 'exam' ? (
                    <div className="bg-[#edf2ee] border border-[#1b4332]/15 text-[#1b4332] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs select-none font-bold text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="font-mono mt-0.5">
                        {(() => {
                          const m = Math.floor(examTimeRemaining / 60).toString().padStart(2, '0');
                          const s = (examTimeRemaining % 60).toString().padStart(2, '0');
                          return `${m}:${s}`;
                        })()}
                      </span>
                    </div>
                  ) : (
                    <div className="bg-[#edf2ee] border border-[#1b4332]/15 px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs select-none">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[12px] font-black text-[#2D6A4F] font-mono leading-none">
                        {currentQuestionIdx + 1} / {practiceDecks.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress bar line */}
                {selectedRecMode === 'exam' ? (
                  <div className="flex flex-col gap-1 w-full shrink-0 -mt-1 select-none">
                    <div className="flex justify-between items-baseline font-bold">
                      <span className="text-xs text-stone-500 font-sans font-extrabold">
                        第 {currentQuestionIdx + 1} / {practiceDecks.length} 题
                      </span>
                      <span className="text-xs text-[#1b4332] font-mono font-black">
                        {Math.round(((currentQuestionIdx + 1) / practiceDecks.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-stone-100/90 border border-stone-200/10 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-[#1b4332] rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIdx + 1) / practiceDecks.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-1 bg-[#1b4332]/10 rounded-full overflow-hidden shrink-0 -mt-1">
                    <div
                      className="h-full bg-[#2D6A4F] rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / practiceDecks.length) * 100}%` }}
                    ></div>
                  </div>
                )}

                {/* Sliding active question block */}
                <div className="relative w-full overflow-hidden shrink-0 mt-1 py-2 px-1.5" style={{ touchAction: 'pan-x' }}>
                  <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                    <motion.div
                      key={currentQuestionIdx}
                      custom={slideDirection}
                      variants={{
                        enter: (dir) => ({
                          x: dir === 'right' ? 300 : dir === 'left' ? -300 : 0,
                          opacity: 0
                        }),
                        center: {
                          x: 0,
                          opacity: 1
                        },
                        exit: (dir) => ({
                          x: dir === 'right' ? -300 : dir === 'left' ? 300 : 0,
                          opacity: 0
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      drag={selectedRecMode === 'reccite' ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info) => {
                        if (selectedRecMode !== 'reccite') return;
                        const threshold = 50;
                        if (info.offset.x < -threshold) {
                          if (currentQuestionIdx < practiceDecks.length - 1) {
                            handleNextQuestion();
                          }
                        } else if (info.offset.x > threshold) {
                          if (currentQuestionIdx > 0) {
                            handlePrevQuestion();
                          }
                        }
                      }}
                      className={`flex flex-col w-full gap-0 ${selectedRecMode === 'reccite' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                      <div className={`flex flex-col p-6 rounded-[32px] bg-white border border-stone-200/35 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden select-none w-full min-h-[190px] justify-between ${selectedRecMode === 'exam' ? 'cursor-default' : ''}`}>
                      {/* Top accent line */}
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#2d6a4f]/30 to-[#52b788]/20"></div>
                      
                      {/* Favorite Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                          onClick={() => toggleFavorite(practiceDecks[currentQuestionIdx])}
                          className={`p-2 rounded-full cursor-pointer transition-all active:scale-95
                            ${favorites.some(f => f.id === practiceDecks[currentQuestionIdx].id) ? "bg-rose-50 text-rose-500 scale-105" : "bg-stone-50 hover:bg-stone-100/80 text-stone-300"}
                          `}
                          title="收藏本题"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {/* Question Content */}
                      <div className="flex flex-col text-left">
                        {selectedRecMode === 'exam' ? (
                          <div className="flex items-start gap-3 mt-1 select-none">
                            <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200/50 flex items-center justify-center text-stone-300 font-extrabold text-lg shrink-0 mt-0.5">
                              Q
                            </div>
                            <h4 className="text-[15.5px] sm:text-[17px] font-black text-[#1c2e24] leading-relaxed max-h-36 overflow-y-auto pr-1">
                              {practiceDecks[currentQuestionIdx].q}
                            </h4>
                          </div>
                        ) : (
                          <>
                            <span className="text-[#1b4332] text-[12px] font-black tracking-widest block mb-1 opacity-90 uppercase">
                              {practiceDecks[currentQuestionIdx].tag || 
                                (practiceDecks[currentQuestionIdx].type === 'choice' ? "词汇解析" : "学术问答")}
                            </span>
                            
                            {/* Word style or QA style */}
                            {(practiceDecks[currentQuestionIdx].q.length < 20 && !practiceDecks[currentQuestionIdx].q.includes("？") && !practiceDecks[currentQuestionIdx].q.includes("以下")) ? (
                              <div className="flex flex-col gap-1 mt-1">
                                <h4 className="text-[32px] sm:text-[36px] font-black text-[#1c2e24] tracking-tight leading-none">
                                  {practiceDecks[currentQuestionIdx].q}
                                </h4>
                                {(practiceDecks[currentQuestionIdx].phonetic || practiceDecks[currentQuestionIdx].id.includes("serendipity")) && (
                                  <span className="text-[14px] text-stone-400 font-medium italic mt-1 font-sans">
                                    {practiceDecks[currentQuestionIdx].phonetic || "[,serən'dipəti]"}
                                  </span>
                                )}
                                <div className="w-full h-[1px] bg-stone-100/90 my-4"></div>
                                <p className="text-[14.5px] leading-relaxed text-[#1c2e24] font-medium font-sans">
                                  {practiceDecks[currentQuestionIdx].definition || 
                                    "指在寻找某物的过程中，意外地发现或遇到另一种具有积极意义、有价值的事物或现象的机缘巧合。"}
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-2 mt-2">
                                <h4 className="text-[15.5px] sm:text-[17px] font-black text-[#1c2e24] leading-relaxed max-h-36 overflow-y-auto pr-1">
                                  {practiceDecks[currentQuestionIdx].q}
                                </h4>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      </div>

                {/* Format 1: Multi-Choice Options list below card */}
                {practiceDecks[currentQuestionIdx].type === 'choice' && (
                  <div className="flex flex-col gap-2.5 mt-2.5 text-left shrink-0 px-1 py-1">
                    {practiceDecks[currentQuestionIdx].options?.map((opt, oIdx) => {
                      const optChar = opt.charAt(0);
                      const isSelected = selectedOption === optChar;
                      const isCorrectOption = optChar === practiceDecks[currentQuestionIdx].answer;
                      
                      let cardStyle = "bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-700 hover:border-stone-300";
                      let badgeIcon = (
                        <div className="w-[22px] h-[22px] rounded-full border border-stone-300 flex items-center justify-center shrink-0">
                          {/* hollow */}
                        </div>
                      );

                      if (selectedRecMode === 'exam') {
                        // Exam Mode styling
                        if (isSelected) {
                          cardStyle = "border-[#112d21] border-[1.5px] bg-[#f4f6f4] text-[#112d21] font-semibold scale-[1.01]";
                          badgeIcon = (
                            <div className="w-[20px] h-[20px] rounded-full bg-[#112d21] text-white flex items-center justify-center shrink-0 shadow-sm">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          );
                        } else {
                          cardStyle = "bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-700 hover:border-stone-300";
                          badgeIcon = (
                            <div className="w-[19px] h-[19px] rounded-full border border-stone-300 flex items-center justify-center shrink-0">
                              {/* hollow circle */}
                            </div>
                          );
                        }
                      } else if (selectedRecMode === 'reccite') {
                        // Recite mode: correct option is pre-highlighted in green
                        if (isCorrectOption) {
                          cardStyle = "border-[#1b4332] border-[1.5px] bg-[#f4f7f4] text-[#1b4332] font-semibold scale-[1.01] shadow-xs";
                          badgeIcon = (
                            <div className="w-[22px] h-[22px] rounded-full bg-[#133024] text-white flex items-center justify-center shrink-0 shadow-sm">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          );
                        } else {
                          cardStyle = "bg-white border border-stone-200 text-stone-400/80 opacity-70";
                        }
                      } else {
                        // Practice mode: interactive
                        if (hasCheckedAnswer) {
                          if (isCorrectOption) {
                            cardStyle = "border-[#1b4332] border-[1.5px] bg-[#f4f7f4] text-[#1b4332] font-semibold";
                            badgeIcon = (
                              <div className="w-[22px] h-[22px] rounded-full bg-[#133024] text-white flex items-center justify-center shrink-0 shadow-sm">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            );
                          } else if (isSelected) {
                            cardStyle = "border-rose-400 border-[1.5px] bg-rose-50 text-rose-800 font-semibold";
                            badgeIcon = (
                              <div className="w-[22px] h-[22px] rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                <X className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            );
                          } else {
                            cardStyle = "bg-white border border-stone-100 text-stone-400 opacity-50";
                          }
                        } else if (isSelected) {
                          cardStyle = "border-[#1b4332] border-[1.5px] bg-[#f4f7f4] text-[#1b4332] font-semibold scale-[1.01]";
                          badgeIcon = (
                            <div className="w-[22px] h-[22px] rounded-full bg-[#133024] text-white flex items-center justify-center shrink-0 shadow-sm">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          );
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={selectedRecMode === 'reccite'}
                          onClick={() => handleChoiceSelect(opt)}
                          className={`px-6 py-4 rounded-[24px] text-[14px] text-left cursor-pointer transition-all duration-300 flex items-center justify-between gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.012)] ${cardStyle}`}
                        >
                          <span className="leading-snug shrink-1">{opt}</span>
                          {badgeIcon}
                        </button>
                      );
                    })}

                    {/* Action buttons area */}
                    {selectedRecMode === 'exam' ? null : selectedRecMode === 'reccite' ? (
                      <div className="flex flex-col gap-2 mt-4 shrink-0">
                        {currentQuestionIdx < practiceDecks.length - 1 ? (
                          <div className="flex gap-2">
                            <button
                              onClick={handleNextQuestion}
                              className="flex-1 py-4 bg-[#1b4332] hover:bg-[#133024] text-white font-extrabold text-xs rounded-[22px] cursor-pointer shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
                            >
                              <span>下一题</span>
                              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPracticeComplete(true)}
                            className="w-full py-4 bg-[#1b4332] hover:bg-[#133024] text-white font-black text-xs rounded-[22px] cursor-pointer shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
                          >
                            <span>完成本次背题会话</span>
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4 shrink-0">
                        {hasCheckedAnswer && (
                          <button
                            onClick={handleNextQuestion}
                            className="w-full py-4 bg-[#1b4332] hover:bg-[#133024] text-white font-black text-xs rounded-[22px] cursor-pointer shadow-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>{currentQuestionIdx < practiceDecks.length - 1 ? "下一题" : "完成并查看报告"}</span>
                            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Format 2: QA Memory Card Style */}
                {practiceDecks[currentQuestionIdx].type === 'qa' && (
                  <div className="flex flex-col gap-2.5 mt-2 text-left shrink-0">
                    <AnimatePresence mode="wait">
                      {!isQAFlipped ? (
                        <motion.div
                          key="unflipped"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="bg-white border border-dashed border-stone-300 p-8 rounded-[24px] flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors"
                          onClick={() => setIsQAFlipped(true)}
                        >
                          <Sparkles className="w-6 h-6 text-[#1b4332]/50 mb-2 animate-pulse" />
                          <span className="text-xs font-bold text-[#1b4332] hover:underline">点击卡片展开参考释义与答案</span>
                          <span className="text-[10px] text-stone-400 mt-1 font-semibold">自评记忆状况，即可评分并推进下一题</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="flipped"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col gap-3.5 bg-[#fafffb] border border-[#1b4332]/20 p-5 rounded-[24px] text-left"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-[#1b4332] uppercase tracking-wider">核心参考解释</span>
                            <p className="text-[13px] leading-relaxed font-bold text-stone-800 max-h-24 overflow-y-auto pr-1">
                              {practiceDecks[currentQuestionIdx].a}
                            </p>
                          </div>

                          {practiceDecks[currentQuestionIdx].explanation && (
                            <div className="p-3 bg-stone-50 rounded-xl text-[11px] leading-relaxed border border-stone-200/50 text-stone-500 max-h-20 overflow-y-auto">
                              <strong className="text-[#1b4332] block mb-0.5">深度提问解析：</strong>
                              {practiceDecks[currentQuestionIdx].explanation}
                            </div>
                          )}

                          {/* Self grade actions */}
                          <div className="flex flex-row gap-2 mt-1 shrink-0">
                            <button
                              onClick={() => handleSelfGrade('unfamiliar')}
                              className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-[#b23838] border border-red-200 font-extrabold text-xs rounded-xl cursor-pointer text-center transition-colors"
                            >
                              生疏 (加深)
                            </button>
                            <button
                              onClick={() => handleSelfGrade('hesitant')}
                              className="flex-1 py-3 bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200 font-extrabold text-xs rounded-xl cursor-pointer text-center transition-colors"
                            >
                              模糊 (犹豫)
                            </button>
                            <button
                              onClick={() => handleSelfGrade('mastered')}
                              className="flex-1 py-3 bg-[#1b4332] hover:bg-[#133024] text-white font-extrabold text-xs rounded-xl cursor-pointer text-center transition-colors"
                            >
                              熟记 (掌握)
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Explanation Card for Choice answers */}
                {selectedRecMode === 'practice' && hasCheckedAnswer && showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-[22px] bg-stone-50 border border-stone-200/55 text-[12px] leading-normal shrink-0"
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1.5">
                      {isCorrect ? (
                        <span className="w-5 h-5 rounded-full bg-[#1b4332]/15 text-[#1b4332] flex items-center justify-center text-[10px]">✓</span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-[10px]">✗</span>
                      )}
                      <span className={isCorrect ? "text-[#1b4332] font-extrabold" : "text-rose-600 font-extrabold"}>
                        {isCorrect ? "答对了！理解通透！" : "答错了，该问题会自动纳入您专属的错题本中。"}
                      </span>
                    </div>
                    <p className="text-stone-500 font-medium leading-relaxed max-h-20 overflow-y-auto pr-1">
                      <strong>本题重点解析：</strong>
                      {practiceDecks[currentQuestionIdx].explanation || "本词是高频基础大纲考察词，在阅读例句中建立语感关联记忆更安全。"}
                    </p>
                  </motion.div>
                )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Horizontal Switch Button Controls */}
                {selectedRecMode === 'exam' ? (
                  <div className="flex justify-center items-center gap-3 mt-6 mb-3 shrink-0 font-sans px-2">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIdx === 0}
                      className="flex-1 max-w-[180px] h-[48px] bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-extrabold text-[14px] rounded-full shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 font-sans"
                    >
                      <span>上一题</span>
                    </button>

                    {currentQuestionIdx === practiceDecks.length - 1 ? (
                      <button
                        onClick={submitExamEarly}
                        className="flex-1 max-w-[180px] h-[48px] bg-[#112d21] hover:bg-[#1a382b] text-white font-extrabold text-[14px] rounded-full shadow-md cursor-pointer transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 font-sans"
                      >
                        <span>交卷</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="flex-1 max-w-[180px] h-[48px] bg-[#112d21] hover:bg-[#1a382b] text-white font-extrabold text-[14px] rounded-full shadow-md cursor-pointer transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 font-sans"
                      >
                        <span>下一题</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-4 mt-2 mb-1 shrink-0 font-sans">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIdx === 0}
                      className="flex items-center gap-1 px-3 py-2 hover:bg-stone-100/50 rounded-xl text-xs font-bold text-stone-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>上一题</span>
                    </button>
                    
                    <div className="text-[9px] font-black text-stone-300 uppercase tracking-widest hidden sm:block">
                      ↔ 左右滑动卡片也可以切换 ↔
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIdx === practiceDecks.length - 1}
                      className="flex items-center gap-1 px-3 py-2 hover:bg-stone-100/50 rounded-xl text-xs font-bold text-stone-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      <span>下一题</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : selectedRecMode === 'exam' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-[36px] bg-white border border-stone-200/55 flex flex-col my-4 gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] text-left select-none max-h-[85vh] overflow-y-auto"
              >
                {/* Header Badge */}
                <div className="flex justify-between items-center bg-stone-50 border border-stone-200/30 p-4 rounded-2xl">
                  <div>
                    <h4 className="text-xl font-black text-[#1b4332] tracking-tight">模拟考试报告</h4>
                    <p className="text-[11.5px] text-stone-400 font-extrabold mt-0.5">全真模拟测验 完满提交</p>
                  </div>
                  <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-black text-sm text-white ${Math.round((correctCountInSession / practiceDecks.length) * 100) >= 60 ? "bg-emerald-600 shadow-sm" : "bg-rose-500 shadow-sm"}`}>
                    <span className="text-[17px] leading-none mb-0.5 font-mono">{Math.round((correctCountInSession / practiceDecks.length) * 100)}</span>
                    <span className="text-[9px] font-bold opacity-80 leading-none">分</span>
                  </div>
                </div>

                {/* Score and stats list */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-stone-50/50 hover:bg-stone-50 border border-stone-200/40 p-3.5 rounded-2xl flex flex-col transition-colors">
                    <span className="text-[10px] text-stone-400 font-bold mb-1">测试总量</span>
                    <span className="text-xl font-black text-stone-800 font-mono">{practiceDecks.length} <span className="text-xs font-bold text-stone-400">题</span></span>
                  </div>
                  <div className="bg-[#f2faf5] hover:bg-[#ebf7ef] border border-emerald-100/60 p-3.5 rounded-2xl flex flex-col transition-colors">
                    <span className="text-[10px] text-stone-400 font-bold mb-1">答对题量</span>
                    <span className="text-xl font-black text-emerald-700 font-mono">{correctCountInSession} <span className="text-xs font-bold text-emerald-500">题</span></span>
                  </div>
                  <div className="bg-[#fdf3f3] hover:bg-[#fcebeb] border border-rose-100/60 p-3.5 rounded-2xl flex flex-col transition-colors">
                    <span className="text-[10px] text-stone-400 font-bold mb-1">答错数量</span>
                    <span className="text-xl font-black text-rose-600 font-mono">{practiceDecks.length - correctCountInSession} <span className="text-xs font-bold text-[#b45d5d]">题</span></span>
                  </div>
                </div>

                <div className="bg-stone-50/70 border border-stone-200/40 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-black text-stone-700">测验耗时:</span>
                    <span className="text-xs font-extrabold text-stone-500">
                      {(() => {
                        const elapsed = 3600 - examTimeRemaining;
                        if (elapsed < 60) return `${elapsed}秒`;
                        const m = Math.floor(elapsed / 60);
                        const s = elapsed % 60;
                        return `${m}分${s}秒`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-black text-stone-700">答题率:</span>
                    <span className="text-xs font-extrabold text-[#1b4332] font-mono">
                      {Math.round((Object.keys(examAnswers).length / practiceDecks.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* List of wrong questions for instant revision */}
                {practiceDecks.filter(q => examAnswers[q.id] !== q.answer).length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider pl-1 font-sans">答错题目及正解回顾:</span>
                    <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
                      {practiceDecks.filter(q => examAnswers[q.id] !== q.answer).map((item, wNo) => (
                        <div key={item.id} className="p-3.5 bg-white border border-stone-200/50 rounded-xl leading-relaxed text-[12px] flex flex-col gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
                          <p className="font-extrabold text-stone-850">
                            <span className="text-rose-500 font-mono mr-1">[{wNo+1}]</span> {item.q}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 pl-1 text-[11px] font-bold">
                            <span className="text-rose-500">您的答案: {examAnswers[item.id] || "未作答"}</span>
                            <span className="text-emerald-600">正确参考: {item.answer || item.a}</span>
                          </div>
                          {item.explanation && (
                            <p className="text-[10px] text-stone-400 border-t border-dashed border-stone-105 mt-1 pt-1 font-medium font-sans leading-normal">
                              解析：{item.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => {
                      // Restart this exam
                      startPractice(practiceDecks, 'exam');
                    }}
                    className="flex-1 py-3.5 border border-stone-300 hover:bg-stone-50 text-stone-700 font-black rounded-2xl text-[12px] transition-all active:scale-[0.98] cursor-pointer text-center"
                  >
                    重新考试
                  </button>
                  <button
                    onClick={() => setCurrView('home')}
                    className="flex-1 py-3.5 bg-[#1b4332] hover:bg-[#133024] text-white font-black rounded-2xl text-[12px] shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center"
                  >
                    返回主页
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[36px] bg-white border border-stone-200/55 flex flex-col items-center justify-center count-wrapper text-center my-6 gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
              >
                <div className="w-16 h-16 rounded-full bg-[#1b4332]/10 text-[#1b4332] flex items-center justify-center text-2xl font-black animate-bounce relative">
                  ✓
                </div>
                
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-black text-[#1b4332]">
                    此会话内容已通关！
                  </h4>
                  <p className="text-xs text-stone-400 font-medium font-sans">
                    您在本次学习会话中，共复习并攻克了 {practiceDecks.length} 道问题
                  </p>
                </div>

                <div className="w-full h-[1px] bg-stone-100 max-w-sm"></div>

                <div className="flex gap-12 mt-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black font-mono text-[#1b4332]">
                      {selectedRecMode === 'reccite' ? practiceDecks.length : correctCountInSession}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold mt-1 uppercase tracking-wider">
                      {selectedRecMode === 'reccite' ? "自评熟记" : "答对题目"}
                    </span>
                  </div>
                  {selectedRecMode === 'practice' && (
                    <div className="flex flex-col">
                      <span className="text-2xl font-black font-mono text-rose-500">
                        {practiceDecks.length - correctCountInSession}
                      </span>
                      <span className="text-[10px] text-stone-400 font-bold mt-1 uppercase tracking-wider">归入错题</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setCurrView('home')}
                  className="mt-4 px-8 py-3.5 bg-[#1b4332] hover:bg-[#133024] text-white font-black rounded-2xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  继续其他练习
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 6. INCORRECT BOOK VIEW */}
        {currView === 'incorrect' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col text-left px-1 select-none"
          >
            {/* Header section with App Logo and title */}
            <div className="relative flex items-center justify-center w-full mb-6">
              <button
                onClick={() => setCurrView('home')}
                className="absolute left-0 w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#2D3B32] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="text-[17px] font-black text-[#1b4332] tracking-tight">错题本</span>
            </div>

            {/* Custom Screen Title & Description */}
            <div className="flex flex-col items-center justify-center text-center gap-1.5 mb-8">
              <p className="text-[14px] text-stone-500 font-medium text-center">复习你的错题，将它们转化为掌握。</p>
            </div>

            {/* Two Stats Tiles */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex flex-col items-center justify-center text-center min-h-[140px]">
                <span className="text-[13px] font-extrabold text-stone-400">待复习</span>
                <span className="text-[48px] font-black text-[#C1272D] leading-none mt-3">
                  {incorrectBook.length + (incorrectBook.some(q => q.id.startsWith("err-")) ? 21 : 0)}
                </span>
              </div>
              <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex flex-col items-center justify-center text-center min-h-[140px]">
                <span className="text-[13px] font-extrabold text-stone-400">已掌握</span>
                <span className="text-[48px] font-black text-[#1b4332] leading-none mt-3">
                  {156 + masteredQuestionsCount}
                </span>
              </div>
            </div>

            {incorrectBook.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Retry All button */}
                <button
                  onClick={() => startPractice(incorrectBook, 'practice')}
                  className="w-full py-4 rounded-full bg-[#254235] hover:bg-[#1a3026] text-white font-extrabold text-[15px] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  开启部分错题大挑战 (Retry All)
                </button>

                {/* Incorrect Cards List */}
                <div className="flex flex-col gap-5">
                  {incorrectBook.map((item, idx) => {
                    const cat = getCategoryDetails(item, decks);
                    return (
                      <div
                        key={item.id}
                        className={`p-6 bg-white rounded-[28px] border border-stone-200/30 shadow-[0_4px_24px_rgba(0,0,0,0.015)] border-l-[6px] ${cat.bar} flex flex-col gap-4 relative transition-all duration-305`}
                      >
                        {/* Top rows */}
                        <div className="flex items-center justify-between w-full">
                          <div className={`px-3 py-1 rounded-full ${cat.bg} flex items-center gap-1.5 text-[12px] font-extrabold`}>
                            {cat.icon}
                            <span>{cat.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-stone-400 text-[12px] font-semibold">
                            <Calendar className="w-3.5 h-3.5 shrink-0 text-stone-300" />
                            <span>{item.date || "10月24日"}</span>
                          </div>
                        </div>

                        {/* Heading & description */}
                        <div className="flex flex-col gap-2">
                          <h4 className="text-[18px] font-black text-stone-900 tracking-tight leading-snug">
                            {item.q}
                          </h4>
                          <p className="text-[13.5px] text-stone-500 font-medium leading-relaxed">
                            {item.errorNote || item.explanation || "未掌握该题目的核心考点，建议进入专项复习。"}
                          </p>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-end gap-2.5 mt-1 border-t border-stone-100/60 pt-4">
                          <button
                            onClick={() => {
                              setIncorrectBook(prev => prev.filter(i => i.id !== item.id));
                            }}
                            className="text-[12.5px] font-extrabold text-stone-400 hover:text-[#C1272D] transition-colors px-4 py-2 rounded-full border border-stone-200/50 hover:border-rose-100 cursor-pointer"
                          >
                            移出错题本
                          </button>
                          <button
                            onClick={() => startPractice([item], 'practice')}
                            className="bg-[#2D4A3E] hover:bg-[#1D352B] text-white font-extrabold text-[12.5px] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            <span>去复习</span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-16 text-center rounded-[32px] bg-white border border-dashed border-stone-200/50 text-stone-400 leading-relaxed flex flex-col items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Check className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[15px] font-extrabold text-stone-800">错题本已全部清空！</span>
                  <span className="text-[12.5px] text-stone-400 font-medium pb-2">目前太棒了，您的错题本完全是空的。继续保持无错刷题吧。</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 7. FAVORITES VIEW */}
        {currView === 'favorites' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col text-left px-1 select-none"
          >
            {/* Header section with App Logo and back action */}
            <div className="relative flex items-center justify-center w-full mb-6">
              <button
                onClick={() => setCurrView('home')}
                className="absolute left-0 w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#2D3B32] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="text-[17px] font-black text-[#1b4332] tracking-tight">收藏夹</span>
            </div>

            {/* Custom Screen Title & Description */}
            <div className="flex flex-col items-center justify-center text-center gap-1.5 mb-8">
              <p className="text-[14px] text-stone-500 font-medium text-center">收藏核心关键知识卡片，加温印象记忆。</p>
            </div>

            {/* Two Stats Tiles */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex flex-col items-center justify-center text-center min-h-[140px]">
                <span className="text-[13px] font-extrabold text-stone-400">已收藏卡片</span>
                <span className="text-[48px] font-black text-[#D84B4B] leading-none mt-3">
                  {favorites.length}
                </span>
              </div>
              <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex flex-col items-center justify-center text-center min-h-[140px]">
                <span className="text-[13px] font-extrabold text-stone-400 font-sans">温习频率</span>
                <span className="text-[38px] font-black text-[#1b4332] leading-none mt-4 font-sans">
                  艾宾浩斯
                </span>
              </div>
            </div>

            {favorites.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Review Bookmarked Cards Session */}
                <button
                  onClick={() => startPractice(favorites, 'practice')}
                  className="w-full py-4 rounded-full bg-[#254235] hover:bg-[#1a3026] text-white font-extrabold text-[15px] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开启收藏温习会话 (Review Favorites)
                </button>

                {/* Favorites Card List */}
                <div className="flex flex-col gap-5">
                  {favorites.map((item, idx) => {
                    const cat = getCategoryDetails(item, decks);
                    return (
                      <div
                        key={item.id}
                        className={`p-6 bg-white rounded-[28px] border border-stone-200/30 shadow-[0_4px_24px_rgba(0,0,0,0.015)] border-l-[6px] ${cat.bar} flex flex-col gap-4 relative transition-all duration-300`}
                      >
                        {/* Top row */}
                        <div className="flex items-center justify-between w-full">
                          <div className={`px-3 py-1 rounded-full ${cat.bg} flex items-center gap-1.5 text-[12px] font-extrabold`}>
                            {cat.icon}
                            <span>{cat.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-stone-400 text-[12px] font-semibold">
                            <Calendar className="w-3.5 h-3.5 shrink-0 text-stone-300" />
                            <span>{item.date || "10月23日"}</span>
                          </div>
                        </div>

                        {/* Question and answer info */}
                        <div className="flex flex-col gap-3">
                          <h4 className="text-[18px] font-black text-stone-900 tracking-tight leading-snug">
                            {item.q}
                          </h4>
                          
                          <div className="p-4 bg-stone-50/70 border border-stone-100 rounded-2xl text-[13px] text-stone-600 font-medium leading-relaxed">
                            <strong className="text-[#1b4332] block mb-1 font-extrabold">参考重点：</strong>
                            {item.type === 'qa' ? item.a : `[单选题] 答案为 ${item.answer}`}
                          </div>

                          {(item.errorNote || item.explanation) && (
                            <p className="text-[12.5px] text-stone-400 font-semibold leading-relaxed pl-1">
                              <strong>温故知新：</strong>
                              {item.errorNote || item.explanation}
                            </p>
                          )}
                        </div>

                        {/* Actions row */}
                        <div className="flex items-center justify-end gap-2.5 mt-1 border-t border-stone-100/60 pt-4">
                          <button
                            onClick={() => toggleFavorite(item)}
                            className="text-[12.5px] font-extrabold text-stone-400 hover:text-[#C1272D] transition-colors px-4 py-2 rounded-full border border-stone-200/50 hover:border-rose-100 cursor-pointer"
                          >
                            取消收藏
                          </button>
                          <button
                            onClick={() => startPractice([item], 'practice')}
                            className="bg-[#2D4A3E] hover:bg-[#1D352B] text-white font-extrabold text-[12.5px] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            <span>温习巩固</span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-16 text-center rounded-[32px] bg-white border border-dashed border-stone-200/50 text-stone-400 leading-relaxed flex flex-col items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-[#D84B4B]">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[15px] font-extrabold text-stone-800">您的收藏夹目前是空的</span>
                  <span className="text-[12.5px] text-stone-400 font-medium pb-2">在复习刷题过程中，您可以随时点击右上角 ❤️ 按钮将高频考点加入此收藏夹。</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 8. STUDY STATS VIEW */}
        {currView === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col text-left px-1 select-none"
          >
            {/* Header section with Centered Title & Share Button */}
            <div className="relative flex items-center justify-between w-full mb-6">
              <button
                onClick={() => setCurrView('home')}
                className="w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#2D3B32] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <span className="text-[17px] font-black text-[#1b4332] tracking-tight">学习统计</span>

              <button
                onClick={() => {
                  alert("统计报告链接已复制到剪贴板！快去给身边的同学展示你今天的复习成果吧 🚀");
                }}
                className="w-[42px] h-[42px] flex items-center justify-center bg-white rounded-full text-[#2D3B32] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="分享报告"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
              </button>
            </div>

            {/* Title Section */}
            <div className="flex flex-col gap-0.5 mb-6">
              <h3 className="text-[22px] font-black text-[#1b4332] tracking-tight">核心数据概览</h3>
            </div>

            {/* Core Stats Bento Layout */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Row 1: 2 half-width cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex flex-col items-start justify-between min-h-[145px] hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[13px] font-extrabold text-stone-400">连续打卡天数</span>
                    <div className="w-[32px] h-[32px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-[42px] font-black text-stone-900 leading-none">14</span>
                    <span className="text-[14px] font-bold text-stone-500">天</span>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex flex-col items-start justify-between min-h-[145px] hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[13px] font-extrabold text-stone-400">累计学习时长</span>
                    <div className="w-[32px] h-[32px] rounded-full bg-stone-150 text-stone-500 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-[42px] font-black text-stone-900 leading-none">32</span>
                    <span className="text-[14px] font-bold text-stone-500">小时</span>
                  </div>
                </div>
              </div>

              {/* Row 2: 1 full-width card */}
              <div className="bg-white rounded-[28px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-6 flex items-center justify-between min-h-[110px] hover:shadow-sm transition-all duration-300">
                <div className="flex flex-col">
                  <span className="text-[13px] font-extrabold text-stone-400">已掌握题目数</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-[44px] font-black text-stone-900 leading-none">
                      {450 + masteredQuestionsCount}
                    </span>
                    <span className="text-[14px] font-bold text-stone-500">题</span>
                  </div>
                </div>
                <div className="w-[48px] h-[48px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Custom SVG Learning Curve Curve Chart */}
            <div className="bg-white rounded-[32px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-7 flex flex-col gap-4 mb-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between w-full">
                <h4 className="text-[18px] font-black text-stone-900 tracking-tight">学习曲线图表</h4>
                <div className="px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-600 text-[12px] font-extrabold flex items-center gap-1 cursor-pointer">
                  <span>近7天</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <p className="text-[13.5px] text-stone-400 font-medium leading-relaxed mb-2">
                基于艾宾浩斯遗忘曲线，展示过去一周每日复习题目数量及效果预测。
              </p>

              {/* Graphical Canvas Area */}
              <div className="relative w-full h-[200px] mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 540 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="540" y2="40" stroke="#f1eee7" strokeWidth="1" strokeDasharray="3,4" />
                  <line x1="0" y1="90" x2="540" y2="90" stroke="#f1eee7" strokeWidth="1" strokeDasharray="3,4" />
                  <line x1="0" y1="140" x2="540" y2="140" stroke="#f1eee7" strokeWidth="1" strokeDasharray="3,4" />
                  
                  {/* Connecting Line paths */}
                  <path
                    d="M 40 142 C 75 120, 75 102, 110 102 C 145 102, 145 170, 180 172 C 215 174, 215 82, 250 82 C 285 82, 285 124, 320 125 C 355 126, 355 92, 390 92 C 425 92, 425 50, 460 52"
                    fill="none"
                    stroke="#2D4A3E"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Pulsing Dot Highlights */}
                  {[
                    { x: 40, y: 142, value: 8 },
                    { x: 110, y: 102, value: 12 },
                    { x: 180, y: 172, value: 5 },
                    { x: 250, y: 82, value: 16 },
                    { x: 320, y: 125, value: 10 },
                    { x: 390, y: 92, value: 13 },
                    { x: 460, y: 52, value: 20 },
                  ].map((pt, index) => (
                    <g key={index} className="group cursor-pointer">
                      {/* Ambient green outer hover glow */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="18"
                        fill="#2D4A3E"
                        fillOpacity="0.08"
                        className="transition-all duration-300 transform scale-100 group-hover:scale-130"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="10"
                        fill="#2D4A3E"
                        fillOpacity="0.18"
                      />
                      {/* Hard Solid Dot center */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="5"
                        fill="#2D4A3E"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      {/* Active count badge tooltip style indicator */}
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <rect x={pt.x - 18} y={pt.y - 32} width="36" height="18" rx="4" fill="#1b4332" />
                        <text x={pt.x} y={pt.y - 20} fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          {pt.value}
                        </text>
                      </g>
                    </g>
                  ))}
                </svg>

                {/* Weekday indicator labels below SVG */}
                <div className="absolute left-0 right-0 bottom-[-24px] flex items-center justify-between text-[13.5px] text-stone-400 font-bold px-[25px]">
                  <span>一</span>
                  <span>二</span>
                  <span>三</span>
                  <span>四</span>
                  <span>五</span>
                  <span>六</span>
                  <span>日</span>
                </div>
              </div>
            </div>

            {/* NEW ADDITION: Subject Distribution Rings/Doughnut Chart (环形图) */}
            <div className="bg-white rounded-[32px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-7 flex flex-col gap-5 mt-6 mb-6 hover:shadow-md transition-all">
              <h4 className="text-[18px] font-black text-stone-900 tracking-tight">知识分布环形图</h4>
              
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                {/* SVG Ring structure */}
                <div className="relative w-[150px] h-[150px] shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Ring Base */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f4f3f0" strokeWidth="12" />
                    
                    {/* Mathematics ring (45%): starts at 0, length 45% of 251.2 = 113 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#1b4332"
                      strokeWidth="12"
                      strokeDasharray="113 251.2"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />

                    {/* English ring (35%): starts at 45% (offset -113), length 35% of 251.2 = 88 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#b2c89d"
                      strokeWidth="12"
                      strokeDasharray="88 251.2"
                      strokeDashoffset="-113"
                      strokeLinecap="round"
                    />

                    {/* Physics ring (20%): starts at 80% (offset -201), length 20% of 251.2 = 50 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#d1cdc4"
                      strokeWidth="12"
                      strokeDasharray="50 251.2"
                      strokeDashoffset="-201"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Centered overall count tag */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[25px] font-black text-stone-900 leading-none">
                      {totalQuestionsInReview}
                    </span>
                    <span className="text-[10px] text-stone-400 font-extrabold mt-1">总卡片数</span>
                  </div>
                </div>

                {/* Color Legends with customizable tags */}
                <div className="flex flex-col gap-3 font-sans w-full max-w-[200px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1b4332]" />
                      <span className="text-[14px] font-extrabold text-[#1b4332]">数学学科</span>
                    </div>
                    <span className="text-[13.5px] font-bold text-stone-500">45%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#b2c89d]" />
                      <span className="text-[14px] font-extrabold text-stone-600">英语词汇</span>
                    </div>
                    <span className="text-[13.5px] font-bold text-stone-500">35%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#d1cdc4]" />
                      <span className="text-[14px] font-extrabold text-stone-600">物理基础</span>
                    </div>
                    <span className="text-[13.5px] font-bold text-stone-500">20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Mastery Details with smooth visual bar outlines */}
            <div className="bg-white rounded-[32px] border border-stone-200/40 shadow-[0_4px_24px_rgba(0,0,0,0.015)] p-7 flex flex-col gap-6 mb-6 hover:shadow-md transition-all">
              <h4 className="text-[18px] font-black text-stone-900 tracking-tight">学科掌握情况</h4>
              
              <div className="flex flex-col gap-5">
                {/* Mathematics Row */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[14px] font-extrabold text-stone-800">
                    <span>数学</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1b4332] rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* English Row */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[14px] font-extrabold text-[#748e5b]">
                    <span>英语</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#b2c89d] rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Physics Row */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[14px] font-extrabold text-stone-500">
                    <span>物理</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c0c0b8] rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions recommendation Section with bulb icon */}
            <div className="bg-[#f4f7f4] rounded-[32px] border border-[#e3ebe3] p-7 flex flex-col gap-5 hover:shadow-sm transition-all mb-8 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1b4332] text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 12.5 2.5a5.5 5.5 0 0 0-5.5 5.5c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6M10 22h4" />
                  </svg>
                </div>
                <h4 className="text-[17px] font-black text-[#1b4332]">复习建议</h4>
              </div>

              <p className="text-[14px] text-[#2d4a3e] font-semibold leading-relaxed">
                你的数学掌握情况良好，继续保持。但物理学科遗忘率较高，建议今晚优先复习物理错题集，以加固记忆链接。
              </p>

              {/* Action Jump to start reviewing physics */}
              <button
                onClick={() => {
                  const phyDeck = decks.find(d => d.id === 'deck-phy' || d.name.includes("物"));
                  const phyQuestions = phyDeck ? phyDeck.questions : decks.flatMap(d => d.questions).filter(q => q.category === '物理' || q.id.startsWith('phy-') || q.q.includes('物'));
                  if (phyQuestions && phyQuestions.length > 0) {
                    startPractice(phyQuestions);
                  } else {
                    alert("暂无可复习的物理卡片，先导入些试题试试吧！ ✨");
                  }
                }}
                className="self-start px-6 py-3.5 bg-[#1b4332] hover:bg-[#133024] text-white text-[14px] font-black rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                开始复习物理
              </button>

              {/* Background elegant star outlines */}
              <div className="absolute right-[-10px] bottom-[-10px] pointer-events-none opacity-10 text-[#1b4332]">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            onClick={() => setConfirmDialog(null)}
            className="absolute inset-0 bg-stone-900 backdrop-blur-xs"
          />
          
          {/* Card Content with spring entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-[340px] bg-white rounded-[28px] border border-stone-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-6 text-left select-none overflow-hidden z-50"
          >
            {/* Decorative accent lines */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#1b4332]" />
            
            <h4 className="text-[17px] font-black text-[#1b4332] tracking-tight mb-2 font-sans">
              {confirmDialog.title}
            </h4>
            <p className="text-[13px] leading-relaxed text-stone-500 font-medium mb-6 font-sans">
              {confirmDialog.message}
            </p>
            
            <div className="flex gap-2.5">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold rounded-2xl text-[12.5px] transition-all cursor-pointer text-center font-sans active:scale-[0.98]"
              >
                {confirmDialog.cancelText}
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="flex-1 py-3 bg-[#1b4332] hover:bg-[#133024] text-white font-black rounded-2xl text-[12.5px] shadow-sm transition-all cursor-pointer text-center font-sans active:scale-[0.98]"
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </ToolScreen>
  );
}

export function AccountingTool({ onClose }: { onClose: () => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [records, setRecords] = useState([
    { id: "1", title: "咖啡", amount: 32.00, type: "expense", date: "今天 09:41", icon: "☕" },
    { id: "2", title: "晚饭", amount: 58.00, type: "expense", date: "昨天 19:22", icon: "🍱" },
    { id: "3", title: "交通", amount: 12.00, type: "expense", date: "昨天 08:30", icon: "🚇" },
  ]);

  const totalExpense = records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalIncome = records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const budget = 2000;
  const balance = budget - totalExpense + totalIncome;

  const expenseChips = [
    { label: "咖啡", icon: "☕" },
    { label: "工作餐饮", icon: "🍱" },
    { label: "通勤交通", icon: "🚇" },
    { label: "日用百货", icon: "🛍️" },
    { label: "娱乐消费", icon: "🎮" },
    { label: "房租水电", icon: "🏠" },
  ];

  const incomeChips = [
    { label: "正职薪资", icon: "💰" },
    { label: "兼职外快", icon: "🎒" },
    { label: "手气红包", icon: "🧧" },
    { label: "投资收益", icon: "📈" },
  ];

  const activeChips = type === "expense" ? expenseChips : incomeChips;

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("请输入正确的有效金额。");
      return;
    }

    const name = title.trim() || (type === "expense" ? "日常支出" : "额外收入");
    
    // Find matching custom chip for default icon
    let icon = "💵";
    const foundChip = activeChips.find(c => c.label === name);
    if (foundChip) {
      icon = foundChip.icon;
    } else {
      if (type === "expense") {
        if (name.includes("咖") || name.includes("饮")) icon = "☕";
        else if (name.includes("饭") || name.includes("餐") || name.includes("吃")) icon = "🍱";
        else if (name.includes("车") || name.includes("地铁") || name.includes("公交") || name.includes("机")) icon = "🚇";
        else if (name.includes("购") || name.includes("买") || name.includes("衣服")) icon = "🛍️";
      } else {
        if (name.includes("资") || name.includes("打工")) icon = "💰";
        else if (name.includes("包") || name.includes("奖")) icon = "🧧";
      }
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const dateStr = `今天 ${timeStr}`;

    const newRecord = {
      id: Date.now().toString(),
      title: name,
      amount: numericAmount,
      type,
      date: dateStr,
      icon,
    };

    setRecords([newRecord, ...records]);
    setAmount("");
    setTitle("");
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const expensePercentage = Math.min(100, (totalExpense / budget) * 100);
  
  // Dynamic warning color scheme
  let progressBarColor = "from-emerald-400 to-teal-500";
  let budgetTextColor = "text-emerald-500";
  if (expensePercentage > 85) {
    progressBarColor = "from-rose-500 to-red-600 animate-pulse";
    budgetTextColor = "text-rose-500 font-bold";
  } else if (expensePercentage > 60) {
    progressBarColor = "from-amber-400 to-orange-500";
    budgetTextColor = "text-amber-500";
  }

  if (isAdding) {
    return (
      <ToolScreen
        title="添加记账"
        desc="记录每一笔日常开销与额外收益。"
        icon={Wallet}
        bg="bg-primary/20 text-primary"
        onClose={() => setIsAdding(false)}
      >
        <div className="flex flex-col gap-5 max-w-md mx-auto w-full">
          {/* Expense/Income Switch Toggle buttons */}
          <div className="flex p-1.5 bg-surface-container-high/60 border border-outline-variant/15 rounded-full w-max mx-auto shadow-sm">
            <button
              onClick={() => { setType("expense"); setTitle(""); }}
              className={`px-8 py-2 rounded-full text-xs font-black tracking-widest transition-all cursor-pointer ${type === "expense" ? "bg-rose-500 text-white shadow" : "text-on-surface-variant"}`}
            >
              支出
            </button>
            <button
              onClick={() => { setType("income"); setTitle(""); }}
              className={`px-8 py-2 rounded-full text-xs font-black tracking-widest transition-all cursor-pointer ${type === "income" ? "bg-primary text-on-primary shadow" : "text-on-surface-variant"}`}
            >
              收入
            </button>
          </div>

          {/* Amount and title block */}
          <div className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-[32px] shadow-sm flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-outline tracking-wider uppercase">记账金额 (CNY)</span>
              <div className="flex items-center gap-2 border-b-2 border-primary/20 pb-1.5 focus-within:border-primary transition-colors">
                <span className="text-xl font-bold text-on-surface mt-1">¥</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full text-3xl font-black bg-transparent outline-none text-on-surface placeholder:text-outline-variant/50 font-mono"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-outline tracking-wider uppercase">交易描述</span>
              <input
                type="text"
                placeholder="键入描述或选择下方快速标签..."
                className="w-full bg-surface-container-high px-4 py-3 rounded-2xl text-xs font-semibold border border-outline-variant/15 outline-none focus:border-primary text-on-surface placeholder:text-outline-variant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Fast Category tags */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-outline tracking-wider uppercase px-1">常用标签</span>
            <div className="flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setTitle(chip.label)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer hover:bg-surface-container-high active:scale-95
                    ${title === chip.label 
                      ? "bg-primary/10 border-primary text-primary shadow-sm" 
                      : "bg-surface-container-low border-outline-variant/20 text-on-surface-variant"
                    }
                  `}
                >
                  <span className="text-sm">{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 w-full py-4 bg-primary text-on-primary text-xs font-black tracking-widest rounded-full shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            保存账目记录
          </button>
        </div>
      </ToolScreen>
    );
  }

  return (
    <ToolScreen
      title="小筑账本"
      desc="随时记录每一笔花销，了解您的财务健康度。"
      icon={Wallet}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Symmetrical dashboard widget */}
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-[32px] shadow-sm flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Wallet className="w-24 h-24" />
          </div>
          <span className="text-[10px] text-outline font-bold tracking-widest uppercase">本月预算状况 (EXPENSES)</span>
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-3xl font-black text-on-surface">
              ¥ {totalExpense.toFixed(2)}
            </span>
            <span className="text-[10px] font-semibold text-primary">
              / +¥{totalIncome.toFixed(2)} 收入
            </span>
          </div>
          
          <div className="w-full h-2.5 bg-surface-container shadow-inner rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${progressBarColor} rounded-full transition-all duration-500`}
              style={{ width: `${expensePercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-[10px] mt-1.5 font-bold tracking-wide">
            <span className="text-outline uppercase">净余额: <span className={`${balance < 0 ? 'text-rose-500' : 'text-on-surface-variant'}`}>¥{balance.toFixed(2)}</span></span>
            <span className={budgetTextColor}>限额 ¥{budget.toFixed(2)} ({expensePercentage.toFixed(0)}%)</span>
          </div>
        </div>

        {/* List ledger heading */}
        <div className="flex items-center justify-between px-1 mt-2">
          <span className="text-xs font-black text-on-surface-variant tracking-wider uppercase">记账明细 (LEDGER)</span>
          <span className="text-[10px] font-semibold text-outline">
            {records.length} 笔交易
          </span>
        </div>

        {/* Flow list ledger */}
        <div className="flex flex-col gap-2.5">
          {records.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-low border border-outline-variant/20 p-4 rounded-[22px] flex items-center justify-between shadow-sm hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 bg-surface-container-high rounded-2xl flex items-center justify-center text-xl shadow-inner border border-outline-variant/10">
                  {item.icon}
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-xs font-black text-on-surface truncate">
                    {item.title}
                  </span>
                  <span className="text-[9px] text-outline font-semibold tracking-wide uppercase mt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs font-black
                  ${item.type === "expense" ? "text-rose-500" : "text-emerald-500"}
                `}>
                  {item.type === "expense" ? "-" : "+"}¥ {item.amount.toFixed(2)}
                </span>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-outline hover:text-rose-500 hover:bg-rose-500/5 transition-all text-xs cursor-pointer border border-transparent hover:border-rose-500/10"
                  title="删除记录"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {records.length === 0 && (
            <div className="p-10 text-center text-outline/60 text-xs font-semibold leading-relaxed bg-surface-container-low border border-dashed border-outline-variant/30 rounded-[28px] mt-2">
              暂无任何账目，点击右下角“+”发起快速记账。
            </div>
          )}
        </div>
      </div>

      {/* Floating Action quick launcher */}
      <button
        onClick={() => setIsAdding(true)}
        className="fixed bottom-8 right-6 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all cursor-pointer border border-primary-container"
        title="快速记一笔"
      >
        <span className="text-2xl font-light leading-none">+</span>
      </button>
    </ToolScreen>
  );
}

export function MarkdownEditor({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState(
    '# Spring Nest Design System\n\nThe design system embodies a **healing, minimalist, and professional** aesthetic, conceptualized as a "Digital Sanctuary".\n\n## Core Principles\n- Craftsmanship over Defaults\n- Intentional Variation',
  );

  return (
    <ToolScreen
      title="Markdown 编辑"
      desc="纯净的富文本编辑体验。"
      icon={FileText}
      bg="bg-tertiary-container text-on-tertiary-container"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 relative">
        <div className="h-12 bg-surface-container-high border-b border-outline-variant/20 flex items-center px-4 gap-4 overflow-x-auto hide-scrollbar">
          {["B", "I", "H1", "H2", "[]", "</>", "🔗", "🖼️"].map((btn, i) => (
            <button
              key={i}
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              {btn}
            </button>
          ))}
        </div>
        <textarea
          className="flex-1 w-full bg-transparent p-4 outline-none font-mono text-[14px] leading-relaxed resize-none"
          placeholder="# 在此输入标题&#10;&#10;开始你的创作..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </ToolScreen>
  );
}

export function WordToPdfTool({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "converting" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setStatus("converting");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("done");
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  const handleDownload = () => {
    if (!file) return;
    const blob = new Blob(["Spring Nest Mock Converted PDF Content " + file.name], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.[^/.]+$/, "") + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("转换成功！已完美生成并下载 PDF 副本。");
  };

  return (
    <ToolScreen
      title="Word 转 PDF"
      desc="将 Word 文档转换为优质不可编辑的 PDF 格式"
      icon={FileImage}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-2 gap-6">
        {status === "idle" && (
          <>
            <label className="w-full max-w-sm aspect-video border-2 border-dashed border-outline-variant/60 rounded-[32px] flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group relative">
              <input type="file" accept=".doc,.docx" onChange={handleFileChange} className="hidden" />
              <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-8 h-8" />
              </div>
              <span className="text-body-lg font-bold text-on-surface mb-1">
                {file ? file.name : "点击或拖拽文件"}
              </span>
              <span className="text-[12px] text-on-surface-variant font-medium">
                {file ? `${(file.size / 1024).toFixed(1)} KB` : "支持 .doc, .docx (最大 50MB)"}
              </span>
            </label>
            <button 
              onClick={handleConvert}
              disabled={!file}
              className={`bg-primary text-on-primary font-semibold text-body-sm py-3 px-12 rounded-full shadow-md transition-all ${file ? "hover:scale-105 active:scale-95" : "opacity-50 cursor-not-allowed"}`}
            >
              开始转换
            </button>
          </>
        )}

        {status === "converting" && (
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div className="w-24 h-24 rounded-full border-4 border-surface-variant flex items-center justify-center relative shadow-sm">
              <div 
                className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              ></div>
              <span className="text-body-lg font-bold font-mono text-primary">{progress}%</span>
            </div>
            <span className="text-body-sm text-on-surface-variant font-bold">排版引擎转换中...</span>
          </div>
        )}

        {status === "done" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 animate-bounce">
              ✓
            </div>
            <h4 className="text-title-md font-bold text-on-surface">转换成功！</h4>
            <p className="text-xs text-on-surface-variant max-w-[240px]">
              文件 <strong>{file?.name.replace(/\.[^/.]+$/, "")}.pdf</strong> 已准备完毕。
            </p>
            <div className="flex flex-col gap-2 w-full max-w-[200px] mt-4">
              <button 
                onClick={handleDownload}
                className="w-full bg-primary text-on-primary font-semibold text-body-sm py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                下载高保真 PDF
              </button>
              <button 
                onClick={() => { setFile(null); setStatus("idle"); }}
                className="text-xs text-on-surface-variant underline hover:text-primary transition-colors py-2"
              >
                再次转换
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolScreen>
  );
}

export function PdfToWordTool({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "converting" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setStatus("converting");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("done");
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  const handleDownload = () => {
    if (!file) return;
    const blob = new Blob(["Spring Nest Mock Converted Word Content " + file.name], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.[^/.]+$/, "") + ".docx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("转换成功！已完美提取 Word 文档。");
  };

  return (
    <ToolScreen
      title="PDF 转 Word"
      desc="将 PDF 文件提取为可编辑的 Word 文档"
      icon={File}
      bg="bg-secondary/20 text-secondary"
      onClose={onClose}
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-2 gap-6">
        {status === "idle" && (
          <>
            <label className="w-full max-w-sm aspect-video border-2 border-dashed border-outline-variant/60 rounded-[32px] flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group relative">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              <div className="w-16 h-16 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <File className="w-8 h-8" />
              </div>
              <span className="text-body-lg font-bold text-on-surface mb-1">
                {file ? file.name : "点击或拖拽文件"}
              </span>
              <span className="text-[12px] text-on-surface-variant font-medium">
                {file ? `${(file.size / 1024).toFixed(1)} KB` : "支持 .pdf (最大 50MB)"}
              </span>
            </label>
            <button 
              onClick={handleConvert}
              disabled={!file}
              className={`bg-secondary text-on-secondary font-semibold text-body-sm py-3 px-12 rounded-full shadow-md transition-all ${file ? "hover:scale-105 active:scale-95" : "opacity-50 cursor-not-allowed"}`}
            >
              开始转换
            </button>
          </>
        )}

        {status === "converting" && (
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div className="w-24 h-24 rounded-full border-4 border-surface-variant flex items-center justify-center relative shadow-sm">
              <div 
                className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              ></div>
              <span className="text-body-lg font-bold font-mono text-secondary">{progress}%</span>
            </div>
            <span className="text-body-sm text-on-surface-variant font-bold">深度文字要素清洗中...</span>
          </div>
        )}

        {status === "done" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-2 animate-bounce">
              ✓
            </div>
            <h4 className="text-title-md font-bold text-on-surface">转换成功！</h4>
            <p className="text-xs text-on-surface-variant max-w-[240px]">
              文件 <strong>{file?.name.replace(/\.[^/.]+$/, "")}.docx</strong> 已提取就绪。
            </p>
            <div className="flex flex-col gap-2 w-full max-w-[200px] mt-4">
              <button 
                onClick={handleDownload}
                className="w-full bg-secondary text-on-secondary font-semibold text-body-sm py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                下载 DOCX 文件
              </button>
              <button 
                onClick={() => { setFile(null); setStatus("idle"); }}
                className="text-xs text-on-surface-variant underline hover:text-secondary transition-colors py-2"
              >
                再次转换
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolScreen>
  );
}
