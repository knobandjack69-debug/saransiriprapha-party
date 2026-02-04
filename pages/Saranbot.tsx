
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, ArrowRight, ShieldAlert, Sparkles, Trash2, CheckCircle2, Search, BrainCircuit, AlertCircle, RefreshCw, ZapOff } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Content, Language } from '../types';
import { CANDIDATES_DATA, POLICIES_DATA } from '../constants';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isFallback?: boolean;
}

interface SaranbotProps {
  content: Content;
}

export const Saranbot: React.FC<SaranbotProps> = ({ content }) => {
  const t = content.saranbotPage;
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const thinkingMessages = [
    "กำลังรวบรวมข้อมูล...",
    "วิเคราะห์นโยบาย...",
    "จัดเตรียมคำตอบ...",
    "ตรวจสอบความถูกต้อง..."
  ];

  // Check for API Key on mount
  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      setApiError("Missing API Key: ระบบไม่พบ API Key สำหรับเชื่อมต่อ AI");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, thinkingStep]);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      setThinkingStep(0);
      interval = window.setInterval(() => {
        setThinkingStep(prev => (prev + 1) % thinkingMessages.length);
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // --- LOCAL FALLBACK LOGIC ---
  const generateFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    const lang = Language.TH; // Default to TH for fallback logic
    const policies = POLICIES_DATA(lang);
    const candidates = CANDIDATES_DATA(lang);
    
    let response = "";
    const buttons = [];

    // 1. Keyword: Policy / นโยบาย
    if (q.includes("นโยบาย") || q.includes("policy") || q.includes("ทำอะไร") || q.includes("มีอะไรบ้าง")) {
      response += "### นโยบายหลักของพรรคศรัณศิริประภา\n\nเราเน้นการแก้ปัญหาที่เกิดขึ้นจริงด้วย 10 นโยบายหลักครับ:\n\n";
      policies.slice(0, 5).forEach(p => {
        response += `- **${p.title}**: ${p.summary}\n`;
      });
      response += `\nและยังมีนโยบายอื่นๆ อีกครับ เช่น ${policies[7].title} และ ${policies[9].title}`;
      buttons.push("[Button: ดูนโยบายทั้งหมด | /policies]");
    }
    // 2. Keyword: Candidate / ทีมงาน / หัวหน้า / ประธาน
    else if (q.includes("ทีมงาน") || q.includes("สมาชิก") || q.includes("ใคร") || q.includes("หัวหน้า") || q.includes("ประธาน") || q.includes("แชมป์")) {
        const prez = candidates.find(c => c.id === "1");
        response += `### ทีมงานพรรคศรัณศิริประภา\n\nนำทีมโดย **${prez?.name} (${prez?.nickname})** ผู้สมัครตำแหน่งประธานนักเรียนครับ\n\nวิสัยทัศน์: "${prez?.vision}"\n\nพร้อมด้วยคณะกรรมการนักเรียนที่มีความตั้งใจจริงอีก 9 ท่าน`;
        buttons.push("[Button: ดูโฉมหน้าทีมงาน | /candidates]");
    }
    // 3. Keyword: Contact / ติดต่อ / ร้องเรียน
    else if (q.includes("ติดต่อ") || q.includes("contact") || q.includes("ไอจี") || q.includes("ig") || q.includes("ร้องเรียน")) {
        response += "### ช่องทางการติดต่อ\n\nสามารถติดตามข่าวสารหรือส่งข้อความหาเราได้ที่:\n- Instagram: @sarun.siriprapha\n- TikTok: @sarun.siriprapha\n\nหรือมาหาเราได้ที่ห้ององค์การนักเรียน อาคาร 3 ชั้น 2 ครับ";
        buttons.push("[Button: ติดต่อเรา | /contact]");
    }
    // 4. Keyword: Why / ทำไม / ดีกว่า
    else if (q.includes("ทำไม") || q.includes("เลือก") || q.includes("ดีไหม")) {
        response += "### ทำไมต้องเบอร์ 3?\n\nเพราะเรา **No Drama เน้นแก้ปัญหา** ครับ เราไม่ขายฝัน แต่เราศึกษาปัญหาจริงในโรงเรียนและออกแบบนโยบายที่ทำได้จริง เช่น การแก้ปัญหาโรงอาหาร หรือพื้นที่ระบายความเครียด (No Drama Space) ครับ";
        buttons.push("[Button: อ่านพันธกิจของเรา | /about]");
    }
    // Default Fallback
    else {
        response += "ขออภัยครับ ขณะนี้มีผู้ใช้งานจำนวนมาก ระบบ AI จึงทำงานล่าช้า แต่ผมขอแนะนำข้อมูลเบื้องต้นดังนี้ครับ:\n\n- พรรคศรัณศิริประภา (เบอร์ 3)\n- สโลแกน: **No Drama เน้นแก้ปัญหา**\n\nคุณสามารถดูข้อมูลฉบับเต็มได้ที่เมนูด้านล่างครับ";
        buttons.push("[Button: ดูนโยบาย | /policies]");
        buttons.push("[Button: ดูผู้สมัคร | /candidates]");
    }

    if (buttons.length > 0) {
        response += "\n\n" + buttons.join(" ");
    }

    return response;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    // Reset API Error state visually, but keep logic ready to catch
    setApiError(null);

    const userMessage: Message = {
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key is missing from environment.");

      const ai = new GoogleGenAI({ apiKey });
      const history = messages.filter(m => !m.isFallback).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chatContext = [
        ...history,
        { role: 'user', parts: [{ text: text.trim() }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: chatContext as any,
        config: {
          systemInstruction: t.systemInstruction,
          temperature: 0.4,
          thinkingConfig: { thinkingBudget: 0 }
        },
      });

      if (!response.text) {
        throw new Error("Empty response from AI.");
      }

      const botMessage: Message = {
        role: 'bot',
        text: response.text,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Bot Error:', error);
      
      // --- HYBRID FALLBACK MECHANISM ---
      // If API fails (Quota, Rate Limit, Network), use local search
      const fallbackText = generateFallbackResponse(text.trim());
      
      const botMessage: Message = {
        role: 'bot',
        text: fallbackText,
        timestamp: new Date(),
        isFallback: true // Mark as fallback to show UI indicator
      };

      // Delay slightly to simulate processing
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        
        // Optional: Show a subtle toast or indicator that we are in offline mode
        if (error.message?.includes("429") || error.message?.includes("quota")) {
           setApiError("ระบบ AI มีผู้ใช้งานจำนวนมาก กำลังตอบด้วยระบบสำรอง (Offline Mode)");
        }
      }, 1000);

      // Return early so we don't trigger the finally block immediately inside the catch
      return; 
    } finally {
      // finally block will run if API succeeds, or if error is thrown before fallback logic (which shouldn't happen mostly)
      // If we used fallback, we handled setIsLoading inside setTimeout
      if (messages.length > 0 && !messages[messages.length - 1].isFallback) {
         setIsLoading(false);
      }
    }
    // Determine loading state if not handled in catch
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    setApiError(null);
  };

  const renderMessageContent = (text: string) => {
    const buttonRegex = /\[Button:\s*(.*?)\s*\|\s*(.*?)\s*\]/g;
    const buttons: { label: string; path: string }[] = [];
    let match;
    while ((match = buttonRegex.exec(text)) !== null) {
      buttons.push({ label: match[1], path: match[2] });
    }

    const cleanText = text.replace(buttonRegex, '');
    const lines = cleanText.split('\n');

    return (
      <div className="space-y-4">
        <div className="text-message-body space-y-3">
          {lines.map((line, i) => {
            if (line.startsWith('###')) {
              return <h3 key={i} className="text-lg font-serif font-bold text-party-rose mt-4 mb-2">{line.replace('###', '').trim()}</h3>;
            }
            if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
              const content = line.trim().substring(1).trim();
              return (
                <div key={i} className="flex gap-3 pl-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-party-rose mt-2 shrink-0"></div>
                  <p className="flex-1">{parseInlineStyles(content)}</p>
                </div>
              );
            }
            if (line.trim() === '') return <div key={i} className="h-2"></div>;
            return <p key={i} className="leading-relaxed">{parseInlineStyles(line)}</p>;
          })}
        </div>

        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-party-black/5">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => navigate(btn.path)}
                className="group flex items-center gap-2 px-5 py-2.5 bg-party-rose text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md hover:bg-party-rose-dark hover:-translate-y-0.5 transition-all active:scale-95"
              >
                {btn.label}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="font-bold text-orange-600 bg-orange-50 px-1 rounded">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-party-cream flex flex-col font-sans pt-20 overflow-hidden">
      {showDisclaimer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-party-black/50 backdrop-blur-md transition-all duration-500">
          <div className="bg-white rounded-[3rem] p-10 md:p-14 max-w-xl w-full shadow-2xl animate-[slideUp_0.5s_ease-out] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-party-rose/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="w-20 h-20 bg-party-rose/10 rounded-3xl flex items-center justify-center text-party-rose mb-8">
              <ShieldAlert size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-party-black mb-6">
              {t.disclaimerTitle}
            </h2>
            <div className="space-y-4 mb-10 text-party-black/60 leading-relaxed text-lg">
              <p>{t.disclaimerText}</p>
              <div className="flex gap-3 p-4 bg-party-beige/20 rounded-2xl border border-party-black/5">
                <Sparkles size={20} className="text-party-rose shrink-0 mt-1" />
                <p className="text-sm italic">"ระบบนี้ใช้เพื่อตอบคำถามเกี่ยวกับพรรคเบอร์ 3 เท่านั้น ข้อมูลอาจมีการคลาดเคลื่อนตามข้อจำกัดของระบบ AI"</p>
              </div>
            </div>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="w-full bg-party-rose hover:bg-party-rose-dark text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <CheckCircle2 size={20} />
              {t.acceptBtn}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col relative px-4 md:px-8">
        {/* Error Notification Banner - Adjusted for Fallback Notice */}
        {apiError && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-4 text-orange-800 shadow-sm animate-pulse">
            <ZapOff className="shrink-0" size={18} />
            <div className="flex-1 text-sm font-medium">{apiError}</div>
          </div>
        )}

        {messages.length === 0 && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center animate-[fadeIn_1s_ease-out]">
            <div className="mb-10 relative">
               <div className="absolute inset-0 bg-party-rose/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
               <div className="relative w-28 h-28 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center overflow-hidden border border-party-black/5 group hover:scale-105 transition-transform duration-500">
                 <img 
                    src="https://img5.pic.in.th/file/secure-sv1/4FE8F300-95F8-4D47-87E6-A9EB644494D2.jpeg" 
                    className="w-full h-full object-cover scale-150 transition-transform duration-700 group-hover:scale-[1.7]" 
                    alt="Saranbot"
                 />
                 <div className="absolute bottom-0 inset-x-0 h-1 bg-party-rose"></div>
               </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-party-black mb-4 tracking-tight">
              {t.welcome}
            </h1>
            <p className="text-party-black/40 text-lg md:text-xl max-w-lg mx-auto mb-16 leading-relaxed">
              {t.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl px-4">
              {t.starterQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="group flex items-center justify-between p-6 bg-white border border-party-black/5 rounded-3xl text-left hover:border-party-rose/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-party-rose/5 flex items-center justify-center text-party-rose group-hover:bg-party-rose group-hover:text-white transition-colors">
                      <Search size={18} />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-party-black/70 group-hover:text-party-black transition-colors">{q}</span>
                  </div>
                  <ArrowRight size={18} className="text-party-rose opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pt-8 pb-40 space-y-10 no-scrollbar px-2">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-4 md:gap-6 animate-[slideUp_0.4s_ease-out] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-lg transform hover:rotate-12 transition-transform ${
                m.role === 'user' 
                ? 'bg-party-cream border-party-black/10 text-party-black' 
                : 'bg-white border border-party-black/5 text-party-rose'
              }`}>
                {m.role === 'user' ? <User size={22} /> : <Bot size={22} />}
              </div>
              <div className={`max-w-[85%] md:max-w-[70%] p-6 md:p-8 rounded-[2rem] shadow-xl ${
                m.role === 'user' 
                ? 'bg-party-rose text-white rounded-tr-none' 
                : 'bg-white border border-party-black/5 text-party-black rounded-tl-none'
              }`}>
                {m.isFallback && (
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-50 p-2 rounded-lg inline-block">
                        <ZapOff size={12} />
                        Offline Mode
                    </div>
                )}
                {renderMessageContent(m.text)}
                <div className={`text-[10px] mt-6 font-black uppercase tracking-[0.2em] opacity-40 ${m.role === 'user' ? 'text-right' : ''}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {m.role === 'user' ? 'Member Voice' : 'Saran Bot Analysis'}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col gap-4 animate-[fadeIn_0.5s_ease-in]">
               <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-white border border-party-black/5 flex items-center justify-center text-party-rose shadow-lg animate-bounce">
                    <Bot size={22} />
                 </div>
                 <div className="flex flex-col gap-3">
                   <div className="bg-white border border-party-black/5 p-6 rounded-[2rem] rounded-tl-none shadow-md inline-block">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 bg-party-rose/40 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-party-rose/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2.5 h-2.5 bg-party-rose/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 px-4 py-2 bg-party-rose/5 rounded-full border border-party-rose/10 animate-pulse">
                      <BrainCircuit size={14} className="text-party-rose animate-spin-slow" />
                      <span className="text-xs font-bold text-party-rose tracking-wide uppercase">
                        {thinkingMessages[thinkingStep]}
                      </span>
                   </div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="absolute bottom-10 left-0 right-0 px-4 md:px-0">
          <div className="max-w-4xl mx-auto relative group">
            <div className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-party-black/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] flex items-center p-3 pl-8 transition-all duration-500 focus-within:ring-4 focus-within:ring-party-rose/10 focus-within:border-party-rose/40 focus-within:-translate-y-1">
              <input 
                type="text"
                placeholder={t.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1 bg-transparent border-none outline-none text-party-black font-medium text-base py-4 placeholder:text-party-black/20"
              />
              <div className="flex items-center gap-2 pr-2">
                <button 
                  onClick={clearChat}
                  className="w-10 h-10 rounded-2xl text-party-black/20 hover:text-party-rose hover:bg-party-rose/5 transition-all flex items-center justify-center"
                  title="Clear conversation"
                >
                  <Trash2 size={20} />
                </button>
                <button 
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-14 h-14 rounded-[1.5rem] bg-party-rose text-white flex items-center justify-center shadow-xl shadow-party-rose/20 hover:bg-party-rose-dark hover:scale-105 transition-all disabled:opacity-30 disabled:scale-95 active:scale-90"
                >
                  <Send size={24} className={isLoading ? 'animate-pulse' : ''} />
                </button>
              </div>
            </div>
            <p className="text-center mt-4 text-party-black/20 text-[10px] font-black uppercase tracking-[0.4em] pointer-events-none">
              Saran Bot AI • Powered by No Drama Spirit
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .text-message-body p {
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};
