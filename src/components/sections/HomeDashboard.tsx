import React, { useState } from 'react';
import { HEADLINE_INDICATORS, HISTORICAL_TEMP_DATA, HISTORICAL_CO2_DATA } from '../../data/climateData';
import { StatCard } from '../common/StatCard';
import { SvgLineChart } from '../common/ChartCard';
import { 
  Globe, 
  ArrowRight, 
  Calculator, 
  Sun, 
  Bot, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Flame, 
  Trees, 
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  onSelectSection: (sectionId: string) => void;
}

export const HomeDashboard: React.FC<Props> = ({ onSelectSection }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredIndicators = HEADLINE_INDICATORS.filter((ind) => {
    if (filterCategory === 'all') return true;
    return ind.category === filterCategory;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-10 lg:p-14 border border-emerald-900/60 shadow-xl">
        {/* Subtle background glow effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wide border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              THERE IS NO PLANET B • EMPIRICAL CLIMATE INTELLIGENCE
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Understand the Climate.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                Choose Clean Energy.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Humanity faces a defining threshold. Explore verified scientific measurements of global warming, track India’s 200+ GW clean energy revolution, calculate your personal carbon footprint, and take measurable action today.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectSection('calculator-carbon')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 cursor-pointer hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 text-slate-950" />
                <span>Calculate Your Footprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectSection('calculator-solar')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Rooftop Solar Calculator</span>
              </button>

              <button
                onClick={() => onSelectSection('assistant')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-950/80 hover:bg-teal-900/80 text-teal-200 font-semibold text-xs sm:text-sm border border-teal-800/80 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Bot className="w-4 h-4 text-teal-400" />
                <span>AI Climate Assistant</span>
              </button>
            </div>

            {/* Credibility statement */}
            <div className="pt-3 flex items-center gap-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Peer-Reviewed Sources (IPCC, NASA, NOAA, CEA)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>Latest 2024 Benchmark Datasets</span>
              </div>
            </div>
          </div>

          {/* Hero Earth Graphic and Key Milestones */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-emerald-500/20 via-sky-500/20 to-teal-500/30 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center shadow-2xl">
              {/* Planetary Graphic Elements */}
              <div className="w-full h-full rounded-full bg-radial from-emerald-900 via-teal-950 to-slate-950 border border-emerald-500/40 relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <Globe className="w-20 h-20 text-emerald-400/80 animate-[spin_60s_linear_infinite] mb-2" />
                
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">Earth System</span>
                <span className="text-2xl font-black text-white mt-1">423.5 ppm</span>
                <span className="text-[11px] text-emerald-200">Atmospheric CO₂</span>
                
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span>Pre-industrial: ~280 ppm (+51%)</span>
                </div>
              </div>
            </div>

            {/* Quick Stat Pill below Earth */}
            <div className="mt-4 text-center">
              <span className="text-xs text-slate-300 font-medium">
                Global Temperature Anomaly:{' '}
                <strong className="text-rose-400 font-bold">+1.45°C above baseline</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Scientific Notice about Data Update Intervals */}
      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900 dark:text-amber-100">
            Important Notice on Scientific Data Timelines and Publishing Cycles:
          </p>
          <p className="leading-relaxed opacity-90">
            Climate and energy indicators update at varying intervals depending on observation methodologies. While atmospheric CO₂ (NOAA Mauna Loa) and global surface temperatures (NASA GISTEMP) are monitored continuously and reported monthly, comprehensive global greenhouse gas emissions inventories (UNEP, Global Carbon Project) and national electric balances (Central Electricity Authority) require multi-point auditing and are published in validated annual tranches rather than instantaneous real-time feeds. We transparently display the observation period and status for every metric.
          </p>
        </div>
      </div>

      {/* Headline Scientific Indicators Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Scientific Indicators</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Vital Signs of the Planet & Energy Transition
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Explore primary indicators across temperature, carbon concentration, clean power adoption, and ecological balance.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All 10 Indicators' },
              { id: 'global-climate', label: 'Climate Science' },
              { id: 'energy', label: 'Clean Energy' },
              { id: 'impact', label: 'Disaster & Impact' },
              { id: 'restoration', label: 'Forests & Nature' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIndicators.map((indicator) => (
            <StatCard key={indicator.id} indicator={indicator} />
          ))}
        </div>
      </section>

      {/* Two Core Interactive Trend Charts */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Historical Trajectories: Temperature & Atmospheric Carbon
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Empirical measurements documenting the unprecedented post-industrial inflection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SvgLineChart
            data={HISTORICAL_TEMP_DATA.map((d) => ({ x: d.year, y: d.value }))}
            title="Global Surface Temperature Anomaly (1880 - Present)"
            unit="°C"
            color="#ef4444"
            baseline={0}
            source="NASA Goddard Institute for Space Studies (GISTEMP v4)"
            sourceUrl="https://climate.nasa.gov/vital-signs/global-temperature/"
            lastUpdated="2024-03-19"
            description="Mean surface temperature variation relative to the 1951-1980 climatological baseline. Red dashed line indicates the 0°C baseline."
          />

          <SvgLineChart
            data={HISTORICAL_CO2_DATA.map((d) => ({ x: d.year, y: d.value }))}
            title="Atmospheric CO₂ Concentration at Mauna Loa (1960 - Present)"
            unit="ppm"
            color="#f59e0b"
            source="NOAA Global Monitoring Laboratory (Scripps / ESRL)"
            sourceUrl="https://gml.noaa.gov/ccgg/trends/"
            lastUpdated="2024-05-15"
            description="Continuous high-altitude air flask sampling in parts per million (ppm). Pre-industrial baseline: ~280 ppm."
          />
        </div>
      </section>

      {/* Feature Deep Dive Gateways */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gateway 1: India Clean Energy */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              National Milestone
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              India Non-Fossil Power: 200+ GW
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              India has surpassed 200 GW of non-fossil capacity—meeting its Paris Agreement target 8 years early. Explore solar parks, wind corridors, and PM Surya Ghar rooftop schemes.
            </p>
          </div>
          <button
            onClick={() => onSelectSection('india')}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
          >
            <span>Explore India Climate Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gateway 2: Tamil Nadu Wind & Solar */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-900 dark:to-teal-950/30 border border-teal-200 dark:border-teal-900/50 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4">
              <Trees className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              State Leadership
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Tamil Nadu: India’s Wind Power Capital
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Housing over 10.5 GW of wind and 8 GW of solar, Tamil Nadu is leading state-level climate missions (TNGCC), wetland restoration, and urban adaptation.
            </p>
          </div>
          <button
            onClick={() => onSelectSection('tamilnadu')}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
          >
            <span>Explore Tamil Nadu Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gateway 3: Calculators & Action */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Personalized Roadmap
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Measure & Reduce Your Impact
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Calculate household emissions using verified CEA grid emission factors, simulate solar payback, and participate in school campus energy challenges.
            </p>
          </div>
          <button
            onClick={() => onSelectSection('calculator-carbon')}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
          >
            <span>Launch Carbon Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
