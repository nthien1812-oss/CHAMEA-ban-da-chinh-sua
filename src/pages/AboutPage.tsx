import React from 'react';
import { ChameaLogo } from '../components/ChameaLogo';
import { PageRoute } from '../types';
import { Sparkles, Heart, Compass, Check, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 space-y-16">
      {/* Hero Banner */}
      <div className="bg-[#FAF7F2] border-b border-[#BCA388]/30 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center mb-2">
            <ChameaLogo variant="full" size="lg" />
          </div>
          <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
            Câu Chuyện Thương Hiệu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3C2535] font-medium leading-tight">
            Chạm Đến Trái Tim Phái Đẹp
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-[#AB8A6B]">
            “Chạm đúng người · Trao đúng quà”
          </p>
        </div>
      </div>

      {/* Main Brand Manifesto & Photo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-wider">
              Khởi Nguồn & Sứ Mệnh
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium leading-snug">
              Món quà bắt đầu từ sự thấu hiểu trọn vẹn
            </h2>
            <p className="text-xs sm:text-sm text-[#3C2535]/85 leading-relaxed text-justify sm:text-left">
              CHAMÉA là thương hiệu túi xách dành cho phụ nữ hiện đại, hướng đến thiết kế thanh lịch, nữ tính và dễ ứng dụng. CHAMÉA tin rằng mỗi chiếc túi không chỉ tôn lên gu thẩm mỹ giúp phái đẹp khẳng định bản thân, mà còn là từng lời gửi gắm trân trọng đến người phụ nữ bạn yêu thương. Từ dòng túi công sở tối giản đến thiết kế nổi bật cho buổi gặp gỡ, CHAMÉA mang đến sự thấu hiểu trọn vẹn, giúp mỗi lựa chọn đều vừa vặn với phong cách, nhu cầu và câu chuyện riêng.
            </p>
            <p className="text-xs sm:text-sm text-[#3C2535]/85 leading-relaxed text-justify sm:text-left">
              Chúng tôi không chỉ kiến tạo những phom túi thời trang, mà đồng hành cùng bạn để biến mỗi dịp lễ — từ ngày 20/10, ngày 8/3, ngày sinh nhật hay một ngày bình thường — thành một kỷ niệm đáng nhớ.
            </p>
          </div>

          <div className="lg:col-span-6 border border-[#BCA388]/30 bg-[#FAF7F2] p-2 shadow-xs">
            <img
              src="/src/assets/images/brand_chamea_craft_1791534144441.jpg"
              alt="Atelier chế tác túi xách CHAMÉA"
              className="w-full h-80 sm:h-[420px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Symbol Meaning (Cảm hứng & Ý nghĩa biểu tượng) */}
      <div className="bg-[#FAF7F2] border-y border-[#BCA388]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-wider">
              Ý Nghĩa Nhận Diện
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
              Cảm hứng & Ý nghĩa biểu tượng CHAMÉA
            </h2>
            <p className="text-xs text-[#3C2535]/70">
              Tổng thể biểu tượng thể hiện: “Chạm đến trái tim phái đẹp, trao gửi món quà thấu hiểu.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#BCA388]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#AB8A6B]/30 flex items-center justify-center text-[#AB8A6B]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-medium text-[#3C2535]">
                Dải ruy-băng uốn lượn
              </h3>
              <p className="text-xs text-[#3C2535]/80 leading-relaxed">
                Đại diện cho hình ảnh gói quà chỉn chu, sự trân trọng chân thành và sợi dây kết nối yêu thương giữa người trao và người nhận.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#BCA388]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#AB8A6B]/30 flex items-center justify-center text-[#3C2535]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-medium text-[#3C2535]">
                Chữ C mềm mại
              </h3>
              <p className="text-xs text-[#3C2535]/80 leading-relaxed">
                Viết tắt của tên thương hiệu CHAMÉA, tượng trưng cho động từ “Chạm” — sự đồng hành gắn kết và chạm đến trái tim tinh tế của phái đẹp.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#BCA388]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#AB8A6B]/30 flex items-center justify-center text-[#AB8A6B]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-medium text-[#3C2535]">
                Ngôi sao lấp lánh
              </h3>
              <p className="text-xs text-[#3C2535]/80 leading-relaxed">
                Biểu trưng cho những khoảnh khắc đặc biệt, nét rạng rỡ và sự kiêu hãnh của người phụ nữ khi diện trên mình chiếc túi ưng ý.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Color Identity System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs text-[#AB8A6B] uppercase font-semibold tracking-wider">
            Bảng Màu Thương Hiệu
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3C2535] font-medium">
            Hòa sắc của sự thanh lịch & ấm áp
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-[#BCA388]/30 bg-white space-y-2">
            <div className="h-16 w-full rounded-xs bg-[#3C2535]" />
            <div className="text-xs font-semibold text-[#3C2535]">Tím mận đậm (#3C2535)</div>
            <p className="text-[11px] text-[#3C2535]/70">Chữ chính, nút chính, footer, mang lại cảm giác đằm thắm và sang trọng.</p>
          </div>

          <div className="p-4 border border-[#BCA388]/30 bg-white space-y-2">
            <div className="h-16 w-full rounded-xs bg-[#AB8A6B]" />
            <div className="text-xs font-semibold text-[#3C2535]">Nâu champagne (#AB8A6B)</div>
            <p className="text-[11px] text-[#3C2535]/70">Chi tiết nhấn, đường kẻ, biểu tượng ngôi sao, biểu trưng cho ánh kim tinh tế.</p>
          </div>

          <div className="p-4 border border-[#BCA388]/30 bg-white space-y-2">
            <div className="h-16 w-full rounded-xs bg-[#BCA388]" />
            <div className="text-xs font-semibold text-[#3C2535]">Be ấm (#BCA388)</div>
            <p className="text-[11px] text-[#3C2535]/70">Mảng nền phụ, đường viền thanh mảnh, mang lại sự mộc mạc và gần gũi.</p>
          </div>

          <div className="p-4 border border-[#BCA388]/30 bg-white space-y-2">
            <div className="h-16 w-full rounded-xs bg-[#FEFBFD] border border-black/10" />
            <div className="text-xs font-semibold text-[#3C2535]">Trắng ngà (#FEFBFD)</div>
            <p className="text-[11px] text-[#3C2535]/70">Nền chính của toàn bộ website, tạo khoảng không gian thoáng đãng và sạch sẽ.</p>
          </div>
        </div>

        {/* CTA to Catalog */}
        <div className="text-center pt-8">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-8 py-3.5 bg-[#3C2535] text-[#FEFBFD] text-xs font-semibold uppercase tracking-wider hover:bg-[#523348] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Khám phá các thiết kế túi xách</span>
            <ArrowRight className="w-4 h-4 text-[#AB8A6B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
