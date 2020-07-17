import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { Toast } from '../models/toast.model';
import { ToastType } from '../enums/toastType.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity : 0}),
        animate(500, style({opacity : 1}))
      ]),
      transition(':leave', [
        animate(500, style({opacity : 0}))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  toastSubscription: Subscription;
  toast: Toast;
  toastType = ToastType;

  constructor(private toastService: ToastService) {
    this.toastSubscription = this.toastService.getToast().subscribe( toast => {
      this.toast = toast;
    });
  }

  ngOnInit() {
  }

}
