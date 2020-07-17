export class Booking {
    property_id: string;
    check_in: string;

    constructor(propertyId: string = null, checkIn: string = null) {
        this.property_id = propertyId;
        this.check_in = checkIn;
    }
}
