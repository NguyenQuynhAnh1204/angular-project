import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Injector, ViewChild } from '@angular/core';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { DATE_TIME, IDate } from './bravo-control-date.type';
import { DatePickerComponent } from './bravo-date-picker';
import { OVERLAY_POSITION_MAP } from '../../shared';



@Component({
    selector: 'br-control-date',
    templateUrl: './bravo-control-date.component.html',
    styleUrls: ["./bravo-control-date.component.scss"],
    imports: [CommonModule]
})

export class BravoControlDateComponent extends BravoControlBaseComponent implements AfterViewInit {
    private _overlay = inject(Overlay);
    private _scrollOPt = inject(ScrollStrategyOptions);

    private _dateRef!: ElementRef;
    @ViewChild("dateBox", {static: true})
    public get dateRef() {
        return this._dateRef;
    }
    public set dateRef(pRef) {
        this._dateRef = pRef;
    }

    private _overlayRef!: OverlayRef;
    public get overlayRef() {
        return this._overlayRef;
    }
    public set overlayRef(pOver) {
        this._overlayRef = pOver;
    }

    private _selectTime = {
        day: 4,
        date: 1,
        month: 4,
        year: 2026
    };
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
    }

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;  // regex kiểm tra định dạng ngày/tháng/năm
        if(regex.test(value)) {
            console.log(value);
            this.updateValue(value);
        }
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
        const componentPortal = new ComponentPortal(DatePickerComponent, null, injector);
        this.overlayRef.attach(componentPortal); // gắn modal vào overlay
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    public convertDateToString(pDate: IDate): string {
        if(!pDate) return '';
        return `${this.selectTime.date}/${this.selectTime.month}/${this.selectTime.year}`
    }
}
