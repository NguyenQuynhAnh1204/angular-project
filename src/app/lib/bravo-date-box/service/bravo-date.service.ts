import { Injectable } from '@angular/core';
import { EViewPicker } from '../bravo-control-date.type';
import { BravoMoment } from '../bravo-control-date.until';
import { Subject } from 'rxjs';

@Injectable()
export class BravoDateService {
    public _moment = new BravoMoment();
    public get moment() {
        return this._moment;
    }
    public set moment(pVal) {
        this._moment = pVal;
    }

    private _view: EViewPicker = EViewPicker.PICKER_DATE;
    public get view() {
        return this._view;
    }
    public set view(pValue) {
        this._view = pValue;
    }

    // đổi picker
    public switchView(pView: EViewPicker) {
       this.view = pView;
    }
}