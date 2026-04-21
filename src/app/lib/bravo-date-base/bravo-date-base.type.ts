import { BravoMoment } from "@bravo-infra/core/utils/dates";


export enum EViewPicker {
  PICKER_DATE = 1,
  PICKER_MONTH,
  PICKER_YEAR
}

export type DateSingleValue = Date | null;

export type DateRangeValue = {
  start: DateSingleValue,
  end: DateSingleValue,
}

export type DateValue = DateSingleValue | DateRangeValue;

export type RangePartType = 'start' | 'end';

export type DateMode = 'date' | 'month' | 'year'

export interface PanelState {
  mode: DateMode;
  date: BravoMoment;
}

export type SingleDate = BravoMoment | null;

export type RangeDate = [SingleDate, SingleDate];

export type CompatibleDate = SingleDate | RangeDate;
