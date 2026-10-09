import React from 'react';
import { COLLECTIONS_INFO, PRODUCTS } from '../data/chameaData';
import { CollectionId, PageRoute } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsPageProps {
  onSelectCollection: (collectionId: CollectionId) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onSelectCollection }) => {
  return (
    <div className="pb-20 space-y-12">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-[#BCA388]/30 py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
            Biên Tập Thiết Kế
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3C2535] font-medium">
            Bộ Sưu Tập CHAMÉA
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2535]/80 leading-relaxed">
            Mỗi bộ sưu tập là một góc nhìn tinh tế về phong cách và câu chuyện riêng biệt của người phụ nữ hiện đại.
          </p>
        </div>
      </div>

      {/* Collections List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {COLLECTIONS_INFO.map((col, idx) => {
          const productCount = PRODUCTS.filter((p) => p.collections.includes(col.id as CollectionId)).length;
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2]/60 border border-[#BCA388]/30 p-6 sm:p-10 transition-all hover:border-[#AB8A6B]`}
            >
              <div
                className={`lg:col-span-6 ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                } overflow-hidden border border-[#BCA388]/30`}
              >
                <img
                  src={col.bannerImage}
                  alt={col.title}
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div
                className={`lg:col-span-6 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                } space-y-4`}
              >
                <div className="text-xs text-[#AB8A6B] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bộ sưu tập tuyển chọn · {productCount} thiết kế</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
                  {col.title}
                </h2>

                <p className="font-serif italic text-sm text-[#AB8A6B]">
                  {col.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#3C2535]/80 leading-relaxed font-sans">
                  {col.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectCollection(col.id as CollectionId)}
                    className="px-6 py-3 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase tracking-wider hover:bg-[#523348] transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Khám phá bộ sưu tập ({productCount})</span>
                    <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
