import React, { useState, useMemo } from 'react';
import { PRODUCTS, SILHOUETTES_INFO, DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import { ProductCard } from '../components/ProductCard';
import { BagSilhouette, PageRoute } from '../types';
import { useShop } from '../context/ShopContext';
import { Filter, X, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';

interface CatalogPageProps {
  initialSilhouette?: BagSilhouette | null;
  onNavigate: (page: PageRoute, params?: { id?: string }) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialSilhouette = null,
  onNavigate,
}) => {
  const { isPromoActive } = useShop();

  const [selectedSilhouette, setSelectedSilhouette] = useState<BagSilhouette | 'all'>(
    initialSilhouette || 'all'
  );
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedUsage, setSelectedUsage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'none' | 'price-asc' | 'price-desc'>('none');

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available filters from actual data
  const availableColors = [
    { id: 'all', label: 'Tất cả màu' },
    { id: 'ivory', label: 'Trắng ngà / Trắng kem' },
    { id: 'plum', label: 'Tím mận' },
    { id: 'pink', label: 'Hồng phấn' },
  ];

  const priceRanges = [
    { id: 'all', label: 'Tất cả mức giá' },
    { id: 'under-1.3m', label: 'Dưới 1.300.000 đ' },
    { id: '1.3m-1.45m', label: '1.300.000 đ – 1.450.000 đ' },
    { id: 'above-1.45m', label: 'Trên 1.450.000 đ' },
  ];

  const usages = [
    { id: 'all', label: 'Tất cả nhu cầu' },
    { id: 'Đi làm', label: 'Đi làm công sở' },
    { id: 'Đi chơi', label: 'Đi chơi, dạo phố' },
    { id: 'Dự tiệc', label: 'Dự tiệc & Sự kiện' },
  ];

  const clearFilters = () => {
    setSelectedSilhouette('all');
    setSelectedColor('all');
    setSelectedPriceRange('all');
    setSelectedUsage('all');
    setSortBy('none');
  };

  const hasActiveFilters =
    selectedSilhouette !== 'all' ||
    selectedColor !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedUsage !== 'all';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Silhouette filter
      if (
        selectedSilhouette !== 'all' &&
        !product.silhouettes.includes(selectedSilhouette)
      ) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const matchesColor = product.colors.some((c) => {
          if (selectedColor === 'ivory') return c.code === 'ivory' || c.code === 'cream';
          if (selectedColor === 'plum') return c.code === 'plum';
          if (selectedColor === 'pink') return c.code === 'pink';
          return false;
        });
        if (!matchesColor) return false;
      }

      // Price filter
      const activePrice = isPromoActive
        ? product.price
        : product.originalPrice || product.price;

      if (selectedPriceRange === 'under-1.3m' && activePrice >= 1300000) return false;
      if (
        selectedPriceRange === '1.3m-1.45m' &&
        (activePrice < 1300000 || activePrice > 1450000)
      )
        return false;
      if (selectedPriceRange === 'above-1.45m' && activePrice <= 1450000) return false;

      // Usage filter
      if (selectedUsage !== 'all' && !product.usages.includes(selectedUsage)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = isPromoActive ? a.price : a.originalPrice || a.price;
      const priceB = isPromoActive ? b.price : b.originalPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      return 0;
    });
  }, [
    selectedSilhouette,
    selectedColor,
    selectedPriceRange,
    selectedUsage,
    sortBy,
    isPromoActive,
  ]);

  return (
    <div className="pb-20 space-y-8">
      {/* Category Header Banner */}
      <div className="bg-[#FAF7F2] border-b border-[#BCA388]/30 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
            Bộ Sưu Tập Túi Xách CHAMÉA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3C2535] font-medium">
            Tất Cả Túi Xách
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2535]/80 max-w-xl mx-auto leading-relaxed">
            Được chế tác với đường nét thanh thoát, bảng màu nền nã và khóa kim loại mạ vàng sang trọng. 
            Mỗi thiết kế là người bạn đồng hành tinh tế cho nàng mỗi ngày.
          </p>
          <div className="text-[11px] text-[#3C2535]/60 pt-1 italic">
            * {DEMO_PRICE_DISCLAIMER}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#BCA388]/20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#3C2535]">
              Hiển thị: {filteredProducts.length} sản phẩm
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-3 text-xs text-[#AB8A6B] hover:text-[#3C2535] underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Xóa bộ lọc</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 border border-[#BCA388]/40 bg-white text-xs font-medium text-[#3C2535] flex items-center gap-1.5 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#AB8A6B]" />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#AB8A6B]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#3C2535]/70 hidden sm:inline">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#BCA388]/40 px-3 py-2 text-xs text-[#3C2535] focus:outline-hidden focus:border-[#AB8A6B] cursor-pointer"
              >
                <option value="none">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 pr-4">
            {/* Dáng túi */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C2535] mb-3">
                Dáng túi
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedSilhouette('all')}
                  className={`block w-full text-left py-1 px-2 rounded-xs transition-colors cursor-pointer ${
                    selectedSilhouette === 'all'
                      ? 'bg-[#3C2535] text-[#FEFBFD] font-medium'
                      : 'text-[#3C2535]/80 hover:text-[#AB8A6B]'
                  }`}
                >
                  Tất cả dáng túi
                </button>
                {SILHOUETTES_INFO.map((sil) => (
                  <button
                    key={sil.id}
                    onClick={() => setSelectedSilhouette(sil.id as BagSilhouette)}
                    className={`block w-full text-left py-1 px-2 rounded-xs transition-colors cursor-pointer ${
                      selectedSilhouette === sil.id
                        ? 'bg-[#3C2535] text-[#FEFBFD] font-medium'
                        : 'text-[#3C2535]/80 hover:text-[#AB8A6B]'
                    }`}
                  >
                    {sil.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Màu sắc */}
            <div className="pt-4 border-t border-[#BCA388]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C2535] mb-3">
                Màu sắc
              </h4>
              <div className="space-y-1.5 text-xs">
                {availableColors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`block w-full text-left py-1 px-2 rounded-xs transition-colors cursor-pointer ${
                      selectedColor === c.id
                        ? 'bg-[#3C2535] text-[#FEFBFD] font-medium'
                        : 'text-[#3C2535]/80 hover:text-[#AB8A6B]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Khoảng giá */}
            <div className="pt-4 border-t border-[#BCA388]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C2535] mb-3">
                Khoảng giá
              </h4>
              <div className="space-y-1.5 text-xs">
                {priceRanges.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => setSelectedPriceRange(pr.id)}
                    className={`block w-full text-left py-1 px-2 rounded-xs transition-colors cursor-pointer ${
                      selectedPriceRange === pr.id
                        ? 'bg-[#3C2535] text-[#FEFBFD] font-medium'
                        : 'text-[#3C2535]/80 hover:text-[#AB8A6B]'
                    }`}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nhu cầu sử dụng */}
            <div className="pt-4 border-t border-[#BCA388]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3C2535] mb-3">
                Nhu cầu sử dụng
              </h4>
              <div className="space-y-1.5 text-xs">
                {usages.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUsage(u.id)}
                    className={`block w-full text-left py-1 px-2 rounded-xs transition-colors cursor-pointer ${
                      selectedUsage === u.id
                        ? 'bg-[#3C2535] text-[#FEFBFD] font-medium'
                        : 'text-[#3C2535]/80 hover:text-[#AB8A6B]'
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#FAF7F2] border border-[#BCA388]/20 p-8 space-y-3">
                <SlidersHorizontal className="w-10 h-10 text-[#BCA388] mx-auto" />
                <h3 className="font-serif text-lg text-[#3C2535]">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="text-xs text-[#3C2535]/70 max-w-sm mx-auto">
                  Hiện tại không có mẫu túi nào thỏa mãn đồng thời các bộ lọc bạn đã chọn. Hãy thử xóa bớt bộ lọc để tiếp tục xem sản phẩm.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-5 py-2.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors cursor-pointer"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(id) => onNavigate('product-detail', { id })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FEFBFD] p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#BCA388]/30 pb-3">
              <h3 className="font-serif text-base font-medium text-[#3C2535]">
                Bộ Lọc Sản Phẩm
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#3C2535]/60 hover:text-[#3C2535]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Silhouette */}
            <div>
              <div className="text-xs font-semibold text-[#3C2535] uppercase mb-2">
                Dáng túi
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedSilhouette('all')}
                  className={`block w-full text-left p-2 border ${
                    selectedSilhouette === 'all'
                      ? 'bg-[#3C2535] text-white border-[#3C2535]'
                      : 'border-[#BCA388]/30'
                  }`}
                >
                  Tất cả dáng túi
                </button>
                {SILHOUETTES_INFO.map((sil) => (
                  <button
                    key={sil.id}
                    onClick={() => setSelectedSilhouette(sil.id as BagSilhouette)}
                    className={`block w-full text-left p-2 border ${
                      selectedSilhouette === sil.id
                        ? 'bg-[#3C2535] text-white border-[#3C2535]'
                        : 'border-[#BCA388]/30'
                    }`}
                  >
                    {sil.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <div className="text-xs font-semibold text-[#3C2535] uppercase mb-2">
                Màu sắc
              </div>
              <div className="space-y-1 text-xs">
                {availableColors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`block w-full text-left p-2 border ${
                      selectedColor === c.id
                        ? 'bg-[#3C2535] text-white border-[#3C2535]'
                        : 'border-[#BCA388]/30'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-xs font-semibold text-[#3C2535] uppercase mb-2">
                Khoảng giá
              </div>
              <div className="space-y-1 text-xs">
                {priceRanges.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => setSelectedPriceRange(pr.id)}
                    className={`block w-full text-left p-2 border ${
                      selectedPriceRange === pr.id
                        ? 'bg-[#3C2535] text-white border-[#3C2535]'
                        : 'border-[#BCA388]/30'
                    }`}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Clear buttons */}
            <div className="pt-4 border-t border-[#BCA388]/30 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase"
              >
                Áp dụng ({filteredProducts.length})
              </button>
              <button
                onClick={clearFilters}
                className="w-full py-2 border border-[#BCA388]/40 text-xs text-[#3C2535]"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
