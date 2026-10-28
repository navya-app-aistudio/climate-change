import React, { useState } from 'react';
import { GLOBAL_EMISSIONS_BY_SECTOR } from '../../data/climateData';
import { SvgBarChart } from '../common/ChartCard';
import { Flame, Globe, Users, History, AlertTriangle, ShieldCheck, PieChart, Sparkles } from 'lucide-react';

export const CarbonEmissionsSection: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'sector' | 'perCapita' | 'cumulative' | 'budget'>('sector');

  // Per capita data (tonnes CO2e per person per year, 2023)
  const perCapitaData = [
    { label: 'United States', value: 14.9, color: '#ef4444', secondaryLabel: '3.2x global average' },
    { label: 'Australia & Canada', value: 14.2, color: '#f87171' },
    { label: 'Russia', value: 12.1, color: '#fb923c' },
    { label: 'China', value: 8.9, color: '#f59e0b', secondaryLabel: 'Driven by heavy industry export base' },
    { label: 'European Union (27)', value: 6.8, color: '#3b82f6' },
    { label: 'World Average', value: 4.7, color: '#64748b', secondaryLabel: 'Target for 2030: <2.3 tonnes' },
    { label: 'India', value: 1.95, color: '#10b981', secondaryLabel: '<42% of global average' },
    { label: 'Sub-Saharan Africa Average', value: 1.1, color: '#059669' },
  ];

  // Cumulative historical emissions (1850 - 2022)
  const cumulativeData = [
    { label: 'United States', value: 509, color: '#ef4444', secondaryLabel: '24.6% of historical emissions' },
    { label: 'European Union (27)', value: 358, color: '#3b82f6', secondaryLabel: '17.3% of historical emissions' },
    { label: 'China', value: 284, color: '#f59e0b', secondaryLabel: '13.7% of historical emissions' },
    { label: 'Russia & Former USSR', value: 172, color: '#fb923c', secondaryLabel: '8.3% of historical emissions' },
    { label: 'India', value: 71, color: '#10b981', secondaryLabel: '3.4% of historical emissions (with 18% of global population)' },
    { label: 'Rest of the World', value: 676, color: '#64748b', secondaryLabel: '32.7% of historical emissions' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>Section 4 • Emissions Trajectories & Climate Justice</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Global Carbon Emissions Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Examine the distribution of greenhouse gases across economic sectors, inspect territorial versus per-capita emissions, understand historical cumulative responsibility, and track the remaining carbon budget.
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'sector', label: 'Sectoral Breakdown (Where Emissions Come From)', icon: PieChart },
          { id: 'perCapita', label: 'Per Capita Footprint (By Country)', icon: Users },
          { id: 'cumulative', label: 'Historical Cumulative Responsibility (1850-Present)', icon: History },
          { id: 'budget', label: 'Remaining Carbon Budget (1.5°C / 2.0°C)', icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedView === tab.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: Sectoral Breakdown */}
      {selectedView === 'sector' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Bars */}
            <div className="lg:col-span-7">
              <SvgBarChart
                data={GLOBAL_EMISSIONS_BY_SECTOR.map((s) => ({
                  label: s.sector,
                  value: s.percentage,
                  color: s.color,
                  secondaryLabel: `${s.gigatonnes} Gt CO₂e`,
                }))}
                title="Global GHG Emissions by Economic Sector (2023)"
                unit="%"
                source="IPCC AR6 Working Group III & UNEP Emissions Gap Report"
                sourceUrl="https://www.unep.org/resources/emissions-gap-report"
                lastUpdated="2023-11-20"
                description="Percentages reflect total global emissions of approximately 57.4 Gigatonnes CO₂e."
              />
            </div>

            {/* Deep Sectoral Context */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Sector Decarbonization Priorities</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-800 dark:text-slate-200">1. Power Generation (34%):</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    The fastest sector to decarbonize because solar and wind have become the cheapest source of new bulk electricity in almost every major world economy.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-800 dark:text-slate-200">2. Hard-to-Abate Heavy Industry (24%):</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Cement and steel require high-temperature chemical reactions (&gt;1,400°C) requiring green hydrogen direct reduced iron (DRI) or carbon capture.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-800 dark:text-slate-200">3. Land Use & Agriculture (22%):</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Ending deforestation in the Amazon, Congo Basin, and Southeast Asia while adopting precision fertilizer practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Per Capita Emissions */}
      {selectedView === 'perCapita' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <SvgBarChart
                data={perCapitaData}
                title="Annual Greenhouse Gas Emissions Per Capita (2023)"
                unit="tonnes CO₂e / person"
                source="Our World in Data & Global Carbon Project"
                sourceUrl="https://ourworldindata.org/per-capita-co2"
                lastUpdated="2024-01-10"
                description="Considers production-based territorial emissions divided by resident population."
              />
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>The Per-Capita Equity Principle</span>
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Although India is the world’s third-largest total emitter (~2.8 Gt CO₂e), its per capita emissions (1.95 tonnes) are less than half the global average (4.7 tonnes) and one-seventh of US levels (14.9 tonnes).
              </p>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong>IPCC Paris Benchmark:</strong>
                <p>
                  To keep warming below 1.5°C, global per capita emissions must decline to approximately <strong>2.0 to 2.3 tonnes CO₂e/person by 2030</strong>, and Net-Zero by 2050.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Cumulative Responsibility */}
      {selectedView === 'cumulative' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <SvgBarChart
                data={cumulativeData}
                title="Cumulative Historical CO₂ Emissions (1850 - 2022)"
                unit="Gt CO₂"
                source="Global Carbon Project Historical Database & Carbon Brief"
                sourceUrl="https://globalcarbonproject.org/"
                lastUpdated="2023-12-05"
                description="Cumulative fossil fuel combustion and cement production since the Industrial Revolution."
              />
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-4 h-4 text-blue-500" />
                <span>Historical Atmospheric Debt</span>
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Because carbon dioxide stays in the atmosphere for centuries, current warming is the consequence of cumulative historical emissions, not just current-year output.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <strong>United States & Europe:</strong> Responsible for over 41% of all historical carbon emitted since 1850.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <strong>India:</strong> Responsible for only 3.4% of historical emissions, despite currently housing 18% of global population.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: Remaining Carbon Budget */}
      {selectedView === 'budget' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              The Planetary Carbon Budget (IPCC AR6 Working Group I)
            </h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            The carbon budget represents the maximum amount of cumulative anthropogenic CO₂ that can be emitted globally to maintain a 50% probability of limiting global warming to a given temperature threshold.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1.5°C Budget Card */}
            <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  Critical 1.5°C Threshold
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">
                  ~5 to 6 Years Left at Current Rate
                </span>
              </div>

              <div className="text-3xl font-black text-rose-900 dark:text-rose-200">
                ~250 Gigatonnes CO₂
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Remaining global allowance as of 2024. At current global emissions of ~40 Gt CO₂/year from fossil fuels, this budget would be exhausted before 2030 without radical emissions reductions.
              </p>

              <div className="w-full bg-rose-200 dark:bg-rose-900/50 rounded-full h-3 overflow-hidden">
                <div className="bg-rose-600 h-full w-[88%] rounded-full" title="88% of 1.5C historical budget already consumed" />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                88% of allowable pre-industrial budget already exhausted
              </span>
            </div>

            {/* 2.0°C Budget Card */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Upper 2.0°C Paris Limit
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                  ~25 Years Left at Current Rate
                </span>
              </div>

              <div className="text-3xl font-black text-amber-900 dark:text-amber-200">
                ~1,150 Gigatonnes CO₂
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Remaining budget for a 67% chance of limiting warming to 2.0°C. Exceeding 2.0°C triggers catastrophic irreversible tipping points (collapse of polar ice sheets, widespread coral die-off).
              </p>

              <div className="w-full bg-amber-200 dark:bg-amber-900/50 rounded-full h-3 overflow-hidden">
                <div className="bg-amber-600 h-full w-[65%] rounded-full" title="65% consumed" />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                65% of allowable 2.0°C budget already consumed
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            Source: IPCC Sixth Assessment Report (AR6), Working Group I Summary for Policymakers Table SPM.2.
          </div>
        </div>
      )}
    </div>
  );
};
