import { useCallback, useState } from "react";
import { SkipLink } from "./components/SkipLink";
import { LiveAnnouncer } from "./components/LiveAnnouncer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { Gallery } from "./components/Gallery";
import { CTASection } from "./components/CTASection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingControls } from "./components/FloatingControls";
import { MobileActionBar } from "./components/MobileActionBar";
import { AccessibilityPanel } from "./components/AccessibilityPanel";
import { AccessibilityStatementModal } from "./components/AccessibilityStatementModal";
import { LegalModal } from "./components/LegalModal";
import { CookieBanner } from "./components/CookieBanner";
import { CookiePreferencesModal } from "./components/CookiePreferencesModal";
import { useScrolled } from "./hooks/useScrolled";
import { useCookieConsent } from "./context/CookieConsentContext";

function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [a11yPanelOpen, setA11yPanelOpen] = useState(false);
  const [a11yStatementOpen, setA11yStatementOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { isPreferencesOpen } = useCookieConsent();

  const anyOverlayOpen =
    menuOpen || a11yPanelOpen || a11yStatementOpen || legalModalOpen || isPreferencesOpen || lightboxOpen;

  const openPrivacyFromAnywhere = () => {
    setLegalModalOpen(true);
  };

  const handleLightboxToggle = useCallback((open: boolean) => setLightboxOpen(open), []);

  return (
    <>
      <LiveAnnouncer />

      <div inert={anyOverlayOpen}>
        <SkipLink />

        <Header
          scrolled={scrolled}
          menuOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />

        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Services />
          <BeforeAfterSlider />
          <Gallery onLightboxToggle={handleLightboxToggle} />
          <CTASection />
          <Contact />
        </main>

        <Footer onOpenPrivacy={() => setLegalModalOpen(true)} onOpenAccessibilityStatement={() => setA11yStatementOpen(true)} />

        <FloatingControls onOpenAccessibility={() => setA11yPanelOpen(true)} accessibilityPanelOpen={a11yPanelOpen} />
        <MobileActionBar hidden={anyOverlayOpen} />
        <CookieBanner onOpenPrivacy={openPrivacyFromAnywhere} />
      </div>

      {a11yPanelOpen && <AccessibilityPanel onClose={() => setA11yPanelOpen(false)} />}
      {a11yStatementOpen && <AccessibilityStatementModal onClose={() => setA11yStatementOpen(false)} />}
      {legalModalOpen && <LegalModal onClose={() => setLegalModalOpen(false)} />}
      {isPreferencesOpen && <CookiePreferencesModal onOpenPrivacy={openPrivacyFromAnywhere} />}
    </>
  );
}

export default App;
