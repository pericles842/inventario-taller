import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormsComponent } from './components/input-forms/input-forms.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SpinnerComponent } from './shared/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    InputFormsComponent
  ]
})
export class AppModule { }
