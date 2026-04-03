import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { EViewPicker } from '../bravo-control-date.type';
@Injectable()
export class BravoDateService {

  private _isOpenDatePicker$ = new BehaviorSubject<boolean>(false);
  public readonly isOpenDatePickerChange$ = this._isOpenDatePicker$.asObservable();
  public get isOpenDatePicker$() {
    return this._isOpenDatePicker$.value;
  }
  public set isOpenDatePicker$(pStatus) {
    if(this.isOpenDatePicker$ == pStatus) return; 
    this._isOpenDatePicker$.next(pStatus);
  }

  private _moment$ = new BehaviorSubject<BravoMoment>(new BravoMoment()); // luôn phát ra giá trị đầu tiên là thời điểm hiện tại
  public readonly momentChange$ = this._moment$.asObservable();  // 
  public get moment$() {
    return this._moment$.value;
  }
  public set moment$(pVal: BravoMoment) {
    if(this.moment$ == pVal) return;
    this._moment$.next(pVal);
  }

  private _selectDate = this.moment$;
  public get selectDate() {
    return this._selectDate;
  }
  public set selectDate(pVal) {
    if(this.selectDate == pVal) return;
    this._selectDate = pVal;
  }

  private _view = EViewPicker.PICKER_DATE;
  public get view() {
    return this._view;
  }
  public set view(pValue) {
    this._view = pValue;
  }

  // đổi picker
  public switchView(pView: EViewPicker) {
    this.view = pView;
  }

  public showDatePicker() {
    this.switchView(1);
    this._isOpenDatePicker$.next(true);
  }

  public hideDatePicker() {
    this._isOpenDatePicker$.next(false);
  }
}
