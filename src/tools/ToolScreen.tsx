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
}

export function ToolScreen({ title, desc, icon: DefaultIcon, bg: defaultBg, onClose, children }: ToolScreenProps) {
  const activeToolId = useContext(ActiveToolContext);
  const toolInfo = activeToolId ? allTools.find(t => t.id === activeToolId) : null;
  
  const Icon = toolInfo?.icon || DefaultIcon;
  const bg = toolInfo?.bg || defaultBg;
  const displayTitle = toolInfo?.name || title;
  const displayDesc = desc; // We keep the specific desc from the prop, or we could use toolInfo?.desc 

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20, scale: 0.98 }} 
      animate={{ opacity: 1, x: 0, scale: 1 }} 
      exit={{ opacity: 0, x: -20, scale: 0.98 }} 
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="fixed inset-0 z-[100] flex flex-col bg-background overflow-y-auto pb-12"
    >
      <header className="sticky top-0 w-full z-40 flex items-center px-4 h-16 bg-surface/80 backdrop-blur-lg pt-safe-pt gap-3 border-b border-surface-variant flex-shrink-0">
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface transition-colors active:scale-95">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-[10px] ${bg} flex items-center justify-center shadow-sm`}>
             <Icon className="w-4 h-4" />
          </div>
          <h1 className="text-headline-sm text-on-surface">{displayTitle}</h1>
        </div>
      </header>
      <main className="flex-1 w-full px-5 mt-6 max-w-2xl mx-auto flex flex-col gap-6 pb-8">
         {displayDesc && <p className="text-body-sm text-on-surface-variant opacity-80">{displayDesc}</p>}
         {children}
      </main>
    </motion.div>
  );
}
