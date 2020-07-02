import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpService, APIInterceptor } from './app.http.service';
import { InMemoryDataService } from './app.in-memory.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService), //Must remove in-memory service when you use real API.
  ],
  providers: [
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide : LocationStrategy , useClass: HashLocationStrategy },
    //{provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
