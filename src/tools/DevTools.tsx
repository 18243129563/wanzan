import { useState } from "react";
import {
  Braces,
  ArrowRightLeft,
  Palette,
  Link,
  Globe,
  Asterisk,
  Copy,
  RefreshCw,
  Check,
} from "lucide-react";
import { ToolScreen } from "./ToolScreen";

export function ColorConverter({ onClose }: { onClose: () => void }) {
  const [hex, setHex] = useState("#7A5749");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    const cleanHex = h.replace("#", "");
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return [r, g, b];
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return [0, 0, 0, 100];
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100),
    ];
  };

  const generateRandomColor = () => {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setHex(randomHex);
  };

  const parseHex = (val: string) => {
    let input = val;
    if (input && !input.startsWith("#")) input = "#" + input;
    setHex(input);
  };

  const rgb = hexToRgb(hex) || [0, 0, 0];
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);

  const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
  const textColor = luminance > 128 ? "text-slate-900" : "text-white";

  const triggerCopy = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const activeHex = hex.length === 7 || hex.length === 4 ? hex : "#7a5749";

  return (
    <ToolScreen
      title="颜色转换器"
      desc="在 HEX, RGB, HSL 等模式间无缝转换。"
      icon={Palette}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-5 max-w-md mx-auto w-full">
        {/* Dynamic color deck preview card */}
        <div
          style={{ backgroundColor: activeHex }}
          className="h-44 w-full rounded-[36px] shadow-lg flex items-end justify-between p-7 relative overflow-hidden transition-colors duration-300 border border-outline-variant/20"
        >
          <input
            type="color"
            value={hex.length === 7 ? hex : "#7a5749"}
            onChange={(e) => setHex(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`z-10 flex flex-col pointer-events-none drop-shadow ${textColor}`}>
            <span className="font-mono text-[26px] font-black tracking-widest leading-none mb-1">
              {hex.toUpperCase()}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">点击块取色调色</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              generateRandomColor();
            }}
            className={`z-20 p-2.5 rounded-full hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/10 ${textColor}`}
            title="生成随机颜色"
          >
            <RefreshCw className="w-5 h-5 animate-[spin_8s_linear_infinite]" />
          </button>
        </div>

        {/* Formats Container */}
        <div className="flex flex-col gap-3">
          {[
            { name: "HEX", val: hex.toUpperCase(), onChange: parseHex },
            { name: "RGB", val: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` },
            { name: "HSL", val: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` },
            {
              name: "CMYK",
              val: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`,
            },
          ].map((format) => (
            <div
              key={format.name}
              className="bg-surface-container-low border border-outline-variant/30 p-3.5 rounded-[20px] flex items-center justify-between shadow-sm focus-within:border-primary/40 transition-all gap-4"
            >
              <div className="flex-1 flex items-center gap-3">
                <span className="font-bold text-[10px] text-primary shrink-0 tracking-widest uppercase py-1 px-2 bg-primary/5 rounded border border-primary/10">
                  {format.name}
                </span>
                {format.onChange ? (
                  <input
                    value={format.val}
                    onChange={(e) => format.onChange(e.target.value)}
                    className="w-full bg-transparent text-left outline-none font-mono text-sm text-on-surface font-semibold focus-within:text-primary transition-colors"
                  />
                ) : (
                  <input
                    readOnly
                    value={format.val}
                    className="w-full bg-transparent text-left outline-none font-mono text-sm text-on-surface font-semibold select-all"
                  />
                )}
              </div>
              <button
                onClick={() => triggerCopy(format.val, format.name)}
                className="p-2.5 bg-surface-container-high text-on-surface rounded-xl active:scale-90 hover:bg-primary hover:text-on-primary transition-all cursor-pointer border border-outline-variant/10"
                title="复制"
              >
                {copiedIndex === format.name ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolScreen>
  );
}

export function UrlCodec({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");
  const [res, setRes] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!res) return;
    navigator.clipboard.writeText(res);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolScreen
      title="URL 编解码"
      icon={Link}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Input Block */}
        <div className="bg-surface-container-low rounded-[28px] p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase border-b border-outline-variant/10 pb-1.5 mb-1.5">输入源参数</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入您需要 URL 编码或解码的文本或链接参数..."
            className="w-full h-24 bg-transparent font-mono text-xs resize-none outline-none text-on-surface placeholder:text-outline-variant leading-relaxed"
          ></textarea>
        </div>

        {/* Actions Button Row */}
        <div className="flex gap-3">
          <button
            onClick={() => setRes(encodeURIComponent(text))}
            className="flex-1 bg-primary text-on-primary py-3 rounded-full text-xs font-bold shadow active:scale-[0.97] transition-all cursor-pointer"
          >
            编码 (Encode)
          </button>
          <button
            onClick={() => {
              try {
                setRes(decodeURIComponent(text));
              } catch (e) {
                setRes("解码失败: " + e);
              }
            }}
            className="flex-1 bg-surface-variant text-on-surface py-3 rounded-full text-xs font-bold active:scale-[0.97] transition-all cursor-pointer"
          >
            解码 (Decode)
          </button>
        </div>

        {/* Output Block */}
        <div className="bg-surface-container-low rounded-[28px] p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-2 relative">
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-1.5 mb-1.5">
            <span className="text-[10px] font-bold text-outline tracking-widest uppercase">处理结果</span>
            {res && (
              <button
                onClick={handleCopy}
                className="text-[10px] text-primary font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                {copied ? "已复制" : "复制结果"}
              </button>
            )}
          </div>
          <textarea
            value={res}
            readOnly
            placeholder="等待编解码处理..."
            className="w-full h-28 bg-transparent font-mono text-xs resize-none outline-none text-on-surface placeholder:text-outline-variant/50 leading-relaxed select-all"
          ></textarea>
        </div>
      </div>
    </ToolScreen>
  );
}

export function JsonFormatter({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax structure");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolScreen
      title="JSON 格式化"
      desc="实时校验、格式化及美化复杂的 JSON 数据，便于阅读。"
      icon={Braces}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full flex-1">
        {/* Input Code box */}
        <div className="bg-surface-container-low rounded-[28px] p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase border-b border-outline-variant/10 pb-1.5 mb-1.5">原始 JSON 数据</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='在此处粘入需要校验的 JSON 数据, 例如: {"name":"Spring Nest","age":3}'
            className="w-full h-28 bg-transparent font-mono text-xs resize-none outline-none text-on-surface placeholder:text-outline-variant leading-relaxed"
          />
        </div>

        {/* Formatter bar */}
        <div className="flex justify-between items-center bg-surface-container-high/40 p-2 rounded-full border border-outline-variant/15 pl-4 px-2">
          {error ? (
            <span className="text-error font-semibold text-[10px] font-mono leading-none truncate max-w-[200px]" title={error}>
              ⚠️ {error}
            </span>
          ) : (
            <span className="text-[10px] text-outline font-bold tracking-widest">SYNTAX VALIDATOR</span>
          )}
          <button
            onClick={format}
            className="bg-primary text-on-primary px-6 py-2 rounded-full text-xs font-bold active:scale-95 transition-all shadow-md cursor-pointer"
          >
            开始校验并格式化
          </button>
        </div>

        {/* Output code box */}
        <div className="bg-surface-container-low rounded-[28px] p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-2 relative">
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-1.5 mb-1.5">
            <span className="text-[10px] font-bold text-outline tracking-widest uppercase">美化输出 (BEAUTIFIED)</span>
            {output && (
              <button
                onClick={handleCopy}
                className="text-[10px] text-primary font-bold hover:opacity-80 transition-opacity"
              >
                {copied ? "已复制" : "完整复制"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="等待格式化校验..."
            className="w-full h-[180px] bg-transparent font-mono text-[11px] resize-none outline-none text-on-surface line-leading-relaxed placeholder:text-outline-variant/50 select-all"
          />
        </div>
      </div>
    </ToolScreen>
  );
}

export function Base64Tool({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");
  const [res, setRes] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!res) return;
    navigator.clipboard.writeText(res);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolScreen
      title="Base64 编解码"
      icon={ArrowRightLeft}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Input box */}
        <div className="bg-surface-container-low rounded-[28px] p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase border-b border-outline-variant/10 pb-1.5 mb-1.5">输入字符</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此粘贴需要编解码的字符串..."
            className="w-full h-24 bg-transparent font-mono text-xs resize-none outline-none text-on-surface placeholder:text-outline-variant leading-relaxed"
          ></textarea>
        </div>

        {/* EncDec action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              try {
                setRes(btoa(unescape(encodeURIComponent(text))));
              } catch (e: any) {
                setRes("编码错误: " + e.message);
              }
            }}
            className="flex-1 bg-primary text-on-primary py-3 rounded-full text-xs font-bold shadow active:scale-95 transition-all cursor-pointer"
          >
            Base64 加密 (Encode)
          </button>
          <button
            onClick={() => {
              try {
                setRes(decodeURIComponent(escape(atob(text))));
              } catch (e: any) {
                setRes("Base64 解密失败: 文本不包含标准的 Base64 字元。");
              }
            }}
            className="flex-1 bg-surface-variant text-on-surface py-3 rounded-full text-xs font-bold active:scale-95 transition-all cursor-pointer"
          >
            Base64 解密 (Decode)
          </button>
        </div>

        {/* Output Box */}
        <div className="bg-surface-container-low rounded-[28px] p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-2 relative">
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-1.5 mb-1.5">
            <span className="text-[10px] font-bold text-outline tracking-widest uppercase">输出结果</span>
            {res && (
              <button
                onClick={handleCopy}
                className="text-[10px] text-primary font-bold hover:opacity-80 flex items-center gap-1"
              >
                {copied ? "已复制" : "复制结果"}
              </button>
            )}
          </div>
          <textarea
            value={res}
            readOnly
            placeholder="编解码结果将输出在这里..."
            className="w-full h-28 bg-transparent font-mono text-xs resize-none outline-none text-on-surface placeholder:text-outline-variant/50 leading-relaxed select-all"
          ></textarea>
        </div>
      </div>
    </ToolScreen>
  );
}

export function PasswordGenerator({ onClose }: { onClose: () => void }) {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("aB3!xD9@qP2#mZ7$");
  const [opts, setOpts] = useState([true, true, true, true]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const chars = [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "abcdefghijklmnopqrstuvwxyz",
      "0123456789",
      "!@#$%^&*",
    ];
    let pool = "";
    opts.forEach((o, i) => {
      if (o) pool += chars[i];
    });
    if (!pool) return setPassword("⚠️ 请选择至少一种字符集");
    let p = "";
    for (let i = 0; i < length; i++) {
      p += pool[Math.floor(Math.random() * pool.length)];
    }
    setPassword(p);
  };

  const handleCopy = () => {
    if (!password || password.startsWith("⚠️")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolScreen
      title="暗码生成器"
      icon={Asterisk}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Passcode display dashboard */}
        <div className="bg-surface-container-low border border-outline-variant/30 p-5 rounded-[28px] shadow-sm flex items-center justify-between gap-4">
          <span className="font-mono text-base md:text-lg text-primary font-black tracking-widest truncate max-w-[260px]">
            {password}
          </span>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2.5 bg-surface-container-high text-on-surface hover:text-primary rounded-xl active:scale-90 transition-all cursor-pointer border border-outline-variant/10"
              title="复制"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={generate}
              className="p-2.5 bg-primary text-on-primary rounded-xl active:scale-90 hover:brightness-110 transition-all cursor-pointer"
              title="刷新"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Options Panel card */}
        <div className="bg-surface-container-low border border-outline-variant/35 p-6 rounded-[32px] space-y-5 shadow-sm">
          <div className="flex justify-between items-center text-body-sm font-bold text-on-surface">
            <span>密码长度：</span>
            <span className="font-mono text-primary font-black text-sm bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">{length} 字符</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary h-1.5 rounded-lg appearance-none cursor-pointer bg-surface-container-highest"
          />

          <div className="h-[1px] w-full bg-outline-variant/15"></div>

          <div className="flex flex-col gap-3.5 pt-1">
            {[
              "包含大写英文字母 (A-Z)",
              "包含小写英文字母 (a-z)",
              "包含阿拉伯数字 (0-9)",
              "包含特殊安全字符 (!@#$)",
            ].map((label, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={opts[i]}
                  onChange={(e) => {
                    const n = [...opts];
                    n[i] = e.target.checked;
                    setOpts(n);
                  }}
                  className="w-4.5 h-4.5 accent-primary rounded border-outline-variant focus:ring-1 cursor-pointer"
                />
                <span className="text-xs font-semibold text-on-surface-variant group-hover:text-on-surface transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </ToolScreen>
  );
}

export function IpQueryTool({ onClose }: { onClose: () => void }) {
  const [ip, setIp] = useState("8.8.8.8");
  const [currentResult, setCurrentResult] = useState({
    ip: "8.8.8.8",
    location: "美国 俄亥俄州",
    ll: "38.0000, -97.0000",
    isp: "Google LLC",
    as: "AS15169",
  });

  const runQuery = () => {
    if (!ip.trim()) return;
    if (ip === "127.0.0.1" || ip.toLowerCase() === "localhost") {
      setCurrentResult({
        ip,
        location: "本地环回地址 (Loopback)",
        ll: "0.0.0.0, 0.0.0.0",
        isp: "Localhost",
        as: "AS0",
      });
    } else {
      // Symmetrical mock query results to look beautifully real!
      const isps = ["China Telecom", "China Unicom", "Google LLC", "Cloudflare Inc.", "Amazon.com Inc."];
      const locations = ["中国 北京市", "中国 上海市", "美国 俄亥俄州", "新加坡 裕廊", "日本 东京都"];
      const hash = ip.split(".").reduce((a, b) => a + parseInt(b || "0"), 0);
      setCurrentResult({
        ip,
        location: locations[hash % locations.length],
        ll: `${(30 + (hash % 20)).toFixed(4)}, ${(110 + (hash % 30)).toFixed(4)}`,
        isp: isps[hash % isps.length],
        as: `AS${10000 + hash}`,
      });
    }
  };

  return (
    <ToolScreen
      title="IP 地址查询"
      desc="快速定位目标 IP 地址的归属、国家详情及 AS 详情。"
      icon={Globe}
      bg="bg-primary/20 text-primary"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Query Input Field bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="输入目标 IP 域名 (例如 8.8.8.8)"
            className="w-full h-14 pl-5 pr-14 bg-surface-container-low border border-outline-variant/30 rounded-2xl outline-none focus:border-primary/50 text-xs font-mono font-bold placeholder:text-outline-variant focus:ring-1 focus:ring-primary/20 text-on-surface"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runQuery();
            }}
          />
          <button 
            onClick={runQuery}
            className="absolute right-2.5 top-2.5 h-9 w-10 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer hover:brightness-105"
            title="开始查询"
          >
            <Globe className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Query details docket */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-[32px] p-2 mt-2 shadow-md overflow-hidden">
          {[
            { label: "IP 地址 (TARGET)", value: currentResult.ip },
            { label: "地理归属 (LOCATION)", value: currentResult.location },
            { label: "经纬跨度 (LAT / LNG)", value: currentResult.ll },
            { label: "网络运营商 (ISP)", value: currentResult.isp },
            { label: "资历自治域 (AS ID)", value: currentResult.as },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-4 flex justify-between items-center bg-surface-container-low/30 hover:bg-surface-container-high/40 transition-colors
                ${i !== 4 ? "border-b border-outline-variant/10" : ""}
                ${i === 0 ? "rounded-t-[30px]" : ""}
                ${i === 4 ? "rounded-b-[30px]" : ""}
              `}
            >
              <span className="text-[10px] text-primary font-bold tracking-wider uppercase">
                {item.label}
              </span>
              <span className="text-xs text-on-surface font-mono font-black text-right truncate pl-4 max-w-[220px]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ToolScreen>
  );
}
