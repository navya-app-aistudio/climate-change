import React, { useState, useMemo } from 'react';
import { 
  Sun, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  IndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';

export const SolarCalculatorSection: React.FC = () => {
  // Inputs
  const [monthlyConsumptionKWh, setMonthlyConsumptionKWh] = useState<number>(300);
  const [peakSunHours, setPeakSunHours] = useState<number>(5.0); // 5.0 hours/day typical for India
  const [systemSizeKW, setSystemSizeKW] = useState<number>(3.0); // 3 kWp
  const [performanceRatio, setPerformanceRatio] = useState<number>(0.78); // 78% typical PR
  const [tariffPerKWh, setTariffPerKWh] = useState<number>(7.5); // ₹7.50 / kWh domestic slab
  const [costPerKW, setCostPerKW] = useState<number>(55000); // ₹55,000 per kW benchmark
  const [applySuryaGharSubsidy, setApplySuryaGharSubsidy] = useState<boolean>(true);

  // Auto recommend system size based on consumption:
  // Monthly gen = Size * PeakSunHours * 30 * PR => Size = Monthly / (PeakSunHours * 30 * PR)
  const recommendedSize = useMemo(() => {
    const rawSize = monthlyConsumptionKWh / (peakSunHours * 30 * performanceRatio);
    return Math.max(1, parseFloat(rawSize.toFixed(1)));
  }, [monthlyConsumptionKWh, peakSunHours, performanceRatio]);

  // Calculations
  const calculations = useMemo(() => {
    // Daily Generation (kWh) = System Size (kW) * Peak Sun Hours (h/day) * Performance Ratio
    const dailyGenKWh = systemSizeKW * peakSunHours * performanceRatio;
    const monthlyGenKWh = dailyGenKWh * 30;
    const annualGenKWh = dailyGenKWh * 365;

    // Demand coverage
    const demandCoveredPercent = Math.min(100, Math.round((monthlyGenKWh / monthlyConsumptionKWh) * 100));
    const excessExportKWh = Math.max(0, monthlyGenKWh - monthlyConsumptionKWh);

    // Financials
    const grossCost = systemSizeKW * costPerKW;

    // PM Surya Ghar subsidy formula:
    // 1 kW: ₹30,000 - ₹33,000
    // 2 kW: ₹60,000 - ₹66,000
    // 3 kW or higher: capped at ₹78,000
    let subsidy = 0;
    if (applySuryaGharSubsidy) {
      if (systemSizeKW <= 1) {
        subsidy = 30000;
      } else if (systemSizeKW <= 2) {
        subsidy = 60000;
      } else {
        subsidy = 78000;
      }
    }

    const netCost = Math.max(5000, grossCost - subsidy);

    // Annual bill savings
    // Electricity offset within consumption + excess sold via net-metering (assuming 75% export credit)
    const selfConsumedKWh = Math.min(monthlyConsumptionKWh, monthlyGenKWh) * 12;
    const exportedKWh = excessExportKWh * 12;
    const annualSavingsINR = (selfConsumedKWh * tariffPerKWh) + (exportedKWh * (tariffPerKWh * 0.65));

    // Simple payback period (Years) = Net Investment / Annual Savings
    const paybackYears = parseFloat((netCost / annualSavingsINR).toFixed(1));

    // Avoided CO2 Emissions (CEA baseline grid factor: ~0.716 kg CO2 / kWh)
    const annualAvoidedCO2Kg = annualGenKWh * 0.716;
    const lifetimeAvoidedCO2Tonnes = (annualAvoidedCO2Kg * 25) / 1000; // 25-year panel warranty

    // 25-year cumulative net savings
    const lifetimeGrossSavingsINR = annualSavingsINR * 25;
    const lifetimeNetSavingsINR = lifetimeGrossSavingsINR - netCost;

    return {
      dailyGenKWh: parseFloat(dailyGenKWh.toFixed(1)),
      monthlyGenKWh: Math.round(monthlyGenKWh),
      annualGenKWh: Math.round(annualGenKWh),
      demandCoveredPercent,
      grossCost: Math.round(grossCost),
      subsidy: Math.round(subsidy),
      netCost: Math.round(netCost),
      annualSavingsINR: Math.round(annualSavingsINR),
      paybackYears,
      annualAvoidedCO2Kg: Math.round(annualAvoidedCO2Kg),
      lifetimeAvoidedCO2Tonnes: parseFloat(lifetimeAvoidedCO2Tonnes.toFixed(1)),
      lifetimeNetSavingsINR: Math.round(lifetimeNetSavingsINR),
      requiredRoofAreaSqFt: Math.round(systemSizeKW * 90), // ~90 sq.ft per kWp
    };
  }, [
    monthlyConsumptionKWh,
    peakSunHours,
    systemSizeKW,
    performanceRatio,
    tariffPerKWh,
    costPerKW,
    applySuryaGharSubsidy,
  ]);

  const handleReset = () => {
    setMonthlyConsumptionKWh(300);
    setPeakSunHours(5.0);
    setSystemSizeKW(3.0);
    setPerformanceRatio(0.78);
    setTariffPerKWh(7.5);
    setCostPerKW(55000);
    setApplySuryaGharSubsidy(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            <span>Section 9 • Renewable Energy Engineering</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Rooftop Solar PV Generation & Financial Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Model energy generation, simple payback period, PM Surya Ghar central subsidies, and 25-year avoided grid carbon emissions.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Engineering Assumptions Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Transparent Engineering Assumptions:</strong> Generation modeling applies standard PV formulas accounting for a Performance Ratio (PR: 78%) covering inverter conversion losses (~4%), wiring losses (~2%), module soiling/dust (~5%), and ambient temperature derating (~11%). Savings assume net-metering billing. Results are projections, not a legally binding guarantee.
        </div>
      </div>

      {/* Main Grid: Inputs vs Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Solar System Sizing & Site Parameters</span>
              </span>
              <button
                onClick={() => setSystemSizeKW(recommendedSize)}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                title="Click to apply recommended size"
              >
                Auto-fit Size ({recommendedSize} kW)
              </button>
            </h3>

            <div className="space-y-4 text-xs">
              {/* Monthly Consumption */}
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Current Monthly Electricity Consumption:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {monthlyConsumptionKWh} kWh (units)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="10"
                  value={monthlyConsumptionKWh}
                  onChange={(e) => setMonthlyConsumptionKWh(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Proposed System Size */}
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Proposed Solar PV Capacity (kWp):</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                    {systemSizeKW} kWp (~{calculations.requiredRoofAreaSqFt} sq.ft shadow-free roof needed)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={systemSizeKW}
                  onChange={(e) => setSystemSizeKW(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Solar Irradiance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Daily Peak Sun Hours (h/day):
                  </label>
                  <select
                    value={peakSunHours}
                    onChange={(e) => setPeakSunHours(parseFloat(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value={5.5}>5.5 hrs/day (Southern India / Tamil Nadu / Rajasthan)</option>
                    <option value={5.0}>5.0 hrs/day (All-India Average / Central India)</option>
                    <option value={4.5}>4.5 hrs/day (Northern / Coastal Plains)</option>
                    <option value={4.0}>4.0 hrs/day (Hilly / North-Eastern India)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Performance Ratio (System Efficiency):
                  </label>
                  <select
                    value={performanceRatio}
                    onChange={(e) => setPerformanceRatio(parseFloat(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value={0.82}>82% (High-spec Monocrystalline + Micro-inverters)</option>
                    <option value={0.78}>78% (Standard Tier-1 String Inverter Setup)</option>
                    <option value={0.72}>72% (Hot tropical / dusty climate derating)</option>
                  </select>
                </div>
              </div>

              {/* Financial Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Electricity Grid Tariff (₹ / kWh):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="3"
                    max="20"
                    value={tariffPerKWh}
                    onChange={(e) => setTariffPerKWh(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Typical domestic slab in India: ₹6.50 - ₹9.00</span>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Benchmark Installation Cost (₹ / kW):
                  </label>
                  <input
                    type="number"
                    step="1000"
                    min="35000"
                    max="100000"
                    value={costPerKW}
                    onChange={(e) => setCostPerKW(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Prevailing market turnkey price: ~₹55,000/kW</span>
                </div>
              </div>

              {/* PM Surya Ghar Toggle */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applySuryaGharSubsidy}
                    onChange={(e) => setApplySuryaGharSubsidy(e.target.checked)}
                    className="rounded-sm text-amber-600 focus:ring-amber-500 mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-amber-950 dark:text-amber-100 block">
                      Apply PM Surya Ghar: Muft Bijli Yojana Central Subsidy
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 text-[11px] block mt-0.5">
                      Direct Central Financial Assistance (₹30,000 for 1kW, ₹60,000 for 2kW, capped at ₹78,000 for 3kW+).
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Highlights Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/60 to-slate-950 text-white border border-amber-900/60 shadow-lg space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Annual Solar Generation
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black">{calculations.annualGenKWh.toLocaleString()}</span>
                <span className="text-lg font-bold text-amber-300">kWh / year</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Averages <strong>{calculations.dailyGenKWh} units/day</strong> or <strong>{calculations.monthlyGenKWh} units/month</strong>.
              </p>
            </div>

            {/* Demand Coverage Pill */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Demand Offset by Clean Solar:</span>
                <span className="font-bold font-mono text-emerald-300">{calculations.demandCoveredPercent}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, calculations.demandCoveredPercent)}%` }}
                />
              </div>
            </div>

            {/* Financial Payback */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Est. Annual Bill Savings:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  ₹{calculations.annualSavingsINR.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Simple Payback Period:</span>
                <span className="text-xl font-bold font-mono text-amber-300">
                  {calculations.paybackYears} Years
                </span>
              </div>
            </div>
          </div>

          {/* Capital Cost & Subsidy Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Investment & Financial Return Breakdown
            </h4>

            <div className="space-y-2 pt-1">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Gross Turnkey Installation Cost:</span>
                <span className="font-mono font-bold">₹{calculations.grossCost.toLocaleString()}</span>
              </div>

              {calculations.subsidy > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>PM Surya Ghar Subsidy Deduction:</span>
                  <span className="font-mono">- ₹{calculations.subsidy.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white">
                <span>Net Consumer Out-of-Pocket:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">₹{calculations.netCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-2 text-slate-600 dark:text-slate-400">
                <span>25-Year Net Cumulative Savings:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ₹{calculations.lifetimeNetSavingsINR.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Avoided Emissions */}
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950 dark:text-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Environmental Avoided Emissions</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Displacing grid coal power saves approximately <strong>{calculations.annualAvoidedCO2Kg.toLocaleString()} kg CO₂/year</strong>, and over <strong>{calculations.lifetimeAvoidedCO2Tonnes} tonnes CO₂</strong> over the 25-year panel lifetime!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
