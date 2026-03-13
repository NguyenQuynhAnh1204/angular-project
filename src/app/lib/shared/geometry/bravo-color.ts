// import { BrSafeAny } from '@bravo-infra/core/definition';
// import {
//     BravoNumberExtensions,
//     BravoStringExtensions,
//     asNumber,
//     asType,
//     assert,
//     isString,
// } from '@bravo-infra/core/utils/data-extensions';

//TODO: extend TinyColor latter
/**
 * Class that represents a color.
 */
export class BravoColor {
    #r = 0;
    #g = 0;
    #b = 0;
    #a = 1;
    #isUnset = false;

    static #Unset: BravoColor = null!;
    public static get Unset() {
        if (!this.#Unset) this.#Unset = new BravoColor('unset');
        return this.#Unset;
    }
    public get isUnset() {
        return this.#isUnset;
    }

    /**
     * Initializes a new @see:Color from a CSS color specification.
     *
     * @param pColor CSS color specification.
     */
    constructor(pColor: string) {
        if (pColor === 'unset') {
            this.#isUnset = true;
            return;
        }
        if (pColor) {
            this.#parse(pColor);
        }
    }

    /**
     * Gets or sets the red component of this @see:Color,
     * in a range from 0 to 255.
     */
    public get r(): number {
        return this.#r;
    }

    public set r(pValue: number) {
        this.#r = clamp(asNumber(pValue), 0, 255);
    }
    /**
     * Gets or sets the green component of this @see:Color,
     * in a range from 0 to 255.
     */
    public get g(): number {
        return this.#g;
    }
    public set g(pValue: number) {
        this.#g = clamp(asNumber(pValue), 0, 255);
    }
    /**
     * Gets or sets the blue component of this @see:Color,
     * in a range from 0 to 255.
     */
    public get b(): number {
        return this.#b;
    }
    public set b(pValue: number) {
        this.#b = clamp(asNumber(pValue), 0, 255);
    }
    /**
     * Gets or sets the alpha component of this @see:Color,
     * in a range from 0 to 1 (zero is transparent, one is solid).
     */
    public get a(): number {
        return this.#a;
    }
    public set a(pValue: number) {
        this.#a = clamp(asNumber(pValue), 0, 1);
    }
    /**
     * Returns true if a @see:Color has the same value as this @see:Color.
     *
     * @param pClr @see:Color to compare to this @see:Color.
     */
    public equals(pClr: BravoColor): boolean {
        if (this.#isUnset) return false;
        return (
            pClr instanceof BravoColor && this.r == pClr.r && this.g == pClr.g && this.b == pClr.b && this.a == pClr.a
        );
    }
    /**
     * Gets a string representation of this @see:Color.
     */
    public toString(): string {
        if (this.#isUnset) return 'unset';
        const a = Math.round(this.a * 100);
        return a > 99
            ? '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
            : 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + a / 100 + ')';
    }
    /**
     * Creates a new @see:Color using the specified RGBA color channel values.
     *
     * @param pR Value for the red channel, from 0 to 255.
     * @param pG Value for the green channel, from 0 to 255.
     * @param pB Value for the blue channel, from 0 to 255.
     * @param pA Value for the alpha channel, from 0 to 1.
     */
    public static fromRgba(pR: number, pG: number, pB: number, pA = 1): BravoColor {
        const c = new BravoColor(null!);
        c.r = Math.round(clamp(asNumber(pR), 0, 255));
        c.g = Math.round(clamp(asNumber(pG), 0, 255));
        c.b = Math.round(clamp(asNumber(pB), 0, 255));
        c.a = clamp(asNumber(pA), 0, 1);
        return c;
    }
    /**
     * Creates a new @see:Color using the specified HSB values.
     *
     * @param pH Hue value, from 0 to 1.
     * @param pS Saturation value, from 0 to 1.
     * @param pB Brightness value, from 0 to 1.
     * @param pA Alpha value, from 0 to 1.
     */
    public static fromHsb(pH: number, pS: number, pB: number, pA = 1): BravoColor {
        const rgb = BravoColor.hsbToRgb(
            clamp(asNumber(pH), 0, 1),
            clamp(asNumber(pS), 0, 1),
            clamp(asNumber(pB), 0, 1),
        );
        return BravoColor.fromRgba(rgb[0], rgb[1], rgb[2], pA);
    }
    /**
     * Creates a new @see:Color using the specified HSL values.
     *
     * @param pH Hue value, from 0 to 1.
     * @param pS Saturation value, from 0 to 1.
     * @param pL Lightness value, from 0 to 1.
     * @param pA Alpha value, from 0 to 1.
     */
    public static fromHsl(pH: number, pS: number, pL: number, pA = 1): BravoColor {
        const rgb = BravoColor.hslToRgb(
            clamp(asNumber(pH), 0, 1),
            clamp(asNumber(pS), 0, 1),
            clamp(asNumber(pL), 0, 1),
        );
        return BravoColor.fromRgba(rgb[0], rgb[1], rgb[2], pA);
    }
    /**
     * Creates a new @see:Color from a CSS color string.
     *
     * @param pValue String containing a CSS color specification.
     * @return A new @see:Color, or null if the string cannot be parsed into a color.
     */
    public static fromString(pValue: string): BravoColor | null {
        const c = new BravoColor('');
        return c.#parse(asString(pValue)) ? c : null;
    }
    /**
     * Gets an array with this color's HSB components.
     */
    public getHsb(): number[] {
        return BravoColor.rgbToHsb(this.r, this.g, this.b);
    }
    /**
     * Gets an array with this color's HSL components.
     */
    public getHsl(): number[] {
        return BravoColor.#rgbToHsl(this.r, this.g, this.b);
    }
    /**
     * Creates a @see:Color by interpolating between two colors.
     *
     * @param pC1 First color.
     * @param pC2 Second color.
     * @param pPct Value between zero and one that determines how close the
     * interpolation should be to the second color.
     */
    public static interpolate(pC1: BravoColor, pC2: BravoColor, pPct: number): BravoColor {
        // sanity
        pPct = clamp(asNumber(pPct), 0, 1);

        // convert rgb to hsl
        const h1 = BravoColor.#rgbToHsl(pC1.r, pC1.g, pC1.b),
            h2 = BravoColor.#rgbToHsl(pC2.r, pC2.g, pC2.b);

        // interpolate
        const qct = 1 - pPct,
            alpha = pC1.a * qct + pC2.a * pPct,
            h3 = [h1[0] * qct + h2[0] * pPct, h1[1] * qct + h2[1] * pPct, h1[2] * qct + h2[2] * pPct];

        // convert back to rgb
        const rgb = BravoColor.hslToRgb(h3[0], h3[1], h3[2]);
        return BravoColor.fromRgba(rgb[0], rgb[1], rgb[2], alpha);
    }
    /**
     * Gets the closest opaque color to a given color.
     *
     * @param pC @see:Color to be converted to an opaque color
     * (the color may also be specified as a string).
     * @param pBkg Background color to use when removing the transparency
     * (defaults to white).
     */
    public static toOpaque(pC: any, pBkg?: any): BravoColor {
        // get color
        pC = isString(pC) ? BravoColor.fromString(pC) : asType(pC, BravoColor);

        // no alpha? no work
        if (pC.a == 1) return pC;

        // get background
        pBkg =
            pBkg == null
                ? BravoColor.fromRgba(255, 255, 255, 1)
                : isString(pBkg)
                ? BravoColor.fromString(pBkg)
                : asType<BravoColor>(pBkg, BravoColor);

        // interpolate in RGB space
        const p = pC.a,
            q = 1 - p;
        return BravoColor.fromRgba(pC.r * p + pBkg.r * q, pC.g * p + pBkg.g * q, pC.b * p + pBkg.b * q);
    }

    // ** implementation

    // parses a color string into r/b/g/a
    #parse(pC: string): boolean {
        // case-insensitive
        pC = pC.toLowerCase();

        // 'transparent' is a special case:
        // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
        if (pC == 'transparent') {
            this.#r = this.#g = this.#b = this.#a = 0;
            return true;
        }

        // let browser parse stuff we don't handle
        if (pC && pC.indexOf('#') != 0 && pC.indexOf('rgb') != 0 && pC.indexOf('hsl') != 0) {
            const e = document.createElement('div');
            e.style.color = pC;
            let cc = e.style.color;
            if (cc == pC) {
                // same value?
                cc = window.getComputedStyle(e).color; // then get computed style
                if (!cc) {
                    // not yet? (Chrome/named colors)
                    document.body.appendChild(e); // then add element to document
                    cc = window.getComputedStyle(e).color; // and try again
                    e && e.parentNode ? e.parentNode.removeChild(e) : null;
                }
            }
            pC = cc.toLowerCase();
        }

        // parse #RGB/#RRGGBB
        if (pC.indexOf('#') == 0) {
            if (pC.length == 4) {
                this.r = parseInt(pC[1] + pC[1], 16);
                this.g = parseInt(pC[2] + pC[2], 16);
                this.b = parseInt(pC[3] + pC[3], 16);
                this.a = 1;
                return true;
            } else if (pC.length == 7) {
                this.r = parseInt(pC.substr(1, 2), 16);
                this.g = parseInt(pC.substr(3, 2), 16);
                this.b = parseInt(pC.substr(5, 2), 16);
                this.a = 1;
                return true;
            } else if (pC.length === 9) {
                // #RRGGBBAA
                this.r = parseInt(pC.slice(1, 3), 16);
                this.g = parseInt(pC.slice(3, 5), 16);
                this.b = parseInt(pC.slice(5, 7), 16);
                this.a = parseInt(pC.slice(7, 9), 16) / 255;
                return true;
            }
            return false;
        }

        // parse rgb/rgba
        if (pC.indexOf('rgb') == 0) {
            const op = pC.indexOf('('),
                ep = pC.indexOf(')');
            if (op > -1 && ep > -1) {
                const p = pC.substr(op + 1, ep - (op + 1)).split(',');
                if (p.length > 2) {
                    this.r = parseInt(p[0]);
                    this.g = parseInt(p[1]);
                    this.b = parseInt(p[2]);
                    this.a = p.length > 3 ? parseFloat(p[3]) : 1;
                    return true;
                }
            }
        }

        // parse hsl/hsla
        if (pC.indexOf('hsl') == 0) {
            const op = pC.indexOf('('),
                ep = pC.indexOf(')');
            if (op > -1 && ep > -1) {
                const p = pC.substr(op + 1, ep - (op + 1)).split(',');
                if (p.length > 2) {
                    const h = parseInt(p[0]) / 360;
                    let s = parseInt(p[1]),
                        l = parseInt(p[2]);
                    if (p[1].indexOf('%') > -1) s /= 100;
                    if (p[2].indexOf('%') > -1) l /= 100;
                    const rgb = BravoColor.hslToRgb(h, s, l);
                    this.r = rgb[0];
                    this.g = rgb[1];
                    this.b = rgb[2];
                    this.a = p.length > 3 ? parseFloat(p[3]) : 1;
                    return true;
                }
            }
        }

        // failed to parse
        return false;
    }
    /**
     * Converts an HSL color value to RGB.
     *
     * @param pH The hue (between zero and one).
     * @param pS The saturation (between zero and one).
     * @param pL The lightness (between zero and one).
     * @return An array containing the R, G, and B values (between zero and 255).
     */
    public static hslToRgb(pH: number, pS: number, pL: number): number[] {
        assert(pH >= 0 && pH <= 1 && pS >= 0 && pS <= 1 && pL >= 0 && pL <= 1, 'bad HSL values');
        let r: number, g: number, b: number;
        if (pS == 0) {
            r = g = b = pL; // achromatic
        } else {
            const q = pL < 0.5 ? pL * (1 + pS) : pL + pS - pL * pS;
            const p = 2 * pL - q;
            r = BravoColor.#hue2rgb(p, q, pH + 1 / 3);
            g = BravoColor.#hue2rgb(p, q, pH);
            b = BravoColor.#hue2rgb(p, q, pH - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    static #hue2rgb(pP: number, pQ: number, pT: number): number {
        if (pT < 0) pT += 1;
        if (pT > 1) pT -= 1;
        if (pT < 1 / 6) return pP + (pQ - pP) * 6 * pT;
        if (pT < 1 / 2) return pQ;
        if (pT < 2 / 3) return pP + (pQ - pP) * (2 / 3 - pT) * 6;
        return pP;
    }
    /**
     * Converts an RGB color value to HSL.
     *
     * @param pR The value of the red channel (between zero and 255).
     * @param pG The value of the green channel (between zero and 255).
     * @param pB The value of the blue channel (between zero and 255).
     * @return An array containing the H, S, and L values (between zero and one).
     */
    static #rgbToHsl(pR: number, pG: number, pB: number): number[] {
        assert(pR >= 0 && pR <= 255 && pG >= 0 && pG <= 255 && pB >= 0 && pB <= 255, 'bad RGB values');
        (pR /= 255), (pG /= 255), (pB /= 255);
        const max = Math.max(pR, pG, pB),
            min = Math.min(pR, pG, pB);
        let h, s;
        const l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case pR:
                    h = (pG - pB) / d + (pG < pB ? 6 : 0);
                    break;
                case pG:
                    h = (pB - pR) / d + 2;
                    break;
                case pB:
                    h = (pR - pG) / d + 4;
                    break;
            }
            h! /= 6;
        }
        return [h!, s, l];
    }
    /**
     * Converts an RGB color value to HSB.
     *
     * @param pR The value of the red channel (between zero and 255).
     * @param pG The value of the green channel (between zero and 255).
     * @param pB The value of the blue channel (between zero and 255).
     * @return An array containing the H, S, and B values (between zero and one).
     */
    public static rgbToHsb(pR: number, pG: number, pB: number): number[] {
        assert(pR >= 0 && pR <= 255 && pG >= 0 && pG <= 255 && pB >= 0 && pB <= 255, 'bad RGB values');
        const hsl = BravoColor.#rgbToHsl(pR, pG, pB);
        return BravoColor.hslToHsb(hsl[0], hsl[1], hsl[2]);
    }
    /**
     * Converts an HSB color value to RGB.
     *
     * @param pH The hue (between zero and one).
     * @param pS The saturation (between zero and one).
     * @param pB The brightness (between zero and one).
     * @return An array containing the R, G, and B values (between zero and 255).
     */
    public static hsbToRgb(pH: number, pS: number, pB: number): number[] {
        //assert(h >= 0 && h <= 1 && s >= 0 && s <= 1 && b >= 0 && b <= 1, 'bad HSB values');
        const hsl = BravoColor.hsbToHsl(pH, pS, pB);
        return BravoColor.hslToRgb(hsl[0], hsl[1], hsl[2]);
    }
    /**
     * Converts an HSB color value to HSL.
     *
     * @param pH The hue (between zero and one).
     * @param pS The saturation (between zero and one).
     * @param pB The brightness (between zero and one).
     * @return An array containing the H, S, and L values (between zero and one).
     */
    public static hsbToHsl(pH: number, pS: number, pB: number): number[] {
        assert(pH >= 0 && pH <= 1 && pS >= 0 && pS <= 1 && pB >= 0 && pB <= 1, 'bad HSB values');
        const ll = clamp((pB * (2 - pS)) / 2, 0, 1),
            div = 1 - Math.abs(2 * ll - 1),
            ss = clamp(div > 0 ? (pB * pS) / div : pS /*0*/, 0, 1);
        assert(!isNaN(ll) && !isNaN(ss), 'bad conversion to HSL');
        return [pH, ss, ll];
    }
    /**
     * Converts an HSL color value to HSB.
     *
     * @param pH The hue (between zero and one).
     * @param pS The saturation (between zero and one).
     * @param pL The lightness (between zero and one).
     * @return An array containing the H, S, and B values (between zero and one).
     */
    public static hslToHsb(pH: number, pS: number, pL: number): number[] {
        assert(pH >= 0 && pH <= 1 && pS >= 0 && pS <= 1 && pL >= 0 && pL <= 1, 'bad HSL values');
        const bb = clamp(pL == 1 ? 1 : (2 * pL + pS * (1 - Math.abs(2 * pL - 1))) / 2, 0, 1),
            ss = clamp(bb > 0 ? (2 * (bb - pL)) / bb : pS /*0*/, 0, 1);
        assert(!isNaN(bb) && !isNaN(ss), 'bad conversion to HSB');
        return [pH, ss, bb];
    }

    /**
     * Creates a copy of this @see:Color.
     */
    public clone() {
        if (this.#isUnset) return new BravoColor('unset');
        return new BravoColor(this.toString());
    }
}



function assert(condition: boolean, message: string) {
    if(condition) return;
    throw new Error(message);
}


function asType<T>(value: any, pType: new (...args: any[]) => T) {
    if(!(value instanceof pType)) {
        return false;
    }
    return true;
}

function asNumber(pValue: any): number {
    if (typeof pValue === 'number') return pValue;

    if (typeof pValue === 'string') {
        const val = parseFloat(pValue);
        if (!isNaN(val)) return val;
    }
    return Number(pValue);
}


function asString(value: string) {
    if(typeof value === "string") return value;
    return String(value);
}

function isString(value: string) {
    return typeof value === 'string';
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
