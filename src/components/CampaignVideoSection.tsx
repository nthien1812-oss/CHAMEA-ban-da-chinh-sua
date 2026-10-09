import React, { useState, useEffect, useRef } from 'react';
import { PageRoute, CollectionId, BagSilhouette } from '../types';
import { ChameaLogo } from './ChameaLogo';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Upload,
  Sparkles,
  ArrowRight,
  Film,
  CheckCircle,
} from 'lucide-react';

interface CampaignVideoSectionProps {
  onNavigate: (
    page: PageRoute,
    params?: { id?: string; collection?: CollectionId; silhouette?: BagSilhouette }
  ) => void;
}

interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  desc: string;
  productId?: string;
  image: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    time: '00:00',
    seconds: 0,
    title: 'Khởi nguồn CHAMÉA',
    desc: 'Cổng vòm ánh sáng & biểu tượng Chạm đúng người · Trao đúng quà',
    image: '/src/assets/images/hero_chamea_mobile_clean_1791542876621.jpg',
  },
  {
    time: '00:03',
    seconds: 3,
    title: 'Classic Satchel Trắng Ngà',
    desc: 'Phom nắp gập kiêu kỳ, khóa mạ vàng champagne & hoa anh đào nở rộ',
    productId: 'chamea-classic-flap-satchel',
    image: '/src/assets/images/product_satchel_ivory_monogram_1791554435905.jpg',
  },
  {
    time: '00:07',
    seconds: 7,
    title: 'Crescent Bag Tím Mận',
    desc: 'Dáng trăng khuyết kẹp nách sang trọng, khóa chữ C biểu tượng',
    productId: 'chamea-crescent-shoulder-bag',
    image: '/src/assets/images/product_crescent_plum_monogram_1791554451614.jpg',
  },
  {
    time: '00:10',
    seconds: 10,
    title: 'Classic Satchel Hồng Phấn',
    desc: 'Nét chấm phá dịu dàng, nữ tính cho người phụ nữ bạn trân trọng',
    productId: 'chamea-classic-flap-satchel',
    image: '/src/assets/images/product_satchel_pink_monogram_1791554463128.jpg',
  },
  {
    time: '00:12',
    seconds: 12,
    title: 'Chiến dịch Quà tặng 20/10',
    desc: 'Ưu đãi 20% tất cả thiết kế, trọn bộ hộp quà cứng cao cấp',
    image: '/src/assets/images/hero_chamea_shelf_showcase_1791565155506.jpg',
  },
];

export const CampaignVideoSection: React.FC<CampaignVideoSectionProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [userUploadedVideoUrl, setUserUploadedVideoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('chamea_custom_video_url');
    } catch {
      return null;
    }
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalDuration = 15; // 15s campaign reel

  // Custom uploaded video handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUserUploadedVideoUrl(objectUrl);
      try {
        // Can't store blob url long term in localstorage, but objectUrl stays alive in session
      } catch {}
      setIsPlaying(true);
    }
  };

  // Simulated auto-playback timer if not using raw video element
  useEffect(() => {
    if (userUploadedVideoUrl) return; // If real video is loaded, video element events handle it

    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => (prev >= totalDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, userUploadedVideoUrl]);

  // Determine current active chapter
  const activeChapterIndex = CHAPTERS.reduce((acc, chap, idx) => {
    return currentSeconds >= chap.seconds ? idx : acc;
  }, 0);

  const activeChapter = CHAPTERS[activeChapterIndex];

  const handleSeek = (seconds: number) => {
    setCurrentSeconds(seconds);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  };

  return (
    <section id="campaign-video" className="bg-[#2A1824] text-[#FEFBFD] py-16 sm:py-20 relative overflow-hidden border-y border-[#AB8A6B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#AB8A6B]/25 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs text-[#AB8A6B] uppercase font-semibold tracking-widest">
              <Film className="w-4 h-4 text-[#AB8A6B]" />
              <span>Thước Phim Chiến Dịch CHAMÉA</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
              Quà Ý Nghĩa Trao Người Phụ Nữ Bạn Trân Trọng
            </h2>
            <p className="text-xs sm:text-sm text-[#D9C8BA] max-w-xl font-sans leading-relaxed">
              Chiêm ngưỡng từng đường nét tinh tế, bề mặt vân da mềm mại và chi tiết khóa mạ vàng ánh champagne qua thước phim thời trang chiến dịch 20/10.
            </p>
          </div>

          {/* Video upload button if user wants to play their raw MP4 file directly */}
          <div className="shrink-0 flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 bg-[#3C2535] hover:bg-[#523348] border border-[#AB8A6B]/40 text-xs text-[#ECD5D8] hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              title="Tải tệp video MP4 lên để xem trực tiếp"
            >
              <Upload className="w-3.5 h-3.5 text-[#AB8A6B]" />
              <span>{userUploadedVideoUrl ? 'Thay tệp video khác' : 'Tải video MP4 lên'}</span>
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Cinematic Screen */}
          <div className="lg:col-span-8 relative bg-black border-2 border-[#AB8A6B]/40 shadow-2xl overflow-hidden aspect-16/9 sm:aspect-16/9 flex items-center justify-center group">
            {userUploadedVideoUrl ? (
              <video
                ref={videoRef}
                src={userUploadedVideoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentSeconds(Math.floor(videoRef.current.currentTime));
                  }
                }}
              />
            ) : (
              /* Simulated HD Animated Reel from Campaign Visuals */
              <div className="relative w-full h-full">
                <img
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  className="w-full h-full object-cover transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            )}

            {/* In-Video Watermark Logo */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#AB8A6B]/30 flex items-center gap-2">
              <ChameaLogo variant="compact" theme="dark" size="sm" />
              <span className="text-[10px] text-[#AB8A6B] tracking-wider font-semibold border-l border-[#AB8A6B]/40 pl-2">
                CAMPAIGN REEL
              </span>
            </div>

            {/* In-video current title tag */}
            <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 text-white space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#AB8A6B] font-semibold">
                {activeChapter.time} • {activeChapter.title}
              </span>
              <p className="text-xs sm:text-sm text-[#FAF7F2] font-light max-w-lg leading-relaxed">
                {activeChapter.desc}
              </p>
            </div>

            {/* Controls Bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2">
              {/* Progress Bar / Scrubber */}
              <div
                className="w-full h-1.5 bg-white/20 hover:h-2 transition-all cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  handleSeek(Math.floor(pos * totalDuration));
                }}
              >
                <div
                  className="h-full bg-[#AB8A6B] transition-all"
                  style={{ width: `${(currentSeconds / totalDuration) * 100}%` }}
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between text-xs text-white pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (userUploadedVideoUrl && videoRef.current) {
                        if (isPlaying) videoRef.current.pause();
                        else videoRef.current.play();
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-1.5 hover:text-[#AB8A6B] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
                      setIsMuted(!isMuted);
                    }}
                    className="p-1.5 hover:text-[#AB8A6B] transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-white/80 tabular-nums">
                    00:{currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds} / 00:{totalDuration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeChapter.productId && (
                    <button
                      onClick={() => onNavigate('product-detail', { id: activeChapter.productId })}
                      className="px-3 py-1 bg-[#AB8A6B] text-[#3C2535] hover:bg-white text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Xem mẫu túi này</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Chapter Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#AB8A6B] flex items-center gap-1.5 pb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Các phân đoạn trong thước phim</span>
            </div>

            <div className="space-y-2">
              {CHAPTERS.map((chap, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSeek(chap.seconds)}
                    className={`p-3 border transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-[#3C2535] border-[#AB8A6B] text-white shadow-md'
                        : 'bg-[#2A1824]/80 border-[#AB8A6B]/20 text-[#D9C8BA] hover:border-[#AB8A6B]/50'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-semibold text-[#AB8A6B] px-1.5 py-0.5 bg-black/40">
                      {chap.time}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white truncate">
                        {chap.title}
                      </div>
                      <div className="text-[10px] text-[#D9C8BA]/70 truncate">
                        {chap.desc}
                      </div>
                    </div>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#AB8A6B] animate-pulse shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('collection-detail', { collection: 'qua-tang-20-10' })}
                className="w-full py-3 bg-[#AB8A6B] hover:bg-[#8F7053] text-[#3C2535] hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Khám phá trọn vẹn bộ sưu tập 20/10</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
