import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../utils/consts';
import { Observable, Subject } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable()
export class PropertyService extends BaseService {
    private selectedProperty = new Subject<Property>();
    private properties = new Subject<Property[]>();

    constructor(http: HttpClient) {
        super(http);
    }

    getPropertiesByAt(at: string, callback) {
        const endpoint = `${this.baseUrl}${Consts.propertyPath}?at=${at}`;
        this.get(endpoint, callback);
    }
    getSelected(): Observable<Property> {
        return this.selectedProperty.asObservable();
    }

    setSelected(property: Property = null): void {
        this.selectedProperty.next(property);
    }

    getAllProperties(): Observable<Property[]> {
        return this.properties.asObservable();
    }

    setAllProperties(properties: Property[]): void {
        this.properties.next(properties);
    }
}
