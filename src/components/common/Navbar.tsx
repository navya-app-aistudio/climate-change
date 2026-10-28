import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bot, 
  Calculator, 
  Compass, 
  Zap, 
  MapPin, 
  BookOpen, 
  Award, 
  FileText, 
  Database, 
  Info,
  Flame,
  Leaf
} from 'lucide-react';

interface Props {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeSection,
  onSelectSection,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navGroups = [
    {
      label: 'Explore',
      items: [
        { id: 'home', label: 'Home Dashboard', icon: Globe },
        { id: 'science', label: 'Climate Science', icon: BookOpen },
        { id: 'global-stats', label: 'Global Statistics', icon: Compass },
        { id: 'emissions', label: 'Emissions Tracker', icon: Flame },
      ],
    },
    {
      label: 'Energy & Regions',
      items: [
        { id: 'energy', label: 'Sustainable Energy', icon: Zap },
        { id: 'india', label: 'India Climate Report', icon: MapPin },
        { id: 'tamilnadu', label: 'Tamil Nadu Dashboard', icon: Leaf },
      ],
    },
    {
      label: 'Calculators & Action',
      items: [
        { id: 'calculator-carbon', label: 'Carbon Calculator', icon: Calculator },
        { id: 'calculator-solar', label: 'Solar Calculator', icon: Sun },
        { id: 'planner', label: 'Action Planner', icon: Compass },
        { id: 'challenges', label: 'School Challenges', icon: Award },
      ],
    },
    {
      label: 'Intelligence',
      items: [
        { id: 'assistant', label: 'AI Climate Assistant', icon: Bot, isHighlight: true },
        { id: 'reports', label: 'Reports & Analytics', icon: FileText },
        { id: 'sources', label: 'Data & Methodology', icon: Database },
        { id: 'about', label: 'About Project', icon: Info },
      ],
    },
  ];

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Strip: Earth Alert */}
      <div className="bg-emerald-900 text-emerald-100 dark:bg-emerald-950 dark:text-emerald-200 text-[11px] font-medium py-1 px-4 text-center tracking-wide border-b border-emerald-800 flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-bold uppercase tracking-wider text-emerald-300">There Is No Planet B</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Empirical Climate Science & Clean Energy Acceleration</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline text-emerald-300">Community Avoided CO₂: 12,480 kg</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6 animate-[spin_40s_linear_infinite]" />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  Climate Action & Clean Energy
                </span>
                <span className="block text-[11px] font-medium text-emerald-700 dark:text-emerald-400 -mt-0.5">
                  Our Planet, Our Responsibility
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'home'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => handleNavClick('science')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'science'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Climate Science
              </button>

              <button
                onClick={() => handleNavClick('global-stats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'global-stats' || activeSection === 'emissions'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Global Data
              </button>

              <button
                onClick={() => handleNavClick('energy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'energy'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Clean Energy
              </button>

              <button
                onClick={() => handleNavClick('india')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'india' || activeSection === 'tamilnadu'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                India & Tamil Nadu
              </button>

              <button
                onClick={() => handleNavClick('calculator-carbon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'calculator-carbon' || activeSection === 'calculator-solar'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Calculators
              </button>

              <button
                onClick={() => handleNavClick('planner')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'planner' || activeSection === 'challenges'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Action Planner
              </button>

              <button
                onClick={() => handleNavClick('reports')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeSection === 'reports'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Reports
              </button>
            </nav>

            {/* Right CTAs: AI Assistant, Theme Toggle, Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('assistant')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  activeSection === 'assistant'
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500'
                    : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                }`}
                title="Ask the AI Climate Assistant with grounded scientific citations"
              >
                <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="inline sm:hidden">AI</span>
              </button>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme mode"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-xl">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                  {group.label}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
