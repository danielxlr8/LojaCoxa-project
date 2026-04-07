import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { LatestReleases } from "@/components/sections/LatestReleases";
import { Categories } from "@/components/sections/Categories";
import { BrandStory } from "@/components/sections/BrandStory";
import { CoxaIdSection } from "@/components/sections/CoxaIdSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background-dark)] selection:bg-[var(--color-primary)] selection:text-black">
      <Navbar />
      <Hero />
      <FeaturedDrop />
      <LatestReleases />
      <Categories />
      <BrandStory />
      <CoxaIdSection />
      <Footer />
    </main>
  );
}
