import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { BravoDateContainerComponent } from './component';
import { BravoDateService } from './service';
import { RangePartType } from './bravo-control-date.type';


@Component({
    selector: 'br-date-box',
    templateUrl: './bravo-date-box.component.html',
    styleUrls: ["./bravo-date-box.component.scss"],
    imports: [CommonModule, BravoDropdownBaseModule, BravoDateContainerComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoDateBoxComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
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
export class BravoDateBoxComponent extends BravoControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get isOpenDate() {
        return this._service.isOpenDatePicker;
    }

    // private _isRange!: boolean;
    private _isRange = true;
    public get isRange() {
        return this._isRange;
    } 
    public set isRange(pVal) {
        this._isRange = pVal;
    }

    @ViewChild('pickerInput')
    public pickerInput?: ElementRef<HTMLInputElement>;
    @ViewChildren('rangePickerInput')
    public rangePickerInput?: QueryList<ElementRef<HTMLInputElement>>

    ngOnInit() {
        this._service.isOpenDatePickerChange$
            .pipe(takeUntil(this._destroy$))
            .subscribe((pVal) => {
                if(pVal == true) {
                    this.handleFocus()
                } else {
                    this.handleBlur()
                }
                // this.updateValue(this._service?.selectDate?.format())
            })
    }

    public ngAfterViewInit(): void {
        this.pickerInput?.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this))
        this.rangePickerInput?.forEach((item) => {
            item?.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this))
        })
    }


    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    // public handleOnChange(pEvent: Event) {
    //     const input = pEvent.target as HTMLInputElement;
    //     const value = input.value;
    //     this.textValue = value;
    //     if (this._validateInputDate(value)) {
    //         this.updateValue(this.textValue);
    //         this._service.selectDate = new BravoMoment(BravoMoment.parseDate(value, 'dd/MM/yyyy'));
    //     } else {
    //         this.updateValue('');
    //     }
    // }
    
    public onClickInputBox(pEvent: MouseEvent) {
        console.log('click');
        pEvent.stopPropagation();
        this.handleFocus();
    }
    
    public onKeyupEnter(pEvent: Event) {
        this.onInputChange(pEvent);
    }
    
    public onInputChange(pEvent: Event, pEnter?: boolean) {
        const date = (pEvent.target as HTMLInputElement).value; 
        const valid = this._validateInputDate(date);
        if (valid) {
            this.updateValue(date)
            // this._service.selectDate = new BravoMoment(date);
        } else {
            this.updateValue('')
        }
    }

    public onFocus(pEvent: FocusEvent, partType?: RangePartType) {
        pEvent.preventDefault();
        if(partType) {
            this._service.inputActive = partType;
        }
        // this.updateValue(this._service.selectDate.format())
    }

    public onFocusOut(pEvent: FocusEvent) {
        pEvent.preventDefault();
        this.onTouched();
        this.focus = false;
    }

    private _validateInputDate(pValue: string) {
        const date = new BravoMoment(pValue)
        return date.isValid();
    }


    public showDatePicker() {
        this._service.showDatePicker();
    }

    public hideDatePicker() {
        this._service.hideDatePicker();
    }

    public handleOnClear() {
        this.updateValue('');
        this._service.clearSelectDate();
    }

    public getPlaceholder(partType?: RangePartType) {
        return partType ? partType == 'start' ? 'Start date' : 'End date' : 'Date'
    }
}

