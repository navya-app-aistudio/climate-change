import React, { useState } from 'react';
import { ExternalLink, HelpCircle } from 'lucide-react';

interface LineChartProps {
  data: { x: number | string; y: number; label?: string }[];
  title: string;
  unit: string;
  color?: string;
  baseline?: number;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  description: string;
}

export const SvgLineChart: React.FC<LineChartProps> = ({
  data,
  title,
  unit,
  color = '#10b981',
  baseline,
  source,
  sourceUrl,
  lastUpdated,
  description,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-slate-400">No chart data available</div>;
  }

  const padding = { top: 25, right: 30, bottom: 35, left: 50 };
  const width = 600;
  const height = 260;

  const yValues = data.map((d) => d.y);
  let minY = Math.min(...yValues);
  let maxY = Math.max(...yValues);

  if (baseline !== undefined) {
    minY = Math.min(minY, baseline);
    maxY = Math.max(maxY, baseline);
  }

  // Add 10% breathing room
  const yRange = maxY - minY || 1;
  const yMinPadded = minY - yRange * 0.08;
  const yMaxPadded = maxY + yRange * 0.08;

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (val: number) =>
    padding.top + chartHeight - ((val - yMinPadded) / (yMaxPadded - yMinPadded)) * chartHeight;

  // Generate SVG path points
  const points = data.map((d, i) => `${getX(i)},${getY(d.y)}`).join(' ');

  // Area path for gradient fill
  const areaPath = `M ${getX(0)},${getY(dMin())} L ${points} L ${getX(data.length - 1)},${getY(dMin())} Z`;

  function dMin() {
    return yMinPadded;
  }

  // Y-axis tick values (4 steps)
  const yTicks = [
    yMinPadded,
    yMinPadded + (yMaxPadded - yMinPadded) * 0.33,
    yMinPadded + (yMaxPadded - yMinPadded) * 0.66,
    yMaxPadded,
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
          Unit: {unit}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y axis ticks */}
          {yTicks.map((tick, i) => {
            const y = getY(tick);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  {tick > 100 ? Math.round(tick) : tick.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Optional Baseline */}
          {baseline !== undefined && (
            <line
              x1={padding.left}
              y1={getY(baseline)}
              x2={width - padding.right}
              y2={getY(baseline)}
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
          )}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#grad-${title.replace(/\s+/g, '')})`} />

          {/* Main Line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.y);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i} className="cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 3.5}
                  fill={isHovered ? '#fff' : color}
                  stroke={color}
                  strokeWidth="2"
                  className="transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {/* X Axis Labels for key years */}
                {(i === 0 || i === data.length - 1 || i % Math.ceil(data.length / 5) === 0) && (
                  <text
                    x={cx}
                    y={height - padding.bottom + 18}
                    textAnchor="middle"
                    className="text-[11px] fill-slate-500 font-medium font-mono"
                  >
                    {d.x}
                  </text>
                )}
              </g>
            );
          })}

          {/* Hover Tooltip inside SVG */}
          {hoveredIndex !== null && (
            <g transform={`translate(${getX(hoveredIndex)},${getY(data[hoveredIndex].y) - 12})`}>
              <rect
                x="-45"
                y="-32"
                width="90"
                height="28"
                rx="6"
                className="fill-slate-900/95 dark:fill-slate-100/95 shadow-md"
              />
              <text
                x="0"
                y="-14"
                textAnchor="middle"
                className="text-[10px] font-semibold fill-white dark:fill-slate-900"
              >
                {data[hoveredIndex].x}: {data[hoveredIndex].y} {unit}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="truncate pr-2">
          Source: <strong className="text-slate-700 dark:text-slate-300">{source}</strong> ({lastUpdated})
        </span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-medium shrink-0"
        >
          <span>Dataset link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

interface BarChartProps {
  data: { label: string; value: number; color?: string; secondaryLabel?: string }[];
  title: string;
  unit: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  description: string;
}

export const SvgBarChart: React.FC<BarChartProps> = ({
  data,
  title,
  unit,
  source,
  sourceUrl,
  lastUpdated,
  description,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
          Unit: {unit}
        </div>
      </div>

      <div className="space-y-3 my-2">
        {data.map((item, idx) => {
          const percent = (item.value / maxValue) * 100;
          const barColor = item.color || '#10b981';

          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between text-xs mb-1 font-medium">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.label}</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold">
                  {item.value.toLocaleString()} {unit}
                  {item.secondaryLabel && (
                    <span className="text-slate-400 text-[11px] font-normal ml-1.5">({item.secondaryLabel})</span>
                  )}
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="truncate pr-2">
          Source: <strong className="text-slate-700 dark:text-slate-300">{source}</strong> ({lastUpdated})
        </span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-medium shrink-0"
        >
          <span>Dataset link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
