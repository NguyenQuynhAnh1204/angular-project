import { Type } from "@angular/core";
import { BravoDateBoxComponent } from "../bravo-date-box";
import { BravoControlNumberComponent } from "../bravo-number-box";
import { BravoTextBoxComponent } from "../bravo-text-box";
import { EControlType } from "./bravo-control.type";
import { BravoDateRangeComponent } from "../bravo-date-range";

export const CONTROL_MAP:Partial<Record<EControlType, Type<any>>> = {
    [EControlType.TEXTBOX]: BravoTextBoxComponent,
    [EControlType.NUMBER]: BravoControlNumberComponent,
    [EControlType.DATE]: BravoDateBoxComponent,
    [EControlType.MONTH]: BravoDateBoxComponent,
    [EControlType.YEAR]: BravoDateBoxComponent,
    [EControlType.DATE_RANGE]: BravoDateRangeComponent,
    [EControlType.MONTH_RANGE]: BravoDateRangeComponent,
    [EControlType.YEAR_RANGE]: BravoDateRangeComponent,
};

export function selectControl(type?: EControlType): Type<any> {
  return CONTROL_MAP[type!] ?? BravoTextBoxComponent;
}