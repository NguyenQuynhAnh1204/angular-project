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
        if (pMoment.isEqual(this.momentStart)) return;
        this._momentStart$.next(pMoment);
        if (!this.momentEnd.isAfter(pMoment)) {
            this.momentEnd = new BravoMoment(pMoment).addMonths(1);
        }
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
        if(this.viewStart == pViewStart) return;
        this._viewStart$.next(pViewStart);
    }

    // hiển thị view kết thúc
    private _viewEnd$ = new BehaviorSubject<EViewPicker>(1);
    public readonly viewEndChange$ = this._viewEnd$.asObservable();
    public get viewEnd() {
        return this._viewEnd$.value;
    }
    public set viewEnd(pViewEnd) {
        if(this.viewEnd == pViewEnd) return;
        this._viewEnd$.next(pViewEnd);
    }

    // lưu thời gian bắt đầu
    private _selectedStartDate$ = new BehaviorSubject<BravoMoment | undefined>(undefined);
    public readonly selectedStartDateChange$ = this._selectedStartDate$.asObservable();
    public get selectedStartDate() {
        return this._selectedStartDate$.value;
    }
    public set selectedStartDate(pMoment) {
        this._selectedStartDate$.next(pMoment);
    }
    // lưu thời gian kết thức
    private _selectedEndDate$ = new BehaviorSubject<BravoMoment | undefined>(undefined);
    public readonly selectedEndDateChange$ = this._selectedEndDate$.asObservable();
    public get selectedEndDate() {
        return this._selectedEndDate$.value;
    }
    public set selectedEndDate(pMoment) {
        this._selectedEndDate$.next(pMoment);
    }

    private _editDate$ = new BehaviorSubject<'start'|'end'>('start');
    public readonly editDateChange$ = this._editDate$.asObservable();
    public get editDate() {
        return this._editDate$.value;
    }
    public set editDate(pEdit) {
        if(this.editDate == pEdit) return;
        this._editDate$.next(pEdit)
    }

    private _hoverDate$ =new BehaviorSubject<BravoMoment | undefined>(undefined);
    public hoverDateChange$ = this._hoverDate$.asObservable();
    public get hoverDate() {
        return this._hoverDate$.value;
    }
    public set hoverDate(pDate) {
        this._hoverDate$.next(pDate);
    }

    // chọn ngày 
    public selectDate(date: BravoMoment) {
        // chọn start lần đầu
        if (!this.selectedStartDate) {
            this.selectedStartDate = date;
            this.editDate = 'end';
            return;
        }
        // chọn end
        if (!this.selectedEndDate) {
            if (date.isBefore(this.selectedStartDate)) {
                this.selectedStartDate = date;
                return;
            }
            this.selectedEndDate = date;
            this.editDate = 'start';
            this.hideDatePicker();
            return;
        }
        // chọn lại range
        if (this.editDate === 'start') {
            this.selectedStartDate = date;
            this.selectedEndDate = undefined;
            this.editDate = 'end';
        } else {
            this.selectedEndDate = date;
            this.editDate = 'start';
            this.hideDatePicker();
        }
    }

    // đổi view hiển thị picker
    public switchView(pType: 'start' | 'end', pView: EViewPicker) {
        if(pType == 'start') {
            this.viewStart = pView;
        } else if(pType == 'end') {
            this.viewEnd = pView;
        }
    }

    // bật tắt view trên label
    public toggleView(type:'start'|'end') {
        const view = type === 'start'? this.viewStart: this.viewEnd;
        const next = view === EViewPicker.PICKER_DATE ? EViewPicker.PICKER_YEAR : EViewPicker.PICKER_DATE;
        this.switchView(type,next);
    }

    // chuyển đổi giao diện 
    public moveCalendar(type: 'start' | 'end',direction: number) {
        const moment = type === 'start'? this.momentStart: this.momentEnd;
        const date = moment.toDate();
        let newMoment: BravoMoment;
        switch(type === 'start'? this.viewStart: this.viewEnd) {
            case EViewPicker.PICKER_DATE:
                newMoment = BravoMoment.set(date,{month: moment.getMonth() + direction});
                break;

            case EViewPicker.PICKER_MONTH:
                newMoment = BravoMoment.set(date,{
                    year: moment.getFullYear() + direction
                });
                break;

            case EViewPicker.PICKER_YEAR:
                newMoment = BravoMoment.set(date,{
                    year: moment.getFullYear() + direction * 25
                });
                break;
        }
        if(type === 'start') {
            this.momentStart = newMoment;
            this.momentEnd = new BravoMoment(newMoment).addMonths(1);
        } else {
            this.momentEnd = newMoment;
            this.momentStart = new BravoMoment(newMoment).addMonths(-1);
        }
    }

    // hàm mở picker
    public showDatePicker() {
        this.switchView('start', 1);
        this.switchView('end', 1);
        this.isOpenDatePicker = true;
    }

    // hàm đóng picker
    public hideDatePicker() {
        this.isOpenDatePicker = false;
    }
    
    // xoá select date
    public clear() {
        this.selectedStartDate = undefined;
        this.selectedEndDate = undefined;
        this.editDate = 'start';
        this.hoverDate = undefined;
        this.momentStart = new BravoMoment();
        this.momentEnd = new BravoMoment().addMonths(1);
        this.switchView('start',1);
        this.switchView('end',1);
    }
}