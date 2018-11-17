import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MFApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContributePage } from '../pages/contribute/contribute';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MFApp,
    HomePage,
    ContributePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MFApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MFApp,
    HomePage,
    ContributePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
