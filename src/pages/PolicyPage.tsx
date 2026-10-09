import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, Truck, RotateCcw, HelpCircle, Lock } from 'lucide-react';

interface PolicyPageProps {
  initialTab?: string;
  onNavigate: (page: PageRoute) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({
  initialTab = 'shipping',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'guide', label: 'Hướng dẫn mua hàng', icon: HelpCircle },
    { id: 'shipping', label: 'Chính sách giao hàng', icon: Truck },
    { id: 'returns', label: 'Chính sách đổi trả & hoàn tiền', icon: RotateCcw },
    { id: 'privacy', label: 'Chính sách bảo mật', icon: Lock },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-10">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
          Quy Định & Quyền Lợi Khách Hàng
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3C2535] font-medium">
          Chính Sách CHAMÉA
        </h1>
        <p className="text-xs text-[#3C2535]/70">
          Minh bạch trong từng khâu phục vụ để bạn luôn an tâm khi lựa chọn quà tặng.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#BCA388]/30 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#3C2535] text-[#FEFBFD] border-[#3C2535]'
                  : 'bg-white text-[#3C2535] border-[#BCA388]/30 hover:border-[#AB8A6B]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#AB8A6B]' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white border border-[#BCA388]/30 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#3C2535]/85 leading-relaxed">
        {activeTab === 'guide' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-2">
              Hướng dẫn đặt mua túi xách CHAMÉA
            </h2>
            <p>
              Quy trình mua sắm tại CHAMÉA được thiết kế đơn giản, nhanh chóng và tinh tế:
            </p>
            <div className="space-y-3 pl-4">
              <div>
                <strong className="text-[#3C2535]">Bước 1: Chọn mẫu túi phù hợp.</strong> Bạn có thể duyệt theo dáng túi (xách tay, đeo vai, đeo chéo), theo bộ sưu tập hoặc sử dụng Trợ lý gợi ý quà tặng để tìm theo phong cách.
              </div>
              <div>
                <strong className="text-[#3C2535]">Bước 2: Chọn màu sắc & số lượng.</strong> Xem kỹ 4 góc ảnh thực tế và thông số kích thước, sau đó bấm "Thêm vào giỏ hàng" hoặc "Mua ngay".
              </div>
              <div>
                <strong className="text-[#3C2535]">Bước 3: Nhập thông tin & lời chúc viết tay.</strong> Điền địa chỉ nhận hàng và lời chúc bạn muốn viết tay vào thiệp tặng quà.
              </div>
              <div>
                <strong className="text-[#3C2535]">Bước 4: Xác nhận đơn.</strong> Lựa chọn phương thức thanh toán phù hợp.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-2">
              Chính sách đóng gói & giao hàng
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Quy cách đóng gói quà tặng cao cấp:</strong> Mỗi chiếc túi được bọc túi vải dustbag, đặt ngay ngắn trong hộp cứng CHAMÉA, thắt ruy-băng lụa tím mận và bọc thêm lớp thùng carton chống sốc bên ngoài nhằm bảo vệ nguyên vẹn tính thẩm mỹ khi đến tay người nhận.
              </p>
              <p>
                <strong>Phí vận chuyển:</strong> Trong bản demo, phí vận chuyển hiển thị trạng thái "Chưa xác định" và sẽ được nhân viên chăm sóc khách hàng liên hệ báo cụ thể tùy theo địa chỉ nhận hàng (nội thành hay tỉnh xa).
              </p>
              <p>
                <strong>Thời gian giao dự kiến:</strong> Khu vực nội thành từ 1–2 ngày làm việc; các tỉnh/thành khác từ 2–4 ngày làm việc.
              </p>
              <p>
                <strong>Đồng kiểm khi nhận:</strong> Khách hàng được quyền kiểm tra hình thức thùng đóng gói bên ngoài trước khi thanh toán cho nhân viên bưu tá.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-2">
              Chính sách đổi trả & bảo hành
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Thời hạn đổi sản phẩm:</strong> Trong vòng 07 ngày kể từ khi nhận hàng.
              </p>
              <p>
                <strong>Điều kiện đổi trả:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sản phẩm còn mới nguyên 100%, chưa qua sử dụng hoặc có vết bẩn, trầy xước.</li>
                <li>Đầy đủ phụ kiện đi kèm: quai đeo chéo, tag da, túi vải dustbag, thiệp và hộp quà cứng CHAMÉA còn nguyên vẹn.</li>
                <li>Hỗ trợ đổi màu hoặc đổi sang dáng túi khác nếu người nhận chưa thực sự vừa ý.</li>
              </ul>
              <p>
                <strong>Thông tin chi tiết về chính sách bảo hành:</strong> Đang cập nhật.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-2">
              Chính sách bảo mật thông tin
            </h2>
            <p>
              CHAMÉA cam kết tôn trọng và bảo mật tối đa quyền riêng tư của khách hàng:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Thông tin họ tên, số điện thoại, địa chỉ và lời nhắn tặng quà chỉ phục vụ mục đích xử lý và giao phát đơn hàng.</li>
              <li>Chúng tôi không chia sẻ dữ liệu khách hàng cho bên thứ ba vì bất kỳ mục đích thương mại nào ngoài đơn vị vận chuyển.</li>
              <li>Bản demo không lưu trữ thông tin thẻ ngân hàng hoặc dữ liệu thanh toán nhạy cảm.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
