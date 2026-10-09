import React from 'react';
import { PRODUCTS, SILHOUETTES_INFO, ARTICLES, DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import { ProductCard } from '../components/ProductCard';
import { GiftFinderWidget } from '../components/GiftFinderWidget';
import { CampaignVideoSection } from '../components/CampaignVideoSection';
import { PageRoute, BagSilhouette, CollectionId } from '../types';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Gift, MessageSquare, BookOpen, Film } from 'lucide-react';

interface HomePageProps {
  onNavigate: (
    page: PageRoute,
    params?: {
      silhouette?: BagSilhouette;
      collection?: CollectionId;
      id?: string;
      articleId?: string;
    }
  ) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openConsultation, isPromoActive } = useShop();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* B. BANNER CHÍNH (HERO) */}
      <section className="relative w-full overflow-hidden bg-[#FAF7F2]">
        {/* Desktop Image Banner */}
        <div className="hidden md:block relative w-full h-[580px] lg:h-[640px] group">
          <img
            src="/src/assets/images/hero_chamea_shelf_showcase_1791565155506.jpg"
            alt="CHAMÉA - Quà tinh tế cho người đặc biệt - Kệ trưng bày BST 20/10"
            className="w-full h-full object-cover object-right lg:object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to enhance button contrast and text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="max-w-xl text-[#FEFBFD] space-y-5">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ECD5D8] font-medium">
                  <span className="w-6 h-px bg-[#AB8A6B]" />
                  <span>Bộ sưu tập quà tặng CHAMÉA</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-balance leading-tight text-white drop-shadow-sm">
                  Quà tinh tế cho người đặc biệt
                </h1>

                <p className="font-serif italic text-base sm:text-lg text-[#FAF7F2]/90 font-light tracking-wide">
                  Một chiếc túi. Một nét riêng.
                </p>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-sans max-w-md leading-relaxed">
                  Thiết kế thanh lịch, nữ tính và dễ ứng dụng — chạm đúng gu thẩm mỹ, trọn vẹn lời gửi gắm trân trọng.
                </p>

                {/* 3 Signature bags on shelf indicator */}
                <div className="pt-1">
                  <div className="text-[11px] text-[#D9C8BA] uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#AB8A6B]" />
                    <span>3 mẫu túi trên kệ trưng bày:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onNavigate('product-detail', { id: 'chamea-classic-flap-satchel' })}
                      className="px-2.5 py-1.5 bg-black/40 hover:bg-black/60 border border-[#BCA388]/40 hover:border-[#AB8A6B] text-[11px] text-white flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FAF7F2] border border-white/40" />
                      <span>Trắng ngà (Satchel)</span>
                    </button>
                    <button
                      onClick={() => onNavigate('product-detail', { id: 'chamea-classic-flap-satchel' })}
                      className="px-2.5 py-1.5 bg-black/40 hover:bg-black/60 border border-[#BCA388]/40 hover:border-[#AB8A6B] text-[11px] text-white flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#3C2535] border border-[#AB8A6B]" />
                      <span>Tím mận (Monogram)</span>
                    </button>
                    <button
                      onClick={() => onNavigate('product-detail', { id: 'chamea-classic-flap-satchel' })}
                      className="px-2.5 py-1.5 bg-black/40 hover:bg-black/60 border border-[#BCA388]/40 hover:border-[#AB8A6B] text-[11px] text-white flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#E8B8B8] border border-white/40" />
                      <span>Hồng phấn (Satchel)</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() =>
                      onNavigate('collection-detail', { collection: 'qua-tang-20-10' })
                    }
                    className="px-6 py-3 bg-[#3C2535] text-[#FEFBFD] border border-[#AB8A6B]/50 hover:bg-[#523348] text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span>Khám phá bộ sưu tập</span>
                    <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
                  </button>

                  <button
                    onClick={() => onNavigate('gift-finder')}
                    className="px-6 py-3 bg-white/90 hover:bg-white text-[#3C2535] text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Gift className="w-4 h-4 text-[#AB8A6B]" />
                    <span>Tìm túi phù hợp</span>
                  </button>

                  <a
                    href="#campaign-video"
                    className="px-4 py-3 bg-black/40 hover:bg-black/60 border border-white/30 text-white text-xs font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-xs"
                  >
                    <Film className="w-4 h-4 text-[#AB8A6B]" />
                    <span>Xem video</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Hotspot 1: Ivory Satchel on Top Shelf */}
          <div className="absolute top-[28%] right-[22%] z-20 group/pin">
            <button
              onClick={() => onNavigate('product-detail', { id: 'chamea-classic-flap-satchel' })}
              aria-label="Xem Túi Classic Satchel Trắng Ngà"
              className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#3C2535]/80 text-[#FEFBFD] border border-[#AB8A6B] shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-[#AB8A6B] animate-ping opacity-35" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FAF7F2]" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-48 p-2.5 bg-[#3C2535]/95 text-white text-xs shadow-xl border border-[#AB8A6B]/60 backdrop-blur-xs pointer-events-auto">
              <div className="font-serif text-[12px] font-medium text-[#FAF7F2]">Classic Satchel (Trắng Ngà)</div>
              <div className="text-[11px] text-[#AB8A6B] font-medium mt-0.5">1.250.000₫ <span className="line-through text-white/50 text-[10px]">1.562.500₫</span></div>
              <div className="text-[10px] text-white/70 mt-1">Nắp gập thanh lịch, quai xách đứng phom</div>
              <div className="mt-1.5 text-[10px] text-[#AB8A6B] font-semibold flex items-center gap-1">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Interactive Hotspot 2: Deep Plum Monogram Bag in Center */}
          <div className="absolute top-[46%] right-[42%] z-20 group/pin">
            <button
              onClick={() => onNavigate('product-detail', { id: 'chamea-classic-flap-satchel' })}
              aria-label="Xem Túi Monogram Tím Mận"
              className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#3C2535]/80 text-[#FEFBFD] border border-[#AB8A6B] shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-[#AB8A6B] animate-ping opacity-35" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#AB8A6B]" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-48 p-2.5 bg-[#3C2535]/95 text-white text-xs shadow-xl border border-[#AB8A6B]/60 backdrop-blur-xs pointer-events-auto">
              <div className="font-serif text-[12px] font-medium text-[#FAF7F2]">Monogram Satchel (Tím Mận)</div>
              <div className="text-[11px] text-[#AB8A6B] font-medium mt-0.5">1.250.000₫ <span className="line-through text-white/50 text-[10px]">1.562.500₫</span></div>
              <div className="text-[10px] text-white/70 mt-1">Khóa C đúc nổi lồng ruy băng & sao vàng</div>
              <div className="mt-1.5 text-[10px] text-[#AB8A6B] font-semibold flex items-center gap-1">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Interactive Hotspot 3: Dusty Rose Pink Satchel on Lower Shelf */}
          <div className="absolute top-[65%] right-[14%] z-20 group/pin">
            <button
              onClick={() => onNavigate('product-detail', { id: 'chamea-classic-flap-satchel' })}
              aria-label="Xem Túi Classic Satchel Hồng Phấn"
              className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#3C2535]/80 text-[#FEFBFD] border border-[#AB8A6B] shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-[#AB8A6B] animate-ping opacity-35" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8B8B8]" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-48 p-2.5 bg-[#3C2535]/95 text-white text-xs shadow-xl border border-[#AB8A6B]/60 backdrop-blur-xs pointer-events-auto">
              <div className="font-serif text-[12px] font-medium text-[#FAF7F2]">Classic Satchel (Hồng Phấn)</div>
              <div className="text-[11px] text-[#AB8A6B] font-medium mt-0.5">1.250.000₫ <span className="line-through text-white/50 text-[10px]">1.562.500₫</span></div>
              <div className="text-[10px] text-white/70 mt-1">Khóa kim loại khắc CHAMÉA ngọt ngào</div>
              <div className="mt-1.5 text-[10px] text-[#AB8A6B] font-semibold flex items-center gap-1">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Poster View */}
        <div className="block md:hidden">
          <div className="relative aspect-4/5 w-full overflow-hidden">
            <img
              src="/src/assets/images/hero_chamea_shelf_mobile_1791565184695.jpg"
              alt="CHAMÉA Poster - Kệ trưng bày các mẫu túi"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 text-white space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#ECD5D8]">
                CHAMÉA • 20/10
              </span>
              <h1 className="font-serif text-2xl font-medium leading-snug">
                Quà tinh tế cho người đặc biệt
              </h1>
              <p className="font-serif italic text-xs text-[#FAF7F2]/90">
                Một chiếc túi. Một nét riêng.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() =>
                    onNavigate('collection-detail', { collection: 'qua-tang-20-10' })
                  }
                  className="py-2.5 px-3 bg-[#3C2535] text-white text-[11px] font-semibold uppercase text-center border border-[#AB8A6B]/40 cursor-pointer"
                >
                  Khám phá BST
                </button>
                <button
                  onClick={() => onNavigate('gift-finder')}
                  className="py-2.5 px-3 bg-white text-[#3C2535] text-[11px] font-semibold uppercase text-center cursor-pointer"
                >
                  Tìm túi quà
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THƯỚC PHIM CHIẾN DỊCH (CAMPAIGN VIDEO REEL) */}
      <CampaignVideoSection onNavigate={onNavigate} />

      {/* C. DANH MỤC DÁNG TÚI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium tracking-tight">
            Chọn dáng túi, tìm nét riêng
          </h2>
          <p className="text-xs sm:text-sm text-[#3C2535]/75">
            Mỗi phom dáng đại diện cho một cách thể hiện cá tính và phong thái ứng biến thường nhật.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SILHOUETTES_INFO.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                onNavigate('catalog', { silhouette: item.id as BagSilhouette })
              }
              className="group cursor-pointer bg-[#FEFBFD] border border-[#BCA388]/30 overflow-hidden hover:border-[#AB8A6B] hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif text-lg text-[#3C2535] group-hover:text-[#AB8A6B] transition-colors font-medium">
                    {item.name}
                  </h3>
                  <div className="text-xs font-medium text-[#AB8A6B] mt-0.5">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-[#3C2535]/70 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-xs font-medium text-[#3C2535] group-hover:text-[#AB8A6B]">
                  <span>Xem các mẫu {item.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* D. SẢN PHẨM NỔI BẬT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#BCA388]/20 pb-4">
          <div>
            <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-wider">
              Thiết Kế Chọn Lọc
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium tracking-tight mt-1">
              Những thiết kế dành cho bạn
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-medium text-[#3C2535] hover:text-[#AB8A6B] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Xem tất cả túi xách ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(id) => onNavigate('product-detail', { id })}
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-[11px] text-[#3C2535]/60 italic">
            * {DEMO_PRICE_DISCLAIMER}
          </span>
        </div>
      </section>

      {/* E. BỘ SƯU TẬP QUÀ TẶNG (DEEP PLUM BANNER SHOWCASE) */}
      <section className="bg-[#3C2535] text-[#FEFBFD] py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual gift box showcase */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="relative border border-[#AB8A6B]/40 p-2 bg-[#2A1824] shadow-2xl">
                <img
                  src="/src/assets/images/detail_gift_box_packaging_1791534358832.jpg"
                  alt="Hộp quà tặng CHAMÉA thắt ruy băng"
                  className="w-full h-[320px] sm:h-[400px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#3C2535]/90 backdrop-blur-xs p-3 border border-[#AB8A6B]/30 text-xs text-[#ECD5D8] flex items-center justify-between">
                  <span>Trọn bộ hộp quà cứng, túi vải dustbag & thiệp viết tay</span>
                  <Sparkles className="w-4 h-4 text-[#AB8A6B]" />
                </div>
              </div>
            </div>

            {/* Content outside image */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AB8A6B] font-medium">
                <Gift className="w-4 h-4" />
                <span>Chiến dịch đặc biệt 20/10</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                Trao đúng quà, chạm đúng người
              </h2>

              <p className="text-xs sm:text-sm text-[#D9C8BA] leading-relaxed font-sans">
                Khám phá những thiết kế phù hợp với phong cách và những dịp đặc biệt của người bạn trân trọng.
                Mỗi chiếc túi trao đi là một lời chúc trọn vẹn, gói ghém trong chiếc hộp sang trọng và trang nhã.
              </p>

              <div className="pt-2">
                <button
                  onClick={() =>
                    onNavigate('collection-detail', { collection: 'qua-tang-20-10' })
                  }
                  className="px-7 py-3.5 bg-[#AB8A6B] hover:bg-[#8F7053] text-[#3C2535] hover:text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Khám phá quà tặng 20/10</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F. CÔNG CỤ CHỌN QUÀ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GiftFinderWidget
          onNavigateProduct={(id) => onNavigate('product-detail', { id })}
        />
      </section>

      {/* G. GIỚI THIỆU THƯƠNG HIỆU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#BCA388]/30 p-6 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Atelier Image */}
            <div className="lg:col-span-5">
              <div className="relative border border-[#BCA388]/40 overflow-hidden shadow-sm">
                <img
                  src="/src/assets/images/brand_chamea_craft_1791534144441.jpg"
                  alt="Nghệ thuật chế tác túi xách CHAMÉA"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>

            {/* Exact brand copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs text-[#AB8A6B] font-semibold tracking-wider uppercase">
                Về Thương Hiệu
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium leading-snug">
                Món quà bắt đầu từ sự thấu hiểu
              </h2>

              <p className="text-xs sm:text-sm text-[#3C2535]/85 leading-relaxed text-justify sm:text-left">
                CHAMÉA là thương hiệu túi xách dành cho phụ nữ hiện đại, hướng đến thiết kế thanh lịch, nữ tính và dễ ứng dụng. CHAMÉA tin rằng mỗi chiếc túi không chỉ tôn lên gu thẩm mỹ giúp phái đẹp khẳng định bản thân, mà còn là từng lời gửi gắm trân trọng đến người phụ nữ bạn yêu thương. Từ dòng túi công sở tối giản đến thiết kế nổi bật cho buổi gặp gỡ, CHAMÉA mang đến sự thấu hiểu trọn vẹn, giúp mỗi lựa chọn đều vừa vặn với phong cách, nhu cầu và câu chuyện riêng.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 border border-[#3C2535] text-[#3C2535] text-xs font-medium hover:bg-[#3C2535] hover:text-[#FEFBFD] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Tìm hiểu thêm về CHAMÉA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. GÓC CHỌN QUÀ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-wider">
            Cẩm Nang & Ý Tưởng
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium tracking-tight">
            Góc chọn quà
          </h2>
          <p className="text-xs sm:text-sm text-[#3C2535]/75">
            Những chia sẻ tâm tình giúp bạn dễ dàng chọn được món quà chuẩn gu phái đẹp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate('article-detail', { articleId: art.id })}
              className="group cursor-pointer bg-[#FEFBFD] border border-[#BCA388]/30 overflow-hidden hover:border-[#AB8A6B] hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-[#AB8A6B] font-medium">
                    {art.readTime} · {art.publishDate}
                  </div>
                  <h3 className="font-serif text-base text-[#3C2535] group-hover:text-[#AB8A6B] transition-colors font-medium mt-1 line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#3C2535]/70 mt-2 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-medium text-[#3C2535] group-hover:text-[#AB8A6B]">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* I. KHỐI TƯ VẤN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border-2 border-[#BCA388]/40 p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#3C2535] text-[#FEFBFD] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6 text-[#AB8A6B]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
            Chưa biết chọn mẫu nào?
          </h2>

          <p className="text-xs sm:text-sm text-[#3C2535]/80 max-w-lg mx-auto leading-relaxed">
            CHAMÉA giúp bạn cân nhắc theo phong cách, nhu cầu và ngân sách.
          </p>

          <div className="pt-2">
            <button
              onClick={() => openConsultation(null)}
              className="px-8 py-3.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold tracking-wider uppercase hover:bg-[#523348] transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Nhận tư vấn chọn túi</span>
              <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
