

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


export interface IControlBase {
        column: number,
        row: number, 
        label: string,
        gridSpan?: number,
        style?: {
            margin?: string,
            padding?: string,
            width?: string,
            minWidth?: string,
            maxWidth?: string,
            height?: string,
            minHeight?:string,
            maxHeight?: string,
            size?: ISize,
            borderStyle?: string,
            borderColor?: string,
            borderWidth?: string,
            borderRadius?: string,
            font?: IFont,
            backColor?: string,
            color?: string,
        }
}
