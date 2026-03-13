import { BravoPadding } from "../geometry";
import { getAttribute } from "./untils";

export function HostPadding(option?: {transform?: (value: any) => any}) {

    return function (target: any, key: string) {

        const privateKey = '__' + key;

        Object.defineProperty(target, key, {

            set(value) {
                if(option?.transform) {
                    value = option.transform(value);
                }
                this[privateKey] = value;
                const nameProperty = getAttribute(privateKey); 
                this.el.nativeElement.style[nameProperty] = value;
            },

            get() {
                return this[privateKey];
            }

        });

    };

}


