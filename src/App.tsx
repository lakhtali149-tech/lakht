import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { WorksWheelSection } from './components/WorksWheelSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { ProductGrid } from './components/ProductGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustBar } from './components/TrustBar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ToastContainer } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
        {/* Navigation & Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Interactive 3D WorksWheel Showcase */}
          <WorksWheelSection />

          {/* Featured Collections / Categories Grid */}
          <FeaturedCategories />

          {/* Special Flash Offer with Live Countdown */}
          <SpecialOfferBanner />

          {/* Main Product Showcase & Interactive Filter Engine */}
          <ProductGrid />

          {/* Customer Reviews & Testimonials */}
          <TestimonialsSection />

          {/* Trust, Security & Benefits Bar */}
          <TrustBar />
        </main>

        {/* Footer & VIP Club */}
        <Footer />

        {/* Modals, Drawers & Overlays */}
        <CartDrawer />
        <WishlistDrawer />
        <ProductDetailModal />
        <CheckoutModal />
        <OrderConfirmationModal />
        <OrderTrackingModal />
        <ToastContainer />
      </div>
    </StoreProvider>
  );
}
