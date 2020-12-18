/* --- PAGES --- */
import { HomePage } from './home.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmchartModule } from 'src/app/libs/amchart/amchart.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path': '',
        'component': HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        AmchartModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomePage
    ]
})

export class HomeModule { }