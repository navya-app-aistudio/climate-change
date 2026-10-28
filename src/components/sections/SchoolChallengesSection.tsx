import React, { useState } from 'react';
import { SCHOOL_CHALLENGES } from '../../data/climateData';
import { SchoolChallenge } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Award, 
  Users, 
  Zap, 
  Droplets, 
  Trash2, 
  Trees, 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SchoolChallengesSection: React.FC = () => {
  const [challenges, setChallenges] = useState<SchoolChallenge[]>(SCHOOL_CHALLENGES);
  const [showAddModal, setShowAddModal] = useState(false);

  // New challenge form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Energy Conservation');
  const [newBaseline, setNewBaseline] = useState(1000);
  const [newTarget, setNewTarget] = useState(800);
  const [newCurrent, setNewCurrent] = useState(850);
  const [newUnit, setNewUnit] = useState('kWh / month');
  const [newParticipants, setNewParticipants] = useState(120);

  // Community opt-in leaderboard (sample anonymized schools)
  const leaderboard = [
    { rank: 1, name: 'Kendriya Vidyalaya Green Wings Eco-Club', location: 'Chennai', co2AvoidedKg: 2850, participants: 620, status: 'Verified Audit' },
    { rank: 2, name: 'Bharathi Vidya Bhavan Solar Scouts', location: 'Coimbatore', co2AvoidedKg: 2420, participants: 480, status: 'Verified Audit' },
    { rank: 3, name: 'St. Michael Green Campus Committee', location: 'Madurai', co2AvoidedKg: 1910, participants: 390, status: 'Self-Reported' },
    { rank: 4, name: 'Government Higher Secondary Climate Lab', location: 'Tirunelveli', co2AvoidedKg: 1740, participants: 310, status: 'Self-Reported' },
  ];

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Approximate avoided CO2 (assuming energy or waste avoided)
    const avoidedUnits = Math.max(0, newBaseline - newCurrent);
    const co2Saved = Math.round(avoidedUnits * 0.716);

    const created: SchoolChallenge = {
      id: `sch-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: `Student community collective initiative targeting ${newBaseline - newTarget} ${newUnit} reduction.`,
      duration: '30 Days',
      metrics: {
        baseline: newBaseline,
        target: newTarget,
        current: newCurrent,
        unit: newUnit,
      },
      participantsCount: newParticipants,
      co2SavedKg: co2Saved || 150,
      status: 'active',
      isSelfReported: true,
    };

    setChallenges([created, ...challenges]);
    setShowAddModal(false);
    setNewTitle('');

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  // Aggregate metrics
  const totalElectricitySaved = challenges
    .filter((c) => c.metrics.unit.includes('kWh'))
    .reduce((sum, c) => sum + Math.max(0, c.metrics.baseline - c.metrics.current), 0);

  const totalWaterSaved = challenges
    .filter((c) => c.metrics.unit.includes('litres'))
    .reduce((sum, c) => sum + Math.max(0, c.metrics.baseline - c.metrics.current), 0);

  const totalWasteDiverted = challenges
    .filter((c) => c.metrics.unit.includes('plastic'))
    .reduce((sum, c) => sum + Math.max(0, c.metrics.baseline - c.metrics.current), 0);

  const totalCO2Avoided = challenges.reduce((sum, c) => sum + c.co2SavedKg, 0);
  const totalParticipants = challenges.reduce((sum, c) => sum + c.participantsCount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Section 11 • Youth & Community Action</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            School & Community Green Challenges
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Empower classrooms, eco-clubs, and neighborhood resident associations to track collective baselines, verify resource savings, and celebrate ecological stewardship.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Launch Campus Challenge</span>
        </button>
      </div>

      {/* Aggregate Community Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Electricity Saved</span>
          <p className="text-xl font-black text-slate-900 dark:text-white">{totalElectricitySaved.toLocaleString()} kWh</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Water Conserved</span>
          <p className="text-xl font-black text-sky-600 dark:text-sky-400">{totalWaterSaved.toLocaleString()} L</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Plastic Diverted</span>
          <p className="text-xl font-black text-amber-600 dark:text-amber-400">{totalWasteDiverted.toLocaleString()} kg</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Avoided Emissions</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{totalCO2Avoided.toLocaleString()} kg</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Participants</span>
          <p className="text-xl font-black text-purple-600 dark:text-purple-400">{totalParticipants.toLocaleString()}</p>
        </div>
      </div>

      {/* Active Campus Challenges Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Active Student & Campus Audits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {challenges.map((c) => {
            const delta = c.metrics.baseline - c.metrics.current;
            const targetDelta = c.metrics.baseline - c.metrics.target;
            const percentAchieved = Math.min(100, Math.round((delta / targetDelta) * 100));

            return (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {c.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                      {c.title}
                    </h4>
                  </div>
                  <StatusBadge status={c.isSelfReported ? 'USER-REPORTED' : 'VERIFIED OBSERVATION'} />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.description}
                </p>

                {/* Metrics comparison */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-500">Baseline: {c.metrics.baseline} {c.metrics.unit}</span>
                    <span className="text-emerald-700 dark:text-emerald-400">Current: {c.metrics.current} {c.metrics.unit}</span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(5, percentAchieved)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Target: {c.metrics.target} {c.metrics.unit}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{percentAchieved}% of target reached</span>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.participantsCount} Students / Citizens</span>
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                    Avoided: {c.co2SavedKg} kg CO₂e
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opt-In Verified Campus Leaderboard */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Participating Institutional Eco-Clubs Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Only groups that have explicitly opted-in to participate are listed. Zero personal student information is ever collected or published.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 pr-4 font-bold">Rank</th>
                <th className="py-2.5 px-4 font-bold">Institution / Group Name</th>
                <th className="py-2.5 px-4 font-bold">Region</th>
                <th className="py-2.5 px-4 font-bold">Avoided CO₂</th>
                <th className="py-2.5 px-4 font-bold">Participants</th>
                <th className="py-2.5 pl-4 font-bold">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">#{item.rank}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{item.name}</td>
                  <td className="py-3 px-4 text-slate-500">{item.location}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {item.co2AvoidedKg.toLocaleString()} kg
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.participants}</td>
                  <td className="py-3 pl-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding a challenge */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Launch a New Campus or Community Challenge
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Record verified or self-reported community targets. No personally identifiable student information should be entered.
            </p>

            <form onSubmit={handleCreateChallenge} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Challenge Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Block Phantom Power Elimination Drive"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Category:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Energy Conservation">Energy Conservation</option>
                    <option value="Waste Diversion">Waste Diversion</option>
                    <option value="Water Conservation">Water Conservation</option>
                    <option value="Ecosystem Restoration">Ecosystem Restoration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Metric Unit:</label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Baseline Value:</label>
                  <input
                    type="number"
                    value={newBaseline}
                    onChange={(e) => setNewBaseline(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Goal:</label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Current Level:</label>
                  <input
                    type="number"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Estimated Students / Participants:</label>
                <input
                  type="number"
                  value={newParticipants}
                  onChange={(e) => setNewParticipants(parseInt(e.target.value, 10) || 0)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer shadow-xs"
                >
                  Save & Publish Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
