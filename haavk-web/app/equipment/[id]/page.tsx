'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Zap, MapPin } from 'lucide-react';
import Equipment360Viewer from '@/components/equipment/Equipment360Viewer';
import CgHoloWindow from '@/components/shared/CgHoloWindow';
import SectionTitle from '@/components/shared/SectionTitle';
import { equipmentList } from '@/data/equipment';

export default function EquipmentPage() {
  const params = useParams();
  const id = params.id as string;
  const equipment = equipmentList.find((e) => e.id === id) || equipmentList[0];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* 返回 */}
        <Link
          href="/equipment/mech-01"
          className="inline-flex items-center gap-2 text-xs text-haavk-platinum/50 hover:text-haavk-ice font-rajdhani tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          返回装备列表
        </Link>

        <SectionTitle
          title={equipment.name}
          subtitle={`${equipment.type === 'mech' ? '重型机甲' : equipment.type === 'weapon' ? '武器系统' : equipment.type === 'drone' ? '无人机系统' : '装甲车辆'} · 安全等级 ${equipment.securityLevel}`}
        />

        {/* 装备导航 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {equipmentList.map((eq) => (
            <Link
              key={eq.id}
              href={`/equipment/${eq.id}`}
              className={`px-4 py-1.5 text-xs font-rajdhani tracking-wider transition-all duration-300 ${
                eq.id === id
                  ? 'text-haavk-ice border border-haavk-ice/40 bg-haavk-ice/5'
                  : 'text-haavk-platinum/50 border border-haavk-border/20 hover:border-haavk-silver/30 hover:text-haavk-silver'
              }`}
            >
              {eq.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：360°预览 + CG */}
          <div className="space-y-4">
            <Equipment360Viewer
              name={equipment.name}
              cgPrompt={equipment.cgPrompt}
            />

            <CgHoloWindow
              prompt={equipment.cgPrompt}
              aspectRatio="16:9"
              size="medium"
              className="w-full"
            />
          </div>

          {/* 右侧：信息面板 */}
          <motion.div
            className="holo-glass p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 规格参数 */}
            <h3 className="font-orbitron text-xs tracking-[0.2em] text-haavk-silver mb-4 pb-3 border-b border-haavk-border/20">
              技术规格
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {equipment.specs.map((spec) => (
                <div key={spec.label} className="border border-haavk-border/20 p-3">
                  <div className="text-[9px] text-haavk-platinum/40 font-rajdhani tracking-wider mb-1">
                    {spec.label}
                  </div>
                  <div className="time-font text-[11px] text-haavk-ice/60 value-flicker">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 能源消耗 */}
            <div className="flex items-center gap-4 p-4 border border-haavk-border/20 mb-6">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-haavk-ice/40" />
                <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">能源消耗</span>
              </div>
              <span className="time-font text-sm text-haavk-ice/60">{equipment.energyConsumption}</span>
            </div>

            {/* 部署据点 */}
            <div className="flex items-center gap-4 p-4 border border-haavk-border/20 mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-haavk-ice/40" />
                <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">部署据点</span>
              </div>
              <span className="time-font text-sm text-haavk-ice/60">{equipment.base}</span>
            </div>

            {/* 安保等级 */}
            <div className="flex items-center gap-4 p-4 border border-haavk-border/20 mb-6">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-haavk-ice/40" />
                <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">安保等级</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: equipment.securityLevel }).map((_, i) => (
                  <Shield key={i} size={14} className="text-haavk-ice/50" />
                ))}
              </div>
            </div>

            {/* 背景剧情 */}
            <div className="metal-divider my-6" />
            <h3 className="font-orbitron text-xs tracking-[0.2em] text-haavk-silver mb-4">
              研发溯源与背景剧情
            </h3>
            <p className="text-sm text-haavk-platinum/60 font-rajdhani leading-relaxed">
              {equipment.backstory}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}