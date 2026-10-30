import { useEffect, useState } from "react";
import planetsData from "./data/data.json";
import "./App.css";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import Product from "./pages/Product";

const getAssetUrl = (fileName) =>
  new URL(`./assets/${fileName}`, import.meta.url).href;

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "structure", label: "Internal Structure" },
  { key: "geology", label: "Surface Geology" },
];

function App() {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setActiveTab("overview");
  }, [selectedPlanetIndex]);

  const activePlanet = planetsData[selectedPlanetIndex];
  const activeContent = activePlanet[activeTab];

  const activePlanetImage = getAssetUrl(
    `planet-${activePlanet.name.toLowerCase()}.svg`,
  );
  const activePlanetInternalImage = getAssetUrl(
    `planet-${activePlanet.name.toLowerCase()}-internal.svg`,
  );
  const activeGeologyImage = getAssetUrl(
    `geology-${activePlanet.name.toLowerCase()}.png`,
  );

  const stats = [
    { label: "Rotation Time", value: activePlanet.rotation },
    { label: "Revolution Time", value: activePlanet.revolution },
    { label: "Radius", value: activePlanet.radius },
    { label: "Average Temp.", value: activePlanet.temperature },
  ];

  const renderPlanetGraphic = () => {
    if (activeTab === "structure") {
      return (
        <img
          src={activePlanetInternalImage}
          alt={`${activePlanet.name} internal structure`}
          className="h-[310px] w-[310px] object-contain"
        />
      );
    }

    if (activeTab === "geology") {
      return (
        <div className="relative flex h-[310px] w-[310px] items-center justify-center">
          <img
            src={activePlanetImage}
            alt={`${activePlanet.name} planet`}
            className="absolute inset-0 h-full w-full object-contain opacity-100"
          />
          <img
            src={activeGeologyImage}
            alt={`${activePlanet.name} geology`}
            className="absolute bottom-[52px] left-1/2 h-[129px] w-[129px] -translate-x-1/2 rounded-full border border-white/20 object-cover shadow-[0_0_30px_rgba(255,255,255,0.16)]"
          />
        </div>
      );
    }

    return (
      <img
        src={activePlanetImage}
        alt={`${activePlanet.name} planet`}
        className="h-[310px] w-[310px] object-contain"
      />
    );
  };

  return (
    <div className="page-shell min-h-screen overflow-hidden text-white">
      <div className="starfield absolute inset-0 opacity-80" />

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <div className="text-[2rem] font-black uppercase tracking-[-0.07em] text-white/95">
            The Planets
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {planetsData.map((planet, index) => (
              <button
                key={planet.name}
                type="button"
                onClick={() => setSelectedPlanetIndex(index)}
                className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] transition ${
                  selectedPlanetIndex === index
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {planet.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1280px] px-6 pb-16 pt-12 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex items-center justify-center">
            <div className="flex h-[460px] w-full items-center justify-center">
              {renderPlanetGraphic()}
            </div>
          </div>

          <div className="max-w-[430px]">
            <h1 className="text-[5.8rem] font-black uppercase leading-[0.82] tracking-[-0.09em] text-white/95">
              {activePlanet.name}
            </h1>

            <p className="mt-5 text-[1.12rem] leading-[1.7] text-slate-200/90">
              {activeContent.content}
            </p>

            <div className="mt-6 flex items-center gap-2 text-[0.95rem] text-slate-400">
              <span>Source</span>
              <a
                href={activeContent.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-slate-300 underline decoration-slate-400 underline-offset-2"
              >
                Wikipedia
                <img
                  src={getAssetUrl("icon-source.svg")}
                  alt="Source icon"
                  className="h-4 w-4"
                />
              </a>
            </div>

            <div className="mt-8 space-y-3">
              {tabs.map((tab, index) => {
                const isActive = tab.key === activeTab;
                const buttonText = tab.label.toUpperCase();

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex w-full items-center border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#3caec3] bg-[#4bb7d3] text-slate-950 shadow-[0_0_30px_rgba(75,183,211,0.2)]"
                        : "border-white/20 bg-transparent text-white/80 hover:border-white/40"
                    }`}
                  >
                    <span
                      className={`mr-5 inline-flex w-8 justify-center text-[0.72rem] font-semibold tracking-[0.18em] ${
                        isActive ? "text-slate-950" : "text-slate-300"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em]">
                      {buttonText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-h-[120px] border border-white/15 bg-white/[0.02] px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-[2px]"
            >
              <div className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-300/90">
                {stat.label}
              </div>
              <div className="mt-4 text-[2rem] font-bold tracking-[-0.08em] text-white/95">
                {stat.value}
              </div>
            </div>
          ))}
        </section>

        <Routes>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/admin" element={<AdminPanel></AdminPanel>}></Route>
          <Route path="/product" element={<Product></Product>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
