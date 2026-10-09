import { Product, GiftArticle } from '../types';

export const DEMO_PRICE_DISCLAIMER =
  'Tên và giá sản phẩm trong bản demo mang tính minh họa.';

export const PRODUCTS: Product[] = [
  {
    id: 'chamea-classic-flap-satchel',
    code: 'CMA-S01',
    name: 'Túi Nữ Tính Thanh Lịch (Classic Satchel)',
    price: 1250000,
    originalPrice: 1562500, // 20% off: 1,562,500 * 0.8 = 1,250,000
    discountPercent: 20,
    silhouettes: ['tui-xach-tay', 'tui-deo-cheo'],
    collections: ['qua-tang-20-10', 'thanh-lich-moi-ngay', 'diem-nhan-diu-dang'],
    style: 'Nữ tính dịu dàng',
    occasions: ['20/10', '8/3', 'Sinh nhật', 'Kỷ niệm', 'Mỗi ngày'],
    usages: ['Đi làm', 'Đi chơi', 'Dự tiệc'],
    targetRecipients: ['mẹ', 'người yêu', 'vợ', 'bạn bè', 'bản thân'],
    colors: [
      {
        name: 'Trắng ngà',
        code: 'ivory',
        hex: '#FAF7F2',
        inStock: true,
        image: '/src/assets/images/product_satchel_ivory_monogram_1791554435905.jpg',
      },
      {
        name: 'Hồng phấn',
        code: 'pink',
        hex: '#E8B8B8',
        inStock: true,
        image: '/src/assets/images/product_satchel_pink_monogram_1791554463128.jpg',
      },
      {
        name: 'Tím mận',
        code: 'plum',
        hex: '#3C2535',
        inStock: true,
        image: '/src/assets/images/product_crescent_plum_monogram_1791554451614.jpg',
      },
    ],
    images: [
      {
        url: '/src/assets/images/product_satchel_ivory_monogram_1791554435905.jpg',
        caption: '1. Ảnh tổng quan túi satchel nắp gập với khóa biểu tượng Monogram CHAMÉA mạ vàng',
        type: 'overview',
      },
      {
        url: '/src/assets/images/product_satchel_pink_monogram_1791554463128.jpg',
        caption: '2. Ảnh góc phom dáng đứng vững và chi tiết khóa monogram chữ C cánh sao',
        type: 'angle_interior',
      },
      {
        url: '/src/assets/images/detail_clasp_monogram_1791554480044.jpg',
        caption: '3. Cận cảnh khóa kim loại mạ vàng đúc nổi biểu tượng CHAMÉA (chữ C + ruy-băng + ngôi sao)',
        type: 'macro_hardware',
      },
      {
        url: '/src/assets/images/detail_gift_box_packaging_1791534358832.jpg',
        caption: '4. Bộ sản phẩm kèm hộp quà CHAMÉA cao cấp, ruy băng tím mận, thiệp và túi bảo quản',
        type: 'packaging',
      },
    ],
    overview:
      'Thiết kế nắp gập hình thang thanh lịch với điểm nhấn là ổ khóa kim loại đúc nổi hình biểu tượng CHAMÉA mạ vàng champagne cao cấp (chữ C uốn lượn cùng dải ruy-băng và ngôi sao lấp lánh). Phù hợp cho nàng đi làm công sở, dự tiệc trà hoặc làm món quà trao gửi yêu thương trong các dịp lễ đặc biệt.',
    materialDetails: {
      bodyMaterial: 'Chất liệu da tổng hợp cao cấp phủ vân hạt (Đang cập nhật chi tiết nhà cung cấp)',
      lining: 'Vải lót dệt microfiber mềm mại, chống trầy xước đồ dùng cá nhân',
      hardware: 'Hợp kim mạ vàng champagne chống oxy hóa, đúc nổi monogram CHAMÉA',
      strap: 'Quai xách tay cố định và quai đeo chéo bọc da có thể tháo rời, tăng giảm độ dài',
      dimensions: '24 cm (dài) × 18 cm (cao) × 9.5 cm (rộng đáy)',
      weight: 'Khoảng 520g (bao gồm quai đeo)',
    },
    packageInclusions: {
      included: [
        'Túi xách chính CHAMÉA Classic Satchel',
        'Dây da đeo chéo có thể tháo rời',
        'Túi vải không dệt (dustbag) bảo quản chống bụi',
        'Hộp quà cứng cao cấp thắt ruy-băng tím mận CHAMÉA',
        'Thiệp viết tay lời chúc trang nhã',
      ],
      optional: [
        'Khăn lụa quấn quai túi phối họa tiết độc quyền (Đang cập nhật)',
        'Dịch vụ in khắc tên riêng lên tag da (Đang cập nhật)',
      ],
    },
    careInstructions: [
      'Bảo quản nơi khô ráo, thoáng mát; tránh ánh nắng gắt trực tiếp hoặc nơi ẩm ướt.',
      'Khi không sử dụng, nhét giấy mềm giữ phom và cất trong túi vải dustbag kèm theo.',
      'Lau nhẹ bằng khăn cotton mềm hơi ẩm nếu dính bụi; không dùng cồn hoặc chất tẩy rửa mạnh.',
    ],
    deliverySummary:
      'Đóng gói 2 lớp chống va đập, bảo vệ nguyên vẹn hộp quà tặng khi giao hàng.',
  },
  {
    id: 'chamea-crescent-shoulder-bag',
    code: 'CMA-C02',
    name: 'Túi Đeo Vai Trăng Khuyết (Crescent Bag)',
    price: 1390000,
    originalPrice: 1737500, // 20% off: 1,737,500 * 0.8 = 1,390,000
    discountPercent: 20,
    silhouettes: ['tui-deo-vai'],
    collections: ['qua-tang-20-10', 'diem-nhan-diu-dang'],
    style: 'Sang trọng nổi bật',
    occasions: ['20/10', '8/3', 'Sinh nhật', 'Kỷ niệm', 'Dạo phố'],
    usages: ['Đi chơi', 'Dự tiệc'],
    targetRecipients: ['người yêu', 'vợ', 'bạn bè', 'bản thân'],
    colors: [
      {
        name: 'Tím mận hoàng gia',
        code: 'plum',
        hex: '#3C2535',
        inStock: true,
        image: '/src/assets/images/product_crescent_plum_monogram_1791554451614.jpg',
      },
      {
        name: 'Trắng kem',
        code: 'cream',
        hex: '#FAF7F2',
        inStock: true,
        image: '/src/assets/images/product_satchel_ivory_monogram_1791554435905.jpg',
      },
    ],
    images: [
      {
        url: '/src/assets/images/product_crescent_plum_monogram_1791554451614.jpg',
        caption: '1. Ảnh tổng quan túi đeo vai trăng khuyết với khóa cài chạm nổi biểu tượng CHAMÉA',
        type: 'overview',
      },
      {
        url: '/src/assets/images/hero_chamea_shelf_showcase_1791565155506.jpg',
        caption: '2. Ảnh góc phối cảnh bệ đá nghệ thuật tôn vinh phom dáng',
        type: 'angle_interior',
        isIllustration: true,
      },
      {
        url: '/src/assets/images/detail_clasp_monogram_1791554480044.jpg',
        caption: '3. Cận cảnh khóa kim loại mạ vàng hình monogram CHAMÉA trên nền da hạt cao cấp',
        type: 'macro_hardware',
      },
      {
        url: '/src/assets/images/detail_gift_box_packaging_1791534358832.jpg',
        caption: '4. Bộ quà tặng cao cấp đi kèm hộp, thiệp và ruy-băng',
        type: 'packaging',
      },
    ],
    overview:
      'Thiết kế dáng túi bán nguyệt thời thượng ôm trọn dưới cánh tay. Điểm xuyết bằng khóa cài kim loại mạ vàng cách điệu hình giọt nước và chữ C, mang đến thần thái tự tin, quyến rũ cho phái đẹp trong những buổi tối hẹn hò hoặc dạo phố cuối tuần.',
    materialDetails: {
      bodyMaterial: 'Chất liệu da tổng hợp bề mặt vân mịn đàn hồi (Đang cập nhật)',
      lining: 'Vải lót cao cấp in chìm hoa văn biểu tượng',
      hardware: 'Khóa tròn mạ vàng champagne cao cấp, chống trầy',
      strap: 'Quai kẹp nách bản vừa, ôm êm ái trên vai',
      dimensions: '26 cm (dài miệng) × 16 cm (cao thân) × 7.5 cm (đáy)',
      weight: 'Khoảng 430g',
    },
    packageInclusions: {
      included: [
        'Túi đeo vai CHAMÉA Crescent Bag',
        'Túi bảo quản vải dệt cao cấp',
        'Hộp quà cứng CHAMÉA kèm nơ tím mận',
        'Thiệp nhắn gửi trao tình cảm',
      ],
      optional: ['Túi giấy xách tay đồng bộ (Đang cập nhật)'],
    },
    careInstructions: [
      'Tránh cọ xát với các bề mặt thô ráp, nhám hoặc sắc nhọn.',
      'Dùng khăn mềm lau sạch vết nước ngọt hoặc giọt mưa ngay khi dính bẩn.',
      'Để túi ở vị trí thoáng, không chèn ép vật nặng lên phom trăng khuyết.',
    ],
    deliverySummary:
      'Đóng gói cẩn trọng, hỗ trợ kiểm tra hình thức túi trước khi nhận.',
  },
  {
    id: 'chamea-structured-work-tote',
    code: 'CMA-T03',
    name: 'Túi Công Sở Cầm Tay & Đeo Chéo (Work Tote)',
    price: 1480000,
    originalPrice: 1850000, // 20% off: 1,850,000 * 0.8 = 1,480,000
    discountPercent: 20,
    silhouettes: ['tui-xach-tay', 'tui-deo-cheo'],
    collections: ['thanh-lich-moi-ngay', 'qua-tang-20-10'],
    style: 'Tối giản thanh lịch',
    occasions: ['20/10', 'Sinh nhật', 'Mỗi ngày'],
    usages: ['Đi làm', 'Đi chơi'],
    targetRecipients: ['mẹ', 'vợ', 'bạn bè', 'bản thân'],
    colors: [
      {
        name: 'Trắng ngà',
        code: 'ivory',
        hex: '#FAF7F2',
        inStock: true,
        image: '/src/assets/images/product_work_tote_ivory_1791534387676.jpg',
      },
      {
        name: 'Tím mận',
        code: 'plum',
        hex: '#3C2535',
        inStock: true,
      },
    ],
    images: [
      {
        url: '/src/assets/images/product_work_tote_ivory_1791534387676.jpg',
        caption: '1. Ảnh tổng quan dáng túi tote xách tay sang trọng cho quý cô công sở',
        type: 'overview',
      },
      {
        url: '/src/assets/images/hero_chamea_shelf_showcase_1791565155506.jpg',
        caption: '2. Ảnh góc phom dáng và đáy túi cấu trúc kiên cố',
        type: 'angle_interior',
        isIllustration: true,
      },
      {
        url: '/src/assets/images/detail_leather_hardware_1791534339384.jpg',
        caption: '3. Cận cảnh chi tiết khoen móc kim loại và đường may kép gia cố',
        type: 'macro_hardware',
      },
      {
        url: '/src/assets/images/detail_gift_box_packaging_1791534358832.jpg',
        caption: '4. Hộp quà tặng sang trọng đồng bộ thương hiệu CHAMÉA',
        type: 'packaging',
      },
    ],
    overview:
      'Dáng túi tote cỡ trung thanh thoát với hai quai xách kép đứng dáng và khóa kéo miệng an toàn. Thích hợp chứa iPad mini, ví dài, điện thoại và mỹ phẩm thường nhật. Sự lựa chọn hoàn hảo của người phụ nữ hiện đại, chỉn chu trong mọi buổi gặp gỡ công việc.',
    materialDetails: {
      bodyMaterial: 'Da tổng hợp vân hạt chống trầy xước nhẹ (Đang cập nhật)',
      lining: 'Lớp lót chống thấm nước nhẹ nhàng với ngăn kéo khóa phụ',
      hardware: 'Chân đinh đáy túi và khóa kim loại màu vàng kim chống gỉ',
      strap: 'Quai xách đôi êm tay và dây da dài đeo chéo có thể tháo rời',
      dimensions: '28 cm (dài) × 21 cm (cao) × 11 cm (rộng đáy)',
      weight: 'Khoảng 590g',
    },
    packageInclusions: {
      included: [
        'Túi tote CHAMÉA Work Tote',
        'Dây quai da đeo chéo tiện dụng',
        'Túi vải bảo quản chống bụi',
        'Hộp quà cứng CHAMÉA và thiệp chúc',
      ],
      optional: ['Khóa trang trí bọc da theo yêu cầu (Đang cập nhật)'],
    },
    careInstructions: [
      'Để túi đứng thẳng trên chân đinh đáy túi, tránh để nằm đè gãy phom quai xách.',
      'Vệ sinh nhẹ nhàng bằng khăn mềm sạch thấm nước ấm vắt ráo.',
      'Không dùng hóa chất tẩy cồn hoặc để gần nguồn nhiệt cao.',
    ],
    deliverySummary:
      'Giao hàng tận nơi, đóng thùng carton chống sốc và hỗ trợ đồng kiểm.',
  },
];

export const SILHOUETTES_INFO = [
  {
    id: 'tui-xach-tay',
    name: 'Túi Xách Tay',
    subtitle: 'Nét kiêu kỳ thanh lịch cho quý cô hiện đại',
    description: 'Quai xách vững chãi, cấu trúc đứng phom, tôn vinh thần thái tự tin.',
    image: '/src/assets/images/product_satchel_ivory_monogram_1791554435905.jpg',
  },
  {
    id: 'tui-deo-vai',
    name: 'Túi Đeo Vai',
    subtitle: 'Phong thái tự nhiên, ôm ấp nhịp bước',
    description: 'Đường cong bán nguyệt phóng khoáng, kẹp nách thời thượng và quyến rũ.',
    image: '/src/assets/images/product_crescent_plum_monogram_1791554451614.jpg',
  },
  {
    id: 'tui-deo-cheo',
    name: 'Túi Đeo Chéo',
    subtitle: 'Tiện dụng linh hoạt, đồng hành mọi khoảnh khắc',
    description: 'Dây đeo tháo rời tùy chỉnh độ dài, giải phóng đôi tay khi di chuyển.',
    image: '/src/assets/images/product_satchel_pink_monogram_1791554463128.jpg',
  },
];

export const COLLECTIONS_INFO = [
  {
    id: 'qua-tang-20-10',
    title: 'Quà Tặng 20/10',
    subtitle: 'Trao đúng quà · Chạm đến trái tim người phụ nữ bạn trân trọng',
    description:
      'Bộ sưu tập những thiết kế túi xách được chăm chút tỉ mỉ từ phom dáng đến hộp quà sang trọng, gửi gắm trọn vẹn lời tri ân và thương mến đến mẹ, vợ, người yêu hay chính bản thân bạn.',
    bannerImage: '/src/assets/images/hero_chamea_shelf_showcase_1791565155506.jpg',
    accentColor: '#3C2535',
  },
  {
    id: 'thanh-lich-moi-ngay',
    title: 'Thanh Lịch Mỗi Ngày',
    subtitle: 'Đơn giản nhưng không đơn điệu',
    description:
      'Các mẫu túi cấu trúc tinh tế, gam màu nhã nhặn, dễ phối cùng áo sơ mi công sở, đầm nhẹ nhàng hay trang phục dạo phố thường nhật.',
    bannerImage: '/src/assets/images/product_work_tote_ivory_1791534387676.jpg',
    accentColor: '#AB8A6B',
  },
  {
    id: 'diem-nhan-diu-dang',
    title: 'Điểm Nhấn Dịu Dàng',
    subtitle: 'Sắc thái ngọt ngào cho tâm hồn nữ tính',
    description:
      'Sự hòa quyện giữa sắc hồng phấn thanh nhã, tím mận trầm ấm và chi tiết kim loại lấp lánh, như nụ cười ấm áp của người phụ nữ bạn thương.',
    bannerImage: '/src/assets/images/product_satchel_pink_1791534373647.jpg',
    accentColor: '#BCA388',
  },
];

export const ARTICLES: GiftArticle[] = [
  {
    id: 'art-1',
    slug: '20-10-tang-gi-cho-phu-nu-cach-chon-qua-phu-hop',
    title: '20/10 tặng gì cho phụ nữ? Cách chọn quà phù hợp với người nhận',
    excerpt:
      'Mỗi người phụ nữ mang một nét đẹp và phong cách riêng biệt. Thay vì chọn quà theo thói quen số đông, hãy bắt đầu từ sự thấu hiểu sở thích, thói quen và nhu cầu hàng ngày của người bạn trân trọng.',
    readTime: '4 phút đọc',
    publishDate: 'Tháng 10, 2026',
    image: '/src/assets/images/brand_chamea_craft_1791534144441.jpg',
    content: [
      'Chọn quà cho phái đẹp không chỉ là tìm kiếm một món đồ giá trị, mà là trao gửi sự quan tâm tinh tế đến từng chi tiết nhỏ. Khi nhận được món quà vừa vặn với sở thích và thói quen sinh hoạt, người nhận sẽ cảm nhận được tình cảm chân thành từ người trao tặng.',
      '1. Tặng Mẹ: Ưu tiên sự trang nhã, phom dáng đứng đắn và dung tích đủ để mẹ mang theo vật dụng cần thiết. Gam màu trung tính như trắng ngà, nâu trầm hay tím mận mang lại cảm giác đằm thắm, sang trọng.',
      '2. Tặng Vợ hoặc Người Yêu: Tìm hiểu phong cách thời trang nàng thường diện khi đi làm hoặc đi chơi. Một chiếc túi đeo vai trăng khuyết mềm mại hoặc túi satchel thanh lịch với khóa mạ vàng sẽ khiến nàng bất ngờ và thích thú.',
      '3. Tặng Đồng Nghiệp hoặc Bạn Thân: Chiếc túi dáng công sở tối giản hoặc túi cầm tay nhỏ gọn, dễ kết hợp trang phục thường nhật là lựa chọn an toàn và ấm áp.',
      'CHAMÉA tin rằng, món quà quý nhất luôn khởi đầu từ sự thấu hiểu.',
    ],
  },
  {
    id: 'art-2',
    slug: 'bi-kip-chon-tui-20-10-chuan-gu-vua-van-ngan-sach',
    title: 'Bí kíp chọn túi 20/10: Chuẩn gu phái đẹp, vừa vặn ngân sách',
    excerpt:
      'Gợi ý cách cân đối giữa kiểu dáng, tính ứng dụng và ngân sách để bạn tự tin chọn được chiếc túi tinh tế nhất mà không phải băn khoăn.',
    readTime: '3 phút đọc',
    publishDate: 'Tháng 10, 2026',
    image: '/src/assets/images/product_satchel_ivory_1791534112265.jpg',
    content: [
      'Một món quà trọn vẹn là món quà khiến cả người trao và người nhận đều cảm thấy an tâm và hài lòng. Bạn hoàn toàn có thể tìm thấy một chiếc túi xách sang trọng, tinh tế trong khoảng ngân sách hợp lý.',
      '• Xác định ngân sách rõ ràng: Bảng giá tại CHAMÉA dao động từ 1.250.000đ đến 1.480.000đ (đã áp dụng ưu đãi chiến dịch), đi kèm trọn bộ hộp quà cứng cao cấp, thắt ruy-băng và thiệp viết tay, giúp bạn không cần tốn thêm chi phí gói quà phát sinh.',
      '• Quan sát màu sắc trang phục thường mặc: Nếu người nhận thích phong cách tối giản thanh lịch, màu Trắng ngà là lựa chọn an toàn nhất. Nếu nàng yêu thích sự nổi bật cá tính, màu Tím mận mang lại chiều sâu cuốn hút.',
      '• Chú ý kiểu dáng quai đeo: Dáng túi có cả quai xách tay lẫn dây đeo chéo tháo rời sẽ mang lại tính linh hoạt cao nhất cho người nhận.',
    ],
  },
  {
    id: 'art-3',
    slug: 'kham-pha-nhung-mau-tui-chamea-lam-qua-tang-20-10',
    title: 'Khám phá những mẫu túi CHAMÉA làm quà tặng 20/10',
    excerpt:
      'Cận cảnh 3 dáng túi đặc trưng của CHAMÉA: từ Satchel nắp gập kiêu kỳ, Crescent trăng khuyết quyến rũ đến Work Tote chỉn chu cho ngày làm việc.',
    readTime: '5 phút đọc',
    publishDate: 'Tháng 10, 2026',
    image: '/src/assets/images/detail_gift_box_packaging_1791534358832.jpg',
    content: [
      'Dịp 20/10 này, CHAMÉA mang đến những gợi ý thiết kế được chọn lọc kỹ lưỡng, phù hợp với từng nét tính cách của người phụ nữ Việt hiện đại:',
      '1. CHAMÉA Classic Satchel (CMA-S01): Dáng nắp gập hình thang với quai xách chắc chắn, đi kèm 3 gam màu: Trắng ngà thanh khiết, Hồng phấn ngọt ngào và Tím mận đằm thắm. Phù hợp tặng mẹ, người yêu hoặc bạn bè.',
      '2. CHAMÉA Crescent Bag (CMA-C02): Thiết kế trăng khuyết kẹp nách thời thượng, khóa kim loại mạ vàng hình giọt nước biểu tượng. Lựa chọn ấn tượng dành tặng người yêu hay vợ trong buổi tối hẹn hò lãng mạn.',
      '3. CHAMÉA Work Tote (CMA-T03): Chiếc túi công sở cấu trúc chỉn chu, ngăn chứa tiện dụng và dây đeo linh hoạt, đồng hành cùng nàng suốt tuần làm việc năng động.',
      'Mỗi sản phẩm đều được gửi đi trong hộp quà CHAMÉA sang trọng, giúp khoảnh khắc trao tặng thêm phần trọn vẹn và ý nghĩa.',
    ],
  },
];
