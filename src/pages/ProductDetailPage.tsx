import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products } from '@/data/products';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [showHidden, setShowHidden] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-havoc-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-orbitron text-4xl text-havoc-red mb-4">产品未找到</h1>
          <Link to="/products" className="text-havoc-blue hover:underline">
            返回产品列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-havoc-black">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-havoc-blue hover:text-havoc-blue-dark transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-rajdhani">返回产品列表</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-orbitron text-5xl font-bold text-gradient mb-4">
              {product.name}
            </h1>
            <p className="font-rajdhani text-2xl text-havoc-blue/80 italic mb-8">
              "{product.slogan}"
            </p>

            <div className="bg-havoc-dark/50 border border-havoc-blue/20 rounded-lg p-8 mb-8 glow-border">
              <h2 className="font-orbitron text-2xl font-bold text-white mb-4">
                产品概述
              </h2>
              <p className="font-rajdhani text-lg text-white/80 leading-relaxed mb-6">
                {product.description}
              </p>

              <h3 className="font-orbitron text-xl font-bold text-havoc-blue mb-4">
                核心特性
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-rajdhani text-white/70"
                  >
                    <span className="text-havoc-blue mt-1">▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.hiddenDetail && (
              <div className="bg-havoc-dark/30 border border-havoc-red/30 rounded-lg p-6">
                <button
                  onClick={() => setShowHidden(!showHidden)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-orbitron text-xl font-bold text-havoc-red">
                      ⚠ 机密信息
                    </h3>
                    <span className="text-havoc-red text-sm font-rajdhani">
                      {showHidden ? '收起' : product.hiddenDetail.triggerMethod}
                    </span>
                  </div>
                </button>

                {showHidden && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.hiddenDetail.type === 'code' ? (
                      <pre className="bg-havoc-black/50 border border-havoc-red/20 rounded p-4 overflow-x-auto">
                        <code className="font-mono text-sm text-havoc-red/80">
                          {product.hiddenDetail.content}
                        </code>
                      </pre>
                    ) : (
                      <p className="font-rajdhani text-white/60 text-sm leading-relaxed">
                        {product.hiddenDetail.content}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
