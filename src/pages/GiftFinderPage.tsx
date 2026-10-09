import React from 'react';
import { GiftFinderWidget } from '../components/GiftFinderWidget';
import { ARTICLES } from '../data/chameaData';
import { PageRoute } from '../types';
import { Gift, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';

interface GiftFinderPageProps {
  onNavigate: (page: PageRoute, params?: { id?: string; articleId?: string }) => void;
}

export const GiftFinderPage: React.FC<GiftFinderPageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 space-y-16">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-[#BCA388]/30 py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
            <Gift className="w-4 h-4" />
            <span>Trợ Lý Gợi Ý Quà Tặng CHAMÉA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3C2535] font-medium">
            Chạm Đúng Người · Trao Đúng Quà
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2535]/80 leading-relaxed font-sans">
            Mỗi người phụ nữ là một nét riêng độc đáo. Dù bạn đang tìm quà cho mẹ, vợ, người yêu, bạn bè hay tự thưởng cho chính mình, CHAMÉA giúp bạn chọn chiếc túi vừa vặn nhất.
          </p>
        </div>
      </div>

      {/* Main Interactive Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GiftFinderWidget
          isStandalonePage
          onNavigateProduct={(id) => onNavigate('product-detail', { id })}
        />
      </div>

      {/* Gifting Philosophy */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3C2535] text-[#FEFBFD] p-8 sm:p-12 border border-[#AB8A6B]/40 space-y-6">
          <div className="flex items-center gap-2 text-xs text-[#AB8A6B] uppercase tracking-wider font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Đặc Quyền Hộp Quà CHAMÉA</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-snug">
            Mỗi chiếc túi trao đi đều được chuẩn bị như một món quà hoàn hảo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#D9C8BA] pt-2">
            <div className="space-y-1 border-t border-[#AB8A6B]/30 pt-3">
              <span className="font-semibold text-white block">1. Hộp quà cứng cao cấp</span>
              <p>Hộp giấy cứng cáp phủ màu kem trang nhã, thắt ruy-băng lụa tím mận đặc trưng của thương hiệu.</p>
            </div>
            <div className="space-y-1 border-t border-[#AB8A6B]/30 pt-3">
              <span className="font-semibold text-white block">2. Túi vải bảo quản dustbag</span>
              <p>Mỗi sản phẩm đều được bọc trong túi vải mềm, bảo vệ tối đa bề mặt da trong quá trình lưu trữ.</p>
            </div>
            <div className="space-y-1 border-t border-[#AB8A6B]/30 pt-3">
              <span className="font-semibold text-white block">3. Thiệp viết tay lời chúc</span>
              <p>Tặng kèm thiệp thiết kế riêng, hỗ trợ viết tay lời chúc chân thành bạn muốn gửi gắm.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Gift Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#BCA388]/20 pb-3">
          <h2 className="font-serif text-xl sm:text-2xl text-[#3C2535] font-medium">
            Góc tư vấn & Ý tưởng chọn quà
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate('article-detail', { articleId: art.id })}
              className="bg-[#FEFBFD] border border-[#BCA388]/30 overflow-hidden hover:border-[#AB8A6B] transition-all cursor-pointer group flex flex-col"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[11px] text-[#AB8A6B] font-medium">
                    {art.readTime}
                  </span>
                  <h3 className="font-serif text-sm font-medium text-[#3C2535] group-hover:text-[#AB8A6B] transition-colors mt-1 line-clamp-2">
                    {art.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#3C2535] group-hover:text-[#AB8A6B] pt-2">
                  <span>Đọc ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
