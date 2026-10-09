export type BagSilhouette = 'tui-xach-tay' | 'tui-deo-vai' | 'tui-deo-cheo';

export type CollectionId = 'qua-tang-20-10' | 'thanh-lich-moi-ngay' | 'diem-nhan-diu-dang';

export interface ProductColor {
  name: string;
  code: string;
  hex: string;
  inStock: boolean;
  image?: string; // Specific image if variant has photo
}

export interface MaterialDetails {
  bodyMaterial: string;
  lining: string;
  hardware: string;
  strap: string;
  dimensions: string;
  weight: string;
}

export interface PackageInclusions {
  included: string[];
  optional: string[];
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number; // Listed price (VNĐ)
  originalPrice?: number;
  discountPercent?: number;
  silhouettes: BagSilhouette[];
  collections: CollectionId[];
  style: string;
  occasions: string[];
  usages: string[];
  targetRecipients: string[];
  colors: ProductColor[];
  images: {
    url: string;
    caption: string;
    type: 'overview' | 'angle_interior' | 'macro_hardware' | 'packaging';
    isIllustration?: boolean;
  }[];
  overview: string;
  materialDetails: MaterialDetails;
  packageInclusions: PackageInclusions;
  careInstructions: string[];
  deliverySummary: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface GiftArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  image: string;
  content: string[];
}

export interface GiftFinderCriteria {
  recipient: string;
  style: string;
  usage: string;
  budget: string;
  occasion: string;
}

export type PageRoute =
  | 'home'
  | 'catalog'
  | 'collections'
  | 'collection-detail'
  | 'product-detail'
  | 'gift-finder'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'checkout-success'
  | 'policy'
  | 'article-detail';
