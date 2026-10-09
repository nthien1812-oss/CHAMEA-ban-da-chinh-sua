import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { isConsultationOpen, setIsConsultationOpen, consultationProduct } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại để nhận tư vấn.');
      return;
    }

    setDemoNotice(
      'Bản demo giao diện: Yêu cầu tư vấn đã được ghi nhận trên giao diện thử nghiệm. Lưu ý: Chưa kết nối hệ thống tổng đài/CSKH thực tế.'
    );
  };

  const handleClose = () => {
    setIsConsultationOpen(false);
    setDemoNotice(null);
    setFullName('');
    setPhone('');
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FEFBFD] border border-[#BCA388]/40 w-full max-w-lg shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-[#3C2535]/60 hover:text-[#3C2535] cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <MessageSquare className="w-5 h-5 text-[#AB8A6B]" />
          <h3 className="font-serif text-xl font-medium text-[#3C2535]">
            Nhận tư vấn chọn túi CHAMÉA
          </h3>
        </div>

        <p className="text-xs text-[#3C2535]/75 leading-relaxed mb-5">
          CHAMÉA giúp bạn cân nhắc tỉ mỉ theo phong cách, nhu cầu sử dụng, dịp tặng và ngân sách để tìm được thiết kế vừa vặn nhất.
        </p>

        {consultationProduct && (
          <div className="p-3 mb-5 bg-[#FAF7F2] border border-[#BCA388]/30 flex items-center gap-3">
            <img
              src={consultationProduct.images[0]?.url}
              alt={consultationProduct.name}
              className="w-12 h-12 object-cover border border-[#BCA388]/20"
            />
            <div className="text-xs">
              <div className="font-medium text-[#3C2535]">Mẫu bạn đang quan tâm:</div>
              <div className="text-[#3C2535]/80 font-serif">{consultationProduct.name} ({consultationProduct.code})</div>
            </div>
          </div>
        )}

        {demoNotice ? (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#FAF7F2] border border-[#AB8A6B]/40 text-xs text-[#3C2535] leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#AB8A6B] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#3C2535] mb-1">Trạng thái biểu mẫu demo</p>
                <p>{demoNotice}</p>
              </div>
            </div>

            <div className="text-[11px] text-[#3C2535]/65">
              Họ tên: {fullName} · SĐT: {phone}
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors cursor-pointer"
            >
              Đã hiểu & Đóng
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Họ và tên của bạn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Hoàng Mai Linh"
                className="w-full text-xs p-2.5 bg-white border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Số điện thoại liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0912 345 678"
                className="w-full text-xs p-2.5 bg-white border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Nhu cầu hoặc thắc mắc của bạn (không bắt buộc)
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Mình muốn tìm túi tặng mẹ dịp 20/10, mẹ thích màu trầm thanh lịch..."
                className="w-full text-xs p-2.5 bg-white border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
            </div>

            <p className="text-[11px] text-[#3C2535]/60 italic">
              * Biểu mẫu demo tuân thủ nguyên tắc không tạo thông báo tiếp nhận giả khi chưa kết nối đường truyền thực tế.
            </p>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium tracking-wide uppercase hover:bg-[#523348] transition-colors cursor-pointer"
            >
              Gửi yêu cầu tư vấn
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
