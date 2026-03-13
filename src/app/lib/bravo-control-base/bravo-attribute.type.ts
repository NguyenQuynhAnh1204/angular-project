

export type UnitType = 'px' | "rem" | "%" | 'em';

export interface ISize {
    width: number;
    height: number;
    unitWidth: string;
    unitHeight?: string;
}

export interface IFont {
    family: string;
    size: number;
}