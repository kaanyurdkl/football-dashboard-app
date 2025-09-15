// COMPONENTS
import Stats from "@/components/Stats";
import LeagueCarouselSection from "@/components/LeagueCarouselSection";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Stats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeagueCarouselSection />
      </div>
    </div>
  );
}
