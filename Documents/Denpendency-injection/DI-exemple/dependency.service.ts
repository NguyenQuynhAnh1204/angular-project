import { ILogger } from "./dependency.interface";



// export class Logger implements ILogger {
//     public logger() {
//         return 
//     }
// }

export class LoggerInformation implements ILogger {
    public logger() {
        return "Information"
    }
}

export class LoggerWarning implements ILogger {
    public logger() {
        return 'Warning'
    }
}