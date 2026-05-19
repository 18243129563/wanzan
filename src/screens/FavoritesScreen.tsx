import { Heart, ChevronRight, Play } from "lucide-react";
import { ToolScreen } from "../tools/ToolScreen";
import { allTools } from "../data/tools";
import { motion } from "motion/react";

export function FavoritesScreen({
  onClose,
  onOpenTool,
}: {
  onClose: () => void;
  onOpenTool: (id: string) => void;
}) {
  const favoriteIds = ["pomodoro", "word-count", "color-palette"]; // Mock data
  const favoriteTools = allTools.filter((t) => favoriteIds.includes(t.id));

  return (
    <ToolScreen
      title="我的收藏"
      desc="您收藏的工具与项目均会保存在这里。"
      icon={Heart}
      bg="bg-tertiary-container/30 text-tertiary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {favoriteTools.map((tool, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={tool.id}
            onClick={() => {
              onClose();
              onOpenTool(tool.id);
            }}
            className="glass-card p-4 rounded-[20px] border border-outline-variant/30 flex items-center justify-between cursor-pointer hover:bg-surface-variant/40 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tool.bg} shadow-sm group-hover:scale-105 transition-transform`}
              >
                <tool.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-body-lg font-bold text-on-surface">
                  {tool.name}
                </span>
                <span className="text-label-sm text-on-surface-variant line-clamp-1">
                  {tool.desc}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant/50 group-hover:text-primary transition-colors" />
          </motion.div>
        ))}

        {favoriteTools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/50">
            <Heart className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-body-md font-medium">暂无收藏内容</p>
          </div>
        )}
      </div>
    </ToolScreen>
  );
}
