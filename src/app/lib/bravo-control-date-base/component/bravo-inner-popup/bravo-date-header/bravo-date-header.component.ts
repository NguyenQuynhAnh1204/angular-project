import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BravoMoment } from '@bravo-infra/core/utils/dates';
import { BravoDateService } from '../../../bravo-control-date.service';
import { PanelState, RangePartType } from '../../../bravo-control-date.type';

@Component({
    selector: 'br-date-header',
    templateUrl: './bravo-date-header.component.html',
    styleUrls: ["./bravo-date-header.component.scss"]
})

export class BravoDateHeaderComponent implements OnInit, OnDestroy {
    private _destroy$ = new Subject<void>();
    private _service = inject(BravoDateService);
    public get panels() {
        return this._service.panels;
    }
    public get isRange() {
        return this._service.isRange;
    }
    public get mode() {
        return this._service.mode;
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
        this._moveCalendar(-1, this.partType);
    }
    
    public next() { 
        this._moveCalendar(1, this.partType);
    }

    public changeMode() {
        const panel = this.panels[this.partType];
        const mode = panel.mode;
        let newMode = this._switchMode();
        this._service.panels = {
        ...this.panels,
        [this.partType]: {
            ...panel,
            mode: newMode
        }
        };
    }

    private _buildLabel(pPanel: PanelState) {
        const mode = pPanel.mode;
        const date = pPanel.date;
        switch(mode) {
            case 'date':
                this.label = `Tháng ${date.getMonth()+1} năm ${date.getFullYear()}`;
                break;
            case 'month':
                this.label = `Năm ${date.getFullYear()}`;
                break;
            case 'year':
                const start = Math.floor(date.getFullYear()/25) * 25;
                this.label =  `${start} - ${start+24}`;
                break
        }
    }

    private _moveCalendar(pStep: number, pPanel: RangePartType) {
        const state = this.panels[pPanel]; // để lấy ra mode & date của input active
        const mode = state.mode; 
        const date = state.date; 
        let newDate = this._offsetDate(date, pStep);
        let newPanels = {
            ...this.panels,
            [pPanel]: {
                ...state,
                date: newDate
            }
        };
        if (this.isRange) {
            const offset = pPanel === 'start' ? 1 : -1;
            newPanels[pPanel === 'start' ? 'end' : 'start'] = {
                ...newPanels[pPanel === 'start' ? 'end' : 'start'],
                date: this._offsetDate(newDate, offset)
            };
        }
        this._service.panels = newPanels;
    }

    private _switchMode() {
        const partMode = this.panels[this.partType].mode;
        switch(this.mode) {
            case 'date':
                return partMode === "date" ? 'year' : 'date';
            case "month":
                return partMode === 'month' ? 'year' : 'month'
            case 'year':
                return 'year';
        }
    }

    private _offsetDate(date: BravoMoment, step: number) {
        switch (this.mode) {
            case 'date':
            return date.clone().addMonths(step);

            case 'month':
            return date.clone().addYears(step);

            case 'year':
            return date.clone().addYears(step * 25);
        }
    }
}
