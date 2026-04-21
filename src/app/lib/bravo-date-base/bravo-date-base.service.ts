import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { CompatibleDate, DateMode, PanelState, RangeDate, RangePartType, SingleDate } from './bravo-date-base.type';
import { isRangeValue, offsetDate } from './bravo-date-base.utilities';
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

  private _selectSection = {
    start: false,
    end: false
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

  private _selectedMoment$ = new BehaviorSubject<CompatibleDate>(null);
  public readonly valueChange$ = this._selectedMoment$.asObservable();
  public get selectedMoment() {
    return this._selectedMoment$.value;
  }
  public set selectedMoment(pDate) {
    this._selectedMoment$.next(pDate)
    this._setPanels();
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
      this.selectedMoment = pDate;
      this.openDatePicker(false);
      return;
    }
    const current = isRangeValue(this.selectedMoment) ? this.selectedMoment : {start: null, end: null};
    let {start, end} = current;
    if(this.inputActive == 'start') {
      start = pDate;
      this._selectSection.start = true;
    } else {
      end = pDate;
      this._selectSection.end = true;
    }
    if (start && end && start.getTime() > end.getTime()) {
      [start, end] = [end, start];
    }
    console.log(start, end)
    this.selectedMoment = {
      start,
      end,
    }

    if (this._selectSection.start && this._selectSection.end) {
      this.openDatePicker(false);
      return;
    }
    this._inputActive$.next(
      this.inputActive === 'start'
        ? 'end'
        : 'start'
    );
  }
  
  public openDatePicker(pOpen: boolean) {
    if(pOpen) {
      this._setPanels();
    } else {
      this._selectSection =  {
        start: false,
        end: false,
      }
      this.hoverDate = null;
    }
    this._isOpenDatePicker$.next(pOpen);
  }

  public clearSelectDate() {
    this.selectedMoment = this.isRange ? {start: null, end: null} : null;
  }

  private _isEmptyValue() {
    const value = this.selectedMoment;
    return !value || (isRangeValue(value) && !value.start && !value.end);
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
      const date = (this.selectedMoment as BravoMoment).clone();
      this.panels = {
        ...this.panels,
        start: {
          mode: this.mode,
          date
        }
      };
      return;
    }
    const {start, end} = this.selectedMoment as RangeDate;
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
