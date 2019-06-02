import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewFrontComponent } from './new-front/new-front.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogFooterComponent } from './blog-footer/blog-footer';
import { RouterModule } from '@angular/router';
import { FactPageComponent } from './fact-page/fact-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    NewFrontComponent,
    NavbarComponent,
    BlogFooterComponent,
    FactPageComponent,
    PageHeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: NewFrontComponent },
      { path: 'fact', component: FactPageComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
