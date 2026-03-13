
export function HostSize(option?: {transform?: (value: any) => any}) {

    return function (target: any, key: string) {

        const privateKey = '__' + key;

        Object.defineProperty(target, key, {

            set(value) {
                if(option?.transform) {
                    value = option.transform(value);
                }
                this[privateKey] = value;
                this.el.nativeElement.style.width = value.width;
                this.el.nativeElement.style.height = value.height;
            },

            get() {
                return this[privateKey];
            }

        });

    };

}