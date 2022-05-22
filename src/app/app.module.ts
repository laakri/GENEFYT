import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultListComponent } from './result-list/result-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { SuccesComponent } from './succes/succes.component';
import { PostPageComponent } from './post-page/post-page.component';
import { FooterComponent } from './footer/footer.component';
import { AddInformationComponent } from './add-information/add-information.component';
import {MatSelectModule} from '@angular/material/select';
import { CreateGigComponent } from './create-gig/create-gig.component';
import { ErrorInterceptor } from './error-interceptor';
import { AuthInterceptor } from './login/login.interceptor';



/* *******************MODELS******************** */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {A11yModule} from '@angular/cdk/a11y';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {SlickCarouselModule } from 'ngx-slick-carousel';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';

/* ********************************************* */
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomepageComponent,
    ResultListComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent,
    SignInComponent,
    FooterComponent,
    PostPageComponent,
    ErrorComponent,
    SuccesComponent,
    AddInformationComponent,
    CreateGigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSidenavModule,
    A11yModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatChipsModule,
    SlickCarouselModule,
    ClipboardModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectModule,
    RouterModule.forRoot([ ]),
    MatSliderModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
