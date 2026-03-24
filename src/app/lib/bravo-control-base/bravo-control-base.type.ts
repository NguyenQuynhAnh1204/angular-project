

export type UnitType = 'px' | "rem" | "%" | 'em';

export type ControlType = 'textbox' | 'email' | 'number' | 'select' | 'checkbox' | 'date' | 'textarea';

export enum ETypeValidation {
    REQUIRED,
    NUMBER,
}

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


export interface IValidation {
    type: ETypeValidation;
    value?: any;
    message?: string;
}

export interface IControlBase {
    column: number,
    columnsSpan?: number,
    row: number, 
    rowsSpan?: number,
    type?: ControlType,
    name?: string,
    label: string,
    value?: any,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    validator?: IValidation[] |IValidation
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
