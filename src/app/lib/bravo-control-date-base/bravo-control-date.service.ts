import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { CompatibleDate, DateMode, PanelState, RangeDate, RangePartType } from './bravo-control-date.type';
import { offsetDate } from './bravo-control-date.until';
@Injectable()
export class BravoDateService {
  private _isRange!: boolean;
  public get isRange() {
    return this._isRange;
  }
  public set isRange(pVal) {
    this._isRange = pVal;
  }

  private _mode: DateMode = 'date';
  public get mode() {
    return this._mode;
  }
  public set mode(pMode) {
    this._mode = pMode;
  }

  // flag open picker
  private _isOpenDatePicker$ = new BehaviorSubject<boolean>(false);
  public readonly isOpenDatePickerChange$ = this._isOpenDatePicker$.asObservable();
  public get isOpenDatePicker() {
    return this._isOpenDatePicker$.value;
  }
  public set isOpenDatePicker(pStatus) {
    if(this.isOpenDatePicker == pStatus) return; 
    this._isOpenDatePicker$.next(pStatus);
  }

  private _inputActive$ = new BehaviorSubject<RangePartType>('start');
  readonly inputActiveChange$ = this._inputActive$.asObservable();
  public get inputActive() {
    return this._inputActive$.value;
  }
  public set inputActive(pValue) {
    this._inputActive$.next(pValue);
  }

  private _panels$ = new BehaviorSubject<{start: PanelState;end: PanelState;}>({
      start: {mode: this.mode,date: new BravoMoment()},
      end: {mode: this.mode, date: new BravoMoment().addMonths(1)}
  });
  public readonly panelsChange$ = this._panels$.asObservable();
  public get panels() {
    return this._panels$.value;
  }
  public set panels(pValue) {
    this._panels$.next(pValue);
  }

  private _value$ = new BehaviorSubject<CompatibleDate>(null);
  public readonly valueChange$ = this._value$.asObservable();
  public get value() {
    return this._value$.value;
  }
  public set value(pDate) {
    this._value$.next(pDate)
  }

  private _hoverDate$ = new BehaviorSubject<BravoMoment | null>(null);
  public readonly hoverDateChange$ = this._hoverDate$.asObservable();
  public get hoverDate() {
    return this._hoverDate$.value;
  }
  public set hoverDate(date: BravoMoment | null) {
    this._hoverDate$.next(date);
  }

  public selectRange(pDate: BravoMoment) {
    if (!this.isRange) {
      this.value = pDate;
      this.hideDatePicker();
      return;
    }
    // range
    const current = Array.isArray(this.value) ? 
      this.value :
      [null, null];
    let [start, end] = current;
    if (!start && !end) {
      start = pDate;
      end = null;
    } else if (start && !end) {
      if (pDate.isAfter(start)) {
        end = pDate;
      } else {
        end = start;
        start = pDate;
      }
    }
    else {
      start = pDate;
      end = null;
    }
    this.value = [start, end];
    if (start && end) {
      this.hideDatePicker();
    }
  }

   // hàm mở picker
   public showDatePicker() {
    this._isOpenDatePicker$.next(true);
    if(this._isEmptyValue()) {
      this._initPanels()
      return;
    };
    this._setPanels();
  }

  // hàm đóng picker
  public hideDatePicker() {
    this._isOpenDatePicker$.next(false);
    this.hoverDate = null;
  }

  // xoá select
  public clearSelectDate() {
    this.value = this.isRange ? [null, null] : null;
  }

  private _isEmptyValue() {
    return !this.value || (Array.isArray(this.value) && this.value.some(v => v == null))
  }

  private _initPanels() {
    const startDate = new BravoMoment();
    this.panels = {
      start: {
        mode: this.mode,
        date: startDate
      },
      end: {
        mode: this.mode,
        date: offsetDate(this.mode, startDate, 1)
      }
    };
  }

  private _setPanels() {
    if (!this.isRange) {
      const date = this.value
        ? (this.value as BravoMoment).clone()
        : new BravoMoment();
      this.panels = {
        ...this.panels,
        start: {
          mode: this.mode,
          date
        }
      };
      return;
    }
    if (!Array.isArray(this.value)) {
      this._initPanels();
      return;
    }
    const [start, end] = this.value as RangeDate;
    const startDate = start?.clone() ?? new BravoMoment();
    let endDate: BravoMoment;
    endDate = offsetDate(this.mode, startDate, 1);
    if (!endDate.isAfter(startDate)) {
      endDate = offsetDate(this.mode, startDate, 1);
    }
    this.panels = {
      start: {
        mode: this.mode,
        date: startDate
      },
      end: {
        mode: this.mode,
        date: endDate
      }
    };
  }
}
