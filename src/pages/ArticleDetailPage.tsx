import React from 'react';
import { ARTICLES, PRODUCTS } from '../data/chameaData';
import { PageRoute } from '../types';
import { ArrowLeft, Clock, Calendar, Gift, ArrowRight } from 'lucide-react';

interface ArticleDetailPageProps {
  articleId: string;
  onNavigate: (page: PageRoute, params?: { id?: string }) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  articleId,
  onNavigate,
}) => {
  const article = ARTICLES.find((a) => a.id === articleId) || ARTICLES[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 space-y-10">
      {/* Back button */}
      <button
        onClick={() => onNavigate('home')}
        className="text-xs text-[#AB8A6B] hover:text-[#3C2535] flex items-center gap-1.5 cursor-pointer font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại trang chủ</span>
      </button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-xs text-[#AB8A6B]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishDate}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3C2535] font-medium leading-snug">
          {article.title}
        </h1>

        <p className="font-serif italic text-sm sm:text-base text-[#3C2535]/80 bg-[#FAF7F2] p-4 border-l-2 border-[#AB8A6B]">
          {article.excerpt}
        </p>
      </div>

      {/* Article Featured Photo */}
      <div className="overflow-hidden border border-[#BCA388]/30">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 sm:h-96 object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="space-y-4 text-xs sm:text-sm text-[#3C2535]/85 leading-relaxed font-sans">
        {article.content.map((p, idx) => (
          <p key={idx} className="text-justify sm:text-left">
            {p}
          </p>
        ))}
      </div>

      {/* Bottom CTA to Gift Finder */}
      <div className="bg-[#FAF7F2] border border-[#BCA388]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-lg font-medium text-[#3C2535]">
            Bạn đã tìm được chiếc túi ưng ý chưa?
          </h3>
          <p className="text-xs text-[#3C2535]/70">
            Dùng thử công cụ chọn quà thông minh của CHAMÉA để nhận gợi ý chuẩn gu.
          </p>
        </div>

        <button
          onClick={() => onNavigate('gift-finder')}
          className="px-6 py-3 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase tracking-wider hover:bg-[#523348] transition-colors cursor-pointer shrink-0 flex items-center gap-2"
        >
          <Gift className="w-4 h-4 text-[#AB8A6B]" />
          <span>Gợi ý chọn quà ngay</span>
        </button>
      </div>
    </div>
  );
};
