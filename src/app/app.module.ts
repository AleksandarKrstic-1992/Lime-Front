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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: Consts.googleApiKey
    })
  ],
  providers: [PropertyService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
