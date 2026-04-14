import { Type } from "@angular/core";
import { BravoDateBoxComponent } from "../bravo-date-box";
import { BravoControlNumberComponent } from "../bravo-number-box";
import { BravoTextBoxComponent } from "../bravo-text-box";
import { EControlType } from "./bravo-control.type";

export const CONTROL_MAP:Partial<Record<EControlType, Type<any>>> = {
    [EControlType.TEXTBOX]: BravoTextBoxComponent,
    [EControlType.NUMBER]: BravoControlNumberComponent,
    [EControlType.DATE]: BravoDateBoxComponent,
    [EControlType.DATE_RANGE]: BravoDateBoxComponent,
};

export function selectControl(type?: EControlType): Type<any> {
  return CONTROL_MAP[type!] ?? BravoTextBoxComponent;
}