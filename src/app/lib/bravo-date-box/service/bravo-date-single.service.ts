import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { EViewPicker } from '../bravo-control-date.type';
@Injectable()
export class BravoDateSingleService {
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

  // moment change
  private _moment$ = new BehaviorSubject<BravoMoment>(new BravoMoment()); // luôn phát ra giá trị đầu tiên là thời điểm hiện tại
  public readonly momentChange$ = this._moment$.asObservable();  // 
  public get moment() {
    return this._moment$.value;
  }
  public set moment(pVal: BravoMoment) {
    if(this.moment == pVal) return;
    this._moment$.next(pVal);
  }

  // view change
  private _view$ = new BehaviorSubject<EViewPicker>(1);
  public readonly viewChange$ = this._view$.asObservable(); 
  public get view() {
    return this._view$.value;
  }
  public set view(pValue) {
    this._view$.next(pValue);
  }
  
  private _selectDate = this.moment;
  public get selectDate() {
    return this._selectDate;
  }
  public set selectDate(pVal) {
    if(this.selectDate == pVal) return;
    this._selectDate = pVal;
  }
  
  // hàm đổi view
  public switchView(pView: EViewPicker) {
    this.view = pView;
  }

  // đổi picker
  public moveCalendar(pNumb: number) {
    const date = this.moment.toDate();
        const month = this.moment.getMonth();
        const year = this.moment.getFullYear();
        if (this.view === 1) {
            this.moment =
            BravoMoment.set(date, {
                month: month + pNumb
            });
        }
        else if (this.view === 2) {
            this.moment =
            BravoMoment.set(date, {
                year: year + pNumb
                });
            }
        else if (this.view === 3) {
            this.moment =
            BravoMoment.set(date, {
                year: year + pNumb * 25
            });
        }
  } 

   // hàm mở picker
  public showDatePicker() {
    this.switchView(1);
    this._isOpenDatePicker$.next(true);
    this._moment$.next(this.selectDate);
  }

  // hàm đóng picker
  public hideDatePicker() {
    this._isOpenDatePicker$.next(false);
  }
}
