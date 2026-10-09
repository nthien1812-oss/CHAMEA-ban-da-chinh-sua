import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { PageRoute, BagSilhouette, CollectionId } from './types';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ConsultationModal } from './components/ConsultationModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GiftFinderPage } from './pages/GiftFinderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { PolicyPage } from './pages/PolicyPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';

interface NavigationParams {
  silhouette?: BagSilhouette;
  collection?: CollectionId;
  id?: string;
  articleId?: string;
  policyTab?: string;
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedSilhouette, setSelectedSilhouette] = useState<BagSilhouette | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<CollectionId>('qua-tang-20-10');
  const [selectedProductId, setSelectedProductId] = useState<string>('chamea-classic-flap-satchel');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('art-1');
  const [policyTab, setPolicyTab] = useState<string>('shipping');
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);

  const handleNavigate = (page: PageRoute, params?: NavigationParams) => {
    if (params) {
      if (params.silhouette) setSelectedSilhouette(params.silhouette);
      if (params.collection) setSelectedCollection(params.collection);
      if (params.id) setSelectedProductId(params.id);
      if (params.articleId) setSelectedArticleId(params.articleId);
      if (params.policyTab) setPolicyTab(params.policyTab);
    } else {
      if (page === 'catalog') setSelectedSilhouette(null);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (orderData: any) => {
    setCompletedOrderData(orderData);
    setCurrentPage('checkout-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFBFD] text-[#3C2535] font-sans">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Main Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            initialSilhouette={selectedSilhouette}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'collections' && (
          <CollectionsPage
            onSelectCollection={(colId) =>
              handleNavigate('collection-detail', { collection: colId })
            }
          />
        )}

        {currentPage === 'collection-detail' && (
          <CollectionDetailPage
            collectionId={selectedCollection}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'gift-finder' && (
          <GiftFinderPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {currentPage === 'checkout-success' && (
          <CheckoutSuccessPage
            orderData={completedOrderData}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'policy' && (
          <PolicyPage
            initialTab={policyTab}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailPage
            articleId={selectedArticleId}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Realtime Search Modal */}
      <SearchModal onNavigate={handleNavigate} />

      {/* Advisory Consultation Modal */}
      <ConsultationModal />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
