import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Timeline from '@/components/about/Timeline';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-havoc-black">
      <Navbar />

      {/* Hero section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-orbitron text-5xl font-bold text-gradient mb-6"
          >
            从废墟中诞生
            <br />
            于混沌中建立秩序
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-rajdhani text-xl text-white/80 leading-relaxed"
          >
            哈夫克集团，全球顶尖的AI与资源垄断财团。我们带来能源、基建与秩序，
            是阿萨拉的普罗米修斯，用科技的力量把世界带入更好的未来。
          </motion.p>
        </div>
      </section>

      {/* Vision cards */}
      <section className="py-20 px-6 bg-havoc-dark/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '起源',
                period: '1993-2007',
                description: '从ERI战地救援物流组织，转型为全球顶尖的AI与资源垄断财团。',
              },
              {
                title: '阿萨拉计划',
                period: '2011-至今',
                description: '零号大坝合作协议，解决北非干旱、振兴本土经济的世纪工程。',
              },
              {
                title: '焰火计划',
                period: '2035',
                description: '天网卫星系统遭恐怖分子破坏，呼吁全球支持维和行动。',
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-havoc-dark/50 border border-havoc-blue/20 rounded-lg p-8 glow-border-hover"
              >
                <h3 className="font-orbitron text-2xl font-bold text-havoc-blue mb-2">
                  {card.title}
                </h3>
                <p className="font-rajdhani text-sm text-havoc-blue/60 mb-4">
                  {card.period}
                </p>
                <p className="font-rajdhani text-white/70">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Timeline />
      <Footer />
    </div>
  );
}
