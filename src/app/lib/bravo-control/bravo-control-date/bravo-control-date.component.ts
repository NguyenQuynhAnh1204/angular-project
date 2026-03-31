import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, inject, Injector, OnDestroy, Type, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OVERLAY_POSITION_MAP } from '../../shared';
import { BravoControlBaseComponent, ESelectDateTime } from '../bravo-control-base';
import { BravoControlDirective } from '../bravo-control-directive';
import { IDateTime, SELECT_TIME } from './bravo-control-date.type';
import { BravoDatePickerComponent } from './bravo-date-picker';
import { BravoMonthPickerComponent } from './bravo-month-picker';
import { BravoYearPickerComponent } from './bravo-year-picker';
import { Subject, takeUntil } from 'rxjs';
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

export class BravoControlDateComponent extends BravoControlBaseComponent implements AfterViewInit, OnDestroy {
    private _overlay = inject(Overlay);
    private _scrollOPt = inject(ScrollStrategyOptions);
    private _destroy$ = new Subject<void>();

    private _timeType!: ESelectDateTime;
    public get timeType() {
        return this._timeType;
    }
    public set timeType(pVal) {
        this._timeType = pVal;
    }

    private _selectTime!:string;
    public get selectTime() {
        return this._selectTime;
    }
    public set selectTime(pTime) {
        this._selectTime = pTime;
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
    public get datePickerComponent() {
        return this._modalComponent;
    }
    public set datePickerComponent(pCompo) {
        this._modalComponent = pCompo;
    }

    private _overlayRef!: OverlayRef;
    public get overlayRef() {
        return this._overlayRef;
    }
    public set overlayRef(pOver) {
        this._overlayRef = pOver;
    }

    public ngAfterViewInit() {
        this.datePickerComponent = selectComponent(this.timeType);
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
        this.selectTime = value;
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
                    provide: SELECT_TIME,
                    useValue: this.selectTime
                }
            ]
        })
        // tạo date picker
        const componentPortal = new ComponentPortal(this.datePickerComponent, null, injector);
        const componentRef = this.overlayRef.attach(componentPortal); // gắn datePicker vào overlay
        componentRef.instance.select$
            .pipe(takeUntil(this._destroy$))
            .subscribe((val: any) => {
                this.updateValue(val);
                this.selectTime = val;
            });
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach()); 
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