import { AnimatePresence, motion } from "motion/react";
import React, { useState, useMemo } from "react";
import { ToolRouter } from "./ToolRouter";
import { LoginScreen } from "./LoginScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import {
  dailyTools,
  funTools,
  devTools,
  securityTools,
  learningTools,
  timeTools,
  docTools,
  allTools,
} from "./data/tools";
import {
  Search,
  Compass,
  Code2,
  BookOpen,
  User,
  Calculator,
  ScanLine,
  Cloud,
  ArrowRightLeft,
  MoreHorizontal,
  Calendar,
  Languages,
  Timer,
  ChevronRight,
  Leaf,
  HelpCircle,
  ListOrdered,
  FileText,
  Briefcase,
  Wallet,
  Heart,
  History,
  Palette,
  Globe,
  Info,
  LogOut,
  Braces,
  Link,
  Asterisk,
  Pencil,
  FileImage,
  File,
  Volume2,
  X,
  Shield,
  Lock,
  EyeOff,
  Server,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("discover");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(
    "https://api.dicebear.com/7.x/notionists/svg?seed=Mimi&backgroundColor=e6f4ea",
  );

  return (
    <div className="bg-background text-on-background min-h-[100dvh] relative overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-fixed-dim/20 to-transparent pointer-events-none z-0"></div>
      <div className="fixed -top-24 -right-24 w-64 h-64 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-48 -left-12 w-48 h-48 bg-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Main Container */}
      <div className="flex flex-col min-h-[100dvh] relative z-10 mx-auto max-w-7xl">
        {/* Top App Bar */}
        <header className="sticky top-0 w-full z-40 flex flex-col px-5 md:px-8 bg-surface/80 backdrop-blur-lg pt-2">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center gap-2.5">
              <Leaf className="w-7 h-7 md:w-8 md:h-8 fill-primary text-primary" />
              <h1 className="text-2xl md:text-[26px] font-extrabold text-primary tracking-tight">
                Spring Nest
              </h1>
            </div>
            {/* Action buttons could go here */}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full px-5 md:px-8 pt-4 pb-28 md:pb-12">
          <AnimatePresence mode="wait">
            {activeTab === "discover" && (
              <DiscoverTab key="discover" onOpenTool={setActiveTool} />
            )}
            {activeTab === "development" && (
              <DevelopmentTab key="development" onOpenTool={setActiveTool} />
            )}
            {activeTab === "efficiency" && (
              <EfficiencyTab key="efficiency" onOpenTool={setActiveTool} />
            )}
            {activeTab === "profile" && (
              <ProfileTab
                key="profile"
                onOpenLogin={() => setShowLogin(true)}
                isLoggedIn={isLoggedIn}
                onLogout={() => setIsLoggedIn(false)}
                onOpenFavorites={() => setShowFavorites(true)}
                onOpenHistory={() => setShowHistory(true)}
                userAvatar={userAvatar}
                setUserAvatar={setUserAvatar}
                onOpenAbout={() => setShowAbout(true)}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-safe-pb h-[72px] md:h-20 glass-nav rounded-t-2xl max-w-7xl mx-auto md:left-1/2 md:-translate-x-1/2">
          <NavItem
            id="discover"
            label="发现"
            icon={Compass}
            active={activeTab === "discover"}
            onClick={() => setActiveTab("discover")}
          />
          <NavItem
            id="development"
            label="开发"
            icon={Code2}
            active={activeTab === "development"}
            onClick={() => setActiveTab("development")}
          />
          <NavItem
            id="efficiency"
            label="效率"
            icon={BookOpen}
            active={activeTab === "efficiency"}
            onClick={() => setActiveTab("efficiency")}
          />
          <NavItem
            id="profile"
            label="我的"
            icon={User}
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </nav>
      </div>

      <AnimatePresence>
        {activeTool && (
          <div className="fixed inset-0 z-[60]">
            <ToolRouter
              activeTool={activeTool}
              onClose={() => setActiveTool(null)}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogin && (
          <LoginScreen
            onClose={() => setShowLogin(false)}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFavorites && (
          <FavoritesScreen
            onClose={() => setShowFavorites(false)}
            onOpenTool={setActiveTool}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHistory && (
          <HistoryScreen
            onClose={() => setShowHistory(false)}
            onOpenTool={setActiveTool}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAbout && (
          <AboutScreen
            onClose={() => setShowAbout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AboutScreen({ onClose }: { onClose: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 350 }
    },
    exit: { 
      y: 50, 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-surface-dim/75 backdrop-blur-md z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className="w-full max-w-xl bg-surface border border-outline-variant/30 rounded-[32px] p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[85vh] flex flex-col gap-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors active:scale-95 cursor-pointer z-10"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-inner relative overflow-hidden">
            <Leaf className="w-9 h-9 fill-primary text-primary animate-[pulse_3s_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none"></div>
          </div>
          <h2 className="text-display-md font-black text-primary tracking-tight font-serif">春日小筑</h2>
          <span className="text-body-sm text-on-surface-variant font-bold tracking-widest uppercase mt-1">Spring Nest · 高致美学数字家园</span>
          <p className="text-[10px] font-mono text-outline font-semibold uppercase mt-0.5 px-3 py-0.5 bg-surface-container-high rounded-full border border-outline-variant/20">V1.0.0 Stable Release</p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent"></div>

        {/* Narrative Section */}
        <div className="space-y-4 text-justify">
          <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2 border-l-3 border-primary pl-2.5">
            <Leaf className="w-4 h-4 text-primary fill-current" />
            小筑诞生之初
          </h3>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            在这个算法狂飙、信息过载的数字时代，充斥着无休止的信息推送与臃肿繁复的小工具。<strong>「春日小筑 (Spring Nest)」</strong> 正是为逃离那些喧嚣而筑成的数字温暖栖息地。我们致力于回归工具的核心本质，以极致美学设计，陪伴您静心享受生活与工作。
          </p>
        </div>

        {/* Core Philosophy: Data Sync and Privacy (The core part requested) */}
        <div className="space-y-4 text-justify bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-[24px] relative overflow-hidden shadow-sm">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
          
          <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
            <Shield className="w-4.5 h-4.5 text-primary" strokeWidth={2.5} />
            云端协同与绝对隐私守护
          </h3>
          
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            春日小筑<strong>并非孤立封闭的本地纯单机应用</strong>。为了带给您真正自由流畅、不惧设备损毁的体验，我们设计了轻量高效的<strong>云端加密备份、实时天气同步、以及多端共享账本</strong>等网络云协同能力。
          </p>
          
          <div className="p-3.5 bg-surface rounded-xl border border-outline-variant/15 flex gap-3 items-start">
            <Lock className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-on-surface block">🔒 我们始终坚守的安全隐私底线：</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                您的所有上传数据，皆经端对端加密通道传输至受严格防护的安全数据云。除您个人授权的数据所有权外，<strong>绝无任何第三方能够访问、刺探您的账目和日记</strong>。我们承诺永久：拒绝广告投放、拒绝用户商业画像交易、严控所有网络遥测。
              </p>
            </div>
          </div>
        </div>

        {/* Core Design Pillars */}
        <div className="space-y-3 pt-1">
          <h3 className="text-title-md font-bold text-on-surface border-l-3 border-primary pl-2.5 flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" />
            核心三大匠心信条
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-surface-container flex flex-col gap-1.5 border border-outline-variant/20 hover:border-slate-300 transition-colors">
              <span className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                <span className="text-primary text-base">✦</span> 匠心美学设计
              </span>
              <p className="text-on-surface-variant leading-normal text-[11px]">
                精心调和柔和的 off-white 灰白色温与灰炭色调，绝无庸俗纷乱的高饱和渐变，完美承载契合高审美用户的沉浸式呼吸气场。
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container flex flex-col gap-1.5 border border-outline-variant/20 hover:border-slate-300 transition-colors">
              <span className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                <span className="text-primary text-base">✦</span> 极简纯净无打扰
              </span>
              <p className="text-on-surface-variant leading-normal text-[11px]">
                没有后台推送欺诈，没有开屏弹窗。工具被调用时尽显卓越，闲显时安分清净，绝不占用一分一秒本该属于您思索的宝贵视线。
              </p>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-outline-variant/30"></div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center text-[10px] text-on-surface-variant tracking-wider font-semibold">
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            安宁 · 优美 · 坚韧安全
          </span>
          <span className="font-mono">© 2026 Spring Nest · Powered by React & TLS 1.3</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NavItem({
  id,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  id: string;
  label: string;
  icon: any;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 active:scale-90 ${
        active
          ? "bg-primary-container text-on-primary-container shadow-sm scale-105"
          : "text-on-surface-variant/70 hover:bg-surface-container-high"
      }`}
    >
      <Icon
        className={`w-[22px] h-[22px] mb-1 ${active ? "fill-current" : ""}`}
        strokeWidth={active ? 2.5 : 2}
      />
      <span className="text-label-md">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 bg-primary-container rounded-2xl -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </button>
  );
}

const MotionCard = motion.create("div");

const containerVariants = {
  hidden: { opacity: 0, filter: "blur(4px)", scale: 0.98, y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 20,
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.98,
    y: -8,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

function DiscoverTab({
  onOpenTool,
}: {
  onOpenTool: (id: string) => void;
  key?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return [];
    return allTools.filter(
      (tool) =>
        tool.name.includes(searchQuery) || tool.desc.includes(searchQuery),
    );
  }, [searchQuery]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8 pb-8"
    >
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-headline-md text-on-surface">发现</h2>

        <motion.div 
          animate={isFocused ? { scale: 1.015, y: -1 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-full pb-2"
        >
          {/* Glowing background light aura when active */}
          <div className={`absolute -inset-1 blur-lg bg-gradient-to-r from-primary/20 via-primary-container/20 to-secondary/10 rounded-[24px] pointer-events-none transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className="relative flex items-center">
            <motion.div 
              animate={isFocused ? { scale: 1.1, x: 2, color: "var(--md-sys-color-primary, #2d6a4f)" } : { scale: 1, x: 0, color: "rgb(156, 163, 175)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute left-4 z-10 flex items-center pointer-events-none"
            >
              <Search className="w-5 h-5" />
            </motion.div>
            
            <input
              type="text"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-13 pl-12 pr-12 bg-surface-container-high/60 focus:bg-surface-container-highest backdrop-blur-md rounded-[22px] text-body-md text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:shadow-lg transition-all shadow-sm border border-outline-variant/20 focus:border-primary/40 outline-none select-none"
              placeholder="搜索感兴趣的精品小工具、生活指南..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-variant transition-colors active:scale-90 z-10 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.section>

      {searchQuery ? (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 min-h-[40vh]"
        >
          <h3 className="text-headline-sm text-on-surface">
            搜索结果 ({filteredTools.length})
          </h3>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <MotionCard
                  key={tool.id}
                  onClick={() => {
                    onOpenTool(tool.id);
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card rounded-[24px] p-4 flex flex-col items-start gap-4 justify-between min-h-[130px] cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-[14px] ${tool.bg} flex items-center justify-center shadow-inner border border-white/40 mb-2`}
                  >
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-headline-sm text-on-surface placeholder-clip overflow-hidden text-ellipsis line-clamp-1">
                      {tool.name}
                    </h4>
                    <p className="text-[12px] font-medium tracking-wide text-on-surface-variant mt-1 line-clamp-1">
                      {tool.desc}
                    </p>
                  </div>
                </MotionCard>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
              <Search className="w-12 h-12 mb-4 text-on-surface-variant" />
              <p className="text-body-lg text-on-surface-variant">
                未找到相关工具
              </p>
            </div>
          )}
        </motion.section>
      ) : showAll ? (
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-sm text-on-surface">
              全部工具 ({allTools.length})
            </h3>
            <button
              onClick={() => setShowAll(false)}
              className="text-label-md text-primary hover:text-primary-container transition-colors"
            >
              收起
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {allTools.map((tool) => (
              <MotionCard
                key={tool.id}
                onClick={() => onOpenTool(tool.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card rounded-[24px] p-4 flex flex-col items-start gap-3 justify-between min-h-[120px] cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${tool.bg} flex items-center justify-center shadow-inner border border-white/40`}
                >
                  <tool.icon className="w-5 h-5 text-current" />
                </div>
                <div>
                  <h4 className="text-body-lg font-bold text-on-surface line-clamp-1">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] font-medium tracking-wide text-on-surface-variant mt-0.5 line-clamp-1">
                    {tool.desc}
                  </p>
                </div>
              </MotionCard>
            ))}
          </div>
        </motion.section>
      ) : (
        <>
          {/* Favorite Tools */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-headline-sm text-on-surface">常用工具</h3>
              <button
                onClick={() => setShowAll(true)}
                className="text-label-md text-primary hover:text-primary-container transition-colors"
              >
                查看全部
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  id: "notes",
                  name: "便签",
                  icon: Calendar,
                  color: "bg-primary-container text-on-primary-container",
                },
                {
                  id: "translate",
                  name: "翻译",
                  icon: Languages,
                  color: "bg-secondary-container text-on-secondary-container",
                },
                {
                  id: "pomodoro",
                  name: "番茄钟",
                  icon: Timer,
                  color: "bg-tertiary-container text-on-tertiary-container",
                },
              ].map((tool, i) => (
                <MotionCard
                  key={i}
                  onClick={() => onOpenTool(tool.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card rounded-2xl md:rounded-[24px] p-3 md:p-5 flex flex-col items-center justify-center gap-2 md:gap-3 cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full md:rounded-xl ${tool.color} flex items-center justify-center shadow-inner border border-white/40`}
                  >
                    <tool.icon className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <span className="text-[11px] md:text-body-sm font-bold text-on-surface text-center line-clamp-1">
                    {tool.name}
                  </span>
                </MotionCard>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-4">
            <h3 className="text-headline-sm text-primary flex items-center gap-2 pl-1">
              <Leaf className="w-5 h-5 fill-primary text-primary" />
              日常实用
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {dailyTools.map((tool, i) => (
                <MotionCard
                  key={tool.id}
                  onClick={() => onOpenTool(tool.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass-card rounded-[24px] p-5 flex flex-col items-start gap-4 justify-between min-h-[130px] cursor-pointer ${i === 0 ? "col-span-2 flex-row items-center !min-h-[auto]" : ""}`}
                >
                  <div
                    className={`w-12 h-12 flex-shrink-0 rounded-[14px] ${tool.bg} flex items-center justify-center shadow-inner border border-white/40`}
                  >
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div className={i === 0 ? "flex-1 ml-4" : ""}>
                    <h4 className="text-headline-sm text-on-surface">
                      {tool.name}
                    </h4>
                    <p className="text-[12px] font-medium tracking-wide text-on-surface-variant mt-1">
                      {tool.desc}
                    </p>
                  </div>
                  {i === 0 && (
                    <ChevronRight className="w-6 h-6 text-outline-variant" />
                  )}
                </MotionCard>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-4">
            <h3 className="text-headline-sm text-tertiary flex items-center gap-2 pl-1">
              <Heart className="w-5 h-5 fill-tertiary text-tertiary" />
              趣味工具
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {funTools.map((tool) => (
                <MotionCard
                  key={tool.id}
                  onClick={() => onOpenTool(tool.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card rounded-[24px] p-5 flex flex-col items-start gap-4 justify-between min-h-[130px] cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-[14px] ${tool.bg} flex items-center justify-center shadow-inner border border-white/40`}
                  >
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-headline-sm text-on-surface">
                      {tool.name}
                    </h4>
                    <p className="text-[12px] font-medium tracking-wide text-on-surface-variant mt-1">
                      {tool.desc}
                    </p>
                  </div>
                </MotionCard>
              ))}
            </div>
          </motion.section>
        </>
      )}
    </motion.div>
  );
}

function DevelopmentTab({
  onOpenTool,
}: {
  onOpenTool: (id: string) => void;
  key?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="pl-1">
        <h2 className="text-headline-md text-on-surface">开发</h2>
        <p className="text-body-sm text-on-surface-variant opacity-80 mt-1">
          为您打造的高效、便捷的日常开发工具箱。
        </p>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-4">
        <h3 className="text-headline-sm text-primary flex items-center gap-2 pl-1">
          <Code2 className="w-5 h-5 fill-primary/20 text-primary" />
          开发辅助
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devTools.map((tool, i) => (
            <MotionCard
              key={tool.id}
              onClick={() => onOpenTool(tool.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card rounded-[24px] p-5 cursor-pointer flex flex-col gap-4 group relative overflow-hidden"
            >
              {i % 2 === 0 && (
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-fixed-dim/20 rounded-full blur-2xl z-0 transition-transform group-hover:scale-125"></div>
              )}
              {i % 2 !== 0 && (
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary-fixed/30 rounded-full blur-xl z-0 transition-transform group-hover:scale-125"></div>
              )}

              <div className="relative z-10 flex justify-between items-start">
                <div
                  className={`w-14 h-14 rounded-2xl ${tool.bg} text-white flex items-center justify-center shadow-inner border border-white/20`}
                >
                  <tool.icon className="w-7 h-7" />
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant/50 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="relative z-10 mt-2">
                <h3 className="text-headline-sm text-on-surface mb-1">
                  {tool.name}
                </h3>
                <p className="text-body-sm text-on-surface-variant/90 font-medium">
                  {tool.desc}
                </p>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <h3 className="text-headline-sm text-secondary flex items-center gap-2 pl-1">
          <Heart className="w-5 h-5 fill-secondary/20 text-secondary" />
          安全隐私
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityTools.map((tool, i) => (
            <MotionCard
              key={tool.id}
              onClick={() => onOpenTool(tool.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card rounded-[24px] p-5 cursor-pointer flex flex-col gap-4 group relative overflow-hidden"
            >
              <div className="relative z-10 flex justify-between items-start">
                <div
                  className={`w-14 h-14 rounded-2xl ${tool.bg} text-on-surface flex items-center justify-center shadow-inner border border-white/20`}
                >
                  <tool.icon className="w-7 h-7" />
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant/50 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="relative z-10 mt-2">
                <h3 className="text-headline-sm text-on-surface mb-1">
                  {tool.name}
                </h3>
                <p className="text-body-sm text-on-surface-variant/90 font-medium">
                  {tool.desc}
                </p>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function EfficiencyTab({
  onOpenTool,
}: {
  onOpenTool: (id: string) => void;
  key?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="pl-1">
        <h2 className="text-headline-md text-on-surface">生产力</h2>
        <p className="text-body-sm text-on-surface-variant opacity-80 mt-1">
          打理您的任务，拓展您的知识。
        </p>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-4">
        <h3 className="text-headline-sm text-primary flex items-center gap-2 pl-1">
          <Leaf className="w-5 h-5 fill-tertiary text-tertiary" />
          时间效率
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {timeTools.map((tool, i) => (
            <MotionCard
              key={tool.id}
              onClick={() => onOpenTool(tool.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card rounded-[24px] p-5 flex flex-col items-start gap-4 justify-between min-h-[130px] cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-[14px] ${tool.bg} flex items-center justify-center shadow-inner border border-white/40`}
              >
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-headline-sm text-on-surface">
                  {tool.name}
                </h4>
                <p className="text-[12px] font-medium tracking-wide text-on-surface-variant mt-1">
                  {tool.desc}
                </p>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <h3 className="text-headline-sm text-primary flex items-center gap-2 pl-1">
          <BookOpen className="w-5 h-5 fill-secondary text-secondary" />
          学习与创作
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {learningTools.map((tool, i) => (
            <MotionCard
              key={tool.id}
              onClick={() => onOpenTool(tool.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-card rounded-[24px] p-5 flex flex-col items-start gap-3 justify-between min-h-[130px] cursor-pointer ${i === 0 ? "col-span-2 flex-row items-center !min-h-[auto]" : ""}`}
            >
              <div
                className={`w-12 h-12 flex-shrink-0 rounded-[14px] ${tool.bg} flex items-center justify-center shadow-inner border border-white/40`}
              >
                <tool.icon className="w-6 h-6" />
              </div>
              <div className={i === 0 ? "flex-1 ml-4" : ""}>
                <h4 className="text-headline-sm text-on-surface">
                  {tool.name}
                </h4>
                <p className="text-[12px] font-medium tracking-wide text-on-surface-variant mt-1">
                  {tool.desc}
                </p>
              </div>
              {i === 0 && (
                <ChevronRight className="w-6 h-6 text-outline-variant" />
              )}
            </MotionCard>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-4">
        <h3 className="text-headline-sm text-primary flex items-center gap-2 pl-1">
          <Briefcase className="w-5 h-5 fill-primary text-primary" />
          文档转换
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {docTools.map((tool, i) => (
            <MotionCard
              key={tool.id}
              onClick={() => onOpenTool(tool.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card rounded-[24px] p-4 flex flex-col items-center text-center gap-3 justify-center min-h-[110px] cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-[18px] ${tool.bg} flex items-center justify-center shadow-sm border border-outline-variant/30`}
              >
                <tool.icon className="w-7 h-7" />
              </div>
              <h4 className="text-body-sm font-bold text-on-surface tracking-wide mt-1">
                {tool.name}
              </h4>
            </MotionCard>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function ProfileTab({
  onOpenLogin,
  isLoggedIn,
  onLogout,
  onOpenFavorites,
  onOpenHistory,
  userAvatar,
  setUserAvatar,
  onOpenAbout,
}: {
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenFavorites: () => void;
  onOpenHistory: () => void;
  userAvatar: string;
  setUserAvatar: (url: string) => void;
  onOpenAbout: () => void;
  key?: string;
}) {
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserAvatar(url);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 flex flex-col items-center max-w-md mx-auto w-full"
    >
      {/* Avatar Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center mt-6 mb-2 cursor-pointer group"
        onClick={!isLoggedIn ? onOpenLogin : undefined}
      >
        <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary-fixed to-surface shadow-md">
          {isLoggedIn && (
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleAvatarUpload}
              title="Upload avatar"
            />
          )}
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-surface-container-lowest flex items-center justify-center bg-surface-variant group-hover:bg-surface-container-high transition-colors">
            {isLoggedIn ? (
              <img
                src={userAvatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-outline-variant group-hover:scale-110 transition-transform" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-on-primary rounded-full flex justify-center items-center shadow-sm hover:scale-110 transition-transform cursor-pointer border border-white/20 z-0">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <h2
          className={`mt-4 mb-2 text-on-surface ${isLoggedIn ? "text-headline-sm font-bold truncate max-w-full px-4" : "text-display-lg"}`}
        >
          {isLoggedIn ? "ittmarkrueger4@gmail.com" : "未登录"}
        </h2>
        {!isLoggedIn ? (
          <button className="flex items-center gap-2 bg-surface-container/50 border border-outline-variant/30 px-5 py-2.5 rounded-full text-[13px] font-semibold text-on-surface hover:bg-surface-variant transition-colors shadow-sm cursor-pointer hover:border-primary/30 active:scale-95">
            <Leaf className="w-4 h-4 text-primary" />
            账号登录
          </button>
        ) : (
          <div className="flex items-center gap-2 text-primary font-medium text-body-sm bg-primary-container/30 px-3 py-1 rounded-full border border-primary/20">
            <span>已验证</span>
          </div>
        )}
      </motion.div>

      {/* Lists */}
      <motion.div variants={itemVariants} className="w-full space-y-4">
        <div className="glass-card rounded-[24px] p-2 flex flex-col border border-white/40">
          <ProfileListItem
            icon={Heart}
            iconBg="bg-tertiary-container/30 text-tertiary"
            title="我的收藏"
            subtitle="已收藏的工具与项目"
            hasArrow
            onClick={isLoggedIn ? onOpenFavorites : onOpenLogin}
          />
          <div className="h-[1px] bg-outline-variant/20 mx-4"></div>
          <ProfileListItem
            icon={History}
            iconBg="bg-secondary-container/40 text-secondary"
            title="使用记录"
            subtitle="最近的使用活动"
            hasArrow
            onClick={isLoggedIn ? onOpenHistory : onOpenLogin}
          />
        </div>

        <div className="glass-card rounded-[24px] p-2 flex flex-col border border-white/40">
          <ProfileListItem
            icon={Info}
            iconBg="bg-surface-variant text-on-surface-variant"
            title="关于春日小筑"
            subtitle="极简数字避难所 · 版本 1.0.0"
            hasArrow
            onClick={onOpenAbout}
          />
          {isLoggedIn && (
            <>
              <div className="h-[1px] bg-outline-variant/20 mx-4"></div>
              <ProfileListItem
                icon={LogOut}
                iconBg="bg-error/10 text-error"
                title="退出登录"
                hasArrow={false}
                onClick={onLogout}
              />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProfileListItem({
  icon: Icon,
  iconBg,
  title,
  subtitle,
  hasArrow,
  onClick,
  children,
}: any) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-variant/30 rounded-[16px] transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center shadow-inner`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-headline-sm text-on-surface mb-0.5">{title}</h4>
          <p className="text-[12px] text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      {hasArrow && (
        <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-outline transition-colors" />
      )}
      {children}
    </div>
  );
}
