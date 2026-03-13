export class BravoFont {
    static #Unset: BravoFont = null!;
    public static get Unset() {
        if (!this.#Unset) this.#Unset = new BravoFont('unset', -999);
        return this.#Unset;
    }

    #isUnset = false;
    public get isUnset() {
        return this.#isUnset;
    }

    public unit = 'rem';

    #fontFamily = 'Roboto';

    public get fontFamily() {
        return this.#fontFamily;
    }

    #fontSize = 14;

    public get size() {
        return this.#fontSize;
    }

    #fontWeight = '400';
    public get fontWeight() {
        return this.#fontWeight;
    }

    public set fontWeight(pValue) {
        this.#fontWeight = pValue;
    }

    public get isBold(): boolean {
        return BravoFont.isBoldFont(this.fontWeight);
    }

    constructor(pFamily: string, pFontSize: number) {
        if (pFamily === 'unset') {
            this.#isUnset = true;
            return;
        }

        this.#fontFamily = pFamily;
        this.#fontSize = pFontSize;
    }

    public toCss(): Record<string, string> {
        if (this.#isUnset) return {};
        const cssStyle: Record<string, string> = {};
        cssStyle['fontFamily'] = this.fontFamily;
        cssStyle['fontSize'] = `${this.size}${this.unit}`;
        cssStyle['fontWeight'] = `${this.fontWeight}`;
        return cssStyle;
    }

    public static isBoldFont(pFontWeight: string) {
        if (!pFontWeight) return false;
        if (pFontWeight === 'bold' || pFontWeight === 'Bold' || pFontWeight === '700') return true;
        try {
            return +pFontWeight >= 500;
        } catch {
            return false;
        }
    }
    public toString(): string {
        if (this.#isUnset) return '';
        return `${this.fontWeight} ${this.#fontSize}${this.unit} ${this.fontFamily}`;
    }
}
