import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Bot, User, MessageCircle, X, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';

interface GeminiCakeAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello! Warmest welcome to AYESHA BAKING HOUSE! 🧁 I'm Chef Ayesha's AI Cake Concierge. Our motto is 'Baked with Love, Made for You'. We provide ALL design cakes—from 3D sculpted car cakes to Sonic themes, royal Rasmalai, and decadent chocolate fudge. What sweet celebration are you planning today?",
    timestamp: 'Just now',
  },
];

const PROMPT_SUGGESTIONS = [
  "Cake for 5th birthday (Car or Sonic theme)",
  "How many pounds for 20 guests?",
  "Tell me about the Royal Rasmalai cake",
  "Chocolate Fudge Cake price & serving size",
];

export const GeminiCakeAdvisor: React.FC<GeminiCakeAdvisorProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userQuery: query.trim(),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "We would love to bake this for you! Please contact Chef Ayesha directly on WhatsApp at 03442302526 for immediate custom booking.";

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: "I'm having a little trouble connecting to the kitchen cloud, but Chef Ayesha is ready on WhatsApp! Message us directly at 03442302526 with your design or questions.",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl h-[85vh] max-h-[680px] bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#F5E6DF] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#4E342E] to-[#3E2723] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FCE7F3] to-[#FBCFE8] flex items-center justify-center text-[#BE185D]">
              <Sparkles className="w-5 h-5 text-[#BE185D]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-1.5">
                <span>Chef Ayesha's AI Concierge</span>
                <span className="text-[10px] bg-[#BE185D] text-white font-sans px-2 py-0.5 rounded-full font-semibold">
                  Gemini Powered
                </span>
              </h3>
              <p className="text-xs text-rose-200">
                Custom designs, flavor recommendations & instant order quotes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-2 text-rose-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-rose-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-[#FAF5EE] border-b border-[#EFE3DB] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-[#8D6E63] uppercase shrink-0">
            Ask:
          </span>
          {PROMPT_SUGGESTIONS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-white hover:bg-[#FCE7F3] text-[#5D4037] hover:text-[#BE185D] border border-[#E8D8CF] transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Messages Thread */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FFFDF9]">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs shadow-xs ${
                    isMe
                      ? 'bg-[#3E2723] text-white'
                      : 'bg-gradient-to-tr from-[#FCE7F3] to-[#FED7AA] text-[#BE185D]'
                  }`}
                >
                  {isMe ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[82%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      isMe
                        ? 'bg-[#3E2723] text-[#FFF8F0] rounded-tr-none'
                        : 'bg-white text-[#3E2723] border border-[#F0DFD5] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#A88B7D] px-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white border border-[#F0DFD5] rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-[#6E4F42]">
                <Loader2 className="w-4 h-4 animate-spin text-[#BE185D]" />
                <span>Chef Ayesha's AI is whisking ideas...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & WhatsApp Direct Action */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#F5E6DF] space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your theme, guests, or cake questions..."
              className="flex-1 px-4 py-2.5 rounded-2xl border border-[#EAD8CE] focus:outline-none focus:ring-2 focus:ring-[#BE185D] text-xs sm:text-sm text-[#3E2723] bg-[#FFFDF9]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 rounded-2xl bg-[#BE185D] hover:bg-[#9D174D] disabled:opacity-50 text-white transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-[#8D6E63] pt-1">
            <span>Ready to book directly?</span>
            <a
              href={createWhatsAppUrl("Hello Chef Ayesha! I was using your AI Assistant and want to place a custom cake order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#15803D] hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp {WHATSAPP_NUMBER}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
