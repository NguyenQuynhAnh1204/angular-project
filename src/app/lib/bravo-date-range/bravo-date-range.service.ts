import { Injectable } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BehaviorSubject } from 'rxjs';
import { BravoDateService } from '../bravo-date-box';

@Injectable()
export class BravoDateRangeService extends BravoDateService {
    // hover date
    // private _hoverDate$ = new BehaviorSubject<BravoMoment | null>(null);
    // public readonly hoverDateChange$ = this._hoverDate$.asObservable();
    // public get hoverDate() {
    //     return this._hoverDate$.value;
    // }
    // public set hoverDate(date: BravoMoment | null) {
    //     this._hoverDate$.next(date);
    // }

    // chọn ngày 
    // public selectDate(pDate: BravoMoment | undefined) {
    //     // nếu không có date start
    //     if (!this.selectedStartDate && this.editDate == 'start') {
    //         if (this.selectedEndDate && pDate?.isAfter(this.selectedEndDate)) {
    //             this.selectedStartDate = this.selectedEndDate;
    //             this.selectedEndDate = pDate;
    //         } else {
    //             this.selectedStartDate = pDate;
    //         }
    //         this.editDate = 'end';
    //         return;
    //     }
    //     // nếu không có date end
    //     if (!this.selectedEndDate && this.editDate == "end") {
    //         if (this.selectedStartDate && pDate?.isBefore(this.selectedStartDate)) {
    //             this.selectedEndDate = this.selectedStartDate;
    //             this.selectedStartDate = pDate;
    //         } else {
    //             this.selectedEndDate = pDate;
    //         }
    //         this.editDate = 'start';
    //         this.hideDatePicker();
    //         return;
    //     }
    //     // chọn lại
    //     if (this.editDate === 'start') {
    //         if (pDate?.isAfter(this.selectedEndDate!)) {
    //             this.selectedStartDate = this.selectedEndDate;
    //             this.selectedEndDate = pDate;
    //         } else {
    //             this.selectedStartDate = pDate;
    //         }
    //         this.editDate = 'end';
    //     } else {
    //         if (pDate?.isBefore(this.selectedStartDate!)) {
    //             this.selectedEndDate = this.selectedStartDate;
    //             this.selectedStartDate = pDate;
    //         } else {
    //             this.selectedEndDate = pDate;
    //         }
    //         this.editDate = 'start';
    //         this.hideDatePicker();
    //     }
    // }

    // chọn tháng
    // public selectMonth(pType: 'start' | 'end',pDate: BravoMoment) {
    //     const month = pDate.getMonth();
    //     if (pType === 'start') {
    //         this.momentStart = BravoMoment.set(this.momentStart.toDate(),{ month });
    //         this.momentEnd = BravoMoment.set(
    //             this.momentStart.toDate(),
    //             { month: month + 1 }
    //         );
    //     } else {
    //         this.momentEnd = BravoMoment.set(this.momentEnd.toDate(),{ month });
    //         this.momentStart = BravoMoment.set(
    //             this.momentEnd.toDate(),
    //             { month: month - 1 }
    //         );
    //     }
    //     this.switchView(pType, EViewPicker.PICKER_DATE);
    // }

    // chọn năm
    // public selectYear(pTime: 'start' | 'end', pDate: BravoMoment) {
    //     const month = pDate.getMonth();
    //     const year = pDate.getFullYear();
    //     if(pTime == 'start') {
    //         this.momentStart = BravoMoment.set(this.momentStart.toDate(), {year})
    //         this.momentEnd = BravoMoment.set(this.momentEnd.toDate(), {
    //             month: month + 1,
    //             year
    //         })
    //     }
    //     else {
    //         this.momentEnd = BravoMoment.set(this.momentStart.toDate(), {year})
    //         this.momentStart = BravoMoment.set(this.momentEnd.toDate(), {
    //             month: month - 1,
    //             year
    //         })
    //     }
    //     this.switchView(pTime, EViewPicker.PICKER_MONTH);
    // }

}