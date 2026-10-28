import React, { useState } from 'react';
import { CLIMATE_QUIZ_QUESTIONS } from '../../data/climateData';
import { 
  BookOpen, 
  Sun, 
  Flame, 
  Wind, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Layers, 
  Globe, 
  Droplets,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ClimateScienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'ghg' | 'causes' | 'impacts' | 'solutions' | 'sdgs' | 'quiz'>('concepts');
  const [glossaryQuery, setGlossaryQuery] = useState('');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [questionId]: optionIdx });
  };

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
    // Calculate score
    let score = 0;
    CLIMATE_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    if (score >= 4) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Glossary terms
  const glossaryTerms = [
    {
      term: 'Greenhouse Effect',
      category: 'Science',
      def: 'The natural process where greenhouse gases in Earth’s atmosphere absorb outgoing infrared (thermal) radiation emitted by the Earth and re-radiate it in all directions, warming the lower atmosphere and surface.',
    },
    {
      term: 'Global Warming Potential (GWP)',
      category: 'Metrics',
      def: 'A metric measuring how much infrared thermal energy a gas absorbs over a specific timeframe (usually 100 years) relative to carbon dioxide (which has a baseline GWP of 1).',
    },
    {
      term: 'Capacity Utilization Factor (CUF)',
      category: 'Energy',
      def: 'The ratio of actual electrical energy produced by a power plant over a year to its maximum theoretical output if operated at full nameplate capacity continuously (8,760 hours).',
    },
    {
      term: 'Ocean Acidification',
      category: 'Consequence',
      def: 'The ongoing decrease in oceanic pH caused by the absorption of anthropogenic carbon dioxide, forming carbonic acid (H₂CO₃) and depleting carbonate ions essential for coral reefs and shellfish.',
    },
    {
      term: 'Nationally Determined Contributions (NDCs)',
      category: 'Policy',
      def: 'National climate action pledges submitted by countries to the UNFCCC under the Paris Agreement detailing emissions mitigation targets and adaptation policies.',
    },
    {
      term: 'Emissions Intensity of GDP',
      category: 'Policy',
      def: 'The total volume of greenhouse gas emissions generated per unit of economic output (GDP). India pledged to reduce its emissions intensity by 45% by 2030 compared to 2005.',
    },
    {
      term: 'Albedo Effect',
      category: 'Science',
      def: 'The fraction of solar radiation reflected by a surface. White snow and ice have high albedo (~0.8), while dark open ocean has low albedo (~0.06), absorbing more heat when ice melts.',
    },
    {
      term: 'Pumped Storage Hydropower (PSP)',
      category: 'Energy',
      def: 'A configuration where water is pumped to an upper reservoir using low-cost clean power and later released through hydro turbines to produce electricity during peak demand.',
    },
  ];

  const filteredGlossary = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      t.def.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Section 2 • Climate Science & Foundations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          The Science of Earth's Changing Climate
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Ground your understanding in physics, atmospheric chemistry, and ecological science. Explore the fundamental mechanisms governing weather, global warming, greenhouse gases, adaptation, and mitigation.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'concepts', label: 'Weather vs Climate & Physics' },
          { id: 'ghg', label: 'Main Greenhouse Gases' },
          { id: 'causes', label: 'Anthropogenic Causes' },
          { id: 'impacts', label: 'Consequences & Tipping Points' },
          { id: 'solutions', label: 'Mitigation & Adaptation' },
          { id: 'sdgs', label: 'UN SDGs Alignment' },
          { id: 'quiz', label: 'Interactive Science Quiz' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Concepts - Weather vs Climate & Greenhouse Effect */}
      {activeTab === 'concepts' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weather vs Climate Comparison Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Core Distinction
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Weather vs. Climate: What is the Difference?
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-2">
                  <h4 className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Weather (Short-Term)</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    The day-to-day atmospheric conditions at a specific place and time (temperature, rainfall, wind velocity, humidity). Changes in minutes or days.
                  </p>
                  <p className="font-medium text-sky-800 dark:text-sky-300">
                    Example: "A sudden heavy downpour in Chennai this afternoon."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Climate (Long-Term Average)</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    The statistical average and variability of weather conditions calculated over an extended baseline period (typically 30 years or more, defined by WMO).
                  </p>
                  <p className="font-medium text-emerald-800 dark:text-emerald-300">
                    Example: "Tamil Nadu’s multi-decadal shift toward erratic monsoon onset."
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Scientific Reference: World Meteorological Organization (WMO) Technical Regulation No. 49.
              </div>
            </div>

            {/* The Physics of the Greenhouse Effect */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Atmospheric Physics
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                How the Greenhouse Effect Works
              </h3>
              
              {/* Interactive Diagram Walkthrough */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Incoming Solar Radiation:</strong> Sunlight passes through Earth's clear atmosphere in short wavelengths (visible light and UV).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Surface Absorption:</strong> Earth absorbs the shortwave energy and warms up, re-radiating thermal energy back toward space as longwave infrared radiation.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">The "Enhanced" Blanket:</strong> Polyatomic molecules ($CO_2$, $CH_4$, $N_2O$, $H_2O$) absorb this infrared frequency, vibrate, and re-emit heat back toward Earth’s surface, amplifying warming.
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Without natural greenhouse gases, Earth’s average temperature would be -18°C rather than +15°C. Excessive emissions thicken this heat blanket dangerously.
              </div>
            </div>
          </div>

          {/* Interactive Terminology Search & Glossary */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Climate Science Glossary & Key Definitions</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Search formal definitions verified against IPCC AR6 glossaries.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={glossaryQuery}
                  onChange={(e) => setGlossaryQuery(e.target.value)}
                  placeholder="Search key terms..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.term}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Main Greenhouse Gases */}
      {activeTab === 'ghg' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CO2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Primary Anthropogenic Driver</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">GWP: 1 (Baseline)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Carbon Dioxide (CO₂)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Accounting for ~76% of total global greenhouse gas warming impact. It has an atmospheric residence time of 300 to 1,000+ years, meaning carbon emitted today influences planetary climate for millennia.
            </p>
            <div className="space-y-1 text-xs">
              <div className="text-slate-700 dark:text-slate-300"><strong>Major Sources:</strong> Fossil fuel combustion (coal, petrol, diesel, natural gas) for electricity generation, industrial smelting, cement calcination, and tropical deforestation.</div>
              <div className="text-slate-700 dark:text-slate-300"><strong>Pre-industrial vs Today:</strong> 280 ppm → 423.5 ppm (+51% increase).</div>
            </div>
          </div>

          {/* CH4 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">High Potency Near-Term Gas</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">GWP: 28-36 (100-yr)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Methane (CH₄)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Causes ~16% of global warming. Although its atmospheric lifetime is shorter (~12 years), it traps over 80 times more heat than CO₂ over a 20-year timescale, making methane mitigation the fastest way to slow near-term warming.
            </p>
            <div className="space-y-1 text-xs">
              <div className="text-slate-700 dark:text-slate-300"><strong>Major Sources:</strong> Enteric fermentation in livestock, flooded paddy rice cultivation, unmanaged municipal organic waste in landfills, and fugitive leaks from fossil gas pipelines.</div>
              <div className="text-slate-700 dark:text-slate-300"><strong>Concentration:</strong> ~722 ppb (pre-industrial) → ~1,920 ppb (over 160% increase).</div>
            </div>
          </div>

          {/* N2O */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Agricultural & Chemical Gas</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">GWP: 273 (100-yr)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nitrous Oxide (N₂O)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Accounting for ~6% of global emissions, N₂O remains in the atmosphere for ~114 years and also degrades the protective stratospheric ozone layer.
            </p>
            <div className="space-y-1 text-xs">
              <div className="text-slate-700 dark:text-slate-300"><strong>Major Sources:</strong> Overuse of synthetic nitrogen fertilizers in agriculture, livestock manure management, nitric acid manufacturing, and catalytic converters.</div>
              <div className="text-slate-700 dark:text-slate-300"><strong>Concentration:</strong> ~270 ppb (pre-industrial) → ~336 ppb (+24% increase).</div>
            </div>
          </div>

          {/* F-Gases */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Synthetic Industrial Chemicals</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">GWP: 1,000 - 24,000</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fluorinated Gases (HFCs, PFCs, SF₆, NF₃)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Entirely synthetic chemical compounds. While present in minute atmospheric amounts (~2%), their immense heat-trapping capacity and multi-thousand-year atmospheric lifetimes make phase-downs (e.g. Kigali Amendment) critical.
            </p>
            <div className="space-y-1 text-xs">
              <div className="text-slate-700 dark:text-slate-300"><strong>Major Sources:</strong> Air conditioning refrigerants, semiconductor etching, electrical switchgear dielectric insulation (SF₆), and aerosol propellants.</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Anthropogenic Causes */}
      {activeTab === 'causes' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Human Drivers of Planetary Warming (IPCC AR6 Sectoral Breakdown)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Empirical data demonstrates that over 99% of modern warming is driven by anthropogenic combustion and land alteration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <span className="font-extrabold text-rose-600 dark:text-rose-400">34% OF GLOBAL EMISSIONS</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Energy Supply & Power Grid</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Burning coal, fossil gas, and petroleum for electricity and industrial process heat. Transitioning to wind, solar, and hydro is the single largest mitigation lever.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <span className="font-extrabold text-amber-600 dark:text-amber-400">24% OF GLOBAL EMISSIONS</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Heavy Industry & Materials</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Steel blast furnaces, cement kilns, chemicals, and plastic production. Requires green hydrogen and industrial electrification.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">22% OF GLOBAL EMISSIONS</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Agriculture & Land Clearing</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Tropical deforestation, livestock enteric fermentation, fertilizer synthetic nitrogen, and peatland drainage.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <span className="font-extrabold text-blue-600 dark:text-blue-400">15% OF GLOBAL EMISSIONS</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Transport & Logistics</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Internal combustion engine passenger cars, freight diesel trucks, maritime cargo ships, and aviation kerosene combustion.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <span className="font-extrabold text-teal-600 dark:text-teal-400">5% OF GLOBAL EMISSIONS</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Buildings & Direct Heating</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  On-site fossil gas and oil furnaces for space heating, cooking stoves, and inefficient architectural thermal envelopes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <span className="font-extrabold text-purple-600 dark:text-purple-400">CROSS-CUTTING</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Municipal Solid Waste</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Unsegregated food waste and organic biomass decomposing under anaerobic conditions in open dump yards generating massive methane plumes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Impacts */}
      {activeTab === 'impacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Extreme Heatwaves & Changing Monsoons</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Warmer air holds approximately 7% more water vapor per 1°C of warming (Clausius-Clapeyron relation). In the Indian subcontinent, this manifests as prolonged deadly pre-monsoon heatwaves followed by intense cloudbursts, severe flash flooding, and longer dry spells between rain events.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-500" />
              <span>Sea-Level Rise & Coastal Salinity Ingress</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Global mean sea level has risen over 100 mm since 1993, driven 50% by thermal expansion of warming seawater and 50% by polar ice sheet and glacier melt. Coastal cities like Chennai and low-lying Cauvery delta agricultural fields face saltwater infiltration contaminating freshwater aquifers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-500" />
              <span>Ocean Acidification & Coral Bleaching</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The world ocean absorbs over 90% of excess planetary heat and ~25% of anthropogenic CO₂. The resulting drop in ocean pH by 0.1 units represents a 30% increase in ocean surface acidity, decimating calcium carbonate shell builders and bleaching marine coral ecosystems like the Gulf of Mannar.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Cryosphere & Himalayan Glacier Retreat</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The Hindu Kush Himalayas—the "Third Pole"—supply freshwater to over 1.9 billion people across South and East Asia. Accelerating glacial retreat increases Glacial Lake Outburst Flood (GLOF) disasters before triggering severe long-term perennial river basin water shortages.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: Solutions (Mitigation vs Adaptation) */}
      {activeTab === 'solutions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mitigation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Addressing the Root Cause
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Climate Mitigation (Preventing Further Warming)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Actions designed to reduce or prevent the emission of greenhouse gases into the atmosphere or enhance greenhouse gas sinks.
            </p>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Power Sector Decarbonization:</strong> Rapidly replacing coal and fossil gas with utility and rooftop solar, wind, and pumped storage.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Energy Efficiency:</strong> Deploying 5-star BEE labeled inverters, LED retrofits, and high-performance building insulation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Electrification of Transport:</strong> Converting public bus fleets, two-wheelers, and railways to electric power.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Afforestation & Ecosystem Sinks:</strong> Protecting mature old-growth forests, planting diverse native species, and restoring coastal mangroves.</span>
              </li>
            </ul>
          </div>

          {/* Adaptation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Surviving Locked-in Changes
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Climate Adaptation (Building Resilience)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Adjusting human systems, infrastructure, and institutions in response to actual or expected climatic changes and their effects.
            </p>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Early-Warning Systems:</strong> Doppler weather radar networks and mobile alerts for cyclonic storms and urban flash floods.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Climate-Smart Agriculture:</strong> Shift to drought-hardy traditional millets (Ragi, Kambu), drip irrigation, and weather-indexed crop insurance.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Urban Sponge Infrastructure:</strong> Revitalizing traditional temple tanks, desilting lakes, and bioswales to absorb floodwaters.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Heat Action Plans:</strong> Cool roofs, painting reflective white coatings, public hydration hubs, and altered labor shift schedules during heatwaves.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: UN Sustainable Development Goals */}
      {activeTab === 'sdgs' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              UN 2030 Agenda: How Climate & Energy Intersect with Global Goals
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Climate action is not isolated; it directly determines clean water, food security, resilient cities, and social equity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-700 text-white font-black flex items-center justify-center text-[10px]">13</span>
                <h4 className="font-bold text-slate-900 dark:text-white">SDG 13: Climate Action</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Take urgent action to combat climate change and its impacts through emissions reduction targets, climate finance, and resilient national policies.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px]">7</span>
                <h4 className="font-bold text-slate-900 dark:text-white">SDG 7: Affordable & Clean Energy</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Ensure universal access to affordable, reliable, sustainable modern energy by doubling the global rate of energy efficiency and expanding clean renewables.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-500 text-white font-black flex items-center justify-center text-[10px]">6</span>
                <h4 className="font-bold text-slate-900 dark:text-white">SDG 6: Clean Water & Sanitation</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Thermal coal power requires enormous cooling water. Shifting to solar PV and wind saves billions of cubic meters of fresh water annually.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-orange-600 text-white font-black flex items-center justify-center text-[10px]">11</span>
                <h4 className="font-bold text-slate-900 dark:text-white">SDG 11: Sustainable Cities</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Electrified public transit, decentralized rooftop solar, municipal flood sponge systems, and urban green canopies protect against heat islands.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-teal-600 text-white font-black flex items-center justify-center text-[10px]">14</span>
                <h4 className="font-bold text-slate-900 dark:text-white">SDG 14: Life Below Water</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Halting CO₂ emissions halts oceanic acid formation, preserving marine biodiversity, coral reefs, and coastal fisheries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-green-700 text-white font-black flex items-center justify-center text-[10px]">15</span>
                <h4 className="font-bold text-slate-900 dark:text-white">SDG 15: Life on Land</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Sustainable forest stewardship, stopping open-field stubble burning, and restoring degraded agricultural soils.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Interactive Science Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Test Your Climate & Clean Energy Knowledge</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Answer 5 scientifically validated questions. Detailed scientific explanations will unlock upon submission.
              </p>
            </div>

            {quizSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Quiz</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {CLIMATE_QUIZ_QUESTIONS.map((q, idx) => {
              const selected = quizAnswers[q.id];
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {idx + 1}. {q.question}
                    </span>
                    {quizSubmitted && (
                      <span className="shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            <CheckCircle className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                            <XCircle className="w-4 h-4" /> Review
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

                      if (isOptionSelected) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold';
                      }

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${btnStyle}`}
                        >
                          <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {quizSubmitted && (
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        Scientific Explanation:
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {q.explanation}
                      </p>
                      <div className="text-[10px] text-slate-400 pt-1">
                        Source Reference: {q.source}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleGradeQuiz}
              disabled={Object.keys(quizAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              Submit & Check Answers
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
              <div>
                <strong>Quiz Completed!</strong> You answered{' '}
                {
                  CLIMATE_QUIZ_QUESTIONS.filter((q) => quizAnswers[q.id] === q.correctIndex)
                    .length
                }{' '}
                out of {CLIMATE_QUIZ_QUESTIONS.length} correctly.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
