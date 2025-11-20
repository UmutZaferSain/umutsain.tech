import HeroOverlay from "../components/HeroOverlay";
import Scene from "../components/Scene";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(44,255,121,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(44,255,121,0.06),transparent_30%)]" />
      <Scene />
      <HeroOverlay />
    </main>
  );
}
