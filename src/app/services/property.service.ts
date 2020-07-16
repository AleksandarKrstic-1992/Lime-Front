import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../utils/consts';

@Injectable()
export class PropertyService extends BaseService {
    constructor(http: HttpClient) {
        super(http);
    }

    getPropertiesByAt(at: string, callback) {
        const endpoint = `${this.baseUrl}${Consts.propertyPath}?at=${at}`;
        this.get(endpoint, callback);
    }
}
