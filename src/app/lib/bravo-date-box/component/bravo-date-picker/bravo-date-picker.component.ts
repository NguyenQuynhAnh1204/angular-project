import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateSingleService } from '../../service';


@Component({
  selector: 'br-date-picker',
  templateUrl: './bravo-date-picker.component.html',
  styleUrls: ['./bravo-date-picker.component.scss'],
  imports: [CommonModule],
})
export class BravoDatePickerComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _service = inject(BravoDateSingleService);
  public get moment() {
    return this._service.moment;
  }

  public dates: BravoMoment[][] = [];

  public days: string[] = [];

  public constructor() {
    this._service.momentChange$
      .pipe(takeUntil(this._destroy$))
      .subscribe((pVal) => {
        this.dates = pVal.getWeeks();
      });
    this.days = this.moment.getDays();

  }

  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
  }

  public isSelected(pDate: BravoMoment) {
    return this._service.selectDate.isSameDay(pDate)
  }

  public isDayInMonth(pDate: BravoMoment) {
    return this.moment.isSameMonth(pDate);
  }
  
  public onSelectDate(pDate: BravoMoment) {
    this._service.selectDate = new BravoMoment(pDate)
    this._service.moment = new BravoMoment(pDate);
    this._service.hideDatePicker();
  }
}
