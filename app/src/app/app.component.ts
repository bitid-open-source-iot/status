import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket/socket.service';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(private socket: SocketService) { };

    private async initialize() {
        await this.socket.connect();
    };

    ngOnInit(): void {
        this.initialize();
    };

}