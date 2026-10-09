import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/chameaData';
import { PageRoute } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  onNavigate: (page: PageRoute, params?: { id?: string }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { isSearchOpen, setIsSearchOpen, isPromoActive } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.usages.some((u) => u.toLowerCase().includes(q)) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q))
    );
  });

  const handleSelect = (productId: string) => {
    setIsSearchOpen(false);
    onNavigate('product-detail', { id: productId });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="bg-[#FEFBFD] border border-[#BCA388]/30 w-full max-w-2xl shadow-2xl p-6 relative">
        {/* Header & input */}
        <div className="flex items-center gap-3 border-b border-[#BCA388]/30 pb-4">
          <Search className="w-5 h-5 text-[#AB8A6B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên túi, kiểu dáng, màu sắc hoặc dịp tặng..."
            className="w-full text-sm font-sans bg-transparent focus:outline-hidden text-[#3C2535] placeholder:text-[#BCA388]/70"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#3C2535]/50 hover:text-[#3C2535] cursor-pointer"
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick suggest tags */}
        <div className="py-3 flex flex-wrap items-center gap-2 text-xs text-[#3C2535]/70 border-b border-[#BCA388]/15">
          <span className="font-medium text-[#3C2535]">Gợi ý tìm kiếm:</span>
          {['Túi xách tay', 'Túi đeo vai', 'Hồng phấn', 'Trắng ngà', 'Tím mận', 'Đi làm'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-[#FAF7F2] hover:bg-[#BCA388]/20 transition-colors text-[11px] cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#3C2535]/60">
              Không tìm thấy túi xách phù hợp với từ khóa "{query}". Hãy thử tìm kiếm bằng từ khóa khác.
            </div>
          ) : (
            filteredProducts.map((p) => {
              const displayPrice = isPromoActive ? p.price : p.originalPrice || p.price;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className="flex items-center justify-between p-3 bg-white border border-[#BCA388]/20 hover:border-[#AB8A6B] hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]?.url}
                      alt={p.name}
                      className="w-14 h-14 object-cover border border-[#BCA388]/20 bg-[#FAF7F2]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#3C2535] group-hover:text-[#AB8A6B] transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-[#3C2535]/60">
                        Mã: {p.code} · {p.style}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-[#3C2535] font-mono tabular-nums">
                        {formatPrice(displayPrice)}
                      </div>
                      {isPromoActive && p.originalPrice && (
                        <div className="text-[10px] text-[#3C2535]/40 line-through font-mono tabular-nums">
                          {formatPrice(p.originalPrice)}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#BCA388] group-hover:text-[#3C2535] transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
