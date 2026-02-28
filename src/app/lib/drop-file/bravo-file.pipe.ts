import { Pipe, PipeTransform } from '@angular/core';
import { ByteUnitType } from './bravo-file.definition';

@Pipe({
  name: 'byteType',
})
export class BravoByteTypePipe implements PipeTransform {
  public static formats: Record<
    ByteUnitType,
    { max: number; prev?: ByteUnitType }
  > = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'KB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Math.pow(1024, 5), prev: 'GB' },
  };

  public transform(
    pInput: number,
    pDecimal: number = 0,
    pFrom: ByteUnitType = 'B',
    pTo?: ByteUnitType,
  ) {
    return BravoByteTypePipe.transform(pInput, pDecimal, pFrom, pTo);
  }

  public static transform(
    pInput: number,
    pDecimal: number = 0,
    pFrom: ByteUnitType = 'B',
    pTo?: ByteUnitType,
  ) {
    if (!(+pInput % 1 == 0 && +pDecimal % 1 == 0 && pDecimal >= 0)) {
      return pInput;
    }

    let bytes = pInput;
    let unit = pFrom;

    while (unit !== 'B') {
      bytes *= 1024;
      unit = BravoByteTypePipe.formats[unit].prev!;
    }

    if (pTo) {
      const format = BravoByteTypePipe.formats[pTo];
      const num = BravoByteTypePipe.calcResult(format, bytes);
      const result = BravoByteTypePipe.toDecimal(num, pDecimal);
      return BravoByteTypePipe.formatResult(result, pTo);
    }

    for (const key in BravoByteTypePipe.formats) {
      if (BravoByteTypePipe.formats.hasOwnProperty(key)) {
        const format = BravoByteTypePipe.formats[key as ByteUnitType];
        if (bytes < format.max) {
          const result = BravoByteTypePipe.toDecimal(
            BravoByteTypePipe.calcResult(format, bytes),
            pDecimal,
          );
          return BravoByteTypePipe.formatResult(result, key);
        }
      }
    }
    return;
  }

  public static formatResult(pResult: number, pUnit: string) {
    return `${pResult}${pUnit}`;
  }

  public static calcResult(
    pFormat: { max: number; prev?: ByteUnitType },
    pBytes: number,
  ) {
    const prev = pFormat.prev ? BravoByteTypePipe.formats[pFormat.prev] : undefined;
    if (!prev) return pBytes;
    return pBytes / prev.max;
  }

  public static toDecimal(pVal: number, pDecimal: number) {
    return Math.round(pVal * Math.pow(10, pDecimal)) / Math.pow(10, pDecimal);
  }
}
