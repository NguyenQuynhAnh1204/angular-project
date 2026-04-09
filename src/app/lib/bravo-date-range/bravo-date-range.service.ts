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

    //thời điểm bắt đầu
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
    
    //thời điểm kết thúc
    private _momentEnd$ = new BehaviorSubject<BravoMoment>(new BravoMoment().addMonths(1));
    public readonly momentEndChange$ = this._momentEnd$.asObservable();
    public get momentEnd() {
        return this._momentEnd$.value;
    }
    public set momentEnd(pMoment) {
        if(pMoment.isEqual(this.momentEnd)) return;
        this._momentEnd$.next(pMoment);
    }

    //view bắt đầu
    private _viewStart$ = new BehaviorSubject<EViewPicker>(1);
    public readonly viewStartChange$ = this._viewStart$.asObservable();
    public get viewStart() {
        return this._viewStart$.value;
    }
    public set viewStart(pViewStart) {
        if(this.viewStart == pViewStart) return;
        this._viewStart$.next(pViewStart);
    }

    //view kết thúc
    private _viewEnd$ = new BehaviorSubject<EViewPicker>(1);
    public readonly viewEndChange$ = this._viewEnd$.asObservable();
    public get viewEnd() {
        return this._viewEnd$.value;
    }
    public set viewEnd(pViewEnd) {
        if(this.viewEnd == pViewEnd) return;
        this._viewEnd$.next(pViewEnd);
    }

    // thời gian bắt đầu
    private _selectedStartDate$ = new BehaviorSubject<BravoMoment | undefined>(undefined);
    public readonly selectedStartDateChange$ = this._selectedStartDate$.asObservable();
    public get selectedStartDate() {
        return this._selectedStartDate$.value;
    }
    public set selectedStartDate(pMoment) {
        this._selectedStartDate$.next(pMoment);
    }
    // thời gian kết thúc
    private _selectedEndDate$ = new BehaviorSubject<BravoMoment | undefined>(undefined);
    public readonly selectedEndDateChange$ = this._selectedEndDate$.asObservable();
    public get selectedEndDate() {
        return this._selectedEndDate$.value;
    }
    public set selectedEndDate(pMoment) {
        this._selectedEndDate$.next(pMoment);
    }
    // hover date
    private _hoverDate$ = new BehaviorSubject<BravoMoment | null>(null);
    public readonly hoverDateChange$ = this._hoverDate$.asObservable();
    public get hoverDate() {
        return this._hoverDate$.value;
    }
    public set hoverDate(date: BravoMoment | null) {
        this._hoverDate$.next(date);
    }
    // edit date
    private _editDate$ = new BehaviorSubject<'start'|'end'>('start');
    public readonly editDateChange$ = this._editDate$.asObservable();
    public get editDate() {
        return this._editDate$.value;
    }
    public set editDate(pEdit) {
        if(this.editDate == pEdit) return;
        this._editDate$.next(pEdit)
    }

    // chọn ngày 
    public selectDate(pDate: BravoMoment | undefined) {
        // nếu không có date start
        if (!this.selectedStartDate && this.editDate == 'start') {
            if (this.selectedEndDate && pDate?.isAfter(this.selectedEndDate)) {
                this.selectedStartDate = this.selectedEndDate;
                this.selectedEndDate = pDate;
            } else {
                this.selectedStartDate = pDate;
            }
            this.editDate = 'end';
            return;
        }
        // nếu không có date end
        if (!this.selectedEndDate && this.editDate == "end") {
            if (this.selectedStartDate && pDate?.isBefore(this.selectedStartDate)) {
                this.selectedEndDate = this.selectedStartDate;
                this.selectedStartDate = pDate;
            } else {
                this.selectedEndDate = pDate;
            }
            this.editDate = 'start';
            this.hideDatePicker();
            return;
        }
        // chọn lại
        if (this.editDate === 'start') {
            if (pDate?.isAfter(this.selectedEndDate!)) {
                this.selectedStartDate = this.selectedEndDate;
                this.selectedEndDate = pDate;
            } else {
                this.selectedStartDate = pDate;
            }
            this.editDate = 'end';
        } else {
            if (pDate?.isBefore(this.selectedStartDate!)) {
                this.selectedEndDate = this.selectedStartDate;
                this.selectedStartDate = pDate;
            } else {
                this.selectedEndDate = pDate;
            }
            this.editDate = 'start';
            this.hideDatePicker();
        }
    }

    // chọn tháng
    public selectMonth(pType: 'start' | 'end',pDate: BravoMoment) {
        const month = pDate.getMonth();
        if (pType === 'start') {
            this.momentStart = BravoMoment.set(this.momentStart.toDate(),{ month });
            this.momentEnd = BravoMoment.set(
                this.momentStart.toDate(),
                { month: month + 1 }
            );
        } else {
            this.momentEnd = BravoMoment.set(this.momentEnd.toDate(),{ month });
            this.momentStart = BravoMoment.set(
                this.momentEnd.toDate(),
                { month: month - 1 }
            );
        }
        this.switchView(pType, EViewPicker.PICKER_DATE);
    }
    // chọn năm
    public selectYear(pTime: 'start' | 'end', pDate: BravoMoment) {
        const month = pDate.getMonth();
        const year = pDate.getFullYear();
        if(pTime == 'start') {
            this.momentStart = BravoMoment.set(this.momentStart.toDate(), {year})
            this.momentEnd = BravoMoment.set(this.momentEnd.toDate(), {
                month: month + 1,
                year
            })
        }
        else {
            this.momentEnd = BravoMoment.set(this.momentStart.toDate(), {year})
            this.momentStart = BravoMoment.set(this.momentEnd.toDate(), {
                month: month - 1,
                year
            })
        }
        this.switchView(pTime, EViewPicker.PICKER_MONTH);
    }

    // đổi view hiển thị picker theo label
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

    // chuyển đổi giao diện khi pre-next
    public moveCalendar(pType: 'start' | 'end', pNumb: number) {
        const moment = pType === 'start'? this.momentStart: this.momentEnd;
        const date = moment.toDate();
        let newMoment: BravoMoment;
        switch(pType === 'start'? this.viewStart: this.viewEnd) {
            case EViewPicker.PICKER_DATE:
                newMoment = BravoMoment.set(date,{month: moment.getMonth() + pNumb});
                break;

            case EViewPicker.PICKER_MONTH:
                newMoment = BravoMoment.set(date,{
                    year: moment.getFullYear() + pNumb
                });
                break;

            case EViewPicker.PICKER_YEAR:
                newMoment = BravoMoment.set(date,{
                    year: moment.getFullYear() + pNumb * 25
                });
                break;
        }
        if(pType === 'start') {
            this.momentStart = newMoment;
            this.momentEnd = new BravoMoment(newMoment).addMonths(1);
        } else {
            this.momentEnd = newMoment;
            this.momentStart = new BravoMoment(newMoment).subMonths(1);
        }
    }

    // hàm mở picker
    public showDatePicker() {
        this.switchView('start', 1);
        this.switchView('end', 1);
        this.isOpenDatePicker = true;
        if(this.selectedStartDate) {
            this.momentStart = this.selectedStartDate;
            this.momentEnd = new BravoMoment(this.selectedStartDate).addMonths(1);
            this.editDate = 'end'
        } else if(this.selectedEndDate) {
            this.momentEnd = this.selectedEndDate;
            this.momentStart = new BravoMoment(this.selectedEndDate).subMonths(1);
            this.editDate = 'start'
        } else {
            this.momentStart = new BravoMoment()
            this.momentEnd = new BravoMoment().addMonths(1);
            this.editDate = 'start';
        }
    }

    // hàm đóng picker
    public hideDatePicker() {
        this.isOpenDatePicker = false;
    }
    
    // xoá select date
    public clear() {
        this.selectedStartDate = undefined;
        this.selectedEndDate = undefined;
        this.momentStart = new BravoMoment();
        this.momentEnd = new BravoMoment().addMonths(1);
        this.switchView('start',1);
        this.switchView('end',1);
        this.editDate = 'start';
    }
}