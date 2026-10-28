import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Award, 
  Heart, 
  Users, 
  BookOpen, 
  Sun, 
  Zap, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" />
          <span>Section 15 • Philosophy & Charter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          About the Climate Action & Sustainable Energy Project
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          An interactive, data-driven initiative dedicated to turning climate awareness into measurable, verified environmental action across households, classrooms, and communities.
        </p>
      </div>

      {/* Core Message Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-8 sm:p-12 border border-emerald-800/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guiding North Star</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            “Understand the Climate. Choose Clean Energy. Measure Your Impact. Act for Our Future.”
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-serif">
            There is no Planet B. Climate change is the pre-eminent defining civilizational challenge of our era. By coupling empirical measurements with transparent local calculators, actionable plans, and accessible AI, this platform equips students, teachers, households, and professionals with the verifiable tools needed to build a regenerative future.
          </p>
        </div>
      </div>

      {/* 4 Core Pillars of the Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Scientific Integrity</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Never fabricating live measurements or presenting estimates as facts. Every number is grounded in peer-reviewed observations from NASA, NOAA, IPCC, and the CEA.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Zero Greenwashing</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Explicitly distinguishing installed capacity (GW) from actual electrical generation (TWh), and acknowledging real intermittency, grid storage, and mineral requirements.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Open Access & Privacy</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Zero mandatory login barriers. Calculators run 100% locally in your browser. No private names, addresses, or personal student data are ever collected.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Localized Action</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Featuring deep dives into India’s 200+ GW clean transition, central schemes like PM Surya Ghar, and Tamil Nadu’s world-renowned wind corridor leadership.
          </p>
        </div>
      </div>

      {/* Who is this platform for? */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Who Can Benefit from this Platform?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Students & Educators</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Use verified interactive charts, climate science quizzes, and green campus challenges for classroom curriculum, science exhibitions, and eco-club audits.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Households & Communities</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate household carbon footprints using Indian grid factors, calculate solar rooftop payback under PM Surya Ghar, and adopt practical waste segregation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Researchers & Policy Advocates</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Export verified time-series CSVs, benchmark sub-national data against national targets, and generate formal 15-point environmental analytics reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
