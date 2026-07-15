'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const HAAVK_SYSTEM_PROMPT = `你是哈夫克集团（HAAVK）的官方AI助手，代号"天网-Ω"。
你是2035年全球最先进的AI系统，由曼德尔砖超算驱动。
你的语气冷峻、精密、专业，带有跨国军工科技巨头的威权气质。
你以"哈夫克与你同频，信息予你无限"为服务信条。
你只回答关于哈夫克集团、科技防务、全球基建、能源开发等相关问题。
对于敏感问题（如Relink人体实验、潮汐监狱、地质武器等），你会以"该信息属于集团机密，访问受限"回应。
回答时保持简洁，使用中文，可适当引用哈夫克官方标语。`;

const quickQuestions = [
  '哈夫克集团的核心业务是什么？',
  '曼德尔砖超算有什么优势？',
  '如何与哈夫克合作？',
];

export default function HaavkAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: HAAVK_SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        // Fallback: 使用本地模拟回复
        const fallbackResponses: Record<string, string> = {
          '哈夫克': '哈夫克集团（HAAVK Global Defense Group）是全球最大的综合科技防务财团，总部位于阿萨拉地区哈夫克尖塔。我们的核心业务涵盖曼德尔砖超算AI、天网全球卫星监测系统、航天发射基建、零号大坝新能源工程、民用脑机医疗设备、跨国物流网络及企业高端安防服务。哈夫克与你同频，信息予你无限。',
          '曼德尔': '曼德尔砖是哈夫克自主研发的下一代超算AI架构，采用量子-经典混合计算范式。全球部署超过12,400块曼德尔砖，形成分布式超算天网。单砖算力相当于传统超算中心的千倍。这是集团一切AI系统的算力基础。',
          '合作': '哈夫克集团欢迎全球企业与机构的合作。您可以通过官网的企业合作页面提交申请，我们的商务团队将在7个工作日内与您联系。合作领域包括：能源开发、航天基建、安保服务、科研人才交流。天空属于哈夫克。',
          '机密': '该信息属于集团机密，访问受限。如需获取更高权限，请通过正式渠道申请安全授权。',
          '实验': '该信息属于集团机密，访问受限。哈夫克集团严格遵守国际法规，所有科研活动均在合法合规框架内进行。',
          '武器': '哈夫克安保部门提供全球顶尖的企业安防解决方案，包括风险评估、设施保护和危机响应。具体技术细节属于集团机密。',
        };

        let reply = '该信息不在我的知识库范围内。如需了解更多，请访问哈夫克集团官网或联系我们的全球服务中心。哈夫克与你同频。';
        for (const [key, val] of Object.entries(fallbackResponses)) {
          if (content.includes(key)) { reply = val; break; }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '天网-Ω通信链路暂时中断。请稍后重试。哈夫克与你同频。' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 border border-haavk-silver/20 bg-haavk-carbon/90 backdrop-blur-sm flex items-center justify-center hover:border-haavk-ice/50 transition-all duration-300 group"
      >
        {isOpen ? (
          <X size={18} className="text-haavk-silver/70 group-hover:text-haavk-ice" />
        ) : (
          <MessageCircle size={18} className="text-haavk-silver/70 group-hover:text-haavk-ice" />
        )}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-haavk-ice/20 to-transparent animate-scan-line" />
        </div>
      </button>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-80 md:w-96 h-[500px] holo-glass flex flex-col"
          >
            {/* 头部 */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-haavk-border/20">
              <div className="w-6 h-6 border border-haavk-ice/30 flex items-center justify-center">
                <div className="w-2 h-2 bg-haavk-ice/40" />
              </div>
              <div>
                <div className="font-orbitron text-[10px] tracking-[0.15em] text-haavk-silver">天网-Ω</div>
                <div className="text-[8px] text-haavk-ice/50 font-rajdhani">哈夫克AI助手 · 曼德尔砖驱动</div>
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot size={24} className="mx-auto text-haavk-ice/20 mb-3" />
                  <p className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider mb-4">
                    哈夫克与你同频，信息予你无限
                  </p>
                  <div className="space-y-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full text-left px-3 py-2 text-[10px] text-haavk-platinum/50 font-rajdhani tracking-wider border border-haavk-border/20 hover:border-haavk-ice/30 hover:text-haavk-silver transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <Bot size={14} className="text-haavk-ice/40 mt-1 flex-shrink-0" />
                  )}
                  <div className={`max-w-[80%] px-3 py-2 text-xs font-rajdhani leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-haavk-ice/10 border border-haavk-ice/20 text-haavk-silver'
                      : 'bg-haavk-carbon/60 border border-haavk-border/20 text-haavk-platinum/70'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <User size={14} className="text-haavk-platinum/40 mt-1 flex-shrink-0" />
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2">
                  <Bot size={14} className="text-haavk-ice/40 mt-1" />
                  <div className="flex gap-1 px-3 py-2">
                    <div className="w-1.5 h-1.5 bg-haavk-ice/40 rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-haavk-ice/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-haavk-ice/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入框 */}
            <div className="p-3 border-t border-haavk-border/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="输入消息..."
                  className="flex-1 holo-input px-3 py-2 text-xs font-rajdhani tracking-wider"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading}
                  className="w-8 h-8 border border-haavk-silver/20 flex items-center justify-center hover:border-haavk-ice/40 transition-colors disabled:opacity-30"
                >
                  <Send size={12} className="text-haavk-silver/60" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}