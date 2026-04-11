import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateSingleService } from '../../service';
import { CompatibleDate, RangePartType } from '../../bravo-control-date.type';
import { ComparableData } from '@bravo-infra/core/definition';


@Component({
  selector: 'br-date-picker',
  templateUrl: './bravo-date-picker.component.html',
  styleUrls: ['./bravo-date-picker.component.scss'],
  imports: [CommonModule],
})
export class BravoDatePickerComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _service = inject(BravoDateSingleService);
  public get date() {
    return this._service.panels[this.partType].date;
  }
  public get isRange() {
    return this._service.isRange;
  }

  @Input('partType')
  public partType!: RangePartType;

  public selectDate!: CompatibleDate;
  public dates: BravoMoment[][] = [];
  public days: string[] = [];

  public ngOnInit() {
    this._service.panelsChange$
    .pipe(takeUntil(this._destroy$))
    .subscribe((pVal) => {
      this.dates = pVal[this.partType].date.getWeeks();
    })
    
    this._service.valueChange$
    .pipe(takeUntil(this._destroy$))
    .subscribe((pVal) => { 
      this.selectDate = pVal;
    })

    this.days = this._service.panels[this.partType].date.getDays();
  }

  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
  }

  // select date
  public onSelectDate(pDate: BravoMoment) {
    this.selectDate = pDate;
    this._service.selectDate(pDate);
  }

  public isSelected(pDate: BravoMoment) {
    if (!this.selectDate) return false;
    if (!this.isRangeValue(this.selectDate)) {
      return this.selectDate?.isSameDay(pDate);
    }
    
    const [start, end] = this.selectDate;

    return (
      (start?.isSameDay(pDate) ?? false) ||
      (end?.isSameDay(pDate) ?? false)
    );
  }

  public isInRange(pDate: BravoMoment) {
    if (!this.isRangeValue(this.selectDate)) return false;
    const [start, end] = this.selectDate;
    if (!start || !end) return false;
    const time = pDate.getTime();
    return (
      time > start.getTime() &&
      time < end.getTime()
    );
  }

  public isDayInMonth(pDate: BravoMoment) {
    return this.date.isSameMonth(pDate);
  }

  private isRangeValue(pValue: CompatibleDate) {
    return Array.isArray(pValue);
  }

  

}
