import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { CompatibleDate, DateMode, PanelState, RangeDate, RangePartType, SingleDate } from './bravo-control-date.type';
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

  private _hoverDate$ = new BehaviorSubject<SingleDate>(null);
  public readonly hoverDateChange$ = this._hoverDate$.asObservable();
  public get hoverDate() {
    return this._hoverDate$.value;
  }
  public set hoverDate(date: SingleDate) {
    this._hoverDate$.next(date);
  }

  public selectDate(pDate: BravoMoment) {
    if (!this.isRange) {
      this.value = pDate;
      this.openDatePicker(false);
      return;
    }
    // range
    const current = Array.isArray(this.value) ? this.value : [null, null];
    let [start, end] = current;
    if(this.inputActive == 'start') {
      start = pDate;
      this._inputActive$.next('end');
    } else {
      end = pDate;
      if(!start) {
        this._inputActive$.next('start');
      }
    }
    if (start && end && start.getTime() > end.getTime()) {
      [start, end] = [end, start];
    }
    this.value = [start, end];
    if (start && end) {
      this._inputActive$.next('start');
      this.openDatePicker(false);
    }
  }
  
  public openDatePicker(pOpen: boolean) {
    this._isOpenDatePicker$.next(pOpen);
    if(pOpen) {
      this._setPanels();
    } else {
      this.hoverDate = null;
    }
  }

  public clearSelectDate() {
    this.value = this.isRange ? [null, null] : null;
  }

  private _isEmptyValue() {
    return !this.value || ((Array.isArray(this.value) && this.value.every(v => v == null)))
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
    if (this._isEmptyValue()) {
      this._initPanels();
      return;
    }
    if (!this.isRange) {
      const date = (this.value as BravoMoment).clone();
      this.panels = {
        ...this.panels,
        start: {
          mode: this.mode,
          date
        }
      };
      return;
    }
    const [start, end] = this.value as RangeDate;
    const active = this.inputActive;
    let startDate: BravoMoment;
    let endDate: BravoMoment;
    if (active === 'start') {
      if (start) {
        startDate = start.clone();
      } else if (end) {
        startDate = offsetDate(this.mode, end, -1);
      } else {
        startDate = new BravoMoment();
      }
      endDate = offsetDate(this.mode, startDate, 1);
    } else {
      if (end) {
        endDate = end.clone();
      } else if (start) {
        endDate = offsetDate(this.mode, start, 1);
      } else {
        endDate = new BravoMoment();
      }
      startDate = offsetDate(this.mode, endDate, -1);
    }
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
