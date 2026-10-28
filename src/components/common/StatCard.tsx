import React, { useState } from 'react';
import { StatIndicator } from '../../types';
import { StatusBadge } from './StatusBadge';
import { ArrowUpRight, ArrowDownRight, ExternalLink, Info, Calendar, ShieldCheck } from 'lucide-react';

interface Props {
  indicator: StatIndicator;
}

export const StatCard: React.FC<Props> = ({ indicator }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Direction color and symbol
  const isUp = indicator.changeDirection.startsWith('up');
  const isGood = indicator.changeDirection.endsWith('good');

  let badgeColor = 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300';
  if (indicator.changeDirection === 'up-bad' || indicator.changeDirection === 'down-bad') {
    badgeColor = 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60';
  } else if (indicator.changeDirection === 'up-good' || indicator.changeDirection === 'down-good') {
    badgeColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60';
  }

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <StatusBadge status={indicator.status} />
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle detailed context and uncertainty notes"
            aria-label="Toggle details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-1" title={indicator.name}>
          {indicator.name}
        </h3>

        {/* Big Value & Unit */}
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {indicator.displayValue}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {indicator.unit}
          </span>
        </div>

        {/* Period and Change Indicator */}
        <div className="mt-3 flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{indicator.observationPeriod}</span>
          </div>

          {indicator.changePercent !== undefined && (
            <div className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-medium text-xs ${badgeColor}`}>
              {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>{Math.abs(indicator.changePercent)}%</span>
              <span className="text-[10px] opacity-80 ml-0.5">
                {indicator.displayPrevious ? `vs ${indicator.displayPrevious}` : 'vs prior period'}
              </span>
            </div>
          )}
        </div>

        {/* Short Explanation */}
        <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {indicator.explanation}
        </p>

        {/* Collapsible Deep Notes */}
        {showDetails && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5">
            <div className="flex items-start gap-1 text-slate-700 dark:text-slate-200 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Scientific Rigor & Methodology:</span>
            </div>
            {indicator.uncertaintyNotes ? (
              <p>{indicator.uncertaintyNotes}</p>
            ) : (
              <p>Standard reporting framework as published by {indicator.sourceName}.</p>
            )}
            <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
              Dataset Last Updated: <span className="font-medium text-slate-700 dark:text-slate-200">{indicator.lastUpdated}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Source & Link */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="truncate pr-2 font-medium">
          Source: {indicator.sourceName}
        </span>
        <a
          href={indicator.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold shrink-0 group-hover:underline"
          title={`Open ${indicator.sourceName} verified dataset in new tab`}
        >
          <span>Verify</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
