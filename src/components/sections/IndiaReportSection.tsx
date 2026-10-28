import React, { useState } from 'react';
import { 
  INDIA_POWER_CAPACITY_BREAKDOWN, 
  INDIA_HISTORICAL_EMISSIONS 
} from '../../data/climateData';
import { SvgBarChart, SvgLineChart } from '../common/ChartCard';
import { 
  MapPin, 
  Zap, 
  Sun, 
  Target, 
  ShieldCheck, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  Calendar,
  Building,
  Flame,
  Droplets,
  TrendingUp,
  Info
} from 'lucide-react';

export const IndiaReportSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'capacity' | 'targets' | 'schemes' | 'adaptation'>('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Section 6 • National Climate Progress</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          India Climate Action & Clean Energy Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Official verification of India’s energy transition: crossing the historic 200+ GW non-fossil milestone, Nationally Determined Contributions (NDCs), power generation realities, and major central schemes.
        </p>
      </div>

      {/* Critical Verification Notice on FY vs CY and Capacity vs Generation */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
        <div className="flex items-center gap-2 font-bold">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Reporting Standards & Periodicity Distinction:</span>
        </div>
        <p className="leading-relaxed opacity-95">
          In India, official power sector statistics from the Central Electricity Authority (CEA) and Ministry of New and Renewable Energy (MNRE) are compiled according to the <strong>Financial Year (FY: April 1 to March 31)</strong> as well as monthly operational executive reports. Total installed electric capacity has surpassed 440 GW, with non-fossil sources exceeding 200 GW (~45%). However, because coal thermal plants operate at higher plant load factors (PLF ~65-70%), coal still accounts for approximately 70% of total electrical energy generated (TWh), highlighting the critical role of battery storage, pumped hydro, and demand flexibility.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'overview', label: 'Headline Trajectory & Milestones' },
          { id: 'capacity', label: 'Installed Capacity Breakdown (CEA)' },
          { id: 'targets', label: 'Panchamrit & NDC Commitments' },
          { id: 'schemes', label: 'Major National Programmes (PM Surya Ghar)' },
          { id: 'adaptation', label: 'Agriculture & Heat Adaptation' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 KPI Cards for India */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Verified Milestone</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">203.4 GW</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Non-Fossil Installed Capacity</p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Source: CEA Executive Summary (2024)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Paris Pledge Target</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">45.8%</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Share of Non-Fossil in Total Capacity</p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Target: 50% by 2030 (On track)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Solar & Wind Combined</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">132.3 GW</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Solar (85.5 GW) + Wind (46.8 GW)</p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                MNRE 2024 Cumulative Register
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Long-Term Pledge</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">Year 2070</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">National Net-Zero Target Date</p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                UNFCCC Long-Term Strategy (LT-LEDS)
              </div>
            </div>
          </div>

          {/* Historical Emissions Trend for India */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <SvgLineChart
                data={INDIA_HISTORICAL_EMISSIONS.map((d) => ({ x: d.year, y: d.totalMtCO2 }))}
                title="India Annual Total Territorial CO₂ Emissions (1990 - 2023)"
                unit="Million tonnes CO₂"
                color="#f59e0b"
                source="MoEFCC India National Communications & Global Carbon Project"
                sourceUrl="https://moef.gov.in/"
                lastUpdated="2023-12-05"
                description="Reflects rapid industrialization and rural electrification across the nation."
              />
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Emissions Decoupling Progress</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Between 2005 and 2019, India successfully reduced the emissions intensity of its GDP by <strong>33%</strong>, well on course to achieve its enhanced 45% reduction target ahead of 2030.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <strong>Key Decoupling Drivers:</strong>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>UJALA LED Distribution Scheme (&gt;360 million LEDs)</li>
                  <li>Perform, Achieve & Trade (PAT) industrial energy trading</li>
                  <li>100% Indian Railway Electrification target</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Capacity Breakdown */}
      {activeTab === 'capacity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <SvgBarChart
                data={INDIA_POWER_CAPACITY_BREAKDOWN.map((item) => ({
                  label: item.source,
                  value: item.capacityGW,
                  color: item.color,
                  secondaryLabel: `${item.share}% (${item.type})`,
                }))}
                title="All-India Electric Installed Capacity by Fuel Type (CEA 2024)"
                unit="GW"
                source="Central Electricity Authority (CEA) Ministry of Power"
                sourceUrl="https://cea.nic.in/"
                lastUpdated="2024-04-30"
                description="Total installed utility generation capacity of ~444.8 GW across all central, state, and private sectors."
              />
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Non-Fossil vs Fossil Balance</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-semibold text-emerald-900 dark:text-emerald-200">Non-Fossil Capacity</span>
                  <span className="font-bold text-emerald-950 dark:text-emerald-100">203.4 GW (45.8%)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Thermal Fossil (Coal/Gas/Diesel)</span>
                  <span className="font-bold text-slate-900 dark:text-white">241.4 GW (54.2%)</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                CEA National Electricity Plan (NEP) projects non-fossil capacity will rise to over 500 GW by 2030, led by ~292 GW solar PV and ~100 GW wind.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Targets */}
      {activeTab === 'targets' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>India’s Updated Nationally Determined Contributions (NDCs) & Panchamrit</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Formally communicated to the UNFCCC secretariat following COP26 Glasgow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Target 1: Non-Fossil Electric Capacity</span>
                <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">50% by 2030</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Cumulative electric power installed capacity from non-fossil fuel-based energy resources by 2030. Currently at <strong>45.8%</strong> in 2024.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Target 2: Emissions Intensity</span>
                <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">-45% by 2030</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Reduce emissions intensity of GDP by 45% compared to 2005 levels. (Over 33% already achieved by 2019).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Target 3: Carbon Sink via Forests</span>
                <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">2.5 to 3.0 Gt CO₂</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Create an additional cumulative carbon sink of 2.5 to 3.0 billion tonnes of CO₂ equivalent through additional forest and tree cover by 2030.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-800 dark:text-purple-300">Target 4: National Net-Zero</span>
                <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">By Year 2070</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Long-Term Low-Carbon Development Strategy submitted to the UNFCCC at COP27 Sharm el-Sheikh.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Schemes */}
      {activeTab === 'schemes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PM Surya Ghar */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Flagship Rooftop Scheme</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">₹75,021 Cr Outlay</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">PM Surya Ghar: Muft Bijli Yojana</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Launched in February 2024 to install rooftop solar in 10 million (1 crore) households. Provides direct central subsidy: ₹33,000 for 1 kW, ₹66,000 for 2 kW, and up to ₹78,000 for 3 kW+ systems, enabling up to 300 units of free power monthly.
            </p>
            <div className="pt-2 text-xs">
              <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 hover:underline">
                <span>Official Portal (pmsuryaghar.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* National Green Hydrogen Mission */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Heavy Industry Decarbonization</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">₹19,744 Cr</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">National Green Hydrogen Mission</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Targeting production of 5 Million Metric Tonnes (MMT) of green hydrogen per year by 2030, supported by ~125 GW of dedicated renewable energy additions, reducing fossil gas import dependence.
            </p>
            <div className="pt-2 text-xs">
              <a href="https://mnre.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-teal-700 dark:text-teal-400 hover:underline">
                <span>MNRE Strategic Interventions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* PM KUSUM */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Agricultural Solarization</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">3.5 Million Farmers</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pradhan Mantri Kisan Urja Suraksha (PM KUSUM)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Solarization of agricultural water pumps, replacing polluting diesel pumps and enabling farmers to sell surplus clean solar power generated on barren land back to DISCOMs.
            </p>
          </div>

          {/* FAME India & EV Mission */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Sustainable Mobility</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">Electric Vehicles</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Faster Adoption of Electric Vehicles (FAME / PM E-DRIVE)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Incentivizing electric two-wheelers, three-wheelers, e-buses, and charging infrastructure across all tier-1 and tier-2 urban agglomerations.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: Adaptation */}
      {activeTab === 'adaptation' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>National Adaptation & Climate Resilience Priorities</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <strong className="text-slate-900 dark:text-white">Heat Action Plans (HAPs):</strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Operating across 23 states under NDMA to issue color-coded heat warnings, establish cool roofs, and adjust school timings to prevent heatstroke casualties.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <strong className="text-slate-900 dark:text-white">National Water Mission:</strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                "Catch the Rain" campaigns, geotagging over 1.2 million traditional water harvesting bodies, check dams, and micro-irrigation expansion.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <strong className="text-slate-900 dark:text-white">Coastal Management (MISHTI):</strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Mangrove Initiative for Shoreline Habitats & Tangible Incomes, protecting vulnerable coastal fishing hamlets from storm surges and cyclonic landfalls.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
