import { IFont, ISize } from "../bravo-control-base/bravo-attribute.type";



export interface IConfigLayOut {
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
        },
        child?: IConfigLayOut[]
}