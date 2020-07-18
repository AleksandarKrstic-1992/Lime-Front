import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Subscription } from 'rxjs';
import { Property } from '../models/property.model';
import { SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  subscriptionProperties: Subscription;
  subscriptionProperty: Subscription;
  properties: Property[] = new Array<Property>();
  selectedProperty: Property = null;
  index = 0;

  showSlider = false;

  @ViewChild('swiperWrapper') swiperWrapper: SwiperComponent;

  constructor(private propertyService: PropertyService) {
    this.subscriptionProperties = this.propertyService.getAllProperties().subscribe((properties: Property[]) => {
      this.properties = properties;
      if (this.properties && this.properties.length && this.selectedProperty) {
        this.getIndexOfSelected();
      }
    });

    this.subscriptionProperty = this.propertyService.getSelected().subscribe((property: Property) => {
      if (!property) {
        this.showSlider = false;
        setTimeout(() => {
          this.selectedProperty = property;
        }, 500);
      } else {
        if (property && this.selectedProperty && property.id === this.selectedProperty.id) {
          this.selectedProperty = property;
        } else {
          this.selectedProperty = property;
          this.getIndexOfSelected();
          setTimeout(() => {
            this.showSlider = true;
          }, 100);
        }
      }
    });
  }

  private getIndexOfSelected() {
    const indexOfSelected = this.properties.findIndex(
      (x: Property) => x.id === this.selectedProperty.id
    );
    if (this.index !== indexOfSelected) {
      this.index = indexOfSelected;
    }
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
