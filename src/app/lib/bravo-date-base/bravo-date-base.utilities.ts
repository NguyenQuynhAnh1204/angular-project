import { BravoMoment } from "@bravo-infra/core/utils/dates";
import { CompatibleDate, DateMode, SingleDate } from "./bravo-date-base.type";

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

export function formatByPattern(pDate: Date, format: string) {
  if (!pDate) return '';

  const dd = String(pDate.getDate()).padStart(2, '0');
  const MM = String(pDate.getMonth() + 1).padStart(2, '0');
  const yyyy = String(pDate.getFullYear());

  return format
    .replace('dd', dd)
    .replace('MM', MM)
    .replace('yyyy', yyyy);
}


export function normalizeDate(pDate: SingleDate) {
  if (!pDate) return null;
  return new Date(
    pDate.getFullYear(),
    pDate.getMonth(),
    pDate.getDate()
  );
}