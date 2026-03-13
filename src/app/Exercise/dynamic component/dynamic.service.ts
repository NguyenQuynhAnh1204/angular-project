import { CompoOneComponent } from "./dynamic-one.component";
import { CompoTwoComponent } from "./dynamic-two.component";


export class DynamicService {
    getComponent() {
        return [
            CompoOneComponent,
            CompoTwoComponent 
        ]
    }
}