import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Sections
import { HomeDashboard } from './components/sections/HomeDashboard';
import { ClimateScienceSection } from './components/sections/ClimateScienceSection';
import { GlobalStatsSection } from './components/sections/GlobalStatsSection';
import { CarbonEmissionsSection } from './components/sections/CarbonEmissionsSection';
import { SustainableEnergySection } from './components/sections/SustainableEnergySection';
import { IndiaReportSection } from './components/sections/IndiaReportSection';
import { TamilNaduSection } from './components/sections/TamilNaduSection';
import { CarbonCalculatorSection } from './components/sections/CarbonCalculatorSection';
import { SolarCalculatorSection } from './components/sections/SolarCalculatorSection';
import { ActionPlannerSection } from './components/sections/ActionPlannerSection';
import { SchoolChallengesSection } from './components/sections/SchoolChallengesSection';
import { ReportsAnalyticsSection } from './components/sections/ReportsAnalyticsSection';
import { AIAssistantSection } from './components/sections/AIAssistantSection';
import { DataSourcesSection } from './components/sections/DataSourcesSection';
import { AboutSection } from './components/sections/AboutSection';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('climate_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('climate_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('climate_theme', 'light');
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToActionPlan = (actionTitle: string, kgSavings: number) => {
    // Navigate to action planner
    setActiveSection('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Universal Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Dynamic Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeSection === 'home' && (
          <HomeDashboard onSelectSection={handleSelectSection} />
        )}

        {activeSection === 'science' && (
          <ClimateScienceSection />
        )}

        {activeSection === 'global-stats' && (
          <GlobalStatsSection />
        )}

        {activeSection === 'emissions' && (
          <CarbonEmissionsSection />
        )}

        {activeSection === 'energy' && (
          <SustainableEnergySection />
        )}

        {activeSection === 'india' && (
          <IndiaReportSection />
        )}

        {activeSection === 'tamilnadu' && (
          <TamilNaduSection />
        )}

        {activeSection === 'calculator-carbon' && (
          <CarbonCalculatorSection onAddToPlanner={handleAddToActionPlan} />
        )}

        {activeSection === 'calculator-solar' && (
          <SolarCalculatorSection />
        )}

        {activeSection === 'planner' && (
          <ActionPlannerSection />
        )}

        {activeSection === 'challenges' && (
          <SchoolChallengesSection />
        )}

        {activeSection === 'reports' && (
          <ReportsAnalyticsSection />
        )}

        {activeSection === 'assistant' && (
          <AIAssistantSection />
        )}

        {activeSection === 'sources' && (
          <DataSourcesSection />
        )}

        {activeSection === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectSection={handleSelectSection} />
    </div>
  );
}
