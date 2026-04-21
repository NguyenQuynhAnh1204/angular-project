import { BravoMoment } from "@bravo-infra/core/utils/dates";
import { CompatibleDate, DateMode } from "./bravo-control-date.type";

export function offsetDate(mode: DateMode, date: BravoMoment, step: number) {
  switch (mode) {
    case 'date':
      return date.clone().addMonths(step);

    case 'month':
      return date.clone().addYears(step);

    case 'year':
      return date.clone().addYears(step * 25);
  }
}

export function isRangeValue(pValue: CompatibleDate) {
    return Array.isArray(pValue);
}

export function formatByPattern(date: Date, format: string): string {
  if (!date) return '';

  const dd = String(date.getDate()).padStart(2, '0');
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = String(date.getFullYear());

  return format
    .replace('dd', dd)
    .replace('MM', MM)
    .replace('yyyy', yyyy);
}
