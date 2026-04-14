import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { BravoDateService } from '../../bravo-control-date.service';
import { CompatibleDate, RangeDate, RangePartType } from '../../../bravo-date-box/bravo-control-date.type';


@Component({
  selector: 'br-date-picker',
  templateUrl: './bravo-date-picker.component.html',
  styleUrls: ['./bravo-date-picker.component.scss'],
  imports: [CommonModule],
})
export class BravoDatePickerComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _service = inject(BravoDateService);
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
    this._service.selectDate(pDate);
  }

  public handleOnHover(pDate: BravoMoment) {
    if(!this._service.value && !this.isRange) return;
    this._service.hoverDate = pDate;
  }

  public handleOnLeave() {
    this._service.hoverDate = null;
  }

  public isSelected(pDate: BravoMoment) {
    if (!this.selectDate) return false;
    // single date
    if (!this._isRangeValue(this.selectDate)) {
      return this.selectDate?.isSameDay(pDate);
    }
    // date range
    const [start, end] = this.selectDate;
    return (
      (start?.isSameDay(pDate) ?? false) ||
      (end?.isSameDay(pDate) ?? false)
    );
  }
  
  // day in range 
  public isInRange(pDate: BravoMoment) {
    if (!this._isRangeValue(this.selectDate)) return false;
    const [start, end] = this.selectDate;
    if (!start || !end) return false;
    return (pDate.isAfter(start) && pDate.isBefore(end));
  }

  public inHoverRange(pDate: BravoMoment) {
    if (!this._isRangeValue(this.selectDate)) return false;
    const [start, end] = this._service.value as RangeDate;
    const hoverDate = this._service.hoverDate;
    if(!hoverDate || !(start ?? end)) return false;
    const anchorTime = start?.getTime() ?? end?.getTime();
    if(!anchorTime) return false;
    const dateTime = pDate.getTime();
    const hoverTime = hoverDate.getTime();
    return dateTime >= Math.min(anchorTime, hoverTime) && 
    dateTime <= Math.max(anchorTime, hoverTime);
  } 

  public isDayInMonth(pDate: BravoMoment) {
    return this.date.isSameMonth(pDate);
  }

  private _isRangeValue(pValue: CompatibleDate) {
    return Array.isArray(pValue);
  }

}
