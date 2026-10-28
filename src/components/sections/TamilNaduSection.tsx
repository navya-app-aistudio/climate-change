import React, { useState } from 'react';
import { TAMIL_NADU_DISTRICTS } from '../../data/climateData';
import { DistrictData } from '../../types';
import { SvgBarChart } from '../common/ChartCard';
import { 
  Leaf, 
  Wind, 
  Sun, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  Trees, 
  Droplets, 
  CheckCircle,
  Building2,
  Compass,
  ArrowRight
} from 'lucide-react';

export const TamilNaduSection: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(TAMIL_NADU_DISTRICTS[0]);

  // Comparison metrics between Tamil Nadu and All-India Average
  const comparativeMetrics = [
    { label: 'Renewable Capacity Share (% of Total)', tn: '54.5%', national: '45.8%', note: 'TN leads national average by nearly 9 percentage points' },
    { label: 'Installed Wind Capacity', tn: '10,550 MW', national: '46,800 MW', note: 'TN alone hosts 22.5% of India’s entire wind turbine fleet' },
    { label: 'Solar Installed Capacity', tn: '8,320 MW', national: '85,500 MW', note: 'High growth in rooftop clusters and dryland southern parks' },
    { label: 'State Climate Net-Zero Goal', tn: '2050 (Targeted)', national: '2070 (Official)', note: 'State has set a commitment to achieve neutrality 20 years ahead' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          <span>Section 7 • Sub-National Leadership</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Tamil Nadu Sustainability & Clean Energy Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Recognized globally as India’s renewable powerhouse. Explore wind passes in the Western Ghats, mega solar parks, district-level vulnerability assessments, and the pioneering Tamil Nadu Green Climate Company (TNGCC).
        </p>
      </div>

      {/* 4 Key Highlight Statistics for Tamil Nadu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Wind Energy Capital</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">10,550+ MW</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Installed Wind Power Capacity</p>
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            Source: TEDA / NIWE Verified (2024)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Solar Capacity</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">8,320+ MW</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Utility Parks & Commercial Rooftops</p>
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            Kamuthi, Virudhunagar, Coimbatore
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Peak Clean Power Share</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">52% - 58%</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Share of State Demand during Monsoon</p>
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            TANGEDCO Grid Dispatch Records
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Green TN Mission</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">2.8 Billion</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Native Trees Target over 10 Years</p>
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            Forest Cover Target: 33% from 23.9%
          </div>
        </div>
      </div>

      {/* State-Level Climate Missions: TNGCC */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-teal-800/60 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
              Pioneering Special Purpose Vehicle
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              Tamil Nadu Green Climate Company (TNGCC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              India’s first state-owned climate enterprise, executing three interconnected environmental missions:
            </p>
          </div>

          <a
            href="https://www.tngreencompany.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs transition-colors shrink-0"
          >
            <span>Visit TNGCC Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="font-bold text-teal-300 text-sm">1. Tamil Nadu Climate Change Mission</h3>
            <p className="text-slate-300 leading-relaxed">
              Decarbonizing industrial corridors, formulating district climate action plans for all 38 districts, cool roof rollouts, and electric bus deployment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">2. Green Tamil Nadu Mission</h3>
            <p className="text-slate-300 leading-relaxed">
              Massive participatory native afforestation campaign targeting an increase in tree and forest cover from 23.9% to 33% of total geographic area.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">3. Tamil Nadu Wetlands Mission</h3>
            <p className="text-slate-300 leading-relaxed">
              Ecological rejuvenation of 100 priority wetlands, coastal mangrove restoration at Pichavaram and Muthupet, and sponge-city water basins.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive District-Level Explorer */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Interactive District Sustainability Explorer</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a key renewable hub or eco-sensitive zone to review verified clean capacity and climate initiatives.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Source: TEDA & District Climate Action Plans
          </span>
        </div>

        {/* District Selector Chips */}
        <div className="flex flex-wrap gap-2">
          {TAMIL_NADU_DISTRICTS.map((dist) => {
            const isSelected = selectedDistrict.name === dist.name;
            return (
              <button
                key={dist.name}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {dist.name}
              </button>
            );
          })}
        </div>

        {/* Selected District Profile Details */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                District Focus Area
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedDistrict.name}
              </h4>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 text-xs font-bold">
              <span>Clean Energy Share: {selectedDistrict.cleanEnergyShare}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Wind Capacity</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{selectedDistrict.windCapacityMW} MW</p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Solar Capacity</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{selectedDistrict.solarCapacityMW} MW</p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 sm:col-span-2">
              <span className="text-[10px] font-bold text-rose-500 uppercase">Climate Vulnerability Concern</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedDistrict.vulnerabilityFactor}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Major Clean Energy Assets:
              </h5>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {selectedDistrict.keyProjects.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Ecological Restoration & Adaptation:
              </h5>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {selectedDistrict.climateInitiatives.map((ci, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ci}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: Tamil Nadu vs All-India Benchmarks */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Benchmarking Tamil Nadu Against National Averages</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 pr-4 font-bold">Indicator Metric</th>
                <th className="py-2.5 px-4 font-bold text-teal-700 dark:text-teal-400">Tamil Nadu</th>
                <th className="py-2.5 px-4 font-bold text-amber-700 dark:text-amber-400">All-India Total / Avg</th>
                <th className="py-2.5 pl-4 font-bold">Analytical Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparativeMetrics.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">{row.label}</td>
                  <td className="py-3 px-4 font-bold text-teal-700 dark:text-teal-300 font-mono">{row.tn}</td>
                  <td className="py-3 px-4 font-bold text-amber-700 dark:text-amber-300 font-mono">{row.national}</td>
                  <td className="py-3 pl-4 text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
