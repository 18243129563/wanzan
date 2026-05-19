import { History, ChevronRight } from "lucide-react";
import { ToolScreen } from "../tools/ToolScreen";
import { allTools } from "../data/tools";
import { motion } from "motion/react";

export function HistoryScreen({
  onClose,
  onOpenTool,
}: {
  onClose: () => void;
  onOpenTool: (id: string) => void;
}) {
  const historyRecords = [
    { toolId: "question-bank-importer", time: "10 分钟前" },
    { toolId: "markdown-preview", time: "2 小时前" },
    { toolId: "pomodoro", time: "昨天" },
  ]; // Mock data

  return (
    <ToolScreen
      title="使用记录"
      desc="您最近使用的工具和项目历史。"
      icon={History}
      bg="bg-secondary-container/40 text-secondary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {historyRecords.map((record, i) => {
          const tool = allTools.find((t) => t.id === record.toolId);
          if (!tool) return null;

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
              onClick={() => {
                onClose();
                onOpenTool(tool.id);
              }}
              className="glass-card p-4 rounded-[20px] border border-outline-variant/30 flex items-center justify-between cursor-pointer hover:bg-surface-variant/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center opacity-80 group-hover:opacity-100 bg-surface-variant text-on-surface-variant shadow-sm transition-all`}
                >
                  <tool.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-label-sm text-on-surface-variant/70">
                    {record.time}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-on-surface-variant/50 group-hover:text-primary transition-colors" />
            </motion.div>
          );
        })}

        {historyRecords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/50">
            <History className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-body-md font-medium">暂无使用记录</p>
          </div>
        )}
      </div>
    </ToolScreen>
  );
}
