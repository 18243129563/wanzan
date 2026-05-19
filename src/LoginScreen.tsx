import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Cloud, Leaf } from 'lucide-react';
import { useState } from 'react';

export function LoginScreen({ onClose, onLoginSuccess }: { onClose: () => void, onLoginSuccess?: () => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  const handleAction = () => {
    // Simulate action
    if (mode === 'login' || mode === 'register') {
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onClose();
      }
    } else {
      setMode('login'); // go back to login after resetting password
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: '10%' }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: '10%' }} 
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col pt-12 pb-safe-pb overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed-dim/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary-fixed/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-tertiary-fixed/40 rounded-full blur-3xl pointer-events-none" />

      <header className="flex justify-between items-center px-6 relative z-10 mt-safe-pt">
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface/50 backdrop-blur-md hover:bg-surface-variant transition-colors shadow-sm active:scale-95 border border-white/20">
          <X className="w-5 h-5 text-on-surface" />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-8 relative z-10 max-w-md w-full mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: 'spring' }} className="mt-[-2rem]">
          <div className="w-16 h-16 rounded-3xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-lg border border-white/20">
            <Leaf className="w-8 h-8 fill-on-primary" />
          </div>
          <h1 className="text-display-lg text-primary tracking-tight mb-2">Spring Nest</h1>
          <p className="text-body-lg text-on-surface-variant opacity-80 mb-8">
            <AnimatePresence mode="wait">
              <motion.span key={mode} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="block">
                {mode === 'login' ? '欢迎回来，回归你的数字避难所。' : mode === 'register' ? '现在，创建你的数字避难所。' : '不用担心，我们将重置你的密码。'}
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <div className="glass-card px-4 py-2 rounded-[20px] flex flex-col gap-1 border-b-2 border-primary focus-within:border-primary transition-colors bg-surface-container">
                  <span className="text-[12px] text-primary font-semibold tracking-wide">账号 / 邮箱</span>
                  <input type="text" placeholder="输入账号" className="bg-transparent border-none outline-none text-body-lg text-on-surface p-0 w-full font-medium placeholder:font-normal placeholder:text-on-surface-variant/50" />
                </div>
                <div className="glass-card px-4 py-2 rounded-[20px] flex flex-col gap-1 border-b-2 border-transparent focus-within:border-primary transition-colors bg-surface-container">
                  <span className="text-[12px] text-outline font-semibold tracking-wide">密码</span>
                  <input type="password" placeholder="输入密码" className="bg-transparent border-none outline-none text-body-lg text-on-surface p-0 w-full font-medium placeholder:font-normal placeholder:text-on-surface-variant/50" />
                </div>
                <div className="text-right pt-1">
                  <button onClick={() => setMode('forgot')} className="text-body-sm text-primary font-bold hover:underline">忘记密码？</button>
                </div>
              </motion.div>
            )}
            
            {mode === 'register' && (
              <motion.div key="register" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <div className="glass-card px-4 py-2 rounded-[20px] flex flex-col gap-1 border-b-2 border-primary focus-within:border-primary transition-colors bg-surface-container">
                  <span className="text-[12px] text-primary font-semibold tracking-wide">邮箱 </span>
                  <input type="email" placeholder="输入邮箱" className="bg-transparent border-none outline-none text-body-lg text-on-surface p-0 w-full font-medium placeholder:font-normal placeholder:text-on-surface-variant/50" />
                </div>
                <div className="glass-card px-4 py-2 rounded-[20px] flex flex-col gap-1 border-b-2 border-transparent focus-within:border-primary transition-colors bg-surface-container">
                  <span className="text-[12px] text-outline font-semibold tracking-wide">设置密码</span>
                  <input type="password" placeholder="至少 8 位数字与字母" className="bg-transparent border-none outline-none text-body-lg text-on-surface p-0 w-full font-medium placeholder:font-normal placeholder:text-on-surface-variant/50" />
                </div>
                <div className="glass-card px-4 py-2 rounded-[20px] flex flex-col gap-1 border-b-2 border-transparent focus-within:border-primary transition-colors bg-surface-container">
                  <span className="text-[12px] text-outline font-semibold tracking-wide">确认密码</span>
                  <input type="password" placeholder="再次输入密码" className="bg-transparent border-none outline-none text-body-lg text-on-surface p-0 w-full font-medium placeholder:font-normal placeholder:text-on-surface-variant/50" />
                </div>
                <div className="flex items-start gap-2 pt-2 px-1">
                  <input type="checkbox" id="terms" className="mt-1 flex-shrink-0 text-primary accent-primary" />
                  <label htmlFor="terms" className="text-[12px] text-on-surface-variant leading-tight">
                    我已阅读并同意 <span className="text-primary font-bold cursor-pointer hover:underline">服务条款</span> 和 <span className="text-primary font-bold cursor-pointer hover:underline">隐私政策</span>
                  </label>
                </div>
              </motion.div>
            )}

            {mode === 'forgot' && (
              <motion.div key="forgot" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <div className="glass-card px-4 py-2 rounded-[20px] flex flex-col gap-1 border-b-2 border-primary focus-within:border-primary transition-colors bg-surface-container">
                  <span className="text-[12px] text-primary font-semibold tracking-wide">注册邮箱</span>
                  <input type="email" placeholder="输入邮箱接收重置链接" className="bg-transparent border-none outline-none text-body-lg text-on-surface p-0 w-full font-medium placeholder:font-normal placeholder:text-on-surface-variant/50" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col gap-4">
          <button onClick={handleAction} className="w-full bg-primary text-on-primary py-4 rounded-full text-body-lg font-bold flex justify-center items-center gap-2 shadow-lg hover:bg-primary-container transition-all active:scale-95 group">
            {mode === 'login' ? '登录' : mode === 'register' ? '注册' : '发送重置邮件'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <AnimatePresence mode="wait">
            {mode !== 'forgot' ? (
              <motion.div key="toggleLogReg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2 mt-4">
                <span className="text-[13px] text-on-surface-variant font-medium">{mode === 'login' ? '没有账号？' : '已有账号？'}</span>
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-[13px] text-primary font-bold hover:underline cursor-pointer tracking-wide">
                  {mode === 'login' ? '立即注册' : '返回登录'}
                </button>
              </motion.div>
            ) : (
              <motion.div key="backToLogin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2 mt-4">
                <button onClick={() => setMode('login')} className="text-[13px] text-primary font-bold hover:underline cursor-pointer tracking-wide">
                  我想起来了，返回登录
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </main>
    </motion.div>
  );
}
