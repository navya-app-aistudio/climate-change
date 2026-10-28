export type DataStatus = 
  | 'VERIFIED OBSERVATION'
  | 'ESTIMATE'
  | 'PROJECTION'
  | 'USER-REPORTED'
  | 'DEMONSTRATION DATA';

export interface StatIndicator {
  id: string;
  name: string;
  latestValue: number | string;
  displayValue: string;
  unit: string;
  observationPeriod: string;
  previousValue?: number | string;
  displayPrevious?: string;
  changeDirection: 'up-bad' | 'up-good' | 'down-bad' | 'down-good' | 'neutral';
  changePercent?: number;
  explanation: string;
  sourceName: string;
  sourceUrl: string;
  lastUpdated: string;
  status: DataStatus;
  category: 'global-climate' | 'energy' | 'impact' | 'restoration';
  uncertaintyNotes?: string;
}

export interface TimeSeriesPoint {
  year: number;
  value: number;
  unit?: string;
  label?: string;
}

export interface MultiSeriesData {
  title: string;
  unit: string;
  series: {
    name: string;
    color: string;
    data: TimeSeriesPoint[];
  }[];
  description: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
}

export interface EnergyTech {
  id: string;
  name: string;
  category: 'Solar' | 'Wind' | 'Hydropower' | 'Bioenergy' | 'Geothermal & Ocean' | 'Storage & Efficiency';
  isRenewable: boolean;
  howItWorks: string;
  advantages: string[];
  limitations: string[];
  typicalApplications: string[];
  costBenchmark: string;
  installedCapacityGlobal: string;
  electricityGenerationGlobal: string;
  lifecycleEmissions: string; // e.g. "41 g CO2eq/kWh"
  environmentalFootprint: string;
  countryExamples: string[];
  sourceName: string;
  sourceUrl: string;
  reportingPeriod: string;
  capacityFactorTypical: string;
}

export interface DistrictData {
  name: string;
  windCapacityMW: number;
  solarCapacityMW: number;
  keyProjects: string[];
  climateInitiatives: string[];
  vulnerabilityFactor: string;
  cleanEnergyShare: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category: 'energy' | 'mobility' | 'diet' | 'waste' | 'water' | 'nature';
  targetAudience: 'individual' | 'household' | 'school' | 'community' | 'all';
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  cost: 'Free' | 'Low' | 'Medium' | 'High';
  environmentalBenefit: string;
  co2ReductionKgPerYear: number;
  timeRequired: string;
  suggestedFrequency: string;
  verificationMethod: string;
  scientificNotes?: string;
}

export interface SchoolChallenge {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  metrics: {
    baseline: number;
    target: number;
    current: number;
    unit: string;
  };
  participantsCount: number;
  co2SavedKg: number;
  status: 'active' | 'completed' | 'upcoming';
  isSelfReported: boolean;
}

export interface ReportConfig {
  reportType: 'global' | 'india' | 'tamilnadu' | 'energy' | 'footprint' | 'school';
  title: string;
  reportingPeriod: string;
  geographicCoverage: string;
  executiveSummary: string;
  keyIndicators: { name: string; value: string; source: string; status: DataStatus }[];
  historicalHighlights: string[];
  keyAchievements: string[];
  areasForImprovement: string[];
  dataGapsAndUncertainty: string[];
  recommendations: string[];
  methodology: string;
  citations: { name: string; url: string }[];
  retrievalDate: string;
  generationDate: string;
}
