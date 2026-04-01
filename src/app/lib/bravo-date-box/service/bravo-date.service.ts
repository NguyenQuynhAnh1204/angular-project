import { Injectable } from '@angular/core';
import { EViewPicker } from '../bravo-control-date.type';
import { BravoMoment } from '../bravo-control-date.until';

@Injectable()
export class BravoDateService {
    public _moment = new BravoMoment();
    public get moment() {
        return this._moment;
    }
    public set moment(pVal) {
        this._moment = pVal;
    }

    private _view: EViewPicker = EViewPicker.PICKER_DATE;
    public get view() {
        return this._view;
    }
    public set view(pValue) {
        this._view = pValue;
    }

    // // năm được chọn
    // private _selectedYear = this.moment.getFullYear();
    // public get selectedYear() {
    //     return this._selectedYear;
    // }
    // public set selectedYear(pYear) {
    //     this._selectedYear = pYear;
    // }
    // // tháng được chọn
    // private _selectedMonth = this.moment.getMonth() + 1;
    // public get selectedMonth() {
    //     return this._selectedMonth;
    // }
    // public set selectedMonth(pMonth) {
    //     this._selectedMonth = pMonth;
    // }
    // // ngày được chọn 
    // private _selectedDate = this.moment.toDate();
    // public get selectedDate() {
    //     return this._selectedDate;
    // }
    // public set selectedDate(pDate) {
    //     this._selectedDate = pDate;
    // }

    // đổi picker
    public switchView(pView: EViewPicker) {
       this.view = pView;
    }
}