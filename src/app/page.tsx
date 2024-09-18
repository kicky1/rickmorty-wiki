import Particles from "@/components/particles";
import CharacterSearch from "./_components/characterSearch";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <Particles
        className="fixed inset-0 z-0" 
        quantity={500}
      />
      <div className="relative z-10">  
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-green-500 drop-shadow-[1px_1px_5px_rgba(3,138,255,1)]">
            Rick & Morty Character Search
          </h1>
          <CharacterSearch />
        </div>
      </div>
    </div>
  );
}
