import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateService } from '../../service';

@Component({
  selector: 'br-date-picker',
  templateUrl: './bravo-date-picker.component.html',
  styleUrls: ['./bravo-date-picker.component.scss'],
  imports: [CommonModule],
})
export class BravoDatePickerComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _service = inject(BravoDateService);
  public get service() {
    return this._service;
  }
  public get moment() {
    return this.service.moment$;
  }

  public selectedDate!: BravoMoment; 
  public dates: BravoMoment[][] = [];

  public days: string[] = [];

  public constructor() {
    this.selectedDate = this.service.selectDate;
    this.service.momentChange$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.dates = this.service.moment$.getWeeks();
      });
    this.days = this.moment.getDays();
  }

  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
  }
  
  public onSelectDate(pDate: BravoMoment) {
    this.selectedDate = pDate;
    this.service.selectDate = BravoMoment.set(this.service.moment$.getDate(), {
      date: this.selectedDate.getDate(),
      month: this.selectedDate.getMonth(),
      year: this.selectedDate.getFullYear()
    });
    this.service.moment$ = BravoMoment.set(this.moment.toDate(), {
      date: pDate.getDate(),
    });
    this.service.hideDatePicker();
  }
}
