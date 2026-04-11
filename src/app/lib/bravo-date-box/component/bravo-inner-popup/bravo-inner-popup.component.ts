import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDropdownBaseModule } from "@bravo-infra/ui/bravo-dropdown-base";
import { DateMode, PanelState, RangePartType } from '../../bravo-control-date.type';
import { BravoDateSingleService } from '../../service';
import { BravoDatePickerComponent } from '../bravo-date-picker';
import { BravoMonthPickerComponent } from '../bravo-month-picker';
import { BravoYearPickerComponent } from '../bravo-year-picker';
import { Subject, takeUntil } from 'rxjs';


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

export class BravoDateHeaderComponent {
    private _service = inject(BravoDateSingleService);
    public get panelState() {
        return this._service.panels;
    }

    public get label() {
        return this._buildLabel()
    }

    @Input('partType')
    public partType!: RangePartType;
    
    public previous() {
        this._service.moveCalendar(-1, this.partType);
    }
    
    public next() { 
        this._service.moveCalendar(1, this.partType);
    }

    public changeMode() {
        this._service.changeMode(this.partType);
    }

    private _buildLabel() {
        const panel = this._service.panels[this.partType];
        const mode = panel.mode;
        const date = panel.date;
        switch(mode) {
            case 'date':
                return  `Tháng ${date.getMonth()+1} năm ${date.getFullYear()}`;
            case 'month':
                return  `Năm ${date.getFullYear()}`;
            case 'year':
                const start = Math.floor(date.getFullYear()/25) * 25;
                return `${start} - ${start+24}`;
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
    private _service = inject(BravoDateSingleService);    

    private _date!: BravoMoment;
    public get date() {
        return this._date;
    }
    public set date(pDate) {
        this._date = pDate;
    }
    
    @Input('mode')
    public mode!: DateMode;
    
    @Input("partType")
    public partType: RangePartType = 'start';
    
    public ngOnInit(): void {
        this._service.panelsChange$
        .pipe(takeUntil(this._destroy$))
        .subscribe((pVal) => {
            this.mode = pVal[this.partType].mode;
            this.date =  pVal[this.partType].date;
        })
    }

    public ngOnDestroy(): void {
        this._destroy$.next()
        this._destroy$.complete();
    }
}





