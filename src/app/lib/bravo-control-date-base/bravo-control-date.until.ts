import { BravoMoment } from "@bravo-infra/core/utils/dates";
import { CompatibleDate, DateMode } from "./bravo-control-date.type";

export function offset(mode: DateMode, date: BravoMoment, step: number) {
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