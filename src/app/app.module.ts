import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ScrollFixedNavDirective } from './directive/scroll-fixed-nav.directive';


@NgModule({
  declarations: [
    AppComponent,
    ScrollFixedNavDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
