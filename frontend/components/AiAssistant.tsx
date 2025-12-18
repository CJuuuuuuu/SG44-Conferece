import { AI_SYSTEM_INSTRUCTION } from "@/lib/constants";
import { ChatMessage } from "@/lib/types";
import { GoogleGenAI } from "@google/genai";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "您好！我是 SG44 研討會的 AI 助理。有關議程、徵稿主題、時程或報名問題，我都能為您解答！",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          { role: "user", parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply =
        response.text ||
        "抱歉，我暫時無法回覆。請稍後再試，或直接聯繫大會秘書處。";
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "系統目前連線不穩定，請檢查您的網路或稍後再試。",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#485649] px-5 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-[#5F7161] rounded-lg border border-[#869D85]">
                <Sparkles className="w-4 h-4 text-[#B5C4B1]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">
                  SG44 AI 智慧助理
                </h3>
                <p className="text-[10px] text-stone-400 font-medium">
                  Online & Ready to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#5F7161] text-white rounded-br-none shadow-md"
                      : "bg-white border border-stone-200 text-stone-700 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#5F7161]" />
                  <span className="text-xs text-stone-400 font-medium">
                    智慧助理正在思考...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="flex gap-2 items-center bg-[#F0F4F1] p-1.5 rounded-xl border border-stone-200 focus-within:border-[#5F7161] transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="輸入您的問題..."
                className="flex-1 px-3 py-2 bg-transparent border-none text-sm focus:outline-none text-stone-800"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2.5 bg-[#5F7161] text-white rounded-lg hover:bg-[#4a584b] disabled:opacity-30 disabled:grayscale transition-all shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-stone-400 mt-2 font-medium">
              Powered by Gemini AI - Response may vary
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#B5C4B1]/50 ${
          isOpen
            ? "bg-white text-stone-800 border border-stone-200"
            : "bg-[#5F7161] text-white"
        }`}
      >
        {isOpen ? (
          <X size={32} />
        ) : (
          <div className="relative">
            <MessageCircle size={32} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#5F7161] rounded-full"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AiAssistant;
