import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Database, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Globe, 
  Scale, 
  Info 
} from 'lucide-react';

export const DataSourcesSection: React.FC = () => {
  const sourcesList = [
    {
      category: 'Global Climate Science & Atmospheric Observations',
      items: [
        { name: 'Intergovernmental Panel on Climate Change (IPCC)', url: 'https://www.ipcc.ch/', description: 'Sixth Assessment Report (AR6) Working Groups I, II & III physical science, impacts, and mitigation.' },
        { name: 'World Meteorological Organization (WMO)', url: 'https://wmo.int/', description: 'Annual State of the Global Climate reports, greenhouse gas bulletins, and multi-agency climatological normals.' },
        { name: 'NASA Climate & Goddard Institute (GISTEMP)', url: 'https://climate.nasa.gov/', description: 'GISTEMP v4 global surface temperature anomaly records, satellite radar altimetry, and cryosphere mass loss.' },
        { name: 'NOAA Global Monitoring Laboratory (GML)', url: 'https://gml.noaa.gov/ccgg/trends/', description: 'In-situ high-precision atmospheric CO₂, methane, and nitrous oxide flask sampling at Mauna Loa Observatory.' },
        { name: 'Global Carbon Project (GCP)', url: 'https://globalcarbonproject.org/', description: 'Annual Global Carbon Budget, historical fossil CO₂ emissions, and terrestrial vegetation carbon fluxes.' },
        { name: 'United Nations Environment Programme (UNEP)', url: 'https://www.unep.org/resources/emissions-gap-report', description: 'Annual Emissions Gap Reports evaluating global mitigation pledges versus 1.5°C Paris requirements.' },
      ],
    },
    {
      category: 'Global Renewable Energy & Electricity Grids',
      items: [
        { name: 'International Renewable Energy Agency (IRENA)', url: 'https://www.irena.org/', description: 'Renewable Capacity Statistics 2024 and Renewable Power Generation Costs benchmark database.' },
        { name: 'International Energy Agency (IEA)', url: 'https://www.iea.org/', description: 'World Energy Outlook, Electricity Market Reports, and Energy Efficiency tracking.' },
        { name: 'Ember Climate', url: 'https://ember-climate.org/', description: 'Global Electricity Review 2024 tracking actual electricity generation (TWh) across 215 global economies.' },
      ],
    },
    {
      category: 'India National Ministries & Regulatory Bodies',
      items: [
        { name: 'Central Electricity Authority (CEA)', url: 'https://cea.nic.in/', description: 'Executive Summaries of Power Sector, All-India Installed Generation Capacity, and the CO₂ Baseline Database for the Indian Power Sector v19.' },
        { name: 'Ministry of New and Renewable Energy (MNRE)', url: 'https://mnre.gov.in/', description: 'National Solar Mission, PM Surya Ghar: Muft Bijli Yojana, National Green Hydrogen Mission, and PM KUSUM.' },
        { name: 'Ministry of Environment, Forest and Climate Change (MoEFCC)', url: 'https://moef.gov.in/', description: 'India Third Biennial Update Report (BUR) to the UNFCCC and Long-Term Low-Carbon Development Strategy (LT-LEDS).' },
        { name: 'India Meteorological Department (IMD)', url: 'https://mausam.imd.gov.in/', description: 'Annual Climate Statements of India, Doppler radar monsoon tracking, and regional heatwave advisories.' },
      ],
    },
    {
      category: 'Tamil Nadu State Clean Energy & Climate Missions',
      items: [
        { name: 'Tamil Nadu Green Climate Company (TNGCC)', url: 'https://www.tngreencompany.com/', description: 'Special Purpose Vehicle driving the Tamil Nadu Climate Change Mission, Green Tamil Nadu Mission, and Wetlands Mission.' },
        { name: 'Tamil Nadu Energy Development Agency (TEDA)', url: 'https://teda.in/', description: 'State renewable energy agency monitoring installed wind power parks (10,550+ MW) and solar rooftop registrations.' },
        { name: 'Tamil Nadu Generation and Distribution Corporation (TANGEDCO)', url: 'https://www.tangedco.gov.in/', description: 'State electricity grid dispatch data, wind corridor evacuation, and retail domestic slab tariffs.' },
      ],
    },
  ];

  const emissionFactors = [
    { activity: 'Grid Electricity (All-India Average)', factor: '0.716 kg CO₂ / kWh', source: 'CEA CO₂ Baseline Database v19 (Weighted Average of Grid)', notes: 'Accounts for high coal baseline (~70% of generation) offset by hydro and renewables.' },
    { activity: 'Green Renewable Tariff Electricity', factor: '0.050 kg CO₂ / kWh', source: 'NREL Solar/Wind Lifecycle Footprint', notes: 'Includes panel manufacturing and supply chain embodied emissions.' },
    { activity: 'LPG Domestic Cooking Gas', factor: '2.98 kg CO₂ / kg LPG (~42.3 kg / 14.2 kg cyl)', source: 'IPCC 2006 Guidelines for National GHG Inventories', notes: 'Direct stoichiometric oxidation of propane/butane blend.' },
    { activity: 'Petrol (Gasoline) Passenger Car', factor: '0.140 kg CO₂ / km', source: 'Bureau of Energy Efficiency (BEE) / DEFRA', notes: 'Standard compact sedan/hatchback at ~15 km/L.' },
    { activity: 'Diesel Passenger Vehicle', factor: '0.160 kg CO₂ / km', source: 'BEE / DEFRA Emission Factors', notes: 'Higher carbon density per liter of diesel fuel.' },
    { activity: 'Electric Vehicle (EV, Current Grid)', factor: '0.090 kg CO₂ / km', source: 'Derived from CEA Grid Factor & 13 kWh/100km EV efficiency', notes: 'Becomes cleaner each year as the power grid incorporates more solar and wind.' },
    { activity: 'Electric Metro / Suburban Rail', factor: '0.035 kg CO₂ / passenger-km', source: 'Delhi Metro (DMRC) / Chennai Metro Environmental Audits', notes: 'High passenger capacity creates massive per-capita efficiency.' },
    { activity: 'Domestic Aviation (Economy)', factor: '0.200 kg CO₂e / passenger-km', source: 'ICAO Carbon Calculator & DEFRA Radiative Forcing', notes: 'Includes high-altitude contrail and cirrus radiative forcing multiplier (~1.9x).' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Database className="w-3.5 h-3.5" />
          <span>Section 14 • Provenance, Standards & Integrity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Data Sources, Standards & Emission Factor Methodology
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
          Openness, rigorous provenance, and scientific precision are paramount. Every figure in this application references documented public publications from peer-reviewed scientific bodies and official ministries.
        </p>
      </div>

      {/* Verification Status Taxonomy */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Standardized Data Classification Labels</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We strictly prohibit labeling old data as live data or presenting policy projections as verified empirical facts. Every statistic is categorized:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
            <StatusBadge status="VERIFIED OBSERVATION" size="md" />
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Empirical instrument readings (thermometer networks, satellite altimeters, CEA monthly grid records, NOAA air flasks).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-2">
            <StatusBadge status="ESTIMATE" size="md" />
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Synthesized global inventories (UNEP emissions gap, agricultural methane, disaster loss estimates) with stated uncertainty bands.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 space-y-2">
            <StatusBadge status="PROJECTION" size="md" />
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Future targets, Nationally Determined Contributions (NDCs), and climate pathway model scenarios (e.g. 500 GW by 2030, Net-Zero 2070).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 space-y-2">
            <StatusBadge status="USER-REPORTED" size="md" />
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Participating eco-club self-reports, campus waste audits, and user action planner pledges, clearly distinguished from verified datasets.
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Authoritative Sources */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Comprehensive Registry of Data Sources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sourcesList.map((group, gIdx) => (
            <div
              key={gIdx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {group.category}
              </h4>

              <div className="space-y-3 text-xs">
                {group.items.map((src, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 dark:text-white font-semibold">{src.name}</strong>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-bold shrink-0"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {src.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standard Emission Factors Reference Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Standardized Emission Factors Employed in Calculations</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            All footprint and solar calculators utilize transparent coefficients referenced against regulatory registries.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Activity / Fuel</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Emission Factor & Unit</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Authoritative Source</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Technical Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {emissionFactors.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{row.activity}</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400 font-mono">{row.factor}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{row.source}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 text-[11px]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
