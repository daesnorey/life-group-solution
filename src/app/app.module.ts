import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatRadioModule, MatTableModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule,
  MatSidenavModule,  MatToolbarModule, MatListModule, MatProgressBarModule, MatSnackBarModule,
  MatCardModule, MatProgressSpinnerModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MainComponent } from './components/main/main.component';
import { Col101FormComponent } from './components/col101-form/col101-form.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { BeneficiariesTableComponent } from './components/col101-form/beneficiaries-table/beneficiaries-table.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Col101FormComponent,
    BulkUploadComponent,
    BeneficiariesTableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [Col101FormComponent, AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
