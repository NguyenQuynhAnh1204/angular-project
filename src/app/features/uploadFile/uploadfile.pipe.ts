import { Pipe, PipeTransform } from '@angular/core';
import { ByteUnitType } from './uploadfile.definition';

@Pipe({
  name: 'byteType',
})
export class ByteTypePipe implements PipeTransform {
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
    return ByteTypePipe.transform(pInput, pDecimal, pFrom, pTo);
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
      unit = ByteTypePipe.formats[unit].prev!;
    }

    if (pTo) {
      const format = ByteTypePipe.formats[pTo];
      const num = ByteTypePipe.calcResult(format, bytes);
      const result = ByteTypePipe.toDecimal(num, pDecimal);
      return ByteTypePipe.formatResult(result, pTo);
    }

    for (const key in ByteTypePipe.formats) {
      if (ByteTypePipe.formats.hasOwnProperty(key)) {
        const format = ByteTypePipe.formats[key as ByteUnitType];
        if (bytes < format.max) {
          const result = ByteTypePipe.toDecimal(
            ByteTypePipe.calcResult(format, bytes),
            pDecimal,
          );
          return ByteTypePipe.formatResult(result, key);
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
    const prev = pFormat.prev ? ByteTypePipe.formats[pFormat.prev] : undefined;
    if (!prev) return pBytes;
    return pBytes / prev.max;
  }

  public static toDecimal(pVal: number, pDecimal: number) {
    return Math.round(pVal * Math.pow(10, pDecimal)) / Math.pow(10, pDecimal);
  }
}
