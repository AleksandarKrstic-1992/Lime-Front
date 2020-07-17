import { ToastType } from '../enums/toastType.enum';

export class Toast {
    message: string;
    type: ToastType;

    constructor(msg: string, type: ToastType) {
        this.message = msg;
        this.type = type;
    }
}
