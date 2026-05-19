import React, { createContext } from 'react';
import { Base64Tool, JsonFormatter, PasswordGenerator, ColorConverter, UrlCodec, IpQueryTool } from './tools/DevTools';
import { FocusTimer, UnitConverter, CalculatorTool, NotesTool, TranslateTool, ScannerTool, WeatherTool, CompassTool } from './tools/DailyTools';
import { AccountingTool, MarkdownEditor, WordCountTool, QuestionBankTool, WordToPdfTool, PdfToWordTool } from './tools/EfficiencyTools';
import { QrcodeTool, RandomPickerTool, TimerStopwatchTool, DateCalculatorTool, TextDiffTool, LoremGeneratorTool, TipCalculatorTool, CaseConverterTool, RandomNumberTool, BmiCalculatorTool, TextToSpeechTool } from './tools/ExtraTools';
import { ToolScreen } from './tools/ToolScreen';
import { HelpCircle } from 'lucide-react';

interface ToolRouterProps {
  activeTool: string;
  onClose: () => void;
}

export const ActiveToolContext = createContext<string | null>(null);

export function ToolRouter({ activeTool, onClose }: ToolRouterProps) {
  let inner;
  switch (activeTool) {
    case 'json-formatter':
      inner = <JsonFormatter onClose={onClose} />; break;
    case 'base64-codec':
      inner = <Base64Tool onClose={onClose} />; break;
    case 'color-converter':
      inner = <ColorConverter onClose={onClose} />; break;
    case 'url-codec':
      inner = <UrlCodec onClose={onClose} />; break;
    case 'ip-lookup':
      inner = <IpQueryTool onClose={onClose} />; break;
    case 'password':
      inner = <PasswordGenerator onClose={onClose} />; break;
    case 'calculator':
      inner = <CalculatorTool onClose={onClose} />; break;
    case 'scanner':
      inner = <ScannerTool onClose={onClose} />; break;
    case 'weather':
      inner = <WeatherTool onClose={onClose} />; break;
    case 'compass':
      inner = <CompassTool onClose={onClose} />; break;
    case 'notes':
      inner = <NotesTool onClose={onClose} />; break;
    case 'translate':
      inner = <TranslateTool onClose={onClose} />; break;
    case 'pomodoro':
      inner = <FocusTimer onClose={onClose} />; break;
    case 'converter':
      inner = <UnitConverter onClose={onClose} />; break;
    case 'bookkeeping':
      inner = <AccountingTool onClose={onClose} />; break;
    case 'word-counter':
      inner = <WordCountTool onClose={onClose} />; break;
    case 'question-bank-importer':
      inner = <QuestionBankTool onClose={onClose} />; break;
    case 'markdown-preview':
      inner = <MarkdownEditor onClose={onClose} />; break;
    case 'word-to-pdf':
      inner = <WordToPdfTool onClose={onClose} />; break;
    case 'pdf-to-word':
      inner = <PdfToWordTool onClose={onClose} />; break;
      
    case 'qrcode':
      inner = <QrcodeTool onClose={onClose} />; break;
    case 'random-picker':
      inner = <RandomPickerTool onClose={onClose} />; break;
    case 'timer-stopwatch':
      inner = <TimerStopwatchTool onClose={onClose} />; break;
    case 'date-calculator':
      inner = <DateCalculatorTool onClose={onClose} />; break;
    case 'text-diff':
      inner = <TextDiffTool onClose={onClose} />; break;
    case 'lorem-generator':
      inner = <LoremGeneratorTool onClose={onClose} />; break;
    case 'tip-calculator':
      inner = <TipCalculatorTool onClose={onClose} />; break;
    case 'case-converter':
      inner = <CaseConverterTool onClose={onClose} />; break;
    case 'random-number':
      inner = <RandomNumberTool onClose={onClose} />; break;
    case 'bmi-calculator':
      inner = <BmiCalculatorTool onClose={onClose} />; break;
    case 'text-to-speech':
      inner = <TextToSpeechTool onClose={onClose} />; break;

    default:
      // Fallback for tools not specifically implemented
      inner = (
        <ToolScreen 
          title="开发中..." 
          desc="此工具正在赶来的路上。请稍后再试。" 
          icon={HelpCircle} 
          bg="bg-outline text-surface" 
          onClose={onClose}
        >
          <div className="flex-1 flex flex-col items-center justify-center p-8 mt-12 glass-card rounded-[24px]">
             <div className="w-24 h-24 rounded-full bg-surface-variant flex items-center justify-center mb-6">
                <HelpCircle className="w-10 h-10 text-on-surface-variant opacity-50" />
             </div>
             <h3 className="text-headline-md text-on-surface mb-2 tracking-tight">未开放</h3>
             <p className="text-body-sm text-on-surface-variant text-center leading-relaxed">
               我们仍在打磨这个小工具的体验。敬请期待后续版本的更新！
             </p>
          </div>
        </ToolScreen>
      );
  }

  return (
    <ActiveToolContext.Provider value={activeTool}>
      {inner}
    </ActiveToolContext.Provider>
  );
}
