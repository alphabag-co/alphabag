import { HomePage } from './../pages/home/home';
import { MapComponent } from './../components/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { ComponentsModule } from '../components/components.module';

// AF2 Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyAo9V_2JL89nYfWK6-SkKk7gIsehhHwD2I',
  authDomain: 'alphabag-1519203910493.firebaseapp.com',
  databaseURL: 'https://alphabag-1519203910493.firebaseio.com',
  projectId: 'alphabag-1519203910493',
  storageBucket: 'alphabag-1519203910493.appspot.com',
  messagingSenderId: '1012690676160'
};

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'alphabag'),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    ConnectivityServiceProvider
  ]
})
export class AppModule {}
