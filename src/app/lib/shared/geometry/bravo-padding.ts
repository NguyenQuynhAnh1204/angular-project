// import { DEFAULT_UNIT, UnitType } from '../definition';

/**
 * @see : [README.md](./README.md)
 */

const DEFAULT_UNIT = 'rem';
type UnitType = 'px' | "rem" | "%" | 'em';

export class BravoPadding {
    static #Unset: BravoPadding = null!;
    public static get Unset() {
        if (!this.#Unset) this.#Unset = new BravoPadding(-999, -999, -999, -999, DEFAULT_UNIT);
        return this.#Unset;
    }

    public unit: UnitType = DEFAULT_UNIT;
    public get isUnset() {
        return this.equals(BravoPadding.Unset);
    }

    //*top
    #top = 0;
    public get top() {
        return this.#top;
    }
    public set top(pValue) {
        this.#top = pValue;
    }

    //*right
    #right = 0;
    public get right() {
        return this.#right;
    }
    public set right(pValue) {
        this.#right = pValue;
    }

    //*bottom
    #bottom = 0;
    public get bottom() {
        return this.#bottom;
    }
    public set bottom(pValue) {
        this.#bottom = pValue;
    }

    //*left
    #left = 0;
    public get left() {
        return this.#left;
    }
    public set left(pValue) {
        this.#left = pValue;
    }

    constructor(pLeft = 0, pTop = 0, pRight = 0, pBottom = 0, pUnit: UnitType = DEFAULT_UNIT) {
        this.top = pTop;
        this.right = pRight;
        this.bottom = pBottom;
        this.left = pLeft;
        this.unit = pUnit;
    }

    public equals(pad: BravoPadding): boolean {
        return (
            pad instanceof BravoPadding &&
            this.top == pad.top &&
            this.right == pad.right &&
            this.bottom == pad.bottom &&
            this.left == pad.left
        );
    }

    public clone(): BravoPadding {
        return new BravoPadding(this.left, this.top, this.right, this.bottom, this.unit);
    }


    // tính tổng padding theo chiều ngang.
    public get vertical(): number {
        if (this.isUnset) return 0;
        return this.top + this.bottom;
    }

    public get verticalCss() {
        if (this.isUnset) return `0${this.unit}`;
        return `${this.vertical}${this.unit}`;
    }

    // tính tổng paddign he chiều cao.
    public get horizontal(): number {
        if (this.isUnset) return 0;
        return this.left + this.right;
    }

    public get horizontalCss() {
        if (this.isUnset) return `0${this.unit}`;
        return `${this.horizontal}${this.unit}`;
    }

    public get hasValue(): boolean {
        if (this.isUnset) return false;
        return this.top != 0 || this.bottom != 0 || this.left != 0 || this.right != 0;
    }

    public static get empty(): BravoPadding {
        return new BravoPadding(0, 0, 0, 0);
    }

    public isSelfEmpty() {
        if (this.top === 0 && this.bottom === 0 && this.left === 0 && this.right === 0) return true;
        else return false;
    }

    public toString() {
        return `${this.top}${this.unit} ${this.right}${this.unit} ${this.bottom}${this.unit} ${this.left}${this.unit}`;
    }
}
