import React, { useState, useEffect } from 'react';
import { ChameaLogo } from './ChameaLogo';
import { useShop } from '../context/ShopContext';
import { PageRoute, BagSilhouette, CollectionId } from '../types';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, params?: { silhouette?: BagSilhouette; collection?: CollectionId; id?: string }) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { cartItemCount, wishlist, setIsCartDrawerOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'bags' | 'collections' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    page: PageRoute,
    params?: { silhouette?: BagSilhouette; collection?: CollectionId; id?: string }
  ) => {
    onNavigate(page, params);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#FEFBFD]/95 backdrop-blur-md border-b border-[#AB8A6B]/20 ${
        isScrolled ? 'py-2.5 shadow-xs' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#3C2535] hover:text-[#AB8A6B] transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo Zone */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center shrink-0"
          >
            <ChameaLogo variant="header" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-[#3C2535]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#AB8A6B] transition-colors py-1 relative cursor-pointer ${
                currentPage === 'home' ? 'text-[#3C2535] font-semibold' : ''
              }`}
            >
              TRANG CHỦ
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AB8A6B]" />
              )}
            </button>

            {/* Túi xách with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setOpenDropdown('bags')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('catalog')}
                className={`flex items-center gap-1 hover:text-[#AB8A6B] transition-colors cursor-pointer ${
                  currentPage === 'catalog' ? 'text-[#3C2535] font-semibold' : ''
                }`}
              >
                TÚI XÁCH
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Submenu */}
              <div className="absolute top-full left-0 pt-2 w-52 hidden group-hover:block transition-all duration-200">
                <div className="bg-[#FEFBFD] border border-[#BCA388]/30 shadow-lg py-2 text-xs normal-case tracking-normal">
                  <button
                    onClick={() => handleNavClick('catalog')}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Tất cả túi xách
                  </button>
                  <div className="h-px bg-[#BCA388]/20 my-1 mx-3" />
                  <button
                    onClick={() => handleNavClick('catalog', { silhouette: 'tui-xach-tay' })}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Túi xách tay
                  </button>
                  <button
                    onClick={() => handleNavClick('catalog', { silhouette: 'tui-deo-vai' })}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Túi đeo vai
                  </button>
                  <button
                    onClick={() => handleNavClick('catalog', { silhouette: 'tui-deo-cheo' })}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Túi đeo chéo
                  </button>
                </div>
              </div>
            </div>

            {/* Bộ sưu tập with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setOpenDropdown('collections')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('collections')}
                className={`flex items-center gap-1 hover:text-[#AB8A6B] transition-colors cursor-pointer ${
                  currentPage === 'collections' || currentPage === 'collection-detail'
                    ? 'text-[#3C2535] font-semibold'
                    : ''
                }`}
              >
                BỘ SƯU TẬP
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Submenu */}
              <div className="absolute top-full left-0 pt-2 w-56 hidden group-hover:block transition-all duration-200">
                <div className="bg-[#FEFBFD] border border-[#BCA388]/30 shadow-lg py-2 text-xs normal-case tracking-normal">
                  <button
                    onClick={() => handleNavClick('collections')}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Tất cả bộ sưu tập
                  </button>
                  <div className="h-px bg-[#BCA388]/20 my-1 mx-3" />
                  <button
                    onClick={() => handleNavClick('collection-detail', { collection: 'qua-tang-20-10' })}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Quà tặng 20/10
                  </button>
                  <button
                    onClick={() => handleNavClick('collection-detail', { collection: 'thanh-lich-moi-ngay' })}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Thanh lịch mỗi ngày
                  </button>
                  <button
                    onClick={() => handleNavClick('collection-detail', { collection: 'diem-nhan-diu-dang' })}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] hover:text-[#AB8A6B] transition-colors block cursor-pointer"
                  >
                    Điểm nhấn dịu dàng
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('gift-finder')}
              className={`hover:text-[#AB8A6B] transition-colors py-1 relative cursor-pointer ${
                currentPage === 'gift-finder' ? 'text-[#3C2535] font-semibold' : ''
              }`}
            >
              GỢI Ý CHỌN QUÀ
              {currentPage === 'gift-finder' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AB8A6B]" />
              )}
            </button>

            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  handleNavClick('home');
                  setTimeout(() => {
                    document.getElementById('campaign-video')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('campaign-video')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-[#AB8A6B] transition-colors py-1 relative cursor-pointer text-[#3C2535] flex items-center gap-1"
            >
              <span>VIDEO</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#AB8A6B] transition-colors py-1 relative cursor-pointer ${
                currentPage === 'about' ? 'text-[#3C2535] font-semibold' : ''
              }`}
            >
              VỀ CHAMÉA
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AB8A6B]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#AB8A6B] transition-colors py-1 relative cursor-pointer ${
                currentPage === 'contact' ? 'text-[#3C2535] font-semibold' : ''
              }`}
            >
              LIÊN HỆ
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AB8A6B]" />
              )}
            </button>
          </nav>

          {/* Action Zone: Search, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#3C2535] hover:text-[#AB8A6B] transition-colors cursor-pointer"
              aria-label="Tìm kiếm"
              title="Tìm kiếm túi xách"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="p-2 text-[#3C2535] hover:text-[#AB8A6B] transition-colors relative cursor-pointer"
              aria-label="Danh sách yêu thích"
              title="Túi xách yêu thích"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#AB8A6B] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-[#3C2535] hover:text-[#AB8A6B] transition-colors relative cursor-pointer flex items-center gap-1.5"
              aria-label="Giỏ hàng"
              title="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#3C2535] text-[#FEFBFD] rounded-full text-[10px] flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#BCA388]/20 bg-[#FEFBFD] px-6 py-6 space-y-4">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535] py-2 border-b border-[#BCA388]/10"
          >
            TRANG CHỦ
          </button>

          <div className="py-2 border-b border-[#BCA388]/10 space-y-2">
            <button
              onClick={() => handleNavClick('catalog')}
              className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535]"
            >
              TÚI XÁCH (TẤT CẢ)
            </button>
            <div className="pl-4 space-y-1 text-xs text-[#3C2535]/80">
              <button
                onClick={() => handleNavClick('catalog', { silhouette: 'tui-xach-tay' })}
                className="block py-1 hover:text-[#AB8A6B]"
              >
                • Túi xách tay
              </button>
              <button
                onClick={() => handleNavClick('catalog', { silhouette: 'tui-deo-vai' })}
                className="block py-1 hover:text-[#AB8A6B]"
              >
                • Túi đeo vai
              </button>
              <button
                onClick={() => handleNavClick('catalog', { silhouette: 'tui-deo-cheo' })}
                className="block py-1 hover:text-[#AB8A6B]"
              >
                • Túi đeo chéo
              </button>
            </div>
          </div>

          <div className="py-2 border-b border-[#BCA388]/10 space-y-2">
            <button
              onClick={() => handleNavClick('collections')}
              className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535]"
            >
              BỘ SƯU TẬP
            </button>
            <div className="pl-4 space-y-1 text-xs text-[#3C2535]/80">
              <button
                onClick={() => handleNavClick('collection-detail', { collection: 'qua-tang-20-10' })}
                className="block py-1 hover:text-[#AB8A6B]"
              >
                • Quà tặng 20/10
              </button>
              <button
                onClick={() => handleNavClick('collection-detail', { collection: 'thanh-lich-moi-ngay' })}
                className="block py-1 hover:text-[#AB8A6B]"
              >
                • Thanh lịch mỗi ngày
              </button>
              <button
                onClick={() => handleNavClick('collection-detail', { collection: 'diem-nhan-diu-dang' })}
                className="block py-1 hover:text-[#AB8A6B]"
              >
                • Điểm nhấn dịu dàng
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('gift-finder')}
            className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535] py-2 border-b border-[#BCA388]/10"
          >
            GỢI Ý CHỌN QUÀ
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (currentPage !== 'home') {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('campaign-video')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              } else {
                document.getElementById('campaign-video')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535] py-2 border-b border-[#BCA388]/10"
          >
            VIDEO CHIẾN DỊCH
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535] py-2 border-b border-[#BCA388]/10"
          >
            VỀ CHAMÉA
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left text-sm font-medium tracking-wider text-[#3C2535] py-2"
          >
            LIÊN HỆ
          </button>
        </div>
      )}
    </header>
  );
};
