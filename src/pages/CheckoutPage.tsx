import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';
import { DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import {
  ShieldAlert,
  CreditCard,
  Truck,
  Building,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOrderComplete: (orderData: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigate,
  onOrderComplete,
}) => {
  const { cart, cartSubtotal, isPromoActive } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'online_simulation'>('cod');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#3C2535]">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-[#3C2535]/70">Vui lòng chọn sản phẩm trước khi thanh toán.</p>
        <button
          onClick={() => onNavigate('catalog')}
          className="px-6 py-2.5 bg-[#3C2535] text-white text-xs font-medium cursor-pointer"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
      return;
    }

    const orderData = {
      orderId: `CMA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      customer: {
        fullName,
        phone,
        email: email || 'Không cung cấp',
        address,
      },
      orderNote: orderNote || 'Không có',
      giftMessage: giftMessage || 'Không có',
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Thanh toán khi nhận hàng (COD)'
          : paymentMethod === 'bank_transfer'
          ? 'Chuyển khoản ngân hàng (Mô phỏng)'
          : 'Thanh toán trực tuyến (Mô phỏng)',
      items: cart.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        code: i.product.code,
        color: i.selectedColor.name,
        colorHex: i.selectedColor.hex,
        quantity: i.quantity,
        unitPrice: isPromoActive ? i.product.price : i.product.originalPrice || i.product.price,
        total: (isPromoActive ? i.product.price : i.product.originalPrice || i.product.price) * i.quantity,
        image: i.selectedColor.image || i.product.images[0]?.url,
      })),
      subtotal: cartSubtotal,
      shippingFee: 'Chưa xác định (sẽ báo sau khi duyệt đơn)',
      total: cartSubtotal,
    };

    onOrderComplete(orderData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 space-y-8">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between border-b border-[#BCA388]/30 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
            Thông Tin Thanh Toán
          </h1>
          <p className="text-xs text-[#3C2535]/70 mt-1">
            Vui lòng điền thông tin để hoàn tất đơn hàng mẫu
          </p>
        </div>

        <button
          onClick={() => onNavigate('cart')}
          className="text-xs text-[#AB8A6B] hover:text-[#3C2535] flex items-center gap-1.5 cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại giỏ hàng</span>
        </button>
      </div>

      {/* Mandatory Demo Disclaimer Banner */}
      <div className="bg-[#FAF7F2] border-2 border-[#AB8A6B]/50 p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-[#AB8A6B] shrink-0 mt-0.5" />
        <div className="text-xs text-[#3C2535] space-y-1">
          <p className="font-semibold text-[#3C2535]">
            Lưu ý: Thanh toán mô phỏng — Không phát sinh giao dịch tài chính
          </p>
          <p className="text-[#3C2535]/80 leading-relaxed">
            Hệ thống không yêu cầu nhập số thẻ ngân hàng, không hiển thị mã QR thanh toán giả lập và không thông báo đã trừ tiền thật. Đơn hàng sau khi gửi mang tính chất trải nghiệm giao diện người dùng.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Customer & Delivery details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer info card */}
          <div className="bg-white border border-[#BCA388]/30 p-6 space-y-4">
            <h2 className="font-serif text-base font-semibold text-[#3C2535] border-b border-[#BCA388]/20 pb-2">
              1. Thông tin người nhận
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#3C2535] mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Thị Mai"
                  className="w-full text-xs p-2.5 bg-[#FAF7F2]/50 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
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
                  placeholder="Ví dụ: 0909 123 456"
                  className="w-full text-xs p-2.5 bg-[#FAF7F2]/50 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Địa chỉ email <span className="text-[#3C2535]/50">(không bắt buộc)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full text-xs p-2.5 bg-[#FAF7F2]/50 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Địa chỉ giao hàng <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                className="w-full text-xs p-2.5 bg-[#FAF7F2]/50 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
            </div>
          </div>

          {/* Gift Message & Order Note */}
          <div className="bg-white border border-[#BCA388]/30 p-6 space-y-4">
            <h2 className="font-serif text-base font-semibold text-[#3C2535] border-b border-[#BCA388]/20 pb-2 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#AB8A6B]" />
              <span>2. Lời nhắn tặng quà & Ghi chú đơn hàng</span>
            </h2>

            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Lời nhắn trên thiệp tặng quà (nếu gửi tặng người thương)
              </label>
              <textarea
                rows={2}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Ví dụ: Chúc mẹ luôn mạnh khỏe và yêu đời! Con yêu mẹ rất nhiều."
                className="w-full text-xs p-2.5 bg-[#FAF7F2]/50 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
              <span className="text-[11px] text-[#3C2535]/60 mt-1 block">
                * CHAMÉA sẽ nắn nót viết tay lời nhắn này vào thiệp quà trang trọng gửi kèm hộp.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3C2535] mb-1">
                Ghi chú đơn hàng (không bắt buộc)
              </label>
              <input
                type="text"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                className="w-full text-xs p-2.5 bg-[#FAF7F2]/50 border border-[#BCA388]/40 focus:outline-hidden focus:border-[#AB8A6B]"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-[#BCA388]/30 p-6 space-y-4">
            <h2 className="font-serif text-base font-semibold text-[#3C2535] border-b border-[#BCA388]/20 pb-2">
              3. Phương thức thanh toán (Mô phỏng)
            </h2>

            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#3C2535] bg-[#FAF7F2]'
                    : 'border-[#BCA388]/30 hover:border-[#AB8A6B]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 accent-[#3C2535]"
                />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#3C2535] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#AB8A6B]" />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </div>
                  <p className="text-[11px] text-[#3C2535]/70">
                    Thanh toán bằng tiền mặt khi shipper giao tận nơi. Cho phép đồng kiểm hình thức bên ngoài hộp quà.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#3C2535] bg-[#FAF7F2]'
                    : 'border-[#BCA388]/30 hover:border-[#AB8A6B]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-0.5 accent-[#3C2535]"
                />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#3C2535] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#AB8A6B]" />
                    <span>Chuyển khoản ngân hàng (Mô phỏng demo)</span>
                  </div>
                  <p className="text-[11px] text-[#3C2535]/70">
                    Bản demo: Không tạo mã QR ngân hàng giả hoặc số tài khoản chưa xác nhận.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                  paymentMethod === 'online_simulation'
                    ? 'border-[#3C2535] bg-[#FAF7F2]'
                    : 'border-[#BCA388]/30 hover:border-[#AB8A6B]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'online_simulation'}
                  onChange={() => setPaymentMethod('online_simulation')}
                  className="mt-0.5 accent-[#3C2535]"
                />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#3C2535] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#AB8A6B]" />
                    <span>Thanh toán thẻ trực tuyến (Mô phỏng demo)</span>
                  </div>
                  <p className="text-[11px] text-[#3C2535]/70">
                    Bản demo: Cổng thanh toán quốc tế/nội địa chưa cấu hình cổng kết nối thực tế.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary & Submit */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#BCA388]/30 p-6 space-y-6">
          <h2 className="font-serif text-lg font-medium text-[#3C2535] border-b border-[#BCA388]/20 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#AB8A6B]" />
            <span>Tóm tắt đơn hàng ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </h2>

          {/* List items in checkout */}
          <div className="divide-y divide-[#BCA388]/20 max-h-72 overflow-y-auto pr-1 space-y-2">
            {cart.map((item) => {
              const unitPrice = isPromoActive
                ? item.product.price
                : item.product.originalPrice || item.product.price;
              const displayImage =
                item.selectedColor.image || item.product.images[0]?.url;

              return (
                <div
                  key={`${item.product.id}-${item.selectedColor.code}`}
                  className="pt-2 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={displayImage}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover border border-[#BCA388]/20 shrink-0"
                    />
                    <div>
                      <div className="font-medium text-[#3C2535] line-clamp-1">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-[#3C2535]/65">
                        Màu: {item.selectedColor.name} · SL: {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="font-mono tabular-nums font-semibold text-[#3C2535]">
                    {formatPrice(unitPrice * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing calculations */}
          <div className="border-t border-[#BCA388]/30 pt-4 space-y-2.5 text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-[#3C2535]/80">Tổng tiền hàng:</span>
              <span className="font-mono tabular-nums font-semibold text-[#3C2535]">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[#3C2535]/80">Ưu đãi chiến dịch:</span>
              <span className="text-[#AB8A6B] font-medium">
                {isPromoActive ? 'Đã áp dụng 20% vào giá sản phẩm' : 'Không'}
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[#3C2535]/80">Phí vận chuyển:</span>
              <span className="text-[#AB8A6B] font-semibold">Chưa xác định</span>
            </div>

            <div className="pt-3 border-t border-[#BCA388]/20 flex justify-between items-baseline">
              <span className="font-semibold text-sm text-[#3C2535]">Tổng thanh toán:</span>
              <div className="text-right">
                <span className="font-serif text-2xl font-bold font-mono tabular-nums text-[#3C2535]">
                  {formatPrice(cartSubtotal)}
                </span>
                <span className="block text-[10px] text-[#3C2535]/60">
                  (+ phí ship xác nhận sau)
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#3C2535]/65 leading-tight pt-1">
              * Phí vận chuyển hiển thị 'Chưa xác định' theo đúng nguyên tắc không tự mặc định miễn phí khi chưa có biểu phí chính thức.
            </div>
          </div>

          {/* Mandatory Demo Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#3C2535] text-[#FEFBFD] hover:bg-[#523348] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Hoàn tất đơn hàng mẫu</span>
            <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
          </button>
        </div>
      </form>
    </div>
  );
};
