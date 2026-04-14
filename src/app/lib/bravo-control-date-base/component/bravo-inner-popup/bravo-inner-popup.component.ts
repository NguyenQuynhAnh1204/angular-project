import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BravoDropdownBaseModule } from "@bravo-infra/ui/bravo-dropdown-base";
import { Subject, takeUntil } from 'rxjs';
import { BravoDateService } from '../../bravo-control-date.service';
import { DateMode, PanelState, RangePartType } from '../../../bravo-date-box/bravo-control-date.type';
import { BravoDatePickerComponent } from '../bravo-date-picker';
import { BravoMonthPickerComponent } from '../bravo-month-picker';
import { BravoYearPickerComponent } from '../bravo-year-picker';


@Component({
    selector: 'br-date-header',
    template: `
        <div class="date-label">
            <span class="material-symbols-outlined icon-chevron"
                (click)="previous()"
            >chevron_left</span>

            <div class="label-content" (click)="changeMode()">
                {{label}}
            </div>

            <span class="material-symbols-outlined icon-chevron"
                (click)="next()"
            >chevron_right</span>
        </div>
    `,
    styleUrls: ["./bravo-inner-popup.component.scss"]
})

export class BravoDateHeaderComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get panelState() {
        return this._service.panels;
    }

    private _label!: string;
    public get label() {
        return this._label;
    }
    public set label(pValue) {
        this._label = pValue;
    }

    @Input('partType')
    public partType!: RangePartType;

    public ngOnInit() {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this._buildLabel(pVal[this.partType]);
        })
    }

    public ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public previous() {
        this._service.moveCalendar(-1, this.partType);
    }
    
    public next() { 
        this._service.moveCalendar(1, this.partType);
    }

    public changeMode() {
        this._service.changeMode(this.partType);
    }

    private _buildLabel(pPanel: PanelState) {
        const mode = pPanel.mode;
        const date = pPanel.date;
        switch(mode) {
            case 'date':
                this.label =   `Tháng ${date.getMonth()+1} năm ${date.getFullYear()}`;
                break;
            case 'month':
                this.label =   `Năm ${date.getFullYear()}`;
                break;
            case 'year':
                const start = Math.floor(date.getFullYear()/25) * 25;
                this.label =  `${start} - ${start+24}`;
                break
        }
    }
}

@Component({
    selector: 'br-inner-popup',
    templateUrl: './bravo-inner-popup.component.html',
    styleUrls: ["./bravo-inner-popup.component.scss"],
    imports: [BravoDatePickerComponent, BravoMonthPickerComponent, 
        BravoYearPickerComponent, BravoDropdownBaseModule, BravoDateHeaderComponent
    ]
})

export class BravoInnerPopupComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);    
    
    @Input('mode')
    public mode!: DateMode;
    
    @Input("partType")
    public partType: RangePartType = 'start';
    
    public ngOnInit(): void {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.mode = pVal[this.partType].mode;
        })
    }

    public ngOnDestroy(): void {
        this._destroy$.next()
        this._destroy$.complete();
    }
}





