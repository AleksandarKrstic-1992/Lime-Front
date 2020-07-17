import { Component, OnInit, OnDestroy } from '@angular/core';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  lat = 52.520008;
  lng = 13.404954;
  baseIconsPath = '../../assets/icons/';

  properties: Property[] = new Array<Property>();
  selectedProperty: Property = null;
  subscription: Subscription;

  constructor(private propertyService: PropertyService) {
    this.subscription = this.propertyService.getSelected().subscribe(property => {
      this.selectedProperty = property;
    });
  }

  ngOnInit() {
    this.getProperties();
  }

  onMapReady(map) {
    map.addListener('dragend', () => {
      const lat = map.center.lat();
      const lng = map.center.lng();
      const DISTANCE_FACTOR = 0.05;

      if (Math.abs(lat - this.lat) > DISTANCE_FACTOR || Math.abs(lng - this.lng) > DISTANCE_FACTOR) {
        this.setPlacesOnMap(lat, lng);
      }
    });
  }

  setPlacesOnMap(lat: number, lng: number): void {
    this.getProperties(lat, lng);
  }

  onMarkerClick(property: Property) {
    this.propertyService.setSelected(
      !this.selectedProperty || (this.selectedProperty && this.selectedProperty.id !== property.id)
      ? property
      : null
      );
  }

  closeBooking() {
    this.propertyService.setSelected();
  }

  private getProperties(lat = this.lat, lng = this.lng) {
    this.propertyService.getPropertiesByAt(`${lat},${lng}`, ({results}) => {
      this.properties = this.properties.concat(results);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
