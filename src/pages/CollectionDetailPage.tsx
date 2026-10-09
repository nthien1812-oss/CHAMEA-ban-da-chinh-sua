import React from 'react';
import { COLLECTIONS_INFO, PRODUCTS, DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import { CollectionId, PageRoute } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface CollectionDetailPageProps {
  collectionId: CollectionId;
  onNavigate: (page: PageRoute, params?: { id?: string }) => void;
}

export const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({
  collectionId,
  onNavigate,
}) => {
  const collection =
    COLLECTIONS_INFO.find((c) => c.id === collectionId) || COLLECTIONS_INFO[0];

  const collectionProducts = PRODUCTS.filter((p) =>
    p.collections.includes(collection.id as CollectionId)
  );

  return (
    <div className="pb-20 space-y-10">
      {/* Banner */}
      <div className="relative bg-[#3C2535] text-[#FEFBFD] py-16 px-4 overflow-hidden border-b border-[#AB8A6B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <button
            onClick={() => onNavigate('collections')}
            className="text-xs text-[#AB8A6B] hover:text-[#FEFBFD] transition-colors inline-flex items-center gap-1.5 cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại tất cả bộ sưu tập</span>
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs text-[#ECD5D8] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#AB8A6B]" />
            <span>Bộ sưu tập đặc biệt</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white">
            {collection.title}
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#AB8A6B]">
            {collection.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-[#D9C8BA] max-w-2xl leading-relaxed font-sans">
            {collection.description}
          </p>

          <div className="text-xs text-[#AB8A6B] font-medium pt-2">
            Số lượng: {collectionProducts.length} mẫu túi hiện có
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#BCA388]/20 pb-3">
          <h2 className="font-serif text-xl text-[#3C2535] font-medium">
            Danh sách thiết kế thuộc bộ sưu tập
          </h2>
          <span className="text-[11px] text-[#3C2535]/60 italic hidden sm:inline">
            * {DEMO_PRICE_DISCLAIMER}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {collectionProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={(id) => onNavigate('product-detail', { id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
