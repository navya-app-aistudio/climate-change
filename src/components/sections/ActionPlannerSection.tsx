import React, { useState, useEffect } from 'react';
import { ACTION_CATALOG } from '../../data/climateData';
import { ActionItem } from '../../types';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  Filter, 
  Download, 
  Share2, 
  Award, 
  Trees, 
  Sparkles,
  Info,
  Clock,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ActionPlannerSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  
  // Track selected and completed actions with localStorage persistence
  const [myActions, setMyActions] = useState<Record<string, { selected: boolean; completed: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('climate_action_plan');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Default sample selections
    return {
      'act-led': { selected: true, completed: true },
      'act-ac-temp': { selected: true, completed: true },
      'act-food-waste': { selected: true, completed: false },
      'act-public-transit': { selected: true, completed: false },
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('climate_action_plan', JSON.stringify(myActions));
    } catch (e) {
      // ignore
    }
  }, [myActions]);

  const toggleSelectAction = (actionId: string) => {
    setMyActions((prev) => {
      const current = prev[actionId] || { selected: false, completed: false };
      return {
        ...prev,
        [actionId]: { ...current, selected: !current.selected },
      };
    });
  };

  const toggleCompleteAction = (actionId: string) => {
    setMyActions((prev) => {
      const current = prev[actionId] || { selected: true, completed: false };
      const nextCompleted = !current.completed;
      if (nextCompleted) {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.7 },
        });
      }
      return {
        ...prev,
        [actionId]: { ...current, selected: true, completed: nextCompleted },
      };
    });
  };

  // Filter actions
  const filteredActions = ACTION_CATALOG.filter((action) => {
    if (selectedCategory !== 'all' && action.category !== selectedCategory) return false;
    if (selectedAudience !== 'all' && action.targetAudience !== 'all' && action.targetAudience !== selectedAudience) return false;
    return true;
  });

  // Calculate metrics
  const totalPlannedCO2 = Object.entries(myActions)
    .filter(([_, state]) => state.selected)
    .reduce((sum, [id]) => {
      const act = ACTION_CATALOG.find((a) => a.id === id);
      return sum + (act ? act.co2ReductionKgPerYear : 0);
    }, 0);

  const totalCompletedCO2 = Object.entries(myActions)
    .filter(([_, state]) => state.completed)
    .reduce((sum, [id]) => {
      const act = ACTION_CATALOG.find((a) => a.id === id);
      return sum + (act ? act.co2ReductionKgPerYear : 0);
    }, 0);

  const completedCount = Object.values(myActions).filter((s) => s.completed).length;

  const exportActionPlan = () => {
    const selectedList = Object.entries(myActions)
      .filter(([_, s]) => s.selected)
      .map(([id, s]) => {
        const item = ACTION_CATALOG.find((a) => a.id === id);
        return `[${s.completed ? 'COMPLETED' : 'PENDING'}] ${item?.title} (Est. ${item?.co2ReductionKgPerYear} kg CO2e/yr)`;
      });

    const content = `CLIMATE ACTION PLAN - OUR PLANET, OUR RESPONSIBILITY
Generated on: ${new Date().toLocaleDateString()}
Total Planned Reductions: ${totalPlannedCO2} kg CO2e / year
Completed Reductions: ${totalCompletedCO2} kg CO2e / year
Tasks Completed: ${completedCount}

ACTION ITEMS:
${selectedList.join('\n')}

Scientific Note: Calculations utilize CEA Indian Grid emission factors and IPCC AR6 mitigation standards.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `My_Climate_Action_Plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Section 10 • Practical Sustainability Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Personal & Community Climate Action Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Build your personalized decarbonization roadmap. Select verified actions, set commitments, record completion, and track your annual avoided emissions.
          </p>
        </div>

        <button
          onClick={exportActionPlan}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Action Plan</span>
        </button>
      </div>

      {/* Progress & Milestone Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tasks Completed</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <span>{completedCount}</span>
            <span className="text-xs font-normal text-slate-400">actions verified</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Realized Reductions</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white flex items-baseline gap-1.5">
            <span>{totalCompletedCO2.toLocaleString()}</span>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">kg CO₂e / yr</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Planned Reductions</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white flex items-baseline gap-1.5">
            <span>{totalPlannedCO2.toLocaleString()}</span>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">kg CO₂e / yr</span>
          </div>
        </div>
      </div>

      {/* Mandatory Scientific Rigor Note on Tree Planting vs Fossil Avoidance */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
        <Trees className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-emerald-950 dark:text-emerald-100">
            Scientific Rigor on Tree Planting: No Fixed Guarantees
          </p>
          <p className="leading-relaxed opacity-95">
            We intentionally do NOT claim that planting a fixed number of saplings immediately neutralizes a lifestyle. Real-world ecological carbon sequestration depends strictly on tree species (native broadleaf vs fast-growing exotics), multi-year sapling survival rates (which often fall below 40% without dedicated stewardship), local soil hydrology, and 15 to 30 years of uninterrupted biological growth. True climate integrity requires avoiding fossil emissions at the source first, while stewarding native biodiversity for long-term ecological balance.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Actions' },
            { id: 'energy', label: 'Energy & Power' },
            { id: 'mobility', label: 'Transport & Commuting' },
            { id: 'waste', label: 'Zero Waste & Compost' },
            { id: 'nature', label: 'Native Ecosystems' },
            { id: 'water', label: 'Water Conservation' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Audience:</span>
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">Everyone</option>
            <option value="individual">Individual</option>
            <option value="household">Household</option>
            <option value="community">Community / Campus</option>
          </select>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActions.map((action) => {
          const state = myActions[action.id] || { selected: false, completed: false };

          return (
            <div
              key={action.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                state.completed
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                  : state.selected
                  ? 'bg-white dark:bg-slate-900 border-emerald-500/80 dark:border-emerald-500/60 shadow-xs ring-1 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {action.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      action.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      action.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {action.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Cost: {action.cost}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    +{action.co2ReductionKgPerYear} kg CO₂/yr
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {action.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {action.environmentalBenefit}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Time: {action.timeRequired} • Frequency: {action.suggestedFrequency}</span>
                  </div>
                  <div className="flex items-start gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-400">Verify: {action.verificationMethod}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleSelectAction(action.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                    state.selected
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {state.selected ? 'In My Action Plan' : '+ Add to Plan'}
                </button>

                <button
                  onClick={() => toggleCompleteAction(action.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    state.completed
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{state.completed ? 'Completed ✓' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
