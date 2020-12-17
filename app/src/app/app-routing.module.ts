/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path': 'components',
        'canActivate': [],
        'loadChildren': () => import('./pages/components/components.module').then(m => m.ComponentsModule)
    },
    {
        'path': 'subscribers',
        'canActivate': [],
        'loadChildren': () => import('./pages/subscribers/subscribers.module').then(m => m.SubscribersModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }