import React from 'react';
import { DataStatus } from '../../types';
import { CheckCircle2, Calculator, TrendingUp, UserCheck, AlertTriangle } from 'lucide-react';

interface Props {
  status: DataStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<Props> = ({ status, size = 'sm' }) => {
  const isSm = size === 'sm';
  const sizeClasses = isSm ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  switch (status) {
    case 'VERIFIED OBSERVATION':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80 ${sizeClasses}`}
          title="Direct empirical scientific measurement from verified monitoring networks"
        >
          <CheckCircle2 className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          VERIFIED OBSERVATION
        </span>
      );
    case 'ESTIMATE':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 ${sizeClasses}`}
          title="Derived from verified statistical modeling or economic proxy indices"
        >
          <Calculator className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          ESTIMATE
        </span>
      );
    case 'PROJECTION':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800/80 ${sizeClasses}`}
          title="Modeled future scenario or policy commitment target"
        >
          <TrendingUp className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          PROJECTION
        </span>
      );
    case 'USER-REPORTED':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800/80 ${sizeClasses}`}
          title="Self-reported environmental action or campus audit"
        >
          <UserCheck className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          USER-REPORTED
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 ${sizeClasses}`}
        >
          <AlertTriangle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          {status}
        </span>
      );
  }
};
