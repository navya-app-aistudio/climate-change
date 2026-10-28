import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // AI Climate Assistant Endpoint
  app.post('/api/ai-chat', async (req: Request, res: Response) => {
    try {
      const { message, history, context } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (ai) {
        const systemInstruction = `You are the Expert AI Climate and Renewable Energy Assistant for "Climate Action & Sustainable Energy - Our Planet, Our Responsibility".
Your role is to educate, provide precise empirical context, explain clean energy solutions, and empower climate action for students, teachers, households, and professionals.

Guidelines:
1. Always base your answers on authoritative scientific sources (IPCC AR6, WMO, NASA GISTEMP, NOAA, IEA, IRENA, Ember, India MNRE, CEA, MoEFCC, Tamil Nadu Green Climate Company).
2. Clearly distinguish between:
   - VERIFIED OBSERVATION (e.g., CO2 concentration reached ~423 ppm at Mauna Loa; global surface temperature anomaly is ~1.28°C-1.45°C above pre-industrial levels; India's non-fossil installed capacity has surpassed 200 GW in 2024-2025).
   - ESTIMATES (e.g., lifecycle emissions of solar PV ~40-48 g CO2eq/kWh vs coal ~820-1050 g CO2eq/kWh).
   - PROJECTIONS (e.g., net-zero target dates like India 2070, Tamil Nadu 2050 target goals, 1.5°C threshold timelines).
3. Distinguish between Installed Capacity (GW - peak theoretical capability) vs Actual Electricity Generated (TWh - actual energy produced over time accounting for capacity utilization factor / CUF).
4. Provide structured, readable answers with bold headings, clear bullet points, and an explicit "**Evidence & Sources**" block at the end citing official agencies.
5. If a calculation is requested (e.g., solar savings, footprint reduction), show transparent formulas and unit assumptions.
6. Tone: inspiring, objective, scientifically rigorous, accessible, and solution-focused. Avoid alarmism without solutions.`;

        const contents = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.content }],
            });
          }
        }
        
        let promptText = message;
        if (context) {
          promptText = `[User Context / Active Section: ${context}]\n\nUser Question: ${message}`;
        }

        contents.push({
          role: 'user',
          parts: [{ text: promptText }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const reply = response.text || 'No response generated from the model.';
        return res.json({ reply, source: 'gemini-3.8-flash' });
      } else {
        // Fallback intelligent responder based on verified climate knowledge
        const reply = generateVerifiedClimateFallback(message, context);
        return res.json({ reply, source: 'verified-knowledge-base' });
      }
    } catch (err: unknown) {
      console.error('Error handling AI chat request:', err);
      const fallbackReply = generateVerifiedClimateFallback(req.body?.message || '', req.body?.context);
      return res.json({
        reply: fallbackReply,
        source: 'verified-knowledge-base-fallback',
        notice: 'Generated via verified offline climate knowledge base.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Climate Action app running at http://localhost:${PORT}`);
  });
}

function generateVerifiedClimateFallback(query: string, context?: string): string {
  const q = query.toLowerCase();

  if (q.includes('carbon footprint') || q.includes('reduce') || q.includes('lifestyle')) {
    return `### How to Effectively Reduce Your Personal Carbon Footprint

To achieve meaningful reductions, focus on high-impact sectors categorized by the IPCC:

1. **Electricity & Home Energy (Typically 30-45% of urban household emissions):**
   - Shift to BEE 5-Star inverter appliances and 100% LED lighting.
   - Install rooftop solar (under schemes like **PM Surya Ghar: Muft Bijli Yojana** in India, offering up to ₹78,000 subsidy for 3 kW systems).
   - Set air conditioners to 24°C-26°C (every 1°C increase saves ~6% electricity).

2. **Mobility & Transportation (Typically 25-35%):**
   - Prioritize electrified public transport (metro, suburban rail, electric buses).
   - For two-wheelers, transition to EV models powered by increasingly green grids.
   - Eliminate unnecessary short private vehicle trips by walking or cycling.

3. **Dietary & Consumption Patterns (Typically 15-25%):**
   - Reduce food waste: Food decomposing in landfills produces methane ($CH_4$), a greenhouse gas 28x more potent than $CO_2$ over 100 years.
   - Adopt a plant-forward diet rich in seasonal, locally produced grains and legumes.

**Evidence & Sources:**
- IPCC Sixth Assessment Report (AR6) Working Group III: Mitigation of Climate Change (2022).
- Bureau of Energy Efficiency (BEE), Ministry of Power, Government of India.
- Global Carbon Project (2023/2024 Report).`;
  }

  if (q.includes('solar') || q.includes('rooftop') || q.includes('photovoltaic')) {
    return `### Rooftop & Utility-Scale Solar Energy: Viability and Insights

**How Solar PV Works:**
Solar photovoltaic (PV) cells convert photons from sunlight directly into direct-current (DC) electricity via semiconductor materials (primarily monocrystalline silicon). An inverter then converts DC into grid-compatible alternating current (AC).

**Key Metrics for India & Tamil Nadu:**
- **Solar Irradiance:** Most regions receive 4.5 to 6.5 kWh/$m^2$/day with 300+ clear sunny days annually.
- **Generation Rule of Thumb:** A 1 kWp rooftop system produces roughly **4 to 4.5 kWh (units) of electricity per day**, or **1,400 to 1,600 kWh per year**, requiring ~80-100 sq.ft of shadow-free rooftop area.
- **Payback Period:** Typically 3.5 to 5 years depending on regional consumer electricity tariffs and net-metering policies.
- **Lifecycle Emissions:** ~40-48 g $CO_2$eq/kWh (vs ~820-950 g $CO_2$eq/kWh for coal-fired thermal power).

**Government Initiatives:**
- **PM Surya Ghar: Muft Bijli Yojana:** Targets 10 million households across India with substantial central financial assistance.

**Evidence & Sources:**
- Ministry of New and Renewable Energy (MNRE), Annual Report & National Solar Mission.
- National Renewable Energy Laboratory (NREL) Solar PV Lifecycle Assessments.
- TANGEDCO / Tamil Nadu Energy Development Agency (TEDA).`;
  }

  if (q.includes('india') || q.includes('progress') || q.includes('target')) {
    return `### India's Climate Commitments and Clean Energy Progress

India is pursuing one of the world's most ambitious clean energy transitions under its updated Nationally Determined Contributions (NDCs):

**Key National Milestones (CEA & MNRE Verified Datasets):**
1. **Total Installed Capacity:** Over 440 GW total installed generation capacity.
2. **Non-Fossil Capacity:** Exceeded **200 GW** (approx. 45% of total capacity), surpassing the initial COP21 Paris target of 40% non-fossil capacity 8 years ahead of the 2030 deadline!
3. **2030 Targets:**
   - 500 GW of non-fossil electricity capacity.
   - 50% cumulative electric power installed capacity from non-fossil fuel-based energy resources.
   - Reducing emissions intensity of GDP by 45% by 2030 compared to 2005 levels.
4. **Long-Term Target:** Achieving Net-Zero greenhouse gas emissions by **2070**.

**Important Distinction:**
- *Installed Capacity* (GW) is the peak potential output.
- *Electricity Generated* (TWh) reflects actual power fed into the grid. Coal still accounts for ~70% of generation due to higher capacity factors, underscoring the urgent need for battery storage (BESS) and pumped storage projects (PSP).

**Evidence & Sources:**
- Central Electricity Authority (CEA) Monthly Executive Summaries (2024/2025).
- Ministry of New and Renewable Energy (MNRE), Govt of India.
- UNFCCC NDC Registry.`;
  }

  if (q.includes('tamil nadu') || q.includes('wind') || q.includes('tangedco')) {
    return `### Tamil Nadu Sustainability and Clean Energy Leadership

Tamil Nadu is a pioneer in renewable energy in India, recognized globally for wind and solar integration:

1. **Wind Power Capital:**
   - Tamil Nadu houses over **10.5+ GW of installed wind energy capacity**, centered around the high-velocity passes of Muppandal, Kayathar, and Palghat.
   - Wind generation contributes heavily during the southwest and northeast monsoon seasons (May to October).

2. **Solar Capacity:**
   - Exceeds **8 GW of installed solar power**, with extensive installations in Kamuthi, Virudhunagar, and rooftop clusters in Chennai and Coimbatore.

3. **Policy Frameworks:**
   - **Tamil Nadu Green Climate Company (TNGCC):** Special purpose vehicle implementing the Tamil Nadu Climate Change Mission, Green Tamil Nadu Mission (planting 2.8 billion trees over 10 years), and Tamil Nadu Wetlands Mission.
   - Target: State Net-Zero ahead of national timelines, targeting 2050.

**Evidence & Sources:**
- Tamil Nadu Green Climate Company (TNGCC) Annual Reports.
- TANGEDCO (Tamil Nadu Generation and Distribution Corporation).
- CEA All-India Installed Capacity Reports.`;
  }

  return `### Climate Action & Clean Energy Overview

Climate change is driven by the enhanced greenhouse effect. When fossil fuels (coal, oil, and natural gas) are combusted for energy, transportation, and industry, they release vast amounts of carbon dioxide ($CO_2$), methane ($CH_4$), and nitrous oxide ($N_2O$).

**Key Global Statistics:**
- **Atmospheric $CO_2$ Concentration:** Currently ~423 ppm (parts per million), compared to pre-industrial levels of 280 ppm (an increase of over 50%).
- **Global Temperature Rise:** 2023-2024 observed global average temperatures reaching ~1.28°C to 1.45°C above the 1850-1900 baseline.
- **Renewable Capacity Addition:** Global additions reached record highs exceeding 500 GW in a single year, driven predominantly by solar PV and wind.

**Core Solutions:**
1. Rapid decarbonization of the power grid through solar, wind, hydro, and grid-scale storage.
2. Electrification of end uses: electric vehicles, heat pumps, and green hydrogen for heavy industry.
3. Energy conservation and demand-side management.
4. Ecological restoration, forest preservation, and soil carbon sequestration.

Feel free to ask specific questions about carbon footprint calculations, solar system sizing, India's NDCs, Tamil Nadu initiatives, or classroom climate challenges!

**Evidence & Sources:**
- IPCC Sixth Assessment Report (AR6 Synthesis, 2023).
- World Meteorological Organization (WMO) State of the Global Climate.
- NOAA Global Monitoring Laboratory.`;
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
