
export function HostFont(option?: {transform?: (value: any) => any}) {

    return function (target: any, key: string) {

        const privateKey = '__' + key;

        Object.defineProperty(target, key, {

            set(value) {
                if(option?.transform) {
                    value = option.transform(value);
                }
                this[privateKey] = value;
                this.el.nativeElement.style.fontFamily = value.family;
                this.el.nativeElement.style.fontSize = value.size;
            },

            get() {
                return this[privateKey];
            }

        });

    };

}


