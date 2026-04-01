import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { BravoControlBaseComponent, BravoControlDirective } from '../bravo-control-base';
import { OVERLAY_POSITION_MAP } from '../shared';
import { BravoDateContainerComponent } from './component';
import { BravoDateService } from './service';

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
        },
        BravoDateService,
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }]
})

export class BravoControlDateComponent extends BravoControlBaseComponent implements OnDestroy {
    private _destroy$ = new Subject<void>();
    private _injector = inject(Injector);
    private _overlay = inject(Overlay);
    private _scrollOpt = inject(ScrollStrategyOptions);
    private _service = inject(BravoDateService);
    public get service() {
        return this._service;
    }
    public get moment() {
        return this.service.moment;
    }
    
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

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
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
            scrollStrategy: this._scrollOpt.reposition(),
        } 
        this.overlayRef = this._overlay.create(configOverlay);
        // injector 
        const injector = Injector.create({
            providers: [
                {
                    provide: OverlayRef,
                    useValue: this.overlayRef
                }
            ],
            parent: this._injector
        })
        // tạo date picker
        const componentPortal = new ComponentPortal(BravoDateContainerComponent, null, injector);
        this.overlayRef.attach(componentPortal); // gắn datePicker vào overlay
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detach()
            this.focus = false;
        }); 
    }

    public openCalendar() {
        this.handleFocus();
    }

}

