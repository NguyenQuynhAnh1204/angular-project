import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { Subject, takeUntil } from 'rxjs';
import { RangePartType } from '../../bravo-date-base.type';
import { isRangeValue } from '../../bravo-date-base.utilities';
import { BravoDateAbstractComponent } from '../bravo-date-abstract';


@Component({
  selector: 'br-date-picker',
  templateUrl: './bravo-date-picker.component.html',
  styleUrls: ['./bravo-date-picker.component.scss'],
  imports: [CommonModule],
})
export class BravoDatePickerComponent extends BravoDateAbstractComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  public get date() {
    return this._service.panels[this.partType].date;
  }
  @Input('partType')
  public partType!: RangePartType;

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
        this.selectedDate = pVal;
      })
    this.days = this._service.panels[this.partType].date.getDays();
  }

  public ngOnDestroy() {
      this._destroy$.next();
      this._destroy$.complete();
  }

  // select date
  public onSelectDate(pEvent: MouseEvent, pDate: BravoMoment) {
    pEvent.preventDefault();
   this._service.selectDate(pDate);
  }

  public override isSelected(pDate: BravoMoment) {
    if (!this.selectedDate) return false;
    // single date
    if (!isRangeValue(this.selectedDate)) {
      return this.selectedDate?.isSameDay(pDate);
    }
    // date range
    const [start, end] = this.selectedDate;
    return (
      (start?.isSameDay(pDate) ?? false) ||
      (end?.isSameDay(pDate) ?? false)
    );
  }

  public isDayInMonth(pDate: BravoMoment) {
    return this.date.isSameMonth(pDate);
  }

}
