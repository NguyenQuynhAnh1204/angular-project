import { getAttribute } from "./untils";


export function HostColor(option?: {transform?: (value: any) => any}) {

    return function(target: any, key: string) {
        
        const privateKey = '__' + key;

        Object.defineProperty(target, key, {
            set(value) {
                this[privateKey] = value;
                const nameProperty = getAttribute(privateKey);
                this.el.nativeElement.style[nameProperty] = value;
            },

            get() {
                return this[privateKey];
            }
        })
    }
}