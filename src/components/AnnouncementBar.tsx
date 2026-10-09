import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Gift, Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { isPromoActive, setIsPromoActive } = useShop();
  const [showConfigModal, setShowConfigModal] = useState(false);

  return (
    <>
      <div className="bg-[#3C2535] text-[#FEFBFD] text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Main announcement text */}
          <div className="flex-1 text-center font-sans font-medium tracking-wide flex items-center justify-center gap-2">
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#AB8A6B]" />
            <span>CHAMÉA — Chạm đúng người · Trao đúng quà</span>
            {isPromoActive && (
              <span className="inline-flex items-center gap-1 bg-[#AB8A6B]/25 text-[#ECD5D8] px-2 py-0.5 rounded text-[11px] font-normal border border-[#AB8A6B]/30">
                <Gift className="w-3 h-3 text-[#AB8A6B]" />
                Ưu đãi chiến dịch 20%
              </span>
            )}
          </div>

          {/* Configurable campaign button */}
          <button
            onClick={() => setShowConfigModal(true)}
            className="text-[11px] text-[#AB8A6B] hover:text-[#FEFBFD] underline underline-offset-2 transition-colors whitespace-nowrap hidden md:inline-flex items-center gap-1 cursor-pointer"
            title="Cấu hình chiến dịch ưu đãi demo"
          >
            <span>Cài đặt ưu đãi demo</span>
          </button>
        </div>
      </div>

      {/* Campaign settings modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#FEFBFD] border border-[#BCA388]/30 max-w-md w-full p-6 shadow-xl relative">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 text-[#3C2535]/60 hover:text-[#3C2535] p-1 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#AB8A6B]" />
              <h3 className="font-serif text-lg font-medium text-[#3C2535]">
                Cấu hình chiến dịch ưu đãi
              </h3>
            </div>

            <p className="text-xs text-[#3C2535]/80 leading-relaxed mb-4">
              Theo brief, thông tin ưu đãi 20% trong ảnh chiến dịch là bản demo; thời gian và điều kiện áp dụng có thể cấu hình linh hoạt mà không bịa số liệu.
            </p>

            <div className="space-y-3 bg-[#FAF7F2] p-4 border border-[#BCA388]/20 mb-5">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[#3C2535]">
                  Bật ưu đãi demo 20% toàn bộ túi xách:
                </span>
                <input
                  type="checkbox"
                  checked={isPromoActive}
                  onChange={(e) => setIsPromoActive(e.target.checked)}
                  className="w-4 h-4 accent-[#3C2535] cursor-pointer"
                />
              </label>

              <div className="text-[11px] text-[#3C2535]/70 pt-2 border-t border-[#BCA388]/20 space-y-1">
                <div>• Áp dụng: Tất cả sản phẩm túi xách hiện có</div>
                <div>• Cách tính: Giá sau giảm = Giá niêm yết × 0,8</div>
                <div>• Không tính giảm kép hai lần ở giỏ hàng và thanh toán.</div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors cursor-pointer"
              >
                Đóng & Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
