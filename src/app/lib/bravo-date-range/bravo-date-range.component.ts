import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { skip, Subject, takeUntil } from 'rxjs';
import { BravoControlDirective } from '../bravo-control-base';
import { BravoDateBaseComponent, BravoDatePopupComponent, BravoDateService, CompatibleDate, DateRangeValue, SingleDate } from '../bravo-date-base';
import { isRangeValue, normalizeDate } from '../bravo-date-base/bravo-date-base.utilities';



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
export class BravoDateRangeComponent extends BravoDateBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    public get isOpenDatePicker() {
        return this._service.isOpenDatePicker;
    }
    public get selectedValue() {
        return this._service.selectedMoment;
    }

    public override _dateValue!: DateRangeValue;
    public get dateValue() {
        return this._dateValue
    }
    public set dateValue(value: DateRangeValue) {
        this._dateValue = value;
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
                this._service.selectedMoment = {start: null, end: null}
            })
        this.rangePickerInput.forEach((item) => {
            this._focusMonitor.monitor(item)
            .pipe(takeUntil(this._destroy$))
            .subscribe(origin => {
                this.focusChange(origin);
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
    
    public ngOnDestroy() {
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
        const {start, end} = isRangeValue(pValue)
            ? pValue
            : {start: null, end: null};

        this.dateValue = {
            start: normalizeDate(start),
            end: normalizeDate(end),
        };
    }
    
    public override _setValue(pDate: SingleDate) {
        const dateValue = isRangeValue(this.selectedValue)
            ? this.selectedValue
            : {start: null, end: null};
        let {start, end} = dateValue;
        if (this.inputActive === 'start') {
            start = pDate;
        }
        if (this.inputActive === 'end') {
            end = pDate;
        }
        if (start && end && start.getTime() > end.getTime()) {
            [start, end] = [end, start];
        }
        this._service.selectedMoment = {start, end};
    }
}