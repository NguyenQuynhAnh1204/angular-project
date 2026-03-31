import { Type } from "@angular/core";
import { EControlType } from "./bravo-control.type";
import { BravoTextBoxComponent } from "../bravo-text-box";
import { BravoControlDateComponent } from "../bravo-date-box";
import { BravoControlNumberComponent } from "../bravo-number-box";

export const CONTROL_MAP:Partial<Record<EControlType, Type<any>>> = {
    [EControlType.TEXTBOX]: BravoTextBoxComponent,
    [EControlType.NUMBER]: BravoControlNumberComponent,
    [EControlType.DATE]: BravoControlDateComponent,
};

export function selectControl(type?: EControlType): Type<any> {
  return CONTROL_MAP[type!] ?? BravoTextBoxComponent;
}