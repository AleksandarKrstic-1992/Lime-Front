import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
import { PropertyService } from './services/property.service';
import { BookingService } from './services/booking.service';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Consts } from './utils/consts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './toast/toast.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SliderComponent } from './slider/slider.component';

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 3.1,
  initialSlide: 0,
  spaceBetween: 10,
  observer: true,
  breakpoints: {
    576: {
      slidesPerView: 1.1,
      loop: false,
    },
    1024: {
      slidesPerView: 2.1,
      loop: false,
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    MapComponent,
    ToastComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: Consts.googleApiKey
    })
  ],
  providers: [
    PropertyService,
    BookingService,
    ToastService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
