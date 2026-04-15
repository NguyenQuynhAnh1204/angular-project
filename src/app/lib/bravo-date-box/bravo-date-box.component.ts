import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDropdownAnchorDirective, BravoDropdownBaseModule } from '@bravo-infra/ui/bravo-dropdown-base';
import { Subject, takeUntil } from 'rxjs';
import { BravoControlDirective } from '../bravo-control-base';
import { BravoDateControlComponent, BravoDatePopupComponent, BravoDateService } from '../bravo-control-date-base';
import { CompatibleDate, SingleDate } from '../bravo-control-date-base/bravo-control-date.type';



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
export class BravoDateBoxComponent extends BravoDateControlComponent implements OnInit, AfterViewInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    public get isOpenDatePicker() {
        return this._service.isOpenDatePicker;
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
        this.pickerInput?.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this))
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    
    public override onFocus(pEvent: FocusEvent) {
        this._service.inputActive = 'start'
    }
    
    public override updateValue(pVal: string) {
        this.textValue = pVal;
        this.pickerInput.nativeElement.value = pVal;
    }
    
    public override _setInputValue(pValue: CompatibleDate) {
        const value = pValue as SingleDate;
        if(!value) {
            this.inputValue = ''
        } else {
            this.inputValue = `${value?.format('dd/MM/yyyy')}`;
        }
        this.updateValue(this.inputValue);
        return;
    }

    public override _setValue(pVal: string) {
        const parseDate = BravoMoment.parseDate(pVal, 'dd/MM/yyyy');
        const date = new BravoMoment(parseDate);
        this._service.value = date;
    }
}

