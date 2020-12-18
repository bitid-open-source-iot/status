/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
    {
        'path': '',
        'loadChildren': () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
        'path': 'components',
        'canActivate': [AuthService],
        'loadChildren': () => import('./pages/components/components.module').then(m => m.ComponentsModule)
    },
    {
        'path': 'subscribers',
        'canActivate': [AuthService],
        'loadChildren': () => import('./pages/subscribers/subscribers.module').then(m => m.SubscribersModule)
    },
    {
        'path': '**',
        'redirectTo': ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }