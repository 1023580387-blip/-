'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import SecretArchiveTimeline from '@/components/archive/SecretArchiveTimeline';

export default function ArchivePage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="集团档案"
          subtitle="从创立到2035 — 哈夫克帝国的完整历史记录"
        />

        <div className="mb-8 p-4 border border-haavk-border/20 flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-haavk-ice/40 rounded-full mt-1.5 flex-shrink-0" />
          <p className="text-xs text-haavk-platinum/50 font-rajdhani leading-relaxed">
            本档案库收录哈夫克集团创立至今的全部关键事件。公开资料可自由浏览，受限机密和最高保密档案需通过安全授权验证。部分档案内容涉及集团核心利益，请谨慎传播。
          </p>
        </div>

        <SecretArchiveTimeline />
      </div>
    </div>
  );
}