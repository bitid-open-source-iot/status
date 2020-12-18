import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SocketService {

    public socket: WebSocket;
    public message: Subject<MESSAGE> = new Subject<MESSAGE>();
    public connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { };

    public async connect() {
        this.socket = new WebSocket(environment.socket);
        this.socket.onopen = () => {
            this.connected.next(true);
        };
        this.socket.onclose = () => {
            this.connected.next(false);
        };
        this.socket.onmessage = (event) => {
            this.message.next(JSON.parse(event.data));
        };
        return true;
    };

}

export interface MESSAGE {
    'type'?: string;
}