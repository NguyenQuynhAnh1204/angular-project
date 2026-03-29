import { IControlBase } from "../bravo-control";

export enum EGridSizeType {
    ABSOLUTE = 1,
    AUTOSIZE,
    PERCENT
}


export interface IGridPanel {
    index: number,
    value: string,
    size?: EGridSizeType
}

export interface IGridControl {
    control: IControlBase,
    child?: ITablePanel
}


export interface ITablePanel {
    gap?: number;
    rows: IGridPanel[],
    columns: IGridPanel[],
    controls: IGridControl[]
}

