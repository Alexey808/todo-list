import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FakeRestService } from "./intercepters/fake-rest.service";
import { environment } from '@env/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => {
        return environment.production ? {} : new FakeRestService();
      },
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
