import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'level-control',
    templateUrl: './level-control.component.html',
    styleUrls: ["./level-control.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: LevelControlComponent,
            multi: true
        }
    ],
    imports: [CommonModule]
})

export class LevelControlComponent implements ControlValueAccessor {

    private _level: number[] = [];
    @Input('level')
    public get level() {
        return this._level;
    }
    public set level(pLevel) {
        this._level = pLevel;
    }

    private _levelValue!: number;
    public get levelValue() {
        return this._levelValue;
    }
    public set levelValue(pLevel: number) {
        this._levelValue = pLevel;
    }

    public onChange = (pLevel: number) => {}
    public onTouched = () => {}

    public handleOnChange(pLevelIndex: number) {
        this.levelValue = this.level[pLevelIndex];
        this.onChange(this.levelValue);
    }

    public writeValue(pLevel: number) {
        this.levelValue = pLevel;
    }

    public registerOnChange(pOnchange: any) {
        this.onChange = pOnchange;
    }

    public registerOnTouched(pOnTouched: any) {
        this.onTouched = pOnTouched;
    }
    
    public setDisabledState(isDisabled: boolean) {

    }
}