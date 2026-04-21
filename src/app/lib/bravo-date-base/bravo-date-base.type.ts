import { BravoMoment } from "@bravo-infra/core/utils/dates";

export const DATE_FORMAT_REGEX = {
  'date': /^(?:(?:31\/(?:0[13578]|1[02]))|(?:29|30)\/(?:0[13-9]|1[0-2]))\/\d{4}$|^(?:29\/02\/(?:(?:\d\d(?:0[48]|[2468][048]|[13579][26]))|(?:[02468][048]00|[13579][26]00)))$|^(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])\/\d{4}$/,
  'month': /^(0[1-9]|1[0-2])\/\d{4}$/,
  'year': /^\d{4}$/
}

export const FORMAT_DATE = {
  'date': 'dd/MM/yyyy',
  'month': 'MM/yyyy',
  'year': 'yyyy'
}

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
