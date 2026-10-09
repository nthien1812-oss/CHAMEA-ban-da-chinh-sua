import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { isInWishlist, toggleWishlist, isPromoActive } = useShop();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);

  // Determine current image: use variant image if available, else primary product image
  const displayImage = selectedColor.image || product.images[0]?.url;

  const displayPrice = isPromoActive ? product.price : product.originalPrice || product.price;
  const originalPrice = product.originalPrice;
  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  return (
    <div className="group flex flex-col bg-[#FEFBFD] border border-[#BCA388]/25 hover:border-[#AB8A6B] hover:shadow-md transition-all duration-300">
      {/* Product Image Frame */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#FAF7F2] overflow-hidden cursor-pointer">
        <img
          src={displayImage}
          alt={`${product.name} - ${selectedColor.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onClick={() => onSelect(product.id)}
        />

        {/* Wishlist toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#3C2535] text-[#FEFBFD]'
              : 'bg-white/80 backdrop-blur-xs text-[#3C2535] hover:bg-[#3C2535] hover:text-[#FEFBFD]'
          }`}
          aria-label={isWishlisted ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          title={isWishlisted ? 'Đã yêu thích' : 'Yêu thích mẫu này'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Promo discount badge (-20%) */}
        {isPromoActive && product.discountPercent && (
          <div className="absolute top-2.5 left-2.5 bg-[#3C2535] text-[#FEFBFD] text-[10px] sm:text-xs font-semibold px-2 py-0.5 tracking-wider uppercase">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Style & Code */}
          <div className="text-[11px] text-[#AB8A6B] font-medium tracking-wide uppercase">
            Mã: {product.code} · {product.style}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onSelect(product.id)}
            className="font-serif text-sm sm:text-base font-medium text-[#3C2535] group-hover:text-[#AB8A6B] transition-colors cursor-pointer mt-1 line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Color swatches */}
          <div className="flex items-center gap-2 mt-2.5">
            {product.colors.map((color) => {
              const isSelected = selectedColor.code === color.code;
              return (
                <button
                  key={color.code}
                  onClick={() => setSelectedColor(color)}
                  className={`w-5 h-5 rounded-full border transition-all cursor-pointer relative ${
                    isSelected ? 'ring-2 ring-[#AB8A6B] ring-offset-1 scale-110' : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={`Màu ${color.name}`}
                  aria-label={`Chọn màu ${color.name}`}
                />
              );
            })}
            <span className="text-[11px] text-[#3C2535]/60 ml-1">
              {selectedColor.name}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#BCA388]/20 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-semibold text-[#3C2535] font-mono tabular-nums">
              {formatPrice(displayPrice)}
            </div>
            {isPromoActive && originalPrice && (
              <div className="text-xs text-[#3C2535]/45 line-through font-mono tabular-nums">
                {formatPrice(originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => onSelect(product.id)}
            className="px-3.5 py-2 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Chọn túi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
