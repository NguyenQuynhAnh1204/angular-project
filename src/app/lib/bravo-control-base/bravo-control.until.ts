import { BravoColor, BravoFont, BravoPadding, BravoSingleDimension, BravoSize } from "../shared";
import { IFont, ISize, UnitType } from "./bravo-attribute.type";

const regex = /\d+|[a-zA-Z]+/g;
const unitType = ['px', "rem", "%", "em", 'vh', 'vw'];

export function singleDimension(pValue: string) {
    
    const arr = pValue.match(regex);
    if(arr) {
        let [value, unit] = arr;
        let dimension
        if(unit != 'px' && unit != 'rem' && unit != "%" && unit != "em") {
            dimension = new BravoSingleDimension(Number(value));
        }else {
            dimension = new BravoSingleDimension(Number(value), unit);
        }
        return dimension.toString();
    };
    return '';
}


export function paddingAttribute(pValue: string) {
    const arr = pValue.match(regex);
    let unit: UnitType = 'px';
    let arrValue;
    let top
    let right;
    let bottom;
    let left;
    if(!arr) return "";
    if(unitType.includes(arr[arr?.length - 1])) {
        arrValue = arr.filter(v => !isNaN(Number(v))).map(v => +v);
        unit = arr[arr.length - 1] as UnitType;
        
    } else {
        arrValue = arr.map(v => +v);
    }
    const len = arrValue.length;
    switch(len) {
        case 1:
            top = left = right = bottom = arrValue[0];
            break;
        case 2:
            top = bottom = arrValue[0];
            left = right = arrValue[1];
            break;
        case 3: 
            top = arrValue[0];
            right = left = arrValue[1];
            bottom = arrValue[2];
            break;
        case 4:
            top = arrValue[0];
            right = arrValue[1];
            bottom = arrValue[2];
            left = arrValue[3];
            break;
    }
    return new BravoPadding(left, top, right, bottom, unit).toString();

}

export function sizeAttribute(pValue: ISize) {
    let width = pValue.width;
    let height = pValue.height;
    let unitWidth = pValue.unitWidth as UnitType;
    let unitHeight = pValue.unitHeight as UnitType;
    const size =  new BravoSize(width, height, unitWidth, unitHeight);
    return {
        width: size.toWidth(),
        height: size.toHeight()
    }
}


export function fontAttribute(pValue: IFont) {
    let fontFamily = pValue.family;
    let fontSize = pValue.size;
    const font = new BravoFont(fontFamily, fontSize);
    return {
        family: font.fontFamily,
        size: `${font.size}${font.unit}`
    }
}


export function colorAttribute(pValue: string) {
    const color = new BravoColor(pValue);
    return color.toString();
} 

