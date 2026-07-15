'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import CooperateForm from '@/components/cooperate/CooperateForm';

export default function CooperatePage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="企业合作与招聘"
          subtitle="加入哈夫克全球科技防务网络"
        />

        <CooperateForm />

        {/* 底部标语 */}
        <div className="mt-16 text-center">
          <div className="metal-divider mb-8" />
          <p className="font-orbitron text-sm tracking-[0.2em] text-haavk-ice/40 mb-2">
            哈夫克与你同频，信息予你无限
          </p>
          <p className="font-orbitron text-xs tracking-[0.3em] text-haavk-platinum/30">
            天空属于哈夫克
          </p>
        </div>
      </div>
    </div>
  );
}