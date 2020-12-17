/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/toast/toast.service';
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
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            'enabled': environment.production
        })
    ],
    providers: [
        ApiService,
        AuthService,
        ToastService,
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