import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PagesService {

    public data: any[] = [];

    constructor(private api: ApiService) { };

    public async add(params: any) {
        return await this.api.post(environment.status, '/status/pages/add', params);
    };

    public async get(params: any) {
        return await this.api.post(environment.status, '/status/pages/get', params);
    };

    public async list(params: any) {
        return await this.api.post(environment.status, '/status/pages/list', params);
    };

    public async load(params: any) {
        return await this.api.post(environment.status, '/status/pages/data', params);
    };

    public async share(params: any) {
        return await this.api.post(environment.status, '/status/pages/share', params);
    };

    public async update(params: any) {
        return await this.api.post(environment.status, '/status/pages/update', params);
    };

    public async delete(params: any) {
        return await this.api.post(environment.status, '/status/pages/delete', params);
    };

    public async unsubscribe(params: any) {
        return await this.api.post(environment.status, '/status/pages/unsubscribe', params);
    };

    public async updatesubscriber(params: any) {
        return await this.api.post(environment.status, '/status/pages/updatesubscriber', params);
    };

}