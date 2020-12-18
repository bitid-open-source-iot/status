import { PagesService } from 'src/app/services/pages/pages.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ComponentsService } from 'src/app/services/components/components.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'home-page',
    styleUrls: ['./home.page.scss'],
    templateUrl: './home.page.html'
})

export class HomePage implements OnInit, OnDestroy {

    constructor(public pages: PagesService, private toast: ToastService, private socket: SocketService, public components: ComponentsService) { };

    public page: any;
    public loading: boolean;
    private subscriptions: any = {};

    private async load() {
        this.loading = true;
        
        const pages = await this.pages.load({
            'filter': [
                'pageId',
                'description'
            ]
        });

        if (pages.ok) {
            this.page = pages.result;
        
            const components = await this.components.load({
                'filter': [
                    'status',
                    'description',
                    'componentId'
                ],
                'pageId': this.page.pageId
            });
            if (components.ok) {
                this.components.data = components.result.map(component => {
                    return {
                        'duration': component.status.map(o => {
                            return {
                                'date': o.date,
                                'value': o.duration
                            };
                        }),
                        'description': component.description,
                        'componentId': component.componentId
                    };
                });
            } else {
                this.components.data = [];
                this.toast.error(components.error.message);
            };
        } else {
            this.toast.error(pages.error.message);
            this.components.data = [];
        };
        
        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.socket = this.socket.message.subscribe(message => {
            console.log(message);
        });

        this.load();
    };

    ngOnDestroy(): void {
        this.subscriptions.socket.unsubscribe();
    };

}