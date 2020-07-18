import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {

  @Input() property: Property;
  @Input() isSelected = false;

  constructor(
    private bookingService: BookingService,
    private propertyService: PropertyService,
    private toastService: ToastService
    ) {
   }

  ngOnInit() {
  }

  onBookingClick(propertyId: string) {
    this.bookingService.addBooking(propertyId, (data) => {
      this.propertyService.setSelected(null);
      if (data && data['error']) {
        this.toastService.setError('Ooops! Something went wrong');
      } else {
        this.toastService.setSuccess('Successfully booked');
      }
    });
  }
}
