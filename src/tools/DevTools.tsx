import { useState } from 'react';
import { Braces, ArrowRightLeft, Palette, Link, Globe, Asterisk, Copy, RefreshCw, Check, Hash } from 'lucide-react';
import { ToolScreen } from './ToolScreen';

export function ColorConverter({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="颜色转换器" desc="在 HEX, RGB, HSL 等模式间无缝转换。" icon={Palette} bg="bg-[#7a5749]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="h-32 w-full rounded-2xl bg-[#7a5749] shadow-inner mb-2 flex items-end p-4">
           <span className="text-white font-mono text-lg font-bold drop-shadow-md">#7A5749</span>
        </div>
        
        {['HEX', 'RGB', 'HSL', 'CMYK'].map((format, i) => (
          <div key={format} className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <span className="font-semibold text-body-sm text-on-surface w-12">{format}</span>
            <input 
              readOnly 
              defaultValue={i === 0 ? '#7A5749' : i === 1 ? 'rgb(122, 87, 73)' : i === 2 ? 'hsl(17, 25%, 38%)' : 'cmyk(0%, 29%, 40%, 52%)'} 
              className="flex-1 bg-transparent text-right outline-none font-mono text-sm text-on-surface-variant font-medium" 
            />
            <button className="ml-4 p-2 bg-surface-variant text-on-surface rounded-full"><Copy className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </ToolScreen>
  );
}

export function UrlCodec({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="URL 编解码" icon={Link} bg="bg-[#b8baa8]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea placeholder="输入需处理的链接或参数..." className="w-full h-32 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 font-mono text-[13px] resize-none" defaultValue="https://springnest.app/search?q=测试"></textarea>
         <div className="flex gap-2">
           <button className="flex-1 bg-primary-container text-on-primary-container py-2 rounded-full text-label-md shadow-sm">编码 (Encode)</button>
           <button className="flex-1 bg-surface-variant text-on-surface py-2 rounded-full text-label-md shadow-sm">解码 (Decode)</button>
         </div>
         <textarea readOnly className="w-full h-32 p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 font-mono text-[13px] resize-none" defaultValue="https%3A%2F%2Fspringnest.app%2Fsearch%3Fq%3D%E6%B5%8B%E8%AF%95"></textarea>
      </div>
    </ToolScreen>
  );
}

export function JsonFormatter({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  };

  return (
    <ToolScreen title="JSON 格式化" desc="实时校验、格式化及美化复杂的 JSON 数据，便于阅读与调试。" icon={Braces} bg="bg-[#3f6751]" onClose={onClose}>
      <div className="flex flex-col gap-4 flex-1">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此粘贴 JSON 数据..."
          className="w-full h-40 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono text-[13px] resize-none"
        />
        <div className="flex justify-between items-center">
           <button onClick={format} className="bg-primary text-on-primary px-6 py-2 rounded-full text-label-md hover:bg-primary-container transition-colors active:scale-95 shadow-sm">
             格式化 JSON
           </button>
           {error && <span className="text-error text-[12px]">{error}</span>}
        </div>
        <div className="relative flex-1 min-h-[200px]">
          <textarea
            value={output}
            readOnly
            className="w-full h-full p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 outline-none font-mono text-[13px] resize-none text-on-surface"
          />
          {output && (
            <button className="absolute top-2 right-2 p-2 bg-surface text-on-surface rounded-lg shadow hover:bg-surface-variant">
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </ToolScreen>
  );
}

export function Base64Tool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="Base64 编解码" icon={ArrowRightLeft} bg="bg-[#4a7c59]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea placeholder="输入文本..." className="w-full h-32 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 font-mono text-[13px] resize-none"></textarea>
         <div className="flex gap-2">
           <button className="flex-1 bg-primary text-on-primary py-2 rounded-full text-label-md shadow-sm">编码 (Encode)</button>
           <button className="flex-1 bg-secondary text-on-secondary py-2 rounded-full text-label-md shadow-sm">解码 (Decode)</button>
         </div>
         <textarea readOnly placeholder="结果..." className="w-full h-32 p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 font-mono text-[13px] resize-none"></textarea>
      </div>
    </ToolScreen>
  );
}

export function PasswordGenerator({ onClose }: { onClose: () => void }) {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState('aB3!xD9@qP2#mZ7$');
  
  return (
    <ToolScreen title="密码生成" icon={Asterisk} bg="bg-[#c3cbb8]" onClose={onClose}>
      <div className="glass-card p-6 rounded-3xl flex items-center justify-between shadow-sm">
         <span className="font-mono text-[20px] text-on-surface tracking-widest">{password}</span>
         <div className="flex gap-2">
           <button className="p-2 bg-primary-container text-on-primary-container rounded-full"><Copy className="w-4 h-4"/></button>
           <button className="p-2 bg-surface-variant text-on-surface-variant rounded-full"><RefreshCw className="w-4 h-4"/></button>
         </div>
      </div>
      <div className="glass-card p-5 rounded-3xl space-y-4 shadow-sm mt-4">
        <h3 className="text-body-sm font-semibold text-on-surface">密码长度: {length}</h3>
        <input type="range" min="8" max="32" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-primary" />
        <div className="flex flex-col gap-3 mt-4">
           {['包含大写字母 (A-Z)', '包含小写字母 (a-z)', '包含数字 (0-9)', '包含特殊字符 (!@#$)'].map((label, i) => (
             <label key={i} className="flex items-center gap-3">
               <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded border-outline-variant" />
               <span className="text-body-sm text-on-surface-variant">{label}</span>
             </label>
           ))}
        </div>
      </div>
    </ToolScreen>
  );
}

export function IpQueryTool({ onClose }: { onClose: () => void }) {
  return (
    <ToolScreen title="IP 查询" desc="快速定位目标 IP 地址的地理位置、ISP 及相关网络详情。" icon={Globe} bg="bg-[#7ba98f]" onClose={onClose}>
        <div className="flex flex-col gap-4">
           <div className="relative w-full">
              <input type="text" placeholder="输入 IP 地址 (如 8.8.8.8)" className="w-full h-14 pl-4 pr-12 bg-surface-container border border-outline-variant/30 rounded-2xl outline-none focus:border-primary text-body-sm font-mono" defaultValue="8.8.8.8" />
              <button className="absolute right-2 top-2 h-10 w-10 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-sm"><Globe className="w-5 h-5"/></button>
           </div>
           
           <div className="glass-card rounded-[24px] p-2 mt-4 shadow-sm flex flex-col gap-[1px] bg-outline-variant/20 overflow-hidden">
              {[
                  { label: 'IP 地址', value: '8.8.8.8' },
                  { label: '地理位置', value: '美国 俄亥俄州' },
                  { label: '经纬度', value: '38.0000, -97.0000' },
                  { label: 'ISP', value: 'Google LLC' },
                  { label: 'AS 号码', value: 'AS15169' }
              ].map((item, i) => (
                  <div key={i} className={`bg-surface p-4 flex justify-between items-center ${i === 0 ? 'rounded-t-[22px]' : ''} ${i === 4 ? 'rounded-b-[22px]' : ''}`}>
                     <span className="text-body-sm text-on-surface-variant font-semibold w-24">{item.label}</span>
                     <span className="text-body-sm text-on-surface font-mono">{item.value}</span>
                  </div>
              ))}
           </div>
        </div>
    </ToolScreen>
  );
}
