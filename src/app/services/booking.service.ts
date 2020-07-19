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

    addBooking(propertyId, callback) {
        const dto: Booking = new Booking(propertyId, this.getDatetimeAsString());
        const endpoint = `${this.baseUrl}${Consts.bookingPath}`;
        this.post(endpoint, dto, callback);
    }

    private getDatetimeAsString(): string {
        const date = new Date();
        const dateStr =
            ('00' + (date.getMonth() + 1)).slice(-2) + '/' +
            ('00' + date.getDate()).slice(-2) + '/' +
            date.getFullYear() + ' ' +
            ('00' + date.getHours()).slice(-2) + ':' +
            ('00' + date.getMinutes()).slice(-2) + ':' +
            ('00' + date.getSeconds()).slice(-2);
        return dateStr;
    }
}
