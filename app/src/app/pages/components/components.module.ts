/* --- PAGES --- */
import { ComponentsPage } from './components.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path': '',
        'component': ComponentsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ComponentsPage
    ]
})

export class ComponentsModule { }