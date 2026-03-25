import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { HostColor } from '../shared/decorator/host-color.decorator';
import { HostDimension } from '../shared/decorator/host-dimension.decorator';
import { HostFont } from '../shared/decorator/host-font.decorator';
import { HostPadding } from '../shared/decorator/host-padding.decorator';
import { HostSize } from '../shared/decorator/host-size.decorator';
import { IFont, ISize } from './bravo-control-base.type';
import { colorAttribute, fontAttribute, paddingAttribute, singleDimension, sizeAttribute } from './bravo-control.until';

@Component({
    standalone: true,
    selector: 'bravo-control-base',
    template: '',
    imports: [CommonModule]
})

export class BravoControlBaseComponent implements ControlValueAccessor {

    constructor(private el: ElementRef) {}

    private _control!: AbstractControl;
    public get control() {
        return this._control;
    }
    public set control(pControl) {
        this._control = pControl;
    }

    public get errors() {
        return this.control.errors;
    }
    
    private _text = '';
    public get textValue() {
        return this._text;
    }
    public set textValue(pText) {
        this._text = pText;
    }

    public touched = false;
    private _focus!: boolean;
    public get focus() {
        return this._focus;
    }
    public set focus(pFocus) {
        this._focus = pFocus;
    }

    protected _label = 'Tex box';
    @Input('label')
    public get label() {
        return this._label;
    }
    public set label(pLabel) {
        this._label = pLabel;
    }

    // margin
    @HostPadding({transform: paddingAttribute})
    protected _margin!: string;
    @Input('margin')
    public get margin() {
        return this._margin;
    }
    public set margin(pMargin) {
        this._margin = pMargin;
    }

    // padding
    @HostPadding({transform: paddingAttribute})
    protected _padding!:string;
    @Input('padding')
    public get padding() {
        return this._padding;
    }
    public set padding(pPadding) {
        this._padding = pPadding;
    }

    // width
    @HostDimension({transform: singleDimension})
    protected _width!: string;
    @Input('width')
    public get width() {
        return this._width;
    }
    public set width(pWidth) {
        if(this.width == pWidth) return;
        this._width = pWidth;
    }

    // min width 
    @HostDimension({transform: singleDimension})
    protected _minWidth!: string;
    @Input('minWidth')
    public get minWidth() {
        return this._minWidth;
    }
    public set minWidth(pMinWidth) {
        if (this.minWidth == pMinWidth) return;
        this._minWidth = pMinWidth;
    }

    // max width
    @HostDimension({transform: singleDimension})
    protected _maxWidth!: string;
    @Input('maxWidth')
    public get maxWidth() {
        return this._maxWidth;
    }
    public set maxWidth(pMaxWidth) {
        if(this.maxWidth == pMaxWidth) return;
        this._maxWidth = pMaxWidth;
    }

    @HostDimension({transform: singleDimension})
    protected _height!: string;
    @Input('height')
    public get height() {
        return this._height;
    }
    public set height(pHeight) {
        if(this.height == pHeight) return;
        this._height = pHeight;
    }

    //min height
    @HostDimension({transform: singleDimension})
    protected _minHeight!: string;
    @Input('minHeight')
    public get minHeight() {
        return this._minHeight;
    }
    public set minHeight(pMinHeight) {
        if(this.minHeight == pMinHeight) return;
        this._minHeight = pMinHeight;
    }

    // max height
    @HostDimension({transform: singleDimension})
    protected _maxHeight!: string;
    @Input()
    public get maxHeight() {
        return this._maxHeight;
    }
    public set maxHeight(pMaxHeight) {
        if(this.maxHeight == pMaxHeight) return;
        this._maxHeight = pMaxHeight
    }

    @HostSize({transform: sizeAttribute})
    protected _size!: ISize;
    @Input()
    public get size() {
        return this._size;
    }
    public set size(pSize) {
        if(this.size == pSize) return ;
        this._size = pSize;
    }

    // min size
    @HostSize({transform: sizeAttribute})
    protected _minSize!: number | string;
    @Input('minSize')
    public get minSize() {
        return this._minSize;
    }
    public set minSize(pMinSize) {
        if(this.minSize == pMinSize) return;
        this._minSize = pMinSize;
    }

    // max size
    @HostSize({transform: sizeAttribute})
    protected _maxSize!: number | string;
    @Input('maxSize')
    public get maxSize() {
        return this._maxSize;
    }
    public set maxSize(pMaxSize) {
        if(this.maxSize == pMaxSize) return;
        this._maxSize = pMaxSize;
    }

    // border style
    protected _borderStyle!: string;
    @Input("borderStyle")
    public get borderStyle() {
        return this._borderStyle;
    }
    public set borderStyle(pBorderStyle) {
        this._borderStyle = pBorderStyle;
    }
    @HostBinding('style.border-style') 
    public get setupBorderStyle() {
        return this.borderStyle;
    }

    // border color
    @HostColor({transform: colorAttribute})
    protected _borderColor!: string;
    @Input('borderColor')
    public get borderColor() {
        return this._borderColor;
    }
    public set borderColor(pBorderColor) {
        this._borderColor = pBorderColor;
    }

    // border width 
    @HostDimension({transform: singleDimension})
    protected _borderWidth!:string;
    @Input('borderWidth')
    public get borderWidth() {
        return this._borderWidth;
    }
    public set borderWidth(pBorderWidth) {
        this._borderWidth = pBorderWidth;
    }

    // border radius
    @HostDimension({transform: singleDimension})
    protected _borderRadius!: string;
    @Input('borderRadius')
    public get borderRadius() {
        return this._borderRadius;
    }
    public set borderRadius(pRadius) {
        this._borderRadius = pRadius;
    }

    // font 
    @HostFont({transform: fontAttribute})
    protected _font!: IFont;
    @Input('font')
    public get font() {
        return this._font;
    }
    public set font(pFont) {
        this._font = pFont;
    }

    // font weight
    protected _fontWeight!: number | string;
    @Input('fontWeight')
    public get fontWeight() {
        return this._fontWeight;
    }
    public set fontWeight(pWeight) {
        this._fontWeight = pWeight;
    }
    @HostBinding('style.fontWeight') 
    public get setupFontWeight() {
        return this.fontWeight;
    }

    // background color
    @HostColor({transform : colorAttribute})
    protected _backgroundColor!: string;
    @Input('backColor')
    public get backColor() {
        return this._backgroundColor;
    }
    public set backColor(pColor) {
        this._backgroundColor = pColor;
    }

    // color
    @HostColor({transform : colorAttribute})
    protected _color!: string;
    @Input('color')
    public get color() {
        return this._color;
    }
    public set color(pColor) {
        this._color = pColor;
    }

    // read only 
    protected _readOnly!: boolean;
    @Input({transform: booleanAttribute})
    public get readOnly() {
        return this._readOnly;
    }
    public set readOnly(pVal) {
        this._readOnly = pVal;
    }

    public handleFocus() {
        this.focus = !this.focus;
    }

    public onChange = (pText: string) => {}
    public onTouched = () => {}
    
    public writeValue(pText: string) {
        this.textValue = pText;
    }

    public registerOnChange(pOnChange: any) {
        this.onChange = pOnChange;
    }
    
    public registerOnTouched(pOnTouched: any) {
        this.onTouched = pOnTouched;
    }

    public updateValue(pVal: string) {
        this.textValue = pVal;
        this.onChange(this.textValue);
        this._markAsTouched();
    }

    private _markAsTouched() {
        if(!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
    
}



