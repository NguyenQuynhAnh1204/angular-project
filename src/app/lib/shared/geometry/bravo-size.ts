// import { DEFAULT_UNIT, UnitType } from '../definition';

/**
 * @see : [README.md](./README.md)
 */

const DEFAULT_UNIT = 'px';
type UnitType = 'px' | "rem" | "%" | 'em';

export class BravoSingleDimension {
    static #Unset: BravoSingleDimension = null!;
    public static get Unset() {
        if (!this.#Unset) this.#Unset = new BravoSingleDimension(-999, DEFAULT_UNIT);
        return this.#Unset;
    }

    static #Initial: BravoSingleDimension = null!;
    public static get Initial() {
        if (!this.#Initial) this.#Initial = new BravoSingleDimension(-1, DEFAULT_UNIT);
        return this.#Initial;
    }

    public value: number;
    public unit: UnitType = DEFAULT_UNIT;

    constructor(pValue = 0, pUnit: UnitType = DEFAULT_UNIT) {
        this.value = pValue;
        this.unit = pUnit;
    }

    public equals(pOther: BravoSingleDimension): boolean {
        return pOther instanceof BravoSingleDimension && this.value === pOther.value && this.unit === pOther.unit;
    }
    public toString(): string {
        return this.isUnset || this.isInitial ? '' : `${this.value}${this.unit}`;
    }

    public clone(): BravoSingleDimension {
        return new BravoSingleDimension(this.value, this.unit);
    }
    public get isUnset(): boolean {
        return BravoSingleDimension.Unset.equals(this) || this.value === -999;
    }
    public get isInitial(): boolean {
        return BravoSingleDimension.Initial.equals(this) || this.value === -1;
    }
    public get isEmpty(): boolean {
        return this.isUnset || this.isInitial;
    }
}

/**
 * Class that represents a size (with width and height).
 * @see : [README.md](./README.md)
 */
export class BravoSize {
    public static readonly Unset = new BravoSize(-999, -999, DEFAULT_UNIT);
    public static readonly Initial = new BravoSize(-1, -1, DEFAULT_UNIT);

    public unitWidth: UnitType = DEFAULT_UNIT;
    public unitHeight: UnitType = DEFAULT_UNIT;

    /**
     * Gets or sets the width of this @see:Size.
     */
    public width: number;
    /**
     * Gets or sets the height of this @see:Size.
     */
    public height: number;
    /**
     * Initializes a new instance of the @see:Size class.
     *
     * @param pWidth Width of the new @see:Size.
     * @param pHeight Height of the new @see:Size.
     */
    constructor(pWidth = 0, pHeight = 0, pUnitWidth: UnitType = DEFAULT_UNIT, pUnitHeight?: UnitType) {
        this.width = asNumber(pWidth);
        this.height = asNumber(pHeight);
        this.unitWidth = pUnitWidth;
        this.unitHeight = pUnitHeight || pUnitWidth;
    }
    /**
     * Returns true if a @see:Size has the same dimensions as this @see:Size.
     *
     * @param pSize @see:Size to compare to this @see:Size.
     */
    public equals(pSize: BravoSize): boolean {
        return pSize instanceof BravoSize && this.width == pSize.width && this.height == pSize.height;
    }
    /**
     * Creates a copy of this @see:Size.
     */
    public clone(): BravoSize {
        return new BravoSize(this.width, this.height, this.unitWidth, this.unitHeight);
    }

    public toWidth() {
        if (this.width < 0) return 'initial';
        return `${this.width}${this.unitWidth}`;
    }

    public toHeight() {
        if (this.height < 0) return 'initial';
        return `${this.height}${this.unitHeight}`;
    }

    public get isUnset() {
        return BravoSize.Unset.equals(this);
    }

    public get isInitial() {
        return BravoSize.Initial.equals(this);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function asNumber(pValue: any): number {
    if (typeof pValue === 'number') return pValue;

    if (typeof pValue === 'string') {
        const val = parseFloat(pValue);
        if (!isNaN(val)) return val;
    }

    return Number(pValue);
}
