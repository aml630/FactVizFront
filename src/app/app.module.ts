import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewFrontComponent } from './blog/other/new-front/new-front.component';
import { NavbarComponent } from './blog/other/navbar/navbar.component';
import { BlogFooterComponent } from './blog/other/blog-footer/blog-footer';
import { RouterModule } from '@angular/router';
import { FactPageComponent } from './fact-page/fact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewFrontComponent,
    NavbarComponent,
    BlogFooterComponent,
    FactPageComponent
  ],
  imports: [
    BrowserModule,
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
