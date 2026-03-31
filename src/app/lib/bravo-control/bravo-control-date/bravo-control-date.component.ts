import { AfterViewInit, Component, ElementRef, forwardRef, inject, Injector, Type, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OVERLAY_POSITION_MAP } from '../../shared';
import { BravoControlBaseComponent, ESelectDateTime } from '../bravo-control-base';
import { BravoControlDirective } from '../bravo-control-directive';
import { DATE_TIME, IDateTime } from './bravo-control-date.type';
import { BravoDatePickerComponent } from './bravo-date-picker';
import { BravoMonthPickerComponent } from './bravo-month-picker';
import { BravoYearPickerComponent } from './bravo-year-picker';

const REGEX_DATE = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;   // regex kiểm tra định dạng ngày/tháng/năm
const REGEX_MONTH = /^(0?[1-9]|1[0-2])\/\d{4}$/;                             // regex kiểm tra định dạng tháng/năm
const REGEX_YEAR = /^\d{4}$/;                                                // regex kiểm tra định dạng năm

@Component({
    selector: 'br-control-date',
    templateUrl: './bravo-control-date.component.html',
    styleUrls: ["./bravo-control-date.component.scss"],
    imports: [CommonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoControlDateComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoControlDateComponent),
            multi: true
        }
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }]
})

export class BravoControlDateComponent extends BravoControlBaseComponent implements AfterViewInit {
    private _overlay = inject(Overlay);
    private _scrollOPt = inject(ScrollStrategyOptions);

    private _timeType!: ESelectDateTime;
    public get timeType() {
        return this._timeType;
    }
    public set timeType(pVal) {
        this._timeType = pVal;
    }
    

    private _dateRef!: ElementRef;
    @ViewChild("dateBox", {static: true})
    public get dateRef() {
        return this._dateRef;
    }
    public set dateRef(pRef) {
        this._dateRef = pRef;
    }

    private _modalComponent!: Type<any>;
    public get modalComponent() {
        return this._modalComponent;
    }
    public set modalComponent(pCompo) {
        this._modalComponent = pCompo;
    }

    private _overlayRef!: OverlayRef;
    public get overlayRef() {
        return this._overlayRef;
    }
    public set overlayRef(pOver) {
        this._overlayRef = pOver;
    }

    private _selectTime!: IDateTime;
    public get selectTime() {
        return this._selectTime;
    }
    public set selectTime(pSelectTime) {
        this._selectTime = pSelectTime; 
    }

    public ngAfterViewInit() {
        if(this.selectTime) {
            setTimeout(() => {
                this.textValue = this.convertDateToString(this.selectTime);
            });
        }
        this.modalComponent = selectComponent(this.timeType);
    }

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }

    override handleFocus() {
        super.handleFocus();
        if(!this.focus) return;
        // config overlay
        const configOverlay = {
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this.dateRef)
                .withPositions([OVERLAY_POSITION_MAP['bottomLeft']]),
            scrollStrategy: this._scrollOPt.reposition(),
        } 
        this.overlayRef = this._overlay.create(configOverlay);
        // injector 
        const injector = Injector.create({
            providers: [
                {
                    provide: OverlayRef,
                    useValue: this.overlayRef
                },
                {
                    provide: DATE_TIME,
                    useValue: this.selectTime
                }
            ]
        })
        // tạo modal
        const componentPortal = new ComponentPortal(this.modalComponent, null, injector);
        this.overlayRef.attach(componentPortal); // gắn modal vào overlay
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach()); 
    }

    private _isValidDate() {

    }

    public convertDateToString(pDate: IDateTime): string {
        if(!pDate) return '';
        return `${this.selectTime.date}/${this.selectTime.month}/${this.selectTime.year}`
    }
}


function selectComponent(pType: ESelectDateTime) {
    switch(pType) {
        case ESelectDateTime.DATE:
            return BravoDatePickerComponent;
        case ESelectDateTime.MONTH:
            return BravoMonthPickerComponent;
        case ESelectDateTime.YEAR:
            return BravoYearPickerComponent;
        default:
            return BravoDatePickerComponent;
    }
}