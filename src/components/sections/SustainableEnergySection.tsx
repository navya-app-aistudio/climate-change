import React, { useState } from 'react';
import { ENERGY_TECHNOLOGIES } from '../../data/climateData';
import { EnergyTech } from '../../types';
import { 
  Zap, 
  Sun, 
  Wind, 
  Droplets, 
  Flame, 
  Cpu, 
  ShieldCheck, 
  ExternalLink, 
  Info, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const SustainableEnergySection: React.FC = () => {
  const [selectedTechId, setSelectedTechId] = useState<string>('solar-pv');

  const selectedTech = ENERGY_TECHNOLOGIES.find((t) => t.id === selectedTechId) || ENERGY_TECHNOLOGIES[0];

  const getTechIcon = (category: string) => {
    switch (category) {
      case 'Solar':
        return Sun;
      case 'Wind':
        return Wind;
      case 'Hydropower':
        return Droplets;
      case 'Bioenergy':
        return Flame;
      case 'Storage & Efficiency':
      default:
        return Cpu;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Section 5 • Clean Energy Technology Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Sustainable Energy Technologies Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Deep-dive into the physical mechanisms, economics, lifecycle carbon footprints, and grid integration challenges of zero-emission clean energy solutions.
        </p>
      </div>

      {/* Mandatory Engineering Concept Notice: GW Capacity vs TWh Generation */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-emerald-950 dark:text-emerald-100">
            Crucial Engineering Principle: Installed Capacity (GW) is NOT Electricity Generated (TWh)
          </p>
          <p className="leading-relaxed opacity-90">
            A plant’s <strong>Installed Capacity (in Megawatts or Gigawatts)</strong> represents its maximum theoretical power output under instantaneous optimal conditions. However, <strong>Electricity Generated (in Megawatt-hours or Terawatt-hours)</strong> measures the actual physical energy delivered over time. Because the sun does not shine at night (Solar Capacity Factor ~19-24%) and wind varies (Wind Capacity Factor ~28-40%), 1 GW of solar PV produces roughly one-third to one-fourth the annual electricity of a 1 GW continuous nuclear or thermal plant. Mistaking installed capacity for actual electricity generation leads to severely distorted clean-energy assessments.
          </p>
        </div>
      </div>

      {/* Technology Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        {ENERGY_TECHNOLOGIES.map((tech) => {
          const Icon = getTechIcon(tech.category);
          const isSelected = selectedTech.id === tech.id;
          return (
            <button
              key={tech.id}
              onClick={() => setSelectedTechId(tech.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tech.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Technology Deep-Dive Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Top Header of Technology */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-2">
              <span>{selectedTech.category}</span>
              <span>•</span>
              <span>{selectedTech.isRenewable ? 'Renewable Resource' : 'Non-Renewable'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {selectedTech.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl">
              {selectedTech.howItWorks}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="text-[11px] text-slate-400">Typical Capacity Factor:</span>
            <span className="text-sm font-bold font-mono px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              {selectedTech.capacityFactorTypical}
            </span>
          </div>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Global Capacity</span>
            <p className="text-lg font-black text-slate-900 dark:text-white">{selectedTech.installedCapacityGlobal}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Annual Generation</span>
            <p className="text-lg font-black text-slate-900 dark:text-white">{selectedTech.electricityGenerationGlobal}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Lifecycle Carbon</span>
            <p className="text-lg font-black text-emerald-700 dark:text-emerald-400">{selectedTech.lifecycleEmissions}</p>
            <span className="text-[10px] text-slate-500">vs Coal: ~820-1050 g CO₂/kWh</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Cost Benchmark</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{selectedTech.costBenchmark}</p>
          </div>
        </div>

        {/* Advantages vs Limitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Engineering & Environmental Advantages</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {selectedTech.advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-3">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Limitations, Intermittency & Grid Constraints</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {selectedTech.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Typical Applications & Real World Deployments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Typical Applications:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedTech.typicalApplications.map((app, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Global & National Precedent Examples:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedTech.countryExamples.map((ex, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ecological & Materials Considerations */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
          <strong className="text-slate-900 dark:text-white">
            Land, Water & Critical Mineral Footprint:
          </strong>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedTech.environmentalFootprint}
          </p>
        </div>

        {/* Source Citation */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Source: {selectedTech.sourceName} ({selectedTech.reportingPeriod})</span>
          <a
            href={selectedTech.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Read Publication</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
