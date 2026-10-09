import React from 'react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';
import { DEMO_PRICE_DISCLAIMER } from '../data/chameaData';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (page: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    isPromoActive,
  } = useShop();

  if (!isCartDrawerOpen) return null;

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    onNavigate('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    onNavigate('cart');
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FEFBFD] shadow-2xl flex flex-col border-l border-[#BCA388]/30">
          {/* Header */}
          <div className="p-5 border-b border-[#BCA388]/20 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#3C2535]" />
              <h2 className="font-serif text-lg text-[#3C2535] font-medium">
                Giỏ hàng của bạn ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#3C2535]/60 hover:text-[#3C2535] transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#BCA388]/30 flex items-center justify-center text-[#BCA388]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-base text-[#3C2535]">Giỏ hàng của bạn đang trống</p>
                  <p className="text-xs text-[#3C2535]/70 max-w-xs">
                    Hãy khám phá những chiếc túi xách thanh lịch để chọn cho mình hoặc gửi gắm làm quà tặng.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('catalog');
                  }}
                  className="mt-2 px-5 py-2.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors cursor-pointer"
                >
                  Khám phá túi xách ngay
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const unitPrice = isPromoActive
                    ? item.product.price
                    : item.product.originalPrice || item.product.price;
                  const itemTotal = unitPrice * item.quantity;
                  const displayImage =
                    item.selectedColor.image || item.product.images[0]?.url;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedColor.code}`}
                      className="flex gap-4 p-3 bg-white border border-[#BCA388]/20 transition-all hover:border-[#AB8A6B]/40"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 bg-[#FAF7F2] shrink-0 border border-[#BCA388]/20 overflow-hidden">
                        <img
                          src={displayImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-medium text-[#3C2535] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() =>
                                removeFromCart(item.product.id, item.selectedColor.code)
                              }
                              className="text-[#3C2535]/40 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#3C2535]/70">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span>Màu: {item.selectedColor.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#BCA388]/15">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#BCA388]/30">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.code,
                                  item.quantity - 1
                                )
                              }
                              className="px-2 py-1 text-[#3C2535] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                              aria-label="Giảm số lượng"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium font-mono tabular-nums text-[#3C2535]">
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
                              className="px-2 py-1 text-[#3C2535] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                              aria-label="Tăng số lượng"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-xs font-semibold text-[#3C2535] font-mono tabular-nums">
                              {formatPrice(itemTotal)}
                            </div>
                            <div className="text-[10px] text-[#3C2535]/60 font-mono tabular-nums">
                              {formatPrice(unitPrice)} / cái
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#BCA388]/30 bg-[#FAF7F2] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#3C2535]/80">Tạm tính:</span>
                <span className="font-serif text-lg font-semibold text-[#3C2535] font-mono tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              <div className="text-[11px] text-[#3C2535]/65 leading-tight">
                * {DEMO_PRICE_DISCLAIMER}
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2.5 px-3 border border-[#3C2535] text-[#3C2535] text-xs font-medium hover:bg-[#3C2535]/5 transition-colors text-center cursor-pointer"
                >
                  Xem giỏ hàng
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full py-2.5 px-3 bg-[#3C2535] text-[#FEFBFD] text-xs font-medium hover:bg-[#523348] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Thanh toán</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
