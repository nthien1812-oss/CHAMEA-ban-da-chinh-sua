import React, { useState } from 'react';
import { ChameaLogo } from './ChameaLogo';
import { PageRoute, BagSilhouette, CollectionId } from '../types';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute, params?: { silhouette?: BagSilhouette; collection?: CollectionId; policyTab?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setNewsletterStatus('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    // Transparent demo message as required
    setNewsletterStatus('Hệ thống bản demo: Ghi nhận email thử nghiệm thành công (chưa kết nối máy chủ gửi mail thực tế).');
    setEmail('');
  };

  return (
    <footer className="bg-[#3C2535] text-[#FEFBFD] pt-16 pb-12 border-t border-[#AB8A6B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#AB8A6B]/20">
          {/* Col 1 & 2: Brand Lockup & Philosophy */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <div className="flex flex-col items-start cursor-pointer" onClick={() => onNavigate('home')}>
              <ChameaLogo variant="full" theme="dark" size="lg" />
            </div>

            <p className="text-xs leading-relaxed text-[#D9C8BA] max-w-sm pt-2">
              CHAMÉA tôn vinh vẻ đẹp thanh lịch, nữ tính và dễ ứng dụng của phụ nữ hiện đại. 
              Mỗi thiết kế là một lời nhắn gửi trân trọng: Chạm đúng người · Trao đúng quà.
            </p>

            <div className="pt-2 text-[11px] text-[#AB8A6B] space-y-1">
              <div>• Thiết kế nhận diện độc quyền CHAMÉA</div>
              <div>• Tông màu chủ đạo: Tím mận (#3C2535) & Champagne (#AB8A6B)</div>
            </div>
          </div>

          {/* Col 3: Khám phá */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#FEFBFD] border-b border-[#AB8A6B]/30 pb-2">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-[#D9C8BA]">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Tất cả túi xách
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { silhouette: 'tui-xach-tay' })}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Túi xách tay
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', { silhouette: 'tui-deo-vai' })}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Túi đeo vai
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Bộ sưu tập biên tập
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gift-finder')}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Công cụ chọn quà 20/10
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Về thương hiệu CHAMÉA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hỗ trợ & Chính sách */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#FEFBFD] border-b border-[#AB8A6B]/30 pb-2">
              Hỗ Trợ & Chính Sách
            </h4>
            <ul className="space-y-2 text-xs text-[#D9C8BA]">
              <li>
                <button
                  onClick={() => onNavigate('policy', { policyTab: 'guide' })}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Hướng dẫn mua hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', { policyTab: 'shipping' })}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Chính sách giao hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', { policyTab: 'returns' })}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Chính sách đổi trả & hoàn tiền
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policy', { policyTab: 'privacy' })}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Chính sách bảo mật
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FEFBFD] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Yêu cầu tư vấn chọn túi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Đăng ký nhận tin & Liên hệ */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-wider uppercase text-[#FEFBFD] border-b border-[#AB8A6B]/30 pb-2">
              Đăng Ký Nhận Tin
            </h4>
            <p className="text-xs text-[#D9C8BA] leading-relaxed">
              Nhận thông tin ra mắt bộ sưu tập mới và cẩm nang chọn quà tinh tế.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="w-full bg-[#2A1824] border border-[#AB8A6B]/40 text-[#FEFBFD] text-xs px-3 py-2 pr-9 focus:outline-hidden focus:border-[#AB8A6B] placeholder:text-[#BCA388]/60"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2 text-[#AB8A6B] hover:text-[#FEFBFD] cursor-pointer"
                  title="Gửi"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>

              {newsletterStatus && (
                <div className="text-[11px] p-2 bg-[#2A1824] text-[#ECD5D8] border border-[#AB8A6B]/30 flex items-start gap-1.5 leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 text-[#AB8A6B] shrink-0 mt-0.5" />
                  <span>{newsletterStatus}</span>
                </div>
              )}
            </form>

            <div className="pt-2">
              <div className="text-xs font-medium text-[#FEFBFD]">Thông tin liên hệ:</div>
              <div className="text-[11px] text-[#AB8A6B] mt-1 space-y-0.5">
                <div>• Hotline & Địa chỉ: <span className="text-[#D9C8BA]">Thông tin đang cập nhật</span></div>
                <div>• Mạng xã hội: <span className="text-[#D9C8BA]">Đang kết nối</span></div>
                <div>• Tên miền: <span className="text-[#D9C8BA]">chamea.vn (đề xuất)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#BCA388]/80 gap-4">
          <p>© 2026 CHAMÉA. Mọi quyền được bảo lưu. “Chạm đúng người · Trao đúng quà”.</p>
          <div className="flex items-center gap-4 text-[#D9C8BA]/70">
            <span>Bản demo trải nghiệm thương mại điện tử CHAMÉA</span>
            <span>·</span>
            <span>Phương thức thanh toán: COD & Chuyển khoản (Mô phỏng)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
