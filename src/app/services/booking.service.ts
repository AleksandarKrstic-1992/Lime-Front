import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Consts } from '../utils/consts';
import { DatetimeService } from './datetime.service';

@Injectable()
export class BookingService extends BaseService {

    constructor(http: HttpClient, private dateTimeService: DatetimeService) {
        super(http);
    }

    addBooking(propertyId, callback) {
        const dto: Booking = new Booking(propertyId, this.dateTimeService.getDatetimeAsString());
        const endpoint = `${this.baseUrl}${Consts.bookingPath}`;
        this.post(endpoint, dto, callback);
    }
}
