import { PagesService } from 'src/app/services/pages/pages.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
    selector: 'status-page',
    styleUrls: ['./status.page.scss'],
    templateUrl: './status.page.html'
})

export class StatusPage implements OnInit, OnDestroy {

    constructor(private pages: PagesService, private toast: ToastService) { };

    public page: any;
    public loading: boolean;

    private async load() {
        this.loading = true;
        
        const response = await this.pages.load({
            'filter': [
                'pageId',
                'description'
            ]
        });

        if (response.ok) {
            this.page = response.result;
        } else {
            this.toast.error(response.error.message);
        };
        
        this.loading = false;
    };

    ngOnInit(): void {
        this.load();
    };

    ngOnDestroy(): void { };

}