import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../services/booking.service';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
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
export class BookingComponent implements OnInit, OnDestroy {

  selectedProperty: Property;
  subscription: Subscription;

  constructor(private bookingService: BookingService, private propertyService: PropertyService) {
    this.subscription = this.propertyService.getSelected().subscribe(property => {
      this.selectedProperty = property;
    });
   }

  ngOnInit() {
  }

  onBookingClick(propertyId: string) {
    this.bookingService.addBooking(propertyId, (data) => {
      this.propertyService.setSelected(null);
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
