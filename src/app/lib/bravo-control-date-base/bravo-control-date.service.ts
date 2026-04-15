import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { CompatibleDate, DateMode, PanelState, RangeDate, RangePartType } from './bravo-control-date.type';
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
  public set panels(value) {
    this._panels$.next(value);
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

   // hàm mở picker
   public showDatePicker() {
    this._isOpenDatePicker$.next(true);
    if(this._isEmptyValue()) {
      this._setValuePanel(true)
      return;
    };
    this._setValuePanel();
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

  private _setValuePanel(reset = false) {
    if (!this.isRange) {
      const date = !reset && this.value
          ? (this.value as BravoMoment).clone()
          : new BravoMoment();

      this._panels$.next({
        ...this.panels,
        start: {
          mode: this.mode,
          date
        }
      });
      return;
    }
    let startDate: BravoMoment;
    let endDate: BravoMoment;
    if (!reset && Array.isArray(this.value)) {
      const [start] = this.value as RangeDate;

      startDate = start?.clone() ?? new BravoMoment();
      endDate = this.mode == 'date' ? startDate.clone().addMonths(1) : startDate.clone().addYears(1);
    } else {
      startDate = new BravoMoment();
      endDate = this.mode == 'date' ? startDate.clone().addMonths(1) : startDate.clone().addYears(1);
    }
    this._panels$.next({
      start: {
        mode: this.mode,
        date: startDate
      },
      end: {
        mode: this.mode,
        date: endDate
      }
    });
  }
}
