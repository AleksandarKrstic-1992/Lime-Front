import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';
import { Subscription } from 'rxjs';
import { MapTypeStyle } from '@agm/core/services/google-maps-types';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild('agmMap') agmMap: AgmMap;

  readonly distanceFactor = 0.05;
  lat = 52.520008;
  lng = 13.404954;
  baseIconsPath = '../../assets/icons/';

  iconUrl = {
    scaledSize: {
      width: 35,
      height: 35
    },
    url: this.baseIconsPath + 'marker.svg'
  };

  selectedIconUrl = {
    scaledSize: {
      width: 50,
      height: 50
    },
    url: this.baseIconsPath + 'selected-marker.svg'
  };

  styles: MapTypeStyle[] = [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ];

  properties: Property[] = new Array<Property>();
  selectedProperty: Property = null;
  subscriptionProperty: Subscription;
  subscriptionProperties: Subscription;

  constructor(private propertyService: PropertyService) {
    this.subscriptionProperty = this.propertyService.getSelected().subscribe((property: Property) => {
      this.selectedProperty = property;
      if (this.selectedProperty && this.selectedProperty.position) {
        this.lat = this.selectedProperty.position[0] - 0.001;
        this.lng = this.selectedProperty.position[1];
        this.setPlacesOnMap(
          this.lat,
          this.lng
        );
      }
    });

    this.subscriptionProperties = this.propertyService.getAllProperties().subscribe((properties: Property[]) => {
      this.properties = properties;
    });
  }

  ngOnInit() {
    this.getProperties();
  }

  onCenterChange({lat, lng}) {

    if (Math.abs(lat - this.lat) > this.distanceFactor || Math.abs(lng - this.lng) > this.distanceFactor) {
      this.setPlacesOnMap(lat, lng);
    }
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
      const tempArray = new Array(
        ...this.properties,
        ...results.filter(r => this.properties.findIndex(p => p.id === r.id) === -1)
      );
      this.propertyService.setAllProperties(tempArray);
    });
  }

  ngOnDestroy() {
    this.subscriptionProperty.unsubscribe();
    this.subscriptionProperties.unsubscribe();
  }
}
