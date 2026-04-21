import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlDirective } from '../bravo-control-base';
import { BravoDateBaseComponent, BravoDatePopupComponent, BravoDateService, CompatibleDate, DateSingleValue, SingleDate } from '../bravo-date-base';
import { normalizeDate } from '../bravo-date-base/bravo-date-base.utilities';


@Component({
    selector: 'br-date-box',
    templateUrl: './bravo-date-box.component.html',
    styleUrls: ["./bravo-date-box.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDatePopupComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoDateBoxComponent),
            multi: true
        },
        BravoDateService,
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }, {
        directive: BravoDropdownAnchorDirective
    }],
})
export class BravoDateBoxComponent extends BravoDateBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    public get isOpenDatePicker() {
        return this._service.isOpenDatePicker;
    }

    public override _dateValue!: DateSingleValue;
    public get dateValue() {
        return this._dateValue;
    }
    public set dateValue(pDate) {
        this._dateValue = pDate;
    }

    @ViewChild('pickerInput', {static: true})
    public pickerInput!: ElementRef<HTMLInputElement>;

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
            this._service.selectedMoment = null;
        })
        this._focusMonitor.monitor(this.pickerInput)
            .pipe(takeUntil(this._destroy$))
            .subscribe(origin => {
                this.focusChange(origin);
            });
    }

    public ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.pickerInput);
        this._destroy$.next();
        this._destroy$.complete();
    }
    
    public override showDatePicker(pEvent: MouseEvent) {
        this._focusMonitor.focusVia(
            this.pickerInput,
            'program'
        );
        super.showDatePicker(pEvent);
    }
    
    public override _setInputValue(pValue: CompatibleDate) {
        const value = pValue as SingleDate;
        if(!value) {
            this.dateValue = null; 
        } else {
            const date = normalizeDate(value);
            this.dateValue = date;
        }
    }

    public override _setValue(pDate: SingleDate) {
        this._service.selectedMoment = pDate;
    }
}

