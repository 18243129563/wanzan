import { useState } from 'react';
import { Braces, ArrowRightLeft, Palette, Link, Globe, Asterisk, Copy, RefreshCw } from 'lucide-react';
import { ToolScreen } from './ToolScreen';

export function ColorConverter({ onClose }: { onClose: () => void }) {
  const [hex, setHex] = useState('#7A5749');

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return [r, g, b];
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return [0, 0, 0, 100];
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
  };

  const rgb = hexToRgb(hex) || [0,0,0];
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);

  return (
    <ToolScreen title="颜色转换器" desc="在 HEX, RGB, HSL 等模式间无缝转换。" icon={Palette} bg="bg-[#7a5749]" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div style={{backgroundColor: hex}} className="h-32 w-full rounded-2xl shadow-inner mb-2 flex items-end justify-between p-4 relative overflow-hidden">
           <input type="color" value={hex} onChange={e=>setHex(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
           <span className="text-white font-mono text-lg font-bold drop-shadow-md z-10 pointer-events-none">{hex.toUpperCase()}</span>
           <span className="text-white/80 text-sm font-medium z-10 pointer-events-none">点击更换颜色</span>
        </div>
        
        {[
          { name: 'HEX', val: hex.toUpperCase() },
          { name: 'RGB', val: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` },
          { name: 'HSL', val: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` },
          { name: 'CMYK', val: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)` }
        ].map((format) => (
          <div key={format.name} className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <span className="font-semibold text-body-sm text-on-surface w-12">{format.name}</span>
            <input 
              readOnly 
              value={format.val} 
              className="flex-1 bg-transparent text-right outline-none font-mono text-sm text-on-surface-variant font-medium" 
            />
            <button onClick={() => navigator.clipboard.writeText(format.val)} className="ml-4 p-2 bg-surface-variant text-on-surface rounded-full active:scale-90 transition-transform"><Copy className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </ToolScreen>
  );
}

export function UrlCodec({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [res, setRes] = useState('');

  return (
    <ToolScreen title="URL 编解码" icon={Link} bg="bg-[#b8baa8]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="输入需处理的链接或参数..." className="w-full h-32 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 font-mono text-[13px] resize-none outline-none"></textarea>
         <div className="flex gap-2">
           <button onClick={() => setRes(encodeURIComponent(text))} className="flex-1 bg-primary-container text-on-primary-container py-2 rounded-full text-label-md shadow-sm active:scale-95 transition-transform">编码 (Encode)</button>
           <button onClick={() => {try{setRes(decodeURIComponent(text))}catch(e){setRes('解码失败: ' + e)}}} className="flex-1 bg-surface-variant text-on-surface py-2 rounded-full text-label-md shadow-sm active:scale-95 transition-transform">解码 (Decode)</button>
         </div>
         <textarea value={res} readOnly className="w-full h-32 p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 font-mono text-[13px] resize-none outline-none"></textarea>
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
            <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 p-2 bg-surface text-on-surface rounded-lg shadow hover:bg-surface-variant">
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </ToolScreen>
  );
}

export function Base64Tool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [res, setRes] = useState('');

  return (
    <ToolScreen title="Base64 编解码" icon={ArrowRightLeft} bg="bg-[#4a7c59]" onClose={onClose}>
      <div className="flex flex-col gap-4">
         <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="输入文本..." className="w-full h-32 p-4 rounded-2xl bg-surface-container border border-outline-variant/30 font-mono text-[13px] resize-none outline-none"></textarea>
         <div className="flex gap-2">
           <button onClick={() => setRes(btoa(unescape(encodeURIComponent(text))))} className="flex-1 bg-primary text-on-primary py-2 rounded-full text-label-md shadow-sm active:scale-95 transition-transform">编码 (Encode)</button>
           <button onClick={() => {try{setRes(decodeURIComponent(escape(atob(text))))}catch(e){setRes('解码失败: '+e)}}} className="flex-1 bg-secondary text-on-secondary py-2 rounded-full text-label-md shadow-sm active:scale-95 transition-transform">解码 (Decode)</button>
         </div>
         <textarea value={res} readOnly placeholder="结果..." className="w-full h-32 p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 font-mono text-[13px] resize-none outline-none"></textarea>
      </div>
    </ToolScreen>
  );
}

export function PasswordGenerator({ onClose }: { onClose: () => void }) {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState('aB3!xD9@qP2#mZ7$');
  const [opts, setOpts] = useState([true, true, true, true]);
  
  const generate = () => {
    const chars = [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'abcdefghijklmnopqrstuvwxyz',
      '0123456789',
      '!@#$%^&*'
    ];
    let pool = '';
    opts.forEach((o, i) => { if(o) pool += chars[i]; });
    if (!pool) return setPassword('');
    let p = '';
    for(let i=0; i<length; i++) p += pool[Math.floor(Math.random() * pool.length)];
    setPassword(p);
  };
  
  return (
    <ToolScreen title="密码生成" icon={Asterisk} bg="bg-[#c3cbb8]" onClose={onClose}>
      <div className="glass-card p-6 rounded-3xl flex items-center justify-between shadow-sm">
         <span className="font-mono text-[20px] text-on-surface tracking-widest">{password}</span>
         <div className="flex gap-2">
           <button onClick={() => navigator.clipboard.writeText(password)} className="p-2 bg-primary-container text-on-primary-container rounded-full active:scale-90 transition-transform"><Copy className="w-4 h-4"/></button>
           <button onClick={generate} className="p-2 bg-surface-variant text-on-surface-variant rounded-full active:scale-90 transition-transform"><RefreshCw className="w-4 h-4"/></button>
         </div>
      </div>
      <div className="glass-card p-5 rounded-3xl space-y-4 shadow-sm mt-4">
        <h3 className="text-body-sm font-semibold text-on-surface">密码长度: {length}</h3>
        <input type="range" min="8" max="32" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-primary" />
        <div className="flex flex-col gap-3 mt-4">
           {['包含大写字母 (A-Z)', '包含小写字母 (a-z)', '包含数字 (0-9)', '包含特殊字符 (!@#$)'].map((label, i) => (
             <label key={i} className="flex items-center gap-3 cursor-pointer">
               <input type="checkbox" checked={opts[i]} onChange={e => {
                  const n = [...opts]; n[i] = e.target.checked; setOpts(n);
               }} className="w-5 h-5 accent-primary rounded border-outline-variant" />
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
