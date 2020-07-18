import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Subscription } from 'rxjs';
import { Property } from '../models/property.model';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { SwiperDirective, SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
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
export class SliderComponent implements OnInit, OnDestroy {
  subscriptionProperties: Subscription;
  subscriptionProperty: Subscription;
  properties: Property[] = new Array<Property>();
  selectedProperty: Property = null;
  index = 0;

  @ViewChild('swiperWrapper') swiperWrapper: SwiperComponent;

  constructor(private propertyService: PropertyService) {
    this.subscriptionProperties = this.propertyService.getAllProperties().subscribe((properties: Property[]) => {
      this.properties = properties;
      if (this.properties && this.properties.length && this.selectedProperty) {
        const indexOfSelected = this.properties.findIndex(
          (x: Property) => x.id === this.selectedProperty.id
        );
        if (this.index !== indexOfSelected) {
          this.index = indexOfSelected;
        }
      }
    });

    this.subscriptionProperty = this.propertyService.getSelected().subscribe((property: Property) => {
      this.selectedProperty = property;
    });
  }

  ngOnInit() {
  }

  onIndexChange(index): void {
    const findSelected = this.properties[index];
    this.propertyService.setSelected(findSelected);
  }

  ngOnDestroy() {
    this.subscriptionProperty.unsubscribe();
    this.subscriptionProperties.unsubscribe();
  }

}
