import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateRangeService } from './bravo-date-range.service';
import { BravoDateRangeContainerComponent } from './component';
import { BravoMoment } from '@bravo-infra/core/utils/dates';


@Component({
    selector: 'br-date-range',
    templateUrl: './bravo-date-range.component.html',
    styleUrls: ["./bravo-date-range.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDateRangeContainerComponent],
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
        BravoDateRangeService
        
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
export class BravoDateRangeComponent extends BravoControlBaseComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateRangeService);
    public get isOpenPicker() {
        return this._service.isOpenDatePicker;
    }
    public get editDate() {
        return this._service.editDate;
    }

    public startDate = '';
    public endDate = '';

    @ViewChild('startDateInput', {static: true})
    public startDateEl!: ElementRef<HTMLInputElement>;

    @ViewChild('endDateInput', {static: true})
    public endDateEl!: ElementRef<HTMLInputElement>;

    public ngOnInit() {        
        this._service.selectedStartDateChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.startDate = pVal?.format() ?? '';
                this.updateValue(`${this.startDate}${this.endDate}`)
                if(pVal && !this._service.selectedEndDate) {
                    this.endDateEl.nativeElement.focus();
                }
            })
        this._service.selectedEndDateChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                this.endDate = pVal?.format() ?? '';
                this.updateValue(`${this.startDate}${this.endDate}`)
                if(pVal && !this._service.selectedStartDate) {
                    this.startDateEl.nativeElement.focus();
                }
            })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleOnChange(pTime: 'start' | 'end', pEvent: Event) {
        this._service.editDate = pTime;
        const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/; // dd/mm/yyyy
        const input = pEvent.target as HTMLInputElement;
        const value = input.value;
        this.textValue = value;
        if(regexDate.test(value)) {
            this._service.selectDate(new BravoMoment(BravoMoment.parseDate(value, 'dd/MM/yyyy')))
        } else {
            this._service.selectDate(undefined);
        }
    }

    public handleOnFocusInput(pTime: 'start'|'end', pEl: HTMLInputElement) {
        pEl.focus();
        this.focus = true;
        this._service.editDate = pTime;
    }
    
    public handleOnBlurInput(pTime: 'start'|'end', pEL: HTMLInputElement) {
        pEL.blur();
        this.focus = false;
    }

    public showDatePicker() {
        this.focus = true;
        this._service.showDatePicker();
    }

    public hideDatePicker() {
        this.focus = false;
        this._service.hideDatePicker();
    }

    public clearSelectDate() {
        this.focus = false;
        this._service.clear();
    }
}