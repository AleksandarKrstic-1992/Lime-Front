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
import { CloseBookingDirective } from './directives/closeBooking.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    MapComponent,
    ToastComponent,
    CloseBookingDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: Consts.googleApiKey
    })
  ],
  providers: [PropertyService, BookingService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
