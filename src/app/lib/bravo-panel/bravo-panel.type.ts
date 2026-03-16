import { IControlBase } from "../bravo-control-base/bravo-control-base.type"


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
    rows: IGridPanel[],
    columns: IGridPanel[],
    controls: IGridControl[]
}

