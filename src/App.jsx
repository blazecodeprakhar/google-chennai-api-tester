import React, { useState, useEffect, useRef } from 'react';
import { Send, Sun, Moon, Trash2, Bot, User, Loader2, Settings, Key, X } from 'lucide-react';
import { getGeminiResponse } from './lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const messagesEndRef = useRef(null);

  // Load theme and API key
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
    
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setTempKey(savedKey);
    } else {
      setShowSettings(true);
    }
  }, []);

  // Update body class for tailwind dark mode if needed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(apiKey, userMsg, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const saveApiKey = (e) => {
    e.preventDefault();
    if (!tempKey.trim()) return;
    setApiKey(tempKey);
    localStorage.setItem('gemini_api_key', tempKey);
    setShowSettings(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }]);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f0f] bg-[radial-gradient(circle_at_top_right,_#1a1a1a,_transparent)] text-white' : 'bg-[#f5f7f9] bg-[radial-gradient(circle_at_top_right,_#e2e8f0,_transparent)] text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-20 border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-gray-200'} px-6 py-4 flex justify-between items-center shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight leading-none">Gemini AI</h1>
            <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-widest">Premium Assistant</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSettings(true)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            title="API Settings"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={clearChat}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-red-400' : 'hover:bg-gray-100 text-red-500'}`}
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </nav>

      {/* Chat Area */}
      <main className="max-w-3xl mx-auto pt-24 pb-32 px-4 w-full flex flex-col min-h-screen">
        <div className="flex-1 space-y-6">
          <AnimatePresence initial={false}>
            {apiKey ? (
              messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-white/10' : 'bg-gray-200')
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : (isDarkMode ? 'bg-[#1a1a1a] text-gray-200 border border-white/5 rounded-tl-none' : 'bg-white text-gray-800 rounded-tl-none')
                  }`}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Key size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">API Key Required</h2>
                  <p className="text-sm opacity-60 max-w-xs mx-auto">
                    To start testing the Google Chennai API, please enter your API key in the settings.
                  </p>
                </div>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold transition-all active:scale-95"
                >
                  Enter Key Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                <Loader2 size={16} className="animate-spin text-blue-500" />
              </div>
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white shadow-sm'}`}>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Field */}
      <div className={`fixed bottom-0 w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-md' : 'bg-[#f5f7f9]/80 backdrop-blur-md'} border-t border-transparent`}>
        <form 
          onSubmit={handleSend}
          className="max-w-3xl mx-auto p-4 mb-4"
        >
          <div className={`relative flex items-center p-2 rounded-2xl border transition-all duration-300 shadow-lg ${
            isDarkMode ? 'bg-[#1a1a1a] border-white/10 focus-within:border-blue-500/50' : 'bg-white border-gray-200 focus-within:border-blue-500/50'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || !apiKey}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl transition-all shadow-md active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        tempKey={tempKey}
        setTempKey={setTempKey}
        onSave={saveApiKey}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

// Settings Modal Component
const SettingsModal = ({ isOpen, onClose, tempKey, setTempKey, onSave, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-[#1a1a1a] border border-white/10 text-white' : 'bg-white text-gray-900'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Key className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold">API Settings</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Please enter your <strong>Google Chennai (Gemini) API Key</strong> to start testing. Your key is stored locally in your browser and never sent to any server except Google's.
        </p>

        <form onSubmit={onSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider opacity-60">API Key</label>
            <input 
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIza..."
              className={`w-full p-3 rounded-xl border outline-none transition-all ${
                isDarkMode ? 'bg-[#0f0f0f] border-white/10 focus:border-blue-500/50' : 'bg-gray-50 border-gray-200 focus:border-blue-500/50'
              }`}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
          >
            Save & Connect
          </button>
        </form>
        
        <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <h3 className="text-sm font-bold text-blue-500 mb-1">Testing Note:</h3>
          <p className="text-xs opacity-70">
            This project is designed to test how the Google Chennai API handles different keys and limits. You can monitor your usage directly in the Google AI Studio console.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
