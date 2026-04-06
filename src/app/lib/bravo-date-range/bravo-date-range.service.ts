import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { EViewPicker } from '../bravo-date-box';

@Injectable()
export class BravoDateRangeService {

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

    // lấy thời điểm bắt đầu
    private _momentStart$ = new BehaviorSubject<BravoMoment>(new BravoMoment());
    public readonly momentStartChange$ = this._momentStart$.asObservable();
    public get momentStart() {
        return this._momentStart$.value;
    }
    public set momentStart(pMoment) {
        if(pMoment.isEqual(this.momentStart)) return;
        this._momentStart$.next(pMoment);
    }
    
    // lấy thời điểm kết thúc
    private _momentEnd$ = new BehaviorSubject<BravoMoment>(new BravoMoment().addMonths(1));
    public readonly momentEndChange$ = this._momentEnd$.asObservable();
    public get momentEnd() {
        return this._momentEnd$.value;
    }
    public set momentEnd(pMoment) {
        if(pMoment.isEqual(this.momentEnd)) return;
        this._momentEnd$.next(pMoment);
    }

    // hiển thị view bắt đầu
    private _viewStart$ = new BehaviorSubject<EViewPicker>(1);
    public readonly viewStartChange$ = this._viewStart$.asObservable();
    public get viewStart() {
        return this._viewStart$.value;
    }
    public set viewStart(pViewStart) {
        this._viewStart$.next(pViewStart);
    }

    // hiển thị view kết thúc
    private _viewEnd$ = new BehaviorSubject<EViewPicker>(1);
    public readonly viewEndChange$ = this._viewEnd$.asObservable();
    public get viewEnd() {
        return this._viewEnd$.value;
    }
    public set viewEnd(pViewEnd) {
        this._viewEnd$.next(pViewEnd);
    }

    // lưu thời gian bắt đầu
    private _selectedStartDate!: BravoMoment;
    public get selectedStartDate() {
        return this._selectedStartDate
    }
    public set selectedStartDate(pMoment) {
        this._selectedStartDate = pMoment;
    }
    // lưu thời gian kết thức
    private _selectedEndDate!: BravoMoment;
    public get selectedEndDate() {
        return this._selectedEndDate
    }
    public set selectedEndDate(pMoment) {
        this._selectedEndDate = pMoment;
    }

    public switchView(pType: 'start' | 'end', pView: EViewPicker) {
        if(pType == 'start') {
            this.viewStart = pView;
        } else if(pType == 'end') {
            this.viewEnd = pView;
        }
    }

    // hàm mở picker
    public showDatePicker() {
        // this.switchView(pTime, 1);
        this._isOpenDatePicker$.next(true);
        // this._moment$.next(this.selectDate);
    }

    // hàm đóng picker
    public hideDatePicker() {
        this._isOpenDatePicker$.next(false);
    }
    
}