import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { dossiers } from '@/data/dossiers';
import { FileText, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AdminDashboardPage() {
  const isAdminLoggedIn = useAppStore((state) => state.isAdminLoggedIn);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();
  const [selectedDossier, setSelectedDossier] = useState<string | null>(null);
  const [decryptionKey, setDecryptionKey] = useState('');
  const [unlockedDossiers, setUnlockedDossiers] = useState<Set<string>>(new Set());

  if (!isAdminLoggedIn) {
    navigate('/admin');
    return null;
  }

  const selected = dossiers.find((d) => d.id === selectedDossier);

  const handleUnlock = (dossierId: string) => {
    // Any non-empty key unlocks (game easter egg)
    if (decryptionKey.trim()) {
      setUnlockedDossiers((prev) => new Set(prev).add(dossierId));
      setDecryptionKey('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-havoc-green/30 pb-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="text-havoc-red" size={24} />
            <h1 className="font-mono text-havoc-green text-xl">
              绝密档案库 - CLASSIFIED
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-havoc-green/60 hover:text-havoc-green font-mono text-sm transition-colors"
            >
              <ArrowLeft size={16} />
              返回表网
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 border border-havoc-red/50 text-havoc-red font-mono text-sm hover:bg-havoc-red/10 transition-all"
            >
              登出
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dossier list */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-mono text-havoc-green text-sm mb-4">
              [卷宗列表]
            </h2>
            {dossiers.map((dossier) => {
              const isUnlocked = unlockedDossiers.has(dossier.id);
              const isSelected = selectedDossier === dossier.id;

              return (
                <motion.div
                  key={dossier.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDossier(dossier.id)}
                  className={`border rounded p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-havoc-green bg-havoc-green/10'
                      : 'border-havoc-green/30 hover:border-havoc-green/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isUnlocked ? (
                      <FileText className="text-havoc-green" size={20} />
                    ) : (
                      <Lock className="text-havoc-red" size={20} />
                    )}
                    <div>
                      <h3 className="font-mono text-sm text-white">
                        {dossier.title}
                      </h3>
                      <span
                        className={`font-mono text-xs ${
                          dossier.accessLevel === 'classified'
                            ? 'text-havoc-red'
                            : 'text-yellow-500'
                        }`}
                      >
                        [{dossier.accessLevel.toUpperCase()}]
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dossier content */}
          <div className="lg:col-span-2">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-havoc-green/30 rounded p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-mono text-havoc-green text-lg">
                    {selected.title}
                  </h2>
                  <span
                    className={`font-mono text-xs px-2 py-1 border ${
                      selected.accessLevel === 'classified'
                        ? 'border-havoc-red text-havoc-red'
                        : 'border-yellow-500 text-yellow-500'
                    }`}
                  >
                    {selected.accessLevel.toUpperCase()}
                  </span>
                </div>

                {unlockedDossiers.has(selected.id) ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-sm text-white/80 whitespace-pre-wrap leading-relaxed"
                  >
                    {selected.content}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="text-havoc-red mx-auto mb-4" size={48} />
                    <p className="font-mono text-havoc-red mb-6">
                      此卷宗需要密钥访问
                    </p>
                    <div className="max-w-md mx-auto">
                      <input
                        type="text"
                        value={decryptionKey}
                        onChange={(e) => setDecryptionKey(e.target.value)}
                        placeholder="输入解密密钥..."
                        className="w-full bg-transparent border-b border-havoc-green/50 text-havoc-green font-mono py-2 mb-4 focus:outline-none focus:border-havoc-green text-center"
                      />
                      <button
                        onClick={() => handleUnlock(selected.id)}
                        disabled={!decryptionKey.trim()}
                        className="px-6 py-2 border border-havoc-green/50 text-havoc-green font-mono text-sm hover:bg-havoc-green/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        解密
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="border border-havoc-green/20 rounded p-12 text-center">
                <FileText className="text-havoc-green/30 mx-auto mb-4" size={48} />
                <p className="font-mono text-havoc-green/50">
                  选择一个卷宗以查看详情
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer warning */}
        <div className="mt-8 border-t border-havoc-red/30 pt-4">
          <p className="font-mono text-xs text-havoc-red/60 text-center">
            ⚠ 警告：本系统所有访问行为均被记录。未授权泄露将导致严重后果。
          </p>
        </div>
      </div>
    </div>
  );
}
