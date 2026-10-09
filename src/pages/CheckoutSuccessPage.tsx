import React from 'react';
import { PageRoute } from '../types';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertTriangle, ArrowRight, Home, Package, Mail } from 'lucide-react';

interface CheckoutSuccessPageProps {
  orderData: any;
  onNavigate: (page: PageRoute) => void;
}

export const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = ({
  orderData,
  onNavigate,
}) => {
  const { clearCart } = useShop();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  if (!orderData) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <p className="text-sm text-[#3C2535]">Không tìm thấy thông tin đơn hàng.</p>
        <button
          onClick={() => onNavigate('home')}
          className="mt-4 px-5 py-2 bg-[#3C2535] text-white text-xs cursor-pointer"
        >
          Trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-8">
      {/* Top Success Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#AB8A6B] text-[#AB8A6B] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs text-[#AB8A6B] font-semibold uppercase tracking-widest">
          Xác Nhận Đơn Mẫu
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3C2535] font-medium">
          Đơn Hàng Mẫu Đã Được Ghi Nhận
        </h1>
        <p className="text-xs sm:text-sm text-[#3C2535]/80">
          Mã đơn hàng: <span className="font-mono font-semibold text-[#3C2535]">{orderData.orderId}</span> · Ngày đặt: {orderData.createdAt}
        </p>
      </div>

      {/* Mandatory Demo Status Warning Banner */}
      <div className="p-4 sm:p-5 bg-[#FAF7F2] border-2 border-[#AB8A6B]/50 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-[#AB8A6B] shrink-0 mt-0.5" />
        <div className="text-xs text-[#3C2535] space-y-1">
          <p className="font-semibold text-[#3C2535]">
            Trạng thái bản demo: Đơn hàng mẫu này CHƯA được gửi đến cửa hàng
          </p>
          <p className="text-[#3C2535]/80 leading-relaxed">
            Đây là giao diện mô phỏng quy trình đặt hàng thương mại điện tử của CHAMÉA. Không có khoản tiền nào bị trừ và chưa phát sinh giao dịch đóng gói thực tế.
          </p>
        </div>
      </div>

      {/* Order Summary & Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white border border-[#BCA388]/30 p-6 sm:p-8 shadow-xs">
        {/* Customer Information */}
        <div className="md:col-span-5 space-y-4 text-xs border-b md:border-b-0 md:border-r border-[#BCA388]/20 pb-6 md:pb-0 md:pr-6">
          <h2 className="font-serif text-sm font-semibold text-[#3C2535] uppercase tracking-wider pb-2 border-b border-[#BCA388]/20">
            Thông tin giao hàng
          </h2>

          <div className="space-y-2">
            <div>
              <span className="text-[#3C2535]/60 block">Họ và tên:</span>
              <span className="font-medium text-[#3C2535]">{orderData.customer.fullName}</span>
            </div>
            <div>
              <span className="text-[#3C2535]/60 block">Số điện thoại:</span>
              <span className="font-medium text-[#3C2535]">{orderData.customer.phone}</span>
            </div>
            <div>
              <span className="text-[#3C2535]/60 block">Email:</span>
              <span className="text-[#3C2535]">{orderData.customer.email}</span>
            </div>
            <div>
              <span className="text-[#3C2535]/60 block">Địa chỉ nhận hàng:</span>
              <span className="text-[#3C2535] leading-relaxed">{orderData.customer.address}</span>
            </div>
            <div>
              <span className="text-[#3C2535]/60 block">Phương thức thanh toán:</span>
              <span className="text-[#AB8A6B] font-medium">{orderData.paymentMethod}</span>
            </div>
            {orderData.giftMessage && orderData.giftMessage !== 'Không có' && (
              <div className="p-3 bg-[#FAF7F2] border border-[#BCA388]/20">
                <span className="text-[#3C2535] font-semibold block mb-0.5">Lời nhắn viết tay:</span>
                <span className="italic text-[#3C2535]/80">"{orderData.giftMessage}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Ordered Items & Totals */}
        <div className="md:col-span-7 space-y-4 text-xs">
          <h2 className="font-serif text-sm font-semibold text-[#3C2535] uppercase tracking-wider pb-2 border-b border-[#BCA388]/20">
            Chi tiết sản phẩm đặt mua
          </h2>

          <div className="divide-y divide-[#BCA388]/20 max-h-64 overflow-y-auto space-y-2">
            {orderData.items.map((item: any, idx: number) => (
              <div key={idx} className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover border border-[#BCA388]/20 shrink-0"
                  />
                  <div>
                    <div className="font-medium text-[#3C2535]">{item.name}</div>
                    <div className="text-[11px] text-[#3C2535]/65">
                      Màu: {item.color} · Số lượng: {item.quantity}
                    </div>
                  </div>
                </div>

                <div className="font-mono tabular-nums font-semibold text-[#3C2535]">
                  {formatPrice(item.total)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#BCA388]/30 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#3C2535]/70">Tổng tiền hàng:</span>
              <span className="font-mono tabular-nums font-semibold text-[#3C2535]">
                {formatPrice(orderData.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3C2535]/70">Phí vận chuyển:</span>
              <span className="text-[#AB8A6B] font-medium">{orderData.shippingFee}</span>
            </div>
            <div className="pt-2 border-t border-[#BCA388]/20 flex justify-between items-baseline font-bold text-sm">
              <span className="text-[#3C2535]">Tổng giá trị đơn mẫu:</span>
              <span className="font-serif text-xl font-mono tabular-nums text-[#3C2535]">
                {formatPrice(orderData.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            clearCart();
            onNavigate('catalog');
          }}
          className="px-6 py-3 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase tracking-wider hover:bg-[#523348] transition-colors cursor-pointer flex items-center gap-2"
        >
          <Package className="w-4 h-4 text-[#AB8A6B]" />
          <span>Tiếp tục xem túi xách</span>
        </button>

        <button
          onClick={() => {
            clearCart();
            onNavigate('home');
          }}
          className="px-6 py-3 border border-[#3C2535] text-[#3C2535] text-xs font-medium uppercase tracking-wider hover:bg-[#3C2535]/5 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>
      </div>
    </div>
  );
};
