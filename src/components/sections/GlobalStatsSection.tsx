import React, { useState } from 'react';
import { 
  SvgLineChart, 
  SvgBarChart 
} from '../common/ChartCard';
import { 
  HISTORICAL_TEMP_DATA, 
  HISTORICAL_CO2_DATA,
  GLOBAL_RENEWABLE_CAPACITY_GROWTH 
} from '../../data/climateData';
import { 
  Compass, 
  Download, 
  ExternalLink, 
  Filter, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export const GlobalStatsSection: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<string>('temp');
  const [selectedRegion, setSelectedRegion] = useState<string>('global');

  // Indicators database
  const indicatorOptions = [
    { id: 'temp', name: '1. Surface Temperature Anomaly', unit: '°C' },
    { id: 'co2', name: '2. Atmospheric CO₂ Concentration', unit: 'ppm' },
    { id: 'ghg', name: '3. Total Global GHG Emissions', unit: 'Gt CO₂e' },
    { id: 're-capacity', name: '4. Renewable Installed Capacity', unit: 'GW' },
    { id: 're-gen', name: '5. Renewable Electricity Generation', unit: 'TWh' },
    { id: 'fossil-share', name: '6. Fossil Fuel Electricity Share', unit: '%' },
    { id: 'sea-level', name: '7. Global Mean Sea Level Change', unit: 'mm' },
    { id: 'ocean-heat', name: '8. Ocean Heat Content (0-2000m)', unit: '10²² Joules' },
    { id: 'forest-loss', name: '9. Primary Tropical Forest Loss', unit: 'Million ha' },
    { id: 'disaster-loss', name: '10. Climate Disaster Economic Loss', unit: '$ Billion' },
    { id: 'clean-investment', name: '11. Clean Energy Global Investment', unit: '$ Billion' },
  ];

  // Specific datasets for each indicator
  const indicatorDetails: Record<string, any> = {
    temp: {
      title: 'Global Mean Surface Temperature Anomaly (1880 - 2024)',
      unit: '°C',
      description: 'Deviation relative to the pre-industrial 1850-1900 baseline. 2023-2024 breached the +1.45°C mark.',
      lineData: HISTORICAL_TEMP_DATA.map((d) => ({ x: d.year, y: d.value })),
      lineColor: '#ef4444',
      baseline: 0,
      source: 'NASA GISTEMP v4 / WMO State of the Global Climate',
      sourceUrl: 'https://climate.nasa.gov/vital-signs/global-temperature/',
      coverage: 'Global terrestrial and sea-surface thermometer networks',
      lastRetrieved: '2024-03-19',
      pubDate: 'March 2024',
      limitations: 'Spatial coverage in polar regions (Antarctica/Arctic) interpolated via satellite infrared radiometers.',
      comparisons: [
        { label: 'Global Average (2023)', value: 1.45, color: '#ef4444' },
        { label: 'Arctic Amplification (2023)', value: 3.1, color: '#dc2626', secondaryLabel: 'Warming at 3x the global rate' },
        { label: 'Europe Land Surface (2023)', value: 2.2, color: '#f87171' },
        { label: 'India Land Surface (2023)', value: 1.15, color: '#f59e0b', secondaryLabel: 'IMD verified annual mean' },
      ],
    },
    co2: {
      title: 'Atmospheric Carbon Dioxide Concentration (1960 - 2024)',
      unit: 'ppm',
      description: 'Measured directly in clean Pacific maritime air at Mauna Loa Observatory, Hawaii.',
      lineData: HISTORICAL_CO2_DATA.map((d) => ({ x: d.year, y: d.value })),
      lineColor: '#f59e0b',
      source: 'NOAA Global Monitoring Laboratory & Scripps Institution of Oceanography',
      sourceUrl: 'https://gml.noaa.gov/ccgg/trends/',
      coverage: 'Global baseline baseline background atmosphere',
      lastRetrieved: '2024-05-15',
      pubDate: 'May 2024',
      limitations: 'Local volcanic outgassing events at Mauna Loa are actively filtered using high-precision wind vectors.',
      comparisons: [
        { label: 'Pre-Industrial Baseline (1750)', value: 280, color: '#10b981' },
        { label: 'Year 1990 Baseline (IPCC First Report)', value: 354.4, color: '#3b82f6' },
        { label: 'Year 2010 Measurement', value: 389.9, color: '#f59e0b' },
        { label: 'Current 2024 Observation', value: 423.5, color: '#ef4444', secondaryLabel: '+51% above pre-industrial' },
      ],
    },
    ghg: {
      title: 'Global Annual Anthropogenic GHG Emissions (1990 - 2023)',
      unit: 'Gt CO₂e',
      description: 'Includes energy, industrial process, agriculture, forestry, and methane emissions converted using 100-yr GWP.',
      lineData: [
        { x: 1990, y: 38.2 },
        { x: 2000, y: 41.5 },
        { x: 2010, y: 50.1 },
        { x: 2015, y: 53.8 },
        { x: 2020, y: 53.2 },
        { x: 2021, y: 55.4 },
        { x: 2022, y: 56.1 },
        { x: 2023, y: 57.4 },
      ],
      lineColor: '#ef4444',
      source: 'UNEP Emissions Gap Report 2023 & Global Carbon Project',
      sourceUrl: 'https://www.unep.org/resources/emissions-gap-report',
      coverage: 'Global territorial and international bunker fuel inventories',
      lastRetrieved: '2023-11-20',
      pubDate: 'November 2023',
      limitations: 'Land-use and forestry emissions carry ±30% uncertainty; fossil emissions carry ±5%.',
      comparisons: [
        { label: 'China', value: 14.4, color: '#ef4444', secondaryLabel: '25.1% of global total' },
        { label: 'United States', value: 6.0, color: '#3b82f6', secondaryLabel: '10.5% of global total' },
        { label: 'India', value: 3.9, color: '#f59e0b', secondaryLabel: '6.8% of global total' },
        { label: 'European Union (27)', value: 3.4, color: '#10b981', secondaryLabel: '5.9% of global total' },
      ],
    },
    're-capacity': {
      title: 'Global Cumulative Renewable Power Capacity (2010 - 2023)',
      unit: 'GW',
      description: 'Total nameplate generation capacity across solar PV, wind, hydropower, bioenergy, and geothermal.',
      lineData: GLOBAL_RENEWABLE_CAPACITY_GROWTH.map((d) => ({ x: d.year, y: d.total })),
      lineColor: '#10b981',
      source: 'IRENA Renewable Capacity Statistics 2024',
      sourceUrl: 'https://www.irena.org/Publications/2024/Mar/Renewable-capacity-statistics-2024',
      coverage: 'Global national utility and off-grid registers',
      lastRetrieved: '2024-03-27',
      pubDate: 'March 2024',
      limitations: 'Capacity (GW) indicates maximum capability under ideal conditions, not annual energy generation (TWh).',
      comparisons: [
        { label: 'Solar PV (Global)', value: 1419, color: '#f59e0b' },
        { label: 'Hydropower (Global)', value: 1268, color: '#3b82f6' },
        { label: 'Wind Power (Global)', value: 1017, color: '#06b6d4' },
        { label: 'Bioenergy & Geothermal', value: 166, color: '#84cc16' },
      ],
    },
    're-gen': {
      title: 'Global Renewable Electricity Generation (2010 - 2023)',
      unit: 'TWh',
      description: 'Actual electricity fed into transmission and distribution grids by clean renewable sources.',
      lineData: [
        { x: 2010, y: 4200 },
        { x: 2013, y: 5080 },
        { x: 2016, y: 6010 },
        { x: 2018, y: 6700 },
        { x: 2020, y: 7420 },
        { x: 2022, y: 8200 },
        { x: 2023, y: 8900 },
      ],
      lineColor: '#059669',
      source: 'Ember Global Electricity Review 2024',
      sourceUrl: 'https://ember-climate.org/insights/research/global-electricity-review-2024/',
      coverage: 'Global national grid dispatch records',
      lastRetrieved: '2024-05-08',
      pubDate: 'May 2024',
      limitations: 'Excludes captive industrial off-grid generation where data reporting is voluntary.',
      comparisons: [
        { label: 'Hydropower Generation', value: 4210, color: '#3b82f6', secondaryLabel: '47.3% of all renewables' },
        { label: 'Wind Power Generation', value: 2310, color: '#06b6d4', secondaryLabel: '26.0% of all renewables' },
        { label: 'Solar PV Generation', value: 1630, color: '#f59e0b', secondaryLabel: '18.3% of all renewables' },
        { label: 'Bioenergy Generation', value: 620, color: '#84cc16', secondaryLabel: '7.0% of all renewables' },
      ],
    },
    'fossil-share': {
      title: 'Global Fossil Fuel Electricity Generation Share (2010 - 2023)',
      unit: '%',
      description: 'Percentage of world electricity derived from coal, fossil gas, and oil combustion.',
      lineData: [
        { x: 2010, y: 67.5 },
        { x: 2013, y: 66.8 },
        { x: 2016, y: 65.2 },
        { x: 2018, y: 64.1 },
        { x: 2020, y: 61.3 },
        { x: 2022, y: 61.0 },
        { x: 2023, y: 60.6 },
      ],
      lineColor: '#64748b',
      source: 'IEA & Ember Global Electricity Review',
      sourceUrl: 'https://www.iea.org/reports/electricity-2024',
      coverage: 'Global electric power sector',
      lastRetrieved: '2024-04-12',
      pubDate: 'April 2024',
      limitations: 'Calculated as percentage of total generation; absolute fossil generation continued to grow slightly due to demand expansion.',
      comparisons: [
        { label: 'Coal Power Share', value: 35.4, color: '#475569' },
        { label: 'Fossil Gas Share', value: 22.5, color: '#94a3b8' },
        { label: 'Renewables (Solar+Wind+Hydro)', value: 30.3, color: '#10b981' },
        { label: 'Nuclear Energy Share', value: 9.1, color: '#8b5cf6' },
      ],
    },
    'sea-level': {
      title: 'Global Mean Sea Level Change (1993 - 2024)',
      unit: 'mm',
      description: 'Satellite radar altimetry (TOPEX/Poseidon, Jason-1/2/3, Sentinel-6) tracking oceanic rise.',
      lineData: [
        { x: 1993, y: 0 },
        { x: 1998, y: 14 },
        { x: 2003, y: 31 },
        { x: 2008, y: 46 },
        { x: 2013, y: 63 },
        { x: 2018, y: 84 },
        { x: 2021, y: 97 },
        { x: 2024, y: 104 },
      ],
      lineColor: '#0284c7',
      source: 'NASA Sea Level Change Portal / NOAA',
      sourceUrl: 'https://sealevel.nasa.gov/',
      coverage: 'Global oceans 66°S to 66°N latitude',
      lastRetrieved: '2024-04-01',
      pubDate: 'April 2024',
      limitations: 'Rate of sea-level rise has doubled from ~1.7 mm/year in 1993 to ~4.4 mm/year over the past decade.',
      comparisons: [
        { label: 'Thermal Expansion of Water (Stereic)', value: 50, color: '#0284c7', secondaryLabel: '~50% contribution' },
        { label: 'Greenland Ice Sheet Melt', value: 25, color: '#38bdf8', secondaryLabel: '~25% contribution' },
        { label: 'Antarctica & Mountain Glaciers', value: 25, color: '#7dd3fc', secondaryLabel: '~25% contribution' },
      ],
    },
    'clean-investment': {
      title: 'Global Clean Energy Transition Investment (2015 - 2023)',
      unit: '$ Billion',
      description: 'Capital committed to renewable power, electrified transport, grid expansion, and green hydrogen.',
      lineData: [
        { x: 2015, y: 480 },
        { x: 2017, y: 550 },
        { x: 2019, y: 640 },
        { x: 2021, y: 860 },
        { x: 2022, y: 1400 },
        { x: 2023, y: 1770 },
      ],
      lineColor: '#10b981',
      source: 'BloombergNEF (BNEF) & IEA World Energy Investment 2024',
      sourceUrl: 'https://about.bnef.com/energy-transition-investment-trends/',
      coverage: 'Global financial commitments across 140 countries',
      lastRetrieved: '2024-02-15',
      pubDate: 'February 2024',
      limitations: 'Excludes preliminary pre-FID (final investment decision) corporate announcements.',
      comparisons: [
        { label: 'China Clean Investment (2023)', value: 676, color: '#ef4444', secondaryLabel: '38% of global total' },
        { label: 'European Union (2023)', value: 341, color: '#10b981' },
        { label: 'United States (2023)', value: 303, color: '#3b82f6' },
        { label: 'India (2023)', value: 56, color: '#f59e0b', secondaryLabel: '+35% YoY expansion' },
      ],
    },
  };

  const activeData = indicatorDetails[selectedIndicator] || indicatorDetails.temp;

  const downloadCSV = () => {
    const csvRows = ['Year,Value,Unit'];
    activeData.lineData.forEach((row: any) => {
      csvRows.push(`${row.x},${row.y},${activeData.unit}`);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedIndicator}_climate_data.csv`;
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
            <span>Section 3 • Global Empirical Statistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Authoritative Earth & Clean Energy Datasets
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Filter multi-decadal observations, inspect methodological boundaries, and export verified records from NASA, NOAA, UNEP, IEA, and IRENA.
          </p>
        </div>

        <button
          onClick={downloadCSV}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors self-start sm:self-auto cursor-pointer"
          title="Download the currently selected indicator dataset as a standard CSV file"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Dataset (CSV)</span>
        </button>
      </div>

      {/* Indicator Selection Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Select Indicator to Inspect:
        </label>
        <div className="flex flex-wrap gap-2">
          {indicatorOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedIndicator(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedIndicator === opt.id
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts: Line Chart + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Historical Trend Line Chart */}
        <div className="lg:col-span-7">
          <SvgLineChart
            data={activeData.lineData}
            title={activeData.title}
            unit={activeData.unit}
            color={activeData.lineColor}
            baseline={activeData.baseline}
            source={activeData.source}
            sourceUrl={activeData.sourceUrl}
            lastUpdated={activeData.lastRetrieved}
            description={activeData.description}
          />
        </div>

        {/* Right: Comparative Breakdown Bar Chart */}
        <div className="lg:col-span-5">
          <SvgBarChart
            data={activeData.comparisons}
            title="Geographic & Regional Comparisons"
            unit={activeData.unit}
            source={activeData.source}
            sourceUrl={activeData.sourceUrl}
            lastUpdated={activeData.lastRetrieved}
            description="Comparing key countries, regions, and baseline thresholds using verified reporting standards."
          />
        </div>
      </div>

      {/* Deep Scientific Metadata & Uncertainty Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Scientific Metadata, Provenance & Methodological Limitations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Source</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{activeData.source}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Geographic Coverage</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{activeData.coverage}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Publication / Retrieval</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{activeData.pubDate} (Retrieved {activeData.lastRetrieved})</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Direct Verification</span>
            <a
              href={activeData.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:underline mt-0.5"
            >
              <span>Visit Official Registry</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Uncertainty Notes */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Methodological Boundary Note:</strong> {activeData.limitations}
          </div>
        </div>
      </div>
    </div>
  );
};
