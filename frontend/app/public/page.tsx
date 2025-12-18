// app/public/page.tsx
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import TimelineSection from "@/components/TimelineSection";
import TopicGrid from "@/components/TopicGrid";

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <NewsSection />
        <TopicGrid />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  );
}
