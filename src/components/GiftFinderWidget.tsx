import React, { useState } from 'react';
import { PRODUCTS } from '../data/chameaData';
import { Product, PageRoute } from '../types';
import { Gift, Sparkles, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface GiftFinderWidgetProps {
  onNavigateProduct: (productId: string) => void;
  isStandalonePage?: boolean;
}

export const GiftFinderWidget: React.FC<GiftFinderWidgetProps> = ({
  onNavigateProduct,
  isStandalonePage = false,
}) => {
  const { isPromoActive } = useShop();

  const [step, setStep] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>('người yêu');
  const [style, setStyle] = useState<string>('nữ tính');
  const [usage, setUsage] = useState<string>('đi chơi');
  const [budget, setBudget] = useState<string>('1.2m-1.4m');
  const [occasion, setOccasion] = useState<string>('20/10');

  const [matchedResults, setMatchedResults] = useState<{
    product: Product;
    reason: string;
  }[] | null>(null);

  const recipients = [
    { id: 'mẹ', label: 'Mẹ yêu' },
    { id: 'người yêu', label: 'Người yêu' },
    { id: 'vợ', label: 'Vợ thân yêu' },
    { id: 'bạn bè', label: 'Bạn bè / Đồng nghiệp' },
    { id: 'bản thân', label: 'Tự thưởng bản thân' },
  ];

  const styles = [
    { id: 'tối giản', label: 'Tối giản & Tinh tế' },
    { id: 'nữ tính', label: 'Nữ tính & Dịu dàng' },
    { id: 'nổi bật', label: 'Sang trọng & Nổi bật' },
  ];

  const usages = [
    { id: 'đi làm', label: 'Đi làm công sở' },
    { id: 'đi chơi', label: 'Dạo phố, hẹn hò' },
    { id: 'dự tiệc', label: 'Dự tiệc & Sự kiện' },
  ];

  const budgets = [
    { id: 'under-1.3m', label: 'Khoảng ~ 1.250.000 đ' },
    { id: '1.2m-1.4m', label: 'Khoảng 1.250.000 đ – 1.390.000 đ' },
    { id: 'above-1.4m', label: 'Khoảng 1.400.000 đ – 1.500.000 đ' },
  ];

  const occasions = [
    { id: '20/10', label: 'Ngày Phụ nữ Việt Nam 20/10' },
    { id: '8/3', label: 'Quốc tế Phụ nữ 8/3' },
    { id: 'sinh nhật', label: 'Sinh nhật' },
    { id: 'kỷ niệm', label: 'Kỷ niệm đặc biệt' },
  ];

  const handleFindBag = () => {
    // Evaluation without stereotyping age or relationships
    const matches: { product: Product; reason: string }[] = [];

    PRODUCTS.forEach((prod) => {
      let score = 0;
      let reasons: string[] = [];

      // Style matching
      if (style === 'tối giản' && prod.style.toLowerCase().includes('tối giản')) {
        score += 3;
        reasons.push('đường nét tối giản, tôn lên phong thái đĩnh đạc và tinh tế');
      } else if (style === 'nữ tính' && prod.style.toLowerCase().includes('nữ tính')) {
        score += 3;
        reasons.push('kiểu dáng mềm mại, nữ tính ngọt ngào');
      } else if (style === 'nổi bật' && prod.style.toLowerCase().includes('nổi bật')) {
        score += 3;
        reasons.push('điểm nhấn khóa kim loại mạ vàng sang trọng và thu hút ánh nhìn');
      }

      // Usage matching
      if (usage === 'đi làm' && prod.usages.includes('Đi làm')) {
        score += 2;
        reasons.push('khoang chứa tiện dụng, quai xách đứng phom chuẩn công sở');
      } else if (usage === 'đi chơi' && prod.usages.includes('Đi chơi')) {
        score += 2;
        reasons.push('kích thước thanh thoát, dễ kết hợp váy đầm hay trang phục dạo phố');
      } else if (usage === 'dự tiệc' && prod.usages.includes('Dự tiệc')) {
        score += 2;
        reasons.push('phom túi chỉn chu, chi tiết mạ vàng quý phái cho không gian tiệc');
      }

      // Budget matching
      const currentPrice = isPromoActive ? prod.price : prod.originalPrice || prod.price;
      if (budget === 'under-1.3m' && currentPrice <= 1300000) {
        score += 2;
        reasons.push('vừa vặn với mức ngân sách dự kiến của bạn');
      } else if (budget === '1.2m-1.4m' && currentPrice >= 1200000 && currentPrice <= 1400000) {
        score += 2;
        reasons.push('nằm trọn vẹn trong khoảng ngân sách bạn mong muốn');
      } else if (budget === 'above-1.4m' && currentPrice >= 1400000) {
        score += 2;
        reasons.push('thiết kế cao cấp, chất lượng tương xứng với mức đầu tư');
      }

      if (score >= 3) {
        const customReason = `Thiết kế ${prod.name} phù hợp với lựa chọn của bạn vì ${reasons.join(', ')}. Sản phẩm được đóng gói sẵn trong hộp quà cao cấp và thiệp viết tay, sẵn sàng trao gửi nhân dịp ${occasion}.`;
        matches.push({ product: prod, reason: customReason });
      }
    });

    setMatchedResults(matches);
  };

  const handleReset = () => {
    setMatchedResults(null);
    setStep(1);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  return (
    <div
      className={`bg-[#FAF7F2] border border-[#BCA388]/30 p-6 sm:p-10 ${
        isStandalonePage ? 'max-w-4xl mx-auto shadow-sm' : ''
      }`}
    >
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#AB8A6B] font-semibold tracking-wider uppercase">
          <Sparkles className="w-4 h-4 text-[#AB8A6B]" />
          <span>Trợ Lý Chọn Quà CHAMÉA</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
          Bạn đang tìm túi cho ai?
        </h2>
        <p className="text-xs sm:text-sm text-[#3C2535]/75 leading-relaxed">
          Chỉ mất 1 phút để CHAMÉA gợi ý mẫu túi chuẩn phong cách, đúng nhu cầu sử dụng và vừa vặn ngân sách cho người bạn trân trọng.
        </p>
      </div>

      {!matchedResults ? (
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Step 1: Người nhận */}
          <div>
            <label className="block text-xs font-semibold text-[#3C2535] uppercase tracking-wider mb-2.5">
              1. Bạn muốn tặng quà cho ai?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {recipients.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRecipient(r.id)}
                  className={`p-3 text-xs text-left border transition-all cursor-pointer flex items-center justify-between ${
                    recipient === r.id
                      ? 'border-[#3C2535] bg-[#3C2535] text-[#FEFBFD]'
                      : 'border-[#BCA388]/40 bg-white text-[#3C2535] hover:border-[#AB8A6B]'
                  }`}
                >
                  <span>{r.label}</span>
                  {recipient === r.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Phong cách */}
          <div>
            <label className="block text-xs font-semibold text-[#3C2535] uppercase tracking-wider mb-2.5">
              2. Phong cách mà người nhận yêu thích:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id)}
                  className={`p-3 text-xs text-left border transition-all cursor-pointer flex items-center justify-between ${
                    style === s.id
                      ? 'border-[#3C2535] bg-[#3C2535] text-[#FEFBFD]'
                      : 'border-[#BCA388]/40 bg-white text-[#3C2535] hover:border-[#AB8A6B]'
                  }`}
                >
                  <span>{s.label}</span>
                  {style === s.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Nhu cầu */}
          <div>
            <label className="block text-xs font-semibold text-[#3C2535] uppercase tracking-wider mb-2.5">
              3. Nhu cầu sử dụng chủ yếu:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {usages.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUsage(u.id)}
                  className={`p-3 text-xs text-left border transition-all cursor-pointer flex items-center justify-between ${
                    usage === u.id
                      ? 'border-[#3C2535] bg-[#3C2535] text-[#FEFBFD]'
                      : 'border-[#BCA388]/40 bg-white text-[#3C2535] hover:border-[#AB8A6B]'
                  }`}
                >
                  <span>{u.label}</span>
                  {usage === u.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Ngân sách & Dịp tặng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#3C2535] uppercase tracking-wider mb-2.5">
                4. Khoảng ngân sách dự kiến:
              </label>
              <div className="space-y-2">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudget(b.id)}
                    className={`w-full p-2.5 text-xs text-left border transition-all cursor-pointer flex items-center justify-between ${
                      budget === b.id
                        ? 'border-[#3C2535] bg-[#3C2535] text-[#FEFBFD]'
                        : 'border-[#BCA388]/40 bg-white text-[#3C2535] hover:border-[#AB8A6B]'
                    }`}
                  >
                    <span>{b.label}</span>
                    {budget === b.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2535] uppercase tracking-wider mb-2.5">
                5. Dịp tặng quà:
              </label>
              <div className="space-y-2">
                {occasions.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOccasion(o.id)}
                    className={`w-full p-2.5 text-xs text-left border transition-all cursor-pointer flex items-center justify-between ${
                      occasion === o.id
                        ? 'border-[#3C2535] bg-[#3C2535] text-[#FEFBFD]'
                        : 'border-[#BCA388]/40 bg-white text-[#3C2535] hover:border-[#AB8A6B]'
                    }`}
                  >
                    <span>{o.label}</span>
                    {occasion === o.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 text-center">
            <button
              onClick={handleFindBag}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold tracking-wider uppercase hover:bg-[#523348] transition-colors shadow-sm cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4 text-[#AB8A6B]" />
              <span>Tìm chiếc túi phù hợp</span>
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#BCA388]/30">
            <h3 className="font-serif text-lg text-[#3C2535] font-medium">
              Gợi ý thiết kế phù hợp ({matchedResults.length})
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-[#AB8A6B] hover:text-[#3C2535] flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Điều chỉnh tiêu chí</span>
            </button>
          </div>

          {matchedResults.length === 0 ? (
            <div className="text-center py-10 bg-white border border-[#BCA388]/20 p-6 space-y-3">
              <p className="text-sm text-[#3C2535]">
                Chưa tìm thấy mẫu túi thỏa mãn đồng thời tất cả các tiêu chí hẹp vừa chọn.
              </p>
              <p className="text-xs text-[#3C2535]/70">
                Hãy thử mở rộng khoảng ngân sách hoặc chuyển sang phong cách khác để xem thêm gợi ý phù hợp.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-5 py-2 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium cursor-pointer"
              >
                Chọn lại tiêu chí
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {matchedResults.map(({ product, reason }) => {
                const currentPrice = isPromoActive
                  ? product.price
                  : product.originalPrice || product.price;

                return (
                  <div
                    key={product.id}
                    className="p-5 bg-white border border-[#BCA388]/30 shadow-xs flex flex-col md:flex-row gap-5 items-center hover:border-[#AB8A6B] transition-colors"
                  >
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-32 h-32 object-cover shrink-0 border border-[#BCA388]/20 bg-[#FAF7F2]"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-serif text-base font-medium text-[#3C2535]">
                          {product.name}
                        </h4>
                        <div className="text-sm font-semibold text-[#3C2535] font-mono tabular-nums">
                          {formatPrice(currentPrice)}
                        </div>
                      </div>

                      <div className="text-xs text-[#3C2535]/80 leading-relaxed bg-[#FAF7F2] p-3 border-l-2 border-[#AB8A6B]">
                        <span className="font-semibold text-[#3C2535]">Lý do phù hợp: </span>
                        {reason}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#3C2535]/70">
                          <span>Màu sắc:</span>
                          {product.colors.map((c) => (
                            <span
                              key={c.code}
                              className="w-3 h-3 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => onNavigateProduct(product.id)}
                          className="px-4 py-2 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem chi tiết & Đặt túi</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
