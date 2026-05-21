import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactNode, useContext } from 'react';
import { ActiveToolContext } from '../ToolRouter';
import { allTools } from '../data/tools';

interface ToolScreenProps {
  title: string;
  desc?: string;
  icon: any;
  bg: string;
  onClose: () => void;
  children: ReactNode;
  hideHeader?: boolean;
}

export function ToolScreen({ title, desc, icon: DefaultIcon, bg: defaultBg, onClose, children, hideHeader }: ToolScreenProps) {
  const activeToolId = useContext(ActiveToolContext);
  const toolInfo = activeToolId ? allTools.find(t => t.id === activeToolId) : null;
  
  const Icon = toolInfo?.icon || DefaultIcon;
  const bg = toolInfo?.bg || defaultBg;
  const displayTitle = toolInfo?.name || title;
  const displayDesc = desc || toolInfo?.desc;

  const isQuestionBank = activeToolId === 'question-bank-importer';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(4px)" }} 
      transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
      className={`fixed inset-0 z-[100] flex flex-col ${isQuestionBank ? 'bg-[#FAF8F5]' : 'bg-background'} overflow-y-auto pb-12`}
    >
      {!hideHeader && (
        <header className={`sticky top-0 w-full z-40 flex items-center px-4 h-16 backdrop-blur-lg pt-safe-pt gap-3 flex-shrink-0 transition-colors ${isQuestionBank ? 'bg-[#FAF8F5]/90 border-b border-transparent' : 'bg-surface/80 border-b border-surface-variant'}`}>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/50 rounded-full text-on-surface transition-colors active:scale-95 z-50">
            <ChevronRight className="w-6 h-6 rotate-180 text-on-surface" />
          </button>
          {isQuestionBank ? (
            <div className="absolute inset-x-0 h-16 flex items-center justify-center pointer-events-none">
              <h1 className="text-lg font-black text-on-surface tracking-tight font-sans pointer-events-auto">{displayTitle}</h1>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-[10px] ${bg} flex items-center justify-center shadow-sm`}>
                 <Icon className="w-4 h-4" />
              </div>
              <h1 className="text-headline-sm text-on-surface">{displayTitle}</h1>
            </div>
          )}
        </header>
      )}
      <main className={`flex-1 w-full px-5 ${hideHeader ? 'mt-4' : 'mt-6'} max-w-2xl mx-auto flex flex-col gap-6 pb-8`}>
         {(!hideHeader && !isQuestionBank && displayDesc) && <p className="text-body-sm text-on-surface-variant opacity-80">{displayDesc}</p>}
         {children}
      </main>
    </motion.div>
  );
}
