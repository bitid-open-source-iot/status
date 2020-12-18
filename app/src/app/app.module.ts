/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { MatRippleModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { PagesService } from './services/pages/pages.service';
import { ToastService } from './services/toast/toast.service';
import { SocketService } from './services/socket/socket.service';
import { HistoryService } from './services/history/history.service';
import { AccountService } from './services/account/account.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { ComponentsService } from './services/components/components.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVRONMENT --- */
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        MatListModule,
        MatRippleModule,
        AppRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        FlexLayoutModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            'enabled': environment.production
        })
    ],
    providers: [
        ApiService,
        AuthService,
        ToastService,
        PagesService,
        SocketService,
        AccountService,
        HistoryService,
        FormErrorService,
        ComponentsService,
        LocalstorageService
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})

export class AppModule { }