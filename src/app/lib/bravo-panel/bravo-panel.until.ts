import { EGridSizeType } from "./bravo-panel.type";

export class SizeBase {
    protected _value!: string;
    
    protected _size!: EGridSizeType;

    constructor(pVal: string, pSize?: EGridSizeType) {
        if(!pSize) {
            this._size = EGridSizeType.AUTOSIZE;
            return;
        }
        this._value = pVal;
        this._size = pSize;
    };

    /**
     * 
     * @returns trả về từng giá trị cho từng control riêng biệt. Mặc định không điền gì sẽ trả ra  valuel d auto ;
     */
    public toString(): string {
        const regex = /^\d+$/;   // regex kiểm tra chuỗi có toàn số hay không ??
        switch (this._size) {
            case EGridSizeType.ABSOLUTE:
                if (this._value && regex.test(this._value)) {
                    return `${this._value}px`;
                }
                return this._value || 'auto';
            case EGridSizeType.AUTOSIZE:
                return 'auto';
            case EGridSizeType.PERCENT:
                if (regex.test(this._value)) {
                    return `${this._value}fr`;
                }
                return this._value;

            default:
                return 'auto';
        }
    }
}

export class RowType extends SizeBase {}

export class ColumnType extends SizeBase {}
