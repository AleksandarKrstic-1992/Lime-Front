import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toast } from '../models/toast.model';
import { ToastType } from '../enums/toastType.enum';

@Injectable()
export class ToastService {
    private showToastMessage = new Subject<Toast>();

    getToast(): Observable<Toast> {
        return this.showToastMessage.asObservable();
    }

    setError(msg: string): void {
        this.setToast(new Toast(msg, ToastType.Error));
    }

    setSuccess(msg: string): void {
        this.setToast(new Toast(msg, ToastType.Success));
    }

    private setToast(toast: Toast): void {
        this.showToastMessage.next(toast);
        setTimeout(() => {
            this.closeToast();
        }, 2000);
    }

    closeToast(): void {
        this.showToastMessage.next(null);
    }
}
