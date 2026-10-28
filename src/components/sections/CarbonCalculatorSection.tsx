import React, { useState, useMemo } from 'react';
import { SvgBarChart } from '../common/ChartCard';
import { 
  Calculator, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  Car, 
  Plane, 
  Utensils, 
  Trash2, 
  CheckCircle, 
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';

interface Props {
  onAddToPlanner?: (actionTitle: string, kgSavings: number) => void;
}

export const CarbonCalculatorSection: React.FC<Props> = ({ onAddToPlanner }) => {
  // Input states with transparent defaults
  const [electricityKWhMonthly, setElectricityKWhMonthly] = useState<number>(200);
  const [gridRegion, setGridRegion] = useState<string>('india-national');
  const [lpgCylindersYearly, setLpgCylindersYearly] = useState<number>(8);
  
  const [carKmWeekly, setCarKmWeekly] = useState<number>(50);
  const [carFuelType, setCarFuelType] = useState<string>('petrol');
  const [twoWheelerKmWeekly, setTwoWheelerKmWeekly] = useState<number>(40);
  const [twoWheelerType, setTwoWheelerType] = useState<string>('petrol');
  
  const [publicTransitKmWeekly, setPublicTransitKmWeekly] = useState<number>(30);
  const [shortHaulFlightsYearly, setShortHaulFlightsYearly] = useState<number>(2);
  const [longHaulFlightsYearly, setLongHaulFlightsYearly] = useState<number>(0);
  
  const [dietType, setDietType] = useState<string>('vegetarian');
  const [compostsFoodWaste, setCompostsFoodWaste] = useState<boolean>(true);
  const [recyclesDryWaste, setRecyclesDryWaste] = useState<boolean>(true);

  // Calculation Engine
  const calculation = useMemo(() => {
    // 1. Grid Emission Factor (kg CO2 / kWh)
    // Central Electricity Authority (CEA) CO2 Baseline Database for the Indian Power Sector v19
    let gridFactor = 0.716; // All-India Average (Weighted average including coal + hydro + RE)
    if (gridRegion === 'green-tariff') gridFactor = 0.05; // 100% RE contract
    if (gridRegion === 'global-avg') gridFactor = 0.44; // Global average

    const electricityAnnualKg = electricityKWhMonthly * 12 * gridFactor;
    // LPG: 14.2 kg cylinder emits ~42.3 kg CO2 upon combustion (IPCC emission factor 2.98 kg CO2/kg LPG)
    const cookingGasAnnualKg = lpgCylindersYearly * 42.3;

    // 2. Private Mobility
    // Car factors (kg CO2 / km):
    // Petrol hatchback ~0.14 kg/km; Diesel ~0.16 kg/km; EV charged on Indian grid ~0.09 kg/km; Hybrid ~0.095 kg/km
    let carFactor = 0.14;
    if (carFuelType === 'diesel') carFactor = 0.16;
    if (carFuelType === 'ev') carFactor = 0.09;
    if (carFuelType === 'hybrid') carFactor = 0.095;
    const carAnnualKg = carKmWeekly * 52 * carFactor;

    // Two-wheeler factors: Petrol 110-150cc ~0.045 kg/km; Electric scooter ~0.018 kg/km
    const twoWheelerFactor = twoWheelerType === 'electric' ? 0.018 : 0.045;
    const twoWheelerAnnualKg = twoWheelerKmWeekly * 52 * twoWheelerFactor;

    // 3. Public Transport & Aviation
    // Bus & Metro: ~0.035 kg CO2 / passenger-km
    const publicTransitAnnualKg = publicTransitKmWeekly * 52 * 0.035;
    // Flights: Short haul domestic round trip (~1,200 km) ~240 kg CO2e with radiative forcing; Long haul ~1,600 kg CO2e
    const flightsAnnualKg = (shortHaulFlightsYearly * 240) + (longHaulFlightsYearly * 1600);

    // 4. Food & Diet (IPCC Working Group III lifecycle dietary emissions in kg CO2e/person/year)
    // Heavy meat eater: ~2,800 kg; Average omnivore: ~1,900 kg; Vegetarian: ~1,100 kg; Vegan: ~850 kg
    let dietAnnualKg = 1100;
    if (dietType === 'heavy-meat') dietAnnualKg = 2800;
    if (dietType === 'omnivore') dietAnnualKg = 1900;
    if (dietType === 'vegan') dietAnnualKg = 850;

    // 5. Waste & Recycling
    let wasteAnnualKg = 320; // Average baseline waste emissions (landfill methane)
    if (compostsFoodWaste) wasteAnnualKg -= 140; // Avoids anaerobic methane
    if (recyclesDryWaste) wasteAnnualKg -= 70; // Avoids virgin materials extraction
    if (wasteAnnualKg < 50) wasteAnnualKg = 50;

    const totalKg = electricityAnnualKg + cookingGasAnnualKg + carAnnualKg + twoWheelerAnnualKg + publicTransitAnnualKg + flightsAnnualKg + dietAnnualKg + wasteAnnualKg;
    const totalTonnes = totalKg / 1000;

    const categories = [
      { label: 'Household Electricity', value: Math.round(electricityAnnualKg), color: '#f59e0b', share: Math.round((electricityAnnualKg / totalKg) * 100) },
      { label: 'Cooking Fuel (LPG/Gas)', value: Math.round(cookingGasAnnualKg), color: '#fb923c', share: Math.round((cookingGasAnnualKg / totalKg) * 100) },
      { label: 'Private Car Travel', value: Math.round(carAnnualKg), color: '#ef4444', share: Math.round((carAnnualKg / totalKg) * 100) },
      { label: 'Two-Wheeler Travel', value: Math.round(twoWheelerAnnualKg), color: '#f87171', share: Math.round((twoWheelerAnnualKg / totalKg) * 100) },
      { label: 'Aviation & Flights', value: Math.round(flightsAnnualKg), color: '#8b5cf6', share: Math.round((flightsAnnualKg / totalKg) * 100) },
      { label: 'Public Transit', value: Math.round(publicTransitAnnualKg), color: '#3b82f6', share: Math.round((publicTransitAnnualKg / totalKg) * 100) },
      { label: 'Food & Nutrition', value: Math.round(dietAnnualKg), color: '#10b981', share: Math.round((dietAnnualKg / totalKg) * 100) },
      { label: 'Waste & Landfill', value: Math.round(wasteAnnualKg), color: '#64748b', share: Math.round((wasteAnnualKg / totalKg) * 100) },
    ];

    // Identify largest contributor
    const sortedCategories = [...categories].sort((a, b) => b.value - a.value);
    const topContributor = sortedCategories[0];

    return {
      totalKg: Math.round(totalKg),
      totalTonnes: parseFloat(totalTonnes.toFixed(2)),
      categories,
      topContributor,
    };
  }, [
    electricityKWhMonthly,
    gridRegion,
    lpgCylindersYearly,
    carKmWeekly,
    carFuelType,
    twoWheelerKmWeekly,
    twoWheelerType,
    publicTransitKmWeekly,
    shortHaulFlightsYearly,
    longHaulFlightsYearly,
    dietType,
    compostsFoodWaste,
    recyclesDryWaste,
  ]);

  const handleReset = () => {
    setElectricityKWhMonthly(200);
    setGridRegion('india-national');
    setLpgCylindersYearly(8);
    setCarKmWeekly(50);
    setCarFuelType('petrol');
    setTwoWheelerKmWeekly(40);
    setTwoWheelerType('petrol');
    setPublicTransitKmWeekly(30);
    setShortHaulFlightsYearly(2);
    setLongHaulFlightsYearly(0);
    setDietType('vegetarian');
    setCompostsFoodWaste(true);
    setRecyclesDryWaste(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Section 8 • Personal Environmental Accounting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Personal Carbon Footprint Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Calculate your annual greenhouse gas footprint using official CEA grid emission factors and IPCC consumption methodologies. 100% private and in-browser.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Inputs</span>
        </button>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong>Scientific Methodology Notice:</strong> These results represent an engineering estimate based on standardized emission factors (CEA Baseline v19 ~0.716 kg CO₂/kWh, DEFRA transport metrics, IPCC AR6 food life-cycles), not a certified legal audit. Zero personal information is requested or uploaded.
        </div>
      </div>

      {/* Calculator Grid: Left Inputs, Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Home Energy & Fuel */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. Electricity & Household Cooking Fuel</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Monthly Electricity Use (kWh / units):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="20"
                    max="1200"
                    step="10"
                    value={electricityKWhMonthly}
                    onChange={(e) => setElectricityKWhMonthly(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-14 text-right">
                    {electricityKWhMonthly} kWh
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Typical 3-person Indian urban home: ~150-250 kWh/mo</span>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Grid Power Source / Factor:
                </label>
                <select
                  value={gridRegion}
                  onChange={(e) => setGridRegion(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="india-national">Indian Grid (CEA Baseline ~0.716 kg/kWh)</option>
                  <option value="green-tariff">100% Green Renewable Tariff (~0.05 kg/kWh)</option>
                  <option value="global-avg">World Average Grid (~0.440 kg/kWh)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  LPG Cooking Cylinders used per Year:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={lpgCylindersYearly}
                    onChange={(e) => setLpgCylindersYearly(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-14 text-right">
                    {lpgCylindersYearly} cyl/yr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Commuting & Vehicles */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-500" />
              <span>2. Road Travel & Commuting</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Car Travel (km / week):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={carKmWeekly}
                    onChange={(e) => setCarKmWeekly(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-14 text-right">
                    {carKmWeekly} km
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Car Fuel Technology:
                </label>
                <select
                  value={carFuelType}
                  onChange={(e) => setCarFuelType(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="petrol">Petrol (Gasoline)</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Strong Hybrid</option>
                  <option value="ev">Battery Electric (EV)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Two-Wheeler (km / week):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="5"
                    value={twoWheelerKmWeekly}
                    onChange={(e) => setTwoWheelerKmWeekly(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-14 text-right">
                    {twoWheelerKmWeekly} km
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Two-Wheeler Type:
                </label>
                <select
                  value={twoWheelerType}
                  onChange={(e) => setTwoWheelerType(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="petrol">Petrol Motorcycle / Scooter</option>
                  <option value="electric">Electric Scooter / EV Bike</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Bus, Metro & Train Public Transit (km / week):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="5"
                    value={publicTransitKmWeekly}
                    onChange={(e) => setPublicTransitKmWeekly(parseInt(e.target.value, 10))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-900 dark:text-white min-w-14 text-right">
                    {publicTransitKmWeekly} km
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Flights, Food & Waste */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plane className="w-4 h-4 text-purple-500" />
              <span>3. Flights, Dietary Habits & Waste</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Domestic Flights / Year (Round Trips):
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={shortHaulFlightsYearly}
                  onChange={(e) => setShortHaulFlightsYearly(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  International Flights / Year (Round Trips):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={longHaulFlightsYearly}
                  onChange={(e) => setLongHaulFlightsYearly(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Food Consumption Pattern:
                </label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="heavy-meat">Frequent Meat Consumer (Daily red meat/poultry)</option>
                  <option value="omnivore">Average Omnivore (Moderate meat/fish/dairy)</option>
                  <option value="vegetarian">Vegetarian (Lacto-vegetarian / Dairy)</option>
                  <option value="vegan">Plant-Based / Vegan</option>
                </select>
              </div>

              <div className="space-y-2 pt-1">
                <span className="block text-slate-700 dark:text-slate-300 font-semibold">
                  Waste Stewardship:
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={compostsFoodWaste}
                    onChange={(e) => setCompostsFoodWaste(e.target.checked)}
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Composts food scraps / No food to landfill (-140 kg CO₂)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recyclesDryWaste}
                    onChange={(e) => setRecyclesDryWaste(e.target.checked)}
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Segregates paper, plastics & metals (-70 kg CO₂)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Total Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-emerald-900/60 shadow-lg space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Estimated Total Annual Footprint
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tight">{calculation.totalTonnes}</span>
              <span className="text-lg font-bold text-emerald-300">tonnes CO₂e / year</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Equals approximately <strong>{calculation.totalKg.toLocaleString()} kg</strong> of greenhouse gases per year.
            </p>

            {/* Benchmark Gauge */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Comparison Benchmarks:</span>
                <span className="font-semibold text-emerald-300">
                  {calculation.totalTonnes <= 2.0 ? '🌟 Under 2.0t Paris Target' : calculation.totalTonnes <= 4.7 ? 'Below Global Average' : 'Above Global Average'}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>India National Average:</span>
                  <span className="font-mono font-bold">1.95 tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span>World Global Average:</span>
                  <span className="font-mono font-bold">4.70 tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span>United States Average:</span>
                  <span className="font-mono font-bold">14.90 tonnes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown by Category */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Emissions Breakdown by Activity</span>
              <span className="text-xs text-slate-400 font-normal">Ranked by volume</span>
            </h4>

            <div className="space-y-3">
              {calculation.categories.map((cat, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{cat.label}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {cat.value} kg ({cat.share}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${cat.share}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Top Contributor Alert */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <strong>Largest Single Emission Source:</strong>
              <p>
                <strong>{calculation.topContributor.label}</strong> makes up {calculation.topContributor.share}% of your total footprint ({calculation.topContributor.value} kg). This is your highest-leverage area for targeted mitigation!
              </p>
            </div>
          </div>

          {/* Action Recommendations Box */}
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-100 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Recommended High-Impact Actions</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Install 2-3 kW Rooftop Solar PV</strong>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Saves up to 2,500 kg CO₂/yr</span>
                </div>
                {onAddToPlanner && (
                  <button
                    onClick={() => onAddToPlanner('Rooftop Solar PV', 2500)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 cursor-pointer"
                  >
                    Add
                  </button>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Shift 2 Days Weekly Commute to Metro</strong>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Saves up to 580 kg CO₂/yr</span>
                </div>
                {onAddToPlanner && (
                  <button
                    onClick={() => onAddToPlanner('Shift Commute to Metro', 580)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 cursor-pointer"
                  >
                    Add
                  </button>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Standardize AC set-point to 24°C</strong>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Saves up to 320 kg CO₂/yr</span>
                </div>
                {onAddToPlanner && (
                  <button
                    onClick={() => onAddToPlanner('Standardize AC to 24C', 320)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 cursor-pointer"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
