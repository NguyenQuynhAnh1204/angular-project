/* eslint-disable max-params */
// import { DEFAULT_UNIT, UnitType } from '../definition';


/**
 * @see : [README.md](./README.md)
 */

const DEFAULT_UNIT = 'rem';
type UnitType = 'px' | "rem" | "%" | 'em';

export class BravoRadius {
    static #Unset: BravoRadius = null!;
    public static get Unset() {
        if (!this.#Unset) this.#Unset = new BravoRadius(-999, -999, -999, -999, DEFAULT_UNIT);
        return this.#Unset;
    }

    public unit: UnitType = DEFAULT_UNIT;

    public get isUnset() {
        return this.equals(BravoRadius.Unset);
    }

    #topLeft = 0;
    #topRight = 0;
    #bottomRight = 0;
    #bottomLeft = 0;

    constructor(pTopLeft = 0, pTopRight = 0, pBottomRight = 0, pBottomLeft = 0, pUnit: UnitType = DEFAULT_UNIT) {
        this.topLeft = pTopLeft;
        this.topRight = pTopRight;
        this.bottomRight = pBottomRight;
        this.bottomLeft = pBottomLeft;
        this.unit = pUnit;
    }

    public get topLeft(): number {
        return this.#topLeft;
    }

    public set topLeft(pValue: number) {
        this.#topLeft = pValue;
    }

    public get topRight(): number {
        return this.#topRight;
    }

    public set topRight(pValue: number) {
        this.#topRight = pValue;
    }

    public get bottomRight(): number {
        return this.#bottomRight;
    }

    public set bottomRight(pValue: number) {
        this.#bottomRight = pValue;
    }

    public get bottomLeft(): number {
        return this.#bottomLeft;
    }

    public set bottomLeft(pValue: number) {
        this.#bottomLeft = pValue;
    }

    public equals(pRadius: BravoRadius): boolean {
        return (
            pRadius instanceof BravoRadius &&
            this.topLeft === pRadius.topLeft &&
            this.topRight === pRadius.topRight &&
            this.bottomRight === pRadius.bottomRight &&
            this.bottomLeft === pRadius.bottomLeft
        );
    }

    public clone(): BravoRadius {
        return new BravoRadius(this.topLeft, this.topRight, this.bottomRight, this.bottomLeft, this.unit);
    }

    public get hasValue(): boolean {
        return this.topLeft !== 0 || this.topRight !== 0 || this.bottomRight !== 0 || this.bottomLeft !== 0;
    }

    public isSelfEmpty(): boolean {
        return this.topLeft === 0 && this.topRight === 0 && this.bottomRight === 0 && this.bottomLeft === 0;
    }

    public toString(): string {
        return `${this.topLeft}${this.unit} ${this.topRight}${this.unit} ${this.bottomRight}${this.unit} ${this.bottomLeft}${this.unit}`;
    }

    public static get empty(): BravoRadius {
        return new BravoRadius(0, 0, 0, 0, DEFAULT_UNIT);
    }
}
