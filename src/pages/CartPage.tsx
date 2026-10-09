import React from 'react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';
import { DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: PageRoute, params?: { id?: string }) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    isPromoActive,
  } = useShop();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#BCA388]/30 flex items-center justify-center mx-auto text-[#BCA388]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
            Giỏ hàng của bạn đang trống
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2535]/75 max-w-md mx-auto">
            Chưa có chiếc túi nào được chọn. Hãy khám phá những thiết kế tinh tế của CHAMÉA để tìm món quà vừa vặn nhất.
          </p>
        </div>
        <div>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-8 py-3.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase tracking-wider hover:bg-[#523348] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Khám phá túi xách ngay</span>
            <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 space-y-8">
      {/* Page Title */}
      <div className="border-b border-[#BCA388]/30 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-xs text-[#3C2535]/70 mt-1">
            Tổng cộng: {cart.reduce((sum, i) => sum + i.quantity, 0)} sản phẩm
          </p>
        </div>

        <button
          onClick={() => onNavigate('catalog')}
          className="text-xs text-[#AB8A6B] hover:text-[#3C2535] flex items-center gap-1.5 cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tiếp tục chọn túi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items Table / List */}
        <div className="lg:col-span-8 bg-white border border-[#BCA388]/30 overflow-hidden shadow-xs">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-[#FAF7F2] border-b border-[#BCA388]/20 text-xs font-semibold text-[#3C2535] uppercase tracking-wider">
            <div className="col-span-6">Sản phẩm</div>
            <div className="col-span-2 text-center">Đơn giá</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-right">Thành tiền</div>
          </div>

          <div className="divide-y divide-[#BCA388]/20">
            {cart.map((item) => {
              const unitPrice = isPromoActive
                ? item.product.price
                : item.product.originalPrice || item.product.price;
              const lineTotal = unitPrice * item.quantity;
              const displayImage =
                item.selectedColor.image || item.product.images[0]?.url;

              return (
                <div
                  key={`${item.product.id}-${item.selectedColor.code}`}
                  className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product info */}
                  <div className="col-span-6 flex gap-4 items-center w-full">
                    <img
                      src={displayImage}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover border border-[#BCA388]/20 bg-[#FAF7F2] shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <h3
                        onClick={() =>
                          onNavigate('product-detail', { id: item.product.id })
                        }
                        className="font-serif text-sm font-medium text-[#3C2535] hover:text-[#AB8A6B] cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-[#3C2535]/70 flex items-center gap-2">
                        <span>Mã: {item.product.code}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/15"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedColor.code)
                        }
                        className="text-[11px] text-[#3C2535]/50 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Xóa khỏi giỏ</span>
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-2 text-center text-xs font-mono tabular-nums text-[#3C2535]">
                    <span className="sm:hidden text-[11px] text-[#3C2535]/60 block">
                      Đơn giá:
                    </span>
                    {formatPrice(unitPrice)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-[#BCA388]/40 bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.code,
                            item.quantity - 1
                          )
                        }
                        className="px-2 py-1 text-[#3C2535] hover:bg-[#FAF7F2] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-semibold text-[#3C2535] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor.code,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-1 text-[#3C2535] hover:bg-[#FAF7F2] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="col-span-2 text-right w-full sm:w-auto">
                    <span className="sm:hidden text-[11px] text-[#3C2535]/60 mr-2">
                      Thành tiền:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold font-mono tabular-nums text-[#3C2535]">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#FAF7F2] border-t border-[#BCA388]/20 flex justify-between items-center text-xs">
            <button
              onClick={clearCart}
              className="text-[#3C2535]/60 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Làm trống giỏ hàng</span>
            </button>
          </div>
        </div>

        {/* Order Summary Right */}
        <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#BCA388]/30 p-6 space-y-5">
          <h2 className="font-serif text-lg text-[#3C2535] font-medium border-b border-[#BCA388]/20 pb-3">
            Tóm Tắt Đơn Hàng
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-[#3C2535]/80">Tổng tiền hàng:</span>
              <span className="font-mono tabular-nums font-semibold text-[#3C2535]">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[#3C2535]/80">Phí vận chuyển:</span>
              <span className="text-[#AB8A6B] font-medium">Chưa xác định</span>
            </div>

            <div className="pt-3 border-t border-[#BCA388]/20 flex justify-between items-baseline">
              <span className="font-semibold text-sm text-[#3C2535]">Tạm tính:</span>
              <span className="font-serif text-xl font-bold font-mono tabular-nums text-[#3C2535]">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <div className="text-[11px] text-[#3C2535]/60 leading-relaxed italic">
              * Chưa bao gồm phí vận chuyển (sẽ xác nhận khi chốt địa chỉ nhận hàng). {DEMO_PRICE_DISCLAIMER}
            </div>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full py-3.5 bg-[#3C2535] text-[#FEFBFD] hover:bg-[#523348] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Tiến hành thanh toán</span>
            <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
