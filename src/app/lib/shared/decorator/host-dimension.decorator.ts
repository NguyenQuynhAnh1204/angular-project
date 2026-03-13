import { getAttribute } from "./untils";

export function HostDimension(option?:{transform?: (value: any) => any}) {

    return function (target: any, key: string) {

        const privateKey = '__' + key;

        Object.defineProperty(target, key, {
            set(value) {
                if(option?.transform) {
                    value = option.transform(value);
                }
                this[privateKey] = value;
                const nameAttribute = getAttribute(privateKey)
                this.el.nativeElement.style[nameAttribute] = value;
            },
            get() {
                return this[privateKey];
            }

        });
    };
}

