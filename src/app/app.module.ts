import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partial-views/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FactPageComponent } from './fact-page/fact-page.component';
import { PageHeaderComponent } from './partial-views/page-header/page-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './partial-views/footer/footer';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FactPageComponent,
    PageHeaderComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'cat-facts', component: FactPageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
