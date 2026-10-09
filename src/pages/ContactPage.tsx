import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Mail, Phone, MapPin, Send, AlertCircle, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Nội dung tin nhắn.');
      return;
    }

    setSubmittedStatus(
      'Bản demo giao diện: Tin nhắn liên hệ đã được ghi nhận trên giao diện thử nghiệm. Lưu ý: Chưa kết nối hệ thống máy chủ/CSKH thực tế.'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
          Kết Nối Với CHAMÉA
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3C2535] font-medium">
          Liên Hệ & Hỗ Trợ Khách Hàng
        </h1>
        <p className="text-xs sm:text-sm text-[#3C2535]/80 leading-relaxed font-sans">
          Đội ngũ tư vấn CHAMÉA luôn sẵn sàng đồng hành, giải đáp mọi thắc mắc về kiểu dáng túi xách, dịch vụ gói quà và đơn hàng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Information Card */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#BCA388]/30 p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-3">
            Thông tin cửa hàng
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#AB8A6B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#3C2535] block">Địa chỉ showroom:</span>
                <span className="text-[#3C2535]/80">Thông tin đang cập nhật</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#AB8A6B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#3C2535] block">Hotline tư vấn:</span>
                <span className="text-[#3C2535]/80">Thông tin đang cập nhật</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#AB8A6B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#3C2535] block">Email chăm sóc khách hàng:</span>
                <span className="text-[#3C2535]/80">Thông tin đang cập nhật</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#AB8A6B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#3C2535] block">Giờ hỗ trợ:</span>
                <span className="text-[#3C2535]/80">08:30 – 21:00 (Thứ Hai – Chủ Nhật)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#BCA388]/20 text-[11px] text-[#3C2535]/75 space-y-1">
            <span className="font-semibold text-[#3C2535] block">Ghi chú minh bạch:</span>
            <p>
              Theo nguyên tắc của bản demo, các thông tin hotline, MST và showroom thực tế chưa được công bố để tránh gây hiểu nhầm cho người dùng.
            </p>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#BCA388]/30 p-6 sm:p-8 space-y-5">
          <h2 className="font-serif text-xl text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-3">
            Gửi tin nhắn hoặc yêu cầu tư vấn
          </h2>

          {submittedStatus ? (
            <div className="p-5 bg-[#FAF7F2] border border-[#AB8A6B]/50 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-[#3C2535]">
                <AlertCircle className="w-4 h-4 text-[#AB8A6B] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">{submittedStatus}</p>
              </div>
              <button
                onClick={() => {
                  setSubmittedStatus(null);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-2 px-4 py-2 bg-[#3C2535] text-white text-xs cursor-pointer"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2535] mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full text-xs p-2.5 bg-[#FAF7F2]/40 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3C2535] mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full text-xs p-2.5 bg-[#FAF7F2]/40 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3C2535] mb-1">
                  Email <span className="text-[#3C2535]/50">(không bắt buộc)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full text-xs p-2.5 bg-[#FAF7F2]/40 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3C2535] mb-1">
                  Nội dung cần hỗ trợ <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bạn muốn tư vấn mẫu túi nào, màu sắc hay đóng gói quà tặng ra sao?..."
                  className="w-full text-xs p-2.5 bg-[#FAF7F2]/40 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
                />
              </div>

              <div className="text-[11px] text-[#3C2535]/65 italic">
                * Biểu mẫu demo tuân thủ nguyên tắc không thông báo tiếp nhận thành công giả khi chưa có hệ thống backend tiếp nhận.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase tracking-wider hover:bg-[#523348] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#AB8A6B]" />
                <span>Gửi thông tin liên hệ</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
