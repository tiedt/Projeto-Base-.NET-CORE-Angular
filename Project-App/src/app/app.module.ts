import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimeFormatPipe } from './_helps/DateTimeFormatPipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgxCurrencyModule } from "ngx-currency";
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { AuthService } from './_services/auth.service';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteEditComponent } from './clientes/cliente-edit/cliente-edit.component';
@NgModule({
   declarations: [
      AppComponent,
      DashboardComponent,
      NavComponent,
      DateTimeFormatPipe,
      DashboardComponent,
      TituloComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      ClientesComponent,
      ClienteEditComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot(),
      TabsModule.forRoot(),
      NgxMaskModule.forRoot(),
      BrowserAnimationsModule,
      ReactiveFormsModule,
      NgxCurrencyModule
   ],
   providers: [
      AuthService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
