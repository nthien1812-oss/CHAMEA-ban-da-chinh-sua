import React, { useState } from 'react';
import { PRODUCTS, DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import { Product, ProductColor, PageRoute } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Zap,
  MessageSquare,
  ZoomIn,
  X,
  Plus,
  Minus,
  Check,
  Package,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: PageRoute, params?: { id?: string }) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
}) => {
  const { addToCart, isInWishlist, toggleWishlist, isPromoActive, openConsultation } =
    useShop();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'materials' | 'package' | 'care' | 'shipping'
  >('overview');

  // Handle color change:
  // "Đổi màu chỉ đổi ảnh khi có đúng ảnh của biến thể đó. Không tự đổi màu túi bằng bộ lọc màu."
  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) {
      // Find if this image is already in images list or set active index to 0
      const imgIdx = product.images.findIndex((img) => img.url === color.image);
      if (imgIdx >= 0) {
        setActiveImageIndex(imgIdx);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    onNavigate('checkout');
  };

  const displayPrice = isPromoActive ? product.price : product.originalPrice || product.price;
  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const currentImage = product.images[activeImageIndex] || product.images[0];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="pb-24 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-[#3C2535]/65"
      >
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#AB8A6B] transition-colors cursor-pointer"
        >
          Trang chủ
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#BCA388]" />
        <button
          onClick={() => onNavigate('catalog')}
          className="hover:text-[#AB8A6B] transition-colors cursor-pointer"
        >
          Tất cả túi xách
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#BCA388]" />
        <span className="text-[#3C2535] font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left + Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT: 4-STAGE IMAGE GALLERY */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Main Image with Zoom Trigger */}
          <div className="relative aspect-4/3 sm:aspect-square bg-[#FAF7F2] border border-[#BCA388]/30 overflow-hidden group">
            <img
              src={currentImage.url}
              alt={`${product.name} - ${currentImage.caption}`}
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500"
              onClick={() => setIsZoomOpen(true)}
            />

            {/* Zoom Action Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-3 right-3 p-2.5 bg-white/90 backdrop-blur-xs text-[#3C2535] hover:bg-[#3C2535] hover:text-[#FEFBFD] border border-[#BCA388]/30 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Phóng to ảnh"
            >
              <ZoomIn className="w-4 h-4" />
              <span>Phóng to</span>
            </button>

            {/* Illustration note disclaimer if photo is rendered scene */}
            {currentImage.isIllustration && (
              <div className="absolute top-3 left-3 bg-[#3C2535]/90 text-[#ECD5D8] px-2.5 py-1 text-[11px] backdrop-blur-xs">
                Ảnh minh họa bối cảnh
              </div>
            )}
          </div>

          {/* Caption for the active angle */}
          <div className="text-xs text-[#3C2535]/80 bg-[#FAF7F2] p-2.5 border border-[#BCA388]/20 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#AB8A6B] shrink-0 mt-0.5" />
            <span>{currentImage.caption}</span>
          </div>

          {/* Mandatory 4-Angle Thumbnail Sequence */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {product.images.map((img, index) => {
              const isSelected = activeImageIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square border overflow-hidden cursor-pointer bg-[#FAF7F2] transition-all text-left ${
                    isSelected
                      ? 'border-[#3C2535] ring-2 ring-[#AB8A6B]/50'
                      : 'border-[#BCA388]/30 hover:border-[#AB8A6B]'
                  }`}
                  title={img.caption}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1 py-0.2 rounded-xs font-mono">
                    Góc {index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-[#3C2535]/65 leading-relaxed pt-1">
            * Thứ tự ảnh hiển thị theo chuẩn: 1. Tổng quan toàn bộ túi · 2. Góc nghiêng/phom dáng · 3. Cận cảnh chất liệu da, khóa & đường may · 4. Bộ quà tặng cao cấp kèm hộp, thiệp, ruy-băng.
          </div>
        </div>

        {/* RIGHT: CONTIGUOUS PURCHASE MODULE */}
        <div className="lg:col-span-5 bg-white border border-[#BCA388]/30 p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header & Codes */}
          <div className="space-y-1.5 border-b border-[#BCA388]/20 pb-4">
            <div className="flex items-center justify-between text-xs text-[#AB8A6B] font-medium tracking-wide uppercase">
              <span>Mã sản phẩm: {product.code}</span>
              <span>{product.style}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#3C2535] font-mono tabular-nums">
                {formatPrice(displayPrice)}
              </span>

              {isPromoActive && product.originalPrice && (
                <span className="text-sm text-[#3C2535]/50 line-through font-mono tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}

              {isPromoActive && product.discountPercent && (
                <span className="text-xs bg-[#3C2535] text-[#FEFBFD] font-semibold px-2 py-0.5 uppercase tracking-wider">
                  Ưu đãi -{product.discountPercent}%
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#3C2535]/60 italic">
              * {DEMO_PRICE_DISCLAIMER}
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-2 pt-2 border-t border-[#BCA388]/20">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#3C2535] uppercase tracking-wider">
                Màu sắc đang chọn:
              </span>
              <span className="text-[#AB8A6B] font-medium">{selectedColor.name}</span>
            </div>

            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.code === color.code;
                return (
                  <button
                    key={color.code}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border transition-all cursor-pointer relative flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-[#3C2535] ring-offset-2 scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`Chọn màu ${color.name}`}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 ${
                          color.code === 'ivory' || color.code === 'pink' || color.code === 'cream'
                            ? 'text-[#3C2535]'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#3C2535]/60 italic">
              * Đổi màu sẽ cập nhật ảnh sản phẩm tương ứng nếu có ảnh của biến thể đó.
            </p>
          </div>

          {/* Quantity Stepper */}
          <div className="space-y-2 pt-2 border-t border-[#BCA388]/20">
            <label className="block text-xs font-semibold text-[#3C2535] uppercase tracking-wider">
              Số lượng:
            </label>
            <div className="flex items-center w-36 border border-[#BCA388]/40">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 text-[#3C2535] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Giảm"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center font-mono text-sm font-semibold text-[#3C2535] tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 text-[#3C2535] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Tăng"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-4 bg-[#3C2535] text-[#FEFBFD] hover:bg-[#523348] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#AB8A6B]" />
              <span>Thêm vào giỏ hàng</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-4 bg-[#AB8A6B] text-[#3C2535] hover:bg-[#8F7053] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Mua ngay</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => openConsultation(product)}
                className="w-full py-2.5 px-3 border border-[#3C2535] text-[#3C2535] hover:bg-[#3C2535]/5 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#AB8A6B]" />
                <span>Nhận tư vấn mẫu này</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-2.5 px-3 border border-[#BCA388]/40 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isWishlisted
                    ? 'bg-[#3C2535] text-white border-[#3C2535]'
                    : 'text-[#3C2535] hover:bg-[#FAF7F2]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Đã yêu thích' : 'Lưu yêu thích'}</span>
              </button>
            </div>
          </div>

          {/* Quick Gift Box Promise */}
          <div className="p-3 bg-[#FAF7F2] border border-[#BCA388]/20 text-[11px] text-[#3C2535]/80 space-y-1">
            <div className="font-semibold text-[#3C2535] flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#AB8A6B]" />
              <span>Đặc quyền trọn bộ quà tặng:</span>
            </div>
            <div>• Đã bao gồm hộp quà cứng sang trọng & thắt nơ ruy-băng</div>
            <div>• Tặng kèm thiệp viết tay nhắn gửi lời chúc trân quý</div>
          </div>
        </div>
      </div>

      {/* DETAILED SPECIFICATIONS SECTION (EXACT ORDER REQUIRED) */}
      <section className="bg-[#FAF7F2] border border-[#BCA388]/30 p-6 sm:p-10 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#BCA388]/30 pb-3">
          {[
            { id: 'overview', label: '1. Tổng quan' },
            { id: 'materials', label: '2. Chất liệu & Chi tiết' },
            { id: 'package', label: '3. Hàng đi kèm' },
            { id: 'care', label: '4. Hướng dẫn bảo quản' },
            { id: 'shipping', label: '5. Giao hàng & Đổi trả' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#3C2535] text-[#FEFBFD]'
                  : 'text-[#3C2535]/80 hover:text-[#3C2535] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Tổng quan */}
        {activeTab === 'overview' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-lg text-[#3C2535] font-medium">
              Tổng quan thiết kế & phong cách
            </h3>
            <p className="text-xs sm:text-sm text-[#3C2535]/85 leading-relaxed">
              {product.overview}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white border border-[#BCA388]/20">
                <span className="font-semibold text-[#3C2535] block">Kiểu dáng:</span>
                <span className="text-[#3C2535]/80">{product.name}</span>
              </div>
              <div className="p-3 bg-white border border-[#BCA388]/20">
                <span className="font-semibold text-[#3C2535] block">Phong cách:</span>
                <span className="text-[#3C2535]/80">{product.style}</span>
              </div>
              <div className="p-3 bg-white border border-[#BCA388]/20">
                <span className="font-semibold text-[#3C2535] block">Hoàn cảnh sử dụng:</span>
                <span className="text-[#3C2535]/80">{product.usages.join(', ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Chất liệu & Chi tiết */}
        {activeTab === 'materials' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-lg text-[#3C2535] font-medium">
              Chất liệu và thông số chi tiết
            </h3>
            <div className="divide-y divide-[#BCA388]/20 bg-white border border-[#BCA388]/20 text-xs">
              <div className="p-3 grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#3C2535]">Chất liệu thân túi:</span>
                <span className="col-span-2 text-[#3C2535]/80">
                  {product.materialDetails.bodyMaterial}
                </span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#3C2535]">Lớp lót bên trong:</span>
                <span className="col-span-2 text-[#3C2535]/80">
                  {product.materialDetails.lining}
                </span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#3C2535]">Khóa & Phụ kiện:</span>
                <span className="col-span-2 text-[#3C2535]/80">
                  {product.materialDetails.hardware}
                </span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#3C2535]">Quai xách & Quai đeo:</span>
                <span className="col-span-2 text-[#3C2535]/80">
                  {product.materialDetails.strap}
                </span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#3C2535]">Kích thước thực tế:</span>
                <span className="col-span-2 text-[#3C2535]/80">
                  {product.materialDetails.dimensions}
                </span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                <span className="font-semibold text-[#3C2535]">Trọng lượng:</span>
                <span className="col-span-2 text-[#3C2535]/80">
                  {product.materialDetails.weight}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Hàng đi kèm */}
        {activeTab === 'package' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-lg text-[#3C2535] font-medium">
              Danh sách hàng đi kèm
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-[#BCA388]/30 space-y-2">
                <span className="text-xs font-semibold text-[#3C2535] uppercase tracking-wider block">
                  Đã bao gồm trong giá:
                </span>
                <ul className="text-xs text-[#3C2535]/80 space-y-1.5">
                  {product.packageInclusions.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#AB8A6B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#BCA388]/30 space-y-2">
                <span className="text-xs font-semibold text-[#3C2535] uppercase tracking-wider block">
                  Lựa chọn thêm (Optional):
                </span>
                <ul className="text-xs text-[#3C2535]/80 space-y-1.5">
                  {product.packageInclusions.optional.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#3C2535]/70">
                      <span className="text-[#AB8A6B]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Hướng dẫn bảo quản */}
        {activeTab === 'care' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-lg text-[#3C2535] font-medium">
              Hướng dẫn bảo quản túi
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3C2535]/85 bg-white p-4 border border-[#BCA388]/20">
              {product.careInstructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#AB8A6B] font-semibold">{idx + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 5: Giao hàng, đổi trả & thanh toán */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-[#3C2535]/85">
            <h3 className="font-serif text-lg text-[#3C2535] font-medium">
              Chính sách giao hàng, đổi trả và thanh toán
            </h3>
            <div className="p-4 bg-white border border-[#BCA388]/20 space-y-3">
              <div>
                <span className="font-semibold text-[#3C2535]">Giao hàng: </span>
                <span>{product.deliverySummary} Phí vận chuyển hiển thị 'Chưa xác định' tại bước thanh toán và sẽ được xác nhận khi chốt đơn.</span>
              </div>
              <div>
                <span className="font-semibold text-[#3C2535]">Đổi trả: </span>
                <span>Hỗ trợ đổi mẫu trong vòng 07 ngày đối với sản phẩm còn nguyên hộp quà, túi bảo quản, chưa qua sử dụng.</span>
              </div>
              <div>
                <span className="font-semibold text-[#3C2535]">Phương thức thanh toán: </span>
                <span>Hỗ trợ thanh toán khi nhận hàng (COD) và chuyển khoản ngân hàng (Mô phỏng trong bản demo).</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SẢN PHẨM LIÊN QUAN */}
      <section className="space-y-6 pt-6 border-t border-[#BCA388]/30">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl text-[#3C2535] font-medium">
            Có thể bạn cũng thích
          </h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs text-[#AB8A6B] hover:text-[#3C2535] cursor-pointer"
          >
            Xem tất cả túi xách
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onSelect={(id) => onNavigate('product-detail', { id })}
            />
          ))}
        </div>
      </section>

      {/* FULL-SIZE ZOOM MODAL */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 cursor-pointer z-10"
            aria-label="Đóng phóng to"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="max-h-[75vh] w-auto object-contain shadow-2xl border border-white/20"
            />
            <p className="text-white text-xs mt-3 text-center bg-black/50 px-4 py-1.5 rounded-full">
              {currentImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
