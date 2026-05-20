import {
  HelpCircle,
  ListOrdered,
  FileText,
  Wallet,
  FileImage,
  File,
  Play,
  ChevronLeft,
  Calendar,
  BookOpen,
  UploadCloud,
  Download,
  Eye,
  List,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "motion/react";
import { ToolScreen } from "./ToolScreen";
import React, { useState } from "react";

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

export function QuestionBankTool({ onClose }: { onClose: () => void }) {
  const [studying, setStudying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(1);

  const cards = [
    {
      q: "什么是 TypeScript 中的泛型？",
      a: "泛型允许在定义函数、接口或类时不预先指定具体的类型，而在使用的时候再指定类型的一种特性。",
    },
    {
      q: "React 中 useEffect 的作用是什么？",
      a: "用于在函数组件中执行副作用操作，如数据获取、订阅或手动修改 DOM。",
    },
    {
      q: "闭包的概念是什么？",
      a: "闭包是指有权访问另一个函数作用域中的变量的函数。",
    },
  ];

  const handleNext = (dir = 1) => {
    setExitDirection(dir);
    if (cardIndex < cards.length - 1) {
      setCardIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setStudying(false);
      setCardIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <ToolScreen
      title="复习小筑"
      desc="科学管理复习进度，高效刷题体验。"
      icon={HelpCircle}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      {!studying ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Main Dashboard Card */}
          <div className="glass-card p-8 rounded-[36px] shadow-[0_12px_40px_rgba(39,79,58,0.08)] flex flex-col gap-8 text-center items-center relative overflow-hidden bg-surface-container/60 backdrop-blur-xl border border-white/40">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary/30 to-primary"></div>

            <div className="flex flex-col items-center pt-2">
              <h3 className="text-body-lg font-medium text-on-surface-variant/80 tracking-wide mb-2 uppercase text-[13px]">
                TODAY'S REVIEW
              </h3>
              <div className="flex items-baseline gap-2 justify-center drop-shadow-sm">
                <span className="text-[72px] font-black text-primary tracking-tighter leading-none select-none">
                  {cards.length}
                </span>
                <span className="text-title-lg font-bold text-on-surface-variant/70 mb-2">
                  题
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStudying(true)}
              className="w-[85%] relative group overflow-hidden rounded-[24px] bg-primary text-on-primary font-bold text-[17px] py-[18px] shadow-[0_8px_24px_rgba(39,79,58,0.3)] flex items-center justify-center gap-3 active:shadow-sm"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                开始复习 <Play className="w-[18px] h-[18px] fill-current" />
              </span>
            </motion.button>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent"></div>

            <div className="flex justify-between w-full px-6">
              <div className="flex flex-col items-center">
                <span className="text-display-sm font-black text-on-surface">
                  158
                </span>
                <span className="text-[12px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider opacity-80">
                  已掌握
                </span>
              </div>
              <div className="w-[1px] h-12 bg-outline-variant/30 self-center"></div>
              <div className="flex flex-col items-center">
                <span className="text-display-sm font-black text-on-surface">
                  24
                </span>
                <span className="text-[12px] text-error font-medium mt-1 uppercase tracking-wider opacity-80">
                  易错题
                </span>
              </div>
              <div className="w-[1px] h-12 bg-outline-variant/30 self-center"></div>
              <div className="flex flex-col items-center">
                <span className="text-display-sm font-black text-on-surface">
                  36
                </span>
                <span className="text-[12px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider opacity-80">
                  未开始
                </span>
              </div>
            </div>
          </div>

          {/* Decks List */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between px-3">
              <h3 className="text-title-medium font-bold text-on-surface">
                我的题集
              </h3>
              <button className="text-primary text-[14px] font-bold hover:underline opacity-90">
                查看全部
              </button>
            </div>

            <div className="grid gap-3">
              {[
                {
                  name: "前端面试八股文",
                  progress: 65,
                  icon: "💻",
                  color: "bg-surface-variant/50 text-primary",
                },
                {
                  name: "高等数学下册",
                  progress: 32,
                  icon: "📐",
                  color: "bg-secondary-container/50 text-secondary",
                },
                {
                  name: "英语四级核心词汇",
                  progress: 88,
                  icon: "🔤",
                  color: "bg-tertiary-container/50 text-tertiary",
                },
              ].map((deck, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="glass-card px-5 py-4 rounded-[24px] shadow-sm flex justify-between items-center cursor-pointer hover:bg-surface-variant/40 transition-colors border border-white/30 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-[16px] flex items-center justify-center text-xl shadow-inner ${deck.color}`}
                    >
                      {deck.icon}
                    </div>
                    <div className="flex flex-col text-left justify-center">
                      <span className="text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {deck.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1.5 w-32">
                        <div className="h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${i === 0 ? "bg-primary" : i === 1 ? "bg-secondary" : "bg-tertiary"}`}
                            style={{ width: `${deck.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-mono text-on-surface-variant/80 font-medium">
                          {deck.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors group-hover:shadow-md">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex flex-col -mt-2 pb-6 h-full relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-1 z-10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[16px] font-bold text-on-surface tracking-tight">
                前端八股文复习
              </span>
              <span className="text-[12px] font-medium text-on-surface-variant/70 uppercase">
                Now Studying
              </span>
            </div>
            <div className="bg-surface-container-high/80 backdrop-blur-sm text-on-surface px-4 py-2 rounded-[14px] text-[13px] font-bold font-mono shadow-sm border border-white/20">
              <span className="text-primary">{cardIndex + 1}</span> /{" "}
              <span className="opacity-60">{cards.length}</span>
            </div>
          </div>

          {/* Flashcard Area */}
          <div className="relative w-full aspect-[3/4] max-h-[500px] perspective-[1200px] mb-8 z-10">
            <AnimatePresence mode="popLayout" custom={exitDirection}>
              <FlashCard
                key={cardIndex}
                card={cards[cardIndex]}
                cardIndex={cardIndex}
                total={cards.length}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                onNext={handleNext}
                exitDirection={exitDirection}
              />
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto w-full z-10">
            <AnimatePresence mode="wait">
              {!showAnswer ? (
                <motion.button
                  key="show-answer-btn"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setShowAnswer(true)}
                  className="w-full h-[64px] bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-[24px] font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-[17px] border border-outline-variant/40 flex items-center justify-center gap-2"
                >
                  <span className="tracking-wide">点击显示答案</span>
                </motion.button>
              ) : (
                <motion.div
                  key="action-btns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, staggerChildren: 0.1 }}
                  className="flex gap-3 w-full"
                >
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleNext(-1)}
                    className="h-[76px] flex-1 bg-error-container/30 hover:bg-error-container/60 text-error rounded-[24px] font-bold active:scale-[0.95] transition-all flex flex-col items-center justify-center gap-1 shadow-sm border border-error/10"
                  >
                    <span className="text-[16px]">生疏</span>
                    <span className="text-[11px] opacity-70 font-mono tracking-tighter">
                      1 min
                    </span>
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={() => handleNext(0)}
                    className="h-[76px] flex-1 bg-surface-variant/80 hover:bg-surface-variant text-on-surface rounded-[24px] font-bold active:scale-[0.95] transition-all flex flex-col items-center justify-center gap-1 shadow-sm border border-outline-variant/30"
                  >
                    <span className="text-[16px]">犹豫</span>
                    <span className="text-[11px] opacity-70 font-mono tracking-tighter">
                      10 min
                    </span>
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleNext(1)}
                    className="h-[76px] flex-1 bg-primary text-on-primary rounded-[24px] font-bold active:scale-[0.95] transition-all flex flex-col items-center justify-center gap-1 shadow-[0_8px_16px_rgba(39,79,58,0.2)] hover:shadow-[0_12px_24px_rgba(39,79,58,0.25)] border-t border-white/20"
                  >
                    <span className="text-[16px]">掌握</span>
                    <span className="text-[11px] opacity-90 font-mono tracking-tighter text-on-primary/90">
                      1 d
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
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
