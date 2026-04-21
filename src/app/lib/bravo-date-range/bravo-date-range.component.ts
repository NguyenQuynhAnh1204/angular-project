import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { skip, Subject, takeUntil } from 'rxjs';
import { BravoControlDirective } from '../bravo-control-base';
import { BravoDateControlComponent, BravoDatePopupComponent, BravoDateService, CompatibleDate, DateRangeValue, DateSingleValue, SingleDate } from '../bravo-control-date-base';
import { isRangeValue } from '../bravo-control-date-base/bravo-control-date.until';


@Component({
    selector: 'br-date-range',
    templateUrl: './bravo-date-range.component.html',
    styleUrls: ["./bravo-date-range.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDatePopupComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoDateRangeComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoDateRangeComponent),
            multi: true
        },
        BravoDateService
    ],
    hostDirectives: [
        {
            directive: BravoControlDirective,
            inputs: ["formControl"],
        },
        {
            directive: BravoDropdownAnchorDirective
        }
    ]
})
export class BravoDateRangeComponent extends BravoDateControlComponent implements OnInit, AfterViewInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    public get isOpenDatePicker() {
        return this._service.isOpenDatePicker;
    }
    public get value() {
        return this._service.value;
    }

    private _dateRangeValue!: DateRangeValue;
    public get dateRangeValue() {
        return this._dateRangeValue;
    }
    public set dateRangeValue(pDateRange) {
        if(this._dateRangeValue === pDateRange) return;
        this._dateRangeValue = pDateRange;
    }

    @ViewChildren('rangePickerInput')
    public rangePickerInput!: QueryList<ElementRef<HTMLInputElement>>

    public ngOnInit() {
        this._service.valueChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this._setInputValue(pVal);
        })
    }

    public ngAfterViewInit() {
        this._formDir.ngSubmit
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._service.value = [null, null];
            })
        this.rangePickerInput.forEach((item) => {
            this._focusMonitor.monitor(item)
            .pipe(takeUntil(this._destroy$))
            .subscribe(origin => {
                if (origin) {
                    this.focus = true;
                    this._service.openDatePicker(true);
                } else {
                    this.focus = false;
                }
            });
        })

        this._service.inputActiveChange$
            .pipe(skip(1))
            .pipe(takeUntil(this._destroy$))
            .subscribe(target => {
                if (target === 'start') {
                    this._focusMonitor.focusVia(
                        this.rangePickerInput.first,
                        'program'
                    );
                }
                if (target === 'end') {
                    this._focusMonitor.focusVia(
                        this.rangePickerInput.last,
                        'program'
                    );
                }
            });
    }
    
    public ngOnDestroy(): void {
        this.rangePickerInput.forEach((item) => {
            this._focusMonitor.stopMonitoring(item);
        })
        this._destroy$.next();
        this._destroy$.complete();
    }

    public override showDatePicker(pEvent: MouseEvent) {
        const inputActive = this.rangePickerInput.first;
        this._focusMonitor.focusVia(
            inputActive,
            'program'
        );
        super.showDatePicker(pEvent);
    }

    public override _setInputValue(pValue: CompatibleDate) {
        const dateRange = Array.isArray(pValue) ? pValue : [null, null];
        const [start, end] = dateRange;
        const format = this.getFormat();
        let inputStart!: DateSingleValue;
        let inputEnd!: DateSingleValue;
        if(!start && !end) {
            inputStart = null,
            inputEnd = null;
        } else if(start && !end) {
            inputStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        } else if(!start && end) {
            inputEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate())
        } else if (start && end) {
            inputStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            inputEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate())
        }
        this.dateRangeValue = {
            start: inputStart,
            end: inputEnd,
        }
        this.updateValue(this.dateRangeValue);
    }
    
    public override _setValue(pDate: SingleDate) {
        const dateValue = isRangeValue(this.value)
            ? this.value
            : [null, null];
        let [start, end] = dateValue;
        if (this.inputActive === 'start') {
            start = pDate;
        }
        if (this.inputActive === 'end') {
            end = pDate;
        }
        if (start && end && start.getTime() > end.getTime()) {
            [start, end] = [end, start];
        }
        this._service.value = [start, end];
    }
}