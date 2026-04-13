import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { CompatibleDate, DateMode, PanelState, RangeDate, RangePartType } from '../bravo-control-date.type';
@Injectable()
export class BravoDateService {
  public isRange!: boolean;

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
    console.log('active input', pValue);
    this._inputActive$.next(pValue);
  }

  private _panels$ = new BehaviorSubject<{start: PanelState;end: PanelState;}>({
      start: {mode: 'date',date: new BravoMoment()},
      end: {mode: 'date', date: new BravoMoment().addMonths(1)}
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

  // hàm chọn date
  public selectDate(pDate: BravoMoment) {
    // single
    if (!this.isRange) {
      this.value = pDate;
      this.hideDatePicker();
      return;
    }
    // range
    const current = Array.isArray(this.value) ? this.value : [null, null];
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

  // hàm chọn month
  public selectMonth(pDate: BravoMoment, pPart: RangePartType) {
    const panels = this.panels;
    // single
    if (!this.isRange) {
      this.panels = {
        ...panels,
        [pPart]: {
          date: pDate,
          mode: 'date'
        }
      };
      return;
    }
    // range
    let startDate = panels.start.date;
    let startMode = panels.start.mode;
    let endDate = panels.end.date;
    let endMode = panels.end.mode;
    if (pPart === 'start') {
      startDate = pDate;
      startMode = "date";
      endDate = pDate.clone().addMonths(1);
    }
    if (pPart === 'end') {
      endDate = pDate;
      endMode = "date";
      startDate = pDate.clone().subMonths(1);
    }
    this._panels$.next({
      start: {
        date: startDate,
        mode: startMode
      },
      end: {
        date: endDate,
        mode: endMode}
    });
  }
  
  // hàm chọn year
  public selectYear(pDate: BravoMoment, pPart: RangePartType) {
    const panels = this.panels;
    if (!this.isRange) {
      this.panels = {
        ...panels,
        [pPart]: {
          date: pDate,
          mode: 'month'
        }
      };
      return;
    }
    let startDate = panels.start.date;
    let startMode = panels.start.mode;
    let endDate = panels.end.date;
    let endMode = panels.end.mode;
    if (pPart === 'start') {
      startDate = pDate;
      startMode = 'month'
    }
    if (pPart === 'end') {
      endDate = pDate;
      endMode = "month"
    }
    this._panels$.next({
      start: {
        date: startDate,
        mode: startMode
      },
      end: {
        date: endDate,
        mode: endMode
      }
    });
  }

  // move calendar
  public moveCalendar(pStep: number, pPanel: RangePartType) {
    const state = this.panels[pPanel]; // để lấy ra mode & date của input active
    const mode = state.mode; 
    const date = state.date; 
    
    let newDate: BravoMoment;
    
    switch(mode) {
      case 'date':
        newDate = date.addMonths(pStep);
        break;
      case 'month':
          newDate = date.addYears(pStep);
          break;
      case 'year':
        newDate = date.addYears(pStep * 25);
        break;
    }
    let newPanels = {
      ...this.panels,
      [pPanel]: {
        ...state,
        date: newDate
      }
    };
    if (this.isRange) {
      if (pPanel === 'start') {
        newPanels.end = {
          ...newPanels.end,
          date: newDate.clone().addMonths(1)
        };
      } else {
        newPanels.start = {
          ...newPanels.start,
          date: newDate.clone().addMonths(-1)
        };
      }
    }
    this._panels$.next(newPanels);
  }

  public changeMode(pPanel: RangePartType) {
    const panel = this.panels[pPanel];
    const mode = panel.mode;
    let newMode: DateMode;
    switch (mode) {
      case 'date':
        newMode = 'year';
        break;
      case 'month':
        newMode = 'date';
        break;
      case 'year':
      default:
        newMode = 'date';
        break;
    }
    this._panels$.next({
      ...this.panels,
      [pPanel]: {
        ...panel,
        mode: newMode
      }
    });
  }
   // hàm mở picker
   public showDatePicker() {
    this._isOpenDatePicker$.next(true);
    if(!this.value) {
      this._initialValuePanel()
    };
    this._setValuePanel();
  }

  // hàm đóng picker
  public hideDatePicker() {
    this._isOpenDatePicker$.next(false);
  }

  // xoá select
  public clearSelectDate() {
     this.value = this.isRange ? [null, null] : null;
  }

  private _initialValuePanel() {
    if(!this.isRange) {
      this._panels$.next({
        ...this.panels,
        start: {
          mode: 'date',
          date: new BravoMoment()
        }
      })
      return;
    }  

    this._panels$.next({
      start: {
        mode: 'date',
        date: new BravoMoment()
      },
      end: {
        mode: 'date',
        date: new BravoMoment().clone().addMonths(1)
      }
    });
    
  }

  private _setValuePanel() {
    if(!this.isRange) {
      const date = this.value as BravoMoment;
      this._panels$.next({
        ...this.panels,
        start: {
          ...this.panels.start,
          date: date.clone()
        }
      })
      return;
    }
    // range
    const [start, end] = this.value as RangeDate;
    const startDate = start?.clone()!;
    const endDate = start?.clone().addMonths(1)!;
    this._panels$.next({
      start: {
        mode: 'date',
        date: startDate
      },
      end: {
        mode: 'date',
        date: endDate
      }
    });
  }
}
