import React from 'react';
import { Globe, ShieldCheck, Heart, ExternalLink, ArrowUp } from 'lucide-react';

interface Props {
  onSelectSection: (sectionId: string) => void;
}

export const Footer: React.FC<Props> = ({ onSelectSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      {/* Core Message Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            Collective Global Imperative
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            “Understand the Climate. Choose Clean Energy. Measure Your Impact. Act for Our Future.”
          </h2>
          <p className="text-emerald-100 text-sm max-w-2xl mx-auto leading-relaxed">
            There is no Planet B. Every fraction of a degree avoided, every kilowatt-hour of clean energy generated, and every community mobilized counts toward preserving a habitable biosphere.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Ethos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                Climate Action Platform
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              An evidence-based, open-access climate intelligence platform bridging empirical climate science, renewable energy analytics, and localized climate solutions for India and the world.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Grounded in IPCC, WMO, NASA & MNRE Data</span>
            </div>
          </div>

          {/* Col 2: Navigation Shortcuts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Application Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectSection('home')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('science')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Climate Science & SDG Alignment
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('global-stats')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Global Climate Statistics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('energy')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Clean Energy Technology Deep-Dive
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('india')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  India Climate Progress Report
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('tamilnadu')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Tamil Nadu Sustainability Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Calculators & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Tools & Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectSection('calculator-carbon')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Personal Carbon Footprint Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('calculator-solar')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Rooftop Solar PV Savings Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('planner')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Personal & Household Action Planner
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('challenges')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  School Green Campus Challenges
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('reports')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Report Generator & PDF Export
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('assistant')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  AI Climate Assistant (Gemini)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Authoritative Sources & UN SDGs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Authoritative Data Sources
            </h4>
            <div className="space-y-2 text-xs">
              <a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span>IPCC (Intergovernmental Panel)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://climate.nasa.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span>NASA Climate & GISTEMP</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span>NOAA Mauna Loa Observatory</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://mnre.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span>MNRE (Govt. of India)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://cea.nic.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span>CEA Central Electricity Authority</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.tngreencompany.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span>Tamil Nadu Green Climate Company</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* UN SDG Chips */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="text-slate-400 font-normal mr-2">Targeted UN Sustainable Development Goals:</span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white">SDG 7: Clean Energy</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white">SDG 13: Climate Action</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500 text-white">SDG 6: Clean Water</span>
            <span className="px-2.5 py-1 rounded-md bg-orange-600 text-white">SDG 11: Sustainable Cities</span>
            <span className="px-2.5 py-1 rounded-md bg-amber-700 text-white">SDG 12: Responsible Consumption</span>
            <span className="px-2.5 py-1 rounded-md bg-sky-600 text-white">SDG 14: Life Below Water</span>
            <span className="px-2.5 py-1 rounded-md bg-green-600 text-white">SDG 15: Life on Land</span>
          </div>
        </div>

        {/* Bottom row: Privacy notice and Scroll to Top */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            Scientific Accuracy & Privacy Commitment: Calculators operate 100% locally in your browser. All metrics reference official publications.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
