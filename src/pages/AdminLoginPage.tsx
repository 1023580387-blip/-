import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [systemMessages, setSystemMessages] = useState<string[]>([]);
  const [inputMode, setInputMode] = useState<'username' | 'password' | null>(null);
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const messages = [
      '[SYSTEM] 哈夫克内网安全协议已启动。',
      '[SYSTEM] 加密通道已建立。',
      '[SYSTEM] 请输入管理员凭证。',
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setSystemMessages((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
        setInputMode('username');
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setInputMode('password');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setSystemMessages((prev) => [...prev, '[SYSTEM] 认证成功。正在进入档案库...']);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } else {
      setError('[ERROR] 认证失败。凭证无效。');
      setTimeout(() => {
        setError('');
        setPassword('');
        setInputMode('username');
        setUsername('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* Matrix rain background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-havoc-green font-mono text-xs"
              style={{ left: `${i * 5}%` }}
              initial={{ y: '-100%' }}
              animate={{ y: '100vh' }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j}>{String.fromCharCode(33 + Math.floor(Math.random() * 93))}</div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="w-full h-px bg-havoc-green/30"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="border border-havoc-green/30 bg-black/90 rounded p-8">
          <div className="flex items-center gap-3 mb-6">
            <TerminalIcon className="text-havoc-green" size={24} />
            <span className="font-mono text-havoc-green text-lg">
              HAVOC INTERNAL NETWORK
            </span>
          </div>

          <div className="font-mono text-sm space-y-2 mb-8">
            {systemMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-havoc-green/80"
              >
                {msg}
              </motion.div>
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-havoc-red font-mono text-sm mb-4"
            >
              {error}
            </motion.div>
          )}

          {inputMode === 'username' && (
            <form onSubmit={handleUsernameSubmit}>
              <label className="font-mono text-havoc-green text-sm mb-2 block">
                账号：
              </label>
              <input
                ref={inputRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-b border-havoc-green/50 text-havoc-green font-mono py-2 focus:outline-none focus:border-havoc-green"
                autoComplete="off"
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 border border-havoc-green/50 text-havoc-green font-mono text-sm hover:bg-havoc-green/10 transition-all"
              >
                确认
              </button>
            </form>
          )}

          {inputMode === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              <label className="font-mono text-havoc-green text-sm mb-2 block">
                密码：
              </label>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-havoc-green/50 text-havoc-green font-mono py-2 focus:outline-none focus:border-havoc-green"
                autoComplete="off"
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 border border-havoc-green/50 text-havoc-green font-mono text-sm hover:bg-havoc-green/10 transition-all"
              >
                登录
              </button>
            </form>
          )}

          {!inputMode && !error && (
            <div className="font-mono text-havoc-green/50 text-sm animate-pulse">
              正在初始化...
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
