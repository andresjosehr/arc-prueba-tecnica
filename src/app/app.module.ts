import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './components/auth/auth.module';
import { GeneralModule } from './components/general/general.module';
import { PlayersListModule } from './components/players-list/players-list.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationModule } from './components/registration/registration.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,

    // App Modules
    AuthModule,
    GeneralModule,
    PlayersListModule,
    RegistrationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
