/* --- PAGES --- */
import { SubscribersPage } from './subscribers.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path': '',
        'component': SubscribersPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SubscribersPage
    ]
})

export class SubscribersModule { }