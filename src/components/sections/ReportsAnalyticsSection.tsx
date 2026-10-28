import React, { useState } from 'react';
import { HEADLINE_INDICATORS } from '../../data/climateData';
import { ReportConfig } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  Building, 
  AlertCircle,
  CheckCircle,
  Copy,
  Layers
} from 'lucide-react';

export const ReportsAnalyticsSection: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('global');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Annual 2023-2024');
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate structured report configuration based on selection
  const reportData: Record<string, ReportConfig> = {
    global: {
      reportType: 'global',
      title: 'Global Climate & Earth System State Report',
      reportingPeriod: selectedPeriod,
      geographicCoverage: 'Global Terrestrial & Oceanic Biosphere',
      executiveSummary: 'Atmospheric carbon dioxide concentrations reached 423.5 ppm at Mauna Loa in 2024, representing an increase of over 51% since the pre-industrial period. Global mean surface temperatures in 2023-2024 reached +1.45°C above the 1850-1900 baseline, approaching the 1.5°C Paris Agreement guardrail. Meanwhile, global clean energy capacity expanded by a record 500+ GW, bringing total non-fossil capacity to 3,870 GW.',
      keyIndicators: [
        { name: 'Surface Temperature Anomaly', value: '+1.45°C above pre-industrial', source: 'NASA GISTEMP / WMO', status: 'VERIFIED OBSERVATION' },
        { name: 'Atmospheric CO₂ Concentration', value: '423.5 ppm', source: 'NOAA Mauna Loa', status: 'VERIFIED OBSERVATION' },
        { name: 'Global GHG Emissions', value: '57.4 Gt CO₂e / year', source: 'UNEP Emissions Gap', status: 'ESTIMATE' },
        { name: 'Renewable Installed Capacity', value: '3,870 GW', source: 'IRENA Statistics', status: 'VERIFIED OBSERVATION' },
        { name: 'Renewable Electricity Share', value: '30.3% of global generation', source: 'Ember Global Electricity', status: 'VERIFIED OBSERVATION' },
      ],
      historicalHighlights: [
        '1960: Atmospheric CO₂ recorded at 316.9 ppm (Keeling curve inception).',
        '1992: UNFCCC Rio Earth Summit establishes international climate architecture.',
        '2015: Paris Agreement signed, legally establishing 1.5°C and 2.0°C limits.',
        '2023: Global temperatures exceed +1.4°C for the first recorded annual multi-station average.',
      ],
      keyAchievements: [
        'Renewable electricity surpassed 30% of global electrical supply for the first time in modern industrial history.',
        'Solar photovoltaic costs have declined by 89% since 2010, making clean solar the cheapest bulk electricity.',
        'Deforestation in the Brazilian Amazon dropped by over 22% in 2023 following renewed law enforcement.',
      ],
      areasForImprovement: [
        'Global fossil fuel subsidies still exceed $1.3 trillion annually, distorting transition economics.',
        'Primary tropical rainforest loss remains elevated at 3.7 million hectares per year.',
        'Methane leaks from oil, gas, and coal mining infrastructure remain largely unmitigated.',
      ],
      dataGapsAndUncertainty: [
        'Land-use and agricultural methane fluxes carry an uncertainty band of ±25-30% due to heterogenous soil microbiology.',
        'Antarctic ice mass discharge rates require deeper sub-ice shelf oceanic bathymetry radar.',
      ],
      recommendations: [
        'Triple global renewable power capacity to 11,000 GW by 2030 in accordance with COP28 consensus.',
        'Double annual global rate of energy intensity improvement from 2% to 4% per year.',
        'Mandate satellite-monitored zero-methane leakage standards for fossil and gas pipelines.',
      ],
      methodology: 'Data compiled from peer-reviewed physical observations published by NASA GISS, NOAA ESRL, WMO, and UNEP. Conversion factors follow IPCC Sixth Assessment Report (AR6) 100-year Global Warming Potentials.',
      citations: [
        { name: 'IPCC Sixth Assessment Report', url: 'https://www.ipcc.ch/' },
        { name: 'WMO State of the Global Climate', url: 'https://wmo.int/' },
        { name: 'NASA GISTEMP Temperature Analysis', url: 'https://climate.nasa.gov/' },
        { name: 'Ember Global Electricity Review 2024', url: 'https://ember-climate.org/' },
      ],
      retrievalDate: '2024-05-15',
      generationDate: new Date().toLocaleDateString(),
    },
    india: {
      reportType: 'india',
      title: 'India Climate Action & Clean Energy Progress Report',
      reportingPeriod: selectedPeriod,
      geographicCoverage: 'Republic of India (All States & UTs)',
      executiveSummary: 'India has achieved a historic milestone by installing over 200 GW of non-fossil electric generation capacity, fulfilling its original COP21 Paris NDC target (40% non-fossil capacity) eight years ahead of the 2030 deadline. Emissions intensity of GDP has decreased by 33% from 2005 levels. To reach the enhanced 500 GW non-fossil target by 2030, accelerated deployment of battery storage (BESS) and pumped hydro (PSP) is vital.',
      keyIndicators: [
        { name: 'Total Electric Installed Capacity', value: '444.8 GW', source: 'CEA Ministry of Power', status: 'VERIFIED OBSERVATION' },
        { name: 'Non-Fossil Installed Capacity', value: '203.4 GW (45.8% of total)', source: 'CEA Executive Summary', status: 'VERIFIED OBSERVATION' },
        { name: 'Installed Solar PV Capacity', value: '85.5 GW', source: 'MNRE National Portal', status: 'VERIFIED OBSERVATION' },
        { name: 'Installed Wind Capacity', value: '46.8 GW', source: 'NIWE / MNRE', status: 'VERIFIED OBSERVATION' },
        { name: 'Per Capita CO₂ Emissions', value: '1.95 tonnes / person / year', source: 'Global Carbon Project', status: 'VERIFIED OBSERVATION' },
      ],
      historicalHighlights: [
        '2010: Launch of Jawaharlal Nehru National Solar Mission (initial target: 20 GW by 2022).',
        '2015: India scales solar target to 100 GW and co-founds International Solar Alliance (ISA).',
        '2021: Panchamrit commitments announced at COP26 Glasgow including 2070 Net-Zero.',
        '2024: Non-fossil capacity exceeds 200 GW; launch of PM Surya Ghar (10 million solar rooftops).',
      ],
      keyAchievements: [
        'Non-fossil capacity reached 45.8%, putting India on course for the 50% target by 2030.',
        'Over 360 million LED bulbs distributed under UJALA scheme, avoiding 40+ million tonnes CO₂ annually.',
        'Indian Railways on track for full net-zero electrification of its broad-gauge network.',
      ],
      areasForImprovement: [
        'Coal thermal generation continues to supply ~70% of electrical energy due to low RE storage pairing.',
        'DISCOM financial stress delays subsidy disbursement and net-metering approvals in select states.',
        'Agricultural crop stubble burning in northwestern plains creates seasonal winter air pollution crises.',
      ],
      dataGapsAndUncertainty: [
        'Off-grid rooftop and rural agricultural solar pumps under PM KUSUM require automated IoT telemetry.',
        'Soil carbon sequestration in semi-arid agrarian watersheds requires standardized field sampling.',
      ],
      recommendations: [
        'Expedite 47 GW / 236 GWh of battery energy storage and pumped hydro tenders to manage evening peak load.',
        'Streamline single-window digital net-metering connections under PM Surya Ghar: Muft Bijli Yojana.',
        'Scale Green Hydrogen consumption mandates for domestic petroleum refineries and fertilizer plants.',
      ],
      methodology: 'Data compiled from monthly executive reports published by the Central Electricity Authority (CEA), Ministry of New and Renewable Energy (MNRE), and Ministry of Power, Government of India.',
      citations: [
        { name: 'Central Electricity Authority (CEA)', url: 'https://cea.nic.in/' },
        { name: 'Ministry of New and Renewable Energy', url: 'https://mnre.gov.in/' },
        { name: 'Press Information Bureau (PIB)', url: 'https://pib.gov.in/' },
      ],
      retrievalDate: '2024-04-30',
      generationDate: new Date().toLocaleDateString(),
    },
    tamilnadu: {
      reportType: 'tamilnadu',
      title: 'Tamil Nadu Clean Energy & Ecological Sustainability Report',
      reportingPeriod: selectedPeriod,
      geographicCoverage: 'State of Tamil Nadu (38 Districts)',
      executiveSummary: 'Tamil Nadu continues to serve as India’s leading renewable energy benchmark, boasting over 10,550 MW of wind power and 8,320 MW of solar power. The state established the Tamil Nadu Green Climate Company (TNGCC) to execute climate missions across wetlands, green tree cover, and carbon neutrality by 2050.',
      keyIndicators: [
        { name: 'Total Installed Wind Power', value: '10,550+ MW (22.5% of All-India)', source: 'TEDA / NIWE', status: 'VERIFIED OBSERVATION' },
        { name: 'Total Installed Solar PV', value: '8,320+ MW', source: 'TEDA Portal', status: 'VERIFIED OBSERVATION' },
        { name: 'Peak Renewable Supply Share', value: '52% - 58% of state demand', source: 'TANGEDCO Dispatch', status: 'VERIFIED OBSERVATION' },
        { name: 'Green TN Mission Target', value: '2.8 Billion trees over 10 yrs', source: 'TNGCC Forest Dept', status: 'PROJECTION' },
      ],
      historicalHighlights: [
        '1986: Installation of India’s first modern wind turbines in Mulligoor and Kayathar.',
        '2016: Commissioning of the 648 MW Kamuthi Solar Park in Ramanathapuram.',
        '2021: Notification of Tamil Nadu Climate Change Mission and founding of TNGCC.',
        '2023: Initiation of offshore wind LiDAR resource assessment off Tuticorin coast.',
      ],
      keyAchievements: [
        'Highest installed wind energy capacity among all Indian states for over two decades.',
        'Pioneering urban wetland restoration at Pallikaranai marshland and Muthupet mangroves.',
        'Zero Liquid Discharge (ZLD) mandate enforced across Tiruppur textile dying clusters.',
      ],
      areasForImprovement: [
        'Aging low-capacity wind turbines (sub-500 kW) in Muppandal require repowering with modern 3MW+ turbines.',
        'Coastal aquifers in Chennai and Nagapattinam show saltwater intrusion during drought months.',
      ],
      dataGapsAndUncertainty: [
        'District-level rooftop solar generation logs outside Chennai/Coimbatore require integration with smart meters.',
      ],
      recommendations: [
        'Formulate a dedicated Wind Turbine Repowering Policy with TANGEDCO transmission evacuation upgrades.',
        'Accelerate the 500 MW Kundah Pumped Storage Hydro Project in the Nilgiris to absorb surplus wind power.',
      ],
      methodology: 'Datasets obtained from TEDA, TANGEDCO official load dispatch bulletins, and TNGCC annual state missions.',
      citations: [
        { name: 'Tamil Nadu Green Climate Company', url: 'https://www.tngreencompany.com/' },
        { name: 'Tamil Nadu Energy Development Agency (TEDA)', url: 'https://teda.in/' },
      ],
      retrievalDate: '2024-04-15',
      generationDate: new Date().toLocaleDateString(),
    },
  };

  const currentReport = reportData[selectedReportType] || reportData.global;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `${currentReport.title}
Period: ${currentReport.reportingPeriod}
Coverage: ${currentReport.geographicCoverage}
Date Generated: ${currentReport.generationDate}

EXECUTIVE SUMMARY:
${currentReport.executiveSummary}

KEY INDICATORS:
${currentReport.keyIndicators.map((k) => `- ${k.name}: ${k.value} [${k.status}] (Source: ${k.source})`).join('\n')}

KEY ACHIEVEMENTS:
${currentReport.keyAchievements.map((a) => `- ${a}`).join('\n')}

AREAS FOR IMPROVEMENT:
${currentReport.areasForImprovement.map((i) => `- ${i}`).join('\n')}

RECOMMENDED ACTIONS:
${currentReport.recommendations.map((r) => `- ${r}`).join('\n')}

METHODOLOGY:
${currentReport.methodology}

CITATIONS:
${currentReport.citations.map((c) => `- ${c.name}: ${c.url}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Section 12 • Standardized Reporting Centre</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Climate Reports & Analytics Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Generate formal 15-point environmental performance reports for global benchmarks, national progress, and regional sustainability. Formatted for printing, PDF archiving, or clipboard export.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save to PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selection Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Report Type:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'global', label: 'Global Climate Report' },
              { id: 'india', label: 'India Climate Progress' },
              { id: 'tamilnadu', label: 'Tamil Nadu Sustainability' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedReportType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedReportType === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Reporting Cycle:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="Annual 2023-2024">Annual Benchmark 2023-2024</option>
            <option value="Five-Year Review (2019-2024)">Five-Year Review (2019-2024)</option>
            <option value="Decadal Climate Review">Decadal Review</option>
          </select>
        </div>
      </div>

      {/* Formal Structured Report Document (Print-friendly layout) */}
      <div className="print-page bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 space-y-8 shadow-sm">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 dark:border-white pb-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>OFFICIAL ENVIRONMENTAL INTELLIGENCE DISCLOSURE</span>
            <span>Generated: {currentReport.generationDate}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {currentReport.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
            <span>Period: {currentReport.reportingPeriod}</span>
            <span>•</span>
            <span>Coverage: {currentReport.geographicCoverage}</span>
            <span>•</span>
            <span>Data Retrieval: {currentReport.retrievalDate}</span>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            1. Executive Summary
          </h3>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
            {currentReport.executiveSummary}
          </p>
        </div>

        {/* Section 2: Key Indicators Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            2. Verified Key Indicators & Metrics
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-800">Indicator</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-800">Verified Observation</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-800">Official Data Source</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-800">Data Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentReport.keyIndicators.map((ind, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{ind.name}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">{ind.value}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{ind.source}</td>
                    <td className="p-3">
                      <StatusBadge status={ind.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Historical Highlights */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            3. Historical Context & Trajectory Milestones
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {currentReport.historicalHighlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Key Achievements vs Areas for Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
              4. Key Achievements & Milestones
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {currentReport.keyAchievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
              5. Areas Requiring Accelerated Action
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {currentReport.areasForImprovement.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 5: Data Gaps & Uncertainty */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
          <strong className="text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            6. Scientific Data Gaps & Measurement Uncertainty:
          </strong>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            {currentReport.dataGapsAndUncertainty.map((gap, idx) => (
              <li key={idx}>• {gap}</li>
            ))}
          </ul>
        </div>

        {/* Section 6: Recommendations */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            7. Recommended Policy & Strategic Interventions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {currentReport.recommendations.map((rec, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-[11px] block mb-1">
                  Action 0{idx + 1}
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Methodology & Source Citations */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-500">
          <div>
            <strong className="text-slate-800 dark:text-slate-200">8. Methodology & Accounting Framework:</strong>
            <p className="mt-0.5 leading-relaxed">{currentReport.methodology}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Primary References:</span>
            {currentReport.citations.map((c, idx) => (
              <a
                key={idx}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <span>{c.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
