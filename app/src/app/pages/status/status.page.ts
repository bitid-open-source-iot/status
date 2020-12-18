import { PagesService } from 'src/app/services/pages/pages.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'status-page',
    styleUrls: ['./status.page.scss'],
    templateUrl: './status.page.html'
})

export class StatusPage implements OnInit, OnDestroy {

    constructor(private pages: PagesService) { }

    ngOnInit(): void { };

    ngOnDestroy(): void { };

}