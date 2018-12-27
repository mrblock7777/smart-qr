import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { CONFIG } from './firebase.config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ViewQrPage } from '../pages/view-qr/view-qr';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { PopoverPage } from '../pages/popover/popover';
import { ScannerProvider } from '../providers/scanner/scanner';
import { UserProvider } from '../providers/user/user';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileProvider } from '../providers/profile/profile';
import { SuccessPage } from '../pages/success/success';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SuccessPage,
    ProfilePage,
    ViewQrPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(CONFIG),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SuccessPage,
    ProfilePage,
    ViewQrPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    ScannerProvider,
    UserProvider,
    AuthenticationProvider,
    ProfileProvider
  ]
})
export class AppModule {}
