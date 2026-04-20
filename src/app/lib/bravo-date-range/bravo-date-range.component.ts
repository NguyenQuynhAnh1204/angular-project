import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { skip, Subject, takeUntil } from 'rxjs';
import { BravoControlDirective } from '../bravo-control-base';
import { BravoDateControlComponent, BravoDatePopupComponent, BravoDateService, CompatibleDate, SingleDate } from '../bravo-control-date-base';
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

    public override updateValue(pVal: [string, string]) {
        this.textValue = `${pVal[0]}${pVal[1]}`;
        this.onChange(this.textValue);
    }

    public override _setInputValue(pValue: CompatibleDate) {
        const dateRange = Array.isArray(pValue) ? pValue : [null, null];
        const [start, end] = dateRange;
        const format = this.getFormat();
        if(!start && !end) this.inputValue = ['', ''];
        const inputStart = start?.format(format) ?? '';
        const inputEnd = end?.format(format) ?? '';
        if(!end) {
            this.inputValue = [inputStart , '']
        } else if(!start) {
            this.inputValue = ['', inputEnd]
        } else {
            this.inputValue = [inputStart, inputEnd]
        }
        this.updateValue(this.inputValue);
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