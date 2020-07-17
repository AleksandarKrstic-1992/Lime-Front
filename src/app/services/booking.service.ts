import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Consts } from '../utils/consts';

@Injectable()
export class BookingService extends BaseService {
    constructor(http: HttpClient) {
        super(http);
    }

    getPropertiesByAt(propertyId: string, callback) {
        const endpoint = `${this.baseUrl}${Consts.bookingPath}/${propertyId}/${Consts.propertyPath}}`;
        this.get(endpoint, callback);
    }

    addBooking(propertyId, callback) {
        const dto: Booking = new Booking(propertyId);
        const endpoint = `${this.baseUrl}${Consts.bookingPath}`;
        this.post(endpoint, dto, callback);
    }
}
